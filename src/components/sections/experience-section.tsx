"use client";

import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative border-b border-border/50 bg-deep text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(27,58,107,0.42),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-72 rounded-full bg-sea/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <Reveal className="max-w-xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-foam uppercase">
            Experience
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Where I’ve shipped
          </h2>
          <p className="mt-2 text-sm text-white/55 sm:text-base">
            Product ownership, white-label platforms, and mobile delivery.
          </p>
        </Reveal>

        <div className="relative mt-10 sm:mt-14">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[11px] w-px bg-gradient-to-b from-foam/50 via-white/15 to-transparent sm:left-[15px]"
          />

          <ol className="space-y-8 sm:space-y-10">
            {profile.experience.map((job, i) => (
              <Reveal key={`${job.company}-${job.period}`} delay={i * 70}>
                <li className="relative grid gap-4 pl-10 sm:grid-cols-[minmax(140px,180px)_1fr] sm:gap-8 sm:pl-12 lg:gap-12">
                  <span
                    aria-hidden
                    className="absolute top-1.5 left-0 flex size-6 items-center justify-center rounded-full border border-foam/40 bg-deep sm:size-8"
                  >
                    <span className="size-2 rounded-full bg-foam shadow-[0_0_10px_rgba(125,179,255,0.7)] sm:size-2.5" />
                  </span>

                  <div className="sm:pt-0.5">
                    <p className="font-mono text-[11px] tracking-wider text-foam/90 uppercase">
                      {job.period}
                    </p>
                    {job.location ? (
                      <p className="mt-1.5 text-xs text-white/45 sm:text-sm">
                        {job.location}
                      </p>
                    ) : null}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                        {job.role}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm font-medium text-foam">
                      {job.company}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-sm leading-relaxed text-white/70 sm:text-[15px]"
                        >
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-foam/80" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-12 grid gap-4 border-t border-white/10 pt-10 sm:mt-14 sm:grid-cols-2 sm:gap-5">
          <Reveal delay={40}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="font-mono text-[11px] tracking-[0.14em] text-foam/80 uppercase">
                Education
              </p>
              {profile.education.map((edu) => (
                <div key={edu.degree} className="mt-3">
                  <h4 className="font-display text-base font-semibold text-white sm:text-lg">
                    {edu.degree}
                  </h4>
                  <p className="mt-1 text-sm font-medium text-foam">
                    {edu.institution}
                  </p>
                  <p className="mt-0.5 text-xs text-white/45">{edu.period}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="font-mono text-[11px] tracking-[0.14em] text-foam/80 uppercase">
                Languages
              </p>
              <div className="mt-4 space-y-3">
                {profile.languages.map((lang) => (
                  <div
                    key={lang.language}
                    className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm font-semibold text-white">
                      {lang.language}
                    </span>
                    <span className="text-right text-xs text-white/50 sm:text-sm">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
