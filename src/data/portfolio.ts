import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiKotlin,
  SiAndroid,
  SiAlpinedotjs,
  SiLaravel,
  SiPhp,
  SiGo,
  SiMysql,
  SiPostgresql,
  SiWordpress,
  SiDocker,
  SiLinux,
  SiApache,
  SiGit,
  SiGithub,
  SiFigma,
} from "react-icons/si";
import type { IconType } from "react-icons";

export const ME = {
  name: "Abdelhay Mallouli",
  role: "Full Stack Developer",
  location: "Tangier, Morocco / Remote",
  email: "abdelhay.mallouli@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdelhaymallouli/",
  github: "https://github.com/abdelhaymallouli",
};

export const STATUS = {
  badge: "Open to work · Remote / Relocation",
  line: "Ready to deploy production-grade code. Specializing in building scalable architectures and pixel-perfect user experiences.",
};

// Chiffres logiques, concrets et percutants pour ton profil
export const STATS = [
  { value: "1st", label: "Regional Hackathon Winner" },
  { value: "10+", label: "Full-Stack Projects Shipped" },
  { value: "100%", label: "SOLID & Test-Driven Development (TDD)" },
];

export type SkillItem = { name: string; icon: IconType; color: string };
export type SkillGroup = { category: string; items: SkillItem[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend & Mobile",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
      { name: "Alpine.js", icon: SiAlpinedotjs, color: "#8BC0D0" },
      { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
      { name: "Jetpack Compose", icon: SiAndroid, color: "#3DDC84" },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "WordPress", icon: SiWordpress, color: "#21759B" },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Apache", icon: SiApache, color: "#D22128" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
];

export const PRACTICES: string[] = [
  "RESTful APIs",
  "OAuth2 / OpenID",
  "MVVM / AAA Patterns",
  "GitFlow",
  "Unit & Integration Testing",
  "Agile / Scrum",
  "Design Thinking",
  "MCD / MLD Modeling",
  "CI/CD",
  "Networking (DNS/DHCP)",
  "Clean Code",
];