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

/** Mirrors `--color-primary` in globals.css. */
export const BRAND_PRIMARY = "#ffcc00";

/** Mirrors `--color-ink` in globals.css. Carried on top of the primary fill. */
export const BRAND_INK = "#343434";
