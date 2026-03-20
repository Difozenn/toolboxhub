import Link from "next/link";
import { categories, tools, getToolsByCategory } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Free Online Tools
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          100+ free tools for text, development, math, and more. No signup
          required.
        </p>
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

      {/* Tools grid grouped by category */}
      <div className="mt-14 space-y-16">
        {categories.map((category) => {
          const categoryTools = getToolsByCategory(category.value);
          if (categoryTools.length === 0) return null;

          return (
            <section key={category.value}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-foreground">
                  {category.label}
                </h2>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-sm text-muted-foreground">
                  {categoryTools.length}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
