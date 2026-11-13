import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/src/lib/seo";
import { Container, Section } from "@/src/components/ui";
import { site } from "@/src/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms on which Imperium Business Intelligence Ltd provides this website: acceptable use, our content, other sites, liability and the law that applies.",
  path: "/terms",
});

const link = "text-brand hover:underline";

const sections: { h: string; body: React.ReactNode }[] = [
  {
    h: "1. Who we are",
    body: (
      <>
        This website is run by {site.legalName}, registered in England &amp; Wales, company no.{" "}
        {site.companyNo}, registered office {site.address} (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
        These terms apply to your use of {site.domain}. By using the site you accept them; if you do
        not, please do not use it.
      </>
    ),
  },
  {
    h: "2. What the site is for",
    body: "The site describes our finance, business intelligence and AI consultancy services and lets you contact us or book a discovery call. It is free to use and needs no account. Nothing on it is an offer to provide services: any engagement, fractional, interim, contract or project, is agreed separately in writing, and those written terms govern the work, its fees and our responsibilities. We sell nothing through the site and take no payments on it.",
  },
  {
    h: "3. Information, not advice",
    body: "The content of the site is general information about what we do. It is not financial, accounting, tax, legal or investment advice, and you should not rely on it as such. Advice is given only within an agreed engagement, based on your circumstances. We try to keep the site accurate and current, but we do not promise that everything on it is complete or up to date.",
  },
  {
    h: "4. Contacting us",
    body: (
      <>
        When you send an enquiry or booking request, please give accurate details and do not send
        confidential or sensitive information until we have agreed how it will be handled. We use
        what you send as described in our{" "}
        <Link className={link} href="/privacy">
          Privacy Notice
        </Link>
        . Sending an enquiry does not create a client relationship.
      </>
    ),
  },
  {
    h: "5. Acceptable use",
    body: "Please use the site lawfully. Do not try to gain unauthorised access to it or the systems behind it, interfere with how it works, introduce malware, overload it, use the contact form to send spam or abusive messages, or collect data from it by automated means beyond normal search-engine indexing.",
  },
  {
    h: "6. Intellectual property",
    body: "The site and its content, including text, design, logos, screenshots and graphics, belong to us or our licensors. You may view and print pages for your own reference, and share links to them. Any other copying, reproduction or reuse needs our written permission. Product names such as BoardJudgement and AIStrategise, and client and employer names, are used to describe our work and remain the property of their owners.",
  },
  {
    h: "7. Other websites",
    body: "The site links to other websites, including AIStrategise, the platforms we have built, LinkedIn and FolioNames. Those sites have their own terms and privacy policies, and we are not responsible for their content or for how they handle your data.",
  },
  {
    h: "8. Availability",
    body: "We may change, suspend or withdraw the site, or any part of it, at any time without notice. We do not guarantee that it will always be available or free of errors or viruses; please use your own protection.",
  },
  {
    h: "9. Our liability",
    body: "The site is provided free of charge and as it is. To the extent the law allows, we exclude all warranties and are not liable for any loss arising from your use of, or reliance on, the site, including loss of profit, business, data or opportunity, or any indirect loss. Nothing in these terms limits liability that cannot be limited by law, including for death or personal injury caused by negligence, or for fraud. Our liability for services is set out in the written terms of each engagement.",
  },
  {
    h: "10. Changes to these terms",
    body: "We may update these terms from time to time. The date below shows when they last changed, and the version on this page applies when you use the site.",
  },
  {
    h: "11. Law",
    body: "These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction over any dispute about them.",
  },
  {
    h: "12. Contact",
    body: (
      <>
        Questions about these terms:{" "}
        <a className={link} href={`mailto:${site.email}`}>
          {site.email}
        </a>
        , or write to us at {site.address}.
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <p className="font-display text-[0.58rem] uppercase tracking-[0.4em] text-brand">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white">Terms of Use</h1>
        <p className="mt-2 text-sm text-faint">{site.legalName} · Last updated: 13 November 2026</p>
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
