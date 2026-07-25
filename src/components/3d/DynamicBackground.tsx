"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Background3D = dynamic(() => import("@/components/3d/Background3D"), {
  ssr: false,
});

export default function DynamicBackground() {
  const [enabled, setEnabled] = useState(false);

  // Skip the global particle canvas for reduced-motion / low-end / small devices.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallOrWeak =
      window.matchMedia("(max-width: 768px)").matches ||
      (navigator.hardwareConcurrency ?? 8) <= 4;
    setEnabled(!reduced && !smallOrWeak);
  }, []);

  if (!enabled) return null;
  return <Background3D />;
}
