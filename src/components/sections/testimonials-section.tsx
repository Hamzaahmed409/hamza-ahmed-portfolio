"use client";

import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";

export function TestimonialsSection() {
  if (!profile.testimonials?.length) return null;

  return (
    <section className="border-y border-border/50 bg-card/50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-sea uppercase">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            What collaborators say
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {profile.testimonials.map((item, i) => (
            <Reveal key={item.quote} delay={i * 80}>
              <figure className="flex h-full flex-col border-l-2 border-sea/40 pl-5 sm:pl-6">
                <blockquote className="font-display text-lg leading-relaxed text-ink sm:text-xl">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="mt-0.5 text-muted-foreground">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
