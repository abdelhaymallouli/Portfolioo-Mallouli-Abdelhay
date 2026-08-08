import type { Metadata, Viewport } from "next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/content";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

/** Everything: display and body. Variable font, so no weight axis to declare. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Metadata, code, and tabular figures. DM Mono has no variable axis, so the
 * weights actually used have to be declared explicitly.
 */
const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION = `${SITE.role} in ${SITE.location}. ${SITE.positioning} Full-stack web applications with a focus on architecture, performance and interface detail.`;

export const metadata: Metadata = {
  /* Resolves every relative OG/canonical URL below against the real origin. */
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: DESCRIPTION,
    url: "/",
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Structured data describing the person this site is about.
 *
 * Emitted from the root layout so it appears on every route: search engines
 * treat the entity as site-wide, and a per-page copy would just be duplicated.
 */
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role,
  email: `mailto:${SITE.email}`,
  url: SITE.url,
  address: { "@type": "PostalAddress", addressLocality: SITE.location },
  sameAs: [SITE.github, SITE.linkedin],
  knowsLanguage: ["Arabic", "English", "French", "German"],
};

export const viewport: Viewport = {
  colorScheme: "light",
  /*
   * Matches --color-canvas so mobile browser chrome blends with the page.
   * This read #f8fafc — a cool slate from an earlier palette — against a warm
   * bone canvas, which is exactly the seam the comment claims it prevents.
   */
  themeColor: "#f0efec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmMono.variable} h-full`}
    >
      {/*
       * `suppressHydrationWarning` covers attributes that browser extensions
       * inject into <body> before React hydrates — ColorZilla's
       * `cz-shortcut-listen`, password managers, and similar. Those are
       * outside our control and produce a mismatch on every load.
       *
       * Scoped to this one element and to attributes only: it does not
       * suppress mismatched children, so a real content mismatch anywhere in
       * the tree still surfaces normally.
       */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          /* Serialised from a literal we control — no untrusted input. */
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
