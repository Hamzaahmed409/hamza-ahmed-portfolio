import { NextResponse } from "next/server";
import { isMailConfigured, sendInquiryEmail } from "@/lib/email";
import { countLocalInquiries, saveLocalInquiry } from "@/lib/local-store";

type InquiryBody = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

export async function POST(request: Request) {
  let body: InquiryBody;

  try {
    body = (await request.json()) as InquiryBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const company = body.company?.trim() || null;

  if (name.length < 2 || !email.includes("@") || message.length < 10) {
    return NextResponse.json(
      { error: "Name, valid email, and a short message are required." },
      { status: 400 },
    );
  }

  const payload = {
    name,
    email,
    company,
    message,
    source: "portfolio",
    created_at: new Date().toISOString(),
  };

  if (isMailConfigured()) {
    try {
      await sendInquiryEmail(payload);
      return NextResponse.json({
        ok: true,
        delivery: "resend",
      });
    } catch (error) {
      console.error(
        "Resend send failed:",
        error instanceof Error ? error.message : error,
      );
    }
  }

  const saved = await saveLocalInquiry(payload);

  return NextResponse.json({
    ok: true,
    delivery: "local",
    id: saved.id,
  });
}

export async function GET() {
  const configured = isMailConfigured();
  const localCount = await countLocalInquiries();

  return NextResponse.json({
    backend: configured ? "resend" : "local-json",
    mailConfigured: configured,
    localInquiryCount: localCount,
  });
}
