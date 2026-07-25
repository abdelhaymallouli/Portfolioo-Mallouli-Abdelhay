"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/bewerbung";
import { GC, SecHead, Pill, RingChart, risev } from "./shared/BewerbungUI";

export function BewerbungProjects({ lang }: { lang: string }) {
  const t = (de: string, en: string) => (lang === "de" ? de : en);
  const colors = ["#c9a227", "#a1a1aa", "#10b981", "#fbbf24", "#f43f5e"];

  return (
    <section style={{ marginBottom: "96px" }}>
      <motion.div {...risev(0)}>
        <SecHead
          num="03"
          title={t("Kernprojekte & ROI", "Core Projects & ROI")}
        />
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {PROJECTS.map((proj, i) => {
          const accent = colors[i % colors.length];
          const kpiNumberMatch = proj.kpi ? proj.kpi.match(/\d+/) : null;
          const kpiValue = kpiNumberMatch ? parseInt(kpiNumberMatch[0]) : 100;
          
          return (
          <motion.div key={proj.id} {...risev(i)}>
            <GC style={{ overflow: "hidden" }}>
              <div
                style={{
                  height: "2px",
                  background: `linear-gradient(to right, ${accent}, ${accent}44, transparent)`,
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
                    background: `${accent}06`,
                  }}
                >
                  <RingChart
                    pct={kpiValue}
                    color={accent}
                    size={54}
                    stroke={4}
                  />
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: "10px",
                        fontWeight: 900,
                        color: accent,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {proj.kpi || "N/A"}
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
                      0{proj.id}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: "9px",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        letterSpacing: "0.07em",
                        background: `${accent}12`,
                        color: accent,
                        border: `1px solid ${accent}25`,
                      }}
                    >
                      {proj.status || "Completed"}
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
                  {proj.image && (
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        marginBottom: "16px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <img
                        src={proj.image}
                        alt={proj.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top", // anchors image to the top
                          opacity: 0.85,
                        }}
                      />
                    </div>
                  )}
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.58)",
                      lineHeight: 1.78,
                      margin: "0 0 16px",
                    }}
                  >
                    {proj.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                    }}
                  >
                    {proj.tech.map((tt) => (
                      <Pill key={tt} label={tt} color={accent} />
                    ))}
                  </div>
                </div>

                {/* method + challenge + solutions */}
                <div style={{ padding: "26px" }}>
                  {(proj.methodologies && proj.methodologies.length > 0) && (
                  <div style={{ marginBottom: "22px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: "8px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#c9a227",
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
                      {proj.methodologies.map((m) => (
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
                              color: "rgba(201,162,39,0.6)",
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
                  )}
                  
                  {(proj.technicalChallenges && proj.technicalChallenges.length > 0) && (
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: "8px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#a1a1aa",
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
                      {proj.technicalChallenges.map((ch) => (
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
                  )}
                </div>
              </div>
            </GC>
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}
