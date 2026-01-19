"use client";
import { motion } from "framer-motion";
import { ME } from "@/data/portfolio";

export default function Hero() {
  return (
    <section className="relative pt-48 pb-20 px-6 overflow-hidden flex flex-col items-center">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/15 dark:bg-accent/5 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-[var(--foreground)] uppercase">
          FULL STACK <br /> 
          <span className="text-accent italic font-light drop-shadow-sm">ENGINEER</span>.
        </h1>
        
        <p className="text-lg md:text-2xl text-[var(--muted)] max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          I am <span className="text-[var(--foreground)] font-bold">{ME.name}</span>. 
          {ME.role} based in {ME.location}. I bridge the gap between complex logic and immersive design.
        </p>

        <div className="flex gap-4 justify-center">
          <a href="#projects" className="px-10 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-2xl font-bold hover:scale-105 transition-all shadow-xl">
            View Architecture
          </a>
        </div>
      </motion.div>
    </section>
  );
}