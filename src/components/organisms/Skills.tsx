"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/atoms/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TECH, type TechKey } from "@/lib/tech-icons";

/**
 * Technologies section — mirrors the "Trusted by fast-growing startups"
 * logo-grid pattern from the reference, adapted for a developer portfolio.
 *
 * Icons come from the central TECH registry. Plain-text extras represent
 * tools and practices that have no recognisable logo mark.
 */

// All icon-backed technologies from the CV
const ICON_TECH: TechKey[] = [
  "laravel",
  "php",
  "go",
  "react",
  "nextjs",
  "typescript",
  "javascript",
  "python",
  "kotlin",
  "tailwind",
  "mysql",
  "sqlite",
  "docker",
  "githubactions",
  "gitflow",
  "figma",
  "alpine",
  "inertia",
  "vite",
  "html5",
  "css",
  "ollama",
  "chartjs",
];

// Text-only extras that appear as plain pill badges
const TEXT_EXTRAS = [
  "PostgreSQL",
  "REST APIs",
  "GraphQL",
  "OAuth2 / OpenID",
  "Microsoft Graph API",
  "Personio SDK",
  "PHPUnit / TDD",
  "NativePHP",
  "Spatie RBAC",
  "Retrofit",
  "MVVM",
  "Scrum / GitFlow",
];

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section
      id="skills"
      className="relative w-full border-t border-line bg-canvas py-12 md:py-16"
    >
      <Container className="max-w-7xl">
        {/* Label matching the reference's mono uppercase eyebrow */}
        <Reveal offset={8}>
          <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {t("title")}
          </p>
        </Reveal>

        {/* Icon grid */}
        <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-4 md:gap-x-10 md:gap-y-6">
          {ICON_TECH.map((key, index) => {
            const { Icon, label } = TECH[key];
            return (
              <Reveal key={key} delay={index * 0.02} offset={10}>
                <div
                  className="group flex items-center gap-2.5 rounded-xl border border-line bg-card px-4 py-2.5 shadow-subtle/40 transition-all duration-300 hover:scale-105 hover:border-line-strong hover:shadow-lift"
                  style={{ perspective: "800px" }}
                >
                  <Icon
                    className="h-4 w-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-ink"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold tracking-tight text-muted transition-colors duration-200 group-hover:text-ink">
                    {label}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mx-auto mt-6 h-px max-w-3xl bg-gradient-to-r from-transparent via-line-strong to-transparent" />

        {/* Plain-text extras — tools without a logo mark */}
        <div className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {TEXT_EXTRAS.map((extra, index) => (
            <Reveal key={extra} delay={index * 0.015} offset={8}>
              <span className="rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium tracking-wide text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink">
                {extra}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
