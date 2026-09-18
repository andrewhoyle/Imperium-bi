import Link from "next/link";
import { nav, site } from "@/src/content/site";
import { Container } from "@/src/components/ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-soft">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <span className="font-display text-lg font-extrabold uppercase tracking-[0.14em] text-white">
            Imperium <span className="text-brand">BI</span>
          </span>
          <p className="mt-3 text-sm text-muted">
            Finance leadership, BI and AI — fractional, interim or contract. Owner-led by{" "}
            {site.legalName.replace(" Ltd", "")}, delivered directly by Andrew Hoyle, ACMA CGMA.
          </p>
          <p className="mt-4 text-sm">
            Also see our AI practice:{" "}
            <a
              href="https://aistrategise.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              AIStrategise
            </a>
          </p>
        </div>

        <div>
          <div className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-faint">
            Explore
          </div>
          <nav className="mt-3 flex flex-col gap-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="text-sm text-muted hover:text-accent">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <div className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-faint">
            Contact
          </div>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted">
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              {site.email}
            </a>
            <a href={`tel:${site.phone}`} className="hover:text-accent">
              {site.phoneDisplay}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
        <span>
          © 2026 {site.legalName} · Company No. {site.companyNo}
        </span>
        <span>
          <Link href="/privacy" className="hover:text-accent">
            Privacy Notice
          </Link>{" "}
          · {site.address}
        </span>
      </Container>
    </footer>
  );
}
