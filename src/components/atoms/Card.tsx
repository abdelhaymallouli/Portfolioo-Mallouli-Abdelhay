import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The surface primitive.
 *
 * A white fill on the warm canvas already reads as raised, so the shadow stays
 * shallow — the card should never look heavy. The generous radius is what
 * makes the surface feel soft rather than boxed; it is the single most
 * load-bearing detail in the card's character.
 *
 * `interactive` adds the hover contract used by everything clickable: the
 * border darkens, the card lifts 4px, and the shadow deepens one step.
 */
export function Card({
  children,
  className,
  as: Tag = "div",
  interactive = false,
  /** `lg` is the standard card; `sm` suits dense list rows and chips-in-cards. */
  radius = "lg",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Adds the lift-on-hover treatment. Only for cards that are links. */
  interactive?: boolean;
  radius?: "sm" | "lg";
}) {
  return (
    <Tag
      className={cn(
        "border border-line bg-card",
        radius === "lg" ? "rounded-3xl" : "rounded-xl",
        interactive && [
          "shadow-subtle transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:border-line-strong hover:shadow-lift",
        ],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
