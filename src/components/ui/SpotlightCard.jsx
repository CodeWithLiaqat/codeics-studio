import { forwardRef, useCallback, useRef } from "react";

/**
 * Glass card with a radial spotlight that tracks the cursor and a glowing perimeter on hover.
 * `as` = element or component (e.g. Link); `glow` = "r,g,b".
 */
const SpotlightCard = forwardRef(function SpotlightCard(
  { as: Tag = "div", className = "", glow = "16,185,129", radius = 480, children, style, ...rest },
  fwdRef
) {
  const innerRef = useRef(null);
  const ref = fwdRef || innerRef;
  const raf = useRef(0);

  const onMove = useCallback((e) => {
    if (e.pointerType === "touch") return;
    cancelAnimationFrame(raf.current);
    const el = e.currentTarget;
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    });
  }, []);

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      style={{ "--sx": "50%", "--sy": "50%", "--glow": glow, "--sr": `${radius}px`, ...style }}
      className={`group/spot glass grain relative isolate overflow-hidden rounded-3xl transition-[border-color,transform,box-shadow] duration-500 ease-spring hover:border-stroke-hover hover:shadow-aura motion-safe:hover:-translate-y-0.5 ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: "radial-gradient(var(--sr) circle at var(--sx) var(--sy), rgba(var(--glow),0.16), transparent 60%)" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-700 group-hover/spot:opacity-100"
        style={{ background: "radial-gradient(260px circle at var(--sx) var(--sy), rgba(var(--glow),0.22), transparent 70%)" }}
      />
      {children}
    </Tag>
  );
});

export default SpotlightCard;
