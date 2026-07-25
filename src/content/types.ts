// ─────────────────────────────────────────────────────────────────────────────
// Per-locale content model.
//
// Rich, translatable copy lives here as typed TS modules (en.ts / de.ts / fr.ts),
// each exporting a `SiteContent`. Locale-agnostic *structural* data (project tech,
// images, links, skill icons) stays in src/data/* and is referenced by all locales.
//
// Sections without real content yet expose empty arrays; their components render a
// marked "coming soon" empty state (see sections/ComingSoon).
// ─────────────────────────────────────────────────────────────────────────────

export interface HeroContent {
  badge: string;
  /** Two headline lines rendered stacked. */
  headline: [string, string];
  tagline: string;
  bio: string;
  statusLine: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface CompanyItem {
  name: string;
  role: string;
  period: string;
  /** Optional path to a logo in /public; falls back to initials when absent. */
  logo?: string;
}

export interface ProcessStep {
  step: string;
  desc: string;
}

export interface ExpertiseItem {
  name: string;
  /** 0–100 confidence, drives the meter. */
  level: number;
  years?: string;
}

export interface ExpertiseGroup {
  category: string;
  items: ExpertiseItem[];
}

export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface CaseStudy {
  eyebrow: string;
  title: string;
  summary: string;
  /** Problem / Constraints / Architecture / Decisions / Outcome. */
  sections: CaseStudySection[];
  metrics: StatItem[];
  repo?: string;
  demo?: string;
  image?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export interface CertItem {
  icon: string;
  title: string;
  issuer: string;
  date: string;
  desc: string;
  file?: string;
}

export interface EducationItem {
  school: string;
  program: string;
  period: string;
  desc: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  pct: number;
}

// ── Sections that start empty (typed, rendered as "coming soon") ─────────────
export interface OpenSourceItem {
  name: string;
  desc: string;
  url: string;
  stars?: number;
  language?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  url: string;
  tags?: string[];
}

export interface NowItem {
  label: string;
  value: string;
}

export interface ToolboxItem {
  category: string;
  name: string;
}

export interface ContactContent {
  title: string;
  cta: string;
  email: string;
  location: string;
  availability: string;
  timezone: string;
  responseTime: string;
}

export interface SiteContent {
  hero: HeroContent;
  stats: StatItem[];
  companies: CompanyItem[];
  caseStudy: CaseStudy;
  process: ProcessStep[];
  expertise: ExpertiseGroup[];
  experience: ExperienceItem[];
  certifications: CertItem[];
  education: EducationItem[];
  languages: LanguageItem[];
  achievements: StatItem[];
  contact: ContactContent;
  // Empty-until-supplied sections:
  openSource: OpenSourceItem[];
  testimonials: Testimonial[];
  blog: BlogPost[];
  now: NowItem[];
  toolbox: ToolboxItem[];
}
