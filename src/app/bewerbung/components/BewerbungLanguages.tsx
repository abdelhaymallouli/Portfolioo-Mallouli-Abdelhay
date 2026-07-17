"use client";

import React from "react";
import { motion } from "framer-motion";
import { LANGUAGES } from "@/data/bewerbung";
import { GC, SecHead, SegBar, risev } from "./shared/BewerbungUI";

export function BewerbungLanguages({ lang }: { lang: string }) {
  const t = (de: string, en: string) => (lang === "de" ? de : en);

  return (
    <section style={{ marginBottom: "96px" }}>
      <motion.div {...risev(0)}>
        <SecHead num="05" title={t("Sprachkenntnisse", "Language Skills")} />
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
  );
}
