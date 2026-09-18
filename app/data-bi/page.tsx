import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/src/components/ui";
import { ServiceGrid } from "@/src/components/ServiceGrid";
import { dataServices, aiItems } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Data, BI & AI",
  description:
    "Dashboards, data pipelines, analytics, automation and practical AI — the same rigour applied to your data.",
  alternates: { canonical: "/data-bi" },
};

export default function DataBiPage() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Data, BI & AI"
            title="The same rigour, applied to your data."
            lead="Beyond finance, the same discipline for any team that needs it — dashboards, pipelines, analytics and practical AI."
          />
          <div className="mt-10">
            <ServiceGrid services={dataServices} />
          </div>
        </Container>
      </Section>

      <Section alt>
        <Container>
          <SectionHeading
            eyebrow="AI & Automation"
            title="AI, applied to your business."
            lead="AI only creates value when it's pointed at the right problem. We cut through the hype — pinpointing where automation and machine learning genuinely move the needle, then building it into the way your business already works."
          />
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {aiItems.map((a) => (
              <div key={a.title} className="flex flex-col gap-2 bg-bg-soft p-6">
                <span className="font-display font-semibold text-white">{a.title}</span>
                <span className="text-sm leading-relaxed text-muted">{a.blurb}</span>
                <span className="mt-auto pt-2 font-display text-[0.6rem] uppercase tracking-[0.15em] text-faint">
                  {a.sector}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-muted">
            Need deeper AI — LLM automation, specialist agents or governed AI with Agent Shield? That&apos;s delivered
            through our dedicated AI practice,{" "}
            <a
              href="https://aistrategise.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              AIStrategise →
            </a>
          </p>
        </Container>
      </Section>
    </>
  );
}
