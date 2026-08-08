import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware replacements for `next/link` and the router hooks.
 *
 * Import `Link` from here rather than from `next/link` anywhere the href is an
 * internal route: these keep the active locale on the URL, so a German visitor
 * clicking through stays on `/de/...` instead of being dropped back to English.
 *
 * External links (mailto:, https:) and asset paths still use a plain `<a>`.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
