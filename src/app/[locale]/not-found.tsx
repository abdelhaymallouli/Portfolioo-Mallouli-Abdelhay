import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * 404, inside the `[locale]` segment.
 *
 * This exists for two reasons beyond the copy.
 *
 * Without it, a missing page falls through to Next's internal `DefaultLayout`,
 * which renders its own bare `<html>`/`<body>`. That meant a 404 lost the nav,
 * the footer and the fonts — and, less obviously, lost the
 * `suppressHydrationWarning` on `<body>`, so any browser extension that
 * decorates the DOM (ColorZilla's `cz-shortcut-listen`, password managers)
 * produced a hydration mismatch in the console on every 404.
 *
 * It also means a German visitor hitting a dead link stays in German.
 *
 * Note the explicit `locale`. `not-found.tsx` is handed no params, so a bare
 * `getTranslations()` falls back to reading the request headers — which flips
 * this statically-prerendered route to dynamic at runtime and 500s with
 * "Page changed from static to dynamic at runtime … reason: headers". Reading
 * the locale the layout already established via `setRequestLocale` keeps it
 * static.
 *
 * There is deliberately no `generateMetadata` here: it would hit the same
 * headers problem, and `not-found` cannot receive params to avoid it.
 */
export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <PageShell>
      <PageHeader width="reading">
        <Reveal>
          <Eyebrow className="font-mono">{t("eyebrow")}</Eyebrow>

          <h1 className="mt-6 text-balance text-display-sm font-medium leading-[1.1] tracking-[-0.035em] text-ink sm:text-display-lg">
            {t("title")}
          </h1>

          <p className="mt-6 text-pretty text-lead leading-[1.7] text-secondary">
            {t("description")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/" size="lg">
              {t("home")}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                aria-hidden="true"
              />
            </ButtonLink>

            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-ink"
            >
              <span className="link-underline">{t("projects")}</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </PageHeader>
    </PageShell>
  );
}
