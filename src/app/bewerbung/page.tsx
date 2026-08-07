import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CopyEmail } from "@/components/molecules/CopyEmail";
import { TECH } from "@/lib/tech-icons";
import { BEWERBUNG, SITE } from "@/data/content";
import { EXPERIENCE, LANGUAGES } from "@/data/career";

export const metadata: Metadata = {
  title: "Bewerbung",
  description:
    "Application summary — experience, working approach and availability, written for hiring teams.",
};

/**
 * /bewerbung — application pitch.
 *
 * A single reading column rather than the earlier split-screen: a recruiter
 * scanning this wants one uninterrupted line of argument, and a pinned
 * portrait alongside it competes for attention without adding information.
 */
export default function BewerbungPage() {
  return (
    <PageShell>
      <PageHeader width="reading">
        <Reveal>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-ink"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span className="link-underline">Back to portfolio</span>
          </Link>
        </Reveal>

        {/* Header */}
        <Reveal delay={0.05}>
          <Eyebrow className="mt-10">{BEWERBUNG.eyebrow}</Eyebrow>

          <h1 className="mt-6 text-balance text-display-sm font-medium leading-[1.1] tracking-[-0.035em] text-ink sm:text-display-lg">
            {BEWERBUNG.headline}
          </h1>

          <p className="mt-6 text-pretty text-lead leading-[1.7] text-secondary">
            {BEWERBUNG.intro}
          </p>
        </Reveal>

        {/* Actions */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={SITE.resumeHref} size="lg">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download résumé
            </ButtonLink>
            <ButtonLink
              href={SITE.schedulingHref}
              variant="secondary"
              size="lg"
            >
              Schedule a call
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>

        {/* Pitch */}
        <Reveal delay={0.15}>
          <section className="mt-20 border-t border-line pt-12">
            <Eyebrow as="h2">
              What I bring
            </Eyebrow>
            <ul className="mt-8 space-y-5">
              {BEWERBUNG.pitch.map((point) => (
                <li
                  key={point}
                  className="flex gap-4 text-pretty text-lead leading-[1.7] text-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.8125rem] h-px w-4 shrink-0 bg-line-strong"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Experience */}
        <Reveal delay={0.2}>
          <section className="mt-20 border-t border-line pt-12">
            <Eyebrow as="h2">
              Experience
            </Eyebrow>

            <ol className="mt-8 space-y-10">
              {EXPERIENCE.map((job) => (
                <li key={`${job.company}-${job.period}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="text-lead font-medium text-ink">
                      {job.role}
                    </h3>
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-secondary">
                    {job.company} · {job.location}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {job.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-3 text-pretty text-body leading-[1.65] text-secondary"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.6875rem] h-px w-3 shrink-0 bg-line-strong"
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {job.stack.map((tech) => {
                      const { Icon, label } = TECH[tech];
                      return (
                        <li
                          key={tech}
                          className="flex items-center gap-1.5 text-caption text-secondary"
                        >
                          <Icon
                            className="h-3.5 w-3.5 text-muted"
                            aria-hidden="true"
                          />
                          {label}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        {/* Languages */}
        <Reveal delay={0.25}>
          <section className="mt-20 border-t border-line pt-12">
            <Eyebrow as="h2">
              Languages
            </Eyebrow>
            <ul className="mt-8">
              {LANGUAGES.map((lang) => (
                <li
                  key={lang.name}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-4 last:border-b-0"
                >
                  <span className="text-body text-ink">{lang.name}</span>
                  <span className="text-sm text-muted">{lang.level}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Close */}
        <Reveal delay={0.3}>
          <section className="mt-20 border-t border-line pt-12">
            <h2 className="text-2xl font-medium tracking-[-0.025em] text-ink">
              Let&apos;s talk.
            </h2>
            <p className="mt-3 text-pretty text-body leading-[1.7] text-secondary">
              Available for {SITE.availability.modes.join(", ").toLowerCase()}.
              Email is the fastest way to reach me.
            </p>
            <div className="mt-7">
              <CopyEmail email={SITE.email} />
            </div>
          </section>
        </Reveal>
      </PageHeader>
    </PageShell>
  );
}
