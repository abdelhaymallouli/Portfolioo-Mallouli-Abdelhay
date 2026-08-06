"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view, for nav highlighting.
 *
 * Uses a single IntersectionObserver over all sections rather than scroll
 * maths, so it stays off the main thread. The `rootMargin` shrinks the
 * viewport to a band across the upper-middle of the screen: a section counts
 * as "active" once it reaches roughly where the eye reads, not when its very
 * first pixel appears.
 *
 * When several sections intersect that band at once, the highest one wins —
 * matching reading order rather than observer callback order.
 *
 * @param ids Section element ids, in document order.
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // Active band ≈ 20%–65% down the viewport.
        rootMargin: "-20% 0px -35% 0px",
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
