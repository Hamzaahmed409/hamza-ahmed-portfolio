export const backend = {
  title: "How contact works",
  eyebrow: "Backend",
  summary: "Next.js API + Resend — inquiries go to inbox, not a database.",
  points: [
    {
      title: "Next.js API",
      body: "POST /api/contact validates the form and sends mail from one TypeScript app.",
    },
    {
      title: "Resend",
      body: "Transactional email with reply-to set to the visitor for one-click replies.",
    },
    {
      title: "Inbox delivery",
      body: "Each message lands in my inbox. If mail isn’t configured locally, the form fails clearly.",
    },
  ],
};
