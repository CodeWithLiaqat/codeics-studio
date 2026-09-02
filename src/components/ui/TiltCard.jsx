import { useCallback, useRef } from "react";

/** 3D perspective tilt wrapper with a specular sheen. Disabled for touch / reduced motion. */
export default function TiltCard({ className = "", max = 7, children, ...rest }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = useCallback((e) => {
    if (e.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
    });
  }, [max]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <div className="[perspective:1400px]">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ "--rx": "0deg", "--ry": "0deg", "--gx": "50%", "--gy": "50%" }}
        className={`group/tilt relative transition-transform duration-500 ease-spring will-change-transform [transform:rotateX(var(--rx))_rotateY(var(--ry))] [transform-style:preserve-3d] ${className}`}
        {...rest}
      >
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{ background: "radial-gradient(500px circle at var(--gx) var(--gy), rgba(255,255,255,0.10), transparent 60%)" }}
        />
      </div>
    </div>
  );
}
