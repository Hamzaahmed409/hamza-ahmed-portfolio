"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  ExternalLink, 
  Settings, 
  Send, 
  RefreshCw, 
  Search, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Check,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";

type Job = {
  id: string | number;
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
  alreadyPosted?: boolean;
};

export default function JobsPage() {
  // Config state
  const [webhookUrl, setWebhookUrl] = useState("");
  const [maskedWebhookUrl, setMaskedWebhookUrl] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isConfigLoading, setIsConfigLoading] = useState(true);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [showConfigForm, setShowConfigForm] = useState(false);

  // Sync state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [syncStatus, setSyncStatus] = useState<{
    success?: boolean;
    message?: string;
    stats?: { fetched: number; filtered: number; posted: number };
  } | null>(null);

  // Discord test status
  const [testStatus, setTestStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isTestingDiscord, setIsTestingDiscord] = useState(false);

  // Fetch initial config and job list
  useEffect(() => {
    fetchConfig();
    fetchJobs();
  }, []);

  // Filter jobs locally based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredJobs(jobs);
    } else {
      const q = searchQuery.toLowerCase();
      const filtered = jobs.filter(
        job => 
          job.title.toLowerCase().includes(q) || 
          job.company_name.toLowerCase().includes(q) || 
          (job.tags || []).some(t => t.toLowerCase().includes(q)) ||
          job.candidate_required_location.toLowerCase().includes(q)
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  const fetchConfig = async () => {
    setIsConfigLoading(true);
    try {
      const res = await fetch("/api/jobs/config");
      const data = await res.json();
      if (data.configured) {
        setIsConfigured(true);
        setMaskedWebhookUrl(data.webhookUrl);
      } else {
        setIsConfigured(false);
        setMaskedWebhookUrl("");
      }
    } catch (err) {
      console.error("Failed to load config:", err);
    } finally {
      setIsConfigLoading(false);
    }
  };

  const fetchJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const res = await fetch("/api/jobs/sync");
      const data = await res.json();
      if (data.ok) {
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    try {
      const res = await fetch("/api/jobs/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookUrl: webhookUrl })
      });
      const data = await res.json();
      if (data.ok) {
        setIsConfigured(webhookUrl.trim() !== "");
        setWebhookUrl("");
        setShowConfigForm(false);
        await fetchConfig();
      } else {
        alert(data.error || "Failed to save configuration.");
      }
    } catch (err) {
      console.error("Save config failed:", err);
      alert("An unexpected error occurred while saving.");
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleClearHistory = async () => {
    if (!confirm("Are you sure you want to clear your posted jobs history? This will allow you to repost previous jobs to Discord again.")) {
      return;
    }
    try {
      const res = await fetch("/api/jobs/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clearHistory: true })
      });
      const data = await res.json();
      if (data.ok) {
        alert("Posting history cleared successfully!");
        fetchJobs(); // reload jobs status
      }
    } catch (err) {
      console.error("Clear history failed:", err);
    }
  };

  const handleTriggerSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncStatus(null);
    try {
      const res = await fetch("/api/jobs/sync", { method: "POST" });
      const data = await res.json();
      if (data.ok) {
        setSyncStatus({
          success: true,
          message: `Sync Completed successfully!`,
          stats: {
            fetched: data.totalFetched,
            filtered: data.filtered,
            posted: data.newJobsPosted
          }
        });
        await fetchJobs(); // reload with updated posted flags
      } else {
        setSyncStatus({
          success: false,
          message: data.error || "An error occurred during sync."
        });
      }
    } catch (err) {
      console.error("Sync trigger failed:", err);
      setSyncStatus({
        success: false,
        message: "Network error occurred while executing sync."
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSendTestNotification = async () => {
    if (isTestingDiscord) return;
    setIsTestingDiscord(true);
    setTestStatus(null);
    try {
      const res = await fetch("/api/jobs/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test: true })
      });
      const data = await res.json();
      if (data.ok) {
        setTestStatus({ success: true, message: "Test alert successfully posted to Discord!" });
      } else {
        setTestStatus({ success: false, message: data.error || "Failed to post test alert." });
      }
    } catch (err) {
      console.error("Test notification failed:", err);
      setTestStatus({ success: false, message: "Network error occurred." });
    } finally {
      setIsTestingDiscord(false);
    }
  };

  const formatPublishDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="site-grain pointer-events-none fixed inset-0 z-[60]" />
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-ink sm:text-xl hover:text-sea transition">
            <ArrowLeft className="size-4" />
            Back to Portfolio
          </a>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sea/10 px-3 py-1 text-xs font-semibold text-sea">
            <Sparkles className="size-3.5 animate-pulse" />
            React Native Job Finder
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
            RN Job Alert System
          </h1>
          <p className="mt-2 text-base text-muted-foreground max-w-2xl sm:text-lg">
            A real-time scraper that crawls job boards for <strong>Remote, USD-paying React Native</strong> roles and pushes notifications directly to your Discord server!
          </p>
        </div>

        {/* Dynamic Panels */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Settings & Sync Controls Side Panel */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Discord Webhook Config Card */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <Settings className="size-5 text-sea" />
                Discord Connection
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Connect your Discord channel using a Webhook URL to receive instant push alerts when new matching jobs are discovered.
              </p>

              {isConfigLoading ? (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin text-sea" />
                  Loading configuration...
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {isConfigured ? (
                    <div className="rounded-xl bg-accent/30 border border-sea/20 p-3.5 text-xs">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
                        <Check className="size-4 shrink-0" />
                        Webhook Connected!
                      </div>
                      <code className="block bg-card px-2 py-1 rounded border border-border/50 break-all text-[10px] text-muted-foreground">
                        {maskedWebhookUrl}
                      </code>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => setShowConfigForm(!showConfigForm)}
                          className="text-[11px] font-medium text-sea hover:underline"
                        >
                          {showConfigForm ? "Cancel edit" : "Edit webhook URL"}
                        </button>
                        <span className="text-border">|</span>
                        <button
                          onClick={handleClearHistory}
                          className="text-[11px] font-medium text-amber-600 hover:underline hover:text-amber-700"
                        >
                          Reset posted list
                        </button>
            </div>

            {/* Premium Job Portals & Talent Hubs Card */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <Sparkles className="size-5 text-sea" />
                Premium Portals Directory
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Direct access to high-paying, elite global developer networks and curated job portals.
              </p>

              <div className="mt-4 space-y-3">
                
                {/* Toptal */}
                <div className="rounded-xl border border-border/40 bg-background/40 p-3 hover:border-sea/30 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink">Toptal Network</span>
                    <a 
                      href="https://www.toptal.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-sea inline-flex items-center gap-0.5 hover:underline"
                    >
                      Open Link <ExternalLink className="size-2.5" />
                    </a>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                    Elite 3% freelance network. Offers premium USD-paying React Native contracts ranging from $80 to $150+/hour.
                  </p>
                </div>

                {/* Micro1 */}
                <div className="rounded-xl border border-border/40 bg-background/40 p-3 hover:border-sea/30 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink">Micro1 Talent</span>
                    <a 
                      href="https://www.talent.micro1.ai/login" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-sea inline-flex items-center gap-0.5 hover:underline"
                    >
                      Login Portal <ExternalLink className="size-2.5" />
                    </a>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                    AI-vetted platform matching skilled React Native engineers directly with high-growth US startups paying in USD.
                  </p>
                </div>

                {/* Talented.fi */}
                <div className="rounded-xl border border-border/40 bg-background/40 p-3 hover:border-sea/30 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink">Talented.fi Connect</span>
                    <a 
                      href="https://jobs.talented.fi/connect/dashboard" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-sea inline-flex items-center gap-0.5 hover:underline"
                    >
                      Dashboard <ExternalLink className="size-2.5" />
                    </a>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                    Premium European developer network with exclusive contracts and direct remote-friendly matches.
                  </p>
                </div>

                {/* JobLeads */}
                <div className="rounded-xl border border-border/40 bg-background/40 p-3 hover:border-sea/30 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink">JobLeads Premium</span>
                    <a 
                      href="https://www.jobleads.com/home" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-sea inline-flex items-center gap-0.5 hover:underline"
                    >
                      Job Feed <ExternalLink className="size-2.5" />
                    </a>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                    Executive level search engine featuring highly-compensated, unlisted remote engineering leadership positions.
                  </p>
                </div>

                {/* Glassdoor */}
                <div className="rounded-xl border border-border/40 bg-background/40 p-3 hover:border-sea/30 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink">Glassdoor Jobs</span>
                    <a 
                      href="https://www.glassdoor.com/Job/index.htm" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-sea inline-flex items-center gap-0.5 hover:underline"
                    >
                      Search Jobs <ExternalLink className="size-2.5" />
                    </a>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                    Track targeted React Native roles, review company culture, and research compensation/interview benchmarks.
                  </p>
                </div>

              </div>
            </div>

          </div>
                  ) : (
                    <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-3.5 text-xs text-destructive">
                      <div className="flex items-center gap-2 font-semibold mb-1">
                        <AlertCircle className="size-4 shrink-0" />
                        No Discord Webhook configured.
                      </div>
                      Enter your Discord channel webhook below to enable instant alerts!
                    </div>
                  )}

                  {/* Config Form */}
                  {(!isConfigured || showConfigForm) && (
                    <form onSubmit={handleSaveConfig} className="space-y-2.5">
                      <label className="block text-xs font-semibold text-ink">
                        Webhook URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://discord.com/api/webhooks/..."
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        required
                        className="w-full rounded-lg border border-border/70 bg-card px-3 py-2 text-xs focus:border-sea focus:outline-none"
                      />
                      <Button
                        type="submit"
                        disabled={isSavingConfig}
                        className="w-full text-xs h-9 justify-center rounded-lg"
                      >
                        {isSavingConfig ? (
                          <Loader2 className="size-3.5 animate-spin mr-1" />
                        ) : null}
                        Save Webhook Connection
                      </Button>
                    </form>
                  )}

                  {/* Webhook Testing controls */}
                  {isConfigured && (
                    <div className="pt-2 border-t border-border/40">
                      <button
                        onClick={handleSendTestNotification}
                        disabled={isTestingDiscord}
                        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-card/50 hover:bg-muted/50 py-2 text-xs font-semibold text-ink transition disabled:opacity-50"
                      >
                        <Send className="size-3.5" />
                        {isTestingDiscord ? "Posting Test..." : "Send Test Alert to Discord"}
                      </button>

                      {testStatus && (
                        <div className={`mt-2 rounded-lg p-2.5 text-[11px] flex gap-1.5 ${
                          testStatus.success 
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}>
                          {testStatus.success ? <CheckCircle className="size-3.5 shrink-0 mt-0.5" /> : <AlertCircle className="size-3.5 shrink-0 mt-0.5" />}
                          <span>{testStatus.message}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Scraper / Sync Controls Card */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <RefreshCw className={`size-5 text-sea ${isSyncing ? "animate-spin" : ""}`} />
                Scraper Control Panel
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Scan multiple job boards for new roles, filter for React Native + USD + Remote, and immediately dispatch alerts.
              </p>

              <div className="mt-4 space-y-4">
                <Button
                  onClick={handleTriggerSync}
                  disabled={isSyncing || !isConfigured}
                  size="lg"
                  className="w-full h-11 justify-center rounded-full text-xs shadow-md shadow-sea/10"
                >
                  {isSyncing ? (
                    <Loader2 className="size-4 animate-spin mr-1.5" />
                  ) : (
                    <Sparkles className="size-4 mr-1.5" />
                  )}
                  {isSyncing ? "Syncing..." : "Sync & Post New Jobs"}
                </Button>

                {syncStatus && (
                  <div className={`rounded-xl border p-4 text-xs ${
                    syncStatus.success 
                      ? "bg-emerald-50/50 dark:bg-emerald-950/15 border-emerald-500/20 text-ink" 
                      : "bg-red-50 dark:bg-red-950/10 border-red-500/25 text-red-700 dark:text-red-400"
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold mb-2">
                      {syncStatus.success ? <CheckCircle className="size-4 text-emerald-600 shrink-0" /> : <AlertCircle className="size-4 text-red-600 shrink-0" />}
                      <span>{syncStatus.message}</span>
                    </div>

                    {syncStatus.success && syncStatus.stats && (
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] mt-1 pt-2 border-t border-emerald-500/10">
                        <div>
                          <div className="font-semibold text-muted-foreground">Scanned</div>
                          <div className="text-sm font-bold text-ink">{syncStatus.stats.fetched}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-muted-foreground">RN + USD</div>
                          <div className="text-sm font-bold text-sea">{syncStatus.stats.filtered}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-emerald-600">New Sent</div>
                          <div className="text-sm font-bold text-emerald-600">{syncStatus.stats.posted}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Job Feed Panel */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Search and Filters Header */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-card border border-border/50 rounded-xl p-3 shadow-sm">
              <div className="relative w-full flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter jobs by title, company, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border/70 bg-background pl-9 pr-4 py-2 text-xs focus:border-sea focus:outline-none"
                />
              </div>
              <button
                onClick={fetchJobs}
                disabled={isLoadingJobs}
                className="flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-lg bg-sand border border-border/70 hover:bg-muted text-ink transition disabled:opacity-50"
              >
                <RefreshCw className={`size-3.5 ${isLoadingJobs ? "animate-spin" : ""}`} />
                {isLoadingJobs ? "Loading..." : "Refresh Feed"}
              </button>
            </div>

            {/* Jobs List */}
            {isLoadingJobs ? (
              // Loading Skeleton
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex gap-4 bg-card border border-border/50 rounded-2xl p-5">
                    <div className="size-12 rounded-lg bg-muted shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="h-3 bg-muted rounded w-1/3" />
                      <div className="h-3 bg-muted rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              // Empty State
              <div className="text-center py-16 border border-dashed border-border/70 bg-card/50 rounded-2xl p-6">
                <Briefcase className="size-10 text-muted-foreground/60 mx-auto mb-3" />
                <h3 className="font-display text-base font-bold text-ink">No matching jobs found</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                  We scanned remote job boards but couldn't find any listings matching your search keyword. Trigger a fresh Scraper Sync to find the latest entries!
                </p>
              </div>
            ) : (
              // Live list
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
                  <span>Showing {filteredJobs.length} matching jobs</span>
                  <span>Latest remote updates</span>
                </div>

                {filteredJobs.map((job) => (
                  <article 
                    key={job.id} 
                    className="group relative flex flex-col sm:flex-row gap-4 bg-card border border-border/50 hover:border-sea/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200"
                  >
                    {/* Already Posted Alert Badge */}
                    {job.alreadyPosted && (
                      <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                        <Check className="size-3" />
                        Posted to Discord
                      </span>
                    )}

                    {/* Company Logo / Fallback Icon */}
                    <div className="size-12 rounded-xl bg-sand border border-border/40 overflow-hidden shrink-0 flex items-center justify-center">
                      {job.company_logo ? (
                        <img 
                          src={job.company_logo} 
                          alt={job.company_name} 
                          className="size-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <Briefcase className="size-5 text-sea" />
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 space-y-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="font-display text-base font-bold text-ink group-hover:text-sea transition leading-tight">
                            {job.title}
                          </h3>
                        </div>
                        <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                          {job.company_name}
                        </p>
                      </div>

                      {/* Job Metadata Tags */}
                      <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-muted-foreground pt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3.5 text-sea shrink-0" />
                          {job.candidate_required_location || "Remote"}
                        </span>
                        
                        <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                          <DollarSign className="size-3.5 shrink-0" />
                          {job.salary || "Competitive (USD)"}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5 shrink-0" />
                          {formatPublishDate(job.publication_date)}
                        </span>
                      </div>

                      {/* Sub-tags list */}
                      {job.tags && job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {job.tags.slice(0, 5).map(tag => (
                            <span 
                              key={tag} 
                              className="text-[10px] font-medium bg-muted px-2 py-0.5 rounded border border-border/45 text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quick Link Button */}
                    <div className="self-end sm:self-center shrink-0">
                      <a 
                        href={job.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-sand hover:bg-muted border border-border/60 hover:border-sea/30 px-4 py-2 text-xs font-semibold text-ink transition"
                      >
                        Apply View
                        <ExternalLink className="size-3.5 text-sea" />
                      </a>
                    </div>

                  </article>
                ))}
              </div>
            )}

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border/40 py-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} {profile.name} Portfolio • Real-time React Native Job Finder Integration</p>
      </footer>
    </div>
  );
}
