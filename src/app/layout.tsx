import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

// ── Geist fonts (designed by Vercel — sharp, clean, technical) ──────────────
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdelhay Mallouli | Full Stack Developer",
  description:
    "Portfolio of Abdelhay Mallouli — Full Stack Developer based in Tangier, Morocco.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: { url: "/favicon.png", sizes: "180x180" },
  },
  openGraph: {
    title: "Abdelhay Mallouli | Full Stack Developer",
    description: "Full Stack Developer — React, Next.js, Go, Laravel.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        className="font-sans antialiased transition-colors duration-300 relative"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}