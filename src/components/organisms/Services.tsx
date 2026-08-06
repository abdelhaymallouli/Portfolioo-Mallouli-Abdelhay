import { Check } from "lucide-react";
import { Container, Section } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Card } from "@/components/atoms/Card";
import { Reveal } from "@/components/motion/Reveal";
import { SERVICES } from "@/data/content";

/**
 * What I can be hired to do.
 *
 * A three-up card grid rather than a list, because these are parallel
 * offerings a reader scans for the one that matches their need — a vertical
 * list implies a sequence or a ranking that isn't there.
 *
 * The numeral in each card is decorative ordering only, so it is hidden from
 * assistive tech; the heading already carries the identity.
 */
export function Services() {
  return (
    <Section id="services" tone="subtle">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="What I can take off your plate."
          description="Six things I'm hired to do. Most engagements are some combination of the first two — the rest tend to arrive once a system is live and the real constraints show up."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={(index % 3) * 0.05} offset={16}>
              <Card className="flex h-full flex-col p-7 md:p-8">
                <span
                  aria-hidden="true"
                  className="tabular font-mono text-xs text-muted"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-5 text-xl font-medium tracking-tight text-ink">
                  {service.title}
                </h3>

                <p className="mt-3 text-pretty text-[0.9375rem] leading-[1.7] text-secondary">
                  {service.body}
                </p>

                <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[0.875rem] leading-[1.5] text-secondary"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-dusty-green"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
