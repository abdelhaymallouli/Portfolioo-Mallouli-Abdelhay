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
  GitBranch,
  Server
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
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Modern PHP (OOP)", "Responsive Design"],
    span: "md:col-span-1",
  },
  {
    name: "Frontend & Mobile", 
    icon: Layout,
    color: "text-blue-500",
    items: [ "TypeScript" ,"React 19", "Next.js 15", "Kotlin (Jetpack Compose)", "Android SDK", "Tailwind (Preline)", "Alpine.js"],
    span: "md:col-span-2",
  },
  {
    name: "Backend Architecture",
    icon: Database,
    color: "text-emerald-500",
    items: ["Laravel (Eloquent)", "Go (Golang)", "RESTful APIs", "SQL / PostgreSQL / MySQL", "OAuth2 / OpenID"],
    span: "md:col-span-2",
  },
  {
    name: "DevOps & Infrastructure", 
    icon: Server, 
    color: "text-purple-500",
    items: ["Docker", "Linux (Apache/VirtualHosts)", "SSL/TLS", "Networking (DNS/DHCP)", "CI/CD Concepts"],
    span: "md:col-span-1",
  },
  {
    name: "Engineering Culture",
    icon: GitBranch,
    color: "text-orange-500",
    items: ["GitFlow", "MVVM / AAA Patterns", "Unit & Integration Testing", "Mattermost Plugin API", "Clean Code"],
    span: "md:col-span-1",
  },
  {
    name: "Strategy & Design",
    icon: Trello,
    color: "text-rose-500",
    items: ["Agile / Scrum", "Design Thinking", "Figma (UI/UX)", "MCD/MLD Modeling", "Enterprise Automation"],
    span: "md:col-span-2", 
  },
];