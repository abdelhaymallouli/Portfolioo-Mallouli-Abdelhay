import { Container, Section } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { PROCESS } from "@/data/content";

/**
 * How an engagement runs, start to finish.
 *
 * Laid out as a horizontal sequence on desktop with a connecting rule behind
 * the step markers, so the order is legible at a glance without numbering
 * every heading. Below `lg` it stacks — a four-across sequence on a phone
 * compresses each step into two words and stops meaning anything.
 *
 * The rule is drawn behind the markers with a negative z-index rather than as
 * a border on each step, which keeps it from breaking at the gaps.
 */
export function Process() {
  return (
    <Section id="process">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="How the work actually runs."
          description="Four stages. The first one is where most of the value is decided, and it's the one that usually gets skipped."
        />

        <ol className="relative mt-16 grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Connector — desktop only, sits behind the markers. */}
          <li
            aria-hidden="true"
            className="absolute inset-x-0 top-[0.4375rem] -z-10 hidden h-px bg-line lg:block"
          />

          {PROCESS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06} as="li">
              <span
                aria-hidden="true"
                className="block h-3.5 w-3.5 rounded-full border border-line-strong bg-canvas"
              />

              <span className="tabular mt-6 block font-mono text-xs text-muted">
                Stage {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-3 text-lg font-medium tracking-tight text-ink">
                {step.title}
              </h3>

              <p className="mt-3 text-pretty text-[0.9375rem] leading-[1.7] text-secondary">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
