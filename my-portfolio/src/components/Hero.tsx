"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-48 pb-20 px-6 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/10 dark:bg-accent/5 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-slate-950 dark:text-white">
          DIGITAL <br /> <span className="text-accent italic font-light">ARCHITECT</span>.
        </h1>
        <p className="text-lg md:text-2xl text-[var(--muted)] max-w-2xl mx-auto font-medium leading-relaxed">
          I build high-performance systems and immersive user 
          interfaces that bridge the gap between logic and design.
        </p>
      </motion.div>
    </section>
  );
}