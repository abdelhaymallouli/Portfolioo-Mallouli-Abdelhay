import { notFound } from "next/navigation";

/**
 * Catch-all inside the locale segment.
 *
 * The proxy rewrites every unmatched path to `/<locale>/<path>`, but without a
 * route to receive it Next falls back to the *root* `not-found.tsx` — which is
 * the bare, English-only version with no nav or footer. That meant a German
 * visitor following a dead link got an English 404.
 *
 * This claims those paths so `[locale]/not-found.tsx` handles them instead,
 * with the full chrome and in the right language.
 */
export default function CatchAllNotFound() {
  notFound();
}
