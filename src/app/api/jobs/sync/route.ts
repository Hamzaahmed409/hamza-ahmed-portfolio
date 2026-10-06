import { NextResponse } from "next/server";
import { getDiscordWebhookUrl, getPostedJobs, markJobsAsPosted } from "@/lib/discord-store";
import { assertJobsEnabled } from "@/lib/jobs-guard";

export const runtime = "nodejs";

type RemotiveJob = {
  id: number | string;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
  company_logo_url?: string;
};

type SyncResponse = {
  ok: boolean;
  totalFetched: number;
  filtered: number;
  newJobsPosted: number;
  jobs: RemotiveJob[];
  error?: string;
};

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

// Clean HTML tags and truncate for Discord Embed description
function cleanAndTruncate(htmlStr: string, limit = 300): string {
  if (!htmlStr) return "";
  const text = htmlStr
    .replace(/<br\s*\/?>/gi, "\n") // preserve line breaks
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]*>/g, " ")      // remove all other html tags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ")      // collapse horizontal whitespace
    .trim();
    
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "...";
}

// Check if currency looks like non-USD
function isExplicitlyNonUSD(salary: string): boolean {
  if (!salary) return false;
  const lower = salary.toLowerCase();
  // If it has Euro, British Pound, Rupees, etc. without USD, block it.
  // But if it has "$" or is unspecified, we treat it as potentially USD.
  if (lower.includes("€") || lower.includes("£") || lower.includes("pkr") || lower.includes("inr") || lower.includes("rs")) {
    return !lower.includes("usd") && !lower.includes("us $");
  }
  return false;
}

// Core filtering function
function filterReactNativeUSD(job: RemotiveJob): boolean {
  const title = job.title.toLowerCase();
  const tags = (job.tags || []).map(t => t.toLowerCase());
  const desc = job.description.toLowerCase();
  const salary = job.salary ? job.salary.toLowerCase() : "";

  // 1. Check for React Native, Expo, or Mobile references
  const matchesReactNative = 
    title.includes("react native") || 
    title.includes("react-native") || 
    title.includes("expo") || 
    tags.some(t => t.includes("react native") || t.includes("react-native") || t.includes("expo")) ||
    (desc.includes("react native") && title.includes("mobile")) ||
    (desc.includes("react-native") && title.includes("mobile"));

  if (!matchesReactNative) return false;

  // 2. Pay filter (Remote jobs are usually in USD, but if explicit, ensure it isn't non-USD)
  if (isExplicitlyNonUSD(salary)) return false;

  return true;
}

async function fetchFromRemotive(searchQuery: string): Promise<RemotiveJob[]> {
  try {
    const res = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(searchQuery)}`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    if (!res.ok) throw new Error(`Remotive API responded with status ${res.status}`);
    const data = await res.json();
    return (data.jobs as RemotiveJob[]) || [];
  } catch (error) {
    console.error(`Error fetching remotive jobs for "${searchQuery}":`, error);
    return [];
  }
}

// POST trigger - execute sync and post to Discord
export async function POST(request: Request) {
  const blocked = assertJobsEnabled();
  if (blocked) return blocked;

  try {
    let requestBody: { test?: boolean } = {};
    try {
      requestBody = await request.json();
    } catch {
      // Empty body is fine
    }

    const webhookUrl = await getDiscordWebhookUrl();
    if (!webhookUrl) {
      return json({ error: "Discord Webhook URL is not configured. Please configure it in your environment or Settings." }, 400);
    }

    // Handle Mock/Test Notification
    if (requestBody.test) {
      const embed = {
        title: "🚀 Test Notification: Senior React Native Developer",
        url: "https://github.com/HamzaAhmed4059/hamza-ahmed-portfolio",
        color: 890008, // Hex value of teal (#0D9488)
        description: "Assalamu Alaikum! This is a test notification from your React Native Job Finder dashboard.\n\nYour Discord Webhook is fully functional! Live job postings matching **React Native, Remote, and USD** will look exactly like this card.",
        thumbnail: {
          url: "https://raw.githubusercontent.com/HamzaAhmed4059/hamza-ahmed-portfolio/main/public/icons/icon-maskable-192.png"
        },
        fields: [
          { name: "🏢 Company", value: "React Native Job Finder", inline: true },
          { name: "📍 Location", value: "Remote / Worldwide", inline: true },
          { name: "💰 Salary", value: "$120,000 - $150,000 / year (USD)", inline: true },
          { name: "🏷️ Tags", value: "`react-native`, `expo`, `mobile`, `usd-pay`", inline: false }
        ],
        footer: {
          text: "Verification Test Successful"
        },
        timestamp: new Date().toISOString()
      };

      const discordRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "React Native Job Finder",
          avatar_url: "https://raw.githubusercontent.com/HamzaAhmed4059/hamza-ahmed-portfolio/main/public/icons/icon-192.png",
          embeds: [embed]
        })
      });

      if (!discordRes.ok) {
        throw new Error(`Discord API responded with status ${discordRes.status}`);
      }

      return json({ ok: true, message: "Test notification posted to Discord!" });
    }

    // 1. Fetch from multiple remotive queries in parallel
    const [jobs1, jobs2, jobs3] = await Promise.all([
      fetchFromRemotive("react native"),
      fetchFromRemotive("react-native"),
      fetchFromRemotive("expo")
    ]);

    // 2. Merge and deduplicate by ID
    const allJobs = [...jobs1, ...jobs2, ...jobs3];
    const uniqueMap = new Map<string | number, RemotiveJob>();
    allJobs.forEach(job => {
      uniqueMap.set(String(job.id), job);
    });
    const uniqueJobs = Array.from(uniqueMap.values());

    // 3. Filter jobs matching React Native, Remote, USD
    const filteredJobs = uniqueJobs.filter(filterReactNativeUSD);

    // 4. Check already posted jobs
    const postedIds = await getPostedJobs();
    const newJobs = filteredJobs.filter(job => !postedIds.includes(String(job.id)));

    // Sort by publication date descending (newest first)
    newJobs.sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime());

    let successfullyPostedCount = 0;
    const postedThisRun: string[] = [];

    // 5. Post to Discord (sequential with delay to respect rate limit)
    for (const job of newJobs) {
      const cleanDesc = cleanAndTruncate(job.description, 350);
      const logoUrl = job.company_logo || job.company_logo_url || "https://raw.githubusercontent.com/HamzaAhmed4059/hamza-ahmed-portfolio/main/public/icons/icon-192.png";
      const tagsString = (job.tags || []).slice(0, 5).map(t => `\`${t}\``).join(", ") || "`None`";

      const embed = {
        title: `🔥 New Role: ${job.title}`,
        url: job.url,
        color: 890008, // Teal (#0D9488)
        description: cleanDesc,
        thumbnail: {
          url: logoUrl
        },
        fields: [
          { name: "🏢 Company", value: job.company_name || "Unknown Company", inline: true },
          { name: "📍 Location", value: job.candidate_required_location || "Remote", inline: true },
          { name: "💰 Salary", value: job.salary || "Competitive / Undisclosed (USD)", inline: true },
          { name: "🏷️ Tags", value: tagsString, inline: false }
        ],
        footer: {
          text: `Source: Remotive`
        },
        timestamp: job.publication_date ? new Date(job.publication_date).toISOString() : new Date().toISOString()
      };

      try {
        const discordRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "React Native Job Finder",
            avatar_url: "https://raw.githubusercontent.com/HamzaAhmed4059/hamza-ahmed-portfolio/main/public/icons/icon-192.png",
            embeds: [embed]
          })
        });

        if (discordRes.ok) {
          successfullyPostedCount++;
          postedThisRun.push(String(job.id));
        } else {
          console.error(`Failed to post job ${job.id} to Discord. Status: ${discordRes.status}`);
        }

        // Slight sleep to protect rate limits
        await new Promise(resolve => setTimeout(resolve, 800));
      } catch (postError) {
        console.error(`Failed to execute webhook POST for job ${job.id}:`, postError);
      }
    }

    // 6. Persist the posted job IDs
    if (postedThisRun.length > 0) {
      await markJobsAsPosted(postedThisRun);
    }

    return json({
      ok: true,
      totalFetched: uniqueJobs.length,
      filtered: filteredJobs.length,
      newJobsPosted: successfullyPostedCount,
      jobs: filteredJobs
    } as SyncResponse);

  } catch (error) {
    console.error("Job sync execution failed:", error);
    return json({
      ok: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred during sync."
    }, 500);
  }
}

// GET preview - fetch and display matching jobs WITHOUT posting them
export async function GET() {
  const blocked = assertJobsEnabled();
  if (blocked) return blocked;

  try {
    const [jobs1, jobs2, jobs3] = await Promise.all([
      fetchFromRemotive("react native"),
      fetchFromRemotive("react-native"),
      fetchFromRemotive("expo")
    ]);

    const allJobs = [...jobs1, ...jobs2, ...jobs3];
    const uniqueMap = new Map<string | number, RemotiveJob>();
    allJobs.forEach(job => {
      uniqueMap.set(String(job.id), job);
    });
    const uniqueJobs = Array.from(uniqueMap.values());
    const filteredJobs = uniqueJobs.filter(filterReactNativeUSD);
    const postedIds = await getPostedJobs();

    // Attach posted status for UI rendering convenience
    const jobsWithStatus = filteredJobs.map(job => ({
      ...job,
      alreadyPosted: postedIds.includes(String(job.id))
    }));

    // Sort newer first
    jobsWithStatus.sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime());

    const webhookUrl = await getDiscordWebhookUrl();

    return json({
      ok: true,
      webhookConfigured: webhookUrl !== "",
      totalFetched: uniqueJobs.length,
      filtered: filteredJobs.length,
      jobs: jobsWithStatus
    });
  } catch (error) {
    console.error("Job preview failed:", error);
    return json({
      ok: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred during preview fetch."
    }, 500);
  }
}
