import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { ButtonLink } from "@/components/atoms/Button";
import { Watermark } from "@/components/atoms/Watermark";
import { ProjectShowcaseCard } from "@/components/molecules/ProjectShowcaseCard";
import { Reveal } from "@/components/motion/Reveal";
import { FEATURED_PROJECTS, VISIBLE_PROJECTS } from "@/data/projects";

/**
 * Column spans on a 14-track bed, cycling 9/5 then 5/9.
 *
 * Fourteen columns rather than twelve is what makes the asymmetry work: 9+5
 * splits the row roughly 64/36, a ratio that reads as deliberate composition.
 * The same split on twelve columns lands on 8+4, which is exactly two thirds
 * and reads as a plain sidebar layout instead.
 *
 * Alternating the wide tile between left and right stops the grid settling
 * into a rhythm the eye can predict and skip past.
 */
const SPANS = [
  "md:col-span-7 lg:col-span-9",
  "md:col-span-7 lg:col-span-5",
  "md:col-span-7 lg:col-span-5",
  "md:col-span-7 lg:col-span-9",
] as const;

/** `sizes` must track SPANS, or the browser fetches the wrong candidate. */
const SIZES = [
  "(min-width: 1024px) 64vw, (min-width: 768px) 50vw, 100vw",
  "(min-width: 1024px) 36vw, (min-width: 768px) 50vw, 100vw",
  "(min-width: 1024px) 36vw, (min-width: 768px) 50vw, 100vw",
  "(min-width: 1024px) 64vw, (min-width: 768px) 50vw, 100vw",
] as const;

/**
 * Image-led grid of featured work.
 *
 * This is the visual hook and the only project surface on the home page —
 * imagery first, with the written detail living on each case-study route.
 */
export function ProjectShowcase() {
  return (
    <section
      id="work"
      className="relative scroll-mt-24 overflow-hidden py-section-sm md:py-section"
    >
      <Container className="relative">
        {/*
         * The watermark anchors to the top of the container and the cards
         * overlap its lower half — the word is meant to be partially covered,
         * so it reads as a layer behind the grid rather than as a heading
         * sitting above it.
         *
         * The negative inset pulls the word past the container gutter so it
         * bleeds toward the viewport edge. How much of it stays uncovered is
         * set by the grid's top margin below, not here — this element is
         * `absolute` and has no flow of its own to push against.
         */}
        <Watermark className="-left-4 top-0 sm:-left-6 lg:-left-8">
          Projects
        </Watermark>

        {/*
         * The watermark is `aria-hidden`, so without this the section would
         * have no heading at all and its tiles would float free in the
         * document outline. Visually hidden because the giant ghost word
         * already does the labelling job on screen.
         */}
        <h2 className="sr-only">Selected projects</h2>

        {/*
        
         * Cap height, not box height, sets these. The watermark's box is
         * 87.5 / 175 / 245px, but Inter's capitals fill only ~70% of that and
         * sit low in it — measuring from the box top left an obvious dead gap
         * above the cards. These land the card edge just past the baseline so
         * the word is cut, not floating clear of it.
         */}
        <div className="relative z-10 mt-14 grid grid-cols-1 gap-6 md:mt-28 md:grid-cols-14 lg:mt-40">
          {FEATURED_PROJECTS.slice(0, 4).map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 0.05}
              offset={16}
              className={`${SPANS[index]} h-[340px] md:h-[440px]`}
            >
              {/*
               * No `priority`: this grid sits below the fold on every
               * viewport, so eager-loading it would compete with the hero for
               * the preload slot without ever being the LCP element.
               */}
              <ProjectShowcaseCard
                project={project}
                sizes={SIZES[index]}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>

        {/*
         * The only route to the full archive now that the case-study section
         * is gone — without it the four featured tiles are a dead end.
         */}
        <Reveal delay={0.1} className="relative z-10 mt-12">
          <ButtonLink href="/projects" variant="secondary" size="lg">
            View all {VISIBLE_PROJECTS.length} projects
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
              aria-hidden="true"
            />
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
