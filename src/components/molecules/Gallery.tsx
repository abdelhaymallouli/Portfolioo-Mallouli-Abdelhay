"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/data/projects";

/**
 * Full-width slideshow gallery.
 *
 * Layout follows the WhatsApp media viewer: the image takes the full column
 * width, navigation arrows sit over it, and a thumbnail strip is overlaid
 * along the bottom edge of the frame. The caption sits directly beneath.
 *
 * On the frame's height
 * ---------------------
 * The frame used to be a hardcoded `aspect-[16/10]`. That is wrong for this
 * content: these are full-page captures running as tall as 1:2.2, so a fixed
 * 16:10 box rendered them as a narrow sliver stranded in empty space.
 *
 * It now uses a fixed *viewport-relative* height with `object-contain`. Every
 * slide gets the same box regardless of its shape — so switching slides never
 * reflows the page — while each image scales to fit inside it whole. That
 * keeps tall and wide captures in one carousel without cropping either.
 *
 * Interaction notes:
 *  - The frame is a labelled group with arrow-key support, so it is fully
 *    operable from the keyboard.
 *  - Slide changes are announced through a polite live region rather than by
 *    moving focus, which would jump the page mid-read.
 */
export function Gallery({ images }: { images: ProjectImage[] }) {
  const [rawIndex, setRawIndex] = useState(0);
  // Direction decides which side the incoming slide enters from.
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();

  const count = images.length;

  /*
   * Clamp during render rather than repairing in an effect: if the image list
   * shrinks, an effect would paint one frame against a stale index first.
   */
  const index = count > 0 ? Math.min(rawIndex, count - 1) : 0;

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      // Wrap both ways so neither end is a dead stop.
      setRawIndex((next + count) % count);
    },
    [index, count],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  if (count === 0) return null;

  const active = images[index];

  const slide = {
    enter: (dir: number) => ({ opacity: 0, x: reduceMotion ? 0 : dir * 20 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduceMotion ? 0 : dir * -20 }),
  };

  return (
    <div>
      {/* ---------------- Frame ---------------- */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Project screenshots"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative isolate overflow-hidden rounded-lg border border-line bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {/* Capped against the viewport so a tall capture can't run past the
            fold, with a floor so a wide one still has presence. */}
        <div className="relative h-[60vh] max-h-[42rem] min-h-[22rem] w-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              {active.src ? (
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="(min-width: 1280px) 1100px, (min-width: 1024px) 90vw, 100vw"
                  /*
                   * `contain`, and deliberately anchored to the top: on a tall
                   * full-page capture the header is the part that identifies
                   * the screen, so it is what should survive letterboxing.
                   */
                  className="object-contain object-top"
                />
              ) : (
                <div
                  role="img"
                  aria-label={active.alt}
                  className="flex h-full w-full items-center justify-center p-6 text-center"
                >
                  <span className="font-mono text-xs text-muted">
                    {active.alt}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <>
            {/* Arrows, centred on the image area rather than the whole frame
                so the thumbnail strip doesn't push them off-centre. */}
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous screenshot"
              className="absolute left-3 top-[calc(50%-2.5rem)] grid h-10 w-10 place-items-center rounded-full border border-line bg-card/90 text-secondary shadow-subtle backdrop-blur transition-colors duration-200 hover:border-line-strong hover:text-ink"
            >
              <ChevronLeft className="h-4.5 w-4.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next screenshot"
              className="absolute right-3 top-[calc(50%-2.5rem)] grid h-10 w-10 place-items-center rounded-full border border-line bg-card/90 text-secondary shadow-subtle backdrop-blur transition-colors duration-200 hover:border-line-strong hover:text-ink"
            >
              <ChevronRight className="h-4.5 w-4.5" aria-hidden="true" />
            </button>

            {/* Counter */}
            <span className="absolute right-3 top-3 rounded-full border border-line bg-card/90 px-2.5 py-1 font-mono text-micro text-secondary backdrop-blur">
              <span className="tabular">{index + 1}</span>
              <span aria-hidden="true"> / </span>
              <span className="tabular">{count}</span>
            </span>

            {/* Thumbnail strip, overlaid inside the frame. */}
            <div
              role="tablist"
              aria-label="Choose screenshot"
              className="absolute inset-x-0 bottom-0 flex justify-center gap-2 overflow-x-auto border-t border-line bg-card/85 px-3 py-2.5 backdrop-blur"
            >
              {images.map((image, i) => (
                <button
                  key={image.src ?? image.alt}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Screenshot ${i + 1}: ${image.alt}`}
                  onClick={() => go(i)}
                  className={cn(
                    "relative h-11 w-16 shrink-0 overflow-hidden rounded border bg-subtle transition-all duration-200",
                    i === index
                      ? "border-ink opacity-100"
                      : "border-line opacity-50 hover:opacity-90",
                  )}
                >
                  {image.src && (
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ---------------- Caption ---------------- */}
      <div className="mt-5 min-h-[3.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className="max-w-[45rem] text-pretty text-body leading-[1.65] text-secondary"
          >
            {active.caption ?? active.alt}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Announce changes without stealing focus. */}
      <p aria-live="polite" className="sr-only">
        Screenshot {index + 1} of {count}. {active.alt}
      </p>
    </div>
  );
}
