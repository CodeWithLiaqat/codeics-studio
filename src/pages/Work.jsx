import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/seo/SEO";
import PageHeader from "../components/layout/PageHeader";
import { portfolioData } from "../data/portfolioData";
import { servicesData } from "../data/servicesData";
import { buildBreadcrumbs, buildCreativeWork } from "../lib/schema";

const crumbs = [{ label: "Home", href: "/" }, { label: "Work", href: "/work" }];

export default function Work() {
  const [params, setParams] = useSearchParams();
  const filter = params.get("service") ?? "all";
  const filters = useMemo(
    () => [{ id: "all", title: "All" }, ...servicesData.filter((s) => portfolioData.some((p) => p.services.includes(s.id))).sort((a, b) => a.order - b.order)],
    []
  );
  const items = useMemo(
    () => [...portfolioData].sort((a, b) => a.order - b.order).filter((p) => filter === "all" || p.services.includes(filter)),
    [filter]
  );
  const setFilter = (id) => setParams(id === "all" ? {} : { service: id }, { replace: true });

  return (
    <>
      <SEO
        title="Case Studies"
        description="Selected 3D web, AI application, performance and design system projects with measured outcomes."
        path="/work"
        schemas={[buildBreadcrumbs(crumbs), ...portfolioData.map(buildCreativeWork)]}
      />
      <PageHeader eyebrow="Work" title="Measured outcomes, not mockups." description="Concept showcases and interactive studio demos, each shipped with real performance and engagement numbers." crumbs={crumbs} />

      <section aria-label="Case studies" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
        <div role="group" aria-label="Filter by service" className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button key={f.id} type="button" aria-pressed={active} onClick={() => setFilter(f.id)} className={`h-10 rounded-full border px-4 text-sm transition-colors ${active ? "border-emerald-500 bg-emerald-500/10 text-emerald-300" : "border-white/[0.07] bg-[#0b0b0f] text-zinc-400 hover:text-zinc-100"}`}>
                {f.title}
              </button>
            );
          })}
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {items.map((p, i) => (
            <li key={p.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0b0f] transition-colors hover:border-emerald-500/40">
                <Link to={`/work/${p.slug}`} aria-label={`View case study: ${p.title}`} className="relative block" style={{ aspectRatio: `${p.cover.width} / ${p.cover.height}` }}>
                  <img src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} loading={i < 2 ? "eager" : "lazy"} decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-[#050505]/70 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-zinc-300 backdrop-blur">{p.type}</span>
                </Link>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <p className="text-xs text-zinc-500">{p.client} · {p.industry} · {p.year}</p>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                    <Link to={`/work/${p.slug}`} className="transition-colors group-hover:text-emerald-300">{p.title}</Link>
                  </h2>
                  <p className="text-pretty text-sm leading-relaxed text-zinc-400">{p.summary}</p>
                  <dl className="mt-auto grid grid-cols-3 gap-2 pt-2">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl border border-white/[0.07] bg-[#050505] p-3">
                        <dd className="font-display text-base font-semibold text-emerald-400">{m.value}</dd>
                        <dt className="mt-0.5 text-[11px] text-zinc-500">{m.label}</dt>
                      </div>
                    ))}
                  </dl>
                  <div className="flex items-center justify-between pt-2">
                    <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                      {p.techTags.slice(0, 3).map((t) => <li key={t} className="rounded-full border border-white/[0.07] px-2 py-0.5 text-[11px] text-zinc-500">{t}</li>)}
                    </ul>
                    <Link to={`/work/${p.slug}`} className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-emerald-400">Read <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        {items.length === 0 && <p className="py-20 text-center text-zinc-500">No case studies in this category yet.</p>}
      </section>
    </>
  );
}
