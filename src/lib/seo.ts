import type { Metadata } from "next";
import { site } from "@/src/content/site";

/**
 * Per-page metadata: its own canonical URL, and Open Graph / Twitter cards that
 * describe this page rather than the homepage. Next merges `openGraph` shallowly,
 * so every field — including the share image — is set here.
 * Keep descriptions between 120 and 160 characters so search results don't cut them.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.legalName,
      locale: "en_GB",
      type: "website",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.png"],
    },
  };
}
