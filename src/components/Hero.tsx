"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ME, STATUS, STATS } from "@/data/portfolio";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/3d/Hero3D"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] pt-40 pb-16 px-6 overflow-hidden flex items-center">
      <Hero3D />

      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/15 dark:bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── Text column ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          {/* Overline label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              {STATUS.badge}
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter mb-8 leading-[0.85] text-[var(--foreground)] uppercase">
            FULL STACK <br />
            <span className="text-accent italic font-light drop-shadow-sm">
              DEVELOPER
            </span>
            .
          </h1>

<p className="text-lg md:text-xl text-[var(--muted)] max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed mb-10">
  I&apos;m{" "}
  <span className="text-[var(--foreground)] font-bold">{ME.name}</span>
  , a Full Stack Developer based in Tangier. I bridge the gap between pixel-perfect UI/UX design and robust backend engineering. Backed by <span className="text-[var(--foreground)] font-bold">2 years of hands-on project experience</span>, I specialize in building scalable ecosystems with React, Laravel, and Go—currently engineering at Mooroot and previously developing automation services in Germany.
</p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-2xl font-mono text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-[0.98]"
            >
              View Projects
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 px-8 py-4 bg-[var(--card)] border border-[var(--card-border)] rounded-2xl font-mono text-xs font-bold uppercase tracking-widest hover:border-accent/50 transition-all active:scale-[0.98]"
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Availability status line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm text-[var(--muted)] max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            {STATUS.line}
          </motion.p>

          {/* Real, verifiable proof points */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <span className="text-3xl md:text-4xl font-black tracking-tighter text-[var(--foreground)]">
                  {stat.value}
                </span>
                <span className="mt-2 text-[11px] text-[var(--muted)] leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Photo column ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm order-1 lg:order-2"
        >
          {/* Accent glow behind frame */}
          <div className="absolute -inset-4 bg-accent/20 blur-3xl -z-10 rounded-full" />

          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-[var(--card-border)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
            <Image
              src="/imgs/profile.png"
              alt={ME.name}
              fill
              priority
              sizes="(max-width: 1024px) 384px, 420px"
              className="object-cover object-top"
            />
            {/* bottom scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* identity tag */}
            <div className="absolute bottom-5 left-5 right-5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                {ME.role}
              </span>
              <p className="text-white font-bold text-lg leading-tight">
                {ME.name}
              </p>
              <p className="text-white/60 text-xs">{ME.location}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
