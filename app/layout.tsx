import type { Metadata, Viewport } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/src/components/SiteHeader";
import { SiteFooter } from "@/src/components/SiteFooter";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/src/content/site";

const heading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});
const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const siteUrl = "https://imperium-bi.co.uk";
const titleDefault = "Imperium Business Intelligence — Finance, BI & AI";
const description =
  "Fractional, interim and contract finance leadership, business intelligence and AI. CIMA-qualified, owner-led by Andrew Hoyle. Month-end that runs itself.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: titleDefault, template: `%s — ${site.name}` },
  description,
  applicationName: site.name,
  authors: [{ name: "Andrew Hoyle" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: titleDefault,
    description,
    url: siteUrl,
    siteName: site.legalName,
    locale: "en_GB",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: { card: "summary_large_image", title: titleDefault, description, images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#080b11" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  url: siteUrl,
  description,
  email: site.email,
  telephone: site.phone,
  areaServed: "GB",
  founder: { "@type": "Person", name: "Andrew Hoyle", jobTitle: "Interim Financial Controller" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "29 Cliffe Avenue",
    addressLocality: "Margate",
    addressRegion: "Kent",
    postalCode: "CT9 5DU",
    addressCountry: "GB",
  },
  sameAs: [site.linkedin, "https://aistrategise.com"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-dark"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
