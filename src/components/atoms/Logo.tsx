/**
 * The AM monogram.
 *
 * Drawn as geometry rather than set in a typeface. A monogram has to hold at
 * 16px in a browser tab and at 40px in the nav, and letterforms from a text
 * face — Inter included — lose their counters at the small end because they
 * are drawn for running prose, not for a single glyph pair.
 *
 * The construction: both letters are built from the same 3-stroke chevron
 * skeleton, the A pointing up and the M's shoulders pointing down, sharing one
 * middle stem. That shared stem is the whole idea — it ties the two letters
 * into one mark instead of two initials sitting next to each other, and it is
 * what keeps the silhouette readable when the counters disappear at 16px.
 *
 * Strokes, not fills: one `strokeWidth` controls the weight of the entire
 * mark, so it can be tuned for the tab favicon without redrawing anything.
 */
export function Logo({
  className,
  /** Stroke weight in viewBox units. Heavier reads better at small sizes. */
  weight = 2.4,
  title,
}: {
  className?: string;
  weight?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/*
       * A: apex at the top centre-left, with the crossbar raised above the
       * optical centre so the counter doesn't fill in when the mark is scaled
       * down to a favicon.
       */}
      <path
        d="M4 25 L10.5 7 L17 25"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.9 18.5 H14.1"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
      />

      {/*
       * M: drawn as one continuous stroke so the join at the vertex stays
       * crisp. Its left stem is the A's right leg — the two letters overlap by
       * design, which is what makes this a monogram rather than a lockup.
       */}
      <path
        d="M15 25 V7 L21.5 17 L28 7 V25"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
