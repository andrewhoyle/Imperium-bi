// Weekly lead digest — runs via Vercel Cron (see vercel.json).
// Reads the stored leads, summarises the last 7 days, and emails the digest to the business inbox.
// Protected by CRON_SECRET (Vercel Cron sends it automatically as a Bearer token when set).

const { resendSend, redis } = require('./_shared');

const esc = (v) => String(v == null ? '' : v).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

module.exports = async (req, res) => {
  // Auth: allow if no secret configured (dev), else require the matching Bearer token.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers['authorization'] || '';
    if (auth !== `Bearer ${secret}`) return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  try {
    const raw = await redis(['LRANGE', 'leads', 0, -1]);
    const all = Array.isArray(raw) ? raw.map((s) => { try { return JSON.parse(s); } catch (e) { return null; } }).filter(Boolean) : [];

    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recent = all.filter((l) => l.t && Date.parse(l.t) >= weekAgo);
    const enquiries = recent.filter((l) => l.type !== 'booking');
    const bookings = recent.filter((l) => l.type === 'booking');

    const TO = process.env.CONTACT_TO || 'andrew.hoyle@imperium-bi.co.uk';
    const FROM = process.env.CONTACT_FROM || 'Imperium Website <onboarding@resend.dev>';

    const item = (l) =>
      `<tr><td style="padding:6px 14px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${esc((l.t || '').slice(0, 10))}</td>` +
      `<td style="padding:6px 0"><strong>${esc(l.name || '—')}</strong> &lt;${esc(l.email || '')}&gt;` +
      (l.type === 'booking' ? ` — ${esc(l.topic || 'booking')} (${esc(l.date || '')} ${esc(l.time || '')})` : '') +
      (l.message ? `<br><span style="color:#555">${esc(String(l.message).slice(0, 200))}</span>` : '') +
      `</td></tr>`;

    const section = (title, list) =>
      `<h3 style="font-family:Arial,sans-serif;color:#0C1018;margin:20px 0 8px">${title} (${list.length})</h3>` +
      (list.length
        ? `<table style="font-family:Arial,sans-serif;font-size:13px;border-collapse:collapse;width:100%">${list.map(item).join('')}</table>`
        : `<p style="font-family:Arial,sans-serif;font-size:13px;color:#999">None this week.</p>`);

    const html =
      `<h2 style="font-family:Arial,sans-serif;color:#0C1018">Weekly lead digest</h2>` +
      `<p style="font-family:Arial,sans-serif;font-size:13px;color:#666">${recent.length} total in the last 7 days.</p>` +
      section('Booking requests', bookings) +
      section('Enquiries', enquiries);

    const text = `Weekly lead digest — ${recent.length} in the last 7 days.\n`
      + `Bookings: ${bookings.length}, Enquiries: ${enquiries.length}.\n\n`
      + recent.map((l) => `${(l.t || '').slice(0, 10)}  ${l.name} <${l.email}> ${l.type}`).join('\n');

    const resp = await resendSend({ from: FROM, to: TO, subject: `Weekly lead digest — ${recent.length} new`, html, text });
    if (!resp || resp.ok === false || (resp.status && !resp.ok)) {
      const detail = resp && resp.text ? await resp.text().catch(() => '') : '';
      console.error('digest send error', resp && resp.status, detail);
      return res.status(502).json({ ok: false, error: 'digest send failed' });
    }
    return res.status(200).json({ ok: true, count: recent.length });
  } catch (err) {
    console.error('cron-digest error', err);
    return res.status(500).json({ ok: false, error: 'digest error' });
  }
};
