"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Lenis smooth scrolling.
 *
 * Two deliberate constraints:
 *
 * 1. Disabled entirely when `prefers-reduced-motion` is set. Hijacking the
 *    scroll position is exactly the kind of motion that triggers vestibular
 *    discomfort, so we hand control back to the browser rather than just
 *    shortening the duration.
 *
 * 2. Disabled on coarse pointers (touch). Native mobile scrolling already has
 *    platform-tuned momentum; overriding it feels laggy and breaks
 *    pull-to-refresh and overscroll behaviours.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(pointer: coarse)");

    const resolve = () => setEnabled(!motionQuery.matches && !touchQuery.matches);

    resolve();
    motionQuery.addEventListener("change", resolve);
    touchQuery.addEventListener("change", resolve);

    return () => {
      motionQuery.removeEventListener("change", resolve);
      touchQuery.removeEventListener("change", resolve);
    };
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // ~1.1s glide: long enough to read as smooth, short enough that the
        // page still feels responsive to a flick.
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
