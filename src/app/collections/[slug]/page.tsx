import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { collections, getCollectionBySlug } from "@/lib/collections";
import { getToolBySlug } from "@/lib/tools";
import { BASE_URL, SITE_NAME, generateBreadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ToolCard from "@/components/ToolCard";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);
  if (!col) return {};

  const title = `${col.title} | ${SITE_NAME}`;
  const url = `${BASE_URL}/collections/${col.slug}`;

  return {
    title,
    description: col.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: col.description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description: col.description },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);
  if (!col) notFound();

  const toolItems = col.tools
    .map((s) => getToolBySlug(s))
    .filter((t) => t !== undefined);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: col.title,
    description: col.description,
    numberOfItems: toolItems.length,
    itemListElement: toolItems.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: `${BASE_URL}/tools/${tool.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={generateBreadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "Collections", href: "/collections" },
        { label: col.title, href: `/collections/${col.slug}` },
      ])} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="transition-colors hover:text-foreground">Home</Link></li>
          <li aria-hidden="true" className="select-none">/</li>
          <li><Link href="/collections" className="transition-colors hover:text-foreground">Collections</Link></li>
          <li aria-hidden="true" className="select-none">/</li>
          <li className="font-medium text-foreground">{col.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <span className="mr-3">{col.icon}</span>
          {col.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{col.description}</p>
        <p className="mt-1 text-sm text-primary font-medium">{toolItems.length} tools</p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {toolItems.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {/* Long Description */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground mb-3">About This Collection</h2>
        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
          <p>{col.longDescription}</p>
        </div>
      </section>

      {/* Other Collections */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">More Collections</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {collections
            .filter((c) => c.slug !== col.slug)
            .slice(0, 6)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3 transition-colors hover:bg-muted"
              >
                <span className="text-xl">{c.icon}</span>
                <div>
                  <p className="font-medium text-foreground text-sm">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.tools.length} tools</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
