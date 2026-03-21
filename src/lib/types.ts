export type ToolCategory =
  | "text"
  | "developer"
  | "math"
  | "converter"
  | "generator"
  | "image"
  | "crypto"
  | "seo"
  | "utility"
  | "finance"
  | "health"
  | "datetime"
  | "social"
  | "pdf"
  | "education"
  | "writing"
  | "business"
  | "gaming";

export type ToolTemplate =
  | "simple-converter"
  | "simple-calculator"
  | "text-processor"
  | "format-converter"
  | "custom";

export interface FAQ {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  keywords: string[];
  subcategory?: string;
  template?: ToolTemplate;
  templateConfig?: Record<string, unknown>;
  longDescription?: string;
  faqs?: FAQ[];
  howToSteps?: HowToStep[];
  useCases?: string[];
  relatedSlugs?: string[];
}

export interface Category {
  value: ToolCategory;
  label: string;
  icon: string;
  subcategories?: string[];
}
