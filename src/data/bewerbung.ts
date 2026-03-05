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

export type Color = "#3b82f6" | "#34d399" | "#a78bfa" | "#fbbf24";

export interface StatItem {
  value: string | number;
  suffix: string;
  label: string;
  color: Color;
  icon: any;
  ring: number;
}

export interface ExperienceItem {
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
  num: string;
  title: string;
  tag: string;
  tagColor: Color;
  kpi: string;
  kpiSub: string;
  kpiColor: Color;
  de: string;
  en: string;
  method: string[];
  challenge: string[];
  tech: string[];
  accent: Color;
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
    color: "#3b82f6",
    icon: TrendingUp,
    ring: 70,
  },
  {
    value: 12,
    suffix: "+",
    label: "Live\nProjekte",
    color: "#34d399",
    icon: Zap,
    ring: 85,
  },
  {
    value: 70,
    suffix: "%",
    label: "ROI\n(Optimierung)",
    color: "#a78bfa",
    icon: Award,
    ring: 70,
  },
  {
    value: "B1",
    suffix: "+",
    label: "Deutsch\nNiveau",
    color: "#fbbf24",
    icon: Users,
    ring: 60,
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: {
      de: "Mobile & Full-Stack Development (Jahr 2)",
      en: "Mobile & Full-Stack Development (Year 2)",
    },
    company: "OFPPT Solicode",
    location: "Tanger, Marokko",
    period: "2025 – 2026",
    type: "AUSBILDUNG",
    color: "#3b82f6",
    description: {
      de: "Fortgeschrittene Spezialisierung auf native Android-Entwicklung und Web-Architekturen auf Enterprise-Niveau mit Fokus auf DevOps und Netzwerk-Infrastruktur.",
      en: "Advanced specialization in Native Android development and enterprise-grade web architectures with a focus on DevOps, automated testing, and network infrastructure.",
    },
    highlights: {
      de: [
        "Entwicklung nativer Android-Apps mit Kotlin und Jetpack Compose unter Nutzung von MVVM-Architektur.",
        "Architektur komplexer Back-End-Systeme mit Laravel, Eloquent ORM und sicheren RESTful APIs.",
        "Integration von Netzwerkfunktionen in mobile Apps mittels Retrofit und Coroutines für asynchronen API-Konsum.",
        "Implementierung einer umfassenden Testing-Strategie mit Unit- und Integrationstests (AAA-Muster).",
        "Beherrschung professioneller Git-Workflows (GitFlow, PR-Zyklen) innerhalb eines Scrum-Frameworks.",
        "Expertise in Netzwerk-Infrastruktur: LAN-Adressierung (IPv4/DNS/DHCP) und Webserver-Administration (Apache, SSL/TLS).",
      ],
      en: [
        "Developed native Android applications using Kotlin and Jetpack Compose, implementing reactive UI states and ViewModel-driven architecture (MVVM).",
        "Architected complex back-end systems with Laravel, utilizing Eloquent ORM for advanced data relationships, custom Middlewares, and secure RESTful APIs.",
        "Integrated networking capabilities in mobile apps using Retrofit and Coroutines for asynchronous API consumption and optimistic UI updates.",
        "Implemented a comprehensive testing strategy including Unit and Integration tests using AAA patterns and Mocking frameworks.",
        "Mastered professional collaboration workflows including GitFlow, Code Reviews, and structured Pull Request cycles within a Scrum framework.",
        "Gained infrastructure expertise in LAN addressing (IPv4/DNS/DHCP) and web server administration (Apache, VirtualHosts, and SSL/TLS configuration).",
      ],
    },
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Android Studio",
      "Laravel",
      "Eloquent",
      "Retrofit",
      "GitFlow",
      "Linux/Apache",
    ],
  },
  {
    role: {
      de: "Praktikant Software-Entwicklung",
      en: "Software Development Intern",
    },
    company: "pragmatic minds GmbH",
    location: "Germany / Remote",
    period: "Juli – Aug 2025",
    type: "PRAKTIKUM",
    color: "#a78bfa",
    description: {
      de: "Architektur und Deployment von produktionsreifen Mattermost-Plugins und Go-basierten Microservices zur Automatisierung von HR-Prozessen.",
      en: "Architected and deployed a suite of production-ready Mattermost plugins and Go-based microservices to automate enterprise workflows and HR compliance.",
    },
    highlights: {
      de: [
        "Engineering von 'Moco-bot': Automatisierte Zeiterfassungs-Compliance durch Integration von Personio und MOCO APIs.",
        "Entwicklung eines Echtzeit Outlook-Kalender-Sync Plugins mittels Microsoft Graph API (OAuth2) für Status-Updates.",
        "Architektur eines DSGVO-konformen 'Birthday Bot' mit HR-Einverständnis-Management und sicherem KV-Store.",
        "Entwicklung von 'MentorPulse': Automatisierte Feedback-Schleifen und Puls-Umfragen für HR-Teams.",
        "Entwicklung des 'AbwesenheitsBot': Cross-Plattform Synchronisation von Abwesenheitsdaten aus Personio und Outlook.",
        "Docker-Containerisierung aller Bot-Dienste und Aufbau lokaler Entwicklungsumgebungen mit Hot-Reloading.",
      ],
      en: [
        "Engineered 'Moco-bot', an automated time-tracking compliance system integrating Personio and MOCO APIs to detect hours deficits and send smart reminders.",
        "Developed a real-time Outlook Calendar Sync plugin using Microsoft Graph API (OAuth2) to automatically update Mattermost user statuses based on live events.",
        "Architected a GDPR-compliant 'Birthday Bot' featuring an interactive HR consent management system and secure KV-store for private wish collection.",
        "Built 'MentorPulse', a mentoring feedback loop tool that automates bi-weekly pulse surveys and generates high-priority alerts for People & Culture teams.",
        "Developed 'AbwesenheitsBot', a cross-platform synchronization tool that manages 'Out of Office' states by monitoring Personio and Outlook absence data.",
        "Containerized all bot services using Docker and established local development environments with hot-reloading for rapid plugin iteration.",
      ],
    },
    tech: [
      "Golang",
      "Mattermost API",
      "Microsoft Graph",
      "OAuth2",
      "Docker",
      "PostgreSQL",
    ],
  },
  {
    role: {
      de: "Full-Stack Web Development (Jahr 1)",
      en: "Full-Stack Web Development (Year 1)",
    },
    company: "OFPPT Solicode",
    location: "Tanger, Marokko",
    period: "2024 – 2025",
    type: "AUSBILDUNG",
    color: "#34d399",
    description: {
      de: "Umfassende Ausbildung nach dem Modell der 'Aktiven Pädagogik', die den gesamten Entwicklungszyklus von Design bis Back-End abdeckt.",
      en: "Comprehensive training following the 'Active Pedagogy' model, covering the full development lifecycle from UI/UX design to advanced back-end systems.",
    },
    highlights: {
      de: [
        "Design nutzerzentrierter Interfaces und Wireframes mit Figma unter Anwendung von Design Thinking Prinzipien.",
        "Entwicklung dynamischer Back-End-Systeme mit nativem PHP (OOP) und sicheren Datenbank-Interaktionen via PDO.",
        "Architektur relationaler Datenbanken mittels MCD/MLD-Modellierung und komplexen SQL-Queries.",
        "Entwicklung interaktiver Front-End-Anwendungen mit modernem JavaScript (ES6+), React.js und Tailwind CSS.",
        "Projekt-Versionierung und Team-Kollaboration via Git/GitHub (Branching, Merging, Conflict Resolution).",
        "Implementierung von Agile/Scrum-Methoden zur Steuerung der Projektzyklen von Wireframing bis Deployment.",
      ],
      en: [
        "Designed user-centric interfaces and wireframes using Figma, applying UX/UI principles and Design Thinking.",
        "Developed dynamic back-end systems using Native PHP with Object-Oriented Programming (OOP) and PDO for secure database interactions.",
        "Architected relational databases by creating MCD/MLD models and executing complex SQL queries and CRUD operations.",
        "Built interactive front-end applications using Modern JavaScript (ES6+), React.js (Hooks, Router), and responsive CSS (Flexbox, Grid, Tailwind).",
        "Managed project versioning and team collaboration using Git/GitHub, including branching, merging, and conflict resolution.",
        "Implemented Agile/Scrum methodologies to manage project cycles, from initial wireframing to final deployment.",
      ],
    },
    tech: ["PHP (OOP)", "React", "MySQL", "Tailwind CSS", "Figma", "Git"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    num: "01",
    title: "AttendanceFlow AMS",
    tag: "In Development · Sprint 1",
    tagColor: "#3b82f6",
    kpi: "70%",
    kpiSub: "ROI Potential",
    kpiColor: "#3b82f6",
    de: "EdTech-Lösung zur Reduzierung von 'Paper-to-Laptop'-Reibungsverlusten. Automatisierung administrativer Workflows, basierend auf Nutzerwünschen aus der Empathie-Phase.",
    en: "An empathetic EdTech solution reducing 'Paper-to-Laptop' friction. This system automates administrative workflows, solving a 70% time-loss gap identified during research.",
    method: ["Design Thinking", "User Persona Mapping", "Agile/Scrum"],
    challenge: ["Workflow-Automatisierung", "Einfache Bedienbarkeit"],
    tech: ["Laravel", "Tailwind CSS", "MySQL", "Vite"],
    accent: "#3b82f6",
  },
  {
    num: "02",
    title: "Venuvibe Event Platform",
    tag: "Marketplace · Live",
    tagColor: "#a78bfa",
    kpi: "Sub-100ms",
    kpiSub: "Query Speed",
    kpiColor: "#a78bfa",
    de: "Full-Stack-Marktplatz für Event-Planer. Automatisierte Buchungsworkflows und robustes Admin-Control-Panel für das Partnermanagement.",
    en: "Professional full-stack marketplace bridging venue owners and event planners. Features automated booking workflows and a robust administrative control panel for vendor management.",
    method: ["Component Architecture", "State Management", "Agile Dev"],
    challenge: ["Massive State Logic", "Secure Dashboards"],
    tech: ["React", "TypeScript", "PHP/MySQL", "Vite"],
    accent: "#a78bfa",
  },
  {
    num: "03",
    title: "Personal Finance Manager",
    tag: "Data-Driven · App",
    tagColor: "#34d399",
    kpi: "Real-time",
    kpiSub: "Insights",
    kpiColor: "#34d399",
    de: "Budget-Tracking-Anwendung mit dynamischem Dashboard für Echtzeit-Einblicke in die Finanzen. Visualisierung von Transaktionsdaten für effizientes Kapitalmanagement.",
    en: "Data-driven budget tracking application featuring a dynamic dashboard for real-time financial insights. Visualizes transaction data to help users manage capital effectively.",
    method: ["MVC Architecture", "Data Visualization", "Secure CRUD"],
    challenge: ["Datenvisualisierung", "Finanzielle Integrität"],
    tech: ["PHP", "MySQL", "Chart.js", "JavaScript"],
    accent: "#34d399",
  },
];

export const SKILLS: SkillItem[] = [
  {
    label: "The Brain (Backend)",
    color: "#3b82f6",
    icon: Server,
    star: true,
    items: [
      "Laravel (PHP 8.x)",
      "Python (FastAPI)",
      "Go (Microservices)",
      "RESTful APIs",
      "MySQL/PostgreSQL",
    ],
  },
  {
    label: "The Face (Frontend)",
    color: "#a78bfa",
    icon: Layers,
    star: true,
    items: [
      "React (Next.js 15)",
      "TypeScript",
      "Kotlin (Jetpack Compose)",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    label: "The Infrastructure",
    color: "#34d399",
    icon: Cloud,
    star: false,
    items: [
      "Docker",
      "Linux (Apache/Nginx)",
      "GitFlow",
      "CI/CD",
      "Scrum / Jira",
    ],
  },
  {
    label: "Methoden & Design",
    color: "#fbbf24",
    icon: Wrench,
    star: true,
    items: [
      "Design Thinking",
      "Agile (Scrum / Kanban)",
      "Unit & Integration Testing",
      "GitFlow Workflow",
      "UML / Dokumentation",
    ],
  },
];

export const CERTS: CertItem[] = [
  {
    icon: "🎓",
    title: "Web Developer Certificate · OFPPT Solicode",
    type: "Staatl. anerkannter Abschluss",
    date: "2024–2025",
    color: "#3b82f6",
    desc: "1-jährige Vollzeit-Ausbildung — Fokus auf Full-Stack Web Development, Backend (PHP/Laravel) und moderne Web-Architekturen.",
    file: "/certificates/Web_Developer_Certificate.pdf",
  },
  {
    icon: "☁️",
    title: "Deploy Scalable React Apps on Cloud",
    type: "Cloud Zertifikat · Udemy",
    date: "Sept. 2024",
    color: "#34d399",
    desc: "Praktische Expertise in Linode Cloud: Deployment von Produktivsystemen, Skalierung und Sicherheits-Konfiguration.",
    file: "#",
  },
  {
    icon: "⚛️",
    title: "React Complete Developer Course",
    type: "Frontend Zertifikat · Udemy",
    date: "Aug. 2024",
    color: "#a78bfa",
    desc: "Advanced React Patterns: Hooks, Context API und Performance-Tuning für skalierbare Web-Applikationen.",
    file: "#",
  },
];

export const LANGUAGES: LanguageItem[] = [
  { name: "Arabisch", lvl: "Muttersprache", pct: 100, color: "#3b82f6" },
  { name: "Englisch", lvl: "B2 / C1", pct: 85, color: "#34d399" },
  { name: "Deutsch", lvl: "B1 (Ziel 2026: B2+)", pct: 65, color: "#a78bfa" },
  { name: "Französisch", lvl: "A2", pct: 30, color: "#fbbf24" },
];

export const WHY: WhyItem[] = [
  {
    icon: "🚀",
    color: "#3b82f6",
    t: "ROI-First Development",
    de: "Ich entwickle Systeme, die Geschäftsprobleme lösen und manuelle Arbeit automatisieren (z.B. 70% Zeitersparnis bei AMS).",
    en: "I build systems that solve business problems and automate manual labor (e.g., 70% time reduction in AMS).",
  },
  {
    icon: "🇩🇪",
    color: "#34d399",
    t: "Team-Kultur & Remote",
    de: "Erfahrung in Scrum-Teams (Solicode) und remote-basierter Zusammenarbeit mit deutschen Teams (pragmatic minds GmbH).",
    en: "Experience in Scrum teams (Solicode) and remote collaboration with German teams (pragmatic minds GmbH).",
  },
  {
    icon: "🏗️",
    color: "#a78bfa",
    t: "Clean Architecture",
    de: "Fokus auf wartbare, skalierbare Systeme durch N-Tier-Architekturen und sauberen Code (Clean Code Prinzipien).",
    en: "Focus on maintainable, scalable systems through N-Tier architectures and clean code principles.",
  },
  {
    icon: "📈",
    color: "#fbbf24",
    t: "Duale Ausbildung 2026",
    de: "Suche gezielt nach einer Dualen Ausbildung zum Fachinformatiker, um meine Praxiserfahrung mit deutscher Fachtheorie zu vereinen.",
    en: "Seeking a Dual Apprenticeship (Fachinformatiker) to combine my practical experience with German technical theory.",
  },
];
