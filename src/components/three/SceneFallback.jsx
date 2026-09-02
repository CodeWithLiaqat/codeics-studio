export default function SceneFallback({ label = "Loading scene" }) {
  return (
    <div role="status" aria-label={label} className="absolute inset-0 overflow-hidden rounded-[inherit] bg-[#0b0b0f]">
      <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.18),transparent_70%)] blur-2xl motion-safe:animate-pulse" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
