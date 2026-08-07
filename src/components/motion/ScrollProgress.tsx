"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Reading-progress bar pinned to the top of the viewport.
 *
 * Driven by `scaleX` on the GPU rather than animating `width`, so it never
 * triggers layout during scroll.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Smooths the jitter of raw scroll input.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  );
}
