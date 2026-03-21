import type { MetadataRoute } from "next";
import { tools, categories } from "@/lib/tools";
import { BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Homepage
  const homepage: MetadataRoute.Sitemap[number] = {
    url: BASE_URL,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1.0,
  };

  // All tools page
  const allToolsPage: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/tools`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  };

  // Categories index page
  const categoriesPage: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/categories`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  };

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/categories/${cat.value}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [homepage, allToolsPage, categoriesPage, ...categoryPages, ...toolPages];
}
