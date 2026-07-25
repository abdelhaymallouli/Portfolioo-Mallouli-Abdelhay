"use client";

import React from "react";
import { motion } from "framer-motion";
import { CERTS } from "@/data/bewerbung";
import { CheckCircle, Folder } from "lucide-react";
import { GC, SecHead, risev } from "./shared/BewerbungUI";

export function BewerbungCertificates({ lang }: { lang: string }) {
  const t = (de: string, en: string) => (lang === "de" ? de : en);

  return (
    <section style={{ marginBottom: "96px" }}>
      <motion.div {...risev(0)}>
        <SecHead
          num="06"
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Folder size={18} style={{ color: "#c9a227" }} />
              <span>
                {t("Zertifikate & Abschlüsse", "Certificates & Degrees")}
              </span>
            </div>
          }
        />
      </motion.div>

      {/* Directory Tab Header */}
      <motion.div
        {...risev(1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(201,162,39,0.08)",
          border: "1px solid rgba(201,162,39,0.15)",
          borderBottom: "none",
          borderRadius: "8px 8px 0 0",
          padding: "8px 14px",
          width: "fit-content",
          fontFamily: "var(--font-mono,monospace)",
          fontSize: "9px",
          color: "#c9a227",
          letterSpacing: "0.1em",
          zIndex: 1,
          position: "relative",
          marginBottom: "-1px",
        }}
      >
        <Folder size={10} />
        /ASSETS/CERTIFICATES/VALIDATED
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "16px",
          padding: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.01)",
          borderRadius: "0 12px 12px 12px",
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
                padding: "0",
                height: "100%",
                borderLeft: `4px solid ${cert.color}`,
                borderRadius: "0 16px 16px 0",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                transition: "transform 0.2s, background 0.2s",
              }}
              className="cert-card-hover"
            >
              {/* Image Preview Header */}
              {cert.image && (
                <div
                  style={{
                    height: "120px",
                    width: "100%",
                    position: "relative",
                    background: "rgba(0,0,0,0.3)",
                    overflow: "hidden",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.6,
                      filter: "brightness(0.8) contrast(1.2) grayscale(0.5)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(to bottom, transparent, rgba(15,23,42,0.9))`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "rgba(15,23,42,0.8)",
                      backdropFilter: "blur(8px)",
                      border: `1px solid ${cert.color}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cert.icon}
                  </div>
                </div>
              )}

              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: "9px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: cert.color,
                        fontWeight: 700,
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
                  <CheckCircle
                    size={14}
                    style={{ color: cert.color, flexShrink: 0 }}
                  />
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#f1f5f9",
                    marginBottom: "14px",
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cert.title}
                </div>

                {/* DE-KONTEXT BRIDGE */}
                <div
                  style={{
                    background: `${cert.color}08`,
                    border: `1px solid ${cert.color}15`,
                    borderRadius: "10px",
                    padding: "12px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        opacity: 0.8,
                      }}
                    >
                      🇩🇪
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono,monospace)",
                        fontSize: "8.5px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: cert.color,
                        fontWeight: 700,
                      }}
                    >
                      {t("DE-KONTEXT", "DE CONTEXT")}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      color: "rgba(241,245,249,0.7)",
                      lineHeight: 1.6,
                      fontWeight: 450,
                    }}
                  >
                    {cert.desc}
                  </p>
                </div>

                {/* Download Indication */}
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "10px",
                    color: cert.color,
                    fontWeight: 600,
                    fontFamily: "var(--font-mono,monospace)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    opacity: 0.7,
                  }}
                >
                  <span>→</span>
                  <span>{t("Dokument ansehen", "View Document")}</span>
                </div>
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
  );
}
