import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "../../data/portfolioData";
import MagneticButton from "../ui/MagneticButton";

export default function CaseStudies() {
  return (
    <section 
      id="work" 
      aria-labelledby="case-studies-heading" 
      className="relative scroll-mt-24 border-t border-stroke py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Selected Work
            </p>
            <h2 
              id="case-studies-heading" 
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
            >
              Recent interactive projects
            </h2>
          </div>
          <MagneticButton to="/work" variant="ghost">
            View all projects
          </MagneticButton>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article 
              key={project.id} 
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0b0f] transition-colors hover:border-emerald-500/40"
            >
              <figure className="relative aspect-[16/10] overflow-hidden bg-obsidian">
                <img
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={project.cover.width}
                  height={project.cover.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </figure>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="text-xs tracking-wide text-zinc-400">
                    {project.client} · {project.industry} · {project.year}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-zinc-100 group-hover:text-emerald-300">
                    <Link 
                      to={`/work/${project.slug}`}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techTags?.slice(0, 3).map((tag) => (
                      <span 
                        key={tag} 
                        className="rounded-full border border-white/[0.07] bg-[#050505] px-2 py-0.5 text-[11px] text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.03] text-zinc-300 transition-colors group-hover:bg-emerald-400 group-hover:text-obsidian">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}