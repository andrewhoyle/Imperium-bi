"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { Service } from "@/src/content/site";

export function ServiceGrid({ services }: { services: Service[] }) {
  const [active, setActive] = useState<Service | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActive(s)}
            className="group relative flex flex-col gap-2 bg-bg-soft p-5 text-left transition-colors hover:bg-[#111926] focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-brand"
          >
            <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-faint transition-colors group-hover:text-brand" />
            <span className="font-display text-sm font-semibold text-white">{s.name}</span>
            <span className="text-sm leading-relaxed text-muted">{s.blurb}</span>
            <span className="mt-auto pt-2 font-display text-[0.62rem] uppercase tracking-[0.15em] text-faint">
              {s.sector}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={(e) => e.target === e.currentTarget && setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-bg-soft p-8"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 text-faint hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-brand">
              {active.sector}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">{active.name}</h3>
            <p className="mt-3 leading-relaxed text-muted">{active.detail.body}</p>
            <ul className="mt-5 flex flex-col gap-2">
              {active.detail.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-muted">
                  <span className="text-brand">▸</span>
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-1 font-display text-xs font-semibold uppercase tracking-[0.15em] text-brand hover:text-white"
            >
              Discuss this →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
