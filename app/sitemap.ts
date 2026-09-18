import type { MetadataRoute } from "next";

const base = "https://imperium-bi.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/finance", "/data-bi", "/fractional", "/about", "/contact", "/privacy"];
  return routes.map((r) => ({
    url: `${base}${r}`,
    changeFrequency: r === "/privacy" ? "yearly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
