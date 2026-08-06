import { Container, Section } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PRINCIPLES } from "@/data/content";

/**
 * Engineering philosophy.
 *
 * Numbered entries on a plain grid rather than boxed cards — the rules read as
 * a considered list instead of six competing panels. Hover lifts the row
 * fractionally and darkens the rule above it; nothing else moves.
 */
export function Philosophy() {
  return (
    <Section id="philosophy">
      <Container>
        <SectionHeading
          eyebrow="Philosophy"
          title="How I make engineering decisions."
          description="Positions I've arrived at from shipping and maintaining production systems — each one is a trade-off I'd defend in review."
        />

        <RevealGroup className="mt-20 grid gap-x-12 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <RevealItem key={principle.title}>
              <article className="group h-full border-t border-line py-8 transition-colors duration-200 hover:border-ink">
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-5 text-[1.0625rem] font-medium tracking-[-0.01em] text-ink">
                  {principle.title}
                </h3>

                <p className="mt-3 text-pretty text-[0.9375rem] leading-[1.65] text-secondary">
                  {principle.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
