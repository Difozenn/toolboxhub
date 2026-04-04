import Link from "next/link";
import type { Metadata } from "next";
import { categories, getToolsByCategory } from "@/lib/tools";
import {
  SITE_NAME,
  BASE_URL,
  generateBreadcrumbJsonLd,
  generateItemListJsonLd,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `Free Online Tool Categories — Browse by Type | ${SITE_NAME}`,
  description: `Browse ${categories.length} categories of free online tools. Find text, developer, math, finance, health, and more tools — no signup required.`,
  keywords: [
    "free online tools",
    "tool categories",
    "developer tools",
    "text tools",
    "calculators",
    "converters",
    "generators",
  ],
  alternates: { canonical: `${BASE_URL}/categories` },
  openGraph: {
    title: `Free Online Tool Categories | ${SITE_NAME}`,
    description: `Browse ${categories.length} categories of free online tools — no signup required.`,
    url: `${BASE_URL}/categories`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Online Tool Categories | ${SITE_NAME}`,
    description: `Browse ${categories.length} categories of free online tools.`,
  },
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "Categories", href: "/categories" },
      ])} />
      <JsonLd data={generateItemListJsonLd(
        "Free Online Tool Categories",
        `Browse ${categories.length} categories of free online tools at ToolboxHub.`,
        categories.map((c) => ({ name: c.label, url: `${BASE_URL}/categories/${c.value}` })),
      )} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Free Online Tool Categories
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse {categories.length} categories of free online tools — no signup required
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const count = getToolsByCategory(cat.value).length;
          return (
            <Link
              key={cat.value}
              href={`/categories/${cat.value}`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30"
            >
              <span className="text-4xl" role="img" aria-label={cat.label}>
                {cat.icon}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cat.label}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {count} free {count === 1 ? "tool" : "tools"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
