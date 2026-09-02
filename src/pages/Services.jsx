import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import * as Icons from "lucide-react";
import SEO from "../components/seo/SEO";
import PageHeader from "../components/layout/PageHeader";
import MagneticButton from "../components/ui/MagneticButton";
import { servicesData } from "../data/servicesData";
import { siteConfig } from "../data/siteConfig";
import { buildBreadcrumbs, buildService } from "../lib/schema";

const crumbs = [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }];

export default function Services() {
  const list = [...servicesData].sort((a, b) => a.order - b.order);
  return (
    <>
      <SEO
        title="Services"
        description="3D interactive web, AI web apps, enterprise WordPress, UI/UX design systems and Core Web Vitals audits. Custom scopes from $1,000."
        path="/services"
        schemas={[buildBreadcrumbs(crumbs), ...list.map(buildService)]}
      />
      <PageHeader eyebrow="Services" title="Five disciplines, one engineering standard." description={siteConfig.description} crumbs={crumbs}>
        <MagneticButton to="/contact#intake-form">Start a project</MagneticButton>
      </PageHeader>
      <section aria-label="All services" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 lg:py-24">
        <ol className="flex flex-col divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {list.map((s, i) => {
            const Icon = Icons[s.icon] ?? Icons.Sparkles;
            return (
              <li key={s.id}>
                <Link to={`/services/${s.slug}`} className="group grid gap-6 py-10 transition-colors md:grid-cols-[80px_1fr_auto] md:items-start lg:py-12">
                  <div className="flex items-center gap-4 md:flex-col md:items-start">
                    <span className="text-xs tabular-nums text-zinc-500">0{i + 1}</span>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0b0b0f] text-emerald-400"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  </div>
                  <div className="flex max-w-2xl flex-col gap-3">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400/80">{s.eyebrow}</p>
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-50 transition-colors group-hover:text-emerald-300 sm:text-3xl">{s.title}</h2>
                    <p className="text-pretty leading-relaxed text-zinc-400">{s.shortDescription}</p>
                    <ul className="mt-1 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {s.techBadges.map((t) => <li key={t} className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[11px] tracking-wide text-zinc-400">{t}</li>)}
                    </ul>
                  </div>
                  <div className="flex items-center gap-3 md:flex-col md:items-end">
                    <span className="text-sm text-zinc-300">{s.startingPrice}</span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] text-zinc-500 transition-[color,border-color] group-hover:border-emerald-500/40 group-hover:text-emerald-400"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
