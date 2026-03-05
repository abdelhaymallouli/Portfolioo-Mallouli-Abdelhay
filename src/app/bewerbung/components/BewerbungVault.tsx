"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  Linkedin,
  Github,
  Globe,
  FileText,
  ExternalLink,
} from "lucide-react";
import { GC, SecHead, risev } from "./shared/BewerbungUI";

export function BewerbungVault({ lang }: { lang: string }) {
  const t = (de: string, en: string) => (lang === "de" ? de : en);

  return (
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
            label: t("Web Developer Zertifikat", "Web Developer Certificate"),
            sub: "PDF · 2024–2025",
            file: "/certificates/Web_Developer_Certificate.pdf",
            color: "#3b82f6",
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
  );
}
