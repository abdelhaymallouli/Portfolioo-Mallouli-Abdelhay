import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/atoms/Eyebrow";

interface SectionHeadingProps {
  /** Small label above the title. Use sparingly — it's a signpost, not decor. */
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  /** Centres the block and its measure. Used by the full-width sections. */
  align?: "left" | "center";
  /**
   * Which ground this heading sits on.
   *
   * The absence of this prop is what fragmented the type scale: because the
   * component hardcoded `text-ink`, every dark section — About, the footer
   * CTA, the milestone dialog — had to hand-roll its own `<h2>`, and each
   * picked slightly different sizes. Five implementations of one heading.
   *
   * With a tone the component covers both grounds, so there is exactly one
   * section-title scale on the site.
   */
  tone?: "light" | "dark";
}

/**
 * The section title block: eyebrow, heading, description.
 *
 * Tracking is tight (-0.025em) across the display sizes — Inter runs wide at
 * scale, and without the optical correction a 48px heading reads loose beside
 * the body copy underneath it.
 *
 * Sizes come from the named type scale (`display-sm|md|lg`) rather than
 * arbitrary rem values, so the three breakpoints step in a documented ratio
 * instead of whatever each caller happened to type.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  children,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow className={cn("mb-5", dark && "text-white/50")}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}

      <Reveal delay={0.04}>
        <h2
          className={cn(
            "max-w-[24ch] text-balance font-medium tracking-tight",
            "text-display-sm sm:text-display-md lg:text-display-lg",
            dark ? "text-white" : "text-ink",
            centered && "mx-auto",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.08}>
          <p
            className={cn(
              "measure mt-5 text-pretty text-lead",
              /* `white/60` is 6.8:1 on the dark ground; `/50` would be 5.2:1
                 and is reserved for labels, not running prose. */
              dark ? "text-white/60" : "text-secondary",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}
