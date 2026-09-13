# Mobile Developer Portfolio

A remote-job–ready portfolio site for mobile app developers. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Why this format works for remote jobs

Hiring managers rarely hire from Behance alone. The strongest combo for remote mobile roles is:

1. **Your own website** (this repo) — case studies, stack, timezone, and contact
2. **LinkedIn** — Open to Work + featured link to this site
3. **GitHub** — pinned repos / sample apps
4. **Live store links** — App Store / Play Store apps you shipped

Use Behance/Dribbble only as a supporting gallery if you do heavy UI work. Do not make them your only portfolio.

## Featured apps

- **Knockio** — main product, field service CRM ([knockio.com](https://knockio.com/), App Store, Play Store)
- **Outlaws Roofing** — Knockio white-label
- **TalkGenie AI** — AI customer-support chatbot

## Supabase / PostgreSQL contact form

The contact form posts to `/api/contact`.

1. Create a Supabase project
2. Run `supabase/inquiries.sql` in the SQL editor
3. Copy `.env.example` → `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Without those keys the API still works in **mock mode** (logs the inquiry locally).

## Theme & SEO

- Header moon/sun toggle switches light and dark mode (saved in `localStorage`, respects system preference).
- SEO includes Open Graph / Twitter metadata, JSON-LD (`Person`, `WebSite`, app `ItemList`), `sitemap.xml`, `robots.txt`, and `manifest.webmanifest`.
- Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your live domain for correct canonical / OG URLs.

## Customize your content

Edit one file:

```bash
src/content/profile.ts
```

Update your name, email, LinkedIn/GitHub URLs, stack, and project case studies.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Deploy on Vercel

This is a standard Next.js app — Vercel is the easiest host.

### 1. Put the code on GitHub

Create a GitHub repo for this project (from Cursor: **Create repo**), then push `main`.

### 2. Import in Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub
2. **Import** this repository
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `.` (leave default)
5. Add environment variables (optional but recommended):

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your live URL after first deploy, e.g. `https://your-project.vercel.app` (update again if you add a custom domain) |
| `NEXT_PUBLIC_SUPABASE_URL` | Only if you use Supabase for the contact form |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Only if you use Supabase |

6. Click **Deploy**

Every push to `main` redeploys automatically.

### 3. Custom domain (optional)

In the Vercel project → **Settings → Domains**, add `yourname.dev` (or similar) and point DNS as Vercel shows. Then set `NEXT_PUBLIC_SITE_URL` to that domain and redeploy.

### CLI alternative

```bash
npm i -g vercel
vercel login
vercel          # preview
vercel --prod   # production
```

| Platform | Best for |
| --- | --- |
| **Vercel** | Fastest for Next.js |
| **Netlify** | Similar one-click deploy |
| **Cloudflare Pages** | Edge hosting |

That live URL should go in your LinkedIn headline/about and resume.

## Scripts

- `npm run dev` — development server on port 43123
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
