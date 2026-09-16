// Vercel Serverless Function — handles contact & booking form submissions.
// Notifies the business inbox (Resend), optionally: auto-replies to the enquirer,
// pushes a phone/chat alert, rate-limits by IP, and stores the lead for the weekly digest.
// All extras are best-effort: the form still works if a given service isn't configured.
// Env: RESEND_API_KEY (+ CONTACT_TO, CONTACT_FROM, AUTOREPLY_FROM), TELEGRAM_*/ALERT_WEBHOOK_URL,
//      UPSTASH_REDIS_REST_URL/TOKEN.

const { resendSend, redis, notifyChat } = require('./_shared');

const esc = (v) => String(v == null ? '' : v).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const oneLine = (v, n) => (typeof v === 'string' ? v.replace(/[\r\n]+/g, ' ').trim().slice(0, n) : v);
    const clip = (v, n) => (typeof v === 'string' ? v.slice(0, n) : '');
    const type = body.type;
    const website = body.website;
    const elapsed = body.elapsed;
    const name = oneLine(body.name, 150);
    const email = oneLine(body.email, 320);
    const topic = oneLine(body.topic, 150);
    const date = oneLine(body.date, 40);
    const time = oneLine(body.time, 40);
    const message = clip(body.message, 5000);

    // Spam gate 1: honeypot. Bots fill the hidden "website" field.
    if (website) return res.status(200).json({ ok: true });
    // Spam gate 2: time-trap. Humans take more than ~1.5s to fill the form.
    if (typeof elapsed === 'number' && elapsed >= 0 && elapsed < 1500) {
      return res.status(200).json({ ok: true });
    }

    const emailOk = typeof email === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!name || !emailOk) {
      return res.status(400).json({ ok: false, error: 'Please provide your name and a valid email address.' });
    }
    const isBooking = type === 'booking';
    if (!isBooking && !message) {
      return res.status(400).json({ ok: false, error: 'Please include a short message.' });
    }

    // Spam gate 3: rate limit by IP (best-effort, needs Upstash). Max 5 / 10 min.
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    const rlKey = 'rl:' + ip;
    const count = await redis(['INCR', rlKey]);
    if (count === 1) await redis(['EXPIRE', rlKey, 600]);
    if (typeof count === 'number' && count > 5) {
      return res.status(429).json({ ok: false, error: 'Too many messages. Please try again shortly or email us directly.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ ok: false, error: 'Email is not configured yet. Please email us directly.' });
    }

    const TO = process.env.CONTACT_TO || 'andrew.hoyle@imperium-bi.co.uk';
    const FROM = process.env.CONTACT_FROM || 'Imperium Website <onboarding@resend.dev>';

    const rows = [
      ['Name', name],
      ['Email', email],
      isBooking ? ['Topic', topic] : null,
      isBooking ? ['Preferred date', date] : null,
      isBooking ? ['Preferred time', time] : null,
      ['Message', message],
    ].filter(Boolean).map(([k, v]) => [k, v || '—']);

    const subject = isBooking ? `Booking request — ${name}` : `Website enquiry — ${name}`;
    const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
    const html =
      `<h2 style="font-family:Arial,sans-serif;color:#0C1018">${isBooking ? 'New booking request' : 'New website enquiry'}</h2>` +
      '<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">' +
      rows.map(([k, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top"><strong>${esc(k)}</strong></td>` +
        `<td style="padding:4px 0;white-space:pre-wrap">${esc(v)}</td></tr>`).join('') +
      '</table>';

    // 1) Notify the business inbox (required — this is the core delivery).
    const resp = await resendSend({ from: FROM, to: TO, replyTo: email, subject, html, text });
    if (!resp || resp.ok === false || (resp.status && !resp.ok)) {
      const detail = resp && resp.text ? await resp.text().catch(() => '') : '';
      console.error('Resend (notify) error', resp && resp.status, detail);
      return res.status(502).json({ ok: false, error: 'Could not send your message. Please email us directly.' });
    }

    // 2) Best-effort extras — never block or fail the response.
    const stamp = new Date().toISOString();

    // Phone/chat alert
    const alertText = `${isBooking ? '📅 Booking request' : '✉️ New enquiry'} from ${name} (${email})`
      + (isBooking && topic ? `\nTopic: ${topic}` : '')
      + (isBooking && (date || time) ? `\nWhen: ${date || '—'} ${time || ''}`.trim() : '')
      + (!isBooking && message ? `\n${String(message).slice(0, 300)}` : '');
    const jobs = [notifyChat(alertText)];

    // Store the lead for the weekly digest (capped list)
    jobs.push((async () => {
      const record = JSON.stringify({ t: stamp, type: isBooking ? 'booking' : 'enquiry', name, email, topic, date, time, message });
      const len = await redis(['RPUSH', 'leads', record]);
      if (typeof len === 'number' && len > 1000) await redis(['LTRIM', 'leads', -1000, -1]);
    })());

    // Auto-reply to the enquirer (only works once the sending domain is verified in Resend)
    const AUTOREPLY_FROM = process.env.AUTOREPLY_FROM || process.env.CONTACT_FROM;
    if (AUTOREPLY_FROM && !/onboarding@resend\.dev/.test(AUTOREPLY_FROM)) {
      const arSubject = isBooking ? 'We’ve got your booking request' : 'Thanks for getting in touch';
      const arText = `Hi ${name},\n\nThanks for reaching out to Imperium Business Intelligence. `
        + `We’ve received your ${isBooking ? 'booking request' : 'message'} and will be in touch within one business day.\n\n`
        + `Best regards,\nAndrew Hoyle\nImperium Business Intelligence Ltd\nandrew.hoyle@imperium-bi.co.uk`;
      const arHtml = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#222;line-height:1.6">`
        + `<p>Hi ${esc(name)},</p>`
        + `<p>Thanks for reaching out to Imperium Business Intelligence. We’ve received your ${isBooking ? 'booking request' : 'message'} and will be in touch within one business day.</p>`
        + `<p style="margin-top:20px">Best regards,<br><strong>Andrew Hoyle</strong><br>Imperium Business Intelligence Ltd<br>`
        + `<a href="mailto:andrew.hoyle@imperium-bi.co.uk">andrew.hoyle@imperium-bi.co.uk</a></p></div>`;
      jobs.push(
        resendSend({ from: AUTOREPLY_FROM, to: email, replyTo: TO, subject: arSubject, html: arHtml, text: arText })
          .catch((e) => { console.error('auto-reply error', e); })
      );
    }

    try { await Promise.all(jobs); } catch (e) { /* extras are best-effort */ }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact function error', err);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again or email us directly.' });
  }
};
