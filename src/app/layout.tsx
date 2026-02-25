import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

import DynamicBackground from "@/components/3d/DynamicBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abdelhay Mallouli | Full Stack Developer",
  description: "Portfolio of Abdelhay Mallouli - Full Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} transition-colors duration-300 relative`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <DynamicBackground />
          <div className="relative z-10 w-full">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
