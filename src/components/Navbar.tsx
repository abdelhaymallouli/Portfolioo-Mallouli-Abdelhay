"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Home, Briefcase, Mail, Code2 } from "lucide-react";
import { useEffect, useState, memo } from "react";
import { ME } from "@/data/portfolio";
import Link from "next/link";
import { motion } from "framer-motion";

const NavItem = ({
  href,
  icon: Icon,
  label,
  mobileOnly = false,
}: {
  href: string;
  icon: any;
  label: string;
  mobileOnly?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-1 p-2 text-[var(--muted)] hover:text-accent transition-colors ${mobileOnly ? "flex md:hidden" : "flex"}`}
    >
      <Icon size={20} strokeWidth={2.5} />
      <span className="text-[10px] font-bold tracking-tighter uppercase md:hidden">
        {label}
      </span>
      <span className="hidden md:inline text-sm font-bold ml-2">{label}</span>
    </Link>
  );
};

const NavbarContent = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* DESKTOP TOP NAV */}
      <nav className="hidden md:flex fixed top-0 w-full z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 w-full flex items-center justify-between">
          <Link
            href="/"
            className="font-black tracking-tighter text-2xl italic text-[var(--foreground)] uppercase z-50 relative group"
          >
            {ME.name.split(" ")[0]}
            <span className="text-accent group-hover:opacity-80 transition-opacity">
              .{ME.name.split(" ")[1][0]}
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <NavItem href="/#projects" icon={Code2} label="Projects" />
              <NavItem
                href="/#experience"
                icon={Briefcase}
                label="Experience"
              />
              <NavItem href="/#contact" icon={Mail} label="Contact" />
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 rounded-2xl bg-[var(--card)] border border-[var(--card-border)] hover:border-accent/50 transition-all text-[var(--foreground)] z-50 relative flex items-center justify-center pointer-events-auto"
              aria-label="Toggle Theme"
            >
              {!mounted ? (
                <div className="w-5 h-5 flex shrink-0" />
              ) : theme === "dark" ? (
                <Sun size={20} strokeWidth={2.5} className="shrink-0" />
              ) : (
                <Moon size={20} strokeWidth={2.5} className="shrink-0" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE iOS-STYLE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm pointer-events-none">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex items-center justify-between px-6 py-3 bg-[var(--card)]/90 backdrop-blur-2xl border border-[var(--card-border)] rounded-full shadow-2xl pointer-events-auto shadow-black/10 dark:shadow-white/5"
        >
          <NavItem href="/" icon={Home} label="Home" mobileOnly />
          <NavItem href="/#projects" icon={Code2} label="Work" />
          <NavItem href="/#experience" icon={Briefcase} label="Career" />

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex flex-col items-center justify-center gap-1 p-2 text-[var(--muted)] hover:text-accent transition-colors shrink-0"
            aria-label="Toggle Theme"
          >
            {!mounted ? (
              <div className="w-5 h-5 mb-1" />
            ) : theme === "dark" ? (
              <Sun size={20} strokeWidth={2.5} />
            ) : (
              <Moon size={20} strokeWidth={2.5} />
            )}
            <span className="text-[10px] font-bold tracking-tighter uppercase whitespace-nowrap overflow-hidden">
              Theme
            </span>
          </button>
        </motion.nav>
      </div>
    </>
  );
};

// Wrap in React.memo to prevent re-renders when 3D scene updates or user scrolls
export default memo(NavbarContent);
