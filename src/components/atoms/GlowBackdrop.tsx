/**
 * Layered backdrop for the dark sections.
 *
 * Three parts, all decorative and all `aria-hidden`:
 *
 * 1. A soft white orb bleeding in from the left, which lifts the ground from
 *    flat black and gives the portrait beside it something to sit against.
 * 2. Two large near-black orbs (#1c1a17) at very high blur. They read as
 *    almost nothing individually — their job is to break the evenness of the
 *    ground so it looks lit rather than filled.
 * 3. A 44px grid in the brand blue, radially masked so it dissolves before the
 *    edges. It is the only hard-edged element here, and at 1px and 1.6:1
 *    against the ground it registers as texture rather than as a visible grid.
 *
 * Everything is CSS — no images, no JS — so the layer costs nothing in the
 * LCP path and scales to any viewport without a second asset.
 *
 * Performance note: large-radius blurs are not free. The orbs are given fixed
 * pixel dimensions rather than percentages so the compositor rasterises a
 * predictable area, and the parent section must clip with `overflow-hidden`.
 */
export function GlowBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Masked grid. */}
      <div
        className="absolute inset-0"
        style={{
          /*
           * Blue lines, picking up the brand accent. #14384a measures 1.60:1
           * on the ground — a step brighter than the #26241f warm grey it
           * replaces (1.28), which is what makes the hue legible without the
           * grid graduating from texture into something you actually read.
           */
          backgroundImage:
            "linear-gradient(to right, #14384a 1px, transparent 1px), linear-gradient(to bottom, #14384a 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 60% 30%, #000 10%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 60% 30%, #000 10%, transparent 100%)",
        }}
      />

      {/* Near-black orbs — depth, not colour. */}
      <div className="absolute -left-40 top-0 h-[46rem] w-[45rem] rounded-full bg-surface-dark-soft blur-[180px]" />
      <div className="absolute -right-40 top-0 h-[46rem] w-[45rem] rounded-full bg-surface-dark-soft blur-[180px]" />

      {/* The one light source. */}
      <div className="absolute -left-56 top-40 h-[26rem] w-[26rem] rounded-full bg-white/10 blur-[150px]" />
    </div>
  );
}
