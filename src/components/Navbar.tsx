"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ME } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-black tracking-tighter text-2xl italic text-[var(--foreground)] uppercase z-50 relative">
          {ME.name.split(" ")[0]}
          <span className="text-accent">.{ME.name.split(" ")[1][0]}</span>
        </span>

        <div className="flex items-center gap-8">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-[var(--card-border)] hover:border-accent/50 transition-all text-[var(--foreground)] z-50 relative"
          >
            {!mounted ? (
              <div className="w-5 h-5" />
            ) : theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-[var(--card-border)] hover:border-accent/50 transition-all text-[var(--foreground)] z-50 relative"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[var(--background)] z-40 flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {[
                { name: "Projects", href: "#projects" },
                { name: "Experience", href: "#experience" },
                { name: "Contact", href: "#contact" },
              ].map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-4xl font-black tracking-tighter hover:text-accent transition-colors text-[var(--foreground)]"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
