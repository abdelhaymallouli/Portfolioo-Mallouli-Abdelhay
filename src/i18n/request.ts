import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Per-request i18n config, read by every server component.
 *
 * `hasLocale` narrows an arbitrary URL segment to a supported locale and falls
 * back to the default, so a hand-typed `/fr/...` renders English rather than
 * throwing on a missing message file.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
