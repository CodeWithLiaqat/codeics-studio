/** Ambient beams: blurred, slowly rotating conic streaks + faint grid + grain. Pure CSS. */
export default function BackgroundBeams({ className = "", intensity = 0.14 }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div
        className="absolute left-1/2 top-[-40%] h-[140%] w-[140%] -translate-x-1/2 opacity-70 motion-safe:animate-spin-slow [animation-duration:60s]"
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(16,185,129,${intensity}) 40deg, transparent 80deg, transparent 180deg, rgba(34,211,238,${intensity * 0.7}) 220deg, transparent 260deg)`,
          filter: "blur(60px)",
          maskImage: "radial-gradient(closest-side, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(closest-side, black 20%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      <div className="absolute inset-0 bg-noise bg-[size:160px_160px] opacity-[0.04] mix-blend-overlay" />
    </div>
  );
}
