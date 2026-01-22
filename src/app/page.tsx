"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { projects } from "@/data/projects";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github } from "lucide-react";

export default function Home() {
  // Pagination Logic
  const PROJECTS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + PROJECTS_PER_PAGE, projects.length));
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Work Section */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-4 font-bold opacity-80">
              // Selected Work
            </h2>
            <h3 className="text-4xl font-black tracking-tighter">
              Featured Projects 
              <span className="text-[var(--muted)] text-xl font-normal ml-3 opacity-40">
                ({projects.length})
              </span>
            </h3>
          </div>
          
          <a 
            href="https://github.com/abdelhaymallouli" 
            target="_blank"
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-accent transition-all pb-1 border-b border-transparent hover:border-accent"
          >
            Full Archive <Github size={14} className="group-hover:rotate-12 transition-transform" />
          </a>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((p, index) => (
              <motion.div 
                key={p.id} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: (index % PROJECTS_PER_PAGE) * 0.1 }}
                className="cursor-pointer"
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Button */}
        {hasMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 flex flex-col items-center gap-6"
          >
            <button
              onClick={showMore}
              className="group relative flex items-center gap-3 px-10 py-5 rounded-full bg-[var(--card)] border border-[var(--card-border)] shadow-xl hover:border-accent/40 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative text-sm font-bold uppercase tracking-widest">
                Load More Projects
              </span>
              <ChevronDown size={18} className="relative group-hover:translate-y-1 transition-transform text-accent" />
            </button>
            
            <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.2em]">
              Showing {visibleCount} of {projects.length} Repositories
            </p>
          </motion.div>
        )}
      </section>

      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
