import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
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

  const supabase = getSupabase();

  if (supabase) {
    const { error } = await supabase.from("inquiries").insert(payload);

    if (error) {
      console.error("Supabase insert failed:", error.message);
      return NextResponse.json(
        { error: "Could not save inquiry. Try email instead." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      storage: "supabase-postgres",
    });
  }

  const saved = await saveLocalInquiry(payload);

  return NextResponse.json({
    ok: true,
    storage: "local",
    id: saved.id,
    note: isSupabaseConfigured()
      ? undefined
      : "Saved locally. Add NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY to persist in Supabase PostgreSQL.",
  });
}

export async function GET() {
  const configured = isSupabaseConfigured();
  const localCount = await countLocalInquiries();

  return NextResponse.json({
    backend: configured ? "supabase-postgres" : "local-json",
    supabaseConfigured: configured,
    localInquiryCount: localCount,
    table: "inquiries",
  });
}
