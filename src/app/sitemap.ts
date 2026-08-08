import type { MetadataRoute } from "next";
import { localisedPath, routing } from "@/i18n/routing";
import { SITE } from "@/data/content";
import { VISIBLE_PROJECTS } from "@/data/projects";

/**
 * Sitemap, derived from the same project list and locale config the pages
 * render from — a hand-maintained copy would silently go stale the first time
 * a slug or a locale changed.
 *
 * Each entry carries `alternates.languages` so search engines treat the
 * English and German URLs as translations of one page rather than as duplicate
 * content competing with each other.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  /* Absolute form of the same helper the pages use for their canonicals, so
     the sitemap and the <link rel="canonical"> tags can never disagree. */
  const localised = (path: string, locale: string) =>
    `${SITE.url}${localisedPath(path, locale)}`.replace(/\/$/, "") ||
    SITE.url;

  const paths = [
    { path: "", priority: 1 },
    { path: "/projects", priority: 0.8 },
    { path: "/bewerbung", priority: 0.5 },
    ...VISIBLE_PROJECTS.map((project) => ({
      path: `/projects/${project.slug}`,
      priority: 0.7,
    })),
  ];

  return paths.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: localised(path, locale),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alt) => [alt, localised(path, alt)]),
        ),
      },
    })),
  );
}
