"use client";

import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCanvasLazy } from "@/components/motion/hero-canvas-lazy";
import { PhoneStage } from "@/components/sections/phone-stage";
import { composeEmailHref, profile } from "@/content/profile";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <HeroCanvasLazy />
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 z-[1] h-[78%] opacity-90" />
      <div className="pointer-events-none absolute -left-24 top-32 z-[1] size-72 rounded-full bg-foam/30 blur-3xl animate-soft-pulse" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pt-12 pb-10 sm:px-8 sm:pt-16 sm:pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pt-14 lg:pb-12">
        <div className="max-w-xl">
          <p className="animate-rise mb-3.5 text-sm font-medium tracking-[0.18em] text-sea uppercase">
            {profile.availability}
          </p>
          <h1 className="animate-rise-delay-1 font-display text-[clamp(2.8rem,9vw,5rem)] leading-[0.92] font-extrabold tracking-tight text-balance text-ink">
            {profile.name}
          </h1>
          <p className="animate-rise-delay-2 mt-2.5 font-display text-xl font-semibold text-sea sm:text-2xl">
            {profile.role}
          </p>
          <p className="animate-rise-delay-2 mt-3.5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.tagline}
          </p>
          <div className="animate-rise-delay-3 mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
            <Button
              render={
                <a
                  href={composeEmailHref()}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              size="lg"
              className="h-11 sm:h-12 rounded-full px-5 sm:px-6 text-sm shadow-md shadow-sea/25"
            >
              <Mail className="size-4" />
              Email for roles
            </Button>
            <Button
              render={
                <a
                  href={profile.links.resume}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              variant="outline"
              size="lg"
              className="h-11 sm:h-12 rounded-full border-border/70 bg-card/70 px-5 sm:px-6 text-sm backdrop-blur hover:border-sea/40 hover:text-sea"
            >
              Download CV
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
          <div className="animate-rise-delay-3 mt-7 sm:mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5 shrink-0 text-sea" />
              {profile.location}
            </span>
            <a
              href="#work"
              className="inline-flex items-center gap-1 font-medium text-ink transition hover:text-sea"
            >
              See shipped apps
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
        <div className="animate-rise-delay-2">
          <PhoneStage />
        </div>
      </div>
    </section>
  );
}
