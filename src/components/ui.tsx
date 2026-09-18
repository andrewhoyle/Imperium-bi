import * as React from "react";
import Link from "next/link";
import { cn } from "@/src/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  alt,
  dark,
  className,
  children,
}: {
  id?: string;
  alt?: boolean;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-24", alt && "bg-bg-soft", dark && "bg-deep text-white", className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-semibold uppercase tracking-[0.18em]",
        dark ? "text-cyan-300" : "text-brand",
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark,
  center,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl",
          dark && "text-white",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-slate-300" : "text-muted")}>
          {lead}
        </p>
      )}
    </div>
  );
}

type BtnVariant = "primary" | "outline" | "white" | "ghost";
const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50";
const btnVariants: Record<BtnVariant, string> = {
  primary: "bg-brand text-dark hover:bg-white",
  outline: "border border-line text-ink hover:bg-bg-soft",
  white: "bg-white text-dark hover:bg-slate-200",
  ghost: "text-ink hover:bg-bg-soft",
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: BtnVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(btnBase, btnVariants[variant], className)}>
      {children}
    </Link>
  );
}

export function buttonClass(variant: BtnVariant = "primary"): string {
  return cn(btnBase, btnVariants[variant]);
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-line bg-bg-soft p-6", className)}>
      {children}
    </div>
  );
}
