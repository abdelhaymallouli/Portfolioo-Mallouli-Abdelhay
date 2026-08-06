import { ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { ButtonLink } from "@/components/atoms/Button";
import { StatusDot } from "@/components/atoms/StatusDot";
import { HeroBackdrop } from "@/components/atoms/HeroBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { HERO, SITE } from "@/data/content";

/**
 * Hero — a dark inset panel carrying the whole first screen.
 *
 * The panel is the only inverted surface above the contact CTA, and it earns
 * that: against a page of warm light sections it reads as a distinct object
 * rather than as a header, and it gives the horizon glow somewhere to live.
 * A 2px gutter (`p-2` on the wrapper) keeps it from touching the viewport
 * edge, which is what makes it a panel instead of a background.
 *
 * Composition is asymmetric: the headline takes the left two-thirds at
 * display size, with the paragraph and both CTAs in a narrow right column.
 * Centring would force the headline to a narrower measure and cost it the
 * scale that makes the first screen land. Below `lg` the columns stack in
 * DOM order, which is already the reading order.
 *
 * No screenshots here. The name at the bottom sets the scale, and the work
 * itself gets the full-width showcase grid immediately below — putting
 * previews in both places made the first two screens say the same thing.
 */
export function Hero() {
  return (
    <section className="w-full p-2">
      {/*
       * `justify-between` pins the copy to the top and the wordmark to the
       * bottom, so the gap between them absorbs the viewport height rather
       * than the two blocks drifting apart at a fixed distance.
       */}
      <div className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden rounded-3xl bg-[#0a0a0a] pt-36 md:min-h-screen md:pt-44 lg:pt-52">
        <HeroBackdrop />

        <Container className="relative z-10">
          {SITE.availability.open && (
            <Reveal>
              <p className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1.5 pl-3 pr-4 text-[0.8125rem] text-white/70 backdrop-blur-sm">
                <StatusDot />
                Available for {SITE.availability.modes[0].toLowerCase()} work
              </p>
            </Reveal>
          )}

          <div className="mt-6 flex flex-col items-start gap-8 md:mt-10 lg:flex-row lg:gap-12">
            <Reveal delay={0.05} className="lg:flex-1">
              {/*
               * `text-balance` evens the line lengths rather than leaving an
               * orphan word on the last line. No explicit measure — the
               * column width already does that job.
               */}
              <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.03] tracking-tight text-white sm:text-[3rem] md:text-[3.5rem] lg:text-[4.5rem]">
                {HERO.headline}
              </h1>
            </Reveal>

            <div className="lg:max-w-md lg:pt-3">
              <Reveal delay={0.1}>
                <p className="text-pretty text-[1.0625rem] leading-[1.7] text-white/70">
                  {HERO.intro}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink
                    href={HERO.primaryCta.href}
                    size="lg"
                    className="border-white/25"
                  >
                    {HERO.primaryCta.label}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </ButtonLink>

                  <ButtonLink
                    href={HERO.secondaryCta.href}
                    variant="secondary"
                    size="lg"
                    /* Secondary defaults to a light fill — inverted here. */
                    className="border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10"
                  >
                    {HERO.secondaryCta.label}
                    <Download
                      className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-y-0.5"
                      aria-hidden="true"
                    />
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>

        {/*
         * The name at display scale, running the full width of the panel and
         * clipped at the bottom edge. `22vw` is what makes it read as
         * architecture rather than as a caption — at anything smaller it
         * looks like a heading that failed to fit.
         *
         * Decorative: the nav wordmark already carries the name for assistive
         * tech, so this is hidden rather than announced a second time.
         */}
        <p
          aria-hidden="true"
          className="pointer-events-none relative z-0 -mb-[0.12em] mt-20 select-none whitespace-nowrap bg-gradient-to-b from-white/30 to-transparent bg-clip-text text-center text-[22vw] font-semibold leading-[0.8] tracking-[-0.045em] text-transparent"
        >
          {SITE.name}
        </p>
      </div>
    </section>
  );
}
