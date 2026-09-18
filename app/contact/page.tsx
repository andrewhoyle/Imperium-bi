import type { Metadata } from "next";
import { Container, Section } from "@/src/components/ui";
import { ContactForm } from "@/src/components/ContactForm";
import { site } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a call or send a message — we'll be in touch within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <p className="font-display text-[0.58rem] uppercase tracking-[0.4em] text-brand">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white">
          Let&apos;s talk about your <span className="text-brand">numbers.</span>
        </h1>
        <p className="mt-3 text-muted">
          Tell us what you&apos;re trying to solve — or book a call. We&apos;ll be in touch within one business day.
        </p>

        <div className="mt-8">
          <ContactForm />
        </div>

        <p className="mt-8 text-sm text-faint">
          Or email{" "}
          <a href={`mailto:${site.email}`} className="text-muted hover:text-accent">
            {site.email}
          </a>{" "}
          · call{" "}
          <a href={`tel:${site.phone}`} className="text-muted hover:text-accent">
            {site.phoneDisplay}
          </a>
        </p>
      </Container>
    </Section>
  );
}
