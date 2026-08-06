import { Container, Section } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Card } from "@/components/atoms/Card";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { TECH, type TechKey } from "@/lib/tech-icons";
import { CERTIFICATIONS, LANGUAGES, STATS } from "@/data/content";

/**
 * Bento grid — the credentials block, consolidated.
 *
 * Replaces three separate full-height sections (stats band, certifications,
 * languages, tech strip) that each carried a handful of short facts and a
 * whole viewport of vertical rhythm between them. None of that content
 * justified its own section; collapsing it into one dense grid recovers
 * roughly two screens of scroll and reads as a dashboard of evidence rather
 * than four thin lists in a row.
 *
 * The grid is 6 columns at `lg` so tiles can take 2, 3 or 4 tracks — a
 * 12-column bed would let them drift to arbitrary widths, and a 4-column one
 * has no room for the asymmetry that stops a bento reading as a plain table.
 */

/** Shown in the stack tile. Monochrome — colour here turns it to confetti. */
const STACK: TechKey[] = [
  "laravel",
  "php",
  "go",
  "react",
  "nextjs",
  "typescript",
  "tailwind",
  "mysql",
  "docker",
  "githubactions",
];

/** The headline figure gets its own tile; the rest share a row. */
const [LEAD_STAT, ...REST_STATS] = STATS;

export function Bento() {
  return (
    <Section id="credentials">
      <Container>
        <SectionHeading
          eyebrow="Evidence"
          title="The receipts, in one place."
          description="Every number here traces back to work documented elsewhere on this site."
        />

        <div className="mt-16 grid auto-rows-auto gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {/* ---------- Lead statistic ---------- */}
          <Reveal className="lg:col-span-2" offset={16}>
            <Card className="flex h-full flex-col justify-between p-7">
              <div>
                <span className="tabular block text-[3.5rem] font-medium leading-none tracking-tight text-ink">
                  <Counter
                    value={LEAD_STAT.value}
                    suffix={LEAD_STAT.suffix}
                    prefix={LEAD_STAT.prefix}
                  />
                </span>
                <p className="mt-3 text-[0.9375rem] font-medium text-ink">
                  {LEAD_STAT.label}
                </p>
              </div>
              <p className="mt-6 text-pretty text-xs leading-[1.5] text-muted">
                {LEAD_STAT.note}
              </p>
            </Card>
          </Reveal>

          {/* ---------- Languages ---------- */}
          <Reveal className="lg:col-span-2" delay={0.05} offset={16}>
            <Card className="flex h-full flex-col p-7">
              <Eyebrow as="h3">Languages</Eyebrow>
              <ul className="mt-5 flex flex-col">
                {LANGUAGES.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex items-baseline justify-between gap-4 border-t border-line py-3 first:border-t-0 first:pt-0"
                  >
                    <span className="text-[0.9375rem] text-ink">
                      {lang.name}
                    </span>
                    <span className="shrink-0 text-right text-xs text-muted">
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          {/* ---------- Certifications ---------- */}
          <Reveal className="lg:col-span-2" delay={0.1} offset={16}>
            <Card className="flex h-full flex-col p-7">
              <Eyebrow as="h3">Certifications</Eyebrow>
              <ul className="mt-5 flex flex-col">
                {CERTIFICATIONS.slice(0, 4).map((cert) => (
                  <li
                    key={cert.title}
                    className="flex items-baseline justify-between gap-4 border-t border-line py-3 first:border-t-0 first:pt-0"
                  >
                    <span className="min-w-0 text-[0.9375rem] text-ink">
                      {cert.title}
                    </span>
                    <span className="tabular shrink-0 font-mono text-xs text-muted">
                      {cert.date}
                    </span>
                  </li>
                ))}
              </ul>
              {CERTIFICATIONS.length > 4 && (
                <p className="mt-4 text-xs text-muted">
                  +{CERTIFICATIONS.length - 4} more
                </p>
              )}
            </Card>
          </Reveal>

          {/* ---------- Remaining statistics ---------- */}
          {REST_STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              className="lg:col-span-2"
              delay={0.15 + index * 0.05}
              offset={16}
            >
              <Card className="flex h-full flex-col justify-between p-7">
                <div>
                  <span className="tabular block text-[2.25rem] font-medium leading-none tracking-tight text-ink">
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </span>
                  <p className="mt-2.5 text-[0.9375rem] font-medium text-ink">
                    {stat.label}
                  </p>
                </div>
                <p className="mt-5 text-pretty text-xs leading-[1.5] text-muted">
                  {stat.note}
                </p>
              </Card>
            </Reveal>
          ))}

          {/* ---------- Stack, full width ---------- */}
          <Reveal className="sm:col-span-2 lg:col-span-6" delay={0.3} offset={16}>
            <Card className="flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between">
              <Eyebrow as="h3" className="shrink-0">
                Built and shipped with
              </Eyebrow>
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {STACK.map((key) => {
                  const { Icon, label } = TECH[key];
                  return (
                    <li
                      key={key}
                      className="flex items-center gap-2 text-muted transition-colors duration-200 ease-out hover:text-ink"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="text-sm font-medium">{label}</span>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
