import type { ReactNode } from "react";

/**
 * Root passthrough.
 *
 * The document shell — `<html lang>`, `<body>`, fonts, providers, nav, footer
 * — lives in `[locale]/layout.tsx`, because all of it depends on the locale.
 * Two layouts cannot both emit `<html>`, so this one renders `children` bare.
 *
 * It exists so the app root is a real route rather than a hole. Responses that
 * never reach the locale segment (an unmatched path, an error thrown above it)
 * get their shell from `not-found.tsx` / `global-error.tsx` beside this file,
 * each of which renders its own `<html>`/`<body>` carrying
 * `suppressHydrationWarning`.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
