import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
