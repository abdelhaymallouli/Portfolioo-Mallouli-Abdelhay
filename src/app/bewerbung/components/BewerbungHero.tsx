"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Globe, Github, Linkedin, Mail, Phone } from "lucide-react";
import { STATS } from "@/data/bewerbung";
import { RingChart, GC, rise } from "./shared/BewerbungUI";

export function BewerbungHero({ lang }: { lang: string }) {
  const t = (de: string, en: string) => (lang === "de" ? de : en);

  return (
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
          position: "fixed",
          left: 0,
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
              color: "#c9a227",
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
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                <Icon size={11} style={{ color: "#c9a227", flexShrink: 0 }} />
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
          padding: "120px 56px 80px 516px",
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
                  "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(201,162,39,0.1)",
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
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
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
              background: "rgba(201,162,39,0.08)",
              border: "1px solid rgba(201,162,39,0.22)",
              borderRadius: "6px",
              padding: "6px 14px",
              marginBottom: "36px",
              fontFamily: "var(--font-mono,monospace)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#c9a227",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#c9a227",
                display: "inline-block",
              }}
            />
            {t("Bewerbung · Fachinformatiker", "Application · IT Specialist")}
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
            {lang === "de" ? (
              <>
                <span style={{ color: "#c9a227" }}>Architektur</span> denken,
                <br />
                <span style={{ color: "#a1a1aa" }}>Lösungen</span> finden,
                <br />
                <span style={{ color: "#10b981" }}>Teamarbeit</span> leben.
              </>
            ) : (
              <>
                <span style={{ color: "#c9a227" }}>Architecture</span> first,
                <br />
                <span style={{ color: "#a1a1aa" }}>Solutions</span> found,
                <br />
                <span style={{ color: "#10b981" }}>Teamwork</span> driven.
              </>
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
              maxWidth: "600px",
              padding: "22px 26px",
              background: "rgba(15,23,42,0.65)",
              backdropFilter: "blur(20px) saturate(1.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderLeft: "3px solid #c9a227",
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
              {lang === "de" ? (
                <span>
                  <strong style={{ color: "#f1f5f9", fontWeight: 800 }}>
                    "Technologie-Enthusiast mit dem Fokus auf Clean Architecture
                    & Agile Workflows."
                  </strong>
                  <br />
                  <br />
                  Ich entwickle nicht nur Code – ich gestalte nachhaltige
                  digitale Infrastrukturen. Mit zwei Jahren intensiver Praxis
                  bei Solicode und Praxiserfahrung aus der Remote-Zusammenarbeit
                  tiefes Verständnis für{" "}
                  <strong style={{ color: "#c9a227" }}>
                    Teamarbeit
                  </strong> und{" "}
                  <strong style={{ color: "#a1a1aa" }}>
                    lösungsorientiertes Denken
                  </strong>{" "}
                  mit. Mein Ziel: Als angehender Fachinformatiker Ihre
                  Systemlandschaft mit Präzision und Eigeninitiative zu
                  verstärken.
                </span>
              ) : (
                <span>
                  <strong style={{ color: "#f1f5f9", fontWeight: 800 }}>
                    "Technology enthusiast with a focus on Clean Architecture &
                    Agile Workflows."
                  </strong>
                  <br />
                  <br />I don’t just develop code – I design sustainable digital
                  infrastructures. With two years of intensive practice at
                  Solicode and practical experience from remote collaboration
                  during my internship at pragmatic minds, I bring a deep
                  understanding of{" "}
                  <strong style={{ color: "#c9a227" }}>
                    teamwork
                  </strong> and{" "}
                  <strong style={{ color: "#a1a1aa" }}>
                    solution-oriented thinking
                  </strong>
                  . My goal: To strengthen your system landscape with precision
                  and initiative as an aspiring IT specialist.
                </span>
              )}
            </p>
          </div>
        </motion.div>

        {/* ── STAT CARDS with ring charts ─────────────────────────── */}
        <div
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
                  {s.label.split("\n").map((line: string, j: number) => (
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
        </div>

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
              background: "#c9a227",
              color: "white",
              fontWeight: 700,
              fontSize: "13px",
              textDecoration: "none",
              boxShadow:
                "0 0 30px rgba(201,162,39,0.28), 0 0 60px rgba(201,162,39,0.08)",
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
  );
}
