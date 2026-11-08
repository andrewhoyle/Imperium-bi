/**
 * Consent-gated PostHog analytics (browser only).
 *
 * posthog-js is not even downloaded until the visitor has accepted analytics
 * cookies, so a visitor who has not accepted (or not yet decided) sends nothing.
 * Rejecting or withdrawing opts out and clears what PostHog stored in this
 * browser. With NEXT_PUBLIC_POSTHOG_KEY unset, nothing ever loads.
 */
import type { PostHog } from "posthog-js";

/** Where the visitor's choice is remembered. */
export const CONSENT_STORAGE_KEY = "ibi-cookie-consent";
/** Fired on window to reopen the cookie banner. */
export const OPEN_COOKIE_SETTINGS_EVENT = "ibi-open-cookie-settings";

export type ConsentChoice = "accepted" | "rejected";

/** Tags every event, so all of the owner's apps can share one PostHog project. */
const APP_SLUG = "imperium-bi";
const DEFAULT_HOST = "https://eu.i.posthog.com";
/** PostHog's storage keys, under any project key. */
const POSTHOG_STORAGE_KEY = /^(?:ph_|__ph_opt_in_out_)/;

let client: PostHog | null = null;
let loading = false;
let consent = false;

function apiKey(): string {
  return (process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "").trim();
}

/** True when a PostHog project key is configured for this build. */
export function isAnalyticsConfigured(): boolean {
  return apiKey() !== "";
}

/** The stored choice, or null when the visitor has not decided (or storage is blocked). */
export function readStoredConsent(): ConsentChoice | null {
  try {
    const value = globalThis.localStorage?.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

/** Remembers the choice and applies it. */
export function saveConsent(choice: ConsentChoice): void {
  try {
    globalThis.localStorage?.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Blocked storage: the choice still applies for this page view.
  }
  setAnalyticsConsent(choice === "accepted");
}

async function load(): Promise<void> {
  const key = apiKey();
  if (client || loading || !key) return;

  loading = true;
  try {
    const { default: posthog } = await import("posthog-js");
    // Withdrawn while this loaded: do not even initialise, as init contacts PostHog.
    if (!consent) return;

    posthog.init(key, {
      api_host: (process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "").trim() || DEFAULT_HOST,
      // App Router navigations use pushState, which this picks up.
      capture_pageview: "history_change",
      capture_pageleave: true,
      // Clicks, form submits and link follows. Typed text is never captured.
      autocapture: true,
      persistence: "localStorage",
      person_profiles: "identified_only",
      disable_session_recording: true,
      // Fail closed: start opted out, then opt in because the visitor accepted.
      opt_out_capturing_by_default: true,
    });
    client = posthog;
    posthog.opt_in_capturing();
    posthog.register({ app: APP_SLUG });
  } catch {
    // Analytics must never break the page.
  } finally {
    loading = false;
  }
}

/** Removes the opt-in, distinct id and session state PostHog keeps in the browser. */
function clearStoredState(): void {
  for (const name of ["localStorage", "sessionStorage"] as const) {
    try {
      const storage = globalThis[name];
      const keys = Array.from({ length: storage.length }, (_, i) => storage.key(i));
      for (const key of keys) if (key && POSTHOG_STORAGE_KEY.test(key)) storage.removeItem(key);
    } catch {
      // Blocked storage holds nothing to clear.
    }
  }
}

/**
 * Applies the visitor's decision. Accepting loads PostHog and opts in; anything
 * else opts out and clears PostHog's stored state.
 */
export function setAnalyticsConsent(accepted: boolean): void {
  consent = accepted;
  if (accepted) {
    client?.opt_in_capturing();
    void load();
  } else {
    client?.opt_out_capturing();
    clearStoredState();
  }
}
