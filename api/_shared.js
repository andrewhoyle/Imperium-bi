// Shared helpers for the API functions. Files prefixed with "_" are not routed by Vercel.

// Send an email via the Resend API. Returns the fetch Response (or throws on network error).
async function resendSend({ from, to, replyTo, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, skipped: 'no-api-key' };
  const body = { from, to: Array.isArray(to) ? to : [to], subject, html, text };
  if (replyTo) body.reply_to = replyTo;
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return resp;
}

// Run a single Upstash Redis command via its REST API (no SDK needed).
// Returns the result, or null if Redis isn't configured / the call fails.
async function redis(command) {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(command),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return data && Object.prototype.hasOwnProperty.call(data, 'result') ? data.result : null;
  } catch (e) {
    return null;
  }
}

// Best-effort push notification to a phone/chat. Fires whichever channel is configured.
async function notifyChat(text) {
  const jobs = [];
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChat = process.env.TELEGRAM_CHAT_ID;
  if (tgToken && tgChat) {
    jobs.push(fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: tgChat, text, disable_web_page_preview: true }),
    }).catch(() => {}));
  }
  const hook = process.env.ALERT_WEBHOOK_URL; // Slack / Discord / generic incoming webhook
  if (hook) {
    jobs.push(fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, content: text }), // "text" for Slack, "content" for Discord
    }).catch(() => {}));
  }
  if (jobs.length) { try { await Promise.all(jobs); } catch (e) {} }
}

module.exports = { resendSend, redis, notifyChat };
