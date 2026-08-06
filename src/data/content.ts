import type { TechKey } from "@/lib/tech-icons";

/**
 * ============================================================
 * SITE CONTENT
 * ============================================================
 * Everything written on the site that isn't a project lives here.
 * Projects have their own schema in `@/data/projects`.
 *
 * Fields are commented with what belongs in them. Replace the prose;
 * the components read from these shapes and need no edits.
 */

/* ------------------------------------------------------------------ *
 * IDENTITY
 * ------------------------------------------------------------------ */

export const SITE = {
  name: "Abdelhay Mallouli",
  /**
   * Canonical origin, no trailing slash. Drives `metadataBase`, the sitemap
   * and the structured data — change it here and everything follows.
   */
  url: "https://abdelhaymallouli.com",
  /** Job title as you'd put it on a CV. */
  role: "Full Stack Developer",
  /** Primary positioning line. Shown in metadata and the footer. */
  positioning: "Engineering precision, from schema to pixel.",

  email: "abdelhay.mallouli@gmail.com",
  phone: "+212 635 848 683",
  location: "Tangier, Morocco",

  github: "https://github.com/abdelhaymallouli",
  linkedin: "https://www.linkedin.com/in/abdelhaymallouli",

  /** Put the file at /public/resume.pdf, or change this path. */
  resumeHref: "/resume.pdf",
  /** Booking link for the interview CTA. Cal.com, Calendly, etc. */
  schedulingHref: "https://cal.com/",

  availability: {
    open: true,
    /** Engagement types you'll consider. */
    modes: ["Full-time", "Contract", "Freelance"],
  },
} as const;

/** Section ids for nav highlighting — must match the DOM, in order. */
export const SECTION_IDS = [
  "work",
  "services",
  "credentials",
  "about",
  "process",
  "comparison",
  "philosophy",
  "journey",
  "skills",
  "faq",
] as const;

export const NAV_LINKS = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Journey", href: "/#journey", id: "journey" },
] as const;

/* ------------------------------------------------------------------ *
 * HERO
 * The first screen. Keep the headline to one clear statement — resist
 * adding a second clause.
 * ------------------------------------------------------------------ */

export const HERO = {
  /** Positioning line above the headline. Role and place, nothing more. */
  eyebrow: `${SITE.role} · ${SITE.location}`,
  /**
   * The main statement. One sentence, three lines maximum on desktop.
   *
   * Says what the work replaces rather than how it was built — "scalable",
   * "robust" and "modern" are claims every developer makes and none evidence.
   */
  headline: "I replace paper processes with software people trust.",
  /**
   * Sits beside the headline, not under it — so it has to work at roughly
   * three short lines. Says what the work does, without the case-study
   * detail the sections below already carry.
   */
  intro:
    "Full-stack systems that replace paper and spreadsheets — fraud-resistant check-in, dashboards that flag a problem while it can still be fixed, and the APIs and data models underneath.",
  primaryCta: { label: "View projects", href: "/projects" },
  secondaryCta: { label: "Download résumé", href: SITE.resumeHref },
} as const;

/* ------------------------------------------------------------------ *
 * ABOUT
 * Write as an engineer, not a student. How you think and work —
 * not a chronology of what you've learned.
 * ------------------------------------------------------------------ */

export const ABOUT = {
  heading: "About",
  /**
   * Optional portrait, shown beside the story. Drop a square image in
   * /public/imgs/ and point here; without it the column falls back to a
   * lettermark at the same dimensions, so the layout never shifts.
   */
  portrait: undefined as { src: string; alt: string } | undefined,
  /**
   * A professional story, not a biography — how the work got to where it is
   * and why it's shaped this way. Under 250 words on purpose: the case
   * studies carry the detail, this carries the reasoning.
   *
   * The lead paragraph renders larger than the rest.
   */
  paragraphs: [
    "I'm a full-stack engineer in Tangier, and most of what I build replaces something that used to be done on paper.",
    "That's shaped the kind of engineer I've become. When a system decides whether someone sits an exam, being clever matters less than being correct — so I start from the data model, the boundaries, and the failure modes, and I write the tests that prove the rules hold before I call a feature done.",
    "A remote engagement with a team in Germany sharpened that. Building HR automation in Go against Personio, MOCO and Microsoft Graph, I couldn't lean on being in the room to explain a decision: the code, the commit history, and the API contract had to speak for themselves across a time zone and a language. I write differently now — for the person reading it six months later, who might be me.",
    "Backend is where I'm most at home, because that's where the guarantees live. An interface can be redrawn in an afternoon; a schema that got the relationships wrong is felt for years. AI interests me for the same unglamorous reason — on CampusOS it meant running Mistral on-premise so regulated student data never left the campus network. Slower answers, but the constraint was non-negotiable.",
    "I'd rather ship four systems I can still defend in an interview than twenty I can't. Quality isn't a preference here; it's the only thing that survives contact with real users.",
  ],
  /** Optional quick facts shown alongside the prose. */
  facts: [
    { label: "Based in", value: SITE.location },
    { label: "Focus", value: "Backend architecture, full-stack delivery" },
    { label: "Currently", value: "Open to new roles" },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * ENGINEERING PHILOSOPHY
 * Principles that shape your decisions. Each needs a real position —
 * something another engineer could reasonably disagree with.
 * ------------------------------------------------------------------ */

export interface Principle {
  /** Short title. Two or three words. */
  title: string;
  /** One or two sentences stating the position and why you hold it. */
  body: string;
}

export const PRINCIPLES: Principle[] = [
  {
    title: "Architecture first",
    body: "SOLID and N-tier boundaries are decided before the first line of a feature is written. Moving a seam later costs far more than drawing it correctly the first time.",
  },
  {
    title: "TDD, not test theater",
    body: "Tests are written against the behavior a user or another system depends on, verified with PHPUnit before the feature is considered done — not added afterward to hit a coverage number.",
  },
  {
    title: "Componentized by design",
    body: "Atomic Design keeps UI systems modular and white-label-ready from the start, so a new client workspace is a configuration change, not a rebuild.",
  },
  {
    title: "Maintainability over cleverness",
    body: "The next person to read this — often me, months later — matters more than a concise trick. Clean, organized code is a feature, not a nice-to-have.",
  },
  {
    title: "Security is not a phase",
    body: "RBAC, OAuth2, and GDPR-aware handling of data belong in the same commit as the feature they protect, not in a hardening pass before launch.",
  },
  {
    title: "Discipline in version control",
    body: "Git Flow isn't bureaucracy — it's what keeps a codebase's structural integrity intact when several people are shipping into it at once.",
  },
];

/* ------------------------------------------------------------------ *
 * EDUCATION
 *
 * ⚠️  PLACEHOLDER DATA — REPLACE BEFORE PUBLISHING.
 *
 * Every value below is a stand-in. No education details existed anywhere in
 * this project, and inventing a school or a diploma on a site a recruiter
 * will read is the one mistake that cannot be walked back — so the shape is
 * here and the facts are not.
 *
 * Fill in the real values and delete the TODO markers. Entries whose `school`
 * still begins with "TODO" render with a visible "placeholder" note, so an
 * unfilled entry is obvious rather than quietly wrong.
 * ------------------------------------------------------------------ */

export interface EducationEntry {
  school: string;
  /** Programme or diploma as it appears on the certificate. */
  programme: string;
  /** e.g. "2023 — 2025" */
  period: string;
  location: string;
  /** One sentence: what it covered, or what you took from it. */
  detail?: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    school: "TODO — school or training centre",
    programme: "TODO — programme or diploma",
    period: "TODO — e.g. 2023 — 2025",
    location: "TODO — city, country",
    detail:
      "TODO — one sentence on what it covered, or what you took from it.",
  },
];

/** True while an entry is still carrying its placeholder values. */
export function isPlaceholderEducation(entry: EducationEntry): boolean {
  return entry.school.startsWith("TODO");
}

/* ------------------------------------------------------------------ *
 * OUTLOOK
 * Closes the journey on direction rather than letting it trail off at
 * whatever shipped most recently.
 * ------------------------------------------------------------------ */

export const JOURNEY_OUTLOOK = {
  /** Kept deliberately vague on date — this is intent, not a commitment. */
  year: "Next",
  title: "Backend depth, and a team to build with",
  detail:
    "Looking for a role where the data model matters and the system outlives the sprint — ideally somewhere I can go deeper on distributed backends and keep shipping the full stack around them.",
} as const;

/* ------------------------------------------------------------------ *
 * EXPERIENCE
 * Company cards. Lead with impact, not responsibilities.
 *
 *   Weak:   "Responsible for maintaining the backend."
 *   Strong: "Cut median API response time 45% by reworking N+1 queries."
 * ------------------------------------------------------------------ */

export interface ExperienceEntry {
  company: string;
  role: string;
  /** e.g. "2024 — Present" */
  period: string;
  location: string;
  /** Optional logo at /public/logos/. Falls back to a lettermark. */
  logo?: string;
  /** One or two sentences on the company and your remit. */
  summary: string;
  /** Outcomes with numbers wherever you can attach them. */
  achievements: string[];
  stack: TechKey[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Mooroot",
    role: "Full Stack & Automation Developer (Internship)",
    period: "June 2026 — Present",
    location: "Tangier, Morocco",
    summary:
      "Digital agency building an internal, multi-tenant document and presentation production engine used across client workspaces.",
    achievements: [
      "Engineered an AI-powered visual presentation editor with an interactive slide editing experience.",
      "Built an automated document generation engine that converts presentation layouts into print-ready A4 PDFs while preserving formatting and design.",
      "Designed a scalable, Atomic Design–based component system supporting white-label customization across multiple client workspaces.",
      "Integrated the Claude API to power AI-assisted editing and content generation.",
      "Applied SOLID principles, TDD, and clean architecture throughout to keep the codebase maintainable and testable.",
    ],
    stack: ["laravel", "php", "typescript", "docker"],
  },
  {
    company: "Pragmatic Minds GmbH",
    role: "Backend & Automation Developer Intern (Remote)",
    period: "July 2025 — August 2025",
    location: "Kirchheim unter Teck, Germany",
    summary:
      "Built internal Mattermost plugins automating HR operations for the company, integrating external HR and scheduling platforms.",
    achievements: [
      "Designed and shipped 6 Mattermost plugins automating employee sync, leave management, calendar integration, and workflow notifications.",
      "Integrated Personio, MOCO, and Microsoft Graph API to synchronize HR and scheduling data across platforms.",
      "Built secure backend services in Go with REST APIs and OAuth 2.0 authentication.",
      "Used Docker, Git, and GitHub to streamline development, testing, and deployment of internal tools.",
    ],
    stack: ["go", "docker"],
  },
];

/* ------------------------------------------------------------------ *
 * SKILLS
 * Categorised chips. No percentages, no proficiency bars — they imply
 * a precision that doesn't exist and invite scepticism.
 * ------------------------------------------------------------------ */

export interface SkillGroup {
  title: string;
  /** Technologies with icons — keys from `@/lib/tech-icons`. */
  items: TechKey[];
  /** Plain-text entries for things without a recognisable logo. */
  extras?: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    title: "Backend",
    items: ["laravel", "php", "go", "mysql"],
    extras: ["PostgreSQL", "REST & GraphQL APIs", "RBAC", "SOLID", "TDD (PHPUnit)"],
  },
  {
    title: "Frontend",
    items: ["react", "nextjs", "typescript", "tailwind"],
    extras: ["GraphQL", "React Query", "Alpine.js", "Atomic Design"],
  },
  {
    title: "Infrastructure",
    items: ["docker", "githubactions"],
    extras: ["Linux (Apache)", "CI/CD", "Astro"],
  },
  {
    title: "Practice",
    items: ["gitflow", "figma"],
    extras: ["Code review", "ESLint / Prettier", "Clean architecture", "Client presentation"],
  },
  {
    title: "Also working with",
    items: [],
    extras: [
      "Django",
      "Python (automation / Selenium)",
      "Kotlin (Jetpack Compose)",
      "OAuth2 / OpenID",
      "Microsoft Graph API",
      "Claude API",
      "GDPR compliance",
    ],
  },
];

/* ------------------------------------------------------------------ *
 * SERVICES
 * What you can be hired to do. Written as capabilities a team would
 * budget for, not as a list of technologies.
 * ------------------------------------------------------------------ */

export interface Service {
  title: string;
  /** One or two sentences. What you deliver, and what it's worth. */
  body: string;
  /** Three or four concrete deliverables. */
  points: string[];
}

export const SERVICES: Service[] = [
  {
    title: "Full-stack delivery",
    body: "End-to-end ownership of a product surface — schema, API, interface, deployment — so a feature doesn't stall waiting on a hand-off between specialists.",
    points: [
      "Laravel, Go and Next.js in production",
      "Data model and API contract first",
      "Shipped to real users, not staging",
    ],
  },
  {
    title: "Backend & API engineering",
    body: "The layer where the guarantees live. Schemas that model the domain correctly, and APIs another team can build against without asking you what a field means.",
    points: [
      "REST and GraphQL, versioned and documented",
      "RBAC, OAuth2 and audit trails",
      "Query and N+1 profiling",
    ],
  },
  {
    title: "AI integration",
    body: "LLM features wired into a product with the constraints taken seriously — cost, latency, data residency and what happens when the model is wrong.",
    points: [
      "On-premise inference where data can't leave",
      "RAG pipelines with retrieval you can inspect",
      "Guardrails and prompt-level scoping",
    ],
  },
  {
    title: "Automation & internal tools",
    body: "The unglamorous systems that give a team its week back — syncing platforms that don't talk to each other, and replacing the spreadsheet everyone re-types by hand.",
    points: [
      "Third-party platform integration",
      "Scheduled jobs and queue workers",
      "Internal dashboards and admin surfaces",
    ],
  },
  {
    title: "Frontend engineering",
    body: "Interfaces that stay fast and accessible as they grow, built on a component system rather than a pile of one-off pages.",
    points: [
      "React and TypeScript, Atomic Design",
      "WCAG AA as a build requirement",
      "Core Web Vitals budgeted, not hoped for",
    ],
  },
  {
    title: "Mobile applications",
    body: "Companion apps that share one backend and one mental model with the web product, so the two can't drift apart.",
    points: [
      "NativePHP and Kotlin (Jetpack Compose)",
      "Offline-first sync with idempotent replay",
      "Device capabilities: camera, GPS, push",
    ],
  },
];

/* ------------------------------------------------------------------ *
 * DEVELOPMENT PROCESS
 * How an engagement actually runs. Four stages reads best — more and
 * it stops being a process and starts being a Gantt chart.
 * ------------------------------------------------------------------ */

export interface ProcessStep {
  /** Two or three words. */
  title: string;
  /** What happens here, and what you leave with. */
  body: string;
}

export const PROCESS: ProcessStep[] = [
  {
    title: "Understand the constraint",
    body: "Before any code, I want the data model, the boundaries and the failure modes. Most bad architecture is a good answer to a question nobody checked. This stage ends with a written statement of what we're actually solving.",
  },
  {
    title: "Design the seams",
    body: "Decide where the boundaries go while they're still cheap to move. SOLID and N-tier layering are decided here, not retrofitted — along with the schema, the API contract, and what each layer is allowed to know.",
  },
  {
    title: "Build against tests",
    body: "Features are written against the behaviour a user or another system depends on, verified before they're called done. Small commits, reviewable diffs, and Git Flow discipline so several people can ship into it at once.",
  },
  {
    title: "Ship and harden",
    body: "Deploy behind CI, then watch it under real load. Security, performance and accessibility are checked against budgets set at the start rather than discovered in a pass before launch.",
  },
];

/* ------------------------------------------------------------------ *
 * HIGHLIGHT
 * The single-statement band between the work and the services. One
 * claim, stated plainly, with the evidence beneath it.
 * ------------------------------------------------------------------ */

export const HIGHLIGHT = {
  eyebrow: "Why hire me",
  /** One sentence. The whole positioning, compressed. */
  headline: "One engineer, the whole stack, accountable end to end.",
  body: "Most of what breaks in a project happens at a hand-off — between the schema and the API, the API and the interface, the interface and the deploy. I hold all four, which means fewer seams to fall through and no waiting on someone else's queue to finish a feature.",
  /** Three short proof points. Kept to a phrase each. */
  proof: [
    { label: "Schema to pixel", detail: "Data model, API, UI and deployment" },
    { label: "Shipped, not staged", detail: "Systems running with real users" },
    { label: "Written down", detail: "Trade-offs documented, not buried" },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * COMPARISON
 * How this way of working differs from the default. Each row states a
 * real position — the left column has to be a choice someone could
 * reasonably make, not a strawman, or the whole table reads as spin.
 * ------------------------------------------------------------------ */

export interface Comparison {
  /** The dimension being compared. Two or three words. */
  aspect: string;
  /** The common default. Must be a fair statement of it. */
  typical: string;
  /** How I do it, and why. */
  mine: string;
}

export const COMPARISON: Comparison[] = [
  {
    aspect: "Starting point",
    typical: "Build to the ticket, discover the data model as you go.",
    mine: "Schema, boundaries and failure modes first. Moving a seam later costs far more than drawing it correctly once.",
  },
  {
    aspect: "Testing",
    typical: "Tests added afterwards, sized to hit a coverage number.",
    mine: "Written against the behaviour something depends on, before the feature is called done. 130+ PHPUnit tests across two systems.",
  },
  {
    aspect: "Security",
    typical: "A hardening pass scheduled before launch.",
    mine: "RBAC, OAuth2 and GDPR handling ship in the same commit as the feature they protect.",
  },
  {
    aspect: "AI features",
    typical: "Send the data to a hosted API and accept the terms.",
    mine: "Residency decides the architecture. On CampusOS that meant on-premise inference, trading latency for keeping student data on campus.",
  },
  {
    aspect: "Handover",
    typical: "Knowledge lives with whoever wrote it.",
    mine: "Code, commit history and API contract have to speak without me. Proven across a time zone and a language with a team in Germany.",
  },
  {
    aspect: "Trade-offs",
    typical: "Presented once the decision is already made.",
    mine: "Written down with the decision. Every case study on this site names what was given up and why.",
  },
];

/* ------------------------------------------------------------------ *
 * STATISTICS
 * Numbers that are true and checkable. Every one of these is derived
 * from work documented elsewhere on this site — nothing aspirational.
 * ------------------------------------------------------------------ */

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  /** Where the number comes from. Keeps the section honest. */
  note: string;
}

export const STATS: Stat[] = [
  {
    value: 130,
    suffix: "+",
    label: "Automated tests written",
    note: "61 PHPUnit tests on AttendanceFlow, 69 on CampusOS",
  },
  {
    value: 6,
    label: "Production integrations shipped",
    note: "Mattermost plugins automating HR operations at Pragmatic Minds",
  },
  {
    value: 2,
    label: "Countries worked in",
    note: "Morocco on-site, Germany remote",
  },
  {
    value: 4,
    label: "Languages spoken",
    note: "Arabic, English, French and German",
  },
];

/* ------------------------------------------------------------------ *
 * PROGRAMMING LANGUAGES
 * The languages actually written in production, ordered by how much
 * of the work is in them.
 *
 * Kept separate from SKILLS, which groups by architectural layer —
 * "what I write in" and "what I build with" are different questions,
 * and deriving one from the other would mix frameworks into the list.
 * ------------------------------------------------------------------ */

export const DEV_LANGUAGES: TechKey[] = [
  "php",
  "go",
  "typescript",
  "javascript",
  "python",
  "kotlin",
];

/* ------------------------------------------------------------------ *
 * CERTIFICATIONS
 * ------------------------------------------------------------------ */

export interface Certification {
  title: string;
  issuer: string;
  /** Issue date. e.g. "2024" or "Mar 2024" */
  date: string;
  /** Link to the verifiable credential, if there is one. */
  href?: string;
}

export const CERTIFICATIONS: Certification[] = [
  { title: "Figma UI/UX Essentials", issuer: "Udemy", date: "Mar 2025", href: "#" },
  { title: "React – Complete Developer", issuer: "Udemy", date: "Aug 2024", href: "#" },
  { title: "Bootstrap 5 Responsive Design", issuer: "Udemy", date: "Aug 2024", href: "#" },
  { title: "Deploy React Apps on Linode", issuer: "Udemy", date: "Sep 2024", href: "#" },
  { title: "Python Web Scraping & Automation", issuer: "Udemy", date: "Aug 2024", href: "#" },
  { title: "Selenium Web Automation", issuer: "Udemy", date: "Jul 2024", href: "#" },
];

/* ------------------------------------------------------------------ *
 * LANGUAGES — CEFR levels, which is what recruiters screen against.
 * ------------------------------------------------------------------ */

export interface SpokenLanguage {
  name: string;
  /** e.g. "Native", "C1 — Professional", "A2 — Elementary" */
  level: string;
}

export const LANGUAGES: SpokenLanguage[] = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "B2/C1 — Professional" },
  { name: "French", level: "B1 — Intermediate" },
  { name: "German", level: "B1/B2 — Intermediate" },
];

/* ------------------------------------------------------------------ *
 * FAQ
 * The questions a hiring manager or client actually asks on a first
 * call. Answer them here so the call can start further along.
 *
 * Keep every answer concrete and defensible — a vague answer is worse
 * than no question.
 * ------------------------------------------------------------------ */

export interface FaqItem {
  question: string;
  /** Two to four sentences. Answer directly in the first one. */
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "What kind of work are you looking for?",
    answer:
      "Full-time, contract, or freelance full-stack roles. I'm finishing an internship at Mooroot in Tangier and am open to on-site work in Morocco or fully remote work with teams elsewhere — I've already done a remote engagement with a company in Germany, so the working model is proven rather than theoretical.",
  },
  {
    question: "Where are you based, and how does that work across time zones?",
    answer:
      "Tangier, Morocco, which is UTC+1 — the same hour as Berlin and Paris for most of the year, and one ahead of London. During my internship with Pragmatic Minds in Kirchheim unter Teck I worked the full German business day with no scheduling friction.",
  },
  {
    question: "What does your stack actually look like in production?",
    answer:
      "Laravel and PHP for most backend work, Go where a service needs to be small and fast, and React with TypeScript on the front end — usually over Inertia or Next.js. Around that: MySQL and PostgreSQL, Docker, GitHub Actions, and Tailwind. The two systems I'd point at first are CampusOS and AttendanceFlow, both of which are documented in detail on this site.",
  },
  {
    question: "How do you approach a system you've never seen before?",
    answer:
      "I want the data model, the boundaries, and the failure modes before I want the feature list. SOLID and clean layering only pay off if they're decided early rather than patched in afterwards, so I'd rather spend the first days reading migrations and tracing a request end to end than shipping something that has to be unpicked later.",
  },
  {
    question: "Do you write tests, or is that a stated preference?",
    answer:
      "I write them. AttendanceFlow has 61 PHPUnit tests and CampusOS has 69, with dedicated coverage for the parts that would be dangerous to get wrong — token forgery and expiry, geofence boundaries, subnet matching, and score aggregation. TDD is how I verify a feature is correct, not a coverage number I chase afterwards.",
  },
  {
    question: "How do you handle security and data protection?",
    answer:
      "RBAC, OAuth2, and GDPR-aware data handling belong in the same commit as the feature they protect, not in a hardening pass before launch. On CampusOS that meant keeping the entire AI inference path on-premise — Ollama and Mistral running locally — so regulated student data never left the campus network, accepting slower answers in exchange for data residency.",
  },
  {
    question: "What's the fastest way to reach you?",
    answer:
      `Email — ${SITE.email}. I reply within a couple of days. If it's easier to talk it through, my CV and LinkedIn are linked at the top of this page and I'm happy to walk through any of the case studies in more detail.`,
  },
];

/* ------------------------------------------------------------------ *
 * CONTACT
 * ------------------------------------------------------------------ */

export const CONTACT = {
  heading: "Interested in building something together?",
  /** One short paragraph. Say what you're looking for and how to reach you. */
  body: "I'm currently finishing an internship at Mooroot and open to full-time, contract, or freelance full-stack roles. The fastest way to reach me is email — I reply within a couple of days.",
} as const;

/* ------------------------------------------------------------------ *
 * /bewerbung — application pitch for hiring teams
 * ------------------------------------------------------------------ */

export const BEWERBUNG = {
  eyebrow: "Application",
  headline: "Why I'd be a strong addition to your team.",
  /** Two or three sentences addressed directly to a hiring manager. */
  intro:
    "A focused summary of what I do, how I work, and what I'd bring to an engineering team — with the detail a technical interviewer would want before a first call.",
  /** Three or four concrete claims you can back up in conversation. */
  pitch: [
    "I ship end to end — schema, API, interface, deployment — guided by SOLID principles and Atomic Design, so features don't stall waiting on a hand-off.",
    "I test where it counts. TDD with PHPUnit is part of how I build a feature, not a check I run afterward.",
    "I've shipped production work in Laravel, Go, and AI-integrated tooling, across an in-house team in Tangier and a remote team in Germany.",
    "I write for the next reader. Code review feedback is something I act on rather than defend.",
  ],
} as const;