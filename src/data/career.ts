import type { TechKey } from "@/lib/tech-icons";

/**
 * ============================================================
 * CAREER
 * ============================================================
 * Education, roles, credentials and spoken languages — everything a CV
 * would carry, split out of `content.ts` because it is the part that
 * changes on a different clock from the site's copy.
 *
 * `Journey` derives its whole sequence from these arrays, so adding a
 * programme or a role here is enough to place it on the timeline.
 */

export interface EducationEntry {
  school: string;
  /** Programme or diploma as it appears on the certificate. */
  programme: string;
  /** e.g. "2024 — 2025" */
  period: string;
  location: string;
  /** One sentence for the card. */
  detail?: string;
  /** Expanded points, shown in the dialog. */
  details?: string[];
  /** Technologies covered. */
  tech?: string[];
  /** A verifiable credential, where one exists. */
  certificate?: { name: string; url?: string };
}

export const EDUCATION: EducationEntry[] = [
  {
    school: "Lycée Anoual",
    programme: "Baccalauréat, Physics and Chemistry",
    period: "2023 — 2024",
    location: "Tangier, Morocco",
    detail:
      "Moroccan National Baccalaureate, specialising in advanced mathematics and the physical sciences.",
    details: [
      "Solid grounding in mathematics: calculus, complex numbers and statistics.",
      "Core physics modules: mechanics, electricity and nuclear physics.",
      "Built the analytical and problem-solving habits the engineering work rests on.",
      "Certified multilingual proficiency in Arabic, French and English.",
    ],
    tech: ["Mathematics", "Physics", "Chemistry", "Logic & Analysis"],
  },
  {
    school: "SOLICODE — Centre de Solidarité Numérique",
    programme: "Web Development — dual Simplon & OFPPT certification",
    period: "2024 — 2025",
    location: "Tangier, Morocco",
    detail:
      "A full development lifecycle under an active-pedagogy model, from UI/UX design through to back-end systems.",
    details: [
      "Designed user-centred interfaces and wireframes in Figma, applying design thinking and usability principles.",
      "Built dynamic back-end systems in native PHP using OOP and PDO for secure database access.",
      "Architected relational databases: MCD/MLD models, complex SQL and secure CRUD operations.",
      "Built responsive front-ends with modern JavaScript (ES6+), React (Hooks, Router) and Tailwind CSS.",
      "Managed versioning and team collaboration in Git/GitHub: branch workflows, pull requests and merges.",
      "Ran project cycles under Agile/Scrum, from initial design through to deployment.",
    ],
    tech: [
      "PHP (OOP)",
      "React",
      "JavaScript (ES6)",
      "HTML",
      "CSS",
      "MySQL",
      "Tailwind CSS",
      "Git/GitHub",
      "Figma",
      "WordPress",
    ],
    certificate: {
      name: "Certificate of Completion: Web Development",
      url: "/certificates/Certificate_Solicode_Tangier_Recated.pdf",
    },
  },
  {
    school: "SOLICODE — Centre de Solidarité Numérique",
    programme: "Mobile & Full-Stack Development — dual Simplon & OFPPT certification",
    period: "2025 — 2026",
    location: "Tangier, Morocco",
    detail:
      "Advanced specialisation in native Android and enterprise web architecture, with DevOps, automated testing and server administration.",
    details: [
      "Built native Android applications in Kotlin and Jetpack Compose, using MVVM and reactive state.",
      "Architected robust Laravel back-ends: Eloquent ORM, custom middleware and REST APIs.",
      "Consumed APIs from mobile using Retrofit and Coroutines for asynchronous work.",
      "Implemented a full automated testing strategy — unit and integration, with PHPUnit and mocking.",
      "Worked to professional collaboration standards under Scrum: GitFlow and strict code review.",
      "Covered systems and web server administration: Apache, VirtualHosts, IPv4 routing, DNS/DHCP and SSL/TLS certificates.",
    ],
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Android Studio",
      "Laravel",
      "Eloquent",
      "Retrofit",
      "GitFlow",
      "Linux/Apache",
      "Alpine.js",
    ],
    certificate: {
      name: "Certificate of Completion in Mobile & Full-Stack Development",
    },
  },
];

export const JOURNEY_OUTLOOK = {
  year: "Next",
  title: "Backend depth, and a team to build with",
  detail:
    "Looking for a full-stack or back-end role where code quality and durable architecture matter, and where I can bring what I have built around testing and API design.",
} as const;

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  logo?: string;
  summary: string;
  achievements: string[];
  stack: TechKey[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Mooroot",
    role: "Full Stack & AI Developer (Internship)",
    period: "June 2026 — Present",
    location: "Tangier, Morocco",
    summary:
      "End-to-end feature development and AI integration for a document platform that converts Markdown into branded presentations.",
    achievements: [
      "Designed and implemented the UI and back-end layers (Laravel, Alpine.js, Tailwind CSS) that render and structure presentations.",
      "Maintained and tuned a multi-tenant architecture and an automated PDF pipeline running headless Chromium on a Linux server.",
      "Held the quality line with SOLID principles and TDD in PHPUnit, which is what keeps layout regressions out of the render path.",
    ],
    stack: ["laravel", "php", "tailwind", "alpine"],
  },
  {
    company: "Pragmatic Minds GmbH",
    role: "Backend & Automation Developer (Internship, remote)",
    period: "July 2025 — August 2025",
    location: "Kirchheim unter Teck, Germany",
    summary:
      "Architected and shipped a suite of Mattermost plugins and Go microservices automating the company's HR processes.",
    achievements: [
      "Built Moco-bot in Go, automating time-tracking compliance by integrating the Personio and MOCO APIs with targeted alerts.",
      "Implemented a real-time calendar sync plugin over the Microsoft Graph API using OAuth 2.0.",
      "Designed secure, GDPR-compliant key-value storage for internal collaboration data.",
      "Containerised every service with Docker, with hot-reloading local development environments.",
    ],
    stack: ["go", "docker", "postgresql"],
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  href?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "UI/UX Fundamentals with Figma",
    issuer: "Udemy",
    date: "2025",
    href: "https://www.udemy.com/certificate/UC-22ef93dd-a17b-4a70-9c99-c6ce5f1a542c/",
  },
  {
    title: "React — Complete Developer",
    issuer: "Udemy",
    date: "2024",
    href: "https://www.udemy.com/certificate/UC-fbc2fe02-ffa6-4608-bf62-80220c410c0a/",
  },
  {
    title: "Deploy Scalable React Apps on the Cloud (Linode)",
    issuer: "Udemy",
    date: "2024",
    href: "https://www.udemy.com/certificate/UC-a5d72512-d21f-4b63-ad91-ec000d730b3f/",
  },
  {
    title: "Python Web Scraping & Automation (BS4, Selenium)",
    issuer: "Udemy",
    date: "2024",
    href: "https://www.udemy.com/certificate/UC-aa53d92c-11c6-4f15-923e-7a39c0d41e8b/",
  },
  {
    title: "Bootstrap 5 — Responsive Web Design",
    issuer: "Udemy",
    date: "2024",
    href: "https://www.udemy.com/certificate/UC-ccd691bb-e081-4b7e-b04b-1fe706f39378/",
  },
  {
    title: "Selenium Web Automation Essentials",
    issuer: "Udemy",
    date: "2024",
    href: "https://www.udemy.com/certificate/UC-e1caa10f-61d7-4149-abc2-388e4987d3f2/",
  }
];

export interface SpokenLanguage {
  name: string;
  level: string;
}

export const LANGUAGES: SpokenLanguage[] = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "B2/C1 — Professional" },
  { name: "French", level: "B1 — Intermediate" },
  { name: "German", level: "B1/B2 — Intermediate" },
];
