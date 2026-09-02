import { useId, useState } from "react";
import { Plus } from "lucide-react";

export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();
  return (
    <div className="divide-y divide-stroke border-y border-stroke">
      {items.map((it, i) => {
        const active = open === i;
        const btnId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <div key={it.id ?? i}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={active}
                aria-controls={panelId}
                onClick={() => setOpen(active ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium text-zinc-100 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:text-emerald-300 sm:text-lg"
              >
                {it.question}
                <Plus className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 ${active ? "rotate-45 text-emerald-400" : ""}`} aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 text-pretty leading-relaxed text-zinc-400">{it.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
