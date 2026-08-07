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
  tags?: string[];
  details?: string[];
  tech?: string[];
  certificate?: { name: string; url?: string };
};

/* ─────────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────────── */

function buildMilestones(): Milestone[] {
  const education: Milestone[] = EDUCATION.map((entry) => ({
    year: entry.period.match(/\d{4}/)?.[0] ?? entry.period,
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
    ...[...education, ...roles].sort((a, b) => a.year.localeCompare(b.year)),
    {
      year: JOURNEY_OUTLOOK.year,
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

const KIND_STRIPE: Record<MilestoneKind, string> = {
  Education: "bg-dusty-green",
  Role:      "bg-ink",
  Outlook:   "bg-line-strong",
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
        "lg:mb-0 lg:flex lg:h-[24rem] lg:items-center",
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
            "h-4 w-4 ring-2 ring-offset-2 ring-offset-subtle shadow-[0_0_10px_2px_rgba(255,204,0,0.35)]",
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
          {/* Kind stripe — 3 px, visually crisp */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-y-0 left-0 w-[3px] rounded-l-3xl",
              KIND_STRIPE[milestone.kind],
            )}
          />

          <div className="p-6 pl-7 sm:p-7 sm:pl-8">
            {/* Header row: year pill + kind label */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                className={cn(
                  "inline-flex items-center rounded-md px-2.5 py-0.5",
                  "bg-ink font-mono text-[11px] font-bold tracking-[0.1em] text-primary",
                )}
              >
                {milestone.year}
              </span>
              <Eyebrow as="span" size="xs">
                {milestone.kind}
              </Eyebrow>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-lead font-semibold leading-snug tracking-tight text-ink">
              {milestone.title}
            </h3>

            {/* Meta */}
            {milestone.meta && (
              <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted">
                {milestone.meta}
              </p>
            )}

            {/* Summary */}
            {milestone.detail && (
              <p className="mt-3 text-pretty text-body leading-[1.65] text-secondary">
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

            {/* CTA */}
            {hasMore && (
              <button
                type="button"
                onClick={() => onOpen(milestone)}
                className={cn(
                  "mt-5 inline-flex items-center gap-1.5",
                  "text-sm font-medium text-ink",
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
                stroke="rgba(255,204,0,0.35)"
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
