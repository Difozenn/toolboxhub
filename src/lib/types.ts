export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  keywords: string[];
}

export type ToolCategory =
  | "text"
  | "developer"
  | "math"
  | "converter"
  | "generator"
  | "image"
  | "crypto"
  | "seo"
  | "utility";

export interface Category {
  value: ToolCategory;
  label: string;
  icon: string;
}
