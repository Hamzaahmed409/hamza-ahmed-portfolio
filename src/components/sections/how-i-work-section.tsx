"use client";

import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";

export function HowIWorkSection() {
  return (
    <section className="border-y border-border/50 bg-sand/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-sea uppercase">
            How I work
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Beyond pretty UI
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-border/60 border-y border-border/60 md:mt-12 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
          {profile.remoteSignals.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 70}
              className="py-6 md:px-6 md:py-8 first:md:pl-0 last:md:pr-0"
            >
              <p className="font-mono text-[11px] tracking-wider text-sea/70">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2.5 font-display text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
