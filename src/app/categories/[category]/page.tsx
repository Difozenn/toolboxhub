import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, getToolsByCategory, getToolsByCategoryAndSubcategory } from "@/lib/tools";
import type { ToolCategory } from "@/lib/types";
import ToolCard from "@/components/ToolCard";
import JsonLd from "@/components/JsonLd";
import {
  generateCategoryMetadata,
  generateBreadcrumbJsonLd,
  generateItemListJsonLd,
  BASE_URL,
} from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sub?: string }>;
}

function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.value === slug);
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | ToolboxHub" };
  }

  const toolCount = getToolsByCategory(category.value).length;
  return generateCategoryMetadata(category, toolCount);
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.value }));
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: slug } = await params;
  const { sub } = await searchParams;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allCategoryTools = getToolsByCategory(category.value as ToolCategory);
  const activeSubcategory = sub || null;

  const displayTools = activeSubcategory
    ? getToolsByCategoryAndSubcategory(category.value as ToolCategory, activeSubcategory)
    : allCategoryTools;

  // Get unique subcategories from actual tools
  const subcategories = [...new Set(allCategoryTools.map((t) => t.subcategory).filter(Boolean))] as string[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* JSON-LD schemas */}
      <JsonLd data={generateBreadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "Categories", href: "/categories" },
        { label: category.label, href: `/categories/${category.value}` },
      ])} />
      <JsonLd data={generateItemListJsonLd(
        `Free ${category.label} Online`,
        category.description || `${allCategoryTools.length}+ free online ${category.label.toLowerCase()} at ToolboxHub.`,
        allCategoryTools.map((t) => ({ name: t.name, url: `${BASE_URL}/tools/${t.slug}` })),
      )} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/"
          className="transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href="/categories"
          className="transition-colors hover:text-foreground"
        >
          Categories
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-foreground">{category.label}</span>
      </nav>

      {/* Header */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-3xl">{category.icon}</span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Free {category.label} Online
          </h1>
          <p className="mt-1 text-muted-foreground">
            {allCategoryTools.length} free{" "}
            {allCategoryTools.length === 1 ? "tool" : "tools"} — no signup required
          </p>
        </div>
      </div>

      {/* Category description */}
      {category.description && (
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </p>
      )}

      {/* Subcategory filter pills */}
      {subcategories.length > 1 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={`/categories/${category.value}`}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              !activeSubcategory
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({allCategoryTools.length})
          </Link>
          {subcategories.map((sub) => {
            const count = getToolsByCategoryAndSubcategory(
              category.value as ToolCategory,
              sub,
            ).length;
            return (
              <Link
                key={sub}
                href={`/categories/${category.value}?sub=${sub}`}
                className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  activeSubcategory === sub
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {sub} ({count})
              </Link>
            );
          })}
        </div>
      )}

      {/* Tools grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {displayTools.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No tools found in this subcategory.</p>
        </div>
      )}
    </div>
  );
}
