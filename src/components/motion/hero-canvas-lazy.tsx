"use client";

import dynamic from "next/dynamic";

const HeroCanvasScene = dynamic(
  () =>
    import("@/components/motion/hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

export function HeroCanvasLazy() {
  return <HeroCanvasScene />;
}
