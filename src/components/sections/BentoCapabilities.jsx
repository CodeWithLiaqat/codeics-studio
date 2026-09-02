import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import * as Icons from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import { servicesData } from "../../data/servicesData";

const span = (b) =>
  `col-span-1 ${b.colSpan === 2 ? "md:col-span-2" : "md:col-span-1"} ${b.rowSpan === 2 ? "lg:row-span-2" : "lg:row-span-1"}`;

const GLOWS = ["16,185,129", "34,211,238", "16,185,129", "167,243,208", "34,211,238"];

function Card({ service, index }) {
  const Icon = Icons[service.icon] ?? Icons.Sparkles;
  const featured = service.bento.featured;
  return (
    <li className={`min-h-[240px] min-w-0 ${span(service.bento)}`}>
      <SpotlightCard
        as={Link}
        to={`/services/${service.slug}`}
        glow={GLOWS[index % GLOWS.length]}
        className="flex h-full min-w-0 flex-col justify-between rounded-2xl p-5 sm:rounded-3xl sm:p-7 ring-focus"
      >
        <div className="relative flex items-start justify-between gap-4">
          <span className="glass inline-flex h-11 w-11 items-center justify-center rounded-2xl text-accent-soft transition-shadow duration-500 group-hover/spot:shadow-aura">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-zinc-500 transition-[color,border-color,transform,background-color] duration-300 ease-spring group-hover/spot:border-accent/40 group-hover/spot:bg-accent/10 group-hover/spot:text-accent-soft motion-safe:group-hover/spot:translate-x-0.5 motion-safe:group-hover/spot:-translate-y-0.5">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
        <div className="relative mt-8 flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent-soft/80">{service.eyebrow}</p>
          <h3 className={`font-display break-words font-semibold tracking-tight ${featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-xl"}`}>
            <span className="text-gradient">{service.title}</span>
          </h3>
          <p className={`text-pretty break-words leading-relaxed text-zinc-400 ${featured ? "max-w-lg text-sm sm:text-base" : "text-sm"}`}>{service.shortDescription}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Technologies">
            {service.techBadges.slice(0, featured ? 6 : 3).map((t) => (
              <li key={t} className="glass whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] leading-5 tracking-wide text-zinc-400 transition-colors duration-300 group-hover/spot:text-zinc-200">{t}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-zinc-500">{service.startingPrice}</p>
        </div>
      </SpotlightCard>
    </li>
  );
}

export default function BentoCapabilities() {
  const services = [...servicesData].sort((a, b) => a.order - b.order);
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="relative scroll-mt-24">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-soft">Capabilities</p>
            <h2 id="capabilities-heading" className="font-display text-balance break-words text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-gradient">Five disciplines. One engineering standard.</span>
            </h2>
          </div>
          <Link to="/services" className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-accent-soft">
            View all services <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(260px,auto)]">
          {services.map((s, i) => <Card key={s.id} service={s} index={i} />)}
        </ul>
      </div>
    </section>
  );
}
