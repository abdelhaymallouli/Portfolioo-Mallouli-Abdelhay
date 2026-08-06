"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TECH } from "@/lib/tech-icons";
import {
  PROJECT_CATEGORIES,
  VISIBLE_PROJECTS,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

/** One card in the archive grid. */
function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-card shadow-subtle transition-all duration-200 ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-lift"
    >
      {/* Thumbnail */}
      <div className="relative isolate aspect-[16/10] w-full overflow-hidden bg-subtle">
        {project.cover?.src ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain object-top"
          />
        ) : (
          <div
            role="img"
            aria-label={`${project.title} thumbnail placeholder`}
            className="flex h-full w-full items-center justify-center"
          >
            <span className="font-mono text-xs text-muted">{project.title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3 font-mono text-xs text-muted">
          <span>{project.year}</span>
          {project.status && <span>{project.status}</span>}
        </div>

        <h3 className="mt-3 flex items-start justify-between gap-3 text-[0.9375rem] font-medium text-ink">
          {project.title}
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            aria-hidden="true"
          />
        </h3>

        <p className="mt-2 text-pretty text-sm leading-[1.6] text-secondary">
          {project.tagline}
        </p>

        {/* Stack marks */}
        <ul className="mt-auto flex items-center gap-2.5 pt-5">
          {project.stack.slice(0, 5).map((tech) => {
            const { Icon, label } = TECH[tech];
            return (
              <li key={tech} title={label}>
                <Icon className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Link>
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
            placeholder="Search projects or tech"
            aria-label="Search projects"
            className="h-10 w-full rounded-md border border-line bg-card pl-9 pr-9 text-sm text-ink transition-colors placeholder:text-muted hover:border-line-strong focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label="Filter by category"
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
                {category}
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

      <p aria-live="polite" className="mt-6 font-mono text-xs text-muted">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
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
          <p className="text-[0.9375rem] text-ink">No projects match.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
            className="mt-3 text-sm text-secondary transition-colors hover:text-ink"
          >
            <span className="link-underline">Reset filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
