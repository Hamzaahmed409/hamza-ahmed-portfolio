import { Resend } from "resend";
import { profile } from "@/content/profile";

function env(name: string, fallback: string) {
  return (process.env[name] ?? fallback).trim().replace(/^["']|["']$/g, "");
}

export function isMailConfigured() {
  return env("RESEND_API_KEY", "").startsWith("re_");
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
  const apiKey = env("RESEND_API_KEY", "");

  if (!apiKey.startsWith("re_")) {
    throw new Error("RESEND_API_KEY is not set.");
  }

  const to = env("CONTACT_TO_EMAIL", profile.email);
  const from = env("RESEND_FROM_EMAIL", "beth.t@example.com");
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
      <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
        <h2>New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p style="white-space: pre-wrap;">${escapeHtml(inquiry.message)}</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }
}
