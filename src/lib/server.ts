/** Server-only helpers: Resend email, Upstash Redis (REST), chat alerts. Fetch-based, no SDKs. */

type SendArgs = {
  from: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  html?: string;
  text?: string;
};

export async function resendSend(args: SendArgs): Promise<Response | { ok: false; skipped: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, skipped: "no-api-key" };
  const body: Record<string, unknown> = {
    from: args.from,
    to: Array.isArray(args.to) ? args.to : [args.to],
    subject: args.subject,
    html: args.html,
    text: args.text,
  };
  if (args.replyTo) body.reply_to = args.replyTo;
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function redis(command: (string | number)[]): Promise<unknown | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });
    if (!resp.ok) return null;
    const data = (await resp.json()) as { result?: unknown };
    return Object.prototype.hasOwnProperty.call(data, "result") ? data.result : null;
  } catch {
    return null;
  }
}

export async function notifyChat(text: string): Promise<void> {
  const jobs: Promise<unknown>[] = [];
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChat = process.env.TELEGRAM_CHAT_ID;
  if (tgToken && tgChat) {
    jobs.push(
      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text, disable_web_page_preview: true }),
      }).catch(() => undefined),
    );
  }
  const hook = process.env.ALERT_WEBHOOK_URL;
  if (hook) {
    jobs.push(
      fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, content: text }),
      }).catch(() => undefined),
    );
  }
  if (jobs.length) await Promise.all(jobs).catch(() => undefined);
}

export const esc = (v: unknown): string =>
  String(v == null ? "" : v).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] as string);
