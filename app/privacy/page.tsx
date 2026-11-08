import type { Metadata } from "next";
import { Container, Section } from "@/src/components/ui";
import { site } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Imperium Business Intelligence Ltd handles enquiry and business-development data.",
  alternates: { canonical: "/privacy" },
};

const sections: { h: string; body: React.ReactNode }[] = [
  {
    h: "1. Who we are",
    body: (
      <>
        {site.legalName}, registered in England &amp; Wales, company no. {site.companyNo},
        registered office {site.address}. We are the data controller. Contact:{" "}
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
    body: "We keep enquiry and business-contact data for as long as it remains relevant to the purpose for which we hold it (responding to you, or ongoing business development), and no longer than is necessary for that purpose; there is no fixed deletion period. You can ask us to erase your data at any time (see your rights below). Opt-out records are kept indefinitely solely to honour your request.",
  },
  {
    h: "5. Sharing",
    body: "We do not sell your data. Reputable processors (email delivery, hosting and PostHog analytics, hosted in the EU) act on our instructions under agreements.",
  },
  {
    h: "6. Your rights",
    body: (
      <>
        Access, rectification, erasure, restriction, objection, portability — and you can object to
        marketing at any time (email above) and we&apos;ll stop. Complaints: the Information
        Commissioner&apos;s Office (
        <a
          className="text-brand hover:underline"
          href="https://ico.org.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          ico.org.uk
        </a>
        ).
      </>
    ),
  },
  {
    h: "7. Cookies & analytics",
    body: (
      <>
        <p>
          The site sets no marketing cookies and collects no special-category data. We use PostHog
          analytics (hosted in the EU, acting as our processor) in two ways.
        </p>
        <p className="mt-2">
          <strong className="text-white">Anonymous counting, without cookies.</strong> By default we
          count the pages viewed, clicks (never what you type), browser and device type and
          approximate region, to understand and improve the site. We send page addresses without any
          query string or fragment, and remove email addresses from what is clicked. Nothing is
          stored on or read from your device for this, no identifier is kept for you and we cannot
          link visits to a person; your IP address and browser details are used only briefly to
          produce aggregate counts. Legal basis: our legitimate interests in understanding and
          improving the service. You can object at any time under &ldquo;Cookie settings&rdquo; in
          the footer by choosing &ldquo;Don&apos;t count my visits at all&rdquo;; we then send
          nothing and remember only that choice, in your browser&apos;s local storage.
        </p>
        <p className="mt-2">
          <strong className="text-white">Analytics with device storage, only if you accept.</strong>{" "}
          If you choose &ldquo;Accept&rdquo;, PostHog also keeps an identifier in your
          browser&apos;s local storage so it can recognise your device across visits and show us how
          individual visitors use the site. Legal basis: your consent, which you can withdraw at any
          time under &ldquo;Cookie settings&rdquo;; withdrawing removes what PostHog stored and
          returns you to anonymous counting.
        </p>
        <p className="mt-2">
          We also use Vercel Web Analytics, which sets no cookies and counts visits without
          identifying you. Choosing &ldquo;Don&apos;t count my visits at all&rdquo; stops it too.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <p className="font-display text-[0.58rem] uppercase tracking-[0.4em] text-brand">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white">Privacy Notice</h1>
        <p className="mt-2 text-sm text-faint">{site.legalName} · Last updated: 8 November 2026</p>
        <div className="mt-8 space-y-6 leading-relaxed text-muted">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-lg font-semibold text-white">{s.h}</h2>
              <div className="mt-2">{s.body}</div>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
