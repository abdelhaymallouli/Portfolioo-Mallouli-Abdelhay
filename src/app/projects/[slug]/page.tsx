import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Gallery } from "@/components/molecules/Gallery";
import { TECH } from "@/lib/tech-icons";
import {
  VISIBLE_PROJECTS,
  getProjectBySlug,
  type ProjectImage,
} from "@/data/projects";

export function generateStaticParams() {
  return VISIBLE_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.tagline,
    openGraph: { title: project.title, description: project.tagline },
  };
}

/**
 * Section wrapper — consistent heading style and rhythm down the page.
 *
 * The page container is full width. Text sets itself to the reading measure
 * via `prose`; screenshots opt out and use the whole column. Getting this the
 * other way round — a narrow page with blocks breaking *out* of it — left the
 * page looking cramped inside a wide window.
 */
function Block({
  title,
  children,
  /** Constrain this block to the prose measure. Off for full-width media. */
  prose = true,
}: {
  title: string;
  children: React.ReactNode;
  prose?: boolean;
}) {
  return (
    <section className="border-t border-line pt-12">
      <Reveal>
        <Eyebrow as="h2">{title}</Eyebrow>
      </Reveal>
      <div className={cn("mt-8", prose && "max-w-[46rem]")}>{children}</div>
    </section>
  );
}

/**
 * /projects/[slug] — case study.
 *
 * Three sections, deliberately: what the project is, how it was built, and
 * what it looks like. Nothing else.
 *
 * This replaced an eleven-section layout (Overview, Architecture, Results,
 * Lessons, Future work, …). The problem was not only length — it was that
 * those fields are populated on two of six projects, so the page had no
 * consistent shape: some projects rendered three sections and others eleven,
 * which is what made it read as unfinished. The data is still in
 * `projects.ts`; it simply isn't all forced onto this page.
 *
 * The optional guards remain, so a project missing prose or screenshots still
 * renders as a finished page rather than a set of empty headings.
 */
export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = VISIBLE_PROJECTS.findIndex((p) => p.slug === slug);

  if (index === -1) notFound();

  const project = VISIBLE_PROJECTS[index];
  // Wrap so the final project still offers a next step.
  const next = VISIBLE_PROJECTS[(index + 1) % VISIBLE_PROJECTS.length];

  const live =
    project.links?.live && project.links.live !== "#" ? project.links.live : null;
  const source =
    project.links?.source && project.links.source !== "#"
      ? project.links.source
      : null;

  /*
   * One carousel for the whole interface, cover first. Previously the cover
   * was a separate eager <Figure> above the fold and the gallery sat far below
   * it, which meant the largest asset on the page loaded before anything the
   * reader had asked to see.
   */
  const shots: ProjectImage[] = [
    ...(project.cover?.src ? [project.cover] : []),
    ...(project.gallery ?? []),
  ];

  const hasWriteUp =
    project.problem || project.solution || (project.challenges?.length ?? 0) > 0;

  return (
    <PageShell>
      {/*
       * Full page width. Individual text blocks constrain themselves to the
       * reading measure; the screenshots use the whole column. Setting the
       * *page* narrow instead made the whole layout look cramped in a wide
       * window, which is the opposite of the problem it was meant to fix.
       */}
      <PageHeader>
        {/* ---------------- Header ---------------- */}
        <Reveal>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-ink"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span className="link-underline">All projects</span>
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted">
            <span>{project.year}</span>
            {project.status && (
              <>
                <span aria-hidden="true">/</span>
                <span>{project.status}</span>
              </>
            )}
          </div>

          <h1 className="mt-6 max-w-[20ch] text-balance text-display-md font-medium leading-[1.08] tracking-[-0.035em] text-ink sm:text-display-lg lg:text-display-xl">
            {project.title}
          </h1>

          {/*
           * The summary alone. `role` is deliberately not rendered — it read as
           * a CV field in the middle of a product description, and the write-up
           * below already shows what was built. It stays in the data for the
           * cards and for structured output.
           */}
          <p className="mt-6 max-w-[46rem] text-pretty text-lg leading-[1.6] text-secondary">
            {project.summary}
          </p>

          {(live || source) && (
            <div className="mt-9 flex flex-wrap gap-3">
              {live && (
                <ButtonLink href={live} size="md">
                  Visit site
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              )}
              {source && (
                <ButtonLink href={source} variant="secondary" size="md">
                  <SiGithub className="h-4 w-4" aria-hidden="true" />
                  Source code
                </ButtonLink>
              )}
            </div>
          )}
        </Reveal>

        {/* ---------------- Body ---------------- */}
        <div className="mt-24 space-y-20">
          {/* 1 — What it is and how it was built. */}
          {hasWriteUp && (
            <Block title="The project">
              <div className="space-y-10">
                {project.problem && (
                  <Reveal>
                    <h3 className="text-body font-medium text-ink">
                      The problem
                    </h3>
                    <p className="mt-3 text-pretty text-body leading-[1.7] text-secondary">
                      {project.problem}
                    </p>
                  </Reveal>
                )}

                {project.solution && (
                  <Reveal delay={0.05}>
                    <h3 className="text-body font-medium text-ink">
                      The approach
                    </h3>
                    <p className="mt-3 text-pretty text-body leading-[1.7] text-secondary">
                      {project.solution}
                    </p>
                  </Reveal>
                )}

                {project.challenges && project.challenges.length > 0 && (
                  <div>
                    <h3 className="text-body font-medium text-ink">
                      What was hard
                    </h3>
                    <RevealGroup className="mt-5 space-y-8">
                      {project.challenges.map((item) => (
                        <RevealItem key={item.challenge}>
                          <p className="text-pretty text-body leading-[1.7] text-ink">
                            {item.challenge}
                          </p>
                          <p className="mt-3 border-l-2 border-line pl-5 text-pretty text-body leading-[1.7] text-secondary">
                            {item.solution}
                          </p>
                          {/*
                           * Trade-offs are worth keeping — they are the most
                           * senior thing on the page — but they were a third
                           * paragraph of equal weight on every entry, which is
                           * most of why this section felt heavy. Folded away by
                           * default; native <details>, so no JS and it stays
                           * findable by in-page search.
                           */}
                          {item.tradeoff && (
                            <details className="group/t mt-3 pl-5">
                              <summary className="cursor-pointer list-none text-sm text-muted transition-colors hover:text-secondary">
                                <span className="link-underline">
                                  Trade-off
                                </span>
                                <span className="ml-1.5 inline-block transition-transform duration-200 group-open/t:rotate-90">
                                  ›
                                </span>
                              </summary>
                              <p className="mt-2 text-pretty text-sm leading-[1.65] text-muted">
                                {item.tradeoff}
                              </p>
                            </details>
                          )}
                        </RevealItem>
                      ))}
                    </RevealGroup>
                  </div>
                )}
              </div>
            </Block>
          )}

          {/* 2 — Built with. */}
          <Block title="Built with">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => {
                const { Icon, label } = TECH[tech];
                return (
                  <li key={tech}>
                    <span className="inline-flex h-8 items-center gap-2 rounded-lg border border-line px-3 text-caption text-ink">
                      <Icon className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                      {label}
                    </span>
                  </li>
                );
              })}

              {/* Tools with no icon in the set — rendered as plain chips so
                  nothing is dropped just because a logo doesn't exist. */}
              {project.stackExtras?.map((extra) => (
                <li key={extra}>
                  <span className="inline-flex h-8 items-center rounded-lg border border-line px-3 text-caption text-secondary">
                    {extra}
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          {/* 3 — The interface. `prose={false}`: screenshots get the full column. */}
          {shots.length > 0 && (
            <Block title="Interface" prose={false}>
              <Gallery images={shots} />
            </Block>
          )}
        </div>

        {/* ---------------- Next ---------------- */}
        <Reveal className="mt-24 border-t border-line pt-12">
          <Link href={`/projects/${next.slug}`} className="group block">
            <Eyebrow as="span">Next project</Eyebrow>
            <span className="mt-4 flex items-center justify-between gap-6">
              <span className="text-title font-medium tracking-[-0.025em] text-ink sm:text-display-sm">
                {next.title}
              </span>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-ink"
                aria-hidden="true"
              />
            </span>
          </Link>
        </Reveal>
      </PageHeader>
    </PageShell>
  );
}
