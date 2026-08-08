"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Card } from "@/components/atoms/Card";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Chip } from "@/components/atoms/Chip";
import { MilestoneDialog } from "@/components/molecules/MilestoneDialog";
import { EDUCATION, EXPERIENCE, JOURNEY_OUTLOOK } from "@/data/career";
import { TECH } from "@/lib/tech-icons";

/* ─────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────── */

type MilestoneKind = "Education" | "Role" | "Outlook";

type Milestone = {
  year: string;
  kind: MilestoneKind;
  title: string;
  detail: string;
  meta: string;
  /** Sort key — see `startsAt`. Not rendered. */
  sortKey: number;
  tags?: string[];
  details?: string[];
  tech?: string[];
  certificate?: { name: string; url?: string };
};

/* ─────────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────────── */

/** Month names as they appear in the `period` strings, for `startsAt`. */
const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/**
 * A sortable start date for a `period` string, as `year * 12 + month`.
 *
 * Periods are written two ways — "2024 — 2025" for an academic year and
 * "July 2025 — August 2025" for a dated role — so the year alone cannot order
 * them. The Pragmatic Minds internship (July 2025) and the second SOLICODE
 * year (2025 — 2026) both yield "2025", and the sort was falling back to array
 * order, which listed the internship after a programme it ran *during*.
 *
 * An undated period is an academic year, so it sorts to **September** rather
 * than January: "2025 — 2026" begins that autumn, which is what places the
 * July 2025 internship before it instead of after. Sorting those to January
 * reproduces the original bug in a subtler form.
 */
const ACADEMIC_YEAR_START = 8; // September, zero-indexed.

function startsAt(period: string): number {
  const year = Number(period.match(/\d{4}/)?.[0] ?? 0);
  const monthName = period.toLowerCase().match(/[a-zé]+/)?.[0] ?? "";
  const monthIndex = MONTHS.indexOf(monthName);
  return year * 12 + (monthIndex === -1 ? ACADEMIC_YEAR_START : monthIndex);
}

function buildMilestones(): Milestone[] {
  const education: Milestone[] = EDUCATION.map((entry) => ({
    year: entry.period.match(/\d{4}/)?.[0] ?? entry.period,
    sortKey: startsAt(entry.period),
    kind: "Education" as const,
    title: entry.programme,
    detail: entry.detail ?? "",
    meta: [entry.school, entry.location].filter(Boolean).join(" · "),
    tags: entry.tech?.slice(0, 3),
    details: entry.details,
    tech: entry.tech,
    certificate: entry.certificate,
  }));

  const roles: Milestone[] = EXPERIENCE.map((job) => ({
    year: job.period.match(/\d{4}/)?.[0] ?? job.period,
    sortKey: startsAt(job.period),
    kind: "Role" as const,
    title: job.role.replace(/\s*\((Internship|Remote)\)\s*/gi, "").trim(),
    detail: job.summary,
    meta: `${job.company} · ${job.location}`,
    tags: job.stack
      .filter((key) => key in TECH)
      .slice(0, 3)
      .map((key) => TECH[key].label),
    details: job.achievements,
    tech: job.stack.map((key) => (key in TECH ? TECH[key].label : String(key))),
  }));

  return [
    ...[...education, ...roles].sort((a, b) => a.sortKey - b.sortKey),
    {
      year: JOURNEY_OUTLOOK.year,
      /* Always last — "Next" has no date to sort by. */
      sortKey: Number.MAX_SAFE_INTEGER,
      kind: "Outlook" as const,
      title: JOURNEY_OUTLOOK.title,
      detail: JOURNEY_OUTLOOK.detail,
      meta: "",
    },
  ];
}

/* ─────────────────────────────────────────────────────────────────────
   Design tokens per kind
───────────────────────────────────────────────────────────────────── */

/*
 * The left rail. A gradient that fades out toward the bottom rather than a
 * flat bar — borrowed from the reference card, where the rail reads as a
 * highlight on the edge instead of a block of colour bolted to it.
 *
 * The reference ran one teal→gold gradient on every card. Here the top colour
 * is the kind's own accent, so the rail still does the job the flat stripe
 * did: telling Education from Role at a glance, down a long timeline.
 */
const KIND_RAIL: Record<MilestoneKind, string> = {
  Education: "from-dusty-green",
  Role:      "from-ink",
  Outlook:   "from-line-strong",
};

const KIND_DOT_RING: Record<MilestoneKind, string> = {
  Education: "ring-dusty-green/60",
  Role:      "ring-ink/60",
  Outlook:   "ring-line-strong",
};

const KIND_DOT_BG: Record<MilestoneKind, string> = {
  Education: "bg-dusty-green",
  Role:      "bg-ink",
  Outlook:   "bg-line-strong",
};

/* ─────────────────────────────────────────────────────────────────────
   Spine SVG — serpentine S-curve
   ·  CARD_W = 42%  ↔  mirrors  lg:w-[42%]
   ·  The curve is defined to pass through xAt(i), yAt(i) — so the dot
      placed at the card's inner edge is always ON the line.
   ·  preserveAspectRatio="none" + vectorEffect="non-scaling-stroke"
      stretches the path to the section's real height while keeping the
      stroke a true 1-pixel hairline on both axes.
───────────────────────────────────────────────────────────────────── */

const CARD_W   = 34;
const EDGE_L   = CARD_W;
const EDGE_R   = 100 - CARD_W;

function spineD(count: number): string {
  if (count === 0) return "";
  const step = 100 / count;
  const xAt  = (i: number) => (i % 2 === 0 ? EDGE_L : EDGE_R);
  const yAt  = (i: number) => (i + 0.5) * step;

  let d = `M ${xAt(0)} 0`;
  for (let i = 0; i < count; i++) {
    const x = xAt(i);
    const y = yAt(i);
    d += ` L ${x} ${y}`;
    if (i < count - 1) {
      const nx   = xAt(i + 1);
      const ny   = yAt(i + 1);
      const pull = step * 0.42;
      d += ` C ${x} ${y + pull}, ${nx} ${ny - pull}, ${nx} ${ny}`;
    }
  }
  d += ` L ${xAt(count - 1)} 100`;
  return d;
}

/* Shared SVG shell — stroke colour set by the caller via className/style */
function SpinePath({
  count,
  stroke,
  strokeWidth = "1.5",
  opacity = 1,
}: {
  count: number;
  stroke: string;
  strokeWidth?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d={spineD(count)}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={opacity}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   JourneyCard — one milestone in the timeline
───────────────────────────────────────────────────────────────────── */

function JourneyCard({
  milestone,
  index,
  count,
  progress,
  reduceMotion,
  onOpen,
}: {
  milestone: Milestone;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  onOpen: (m: Milestone) => void;
}) {
  const hasMore = Boolean(
    milestone.details?.length || milestone.certificate || milestone.tech?.length,
  );

  const left    = index % 2 === 0;
  const start   = index / count;
  const settled = start + (1 / count) * 0.4;

  const opacity = useTransform(progress, [start, settled], [0, 1]);
  const y       = useTransform(progress, [start, settled], [20, 0]);

  return (
    <li
      className={cn(
        "relative mb-8 last:mb-0",
        /*
         * Fixed height, not `min-h`. The spine places every dot at an equal
         * fraction of the track (`yAt` in spineD), so rows must all be the
         * same height or the dots drift off the curve. Raised from 24rem to
         * fit the larger title and the new footer rule.
         */
        "lg:mb-0 lg:flex lg:h-[26rem] lg:items-center",
        left ? "lg:justify-start" : "lg:justify-end",
      )}
    >
      <motion.div
        style={reduceMotion ? undefined : { opacity, y }}
        className={cn(
          "relative w-full lg:w-[34%]",
          reduceMotion && "opacity-100",
        )}
      >
        {/* ── Dot: sits on the curve at the card's inner edge ── */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 z-20 hidden lg:block",
            "-translate-y-1/2 rounded-full",
            // Outer ring + glow
            /* Glow derived from the token via color-mix, not a literal — it
               was a hard-coded rgba(255,204,0,…) that silently kept the old
               yellow when the brand colour changed. */
            "h-4 w-4 ring-2 ring-offset-2 ring-offset-subtle shadow-[0_0_10px_2px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]",
            KIND_DOT_RING[milestone.kind],
            KIND_DOT_BG[milestone.kind],
            left ? "-right-2" : "-left-2",
          )}
        />

        {/* ── Card ── */}
        <Card
          className={cn(
            "group/card relative overflow-hidden",
            "shadow-subtle transition-all duration-300 ease-out",
            "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift",
            milestone.kind === "Outlook" && "border-dashed",
          )}
        >
          {/*
           * Left rail, inset from the corners and fading downward. Inset is
           * what keeps it from fighting the card's radius — a full-height bar
           * had to be squared off at the top to sit inside the rounded corner,
           * which is why it read as a bolted-on stripe.
           */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-y-4 left-0 w-[3px] rounded-r-full bg-gradient-to-b to-transparent",
              KIND_RAIL[milestone.kind],
            )}
          />

          {/*
           * A single soft wash in the top-left, echoing the Hero's horizon
           * glow. It only appears on hover, so a column of cards stays calm at
           * rest and the one under the pointer lifts out of the stack.
           */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover/card:opacity-100"
          />

          <div className="relative p-6 pl-7 sm:p-7 sm:pl-8">
            {/* Header row: year pill + kind label */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                className={cn(
                  "inline-flex items-center rounded-md px-2.5 py-0.5",
                  "bg-ink font-mono text-micro font-bold tracking-[0.1em] text-primary",
                )}
              >
                {milestone.year}
              </span>
              <Eyebrow as="span" size="xs">
                {milestone.kind}
              </Eyebrow>
            </div>

            {/*
             * Title at `text-title`, up from `text-lead`. The reference gets
             * most of its composure from one clear step between the title and
             * everything under it; at 17px the title was the same weight as
             * the body copy and the card had no focal point.
             */}
            <h3 className="mt-5 text-balance text-title font-semibold leading-[1.25] tracking-tight text-ink">
              {milestone.title}
            </h3>

            {/*
             * Meta in mono rather than uppercase sans. The reference sets it
             * in teal small-caps; teal is 4.1:1 on white here and fails AA at
             * this size, so the distinction is carried by the mono face
             * instead of by colour.
             */}
            {milestone.meta && (
              <p className="mt-2 font-mono text-caption text-muted">
                {milestone.meta}
              </p>
            )}

            {/* Summary */}
            {milestone.detail && (
              <p className="mt-4 max-w-[46ch] text-pretty text-body leading-[1.65] text-secondary">
                {milestone.detail}
              </p>
            )}

            {/* Tech chips */}
            {milestone.tags && milestone.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {milestone.tags.map((tag) => (
                  <li key={tag}>
                    <Chip size="sm">{tag}</Chip>
                  </li>
                ))}
              </ul>
            )}

            {/*
             * Footer rule with the CTA left and the position right, from the
             * reference. The index is the reason the rule earns its place:
             * without it the row is one button and a lot of empty space.
             */}
            {/* `justify-end` keeps the index right-aligned on the Outlook
                card, which has no button to sit opposite it. */}
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
              {hasMore && (
                <button
                  type="button"
                  onClick={() => onOpen(milestone)}
                  className={cn(
                    "inline-flex items-center gap-1.5",
                    "text-meta font-medium text-ink",
                    "after:absolute after:inset-0 after:content-['']",
                    "transition-colors hover:text-accent",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                  )}
                >
                  <span className="link-underline">See more</span>
                  <Plus
                    className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover/card:rotate-90"
                    aria-hidden="true"
                  />
                </button>
              )}

              <span
                aria-hidden="true"
                className="ml-auto shrink-0 font-mono text-micro tabular-nums tracking-[0.05em] text-muted"
              >
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Journey
───────────────────────────────────────────────────────────────────── */

export function Journey() {
  const reduceMotion = useReducedMotion();
  const trackRef     = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Milestone | null>(null);
  const milestones   = buildMilestones();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.85"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  /*
   * Clip-inset technique: a full-height, full-path copy of the spine sits
   * inside a wrapper whose clip-path shrinks from the bottom. As the user
   * scrolls, the clip lifts — revealing the coloured/glowing stroke while
   * the ghost layer beneath stays fully visible.
   *
   * No dash offset, no pathLength, no path-length measurements.
   * "How much is drawn" is literally the clip value.
   */
  const spineClip = useTransform(progress, (v) => {
    const pct = Math.min(100, Math.max(0, v * 100));
    return `inset(0 0 ${100 - pct}% 0)`;
  });

  return (
    <Section id="journey" tone="subtle">
      <Container>
        <SectionHeading
          eyebrow="Journey"
          title="How I got here."
          description="Where I studied, what I built, and where I worked — oldest first."
        />

        <div ref={trackRef} className="relative mt-16 lg:mt-24">
          {/* ── Spine (desktop only) ─────────────────────────────── */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            {/*
             * Layer 1 — ghost: the full route, always visible.
             * Very faint so it doesn't compete with the cards.
             */}
            <SpinePath
              count={milestones.length}
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.5"
            />

            {/*
             * Layer 2 — glow: a thicker, blurred copy of the active
             * portion. Clipped identically to layer 3 so they move together.
             * Gives depth without a separate SVG filter.
             */}
            <motion.div
              style={{ clipPath: reduceMotion ? undefined : spineClip }}
              className="absolute inset-0"
            >
              <SpinePath
                count={milestones.length}
                stroke="color-mix(in srgb, var(--color-primary) 35%, transparent)"
                strokeWidth="6"
                opacity={1}
              />
            </motion.div>

            {/*
             * Layer 3 — sharp primary line: 2 px, full opacity, brand yellow.
             * Clipped by the same value — rides on top of the glow.
             */}
            <motion.div
              style={{ clipPath: reduceMotion ? undefined : spineClip }}
              className="absolute inset-0"
            >
              <SpinePath
                count={milestones.length}
                stroke="var(--color-primary)"
                strokeWidth="2"
              />
            </motion.div>
          </div>

          {/* ── Cards ────────────────────────────────────────────── */}
          <ol className="relative">
            {milestones.map((milestone, index) => (
              <JourneyCard
                key={`${milestone.year}-${milestone.title}`}
                milestone={milestone}
                index={index}
                count={milestones.length}
                progress={progress}
                reduceMotion={Boolean(reduceMotion)}
                onOpen={setOpen}
              />
            ))}
          </ol>
        </div>
      </Container>

      <MilestoneDialog milestone={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
