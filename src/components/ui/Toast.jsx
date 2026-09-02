import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Toast({ toast, onDismiss, duration = 6000 }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [toast, onDismiss, duration]);

  return (
    <div aria-live="polite" aria-atomic="true" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-5">
      {toast && (
        <div
          role={toast.kind === "error" ? "alert" : "status"}
          className={`pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl border bg-obsidian-100/95 px-4 py-3 text-sm shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md motion-safe:animate-[fade-up_300ms_ease-out] ${
            toast.kind === "error" ? "border-red-500/30 text-red-200" : "border-emerald-500/30 text-emerald-100"
          }`}
        >
          {toast.kind === "error" ? <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />}
          <p className="leading-relaxed">{toast.message}</p>
          <button type="button" onClick={onDismiss} aria-label="Dismiss" className="ml-1 -mr-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-zinc-400 hover:text-zinc-100">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
