"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Linkedin,
  Github,
  Globe,
  ArrowRight,
  FileText,
} from "lucide-react";
import {
  CERTIFICATES,
  VAULT_ITEMS,
  MOTIVATION_CARDS,
  type Lang,
} from "@/data/bewerbung";
import BriefingVideo from "@/components/ui-kit/BriefingVideo";
import { cn } from "@/lib/utils";

// ── Fade-up animation variant ─────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: i * 0.08,
    },
  }),
};

// ── Color maps ────────────────────────────────────────────────────────────────
const iconBg: Record<string, string> = {
  blue: "bg-accent/10 text-accent",
  green: "bg-emerald-500/10 text-emerald-400",
  purple: "bg-violet-500/10 text-violet-400",
  orange: "bg-orange-500/10 text-orange-400",
};
const topLine: Record<string, string> = {
  blue: "from-transparent via-accent to-transparent",
  green: "from-transparent via-emerald-500 to-transparent",
  purple: "from-transparent via-violet-500 to-transparent",
  orange: "from-transparent via-orange-500 to-transparent",
};
const certStatusColor: Record<string, string> = {
  blue: "text-accent",
  green: "text-emerald-400",
  purple: "text-violet-400",
  orange: "text-orange-400",
};

// ── Reusable section header ───────────────────────────────────────────────────
function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="label-mono text-accent border border-accent/25 bg-accent/8 px-2.5 py-1 rounded-md">
        {num}
      </span>
      <h2 className="text-[22px] font-bold tracking-tight text-[--foreground]">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-[--card-border] to-transparent" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function BewerbungContent() {
  const searchParams = useSearchParams();
  const company = searchParams.get("company");
  const hr = searchParams.get("hr");
  const [lang, setLang] = useState<Lang>("de");
  const isDE = lang === "de";

  // Personalised greeting target
  const addressee =
    hr && company
      ? `${hr} & ${company} Team`
      : company
        ? `${company} Team`
        : hr
          ? hr
          : isDE
            ? "Team"
            : "Team";

  return (
    <div className="min-h-screen bg-[--background] text-[--foreground] selection:bg-accent/25 font-sans">
      {/* ── FIXED NAV ──────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 h-14 flex items-center justify-between px-6
                      bg-[--background]/80 backdrop-blur-md border-b border-[--card-border]"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="label-mono text-[--muted]">
            {isDE ? "Kandidaten-Profil · Aktiv" : "Candidate Profile · Active"}
          </span>
        </div>
        <div className="flex gap-1.5">
          {(["de", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "label-mono px-3 py-1 rounded-md border transition-colors",
                lang === l
                  ? "bg-accent/12 border-accent/30 text-accent"
                  : "border-transparent text-[--muted] hover:text-[--foreground]",
              )}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <main className="pt-24 pb-32 px-6 max-w-5xl mx-auto space-y-32">
        {/* ── SECTION 0: HERO ─────────────────────────────────────────────── */}
        <section>
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-6"
          >
            <span className="label-mono text-accent border border-accent/25 bg-accent/8 px-3 py-1.5 rounded-md inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent" />
              {isDE
                ? "Bewerbung · Duale Ausbildung · Fachinformatiker"
                : "Application · Dual Apprenticeship · Fachinformatiker"}
            </span>
          </motion.div>

          {/* Name headline */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mb-4"
          >
            <p className="label-mono text-accent mb-3">
              {isDE
                ? `Guten Tag, ${addressee} — Willkommen auf meiner Bewerbungsseite`
                : `Hello, ${addressee} — Welcome to my application page`}
            </p>
            <h1 className="text-[clamp(42px,7vw,80px)] font-black tracking-[-0.05em] leading-[0.92] text-[--foreground]">
              {isDE ? "Ich bin" : "I'm"}{" "}
              <span className="bg-gradient-to-br from-accent via-violet-400 to-accent bg-clip-text text-transparent">
                Abdelhay
              </span>
              <br />
              <span className="text-[--muted]">Mallouli.</span>
            </h1>
          </motion.div>

          {/* Role */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-[18px] italic text-[--muted] mb-6 font-light tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
          >
            {isDE
              ? "Full-Stack Entwickler · Ausbildungsbewerber 2025/2026"
              : "Full-Stack Developer · Ausbildung Candidate 2025/2026"}
          </motion.p>

          {/* Pitch */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="text-[16px] text-[--muted] leading-[1.75] max-w-[600px] mb-10"
          >
            {isDE ? (
              <>
                Engagierter Full-Stack-Entwickler aus Tanger, Marokko —
                spezialisiert auf{" "}
                <strong className="text-[--foreground] font-semibold">
                  React, Laravel, Go-Microservices
                </strong>{" "}
                und moderne Backend-Architekturen. Ich suche eine{" "}
                <strong className="text-[--foreground] font-semibold">
                  Ausbildung als Fachinformatiker für Anwendungsentwicklung
                </strong>
                , um meine Praxis mit dem deutschen dualen System zu verbinden.
              </>
            ) : (
              <>
                Dedicated Full-Stack Developer from Tangier, Morocco —
                specializing in{" "}
                <strong className="text-[--foreground] font-semibold">
                  React, Laravel, Go microservices
                </strong>{" "}
                and modern backend architectures. Seeking an{" "}
                <strong className="text-[--foreground] font-semibold">
                  Ausbildung as Fachinformatiker für Anwendungsentwicklung
                </strong>{" "}
                to combine hands-on experience with Germany's dual system.
              </>
            )}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="flex flex-wrap gap-3 mb-14"
          >
            <a
              href="/cv/Abdelhay_Mallouli_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white
                         font-semibold text-[13px] shadow-[0_0_24px_rgba(59,130,246,0.35)]
                         hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Download size={15} />
              {isDE ? "Lebenslauf herunterladen" : "Download Full CV"}
            </a>
            <a
              href="https://www.abdelhaymallouli.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass
                         font-semibold text-[13px] text-[--foreground]
                         hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Globe size={15} />
              Portfolio
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[--card-border]"
          >
            {[
              {
                value: "2+",
                labelDE: "Jahre Praxis",
                labelEN: "Years Practice",
              },
              {
                value: "10+",
                labelDE: "Live-Projekte",
                labelEN: "Live Projects",
              },
              {
                value: "70%",
                labelDE: "Zeit-Einsparung",
                labelEN: "Time Saved (AMS)",
              },
              {
                value: "B1→B2",
                labelDE: "Deutschkenntnisse",
                labelEN: "German Level",
              },
            ].map((s) => (
              <div key={s.value} className="flex flex-col gap-1">
                <span className="text-[28px] font-black tracking-[-0.04em] text-[--foreground]">
                  {s.value}
                </span>
                <span className="label-mono text-[--muted]">
                  {isDE ? s.labelDE : s.labelEN}
                </span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── SECTION 01: VIDEO ───────────────────────────────────────────── */}
        <section>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <SectionHeader
              num="01"
              title={isDE ? "Kandidaten-Intro" : "Candidate Introduction"}
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={1}
            viewport={{ once: true }}
          >
            <BriefingVideo />
          </motion.div>
        </section>

        {/* ── SECTION 02: MOTIVATION ──────────────────────────────────────── */}
        <section>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <SectionHeader
              num="02"
              title={isDE ? "Warum Ich? · Motivation" : "Why Me? · Motivation"}
            />
          </motion.div>

          {/* Featured wide card: ROI + Scrum */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={1}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 mb-4 relative overflow-hidden group
                       hover:shadow-[0_0_40px_rgba(59,130,246,0.08)] transition-shadow duration-500"
          >
            {/* top beam */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left: ROI story */}
              <div>
                <div
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5",
                    iconBg.blue,
                  )}
                >
                  🎯
                </div>
                <h3 className="text-[18px] font-bold text-[--foreground] mb-3">
                  {isDE
                    ? "Lösungsorientiertes Denken"
                    : "Problem-Solving Mindset"}
                </h3>
                <p className="text-[14px] text-[--muted] leading-[1.75] mb-5">
                  {isDE
                    ? "Ich schreibe nicht nur Code — ich entwerfe Systeme. Beim AttendanceFlow-Projekt erzielte ich eine messbare Wirkung, bevor eine einzige Zeile Code geschrieben wurde."
                    : "I don't just write code — I design systems. On AttendanceFlow, I achieved measurable impact before writing a single line of code."}
                </p>
                <div className="flex items-end gap-3">
                  <span className="text-[52px] font-black tracking-[-0.05em] leading-none bg-gradient-to-br from-emerald-400 to-accent bg-clip-text text-transparent">
                    70%
                  </span>
                  <span className="label-mono text-[--muted] mb-1">
                    {isDE
                      ? "Zeitersparnis · AttendanceFlow AMS"
                      : "Time Saved · AttendanceFlow AMS"}
                  </span>
                </div>
              </div>
              {/* Right: Scrum experience */}
              <div>
                <div
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5",
                    iconBg.purple,
                  )}
                >
                  💼
                </div>
                <h3 className="text-[18px] font-bold text-[--foreground] mb-3">
                  {isDE
                    ? "Deutsches Scrum-Team Erfahrung"
                    : "German Scrum Team Experience"}
                </h3>
                <p className="text-[14px] text-[--muted] leading-[1.75] mb-5">
                  {isDE
                    ? "Praktikum bei pragmatic minds GmbH (Kirchheim u.T.) — Go-Microservices, DSGVO-konforme Bots, echte Code Reviews und PR-Zyklen."
                    : "Internship at pragmatic minds GmbH (Kirchheim u.T.) — Go microservices, GDPR-compliant bots, real code reviews and PR cycles."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Go · Microservices",
                    "Docker",
                    "Personio API",
                    "MS Graph",
                    "Scrum",
                    "DSGVO",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="label-mono text-[--muted] bg-white/5 border border-[--card-border]
                                 px-2.5 py-1 rounded-md hover:border-accent/30 hover:text-accent
                                 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Motivation Cards Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {MOTIVATION_CARDS.slice(1).map((card, i) => (
              <motion.div
                key={isDE ? card.titleDE : card.titleEN}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i + 2}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 relative overflow-hidden group
                           hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1
                           transition-all duration-300"
              >
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    topLine[card.color],
                  )}
                />
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4",
                    iconBg[card.color],
                  )}
                >
                  {card.icon}
                </div>
                <h3 className="text-[16px] font-bold text-[--foreground] mb-2">
                  {isDE ? card.titleDE : card.titleEN}
                </h3>
                <p className="text-[13px] text-[--muted] leading-[1.7]">
                  {isDE ? card.descDE : card.descEN}
                </p>
                {card.extra === "lang" && (
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/8 rounded-full overflow-hidden">
                      <div className="h-full w-[72%] bg-gradient-to-r from-accent to-violet-400 rounded-full" />
                    </div>
                    <span className="label-mono text-accent">B1→B2</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SECTION 03: CERTIFICATES ────────────────────────────────────── */}
        <section>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <SectionHeader
              num="03"
              title={
                isDE ? "Zertifikate & Abschlüsse" : "Certificates & Degrees"
              }
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {CERTIFICATES.map((cert, i) => (
              <motion.a
                key={cert.titleEN}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 flex flex-col gap-4 group
                           hover:border-accent/30 hover:-translate-y-1
                           transition-all duration-300 cursor-pointer"
              >
                {/* top */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0",
                        iconBg[cert.color],
                      )}
                    >
                      {cert.icon}
                    </div>
                    <span className="label-mono text-[--muted]">
                      {isDE ? cert.typeDE : cert.typeEN}
                    </span>
                  </div>
                  <span className="label-mono text-[--muted]">{cert.date}</span>
                </div>

                {/* title + desc */}
                <div>
                  <h4 className="text-[15px] font-bold text-[--foreground] mb-1.5 group-hover:text-accent transition-colors leading-snug">
                    {isDE ? cert.titleDE : cert.titleEN}
                  </h4>
                  <p className="text-[13px] text-[--muted] leading-[1.65]">
                    {isDE ? cert.descriptionDE : cert.descriptionEN}
                  </p>
                </div>

                {/* footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[--card-border]">
                  <span
                    className={cn("label-mono", certStatusColor[cert.color])}
                  >
                    ✓ {isDE ? "Verifiziert" : "Verified"}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center
                                  text-accent text-[13px] group-hover:bg-accent/18 group-hover:translate-x-0.5 transition-all"
                  >
                    →
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Placeholder for upcoming certs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              custom={4}
              viewport={{ once: true }}
              className="sm:col-span-2 rounded-2xl border border-dashed border-[--card-border] p-6
                         flex items-center justify-center"
            >
              <span className="label-mono text-[--muted]">
                //{" "}
                {isDE
                  ? "Weitere Zertifikate folgen"
                  : "More certificates coming soon"}
              </span>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 04: DOWNLOADS & SOCIALS ─────────────────────────────── */}
        <section>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <SectionHeader
              num="04"
              title={isDE ? "Dokumente herunterladen" : "Download Documents"}
            />
          </motion.div>

          {/* Document cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={1}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-4 mb-8"
          >
            {VAULT_ITEMS.map((item) => (
              <a
                key={item.file}
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-5 flex items-center gap-4 group
                           hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-[--foreground] truncate group-hover:text-accent transition-colors">
                    {isDE ? item.titleDE : item.titleEN}
                  </p>
                  <p className="label-mono text-[--muted]">
                    {isDE ? item.subtitleDE : item.subtitleEN}
                  </p>
                </div>
                <ArrowRight
                  size={15}
                  className="text-[--muted] ml-auto flex-shrink-0 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                />
              </a>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={2}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="/cv/Abdelhay_Mallouli_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white
                         font-semibold text-[13px] shadow-[0_0_24px_rgba(59,130,246,0.3)]
                         hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Download size={15} />
              {isDE ? "Lebenslauf herunterladen" : "Download CV"}
            </a>
            <a
              href="https://linkedin.com/in/abdelhaymallouli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass
                         font-semibold text-[13px] text-[--muted]
                         hover:text-[--foreground] hover:border-accent/25 transition-all duration-200"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
            <a
              href="https://github.com/abdelhaymallouli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass
                         font-semibold text-[13px] text-[--muted]
                         hover:text-[--foreground] hover:border-accent/25 transition-all duration-200"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href="https://www.abdelhaymallouli.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass
                         font-semibold text-[13px] text-[--muted]
                         hover:text-[--foreground] hover:border-accent/25 transition-all duration-200"
            >
              <Globe size={15} />
              Portfolio
            </a>
          </motion.div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-[--card-border] py-7 text-center">
        <span className="label-mono text-[--muted]">
          // Abdelhay Mallouli · Bewerbung 2025/2026 · Tangier, Morocco
        </span>
      </footer>
    </div>
  );
}
