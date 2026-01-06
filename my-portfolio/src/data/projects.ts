import { Project } from "@/types";
import { Layout, Database, Terminal, Code2 } from "lucide-react";


export const projects: Project[] = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A high-performance system architecture using distributed nodes.",
    tech: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    link: "https://demo.com",
    github: "https://github.com",
    image: "/p1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Neural Interface",
    description: "AI-driven component generation engine with real-time feedback.",
    tech: ["Python", "React", "Framer Motion"],
    link: "https://demo.com",
    github: "https://github.com",
    image: "/p2.jpg",
    featured: true,
  },
];


export const skills = [
  {
    name: "Frontend",
    icon: Layout,
    color: "text-blue-500",
    className: "md:col-span-2 md:row-span-1",
    items: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    name: "Backend",
    icon: Database,
    color: "text-emerald-500",
    className: "md:col-span-1 md:row-span-2",
    items: ["Node.js", "PostgreSQL", "Prisma"],
  },
  {
    name: "Tools",
    icon: Terminal,
    color: "text-orange-500",
    className: "md:col-span-1 md:row-span-1",
    items: ["Git", "Docker", "Vercel"],
  },
  {
    name: "Languages",
    icon: Code2,
    color: "text-purple-500",
    className: "md:col-span-2 md:row-span-1",
    items: ["JavaScript", "Python", "C++"],
  },
];