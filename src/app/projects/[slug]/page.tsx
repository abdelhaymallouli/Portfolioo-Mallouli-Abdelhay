import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { ButtonLink } from "@/components/atoms/Button";
import { Counter } from "@/components/motion/Counter";
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
 * via `prose`; screenshots and the two-column blocks opt out and use the whole
 * column.
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

/** One label/value pair in the header's quick-facts row. */
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-micro uppercase tracking-[0.12em] text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 text-pretty text-sm font-medium leading-[1.5] text-ink">
        {value}
      </dd>
    </div>
  );
}

/** A bordered card in the overview sidebar. */
function SidebarBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-card p-5">
      <Eyebrow size="xs">{label}</Eyebrow>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/**
 * /projects/[slug] — case study.
 *
 * Laid out to the agreed wireframe, top to bottom:
 *
 *   1. Title block — name, tagline, quick facts, live/source buttons
 *   2. Cover image — full width, the first thing seen after the title
 *   3. Overview + sidebar — summary prose left, facts and links right
 *   4. Problem → Solution — alternating image/text pairs
 *   5. Gallery — the remaining screenshots
 *   6. Results — metrics, when the project has honest numbers
 *   7. Next project — with a thumbnail
 *   8. Footer — from PageShell
 *
 * Every block past the title is guarded on its data, so a project with only
 * the required fields still renders as a finished page rather than a set of
 * empty headings. That matters here: of six projects, only two carry the full
 * write-up.
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

  const cover = project.cover?.src ? project.cover : null;
  const gallery = (project.gallery ?? []).filter((image) => image.src);

  /*
   * The wireframe pairs each problem/solution block with an image. Challenges
   * carry no image of their own, so they borrow from the front of the gallery
   * — one screenshot each, in order. Whatever is left over falls through to
   * the slideshow below, so no shot is shown twice and none is dropped.
   */
  const challenges = project.challenges ?? [];
  const pairImages: ProjectImage[] = gallery.slice(0, challenges.length);
  const restImages: ProjectImage[] = gallery.slice(challenges.length);

  const hasIntro = Boolean(project.problem || project.solution);
  const metrics = project.metrics ?? [];

  /* Quick facts for the header row — only the ones this project actually has. */
  const facts = [
    { label: "Role", value: project.role },
    { label: "Team", value: project.team },
    { label: "Year", value: project.year },
    { label: "Duration", value: project.duration },
    { label: "Status", value: project.status },
  ].filter((fact): fact is { label: string; value: string } =>
    Boolean(fact.value),
  );

  return (
    <PageShell>
      <PageHeader>
        {/* ---------------- 1. Title block ---------------- */}
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
          <h1 className="mt-10 max-w-[20ch] text-balance text-display-md font-medium leading-[1.08] tracking-[-0.035em] text-ink sm:text-display-lg lg:text-display-xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-[46rem] text-pretty text-lg leading-[1.6] text-secondary">
            {project.tagline}
          </p>

          {/* Quick facts. Wraps to as many columns as the width allows. */}
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
            {facts.map((fact) => (
              <Fact key={fact.label} label={fact.label} value={fact.value} />
            ))}
          </dl>

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

        {/* ---------------- 2. Cover image ---------------- */}
        {cover && (
          <Reveal delay={0.1} className="mt-16">
            <div className="overflow-hidden rounded-xl border border-line bg-subtle">
              <Image
                src={cover.src!}
                alt={cover.alt}
                /*
                 * Intrinsic size + `h-auto`: the frame takes the file's real
                 * ratio, so a tall capture and a wide dashboard both render
                 * whole. Eager and priority — this is the LCP element.
                 */
                width={1920}
                height={1080}
                sizes="(min-width: 1280px) 1152px, (min-width: 1024px) 90vw, 100vw"
                priority
                className="h-auto w-full"
              />
            </div>
            {cover.caption && (
              <p className="mt-3 text-pretty text-sm leading-[1.6] text-muted">
                {cover.caption}
              </p>
            )}
          </Reveal>
        )}

        <div className="mt-24 space-y-20">
          {/* ---------------- 3. Overview + sidebar ---------------- */}
          <Block title="Overview" prose={false}>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <Reveal>
                  <p className="text-pretty text-body leading-[1.7] text-secondary">
                    {project.summary}
                  </p>
                </Reveal>

                {project.highlights && project.highlights.length > 0 && (
                  <RevealGroup as="ul" className="mt-8 space-y-4">
                    {project.highlights.map((item) => (
                      <RevealItem as="li" key={item} className="flex gap-3">
                        <span
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted"
                          aria-hidden="true"
                        />
                        <span className="text-pretty text-body leading-[1.7] text-secondary">
                          {item}
                        </span>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                )}
              </div>

              {/* Sidebar — stack, role, links. */}
              <Reveal delay={0.05} className="space-y-4">
                <SidebarBox label="Stack">
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => {
                      const { Icon, label } = TECH[tech];
                      return (
                        <li key={tech}>
                          <span className="inline-flex h-8 items-center gap-2 rounded-lg border border-line px-3 text-caption text-ink">
                            <Icon
                              className="h-3.5 w-3.5 text-muted"
                              aria-hidden="true"
                            />
                            {label}
                          </span>
                        </li>
                      );
                    })}

                    {/* Tools with no icon in the set — plain chips, so nothing
                        is dropped just because a logo doesn't exist. */}
                    {project.stackExtras?.map((extra) => (
                      <li key={extra}>
                        <span className="inline-flex h-8 items-center rounded-lg border border-line px-3 text-caption text-secondary">
                          {extra}
                        </span>
                      </li>
                    ))}
                  </ul>
                </SidebarBox>

                <SidebarBox label="My role">
                  <p className="text-pretty text-sm leading-[1.6] text-secondary">
                    {project.role}
                  </p>
                </SidebarBox>

                {(live || source) && (
                  <SidebarBox label="Links">
                    <ul className="space-y-2">
                      {live && (
                        <li>
                          <a
                            href={live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-ink"
                          >
                            <span className="link-underline">Live site</span>
                            <ArrowUpRight
                              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      )}
                      {source && (
                        <li>
                          <a
                            href={source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-ink"
                          >
                            <span className="link-underline">Source code</span>
                            <ArrowUpRight
                              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      )}
                    </ul>
                  </SidebarBox>
                )}
              </Reveal>
            </div>
          </Block>

          {/* ---------------- 4. Problem → Solution ---------------- */}
          {hasIntro && (
            <Block title={project.problem ? "The problem" : "The approach"}>
              <div className="space-y-10">
                {project.problem && (
                  <Reveal>
                    <p className="text-pretty text-body leading-[1.7] text-secondary">
                      {project.problem}
                    </p>
                  </Reveal>
                )}

                {project.solution && (
                  <Reveal delay={0.05}>
                    {project.problem && (
                      <h3 className="text-body font-medium text-ink">
                        The approach
                      </h3>
                    )}
                    <p
                      className={cn(
                        "text-pretty text-body leading-[1.7] text-secondary",
                        project.problem && "mt-3",
                      )}
                    >
                      {project.solution}
                    </p>
                  </Reveal>
                )}
              </div>
            </Block>
          )}

          {/*
           * The alternating image/text pattern from the wireframe. One pair
           * per hard problem — image and text swap sides each row so the page
           * has a rhythm instead of a left-aligned column of screenshots.
           */}
          {challenges.length > 0 && (
            <Block title="What was hard" prose={false}>
              <div className="space-y-16 lg:space-y-24">
                {challenges.map((item, i) => {
                  const image = pairImages[i];
                  const reversed = i % 2 === 1;

                  return (
                    <Reveal
                      key={item.challenge}
                      className={cn(
                        "grid items-center gap-8",
                        image && "lg:grid-cols-2 lg:gap-14",
                      )}
                    >
                      {image && (
                        <div
                          className={cn(
                            "overflow-hidden rounded-xl border border-line bg-subtle",
                            // Image right on odd rows; source order keeps the
                            // text first for screen readers and on mobile.
                            reversed ? "lg:order-2" : "lg:order-1",
                          )}
                        >
                          <Image
                            src={image.src!}
                            alt={image.alt}
                            width={1920}
                            height={1080}
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            loading="lazy"
                            className="h-auto w-full"
                          />
                        </div>
                      )}

                      <div
                        className={cn(
                          image && (reversed ? "lg:order-1" : "lg:order-2"),
                        )}
                      >
                        <p className="text-pretty text-body leading-[1.7] text-ink">
                          {item.challenge}
                        </p>
                        <p className="mt-4 border-l-2 border-line pl-5 text-pretty text-body leading-[1.7] text-secondary">
                          {item.solution}
                        </p>
                        {/*
                         * Trade-offs are the most senior thing on the page, but
                         * as a third full paragraph on every entry they made the
                         * section heavy. Folded away by default; native
                         * <details>, so no JS and in-page search still finds it.
                         */}
                        {item.tradeoff && (
                          <details className="group/t mt-4 pl-5">
                            <summary className="cursor-pointer list-none text-sm text-muted transition-colors hover:text-secondary">
                              <span className="link-underline">Trade-off</span>
                              <span className="ml-1.5 inline-block transition-transform duration-200 group-open/t:rotate-90">
                                ›
                              </span>
                            </summary>
                            <p className="mt-2 text-pretty text-sm leading-[1.65] text-muted">
                              {item.tradeoff}
                            </p>
                          </details>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </Block>
          )}

          {/* ---------------- 5. Gallery — slideshow ---------------- */}
          {restImages.length > 0 && (
            <Block title="More screens" prose={false}>
              <Gallery images={restImages} />
            </Block>
          )}

          {/* ---------------- 6. Results ---------------- */}
          {metrics.length > 0 && (
            <Block title="Results" prose={false}>
              <RevealGroup
                as="dl"
                className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
              >
                {metrics.map((metric) => (
                  <RevealItem key={metric.label}>
                    <dt className="sr-only">{metric.label}</dt>
                    <dd>
                      <Counter
                        value={metric.value}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                        className="block text-display-sm font-medium tracking-[-0.03em] text-ink"
                      />
                      <p className="mt-2 text-body font-medium text-ink">
                        {metric.label}
                      </p>
                      {metric.note && (
                        <p className="mt-1.5 text-pretty text-sm leading-[1.6] text-muted">
                          {metric.note}
                        </p>
                      )}
                    </dd>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Block>
          )}
        </div>

        {/* ---------------- 7. Next project ---------------- */}
        <Reveal className="mt-24 border-t border-line pt-12">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-6"
          >
            <span className="min-w-0">
              <Eyebrow as="span">Next project</Eyebrow>
              <span className="mt-4 flex items-center gap-4">
                <span className="text-title font-medium tracking-[-0.025em] text-ink sm:text-display-sm">
                  {next.title}
                </span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-ink"
                  aria-hidden="true"
                />
              </span>
            </span>

            {/* Thumbnail. Hidden on small screens, where it would crowd the
                title down to a couple of words per line. */}
            {next.cover?.src && (
              <span className="hidden w-40 shrink-0 overflow-hidden rounded-lg border border-line bg-subtle sm:block">
                <Image
                  src={next.cover.src}
                  alt=""
                  width={640}
                  height={400}
                  sizes="160px"
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </span>
            )}
          </Link>
        </Reveal>
      </PageHeader>
    </PageShell>
  );
}
