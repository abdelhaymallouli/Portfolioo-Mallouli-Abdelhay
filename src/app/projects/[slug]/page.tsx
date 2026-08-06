import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/atoms/Container";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
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
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-line pt-12", className)}>
      <Reveal>
        <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
          {title}
        </h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/** Screenshot frame. Aspect ratio follows the declared device. */
function Figure({ image }: { image: ProjectImage }) {
  const ratio =
    image.device === "mobile"
      ? "aspect-[9/16]"
      : image.device === "tablet"
        ? "aspect-[4/3]"
        : "aspect-[16/10]";

  return (
    <figure>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg border border-line bg-subtle",
          ratio,
        )}
      >
        {image.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            priority
            // `contain`, not `cover`: these are full-page screenshots, and
            // cropping one to fill a 16:10 box slices off the content that
            // makes it worth showing.
            className="object-contain"
          />
        ) : (
          <div
            role="img"
            aria-label={image.alt}
            className="flex h-full w-full items-center justify-center p-6 text-center"
          >
            <span className="font-mono text-xs text-muted">{image.alt}</span>
          </div>
        )}
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-sm text-muted">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * /projects/[slug] — engineering case study.
 *
 * Ordered the way a reviewer reads: what it is, the constraint, how it's
 * built, what went wrong, what the numbers were, what was learned. Every
 * optional field is guarded so a partially-filled project still renders as a
 * finished page rather than a set of empty headings.
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

  const hasLinks =
    (project.links?.live && project.links.live !== "#") ||
    (project.links?.source && project.links.source !== "#");

  return (
    <PageShell>
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
            {project.categories.map((category) => (
              <span key={category} className="flex items-center gap-3">
                <span aria-hidden="true">/</span>
                {category}
              </span>
            ))}
          </div>

          <h1 className="mt-6 text-balance text-[2.5rem] font-medium leading-[1.08] tracking-[-0.035em] text-ink sm:text-[3.25rem] lg:text-[4rem]">
            {project.title}
          </h1>

          <p className="mt-6 max-w-[45rem] text-pretty text-[1.125rem] leading-[1.6] text-secondary">
            {project.summary}
          </p>

          {hasLinks && (
            <div className="mt-9 flex flex-wrap gap-3">
              {project.links?.live && project.links.live !== "#" && (
                <ButtonLink href={project.links.live} size="md">
                  Visit site
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              )}
              {project.links?.source && project.links.source !== "#" && (
                <ButtonLink
                  href={project.links.source}
                  variant="secondary"
                  size="md"
                >
                  <SiGithub className="h-4 w-4" aria-hidden="true" />
                  Source
                </ButtonLink>
              )}
            </div>
          )}
        </Reveal>

        {/* ---------------- Cover ---------------- */}
        <Reveal delay={0.1} className="mt-16">
          <Figure
            image={
              project.cover ?? {
                alt: `${project.title} — primary interface`,
                device: "desktop",
              }
            }
          />
        </Reveal>

        {/* ---------------- Body ---------------- */}
        <div className="mt-24 space-y-20">
          {/* Overview */}
          <Block title="Overview">
            <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-sm text-muted">Role</dt>
                <dd className="mt-1.5 text-pretty text-[0.9375rem] text-ink">
                  {project.role}
                </dd>
              </div>
              {project.duration && (
                <div>
                  <dt className="text-sm text-muted">Duration</dt>
                  <dd className="mt-1.5 text-[0.9375rem] text-ink">
                    {project.duration}
                  </dd>
                </div>
              )}
              {project.team && (
                <div>
                  <dt className="text-sm text-muted">Team</dt>
                  <dd className="mt-1.5 text-[0.9375rem] text-ink">
                    {project.team}
                  </dd>
                </div>
              )}
              {project.url && (
                <div>
                  <dt className="text-sm text-muted">Live at</dt>
                  <dd className="mt-1.5 font-mono text-sm text-ink">
                    {project.url}
                  </dd>
                </div>
              )}
            </dl>
          </Block>

          {/* Problem & approach */}
          {(project.problem || project.solution) && (
            <Block title="Problem & approach">
              <div className="grid gap-10 lg:grid-cols-2">
                {project.problem && (
                  <Reveal>
                    <h3 className="text-[0.9375rem] font-medium text-ink">
                      The problem
                    </h3>
                    <p className="mt-3 text-pretty text-[0.9375rem] leading-[1.7] text-secondary">
                      {project.problem}
                    </p>
                  </Reveal>
                )}
                {project.solution && (
                  <Reveal delay={0.05}>
                    <h3 className="text-[0.9375rem] font-medium text-ink">
                      The approach
                    </h3>
                    <p className="mt-3 text-pretty text-[0.9375rem] leading-[1.7] text-secondary">
                      {project.solution}
                    </p>
                  </Reveal>
                )}
              </div>
            </Block>
          )}

          {/* Stack */}
          <Block title="Technologies">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => {
                const { Icon, label } = TECH[tech];
                return (
                  <li key={tech}>
                    <span className="inline-flex h-8 items-center gap-2 rounded-md border border-line px-3 text-[0.8125rem] text-ink">
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
                  <span className="inline-flex h-8 items-center rounded-md border border-line px-3 text-[0.8125rem] text-secondary">
                    {extra}
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          {/* Architecture */}
          {project.architecture && project.architecture.length > 0 && (
            <Block title="Architecture">
              <ol className="max-w-[45rem]">
                {project.architecture.map((node, nodeIndex) => (
                  <li
                    key={node.layer}
                    className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-5 first:border-t-0 first:pt-0"
                  >
                    <span className="font-mono text-xs text-muted">
                      {String(nodeIndex + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-ink">
                        {node.layer}
                      </span>
                      <span className="mt-1 block text-pretty text-sm leading-[1.6] text-secondary">
                        {node.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <Block title="Challenges & solutions">
              <RevealGroup className="space-y-12">
                {project.challenges.map((item) => (
                  <RevealItem key={item.challenge}>
                    <div className="max-w-[45rem]">
                      <p className="text-pretty text-[0.9375rem] leading-[1.7] text-ink">
                        {item.challenge}
                      </p>
                      <p className="mt-4 border-l border-line pl-5 text-pretty text-[0.9375rem] leading-[1.7] text-secondary">
                        {item.solution}
                      </p>
                      {item.tradeoff && (
                        <p className="mt-4 text-pretty text-sm leading-[1.65] text-muted">
                          <span className="text-secondary">Trade-off:</span>{" "}
                          {item.tradeoff}
                        </p>
                      )}
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Block>
          )}

          {/* Results */}
          {project.metrics && project.metrics.length > 0 && (
            <Block title="Results">
              <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="sr-only">{metric.label}</dt>
                    <dd>
                      <span className="tabular block text-[2.5rem] font-medium leading-none tracking-[-0.03em] text-ink">
                        <Counter
                          value={metric.value}
                          suffix={metric.suffix}
                          prefix={metric.prefix}
                          decimals={Number.isInteger(metric.value) ? 0 : 1}
                        />
                      </span>
                      <span className="mt-3 block text-[0.9375rem] text-ink">
                        {metric.label}
                      </span>
                      {metric.note && (
                        <span className="mt-1 block text-pretty text-sm text-muted">
                          {metric.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <Block title="Gallery">
              <Reveal>
                <Gallery images={project.gallery} />
              </Reveal>
            </Block>
          )}

          {/* Lessons */}
          {project.lessons && project.lessons.length > 0 && (
            <Block title="Lessons learned">
              <ul className="max-w-[45rem] space-y-4">
                {project.lessons.map((lesson) => (
                  <li
                    key={lesson}
                    className="flex gap-4 text-pretty text-[0.9375rem] leading-[1.7] text-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.75rem] h-px w-4 shrink-0 bg-line-strong"
                    />
                    {lesson}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {/* Future work */}
          {project.futureWork && project.futureWork.length > 0 && (
            <Block title="Future work">
              <ul className="max-w-[45rem] space-y-4">
                {project.futureWork.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-pretty text-[0.9375rem] leading-[1.7] text-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.75rem] h-px w-4 shrink-0 bg-line-strong"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </div>

        {/* ---------------- Next ---------------- */}
        <Reveal className="mt-24 border-t border-line pt-12">
          <Link href={`/projects/${next.slug}`} className="group block">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
              Next project
            </span>
            <span className="mt-4 flex items-center justify-between gap-6">
              <span className="text-[1.75rem] font-medium tracking-[-0.025em] text-ink sm:text-[2rem]">
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
