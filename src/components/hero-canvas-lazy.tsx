"use client";

import dynamic from "next/dynamic";

const HeroCanvasScene = dynamic(
  () =>
    import("@/components/hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

export function HeroCanvasLazy() {
  return <HeroCanvasScene />;
}
