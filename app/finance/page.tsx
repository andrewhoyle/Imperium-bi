import type { Metadata } from "next";
import { Container, Section, SectionHeading, ButtonLink } from "@/src/components/ui";
import { ServiceGrid } from "@/src/components/ServiceGrid";
import { financeServices, process } from "@/src/content/site";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Finance & FP&A",
  description:
    "Interim financial control, month-end automation, FP&A, board reporting and controls — the numbers owned end to end.",
  alternates: { canonical: "/finance" },
};

export default function FinancePage() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Finance & FP&A"
            title="Own the numbers, end to end."
            lead="Twenty-five years owning the numbers — investment-banking product control, SME financial control and FP&A. I stabilise finance functions under pressure, automate the close, and leave behind reporting your team can trust."
          />
          <div className="mt-10">
            <ServiceGrid services={financeServices} />
          </div>
        </Container>
      </Section>

      <Section alt>
        <Container>
          <SectionHeading eyebrow="How we deliver" title="Four steps, no six-month audit." center />
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
              Discuss an engagement <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
