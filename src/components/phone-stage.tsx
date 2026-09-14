"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";

const APP_INTERVAL_MS = 2000;
const SWIPE_THRESHOLD_PX = 40;

export function PhoneStage() {
  const apps = profile.projects;
  const total = apps.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [animKey, setAnimKey] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  const goNext = useCallback(() => {
    setDir(1);
    setIndex((curr) => (curr + 1) % total);
    setAnimKey((k) => k + 1);
  }, [total]);

  const goPrev = useCallback(() => {
    setDir(-1);
    setIndex((curr) => (curr - 1 + total) % total);
    setAnimKey((k) => k + 1);
  }, [total]);

  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(goNext, APP_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [total, animKey, goNext]);

  // Mobile touch gestures
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > SWIPE_THRESHOLD_PX) {
      if (diffX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  // Desktop mouse drag gestures
  function handleMouseDown(e: React.MouseEvent) {
    touchStartX.current = e.clientX;
    isDragging.current = true;
  }

  function handleMouseUp(e: React.MouseEvent) {
    if (!isDragging.current || touchStartX.current === null) return;
    const diffX = e.clientX - touchStartX.current;
    if (Math.abs(diffX) > SWIPE_THRESHOLD_PX) {
      if (diffX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    isDragging.current = false;
    touchStartX.current = null;
  }

  function handleMouseLeave() {
    isDragging.current = false;
    touchStartX.current = null;
  }

  const current = apps[index];
  // Only this app's screens — never mix neighboring projects on one slide.
  const uniqueShots = [...new Set(current.screenshots)].slice(0, 2);
  const main = uniqueShots[0];
  const side = uniqueShots[1];

  return (
    <div
      className="relative mx-auto w-full max-w-[460px] cursor-grab select-none active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[430px] sm:h-[480px] w-full overflow-hidden">
        <div className="animate-drift absolute inset-6 rounded-[45%] bg-[radial-gradient(circle_at_center,rgba(125,222,200,0.5),transparent_68%)] blur-2xl pointer-events-none" />
        <div className="absolute inset-x-10 top-16 bottom-8 rounded-[2.5rem] border border-white/40 bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-[2px] dark:border-white/10 dark:bg-white/5 pointer-events-none" />

        <div
          key={`stage-${current.slug}-${animKey}`}
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
