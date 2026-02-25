"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Github,
  ExternalLink,
  Code2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";
import { memo } from "react";

const ProjectCardContent = ({ project }: { project: Project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ y: -5 }}
      className="group relative bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-5 shadow-[var(--shadow)] hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Overlay Link - Makes the whole card clickable */}
      <Link
        href={`/projects/${project.id}`}
        className="absolute inset-0 z-0 rounded-2xl"
      />

      {/* Image Area */}
      <div className="aspect-video bg-neutral-100 dark:bg-neutral-900 rounded-xl mb-6 overflow-hidden relative flex items-center justify-center pointer-events-none border border-[var(--card-border)] group-hover:border-accent/30 transition-colors">
        {/* STATUS BADGE OVERLAY */}
        {project.status && (
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
            </span>
            <span className="text-[10px] font-semibold tracking-wide text-white/90">
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
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-neutral-400">
            <Code2 size={40} strokeWidth={1.5} />
            <span className="text-xs font-medium tracking-wide">
              Visuals Coming Soon
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="relative z-10 pointer-events-none flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 tracking-tight text-[var(--foreground)] group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-[var(--muted)] text-sm mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Engineering Highlights (Technical Challenges & Solutions) */}
        {(project.technicalChallenges || project.solutions) && (
          <div className="mb-6 space-y-3 flex-grow">
            {project.technicalChallenges &&
              project.technicalChallenges.length > 0 && (
                <div className="flex gap-2 items-start">
                  <AlertCircle
                    size={16}
                    className="text-red-400 mt-0.5 shrink-0"
                  />
                  <p className="text-xs text-[var(--foreground)]/80 leading-relaxed font-medium">
                    <span className="font-semibold text-[var(--foreground)]">
                      Challenge:
                    </span>{" "}
                    {project.technicalChallenges[0]}
                  </p>
                </div>
              )}
            {project.solutions && project.solutions.length > 0 && (
              <div className="flex gap-2 items-start">
                <Lightbulb size={16} className="text-accent mt-0.5 shrink-0" />
                <p className="text-xs text-[var(--foreground)]/80 leading-relaxed font-medium">
                  <span className="font-semibold text-[var(--foreground)]">
                    Solution:
                  </span>{" "}
                  {project.solutions[0]}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-[var(--card-border)] relative z-20 pointer-events-auto flex gap-4 items-center">
        {/* GitHub Link */}
        {project.github ? (
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 -ml-2 text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)] rounded-md transition-colors"
          >
            <Github size={18} />
          </motion.a>
        ) : (
          <div className="flex items-center gap-1.5 opacity-40 py-2">
            <Github size={16} className="text-[var(--muted)]" />
            <span className="text-[10px] font-semibold tracking-wider text-[var(--muted)]">
              Private
            </span>
          </div>
        )}

        {/* Live Preview Link */}
        {project.link && project.link !== "#" ? (
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)] rounded-md transition-colors"
          >
            <ExternalLink size={18} />
          </motion.a>
        ) : (
          <div className="p-2 text-[var(--muted)] opacity-20 cursor-not-allowed">
            <ExternalLink size={18} />
          </div>
        )}

        {/* Tech Tags */}
        <div className="ml-auto flex gap-1.5 flex-wrap justify-end">
          {project.tech?.slice(0, 3).map((t: string) => (
            <span
              key={t}
              className="px-2 py-1 text-[10px] font-medium bg-[var(--card-border)]/50 text-[var(--foreground)] rounded-md"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ProjectCardContent);
