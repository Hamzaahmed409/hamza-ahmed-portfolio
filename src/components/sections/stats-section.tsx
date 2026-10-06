"use client";

import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";
import { profile } from "@/content/profile";

export function StatsSection() {
  return (
    <section className="relative z-10 border-y border-border/60 bg-card/70 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-4 sm:gap-6 sm:divide-x sm:divide-border/60">
          {profile.impactStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 80}
              className={i > 0 ? "sm:pl-6 lg:pl-8" : ""}
            >
              <p className="font-display text-2xl font-bold tracking-tight text-sea sm:text-3xl lg:text-4xl">
                <StatCounter value={stat.value} />
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{stat.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{stat.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
