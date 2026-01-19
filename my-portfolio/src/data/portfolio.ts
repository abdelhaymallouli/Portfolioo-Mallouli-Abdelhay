import { Layout, Database, Terminal, Code2, Cpu, Globe } from "lucide-react";

export const ME = {
  name: "Abdelhay Mallouli",
  role: "Full-Stack Engineer & Digital Architect",
  location: "Global / Remote",
  email: "abdelhay.mallouli@gmail.com", // Update with your actual email
  linkedin: "https://www.linkedin.com/in/abdelhaymallouli/",
  github: "https://github.com/yourusername",
};

export const SKILLS = [
  {
    name: "Frontend Mastery",
    icon: Layout,
    color: "text-blue-500",
    items: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    span: "md:col-span-2",
  },
  {
    name: "Backend & Cloud",
    icon: Database,
    color: "text-emerald-500",
    items: ["Node.js", "PostgreSQL", "Prisma", "Docker", "AWS"],
    span: "md:col-span-1",
  },
  {
    name: "AI & Innovation",
    icon: Cpu,
    color: "text-purple-500",
    items: ["OpenAI API", "LangChain", "Vector Databases", "Python"],
    span: "md:col-span-1",
  },
  {
    name: "Core Engineering",
    icon: Terminal,
    color: "text-orange-500",
    items: ["Git", "CI/CD", "System Design", "Microservices"],
    span: "md:col-span-2",
  },
];