import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Loader2, ArrowLeft, ArrowRight, Send } from "lucide-react";
import useLeadForm from "../../hooks/useLeadForm";
import Toast from "../ui/Toast";
import { leadFormOptions, siteConfig } from "../../data/siteConfig";

const fieldCls = (err) =>
  `min-h-[48px] w-full min-w-0 rounded-xl border bg-obsidian px-4 text-base text-zinc-100 sm:text-sm placeholder:text-zinc-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
    err ? "border-red-500/50" : "border-stroke hover:border-white/15 focus:border-emerald-500/50"
  }`;

function Pills({ name, label, options, value, onChange, error }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium text-zinc-200">{label}</legend>
      <div role="radiogroup" aria-describedby={error ? `${name}-error` : undefined} className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <label key={o.value} className="cursor-pointer">
              <input type="radio" name={name} value={o.value} checked={active} onChange={() => onChange(o.value)} className="peer sr-only" />
              <span
                className={`inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 text-sm leading-snug transition-[border-color,background-color,color] duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400/60 ${
                  active ? "border-emerald-500 bg-emerald-500/10 text-emerald-300" : "border-stroke bg-obsidian text-zinc-400 hover:border-white/15 hover:text-zinc-200"
                }`}
              >
                {o.label}
              </span>
            </label>
          );
        })}
      </div>
      {error && <p id={`${name}-error`} className="text-xs text-red-400">{error}</p>}
    </fieldset>
  );
}

function Field({ id, label, error, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-zinc-200">{label}</label>
        {hint && <span className="text-xs text-zinc-500">{hint}</span>}
      </div>
      {children}
      <p id={`${id}-error`} className="min-h-[1rem] text-xs text-red-400" aria-live="polite">{error}</p>
    </div>
  );
}

export default function LeadForm({ source = "website", heading = "Start a project", presetService = "", onSuccess }) {
  const f = useLeadForm({ source, onSuccess, presetService });
  const { values: v, errors: e, step } = f;
  const last = step === f.steps.length - 1;
  const rootRef = useRef(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== "#intake-form" || !rootRef.current) return;
    const top = rootRef.current.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
    const first = rootRef.current.querySelector("input, textarea");
    setTimeout(() => first?.focus({ preventScroll: true }), 450);
  }, [hash]);

  return (
    <section id="intake-form" ref={rootRef} aria-labelledby="lead-heading" className="glass grain w-full min-w-0 scroll-mt-24 rounded-2xl p-5 sm:rounded-3xl sm:p-8">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
          Step {step + 1} of {f.steps.length} · {f.steps[step].title}
        </p>
        <h2 id="lead-heading" className="font-display text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">{heading}</h2>
        <div className="mt-2 flex gap-1.5" aria-hidden="true">
          {f.steps.map((s, i) => (
            <span key={s.id} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-emerald-500" : "bg-white/10"}`} />
          ))}
        </div>
      </div>

      <form onSubmit={last ? f.submit : (ev) => { ev.preventDefault(); f.next(); }} noValidate className="flex flex-col gap-7">
        {step === 0 && (
          <>
            <Pills name="serviceCategory" label="What do you need?" options={leadFormOptions.serviceCategories} value={v.serviceCategory} onChange={(x) => f.setField("serviceCategory", x)} error={e.serviceCategory} />
            <Pills name="budgetRange" label="Budget range" options={leadFormOptions.budgetRanges} value={v.budgetRange} onChange={(x) => f.setField("budgetRange", x)} error={e.budgetRange} />
            <Pills name="timeline" label="Timeline" options={leadFormOptions.timelines} value={v.timeline} onChange={(x) => f.setField("timeline", x)} error={e.timeline} />
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field id="lead-name" label="Name" error={e.name}>
                <input id="lead-name" name="name" autoComplete="name" value={v.name} onChange={(ev) => f.setField("name", ev.target.value)} onBlur={() => f.blurField("name")} aria-invalid={!!e.name} aria-describedby="lead-name-error" placeholder="Your full name" className={fieldCls(e.name)} />
              </Field>
              <Field id="lead-email" label="Email" error={e.email}>
                <input id="lead-email" name="email" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(ev) => f.setField("email", ev.target.value)} onBlur={() => f.blurField("email")} aria-invalid={!!e.email} aria-describedby="lead-email-error" placeholder="you@company.com" className={fieldCls(e.email)} />
              </Field>
            </div>
            <Field id="lead-message" label="Project brief" hint={`${v.message.length}/4000`} error={e.message}>
              <textarea id="lead-message" name="message" rows={6} maxLength={4000} value={v.message} onChange={(ev) => f.setField("message", ev.target.value)} onBlur={() => f.blurField("message")} aria-invalid={!!e.message} aria-describedby="lead-message-error" placeholder="Goals, audience, references, anything that helps us scope it." className={`${fieldCls(e.message)} h-auto resize-y py-3 leading-relaxed`} />
            </Field>
          </>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-stroke pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="break-all text-xs text-zinc-500">
            Prefer email? <a href={`mailto:${siteConfig.contact.email}`} className="text-zinc-300 hover:text-emerald-400">{siteConfig.contact.email}</a>
          </p>
          <div className="flex gap-3">
            {step > 0 && (
              <button type="button" onClick={f.back} disabled={f.isSubmitting} className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-stroke bg-obsidian px-5 text-sm text-zinc-300 transition-colors hover:text-zinc-50 disabled:opacity-50">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
              </button>
            )}
            <button type="submit" disabled={f.isSubmitting} className="inline-flex min-h-[48px] flex-1 items-center justify-center sm:flex-none sm:min-w-[160px] gap-2 rounded-full bg-emerald-500 px-6 text-sm font-medium text-obsidian transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70">
              {f.isSubmitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</>
              ) : last ? (
                <>Send brief <Send className="h-4 w-4" aria-hidden="true" /></>
              ) : (
                <>Continue <ArrowRight className="h-4 w-4" aria-hidden="true" /></>
              )}
            </button>
          </div>
        </div>
      </form>

      <Toast toast={f.toast} onDismiss={f.dismissToast} />
    </section>
  );
}
