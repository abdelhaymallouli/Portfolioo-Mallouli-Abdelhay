import type { Metadata, Viewport } from "next";
import { Inter, DM_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates, localisedPath, routing } from "@/i18n/routing";
import { SITE } from "@/data/content";
import { LANGUAGES } from "@/data/career";
import dynamic from "next/dynamic";
const SmoothScroll = dynamic(
  () =>
    import("@/components/providers/SmoothScroll").then(
      (mod) => mod.SmoothScroll,
    ),
);

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

/** OG `locale` wants a full language_TERRITORY tag, not a bare code. */
const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  de: "de_DE",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const title = `${SITE.name} — ${t("role")}`;
  const description = t("description");

  const keywords = [
    "Web Development",
    "Create Website",
    "Web Development Company",
    "Full Stack Developer",
    "Software Developer",
    "Custom Website Creation",
    "Hire Web Developer",
    "Web Application Development",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Go Developer",
    "Website Creation Company",
    "Full Stack Web Development",
    "Custom Software Engineering",
    "Frontend and Backend Developer",
    "Tangier Web Developer",
    "Morocco Software Engineer",
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s — ${SITE.name}`,
    },
    description,
    keywords,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    category: "technology",
    alternates: localeAlternates("", locale),
    openGraph: {
      title,
      description,
      url: localisedPath("", locale),
      siteName: `${SITE.name} — Web Development & Custom Software`,
      type: "website",
      locale: OG_LOCALE[locale] ?? OG_LOCALE.en,
      images: [
        {
          url: "/logo/Logo_Primary.png",
          width: 1200,
          height: 630,
          alt: `${SITE.name} — Web Development & Custom Website Creation`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo/Logo_Primary.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/**
 * Multi-entity JSON-LD structured data for Google & Search Engine indexing.
 */
const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.name,
    jobTitle: SITE.role,
    description:
      "Full Stack Web Developer & Software Engineer specializing in custom web development, website creation, Next.js, React, Laravel, and Go.",
    email: `mailto:${SITE.email}`,
    url: SITE.url,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tangier",
      addressCountry: "Morocco",
    },
    sameAs: [SITE.github, SITE.linkedin],
    knowsAbout: [
      "Web Development",
      "Website Creation",
      "Custom Software Development",
      "Full Stack Web Development",
      "React.js",
      "Next.js",
      "Laravel",
      "Go",
      "TypeScript",
      "API Architecture",
    ],
    knowsLanguage: LANGUAGES.map((language) => language.name),
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organization`,
    name: `${SITE.name} — Web Development & Custom Software Services`,
    url: SITE.url,
    logo: `${SITE.url}/logo/Logo_Primary.png`,
    image: `${SITE.url}/logo/Logo_Primary.png`,
    description:
      "Professional web development services, custom website creation, and software engineering.",
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tangier",
      addressCountry: "Morocco",
    },
    areaServed: "Worldwide",
    serviceType: [
      "Web Development",
      "Website Creation",
      "Custom Web Application Development",
      "Full Stack Software Engineering",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Website Creation",
            description:
              "High-performance website development tailored to business objectives.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Stack Web Application Development",
            description:
              "End-to-end web software development using Next.js, React, Laravel, and Go.",
          },
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: `${SITE.name} — Custom Web Development & Software Creation`,
    publisher: {
      "@id": `${SITE.url}/#person`,
    },
    inLanguage: ["en", "de"],
  },
];

export const viewport: Viewport = {
  colorScheme: "light",
  /*
   * Matches --color-canvas so mobile browser chrome blends with the page.
   * This read #f8fafc — a cool slate from an earlier palette — against a warm
   * bone canvas, which is exactly the seam the comment claims it prevents.
   */
  themeColor: "#f0efec",
};

/**
 * Pre-render both locales at build time rather than on first request.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  /* An unsupported segment 404s rather than silently rendering English at a
     URL that implies another language. */
  if (!hasLocale(routing.locales, locale)) notFound();

  /* Enables static rendering — without it, anything reading a translation
     opts the whole route into dynamic rendering. */
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={locale}
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
          /* Serialised from structured literals we control — no untrusted input. */
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          {t("skipToContent")}
        </a>

        {/*
         * Messages are passed to the client tree here. next-intl sends only
         * what client components actually reference, so the catalogue does not
         * ship wholesale to the browser.
         */}
        <NextIntlClientProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
