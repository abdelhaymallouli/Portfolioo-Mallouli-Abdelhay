"use client";
import { memo, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TechIconProps {
  icon: ReactNode;
  className?: string;
  wrapperClassName?: string;
}

const TechIconContent = ({
  icon,
  className,
  wrapperClassName,
}: TechIconProps) => {
  return (
    <div
      className={cn(
        "p-3 rounded-2xl border border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-sm shadow-sm flex items-center justify-center transition-transform hover:scale-110",
        wrapperClassName,
      )}
    >
      <div className={cn("text-[var(--foreground)]", className)}>{icon}</div>
    </div>
  );
};

export const TechIcon = memo(TechIconContent);
