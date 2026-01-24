"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, School, Award, ExternalLink, Loader2 } from "lucide-react";
import { EXPERIENCES, STANDALONE_CERTS } from "@/data/Experience";

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState<any>(null);

  return (
    <section id="experience" className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-12 font-bold opacity-80">
        // Professional Journey
      </h2>
      
      {/* Timeline Section */}
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

      {/* Standalone Certifications Grid */}
      <div className="mt-32">
        <h3 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-12 font-bold opacity-80 flex items-center gap-4">
          <span className="h-px w-8 bg-accent/30"></span>
          // Technical Specializations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STANDALONE_CERTS.map((cert, idx) => (
            <motion.a
              key={idx}
              href={cert.url}
              target="_blank"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-[var(--card)] border border-[var(--card-border)] hover:border-accent/40 transition-all flex flex-col justify-between group h-full"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <Award size={24} />
                  </div>
                  <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">{cert.date}</span>
                </div>
                <h4 className="font-bold text-lg mb-2 leading-tight">{cert.title}</h4>
                <p className="text-xs text-accent font-bold uppercase tracking-widest mb-4">{cert.issuer}</p>
              </div>
              <div className="pt-6 border-t border-[var(--card-border)] mt-auto">
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--muted)] opacity-60">
                  Core: {cert.tech}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[var(--card)] border border-[var(--card-border)] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-8 pb-4 flex justify-between items-start bg-[var(--card)] sticky top-0 z-20">
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
              <div className="px-8 pb-10 overflow-y-auto scrollbar-thin">
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-[var(--muted)] mb-6 pt-2">
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                    <Calendar size={14} className="text-accent" />
                    <span className="font-medium text-[11px]">{selectedExp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                    <MapPin size={14} className="text-accent" />
                    <span className="font-medium text-[11px]">{selectedExp.location}</span>
                  </div>
                </div>

                {/* MODAL CERTIFICATE LOGIC */}
                {selectedExp.certificate && (
                  <div className="mb-8">
                    {selectedExp.certificate.url ? (
                      /* If URL exists -> Show clickable certificate */
                      <a 
                        href={selectedExp.certificate.url} 
                        target="_blank"
                        className="flex items-center justify-between p-4 rounded-2xl bg-accent/5 border border-accent/20 hover:border-accent/50 transition-all group/cert"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-xl bg-accent text-white shadow-lg shadow-accent/20">
                            <Award size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Verified Credential</p>
                            <p className="text-sm font-bold leading-tight">{selectedExp.certificate.name}</p>
                          </div>
                        </div>
                        <ExternalLink size={16} className="text-accent opacity-0 group-hover/cert:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      /* If URL is empty -> Show "Still Learning" state */
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/20">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-xl bg-slate-200 dark:bg-white/10 text-[var(--muted)]">
                            <Loader2 size={20} className="animate-spin text-accent" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-accent animate-pulse">Training in Progress</p>
                            <p className="text-sm font-bold leading-tight opacity-60">Certification Pending Completion</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-black px-3 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-tighter">
                          Expected September 2026
                        </span>
                      </div>
                    )}
                  </div>
                )}

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
                    Impact & Outcomes
                  </h4>
                  <div className="grid gap-3">
                    {selectedExp.details.map((detail: string, i: number) => (
                      <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/[0.02] border border-transparent">
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
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.tech.map((t: string) => (
                      <span 
                        key={t} 
                        className="px-4 py-1.5 text-[10px] font-bold rounded-full bg-accent/5 text-accent border border-accent/10 uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}