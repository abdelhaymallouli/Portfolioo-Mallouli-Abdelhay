import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The small mono label that signposts a section.
 *
 * This string was previously written out in eight separate places; keeping it
 * here means the tracking and colour can never drift between them.
 *
 * Renders as a `<p>` by default. Pass `as="h2"` where it is genuinely the
 * heading for its block — a case-study section label, for instance — so the
 * document outline stays correct.
 */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-xs uppercase tracking-[0.12em] text-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
