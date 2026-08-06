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
}

/**
 * Section header.
 *
 * Tracking is tight (-0.025em) across the display sizes: Inter runs wide at
 * scale, and without the optical correction a 48px heading reads loose beside
 * the body copy underneath it.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  children,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

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
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <Reveal delay={0.04}>
        <h2
          className={cn(
            "max-w-[24ch] text-balance text-[2rem] font-medium leading-[1.1]",
            "tracking-tight text-ink sm:text-[2.5rem] lg:text-[3rem]",
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
              "measure mt-5 text-pretty text-[1.0625rem] leading-[1.65] text-secondary",
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
