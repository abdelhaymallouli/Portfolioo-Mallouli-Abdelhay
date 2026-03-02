"use client";
import { ThemeProvider } from "@/components/ThemeProvider";
import DynamicBackground from "@/components/3d/DynamicBackground";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <DynamicBackground />
      <div className="relative z-10 w-full">{children}</div>
    </ThemeProvider>
  );
}
