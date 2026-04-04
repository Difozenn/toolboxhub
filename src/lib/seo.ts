import type { Metadata } from "next";
import type { Tool, Category, FAQ, HowToStep } from "./types";
import { categories } from "./tools";

// ── Constants ────────────────────────────────────────────────────────────────

export const BASE_URL = "https://toolboxhub.net";
export const SITE_NAME = "ToolboxHub";
export const SITE_DESCRIPTION =
  "500+ free online tools for text, development, math, finance, health, and more. No signup required.";

// ── Helper: category label lookup ────────────────────────────────────────────

function getCategoryLabel(categoryValue: string): string {
  const cat = categories.find((c) => c.value === categoryValue);
  return cat?.label ?? categoryValue;
}

// ── Helper: smart description truncation ─────────────────────────────────────

function truncateDescription(text: string, maxLen = 155): string {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastPeriod = truncated.lastIndexOf(". ");
  if (lastPeriod > 80) return truncated.slice(0, lastPeriod + 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > 0 ? truncated.slice(0, lastSpace) + "..." : truncated + "...";
}

// ── Tool Metadata ────────────────────────────────────────────────────────────

export function generateToolMetadata(tool: Tool): Metadata {
  const title = `${tool.name} - Free Online Tool | ${SITE_NAME}`;
  const description = tool.longDescription
    ? truncateDescription(tool.longDescription)
    : tool.description;
  const url = `${BASE_URL}/tools/${tool.slug}`;

  return {
    title,
    description,
    keywords: [
      ...tool.keywords,
      "free online tool",
      "no signup",
      getCategoryLabel(tool.category).toLowerCase(),
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

// ── Category Metadata ────────────────────────────────────────────────────────

export function generateCategoryMetadata(
  category: Category,
  toolCount: number,
): Metadata {
  const title = `Free ${category.label} Online - ${toolCount}+ Browser Tools | ${SITE_NAME}`;
  const description = category.description
    ? truncateDescription(category.description)
    : `Browse ${toolCount}+ free online ${category.label.toLowerCase()} at ToolboxHub. No signup required — all tools run in your browser.`;
  const url = `${BASE_URL}/categories/${category.value}`;

  return {
    title,
    description,
    keywords: [
      `free ${category.label.toLowerCase()}`,
      `online ${category.label.toLowerCase()}`,
      `${category.value} tools`,
      "free online tools",
      "no signup",
      "browser tools",
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
    description: tool.longDescription || tool.description,
    url: `${BASE_URL}/tools/${tool.slug}`,
    applicationCategory: `${getCategoryLabel(tool.category)}`,
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Works in all modern browsers.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: tool.useCases?.join(", "),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
}

// ── JSON-LD: ItemList (for category / listing pages) ────────────────────────

export function generateItemListJsonLd(
  name: string,
  description: string,
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

// ── JSON-LD: CollectionPage (for blog index, collections index) ─────────────

export function generateCollectionPageJsonLd(
  name: string,
  description: string,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: url.startsWith("http") ? url : `${BASE_URL}${url}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
}

// ── JSON-LD: FAQPage ─────────────────────────────────────────────────────────

export function generateFaqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── JSON-LD: HowTo ──────────────────────────────────────────────────────────

export function generateHowToJsonLd(tool: Tool, steps: HowToStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Use ${tool.name}`,
    description: tool.description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
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
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
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
