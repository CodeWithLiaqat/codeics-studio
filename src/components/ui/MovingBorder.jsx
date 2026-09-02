import { forwardRef } from "react";
import { Link } from "react-router-dom";

/**
 * Pill with an animated conic gradient beam travelling around its border.
 * Renders <Link> when `to`, <a> when `href`, else <button>.
 */
const MovingBorder = forwardRef(function MovingBorder(
  { to, href, className = "", innerClassName = "", duration = 6, children, ...rest },
  ref
) {
  const shell = `group relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-full p-px text-sm font-medium transition-transform duration-300 ease-spring active:scale-[0.97] ring-focus ${className}`;
  const beam = (
    <span aria-hidden="true" className="absolute inset-[-100%] motion-safe:animate-spin-slow" style={{ animationDuration: `${duration}s` }}>
      <span className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_60%,rgba(16,185,129,0.9)_78%,rgba(34,211,238,0.9)_86%,transparent_100%)]" />
    </span>
  );
  const inner = (
    <span className={`relative inline-flex h-full w-full items-center justify-center gap-2 rounded-full bg-obsidian-50/95 px-6 py-3 text-zinc-100 backdrop-blur-xl transition-colors duration-300 group-hover:bg-obsidian-100 ${innerClassName}`}>
      {children}
    </span>
  );
  const props = { ref, className: shell, ...rest };
  if (to) return <Link to={to} {...props}>{beam}{inner}</Link>;
  if (href) return <a href={href} {...props}>{beam}{inner}</a>;
  return <button type="button" {...props}>{beam}{inner}</button>;
});

export default MovingBorder;
