import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Work */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <Skills />
      <Experience />
      <Contact />

      <footer className="py-20 text-center opacity-30 text-xs font-mono uppercase tracking-[0.4em]">
        Designed with Precision &copy; 2026
      </footer>
    </main>
  );
}