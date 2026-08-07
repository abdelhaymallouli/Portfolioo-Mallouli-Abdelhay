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

/** Section wrapper — consistent heading style and rhythm down the page. */
function Block({
  title,
  children,
  /**
   * Lets a block escape the reading column. The page is set to the 45rem prose
   * measure, which is right for text and too narrow for screenshots — a tall
   * capture letterboxed inside it comes back to the same sliver this redesign
   * set out to fix. Negative margins widen the block symmetrically without
   * moving it out of the document flow.
   */
  bleed = false,
}: {
  title: string;
  children: React.ReactNode;
  bleed?: boolean;
}) {
  return (
    <section className="border-t border-line pt-12">
      <Reveal>
        <Eyebrow as="h2">{title}</Eyebrow>
      </Reveal>
      <div
        className={cn(
          "mt-8",
          bleed && "lg:-mx-[7rem] xl:-mx-[12rem]",
        )}
      >
        {children}
      </div>
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
       * `reading`, not the default page width. This page is almost entirely
       * prose, and at 1440px a page-width container left every paragraph
       * hugging the left edge with the right half of the screen empty. The
       * narrower measure centres the column and keeps line length readable;
       * the gallery still spans the full column.
       */}
      <PageHeader width="reading">
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

          <h1 className="mt-6 text-balance text-display-md font-medium leading-[1.08] tracking-[-0.035em] text-ink sm:text-display-lg lg:text-display-xl">
            {project.title}
          </h1>

          <p className="mt-6 text-pretty text-lg leading-[1.6] text-secondary">
            {project.summary}
          </p>

          {/* Role reads as a sentence here rather than a cell in a spec table. */}
          <p className="mt-5 text-body leading-[1.6] text-muted">
            <span className="text-secondary">Role:</span> {project.role}
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
                    <RevealGroup className="mt-5 space-y-10">
                      {project.challenges.map((item) => (
                        <RevealItem key={item.challenge}>
                          <p className="text-pretty text-body leading-[1.7] text-ink">
                            {item.challenge}
                          </p>
                          <p className="mt-4 border-l border-line pl-5 text-pretty text-body leading-[1.7] text-secondary">
                            {item.solution}
                          </p>
                          {item.tradeoff && (
                            <p className="mt-4 text-pretty text-sm leading-[1.65] text-muted">
                              <span className="text-secondary">Trade-off:</span>{" "}
                              {item.tradeoff}
                            </p>
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

          {/* 3 — The interface. */}
          {shots.length > 0 && (
            <Block title="Interface" bleed>
              <Reveal>
                <Gallery images={shots} />
              </Reveal>
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
