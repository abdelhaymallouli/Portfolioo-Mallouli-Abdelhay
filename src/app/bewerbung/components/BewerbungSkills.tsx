"use client";

import React from "react";
import { motion } from "framer-motion";
import { SKILLS } from "@/data/bewerbung";
import { Star } from "lucide-react";
import { GC, SecHead, Pill, risev } from "./shared/BewerbungUI";

export function BewerbungSkills({ lang }: { lang: string }) {
  const t = (de: string, en: string) => (lang === "de" ? de : en);

  return (
    <section style={{ marginBottom: "96px" }}>
      <motion.div {...risev(0)}>
        <SecHead
          num="04"
          title={t("Tech Stack & Infrastruktur", "Tech Stack & Infrastructure")}
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
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
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
  );
}
