"use client";
import { motion } from "framer-motion";
import { SKILL_GROUPS, PRACTICES } from "@/data/portfolio";

// Logos that are white / near-white would vanish in light mode — let them
// inherit the theme foreground color instead of their brand color.
const THEME_COLORED = new Set(["Next.js", "GitHub"]);

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
          // Skills
        </h2>
        <h3 className="text-4xl font-black tracking-tighter">What I work with</h3>
      </motion.div>

      <div className="space-y-14">
        {SKILL_GROUPS.map((group) => (
          <div key={group.category}>
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--muted)] mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-accent/40" />
              {group.category}
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                const themeColored = THEME_COLORED.has(item.name);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-[var(--card)] border border-[var(--card-border)] hover:border-accent/40 transition-colors"
                  >
                    <Icon
                      size={34}
                      className={themeColored ? "text-[var(--foreground)]" : ""}
                      style={themeColored ? undefined : { color: item.color }}
                      aria-hidden
                    />
                    <span className="text-xs font-semibold text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors text-center leading-tight">
                      {item.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Methodologies / practices — no brand logo, shown as plain tags */}
      <div className="mt-16">
        <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--muted)] mb-6 flex items-center gap-3">
          <span className="h-px w-6 bg-accent/40" />
          Practices & Methods
        </h4>
        <div className="flex flex-wrap gap-2">
          {PRACTICES.map((practice) => (
            <span
              key={practice}
              className="text-[11px] font-medium px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--card-border)] text-[var(--muted)]"
            >
              {practice}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
