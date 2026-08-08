"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/data/projects";

/**
 * Screenshot slideshow.
 *
 * One screen at a time with a thumbnail strip beneath it. This replaced a
 * plain vertical stack: ten full-width screenshots ran to several page-heights
 * of scrolling, which pushed everything after the gallery out of reach and
 * made the case study read as a screenshot dump.
 *
 * This is the case study's *supporting* gallery only. The cover and the
 * problem/solution pair images stay as plain inline <Image>s on the page —
 * they are anchored to specific prose and must not move.
 *
 * A carousel was tried here once before and reverted, for two reasons worth
 * not repeating:
 *
 *   1. Every slide shared one fixed frame, so a tall full-page capture and a
 *      wide dashboard could not both fit — one was cropped, the other
 *      letterboxed. Fixed here by measuring: the frame animates to each
 *      image's own aspect ratio, clamped so a very tall capture cannot grow
 *      past the viewport. Nothing is ever cropped.
 *
 *   2. Screens were hidden behind arrows alone, so reaching the tenth meant
 *      nine clicks. Fixed by the thumbnail strip — every screen is visible
 *      and reachable in one click.
 *
 * Keyboard: the strip is a real tablist, so arrow keys move between screens
 * and focus follows. Reduced motion is respected via the global CSS rule.
 */
export function Gallery({ images }: { images: ProjectImage[] }) {
  const shots = images.filter((image) => image.src);
  const baseId = useId();

  const [active, setActive] = useState(0);
  /* Ratios are measured from the loaded files rather than declared, so the
     frame can never disagree with the image inside it. */
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /* Only move focus for keyboard traversal — stealing it on a plain click
     would yank the page around under the pointer. */
  const focusNext = useRef(false);

  const count = shots.length;

  const go = useCallback(
    (index: number, viaKeyboard = false) => {
      focusNext.current = viaKeyboard;
      setActive(((index % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!focusNext.current) return;
    focusNext.current = false;
    tabRefs.current[active]?.focus();
  }, [active]);

  if (count === 0) return null;

  const current = shots[active];
  /* 16:9 until the real ratio is known — a neutral default that keeps the
     frame from jumping on first paint. Clamped: wider than 2:1 wastes the
     column, taller than 3:4 pushes the thumbnails off screen. */
  const ratio = Math.min(Math.max(ratios[active] ?? 16 / 9, 0.75), 2);

  function onKeyDown(event: React.KeyboardEvent) {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: count - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;
    event.preventDefault();
    go(target, true);
  }

  return (
    <div className="group/gallery">
      {/* ---------------- Stage ---------------- */}
      <div className="relative">
        <div
          className="overflow-hidden rounded-xl border border-line bg-subtle transition-[aspect-ratio] duration-300 ease-out"
          style={{ aspectRatio: ratio }}
        >
          {/*
           * All slides stay mounted and fade between each other, so switching
           * never shows an empty frame while the next file decodes. Only the
           * first is eager; the rest load lazily as the browser gets to them.
           */}
          {shots.map((image, index) => (
            <div
              key={image.src}
              id={`${baseId}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${index}`}
              aria-hidden={index !== active}
              className={cn(
                "absolute inset-0 transition-opacity duration-300 ease-out",
                index === active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <Image
                src={image.src!}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 1152px, (min-width: 1024px) 90vw, 100vw"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                /* `contain`: the frame already matches this image's ratio, and
                   contain guarantees nothing is cropped during the transition
                   while the frame is still animating to the new shape. */
                className="object-contain"
                onLoad={(event) => {
                  const img = event.currentTarget;
                  if (!img.naturalWidth || !img.naturalHeight) return;
                  setRatios((prev) =>
                    prev[index]
                      ? prev
                      : { ...prev, [index]: img.naturalWidth / img.naturalHeight },
                  );
                }}
              />
            </div>
          ))}
        </div>

        {/* Arrows. Hidden from assistive tech — the tablist below is the
            accessible control, and these would duplicate it. */}
        {count > 1 && (
          <>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => go(active - 1)}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-card/90 text-ink opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 hover:bg-card focus-visible:opacity-100 group-hover/gallery:opacity-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => go(active + 1)}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-card/90 text-ink opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 hover:bg-card focus-visible:opacity-100 group-hover/gallery:opacity-100"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* ---------------- Caption ---------------- */}
      <div className="mt-4 flex items-start justify-between gap-6">
        <p
          /* Live region: with the image swap being purely visual, this is what
             announces the change to a screen reader. */
          aria-live="polite"
          className="text-pretty text-sm leading-[1.6] text-muted"
        >
          {current.caption ?? current.alt}
        </p>
        {count > 1 && (
          <span className="shrink-0 pt-0.5 font-mono text-micro tabular-nums text-muted">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* ---------------- Thumbnail strip ---------------- */}
      {count > 1 && (
        <div
          role="tablist"
          aria-label="Screenshots"
          onKeyDown={onKeyDown}
          className="mt-5 flex gap-3 overflow-x-auto pb-2"
        >
          {shots.map((image, index) => (
            <button
              key={image.src}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-controls={`${baseId}-panel-${index}`}
              aria-selected={index === active}
              /* Roving tabindex: one stop for the whole strip, arrows move
                 within it — the standard tablist pattern. */
              tabIndex={index === active ? 0 : -1}
              onClick={() => go(index)}
              className={cn(
                "relative h-14 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg border bg-subtle transition-all duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                index === active
                  ? "border-line-strong opacity-100"
                  : "border-line opacity-55 hover:opacity-100",
              )}
            >
              <Image
                src={image.src!}
                alt=""
                fill
                sizes="96px"
                loading="lazy"
                /* Thumbnails crop deliberately — a consistent tile grid reads
                   better here than the letterboxing `contain` would cause. */
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
