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
              {exp.type === "school" ? <School size={16} /> : <Briefcase size={16} />}
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
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[var(--card)] border border-[var(--card-border)] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Sticky Header */}
              <div className="p-8 pb-4 flex justify-between items-start bg-[var(--card)] sticky top-0 z-20 border-b border-transparent">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight leading-tight">{selectedExp.role}</h3>
                  <p className="text-accent font-semibold text-lg">{selectedExp.company}</p>
                </div>
                <button 
                  onClick={() => setSelectedExp(null)} 
                  className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-accent/10 hover:text-accent transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="px-8 pb-10 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-accent/20">
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-[var(--muted)] mb-6 pt-2">
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                    <Calendar size={14} className="text-accent" />
                    <span className="font-medium text-[12px]">{selectedExp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                    <MapPin size={14} className="text-accent" />
                    <span className="font-medium text-[12px]">{selectedExp.location}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-base leading-relaxed text-[var(--foreground)] opacity-90 border-l-4 border-accent/30 pl-4 py-1 italic">
                    {selectedExp.description}
                  </p>
                </div>

                {/* Details List */}
                <div className="space-y-4 mb-10">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-accent/80 flex items-center gap-2">
                    <span className="h-px w-4 bg-accent/30"></span>
                    Key Responsibilities & Achievements
                  </h4>
                  <div className="grid gap-3">
                    {selectedExp.details.map((detail: string, i: number) => (
                      <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors border border-transparent hover:border-[var(--card-border)]">
                        <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                        <span className="text-sm leading-snug font-medium opacity-80">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-accent/80 flex items-center gap-2">
                    <span className="h-px w-4 bg-accent/30"></span>
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.tech.map((t: string) => (
                      <span 
                        key={t} 
                        className="px-4 py-1.5 text-[10px] font-bold rounded-full bg-accent/5 text-accent border border-accent/10 uppercase tracking-wider hover:bg-accent hover:text-white transition-all cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Gradient Fade (Indicates more scroll) */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--card)] to-transparent pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}