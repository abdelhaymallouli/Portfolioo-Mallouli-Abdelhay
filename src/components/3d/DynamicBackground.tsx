"use client";

import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/3d/Background3D"), {
  ssr: false,
});

export default function DynamicBackground() {
  return <Background3D />;
}
