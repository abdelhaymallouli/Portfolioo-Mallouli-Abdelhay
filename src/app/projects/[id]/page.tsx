"use client";

import { projects } from "@/data/projects";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Code2, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectPage() {
  const params = useParams();
  const id = Number(params?.id);
  const project = projects.find((p) => p.id === id);

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* 1. Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6 flex justify-between items-center">
        <Link 
          href="/#projects"
          className="group flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-accent hover:text-white transition-all active:scale-95"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Back</span>
        </Link>

        <a 
          href={project.github} 
          target="_blank" 
          className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 hover:border-accent transition-all text-[var(--foreground)]"
        >
          <Github size={20} />
        </a>
      </nav>

      {/* 2. Hero Header */}
      <section className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-accent/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-accent">
              <Sparkles size={16} />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">Project Details</span>
            </div>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none uppercase">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 3. Main Layout */}
      <section className="container mx-auto px-6 max-w-7xl relative z-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Image & Description */}
          <div className="lg:col-span-8 space-y-10">
            {/* Image Container: High Precision Width & Top Alignment */}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-[var(--card-border)] bg-[var(--card)] shadow-2xl relative"
>
  {project.image ? (
    <div className="relative w-full max-h-[400px] md:max-h-[600px] overflow-hidden group">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-auto object-top transition-transform duration-700 group-hover:scale-105" 
      />
      {/* Subtle overlay to indicate it's a preview */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  ) : (
    <div className="w-full h-[400px] flex flex-col items-center justify-center bg-[var(--card)]">
      <Code2 size={48} className="opacity-10 mb-4"/>
      <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">No Preview Available</span>
    </div>
  )}
</motion.div>

            <div className="space-y-6 px-2">
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">Overview</h3>
              <p className="text-lg text-[var(--muted)] leading-relaxed font-medium">
                {project.description}
              </p>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Project Status Card */}
              <div className="p-8 rounded-[2rem] bg-[var(--card)] border border-[var(--card-border)] shadow-xl">
                <div className="mb-8">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">
                    // Live Review
                  </h4>
                  {project.link && project.link !== "#" ? (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-accent text-white font-bold hover:scale-[1.02] transition-all shadow-lg shadow-accent/20"
                    >
                      Visit Project <ExternalLink size={18} />
                    </a>
                  ) : (
                    <div className="w-full py-4 rounded-xl bg-slate-100 dark:bg-white/5 text-center text-[var(--muted)] font-bold border border-[var(--card-border)] italic opacity-60">
                      No Live Review
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">
                    // Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[10px] font-bold uppercase tracking-tight opacity-80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--card-border)]">
                   <a 
                    href={project.github} 
                    target="_blank" 
                    className="flex items-center justify-center gap-2 w-full text-xs font-bold text-[var(--muted)] hover:text-accent transition-colors uppercase tracking-widest"
                  >
                    <Github size={14} /> GitHub Repository
                  </a>
                </div>
              </div>

              {/* Inquiry Card */}
              <div className="p-8 rounded-[2rem] bg-accent/5 border border-accent/20 text-center">
                <p className="text-xs font-bold uppercase tracking-tight mb-4 opacity-70">Interested in this architecture?</p>
                <Link href="/#contact" className="text-xs font-black uppercase tracking-[0.2em] text-accent hover:underline underline-offset-4">
                  Let's Talk →
                </Link>
              </div>

            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}