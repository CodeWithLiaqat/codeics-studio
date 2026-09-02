/** Soft aurora mesh: drifting blurred emerald + cyan blobs. position = "top" | "bottom". */
export default function AuroraGlow({ className = "", position = "top", strength = 1 }) {
  const y = position === "top" ? "top-[-20%]" : "bottom-[-30%]";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 -z-10 h-[70%] overflow-hidden ${y} ${className}`}>
      <div
        className="absolute left-[10%] top-[10%] h-[60%] w-[55%] rounded-full motion-safe:animate-aurora"
        style={{ background: `radial-gradient(closest-side, rgba(16,185,129,${0.22 * strength}), transparent 70%)`, filter: "blur(70px)" }}
      />
      <div
        className="absolute right-[5%] top-[25%] h-[55%] w-[45%] rounded-full motion-safe:animate-aurora [animation-delay:-9s] [animation-direction:reverse]"
        style={{ background: `radial-gradient(closest-side, rgba(34,211,238,${0.14 * strength}), transparent 70%)`, filter: "blur(80px)" }}
      />
      <div
        className="absolute left-[35%] top-[40%] h-[40%] w-[40%] rounded-full motion-safe:animate-aurora [animation-delay:-4s] [animation-duration:24s]"
        style={{ background: `radial-gradient(closest-side, rgba(255,255,255,${0.06 * strength}), transparent 70%)`, filter: "blur(60px)" }}
      />
    </div>
  );
}
