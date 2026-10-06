import { ArrowUpRight, Code2, Globe, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneStage } from "@/components/phone-stage";
import { ContactForm } from "@/components/contact-form";
import { WorkSection } from "@/components/work-section";
import { ExperienceSection } from "@/components/experience-section";
import { SiteHeader } from "@/components/site-header";
import { StatCounter } from "@/components/stat-counter";
import { HeroCanvasLazy } from "@/components/hero-canvas-lazy";
import { Reveal } from "@/components/reveal";
import { StackSection } from "@/components/stack-section";
import { composeEmailHref, profile } from "@/content/profile";
import { backend } from "@/content/backend";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-col">
      <div className="site-grain pointer-events-none fixed inset-0 z-[60]" />

      <SiteHeader />

      <main className="flex-1">
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
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {stat.detail}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ExperienceSection />

        <WorkSection />

        <section className="border-y border-border/50 bg-sand/60 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.16em] text-sea uppercase">
                How I work
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Beyond pretty UI
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {profile.remoteSignals.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <p className="font-mono text-xs tracking-wider text-sea/70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <StackSection />

        <section
          id="backend"
          className="border-y border-border/50 bg-sand/50 py-16 backdrop-blur-sm sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.16em] text-sea uppercase">
                {backend.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {backend.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{backend.summary}</p>
            </Reveal>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {backend.points.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <p className="font-mono text-xs tracking-wider text-sea/70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

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
      </main>

      <footer className="border-t border-border/50 bg-background/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>{profile.role}</p>
        </div>
      </footer>
    </div>
  );
}
