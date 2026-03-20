import Link from "next/link";
import type { Tool } from "@/lib/types";
import { categories } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const category = categories.find((c) => c.value === tool.category);

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30"
    >
      {/* Icon and category badge */}
      <div className="flex items-start justify-between">
        <span className="text-3xl" role="img" aria-label={tool.name}>
          {tool.icon}
        </span>
        {category && (
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {category.label}
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="mt-3 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {tool.description}
      </p>
    </Link>
  );
}
