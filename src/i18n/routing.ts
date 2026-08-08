import { defineRouting } from "next-intl/routing";

/**
 * Locale routing.
 *
 * English and German. German is here because it is the one additional language
 * whose translations can actually be verified — and because the `/bewerbung`
 * route (a German word) previously served English copy, which only made sense
 * once German was a real locale rather than a route name.
 *
 * `localePrefix: "as-needed"` keeps English un-prefixed at `/`, so every URL
 * that exists today keeps working and no SEO is disrupted. German lives under
 * `/de`.
 */
export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/**
 * The path a route lives at in a given locale — the default locale is
 * un-prefixed, everything else sits under `/<locale>`.
 *
 * Used for `alternates` in page metadata. Every page needs its own, because
 * Next merges metadata from the layout down: without an override, a child page
 * inherits the layout's canonical and tells search engines it is a duplicate
 * of the home page.
 */
export function localisedPath(path: string, locale: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${path}` || "/";
}

/** `alternates` for a route, covering canonical + every hreflang. */
export function localeAlternates(path: string, locale: string) {
  return {
    canonical: localisedPath(path, locale),
    languages: Object.fromEntries(
      routing.locales.map((alt) => [alt, localisedPath(path, alt)]),
    ),
  };
}
