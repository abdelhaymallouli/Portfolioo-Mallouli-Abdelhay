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
   * (favicons, images, the résumé PDF, the generated icons). Without the
   * extension guard the locale rewrite swallows static asset requests.
   */
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
