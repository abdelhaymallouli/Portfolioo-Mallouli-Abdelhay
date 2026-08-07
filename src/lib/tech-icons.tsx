import type { IconType } from "react-icons";
import {
  SiAlpinedotjs,
  SiChartdotjs,
  SiCss,
  SiDocker,
  SiHtml5,
  SiFigma,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGo,
  SiInertia,
  SiJavascript,
  SiKotlin,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiOllama,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

/**
 * Central registry of technology icons.
 *
 * Everything is resolved through this map so a brand rename in the upstream
 * icon set only has to be fixed in one place. Each entry carries the icon's
 * official brand colour, which components may opt into on hover.
 *
 * Note on two substitutions (verified against the installed packages):
 *  - Simple Icons no longer ships a LinkedIn glyph, so `linkedin` uses
 *    `FaLinkedin` from Font Awesome 6.
 *  - GitFlow is a branching *convention*, not a product with a logo, so
 *    `gitflow` reuses the Git mark.
 */
export type TechKey =
  | "nextjs"
  | "react"
  | "typescript"
  | "javascript"
  | "python"
  | "kotlin"
  | "html5"
  | "css"
  | "tailwind"
  | "php"
  | "laravel"
  | "inertia"
  | "alpine"
  | "chartjs"
  | "vite"
  | "mysql"
  | "postgresql"
  | "sqlite"
  | "ollama"
  | "go"
  | "docker"
  | "githubactions"
  | "gitflow"
  | "figma"
  | "github"
  | "linkedin";

export interface TechMeta {
  /** Human-readable label rendered next to the glyph. */
  label: string;
  /** The icon component itself. */
  Icon: IconType;
  /** Official brand hex, used for hover accents. */
  brand: string;
}

export const TECH: Record<TechKey, TechMeta> = {
  nextjs: { label: "Next.js", Icon: SiNextdotjs, brand: "#000000" },
  react: { label: "React", Icon: SiReact, brand: "#61DAFB" },
  typescript: { label: "TypeScript", Icon: SiTypescript, brand: "#3178C6" },
  javascript: { label: "JavaScript", Icon: SiJavascript, brand: "#F7DF1E" },
  python: { label: "Python", Icon: SiPython, brand: "#3776AB" },
  kotlin: { label: "Kotlin", Icon: SiKotlin, brand: "#7F52FF" },
  html5: { label: "HTML5", Icon: SiHtml5, brand: "#E34F26" },
  /* Simple Icons dropped the numbered `SiCss3` mark; `SiCss` is its successor. */
  css: { label: "CSS", Icon: SiCss, brand: "#663399" },
  tailwind: { label: "Tailwind CSS", Icon: SiTailwindcss, brand: "#06B6D4" },
  php: { label: "PHP", Icon: SiPhp, brand: "#777BB4" },
  laravel: { label: "Laravel", Icon: SiLaravel, brand: "#FF2D20" },
  inertia: { label: "Inertia.js", Icon: SiInertia, brand: "#9553E9" },
  alpine: { label: "Alpine.js", Icon: SiAlpinedotjs, brand: "#8BC0D0" },
  chartjs: { label: "Chart.js", Icon: SiChartdotjs, brand: "#FF6384" },
  vite: { label: "Vite", Icon: SiVite, brand: "#646CFF" },
  mysql: { label: "MySQL", Icon: SiMysql, brand: "#4479A1" },
  postgresql: { label: "PostgreSQL", Icon: SiPostgresql, brand: "#4169E1" },
  sqlite: { label: "SQLite", Icon: SiSqlite, brand: "#003B57" },
  ollama: { label: "Ollama", Icon: SiOllama, brand: "#000000" },
  go: { label: "Go", Icon: SiGo, brand: "#00ADD8" },
  docker: { label: "Docker", Icon: SiDocker, brand: "#2496ED" },
  githubactions: {
    label: "GitHub Actions",
    Icon: SiGithubactions,
    brand: "#2088FF",
  },
  gitflow: { label: "GitFlow", Icon: SiGit, brand: "#F05032" },
  figma: { label: "Figma", Icon: SiFigma, brand: "#F24E1E" },
  github: { label: "GitHub", Icon: SiGithub, brand: "#181717" },
  linkedin: { label: "LinkedIn", Icon: FaLinkedin, brand: "#0A66C2" },
};
