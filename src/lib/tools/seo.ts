import type { Tool } from "../types";

export const seoTools: Tool[] = [
  // ── Existing (7) ──────────────────────────────────────────
  { slug: "og-preview", name: "Open Graph Preview", description: "Preview how your website looks when shared on social media.", category: "seo", icon: "👁️", keywords: ["open graph", "og preview", "social preview", "link preview"], subcategory: "preview",
    relatedSlugs: ["twitter-card-preview", "google-serp-preview", "meta-tag-generator"]
  },
  { slug: "keyword-density", name: "Keyword Density Checker", description: "Analyze keyword density and frequency in your content.", category: "seo", icon: "🔑", keywords: ["keyword density", "seo analysis", "keyword frequency", "content analysis"], subcategory: "analysis",
    relatedSlugs: ["readability-checker", "word-frequency", "google-serp-preview"]
  },
  { slug: "google-serp-preview", name: "Google SERP Preview", description: "Preview how your page will look in Google search results.", category: "seo", icon: "🔍", keywords: ["serp preview", "google preview", "search result preview", "seo preview"], subcategory: "preview",
    relatedSlugs: ["og-preview", "meta-tag-generator", "keyword-density"]
  },
  { slug: "utm-builder", name: "UTM Link Builder", description: "Build UTM-tagged URLs for tracking marketing campaigns.", category: "seo", icon: "🔗", keywords: ["utm builder", "utm parameters", "campaign tracking", "url builder"], subcategory: "tracking",
    relatedSlugs: ["url-encoder", "url-parser", "qr-code-generator"]
  },
  { slug: "email-validator", name: "Email Validator", description: "Validate email address format and check for common issues.", category: "seo", icon: "📧", keywords: ["email validator", "email checker", "validate email", "email format"], subcategory: "analysis",
    relatedSlugs: ["regex-tester", "extract-emails", "fake-data-generator"]
  },
  { slug: "twitter-card-preview", name: "Twitter Card Preview", description: "Preview how your content will look when shared on Twitter/X.", category: "seo", icon: "🐦", keywords: ["twitter card", "x card", "social card", "twitter preview"], subcategory: "preview",
    relatedSlugs: ["og-preview", "google-serp-preview", "meta-tag-generator"]
  },
  { slug: "readability-checker", name: "Readability Checker", description: "Check the readability score and reading level of your content.", category: "seo", icon: "📖", keywords: ["readability", "flesch score", "reading level", "content readability"], subcategory: "analysis",
    relatedSlugs: ["word-counter", "keyword-density", "word-frequency"]
  },

  // ── New SEO Tools ──────────────────────────────────────────
  { slug: "sitemap-generator", name: "Sitemap Generator", description: "Generate XML sitemaps for your website from a list of URLs.", category: "seo", icon: "🗺️", keywords: ["sitemap generator", "xml sitemap", "seo sitemap", "site map"], subcategory: "tracking",
    relatedSlugs: ["robots-txt-generator", "meta-tag-generator", "google-serp-preview"]
  },
  { slug: "schema-markup-generator", name: "Schema Markup Generator", description: "Generate JSON-LD structured data for rich search results.", category: "seo", icon: "📋", keywords: ["schema markup", "json-ld", "structured data", "rich snippets"], subcategory: "tracking",
    relatedSlugs: ["meta-tag-generator", "google-serp-preview", "og-preview"]
  },
  { slug: "slug-generator", name: "SEO Slug Generator", description: "Generate SEO-friendly URL slugs with keyword optimization.", category: "seo", icon: "🔗", keywords: ["seo slug", "url slug", "permalink generator", "seo url"], subcategory: "tracking",
    relatedSlugs: ["slugify", "utm-builder", "url-encoder"]
  },
  { slug: "heading-analyzer", name: "Heading Analyzer", description: "Analyze and score your headlines for SEO effectiveness and emotional impact.", category: "seo", icon: "📝", keywords: ["heading analyzer", "headline scorer", "title analyzer", "seo headline"], subcategory: "analysis",
    relatedSlugs: ["keyword-density", "readability-checker", "google-serp-preview"]
  },
  { slug: "backlink-checker", name: "Backlink Checker", description: "Check the number and quality of backlinks pointing to any URL.", category: "seo", icon: "🔗", keywords: ["backlink checker", "link checker", "seo backlinks", "link analysis"], subcategory: "analysis",
    relatedSlugs: ["whois-lookup", "google-serp-preview", "keyword-density"]
  },
  { slug: "meta-length-checker", name: "Meta Tag Length Checker", description: "Check if your title tags and meta descriptions are the optimal length.", category: "seo", icon: "📏", keywords: ["meta length", "title tag length", "meta description length", "seo checker"], subcategory: "analysis",
    relatedSlugs: ["meta-tag-generator", "google-serp-preview", "readability-checker"]
  },
  { slug: "page-speed-checker", name: "Page Speed Checker", description: "Test your website loading speed and get optimization suggestions.", category: "seo", icon: "⚡", keywords: ["page speed", "website speed", "performance test", "loading time"], subcategory: "analysis",
    relatedSlugs: ["html-minifier", "css-minifier", "image-compressor"]
  },
  { slug: "redirect-checker", name: "Redirect Checker", description: "Check URL redirect chains and find redirect loops.", category: "seo", icon: "↪️", keywords: ["redirect checker", "301 redirect", "redirect chain", "url redirect"], subcategory: "tracking",
    relatedSlugs: ["htaccess-generator", "url-parser", "backlink-checker"]
  },
];
