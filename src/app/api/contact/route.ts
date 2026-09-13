import { NextResponse } from "next/server";
import { isMailConfigured, sendInquiryEmail } from "@/lib/email";

export const runtime = "nodejs";

type InquiryBody = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export async function POST(request: Request) {
  try {
    let body: InquiryBody;

    try {
      body = (await request.json()) as InquiryBody;
    } catch {
      return json({ error: "Invalid JSON body." }, 400);
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const company = body.company?.trim() || null;

    if (name.length < 2 || !email.includes("@") || message.length < 10) {
      return json(
        { error: "Name, valid email, and a short message are required." },
        400,
      );
    }

    if (!isMailConfigured()) {
      return json(
        { error: "Could not send inquiry. Try email instead." },
        502,
      );
    }

    await sendInquiryEmail({ name, email, company, message });
    return json({ ok: true, delivery: "resend" });
  } catch (error) {
    console.error(
      "Contact POST failed:",
      error instanceof Error ? error.message : error,
    );
    return json({ error: "Could not send inquiry. Try email instead." }, 502);
  }
}

export async function GET() {
  const configured = isMailConfigured();

  return json({
    backend: configured ? "resend" : "unconfigured",
    mailConfigured: configured,
  });
}
