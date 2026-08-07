"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Chip } from "@/components/atoms/Chip";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { cn } from "@/lib/utils";

export interface MilestoneDetail {
  year: string;
  kind: string;
  title: string;
  meta: string;
  detail: string;
  details?: string[];
  tech?: string[];
  certificate?: { name: string; url?: string };
}

const KIND_PILL: Record<string, string> = {
  Education: "bg-dusty-green/15 text-dusty-green border border-dusty-green/30",
  Role:      "bg-ink/10 text-ink border border-ink/20",
  Outlook:   "bg-line-strong/20 text-muted border border-line-strong",
};

/**
 * MilestoneDialog — custom fixed overlay modal.
 *
 * Replaced the native <dialog> approach because:
 * - Lenis smooth scroll fights `overflow: hidden` on `<html>`
 * - `::backdrop` styling is limited in Tailwind
 * - Framer Motion AnimatePresence gives us a proper enter/exit animation
 *
 * Scroll lock: we set overflow:hidden directly on <html> (not body) which
 * works correctly with Lenis by preventing its own scrolling.
 */
export function MilestoneDialog({
  milestone,
  onClose,
}: {
  milestone: MilestoneDetail | null;
  onClose: () => void;
}) {
  /* ── Scroll lock ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!milestone) return;

    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";

    return () => {
      html.style.overflow = prev;
    };
  }, [milestone]);

  /* ── Keyboard: Escape ─────────────────────────────────────────── */
  useEffect(() => {
    if (!milestone) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [milestone, onClose]);

  /* ── Backdrop click ───────────────────────────────────────────── */
  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  /* Render into a portal so z-index is never clipped by any ancestor */
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {milestone && (
        /* ── Backdrop ── */
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={onBackdropClick}
          aria-modal="true"
          role="dialog"
          aria-labelledby="milestone-dialog-title"
          className={cn(
            "fixed inset-0 z-50",
            "flex items-center justify-center p-4 sm:p-6",
            /* Frosted glass backdrop */
            "bg-surface-dark/60 backdrop-blur-md",
          )}
        >
          {/* ── Panel ── */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative w-full max-w-xl",
              "rounded-3xl border border-line bg-card shadow-lift",
              "overflow-hidden",
            )}
          >
            {/* Top accent gradient bar */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
            />

            {/* Scrollable inner area */}
            <div className="max-h-[85vh] overflow-y-auto p-7 sm:p-8">

              {/* ── Header ── */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">

                  {/* Year + kind badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-ink px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-[0.1em] text-primary">
                      {milestone.year}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
                        KIND_PILL[milestone.kind] ?? KIND_PILL.Outlook,
                      )}
                    >
                      {milestone.kind}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    id="milestone-dialog-title"
                    className="mt-4 text-xl font-semibold leading-snug tracking-tight text-ink"
                  >
                    {milestone.title}
                  </h2>

                  {/* Meta */}
                  {milestone.meta && (
                    <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted">
                      {milestone.meta}
                    </p>
                  )}
                </div>

                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className={cn(
                    "shrink-0 -mr-2 -mt-1",
                    "grid h-9 w-9 place-items-center rounded-xl",
                    "text-muted border border-transparent",
                    "transition-all duration-200 ease-out",
                    "hover:border-line-strong hover:bg-hover hover:text-ink",
                  )}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Divider */}
              <div className="mt-6 border-t border-line" />

              {/* ── Summary ── */}
              {milestone.detail && (
                <p className="mt-5 text-pretty text-body leading-[1.7] text-secondary">
                  {milestone.detail}
                </p>
              )}

              {/* ── Detail points ── */}
              {milestone.details && milestone.details.length > 0 && (
                <ul className="mt-6 flex flex-col gap-3.5 border-t border-line pt-6">
                  {milestone.details.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-pretty text-body leading-[1.65] text-secondary"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {/* ── Tech stack ── */}
              {milestone.tech && milestone.tech.length > 0 && (
                <div className="mt-6 border-t border-line pt-6">
                  <Eyebrow as="p" size="xs" className="mb-3">
                    Stack
                  </Eyebrow>
                  <ul className="flex flex-wrap gap-2">
                    {milestone.tech.map((item) => (
                      <li key={item}>
                        <Chip>{item}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── Certificate ── */}
              {milestone.certificate && (
                <div className="mt-6 border-t border-line pt-6">
                  {milestone.certificate.url ? (
                    <a
                      href={milestone.certificate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                    >
                      <span className="link-underline">
                        {milestone.certificate.name}
                      </span>
                    </a>
                  ) : (
                    <p className="text-sm text-muted">
                      {milestone.certificate.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
