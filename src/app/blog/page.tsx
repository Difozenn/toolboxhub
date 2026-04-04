import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts, getAllBlogCategories } from "@/lib/blog";
import {
  BASE_URL,
  SITE_NAME,
  generateBreadcrumbJsonLd,
  generateItemListJsonLd,
  generateCollectionPageJsonLd,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `Blog — Guides, Tips & Tutorials | ${SITE_NAME}`,
  description: "Learn how to use online tools effectively. Guides on SSL certificates, DNS records, SEO optimization, development workflows, and more.",
  keywords: [
    "online tools guide",
    "ssl certificate explained",
    "dns records guide",
    "seo tips",
    "developer tutorials",
    "free tools blog",
  ],
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: `Blog — Guides, Tips & Tutorials | ${SITE_NAME}`,
    description: "Learn how to use online tools effectively. Guides on SSL, DNS, SEO, development, and more.",
    url: `${BASE_URL}/blog`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog — Guides, Tips & Tutorials | ${SITE_NAME}`,
    description: "Guides on SSL, DNS, SEO, development workflows, and more.",
  },
};

export default function BlogPage() {
  const categories = getAllBlogCategories();
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
      ])} />
      <JsonLd data={generateCollectionPageJsonLd(
        "ToolboxHub Blog",
        "In-depth guides, tutorials, and tips for free online tools.",
        `${BASE_URL}/blog`,
      )} />
      <JsonLd data={generateItemListJsonLd(
        "Blog Articles",
        "Guides, tips, and tutorials for using free online tools effectively.",
        sortedPosts.map((p) => ({ name: p.title, url: `${BASE_URL}/blog/${p.slug}` })),
      )} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Blog
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          In-depth guides, tutorials, and tips to help you get the most out of free online tools.
        </p>
      </div>

      {/* Category pills */}
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* Post Cards */}
      <div className="space-y-6">
        {sortedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-border p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
          >
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {post.category}
              </span>
              <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {post.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Read article
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">Blog posts coming soon. Check back later!</p>
        </div>
      )}
    </div>
  );
}
