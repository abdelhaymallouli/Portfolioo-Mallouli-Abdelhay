import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { BRAND_INK, BRAND_PRIMARY } from "@/lib/brand";
import { routing } from "@/i18n/routing";
import { SITE } from "@/data/content";

/**
 * The social share card.
 *
 * This is what LinkedIn, Slack, WhatsApp and Twitter render when the site is
 * linked. Without it those unfurl as a bare text row — and worse, the metadata
 * already declares `twitter:card: summary_large_image`, which promises a large
 * image and produces an empty frame when none exists.
 *
 * 1200×630 is the format every platform crops from; going smaller gets
 * upscaled and going larger is discarded.
 *
 * Generated per locale, so a German share shows the German role line.
 *
 * As with the icons, this runs through Satori rather than the DOM: no
 * stylesheet, no custom properties, no Tailwind. Colours come from the shared
 * constants in `@/lib/brand`, which mirror the CSS tokens.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = `${SITE.name} — portfolio`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: 72,
          /* Satori has no font fallback chain — it uses what it is given. */
          fontFamily: "sans-serif",
        }}
      >
        {/* Monogram tile, the same mark as the favicon and the nav. */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: BRAND_PRIMARY,
              borderRadius: 14,
            }}
          >
            <svg width="64" height="64" viewBox="0 0 1000 1000" fill="none">
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
          <span style={{ fontSize: 30, color: "#ffffff", letterSpacing: -0.5 }}>
            {SITE.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 76,
              color: "#ffffff",
              letterSpacing: -2.5,
              lineHeight: 1.05,
            }}
          >
            {t("role")}
          </span>

          {/* The accent rule — the one piece of brand colour in the frame. */}
          <div
            style={{
              width: 180,
              height: 5,
              background: BRAND_PRIMARY,
              borderRadius: 3,
            }}
          />

          <span style={{ fontSize: 30, color: "rgba(255,255,255,0.65)" }}>
            {SITE.location}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
