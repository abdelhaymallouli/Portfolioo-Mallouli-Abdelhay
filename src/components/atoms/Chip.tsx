import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small bordered tag for a technology or label.
 *
 * Two variants existed before this: one with a hover treatment on the skills
 * page and an otherwise identical static twin on case studies. `interactive`
 * now selects between them, so the resting state can only be defined once.
 *
 * Height is fixed at 32px so a row of chips aligns whether or not the entries
 * carry icons.
 */
export function Chip({
  children,
  className,
  interactive = false,
  /** Icon chips use the primary ink; plain text chips step down to secondary. */
  tone = "secondary",
  /** `sm` is the 24px variant used inside cards, where 32px crowds. */
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  tone?: "ink" | "secondary";
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line",
        size === "sm"
          ? "h-6 px-2.5 text-micro"
          : "h-8 px-3.5 text-caption",
        tone === "ink" ? "text-ink" : "text-secondary",
        interactive &&
          "transition-colors duration-200 ease-out hover:border-line-strong hover:bg-hover",
        className,
      )}
    >
      {children}
    </span>
  );
}
