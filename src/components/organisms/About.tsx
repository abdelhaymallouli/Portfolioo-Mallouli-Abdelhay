import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { GlowBackdrop } from "@/components/atoms/GlowBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { ABOUT, SITE } from "@/data/content";

const SOCIALS = [
  { label: "GitHub", href: SITE.github, Icon: SiGithub },
  { label: "LinkedIn", href: SITE.linkedin, Icon: FaLinkedin },
  { label: "Email", href: `mailto:${SITE.email}`, Icon: Mail },
] as const;

/**
 * About — a full-bleed dark band with the portrait beside the story.
 *
 * This is the only full-bleed section on the page. Running it edge to edge
 * rather than as an inset panel is what makes it read as a chapter break: the
 * page has been a sequence of light cards on a warm ground, and this stops
 * that rhythm outright before resuming it.
 */
export function About() {
  return (
    <section
      id="about"
      className="relative w-full scroll-mt-24 overflow-hidden bg-surface-dark"
    >
      <GlowBackdrop />

      <Container className="relative z-10 pb-20 pt-section-sm md:pb-24 md:pt-section">
        <SectionHeading tone="dark" title={ABOUT.heading} />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* ---------------- Portrait ---------------- */}
          <Reveal offset={16} className="lg:col-span-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-white/5">
              {ABOUT.portrait ? (
                <Image
                  src={ABOUT.portrait.src}
                  alt={ABOUT.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`${SITE.name} — portrait placeholder`}
                  className="flex h-full w-full items-center justify-center"
                >
                  <span className="text-[5rem] font-medium tracking-tight text-white/40">
                    {SITE.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          {/* ---------------- Story ---------------- */}
          <div className="flex flex-col lg:col-span-3">
            <Reveal delay={0.05}>
              <ul className="flex items-center gap-3 lg:justify-end">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/60 transition-colors duration-200 ease-out hover:border-white/40 hover:text-white"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-8 space-y-5">
              {ABOUT.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={Math.min(index * 0.05, 0.2)}>
                  <p
                    className={
                      index === 0
                        ? "text-pretty text-lg leading-[1.6] text-white sm:text-xl"
                        : "text-pretty text-body leading-[1.75] text-white/60"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                {ABOUT.facts.map((fact) => (
                  <div key={fact.label}>
                    <Eyebrow as="dt" tone="dark">
                      {fact.label}
                    </Eyebrow>
                    <dd className="mt-2 text-body text-white">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
