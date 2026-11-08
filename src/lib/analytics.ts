/**
 * Two-tier PostHog analytics (browser only).
 *
 * 1. Undecided or "Reject": anonymous, cookieless counting under legitimate
 *    interests. PostHog runs with `cookieless_mode: "on_reject"` and is opted
 *    out by default, so it stores nothing in the browser (no cookies, no local
 *    or session storage), sends a shared placeholder instead of a visitor id,
 *    and creates no person profiles. PostHog's servers turn each event into an
 *    aggregate count ("Cookieless server hash mode" must be on in the project).
 * 2. "Accept": full analytics with consent. Opting in switches PostHog to
 *    local-storage persistence with a fresh device id; the cookieless state is
 *    reset first, so nothing from before acceptance carries over.
 * 3. "Don't count my visits" (an objection): nothing is sent at all and
 *    PostHog's storage is cleared. Only the choice itself is remembered.
 *
 * With NEXT_PUBLIC_POSTHOG_KEY unset, nothing loads and nothing is sent.
 */
import type { PostHog, PostHogConfig } from "posthog-js";

/** Where the visitor's choice is remembered. */
export const CONSENT_STORAGE_KEY = "ibi-cookie-consent";
/** Fired on window to reopen the cookie banner. */
export const OPEN_COOKIE_SETTINGS_EVENT = "ibi-open-cookie-settings";

/**
 * "accepted": identified analytics with consent. "rejected": anonymous,
 * cookieless counting only. "objected": no analytics at all.
 */
export type ConsentChoice = "accepted" | "rejected" | "objected";

/** Tags every event, so all of the owner's apps can share one PostHog project. */
const APP_SLUG = "imperium-bi";
const DEFAULT_HOST = "https://eu.i.posthog.com";
/** PostHog's storage keys, under any project key. */
const POSTHOG_STORAGE_KEY = /^(?:ph_|__ph_opt_in_out_)/;

let client: PostHog | null = null;
let loading = false;
/** The choice being applied; null while the visitor has not decided. */
let current: ConsentChoice | null = null;

function apiKey(): string {
  return (process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "").trim();
}

/** True when a PostHog project key is configured for this build. */
export function isAnalyticsConfigured(): boolean {
  return apiKey() !== "";
}

/**
 * The stored choice, or null when the visitor has not decided (or storage is
 * blocked). Records from before the objection option existed ("accepted",
 * "rejected") stay valid as they are.
 */
export function readStoredConsent(): ConsentChoice | null {
  try {
    const value = globalThis.localStorage?.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" || value === "objected" ? value : null;
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
  applyConsent(choice);
}

/**
 * The options PostHog is initialised with. It always starts in the anonymous
 * tier; acceptance is applied afterwards with opt_in_capturing().
 */
export function posthogConfig(): Partial<PostHogConfig> {
  return {
    api_host: (process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "").trim() || DEFAULT_HOST,
    // Opted out by default + "on_reject" = cookieless until the visitor accepts.
    cookieless_mode: "on_reject",
    opt_out_capturing_by_default: true,
    opt_out_capturing_persistence_type: "localStorage",
    // Used only once the visitor accepts; cookieless mode disables persistence.
    persistence: "localStorage",
    // Cookieless events never create a person; accepted ones only once identified.
    person_profiles: "identified_only",
    // App Router navigations use pushState, which this picks up.
    capture_pageview: "history_change",
    capture_pageleave: true,
    // Clicks, form submits and link follows. Typed text is never captured.
    autocapture: true,
    disable_session_recording: true,
    // Unused here, and they would keep state in the browser.
    disable_surveys: true,
    disable_conversations: true,
    disable_product_tours: true,
    // Last line of defence: an objection drops every event, and every event is tagged.
    before_send: (event) => {
      if (!event || current === "objected") return null;
      event.properties = { ...event.properties, app: APP_SLUG };
      return event;
    },
  };
}

async function load(): Promise<void> {
  const key = apiKey();
  if (client || loading || !key) return;

  loading = true;
  try {
    const { default: posthog } = await import("posthog-js");
    // Objected while this loaded: do not even initialise, as init contacts PostHog.
    if (current === "objected") return;
    // Without acceptance, start from a clean browser so no earlier id is picked up.
    if (current !== "accepted") clearStoredState();

    posthog.init(key, posthogConfig());
    client = posthog;
    sync(posthog);
  } catch {
    // Analytics must never break the page.
  } finally {
    loading = false;
  }
}

/** Moves a loaded PostHog into the tier for the current choice. */
function sync(posthog: PostHog): void {
  if (current === "accepted") {
    // Resets the cookieless state, then persists a fresh device id.
    if (!posthog.has_opted_in_capturing()) posthog.opt_in_capturing({ captureEventName: false });
  } else if (posthog.has_opted_in_capturing() || current === "objected") {
    // Back to cookieless (opting out resets the identity); then drop the stored opt-out
    // flag too, as the anonymous tier keeps nothing in the browser.
    posthog.opt_out_capturing();
    clearStoredState();
  }
  // Opting in or out resets super properties, so tag the app again.
  posthog.register({ app: APP_SLUG });
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
 * Applies the visitor's decision (null = undecided). Anything but an objection
 * loads PostHog: anonymously unless the visitor accepted.
 */
export function applyConsent(choice: ConsentChoice | null): void {
  current = choice;
  if (choice === "objected") {
    clearStoredState();
    if (client) sync(client);
    return;
  }
  if (client) sync(client);
  else void load();
}
