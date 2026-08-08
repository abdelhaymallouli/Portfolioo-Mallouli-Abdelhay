"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TECH } from "@/lib/tech-icons";
import { Card } from "@/components/atoms/Card";
import {
  PROJECT_CATEGORIES,
  VISIBLE_PROJECTS,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

/** One card in the archive grid. */
function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects");

  return (
    <Card
      as={Link}
      href={`/projects/${project.slug}`}
      interactive
      /*
       * The hover contract lives in `Card` — this had a hand-written copy of
       * it, which is how two card designs drifted apart in the first place.
       */
      className="group flex h-full flex-col overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative isolate aspect-[16/10] w-full overflow-hidden bg-subtle">
        {project.cover?.src ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            /*
             * `cover` anchored to the top, not `contain`. These are full-page
             * captures running as tall as 1:2.2; letterboxing one into a 16:10
             * card rendered it as a sliver about 8% of the frame width, lost in
             * empty space. Cropping to the top shows the hero and nav — the
             * part that identifies the site — and fills the card properly.
             */
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div
            role="img"
            aria-label={t("thumbnailPlaceholder", { title: project.title })}
            className="flex h-full w-full items-center justify-center"
          >
            <span className="font-mono text-xs text-muted">{project.title}</span>
          </div>
        )}
      </div>

      {/*
       * Three tiers only: name, what it is, what it's built with. The year and
       * status used to sit in a fourth row above the title, which put the least
       * important fact in the most prominent position and made every card read
       * as a form rather than a link.
       */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-start justify-between gap-3 text-body font-medium text-ink">
          {project.title}
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            aria-hidden="true"
          />
        </h3>

        <p className="mt-2 text-pretty text-sm leading-[1.6] text-secondary">
          {project.tagline}
        </p>

        {/* Stack marks, with the year kept as a quiet trailing detail. */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <ul className="flex items-center gap-2.5">
            {project.stack.slice(0, 3).map((tech) => {
              const { Icon, label } = TECH[tech];
              return (
                <li key={tech} title={label}>
                  <Icon className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </li>
              );
            })}
          </ul>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
      </div>
    </Card>
  );
}

/**
 * Filterable, searchable archive.
 *
 * Filtering runs client-side over an in-memory array — instant at this scale.
 * Search covers title, tagline, stack labels and categories, so "laravel"
 * matches projects even when the word never appears in the prose.
 */
export function ProjectGrid() {
  const t = useTranslations("projects");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">(
    "All",
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return VISIBLE_PROJECTS.filter((project) => {
      if (activeCategory !== "All" && !project.categories.includes(activeCategory)) {
        return false;
      }
      if (!needle) return true;

      return [
        project.title,
        project.tagline,
        ...project.stack.map((tech) => TECH[tech].label),
        ...project.categories,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [query, activeCategory]);

  const categories: (ProjectCategory | "All")[] = ["All", ...PROJECT_CATEGORIES];

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchLabel")}
            className="h-10 w-full rounded-lg border border-line bg-card pl-9 pr-9 text-sm text-ink transition-colors placeholder:text-muted hover:border-line-strong focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t("clearSearch")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label={t("filterLabel")}
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={cn(
                  "relative py-1 text-sm transition-colors duration-200",
                  isActive ? "text-ink" : "text-secondary hover:text-ink",
                )}
              >
                {/*
                 * "All" is a sentinel filter value, not content — it needs a
                 * translated label while the value stays constant. The real
                 * categories are data and stay in English, which is correct:
                 * they double as search terms over English project prose.
                 */}
                {category === "All" ? t("all") : category}
                {isActive && (
                  <motion.span
                    layoutId="filter-underline"
                    transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-ink"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ICU plural, not a ternary: German picks its own plural form, and a
          hand-rolled `n === 1 ? … : …` only ever encodes English rules. */}
      <p aria-live="polite" className="mt-6 font-mono text-xs text-muted">
        {t("count", { count: filtered.length })}
      </p>

      {/* Grid */}
      <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-10 border-t border-line py-20 text-center">
          <p className="text-body text-ink">{t("empty")}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
            className="mt-3 text-sm text-secondary transition-colors hover:text-ink"
          >
            <span className="link-underline">{t("reset")}</span>
          </button>
        </div>
      )}
    </div>
  );
}
