import {
  TrendingUp,
  Zap,
  Award,
  Users,
  Server,
  Cloud,
  Layers,
  Wrench,
} from "lucide-react";

export type Color = "#c9a227" | "#10b981" | "#a1a1aa" | "#fbbf24";

export interface StatItem {
  value: string | number;
  suffix: string;
  label: string;
  color: Color;
  icon: any;
  ring: number;
}

export interface ExperienceItem {
  id: number;
  role: string | { de: string; en: string };
  company: string;
  location: string;
  period: string;
  type: string;
  color: Color;
  description?: { de: string; en: string };
  highlights: string[] | { de: string[]; en: string[] };
  tech: string[];
}

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  tech: string[];
  methodologies?: string[];
  technicalChallenges?: string[];
  solutions?: string[];
  link?: string;
  github?: string;
  image?: string;
  status?: string;
  kpi?: string;
}

export interface SkillItem {
  label: string;
  color: Color;
  icon: any;
  star: boolean;
  items: string[];
}

export interface CertItem {
  icon: string;
  title: string;
  type: string;
  date: string;
  color: Color;
  desc: string;
  file: string;
  image?: string;
}

export interface LanguageItem {
  name: string;
  lvl: string;
  pct: number;
  color: Color;
}

export interface WhyItem {
  icon: string;
  color: Color;
  t: string;
  de: string;
  en: string;
}

export const STATS: StatItem[] = [
  {
    value: 2,
    suffix: "+",
    label: "Jahre\nPraxis",
    color: "#c9a227",
    icon: TrendingUp,
    ring: 75,
  },
  {
    value: 12,
    suffix: "+",
    label: "Live\nProjekte",
    color: "#10b981",
    icon: Zap,
    ring: 90,
  },
  {
    value: 70,
    suffix: "%",
    label: "Effizienz\nSteigerung",
    color: "#a1a1aa",
    icon: Award,
    ring: 80,
  },
  {
    value: "B1",
    suffix: "+",
    label: "Deutsch\n(Prüfung bestanden)",
    color: "#fbbf24",
    icon: Users,
    ring: 70,
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 1,
    role: { de: "Praktikant Software-Entwicklung", en: "Software Development Intern" },
    company: "pragmatic minds GmbH",
    location: "Kirchheim unter Teck, Deutschland (Remote)",
    period: "Juli – August 2025",
    type: "PRAKTIKUM",
    color: "#a1a1aa",
    description: {
      de: "Entwicklung produktionsreifer Microservices und HR-Automatisierungstools in einem deutschen Scrum-Team.",
      en: "Developed production-ready microservices and HR automation tools in a German Scrum team.",
    },
    highlights: {
      de: [
        "Entwicklung von Moco-bot und AbwesenheitsBot mit Go und Microsoft Graph API (OAuth2)",
        "Containerisierung aller Dienste mit Docker",
        "Tägliche Code-Reviews und technische Abstimmungen auf Deutsch",
        "Integration von Personio- und Outlook-Systemen",
      ],
      en: [
        "Built Moco-bot and AbwesenheitsBot using Go and Microsoft Graph API (OAuth2)",
        "Containerized services with Docker",
        "Daily code reviews and technical discussions in German",
        "Integrated Personio and Outlook systems",
      ],
    },
    tech: ["Go", "Docker", "Microsoft Graph API", "OAuth2", "Mattermost"],
  },
  {
    id: 2,
    role: { de: "Mobile & Full-Stack Development (Jahr 2)", en: "Mobile & Full-Stack Development (Year 2)" },
    company: "Solicode",
    location: "Tanger, Marokko",
    period: "2025 – 2026",
    type: "AUSBILDUNG",
    color: "#c9a227",
    description: {
      de: "Fortgeschrittene Spezialisierung in Enterprise Web- und Mobile-Entwicklung.",
      en: "Advanced specialization in enterprise web and mobile development.",
    },
    highlights: {
      de: [
        "Native Android-Apps mit Kotlin und Jetpack Compose",
        "Komplexe Laravel-Backends mit RESTful APIs",
        "Docker und Webserver-Administration (Apache, SSL/TLS)",
        "GitFlow und Scrum in Teamprojekten",
      ],
      en: [
        "Native Android apps with Kotlin and Jetpack Compose",
        "Complex Laravel backends with RESTful APIs",
        "Docker and web server administration",
        "GitFlow and Scrum in team projects",
      ],
    },
    tech: ["Kotlin", "Jetpack Compose", "Laravel", "Docker", "React", "TypeScript"],
  },
  {
    id: 3,
    role: { de: "Full-Stack Web Development (Jahr 1)", en: "Full-Stack Web Development (Year 1)" },
    company: "Solicode",
    location: "Tanger, Marokko",
    period: "2024 – 2025",
    type: "AUSBILDUNG",
    color: "#10b981",
    description: {
      de: "Grundlage in moderner Webentwicklung mit Fokus auf PHP, React und Datenbanken.",
      en: "Foundation in modern web development with focus on PHP, React and databases.",
    },
    highlights: {
      de: [
        "React-Frontends mit TypeScript und Tailwind CSS",
        "PHP (OOP) und Laravel Backends",
        "Datenbankmodellierung (MySQL)",
        "Agile/Scrum und Git/GitHub",
      ],
      en: [
        "React frontends with TypeScript and Tailwind",
        "PHP (OOP) and Laravel backends",
        "Database modeling (MySQL)",
        "Agile/Scrum and Git/GitHub",
      ],
    },
    tech: ["React", "PHP", "MySQL", "Tailwind CSS", "Figma"],
  },
];

export const PROJECTS: ProjectItem[] = [
 {
    id: 1,
    title: "AttendanceFlow AMS",
    description: "Automatisierung administrativer Workflows mit 70% Zeitersparnis. EdTech-Lösung zur Reduzierung von manuellen 'Paper-to-Laptop'-Prozessen.",
    tech: ["Laravel", "Tailwind CSS", "MySQL", "Vite", "React"],
    methodologies: ["Design Thinking", "Agile/Scrum", "MVC"],
    technicalChallenges: ["70% Zeitverlust durch manuelle Dateneingabe", "Komplexe und variable Workflows"],
    solutions: ["Modulare Backend-Architektur", "Empathisches und benutzerfreundliches UI"],
    link: "",
    github: "https://github.com/abdelhaymallouli/AttendanceFlow-AMS",
    image: "/screenshots/AttendanceFlow.webp",
    status: "In Development",
    kpi: "70% Zeitersparnis",
  },
  {
    id: 2,
    title: "Venuvibe Event Platform",
    description: "Full-Stack Event-Marktplatz mit automatisierter Buchung und Admin-Panel für Venue-Partner.",
    tech: ["React", "TypeScript", "PHP", "MySQL", "Vite"],
    methodologies: ["Component Architecture", "State Management", "Agile"],
    technicalChallenges: ["Komplexes State-Management", "Sichere Vendor-Dashboards"],
    solutions: ["Custom React Hooks", "Optimierte MySQL-Abfragen (<100ms)"],
    link: "https://venuvibe-deploy.vercel.app/",
    github: "https://github.com/abdelhaymallouli/Venuvibe-Event-Planning-Platform",
    image: "/screenshots/Venuvibe.webp",
    status: "Live",
    kpi: "<100ms Query Speed",
  },
  {
    id: 4,
    title: "Personal Finance Manager",
    description: "Datengetriebenes Budget-Tracking mit Echtzeit-Dashboard und Chart.js Visualisierung.",
    tech: ["PHP", "MySQL", "Chart.js", "JavaScript"],
    methodologies: ["MVC", "Data Visualization"],
    github: "https://github.com/abdelhaymallouli/personal-finance-manager-php",
    image: "/screenshots/PersonalFinance.webp",
    status: "Abgeschlossen",
  },
  {
    id: 5,
    title: "WeatherWise",
    description: "API-Orchestrierung mit externen Wetter-Daten und benutzerfreundlicher Oberfläche.",
    tech: ["Python", "Requests", "Tkinter", "OOP"],
    github: "https://github.com/abdelhaymallouli/WeatherWise",
    image: "/screenshots/WeatherWise.webp",
    status: "Abgeschlossen",
  },
];

export const SKILLS: SkillItem[] = [
  {
    label: "Backend",
    color: "#c9a227",
    icon: Server,
    star: true,
    items: ["Laravel", "Go (Golang)", "PHP (OOP)", "RESTful APIs", "PostgreSQL / MySQL"],
  },
  {
    label: "Frontend & Mobile",
    color: "#a1a1aa",
    icon: Layers,
    star: true,
    items: ["React 19", "Next.js", "TypeScript", "Kotlin + Jetpack Compose", "Tailwind CSS"],
  },
  {
    label: "DevOps & Infrastructure",
    color: "#10b981",
    icon: Cloud,
    star: false,
    items: ["Docker", "Linux / Apache", "GitFlow", "Cloud Deployment (Linode)", "SSL/TLS"],
  },
  {
    label: "Methoden",
    color: "#fbbf24",
    icon: Wrench,
    star: true,
    items: ["Agile / Scrum", "Clean Code", "Unit & Integration Testing", "Design Thinking"],
  },
];

export const CERTS: CertItem[] = [
  {
    icon: "🎓",
    title: "Full-Stack & Mobile Development",
    type: "Solicode Diplom",
    date: "2024 – 2026",
    color: "#c9a227",
    desc: "Zweijährige berufsbildende Ausbildung in Full-Stack Web- und Mobile-Entwicklung.",
    file: "/certificates/Solicode_Diplom.pdf",
  },
  {
    icon: "☁️",
    title: "Deploy Scalable React Apps on Cloud",
    type: "Udemy Zertifikat",
    date: "Sept. 2024",
    color: "#10b981",
    desc: "Praktische Cloud-Deployment mit Linode, Apache und Docker.",
    file: "#",
  },
  {
    icon: "⚛️",
    title: "React Complete Developer Course",
    type: "Udemy Zertifikat",
    date: "Aug. 2024",
    color: "#a1a1aa",
    desc: "Fortgeschrittene React-Entwicklung mit modernen Patterns.",
    file: "#",
  },
];

export const LANGUAGES: LanguageItem[] = [
  { name: "Arabisch", lvl: "Muttersprache", pct: 100, color: "#c9a227" },
  { name: "Englisch", lvl: "B2 / C1", pct: 85, color: "#10b981" },
  { name: "Deutsch", lvl: "B1 (B2-Kurs laufend)", pct: 70, color: "#a1a1aa" },
  { name: "Französisch", lvl: "A2", pct: 30, color: "#fbbf24" },
];

export const WHY: WhyItem[] = [
  {
    icon: "🇩🇪",
    color: "#c9a227",
    t: "Technisches Deutsch",
    de: "Ich habe mein technisches Deutsch bereits im Praktikum bei einem deutschen Unternehmen täglich angewendet (Code-Reviews, Meetings, Dokumentation).",
    en: "I already used technical German daily during my internship at a German company.",
  },
  {
    icon: "🚀",
    color: "#10b981",
    t: "Praxis + Theorie",
    de: "Ich bringe echte Projekterfahrung mit und möchte diese mit einer offiziellen deutschen Ausbildung zum Fachinformatiker kombinieren.",
    en: "I bring real project experience and want to combine it with a recognized German apprenticeship.",
  },
  {
    icon: "🏠",
    color: "#a1a1aa",
    t: "Umzugsbereit",
    de: "Ich bin voll umzugsbereit und werde meinen Lebensmittelpunkt pünktlich zum Ausbildungsstart nach Deutschland verlegen.",
    en: "I am fully prepared to relocate to Germany for the start of the apprenticeship.",
  },
];