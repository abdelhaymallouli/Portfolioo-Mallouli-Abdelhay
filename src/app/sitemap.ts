import type { MetadataRoute } from "next";
import { SITE } from "@/data/content";
import { VISIBLE_PROJECTS } from "@/data/projects";

/**
 * Sitemap, derived from the same project list the pages render from — a
 * hand-maintained copy would silently go stale the first time a slug changed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    { url: SITE.url, priority: 1 },
    { url: `${SITE.url}/projects`, priority: 0.8 },
    { url: `${SITE.url}/bewerbung`, priority: 0.5 },
  ];

  const projectRoutes = VISIBLE_PROJECTS.map((project) => ({
    url: `${SITE.url}/projects/${project.slug}`,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    ...route,
    lastModified,
    changeFrequency: "monthly" as const,
  }));
}
