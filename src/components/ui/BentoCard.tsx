"use client";
import { motion } from "framer-motion";
import { ReactNode, memo } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const BentoCardContent = ({
  children,
  className,
  delay = 0,
}: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
      className={cn(
        "relative overflow-hidden bg-[var(--card)] border border-[var(--card-border)] rounded-3xl p-8 transition-all duration-300",
        "hover:border-accent/40 hover:shadow-xl group",
        "backdrop-blur-xl bg-white/5 dark:bg-black/20", // Glassmorphism 2.0
        className,
      )}
    >
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col pointer-events-auto">
        {children}
      </div>
    </motion.div>
  );
};

export const BentoCard = memo(BentoCardContent);
