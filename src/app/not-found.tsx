import Link from "next/link";
import { routing } from "@/i18n/routing";
import "./globals.css";

/**
 * Root 404 — for URLs that never reach the `[locale]` segment at all.
 *
 * Nearly every 404 is handled by `[locale]/not-found.tsx`, which gets the full
 * chrome. This one is the last resort, and because the root layout is a bare
 * passthrough, it must render its own `<html>`/`<body>`.
 *
 * `suppressHydrationWarning` is the point of it existing: Next's internal
 * fallback document omits it, and browser extensions that decorate `<body>`
 * (ColorZilla's `cz-shortcut-listen`, password managers) then trip a hydration
 * mismatch on every 404.
 *
 * Intentionally plain — no fonts, no providers, no translations. There is no
 * locale in scope to translate into, and pulling the whole chrome in here
 * would duplicate the layout this file exists to stand in for.
 */
export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas px-6 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
          404
        </p>
        <h1 className="text-balance text-3xl font-medium tracking-tight text-ink">
          This page doesn&apos;t exist.
        </h1>
        <Link
          href="/"
          className="text-sm text-secondary underline underline-offset-4 transition-colors hover:text-ink"
        >
          Back to home
        </Link>
      </body>
    </html>
  );
}
