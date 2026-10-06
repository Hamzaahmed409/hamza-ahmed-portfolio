"use client";

import { Reveal } from "@/components/reveal";
import { profile } from "@/content/profile";

export function StackSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal className="max-w-xl">
        <p className="text-sm font-semibold tracking-[0.16em] text-sea uppercase">
          Stack
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Tools I use to ship
        </h2>
        <p className="mt-2 text-muted-foreground">
          Mobile-first, then web, APIs, and release tooling.
        </p>
      </Reveal>

      <div className="mt-10 divide-y divide-border/60 border-y border-border/60 sm:mt-12">
        {profile.stackGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 50}>
            <div className="grid gap-3 py-6 sm:grid-cols-[140px_1fr] sm:items-baseline sm:gap-8 sm:py-7 lg:grid-cols-[180px_1fr]">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-wider text-sea/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
                  {group.label}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {group.items.map((item, idx) => (
                  <span key={item}>
                    {idx > 0 ? (
                      <span className="mx-2 text-border" aria-hidden>
                        ·
                      </span>
                    ) : null}
                    <span className="text-foreground/85 transition-colors hover:text-sea">
                      {item}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
