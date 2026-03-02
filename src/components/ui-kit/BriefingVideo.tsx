"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Terminal } from "lucide-react";

export default function BriefingVideo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ── THUMBNAIL ──────────────────────────────────────────────────── */}
      <motion.div
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        onClick={() => setIsOpen(true)}
        className="relative aspect-video w-full max-w-2xl mx-auto rounded-2xl overflow-hidden
                   cursor-pointer glass group"
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(var(--card-border) 1px, transparent 1px), linear-gradient(90deg, var(--card-border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* Gradient fill */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[--background] via-[--card] to-accent/15" />

        {/* Hover tint */}
        <div className="absolute inset-0 bg-accent/6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center
                       shadow-[0_0_40px_rgba(59,130,246,0.5)] group-hover:scale-110
                       transition-transform duration-500"
          >
            <Play size={22} className="ml-1" />
          </div>
        </div>

        {/* Meta strip */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
          <div>
            <span
              className="label-mono text-accent border border-accent/20 bg-black/50
                         backdrop-blur-md px-2 py-1 rounded-md mb-2 inline-block"
            >
              [KANDIDATEN-VIDEO]
            </span>
            <p className="text-white font-bold text-[15px] tracking-tight drop-shadow-md">
              Abdelhay Mallouli · Intro.mp4
            </p>
          </div>
          <span
            className="label-mono text-white/60 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md"
          >
            01:45
          </span>
        </div>
      </motion.div>

      {/* ── MODAL ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal box */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-[--background] rounded-2xl overflow-hidden
                         border border-[--card-border] shadow-[0_0_60px_rgba(59,130,246,0.12)] z-10"
            >
              {/* Modal header bar */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/70 to-transparent
                              flex justify-between items-center px-6 z-20">
                <div className="flex items-center gap-2 text-accent">
                  <Terminal size={13} />
                  <span className="label-mono">System Boot // Video Playback</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[--muted] hover:text-[--foreground] transition-colors p-2 rounded-lg
                             hover:bg-white/8"
                >
                  <X size={18} />
                </button>
              </div>

              {/* CRT scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
                }}
              />

              {/* Content area — replace with your <iframe> or <video> */}
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <p className="label-mono text-accent animate-pulse tracking-[0.3em]">
                  [ Verbindung wird hergestellt... ]
                </p>
                <p className="label-mono text-[--muted]">
                  // Hier kommt dein YouTube-iframe oder &lt;video&gt;-Element rein
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}