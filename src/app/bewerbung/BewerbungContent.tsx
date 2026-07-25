"use client";

import React, { useState, useEffect } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { Languages as LangIcon } from "lucide-react";

// Components
import { BewerbungHero } from "./components/BewerbungHero";
import { BewerbungExperience } from "./components/BewerbungExperience";
import { BewerbungProjects } from "./components/BewerbungProjects";
import { BewerbungSkills } from "./components/BewerbungSkills";
import { BewerbungLanguages } from "./components/BewerbungLanguages";
import { BewerbungCertificates } from "./components/BewerbungCertificates";
import { BewerbungWhyMe } from "./components/BewerbungWhyMe";
import { BewerbungVault } from "./components/BewerbungVault";

export default function BewerbungContent() {
  const [lang, setLang] = useState<"de" | "en">("de");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => setLang((prev) => (prev === "de" ? "en" : "de"));

  return (
    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "#f1f5f9",
        fontFamily: "var(--font-sans, sans-serif)",
        overflowX: "hidden",
      }}
    >
      {/* ── NAVIGATION ────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 100,
          padding: "24px 40px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "20px",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        <m.button
          onClick={toggleLang}
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: isScrolled
              ? "rgba(15, 23, 42, 0.8)"
              : "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "100px",
            color: "#f1f5f9",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "var(--font-mono, monospace)",
            letterSpacing: "0.05em",
            boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
            transition: "all 0.3s ease",
          }}
          whileHover={{ scale: 1.05, background: "rgba(201,162,39, 0.15)" }}
          whileTap={{ scale: 0.95 }}
        >
          <LangIcon size={14} style={{ color: "#c9a227" }} />
          <span style={{ opacity: lang === "de" ? 1 : 0.4 }}>DE</span>
          <span style={{ opacity: 0.2 }}>/</span>
          <span style={{ opacity: lang === "en" ? 1 : 0.4 }}>EN</span>
        </m.button>
      </nav>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Hero Section (Always full width/height) */}
        <BewerbungHero lang={lang} />

        {/* Content Sections Area */}
        <div
          style={{
            flex: 1,
            padding: "0 56px 120px 516px", // Adjusted padding to account for sticky photo panel in Hero
            maxWidth: "1600px",
          }}
          className="content-container"
        >
          <BewerbungWhyMe lang={lang} />
          <BewerbungExperience lang={lang} />
          <BewerbungProjects lang={lang} />
          <BewerbungSkills lang={lang} />
          <BewerbungLanguages lang={lang} />
          <BewerbungCertificates lang={lang} />
          <BewerbungVault lang={lang} />
        </div>
      </div>

      {/* Global CSS for layout adjustments */}
      <style jsx global>{`
        @media (max-width: 1100px) {
          .photo-panel {
            display: none !important;
          }
          .mobile-hero-frame {
            display: flex !important;
          }
          .content-container {
            padding: 80px 24px 100px !important;
          }
          .hero-content {
            padding: 100px 24px 60px !important;
          }
        }

        @media (max-width: 900px) {
          .grid-2-1 {
            grid-template-columns: 1fr !important;
          }
          .grid-3-2-1 {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .grid-4-2-1 {
            grid-template-columns: 1fr !important;
          }
          .grid-3-2-1 {
            grid-template-columns: 1fr !important;
          }
          .project-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
