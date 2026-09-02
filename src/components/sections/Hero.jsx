import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import CanvasFrame from "../three/CanvasFrame";
import ShimmerButton from "../ui/ShimmerButton";
import MovingBorder from "../ui/MovingBorder";
import AuroraGlow from "../ui/AuroraGlow";
import BackgroundBeams from "../ui/BackgroundBeams";
import { siteConfig, heroContent } from "../../data/siteConfig";

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <BackgroundBeams intensity={0.12} />
      <AuroraGlow position="top" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <div className="flex min-w-0 flex-col gap-6 sm:gap-8">
          <p className="glass inline-flex w-fit max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-300 sm:text-xs sm:tracking-[0.14em] motion-safe:animate-fade-up">
            <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70 motion-safe:animate-ping [animation-duration:2.2s]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-soft" />
            </span>
            <span className="truncate">{heroContent.eyebrow}</span>
          </p>

          <h1 id="hero-heading" className="font-display text-balance break-words text-3xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-7xl motion-safe:animate-fade-up [animation-delay:80ms]">
            <span className="text-gradient">{heroContent.headline}</span>{" "}
            <span className="text-shimmer">{heroContent.headlineAccent}</span>
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg motion-safe:animate-fade-up [animation-delay:160ms]">
            {heroContent.subheadline}
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap motion-safe:animate-fade-up [animation-delay:240ms]">
            <ShimmerButton to={heroContent.primaryCta.href} className="w-full sm:w-auto">{heroContent.primaryCta.label}</ShimmerButton>
            <MovingBorder to={heroContent.secondaryCta.href} className="w-full sm:w-auto">{heroContent.secondaryCta.label}</MovingBorder>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 motion-safe:animate-fade-up [animation-delay:320ms]">
            <a href={heroContent.tertiaryCta.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-accent-soft">
              <MessageCircle className="h-4 w-4 text-accent-soft" aria-hidden="true" />
              {heroContent.tertiaryCta.label}
            </a>
            <span className="hidden h-4 w-px bg-stroke sm:block" aria-hidden="true" />
            <p className="text-sm text-zinc-500">
              Led by <Link to="/contact" className="text-zinc-300 hover:text-accent-soft">{siteConfig.founder.name}</Link>
            </p>
          </div>
        </div>

        <div className="relative order-first lg:order-none">
          <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(16,185,129,0.18),transparent)] blur-3xl" />
          <CanvasFrame label="Codeics interactive 3D hero scene" className="glass grain" />
        </div>
      </div>

      <div className="relative border-y border-stroke bg-obsidian-50/60 backdrop-blur-xl">
        <dl className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-y-2 px-4 sm:px-8 md:grid-cols-4 md:divide-x md:divide-stroke">
          {heroContent.metrics.map((m, i) => (
            <div key={m.label} className="flex min-w-0 flex-col gap-1 py-5 pr-3 md:px-6 md:py-6 md:first:pl-0 md:last:pr-0 motion-safe:animate-fade-up" style={{ animationDelay: `${400 + i * 80}ms` }}>
              <dt className="order-2 text-[11px] leading-snug tracking-wide text-zinc-500 sm:text-xs">{m.label}</dt>
              <dd className="order-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl"><span className="text-gradient">{m.value}</span></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
