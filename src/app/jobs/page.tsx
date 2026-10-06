import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobsDashboard } from "./jobs-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jobs tools",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

function jobsEnabled() {
  return process.env.ENABLE_JOBS === "true";
}

export default function JobsPage() {
  if (!jobsEnabled()) notFound();
  return <JobsDashboard />;
}
