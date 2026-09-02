import Breadcrumbs from "./Breadcrumbs";

export default function PageHeader({ eyebrow, title, description, crumbs, children }) {
  return (
    <section className="relative overflow-hidden border-b border-stroke">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(700px_circle_at_15%_0%,rgba(16,185,129,0.10),transparent_60%)]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-14 pt-12 sm:px-8 lg:pb-20 lg:pt-16">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-4">
            {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">{eyebrow}</p>}
            <h1 className="font-display text-balance text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">{title}</h1>
            {description && <p className="max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400">{description}</p>}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
