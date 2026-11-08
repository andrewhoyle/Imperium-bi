import assert from "node:assert/strict";
import { test } from "node:test";

import type { CaptureResult } from "posthog-js";

import { applyConsent, posthogConfig } from "./analytics";

// No project key is set, so applying a choice never loads PostHog: only before_send is exercised.
const beforeSend = posthogConfig().before_send as (e: CaptureResult | null) => CaptureResult | null;

const snapshot = () =>
  ({
    uuid: "u",
    event: "$snapshot",
    properties: {
      $snapshot_data: [
        {
          type: 2,
          data: {
            href: "https://imperium-bi.test/contact?token=secret-1",
            node: {
              attributes: {
                class: "card",
                "aria-label": "Ann Example",
                title: "ann@example.com",
                href: "/magic?t=secret-2",
              },
              childNodes: [{ attributes: { href: "mailto:ann@example.com", class: "mail" } }],
            },
          },
        },
      ],
    },
  }) as unknown as CaptureResult;

test("session replay is recorded uncompressed, so snapshots reach before_send", () => {
  assert.equal(
    (posthogConfig().session_recording as { compress_events?: boolean }).compress_events,
    false,
  );
});

test("replay snapshots keep layout attributes only, with addresses redacted, after Accept", () => {
  applyConsent("accepted");
  const sent = JSON.stringify(beforeSend(snapshot()));
  assert.doesNotMatch(sent, /secret|Ann Example|ann@example\.com/);
  assert.ok(sent.includes('"class":"card"'));
  assert.ok(sent.includes('"href":"mailto:"'));
  assert.ok(sent.includes('"app":"imperium-bi"'));
});

test("replay snapshots are never sent outside Accept", () => {
  for (const choice of [null, "rejected", "objected"] as const) {
    applyConsent(choice);
    assert.equal(beforeSend(snapshot()), null, String(choice));
  }
});
