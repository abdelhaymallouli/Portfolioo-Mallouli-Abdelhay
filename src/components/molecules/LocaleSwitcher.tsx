"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Shown on the control itself — always in its own language, never translated. */
const LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE",
};

/**
 * EN / DE toggle for the navbar.
 *
 * Two locales, so this is a pair of links rather than a dropdown — one click
 * instead of two, and no open/close state to manage. If a third locale is ever
 * added, this should become a menu.
 *
 * `usePathname` from `@/i18n/navigation` returns the path *without* the locale
 * prefix but *with* dynamic segments already resolved — so `/de/projects/venuvibe`
 * comes back as `/projects/venuvibe`. Handing that straight to the locale-aware
 * `Link` keeps the reader on the page they were on rather than sending them
 * home. This works because no route slug is localised; if one ever is, this
 * needs the `pathnames` config and the `{pathname, params}` href form.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const active = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn(
        "flex items-center gap-0.5 rounded-lg border border-white/10 p-0.5",
        className,
      )}
    >
      {routing.locales.map((locale) => {
        const current = locale === active;

        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            aria-current={current ? "true" : undefined}
            /* `hrefLang` tells crawlers these are translations of one page. */
            hrefLang={locale}
            className={cn(
              "rounded-md px-2 py-1 font-mono text-micro font-medium tracking-[0.08em] transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              current
                ? "bg-white/15 text-white"
                : "text-white/50 hover:text-white",
            )}
          >
            {LABELS[locale]}
          </Link>
        );
      })}
    </div>
  );
}
