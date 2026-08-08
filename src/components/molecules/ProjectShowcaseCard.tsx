"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";

const EASE = [0, 0, 0.2, 1] as const;

/**
 * Framer-driven link, so the anchor itself can own motion states. Wraps the
 * locale-aware `Link` rather than `next/link`, so a German reader clicking a
 * project stays under `/de`.
 */
const MotionLink = motion.create(Link);

/**
 * Image-led project tile for the showcase grid.
 *
 * The detail panel is hidden until the card is hovered or focused, then fades
 * up over a blurred scrim. Keeping it hidden at rest is what lets the grid
 * read as photography rather than as a wall of text — the imagery carries the
 * first impression and the words arrive on demand.
 *
 * Framer Motion drives it rather than CSS because the panel and its two rows
 * stagger, which `:hover` alone cannot sequence.
 *
 * The variants live on the anchor rather than a wrapper: `whileFocus` fires
 * only for the element that actually receives focus, so a wrapper would leave
 * the panel unreachable by keyboard. One anchor per tile also means one tab
 * stop, and hover state and focus state are the same state.
 */
export function ProjectShowcaseCard({
  project,
  className,
  priority = false,
  sizes,
}: {
  project: Project;
  className?: string;
  /** Set on the first tile only — it sits in the LCP path. */
  priority?: boolean;
  sizes: string;
}) {
  const t = useTranslations("showcase");
  const reduceMotion = useReducedMotion();
  const image = project.cover ?? project.gallery?.[0];

  /*
   * Reduced motion pins the panel open instead of animating it in. Hiding
   * content behind a transition someone has opted out of would make it
   * unreachable, so the trade is a busier grid for a legible one.
   */
  const panel = {
    hidden: { opacity: reduceMotion ? 1 : 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const row = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={cn("group relative", className)}>
      <MotionLink
        href={`/projects/${project.slug}`}
        className="block h-full w-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        initial="hidden"
        whileHover="visible"
        whileFocus="visible"
        animate={reduceMotion ? "visible" : undefined}
      >
        <div className="relative h-full w-full overflow-hidden rounded-3xl bg-subtle">
          {image?.src ? (
            <Image
              src={image.src}
              alt=""
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            /* No screenshot yet — the title still has to carry the tile. */
            <div className="flex h-full w-full items-center justify-center p-8">
              <span className="text-center text-lg font-medium text-muted">
                {project.title}
              </span>
            </div>
          )}

          <motion.div
            variants={panel}
            transition={{ duration: 0.3, ease: EASE }}
            className="surface-glass absolute inset-0 flex flex-col justify-between rounded-3xl p-6 md:p-8"
          >
            <motion.div
              variants={row}
              transition={{ duration: 0.4, ease: EASE }}
              className="space-y-2"
            >
              {/*
               * A real heading, not a styled <p> — this is the accessible
               * name for the tile and belongs in the document outline.
               */}
              <h3 className="text-2xl font-medium leading-8 tracking-tight text-white">
                {project.title}
              </h3>
              <p className="text-pretty text-base leading-6 text-white/80">
                {project.tagline}
              </p>
            </motion.div>

            <motion.div
              variants={row}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex w-full items-end justify-between gap-4"
            >
              <span className="flex items-center gap-1.5 text-sm font-medium text-white">
                {t("viewProject")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-right text-sm font-medium text-white/80">
                {project.categories.slice(0, 2).join(", ")}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </MotionLink>
    </div>
  );
}
