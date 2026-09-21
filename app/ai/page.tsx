import type { Metadata } from "next";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading, ButtonLink, buttonClass } from "@/src/components/ui";
import { aiSite, aiServices, aiSuite } from "@/src/content/site";

export const metadata: Metadata = {
  title: "AI",
  description:
    "Practical AI, built and governed — LLM automation, governed agents, AI strategy and custom AI software, through Imperium's dedicated AI practice, AIStrategise.",
  alternates: { canonical: "/ai" },
};

export default function AiPage() {
  return (
    <>
      {/* Intro */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Artificial Intelligence"
            title={aiSite.tagline}
            lead={aiSite.lead}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={aiSite.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("primary")}
            >
              Explore AIStrategise <ArrowUpRight className="h-4 w-4" />
            </a>
            <ButtonLink href="/contact" variant="outline">
              Book a call
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section alt>
        <Container>
          <SectionHeading
            eyebrow="What the AI practice does"
            title="Strategy and engineering, in one place."
            lead="Most AI advice stops at a slide deck. AIStrategise pairs boardroom-level planning with the engineering to actually build and govern what it recommends."
          />
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {aiServices.map((s) => (
              <div key={s.name} className="flex flex-col gap-2 bg-bg-soft p-5">
                <span className="font-display text-sm font-semibold text-white">{s.name}</span>
                <span className="text-sm leading-relaxed text-muted">{s.blurb}</span>
                <span className="mt-auto pt-2 font-display text-[0.62rem] uppercase tracking-[0.15em] text-faint">
                  {s.sector}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Imperium Suite */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The platform"
            title={aiSuite.name}
            lead={aiSuite.blurb}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {aiSuite.components.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line bg-bg-soft px-4 py-2 font-display text-xs font-semibold text-white"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-faint">
            Governance-first by design — approval workflows, audit trails and visibility built in, so AI stays
            accountable in regulated and finance-critical environments.
          </p>
        </Container>
      </Section>

      {/* CTA */}
      <Section dark className="!bg-deep">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Thinking about AI, but wary of the hype?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Start with a conversation about where it would genuinely pay off — no jargon, no obligation.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="white">
              Book a call <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <a
              href={aiSite.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("outline") + " border-white/20 text-white hover:bg-white/10"}
            >
              Visit AIStrategise <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
