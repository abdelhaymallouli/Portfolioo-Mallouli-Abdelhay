"use client";

import React from "react";
import { motion } from "framer-motion";

/* ─── MINI RING CHART ─────────────────────────────────────────────────────── */
export function RingChart({
  pct,
  color,
  size = 56,
  stroke = 5,
}: {
  pct: number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ * (1 - pct / 100) }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
      />
    </svg>
  );
}

/* ─── SEGMENTED BAR ───────────────────────────────────────────────────────── */
export function SegBar({ pct, color }: { pct: number; color: string }) {
  const filled = Math.round(pct / 10);
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.05 * i }}
          viewport={{ once: true }}
          style={{
            flex: 1,
            height: "5px",
            borderRadius: "3px",
            background: i < filled ? color : "rgba(255,255,255,0.07)",
            boxShadow: i < filled ? `0 0 4px ${color}55` : "none",
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}

/* ─── PILL TAG ────────────────────────────────────────────────────────────── */
export function Pill({ label, color }: { label: string; color?: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "10px",
        letterSpacing: "0.06em",
        padding: "3px 10px",
        borderRadius: "20px",
        border: `1px solid ${color || "rgba(255,255,255,0.07)"}33`,
        background: `${color || "#fff"}0c`,
        color: color || "rgba(255,255,255,0.38)",
      }}
    >
      {label}
    </span>
  );
}

/* ─── SECTION HEADER ──────────────────────────────────────────────────────── */
export function SecHead({
  num,
  title,
}: {
  num: string;
  title: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "40px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono,monospace)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#3b82f6",
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.2)",
          padding: "4px 10px",
          borderRadius: "6px",
          fontWeight: 700,
        }}
      >
        {num}
      </span>
      <div
        style={{
          width: "1px",
          height: "18px",
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <h2
        style={{
          margin: 0,
          fontSize: "21px",
          fontWeight: 800,
          color: "#e8eef8",
          letterSpacing: "-0.03em",
          fontFamily: "var(--font-sans,sans-serif)",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(to right, rgba(255,255,255,0.07), transparent)",
        }}
      />
    </div>
  );
}

/* ─── GLASS CARD ──────────────────────────────────────────────────────────── */
export const GC = ({
  children,
  style = {},
  className = "",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div
    className={className}
    style={{
      background: "rgba(255,255,255,0.028)",
      backdropFilter: "blur(20px) saturate(1.8)",
      WebkitBackdropFilter: "blur(20px) saturate(1.8)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px",
      ...style,
    }}
  >
    {children}
  </div>
);

/* ─── ANIMATION HELPERS ───────────────────────────────────────────────────── */
export const rise = (i = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.09,
    },
  },
});

export const risev = (i = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.09,
    },
  },
  viewport: { once: true },
});
