import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/src/components/JsonLd";
import { Container, Section, SectionHeading, ButtonLink, buttonClass } from "@/src/components/ui";
import { ServiceGrid } from "@/src/components/ServiceGrid";
import { financeServices, process, boardJudgement } from "@/src/content/site";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

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

      <Section dark className="!bg-deep">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: boardJudgement.name,
            url: boardJudgement.url,
            description: boardJudgement.lead,
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "50", priceCurrency: "GBP" },
          }}
        />
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            <SectionHeading dark eyebrow={boardJudgement.eyebrow} title={boardJudgement.title} lead={boardJudgement.lead} />
            <div>
              <ul className="grid gap-3">
                {boardJudgement.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {pt}
                  </li>
                ))}
              </ul>
              <a
                href={boardJudgement.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("outline") + " mt-8 border-white/20 text-white hover:bg-white/10"}
              >
                See {boardJudgement.name} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <Image
            src="/products/boardjudgement.webp"
            alt="BoardJudgement reconciling sources into a board pack"
            width={1200}
            height={750}
            className="mt-12 w-full rounded-xl border border-white/10 shadow-2xl"
          />
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
