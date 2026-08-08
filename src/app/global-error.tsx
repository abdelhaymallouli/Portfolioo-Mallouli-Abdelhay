"use client";

import { routing } from "@/i18n/routing";
import "./globals.css";

/**
 * Last-resort error boundary.
 *
 * Only renders when an error escapes above the locale layout — at that point
 * that layout never ran, so this must supply its own `<html>`/`<body>`.
 *
 * `suppressHydrationWarning` matters here for the same reason it does on the
 * locale layout: without it, Next's fallback document trips a hydration
 * mismatch whenever a browser extension decorates `<body>` (ColorZilla's
 * `cz-shortcut-listen`, password managers).
 *
 * Deliberately plain, and deliberately untranslated — there is no locale in
 * scope, and this file must not depend on anything that could itself be the
 * thing that failed.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang={routing.defaultLocale} className="h-full">
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas px-6 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
          Error
        </p>
        <h1 className="text-balance text-3xl font-medium tracking-tight text-ink">
          Something went wrong.
        </h1>
        <button
          type="button"
          onClick={reset}
          className="text-sm text-secondary underline underline-offset-4 transition-colors hover:text-ink"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
