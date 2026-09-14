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
        // 1. Supabase Crash Protection
        try {
          const { error: sbError } = await insertLead({ ...state.values, source });
          if (sbError) throw sbError;
        } catch (dbErr) {
          console.error("Supabase Error:", dbErr);
          return dispatch({ type: "error", message: `Database Error: ${dbErr.message || "Failed to save lead"}` });
        }

        // 2. EmailJS Crash Protection
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
          return dispatch({ type: "error", message: "Vercel Build Error: Keys are undefined. Vite needs a fresh redeploy." });
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