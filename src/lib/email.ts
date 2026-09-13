import { Resend } from "resend";
import { profile } from "@/content/profile";

export function isMailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendInquiryEmail(inquiry: {
  name: string;
  email: string;
  company: string | null;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set.");
  }

  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Portfolio <beth.t@example.com>";
  const company = inquiry.company ?? "—";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: inquiry.email,
    subject: `Portfolio inquiry from ${inquiry.name}`,
    text: [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Company: ${company}`,
      "",
      inquiry.message,
    ].join("\n"),
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; line-height: 1.6; color: #111;">
        <h2 style="margin: 0 0 16px;">New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p style="white-space: pre-wrap; margin-top: 20px;">${escapeHtml(inquiry.message)}</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }
}
