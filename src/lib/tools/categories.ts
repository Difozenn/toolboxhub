import type { Category } from "../types";

export const categories: Category[] = [
  { value: "text", label: "Text Tools", icon: "📝", subcategories: ["analysis", "transform", "encoding", "formatting"] },
  { value: "developer", label: "Developer Tools", icon: "💻", subcategories: ["formatters", "converters", "generators", "validators"] },
  { value: "math", label: "Math Tools", icon: "🔢", subcategories: ["calculators", "statistics", "geometry"] },
  { value: "converter", label: "Converters", icon: "🔄", subcategories: ["length", "weight", "volume", "temperature", "data", "speed", "area", "energy"] },
  { value: "generator", label: "Generators", icon: "⚡", subcategories: ["security", "design", "content", "code"] },
  { value: "image", label: "Image Tools", icon: "🖼️", subcategories: ["resize", "convert", "optimize", "create"] },
  { value: "crypto", label: "Crypto & Security", icon: "🔐", subcategories: ["hashing", "encryption", "analysis", "network"] },
  { value: "seo", label: "SEO & Marketing", icon: "📈", subcategories: ["preview", "analysis", "tracking"] },
  { value: "utility", label: "Utilities", icon: "🧰", subcategories: ["timers", "productivity", "system"] },
  { value: "finance", label: "Finance Tools", icon: "💰", subcategories: ["loans", "investment", "tax", "business", "crypto"] },
  { value: "health", label: "Health & Fitness", icon: "❤️", subcategories: ["body", "nutrition", "exercise", "medical"] },
  { value: "datetime", label: "Date & Time", icon: "📅", subcategories: ["calculators", "converters", "countdowns"] },
  { value: "social", label: "Social Media", icon: "📱", subcategories: ["text", "images", "analytics", "content"] },
  { value: "pdf", label: "PDF Tools", icon: "📄", subcategories: ["convert", "edit", "merge"] },
  { value: "education", label: "Education", icon: "🎓", subcategories: ["math", "science", "language", "grades"] },
  { value: "writing", label: "Writing Tools", icon: "✍️", subcategories: ["analysis", "generation", "formatting"] },
  { value: "business", label: "Business Tools", icon: "💼", subcategories: ["documents", "calculators", "planning"] },
  { value: "gaming", label: "Gaming & Fun", icon: "🎮", subcategories: ["random", "generators", "tools"] },
];
