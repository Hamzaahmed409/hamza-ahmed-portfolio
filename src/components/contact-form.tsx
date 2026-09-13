"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { composeEmailHref, profile } from "@/content/profile";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const fieldClass =
    "h-12 w-full rounded-2xl border border-white/12 bg-white/[0.06] px-4 text-white outline-none transition placeholder:text-white/35 focus:border-foam/40 focus:bg-white/[0.09] focus:ring-2 focus:ring-foam/25";

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:grid-cols-2 sm:p-7"
    >
      <label className="grid gap-1.5 text-sm">
        <span className="text-white/65">Name</span>
        <input
          name="name"
          required
          minLength={2}
          className={fieldClass}
          placeholder="Your name"
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="text-white/65">Email</span>
        <input
          name="email"
          type="email"
          required
          className={fieldClass}
          placeholder="you@company.com"
        />
      </label>
      <label className="grid gap-1.5 text-sm sm:col-span-2">
        <span className="text-white/65">Company (optional)</span>
        <input
          name="company"
          className={fieldClass}
          placeholder="Studio / company"
        />
      </label>
      <label className="grid gap-1.5 text-sm sm:col-span-2">
        <span className="text-white/65">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={4}
          className="w-full resize-y rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-foam/40 focus:bg-white/[0.09] focus:ring-2 focus:ring-foam/25"
          placeholder="Role, timezone, stack, and timeline…"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-12 rounded-full bg-foam px-6 text-ink hover:bg-foam/90 disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send inquiry"}
        </Button>
        <a
          href={composeEmailHref()}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-white/55 underline-offset-4 transition hover:text-white hover:underline"
        >
          or email {profile.email}
        </a>
      </div>
      {status === "success" ? (
        <p className="text-sm text-foam sm:col-span-2">
          Got it — I will reply within one business day.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-300 sm:col-span-2">{error}</p>
      ) : null}
    </form>
  );
}
