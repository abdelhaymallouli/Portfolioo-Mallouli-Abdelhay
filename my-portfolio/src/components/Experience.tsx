"use client";
import { motion } from "framer-motion";

const jobs = [
  { company: "Tech Flow", role: "Senior Developer", year: "2023 - 24" },
  { company: "Nova Agency", role: "Full Stack Engineer", year: "2021 - 23" },
  { company: "Innotech", role: "Frontend Developer", year: "2019 - 21" },
];

export default function Experience() {
  return (
    <section id="experience" className="max-w-7xl mx-auto px-6 py-20">
       <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">History</h2>
          <div className="h-[1px] flex-1 bg-[var(--card-border)]" />
        </div>

      <div className="space-y-4">
        {jobs.map((job, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="group flex flex-col md:flex-row justify-between items-start md:items-center p-8 rounded-[2rem] hover:bg-[var(--card)] border border-transparent hover:border-[var(--card-border)] transition-all"
          >
            <div>
              <span className="text-accent font-mono text-xs font-bold tracking-[0.2em]">{job.year}</span>
              <h4 className="text-2xl font-bold mt-1 text-[var(--foreground)]">{job.company}</h4>
            </div>
            <p className="text-[var(--muted)] md:text-xl font-medium italic">{job.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}