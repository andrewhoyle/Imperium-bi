import { NextResponse } from "next/server";
import { resendSend, redis, esc } from "@/src/lib/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lead = { t?: string; type?: string; name?: string; email?: string; topic?: string; date?: string; time?: string };

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const raw = await redis(["LRANGE", "leads", 0, -1]);
  const all: Lead[] = Array.isArray(raw)
    ? raw
        .map((s) => {
          try {
            return JSON.parse(String(s)) as Lead;
          } catch {
            return null;
          }
        })
        .filter((x): x is Lead => x !== null)
    : [];

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = all.filter((l) => l.t && Date.parse(l.t) >= weekAgo);

  const TO = process.env.CONTACT_TO || "andrew.hoyle@imperium-bi.co.uk";
  const FROM = process.env.CONTACT_FROM || "Imperium Website <onboarding@resend.dev>";

  const rowsHtml =
    recent
      .map(
        (l) =>
          `<tr><td style="padding:6px 14px 6px 0;color:#666;white-space:nowrap">${esc((l.t || "").slice(0, 10))}</td>` +
          `<td style="padding:6px 0"><strong>${esc(l.name)}</strong> &lt;${esc(l.email)}&gt;` +
          (l.type === "booking" ? ` — ${esc(l.topic || "booking")} (${esc(l.date)} ${esc(l.time)})` : "") +
          `</td></tr>`,
      )
      .join("") || `<tr><td style="color:#999">None this week.</td></tr>`;

  const html =
    `<h2 style="font-family:Arial,sans-serif;color:#0C1018">Weekly lead digest — ${recent.length}</h2>` +
    `<table style="font-family:Arial,sans-serif;font-size:13px;border-collapse:collapse;width:100%">${rowsHtml}</table>`;
  const text = `Weekly lead digest — ${recent.length} in the last 7 days.`;

  await resendSend({ from: FROM, to: TO, subject: `Weekly lead digest — ${recent.length} new`, html, text });
  return NextResponse.json({ ok: true, count: recent.length });
}
