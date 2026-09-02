import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import ShimmerButton from "./ShimmerButton";
import MovingBorder from "./MovingBorder";

/**
 * Backwards-compatible wrapper used across pages.
 * variant="primary" → ShimmerButton (emerald, shimmer sweep, aura)
 * variant="ghost"   → MovingBorder (animated gradient border beam)
 */
const MagneticButton = forwardRef(function MagneticButton({ variant = "primary", icon = true, children, ...rest }, ref) {
  if (variant === "ghost") {
    return (
      <MovingBorder ref={ref} {...rest}>
        {children}
        {icon && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
      </MovingBorder>
    );
  }
  return (
    <ShimmerButton ref={ref} icon={icon} {...rest}>
      {children}
    </ShimmerButton>
  );
});

export default MagneticButton;
