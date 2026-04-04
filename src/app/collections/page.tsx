import Link from "next/link";
import type { Metadata } from "next";
import { collections } from "@/lib/collections";
import { tools } from "@/lib/tools";
import {
  BASE_URL,
  SITE_NAME,
  generateBreadcrumbJsonLd,
  generateItemListJsonLd,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `Best Free Online Tool Collections | ${SITE_NAME}`,
  description: "Curated collections of the best free online tools for developers, SEO, writing, finance, security, and more. No signup required.",
  keywords: [
    "best free online tools",
    "tool collections",
    "curated tools",
    "developer tools",
    "seo tools",
    "writing tools",
  ],
  alternates: { canonical: `${BASE_URL}/collections` },
  openGraph: {
    title: `Best Free Online Tool Collections | ${SITE_NAME}`,
    description: "Curated collections of the best free online tools for developers, SEO, writing, finance, security, and more.",
    url: `${BASE_URL}/collections`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Best Free Online Tool Collections | ${SITE_NAME}`,
    description: "Curated collections of the best free tools for developers, SEO, writing, and more.",
  },
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "Collections", href: "/collections" },
      ])} />
      <JsonLd data={generateItemListJsonLd(
        "Free Online Tool Collections",
        "Curated collections of the best free online tools at ToolboxHub.",
        collections.map((c) => ({ name: c.title, url: `${BASE_URL}/collections/${c.slug}` })),
      )} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tool Collections
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Curated sets of the best free tools for every task — {collections.length} collections, {tools.length}+ tools.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group rounded-xl border border-border bg-muted/50 p-5 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
          >
            <span className="text-3xl">{col.icon}</span>
            <h2 className="mt-3 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {col.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {col.description}
            </p>
            <p className="mt-3 text-xs text-primary font-medium">
              {col.tools.length} tools
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
