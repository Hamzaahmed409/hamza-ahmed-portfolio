"use client";

import { useEffect, useRef, useState } from "react";

function parseStatValue(value: string): {
  prefix: string;
  target: number | null;
  suffix: string;
  decimals: number;
} {
  // Only animate values that start with a number (e.g. "11+", "5+")
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", target: null, suffix: value, decimals: 0 };
  }
  const [, num, suffix] = match;
  return {
    prefix: "",
    target: Number(num),
    suffix,
    decimals: num.includes(".") ? num.split(".")[1].length : 0,
  };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function StatCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const { prefix, target, suffix, decimals } = parseStatValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(target === null ? value : `${prefix}0${suffix}`);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || target === null) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setDisplay(`${prefix}${target.toFixed(decimals)}${suffix}`);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const current = target! * easeOutCubic(progress);
      setDisplay(
        `${prefix}${current.toFixed(decimals)}${suffix}`,
      );
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
