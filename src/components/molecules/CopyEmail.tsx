"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Click-to-copy email.
 *
 * Degrades silently where the Clipboard API is unavailable (insecure origins,
 * older browsers) — the address stays visible and selectable, so the worst
 * case is plain text rather than a dead control.
 */
export function CopyEmail({
  email,
  /** `dark` inverts the control for the inverted contact panel. */
  tone = "light",
}: {
  email: string;
  tone?: "light" | "dark";
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — leave the address selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={[
        "inline-flex h-12 items-center gap-2.5 rounded-lg border px-4",
        "font-mono text-caption",
        "transition-all duration-200 ease-out",
        tone === "dark"
          ? "border-white/25 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10 hover:text-white"
          : "border-line bg-card text-secondary hover:border-line-strong hover:bg-hover hover:text-ink",
        // Matches the Button contract — this control sits beside one.
        "active:translate-y-px",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      ].join(" ")}
    >
      {email}
      {copied ? (
        <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
