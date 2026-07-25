"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Project } from "@/types";
import { memo, useRef, useState } from "react";

function getBlurb(description: string) {
  const firstSentence = description.split(/\.\s|\.$/)[0]?.trim() ?? description;
  return firstSentence.length > 68
    ? firstSentence.slice(0, 68).trimEnd() + "…"
    : firstSentence;
}

const ProjectCardContent = ({ project }: { project: Project }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const blurb = getBlurb(project.description);
  const chips = project.tech?.slice(0, 4) ?? [];

  // Subtle pointer-driven 3D tilt (capped ~6°, off under reduced-motion via spring feel).
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), {
    stiffness: 180,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group h-full [transform-style:preserve-3d]"
    >
      <Link
        href={`/projects/${project.id}`}
        className="flex h-full flex-col rounded-[1.75rem] bg-[var(--card)] border border-[var(--card-border)] p-3 transition-colors duration-300 hover:border-accent/40 hover:shadow-xl"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-neutral-100 dark:bg-black/40">
          {project.status && (
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md border border-white/10">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-[10px] font-medium text-white/90">
                {project.status}
              </span>
            </div>
          )}

          {project.image && !imgFailed ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover object-top transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-7xl font-black text-[var(--muted)] opacity-20">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Hover action buttons */}
          {(project.link || project.github) && (
            <div className="absolute bottom-3 left-3 right-3 z-20 flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg hover:brightness-110"
                >
                  <ExternalLink size={12} /> Live
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md border border-white/10 hover:bg-black/90"
                >
                  <Github size={12} /> Code
                </a>
              )}
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-start justify-between gap-3 px-2 pt-4 pb-2">
          <div>
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-[var(--foreground)] transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <span className="mt-1 block text-xs text-[var(--muted)] line-clamp-1">
              {blurb}
            </span>
          </div>
          <ArrowUpRight
            size={20}
            className="mt-1 shrink-0 text-[var(--muted)] transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>

        {/* Tech chips */}
        {chips.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 px-2 pb-1 pt-1">
            {chips.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--card-border)] bg-accent/5 px-2.5 py-1 text-[10px] font-medium text-[var(--muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default memo(ProjectCardContent);
