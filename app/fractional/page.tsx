import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading, ButtonLink, Card } from "@/src/components/ui";
import { engagements, fractionalAdvantages, fractionalHow, process } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Fractional finance leadership",
  description:
    "A finance director at a fraction of the cost. Fractional finance leadership — a day a week or month to streamline, automate and keep your numbers board-ready, without a full-time hire.",
  alternates: { canonical: "/fractional" },
};

export default function FractionalPage() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden bg-deep">
        <div className="hero-grid" aria-hidden="true" />
        <Container className="relative z-10 py-20 sm:py-28">
          <p className="font-display text-[0.62rem] uppercase tracking-[0.4em] text-brand">Fractional</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
            A finance director, a <span className="text-gradient">fraction</span> of the cost.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Growing businesses need senior finance expertise long before they can justify a full-time FD. Fractional
            finance leadership gives you that expertise on tap — a day a week or a day a month to streamline, automate
            and keep the numbers board-ready — for a fraction of the cost of a hire.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="white">
              Book a fractional day <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* The advantage for your company */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The advantage for your company"
            title="Why fractional works."
            lead="You get the seniority, rigour and continuity of an experienced finance leader — without the salary, the overhead or the recruitment risk."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fractionalAdvantages.map((a) => (
              <Card key={a.title}>
                <h3 className="font-display font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.blurb}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section alt>
        <Container>
          <SectionHeading eyebrow="How it works" title="Simple, flexible, no lock-in." center />
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
            {fractionalHow.map((h) => (
              <div key={h.title} className="rounded-2xl border border-line bg-bg-soft p-6">
                <h3 className="font-display font-semibold text-white">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{h.blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Engagement models */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Ways to work together"
            title="Not just fractional."
            lead="Prefer full cover or a one-off piece of work? The same senior expertise, however you want to buy it."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {engagements.map((e) => (
              <Card key={e.name} className="flex flex-col">
                <span className="font-display text-[0.6rem] uppercase tracking-[0.15em] text-brand">{e.tag}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{e.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.blurb}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-muted">
                      <span className="text-brand">▸</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process + CTA */}
      <Section dark className="!bg-deep">
        <Container>
          <SectionHeading eyebrow="The method" title="How an engagement runs." center dark />
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div key={p.n} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="font-display text-2xl font-extrabold text-brand opacity-60">{p.n}</span>
                <span className="mt-2 block font-display font-semibold text-white">{p.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-slate-300">{p.blurb}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/contact" variant="white">
              Talk about a fractional day <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
