import type { Metadata, Viewport } from "next";
import { Inter, DM_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { localeAlternates, localisedPath, routing } from "@/i18n/routing";
import { SITE } from "@/data/content";
import { LANGUAGES } from "@/data/career";
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

  return {
    /* Resolves every relative OG/canonical URL below against the real origin. */
    metadataBase: new URL(SITE.url),
    title: {
      default: title,
      template: `%s — ${SITE.name}`,
    },
    description,
    /*
     * `canonical` is this locale's own URL and `languages` advertises the
     * alternates, so Google treats the two as translations of one page rather
     * than as duplicate content.
     *
     * Note every child page must set its own — metadata merges downward, so a
     * page that omits this inherits the home page's canonical and declares
     * itself a duplicate of `/`.
     */
    alternates: localeAlternates("", locale),
    openGraph: {
      title,
      description,
      url: localisedPath("", locale),
      siteName: SITE.name,
      type: "website",
      locale: OG_LOCALE[locale] ?? OG_LOCALE.en,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

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
  /* Derived from LANGUAGES so this can't drift from what the site claims. */
  knowsLanguage: LANGUAGES.map((language) => language.name),
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
          /* Serialised from a literal we control — no untrusted input. */
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
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
