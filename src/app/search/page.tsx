import type { Metadata } from "next";
import Link from "next/link";
import { searchTools, categories } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import { SITE_NAME, BASE_URL } from "@/lib/seo";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q
    ? `Search results for "${q}" | ${SITE_NAME}`
    : `Search Tools | ${SITE_NAME}`;

  return {
    title,
    description: `Search 500+ free online tools on ${SITE_NAME}.`,
    alternates: { canonical: `${BASE_URL}/search` },
    robots: { index: false },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? searchTools(query) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Search Tools
        </h1>
        {query && (
          <p className="mt-2 text-muted-foreground">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* Search form */}
      <form action="/search" method="GET" className="mb-8">
        <div className="relative max-w-xl">
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search 500+ tools..."
            autoFocus
            className="w-full rounded-xl border border-border bg-muted py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </form>

      {/* Results */}
      {query ? (
        results.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No tools found matching &ldquo;{query}&rdquo;
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try different keywords or{" "}
              <Link href="/" className="text-primary hover:underline">
                browse all tools
              </Link>
            </p>
          </div>
        )
      ) : (
        /* Browse by category when no search */
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={`/categories/${cat.value}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-medium text-foreground">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
