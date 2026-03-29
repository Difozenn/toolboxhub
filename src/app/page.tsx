import Link from "next/link";
import { categories, tools, getToolsByCategory } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

// Popular tools shown at top (high-traffic categories)
const popularSlugs = [
  "word-counter", "json-formatter", "password-generator", "mortgage-calculator",
  "calorie-calculator", "qr-code-generator", "unit-converter", "color-converter",
  "base64-encoder", "percentage-calculator", "image-resizer", "dice-roller",
];

export default function Home() {
  const popularTools = popularSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean) as typeof tools;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          500+ Free Online Tools
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Calculators, converters, formatters, generators, and utilities for developers, designers, writers, students, and everyone in between. All tools run in your browser — no signup, no install, no data collection.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            100% Free
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            No Signup Required
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Runs in Your Browser
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Privacy First
          </span>
        </div>
      </section>

      {/* Category filter buttons */}
      <nav className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const count = getToolsByCategory(category.value).length;
          return (
            <Link
              key={category.value}
              href={`/categories/${category.value}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
              <span className="ml-0.5 rounded-full bg-background px-1.5 py-0.5 text-xs text-muted-foreground">
                {count}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Popular tools */}
      <section className="mt-14">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🔥</span>
          <h2 className="text-2xl font-bold text-foreground">Popular Tools</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Tools grid grouped by category */}
      <div className="mt-16 space-y-16">
        {categories.map((category) => {
          const categoryTools = getToolsByCategory(category.value);
          if (categoryTools.length === 0) return null;

          return (
            <section key={category.value}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-foreground">
                    {category.label}
                  </h2>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-sm text-muted-foreground">
                    {categoryTools.length}
                  </span>
                </div>
                <Link
                  href={`/categories/${category.value}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View all &rarr;
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryTools.slice(0, 6).map((tool) => (
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
