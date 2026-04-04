import type { Metadata } from "next";
import { tools, categories, getToolsByCategory } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import JsonLd from "@/components/JsonLd";
import {
  SITE_NAME,
  BASE_URL,
  generateBreadcrumbJsonLd,
  generateCollectionPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: `${tools.length}+ Free Online Tools — No Signup | ${SITE_NAME}`,
  description: `Browse all ${tools.length}+ free online tools at ToolboxHub. Text, developer, math, finance, health, and more — all run in your browser with no signup required.`,
  keywords: [
    "free online tools",
    "browser tools",
    "no signup tools",
    "calculators",
    "converters",
    "formatters",
    "generators",
  ],
  alternates: { canonical: `${BASE_URL}/tools` },
  openGraph: {
    title: `${tools.length}+ Free Online Tools — No Signup | ${SITE_NAME}`,
    description: `Browse all ${tools.length}+ free online tools. Text, developer, math, finance, health, and more — no signup required.`,
    url: `${BASE_URL}/tools`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${tools.length}+ Free Online Tools | ${SITE_NAME}`,
    description: `Browse all ${tools.length}+ free online tools. No signup required.`,
  },
};

export default function AllToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "All Tools", href: "/tools" },
      ])} />
      <JsonLd data={generateCollectionPageJsonLd(
        `${tools.length}+ Free Online Tools`,
        `Browse all ${tools.length}+ free online tools at ToolboxHub. No signup required.`,
        `${BASE_URL}/tools`,
      )} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {tools.length}+ Free Online Tools
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Calculators, converters, formatters, and generators — all free, no signup required
        </p>
      </div>

      <div className="space-y-16">
        {categories.map((category) => {
          const categoryTools = getToolsByCategory(category.value);
          if (categoryTools.length === 0) return null;

          return (
            <section key={category.value} id={category.value}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-foreground">
                  {category.label}
                </h2>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-sm text-muted-foreground">
                  {categoryTools.length}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
