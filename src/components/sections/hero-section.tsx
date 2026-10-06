"use client";

import { ArrowUpRight, Calendar, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCanvasLazy } from "@/components/motion/hero-canvas-lazy";
import { PhoneStage } from "@/components/sections/phone-stage";
import { composeEmailHref, profile } from "@/content/profile";

export function HeroSection() {
  const bookingHref = profile.links.calendar;
  const bookingIsExternal = bookingHref.startsWith("http");

  return (
    <section className="relative overflow-hidden">
      <HeroCanvasLazy />
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 z-[1] h-[78%] opacity-90" />
      <div className="pointer-events-none absolute -left-24 top-32 z-[1] size-72 rounded-full bg-foam/30 blur-3xl animate-soft-pulse" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-10 px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-8 lg:pt-14 lg:pb-24">
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
                  href={bookingHref}
                  {...(bookingIsExternal
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                />
              }
              variant="outline"
              size="lg"
              className="h-11 sm:h-12 rounded-full border-border/70 bg-card/70 px-5 sm:px-6 text-sm backdrop-blur hover:border-sea/40 hover:text-sea"
            >
              <Calendar className="size-4" />
              Book a call
            </Button>
          </div>
          <div className="animate-rise-delay-3 mt-8 space-y-3 border-t border-border/40 pt-6 sm:mt-10 sm:pt-7">
            <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0 text-sea" />
              <span>{profile.location}</span>
              <span className="text-border" aria-hidden>
                ·
              </span>
              <span>{profile.remoteNote}</span>
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <a
                href="#work"
                className="inline-flex items-center gap-1 font-medium text-ink transition hover:text-sea"
              >
                See shipped apps
                <ArrowUpRight className="size-3.5" />
              </a>
              <span className="text-border" aria-hidden>
                ·
              </span>
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-ink transition hover:text-sea"
              >
                Download CV
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
        <div className="animate-rise-delay-2">
          <PhoneStage />
        </div>
      </div>
    </section>
  );
}
