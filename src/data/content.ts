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
  "about",
  "journey",
  "credentials",
  "philosophy",
  "skills",
  "faq",
] as const;

export const NAV_LINKS = [
  { label: "Work", href: "/#work", id: "work" },
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
  headline: "I build the systems people are required to trust.",
  /**
   * Sits beside the headline, not under it, so it has to work at three short
   * lines. Three concrete nouns, then the layer underneath them. No em-dash:
   * the construction was doing too much work across the whole site.
   */
  intro:
    "Attendance that can't be faked. Dashboards that catch a problem while it is still fixable. Underneath both, the schemas and APIs that decide whether any of it holds.",
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
  portrait: {
    src: "/imgs/optimised/profile.webp",
    alt: "Abdelhay Mallouli",
  } as { src: string; alt: string } | undefined,
  /**
   * A professional story, not a biography — how the work got to where it is
   * and why it's shaped this way. Under 250 words on purpose: the case
   * studies carry the detail, this carries the reasoning.
   *
   * The lead paragraph renders larger than the rest.
   */
  paragraphs: [
    "I'm a full-stack engineer in Tangier. Most of what I build replaces something that used to be done on paper.",
    "That shaped the kind of engineer I became. When a system decides whether someone sits an exam, being clever matters less than being correct. So I start from the data model, the boundaries and the failure modes, then write the tests that prove the rules hold before I call anything done.",
    "A remote engagement with a team in Germany sharpened it further. I was building HR automation in Go against Personio, MOCO and Microsoft Graph, and I couldn't lean on being in the room to explain a decision. The code, the commit history and the API contract had to carry it across a time zone and a language. I write differently now: for whoever reads it in six months, who might well be me.",
    "Backend is where I'm most at home, because that is where the guarantees live. An interface can be redrawn in an afternoon. A schema that got the relationships wrong is felt for years. AI interests me for the same unglamorous reason. On CampusOS it meant running Mistral on-premise so regulated student data never left the campus network: slower answers, but the constraint wasn't negotiable.",
    "I'd rather ship four systems I can still defend in an interview than twenty I can't. Quality isn't a preference here. It's the only thing that survives contact with real users.",
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
    body: "Tests are written against the behavior a user or another system depends on, and verified with PHPUnit before the feature is considered done. Not added afterward to hit a coverage number.",
  },
  {
    title: "Componentized by design",
    body: "Atomic Design keeps UI systems modular and white-label-ready from the start, so a new client workspace is a configuration change, not a rebuild.",
  },
  {
    title: "Maintainability over cleverness",
    body: "The next person to read this, often me some months later, matters more than a concise trick. Clean, organized code is a feature rather than a nice-to-have.",
  },
  {
    title: "Security is not a phase",
    body: "RBAC, OAuth2, and GDPR-aware handling of data belong in the same commit as the feature they protect, not in a hardening pass before launch.",
  },
  {
    title: "Discipline in version control",
    body: "Git Flow isn't bureaucracy. It's what keeps a codebase structurally intact when several people are shipping into it at once.",
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
      "Full-time, contract or freelance full-stack roles. I'm finishing an internship at Mooroot in Tangier, and I'm open to on-site work in Morocco or fully remote work with teams elsewhere. I've already done a remote engagement with a company in Germany, so the working model is proven rather than theoretical.",
  },
  {
    question: "Where are you based, and how does that work across time zones?",
    answer:
      "Tangier, Morocco, which sits at UTC+1. That's the same hour as Berlin and Paris for most of the year, and one ahead of London. During my internship with Pragmatic Minds in Kirchheim unter Teck I worked the full German business day with no scheduling friction.",
  },
  {
    question: "What does your stack actually look like in production?",
    answer:
      "Laravel and PHP for most backend work. Go where a service needs to be small and fast. React with TypeScript on the front end, usually over Inertia or Next.js. Around that: MySQL and PostgreSQL, Docker, GitHub Actions and Tailwind. If you want to see it in practice, CampusOS and AttendanceFlow are both documented in full on this site.",
  },
  {
    question: "How do you approach a system you've never seen before?",
    answer:
      "I want the data model, the boundaries and the failure modes before I want the feature list. Clean layering only pays off when it's decided early rather than patched in afterwards. So expect me to spend the first days reading migrations and tracing a request end to end, rather than shipping something that has to be unpicked later.",
  },
  {
    question: "Do you write tests, or is that a stated preference?",
    answer:
      "I write them. AttendanceFlow has 61 PHPUnit tests and CampusOS has 69, with dedicated coverage for the parts that would be dangerous to get wrong: token forgery and expiry, geofence boundaries, subnet matching, score aggregation. TDD is how I verify a feature is correct. It isn't a coverage number I chase afterwards.",
  },
  {
    question: "How do you handle security and data protection?",
    answer:
      "RBAC, OAuth2 and GDPR-aware data handling belong in the same commit as the feature they protect, not in a hardening pass before launch. On CampusOS that meant keeping the entire AI inference path on-premise, with Ollama and Mistral running locally, so regulated student data never left the campus network. Slower answers, in exchange for data residency. That trade wasn't close.",
  },
  {
    question: "What's the fastest way to reach you?",
    answer:
      `Email: ${SITE.email}. I answer within two days. If it's easier to talk it through, my CV and LinkedIn are linked at the top of this page, and I'm happy to walk you through any of the case studies in more detail.`,
  },
];

/* ------------------------------------------------------------------ *
 * CONTACT
 * ------------------------------------------------------------------ */

export const CONTACT = {
  heading: "Let's talk about what you're building.",
  /** One short paragraph. Say what you're looking for and how to reach you. */
  body: "I'm finishing an internship at Mooroot and open to full-time, contract or freelance full-stack roles. Email is the fastest way to reach me, and I answer within two days.",
} as const;

/* ------------------------------------------------------------------ *
 * /bewerbung — application pitch for hiring teams
 * ------------------------------------------------------------------ */

export const BEWERBUNG = {
  eyebrow: "Application",
  headline: "What I'd bring to your engineering team.",
  /** Two or three sentences addressed directly to a hiring manager. */
  intro:
    "What I do, how I work, and where I've done it. Written with the detail a technical interviewer wants before the first call, so we can start further along.",
  /** Three or four concrete claims you can back up in conversation. */
  pitch: [
    "I ship end to end: schema, API, interface, deployment. SOLID principles and Atomic Design guide the seams, so a feature never stalls waiting on someone else's hand-off.",
    "I test where it counts. TDD with PHPUnit is part of how I build a feature, not a box I tick afterward.",
    "I've shipped production work in Laravel, Go and AI-integrated tooling, with an in-house team in Tangier and a remote team in Germany.",
    "I write for the next reader. Review feedback is something I act on rather than defend.",
  ],
} as const;