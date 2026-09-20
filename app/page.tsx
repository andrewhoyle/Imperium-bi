import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading, ButtonLink, Card } from "@/src/components/ui";
import { site, stats, clients, banking, advantages, howToBook } from "@/src/content/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-deep">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="aurora-orb" style={{ width: 460, height: 460, left: "-6%", top: "-24%", background: "#18d9c0" }} />
          <div
            className="aurora-orb"
            style={{ width: 380, height: 380, right: "2%", top: "-16%", background: "#1fa6c4", animationDelay: "-7s" }}
          />
          <div
            className="aurora-orb"
            style={{ width: 340, height: 340, left: "44%", top: "42%", background: "#0e9e8e", animationDelay: "-14s" }}
          />
        </div>
        <div className="hero-grid" aria-hidden="true" />
        <Container className="relative z-10 py-24 sm:py-32">
          <p className="font-display text-lg font-semibold uppercase tracking-[0.16em] text-brand sm:text-2xl">
            {site.hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-7xl">
            {site.hero.titleLead} <span className="text-gradient">{site.hero.titleAccent}</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{site.hero.lead}</p>
          <p className="mt-4 max-w-2xl text-base font-medium text-slate-300">{site.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="primary">
              Book a call <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/fractional" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Fractional
            </ButtonLink>
          </div>
          <div className="mt-9 inline-flex items-center gap-2 rounded border border-brand/30 px-3 py-2 font-display text-[0.6rem] uppercase tracking-[0.15em] text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {site.hero.availability}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <div className="border-y border-line">
        <Container className="grid grid-cols-2 gap-px sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="py-6 pr-6">
              <div className="font-display text-3xl font-bold text-brand">
                {s.stat}
                {s.unit && <span className="text-base font-normal text-muted"> {s.unit}</span>}
              </div>
              <div className="mt-1 font-display text-[0.6rem] uppercase tracking-[0.15em] text-muted">{s.label}</div>
            </div>
          ))}
        </Container>
      </div>

      {/* What we do */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Own the numbers — then make the data work."
            lead="A CIMA-qualified finance leader with an advanced IT skillset. I don't just advise — I build: automating and re-engineering the processes behind the numbers, so the reporting ends up running itself."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card>
              <h3 className="font-display text-lg font-semibold text-white">Finance &amp; FP&amp;A</h3>
              <p className="mt-2 text-sm text-muted">
                Interim FC cover that owns month-end, FP&amp;A and board reporting — then automates the close so it runs in days, not weeks.
              </p>
              <Link href="/finance" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-white">
                Explore finance <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
            <Card>
              <h3 className="font-display text-lg font-semibold text-white">Data, BI &amp; AI</h3>
              <p className="mt-2 text-sm text-muted">
                Dashboards, pipelines, analytics, automation and practical AI — the same rigour applied to your data.
              </p>
              <Link href="/data-bi" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-white">
                Explore data &amp; BI <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
            <Card>
              <h3 className="font-display text-lg font-semibold text-white">Fractional &amp; interim</h3>
              <p className="mt-2 text-sm text-muted">
                Senior finance leadership from a day a month — the advantage of an FD without the full-time hire.
              </p>
              <Link href="/fractional" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-white">
                Why fractional <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Why Imperium */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why Imperium"
            title="A rare combination — and the reason it sticks."
            lead="Most finance people can tell you what the numbers say. Most IT people can't read a balance sheet. I do both, so the fix is built in, not just recommended."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {advantages.map((a) => (
              <Card key={a.title}>
                <h3 className="font-display text-lg font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.blurb}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Simple to start — book it your way."
            lead="A single project, a one-off call, or a regular slot — weekly, monthly, a day a month, or whatever cadence suits you. Scale it up or down, or stop, any time."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {howToBook.map((s) => (
              <Card key={s.n}>
                <div className="font-display text-2xl font-bold text-brand">{s.n}</div>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.blurb}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact" variant="primary">
              Book a call <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <div className="flex flex-wrap gap-2">
              {["One-off", "Weekly", "Monthly", "A day a month", "Ongoing"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-line px-3 py-1.5 font-display text-[0.6rem] uppercase tracking-[0.12em] text-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Experience */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Experience"
            title="Trusted where the numbers matter."
            lead="25 years across investment-banking product control, SME financial control and FP&A — including interim work for organisations that can't afford to get their numbers wrong."
          />
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {clients.map((c) => (
              <div key={c.name} className="flex flex-col items-center justify-center gap-1 bg-bg-soft px-3 py-8 text-center">
                <span className="font-display text-lg font-bold text-white">{c.name}</span>
                <span className="font-display text-[0.55rem] uppercase tracking-[0.12em] text-faint">{c.scale}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-faint">
            Earlier product-control roles across {banking.join(", ")}.
          </p>
        </Container>
      </Section>

      {/* CTA */}
      <Section dark className="!bg-deep">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Let&apos;s talk about your numbers.</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Book a call or send a message — we&apos;ll be in touch within one business day.
          </p>
          <div className="mt-7 flex justify-center">
            <ButtonLink href="/contact" variant="white">
              Book a call <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
