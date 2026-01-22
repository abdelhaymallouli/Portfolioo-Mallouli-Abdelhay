import { motion } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, Code2 } from "lucide-react";

export default function ProjectCard({ project }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-[var(--card)] border border-[var(--card-border)] rounded-[2rem] p-4 shadow-[var(--shadow)] hover:border-accent/40 transition-all duration-300"
    >
{/* Image Area */}
<div className="aspect-video bg-slate-100 dark:bg-white/5 rounded-[1.5rem] mb-6 overflow-hidden relative flex items-center justify-center">
  {project.image ? (
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes="(max-width: 768px) 100vw, 400px"
      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      // This handles broken links even if the string exists
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

      <div className="px-4 pb-4">
        <h3 className="text-xl font-bold mb-2 tracking-tight">{project.title}</h3>
        <p className="text-[var(--muted)] text-sm mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex gap-4 items-center">
          <Github size={18} className="text-[var(--muted)] hover:text-accent transition-colors cursor-pointer" />
          <ExternalLink size={18} className="text-[var(--muted)] hover:text-accent transition-colors cursor-pointer" />
          <div className="ml-auto flex gap-2">
            {project.tech?.slice(0, 2).map((t: string) => (
              <span key={t} className="text-[10px] font-bold uppercase tracking-tighter opacity-40">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}