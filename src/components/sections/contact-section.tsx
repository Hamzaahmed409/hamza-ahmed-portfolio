"use client";

import { Code2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { profile } from "@/content/profile";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-deep px-5 py-20 text-white sm:px-8 sm:py-28"
    >
      <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-sea/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-0 size-72 rounded-full bg-foam/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.16em] text-foam uppercase">
            Contact
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Need a mobile engineer who ships?
          </h2>
          <p className="mt-5 text-base text-white/65 sm:text-lg">
            Send the role, timezone, and stack — or email me directly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              render={
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              variant="outline"
              size="lg"
              className="h-11 rounded-full border-white/20 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
            >
              <Globe className="size-4" />
              LinkedIn
            </Button>
            <Button
              render={
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              variant="outline"
              size="lg"
              className="h-11 rounded-full border-white/20 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
            >
              <Code2 className="size-4" />
              GitHub
            </Button>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
