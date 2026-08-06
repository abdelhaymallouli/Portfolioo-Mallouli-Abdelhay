import { Plus } from "lucide-react";
import { Container, Section } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FAQ as FAQ_ITEMS } from "@/data/content";

/**
 * Frequently asked questions.
 *
 * Built on native <details>/<summary> rather than a JS accordion. That buys
 * keyboard operation, screen-reader semantics, and in-page find for free, and
 * ships no client JavaScript — the Experience accordion needs state because it
 * is single-select, but this doesn't.
 *
 * The marker rotates via CSS on [open]; there is no height animation, because
 * animating `height: auto` correctly would require the JS this section exists
 * to avoid.
 */
export function FAQ() {
  return (
    <Section id="faq">
      <Container>
        <SectionHeading
          eyebrow="Questions"
          title="What people usually ask first."
        />

        <div className="mt-16">
          {FAQ_ITEMS.map((item, index) => (
            <Reveal key={item.question} delay={Math.min(index * 0.04, 0.2)}>
              <details className="group border-t border-line last:border-b">
                <summary
                  className={[
                    // Removes the default disclosure triangle in every engine.
                    "flex cursor-pointer list-none items-start justify-between gap-6 py-6",
                    "text-[1.0625rem] font-medium tracking-[-0.01em] text-ink",
                    "transition-colors duration-200 hover:text-accent",
                    "[&::-webkit-details-marker]:hidden",
                  ].join(" ")}
                >
                  <span className="text-pretty">{item.question}</span>
                  <Plus
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-45"
                  />
                </summary>

                <p className="measure -mt-1 pb-7 text-pretty text-[0.9375rem] leading-[1.7] text-secondary">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
