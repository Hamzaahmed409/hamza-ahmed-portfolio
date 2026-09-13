export const backend = {
  title: "Next.js + Resend SMTP",
  eyebrow: "Backend",
  summary:
    "Contact inquiries use a Next.js API route and Resend SMTP — messages land in inbox instead of a database.",
  points: [
    {
      title: "Next.js",
      body: "App Router + Route Handlers power the contact API (POST /api/contact) and the portfolio UI in one TypeScript codebase.",
    },
    {
      title: "Resend",
      body: "Transactional email via Resend. The form sends to my inbox with reply-to set to the visitor, so I can respond in one click.",
    },
    {
      title: "Inbox delivery",
      body: "Each inquiry is emailed with reply-to set to the visitor. If the API key is missing locally, the form still saves to a JSON fallback.",
    },
  ],
};
