import { Link, useParams } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import SEO from "../components/seo/SEO";
import PageHeader from "../components/layout/PageHeader";
import MagneticButton from "../components/ui/MagneticButton";
import FAQ from "../components/sections/FAQ";
import NotFound from "./NotFound";
import { getServiceBySlug, servicesData } from "../data/servicesData";
import { portfolioData } from "../data/portfolioData";
import { faqData } from "../data/faqData";
import { buildBreadcrumbs, buildService, buildFAQPage } from "../lib/schema";

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = getServiceBySlug(slug);
  if (!s) return <NotFound />;

  const Icon = Icons[s.icon] ?? Icons.Sparkles;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.title, href: `/services/${s.slug}` }];
  const related = portfolioData.filter((p) => p.services.includes(s.id)).slice(0, 2);
  const others = servicesData.filter((o) => o.id !== s.id).sort((a, b) => a.order - b.order);
  const faqs = faqData.filter((f) => ["Pricing", "Process"].includes(f.category)).slice(0, 4);

  return (
    <>
      <SEO title={s.seo.title} description={s.seo.description} keywords={s.seo.keywords} path={`/services/${s.slug}`} schemas={[buildBreadcrumbs(crumbs), buildService(s), buildFAQPage(faqs)]} />
      <PageHeader eyebrow={s.eyebrow} title={s.title} description={s.shortDescription} crumbs={crumbs}>
        <div className="flex flex-col items-start gap-2 lg:items-end">
          <MagneticButton to={`/contact?service=${s.slug}#intake-form`}>Start with {s.title}</MagneticButton>
          <span className="text-sm text-zinc-500">{s.startingPrice}</span>
        </div>
      </PageHeader>

      <article className="mx-auto grid w-full max-w-7xl gap-14 px-4 py-16 sm:px-8 grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
        <div className="flex flex-col gap-12">
          <section aria-labelledby="approach-heading" className="flex flex-col gap-5">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0b0b0f] text-emerald-400"><Icon className="h-5 w-5" aria-hidden="true" /></span>
            <h2 id="approach-heading" className="font-display text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">How we approach it</h2>
            <p className="text-pretty text-lg leading-relaxed text-zinc-300">{s.longDescription}</p>
          </section>

          <section aria-labelledby="deliverables-heading" className="flex flex-col gap-5">
            <h2 id="deliverables-heading" className="font-display text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">What you receive</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-[#0b0b0f] p-4 text-sm leading-relaxed text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />{d}
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="related-heading" className="flex flex-col gap-5">
              <h2 id="related-heading" className="font-display text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">Related work</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {related.map((p) => (
                  <li key={p.id}>
                    <Link to={`/work/${p.slug}`} className="group flex h-full flex-col gap-3 rounded-2xl border border-white/[0.07] bg-[#0b0b0f] p-5 transition-colors hover:border-emerald-500/40">
                      <p className="text-xs text-zinc-500">{p.client} · {p.year}</p>
                      <h3 className="font-display text-lg font-semibold tracking-tight text-zinc-50 group-hover:text-emerald-300">{p.title}</h3>
                      <p className="text-sm text-emerald-400">{p.metrics[0].value} {p.metrics[0].label.toLowerCase()}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-white/[0.07] bg-[#0b0b0f] p-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Stack</h2>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {s.techBadges.map((t) => <li key={t} className="rounded-full border border-white/[0.07] bg-[#050505] px-2.5 py-1 text-[11px] tracking-wide text-zinc-300">{t}</li>)}
            </ul>
            <p className="mt-6 text-xs text-zinc-500">Pricing</p>
            <p className="font-display text-2xl font-semibold tracking-tight text-zinc-50">{s.startingPrice}</p>
            <MagneticButton to={`/contact?service=${s.slug}#intake-form`} className="mt-6 w-full">Request a quote</MagneticButton>
          </div>
          <nav aria-label="Other services" className="flex flex-col gap-1">
            <h2 className="px-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Other services</h2>
            {others.map((o) => (
              <Link key={o.id} to={`/services/${o.slug}`} className="flex items-center justify-between rounded-xl px-2 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/[0.03] hover:text-emerald-300">
                {o.title} <ArrowRight className="h-4 w-4 text-zinc-600" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </aside>
      </article>

      <FAQ items={faqs} id="service-faq" />
    </>
  );
}
