import { Container, Section } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Watermark } from "@/components/atoms/Watermark";
import { Reveal } from "@/components/motion/Reveal";
import { HIGHLIGHT } from "@/data/content";

/**
 * Single-statement band between the work and the services.
 *
 * Deliberately sparse: one claim at display size, a short justification, and
 * three proof points. It exists to give the page a beat of stillness after
 * four dense case studies and before six service cards — without it the two
 * heavy sections collide and neither lands.
 *
 * The watermark carries the scale here rather than a larger heading, which
 * keeps the actual statement at a readable measure.
 */
export function Highlight() {
  return (
    <Section className="relative overflow-hidden">
      <Container className="relative">
        <Watermark className="-top-8 right-0 md:-top-16 lg:-top-24">
          Approach
        </Watermark>

        <div className="relative z-10 measure">
          <Reveal>
            <Eyebrow>{HIGHLIGHT.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="mt-5 text-balance text-[2rem] font-medium leading-[1.1] tracking-tight text-ink sm:text-[2.5rem] lg:text-[3rem]">
              {HIGHLIGHT.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 text-pretty text-[1.0625rem] leading-[1.7] text-secondary">
              {HIGHLIGHT.body}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <dl className="relative z-10 mt-14 grid gap-x-8 gap-y-8 border-t border-line pt-10 sm:grid-cols-3">
            {HIGHLIGHT.proof.map((item) => (
              <div key={item.label}>
                <dt className="text-[0.9375rem] font-medium text-ink">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-pretty text-sm leading-[1.6] text-muted">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
