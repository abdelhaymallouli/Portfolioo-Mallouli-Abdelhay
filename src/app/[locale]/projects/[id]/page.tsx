import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Cpu,
  Layers,
  CheckCircle2,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ProjectShowcase from "@/components/ProjectShowcase";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, id: String(p.id) }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const project = projects.find((p) => String(p.id) === id);
  if (!project) return { title: "Project Not Found" };

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}/projects/${id}`])
  );

  return {
    title: `${project.title} | Abdelhay Mallouli`,
    description: project.description,
    alternates: {
      canonical: `/${locale}/projects/${id}`,
      languages: { ...languages, "x-default": `/${routing.defaultLocale}/projects/${id}` },
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const project = projects.find((p) => String(p.id) === id);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <ProjectShowcase
        image={project.image}
        title={project.title}
        status={project.status}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-32 relative z-10">
        {/* Title block */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-2xl font-mono text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(201,162,39,0.4)] active:scale-[0.98]"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[var(--card)] border border-[var(--card-border)] rounded-2xl font-mono text-xs font-bold uppercase tracking-widest hover:border-accent/50 transition-all active:scale-[0.98]"
            >
              <Github size={14} /> View Source
            </a>
          )}
        </div>

        {/* Grid: Tech Stack + Methodologies */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Tech Stack */}
          <div className="p-6 rounded-3xl bg-[var(--card)] border border-[var(--card-border)]">
            <h2 className="flex items-center gap-2 text-[11px] font-mono font-black uppercase tracking-[0.3em] text-accent mb-5">
              <Cpu size={14} /> Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full text-[11px] font-bold font-mono bg-accent/10 text-accent border border-accent/20 uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Methodologies */}
          {project.methodologies?.length > 0 && (
            <div className="p-6 rounded-3xl bg-[var(--card)] border border-[var(--card-border)]">
              <h2 className="flex items-center gap-2 text-[11px] font-mono font-black uppercase tracking-[0.3em] text-accent mb-5">
                <Layers size={14} /> Architecture
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.methodologies.map((m) => (
                  <span
                    key={m}
                    className="px-3 py-1.5 rounded-full text-[11px] font-bold font-mono bg-[var(--card-border)]/50 text-[var(--foreground)] border border-[var(--card-border)] uppercase tracking-wider"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technical Challenges */}
        {project.technicalChallenges &&
          project.technicalChallenges.length > 0 && (
            <div className="mb-8 p-8 rounded-3xl bg-[var(--card)] border border-[var(--card-border)]">
              <h2 className="flex items-center gap-2 text-[11px] font-mono font-black uppercase tracking-[0.3em] text-accent mb-6">
                <Wrench size={14} /> Technical Challenges
              </h2>
              <ul className="space-y-3">
                {project.technicalChallenges.map((c, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-sm leading-relaxed text-[var(--muted)]"
                  >
                    <span className="font-mono text-accent font-black shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Solutions */}
        {project.solutions && project.solutions.length > 0 && (
          <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--card-border)]">
            <h2 className="flex items-center gap-2 text-[11px] font-mono font-black uppercase tracking-[0.3em] text-accent mb-6">
              <CheckCircle2 size={14} /> Solutions & Outcomes
            </h2>
            <ul className="space-y-3">
              {project.solutions.map((s, i) => (
                <li
                  key={i}
                  className="flex gap-4 text-sm leading-relaxed text-[var(--muted)]"
                >
                  <CheckCircle2
                    size={16}
                    className="text-accent shrink-0 mt-0.5"
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[var(--card-border)] flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm font-mono text-[var(--muted)] hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] opacity-40">
            Abdelhay Mallouli · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </main>
  );
}
