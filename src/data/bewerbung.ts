export type Lang = "en" | "de";

export interface CertificateItem {
  titleDE: string;
  titleEN: string;
  descriptionDE: string;
  descriptionEN: string;
  typeDE: string;
  typeEN: string;
  date: string;
  file: string;
  icon: string;
  color: "blue" | "green" | "purple" | "orange";
}

export interface VaultItem {
  titleDE: string;
  titleEN: string;
  subtitleDE: string;
  subtitleEN: string;
  file: string;
}

export interface BewerbungContent {
  hero: {
    greeting: string;
    pitch: string;
    cvButton: string;
    videoAction: string;
    stats: { value: string; labelDE: string; labelEN: string }[];
  };
  motivation: {
    titleDE: string;
    titleEN: string;
    cards: {
      icon: string;
      color: "blue" | "purple" | "green" | "orange";
      titleDE: string;
      titleEN: string;
      descDE: string;
      descEN: string;
      extra?: "lang" | null;
    }[];
  };
  certificates: {
    items: CertificateItem[];
  };
  vault: {
    items: VaultItem[];
  };
}

export const CERTIFICATES: CertificateItem[] = [
  {
    titleDE: "Full-Stack Diplom · OFPPT Solicode",
    titleEN: "Full-Stack Diploma · OFPPT Solicode",
    descriptionDE:
      "Staatlich anerkanntes Diplom in Web- und Mobile-Entwicklung — 2 Jahre praxisorientierte Ausbildung in Agile, Backend, Frontend & DevOps.",
    descriptionEN:
      "State-recognized diploma in Web & Mobile Development — 2 years of hands-on training in Agile, Backend, Frontend & DevOps.",
    typeDE: "Offizieller Abschluss",
    typeEN: "Official Degree",
    date: "2024–2026",
    file: "/certificates/Certificate_Solicode_Tangier_Redacted.pdf",
    icon: "🎓",
    color: "blue",
  },
  {
    titleDE: "Deploy Scalable React Web Apps on the Cloud",
    titleEN: "Deploy Scalable React Web Apps on the Cloud",
    descriptionDE:
      "Linode Cloud Platform — Deployment, Skalierung und Verwaltung von React-Applikationen in produktionsnahen Cloud-Umgebungen.",
    descriptionEN:
      "Linode Cloud Platform — Deployment, scaling, and management of React apps in production-grade cloud environments.",
    typeDE: "Cloud Zertifikat · Udemy",
    typeEN: "Cloud Certificate · Udemy",
    date: "Sept. 2024",
    file: "#",
    icon: "☁️",
    color: "green",
  },
  {
    titleDE: "React Complete Developer Course",
    titleEN: "React Complete Developer Course",
    descriptionDE:
      "Hooks, State Management, Context API, Performance-Optimierung und moderne React-Architekturmuster.",
    descriptionEN:
      "Hooks, State Management, Context API, performance optimization and modern React architectural patterns.",
    typeDE: "Frontend Zertifikat · Udemy",
    typeEN: "Frontend Certificate · Udemy",
    date: "Aug. 2024",
    file: "#",
    icon: "⚛️",
    color: "purple",
  },
  {
    titleDE: "Mastering Selenium Web Automation Essentials",
    titleEN: "Mastering Selenium Web Automation Essentials",
    descriptionDE:
      "End-to-End Test-Automatisierung — Web-Scraping, UI-Testing und automatisierte QA-Workflows mit Selenium.",
    descriptionEN:
      "End-to-end test automation — web scraping, UI testing and automated QA workflows with Selenium.",
    typeDE: "Testing Zertifikat · Udemy",
    typeEN: "Testing Certificate · Udemy",
    date: "Juli 2024",
    file: "#",
    icon: "🧪",
    color: "orange",
  },
];

export const VAULT_ITEMS: VaultItem[] = [
  {
    titleDE: "Lebenslauf / CV",
    titleEN: "Curriculum Vitae / CV",
    subtitleDE: "PDF · Aktuell 2025–2026",
    subtitleEN: "PDF · Current 2025–2026",
    file: "/cv/Abdelhay_Mallouli_CV.pdf",
  },
  {
    titleDE: "Full-Stack Diplom",
    titleEN: "Full-Stack Diploma",
    subtitleDE: "PDF · OFPPT Solicode",
    subtitleEN: "PDF · OFPPT Solicode",
    file: "/certificates/Certificate_Solicode_Tangier_Redacted.pdf",
  },
  {
    titleDE: "Udemy Zertifikate (3)",
    titleEN: "Udemy Certificates (3)",
    subtitleDE: "PDF · Cloud / React / Testing",
    subtitleEN: "PDF · Cloud / React / Testing",
    file: "#",
  },
];

export const MOTIVATION_CARDS = [
  {
    icon: "🎯",
    color: "blue" as const,
    titleDE: "Lösungsorientiertes Denken",
    titleEN: "Problem-Solving Mindset",
    descDE:
      "Ich schreibe nicht nur Code — ich entwerfe Systeme. Beim AttendanceFlow-Projekt erzielte ich eine 70% Zeitersparnis durch Design Thinking, bevor eine einzige Zeile Code geschrieben wurde.",
    descEN:
      "I don't just write code — I design systems. On AttendanceFlow, I achieved 70% time savings by applying Design Thinking before writing a single line of code.",
    extra: null,
  },
  {
    icon: "🇩🇪",
    color: "green" as const,
    titleDE: "Deutschkenntnisse",
    titleEN: "German Language Skills",
    descDE:
      "Tägliches Lernen auf B1-Niveau, aktiver B2-Intensivkurs. Sprache ist nicht nur ein Zertifikat — es ist mein Werkzeug zur Integration in Ihr Team.",
    descEN:
      "Daily practice at B1, active B2 intensive course. Language is not just a certificate — it is my tool for deep integration into your team.",
    extra: "lang" as const,
  },
  {
    icon: "💼",
    color: "purple" as const,
    titleDE: "Deutsches Scrum-Team Erfahrung",
    titleEN: "German Scrum Team Experience",
    descDE:
      "Praktikum bei pragmatic minds GmbH (Kirchheim u.T.) — Go-Microservices, DSGVO-konforme Bots, Code Reviews und Pull-Request-Zyklen in einem echten deutschen Team.",
    descEN:
      "Internship at pragmatic minds GmbH (Kirchheim u.T.) — Go microservices, GDPR-compliant bots, code reviews, and PR cycles in a real German dev team.",
    extra: null,
  },
  {
    icon: "⚡",
    color: "orange" as const,
    titleDE: "Hunger zu Lernen",
    titleEN: "Drive to Learn",
    descDE:
      "In 2 Jahren habe ich Go, Kotlin, Docker, Linux-Administration und Cloud-Deployment selbstständig erlernt — bevor ich ein Praktikum in Deutschland absolviert habe.",
    descEN:
      "In 2 years I independently learned Go, Kotlin, Docker, Linux administration and cloud deployment — before completing an internship in Germany.",
    extra: null,
  },
  {
    icon: "🌍",
    color: "blue" as const,
    titleDE: "Interkulturelle Kompetenz",
    titleEN: "Intercultural Competency",
    descDE:
      "Arabisch (Muttersprache), Englisch (B2/C1), Deutsch (B1→B2), Französisch (A2). Gewohnt, in diversen internationalen Teams zu arbeiten.",
    descEN:
      "Arabic (native), English (B2/C1), German (B1→B2), French (A2). Experienced working in diverse international teams.",
    extra: null,
  },
];
