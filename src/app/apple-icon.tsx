import { ImageResponse } from "next/og";
import { BRAND_INK, BRAND_PRIMARY } from "@/lib/brand";

/**
 * The iOS home-screen icon.
 *
 * Same mark as `icon.tsx`, drawn larger and with real padding: iOS applies its
 * own rounded mask and renders the tile at a size where a mark filling the
 * full square looks cramped against the corners.
 *
 * No border radius here — the OS mask supplies it, and rounding twice leaves a
 * fringe of the fill colour outside the mask.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <svg width="122" height="122" viewBox="0 0 32 32" fill="none">
          <path
            d="M4 25 L10.5 7 L17 25"
            stroke={BRAND_INK}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.9 18.5 H14.1"
            stroke={BRAND_INK}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          <path
            d="M15 25 V7 L21.5 17 L28 7 V25"
            stroke={BRAND_INK}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
