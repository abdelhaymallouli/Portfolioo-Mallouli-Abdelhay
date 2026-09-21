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
        <svg width="180" height="180" viewBox="0 0 1000 1000" fill="none">
          <path
            d="M425.5,706l-1.56-84.81s-5.21-40.14-63.58-29.58a5.09,5.09,0,0,1-5.77-3.57c-1-3.38-1.76-8.27-.1-13a5.1,5.1,0,0,1,5-3.41c13.84.59,62.92.31,66-37.52,2.57-31.81,1.08-53.34-1.52-62.71-1.49-5.35-2-11-5.9-15-5.52-5.56-15-8.52-28.55,9.27-17.1,22.39-25,24-133.64,240.34H152.55L367,334.87c1.4-2.4,3.31-4.43,4.77-6.79,8.78-14.26,42.64-52.93,80.42-22.93C466.08,316.2,468,331.94,468,352.51V706l-42.53,0"
            fill={BRAND_INK}
          />
          <path
            d="M526.63,538.84c-.07-1.49-.16-3.08-.19-4.75.13-7.16.31-13.8.13-19.94v-1.36c-.62-20.32-.59-34.28,1.39-41.41,1.5-5.35,2-11,5.91-15,5.5-5.56,15-8.53,28.54,9.25,17.11,22.4,25.06,23.95,133.7,240.31H799.38L585,334.92c-1.39-2.41-3.32-4.44-4.79-6.82-8.76-14.25-42.63-52.92-80.4-22.91-13.9,11-15.85,26.79-15.85,47.34V706h42.52l.14-62.4V619.22Z"
            fill={BRAND_INK}
          />
          <circle cx="829.16" cy="687.59" r="18.29" fill={BRAND_INK} />
        </svg>
      </div>
    ),
    size,
  );
}
