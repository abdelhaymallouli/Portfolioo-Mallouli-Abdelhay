import type { TechKey } from "@/lib/tech-icons";

/**
 * ============================================================
 * PROJECT CONTENT SCHEMA
 * ============================================================
 *
 * HOW TO USE THIS FILE
 * --------------------
 * Each project below is a form to fill in. Every field carries a comment
 * explaining what belongs there and — where it matters — what makes a
 * strong answer versus a weak one.
 *
 * Fill in what you have. Optional fields you leave out are simply not
 * rendered; the case-study page adapts to whatever is present, so an
 * incomplete project still looks finished rather than showing empty
 * headings.
 *
 * Only `slug`, `title`, `summary`, `year`, `role`, `stack` and
 * `categories` are required.
 *
 * WRITING GUIDANCE
 * ----------------
 * Write like an engineer explaining work to another engineer.
 *
 *   Weak:   "Built a fast, scalable, modern web app using best practices."
 *   Strong: "Check-in took 40s per student because attendance was on paper.
 *            Replaced it with a QR flow that completes in under 3s."
 *
 * Be specific. Name the constraint, the decision, and the trade-off. Numbers
 * beat adjectives every time.
 */

/** Filter facets on /projects. Add a value here before using it below. */
export type ProjectCategory =
  | "Full Stack"
  | "Backend"
  | "Frontend"
  | "AI & LLM"
  | "Mobile"
  | "EdTech"
  | "Dashboard"
  | "Open Source";

/** Shipping state, shown as a small label on cards. */
export type ProjectStatus =
  | "Live"
  | "In Development"
  | "Prototype"
  | "Archived"
  | "Private";

/**
 * A measurable outcome. Prefer before/after numbers you can defend in an
 * interview — a recruiter may well ask how you measured it.
 */
export interface ProjectMetric {
  /** Numeric portion only; it animates as a counter. e.g. 70 */
  value: number;
  /** Unit or symbol appended to the value. e.g. "%", "ms", "x" */
  suffix?: string;
  /** Symbol prepended. e.g. "<", "~" */
  prefix?: string;
  /** What the number describes. e.g. "Faster check-in" */
  label: string;
  /** Optional: how it was measured. Adds credibility. */
  note?: string;
}

/** A problem you hit, and how you actually resolved it. */
export interface ProjectChallenge {
  /** The problem, in concrete terms. What broke, or what was too slow? */
  challenge: string;
  /** What you did about it — the specific technique, not "optimised it". */
  solution: string;
  /** Optional: what you gave up in exchange. Honesty reads as seniority. */
  tradeoff?: string;
}

/** One stage in the request/data flow, rendered as a numbered diagram. */
export interface ArchitectureNode {
  /** The component. e.g. "React SPA", "Laravel API", "MySQL" */
  layer: string;
  /** Its responsibility in one line. */
  detail: string;
}

/** A screenshot slot. Drop files in /public/screenshots/ and point here. */
export interface ProjectImage {
  /** Path from /public. e.g. "/screenshots/attendance-dashboard.png" */
  src?: string;
  /** Describe the content for screen readers — not "screenshot". */
  alt: string;
  /** Controls the frame's aspect ratio in the gallery. */
  device: "desktop" | "tablet" | "mobile";
  /** Optional caption shown beneath the frame. */
  caption?: string;
}

export interface Project {
  /* ---------- Identity (required) ---------- */

  /** URL segment. Lowercase, hyphenated. Changing this breaks links. */
  slug: string;
  /** Product name as you'd say it aloud. */
  title: string;
  /** One line, under ~90 chars. Shown on cards and in search results. */
  tagline: string;
  /** 2–3 sentences for the case-study hero. What is it, and for whom? */
  summary: string;
  /** Year shipped, or a range. e.g. "2025" or "2024 — 2025" */
  year: string;
  /** Your specific contribution. Be honest about scope on team projects. */
  role: string;
  categories: ProjectCategory[];
  /** Technologies with icons. Keys must exist in `@/lib/tech-icons`. */
  stack: TechKey[];
  /**
   * Libraries and tools that have no recognisable logo (PHPUnit, a Composer
   * package, a model name). Rendered as plain-text chips beside the icon
   * ones, so nothing gets dropped just because the icon set lacks a mark.
   */
  stackExtras?: string[];

  /* ---------- Presentation ---------- */

  /**
   * Featured projects appear on the home page as full case studies. Keep this
   * to 4 — the section is long, and a fifth entry is one most reviewers will
   * never scroll to.
   */
  featured?: boolean;
  status?: ProjectStatus;
  /** Display URL shown in the browser frame. e.g. "attendanceflow.app" */
  url?: string;
  /** Hero image for the case study. Falls back to a placeholder. */
  cover?: ProjectImage;

  /* ---------- Context ---------- */

  /** How long it took, start to ship. e.g. "10 weeks" */
  duration?: string;
  /** Who built it. e.g. "Solo" or "3 engineers, 1 designer" */
  team?: string;
  /**
   * The situation before this existed. The single most valuable field —
   * it establishes that you solved a real problem, not an exercise.
   */
  problem?: string;
  /** Your approach, and why you chose it over the alternatives. */
  solution?: string;
  /** 3–5 scannable bullets for the home-page deep-dive. */
  highlights?: string[];

  /* ---------- Engineering detail ---------- */

  /** Ordered flow, client → storage. 4–6 nodes reads best. */
  architecture?: ArchitectureNode[];
  /** The hard parts. 2–4 entries. This is what engineers actually read. */
  challenges?: ProjectChallenge[];
  /** Outcomes with numbers attached. */
  metrics?: ProjectMetric[];
  /** What you'd do differently. Self-awareness, not self-criticism. */
  lessons?: string[];
  /** Known gaps and planned work. Shows you know what "done" means. */
  futureWork?: string[];

  /* ---------- Media & links ---------- */

  gallery?: ProjectImage[];
  links?: {
    live?: string;
    source?: string;
    /** Demo video or recorded walkthrough. */
    video?: string;
  };
}

/* ==================================================================== *
 * PROJECTS
 *
 * The three below are filled in as worked examples showing the level of
 * detail to aim for. Replace the prose with your own — the structure is
 * already correct.
 *
 * To add a project: copy any entry, change the slug, and fill it in.
 * ==================================================================== */

export const PROJECTS: Project[] = [
  {
    slug: "campusos-smart-campus-ofppt",
    title: "CampusOS — Smart Campus OFPPT",
    tagline:
      "Fraud-proof QR attendance, dropout risk detection, and an on-premise AI assistant for OFPPT campuses.",
    summary:
      "A full-stack campus operations platform built for OFPPT, Morocco's vocational training office. It replaces paper roll-call with a rotating, HMAC-signed QR code that trainers project in class and students scan from a native mobile app — validated against GPS geofencing, campus Wi-Fi subnet, and device fingerprinting, so proxy check-ins fail. On top of that attendance ledger it encodes OFPPT's real regulatory logic, surfaces at-risk trainees before they cross the exam-exclusion threshold, and answers regulatory questions through a role-aware AI assistant running entirely on-premise.",
    year: "2026",
    role: "Full-stack developer — architecture, Laravel backend, React/Inertia frontend, AI layer, NativePHP mobile app",
    categories: ["Full Stack", "EdTech", "AI & LLM", "Mobile", "Dashboard"],
    stack: [
      "php",
      "laravel",
      "inertia",
      "react",
      "tailwind",
      "vite",
      "mysql",
      "sqlite",
      "ollama",
    ],
    stackExtras: [
      "Spatie Laravel Permission",
      "NativePHP Mobile",
      "Mistral",
      "nomic-embed-text",
      "PHPUnit",
    ],

    featured: true,
    status: "Prototype",
    url: "github.com/abdelhaymallouli/Smart-Campus-OFPPT-Hackahton-2026",

    duration: "Hackathon sprint — OFPPT Hackathon 2026",
    team: "4 contributors",

    problem:
      "OFPPT campuses still run attendance on paper. Roll-call eats the first ten minutes of every session, sheets are easy to fake through friends signing in for absentees, and totals are only tallied weeks later — by which point a trainee has already crossed the 30-hour unjustified-absence threshold and is barred from end-of-module exams. Nobody sees the slide coming: administration has no live view of who is drifting, trainers cannot intervene early, and trainees have no visibility into a score that quietly decides their academic year. Timetabling has the same blind spot — sessions get rescheduled into rooms already booked or over capacity, because conflicts are only caught by whoever happens to notice.",
    solution:
      "One system that owns the attendance ledger end to end. The trainer projects a QR code that regenerates every 30 seconds, each payload carrying an HMAC-SHA256 signature over the session ID and timestamp. A scan is accepted only if the signature verifies, the timestamp is inside the tolerance window, the device is within 50m of the room or on the campus Wi-Fi subnet, and its fingerprint has not already been used by another trainee in the same session — which structurally kills screenshot sharing and proxy check-ins. Every accepted scan feeds three engines: assiduity applies OFPPT's penalty rules and flags risk tiers, gamification awards badges and recomputes standing, and the notification layer alerts the trainee.",

    highlights: [
      "Rotating HMAC-SHA256 QR codes on a 30-second validity window, layered with GPS geofencing, Wi-Fi subnet matching, and per-session device fingerprinting — four independent checks a proxy check-in has to beat at once.",
      "Predictive risk dashboard encoding OFPPT's actual exclusion rule (30h unjustified absences), ranking trainees by accumulated hours and attendance rate with escalation actions built into the row.",
      "Fully on-premise AI assistant: Ollama with Mistral for generation, nomic-embed-text for embeddings, cosine-similarity RAG over institutional regulations, and a guardrail layer scoping it to campus topics — zero third-party API calls.",
      "Conflict-aware timetable manager with room, trainer, and group collision detection plus a trainer→admin approval workflow for reschedules, fully audit-logged.",
      "Companion NativePHP mobile app for trainees — camera QR scanning, timetable, assiduity, messaging — sharing the same Laravel API behind token-authenticated middleware.",
    ],

    architecture: [
      {
        layer: "Frontend — React 19 over Inertia.js",
        detail:
          "18 page components split by role (8 admin, 6 trainer, 3 student, 1 auth) sharing one DashboardLayout, styled with Tailwind 4 and built by Vite 8. Inertia removes the REST/state boilerplate — controllers pass typed props straight into React — while genuinely live surfaces poll dedicated JSON endpoints.",
      },
      {
        layer: "Backend — Laravel 13 modular monolith",
        detail:
          "11 controllers over 28 Eloquent models and 35 migrations. Business rules live in service classes rather than controllers: GenerateurQR (payload signing), ValidateurPointage (the four-factor gate), MoteurAssiduite (penalty and risk rules), MoteurGamification, SolveurConflits. Role-based authorization via Spatie Permission.",
      },
      {
        layer: "AI layer — local LLM with RAG",
        detail:
          "OllamaClient talks to a local Mistral instance; ContextBuilder injects the caller's role-scoped data; VectorStore, EmbeddingService and DocumentChunker implement retrieval over document_chunks ranked by cosine similarity; GuardrailService allow-lists campus topics before a request reaches the model. Every request is journalled.",
      },
      {
        layer: "Mobile — NativePHP companion",
        detail:
          "A separate Laravel 13 app packaged with nativephp/mobile, rendering Blade views inside a native shell with camera access for QR scanning. It consumes the main app's API behind auth.mobile token middleware, covered by feature tests.",
      },
      {
        layer: "Data & persistence",
        detail:
          "MySQL in deployment, SQLite for zero-config local runs, with cache, queues and sessions all database-driven so the stack needs no external broker. Alongside the domain tables sit an offline check-in queue and audit tables for schedule edits, warning letters, read receipts and AI queries.",
      },
    ],

    challenges: [
      {
        challenge:
          "A QR code on a projector is trivially screenshotted and forwarded to an absent friend — the whole attendance ledger is worthless if one photo can mark someone present.",
        solution:
          "Made the code a moving target and the scan context-bound. The payload is signed with HMAC-SHA256 under the app key, regenerated every 30 seconds and rejected outside a 30-second tolerance, so a forwarded screenshot expires before it can be used. The scan must also originate within 50m of the room or from the campus Wi-Fi subnet, and a device fingerprint already used by another trainee in the same session is refused outright.",
        tradeoff:
          "Signature verification depends on server/client clock agreement, and a tight window means a slow camera or bad signal can cost a legitimate trainee their scan. We accepted that friction and gave trainers a manual override endpoint as the escape hatch, rather than widening the window and weakening the guarantee.",
      },
      {
        challenge:
          "Campus attendance is regulated student data, and 'add an AI assistant' normally means shipping it to a third-party API — a non-starter for an institutional deployment.",
        solution:
          "Kept the entire inference path on-premise: Ollama hosting Mistral for generation and nomic-embed-text for embeddings, with a hand-rolled RAG pipeline — chunk institutional documents, embed, store vectors, rank by cosine similarity at query time. A guardrail service allow-lists campus topics and a role-aware context builder injects only the caller's own scoped data.",
        tradeoff:
          "Cosine similarity computed in PHP over all stored chunks is O(n) per query — fine at hackathon corpus size, but it needs a real vector index before the document set grows. Local Mistral also answers slower and less fluently than a frontier hosted model. Both were the right trade for data residency.",
      },
      {
        challenge:
          "Attendance is not one action — a single scan has to update the assiduity score, re-evaluate risk, award badges, recompute leaderboard rank and notify the trainee, without leaving the ledger half-written if any step fails.",
        solution:
          "Kept the write path in one DB transaction and pushed each rule set into its own injectable service, so ValidateurPointage orchestrates rather than implements. Each engine is unit-tested in isolation, which is what made the interacting rules safe to change during the sprint.",
        tradeoff:
          "Running gamification and risk recalculation synchronously inside the check-in request adds latency at exactly the moment 30 students scan at once. The database queue is already wired up, so moving that work async is the next step — we kept it inline so demo state stayed immediately consistent.",
      },
      {
        challenge:
          "Rescheduling a session can quietly create a double-booked room, a trainer in two places, or a group with overlapping courses — and trainers, not admins, are the ones who need to move sessions.",
        solution:
          "Built SolveurConflits as a standalone service checking room, trainer and group collisions plus capacity, exposed both as a pre-submit check and as a server-side gate. Trainers submit requests instead of writing directly; admins approve from a moderation queue, and every accepted change is audit-logged.",
        tradeoff:
          "Approval-gated edits mean a trainer cannot fix their own timetable in the moment. For an institution where the timetable is a contractual artifact, traceability beat convenience.",
      },
    ],

    metrics: [
      {
        value: 30,
        suffix: "s",
        label: "QR token lifetime",
        note: "HMAC-SHA256 signed payload, regenerated and expiring every 30 seconds",
      },
      {
        value: 4,
        label: "Independent anti-fraud checks",
        note: "Signature validity, time window, GPS/Wi-Fi proximity, device fingerprint uniqueness",
      },
      {
        value: 69,
        label: "Automated tests",
        note: "PHPUnit unit and feature suites covering QR signing, check-in validation, assiduity, gamification, conflicts, RAG and the mobile API",
      },
      {
        value: 28,
        label: "Eloquent models",
        note: "Across 35 migrations — attendance, gamification, scheduling, messaging, AI and audit domains",
      },
      {
        value: 18,
        label: "Role-scoped pages",
        note: "8 admin, 6 trainer, 3 student, 1 auth — all React 19 over Inertia",
      },
      {
        value: 100,
        suffix: "%",
        label: "On-premise AI inference",
        note: "Ollama, Mistral and nomic-embed-text run locally; no student data leaves the campus network",
      },
    ],

    lessons: [
      "Rotation plus context binding beats cryptography alone. An HMAC signature proves a code is authentic, not that the person scanning it is in the room — the anti-fraud value came from stacking cheap independent signals so no single one has to be perfect.",
      "Encoding the institution's real rules is the product. The 0.5-point penalty, the 15/15 base, the 30-hour exclusion threshold — those specifics are what make the risk dashboard actionable instead of decorative, and they only came from reading OFPPT's regulations rather than designing a generic attendance app.",
      "Inertia was the right call for a role-heavy admin product under time pressure: no API contract to maintain, no client-side store, while keeping the option to drop to plain JSON endpoints for the handful of genuinely live surfaces.",
      "Pushing rules into services rather than controllers is what made the sprint survivable. Because each engine was independently unit-testable, changing one rule late didn't mean re-verifying the whole check-in flow by hand.",
      "Self-hosting an LLM buys data residency at a real cost in latency and answer quality — worth it here, but the naive PHP cosine-similarity search is the kind of shortcut that must be paid back before the corpus grows.",
    ],

    futureWork: [
      "Replace JSON-column embeddings and in-PHP cosine similarity with a real vector index (pgvector or a dedicated store) so RAG stays sub-second as the regulation corpus grows.",
      "Move gamification, leaderboard recomputation and warning-letter generation onto the existing database queue so a classroom of simultaneous scans doesn't pay for them synchronously.",
      "Finish the offline check-in path end to end — the queue table and mobile capture exist, but reconciliation needs conflict rules and replay guarantees.",
      "Swap polling for WebSockets (Laravel Reverb) on the live scan feed, notifications and messaging to cut request volume during active sessions.",
      "Add biometric or OS-level device attestation to harden fingerprinting, which today is spoofable by a determined user.",
      "Ship PDF exports and analytics per filière, module and period, plus Arabic localisation alongside the current French interface.",
    ],

    cover: {
      src: "/imgs/campusos/trainer-qr-live.png",
      alt: "Trainer view of the dynamic QR code with cryptographic token countdown and live scan feed",
      device: "desktop",
    },

    gallery: [
      {
        src: "/imgs/campusos/admin-dashboard.png",
        alt: "Admin dashboard showing campus attendance rate, enrolment counts, pending justifications, and critical absenteeism alerts",
        device: "desktop",
        caption:
          "Administration overview: campus-wide attendance at a glance, a moderation queue for justifications and reschedules, and dropout alerts naming the trainees closest to exam exclusion.",
      },
      {
        src: "/imgs/campusos/admin-risk.png",
        alt: "Predictive risk management table ranking trainees by accumulated unjustified absence hours and attendance rate",
        device: "desktop",
        caption:
          "The predictive risk table, built around OFPPT's 30-hour exclusion rule — every row carries its intervention: call, AI analysis, or formal warning.",
      },
      {
        src: "/imgs/campusos/trainer-dashboard.png",
        alt: "Trainer dashboard listing the day's sessions with attendance activation locked until each session starts",
        device: "desktop",
        caption:
          "Trainer day view. Attendance can only be activated inside a session's own time slot — upcoming slots stay locked.",
      },
      {
        src: "/imgs/campusos/admin-schedule.png",
        alt: "Weekly timetable manager with per-group, per-room, and per-trainer views and inline session editing",
        device: "desktop",
        caption:
          "Timetable manager, pivotable by group, room or trainer — collisions and capacity overruns are caught before a change is written.",
      },
      {
        src: "/imgs/campusos/admin-leaderboard.png",
        alt: "Global trainee leaderboard with engagement scores, attendance rates, and awarded badges",
        device: "desktop",
        caption:
          "The engagement leaderboard: attendance, assiduity note and badges collapsed into one transparent score across all groups.",
      },
      {
        src: "/imgs/campusos/login.png",
        alt: "CampusOS institutional login page with split layout and academic email sign-in",
        device: "desktop",
        caption:
          "Institutional entry point. A single login routes admins, trainers and trainees to their own dashboard via role-based redirects.",
      },
      {
        src: "/imgs/campusos/admin-announcements.png",
        alt: "Announcement composer with recipient targeting and broadcast history",
        device: "tablet",
        caption:
          "Announcements targeted by group, filière or campus-wide, with priority levels and per-trainee read receipts.",
      },
      {
        src: "/imgs/campusos/admin-users.png",
        alt: "User directory listing trainees, trainers, and administrators with roles and profile details",
        device: "tablet",
        caption:
          "Directory of all 64 accounts, filterable by role — each trainee resolved to their matricule, filière and group.",
      },
      {
        src: "/imgs/campusos/admin-absences.png",
        alt: "Absence history and validation table with filters and exportable records",
        device: "tablet",
        caption:
          "Absence ledger with justification status, supporting documents and exports for administrative follow-up.",
      },
      {
        src: "/imgs/campusos/student-dashboard.png",
        alt: "Student dashboard showing regulatory assiduity score, next session, QR scan action, and announcements",
        device: "mobile",
        caption:
          "The trainee's view — a 14.5/15 assiduity score they can finally see moving, the next session, and one button to scan in.",
      },
    ],

    links: {
      source: "https://github.com/abdelhaymallouli/Smart-Campus-OFPPT-Hackahton-2026",
    },
  },

  {
    slug: "attendanceflow-ams",
    title: "AttendanceFlow AMS",
    tagline:
      "QR-based attendance for schools, with multi-factor anti-fraud scoring and an offline-capable mobile app.",
    summary:
      "AttendanceFlow AMS replaces paper attendance sheets and the manual Excel re-entry that follows them. Teachers project a rotating HMAC-signed QR code; students scan it from their phone and the scan is validated against four independent signals — token signature, GPS geofence, campus Wi-Fi subnet, and device fingerprint — before it is written as a present or late record. Around that core sit role-scoped portals for administrators, teachers, and students: dashboards, timetable management with a change-request workflow, digital absence justifications with document upload, notifications, audit logs, and CSV/PDF reporting for at-risk students.",
    year: "2026",
    role: "Full-stack developer — architecture, backend, UI, and mobile",
    categories: ["Full Stack", "EdTech", "Mobile", "Dashboard"],
    stack: ["laravel", "php", "tailwind", "alpine", "mysql", "vite", "chartjs"],
    stackExtras: [
      "Preline UI",
      "Laravel Sanctum",
      "Spatie Laravel Permission",
      "NativePHP Mobile",
      "PHPUnit",
    ],

    featured: true,
    status: "In Development",
    url: "github.com/abdelhaymallouli/AttendanceFlow-AMS",

    duration: "9 months — Oct 2025 to Jun 2026",
    team: "Solo",

    problem:
      "Attendance in most training centers is captured on paper, then re-typed by hand into spreadsheets. That human bridge is the bottleneck: it costs administrative staff hours every week, introduces transcription errors, and delays the data by days — so by the time anyone notices a student is at risk of exclusion, the damage is done. Students have no visibility into their own record, and submitting a medical certificate means physically walking it to an office.",
    solution:
      "A single system that captures attendance at the source and makes it immediately queryable. Teachers open a session and display a QR code that rotates every 30 seconds; students scan it in the mobile app. Because a QR code on a screen can be photographed and forwarded, the scan alone is not trusted — the server scores it against GPS proximity to campus, the client's Wi-Fi subnet, and a known device fingerprint, and the weighted total decides whether the record is accepted as present, downgraded to late, or rejected outright. Justifications, timetable changes, and reporting all live in the same data model, so an approved certificate updates the student's rate the moment an admin clicks approve.",

    highlights: [
      "HMAC-SHA256 signed QR tokens with a 30-second TTL, single-use nonces, and configurable clock-skew tolerance — a screenshotted code is worthless within half a minute.",
      "Four-signal validation engine (signature, geofence, Wi-Fi subnet, device fingerprint) with tunable weights and thresholds, so each campus can trade strictness against friction without touching code.",
      "Offline-first mobile scanning: scans captured without connectivity queue on-device and sync in idempotent batches keyed on session, student and nonce, so a flaky network never produces duplicate or lost records.",
      "Three role-scoped portals behind RBAC — admin, teacher and student — spanning 32 controllers, 106 routes and 59 Blade views.",
      "Service-layer architecture: eleven single-responsibility services keep business logic out of controllers and unit-testable in isolation.",
      "Timetable change-request workflow letting teachers propose session moves that administrators approve or reject, with the full history kept in an audit log.",
    ],

    architecture: [
      {
        layer: "Backend — Laravel 12 / PHP 8.2",
        detail:
          "Service pattern over Eloquent. Controllers stay thin and delegate to injected services extending a shared BaseService; 26 migrations model the academic domain (filières, groups, modules, sessions, profiles) separately from the attendance domain (records, QR tokens, device fingerprints, campus locations, justifications).",
      },
      {
        layer: "QR & anti-fraud subsystem",
        detail:
          "Six dedicated services: QrTokenService (sign, verify, rotate), GeolocationService (Haversine geofence with an accuracy floor), WifiSubnetService (CIDR matching on client IP), DeviceFingerprintService (per-user trust scores, revocable), ValidationScoreService (weighted aggregation to a present/late/rejected verdict), and OfflineQueueService (deduplicated batch sync).",
      },
      {
        layer: "Frontend — Blade, Tailwind v4, Alpine.js",
        detail:
          "Server-rendered Blade with Alpine for local interactivity and Preline UI for the component layer. Chart.js drives dashboard analytics, Vite bundles assets. No SPA framework, which keeps the payload small and the auth model simple.",
      },
      {
        layer: "Mobile — NativePHP",
        detail:
          "A separate Laravel application compiled to a native Android binary, giving camera access for QR scanning and device geolocation while reusing the same PHP skill set and Blade templates as the web app.",
      },
      {
        layer: "API & auth",
        detail:
          "Laravel Sanctum tokens secure 34 API routes consumed by the mobile client. Spatie Laravel Permission provides granular role and permission checks enforced at the route-middleware level.",
      },
      {
        layer: "Testing",
        detail:
          "61 PHPUnit tests across feature and unit suites, with dedicated coverage for every QR service — token forgery and expiry, geofence boundaries, subnet matching, fingerprint trust, and score aggregation.",
      },
    ],

    challenges: [
      {
        challenge:
          "A QR code displayed on a projector can be photographed and sent to an absent friend, who scans it from home. Signature verification alone cannot detect this — the token is genuine.",
        solution:
          "Treat presence as a score rather than a boolean. The HMAC signature is a hard gate worth 100 points, but geolocation (40), Wi-Fi subnet (30) and device fingerprint (30) contribute independently; 70 or above marks present, 40 to 69 marks late for manual review, below 40 is rejected. A remote scan passes the signature and fails the other three.",
        tradeoff:
          "No single signal is reliable on its own — GPS drifts indoors, campus Wi-Fi is not universally available, and phones get replaced. Weighting rather than requiring all four means a genuinely present student with a weak GPS lock still gets counted, at the cost of a narrow band where a determined cheater on campus Wi-Fi could still succeed. That band is deliberately routed to 'late' for a human to check.",
      },
      {
        challenge:
          "Classrooms have unreliable connectivity, but attendance must not depend on the network being up at 9:00 sharp.",
        solution:
          "The mobile client queues scans locally and syncs them as a batch when connectivity returns. OfflineQueueService deduplicates on the session, student and nonce triple before writing, making the sync endpoint fully idempotent — a retried batch is a no-op.",
        tradeoff:
          "Offline scans cannot be validated against server-side rate limits at capture time, and their timestamps come from the device clock. This is bounded by the token's own 30-second expiry, evaluated server-side at sync — a stale queued token is rejected regardless of when it was captured.",
      },
      {
        challenge:
          "Not every student has a phone with a working camera, and a system that hard-fails for them is worse than paper.",
        solution:
          "Every generated token also carries a short human-readable text code, uniquely allocated among live tokens. A student can type the six characters instead of scanning, and teachers retain a manual override on the session roster.",
        tradeoff:
          "The text code is easier to relay verbally to someone off-campus than a QR image is, so it leans harder on the geolocation and Wi-Fi signals to stay honest. Manual overrides bypass scoring entirely and are recorded in the audit log for that reason.",
      },
      {
        challenge:
          "Absence rates are read constantly — on dashboards, in at-risk reports, per student, per group, per module — and recomputing them from the raw record table on every view does not scale.",
        solution:
          "Reporting was isolated behind a ReportingService with a dedicated unit test suite, so the aggregation strategy can be swapped (query, cached, or denormalised) without touching a single controller or view.",
        tradeoff:
          "The current implementation still computes on read, which is fine at the pilot's data volume but is the first thing that will need caching or a summary table as history accumulates.",
      },
    ],

    metrics: [
      {
        value: 30,
        suffix: "s",
        label: "QR token lifetime",
        note: "Rotating HMAC-signed tokens with single-use nonces; a forwarded screenshot expires before it can be used",
      },
      {
        value: 4,
        label: "Independent validation signals",
        note: "Signature, GPS geofence, Wi-Fi subnet and device fingerprint, weighted into one accept/late/reject decision",
      },
      {
        value: 61,
        label: "Automated tests",
        note: "PHPUnit feature and unit suites, with every QR and anti-fraud service covered",
      },
      {
        value: 11,
        label: "Domain services",
        note: "Single-responsibility services keeping business logic out of the 32 controllers",
      },
      {
        value: 106,
        label: "Routes shipped",
        note: "72 web routes across three role portals plus 34 Sanctum-secured API routes for the mobile client",
      },
      {
        value: 26,
        label: "Database migrations",
        note: "Academic structure, attendance, QR security, justifications, timetabling and notifications",
      },
    ],

    lessons: [
      "Modelling trust as a weighted score instead of a chain of boolean gates was the decision that made the anti-fraud system usable. Requiring all four signals would have locked out honest students with a bad GPS fix; scoring lets the system be strict in aggregate while forgiving about any single sensor failing.",
      "Pushing logic into services before the feature count grew paid for itself repeatedly. When QR attendance was added months into the project, it slotted in as a new service package rather than a rewrite, and the existing attendance flows kept working untouched.",
      "Idempotency has to be designed into the schema, not bolted on at the endpoint. Choosing session, student and nonce as the natural dedup key early meant offline sync, network retries and double-taps all collapsed into the same already-solved problem.",
      "Building the mobile client with NativePHP kept the whole project in one language and one mental model. The trade-off is a smaller ecosystem and less community material than React Native or Flutter — worth it for a solo developer, and something I would weigh differently on a team with existing mobile expertise.",
    ],

    futureWork: [
      "Cache or denormalise attendance-rate aggregation before the dataset outgrows on-read computation.",
      "Bluetooth/BLE beacon proximity as a fifth validation signal, to cover classrooms where GPS is unusable indoors.",
      "Push notifications for at-risk thresholds and justification decisions, replacing the current in-app notification centre.",
      "iOS build alongside the existing Android target.",
      "Parent/guardian read-only portal for minors, and automated exclusion-warning letters at configurable absence thresholds.",
      "Multi-tenant support so several training centers can share one deployment with isolated data and per-campus validation weights.",
    ],

    cover: {
      src: "/imgs/attendanceflow/admin-dashboard.png",
      alt: "Administrator dashboard with attendance KPIs and Chart.js analytics",
      device: "desktop",
    },

    gallery: [
      {
        src: "/imgs/attendanceflow/admin-qr.png",
        alt: "QR attendance management screen showing session tokens",
        device: "desktop",
        caption:
          "QR session control — rotating signed tokens with a fallback text code for students without a camera.",
      },
      {
        src: "/imgs/attendanceflow/admin-attendance.png",
        alt: "Attendance records table with filters by group, module, and status",
        device: "desktop",
        caption:
          "Attendance register — filterable by filière, group, module, session and status.",
      },
      {
        src: "/imgs/attendanceflow/admin-settings.png",
        alt: "System settings for validation weights and campus parameters",
        device: "desktop",
        caption:
          "Settings — campus coordinates, geofence radius, validation weights and score thresholds, all tunable per deployment.",
      },
      {
        src: "/imgs/attendanceflow/admin-justifications.png",
        alt: "Justification approval queue with submitted documents",
        device: "desktop",
        caption:
          "Justification workflow — review submitted certificates and approve or reject in one click.",
      },
      {
        src: "/imgs/attendanceflow/admin-timetable.png",
        alt: "Timetable management grid",
        device: "desktop",
        caption: "Timetable management — sessions scheduled across groups and rooms.",
      },
      {
        src: "/imgs/attendanceflow/teacher-timetable-request.png",
        alt: "Teacher submitting a timetable change request",
        device: "desktop",
        caption:
          "Timetable change request — teachers propose a move, administrators approve or reject.",
      },
      {
        src: "/imgs/attendanceflow/teacher-dashboard.png",
        alt: "Teacher dashboard listing today's sessions",
        device: "desktop",
        caption: "Teacher dashboard — today's sessions and one-tap attendance launch.",
      },
      {
        src: "/imgs/attendanceflow/admin-logs.png",
        alt: "Audit log listing attendance and administrative actions",
        device: "desktop",
        caption: "Audit log — every override, approval and scan verdict is traceable.",
      },
      {
        src: "/imgs/attendanceflow/admin-users.png",
        alt: "User management screen with role assignment",
        device: "desktop",
        caption:
          "User management — RBAC role assignment across admin, teacher and student.",
      },
      {
        src: "/imgs/attendanceflow/landing.png",
        alt: "AttendanceFlow AMS public landing page presenting the product",
        device: "desktop",
        caption: "Public landing page — the entry point for all three user roles.",
      },
    ],

    links: {
      source: "https://github.com/abdelhaymallouli/AttendanceFlow-AMS",
    },
  },

  {
    slug: "venuvibe",
    title: "VenuVibe",
    tagline: "Event discovery and booking platform.",
    summary:
      "A venue and event marketplace where organisers publish listings and attendees browse, filter, and book. Built around fast search over a large, frequently-updated catalogue.",
    year: "2025",
    role: "Full-stack engineer — search, booking flow, caching",
    categories: ["Full Stack", "Frontend"],
    stack: ["nextjs", "typescript", "react", "tailwind", "mysql"],

    featured: true,
    status: "Live",
    url: "venuvibe.app",

    duration: "8 weeks",
    team: "2 engineers",

    problem:
      "Organisers had no single channel to list events, and attendees were discovering them through scattered social posts. Listings went stale quickly, and there was no reliable way to confirm availability before turning up.",
    solution:
      "A catalogue with server-rendered listing pages for search visibility, incremental regeneration so published changes appear quickly without rebuilding, and a booking flow that treats the server as the single source of truth for availability.",

    highlights: [
      "Server-rendered listings with incremental regeneration on publish.",
      "Full-text venue search that stays responsive past 50k rows.",
      "Booking flow with optimistic UI and a defined rollback path.",
      "Tag-based cache invalidation scoped to the edited listing.",
    ],

    architecture: [
      { layer: "Next.js App Router", detail: "Server components, streamed listing pages" },
      { layer: "Edge cache", detail: "Tag-based revalidation triggered on publish" },
      { layer: "Route handlers", detail: "Typed endpoints with schema-validated input" },
      { layer: "MySQL", detail: "Full-text indexes over venue and event metadata" },
      { layer: "GitHub Actions", detail: "Test, build, and preview deployment per PR" },
    ],

    challenges: [
      {
        challenge:
          "Search degraded badly once the catalogue passed ~50k rows — `LIKE '%term%'` forced a full table scan on every keystroke.",
        solution:
          "Replaced the scan with a MySQL full-text index and moved querying into a debounced server action, so typing no longer issued a request per character.",
        tradeoff:
          "Full-text matching handles typos less gracefully than trigram search would; acceptable at this catalogue size.",
      },
      {
        challenge:
          "Optimistic booking updates could diverge from server state when two people booked the last slot simultaneously.",
        solution:
          "Kept authoritative availability on the server and reconciled on mutation settle, rolling the optimistic update back with an explicit message rather than silently correcting it.",
      },
    ],

    metrics: [
      { value: 40, suffix: "%", label: "Lower bounce rate" },
      { value: 1.2, suffix: "s", label: "Largest contentful paint" },
      { value: 99.9, suffix: "%", label: "Uptime" },
    ],

    lessons: [
      "Optimistic UI needs its rollback story designed up front — retrofitting one means guessing at states you no longer have.",
      "Cache invalidation is a product decision as much as a technical one: how stale is acceptable is a question for the people using it.",
    ],

    futureWork: [
      "Geospatial search for venues near a given location.",
      "Organiser analytics dashboard.",
    ],

    gallery: [
      { alt: "Event discovery grid with active filters", device: "desktop" },
      { alt: "Venue detail and booking panel", device: "desktop" },
      { alt: "Mobile browsing view", device: "mobile" },
    ],

    links: { live: "#", source: "#" },
  },

  {
    slug: "weatherwise",
    title: "WeatherWise",
    tagline: "Forecast aggregation service with a Go backend.",
    summary:
      "A service that aggregates forecasts from several upstream providers into a single normalised response, designed to stay available when individual providers are slow or rate-limiting.",
    year: "2024",
    role: "Backend engineer — service design, caching, deployment",
    categories: ["Backend", "Open Source"],
    stack: ["go", "react", "typescript", "docker", "githubactions"],

    featured: true,
    status: "Live",
    url: "weatherwise.dev",

    duration: "6 weeks",
    team: "Solo",

    problem:
      "Individual weather APIs disagree, rate-limit aggressively on free tiers, and occasionally stall. Any client depending on exactly one of them inherits all of those failure modes.",
    solution:
      "A Go service that fans out to several providers in parallel under a shared deadline, normalises their responses, and returns a partial result when a provider is slow rather than waiting for the slowest one.",

    highlights: [
      "Parallel provider fan-out with a shared request deadline.",
      "Request coalescing so concurrent identical lookups hit upstream once.",
      "Graceful degradation — a slow provider is dropped, not fatal.",
      "12MB distroless container image.",
    ],

    architecture: [
      { layer: "React client", detail: "Typed API client with suspense boundaries" },
      { layer: "Go service", detail: "Provider fan-out under per-request context deadlines" },
      { layer: "In-memory cache", detail: "Per-region TTL with singleflight deduplication" },
      { layer: "Docker", detail: "Distroless image, ~12MB" },
    ],

    challenges: [
      {
        challenge:
          "Traffic spikes produced hundreds of identical concurrent lookups for the same region, immediately exhausting upstream rate limits.",
        solution:
          "Wrapped provider calls in singleflight so concurrent identical requests share one in-flight upstream call, backed by a short per-region TTL cache.",
      },
      {
        challenge:
          "One slow provider held the entire aggregate response hostage, because the handler waited for every call to return.",
        solution:
          "Gave each provider its own context deadline and returned whatever had resolved when the shared deadline expired, flagging the response as partial.",
        tradeoff:
          "Partial responses need explicit handling client-side; the alternative was an outage whenever any single provider degraded.",
      },
    ],

    metrics: [
      { value: 30, suffix: "ms", label: "p95 latency" },
      { value: 5, suffix: "x", label: "Throughput improvement" },
      { value: 100, label: "Lighthouse performance" },
    ],

    lessons: [
      "Timeouts are a feature. An unbounded wait is an outage that hasn't happened yet.",
      "Coalescing duplicate work is cheaper than scaling infrastructure to absorb it.",
    ],

    futureWork: [
      "Persistent cache layer so restarts don't cold-start every region.",
      "Provider health scoring to deprioritise consistently slow sources.",
    ],

    gallery: [
      { alt: "Forecast view with aggregated provider data", device: "desktop" },
      { alt: "Mobile forecast view", device: "mobile" },
    ],

    links: { live: "#", source: "#" },
  },

];

/* ------------------------------------------------------------------ *
 * Derived collections — computed so they can never drift from the data.
 * ------------------------------------------------------------------ */

/**
 * Escape hatch for work in progress: prefix a slug with `_` to keep an entry
 * in the file but out of every listing and route.
 */
export const VISIBLE_PROJECTS = PROJECTS.filter(
  (project) => !project.slug.startsWith("_"),
);

export const FEATURED_PROJECTS = VISIBLE_PROJECTS.filter(
  (project) => project.featured,
);

export const PROJECT_CATEGORIES = Array.from(
  new Set(VISIBLE_PROJECTS.flatMap((project) => project.categories)),
).sort() as ProjectCategory[];

export function getProjectBySlug(slug: string): Project | undefined {
  return VISIBLE_PROJECTS.find((project) => project.slug === slug);
}
