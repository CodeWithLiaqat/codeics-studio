import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import SceneFallback from "./SceneFallback";

/**
 * Fixed-size bounding box for any WebGL scene. The box is sized by CSS before the
 * scene mounts, so swapping the CSS stand-in for an R3F <Canvas> causes no shift.
 * Usage: <CanvasFrame>{sceneReady && <Canvas dpr={Math.min(window.devicePixelRatio, 2)} />}</CanvasFrame>
 */
export default function CanvasFrame({
  children,
  aspect = "",
  minHeight = "h-[60vh] min-h-[320px] max-h-[520px] sm:h-[70vh] sm:max-h-[600px] lg:h-[85vh] lg:max-h-[720px]",
  className = "",
  label = "Interactive 3D scene",
}) {
  const ref = useRef(null);
  const raf = useRef(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onMove = useCallback(
    (e) => {
      if (reduced || e.pointerType === "touch") return;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
        el.style.setProperty("--rx", `${((0.5 - y) * 6).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${((x - 0.5) * 8).toFixed(2)}deg`);
      });
    },
    [reduced]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "40%");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      role="img"
      aria-label={label}
      style={{ "--mx": "50%", "--my": "40%", "--rx": "0deg", "--ry": "0deg" }}
      className={`relative w-full max-w-full touch-pan-y overflow-hidden rounded-2xl border border-stroke bg-obsidian-100 sm:rounded-3xl [perspective:1200px] ${aspect} ${minHeight} ${className}`}
    >
      <div className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform [transform:rotateX(var(--rx))_rotateY(var(--ry))]">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--mx)_var(--my),rgba(16,185,129,0.22),transparent_55%)] transition-[background-position] duration-300" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_var(--mx)_var(--my),black_20%,transparent_70%)]" />
        <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/30 [box-shadow:inset_0_0_80px_rgba(16,185,129,0.15),0_0_120px_rgba(16,185,129,0.12)] motion-safe:animate-[spin_40s_linear_infinite]">
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_16px_4px_rgba(16,185,129,0.6)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.10),rgba(11,11,15,0.9)_60%)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0b0b0f] to-transparent" />
      <Suspense fallback={<SceneFallback />}>{children}</Suspense>
    </div>
  );
}
