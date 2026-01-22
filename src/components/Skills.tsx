"use client";
import { motion } from "framer-motion";
import { SKILLS } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-4 font-bold opacity-80">
          // Technical Stack
        </h2>
        <h3 className="text-4xl font-black tracking-tighter">Tools & Technologies</h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SKILLS.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`group p-8 rounded-[2.5rem] bg-[var(--card)] border border-[var(--card-border)] flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-accent/5 ${skill.span}`}
            >
              <div>
                <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-2xl w-fit mb-6 group-hover:bg-accent/10 transition-colors">
                  <Icon className={`w-6 h-6 ${skill.color}`} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-6 text-[var(--foreground)]">
                  {skill.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-bold px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-[var(--muted)] uppercase border border-transparent hover:border-accent/30 hover:text-accent transition-all cursor-default"
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