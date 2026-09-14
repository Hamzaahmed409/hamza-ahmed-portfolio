import { ArrowUpRight, Code2, Globe, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneStage } from "@/components/phone-stage";
import { ContactForm } from "@/components/contact-form";
import { WorkSection } from "@/components/work-section";
import { ThemeToggle } from "@/components/theme-toggle";
import { composeEmailHref, profile } from "@/content/profile";
import { backend } from "@/content/backend";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-col">
      <div className="site-grain pointer-events-none fixed inset-0 z-[60]" />

      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a
            href="#"
            className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl"
          >
            {profile.name}
          </a>
          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="#experience"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/70 hover:text-foreground sm:inline"
            >
              Experience
            </a>
            <a
              href="#work"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/70 hover:text-foreground sm:inline"
            >
              Work
            </a>
            <a
              href="#contact"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/70 hover:text-foreground md:inline"
            >
              Contact
            </a>
            <ThemeToggle />
            <Button
              render={<a href="#contact" />}
              className="h-10 rounded-full px-4 text-sm shadow-sm shadow-sea/20"
            >
              Hire me
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[78%] opacity-90" />
          <div className="pointer-events-none absolute -left-24 top-32 size-72 rounded-full bg-foam/30 blur-3xl animate-soft-pulse" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pt-12 lg:pb-12">
            <div className="max-w-xl">
              <p className="animate-rise mb-4 text-sm font-medium tracking-[0.18em] text-sea uppercase">
                {profile.availability}
              </p>
              <h1 className="animate-rise-delay-1 font-display text-[clamp(2.8rem,9vw,5rem)] leading-[0.92] font-extrabold tracking-tight text-balance text-ink">
                {profile.name}
              </h1>
              <p className="animate-rise-delay-2 mt-5 font-display text-xl font-semibold text-sea sm:text-2xl">
                {profile.role}
              </p>
              <p className="animate-rise-delay-2 mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.tagline}
              </p>
              <div className="animate-rise-delay-3 mt-9 flex flex-wrap items-center gap-3">
                <Button
                  render={
                    <a
                      href={composeEmailHref()}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                  size="lg"
                  className="h-12 rounded-full px-6 text-sm shadow-md shadow-sea/25"
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
                  className="h-12 rounded-full border-border/70 bg-card/70 px-6 text-sm backdrop-blur hover:border-sea/40 hover:text-sea"
                >
                  Download CV
                  <ArrowUpRight className="size-4" />
                </Button>
              </div>
              <div className="animate-rise-delay-3 mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
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
                <div
                  key={stat.label}
                  className={i > 0 ? "sm:pl-6 lg:pl-8" : ""}
                >
                  <p className="font-display text-2xl font-bold tracking-tight text-sea sm:text-3xl lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="relative border-b border-border/50 bg-deep text-white"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,107,92,0.35),transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.16em] text-foam uppercase">
                Experience
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Where I’ve shipped
              </h2>
              <p className="mt-3 text-white/60">
                Leadership, Knockio ownership, and product delivery from the CV.
              </p>
            </div>
            <div className="mt-12">
              {profile.experience.map((job, i) => (
                <article
                  key={`${job.company}-${job.period}`}
                  className="grid gap-4 border-t border-white/10 py-8 sm:grid-cols-[180px_1fr] sm:gap-10"
                >
                  <div>
                    <p className="font-mono text-xs tracking-wider text-foam/80">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-sm text-white/55">
                      {job.period}
                      {job.location ? (
                        <>
                          <br />
                          {job.location}
                        </>
                      ) : null}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-foam">
                      {job.company}
                    </p>
                    <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-white/75 sm:text-base">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2.5 size-1 shrink-0 rounded-full bg-foam" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <WorkSection />

        <section className="border-y border-border/50 bg-sand/60 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.16em] text-sea uppercase">
                How I work
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Beyond pretty UI
              </h2>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {profile.remoteSignals.map((item, i) => (
                <div key={item.title}>
                  <p className="font-mono text-xs tracking-wider text-sea/70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-sea uppercase">
              Stack
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Tools I use to ship
            </h2>
            <p className="mt-3 text-muted-foreground">
              Grouped by how I use them day to day — mobile first, then web,
              data, and release tooling.
            </p>
          </div>
          <div className="mt-10 space-y-8">
            {profile.stackGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-3 font-mono text-xs tracking-[0.14em] text-sea uppercase">
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm shadow-ink/5 transition hover:border-sea/50 hover:text-sea"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          id="backend"
          className="border-y border-border/50 bg-sand/50 py-16 backdrop-blur-sm sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.16em] text-sea uppercase">
                {backend.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {backend.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{backend.summary}</p>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {backend.points.map((item, i) => (
                <div key={item.title}>
                  <p className="font-mono text-xs tracking-wider text-sea/70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.body}
                  </p>
                </div>
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
            <div>
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
            </div>
            <ContactForm />
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
