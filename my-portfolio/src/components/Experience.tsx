"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Tech Solutions",
    role: "Senior Full-Stack Developer",
    period: "2023 - Present",
    description: "Leading the architectural shift to Next.js and Micro-frontends.",
  },
  {
    company: "Innovation Lab",
    role: "Software Engineer",
    period: "2021 - 2023",
    description: "Developed AI-integrated dashboards reducing data latency by 40%.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-12 font-bold opacity-80">
        // Career Path
      </h2>
      
      <div className="space-y-12">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row gap-4 md:gap-20 border-l-2 border-slate-100 dark:border-white/5 pl-8 relative"
          >
            <div className="absolute w-4 h-4 bg-accent rounded-full -left-[9px] top-1 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <span className="text-sm font-mono opacity-50 w-32">{exp.period}</span>
            <div>
              <h3 className="text-2xl font-bold">{exp.role}</h3>
              <p className="text-accent font-medium mb-4">{exp.company}</p>
              <p className="text-slate-500 max-w-2xl">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}