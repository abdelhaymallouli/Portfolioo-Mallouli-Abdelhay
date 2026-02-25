"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { bewerbungData, Lang, TimelineItem, VaultItem } from "@/data/bewerbung";
import {
  Globe2,
  Download,
  Code2,
  Database,
  Layout,
  BrainCircuit,
  Server,
  FileText,
  ExternalLink,
  GraduationCap,
  Play,
} from "lucide-react";
import Image from "next/image";
import { BentoCard } from "@/components/ui/BentoCard";
import { TechIcon } from "@/components/ui/TechIcon";
import { FadeIn } from "@/components/ui/FadeIn";

export default function BewerbungContent() {
  const searchParams = useSearchParams();
  const companyParam = searchParams.get("company") || "Hiring";
  const [lang, setLang] = useState<Lang>("de");

  const data = bewerbungData[lang];
  const greeting = data.hero.greeting.replace("{company}", companyParam);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-accent/30 selection:text-accent font-sans overflow-hidden">
      {/* Language Toggle & Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold tracking-tight text-lg">
            A. Mallouli <span className="text-accent">/ Bewerbung</span>
          </span>
          <div className="flex gap-2 p-1 bg-[var(--card)] border border-[var(--card-border)] rounded-full">
            <button
              onClick={() => setLang("de")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${lang === "de" ? "bg-accent text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
              DE
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${lang === "en" ? "bg-accent text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-24">
        {/* PERSONALIZED HERO */}
        <section className="relative grid md:grid-cols-[1fr,auto] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Available for Ausbildung 2024/2025
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
              {greeting}
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
              {data.hero.pitch}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/cv/Abdelhay_Mallouli_CV.pdf"
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-full font-medium hover:scale-105 active:scale-95 transition-all"
              >
                <Download size={18} />
                {data.hero.cvButton}
              </a>
              <button className="flex items-center gap-2 px-6 py-3 bg-[var(--card)] border border-[var(--card-border)] rounded-full font-medium hover:border-accent/50 hover:text-accent transition-all group">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Play size={12} className="text-accent fill-accent ml-0.5" />
                </span>
                {data.hero.videoAction}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-2 border border-[var(--card-border)] bg-[var(--card)] shadow-2xl shrink-0 hidden md:block"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative">
              {/* Replace with actual headshot path if available */}
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                Photo
              </div>
            </div>
          </motion.div>
        </section>

        {/* THE "WHY ME" BENTO GRID */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Tech Stack */}
            <BentoCard className="md:col-span-2 overflow-hidden flex flex-col justify-between group">
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">
                  {data.bento.techTitle}
                </h3>
                <p className="text-[var(--muted)] max-w-md">
                  {data.bento.techDescription}
                </p>
              </div>
              <div className="flex gap-4 mt-4 relative z-10">
                <TechIcon icon={<Code2 className="text-blue-500" />} />
                <TechIcon icon={<Layout className="text-cyan-400" />} />
                <TechIcon icon={<Database className="text-emerald-500" />} />
                <TechIcon icon={<Server className="text-red-500" />} />
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors pointer-events-none" />
            </BentoCard>

            {/* Language Level */}
            <BentoCard
              className="flex flex-col justify-between group"
              delay={0.1}
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe2 className="text-accent" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">
                  {data.bento.languageTitle}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {data.bento.languageDescription}
                </p>
              </div>
              <div className="mt-4 py-2 px-4 bg-[var(--background)] border border-[var(--card-border)] rounded-full text-center font-semibold text-accent">
                {data.bento.languageLevel}
              </div>
            </BentoCard>

            {/* Problem Solving */}
            <BentoCard
              className="md:col-span-3 flex items-center gap-8 group"
              delay={0.2}
            >
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-orange-500/10 flex items-center justify-center group-hover:rotate-6 transition-transform">
                <BrainCircuit className="text-orange-500" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">
                  {data.bento.problemTitle}
                </h3>
                <p className="text-[var(--muted)] text-lg max-w-3xl leading-relaxed">
                  {data.bento.problemDescription}
                </p>
              </div>
            </BentoCard>
          </div>
        </section>

        {/* INTEGRATED TIMELINE */}
        <FadeIn delay={0.3} className="py-12">
          <h2 className="text-3xl font-bold tracking-tight mb-12">
            {data.timeline.title}
          </h2>
          <div className="relative border-l border-[var(--card-border)] ml-3 md:ml-6 space-y-12">
            {data.timeline.items.map((item: TimelineItem, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                <div className="absolute -left-[5px] top-1.5 w-[10px] h-[10px] rounded-full bg-[var(--card-border)] ring-4 ring-[var(--background)]" />
                <span className="text-sm font-bold text-accent mb-1 block">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                  {item.title}
                </h3>
                <span className="text-sm font-medium text-[var(--muted)] block mb-3">
                  {item.subtitle}
                </span>
                <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* DOCUMENT VAULT */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            {data.vault.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.vault.items.map((doc: VaultItem, i: number) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border border-[var(--card-border)] bg-[var(--card)] rounded-2xl hover:border-accent/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-accent/5 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="text-accent" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold tracking-tight text-[var(--foreground)]">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-[var(--muted)]">
                    {doc.description}
                  </p>
                </div>
                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--background)] border border-[var(--card-border)] text-[var(--muted)] hover:text-accent hover:border-accent transition-colors shrink-0"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FAB - sticky CV download button */}
      <motion.a
        href="/cv/Abdelhay_Mallouli_CV.pdf"
        target="_blank"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-full shadow-2xl font-medium tracking-tight hover:shadow-accent/20 transition-all border border-white/10"
      >
        <Download size={18} />
        <span className="hidden sm:inline">{data.hero.cvButton}</span>
      </motion.a>
    </div>
  );
}
