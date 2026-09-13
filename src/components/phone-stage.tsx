"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { profile } from "@/content/profile";

const APP_INTERVAL_MS = 3500;

export function PhoneStage() {
  const apps = profile.projects;
  const total = apps.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [tick, setTick] = useState(0);

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (total < 2 || paused) return;
    const id = window.setInterval(() => {
      setDir(1);
      setIndex((current) => (current + 1) % total);
      setTick((t) => t + 1);
    }, APP_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [total, tick, paused]);

  const current = apps[index];
  // Only this app's screens — never mix neighboring projects on one slide.
  const uniqueShots = [...new Set(current.screenshots)].slice(0, 2);
  const main = uniqueShots[0];
  const side = uniqueShots[1];

  function go(delta: number) {
    setDir(delta >= 0 ? 1 : -1);
    setIndex((current) => (current + delta + total) % total);
    setTick((t) => t + 1);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[460px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative h-[min(68vh,600px)] w-full overflow-hidden">
        <div className="animate-drift absolute inset-6 rounded-[45%] bg-[radial-gradient(circle_at_center,rgba(125,222,200,0.5),transparent_68%)] blur-2xl" />
        <div className="absolute inset-x-10 top-16 bottom-8 rounded-[2.5rem] border border-white/40 bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-[2px] dark:border-white/10 dark:bg-white/5" />

        <div
          key={`stage-${current.slug}-${tick}`}
          className={
            dir >= 0 ? "phone-slide-in-right-wrap" : "phone-slide-in-left-wrap"
          }
        >
          {side ? (
            <div className="phone-slide-side absolute top-24 right-[2%] z-10 w-[165px] rotate-[8deg] opacity-80 sm:w-[190px]">
              <DeviceShot
                src={side}
                alt={`${current.name} screenshot 2`}
                dim
              />
            </div>
          ) : null}

          {main ? (
            <div
              className={`absolute top-4 z-20 w-[205px] sm:w-[235px] ${
                side
                  ? "left-1/2 -translate-x-[58%]"
                  : "left-1/2 -translate-x-1/2"
              }`}
            >
              <div className="animate-float-phone">
                <DeviceShot
                  src={main}
                  alt={`${current.name} screenshot`}
                  priority
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-2 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous app"
            onClick={() => go(-1)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-card/80 text-foreground transition hover:border-sea/40 hover:text-sea"
          >
            <ChevronLeft className="size-4" />
          </button>
          <a
            href={`#${current.slug}`}
            key={`label-${current.slug}-${tick}`}
            className="phone-label-fade min-w-[10rem] text-center text-sm font-semibold text-ink transition hover:text-sea"
          >
            {current.name}
            <span className="mt-0.5 block font-mono text-[0.65rem] font-medium tracking-wider text-muted-foreground uppercase">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </a>
          <button
            type="button"
            aria-label="Next app"
            onClick={() => go(1)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-card/80 text-foreground transition hover:border-sea/40 hover:text-sea"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="flex max-w-full flex-wrap justify-center gap-1.5 px-2">
          {apps.map((app, i) => (
            <button
              key={app.slug}
              type="button"
              aria-label={`Show ${app.name}`}
              aria-current={i === index}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
                setTick((t) => t + 1);
              }}
              className={`relative h-1.5 overflow-hidden rounded-full transition-all ${
                i === index ? "w-7 bg-sea/25" : "w-1.5 bg-border hover:bg-sea/50"
              }`}
            >
              {i === index ? (
                <span
                  key={`progress-${tick}`}
                  className="phone-dot-progress absolute inset-y-0 left-0 rounded-full bg-sea"
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeviceShot({
  src,
  alt,
  dim = false,
  priority = false,
}: {
  src: string;
  alt: string;
  dim?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2.1rem] border border-white/80 bg-[#0c1612] shadow-[0_28px_70px_rgba(12,22,18,0.4)] ring-1 ring-black/10 dark:border-white/20 ${
        dim ? "scale-[0.96]" : ""
      }`}
    >
      <div className="mx-auto mt-3.5 h-[5px] w-20 rounded-full bg-white/15" />
      <div className="relative m-2.5 aspect-[9/19.5] overflow-hidden rounded-[1.45rem] bg-ink">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="240px"
          priority={priority}
        />
      </div>
    </div>
  );
}
