"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { en: "EN", fr: "FR", de: "DE" };

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      // Preserve the current path (incl. dynamic segments like /projects/[id]).
      router.replace(
        // @ts-expect-error -- params are passed through for dynamic routes
        { pathname, params },
        { locale: next }
      );
    });
  };

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-[var(--card-border)] bg-[var(--card)] p-0.5"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          disabled={isPending}
          aria-current={l === locale ? "true" : undefined}
          className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest transition-colors ${
            l === locale
              ? "bg-accent text-black"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
