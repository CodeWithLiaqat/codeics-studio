import Accordion from "../ui/Accordion";
import { faqData } from "../../data/faqData";

export default function FAQ({ items = faqData, id = "faq" }) {
  return (
    <section id={id} aria-labelledby="faq-heading" className="scroll-mt-24 border-t border-stroke">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-8 grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">FAQ</p>
          <h2 id="faq-heading" className="font-display text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Questions we hear before every project.</h2>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}
