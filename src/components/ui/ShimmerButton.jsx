import { forwardRef, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/** Primary CTA: emerald fill, sweeping shimmer highlight, glow aura, magnetic hover, click scale. */
const ShimmerButton = forwardRef(function ShimmerButton(
  { to, href, icon = true, magnetic = true, className = "", children, ...rest },
  fwdRef
) {
  const innerRef = useRef(null);
  const ref = fwdRef || innerRef;

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !magnetic || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate3d(${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px, 0)`;
  };
  const onLeave = () => ref.current && (ref.current.style.transform = "");

  const cls = `group relative inline-flex min-h-[48px] items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 text-sm font-medium text-obsidian shadow-aura transition-[transform,box-shadow,background-color] duration-300 ease-spring will-change-transform hover:bg-accent-soft hover:shadow-aura-lg active:scale-[0.97] ring-focus ${className}`;
  const content = (
    <>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.55)_50%,transparent_70%)] transition-transform duration-700 ease-spring group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      {icon && <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />}
    </>
  );
  const props = { ref, onMouseMove: onMove, onMouseLeave: onLeave, className: cls, ...rest };
  if (to) return <Link to={to} {...props}>{content}</Link>;
  if (href) return <a href={href} {...props}>{content}</a>;
  return <button type="button" {...props}>{content}</button>;
});

export default ShimmerButton;
