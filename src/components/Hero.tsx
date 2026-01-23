"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ME } from "@/data/portfolio";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-48 pb-12 px-6 overflow-hidden flex flex-col items-center justify-between">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/15 dark:bg-accent/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-[var(--foreground)] uppercase">
          FULL STACK <br />
          <span className="text-accent italic font-light drop-shadow-sm">
            DEVELOPER
          </span>
          .
        </h1>

        <p className="text-lg md:text-2xl text-[var(--muted)] max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          I’m{" "}
          <span className="text-[var(--foreground)] font-bold">{ME.name}</span>,
          a professional {ME.role} based in {ME.location}. I craft
           digital experiences by seamlessly blending robust
          backend logic with premium, interactive design.
        </p>
      </motion.div>

      {/* Professional Minimalist Scroll Down */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        className="flex flex-col items-center gap-3 cursor-pointer group mb-4"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--muted)] group-hover:text-accent transition-colors">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={28} className="text-accent opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}