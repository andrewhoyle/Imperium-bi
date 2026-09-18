import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section, SectionHeading } from "@/src/components/ui";
import { about, site, clients, banking } from "@/src/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Imperium Business Intelligence is led directly by Andrew Hoyle, ACMA CGMA — 25 years across investment banking, SME finance and FP&A.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <div className="h-32 w-32 overflow-hidden rounded-full border border-line">
                <Image src="/andrew.jpg" alt="Andrew Hoyle" width={160} height={160} className="h-full w-full object-cover" />
              </div>
              <p className="mt-5 font-display text-2xl font-bold text-white">{about.name}</p>
              <p className="mt-1 font-display text-[0.62rem] uppercase tracking-[0.15em] text-muted">{about.title}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {about.creds.map((c) => (
                  <span key={c} className="border border-line px-3 py-1.5 font-display text-[0.58rem] uppercase tracking-[0.12em] text-muted">
                    {c}
                  </span>
                ))}
              </div>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block border-b border-brand/40 pb-0.5 font-display text-[0.6rem] uppercase tracking-[0.15em] text-brand hover:text-white"
              >
                View LinkedIn profile →
              </a>
            </div>
            <div className="border-l-2 border-brand pl-6">
              <p className="font-display text-[0.58rem] uppercase tracking-[0.4em] text-brand">About</p>
              {about.bio.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section alt>
        <Container>
          <SectionHeading eyebrow="Experience" title="Trusted where the numbers matter." />
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {clients.map((c) => (
              <div key={c.name} className="flex flex-col items-center justify-center gap-1 bg-bg-soft px-3 py-8 text-center">
                <span className="font-display text-lg font-bold text-white">{c.name}</span>
                <span className="font-display text-[0.55rem] uppercase tracking-[0.12em] text-faint">{c.scale}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-faint">Earlier product-control roles across {banking.join(", ")}.</p>
        </Container>
      </Section>
    </>
  );
}
