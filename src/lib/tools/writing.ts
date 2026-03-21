import type { Tool } from "../types";

export const writingTools: Tool[] = [
  { slug: "paraphrase-tool", name: "Paraphrase Tool", description: "Rephrase text while maintaining the original meaning.", category: "writing", icon: "🔄", keywords: ["paraphrase", "rephrase", "reword", "rewrite text"], subcategory: "generation",
    relatedSlugs: ["grammar-checker", "readability-checker", "word-counter"]
  },
  { slug: "grammar-checker", name: "Grammar Checker", description: "Check text for grammar, spelling, and punctuation errors.", category: "writing", icon: "✅", keywords: ["grammar checker", "spell check", "punctuation", "proofreading"], subcategory: "analysis",
    relatedSlugs: ["readability-checker", "paraphrase-tool", "word-counter"]
  },
  { slug: "headline-analyzer", name: "Headline Analyzer", description: "Analyze headlines for emotional impact, power words, and length.", category: "writing", icon: "📰", keywords: ["headline analyzer", "title analyzer", "headline score", "headline checker"], subcategory: "analysis",
    relatedSlugs: ["heading-analyzer", "readability-checker", "keyword-density"]
  },
  { slug: "title-generator", name: "Blog Title Generator", description: "Generate catchy blog post titles from your topic or keywords.", category: "writing", icon: "💡", keywords: ["title generator", "blog title", "headline generator", "content ideas"], subcategory: "generation",
    relatedSlugs: ["headline-analyzer", "keyword-density", "slug-generator"]
  },
  { slug: "text-summarizer", name: "Text Summarizer", description: "Summarize long articles and documents into key points.", category: "writing", icon: "📋", keywords: ["text summarizer", "article summary", "summarize text", "tldr"], subcategory: "analysis",
    relatedSlugs: ["word-counter", "readability-checker", "text-truncator"]
  },
  { slug: "sentence-counter", name: "Sentence Counter", description: "Count sentences and analyze average sentence length for readability.", category: "writing", icon: "📝", keywords: ["sentence counter", "sentence count", "sentence length", "text analysis"], subcategory: "analysis",
    relatedSlugs: ["word-counter", "readability-checker", "character-counter"]
  },
  { slug: "passive-voice-checker", name: "Passive Voice Checker", description: "Detect and highlight passive voice usage in your writing.", category: "writing", icon: "🔍", keywords: ["passive voice", "active voice", "writing style", "grammar"], subcategory: "analysis",
    relatedSlugs: ["grammar-checker", "readability-checker", "word-counter"]
  },
  { slug: "cliche-checker", name: "Cliche Checker", description: "Find overused phrases and cliches in your writing.", category: "writing", icon: "🚫", keywords: ["cliche checker", "overused phrases", "writing quality", "cliche finder"], subcategory: "analysis",
    relatedSlugs: ["grammar-checker", "readability-checker", "word-frequency"]
  },
  { slug: "transition-word-finder", name: "Transition Word Finder", description: "Identify and suggest transition words for better writing flow.", category: "writing", icon: "🔗", keywords: ["transition words", "connecting words", "writing flow", "essay transitions"], subcategory: "analysis",
    relatedSlugs: ["readability-checker", "grammar-checker", "sentence-counter"]
  },
  { slug: "writing-prompt-generator", name: "Writing Prompt Generator", description: "Generate creative writing prompts for stories, essays, and journals.", category: "writing", icon: "✨", keywords: ["writing prompt", "story prompt", "creative writing", "journal prompt"], subcategory: "generation",
    relatedSlugs: ["title-generator", "lorem-ipsum", "flashcard-maker"]
  },
  { slug: "email-template-generator", name: "Email Template Generator", description: "Generate professional email templates for common business scenarios.", category: "writing", icon: "📧", keywords: ["email template", "business email", "email generator", "professional email"], subcategory: "generation",
    relatedSlugs: ["email-signature-generator", "privacy-policy-generator", "grammar-checker"]
  },
  { slug: "alliteration-finder", name: "Alliteration Finder", description: "Find and highlight alliterative phrases in your text.", category: "writing", icon: "🔤", keywords: ["alliteration", "alliteration finder", "literary device", "writing tool"], subcategory: "analysis",
    relatedSlugs: ["word-frequency", "readability-checker", "cliche-checker"]
  },
  { slug: "rhyme-finder", name: "Rhyme Finder", description: "Find rhyming words for poetry, songwriting, and creative projects.", category: "writing", icon: "🎵", keywords: ["rhyme finder", "rhyming words", "rhyme dictionary", "poetry tool"], subcategory: "generation",
    relatedSlugs: ["writing-prompt-generator", "word-frequency", "alliteration-finder"]
  },
  { slug: "text-case-counter", name: "Text Statistics Analyzer", description: "Analyze text with detailed stats: syllables, Flesch score, grade level, and more.", category: "writing", icon: "📊", keywords: ["text stats", "syllable counter", "flesch score", "text analysis"], subcategory: "analysis",
    relatedSlugs: ["readability-checker", "word-counter", "sentence-counter"]
  },
  { slug: "outline-generator", name: "Outline Generator", description: "Generate structured outlines for essays, articles, and presentations.", category: "writing", icon: "📝", keywords: ["outline generator", "essay outline", "article structure", "content outline"], subcategory: "generation",
    relatedSlugs: ["title-generator", "headline-analyzer", "writing-prompt-generator"]
  },
  { slug: "cover-letter-helper", name: "Cover Letter Helper", description: "Generate professional cover letter templates with customizable sections.", category: "writing", icon: "📄", keywords: ["cover letter", "job application", "resume letter", "application letter"], subcategory: "generation",
    relatedSlugs: ["email-template-generator", "grammar-checker", "readability-checker"]
  },
];
