"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Linkedin,
  Github,
  Globe,
  FileText,
  Terminal,
  Server,
  GitBranch,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Layers,
  ExternalLink,
  Cloud,
  Wrench,
  Star,
  TrendingUp,
  Award,
  Zap,
  Users,
} from "lucide-react";

/* ─── ANIMATION HELPERS ───────────────────────────────────────────────────── */
const rise = (i = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.09,
    },
  },
});
const risev = (i = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.09,
    },
  },
  viewport: { once: true },
});

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const STATS = [
  {
    value: 2,
    suffix: "+",
    label: "Jahre\nPraxis",
    color: "#3b82f6",
    icon: TrendingUp,
    ring: 70,
  },
  {
    value: 10,
    suffix: "+",
    label: "Live\nProjekte",
    color: "#34d399",
    icon: Zap,
    ring: 83,
  },
  {
    value: 70,
    suffix: "%",
    label: "Zeit\ngespart (AMS)",
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

const EXPERIENCES = [
  {
    role: "Full-Stack Developer Intern",
    company: "pragmatic minds GmbH",
    location: "Kirchheim u. Teck, Deutschland 🇩🇪",
    period: "2024",
    type: "PRAKTIKUM",
    color: "#3b82f6",
    highlights: [
      "Go-Microservices für interne Unternehmenstools entwickelt",
      "DSGVO-konformen Mattermost-Kommunikationsbot implementiert",
      "Docker-Containerisierung für Staging & Produktion eingerichtet",
      "Scrum-Team mit deutschen Kollegen — echte PR-Zyklen & Reviews",
    ],
    tech: ["Go", "Docker", "Mattermost API", "GitFlow", "Scrum"],
  },
  {
    role: "Full-Stack Developer",
    company: "OFPPT Solicode",
    location: "Tanger, Marokko",
    period: "2024–2026",
    type: "AUSBILDUNG",
    color: "#a78bfa",
    highlights: [
      "AttendanceFlow AMS — 70% Zeitersparnis durch Design Thinking",
      "Laravel REST-API Backend + React 19 Frontend mit TypeScript",
      "Vollständige CI/CD-Pipeline mit Docker & Linode Cloud",
    ],
    tech: ["React", "Laravel", "PostgreSQL", "Docker", "Linode"],
  },
];

const PROJECTS = [
  {
    num: "01",
    title: "AttendanceFlow AMS",
    tag: "Enterprise · Live",
    tagColor: "#34d399",
    kpi: "70%",
    kpiSub: "Zeit gespart",
    kpiColor: "#34d399",
    de: "Vollautomatisches Anwesenheitssystem — ersetzte manuelle Excel-Prozesse durch ein Echtzeit-Dashboard. Design Thinking vor der ersten Codezeile.",
    en: "Fully automated attendance system replacing manual Excel with a real-time dashboard. Design Thinking before the first line of code.",
    method: ["Scrum 2-Wochen-Sprints", "Mobile-First UI", "REST API Design"],
    challenge: ["Offline-Sync", "RBAC Zugriffssystem"],
    tech: ["React", "Laravel", "PostgreSQL", "Docker"],
    accent: "#34d399",
  },
  {
    num: "02",
    title: "Go Microservices Suite",
    tag: "pragmatic minds · Deployed",
    tagColor: "#3b82f6",
    kpi: "PROD",
    kpiSub: "Live deployed",
    kpiColor: "#3b82f6",
    de: "Interne Go-Microservices & DSGVO-konformer Mattermost-Bot — containerisiert, code-reviewed, in deutschem Dev-Team deployed.",
    en: "Internal Go microservices & GDPR-compliant Mattermost bot — containerized, code-reviewed, deployed in a German dev team.",
    method: ["Microservice-Architektur", "DSGVO-Compliance", "Docker-First"],
    challenge: ["Service-to-Service JWT Auth", "DSGVO Datenspeicherung"],
    tech: ["Go", "Docker", "JWT", "Linux"],
    accent: "#3b82f6",
  },
];

const SKILLS = [
  {
    label: "Backend & APIs",
    color: "#3b82f6",
    icon: Server,
    star: true,
    items: ["Laravel", "Go", "Node.js", "REST", "PostgreSQL", "MySQL"],
  },
  {
    label: "DevOps & Cloud",
    color: "#34d399",
    icon: Cloud,
    star: true,
    items: ["Docker", "Linux", "CI/CD", "Linode", "Nginx", "GitFlow"],
  },
  {
    label: "Frontend",
    color: "#a78bfa",
    icon: Layers,
    star: false,
    items: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Tools & Agile",
    color: "#fbbf24",
    icon: Wrench,
    star: false,
    items: ["Scrum", "GitHub PRs", "Code Reviews", "Selenium", "Jira"],
  },
];

const CERTS = [
  {
    icon: "🎓",
    title: "Full-Stack Diplom · OFPPT Solicode",
    type: "Staatl. anerkannter Abschluss",
    date: "2024–2026",
    color: "#3b82f6",
    desc: "2-jährige Vollzeit-Ausbildung — vergleichbar mit deutschem IT-Berufsschulabschluss.",
    file: "/certificates/Certificate_Solicode_Tangier_Redacted.pdf",
  },
  {
    icon: "☁️",
    title: "Deploy Scalable React Apps on Cloud",
    type: "Cloud Zertifikat · Udemy",
    date: "Sept. 2024",
    color: "#34d399",
    desc: "Linode Cloud — Deployment, Skalierung und Verwaltung in produktionsnahen Umgebungen.",
    file: "#",
  },
  {
    icon: "⚛️",
    title: "React Complete Developer Course",
    type: "Frontend Zertifikat · Udemy",
    date: "Aug. 2024",
    color: "#a78bfa",
    desc: "Hooks, State Management, Context API, Performance-Optimierung, moderne Architektur.",
    file: "#",
  },
  {
    icon: "🧪",
    title: "Selenium Web Automation",
    type: "QA & Testing · Udemy",
    date: "Juli 2024",
    color: "#fbbf24",
    desc: "End-to-End Testautomatisierung — UI Testing und automatisierte QA-Workflows.",
    file: "#",
  },
];

const LANGUAGES = [
  { name: "Arabisch", lvl: "Muttersprache", pct: 100, color: "#3b82f6" },
  { name: "Englisch", lvl: "B2 / C1", pct: 83, color: "#34d399" },
  { name: "Deutsch", lvl: "B1 → B2", pct: 62, color: "#a78bfa" },
  { name: "Französisch", lvl: "A2", pct: 28, color: "#fbbf24" },
];

const WHY = [
  {
    icon: "🎯",
    color: "#3b82f6",
    t: "Praxis vor Theorie",
    de: "70% Zeitersparnis bei AttendanceFlow — durch Architektur-Denken, nicht nur durch Code.",
    en: "70% time saved on AttendanceFlow — through architectural thinking, not just code.",
  },
  {
    icon: "🇩🇪",
    color: "#34d399",
    t: "Deutschland-Erfahrung",
    de: "pragmatic minds GmbH: echte Scrum-Sprints, DSGVO-Compliance, PRs, Code Reviews.",
    en: "pragmatic minds GmbH: real Scrum sprints, GDPR compliance, PRs, code reviews.",
  },
  {
    icon: "📈",
    color: "#a78bfa",
    t: "Selbstständiges Lernen",
    de: "Go, Docker, Linux, Cloud — alle selbst erlernt, alle in Produktion eingesetzt.",
    en: "Go, Docker, Linux, Cloud — all self-taught, all used in production.",
  },
  {
    icon: "🌍",
    color: "#fbbf24",
    t: "Mehrsprachigkeit",
    de: "AR Muttersprache · EN B2/C1 · DE B1→B2 · FR A2 — Teamkommunikation auf jedem Level.",
    en: "AR native · EN B2/C1 · DE B1→B2 · FR A2 — team communication at every level.",
  },
];

/* ─── MINI RING CHART ─────────────────────────────────────────────────────── */
function RingChart({
  pct,
  color,
  size = 56,
  stroke = 5,
}: {
  pct: number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ * (1 - pct / 100) }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
      />
    </svg>
  );
}

/* ─── SEGMENTED BAR ───────────────────────────────────────────────────────── */
function SegBar({ pct, color }: { pct: number; color: string }) {
  const filled = Math.round(pct / 10);
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.05 * i }}
          viewport={{ once: true }}
          style={{
            flex: 1,
            height: "5px",
            borderRadius: "3px",
            background: i < filled ? color : "rgba(255,255,255,0.07)",
            boxShadow: i < filled ? `0 0 4px ${color}55` : "none",
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}

/* ─── PILL TAG ────────────────────────────────────────────────────────────── */
function Pill({ label, color }: { label: string; color?: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "10px",
        letterSpacing: "0.06em",
        padding: "3px 10px",
        borderRadius: "20px",
        border: `1px solid ${color || "rgba(255,255,255,0.07)"}33`,
        background: `${color || "#fff"}0c`,
        color: color || "rgba(255,255,255,0.38)",
      }}
    >
      {label}
    </span>
  );
}

/* ─── SECTION HEADER ──────────────────────────────────────────────────────── */
function SecHead({ num, title }: { num: string; title: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "40px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono,monospace)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#3b82f6",
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.2)",
          padding: "4px 10px",
          borderRadius: "6px",
          fontWeight: 700,
        }}
      >
        {num}
      </span>
      <div
        style={{
          width: "1px",
          height: "18px",
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <h2
        style={{
          margin: 0,
          fontSize: "21px",
          fontWeight: 800,
          color: "#e8eef8",
          letterSpacing: "-0.03em",
          fontFamily: "var(--font-sans,sans-serif)",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(to right, rgba(255,255,255,0.07), transparent)",
        }}
      />
    </div>
  );
}

/* ─── GLASS CARD ──────────────────────────────────────────────────────────── */
const GC = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: "rgba(255,255,255,0.028)",
      backdropFilter: "blur(20px) saturate(1.8)",
      WebkitBackdropFilter: "blur(20px) saturate(1.8)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px",
      ...style,
    }}
  >
    {children}
  </div>
);

/* ─── MAIN ────────────────────────────────────────────────────────────────── */
export default function BewerbungContent() {
  const [lang, setLang] = useState("de");
  const [scrollY, setSY] = useState(0);
  const t = <T extends React.ReactNode>(de: T, en: T): T =>
    lang === "de" ? de : en;

  useEffect(() => {
    const h = () => setSY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div
      style={{
        background: "#020617",
        color: "#f1f5f9",
        minHeight: "100vh",
        fontFamily: "var(--font-sans, -apple-system, sans-serif)",
      }}
    >
      {/* ── AMBIENT ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-25vh",
            left: "-15vw",
            width: "80vw",
            height: "80vh",
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.065) 0%, transparent 68%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "-10vw",
            width: "55vw",
            height: "55vh",
            background:
              "radial-gradient(ellipse, rgba(167,139,250,0.05) 0%, transparent 68%)",
            borderRadius: "50%",
          }}
        />
        {/* dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.2,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ── NAV ───────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          inset: "0 0 auto",
          zIndex: 200,
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 36px",
          background: scrollY > 30 ? "rgba(2,6,23,0.88)" : "transparent",
          backdropFilter: scrollY > 30 ? "blur(20px) saturate(1.8)" : "none",
          borderBottom:
            scrollY > 30 ? "1px solid rgba(255,255,255,0.07)" : "none",
          transition: "all 0.35s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#34d399",
              boxShadow: "0 0 8px #34d399",
              display: "inline-block",
              animation: "blink 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono,monospace)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.38)",
            }}
          >
            {t(
              "Bewerbung · Aktiv · 2025/2026",
              "Application · Active · 2025/2026",
            )}
          </span>
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {["de", "en"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                fontFamily: "var(--font-mono,monospace)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "5px 14px",
                borderRadius: "6px",
                border: `1px solid ${lang === l ? "rgba(59,130,246,0.4)" : "transparent"}`,
                background:
                  lang === l ? "rgba(59,130,246,0.12)" : "transparent",
                color: lang === l ? "#3b82f6" : "rgba(255,255,255,0.38)",
                transition: "all 0.18s",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — editorial split with wide photo
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          minHeight: "100vh",
        }}
      >
        {/* PHOTO PANEL — wide, full viewport height */}
        <div
          className="photo-panel"
          style={{
            width: "460px",
            flexShrink: 0,
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "rgba(11,17,32,1)",
            borderRight: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <img
            src="/imgs/profile.png"
            alt="Abdelhay Mallouli"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
          {/* bottom scrim */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(2,6,23,0.96) 0%, rgba(2,6,23,0.5) 35%, transparent 65%)",
            }}
          />
          {/* right edge blend */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, transparent 55%, rgba(2,6,23,0.55) 100%)",
            }}
          />

          {/* identity block pinned to bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "32px 28px",
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono,monospace)",
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#3b82f6",
                display: "block",
                marginBottom: "10px",
              }}
            >
              FACHINFORMATIKER BEWERBER
            </span>
            <h1
              style={{
                margin: "0 0 6px",
                fontSize: "30px",
                fontWeight: 900,
                letterSpacing: "-0.045em",
                lineHeight: 1.0,
                color: "#f1f5f9",
              }}
            >
              Abdelhay
              <br />
              Mallouli
            </h1>
            <p
              style={{
                margin: "0 0 22px",
                fontSize: "12.5px",
                color: "rgba(255,255,255,0.42)",
                fontStyle: "italic",
              }}
            >
              Full-Stack Developer · Tanger 🇲🇦
            </p>

            {/* contact */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[
                { Icon: Mail, v: "abdelhay@email.com" },
                { Icon: Phone, v: "+212 6XX XXX XXX" },
                { Icon: Globe, v: "abdelhaymallouli.com" },
                { Icon: Github, v: "abdelhaymallouli" },
                { Icon: Linkedin, v: "abdelhaymallouli" },
              ].map(({ Icon, v }, idx) => (
                <div
                  key={`${v}-${idx}`}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Icon size={11} style={{ color: "#3b82f6", flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: "var(--font-mono,monospace)",
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.42)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HERO RIGHT — text content */}
        <div
          className="hero-content"
          style={{
            flex: 1,
            padding: "120px 56px 80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          {/* badge */}
          <motion.div {...rise(0)}>
            <div
              className="mobile-hero-frame"
              style={{
                marginBottom: "32px",
                display: "none",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  position: "relative",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(59,130,246,0.1)",
                }}
              >
                <img
                  src="/imgs/profile.png"
                  alt="Abdelhay Mallouli"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 10%",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(2,6,23,0.8) 0%, transparent 40%)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 12px",
                    background: "rgba(15,23,42,0.7)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#34d399",
                      boxShadow: "0 0 8px #34d399",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "var(--font-mono,monospace)",
                      color: "#f1f5f9",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t("LIVE · VERFÜGBAR", "LIVE · AVAILABLE")}
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: "-20px",
                  padding: "10px 20px",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px) saturate(1.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  display: "inline-flex",
                  alignSelf: "center",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 900,
                    color: "#f1f5f9",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Abdelhay Mallouli
                </span>
              </div>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.22)",
                borderRadius: "6px",
                padding: "6px 14px",
                marginBottom: "36px",
                fontFamily: "var(--font-mono,monospace)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#3b82f6",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#3b82f6",
                  display: "inline-block",
                }}
              />
              {t(
                "Bewerbung · Fachinformatiker Anwendungsentwicklung",
                "Application · IT Specialist Application Development",
              )}
            </div>
          </motion.div>

          {/* headline */}
          <motion.div {...rise(1)} style={{ marginBottom: "8px" }}>
            <p
              style={{
                margin: "0 0 12px",
                fontFamily: "var(--font-mono,monospace)",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {t("Ich bringe mehr als Code —", "I bring more than code —")}
            </p>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(32px,4.2vw,58px)",
                fontWeight: 900,
                letterSpacing: "-0.048em",
                lineHeight: 1.0,
                color: "#f1f5f9",
              }}
            >
              {t(
                <>
                  <span style={{ color: "#3b82f6" }}>Architektur</span> denken,
                  <br />
                  <span style={{ color: "#a78bfa" }}>DevOps</span> liefern,
                  <br />
                  <span style={{ color: "#34d399" }}>Scrum</span> leben.
                </>,
                <>
                  <span style={{ color: "#3b82f6" }}>Architecture</span> first,
                  <br />
                  <span style={{ color: "#a78bfa" }}>DevOps</span> delivered,
                  <br />
                  <span style={{ color: "#34d399" }}>Scrum</span> in practice.
                </>,
              )}
            </h2>
          </motion.div>

          {/* cover letter */}
          <motion.div
            {...rise(2)}
            style={{ marginTop: "28px", marginBottom: "40px" }}
          >
            <div
              style={{
                maxWidth: "540px",
                padding: "22px 26px",
                background: "rgba(15,23,42,0.65)",
                backdropFilter: "blur(20px) saturate(1.8)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderLeft: "3px solid #3b82f6",
                borderRadius: "0 14px 14px 0",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "13.5px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.85,
                }}
              >
                {t(
                  <span>
                    Sehr geehrtes Team,
                    <br />
                    <br />
                    als{" "}
                    <strong style={{ color: "#f1f5f9", fontWeight: 700 }}>
                      Full-Stack-Entwickler aus Tanger
                    </strong>{" "}
                    mit echtem{" "}
                    <strong style={{ color: "#f1f5f9" }}>
                      Praktikum bei pragmatic minds GmbH in Deutschland
                    </strong>{" "}
                    bewerbe ich mich als{" "}
                    <strong style={{ color: "#3b82f6" }}>
                      Fachinformatiker für Anwendungsentwicklung
                    </strong>
                    . Ich kombiniere internationale Praxis mit dem Hunger, im
                    deutschen dualen System zu wachsen.
                  </span>,
                  <span>
                    Dear team,
                    <br />
                    <br />
                    as a{" "}
                    <strong style={{ color: "#f1f5f9" }}>
                      Full-Stack Developer from Tangier
                    </strong>{" "}
                    with a real{" "}
                    <strong style={{ color: "#f1f5f9" }}>
                      internship at pragmatic minds GmbH in Germany
                    </strong>
                    , I'm applying as{" "}
                    <strong style={{ color: "#3b82f6" }}>
                      Fachinformatiker für Anwendungsentwicklung
                    </strong>{" "}
                    — combining international hands-on experience with the drive
                    to grow in Germany's dual system.
                  </span>,
                )}
              </p>
            </div>
          </motion.div>

          {/* ── STAT CARDS with ring charts ─────────────────────────── */}
          <motion.div
            {...rise(3)}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "12px",
              marginBottom: "36px",
            }}
            className="grid-4-2-1"
          >
            {STATS.map((s, i) => (
              <motion.div key={s.label} {...rise(3 + i * 0.5)}>
                <GC
                  style={{
                    padding: "18px 14px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    borderTop: `2px solid ${s.color}50`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* glow splash */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "80px",
                      height: "80px",
                      background: `radial-gradient(circle, ${s.color}22 0%, transparent 70%)`,
                      pointerEvents: "none",
                    }}
                  />

                  {/* ring */}
                  <div style={{ position: "relative" }}>
                    <RingChart
                      pct={s.ring}
                      color={s.color}
                      size={60}
                      stroke={4}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono,monospace)",
                          fontSize: "14px",
                          fontWeight: 800,
                          color: s.color,
                          letterSpacing: "-0.04em",
                          lineHeight: 1,
                        }}
                      >
                        {s.value}
                        {s.suffix}
                      </span>
                    </div>
                  </div>

                  {/* label */}
                  <div style={{ textAlign: "center" }}>
                    {s.label.split("\n").map((line, j) => (
                      <div
                        key={j}
                        style={{
                          fontFamily: "var(--font-mono,monospace)",
                          fontSize: "9px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.38)",
                          lineHeight: 1.5,
                        }}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </GC>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...rise(4)}
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            <a
              href="/cv/Abdelhay_Mallouli_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "10px",
                background: "#3b82f6",
                color: "white",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none",
                boxShadow:
                  "0 0 30px rgba(59,130,246,0.28), 0 0 60px rgba(59,130,246,0.08)",
                letterSpacing: "-0.01em",
              }}
            >
              <Download size={14} />
              {t("Lebenslauf herunterladen", "Download CV")}
            </a>
            {[
              {
                href: "https://www.abdelhaymallouli.com",
                Icon: Globe,
                label: "Portfolio",
              },
              {
                href: "https://github.com/abdelhaymallouli",
                Icon: Github,
                label: "GitHub",
              },
              {
                href: "https://linkedin.com/in/abdelhaymallouli",
                Icon: Linkedin,
                label: "LinkedIn",
              },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "12px 18px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.032)",
                  backdropFilter: "blur(20px) saturate(1.8)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.55)",
                  fontWeight: 600,
                  fontSize: "13px",
                  textDecoration: "none",
                }}
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* thin accent rule */}
      <div
        style={{
          height: "1px",
          position: "relative",
          zIndex: 1,
          background:
            "linear-gradient(to right, transparent, rgba(59,130,246,0.4), rgba(167,139,250,0.3), transparent)",
        }}
      />

      {/* ══ BODY ══════════════════════════════════════════════════════ */}
      <main
        className="main-container"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "96px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── 01 · BERUFSERFAHRUNG ────────────────────────────────── */}
        <section style={{ marginBottom: "96px" }}>
          <motion.div {...risev(0)}>
            <SecHead
              num="01"
              title={t(
                "Berufserfahrung & Praktikum",
                "Professional Experience",
              )}
            />
          </motion.div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px",
            }}
            className="grid-2-1"
          >
            {EXPERIENCES.map((exp, i) => (
              <motion.div key={exp.company} {...risev(i)}>
                <GC
                  style={{
                    padding: "28px",
                    height: "100%",
                    borderTop: `2px solid ${exp.color}`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* watermark */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -16,
                      right: -10,
                      opacity: 0.04,
                      fontSize: "110px",
                      pointerEvents: "none",
                      fontFamily: "var(--font-mono,monospace)",
                      fontWeight: 900,
                      lineHeight: 1,
                    }}
                  >
                    ⟨/⟩
                  </div>
                  <div style={{ marginBottom: "18px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: exp.color,
                      }}
                    >
                      {exp.type} · {exp.period}
                    </span>
                    <h3
                      style={{
                        margin: "8px 0 4px",
                        fontSize: "17px",
                        fontWeight: 800,
                        color: "#f1f5f9",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {exp.role}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: exp.color,
                        }}
                      >
                        {exp.company}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.38)",
                        }}
                      >
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <ul
                    style={{
                      margin: "0 0 20px",
                      padding: 0,
                      listStyle: "none",
                    }}
                  >
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginBottom: "8px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            color: exp.color,
                            fontSize: "11px",
                            marginTop: "3px",
                            flexShrink: 0,
                          }}
                        >
                          ▸
                        </span>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "rgba(255,255,255,0.6)",
                            lineHeight: 1.65,
                          }}
                        >
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                  >
                    {exp.tech.map((tt) => (
                      <Pill key={tt} label={tt} color={exp.color} />
                    ))}
                  </div>
                </GC>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 02 · PROJEKTE ───────────────────────────────────────── */}
        <section style={{ marginBottom: "96px" }}>
          <motion.div {...risev(0)}>
            <SecHead
              num="02"
              title={t("Kernprojekte & ROI", "Core Projects & ROI")}
            />
          </motion.div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {PROJECTS.map((proj, i) => (
              <motion.div key={proj.num} {...risev(i)}>
                <GC style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      height: "2px",
                      background: `linear-gradient(to right, ${proj.accent}, ${proj.accent}44, transparent)`,
                    }}
                  />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "100px 1fr 1fr",
                      gap: 0,
                    }}
                    className="project-grid"
                  >
                    {/* KPI with ring */}
                    <div
                      style={{
                        borderRight: "1px solid rgba(255,255,255,0.07)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "24px 12px",
                        gap: "6px",
                        background: `${proj.accent}06`,
                      }}
                    >
                      <RingChart
                        pct={proj.kpi === "PROD" ? 100 : parseInt(proj.kpi)}
                        color={proj.accent}
                        size={54}
                        stroke={4}
                      />
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            fontFamily: "var(--font-mono,monospace)",
                            fontSize: "12px",
                            fontWeight: 900,
                            color: proj.accent,
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {proj.kpi}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono,monospace)",
                            fontSize: "8px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.35)",
                            marginTop: "2px",
                          }}
                        >
                          {proj.kpiSub}
                        </div>
                      </div>
                    </div>

                    {/* description */}
                    <div
                      style={{
                        padding: "26px",
                        borderRight: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "10px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono,monospace)",
                            fontSize: "9px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.3)",
                          }}
                        >
                          {proj.num}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono,monospace)",
                            fontSize: "9px",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            letterSpacing: "0.07em",
                            background: `${proj.accent}12`,
                            color: proj.accent,
                            border: `1px solid ${proj.accent}25`,
                          }}
                        >
                          {proj.tag}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: "17px",
                          fontWeight: 800,
                          color: "#f1f5f9",
                          letterSpacing: "-0.025em",
                          margin: "0 0 10px",
                        }}
                      >
                        {proj.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.58)",
                          lineHeight: 1.78,
                          margin: "0 0 16px",
                        }}
                      >
                        {t(proj.de, proj.en)}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                        }}
                      >
                        {proj.tech.map((tt) => (
                          <Pill key={tt} label={tt} color={proj.accent} />
                        ))}
                      </div>
                    </div>

                    {/* method + challenge */}
                    <div style={{ padding: "26px" }}>
                      <div style={{ marginBottom: "22px" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono,monospace)",
                            fontSize: "8px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#3b82f6",
                          }}
                        >
                          {t("METHODIK", "METHODOLOGY")}
                        </span>
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          {proj.method.map((m) => (
                            <div
                              key={m}
                              style={{
                                display: "flex",
                                gap: "7px",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color: "rgba(59,130,246,0.6)",
                                  fontSize: "10px",
                                }}
                              >
                                ▹
                              </span>
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "rgba(255,255,255,0.58)",
                                }}
                              >
                                {m}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span
                          style={{
                            fontFamily: "var(--font-mono,monospace)",
                            fontSize: "8px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#a78bfa",
                          }}
                        >
                          {t("HERAUSFORDERUNG", "CHALLENGE")}
                        </span>
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          {proj.challenge.map((ch) => (
                            <div
                              key={ch}
                              style={{
                                display: "flex",
                                gap: "7px",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color: "rgba(167,139,250,0.6)",
                                  fontSize: "10px",
                                }}
                              >
                                ▹
                              </span>
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "rgba(255,255,255,0.58)",
                                }}
                              >
                                {ch}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </GC>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 03 · TECH STACK ─────────────────────────────────────── */}
        <section style={{ marginBottom: "96px" }}>
          <motion.div {...risev(0)}>
            <SecHead
              num="03"
              title={t(
                "Tech Stack & Infrastruktur",
                "Tech Stack & Infrastructure",
              )}
            />
          </motion.div>
          <div
            className="grid-4-2-1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "16px",
            }}
          >
            {SKILLS.map((sk, i) => {
              const Ic = sk.icon;
              return (
                <motion.div key={sk.label} {...risev(i)}>
                  <GC
                    style={{
                      padding: "22px 18px",
                      height: "100%",
                      borderTop: `2px solid ${sk.star ? sk.color : "rgba(255,255,255,0.07)"}`,
                      position: "relative",
                    }}
                  >
                    {sk.star && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                        }}
                      >
                        <Star
                          size={10}
                          style={{ color: sk.color, fill: sk.color }}
                        />
                      </div>
                    )}
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: `${sk.color}12`,
                        border: `1px solid ${sk.color}22`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: sk.color,
                        marginBottom: "14px",
                      }}
                    >
                      <Ic size={16} />
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#f1f5f9",
                        marginBottom: "14px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {sk.label}
                    </div>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
                    >
                      {sk.items.map((item) => (
                        <Pill key={item} label={item} color={sk.color} />
                      ))}
                    </div>
                  </GC>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── 04 · SPRACHEN ───────────────────────────────────────── */}
        <section style={{ marginBottom: "96px" }}>
          <motion.div {...risev(0)}>
            <SecHead
              num="04"
              title={t("Sprachkenntnisse", "Language Skills")}
            />
          </motion.div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
            className="grid-2-1"
          >
            {LANGUAGES.map((l, i) => (
              <motion.div key={l.name} {...risev(i)}>
                <GC style={{ padding: "22px 24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#f1f5f9",
                      }}
                    >
                      {l.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: "11px",
                        color: l.color,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {l.lvl}
                    </span>
                  </div>
                  <SegBar pct={l.pct} color={l.color} />
                </GC>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 05 · ZERTIFIKATE ────────────────────────────────────── */}
        <section style={{ marginBottom: "96px" }}>
          <motion.div {...risev(0)}>
            <SecHead
              num="05"
              title={t("Zertifikate & Abschlüsse", "Certificates & Degrees")}
            />
          </motion.div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "16px",
            }}
            className="grid-2-1"
          >
            {CERTS.map((cert, i) => (
              <motion.a
                key={cert.title}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                {...risev(i)}
                style={{ textDecoration: "none", display: "block" }}
              >
                <GC
                  style={{
                    padding: "22px",
                    height: "100%",
                    borderLeft: `3px solid ${cert.color}`,
                    borderRadius: "0 16px 16px 0",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "9px",
                          background: `${cert.color}10`,
                          border: `1px solid ${cert.color}22`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "17px",
                        }}
                      >
                        {cert.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono,monospace)",
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: cert.color,
                          }}
                        >
                          {cert.type}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono,monospace)",
                            fontSize: "9px",
                            color: "rgba(255,255,255,0.38)",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {cert.date}
                        </div>
                      </div>
                    </div>
                    <CheckCircle
                      size={14}
                      style={{ color: cert.color, flexShrink: 0 }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "13.5px",
                      fontWeight: 700,
                      color: "#f1f5f9",
                      marginBottom: "10px",
                      lineHeight: 1.4,
                    }}
                  >
                    {cert.title}
                  </div>
                  <div
                    style={{
                      background: "rgba(0,0,0,0.22)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: "8px",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: cert.color,
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      {t("DE-KONTEXT:", "DE CONTEXT:")}
                    </span>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "11.5px",
                        color: "rgba(255,255,255,0.42)",
                        lineHeight: 1.65,
                      }}
                    >
                      {cert.desc}
                    </p>
                  </div>
                </GC>
              </motion.a>
            ))}
            <motion.div
              {...risev(4)}
              style={{
                gridColumn: "span 2",
                border: "1px dashed rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono,monospace)",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.28)",
                  letterSpacing: "0.12em",
                }}
              >
                //{" "}
                {t(
                  "Weitere Zertifikate in Bearbeitung",
                  "More certificates coming soon",
                )}
              </span>
            </motion.div>
          </div>
        </section>

        {/* ── 06 · WARUM ICH ──────────────────────────────────────── */}
        <section style={{ marginBottom: "96px" }}>
          <motion.div {...risev(0)}>
            <SecHead
              num="06"
              title={t("Warum ich? · Mehrwert", "Why Me? · Value")}
            />
          </motion.div>
          <div
            className="grid-4-2-1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "16px",
            }}
          >
            {WHY.map((m, i) => (
              <motion.div key={m.t} {...risev(i)}>
                <GC
                  style={{
                    padding: "22px",
                    height: "100%",
                    borderTop: `2px solid ${m.color}40`,
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "12px" }}>
                    {m.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#f1f5f9",
                      marginBottom: "8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {m.t}
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.42)",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {t(m.de, m.en)}
                  </p>
                </GC>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 07 · DOKUMENTE ──────────────────────────────────────── */}
        <section>
          <motion.div {...risev(0)}>
            <SecHead
              num="07"
              title={t("Dokumente & Kontakt", "Documents & Contact")}
            />
          </motion.div>
          <motion.div
            {...risev(1)}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "14px",
              marginBottom: "24px",
            }}
            className="grid-3-2-1"
          >
            {[
              {
                label: t("Lebenslauf / CV", "Curriculum Vitae"),
                sub: "PDF · 2025–2026",
                file: "/cv/Abdelhay_Mallouli_CV.pdf",
                color: "#3b82f6",
              },
              {
                label: t("Full-Stack Diplom", "Full-Stack Diploma"),
                sub: "PDF · OFPPT Solicode",
                file: "/certificates/Certificate_Solicode_Tangier_Redacted.pdf",
                color: "#a78bfa",
              },
              {
                label: t("Udemy Zertifikate", "Udemy Certificates"),
                sub: "PDF · Cloud/React/QA",
                file: "#",
                color: "#34d399",
              },
            ].map((item) => (
              <a
                key={String(item.label)}
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <GC
                  style={{
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    borderLeft: `2px solid ${item.color}50`,
                    borderRadius: "0 12px 12px 0",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: `${item.color}10`,
                      border: `1px solid ${item.color}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FileText size={14} style={{ color: item.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#f1f5f9",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: "9px",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.06em",
                        marginTop: "2px",
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                  <ExternalLink
                    size={12}
                    style={{ color: "rgba(255,255,255,0.28)", flexShrink: 0 }}
                  />
                </GC>
              </a>
            ))}
          </motion.div>

          <motion.div
            {...risev(2)}
            style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
          >
            {[
              {
                href: "/cv/Abdelhay_Mallouli_CV.pdf",
                Icon: Download,
                label: t("Lebenslauf herunterladen", "Download CV"),
                primary: true,
              },
              {
                href: "https://linkedin.com/in/abdelhaymallouli",
                Icon: Linkedin,
                label: "LinkedIn",
              },
              {
                href: "https://github.com/abdelhaymallouli",
                Icon: Github,
                label: "GitHub",
              },
              {
                href: "https://www.abdelhaymallouli.com",
                Icon: Globe,
                label: "Portfolio",
              },
            ].map(({ href, Icon, label, primary }) => (
              <a
                key={String(label)}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: primary ? "11px 22px" : "10px 17px",
                  borderRadius: "10px",
                  background: primary ? "#3b82f6" : "rgba(255,255,255,0.032)",
                  backdropFilter: primary ? "none" : "blur(20px) saturate(1.8)",
                  border: primary ? "none" : "1px solid rgba(255,255,255,0.07)",
                  color: primary ? "white" : "rgba(255,255,255,0.5)",
                  fontWeight: 700,
                  fontSize: "12px",
                  textDecoration: "none",
                  boxShadow: primary
                    ? "0 0 28px rgba(59,130,246,0.3), 0 0 60px rgba(59,130,246,0.08)"
                    : "none",
                  letterSpacing: "-0.01em",
                }}
              >
                <Icon size={13} />
                {label}
              </a>
            ))}
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "24px 40px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono,monospace)",
            fontSize: "10px",
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.14em",
          }}
        >
          // Abdelhay Mallouli · Bewerbung 2025/2026 · Tanger, Marokko ·{" "}
          <span style={{ color: "#3b82f6" }}>abdelhaymallouli.com</span>
        </span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700;800;900&family=Geist+Mono:wght@400;600;700&display=swap');
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(0.75)} }
        * { box-sizing: border-box; }
        body { margin: 0; }
        a { transition: opacity 0.18s; }
        a:hover { opacity: 0.82; }
        @media (max-width: 960px) {
          .photo-panel { display: none !important; }
          .hero-content { padding: 80px 24px 60px !important; }
          .mobile-hero-frame { display: flex !important; }
          .grid-2-1 { grid-template-columns: 1fr !important; }
          .grid-4-2-1 { grid-template-columns: repeat(2,1fr) !important; }
          .grid-3-2-1 { grid-template-columns: repeat(2,1fr) !important; }
          .project-grid { grid-template-columns: 1fr !important; }
          .main-container { padding: 60px 24px !important; }
        }
        @media (max-width: 640px) {
          .grid-4-2-1, .grid-3-2-1 { grid-template-columns: 1fr !important; }
          .hero-content h2 { font-size: 32px !important; }
          nav { padding: 0 16px !important; }
          nav div span:last-child { display: none; }
        }
      `}</style>
    </div>
  );
}
