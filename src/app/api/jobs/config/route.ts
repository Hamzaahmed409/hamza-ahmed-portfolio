import { NextResponse } from "next/server";
import { getDiscordWebhookUrl, saveDiscordWebhookUrl, clearPostedJobs } from "@/lib/discord-store";

export const runtime = "nodejs";

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET() {
  try {
    const rawUrl = await getDiscordWebhookUrl();
    const isConfigured = rawUrl !== "";
    
    // Mask the webhook URL for security so it doesn't leak in the frontend source or network logs
    let maskedUrl = "";
    if (isConfigured) {
      const parts = rawUrl.split("/");
      if (parts.length >= 7) {
        const id = parts[5];
        const token = parts[6];
        const maskedToken = token.substring(0, 4) + "..." + token.substring(token.length - 4);
        maskedUrl = `https://discord.com/api/webhooks/${id}/${maskedToken}`;
      } else {
        maskedUrl = "https://discord.com/api/webhooks/...";
      }
    }

    return json({
      configured: isConfigured,
      webhookUrl: maskedUrl
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed to load config." }, 500);
  }
}

export async function POST(request: Request) {
  try {
    let body: { webhookUrl?: string; clearHistory?: boolean };
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body." }, 400);
    }

    if (body.clearHistory) {
      await clearPostedJobs();
      return json({ ok: true, message: "Posted jobs history cleared successfully!" });
    }

    const webhookUrl = body.webhookUrl?.trim() ?? "";
    if (webhookUrl === "") {
      const success = await saveDiscordWebhookUrl("");
      return json({ ok: success, message: "Discord webhook removed." });
    }

    if (!webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
      return json({ error: "Invalid Discord Webhook URL. It must start with 'https://discord.com/api/webhooks/'" }, 400);
    }

    const success = await saveDiscordWebhookUrl(webhookUrl);
    if (!success) {
      return json({ error: "Failed to save the webhook URL. Please check server logs." }, 500);
    }

    return json({ ok: true, message: "Discord webhook saved successfully!" });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed to save config." }, 500);
  }
}
