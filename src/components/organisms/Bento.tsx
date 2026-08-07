"use client";

import { useRef, useEffect } from "react";
import { Container, Section } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Card } from "@/components/atoms/Card";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { TECH, type TechKey } from "@/lib/tech-icons";
import { STATS } from "@/data/content";
import { CERTIFICATIONS, LANGUAGES } from "@/data/career";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Real CV content for the layout
const LEAD_STAT = STATS[0]; // 130+ Automated tests written
const CLIENTS_SERVED_VAL = 6; // Pragmatic Minds integrations
const COUNTRIES_VAL = 2; // Morocco & Germany

// Technologies list for infinite scrolling
const TECH_MARQUEE: TechKey[] = [
  "laravel",
  "php",
  "go",
  "react",
  "nextjs",
  "typescript",
  "tailwind",
  "mysql",
  "docker",
  "githubactions",
];

// Double list for infinite loop effect
const DOUBLE_TECH = [...TECH_MARQUEE, ...TECH_MARQUEE, ...TECH_MARQUEE];

export function Bento() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <Section id="credentials" className="bg-subtle py-20 md:py-30">
      <Container>
        <SectionHeading
          eyebrow="Evidence"
          title="Scaling Successful Projects"
          description="A dashboard of verified performance metrics, international collaboration, and core competencies."
        />

        {/* Premium Grid matching the layout from the reference */}
        <div ref={containerRef} className="mt-16 flex flex-col gap-4 lg:grid lg:grid-cols-3 min-h-[500px]">
          
          {/* Card 1: 130+ Automated Tests Card with grid graphic background */}
          <Reveal className="h-full" offset={16}>
            <Card className="group relative overflow-hidden flex h-full flex-col justify-between p-8 bg-card border border-line shadow-subtle min-h-[360px]">
              {/* Decorative premium grid background with gradient stroke path */}
              <div className="absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-500 group-hover:opacity-25">
                <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" stroke="currentColor" strokeWidth="0.5" className="text-line-strong" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="z-10 flex flex-col gap-4">
                <span className="flex text-8xl font-bold tracking-tight text-ink">
                  <Counter
                    value={LEAD_STAT.value}
                    suffix={LEAD_STAT.suffix}
                    prefix={LEAD_STAT.prefix}
                  />
                </span>
                <span className="text-lg font-semibold tracking-tight text-ink">
                  {LEAD_STAT.label}
                </span>
              </div>

              <div className="z-10">
                <span className="text-sm leading-relaxed text-secondary block">
                  {LEAD_STAT.note} Developed using Test-Driven Development (TDD) methodologies with PHPUnit to prevent layout regressions.
                </span>
              </div>
            </Card>
          </Reveal>

          {/* Column containing Cards 2 & 3 (Right hand stacked grid) */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
            
            {/* Card 2: Production Integrations / Team Collab */}
            <Reveal delay={0.05} offset={16}>
              <Card className="group flex flex-col justify-between p-8 bg-card border border-line shadow-subtle h-full min-h-[240px]">
                <div>
                  <span className="block text-5xl font-bold tracking-tight text-ink">
                    <Counter value={CLIENTS_SERVED_VAL} suffix="+" />
                  </span>
                  <p className="mt-3 text-base font-semibold text-ink">
                    Production Integrations
                  </p>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-secondary">
                  Mattermost plugins and REST integrations developed in Go and Laravel, automating HR and time tracking processes securely for German remote teams.
                </p>
              </Card>
            </Reveal>

            {/* Card 3: International / Countries */}
            <Reveal delay={0.1} offset={16}>
              <Card className="group flex flex-col justify-between p-8 bg-card border border-line shadow-subtle h-full min-h-[240px]">
                <div>
                  <span className="block text-5xl font-bold tracking-tight text-ink">
                    <Counter value={COUNTRIES_VAL} />
                  </span>
                  <p className="mt-3 text-base font-semibold text-ink">
                    Countries of Practice
                  </p>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-secondary">
                  Cross-border development experience. Serving local teams on-site in Morocco and engineering software remotely for partners in Germany.
                </p>
              </Card>
            </Reveal>

            {/* Card 4: Languages Spoken */}
            <Reveal delay={0.15} offset={16} className="md:col-span-1">
              <Card className="flex flex-col p-8 bg-card border border-line shadow-subtle h-full">
                <Eyebrow as="h3">Languages</Eyebrow>
                <ul className="mt-5 flex flex-col divide-y divide-line">
                  {LANGUAGES.map((lang) => (
                    <li key={lang.name} className="flex justify-between py-2.5 first:pt-0 last:pb-0">
                      <span className="text-sm font-medium text-ink">{lang.name}</span>
                      <span className="text-xs text-muted font-mono">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            {/* Card 5: Certifications */}
            <Reveal delay={0.2} offset={16} className="md:col-span-1">
              <Card className="flex flex-col p-8 bg-card border border-line shadow-subtle h-full">
                <Eyebrow as="h3">Certifications</Eyebrow>
                <ul className="mt-5 flex flex-col divide-y divide-line">
                  {CERTIFICATIONS.slice(0, 3).map((cert) => (
                    <li key={cert.title} className="flex justify-between py-2.5 first:pt-0 last:pb-0">
                      <span className="text-sm font-medium text-ink truncate mr-2">{cert.title}</span>
                      <span className="text-xs text-muted font-mono shrink-0">{cert.date}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            {/* Card 6: Infinite Scrolling Technologies Banner (Full Width of column span) */}
            <Reveal delay={0.25} offset={16} className="md:col-span-2">
              <Card className="relative overflow-hidden flex flex-col justify-center p-8 bg-card border border-line shadow-subtle min-h-[120px]">
                <Eyebrow as="h4" className="mb-4">Core Stack & Ecosystem</Eyebrow>
                
                {/* Horizontal Marquee Wrapper */}
                <div className="relative w-full overflow-hidden flex items-center py-2">
                  {/* Left and Right fade overlay to mask clean edges */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
                  
                  {/* Sliding container with marquee motion animation */}
                  <motion.div
                    className="flex gap-8 shrink-0 whitespace-nowrap min-w-full"
                    animate={{ x: [0, -1000] }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 25,
                    }}
                  >
                    {DOUBLE_TECH.map((key, i) => {
                      const { Icon, label } = TECH[key];
                      return (
                        <div
                          key={`${key}-${i}`}
                          className="flex items-center gap-2.5 text-muted transition-colors duration-200 hover:text-ink select-none cursor-default"
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                          <span className="text-sm font-semibold tracking-tight">{label}</span>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </Card>
            </Reveal>

          </div>
        </div>
      </Container>
    </Section>
  );
}
