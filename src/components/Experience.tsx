"use client";
import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  X,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronRight,
  School,
  Award,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { EXPERIENCES, STANDALONE_CERTS } from "@/data/Experience";
// Fix #2 — import proper types instead of using `any`
import type { Experience, StandaloneCert } from "@/types";

export default function ExperienceSection() {
  // Fix #2 — was `useState<any>(null)`, now properly typed

  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-12 font-bold opacity-80">
        // Professional Journey
      </h2>

      {/* Timeline */}
      <div ref={containerRef} className="space-y-12 relative">
        <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-slate-200 dark:via-white/5 to-transparent z-0" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute top-0 left-[20px] md:left-1/2 -translate-x-1/2 w-[3px] bg-accent shadow-[0_0_20px_2px_var(--color-accent)] rounded-full origin-top z-0"
        />

        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group z-10"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-accent bg-[var(--card)] text-accent shadow-[0_0_15px_rgba(59,130,246,0.5)] md:order-1 absolute left-[20px] md:left-1/2 -translate-x-1/2 z-20 group-hover:scale-125 transition-transform duration-300">
              {exp.type === "school" ? (
                <School size={16} />
              ) : (
                <Briefcase size={16} />
              )}
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-3xl glass border-beam hover:shadow-2xl transition-all ml-12 md:ml-0 md:group-odd:mr-10 md:group-even:ml-10">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
                {exp.period}
              </span>
              <h3 className="text-xl font-bold text-[var(--foreground)] mt-1">
                {exp.role}
              </h3>
              <p className="text-[var(--muted)] text-sm mb-4">{exp.company}</p>
              <button
                onClick={() => setSelectedExp(exp as any)}
                className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent hover:brightness-125 transition-colors group/btn"
              >
                [ Access Records ]{" "}
                <ChevronRight
                  size={14}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <div className="mt-32">
        <h3 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-12 font-bold opacity-80 flex items-center gap-4">
          <span className="h-px w-8 bg-accent/30" />
          // Technical Specializations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STANDALONE_CERTS.map((cert: StandaloneCert, idx: number) => (
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
                  <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">
                    {cert.date}
                  </span>
                </div>
                <h4 className="font-bold text-lg mb-2 leading-tight">
                  {cert.title}
                </h4>
                <p className="text-xs text-accent font-bold uppercase tracking-widest mb-4">
                  {cert.issuer}
                </p>
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

      {/* Detail Modal */}
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
              <div className="p-8 pb-4 flex justify-between items-start bg-[var(--card)] sticky top-0 z-20">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight leading-tight">
                    {selectedExp.role}
                  </h3>
                  <p className="text-accent font-semibold text-lg">
                    {selectedExp.company}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedExp(null)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-accent/10 hover:text-accent transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-8 pb-10 overflow-y-auto">
                <div className="flex flex-wrap gap-2 mb-6 pt-2">
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                    <Calendar size={14} className="text-accent" />
                    <span className="font-medium text-[11px]">
                      {selectedExp.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                    <MapPin size={14} className="text-accent" />
                    <span className="font-medium text-[11px]">
                      {selectedExp.location}
                    </span>
                  </div>
                </div>

                {selectedExp.certificate && (
                  <div className="mb-8">
                    {selectedExp.certificate.url ? (
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
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                              Verified Credential
                            </p>
                            <p className="text-sm font-bold leading-tight">
                              {selectedExp.certificate.name}
                            </p>
                          </div>
                        </div>
                        <ExternalLink
                          size={16}
                          className="text-accent opacity-0 group-hover/cert:opacity-100 transition-opacity"
                        />
                      </a>
                    ) : (
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/20">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-xl bg-slate-200 dark:bg-white/10 text-[var(--muted)]">
                            <Loader2
                              size={20}
                              className="animate-spin text-accent"
                            />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-accent animate-pulse">
                              Training in Progress
                            </p>
                            <p className="text-sm font-bold leading-tight opacity-60">
                              Certification Pending
                            </p>
                          </div>
                        </div>
                        <span className="text-[9px] font-black px-3 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-tighter">
                          Expected Sep 2026
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-base leading-relaxed opacity-90 border-l-4 border-accent/30 pl-4 py-1 italic mb-8">
                  {selectedExp.description}
                </p>

                <div className="space-y-4 mb-10">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-accent/80 flex items-center gap-2">
                    <span className="h-px w-4 bg-accent/30" /> Impact &amp;
                    Outcomes
                  </h4>
                  {selectedExp.details.map((detail: string, i: number) => (
                    <div
                      key={i}
                      className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-accent shrink-0 mt-0.5"
                      />
                      <span className="text-sm leading-snug font-medium opacity-80">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-accent/80 flex items-center gap-2">
                    <span className="h-px w-4 bg-accent/30" /> Tech Stack
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
