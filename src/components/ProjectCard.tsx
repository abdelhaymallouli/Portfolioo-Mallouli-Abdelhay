"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, Code2, Terminal, Cpu, Layers } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";
import { memo } from "react";

const ProjectCardContent = ({ project }: { project: Project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Fix #6 — useTransform was inlined inside the JSX style prop, recreating
  // it on every render. Extract it here so it's only created once per component.
  const glowBackground = useTransform(
    [mouseXSpring, mouseYSpring],
    ([xVal, yVal]: number[]) => {
      const xPct = (xVal + 0.5) * 100;
      const yPct = (yVal + 0.5) * 100;
      return `radial-gradient(circle at ${xPct}% ${yPct}%, var(--color-accent) 0%, transparent 60%)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width  - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <div style={{ perspective: "1000px" }} className="h-full">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group glass border-beam relative rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden"
      >
        {/* Fix #6 — glowBackground extracted above, not recreated inline */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glowBackground, opacity: 0.15 }}
        />

        <Link href={`/projects/${project.id}`} className="absolute inset-0 z-10 rounded-2xl" />

        <div style={{ transform: "translateZ(30px)" }} className="relative z-20 flex-grow flex flex-col pointer-events-none">
          <div className="aspect-video bg-neutral-100 dark:bg-black/50 rounded-xl mb-6 overflow-hidden relative flex items-center justify-center border border-[var(--card-border)] group-hover:border-accent/50 transition-colors">
            {project.status && (
              <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-lg">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                </span>
                <span className="text-[10px] font-mono tracking-wide text-white/90">{project.status.toUpperCase()}</span>
              </div>
            )}

            {project.image ? (
              <Image
                src={project.image} alt={project.title} fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-neutral-500">
                <Code2 size={40} strokeWidth={1} />
                <span className="font-mono text-[10px] uppercase tracking-widest">SYS.IMG.NOT_FOUND</span>
              </div>
            )}

            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-6 z-20">
              <h4 className="font-mono text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Terminal size={12} /> System Status: Operational
              </h4>
              {project.methodologies?.length > 0 && (
                <div className="mb-3">
                  <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                    <Layers size={10} /> Architecture
                  </p>
                  <p className="text-xs text-neutral-200 font-medium">{project.methodologies.join(" · ")}</p>
                </div>
              )}
              {project.tech?.length > 0 && (
                <div>
                  <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                    <Cpu size={10} /> Core Tech
                  </p>
                  <p className="text-xs text-neutral-200 font-medium">{project.tech.slice(0, 4).join(" | ")}</p>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2 tracking-tight text-[var(--foreground)] group-hover:text-accent transition-colors shrink-0">
            {project.title}
          </h3>
          <p className="text-[var(--muted)] text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>
        </div>

        <div
          style={{ transform: "translateZ(40px)" }}
          className="mt-auto pt-4 border-t border-[var(--card-border)] relative z-30 pointer-events-auto flex gap-4 items-center"
        >
          {project.github ? (
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              href={project.github} target="_blank" rel="noopener noreferrer"
              className="p-2 -ml-2 text-[var(--muted)] hover:text-accent hover:bg-accent/10 rounded-md transition-colors">
              <Github size={18} />
            </motion.a>
          ) : (
            <div className="flex items-center gap-1.5 opacity-40 py-2">
              <Github size={16} className="text-[var(--muted)]" />
              <span className="font-mono text-[10px] font-semibold tracking-wider text-[var(--muted)]">PRIVATE</span>
            </div>
          )}

          {project.link && project.link !== "#" ? (
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              href={project.link} target="_blank" rel="noopener noreferrer"
              className="p-2 text-[var(--muted)] hover:text-accent hover:bg-accent/10 rounded-md transition-colors">
              <ExternalLink size={18} />
            </motion.a>
          ) : (
            <div className="p-2 text-[var(--muted)] opacity-20 cursor-not-allowed">
              <ExternalLink size={18} />
            </div>
          )}

          <div className="ml-auto flex gap-1.5 flex-wrap justify-end">
            {project.tech?.slice(0, 2).map((t: string) => (
              <span key={t} className="px-2 py-1 font-mono text-[9px] uppercase tracking-wider font-semibold bg-[var(--card-border)]/50 text-[var(--foreground)] rounded-md border border-[var(--card-border)]">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="beam" />
      </motion.div>
    </div>
  );
};

export default memo(ProjectCardContent);