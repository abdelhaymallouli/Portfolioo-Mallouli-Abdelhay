"use client";

import React from "react";
import { motion } from "framer-motion";
import { WHY } from "@/data/bewerbung";
import { GC, SecHead, risev } from "./shared/BewerbungUI";

export function BewerbungWhyMe({ lang }: { lang: string }) {
  const t = (de: string, en: string) => (lang === "de" ? de : en);

  return (
    <section style={{ marginBottom: "96px" }}>
      <motion.div {...risev(0)}>
        <SecHead
          num="01"
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
  );
}
