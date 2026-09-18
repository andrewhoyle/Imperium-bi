import { NextResponse } from "next/server";
import { resendSend, redis, notifyChat, esc } from "@/src/lib/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const oneLine = (v: unknown, n: number) =>
  typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, n) : "";
const clip = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : "");

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const type = body.type;
    const website = body.website;
    const elapsed = body.elapsed;
    const name = oneLine(body.name, 150);
    const email = oneLine(body.email, 320);
    const topic = oneLine(body.topic, 150);
    const date = oneLine(body.date, 40);
    const time = oneLine(body.time, 40);
    const message = clip(body.message, 5000);

    if (website) return NextResponse.json({ ok: true });
    if (typeof elapsed === "number" && elapsed >= 0 && elapsed < 1500) {
      return NextResponse.json({ ok: true });
    }

    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!name || !emailOk) {
      return NextResponse.json(
        { ok: false, error: "Please provide your name and a valid email address." },
        { status: 400 },
      );
    }
    const isBooking = type === "booking";
    if (!isBooking && !message) {
      return NextResponse.json({ ok: false, error: "Please include a short message." }, { status: 400 });
    }

    // Rate limit by IP (best-effort; needs Upstash)
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
    const rlKey = "rl:" + ip;
    const count = await redis(["INCR", rlKey]);
    if (count === 1) await redis(["EXPIRE", rlKey, 600]);
    if (typeof count === "number" && count > 5) {
      return NextResponse.json(
        { ok: false, error: "Too many messages. Please try again shortly or email us directly." },
        { status: 429 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Email is not configured yet. Please email us directly." },
        { status: 500 },
      );
    }

    const TO = process.env.CONTACT_TO || "andrew.hoyle@imperium-bi.co.uk";
    const FROM = process.env.CONTACT_FROM || "Imperium Website <onboarding@resend.dev>";

    const rows: [string, string][] = (
      [
        ["Name", name],
        ["Email", email],
        isBooking ? ["Topic", topic] : null,
        isBooking ? ["Preferred date", date] : null,
        isBooking ? ["Preferred time", time] : null,
        ["Message", message],
      ].filter(Boolean) as [string, string][]
    ).map(([k, v]) => [k, v || "—"]);

    const subject = isBooking ? `Booking request — ${name}` : `Website enquiry — ${name}`;
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
    const html =
      `<h2 style="font-family:Arial,sans-serif;color:#0C1018">${isBooking ? "New booking request" : "New website enquiry"}</h2>` +
      '<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">' +
      rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top"><strong>${esc(k)}</strong></td>` +
            `<td style="padding:4px 0;white-space:pre-wrap">${esc(v)}</td></tr>`,
        )
        .join("") +
      "</table>";

    const resp = await resendSend({ from: FROM, to: TO, replyTo: email, subject, html, text });
    if (!(resp instanceof Response) || !resp.ok) {
      const detail = resp instanceof Response ? await resp.text().catch(() => "") : "no-key";
      console.error("Resend (notify) error", detail);
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please email us directly." },
        { status: 502 },
      );
    }

    // Best-effort extras
    const stamp = new Date().toISOString();
    const alertText =
      `${isBooking ? "📅 Booking request" : "✉️ New enquiry"} from ${name} (${email})` +
      (isBooking && topic ? `\nTopic: ${topic}` : "") +
      (isBooking && (date || time) ? `\nWhen: ${date || "—"} ${time || ""}`.trim() : "") +
      (!isBooking && message ? `\n${message.slice(0, 300)}` : "");
    const jobs: Promise<unknown>[] = [notifyChat(alertText)];
    jobs.push(
      (async () => {
        const record = JSON.stringify({
          t: stamp,
          type: isBooking ? "booking" : "enquiry",
          name,
          email,
          topic,
          date,
          time,
          message,
        });
        const len = await redis(["RPUSH", "leads", record]);
        if (typeof len === "number" && len > 1000) await redis(["LTRIM", "leads", -1000, -1]);
      })(),
    );

    const AUTOREPLY_FROM = process.env.AUTOREPLY_FROM || process.env.CONTACT_FROM;
    if (AUTOREPLY_FROM && !/onboarding@resend\.dev/.test(AUTOREPLY_FROM)) {
      const arText =
        `Hi ${name},\n\nThanks for reaching out to Imperium Business Intelligence. ` +
        `We've received your ${isBooking ? "booking request" : "message"} and will be in touch within one business day.\n\n` +
        `Best regards,\nAndrew Hoyle\nImperium Business Intelligence Ltd\nandrew.hoyle@imperium-bi.co.uk`;
      const arHtml =
        `<div style="font-family:Arial,sans-serif;font-size:14px;color:#222;line-height:1.6"><p>Hi ${esc(name)},</p>` +
        `<p>Thanks for reaching out to Imperium Business Intelligence. We've received your ${isBooking ? "booking request" : "message"} and will be in touch within one business day.</p>` +
        `<p style="margin-top:20px">Best regards,<br><strong>Andrew Hoyle</strong><br>Imperium Business Intelligence Ltd<br>` +
        `<a href="mailto:andrew.hoyle@imperium-bi.co.uk">andrew.hoyle@imperium-bi.co.uk</a></p></div>`;
      jobs.push(
        resendSend({
          from: AUTOREPLY_FROM,
          to: email,
          replyTo: TO,
          subject: isBooking ? "We've got your booking request" : "Thanks for getting in touch",
          html: arHtml,
          text: arText,
        }).catch((e) => console.error("auto-reply error", e)),
      );
    }

    await Promise.allSettled(jobs);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again or email us directly." },
      { status: 500 },
    );
  }
}
