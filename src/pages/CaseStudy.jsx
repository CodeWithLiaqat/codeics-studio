import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import SEO from "../components/seo/SEO";
import PageHeader from "../components/layout/PageHeader";
import MagneticButton from "../components/ui/MagneticButton";
import NotFound from "./NotFound";
import { getProjectBySlug, portfolioData } from "../data/portfolioData";
import { servicesData } from "../data/servicesData";
import { buildBreadcrumbs, buildCreativeWork } from "../lib/schema";

export default function CaseStudy() {
  const { slug } = useParams();
  const p = getProjectBySlug(slug);
  if (!p) return <NotFound />;

  const sorted = [...portfolioData].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((x) => x.id === p.id);
  const prev = sorted[(idx - 1 + sorted.length) % sorted.length];
  const next = sorted[(idx + 1) % sorted.length];
  const services = servicesData.filter((s) => p.services.includes(s.id));
  const crumbs = [{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: p.title, href: `/work/${p.slug}` }];

  return (
    <>
      <SEO title={p.seo.title} description={p.seo.description} path={`/work/${p.slug}`} image={p.cover.src} type="article" schemas={[buildBreadcrumbs(crumbs), buildCreativeWork(p)]} />
      <PageHeader eyebrow={`${p.type} · ${p.client} · ${p.year}`} title={p.title} description={p.summary} crumbs={crumbs}>
        {p.liveUrl && <MagneticButton href={p.liveUrl} variant="ghost" target="_blank" rel="noopener noreferrer">Live preview</MagneticButton>}
      </PageHeader>

      <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
        <figure className="overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0b0f]">
          <div className="relative w-full" style={{ aspectRatio: `${p.cover.width} / ${p.cover.height}` }}>
            <img src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </figure>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="rounded-3xl border border-white/[0.07] bg-[#0b0b0f] p-6">
              <dd className="font-display text-3xl font-semibold tracking-tight text-emerald-400 sm:text-4xl">{m.value}</dd>
              <dt className="mt-2 text-sm text-zinc-200">{m.label}</dt>
              <dd className="mt-1 text-xs text-zinc-500">{m.note}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-12 grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-12">
            <section aria-labelledby="challenge-heading" className="flex flex-col gap-4">
              <h2 id="challenge-heading" className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">Challenge</h2>
              <p className="text-pretty text-xl leading-relaxed text-zinc-200 sm:text-2xl">{p.challenge}</p>
            </section>
            <section aria-labelledby="solution-heading" className="flex flex-col gap-4">
              <h2 id="solution-heading" className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">Solution</h2>
              <p className="text-pretty text-lg leading-relaxed text-zinc-300">{p.solution}</p>
            </section>
            {p.gallery.length > 0 && (
              <section aria-label="Gallery" className="grid gap-4 sm:grid-cols-2">
                {p.gallery.map((g) => (
                  <figure key={g.src} className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0b0f]">
                    <div className="relative w-full" style={{ aspectRatio: `${g.width} / ${g.height}` }}>
                      <img src={g.src} alt={g.alt} width={g.width} height={g.height} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <figcaption className="px-4 py-3 text-xs text-zinc-500">{g.alt}</figcaption>
                  </figure>
                ))}
              </section>
            )}
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/[0.07] bg-[#0b0b0f] p-6">
              <dl className="flex flex-col gap-5 text-sm">
                <div><dt className="text-xs uppercase tracking-[0.16em] text-zinc-500">Client</dt><dd className="mt-1 text-zinc-200">{p.client}</dd></div>
                <div><dt className="text-xs uppercase tracking-[0.16em] text-zinc-500">Industry</dt><dd className="mt-1 text-zinc-200">{p.industry}</dd></div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-zinc-500">Services</dt>
                  <dd className="mt-2 flex flex-col gap-1">
                    {services.map((s) => <Link key={s.id} to={`/services/${s.slug}`} className="inline-flex items-center gap-1 text-zinc-200 hover:text-emerald-400">{s.title} <ArrowUpRight className="h-3 w-3" aria-hidden="true" /></Link>)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-zinc-500">Stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">{p.techTags.map((t) => <span key={t} className="rounded-full border border-white/[0.07] bg-[#050505] px-2.5 py-1 text-[11px] text-zinc-300">{t}</span>)}</dd>
                </div>
              </dl>
              <MagneticButton to="/contact#intake-form" className="mt-6 w-full">Build something similar</MagneticButton>
            </div>
          </aside>
        </div>

        <nav aria-label="More case studies" className="mt-16 grid gap-4 border-t border-white/[0.07] pt-8 sm:grid-cols-2">
          <Link to={`/work/${prev.slug}`} className="group flex flex-col gap-1 rounded-2xl p-4 transition-colors hover:bg-white/[0.03]">
            <span className="inline-flex items-center gap-1 text-xs text-zinc-500"><ArrowLeft className="h-3 w-3" aria-hidden="true" /> Previous</span>
            <span className="font-display text-lg text-zinc-100 group-hover:text-emerald-300">{prev.title}</span>
          </Link>
          <Link to={`/work/${next.slug}`} className="group flex flex-col items-end gap-1 rounded-2xl p-4 text-right transition-colors hover:bg-white/[0.03]">
            <span className="inline-flex items-center gap-1 text-xs text-zinc-500">Next <ArrowRight className="h-3 w-3" aria-hidden="true" /></span>
            <span className="font-display text-lg text-zinc-100 group-hover:text-emerald-300">{next.title}</span>
          </Link>
        </nav>
      </article>
    </>
  );
}
