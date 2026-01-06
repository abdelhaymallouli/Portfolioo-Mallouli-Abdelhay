"use client";
import { motion } from "framer-motion";
import { skills } from "@/data/projects";

export default function Skills() {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-12 font-bold opacity-80">
        // Technical Stack
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {skills.map((skill, i) => {
          const Icon = skill.icon;

          return (
            <motion.div
              key={i}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`p-8 rounded-[2.5rem] bg-[var(--card)] 
              border border-[var(--card-border)] shadow-[var(--shadow)]
              flex flex-col justify-between transition-all duration-300 ${skill.className}`}
            >
              <div className="mb-8">
                {/* Icon Container with subtle contrast */}
                <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-2xl w-fit mb-6 shadow-inner">
                  <Icon className={`w-6 h-6 ${skill.color}`} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  {skill.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[var(--muted)] border border-transparent hover:border-accent/20 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}