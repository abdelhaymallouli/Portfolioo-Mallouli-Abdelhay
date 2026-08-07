"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Count-up number, triggered when scrolled into view.
 *
 * The animated digits are `aria-hidden` with the final value exposed via
 * sr-only text — a screen reader should hear "70%", not a stream of
 * intermediate numbers.
 */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => spring.on("change", setDisplay), [spring]);

  const rendered = reduceMotion ? value : display;
  const label = `${prefix}${value.toFixed(decimals)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {prefix}
        {rendered.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
