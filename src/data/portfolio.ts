import { 
  Layout, 
  Database, 
  Terminal, 
  Code2, 
  Cpu, 
  Globe, 
  PenTool, 
  Trello, 
  FileText, 
  GitBranch 
} from "lucide-react";

export const ME = {
  name: "Abdelhay Mallouli",
  role: "Full Stack Developer",
  location: "Tangier, Morocco / Remote",
  email: "abdelhay.mallouli@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdelhaymallouli/",
  github: "https://github.com/abdelhaymallouli",
};

export const SKILLS = [
  {
    name: "Web Fundamentals",
    icon: Globe,
    color: "text-yellow-500",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "AJAX", "Responsive Design"],
    span: "md:col-span-1",
  },
  {
    name: "Frontend Mastery",
    icon: Layout,
    color: "text-blue-500",
    items: ["React 19", "Next.js 15", "TypeScript", "Tailwind (Preline)", "Framer Motion"],
    span: "md:col-span-2",
  },
  {
    name: "Backend Architecture",
    icon: Database,
    color: "text-emerald-500",
    items: ["Laravel", "PHP", "Go (Golang)", "Kotlin", "Django", "SQL / PostgreSQL"],
    span: "md:col-span-2",
  },
  {
    name: "Engineering Culture",
    icon: GitBranch,
    color: "text-orange-500",
    items: ["Gitflow", "REST APIs", "Unit Testing", "Debugging", "Clean Code"],
    span: "md:col-span-1",
  },
  {
    name: "Strategy & Design",
    icon: Trello,
    color: "text-rose-500",
    items: ["Agile / Scrum", "Design Thinking", "UI/UX Maquete", "LaTeX (TeX)"],
    span: "md:col-span-3", // Full width row for management & design
  },
];