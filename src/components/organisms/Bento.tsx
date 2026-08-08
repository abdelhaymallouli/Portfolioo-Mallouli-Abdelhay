"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Container, Section } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Card } from "@/components/atoms/Card";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { CertificationsDialog } from "@/components/molecules/CertificationsDialog";
import { TECH, type TechKey } from "@/lib/tech-icons";
import { STATS } from "@/data/content";
import { CERTIFICATIONS, LANGUAGES } from "@/data/career";
import { motion } from "framer-motion";

/*
 * The three numbers, read from STATS rather than re-typed. The values were
 * hard-coded here as `CLIENTS_SERVED_VAL = 6` and `COUNTRIES_VAL = 2` beside a
 * `STATS[0]` lookup — so two of the three cards silently ignored the data file
 * they appeared to come from.
 */
const [LEAD_STAT, ...SUPPORTING_STATS] = STATS;

/*
 * Every technology in the set, ordered by how central it is to the work rather
 * than alphabetically — the first names to scroll past are the ones worth
 * being read. Previously ten of these were listed and eleven silently omitted.
 */
const TECH_MARQUEE: TechKey[] = [
  "laravel",
  "php",
  "go",
  "react",
  "nextjs",
  "typescript",
  "javascript",
  "kotlin",
  "python",
  "tailwind",
  "alpine",
  "inertia",
  "vite",
  "mysql",
  "postgresql",
  "sqlite",
  "docker",
  "githubactions",
  "gitflow",
  "ollama",
  "figma",
];

/*
 * Two copies, and the track translates exactly -50% — so the second copy lands
 * where the first began and the loop is seamless at any list length. The old
 * version animated to a hard-coded `-1000` px, a distance unrelated to the
 * real content width, which is why the strip visibly jumped on repeat.
 */
const MARQUEE_TECH = [...TECH_MARQUEE, ...TECH_MARQUEE];

/**
 * How many certifications the card lists before deferring to the dialog.
 *
 * Four is a layout constraint, not a preference: the card shares a grid row
 * with Languages, and a fifth entry makes it the taller of the two.
 */
const CERTS_SHOWN = 4;

export function Bento() {
  const t = useTranslations("evidence");
  const [certsOpen, setCertsOpen] = useState(false);

  return (
    <Section id="credentials" className="bg-subtle py-20 md:py-30">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        {/* Lead stat left, everything else in a two-column stack at right. */}
        <div className="mt-16 flex min-h-[500px] flex-col gap-4 lg:grid lg:grid-cols-3">
          
          {/* Card 1: the lead stat, over a grid graphic background */}
          <Reveal className="h-full" offset={16}>
            <Card className="group relative overflow-hidden flex h-full flex-col justify-between p-8 bg-card border border-line shadow-subtle min-h-[360px]">
              {/* Decorative premium grid background with gradient stroke path */}
              <div className="absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-500 group-hover:opacity-25">
                <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" stroke="currentColor" strokeWidth="0.5" className="text-line-strong" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="z-10 flex flex-col gap-4">
                <span className="flex text-8xl font-bold tracking-tight text-ink">
                  <Counter
                    value={LEAD_STAT.value}
                    suffix={LEAD_STAT.suffix}
                    prefix={LEAD_STAT.prefix}
                  />
                </span>
                <span className="text-lg font-semibold tracking-tight text-ink">
                  {LEAD_STAT.label}
                </span>
              </div>

              {/* The note alone. A hard-coded sentence about TDD used to be
                  appended here, which silently contradicted the stat the day
                  the lead metric changed. */}
              <div className="z-10">
                <span className="block text-sm leading-relaxed text-secondary">
                  {LEAD_STAT.note}
                </span>
              </div>
            </Card>
          </Reveal>

          {/* Column containing Cards 2 & 3 (Right hand stacked grid) */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
            
            {/* Cards 2 & 3: the supporting numbers, straight from STATS. */}
            {SUPPORTING_STATS.slice(0, 2).map((stat, i) => (
              <Reveal key={stat.label} delay={0.05 + i * 0.05} offset={16}>
                <Card className="group flex h-full min-h-[240px] flex-col justify-between border border-line bg-card p-8 shadow-subtle">
                  <div>
                    <span className="block text-5xl font-bold tracking-tight text-ink">
                      <Counter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </span>
                    <p className="mt-3 text-base font-semibold text-ink">
                      {stat.label}
                    </p>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-secondary">
                    {stat.note}
                  </p>
                </Card>
              </Reveal>
            ))}

            {/* Card 4: Languages Spoken */}
            <Reveal delay={0.15} offset={16} className="md:col-span-1">
              <Card className="flex flex-col p-8 bg-card border border-line shadow-subtle h-full">
                <Eyebrow as="h3">{t("languages")}</Eyebrow>
                <ul className="mt-5 flex flex-col divide-y divide-line">
                  {LANGUAGES.map((lang) => (
                    <li key={lang.name} className="flex justify-between py-2.5 first:pt-0 last:pb-0">
                      <span className="text-sm font-medium text-ink">{lang.name}</span>
                      <span className="text-xs text-muted font-mono">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            {/*
             * Card 5: Certifications.
             *
             * Four of the six, with the rest behind the dialog: at full length
             * the list outgrew its grid row and pushed the card taller than the
             * one beside it. Four is what fits without the tile changing shape.
             *
             * Each row is a link — every entry carries a verifiable `href`, and
             * a credential nobody can check is barely a credential. Titles wrap
             * rather than truncate: "Deploy Scalable React Apps on the Cloud"
             * cut off at the card edge read as a vaguer certificate than it is.
             */}
            <Reveal delay={0.2} offset={16} className="md:col-span-1">
              <Card className="flex h-full flex-col border border-line bg-card p-8 shadow-subtle">
                <Eyebrow as="h3">{t("certifications")}</Eyebrow>
                <ul className="mt-5 flex flex-col divide-y divide-line">
                  {CERTIFICATIONS.slice(0, CERTS_SHOWN).map((cert) => {
                    const body = (
                      <>
                        <span className="min-w-0 flex-1 pr-3">
                          <span className="block text-sm font-medium text-ink">
                            {cert.title}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted">
                            {cert.issuer}
                          </span>
                        </span>
                        <span className="shrink-0 font-mono text-xs text-muted">
                          {cert.date}
                        </span>
                      </>
                    );

                    return (
                      <li key={cert.title} className="first:pt-0 last:pb-0">
                        {cert.href ? (
                          <a
                            href={cert.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start justify-between gap-2 py-2.5 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                          >
                            {body}
                          </a>
                        ) : (
                          <span className="flex items-start justify-between gap-2 py-2.5">
                            {body}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/*
                 * `mt-auto` pins this to the bottom of the card, so the trigger
                 * sits on the same line regardless of how tall the titles wrap.
                 * Only rendered when something is actually hidden — with six
                 * entries and four shown it always is, but the card should not
                 * offer to reveal nothing if the data shrinks.
                 */}
                {CERTIFICATIONS.length > CERTS_SHOWN && (
                  <button
                    type="button"
                    onClick={() => setCertsOpen(true)}
                    className="group/more mt-auto flex items-center gap-2 border-t border-line pt-4 text-sm font-medium text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-line transition-colors group-hover/more:border-line-strong group-hover/more:bg-hover">
                      <Plus
                        className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover/more:rotate-90"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="link-underline">
                      {t("more", {
                        count: CERTIFICATIONS.length - CERTS_SHOWN,
                      })}
                    </span>
                  </button>
                )}
              </Card>
            </Reveal>

            {/* Card 6: the full stack, on an infinite marquee. */}
            <Reveal delay={0.25} offset={16} className="md:col-span-2">
              <Card className="relative flex min-h-[120px] flex-col justify-center overflow-hidden border border-line bg-card p-8 shadow-subtle">
                <Eyebrow as="h4" className="mb-4">
                  {t("coreStack")}
                </Eyebrow>

                <div className="relative flex w-full items-center overflow-hidden py-2">
                  {/* Edge fades, so names enter and leave rather than clipping. */}
                  <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-card to-transparent" />
                  <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-card to-transparent" />

                  {/*
                   * The track holds two identical halves and translates by
                   * exactly -50%, so the second half arrives where the first
                   * started and the seam is invisible at any list length.
                   *
                   * `w-max` is load-bearing: the track must size to its content.
                   * With the previous `min-w-full` the halves were stretched to
                   * the container and -50% no longer lined them up.
                   */}
                  <motion.div
                    className="flex w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 40,
                    }}
                  >
                    {MARQUEE_TECH.map((key, i) => {
                      const { Icon, label } = TECH[key];
                      return (
                        <div
                          key={`${key}-${i}`}
                          /* The duplicated half is decorative — it would
                             otherwise read the whole stack out twice. */
                          aria-hidden={i >= TECH_MARQUEE.length}
                          className="flex shrink-0 cursor-default select-none items-center gap-2.5 pr-8 text-muted transition-colors duration-200 hover:text-ink"
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                          <span className="whitespace-nowrap text-sm font-semibold tracking-tight">
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </Card>
            </Reveal>

          </div>
        </div>
      </Container>

      <CertificationsDialog
        open={certsOpen}
        certifications={CERTIFICATIONS}
        onClose={() => setCertsOpen(false)}
      />
    </Section>
  );
}
