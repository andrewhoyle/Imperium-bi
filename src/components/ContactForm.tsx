"use client";

import { useRef, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { buttonClass } from "@/src/components/ui";
import { cn } from "@/src/lib/cn";
import { bookingTopics } from "@/src/content/site";

const field =
  "w-full rounded-xl border border-line bg-bg-soft px-4 py-3 text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-brand/40";
const label = "mb-1.5 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted";

export function ContactForm() {
  const loaded = useRef<number>(Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const date = String(data.get("date") || "");
    setStatus("sending");
    setMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: date ? "booking" : "contact",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          topic: data.get("topic"),
          date,
          time: data.get("time"),
          website: data.get("website"),
          elapsed: Date.now() - loaded.current,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong. Please email us directly.");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMsg((err as Error).message);
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-line bg-bg-soft p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand" />
        <h3 className="mt-3 font-display text-lg font-semibold text-white">Message sent</h3>
        <p className="mt-1 text-sm text-muted">
          Thanks — we&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Your name
          </label>
          <input id="name" name="name" required placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email address
          </label>
          <input id="email" name="email" type="email" required placeholder="you@company.com" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={label}>
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Tell us what you're trying to achieve…"
          className={cn(field, "resize-y")}
        />
      </div>

      <fieldset className="rounded-xl border border-line p-4">
        <legend className="px-2 font-display text-[0.62rem] uppercase tracking-[0.18em] text-faint">
          Prefer to book a call? (optional)
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="topic" className={label}>
              Topic
            </label>
            <select id="topic" name="topic" defaultValue="" className={field}>
              <option value="">—</option>
              {bookingTopics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className={label}>
              Preferred date
            </label>
            <input id="date" name="date" type="date" className={field} />
          </div>
          <div>
            <label htmlFor="time" className={label}>
              Time
            </label>
            <select id="time" name="time" defaultValue="Flexible" className={field}>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Flexible</option>
            </select>
          </div>
        </div>
      </fieldset>

      <button type="submit" disabled={status === "sending"} className={cn(buttonClass("primary"), "w-full sm:w-auto")}>
        <Send className={cn("h-4 w-4", status === "sending" && "animate-pulse")} />
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && <p className="text-sm text-amber-300">{msg}</p>}
      <p className="text-xs text-faint">No spam — your details are only used to reply to your enquiry.</p>
    </form>
  );
}
