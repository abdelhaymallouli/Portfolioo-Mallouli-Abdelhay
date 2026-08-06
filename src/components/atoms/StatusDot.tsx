"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Availability indicator — a dot with a slow outward pulse.
 *
 * The pulse is gated in JS rather than left to the global reduced-motion
 * block, which only clamps `animation-duration`. A clamped `ping` still
 * renders its final keyframe, leaving a permanent oversized halo around the
 * dot; dropping the element entirely is the only way to actually honour the
 * preference.
 */
export function StatusDot() {
  const reduceMotion = useReducedMotion();

  return (
    <span aria-hidden="true" className="relative flex h-2 w-2">
      {!reduceMotion && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
    </span>
  );
}
