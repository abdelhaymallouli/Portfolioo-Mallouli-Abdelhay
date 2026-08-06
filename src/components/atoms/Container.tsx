import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** `reading` constrains to the 720px prose measure. */
  width?: "page" | "reading";
}

/**
 * Horizontal layout constraint.
 * Single place to tune page width so every section aligns to the same grid.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  width = "page",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        // Reads the layout tokens, so page width is tuned in one place.
        width === "reading" ? "max-w-reading" : "max-w-page",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Top padding for a sub-page's own header block.
 *
 * Deeper than a normal section because it has to clear the floating nav as
 * well as give the page title air. Previously hand-written identically on all
 * three sub-pages, which is exactly the drift a token prevents.
 */
export function PageHeader({
  children,
  className,
  width = "page",
}: {
  children: ReactNode;
  className?: string;
  width?: "page" | "reading";
}) {
  return (
    <Container
      width={width}
      className={cn("pt-36 pb-section-sm md:pt-44 md:pb-section", className)}
    >
      {children}
    </Container>
  );
}

/**
 * Vertical section rhythm — 120px desktop, 80px mobile, per the spacing
 * system. Applied consistently so the page breathes at a predictable beat.
 */
export function Section({
  children,
  className,
  id,
  /** `subtle` paints the alternating band background. */
  tone = "canvas",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "canvas" | "subtle";
}) {
  return (
    <section
      id={id}
      className={cn(
        // Rhythm comes from the spacing tokens, not hand-written values.
        "scroll-mt-24 py-section-sm md:py-section",
        tone === "subtle" && "bg-subtle",
        className,
      )}
    >
      {children}
    </section>
  );
}
