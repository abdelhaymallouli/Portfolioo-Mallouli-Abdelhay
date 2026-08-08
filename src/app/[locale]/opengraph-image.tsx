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
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <path
                d="M4 25 L10.5 7 L17 25"
                stroke={BRAND_INK}
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.9 18.5 H14.1"
                stroke={BRAND_INK}
                strokeWidth={2.6}
                strokeLinecap="round"
              />
              <path
                d="M15 25 V7 L21.5 17 L28 7 V25"
                stroke={BRAND_INK}
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
