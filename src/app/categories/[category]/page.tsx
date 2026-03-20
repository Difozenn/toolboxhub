import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, getToolsByCategory } from "@/lib/tools";
import type { ToolCategory } from "@/lib/types";
import ToolCard from "@/components/ToolCard";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
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

  return {
    title: `Free ${category.label} Online | ToolboxHub`,
    description: `Browse free online ${category.label.toLowerCase()} at ToolboxHub. No signup required.`,
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.value }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryTools = getToolsByCategory(category.value as ToolCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
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
            {category.label}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {categoryTools.length} free{" "}
            {categoryTools.length === 1 ? "tool" : "tools"} available
          </p>
        </div>
      </div>

      {/* Tools grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
