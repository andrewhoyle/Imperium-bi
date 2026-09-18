"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav } from "@/src/content/site";
import { buttonClass } from "@/src/components/ui";
import { cn } from "@/src/lib/cn";

function Wordmark() {
  return (
    <span className="font-display text-lg font-extrabold uppercase tracking-[0.14em] text-white sm:text-xl">
      Imperium <span className="text-brand">BI</span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label="Imperium BI home" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={44} height={30} priority className="h-8 w-auto" />
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={cn(
                "font-display text-xs uppercase tracking-[0.14em] transition-colors",
                isActive(n.href) ? "text-white" : "text-muted hover:text-accent",
              )}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className={buttonClass("primary")}>
            Book a call
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-1 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={cn("border-t border-line md:hidden", open ? "block" : "hidden")}>
        <div className="space-y-1 px-5 py-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-2 py-2 font-display text-xs uppercase tracking-[0.14em]",
                isActive(n.href)
                  ? "bg-bg-soft text-white"
                  : "text-muted hover:bg-bg-soft hover:text-accent",
              )}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={cn(buttonClass("primary"), "mt-2 w-full")}
          >
            Book a call
          </Link>
        </div>
      </div>
    </header>
  );
}
