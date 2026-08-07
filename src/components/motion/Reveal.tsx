"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared motion constants.
 *
 * Reveals are deliberately understated: a short rise and a fade, nothing else.
 * The user should register that the page feels composed, not that something
 * animated. Durations sit at the top of the 150–250ms band because entrances
 * read slower than hovers at the same number.
 *
 * Opacity and transform only — both composite on the GPU, so a long list
 * revealing at once never costs a repaint.
 */
const EASE = [0, 0, 0.2, 1] as const;
const DURATION = 0.45;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** Vertical travel in px. Kept small — this is a settle, not a slide. */
  offset?: number;
  className?: string;
  as?:
    | "div"
    | "section"
    | "li"
    | "article"
    | "header"
    | "span"
    | "p"
    | "tr";
  /**
   * Re-runs the entrance every time the element re-enters view, and reverses
   * it on the way out.
   *
   * Off by default, and it should stay that way almost everywhere: content
   * that re-animates on scroll-back reads as instability. The exception is a
   * section whose whole point is the scrubbing motion — there, a one-shot
   * reveal leaves elements stranded when the user scrolls up.
   */
  repeat?: boolean;
}

/** Scroll-triggered entrance. Fires once, when ~20% of the element is in view. */
export function Reveal({
  children,
  delay = 0,
  offset = 12,
  className,
  as = "div",
  repeat = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION, delay, ease: EASE },
    },
  };

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: !repeat, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Orchestration parent. Children wrapped in `RevealItem` inherit the stagger,
 * so lists sequence without hand-tuned per-item delays.
 */
export function RevealGroup({
  children,
  stagger = 0.06,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Child of `RevealGroup`. Timing comes from the parent. */
export function RevealItem({
  children,
  className,
  offset = 10,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
  as?: "div" | "li";
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: offset },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION, ease: EASE },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
