"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, School } from "lucide-react";
import { EXPERIENCES } from "@/data/Experience";
export default function Experience() {
  const [selectedExp, setSelectedExp] = useState<any>(null);

  return (
    <section id="experience" className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-12 font-bold opacity-80">
        // Career Path
      </h2>
      
      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-white/5 before:to-transparent">
        {EXPERIENCES.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            {/* Timeline Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--card-border)] bg-[var(--background)] text-accent shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 z-10">
              {exp.type === "school" ? (
                <School size={16} />
              ) : (
                <Briefcase size={16} />
              )}
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-3xl bg-[var(--card)] border border-[var(--card-border)] shadow-sm hover:border-accent/40 transition-all ml-12 md:ml-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <span className="text-xs font-bold text-accent uppercase tracking-widest">{exp.period}</span>
              </div>
              <h3 className="text-xl font-bold">{exp.role}</h3>
              <p className="text-[var(--muted)] text-sm mb-4">{exp.company}</p>
              
              <button 
                onClick={() => setSelectedExp(exp)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter hover:text-accent transition-colors group/btn"
              >
                View Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[var(--card)] border border-[var(--card-border)] rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{selectedExp.role}</h3>
                    <p className="text-accent font-medium">{selectedExp.company}</p>
                  </div>
                  <button onClick={() => setSelectedExp(null)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                    <Calendar size={16} className="text-accent" />
                    <span>{selectedExp.period}</span>
                    <span className="mx-2">•</span>
                    <MapPin size={16} className="text-accent" />
                    <span>{selectedExp.location}</span>
                  </div>
                  <p className="text-sm leading-relaxed opacity-80">{selectedExp.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent">Key Responsibilities</h4>
                  {selectedExp.details.map((detail: string, i: number) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedExp.tech.map((t: string) => (
                    <span key={t} className="px-3 py-1 text-[10px] font-bold rounded-lg bg-slate-100 dark:bg-white/5 border border-[var(--card-border)] uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}