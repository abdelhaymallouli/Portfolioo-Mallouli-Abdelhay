import { ImageResponse } from "next/og";
import { BRAND_INK, BRAND_PRIMARY } from "@/lib/brand";

/**
 * The browser-tab icon: the AM monogram, ink on the brand fill.
 *
 * Generated at build time from the same geometry as `@/components/atoms/Logo`
 * rather than checked in as a binary, so the mark in the tab and the mark in
 * the nav cannot drift apart.
 *
 * A filled ground rather than a transparent one: a tab favicon is composited
 * against whatever chrome the browser is wearing, and an ink-on-transparent
 * mark disappears entirely in dark mode. The filled tile also gives the
 * silhouette a fixed edge, which is what makes it findable in a row of tabs.
 *
 * Note this is deliberately *not* the `Logo` component — ImageResponse runs
 * Satori, which renders a flexbox/SVG subset rather than the DOM, so the
 * markup is inlined here instead of imported.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_PRIMARY,
          /* ~22% of the box, matching the nav tile's rounding at this size. */
          borderRadius: 7,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Heavier than the nav mark: at 32px the hairlines would fill in. */}
          <path
            d="M4 25 L10.5 7 L17 25"
            stroke={BRAND_INK}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.9 18.5 H14.1"
            stroke={BRAND_INK}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <path
            d="M15 25 V7 L21.5 17 L28 7 V25"
            stroke={BRAND_INK}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
