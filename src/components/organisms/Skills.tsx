import { Container, Section } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Chip } from "@/components/atoms/Chip";
import { Reveal } from "@/components/motion/Reveal";
import { TECH } from "@/lib/tech-icons";
import { SKILLS } from "@/data/content";

/**
 * Technical capability, grouped by layer.
 *
 * Chips only — no proficiency bars or percentages. A "React 85%" bar asserts
 * a precision nobody can verify and reads as filler; a categorised list of
 * what you actually work with is honest and faster to scan.
 *
 * Chip glyphs are monochrome. Rendering brand colours across two dozen chips
 * turns the section into confetti and pulls attention away from the type.
 *
 * Certifications and languages used to live here too. They were a separate
 * concern wearing the same layout, and now sit in the `Bento` grid — this
 * organism does one thing.
 */
export function Skills() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="Tools and practice."
          description="Grouped by where they sit in a system. Everything listed is something I've shipped with, not something I've read about."
        />

        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {SKILLS.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05}>
              <div className="border-t border-line pt-7">
                <Eyebrow as="h3">{group.title}</Eyebrow>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((tech) => {
                    const { Icon, label } = TECH[tech];
                    return (
                      <li key={tech}>
                        <Chip interactive tone="ink">
                          <Icon
                            className="h-3.5 w-3.5 text-muted"
                            aria-hidden="true"
                          />
                          {label}
                        </Chip>
                      </li>
                    );
                  })}

                  {/* Entries without a recognisable logo. */}
                  {group.extras?.map((extra) => (
                    <li key={extra}>
                      <Chip interactive>{extra}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
