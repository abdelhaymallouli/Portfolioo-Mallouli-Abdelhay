"use client";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { ME } from "@/data/portfolio";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/3d/Hero3D"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] pt-48 pb-12 px-6 overflow-hidden flex flex-col items-center justify-between">
      <Hero3D />

      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/15 dark:bg-accent/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto text-center"
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
            Available for Work
          </span>
        </motion.div>

        {/* Fix #14 — "Iâ€™m" encoding was corrupted, use proper apostrophe */}
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-[var(--foreground)] uppercase">
          FULL STACK <br />
          <span className="text-accent italic font-light drop-shadow-sm">
            DEVELOPER
          </span>
          .
        </h1>

        <p className="text-lg md:text-2xl text-[var(--muted)] max-w-2xl mx-auto font-medium leading-relaxed mb-12">
          I&apos;m{" "}
          <span className="text-[var(--foreground)] font-bold">{ME.name}</span>,
          a professional {ME.role} based in {ME.location}. I craft digital
          experiences by seamlessly blending robust backend logic with premium,
          interactive design.
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-2xl font-mono text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-[0.98]"
          >
            View Projects
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 px-8 py-4 bg-[var(--card)] border border-[var(--card-border)] rounded-2xl font-mono text-xs font-bold uppercase tracking-widest hover:border-accent/50 transition-all active:scale-[0.98]"
          >
            Get In Touch
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}