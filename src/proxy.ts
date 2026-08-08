import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/**
 * Locale negotiation, run before every page request.
 *
 * Note the filename and export name: Next.js 16 renamed Middleware to Proxy,
 * so this must be `proxy.ts` exporting `proxy` — a `middleware.ts` file is
 * simply not picked up. next-intl still ships its factory under
 * `next-intl/middleware`, which is only the import path; what it returns is
 * the request handler this convention expects.
 */
export const proxy = createMiddleware(routing);

export const config = {
  /*
   * Skip Next internals, the API surface, and anything with a file extension
   * (images, the résumé PDF, robots.txt, sitemap.xml). Without the extension
   * guard the locale rewrite swallows static asset requests.
   *
   * `icon`, `apple-icon` and `opengraph-image` must be listed by name. They
   * are metadata routes generated at the app root, and — unlike every other
   * asset — their URLs carry no file extension, so the dot rule does not catch
   * them. Left out, the proxy rewrote `/icon` to `/en/icon`, which does not
   * exist: the tab favicon 404'd on every page while the `<link>` tag looked
   * perfectly correct in the HTML.
   */
  matcher: [
    "/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|.*\\..*).*)",
  ],
};
