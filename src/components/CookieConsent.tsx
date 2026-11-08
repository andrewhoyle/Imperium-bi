"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_STORAGE_KEY,
  OPEN_COOKIE_SETTINGS_EVENT,
  applyConsent,
  isAnalyticsConfigured,
  readStoredConsent,
  saveConsent,
  type ConsentChoice,
} from "@/src/lib/analytics";
import { buttonClass } from "@/src/components/ui";

const CURRENT_CHOICE: Record<ConsentChoice, string> = {
  accepted: "You accepted: we count your visits and remember this device.",
  rejected: "You rejected: we count your visits anonymously, without cookies.",
  objected: "You chose not to be counted: no analytics run on your visits.",
};

/**
 * Applies the stored analytics choice on load and asks visitors who have not
 * decided. Undecided and rejected visitors are counted anonymously without
 * cookies; accepting adds device storage; "Don't count my visits" stops all
 * counting. With no PostHog key configured the banner never shows.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  /** Focus moves to the banner only when the visitor asked for it, not on first load. */
  const reopened = useRef(false);

  useEffect(() => {
    if (!isAnalyticsConfigured()) return;
    const stored = readStoredConsent();
    setChoice(stored);
    applyConsent(stored);
    if (stored === null) setOpen(true);

    const onOpen = () => {
      reopened.current = true;
      setChoice(readStoredConsent());
      setOpen(true);
    };
    // A choice made in another tab applies here too.
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) {
        const next = readStoredConsent();
        setChoice(next);
        applyConsent(next);
      }
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

  const choose = (next: ConsentChoice) => {
    saveConsent(next);
    setChoice(next);
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
        Cookie settings
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        We count visits anonymously, without cookies, to improve the site. If you accept, we also
        remember your device so we can understand how individual people use it. Either way we record
        the pages you view and what you click, never what you type, using PostHog (hosted in the
        EU). You can stop all counting below, or at any time under Cookie settings in the footer.
        See our{" "}
        <Link href="/privacy" className="text-brand hover:underline">
          privacy notice
        </Link>
        .
      </p>
      {choice && <p className="mt-2 text-sm text-muted">{CURRENT_CHOICE[choice]}</p>}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className={`${buttonClass("outline")} flex-1`}
          onClick={() => choose("accepted")}
        >
          Accept
        </button>
        <button
          type="button"
          className={`${buttonClass("outline")} flex-1`}
          onClick={() => choose("rejected")}
        >
          Reject
        </button>
      </div>
      <button
        type="button"
        className="mt-3 cursor-pointer text-sm text-muted underline hover:text-ink"
        onClick={() => choose("objected")}
      >
        Don&apos;t count my visits at all
      </button>
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
