import type { MetadataRoute } from "next";
import { getAllNews } from "@/lib/news";

const BASE_URL = "https://shinesoft.co.jp";
const locales = ["ja", "en", "zh"];

const staticRoutes = [
  "",
  "/about/corporate",
  "/about/feature",
  "/services/software",
  "/services/infrastructure",
  "/services/cloud",
  "/services/training",
  "/services/research",
  "/news",
  "/recruit",
  "/contact",
  "/privacypolicy",
  "/sitemap",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  // News articles
  const news = getAllNews();
  for (const locale of locales) {
    for (const post of news) {
      entries.push({
        url: `${BASE_URL}/${locale}/news/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
