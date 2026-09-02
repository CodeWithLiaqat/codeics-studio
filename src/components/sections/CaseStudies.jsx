import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import TiltCard from "../ui/TiltCard";
import { featuredProjects } from "../../data/portfolioData";

function MetricPill({ metric }) {
  return (
    <div className="glass relative flex flex-col gap-0.5 rounded-2xl px-4 py-3">
      <span aria-hidden="true" className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-accent-soft shadow-[0_0_10px_2px_rgba(16,185,129,0.7)]" />
      <dd className="font-display break-words text-lg font-semibold tracking-tight sm:text-xl"><span className="text-shimmer">{metric.value}</span></dd>
      <dt className="text-[11px] leading-snug text-zinc-400">{metric.label}</dt>
    </div>
  );
}

function Study({ project, index }) {
  const flip = index % 2 === 1;
  return (
    <article className="grid min-w-0 gap-6 border-t border-stroke py-10 sm:gap-8 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
      <TiltCard className={`rounded-3xl ${flip ? "lg:order-2" : ""}`}>
        <Link to={`/work/${project.slug}`} aria-label={`View case study: ${project.title}`} className="glass grain group relative block overflow-hidden rounded-3xl ring-focus">
          <div className="relative w-full" style={{ aspectRatio: `${project.cover.width} / ${project.cover.height}` }}>
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-spring motion-safe:group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />
            <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-zinc-200">{project.type}</span>
            <dl className="absolute inset-x-4 bottom-4 grid grid-cols-1 gap-2 min-[420px]:grid-cols-3 [transform:translateZ(30px)]">
              {project.metrics.map((m) => <MetricPill key={m.label} metric={m} />)}
            </dl>
          </div>
        </Link>
      </TiltCard>

      <div className={`flex flex-col justify-center gap-6 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-wide text-zinc-500">{project.client} · {project.industry} · {project.year}</p>
          <h3 className="font-display text-balance break-words text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl"><span className="text-gradient">{project.title}</span></h3>
          <p className="text-pretty leading-relaxed text-zinc-400">{project.summary}</p>
        </div>

        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div className="glass rounded-2xl p-4">
            <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">Challenge</dt>
            <dd className="mt-1.5 leading-relaxed text-zinc-300">{project.challenge}</dd>
          </div>
          <div className="glass rounded-2xl p-4">
            <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">Solution</dt>
            <dd className="mt-1.5 leading-relaxed text-zinc-300">{project.solution}</dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {project.techTags.map((t) => (
            <li key={t} className="rounded-full border border-stroke px-2.5 py-1 text-[11px] tracking-wide text-zinc-400 transition-colors hover:border-stroke-hover hover:text-zinc-200">{t}</li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-5">
          <Link to={`/work/${project.slug}`} className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-zinc-50 transition-colors hover:text-accent-soft">
            View case study <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-accent-soft">
              Live preview <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function CaseStudies({ limit = 3 }) {
  const items = [...featuredProjects].sort((a, b) => a.order - b.order).slice(0, limit);
  return (
    <section id="work" aria-labelledby="work-heading" className="relative scroll-mt-24">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-soft">Selected work</p>
            <h2 id="work-heading" className="font-display text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"><span className="text-gradient">Measured outcomes, not mockups.</span></h2>
          </div>
          <Link to="/work" className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-accent-soft">
            Explore all work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        {items.map((p, i) => <Study key={p.id} project={p} index={i} />)}
      </div>
    </section>
  );
}
