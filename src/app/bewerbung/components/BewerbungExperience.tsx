"use client";

import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCES } from "@/data/bewerbung";
import { GC, SecHead, Pill, risev } from "./shared/BewerbungUI";

export function BewerbungExperience({ lang }: { lang: string }) {
  const t = (de: string, en: string) => (lang === "de" ? de : en);

  return (
    <section style={{ marginBottom: "96px" }}>
      <motion.div {...risev(0)}>
        <SecHead
          num="02"
          title={t("Berufserfahrung & Praktikum", "Professional Experience")}
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
          <motion.div key={exp.id} {...risev(i)}>
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
                  {typeof exp.role === "string"
                    ? exp.role
                    : t(exp.role.de, exp.role.en)}
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

              {exp.description && (
                <p
                  style={{
                    margin: "0 0 20px",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}
                >
                  {t(exp.description.de, exp.description.en)}
                </p>
              )}

              <ul
                style={{
                  margin: "0 0 20px",
                  padding: 0,
                  listStyle: "none",
                }}
              >
                {(Array.isArray(exp.highlights)
                  ? exp.highlights
                  : (lang === "de" ? exp.highlights.de : exp.highlights.en)
                ).map((h: string) => (
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
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {exp.tech.map((tt) => (
                  <Pill key={tt} label={tt} color={exp.color} />
                ))}
              </div>
            </GC>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
