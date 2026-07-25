"use client";
import { motion } from "framer-motion";
import { ABOUT, STATS } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Mindset */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-4 font-bold opacity-80">
            // How I Think
          </h2>
          <p className="text-2xl md:text-3xl font-bold tracking-tight leading-snug text-[var(--foreground)]">
            {ABOUT.mindset}
          </p>

          {/* Proof points */}
          <div className="mt-10 grid grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <span className="text-2xl md:text-3xl font-black tracking-tighter text-accent">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[11px] text-[var(--muted)] leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Process */}
        <div>
          <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-8 font-bold opacity-80">
            // How I Work
          </h2>
          <div className="flex flex-col gap-4">
            {ABOUT.process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-start gap-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition-colors hover:border-accent/40"
              >
                <span className="font-mono text-sm font-bold text-accent/60 group-hover:text-accent transition-colors">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
                    {p.step}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
