import { useCallback, useEffect, useReducer } from "react";
import emailjs from "@emailjs/browser";
import { insertLead } from "../lib/supabaseClient";
import { leadFormOptions } from "../data/siteConfig";

export const initialValues = {
  name: "",
  email: "",
  serviceCategory: "",
  budgetRange: "",
  timeline: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const valid = (list, v) => Array.isArray(list) && list.some((o) => o.value === v);

export function validate(values) {
  const e = {};
  if (!values.name || values.name.trim().length < 2) {
    e.name = "Please enter your full name.";
  }
  if (!values.email || !EMAIL_RE.test(values.email.trim())) {
    e.email = "Enter a valid email address.";
  }
  if (!valid(leadFormOptions.serviceCategories, values.serviceCategory)) {
    e.serviceCategory = "Choose the service you need.";
  }
  if (!valid(leadFormOptions.budgetRanges, values.budgetRange)) {
    e.budgetRange = "Select a budget range.";
  }
  if (!valid(leadFormOptions.timelines, values.timeline)) {
    e.timeline = "Select a timeline.";
  }
  if (!values.message || values.message.trim().length < 10) {
    e.message = "Tell us a little more (at least 10 characters).";
  } else if (values.message.trim().length > 4000) {
    e.message = "Please keep the brief under 4000 characters.";
  }
  return e;
}

export const steps = [
  { id: "project", title: "Your project", fields: ["serviceCategory", "budgetRange", "timeline"] },
  { id: "details", title: "Brief & contact", fields: ["name", "email", "message"] },
];

const initialState = {
  step: 0,
  values: initialValues,
  errors: {},
  touched: {},
  status: "idle",
  toast: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "blur":
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
        errors: { ...state.errors, [action.field]: validate(state.values)[action.field] },
      };
    case "errors":
      return {
        ...state,
        errors: action.errors,
        touched: {
          ...state.touched,
          ...Object.fromEntries(Object.keys(action.errors).map((k) => [k, true])),
        },
      };
    case "step":
      return { ...state, step: action.step };
    case "submitting":
      return { ...state, status: "submitting", toast: null };
    case "success":
      return {
        ...initialState,
        status: "success",
        toast: { kind: "success", message: action.message },
      };
    case "error":
      return { ...state, status: "error", toast: { kind: "error", message: action.message } };
    case "dismissToast":
      return {
        ...state,
        toast: null,
        status: state.status === "success" ? "idle" : state.status,
      };
    default:
      return state;
  }
}

export default function useLeadForm({ source = "website", onSuccess, presetService = "" } = {}) {
  const [state, dispatch] = useReducer(reducer, initialState, (s) =>
    valid(leadFormOptions.serviceCategories, presetService)
      ? { ...s, values: { ...s.values, serviceCategory: presetService } }
      : s
  );

  useEffect(() => {
    if (presetService && valid(leadFormOptions.serviceCategories, presetService)) {
      dispatch({ type: "change", field: "serviceCategory", value: presetService });
    }
  }, [presetService]);

  const setField = useCallback((field, value) => dispatch({ type: "change", field, value }), []);
  const blurField = useCallback((field) => dispatch({ type: "blur", field }), []);
  const dismissToast = useCallback(() => dispatch({ type: "dismissToast" }), []);

  const next = useCallback(() => {
    const errs = validate(state.values);
    const stepErrs = Object.fromEntries(
      steps[state.step].fields.filter((f) => errs[f]).map((f) => [f, errs[f]])
    );
    if (Object.keys(stepErrs).length) {
      return dispatch({ type: "errors", errors: stepErrs });
    }
    dispatch({ type: "step", step: Math.min(state.step + 1, steps.length - 1) });
  }, [state.values, state.step]);

  const back = useCallback(() => {
    dispatch({ type: "step", step: Math.max(state.step - 1, 0) });
  }, [state.step]);

  const submit = useCallback(
    async (e) => {
      e?.preventDefault();
      if (state.status === "submitting") return;

      const errs = validate(state.values);
      if (Object.keys(errs).length) {
        dispatch({ type: "errors", errors: errs });
        const firstStep = steps.findIndex((s) => s.fields.some((f) => errs[f]));
        if (firstStep >= 0) dispatch({ type: "step", step: firstStep });
        return;
      }

      dispatch({ type: "submitting" });

      try {
        try {
          const { error: sbError } = await insertLead({ ...state.values, source });
          if (sbError) throw sbError;
        } catch (dbErr) {
          console.error("Supabase Error:", dbErr);
          return dispatch({ type: "error", message: `Database Error: ${dbErr.message || "Failed to save lead"}` });
        }

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
          return dispatch({ type: "error", message: "Vercel Build Error: Keys are missing." });
        }

        await emailjs.send(
          serviceId,
          templateId,
          {
            name: state.values.name.trim(),
            email: state.values.email.trim(),
            service_category: state.values.serviceCategory,
            budget_range: state.values.budgetRange,
            timeline: state.values.timeline,
            message: state.values.message.trim(),
            source,
          },
          publicKey
        );

        dispatch({ type: "success", message: "Brief received. You will hear from us within 24 hours." });
        onSuccess?.(state.values);
      } catch (emailErr) {
        console.error("EmailJS Crash:", emailErr);
        return dispatch({ type: "error", message: `EmailJS Error: ${emailErr?.text || emailErr?.message || "Check console"}` });
      }
    },
    [state.values, state.status, source, onSuccess]
  );

  return {
    ...state,
    steps,
    setField,
    blurField,
    next,
    back,
    submit,
    dismissToast,
    isSubmitting: state.status === "submitting",
  };
}