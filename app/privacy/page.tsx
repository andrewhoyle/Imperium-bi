import type { Metadata } from "next";
import { Container, Section } from "@/src/components/ui";
import { site } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Imperium Business Intelligence Ltd handles enquiry and business-development data.",
  alternates: { canonical: "/privacy" },
};

const sections: { h: string; body: React.ReactNode }[] = [
  {
    h: "1. Who we are",
    body: (
      <>
        {site.legalName}, registered in England &amp; Wales, company no. {site.companyNo}, registered office{" "}
        {site.address}. We are the data controller. Contact:{" "}
        <a className="text-brand hover:underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </>
    ),
  },
  {
    h: "2. When you contact us (inbound)",
    body: "If you submit an enquiry or booking form, we process the details you give us (name, email, message) to respond to and manage your enquiry — legal basis: our legitimate interest in answering you, and steps toward a contract. These are handled via our email and hosting providers and reach our inbox; we do not sell them.",
  },
  {
    h: "3. Business-development outreach (outbound)",
    body: "We process limited business contact details of people in their professional capacity (name, role, business email/phone, employer) sourced from public sources only (Companies House, company websites, public directories) to introduce our services to organisations we believe have a relevant need. Legal basis: legitimate interests (UK GDPR Art. 6(1)(f)); for electronic mail we rely on PECR's corporate-subscriber provisions and always include an easy opt-out. We hold a Legitimate Interests Assessment on file.",
  },
  {
    h: "4. Retention",
    body: "Enquiry data and prospect data are kept no longer than 24 months from the last meaningful interaction, then deleted. Opt-out records are kept indefinitely solely to honour your request.",
  },
  {
    h: "5. Sharing",
    body: "We do not sell your data. Reputable processors (email delivery, hosting) act on our instructions under agreements.",
  },
  {
    h: "6. Your rights",
    body: (
      <>
        Access, rectification, erasure, restriction, objection, portability — and you can object to marketing at any
        time (email above) and we&apos;ll stop. Complaints: the Information Commissioner&apos;s Office (
        <a className="text-brand hover:underline" href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
          ico.org.uk
        </a>
        ).
      </>
    ),
  },
  {
    h: "7. Cookies & analytics",
    body: "This website uses privacy-friendly, cookieless analytics (Vercel) to count visits. It sets no marketing or tracking cookies and collects no special-category data.",
  },
];

export default function PrivacyPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <p className="font-display text-[0.58rem] uppercase tracking-[0.4em] text-brand">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white">Privacy Notice</h1>
        <p className="mt-2 text-sm text-faint">{site.legalName} · Last updated: 18 September 2026</p>
        <div className="mt-8 space-y-6 leading-relaxed text-muted">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-lg font-semibold text-white">{s.h}</h2>
              <p className="mt-2">{s.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
