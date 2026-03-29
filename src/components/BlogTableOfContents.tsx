"use client";

import { useMemo } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogTableOfContents({ content }: { content: string }) {
  const headings = useMemo(() => {
    const items: TocItem[] = [];
    const re = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
    let match;
    while ((match = re.exec(content)) !== null) {
      const text = match[2].replace(/<[^>]*>/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      items.push({ id, text, level: parseInt(match[1]) });
    }
    return items;
  }, [content]);

  if (headings.length < 3) return null;

  return (
    <nav className="rounded-xl border border-border bg-muted/50 p-5 mb-8">
      <p className="text-sm font-semibold text-foreground mb-3">Table of Contents</p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${h.id}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
