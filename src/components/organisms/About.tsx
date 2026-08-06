import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { GlowBackdrop } from "@/components/atoms/GlowBackdrop";
import { Marquee } from "@/components/molecules/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { TECH } from "@/lib/tech-icons";
import {
  ABOUT,
  CERTIFICATIONS,
  DEV_LANGUAGES,
  SITE,
} from "@/data/content";

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
 *
 * The 2/5 + 3/5 split gives the portrait real presence without letting the
 * prose stretch past a comfortable measure. Below `lg` the columns stack in
 * DOM order — portrait, story, credentials — which is already reading order.
 *
 * Colour on this ground is constrained by contrast: `white/50` measures
 * 5.29:1 and passes AA, but `white/40` drops to 3.77:1 and fails. Muted text
 * therefore floors at 50%, and anything below that is a hairline, never type.
 */
export function About() {
  return (
    <section
      id="about"
      className="relative w-full scroll-mt-24 overflow-hidden bg-[#0a0a0a]"
    >
      <GlowBackdrop />

      <Container className="relative z-10 pb-20 pt-section-sm md:pb-24 md:pt-section">
        <Reveal>
          <h2 className="text-balance text-[2.25rem] font-medium leading-[1.1] tracking-tight text-white sm:text-[3rem] lg:text-[3.75rem]">
            {ABOUT.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* ---------------- Portrait ---------------- */}
          <Reveal offset={16} className="lg:col-span-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white/5">
              {ABOUT.portrait ? (
                <Image
                  src={ABOUT.portrait.src}
                  alt={ABOUT.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              ) : (
                /*
                 * No portrait yet. A lettermark holds the column's exact
                 * dimensions so the layout is identical before and after one
                 * is added — no reflow when the image lands.
                 */
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-[5rem] font-medium tracking-tight text-white/15">
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
                      className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/60 transition-colors duration-200 ease-out hover:border-white/35 hover:text-white"
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
                        : "text-pretty text-[0.9375rem] leading-[1.75] text-white/60"
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
                    <dt className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] text-white">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* ---------------- Certifications ---------------- */}
            <Reveal delay={0.2} className="mt-10">
              <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                Certified in
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {CERTIFICATIONS.slice(0, 4).map((cert) => (
                  <li
                    key={cert.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-[0.875rem] font-medium leading-[1.4] text-white">
                      {cert.title}
                    </p>
                    <p className="mt-1.5 text-xs text-white/50">
                      {cert.issuer} · {cert.date}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>

      {/*
       * Languages, drifting. Rendered outside `Container` so the track spans
       * the viewport rather than stopping at the 1440px measure — the strip
       * should read as continuous, and a track that visibly ends mid-page
       * gives away that it is a loop.
       *
       * `w-screen` would be the obvious way to do this and is wrong: it
       * includes scrollbar width and causes a horizontal shift. Sitting
       * outside the Container achieves the same thing for free.
       */}
      <div className="relative z-10 border-t border-white/10 py-8">
        <Marquee
          label="Programming languages I work in"
          duration="36s"
          gap="gap-3"
        >
          {DEV_LANGUAGES.map((key) => {
            const { Icon, label } = TECH[key];
            return (
              <span
                key={key}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5"
              >
                <Icon className="h-4 w-4 text-white/70" aria-hidden="true" />
                <span className="text-sm font-medium text-white">{label}</span>
              </span>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}
