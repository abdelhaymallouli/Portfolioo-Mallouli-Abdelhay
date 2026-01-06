"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-black tracking-tighter text-2xl italic text-[var(--foreground)] uppercase">
          Dev.Sys
        </span>
        
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-[var(--card-border)] hover:border-accent/50 transition-all text-[var(--foreground)]"
          >
            {!mounted ? <div className="w-5 h-5" /> : theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}