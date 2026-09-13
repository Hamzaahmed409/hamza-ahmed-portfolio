export const backend = {
  title: "Next.js + Supabase + PostgreSQL",
  eyebrow: "Backend",
  summary:
    "Contact inquiries use Next.js API routes with a Postgres-backed data layer — Supabase when configured, local fallback otherwise.",
  points: [
    {
      title: "Next.js",
      body: "App Router + Route Handlers power the contact API (POST /api/contact) and the portfolio UI in one TypeScript codebase.",
    },
    {
      title: "PostgreSQL",
      body: "Relational schema for contact inquiries — indexed queries, constraints, and clean migrations.",
    },
    {
      title: "Supabase",
      body: "Hosted Postgres with Row Level Security and a simple client SDK for the Next.js contact API.",
    },
  ],
};
