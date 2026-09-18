import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading, ButtonLink, Card } from "@/src/components/ui";
import { engagements, fractionalAdvantages, process } from "@/src/content/site";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "Fractional, interim or contract — senior finance leadership without the full-time hire. Have us a day a month to streamline, automate and keep your numbers board-ready.",
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  return (
    <>
      {/* Engagement models */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Ways to work together"
            title="Fractional, interim or contract."
            lead="Flexible ways to get senior finance leadership — from a day a month, to full interim cover, to a fixed-scope project. You buy exactly what you need."
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

      {/* Fractional advantage */}
      <Section dark className="!bg-deep">
        <Container>
          <SectionHeading
            eyebrow="Why fractional"
            title="A day a month that pays for itself."
            lead="You don't need a full-time FD to fix your finance function. Have me on tap — a day a week or a day a month — to streamline, automate and keep the numbers board-ready, at a fraction of the cost."
            dark
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {fractionalAdvantages.map((a) => (
              <div key={a.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-display font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{a.blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section alt>
        <Container>
          <SectionHeading eyebrow="The method" title="How an engagement runs." center />
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div key={p.n} className="flex flex-col gap-3 bg-bg-soft p-6">
                <span className="font-display text-2xl font-extrabold text-brand opacity-50">{p.n}</span>
                <span className="font-display font-semibold text-white">{p.title}</span>
                <span className="text-sm leading-relaxed text-muted">{p.blurb}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/contact" variant="primary">
              Talk about a fractional day <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
