import type { NextConfig } from "next";

/**
 * Content Security Policy. Next.js inlines its bootstrap scripts and (with inlineCss) the
 * stylesheet, so scripts and styles need 'unsafe-inline'. PostHog (EU) is the only off-site
 * host the browser talks to; Vercel Analytics and next/font are served from this origin.
 * No frame-ancestors: the site may be shown in a preview frame (e.g. FolioNames).
 */
const posthogHosts = "https://eu.i.posthog.com https://eu-assets.i.posthog.com";
const csp = [
  "default-src 'self'",
  // `next dev` needs eval for fast refresh; production builds never do.
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} ${posthogHosts}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${posthogHosts}`,
  "font-src 'self' data:",
  `connect-src 'self' ${posthogHosts}`,
  "worker-src 'self' blob:",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    // AVIF first (smaller), WebP fallback. 192 and 320 cover 2x logos and
    // small cards without jumping to the next size up.
    formats: ["image/avif", "image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 320, 384],
  },
  experimental: {
    // Inline the (small, Tailwind) CSS so first-time visitors don't wait on a
    // render-blocking stylesheet request. Most visitors to these sites are new.
    inlineCss: true,
  },
};

export default nextConfig;
