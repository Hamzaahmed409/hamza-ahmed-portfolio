"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import {
  profile,
  workFilters,
  type Project,
  type ProjectGroup,
} from "@/content/profile";

function websiteLabel(slug: string, url: string) {
  if (slug === "knockio") return "knockio.com";
  if (slug === "mymonstro") return "mymonstro.com";
  if (slug === "ivy-online") return "ivyonline.co";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Website";
  }
}

function primaryLink(project: Project) {
  return project.storeUrl || project.playStoreUrl || project.websiteUrl || "#";
}

export function WorkSection() {
  const [active, setActive] = useState<"all" | ProjectGroup>("all");

  const filtered = useMemo(() => {
    if (active === "all") return profile.projects;
    return profile.projects.filter((project) => project.group === active);
  }, [active]);

  const featured = useMemo(
    () => filtered.filter((project) => project.featured),
    [filtered],
  );
  const more = useMemo(
    () => filtered.filter((project) => !project.featured),
    [filtered],
  );

  return (
    <section
      id="work"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"
    >
      <Reveal className="max-w-xl">
        <p className="text-sm font-semibold tracking-[0.16em] text-sea uppercase">
          Selected work
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Knockio first — then shipped apps
        </h2>
        <p className="mt-2 text-muted-foreground">
          Six featured case studies. More store apps below.
        </p>
      </Reveal>

      <Reveal delay={60}>
        <div
          className="mt-7 flex gap-1.5 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Project categories"
        >
          {workFilters.map((filter) => {
            const isActive = active === filter.id;
            const count =
              filter.id === "all"
                ? profile.projects.length
                : profile.projects.filter((p) => p.group === filter.id).length;

            if (filter.id !== "all" && count === 0) return null;

            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(filter.id)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                  isActive
                    ? "bg-sea text-white shadow-sm shadow-sea/20"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {filter.label}
                <span
                  className={`ml-1.5 font-mono text-[11px] ${
                    isActive ? "text-white/70" : "text-muted-foreground/80"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <p className="mt-10 text-muted-foreground">
          No apps in this category yet.
        </p>
      ) : (
        <>
          <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-16">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={Math.min(index, 2) * 40}>
                <FeaturedProjectCard
                  project={project}
                  index={index}
                  showDivider={index < featured.length - 1 || more.length > 0}
                />
              </Reveal>
            ))}
          </div>

          {more.length > 0 ? (
            <Reveal delay={80} className="mt-14 sm:mt-16">
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-border/60 pb-4">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.14em] text-sea uppercase">
                    Also shipped
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                    More store apps
                  </h3>
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  {String(more.length).padStart(2, "0")} apps
                </p>
              </div>

              <ul className="divide-y divide-border/50 border-b border-border/50">
                {more.map((project, i) => (
                  <li key={project.slug}>
                    <CompactProjectRow project={project} index={i} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </>
      )}
    </section>
  );
}

function FeaturedProjectCard({
  project,
  index,
  showDivider,
}: {
  project: Project;
  index: number;
  showDivider: boolean;
}) {
  return (
    <article id={project.slug} className="scroll-mt-28">
      <div
        className={`grid gap-8 lg:gap-12 ${
          index % 2 === 1
            ? "lg:grid-cols-[1.05fr_0.95fr]"
            : "lg:grid-cols-[0.95fr_1.05fr]"
        }`}
      >
        <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
          <div className="flex items-start gap-3.5">
            <span className="mt-1.5 hidden font-mono text-[11px] tracking-wider text-sea/60 sm:inline">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Image
              src={project.icon}
              alt={`${project.name} app icon`}
              width={56}
              height={56}
              className="size-12 shrink-0 rounded-[0.95rem] shadow-md ring-1 ring-black/5 sm:size-14"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                  {project.name}
                </h3>
                {project.slug === "knockio" ? (
                  <span className="rounded-md bg-sea/10 px-2 py-0.5 text-[11px] font-semibold text-sea">
                    Flagship
                  </span>
                ) : (
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    Featured
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {project.category}
                <span className="mx-1.5 text-border" aria-hidden>
                  ·
                </span>
                {project.year}
                <span className="mx-1.5 text-border" aria-hidden>
                  ·
                </span>
                {project.platform}
              </p>
            </div>
          </div>

          <p
            className="mt-4 text-xs font-semibold tracking-wide sm:text-sm"
            style={{ color: project.accent }}
          >
            {project.impact}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            {project.summary}
          </p>

          {project.features?.length ? (
            <ul className="mt-4 space-y-1.5 text-sm text-foreground/75">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span
                    className="mt-2 size-1 shrink-0 rounded-full"
                    style={{ backgroundColor: project.accent }}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
            {project.stack.map((tech, idx) => (
              <span key={tech}>
                {idx > 0 ? (
                  <span className="mx-1.5 text-border" aria-hidden>
                    ·
                  </span>
                ) : null}
                <span className="text-foreground/70">{tech}</span>
              </span>
            ))}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.storeUrl ? (
              <Button
                render={
                  <a
                    href={project.storeUrl}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                className="h-9 rounded-full bg-sea px-4 text-[13px] text-white dark:text-[#0a1628] hover:bg-sea/90"
              >
                App Store
                <ArrowUpRight className="size-3.5" />
              </Button>
            ) : null}
            {project.playStoreUrl ? (
              <Button
                render={
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                className="h-9 rounded-full bg-ink px-4 text-[13px] text-background dark:text-[#070d18] hover:bg-ink/90"
              >
                Play Store
                <ArrowUpRight className="size-3.5" />
              </Button>
            ) : null}
            {project.websiteUrl ? (
              <Button
                render={
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                variant="outline"
                className="h-9 rounded-full border-border/70 bg-card/70 px-4 text-[13px]"
              >
                {websiteLabel(project.slug, project.websiteUrl)}
                <Globe className="size-3.5" />
              </Button>
            ) : null}
          </div>
        </div>

        <div
          className={`-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 ${
            index % 2 === 1 ? "lg:order-1" : ""
          }`}
        >
          {project.screenshots.map((shot, shotIndex) => (
            <div
              key={shot}
              className="shot-frame relative h-[300px] w-[140px] shrink-0 overflow-hidden rounded-[1.35rem] border border-white/80 bg-ink shadow-[0_16px_36px_rgba(10,22,40,0.16)] sm:h-[360px] sm:w-[168px]"
            >
              <Image
                src={shot}
                alt={`${project.name} screenshot ${shotIndex + 1}`}
                fill
                className="object-cover object-top"
                sizes="168px"
                priority={index === 0 && shotIndex < 2}
              />
            </div>
          ))}
        </div>
      </div>
      {showDivider ? (
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-border to-transparent sm:mt-14" />
      ) : null}
    </article>
  );
}

function CompactProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const href = primaryLink(project);
  const storeHint = [
    project.storeUrl ? "App Store" : null,
    project.playStoreUrl ? "Play Store" : null,
    project.websiteUrl && !project.storeUrl && !project.playStoreUrl
      ? "Website"
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <a
      id={project.slug}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group grid scroll-mt-28 grid-cols-[1.75rem_2.5rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 py-4 transition hover:bg-sea/[0.03] sm:grid-cols-[2.25rem_2.75rem_minmax(0,1.15fr)_minmax(0,0.95fr)_auto] sm:gap-x-4 sm:px-1 sm:py-3.5"
    >
      <span className="font-mono text-[11px] tracking-wider text-muted-foreground/70 sm:text-xs">
        {String(index + 1).padStart(2, "0")}
      </span>

      <Image
        src={project.icon}
        alt=""
        width={44}
        height={44}
        className="size-10 shrink-0 rounded-[0.8rem] shadow-sm ring-1 ring-black/5 transition group-hover:ring-sea/30 sm:size-11"
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <h4 className="font-display text-[15px] font-semibold tracking-tight text-ink transition group-hover:text-sea">
            {project.name}
          </h4>
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: project.accent }}
            aria-hidden
          />
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-[13px]">
          {project.platform}
          <span className="mx-1.5 text-border" aria-hidden>
            ·
          </span>
          {project.year}
        </p>
        <p className="mt-1 line-clamp-1 text-sm text-foreground/70 sm:hidden">
          {project.summary}
        </p>
      </div>

      <div className="col-start-3 row-start-2 hidden min-w-0 sm:col-start-auto sm:row-start-auto sm:block">
        <p className="truncate text-sm text-foreground/75">{project.category}</p>
        <p
          className="mt-0.5 truncate text-xs font-medium"
          style={{ color: project.accent }}
        >
          {project.impact}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden text-[11px] text-muted-foreground lg:inline">
          {storeHint}
        </span>
        <span className="inline-flex size-8 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground transition group-hover:border-sea/40 group-hover:bg-sea group-hover:text-white">
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </a>
  );
}
