import type { MetadataRoute } from "next";

const baseUrl = "https://afribridgeagro.trade";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/privacy",
    "/terms",
    "/trade-facilitation-disclaimer",
    "/cookie-notice"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.5
  }));
}
