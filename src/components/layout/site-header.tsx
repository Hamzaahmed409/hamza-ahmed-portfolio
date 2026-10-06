"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["experience", "work", "contact"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function goHome() {
    setActive("");
    setOpen(false);
  }

  return (
    <header
      className={`site-header sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-border/40 bg-background/90 shadow-[0_10px_30px_rgba(10,22,40,0.06)] backdrop-blur-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          : "border-b border-transparent bg-background/40 backdrop-blur-md"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-sea via-foam to-sea transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-5 sm:h-[3.75rem] sm:px-8">
        <a
          href="#"
          onClick={goHome}
          className="group inline-flex shrink-0 items-center gap-2.5"
          aria-label="Home"
        >
          <span className="header-logo-mark relative flex size-8 items-center justify-center overflow-hidden rounded-xl bg-sea text-[0.65rem] font-extrabold tracking-wide text-white shadow-[0_6px_16px_rgba(27,58,107,0.4)]">
            <span className="relative z-10">HA</span>
            <span className="header-logo-pulse absolute inset-0" />
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight text-ink sm:text-base">
            Hamza
            <span className="ml-1 font-medium text-muted-foreground group-hover:text-sea transition-colors">
              Ahmed
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center rounded-full border border-border/50 bg-card/70 p-1 shadow-sm shadow-ink/5 backdrop-blur-md md:flex"
          aria-label="Primary"
        >
          {NAV.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium tracking-tight transition-all duration-200 ${
                  isActive
                    ? "bg-sea text-white shadow-sm shadow-sea/25"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            render={<a href="#contact" />}
            className="header-cta hidden h-9 rounded-full px-4 text-[13px] font-semibold shadow-sm shadow-sea/20 sm:inline-flex"
          >
            Hire me
          </Button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-card/80 text-foreground transition hover:border-sea/40 hover:text-sea md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-t-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3" aria-label="Mobile">
          {NAV.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-sea/10 text-sea"
                    : "text-foreground hover:bg-muted/70"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <Button
            render={<a href="#contact" onClick={() => setOpen(false)} />}
            className="header-cta mt-1 h-11 w-full rounded-full text-sm font-semibold shadow-sm shadow-sea/20"
          >
            Hire me
          </Button>
        </nav>
      </div>
    </header>
  );
}
