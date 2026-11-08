"use client";

import { Analytics } from "@vercel/analytics/next";
import { vercelBeforeSend } from "@/src/lib/analytics";

/**
 * Vercel Web Analytics (cookieless). It honours "Don't count my visits" like
 * PostHog does, and sends page paths without query strings or fragments.
 */
export function VercelAnalytics() {
  return <Analytics beforeSend={vercelBeforeSend} />;
}
