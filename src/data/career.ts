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
    programme: "Baccalauréat Sciences Physiques-Chimie",
    period: "2023 — 2024",
    location: "Tanger, Maroc",
    detail: "Baccalauréat National Marocain avec spécialisation en mathématiques avancées et sciences physiques.",
    details: [
      "Base solide en Mathématiques incluant le Calcul, les Nombres Complexes et les Statistiques.",
      "Étude des modules fondamentaux de Physique: Mécanique, Électricité et Physique Nucléaire.",
      "Développement de compétences rigoureuses d'analyse et de résolution de problèmes nécessaires aux métiers de l'ingénierie.",
      "Proficiency multilingue certifiée en Arabe, Français et Anglais."
    ],
    tech: ["Mathématiques", "Physique", "Chimie", "Logique & Analyse"]
  },
  {
    school: "Centre de Solidarité Numérique SOLICODE",
    programme: "Développement Web --- Certification Double Simplon & OFPPT",
    period: "2024 — 2025",
    location: "Tanger, Maroc",
    detail: "Formation complète suivant le modèle de pédagogie active, couvrant tout le cycle de vie du développement, de la conception UI/UX aux systèmes back-end.",
    details: [
      "Conception d'interfaces centrées utilisateur et de wireframes sur Figma, en appliquant les principes de design thinking et d'ergonomie.",
      "Développement de systèmes back-end dynamiques en PHP natif avec Programmation Orientée Objet (POO) et PDO pour la sécurité d'accès.",
      "Architecture de bases de données relationnelles (MCD/MLD, SQL complexe et opérations CRUD sécurisées).",
      "Conception d'interfaces front-end réactives avec JavaScript Moderne (ES6+), React.js (Hooks, Router) et styles CSS (Tailwind).",
      "Gestion des versions et collaboration en équipe avec Git/GitHub (workflows de branches, pull requests et merge).",
      "Méthodologies Agile/Scrum pour la gestion des cycles de projet, de la conception initiale au déploiement."
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
      "WordPress"
    ],
    certificate: {
      name: "Certificate of Completion: Web Development",
      url: "/certificates/Certificate_Solicode_Tangier_Recated.pdf"
    }
  },
  {
    school: "Centre de Solidarité Numérique SOLICODE",
    programme: "Développement Mobile & Full-Stack --- Certification Double Simplon & OFPPT",
    period: "2025 — 2026",
    location: "Tanger, Maroc",
    detail: "Spécialisation avancée en développement Android natif et architectures web d'entreprise, DevOps, tests automatisés et serveurs.",
    details: [
      "Développement d'applications Android natives en Kotlin et Jetpack Compose (MVVM, États réactifs).",
      "Architecture de back-ends robustes en Laravel (Eloquent ORM, Middlewares personnalisés, APIs REST).",
      "Intégration d'APIs dans des applications mobiles en utilisant Retrofit et les Coroutines pour l'asynchronisme.",
      "Stratégie de tests automatisés complète (tests unitaires et d'intégration avec PHPUnit et Mocking).",
      "Pratique de flux de travail collaboratifs professionnels sous Scrum avec GitFlow et revues de code strictes.",
      "Administration système et serveurs web (Apache, VirtualHosts, routage IPv4, DNS/DHCP et certificats SSL/TLS)."
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
      "Alpine.js"
    ],
    certificate: {
      name: "Certificate of Completion in Mobile & Full-Stack Development"
    }
  }
];

export const JOURNEY_OUTLOOK = {
  year: "Next",
  title: "Backend depth, and a team to build with",
  detail:
    "À la recherche d'une opportunité en développement full-stack/back-end où la qualité du code et les architectures robustes priment, prêt à apporter mon expertise en tests et conception d'APIs."
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
    role: "Stagiaire Développeur Full Stack & IA",
    period: "Juin 2026 — Août 2026",
    location: "Tanger, Maroc",
    summary: "Développement de fonctionnalités de bout en bout et intégration d'IA pour une plateforme documentaire convertissant du Markdown en présentations de marque.",
    achievements: [
      "Conception et implémentation de couches UI et back-end (Laravel, Alpine.js, Tailwind CSS) pour le rendu et la structuration des présentations.",
      "Maintenance et optimisation d'une architecture multi-tenant et d'un pipeline de génération PDF automatisé via Chromium headless sur serveur Linux.",
      "Garantie de la qualité logicielle et respect des principes SOLID et TDD avec PHPUnit pour éliminer les régressions de mise en page."
    ],
    stack: ["laravel", "php", "tailwind", "alpine"],
  },
  {
    company: "Pragmatic Minds GmbH",
    role: "Stagiaire Développeur Backend & Automatisation (Remote)",
    period: "Juillet 2025 — Août 2025",
    location: "Kirchheim unter Teck, Allemagne",
    summary: "Architecture et déploiement d'une suite de plug-ins de messagerie Mattermost et microservices en Go pour automatiser les processus RH.",
    achievements: [
      "Développement de Moco-bot en Go, automatisant le suivi du temps de travail par intégration des APIs de Personio et MOCO avec alertes intelligentes.",
      "Implémentation d'un plug-in de synchronisation de calendrier en temps réel via Microsoft Graph API et protocole OAuth 2.0.",
      "Conception d'architectures de stockage clé-valeur sécurisées et conformes RGPD pour la gestion interne de la messagerie collaborative.",
      "Conteneurisation systématique des services avec Docker et environnements de développement locaux hot-reloaded."
    ],
    stack: ["go", "docker", "postgresql"],
  }
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  href?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Les fondamentaux UI/UX avec Figma",
    issuer: "Udemy",
    date: "2025",
    href: "https://www.udemy.com/certificate/UC-22ef93dd-a17b-4a70-9c99-c6ce5f1a542c/",
  },
  {
    title: "Développeur React Complet",
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
  { name: "Arabe", level: "Langue maternelle" },
  { name: "Anglais", level: "B2/C1 — Professionnel" },
  { name: "Français", level: "B1 — Intermédiaire" },
  { name: "Allemand", level: "B1/B2 — Intermédiaire" },
];
