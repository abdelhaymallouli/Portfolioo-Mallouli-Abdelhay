import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal drift.
 *
 * Children are rendered twice: the animation translates the track by exactly
 * -50%, so at the loop point the second copy sits precisely where the first
 * began and the reset is invisible. No measurement, no JS, no resize handler.
 *
 * The duplicate is `aria-hidden` and the whole strip carries one label — a
 * screen reader should hear the list once, not twice, and should not have to
 * traverse a decorative loop to get past it.
 *
 * Edges are masked to transparent so entries fade rather than being clipped
 * mid-glyph at the container boundary.
 */
export function Marquee({
  children,
  className,
  /** Longer is calmer. Scale it with how much content is in the track. */
  duration = "40s",
  label,
  /** Gap between entries. Wider suits sparse tracks. */
  gap = "gap-4",
}: {
  children: ReactNode;
  className?: string;
  duration?: string;
  label: string;
  gap?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("relative overflow-hidden", className)}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className="marquee-track"
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        <div className={cn("flex shrink-0 items-stretch pr-4", gap)}>
          {children}
        </div>
        <div
          aria-hidden="true"
          className={cn("flex shrink-0 items-stretch pr-4", gap)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
