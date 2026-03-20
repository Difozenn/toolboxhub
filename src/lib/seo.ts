import type { Metadata } from "next";
import type { Tool, Category } from "./types";
import { categories } from "./tools";

// ── Constants ────────────────────────────────────────────────────────────────

export const BASE_URL = "https://toolboxhub.io";
export const SITE_NAME = "ToolboxHub";
export const SITE_DESCRIPTION =
  "100+ free online tools for text, development, math, conversion, and more. No signup required.";

// ── Helper: category label lookup ────────────────────────────────────────────

function getCategoryLabel(categoryValue: string): string {
  const cat = categories.find((c) => c.value === categoryValue);
  return cat?.label ?? categoryValue;
}

// ── Tool Metadata ────────────────────────────────────────────────────────────

export function generateToolMetadata(tool: Tool): Metadata {
  const title = `${tool.name} - Free Online ${getCategoryLabel(tool.category)} | ${SITE_NAME}`;
  const description = tool.description;
  const url = `${BASE_URL}/tools/${tool.slug}`;

  return {
    title,
    description,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ── Category Metadata ────────────────────────────────────────────────────────

export function generateCategoryMetadata(category: Category): Metadata {
  const title = `${category.label} - Free Online Tools | ${SITE_NAME}`;
  const description = `Browse free online ${category.label.toLowerCase()} on ToolboxHub. No signup required.`;
  const url = `${BASE_URL}/categories/${category.value}`;

  return {
    title,
    description,
    keywords: [
      category.label.toLowerCase(),
      "free online tools",
      "no signup",
      category.value,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ── JSON-LD: WebApplication (per tool) ───────────────────────────────────────

export function generateToolJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: `${BASE_URL}/tools/${tool.slug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
}

// ── JSON-LD: Organization + WebSite (site-level) ────────────────────────────

export function generateSiteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      logo: `${BASE_URL}/icon-512.png`,
      description: SITE_DESCRIPTION,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
      description: SITE_DESCRIPTION,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

// ── JSON-LD: BreadcrumbList ──────────────────────────────────────────────────

export function generateBreadcrumbJsonLd(
  items: { label: string; href: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href.startsWith("http")
        ? item.href
        : `${BASE_URL}${item.href}`,
    })),
  };
}
