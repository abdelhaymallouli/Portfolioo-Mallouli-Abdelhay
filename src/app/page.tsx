"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { projects } from "@/data/projects";
import Footer from "@/components/footer";
import ProjectModal from "@/components/ProjectModal";
import { useState } from "react";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      
{/* Work Section */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p) => (
            <div key={p.id} onClick={() => setSelectedProject(p)}>
               <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Render the Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
      <Skills />
      <Experience />
      <Contact />

      <Footer />
    </main>
  );
}