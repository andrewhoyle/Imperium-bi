"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_STORAGE_KEY,
  OPEN_COOKIE_SETTINGS_EVENT,
  isAnalyticsConfigured,
  readStoredConsent,
  saveConsent,
  setAnalyticsConsent,
  type ConsentChoice,
} from "@/src/lib/analytics";
import { buttonClass } from "@/src/components/ui";

/**
 * Asks for consent to analytics cookies and applies the stored choice on load.
 * Undecided means no analytics. With no PostHog key configured the banner never
 * shows, because nothing would load.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  /** Focus moves to the banner only when the visitor asked for it, not on first load. */
  const reopened = useRef(false);

  useEffect(() => {
    if (!isAnalyticsConfigured()) return;
    const stored = readStoredConsent();
    setAnalyticsConsent(stored === "accepted");
    if (stored === null) setOpen(true);

    const onOpen = () => {
      reopened.current = true;
      setOpen(true);
    };
    // A choice made in another tab applies here too.
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) setAnalyticsConsent(e.newValue === "accepted");
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (open && reopened.current) headingRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setOpen(false);
  };

  return (
    <section
      role="region"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-line bg-bg-soft p-5 shadow-2xl sm:p-6"
    >
      <h2
        id="cookie-banner-title"
        ref={headingRef}
        tabIndex={-1}
        className="text-base font-semibold text-ink focus:outline-none"
      >
        Analytics cookies
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        With your permission we use PostHog analytics (hosted in the EU) to record the pages you
        view and what you click, never what you type, so we can see how the site is used. Nothing is
        collected unless you accept, and you can change your mind at any time under Cookie settings
        in the footer. See our{" "}
        <Link href="/privacy" className="text-brand hover:underline">
          privacy notice
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className={`${buttonClass("outline")} flex-1`}
          onClick={() => choose("accepted")}
        >
          Accept analytics
        </button>
        <button
          type="button"
          className={`${buttonClass("outline")} flex-1`}
          onClick={() => choose("rejected")}
        >
          Reject analytics
        </button>
      </div>
    </section>
  );
}

/** Footer link that reopens the cookie banner. Hidden when analytics is not configured. */
export function CookieSettingsButton({
  className,
  before,
}: {
  className?: string;
  /** Text shown before the link, such as a separator; hidden with it. */
  before?: string;
}) {
  if (!isAnalyticsConfigured()) return null;
  return (
    <>
      {before}
      <button
        type="button"
        className={className}
        onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      >
        Cookie settings
      </button>
    </>
  );
}
