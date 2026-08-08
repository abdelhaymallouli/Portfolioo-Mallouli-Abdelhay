/**
 * Brand colours as plain values, for the places CSS cannot reach.
 *
 * The stylesheet is the source of truth for everything that renders in the
 * browser — `--color-primary` and friends in `globals.css`. But the generated
 * icons (`app/icon.tsx`, `app/apple-icon.tsx`) run through `ImageResponse`,
 * which renders with Satori rather than the DOM: no stylesheet is loaded and
 * custom properties do not resolve, so those routes need literals.
 *
 * Keeping the literals here rather than inline in each icon means a recolour
 * touches two places — this file and `globals.css` — instead of four. The two
 * MUST be updated together; there is no mechanism that can enforce it.
 */

/**
 * Mirrors `--color-primary` in globals.css. Electric blue.
 *
 * Changing this means changing three things, not one:
 *   1. `--color-primary` in `globals.css`
 *   2. this constant
 *   3. `src/app/favicon.ico` — a checked-in binary, so it cannot follow either
 *      of the above. Regenerate it from the built `icon` route:
 *      the ICO is a 6-byte header + 16-byte directory entry wrapping the
 *      32×32 PNG that `app/icon.tsx` emits.
 */
export const BRAND_PRIMARY = "#00d4ff";

/** Mirrors `--color-ink` in globals.css. Carried on top of the primary fill. */
export const BRAND_INK = "#343434";
