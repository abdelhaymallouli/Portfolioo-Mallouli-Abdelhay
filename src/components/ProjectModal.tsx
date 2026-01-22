"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Github, ExternalLink, Code2, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

export default function ProjectModal({ project, isOpen, onClose }: any) {
  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="relative w-full max-w-6xl bg-[var(--card)] border border-[var(--card-border)] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* 1. Close Button (Floating) */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-[110] p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-accent/20 transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>

            {/* 2. Visual Section (Left) */}
            <div className="w-full md:w-3/5 bg-slate-50 dark:bg-white/[0.02] border-b md:border-b-0 md:border-r border-[var(--card-border)] relative flex items-center justify-center min-h-[300px] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/80 via-transparent to-transparent" />

              {/* Tag Cloud overlay */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                {project.tech.slice(0, 3).map((t: string) => (
                  <span key={t} className="px-3 py-1 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-[var(--card-border)] rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Content Section (Right) */}
            <div className="w-full md:w-2/5 flex flex-col h-full overflow-hidden">
              {/* Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-8 md:p-10">
                <header className="mb-8">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Code2 size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Case Study</span>
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
                    {project.title}
                  </h2>
                </header>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-xs font-bold uppercase text-[var(--muted)] tracking-widest mb-3">Project Goals</h3>
                    <p className="text-[var(--foreground)] opacity-80 leading-relaxed text-base">
                      {project.description}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase text-[var(--muted)] tracking-widest mb-4">Tech Stack</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {project.tech.map((t: string) => (
                        <div key={t} className="flex items-center gap-2 text-sm font-medium">
                          <CheckCircle2 size={14} className="text-accent" />
                          {t}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              {/* 4. Action Bar (Fixed at bottom) */}
              <div className="p-8 border-t border-[var(--card-border)] bg-[var(--card)] flex flex-col sm:flex-row gap-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-accent text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-accent/20"
                >
                  <ExternalLink size={18} />
                  Live Preview
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 flex items-center justify-center gap-2 py-4 rounded-xl border border-[var(--card-border)] hover:bg-[var(--background)] font-bold transition-all"
                >
                  <Github size={18} />
                  Source
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}