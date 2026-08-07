/**
 * The dark hero backdrop: grid, starfield, horizon and spotlight.
 *
 * Four stacked layers, all decorative and all `aria-hidden`:
 *
 * 1. A faint square grid, radially masked so it dissolves before the edges —
 *    it gives the black ground depth without ever being consciously read.
 * 2. An overhead spotlight, as though the panel were lit from above and
 *    behind the nav. This is what keeps the top third from going dead flat.
 * 3. A sparse starfield. Positions are hand-declared rather than random so
 *    the field is identical on server and client; `Math.random()` here would
 *    produce a hydration mismatch on every load.
 * 4. The horizon: an oversized ellipse pushed mostly below the fold with a
 *    warm lit edge and a bloom above it. Its arc is what stops the panel
 *    reading as a flat black rectangle, and it is the only colour here.
 *
 * All CSS and inline markup — no images, so the layer costs nothing in the
 * LCP path and scales to any viewport without a second asset.
 */

/** Star coordinates as viewport percentages, with per-star opacity. */
const STARS = [
  [12, 18, 0.35], [23, 42, 0.2], [31, 12, 0.45], [38, 61, 0.25],
  [44, 27, 0.3], [52, 8, 0.4], [58, 48, 0.22], [64, 33, 0.35],
  [71, 15, 0.28], [77, 55, 0.4], [83, 24, 0.25], [89, 40, 0.3],
  [8, 55, 0.25], [17, 68, 0.3], [47, 72, 0.2], [67, 66, 0.28],
  [93, 62, 0.22], [28, 34, 0.2], [55, 22, 0.25], [86, 9, 0.35],
  [5, 30, 0.3], [35, 47, 0.22], [61, 12, 0.3], [74, 38, 0.2],
  [96, 27, 0.28], [20, 8, 0.25], [42, 15, 0.35], [80, 68, 0.24],
] as const;

export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* 1. Grid, faded out toward the edges. */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 75% 55% at 50% 35%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 50% 35%, #000 30%, transparent 100%)",
        }}
      />

      {/* 2. Overhead spotlight. */}
      <div
        className="absolute inset-x-0 top-0 h-[45%]"
        style={{
          background:
            "radial-gradient(ellipse 45% 100% at 50% 0%, rgba(255,217,159,0.16), transparent 70%)",
        }}
      />

      {/* 3. Starfield. */}
      <div className="absolute inset-0">
        {STARS.map(([left, top, opacity], i) => (
          <span
            key={i}
            className="absolute h-px w-px rounded-full bg-white"
            style={{ left: `${left}%`, top: `${top}%`, opacity }}
          />
        ))}
      </div>

      {/*
       * 4. Horizon. The ellipse is wider than the viewport and sits low, so
       * only the crown of its arc is visible — the same read as a planet limb.
       */}
      <div className="absolute inset-x-0 top-[62%] flex justify-center">
        <div className="relative aspect-[2/1] w-[180%] max-w-none sm:w-[140%] lg:w-[115%]">
          {/* Warm bloom rising off the arc. */}
          <div
            className="absolute inset-x-0 top-0 h-1/2 blur-[90px]"
            style={{
              background:
                "radial-gradient(ellipse 55% 100% at 50% 100%, rgba(250,154,99,0.5), transparent 70%)",
            }}
          />
          {/* Tighter core, so the centre of the arc reads hotter. */}
          <div
            className="absolute inset-x-0 top-0 h-1/3 blur-[40px]"
            style={{
              background:
                "radial-gradient(ellipse 28% 100% at 50% 100%, rgba(255,217,159,0.45), transparent 70%)",
            }}
          />
          {/* The lit edge itself, drawn as a gradient border. */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid transparent",
              background:
                "linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(180deg, rgba(255,236,209,0.95), rgba(250,154,99,0.2) 25%, transparent 55%) border-box",
            }}
          />
        </div>
      </div>
    </div>
  );
}
