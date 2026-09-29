import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const postedJobsFile = path.join(dataDir, "posted_jobs.json");
const configFile = path.join(dataDir, "discord_config.json");

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

export async function getDiscordWebhookUrl(): Promise<string> {
  // 1. Try environment variable first
  const envUrl = process.env.DISCORD_WEBHOOK_URL ?? "";
  if (envUrl.trim().startsWith("https://discord.com/api/webhooks/")) {
    return envUrl.trim();
  }

  // 2. Fallback to local config file
  try {
    await ensureDataDir();
    const raw = await readFile(configFile, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.webhookUrl === "string" && parsed.webhookUrl.trim().startsWith("https://discord.com/api/webhooks/")) {
      return parsed.webhookUrl.trim();
    }
  } catch {
    // Config file doesn't exist or is invalid
  }

  return "";
}

export async function saveDiscordWebhookUrl(url: string): Promise<boolean> {
  try {
    await ensureDataDir();
    const cleanUrl = url.trim();
    if (cleanUrl !== "" && !cleanUrl.startsWith("https://discord.com/api/webhooks/")) {
      throw new Error("Invalid Discord Webhook URL. It must start with https://discord.com/api/webhooks/");
    }
    const data = { webhookUrl: cleanUrl, updated_at: new Date().toISOString() };
    await writeFile(configFile, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Failed to save Discord webhook URL:", error);
    return false;
  }
}

export async function getPostedJobs(): Promise<string[]> {
  try {
    await ensureDataDir();
    const raw = await readFile(postedJobsFile, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map(String);
    }
  } catch {
    // File doesn't exist or is invalid, return empty array
  }
  return [];
}

export async function markJobsAsPosted(jobIds: (string | number)[]): Promise<boolean> {
  try {
    await ensureDataDir();
    const current = await getPostedJobs();
    const incoming = jobIds.map(String);
    
    // Merge and deduplicate
    const updated = Array.from(new Set([...current, ...incoming]));
    
    await writeFile(postedJobsFile, JSON.stringify(updated, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Failed to save posted jobs:", error);
    return false;
  }
}

export async function clearPostedJobs(): Promise<boolean> {
  try {
    await ensureDataDir();
    await writeFile(postedJobsFile, "[]", "utf8");
    return true;
  } catch (error) {
    console.error("Failed to clear posted jobs:", error);
    return false;
  }
}
