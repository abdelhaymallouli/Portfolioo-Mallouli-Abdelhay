import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The small mono label that signposts a section or a field.
 *
 * The string lives here so tracking and colour can never drift between call
 * sites — it had been hand-written in a dozen places, each free to pick its
 * own size and opacity.
 *
 * Renders as a `<p>` by default. Pass `as="h2"`/`as="h3"` where it is
 * genuinely the heading for its block — a case-study section label, for
 * instance — so the document outline stays correct.
 */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
  tone = "light",
  size = "sm",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** `dark` for the inverted grounds — Hero, About, Footer. */
  tone?: "light" | "dark";
  /** `xs` is the 11px variant used inside cards and dialogs. */
  size?: "xs" | "sm";
}) {
  return (
    <Tag
      className={cn(
        "font-mono uppercase tracking-[0.12em]",
        size === "xs" ? "text-micro" : "text-xs",
        /* `white/50` is 5.2:1 — the documented floor for text on dark. */
        tone === "dark" ? "text-white/50" : "text-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
