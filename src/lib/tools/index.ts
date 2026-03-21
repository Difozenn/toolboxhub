import type { Tool, ToolCategory } from "../types";
import { categories } from "./categories";
import { textTools } from "./text";
import { developerTools } from "./developer";
import { mathTools } from "./math";
import { converterTools } from "./converter";
import { generatorTools } from "./generator";
import { imageTools } from "./image";
import { cryptoTools } from "./crypto";
import { seoTools } from "./seo";
import { utilityTools } from "./utility";
import { financeTools } from "./finance";
import { healthTools } from "./health";
import { datetimeTools } from "./datetime";
import { socialTools } from "./social";
import { pdfTools } from "./pdf";
import { educationTools } from "./education";
import { writingTools } from "./writing";
import { businessTools } from "./business";
import { gamingTools } from "./gaming";

// ── Aggregate all tools ──────────────────────────────────────────
export const tools: Tool[] = [
  ...textTools,
  ...developerTools,
  ...mathTools,
  ...converterTools,
  ...generatorTools,
  ...imageTools,
  ...cryptoTools,
  ...seoTools,
  ...utilityTools,
  ...financeTools,
  ...healthTools,
  ...datetimeTools,
  ...socialTools,
  ...pdfTools,
  ...educationTools,
  ...writingTools,
  ...businessTools,
  ...gamingTools,
];

// ── O(1) lookup by slug ──────────────────────────────────────────
const toolMap = new Map<string, Tool>(tools.map((t) => [t.slug, t]));

export function getToolBySlug(slug: string): Tool | undefined {
  return toolMap.get(slug);
}

// ── Filter by category ───────────────────────────────────────────
export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category);
}

// ── Filter by category + subcategory ─────────────────────────────
export function getToolsByCategoryAndSubcategory(
  category: ToolCategory,
  subcategory: string,
): Tool[] {
  return tools.filter(
    (t) => t.category === category && t.subcategory === subcategory,
  );
}

// ── Search tools (fuzzy match on name, keywords, description) ────
export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return tools
    .map((tool) => {
      let score = 0;
      const name = tool.name.toLowerCase();
      const desc = tool.description.toLowerCase();

      // Exact name match
      if (name === q) score += 100;
      // Name starts with query
      else if (name.startsWith(q)) score += 50;
      // Name contains query
      else if (name.includes(q)) score += 30;

      // Keyword match
      for (const kw of tool.keywords) {
        if (kw.toLowerCase().includes(q)) score += 20;
      }

      // Description match
      if (desc.includes(q)) score += 10;

      // Slug match
      if (tool.slug.includes(q.replace(/\s+/g, "-"))) score += 15;

      return { tool, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.tool);
}

// ── Get related tools by slugs ───────────────────────────────────
export function getRelatedTools(tool: Tool): Tool[] {
  const related: Tool[] = [];

  // First: use relatedSlugs if available
  if (tool.relatedSlugs) {
    for (const slug of tool.relatedSlugs) {
      const t = toolMap.get(slug);
      if (t && t.slug !== tool.slug) related.push(t);
    }
  }

  // Fill up to 6 with same-category tools
  if (related.length < 6) {
    const categoryTools = getToolsByCategory(tool.category)
      .filter((t) => t.slug !== tool.slug && !related.some((r) => r.slug === t.slug));
    related.push(...categoryTools.slice(0, 6 - related.length));
  }

  return related.slice(0, 6);
}

// ── Re-export ────────────────────────────────────────────────────
export { categories };
