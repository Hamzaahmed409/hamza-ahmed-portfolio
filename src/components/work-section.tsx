"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  profile,
  workFilters,
  type Project,
  type ProjectGroup,
} from "@/content/profile";

export function WorkSection() {
  const [active, setActive] = useState<"all" | ProjectGroup>("all");

  const projects = useMemo(() => {
    if (active === "all") return profile.projects;
    return profile.projects.filter((project) => project.group === active);
  }, [active]);

  return (
    <section
      id="work"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.16em] text-sea uppercase">
          Selected work
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Knockio first — then shipped apps
        </h2>
        <p className="mt-3 text-muted-foreground">
          Filter by category — Field CRM, AI, consumer apps, tools, and more.
        </p>
      </div>

      <div
        className="mt-8 flex gap-2 overflow-x-auto pb-1"
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
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-sea bg-sea text-white shadow-sm shadow-sea/25"
                  : "border-border/70 bg-card/80 text-foreground hover:border-sea/40 hover:text-sea"
              }`}
            >
              {filter.label}
              <span
                className={`ml-2 font-mono text-xs ${
                  isActive ? "text-white/75" : "text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 space-y-16 sm:mt-14 sm:space-y-20">
        {projects.length === 0 ? (
          <p className="text-muted-foreground">No apps in this category yet.</p>
        ) : (
          projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              showDivider={index < projects.length - 1}
            />
          ))
        )}
      </div>
    </section>
  );
}

function ProjectCard({
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
        className={`grid gap-10 lg:gap-14 ${
          index % 2 === 1
            ? "lg:grid-cols-[1.05fr_0.95fr]"
            : "lg:grid-cols-[0.95fr_1.05fr]"
        }`}
      >
        <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
          <div className="flex flex-wrap items-start gap-4">
            <Image
              src={project.icon}
              alt={`${project.name} app icon`}
              width={64}
              height={64}
              className="rounded-[1.1rem] shadow-[0_10px_30px_rgba(12,22,18,0.12)] ring-1 ring-black/5"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <span className="font-mono text-xs tracking-wider text-sea">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>Published {project.year}</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{project.platform}</span>
                {project.featured ? (
                  <>
                    <span aria-hidden className="text-border">
                      /
                    </span>
                    <span className="font-semibold text-sea">Flagship</span>
                  </>
                ) : null}
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                {project.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.category}
              </p>
            </div>
          </div>
          <p
            className="mt-5 text-sm font-semibold tracking-wide"
            style={{ color: project.accent }}
          >
            {project.impact}
          </p>
          <p className="mt-3 text-base leading-relaxed text-foreground/85 sm:text-lg">
            {project.summary}
          </p>
          {project.features?.length ? (
            <ul className="mt-5 space-y-2 text-sm text-foreground/80 sm:text-base">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: project.accent }}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-md border border-border/50 bg-card/80 font-normal text-foreground"
              >
                {tech}
              </Badge>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {project.storeUrl ? (
              <Button
                render={
                  <a
                    href={project.storeUrl}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                size="lg"
                className="h-11 rounded-full bg-sea px-5 text-sm text-white hover:bg-sea/90"
              >
                App Store
                <ArrowUpRight className="size-4" />
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
                size="lg"
                className="h-11 rounded-full bg-ink px-5 text-sm text-white hover:bg-ink/90"
              >
                Play Store
                <ArrowUpRight className="size-4" />
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
                size="lg"
                className="h-11 rounded-full border-border/70 bg-card/70 px-5 text-sm"
              >
                {project.slug === "knockio"
                  ? "knockio.com"
                  : project.slug === "mymonstro"
                    ? "mymonstro.com"
                    : "Website"}
                <Globe className="size-4" />
              </Button>
            ) : null}
          </div>
        </div>
        <div
          className={`-mx-5 flex gap-3.5 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0 ${
            index % 2 === 1 ? "lg:order-1" : ""
          }`}
        >
          {project.screenshots.map((shot, shotIndex) => (
            <div
              key={shot}
              className="shot-frame relative h-[340px] w-[158px] shrink-0 overflow-hidden rounded-[1.5rem] border border-white/80 bg-ink shadow-[0_20px_45px_rgba(12,22,18,0.18)] sm:h-[400px] sm:w-[186px]"
            >
              <Image
                src={shot}
                alt={`${project.name} screenshot ${shotIndex + 1}`}
                fill
                className="object-cover object-top"
                sizes="186px"
                priority={index === 0 && shotIndex < 2}
              />
            </div>
          ))}
        </div>
      </div>
      {showDivider ? (
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-border to-transparent sm:mt-20" />
      ) : null}
    </article>
  );
}
