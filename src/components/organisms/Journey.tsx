"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
import {
  EDUCATION,
  EXPERIENCE,
  JOURNEY_OUTLOOK,
  isPlaceholderEducation,
} from "@/data/content";
import { VISIBLE_PROJECTS } from "@/data/projects";
import { TECH } from "@/lib/tech-icons";

type MilestoneKind = "Education" | "Role" | "Project" | "Outlook";

/**
 * Edge stripe per milestone kind.
 *
 * Four values from the existing palette, no new tokens. This is the one place
 * the site uses colour to encode a category rather than to mark an action —
 * justified because the stripe is decorative reinforcement: the kind is also
 * written in text beside it, so nothing depends on distinguishing the hues.
 */
const KIND_ACCENT: Record<MilestoneKind, string> = {
  Education: "bg-dusty-green",
  Role: "bg-ink",
  Project: "bg-primary",
  Outlook: "bg-line-strong",
};

type Milestone = {
  /** Sort key. Extracted from the entry's own stated year. */
  year: string;
  kind: MilestoneKind;
  title: string;
  detail: string;
  meta: string;
  /**
   * Where "see more" goes. Only projects have somewhere real to point, so
   * roles and education carry no link rather than a dead one.
   */
  href?: string;
  /** Up to three technologies, shown as chips. */
  tags?: string[];
  /** Marks an entry still carrying placeholder data. */
  placeholder?: boolean;
};

/**
 * Builds the sequence from data that already exists rather than a second,
 * hand-maintained list — a journey that can disagree with the sections above
 * it is worse than no journey.
 *
 * Education, roles and shipped projects are interleaved because that is the
 * actual story: what was learned, what was built, and where.
 */
function buildMilestones(): Milestone[] {
  const education: Milestone[] = EDUCATION.map((entry) => ({
    year: entry.period.match(/\d{4}/)?.[0] ?? entry.period,
    kind: "Education",
    title: entry.programme,
    detail: entry.detail ?? "",
    meta: [entry.school, entry.location].filter(Boolean).join(" · "),
    placeholder: isPlaceholderEducation(entry),
  }));

  const roles: Milestone[] = EXPERIENCE.map((job) => ({
    // "June 2026 — Present" / "July 2025 — August 2025" → leading year.
    year: job.period.match(/\d{4}/)?.[0] ?? job.period,
    kind: "Role",
    title: job.role.replace(/\s*\((Internship|Remote)\)\s*/gi, "").trim(),
    detail: job.summary,
    meta: `${job.company} · ${job.location}`,
    tags: job.stack.slice(0, 3).map((key) => TECH[key].label),
  }));

  const projects: Milestone[] = VISIBLE_PROJECTS.map((project) => ({
    year: project.year.match(/\d{4}/)?.[0] ?? project.year,
    kind: "Project",
    title: project.title,
    detail: project.tagline,
    meta: [project.role.split("—")[0].trim(), project.team]
      .filter(Boolean)
      .join(" · "),
    href: `/projects/${project.slug}`,
    tags: project.stack.slice(0, 3).map((key) => TECH[key].label),
  }));

  /*
   * Oldest first. The old Trajectory sorted newest-first, which is correct for
   * a résumé index — a reviewer reads the top three and stops. A story has to
   * start at the beginning, so this reverses it.
   */
  const sorted = [...education, ...roles, ...projects].sort((a, b) =>
    a.year.localeCompare(b.year),
  );

  return [
    ...sorted,
    {
      year: JOURNEY_OUTLOOK.year,
      kind: "Outlook",
      title: JOURNEY_OUTLOOK.title,
      detail: JOURNEY_OUTLOOK.detail,
      meta: "",
    },
  ];
}

/* ------------------------------------------------------------------ *
 * Path geometry
 *
 * The connecting line is generated from the milestone count rather than
 * measured from the DOM. That keeps it deterministic and SSR-safe — there is
 * no layout effect, no resize listener, and the server and client render byte
 * -identical markup.
 *
 * The trade is that cards must occupy predictable vertical slots, which is
 * why each row is a fixed `ROW` height at `lg`. A card whose copy overflowed
 * that height would push itself off the path.
 * ------------------------------------------------------------------ */

/**
 * viewBox units per milestone row. Arbitrary in themselves — the SVG stretches
 * to its container — but the *ratio* between rows is what places the dots.
 */
const ROW = 100;
const HALF = 50;
/**
 * How far the curve swings past centre toward each card.
 *
 * Cards occupy `calc(50% - 3.5rem)` from each edge, so the clear channel down
 * the middle is only ~7rem wide. The swing has to stay inside that channel —
 * at ±34 the line ran straight through the cards instead of between them.
 */
const SWING = 11;

/**
 * The rendered height of one row at `lg`, in rem.
 *
 * This is the single number that couples the DOM to the path: the SVG divides
 * its height into equal `ROW` slots and the grid gives every row exactly this
 * height, so slot *n* always lands on card *n*. Change one and you must change
 * the other — hence `lg:h-[21rem]` below referencing this constant in prose
 * rather than being written independently.
 */
const ROW_REM = 21;

/**
 * Builds a serpentine `d` attribute alternating around the centre line.
 *
 * Each segment is a single cubic with both control points pulled vertically,
 * which produces the long lazy S the reference uses — a quadratic here reads
 * as a zigzag with rounded corners instead.
 */
function buildPath(count: number): string {
  if (count === 0) return "";

  // Start above the first anchor so the line enters from off-card.
  let d = `M ${HALF + sideOffset(0)} 0`;

  for (let i = 0; i < count; i += 1) {
    const y = i * ROW + HALF;
    const nextY = (i + 1) * ROW + HALF;
    const x = HALF + sideOffset(i);
    const nextX = HALF + sideOffset(i + 1);

    // Anchor point at this card, then curve toward the next.
    d += ` L ${x} ${y}`;
    if (i < count - 1) {
      d += ` C ${x} ${y + ROW * 0.45}, ${nextX} ${nextY - ROW * 0.45}, ${nextX} ${nextY}`;
    }
  }

  return d;
}

/** Even indices sit left of centre, odd sit right. */
function sideOffset(index: number): number {
  return index % 2 === 0 ? -SWING : SWING;
}

/** Anchor coordinates, so the dots land exactly on the path. */
function anchorPoints(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    x: HALF + sideOffset(i),
    y: i * ROW + HALF,
  }));
}

/**
 * A junction dot that fills in as the drawing head passes it.
 *
 * Its own component for the same reason as `JourneyCard`: `useTransform` is a
 * hook and cannot be called inside the `.map()` that renders the dots.
 *
 * The fade window is deliberately narrow — the dot should snap on as the head
 * crosses it, not drift up over several hundred pixels of scroll.
 */
function MilestoneDot({
  point,
  index,
  count,
  progress,
  reduceMotion,
}: {
  point: { x: number; y: number };
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  /*
   * Dot `n` sits at the centre of slot `n`, which along a path normalised to
   * [0,1] is `(n + 0.5) / count`. The head reaches it there.
   */
  const at = (index + 0.5) / count;
  const opacity = useTransform(
    progress,
    [at - 0.5 / count, at],
    [0, 1],
  );

  return (
    <motion.path
      d={`M ${point.x} ${point.y} v 0.01`}
      stroke="var(--color-ink)"
      strokeWidth="5"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      style={{ opacity: reduceMotion ? 1 : opacity }}
    />
  );
}

/**
 * One milestone, driven by the shared scroll progress.
 *
 * This is its own component for a mechanical reason: `useTransform` is a hook,
 * and hooks cannot be called inside a `.map()` callback. Extracting the card
 * gives each milestone its own hook scope.
 *
 * The card's window is `[index / count, (index + 1) / count]`, and it reaches
 * full opacity within the first 40% of that window — not at its end. That
 * matters: it means the card has settled by the time the drawing line arrives
 * at its dot, rather than still fading in behind it.
 */
function JourneyCard({
  milestone,
  index,
  count,
  progress,
  reduceMotion,
}: {
  milestone: Milestone;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const start = index / count;
  // Settles 40% into its own slot, so the line never outruns the card.
  const settled = start + (1 / count) * 0.4;

  const opacity = useTransform(progress, [start, settled], [0, 1]);
  const y = useTransform(progress, [start, settled], [24, 0]);

  const left = index % 2 === 0;

  return (
    <li
      /*
       * Row height must stay in step with the `ROW` viewBox unit: the path
       * divides its height into equal slots, so a row taller than this pushes
       * the card off its dot.
       */
      className={cn(
        "relative mb-8 last:mb-0 lg:mb-0 lg:flex lg:h-[21rem] lg:items-center",
        left ? "lg:justify-start" : "lg:justify-end",
      )}
    >
      <motion.div
        /*
         * Below `lg` there is no path to synchronise with, so scroll-linked
         * opacity would tie these cards to geometry that isn't rendered. The
         * transform is applied at `lg` and up only; smaller screens get the
         * plain in-view reveal via CSS-free full opacity.
         */
        style={
          reduceMotion
            ? undefined
            : { opacity, y }
        }
        className={cn(
          "relative w-full lg:w-[calc(50%-3.5rem)]",
          // Reduced motion and small screens both render solid.
          reduceMotion && "opacity-100",
        )}
      >
        {/*
         * Connector stub — a short tick from the card's inner edge toward the
         * path, so a card reads as attached to the route rather than floating
         * near it. Sits on the side facing centre, which flips with the card.
         */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 hidden h-px w-8 -translate-y-1/2 bg-muted/35 lg:block",
            left ? "left-full" : "right-full",
          )}
        />
        <Card
          interactive={Boolean(milestone.href)}
          className={cn(
            "group/card relative overflow-hidden",
            milestone.kind === "Outlook" && "border-dashed",
          )}
        >
          {/*
           * Kind stripe down the leading edge. The only colour on the card,
           * and it does real work: at a glance the eye can separate what was
           * studied from what was built from where it was built, without
           * reading the label.
           */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-y-0 left-0 w-1",
              KIND_ACCENT[milestone.kind],
            )}
          />

          <div className="p-6 pl-7 sm:p-7 sm:pl-8">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="tabular text-[1.75rem] font-medium leading-none tracking-tight text-ink">
                {milestone.year}
              </span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                {milestone.kind}
              </span>
              {milestone.placeholder && (
                /*
                 * Text, not a colour or icon — an unfilled entry has to
                 * announce itself to a screen reader too.
                 */
                <span className="rounded-full border border-line-strong px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                  Placeholder
                </span>
              )}
            </div>

            <h3 className="mt-4 text-[1.0625rem] font-medium tracking-tight text-ink">
              {milestone.title}
            </h3>

            {milestone.meta && (
              <p className="mt-1 text-sm text-muted">{milestone.meta}</p>
            )}

            {milestone.detail && (
              <p className="mt-3 text-pretty text-[0.9375rem] leading-[1.65] text-secondary">
                {milestone.detail}
              </p>
            )}

            {milestone.tags && milestone.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {milestone.tags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex h-6 items-center rounded-full border border-line px-2.5 text-[0.6875rem] text-muted">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {milestone.href && (
              /*
               * Stretched link: the anchor covers the whole card, so the
               * entire surface is clickable while the DOM keeps exactly one
               * tab stop and one accessible name.
               */
              <Link
                href={milestone.href}
                className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span className="link-underline">See more</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </Card>
      </motion.div>
    </li>
  );
}

/**
 * Journey — education, roles and shipped systems as one sequence.
 *
 * This replaced the old "Trajectory" list rather than sitting beside it. The
 * two carried the same milestones from the same data; the change is framing —
 * oldest first, education included, and the progression made visible.
 *
 * Distinct from About, which is the reflective first-person story. This is the
 * sequence: what happened, in what order.
 *
 * The connecting path draws itself as the section scrolls. It is the one place
 * on the site that uses a curve rather than a straight hairline, and it earns
 * that: the line *is* the content here, tracing a route between milestones
 * rather than merely separating them.
 */
export function Journey() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const milestones = buildMilestones();
  const anchors = anchorPoints(milestones.length);
  const path = buildPath(milestones.length);
  const viewHeight = milestones.length * ROW;

  /*
   * Measured across the track, starting once it is well into view so the line
   * isn't already half-drawn when the first card appears.
   */
  /*
   * The window the draw is scrubbed across.
   *
   * `start 0.55` begins once the track's top reaches mid-viewport, so the
   * first card is already on screen when the line starts; `end 0.85` finishes
   * as the last card clears the fold. The earlier `["start 0.8", "end 0.7"]`
   * started far too late and finished too early — the head trailed well below
   * the cards, leaving everything above it sitting on the undrawn grey track.
   */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.55", "end 0.85"],
  });

  // Smooths raw scroll input, matching ScrollProgress.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  /*
   * Standard SVG line-draw. `pathLength={1}` normalises the geometry to one
   * unit, so dash values are plain fractions regardless of the real length.
   *
   * Rather than rely on offset arithmetic — where a sign error silently fills
   * the line from the wrong end — the dash array itself is animated: the dash
   * is exactly `p` long, followed by a gap covering the rest. There is no
   * offset at all, so "how much is drawn" is stated directly and always
   * measured from the path's origin.
   */
  const dashArray = useTransform(progress, (value) => `${value} 1`);

  /*
   * The marker rides the head of that run, expressed the same way: a leading
   * gap of exactly `p` puts the first dash at distance `p` along the path —
   * precisely where the drawn stroke ends. The dash is near-zero, so only its
   * round cap paints, giving a dot.
   *
   * Reading from the same `progress` value as the line means the two cannot
   * drift apart no matter how the scroll is scrubbed.
   */
  const markerArray = useTransform(progress, (value) => `0 ${value} 0.0001 1`);

  return (
    <Section id="journey" tone="subtle">
      <Container>
        <SectionHeading
          eyebrow="Journey"
          title="How I got here."
          description="Where I learned, what I built, and where it was built. Oldest first — the shape of it matters more than any single entry."
        />

        <div ref={trackRef} className="relative mt-16 lg:mt-24">
          {/* ---------------- Connecting path ---------------- */}
          {/*
           * Height is computed from `ROW_REM`, not left to `inset-0`, so the
           * SVG covers exactly the rows it draws. Letting it stretch to the
           * container would smear the geometry whenever the last card's copy
           * ran long.
           */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 100 ${viewHeight}`}
            preserveAspectRatio="none"
            style={{ height: `${milestones.length * ROW_REM}rem` }}
            className="pointer-events-none absolute inset-x-0 top-0 hidden w-full lg:block"
          >
            {/*
             * Resting track — the whole route at a hairline, so the shape of
             * the journey is legible before any of it is drawn.
             *
             * `vectorEffect="non-scaling-stroke"` is what keeps these at a
             * true 1px: the viewBox is stretched by `preserveAspectRatio
             * ="none"`, which would otherwise scale the stroke into a wedge
             * — thick on the vertical runs, thin on the horizontal ones.
             */}
            <path
              d={path}
              fill="none"
              stroke="var(--color-muted)"
              strokeOpacity="0.35"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            {/* Drawn portion — same hairline weight, full ink. */}
            <motion.path
              d={path}
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              /*
               * A static `0 1` as well as the MotionValue. A MotionValue only
               * takes effect after hydration, so without this the server
               * renders the path with no dash at all — meaning the entire
               * route flashes solid ink before JS loads and clamps it back.
               */
              strokeDasharray="0 1"
              style={{
                strokeDasharray: reduceMotion ? "1 0" : dashArray,
              }}
            />

            {/*
             * Junction dots.
             *
             * A zero-length subpath (`l 0 0`) renders nothing in most engines
             * even with a round cap — the spec leaves it undefined. A 0.01-unit
             * segment is the reliable way to get a round dot, and combined with
             * `non-scaling-stroke` it stays circular despite the stretched
             * viewBox that would turn a `<circle>` into an ellipse.
             */}
            {anchors.map((point, index) => (
              <g key={index}>
                {/* Knocks the track out behind the dot, so it reads as a bead
                    on the line rather than a spot painted over it. */}
                <path
                  d={`M ${point.x} ${point.y} v 0.01`}
                  stroke="var(--color-subtle)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Unreached: matches the faint resting track. */}
                <path
                  d={`M ${point.x} ${point.y} v 0.01`}
                  stroke="var(--color-muted)"
                  strokeOpacity="0.35"
                  strokeWidth="5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                {/*
                 * Reached: fades to full ink as the head passes. Without this
                 * every dot sat black from the start, which gave away the
                 * whole route and made the draw feel decorative rather than
                 * like progress.
                 */}
                <MilestoneDot
                  point={point}
                  index={index}
                  count={anchors.length}
                  progress={progress}
                  reduceMotion={Boolean(reduceMotion)}
                />
              </g>
            ))}
          </svg>

          {/*
           * The travelling marker — a single dot riding the head of the drawn
           * line, in the accent yellow.
           *
           * It renders in its own SVG stacked above the track so it paints
           * over the dots rather than under them. Crucially it uses the same
           * `d` string the line is drawn from, so the marker and the line head
           * cannot drift apart — they are literally the same geometry, read at
           * the same scroll value.
           */}
          {!reduceMotion && (
            <svg
              aria-hidden="true"
              viewBox={`0 0 100 ${viewHeight}`}
              preserveAspectRatio="none"
              style={{ height: `${milestones.length * ROW_REM}rem` }}
              className="pointer-events-none absolute inset-x-0 top-0 hidden w-full lg:block"
            >
              {/* Halo, so the marker reads against both the line and a card. */}
              <motion.path
                d={path}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeOpacity="0.25"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                /* Static pre-hydration value, as on the marker itself. */
                strokeDasharray="0 0 0.0001 1"
                style={{ strokeDasharray: markerArray }}
              />
              <motion.path
                d={path}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="9"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                /*
                 * `0 p 0.0001 1` — a leading gap of exactly `p`, then a
                 * near-zero dash whose round cap paints the dot. Exactly `0`
                 * is undefined behaviour and renders nothing in several
                 * engines, hence the epsilon.
                 *
                 * The static value keeps the marker at the path's origin
                 * before hydration rather than stroking the whole route.
                 */
                strokeDasharray="0 0 0.0001 1"
                style={{ strokeDasharray: markerArray }}
              />
            </svg>
          )}

          {/* ---------------- Milestones ---------------- */}
          <ol className="relative">
            {milestones.map((milestone, index) => (
              <JourneyCard
                key={`${milestone.year}-${milestone.title}`}
                milestone={milestone}
                index={index}
                count={milestones.length}
                progress={progress}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
