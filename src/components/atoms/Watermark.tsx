import { cn } from "@/lib/utils";

/**
 * Oversized ghost word behind a section.
 *
 * Purely decorative: it repeats the section's real heading at display size and
 * low opacity to give the block a sense of scale that the readable type can't
 * carry on its own. Because it duplicates content that is already announced,
 * it is `aria-hidden` and never part of the document outline.
 *
 * It sits in the normal flow at `absolute` against the section's own stacking
 * context, so the caller must position the section `relative` and place real
 * content above it with `z-10`. Overflow is clipped by the section, not here —
 * at 280px the word is wider than the viewport by design.
 */
export function Watermark({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "watermark pointer-events-none absolute select-none whitespace-nowrap",
        "text-ghost-sm md:text-ghost-md lg:text-ghost-lg",
        className,
      )}
    >
      {children}
    </span>
  );
}
