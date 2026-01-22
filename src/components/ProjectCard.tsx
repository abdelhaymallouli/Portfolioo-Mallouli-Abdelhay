"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";

export default function ProjectCard({ project }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[var(--card)] border border-[var(--card-border)] rounded-[2rem] p-4 shadow-[var(--shadow)] hover:border-accent/40 transition-all duration-300"
    >
      {/* Overlay Link - Makes the whole card clickable */}
      <Link href={`/projects/${project.id}`} className="absolute inset-0 z-0 rounded-[2rem]" />

      {/* Image Area */}
      <div className="aspect-video bg-slate-100 dark:bg-white/5 rounded-[1.5rem] mb-6 overflow-hidden relative flex items-center justify-center pointer-events-none">
        
        {/* NEW: STATUS BADGE OVERLAY */}
        {project.status && (
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-tighter text-white/90">
              {project.status}
            </span>
          </div>
        )}

        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-20">
            <Code2 size={40} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Visuals Coming Soon</span>
          </div>
        )}
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="px-4 pb-4 relative z-10 pointer-events-none">
        <h3 className="text-xl font-bold mb-2 tracking-tight">{project.title}</h3>
        <p className="text-[var(--muted)] text-sm mb-6 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex gap-4 items-center pointer-events-auto">
          {/* GitHub Link */}
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/icon relative z-20"
          >
            <Github 
              size={18} 
              className="text-[var(--muted)] group-hover/icon:text-accent transition-colors cursor-pointer" 
            />
          </a>

          {/* Live Preview Link */}
          {project.link && project.link !== "#" ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/icon relative z-20"
            >
              <ExternalLink 
                size={18} 
                className="text-[var(--muted)] group-hover/icon:text-accent transition-colors cursor-pointer" 
              />
            </a>
          ) : (
            <ExternalLink 
              size={18} 
              className="text-[var(--muted)] opacity-20 cursor-not-allowed" 
            />
          )}

          {/* Tech Tags */}
          <div className="ml-auto flex gap-2">
            {project.tech?.slice(0, 2).map((t: string) => (
              <span key={t} className="text-[10px] font-bold uppercase tracking-tighter opacity-40">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}