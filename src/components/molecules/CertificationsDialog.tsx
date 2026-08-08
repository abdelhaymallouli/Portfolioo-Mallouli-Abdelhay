"use client";

import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { cn } from "@/lib/utils";
import type { Certification } from "@/data/career";

/**
 * The full certifications list, in a modal.
 *
 * The Evidence card shows only the first few — six entries at full height blew
 * out the bento grid's row — so this carries the complete set for anyone who
 * wants it.
 *
 * Built on the same shell as `MilestoneDialog`: portal, frosted backdrop,
 * Escape to close, and the scroll lock applied to <html> rather than <body>,
 * which is the form that works with Lenis. Those behaviours are duplicated
 * rather than shared because the two dialogs render entirely different
 * content; if a third appears, the shell is worth extracting.
 */
export function CertificationsDialog({
  open,
  certifications,
  onClose,
}: {
  open: boolean;
  certifications: Certification[];
  onClose: () => void;
}) {
  const t = useTranslations("certifications");

  /* ── Scroll lock ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";

    return () => {
      html.style.overflow = prev;
    };
  }, [open]);

  /* ── Keyboard: Escape ─────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* ── Backdrop click ───────────────────────────────────────────── */
  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={onBackdropClick}
          aria-modal="true"
          role="dialog"
          aria-labelledby="certifications-dialog-title"
          className={cn(
            "fixed inset-0 z-50",
            "flex items-center justify-center p-4 sm:p-6",
            "bg-surface-dark/60 backdrop-blur-md",
          )}
        >
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

            <div className="max-h-[85vh] overflow-y-auto p-7 sm:p-8">
              {/* ── Header ── */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <Eyebrow as="p" size="xs">
                    {t("credentials")}
                  </Eyebrow>
                  <h2
                    id="certifications-dialog-title"
                    className="mt-3 text-xl font-semibold leading-snug tracking-tight text-ink"
                  >
                    {t("title")}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted">
                    {t("subtitle", { count: certifications.length })}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t("close")}
                  className={cn(
                    "-mr-2 -mt-1 shrink-0",
                    "grid h-9 w-9 place-items-center rounded-xl",
                    "border border-transparent text-muted",
                    "transition-all duration-200 ease-out",
                    "hover:border-line-strong hover:bg-hover hover:text-ink",
                  )}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* ── The full list ── */}
              <ul className="mt-6 flex flex-col divide-y divide-line border-t border-line">
                {certifications.map((cert) => {
                  const body = (
                    <>
                      <span className="min-w-0 flex-1 pr-3">
                        <span className="block text-sm font-medium text-ink">
                          {cert.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">
                          {cert.issuer}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="font-mono text-xs text-muted">
                          {cert.date}
                        </span>
                        {cert.href && (
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-muted transition-transform duration-200 group-hover/cert:-translate-y-0.5 group-hover/cert:translate-x-0.5 group-hover/cert:text-ink"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </>
                  );

                  return (
                    <li key={cert.title}>
                      {cert.href ? (
                        <a
                          href={cert.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/cert flex items-start justify-between gap-2 py-3.5 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          {body}
                        </a>
                      ) : (
                        <span className="flex items-start justify-between gap-2 py-3.5">
                          {body}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
