import type { Tool } from "../types";

export const textTools: Tool[] = [
  // ── Existing (15) ──────────────────────────────────────────
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, sentences, and paragraphs in any text.", category: "text", icon: "🔤", keywords: ["word count", "character count", "sentence count", "text stats"], subcategory: "analysis",
    longDescription: "The Word Counter tool provides instant, real-time analysis of your text. Whether you're writing an essay, blog post, or social media caption, this tool counts words, characters (with and without spaces), sentences, and paragraphs. It also estimates reading time based on an average reading speed of 200 words per minute. Perfect for writers, students, and content creators who need to meet specific word count requirements.",
    faqs: [
      { question: "How accurate is the word count?", answer: "The word counter splits text on whitespace boundaries and is highly accurate for standard text. It handles multiple spaces and line breaks correctly." },
      { question: "Does it count special characters?", answer: "Yes, all characters including punctuation and special symbols are included in the character count. The 'characters without spaces' metric excludes all whitespace." },
      { question: "What is the reading time based on?", answer: "Reading time is calculated at 200 words per minute, which is the average adult reading speed for online content." }
    ],
    howToSteps: [
      { name: "Enter text", text: "Paste or type your text into the text area." },
      { name: "View results", text: "Statistics update in real-time as you type, showing words, characters, sentences, paragraphs, and reading time." },
      { name: "Use the data", text: "Reference the counts to meet your content requirements." }
    ],
    useCases: ["Meeting essay word count requirements", "Optimizing social media posts to character limits", "Estimating reading time for blog posts", "Analyzing text density for SEO content"],
    relatedSlugs: ["word-frequency", "readability-checker", "string-length", "text-to-binary"]
  },
  { slug: "case-converter", name: "Case Converter", description: "Convert text between uppercase, lowercase, title case, sentence case, and more.", category: "text", icon: "🔡", keywords: ["uppercase", "lowercase", "title case", "text transform"], subcategory: "transform",
    longDescription: "Quickly transform the case of any text with this versatile Case Converter. Supports uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, and toggle case. Ideal for programmers converting variable names, writers formatting titles, or anyone who accidentally left caps lock on.",
    faqs: [
      { question: "What case options are available?", answer: "Uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, and toggle case." },
      { question: "Can I convert code variable names?", answer: "Yes! Use camelCase, PascalCase, snake_case, or kebab-case for programming conventions." }
    ],
    howToSteps: [
      { name: "Enter text", text: "Paste or type the text you want to convert." },
      { name: "Choose case", text: "Click the button for the case style you want." },
      { name: "Copy result", text: "Click the copy button to copy the converted text." }
    ],
    useCases: ["Converting variable names between coding conventions", "Formatting titles and headings", "Fixing accidentally capitalized text"],
    relatedSlugs: ["slugify", "fancy-text", "text-reverser"]
  },
  { slug: "lorem-ipsum", name: "Lorem Ipsum Generator", description: "Generate placeholder text for designs, mockups, and layouts.", category: "text", icon: "📄", keywords: ["lorem ipsum", "placeholder text", "dummy text", "filler text"], subcategory: "generation",
    relatedSlugs: ["fake-data-generator", "text-repeater", "word-counter"]
  },
  { slug: "text-diff", name: "Text Diff Checker", description: "Compare two texts side-by-side and see the differences highlighted.", category: "text", icon: "📊", keywords: ["text compare", "diff checker", "text difference"], subcategory: "analysis",
    relatedSlugs: ["word-counter", "find-and-replace", "duplicate-line-remover"]
  },
  { slug: "slugify", name: "Slugify", description: "Convert text to URL-friendly slugs for web addresses and file names.", category: "text", icon: "🔗", keywords: ["slug generator", "url slug", "url friendly", "permalink"], subcategory: "transform",
    relatedSlugs: ["case-converter", "url-encoder", "whitespace-remover"]
  },
  { slug: "text-reverser", name: "Text Reverser", description: "Reverse any text, words, or sentences instantly.", category: "text", icon: "↩️", keywords: ["reverse text", "reverse string", "backwards text", "mirror text"], subcategory: "transform",
    relatedSlugs: ["case-converter", "text-repeater", "fancy-text"]
  },
  { slug: "line-sorter", name: "Line Sorter", description: "Sort lines alphabetically, numerically, or randomly.", category: "text", icon: "📋", keywords: ["sort lines", "alphabetical sort", "line organizer", "text sorter"], subcategory: "formatting",
    relatedSlugs: ["duplicate-line-remover", "add-line-numbers", "whitespace-remover"]
  },
  { slug: "duplicate-line-remover", name: "Duplicate Line Remover", description: "Remove duplicate lines from text and keep only unique entries.", category: "text", icon: "🧹", keywords: ["remove duplicates", "unique lines", "deduplicate", "distinct lines"], subcategory: "formatting",
    relatedSlugs: ["line-sorter", "whitespace-remover", "word-frequency"]
  },
  { slug: "word-frequency", name: "Word Frequency Counter", description: "Analyze text and see how often each word appears.", category: "text", icon: "📊", keywords: ["word frequency", "word count", "text analysis", "word usage"], subcategory: "analysis",
    relatedSlugs: ["word-counter", "keyword-density", "readability-checker"]
  },
  { slug: "whitespace-remover", name: "Whitespace Remover", description: "Remove extra whitespace, tabs, and blank lines from text.", category: "text", icon: "🧽", keywords: ["remove whitespace", "trim text", "clean text", "remove spaces"], subcategory: "formatting",
    relatedSlugs: ["duplicate-line-remover", "line-sorter", "slugify"]
  },
  { slug: "add-line-numbers", name: "Add Line Numbers", description: "Add line numbers to any text with customizable formatting.", category: "text", icon: "🔢", keywords: ["line numbers", "number lines", "line count", "text numbering"], subcategory: "formatting",
    relatedSlugs: ["line-sorter", "word-counter", "duplicate-line-remover"]
  },
  { slug: "text-repeater", name: "Text Repeater", description: "Repeat any text a specified number of times.", category: "text", icon: "🔁", keywords: ["repeat text", "text multiplier", "duplicate text", "copy text"], subcategory: "transform",
    relatedSlugs: ["lorem-ipsum", "text-reverser", "fancy-text"]
  },
  { slug: "fancy-text", name: "Fancy Text Generator", description: "Convert text to fancy Unicode styles like bold, italic, script, and more.", category: "text", icon: "✨", keywords: ["fancy text", "unicode text", "stylish text", "bold text", "italic text"], subcategory: "transform",
    relatedSlugs: ["case-converter", "text-reverser", "instagram-fonts"]
  },
  { slug: "text-to-binary", name: "Text to Binary", description: "Convert text to binary code and binary back to text.", category: "text", icon: "💾", keywords: ["text to binary", "binary to text", "binary converter", "ascii to binary"], subcategory: "encoding",
    relatedSlugs: ["hex-to-text", "base64-encoder", "morse-code"]
  },
  { slug: "string-length", name: "String Length Calculator", description: "Calculate the byte length of strings in various encodings.", category: "text", icon: "📐", keywords: ["string length", "byte count", "character length", "utf8 length"], subcategory: "analysis",
    relatedSlugs: ["word-counter", "text-to-binary", "url-encoder"]
  },

  // ── New Text Tools ──────────────────────────────────────────
  { slug: "text-to-html", name: "Text to HTML", description: "Convert plain text to HTML with proper paragraph tags and line breaks.", category: "text", icon: "🌐", keywords: ["text to html", "plain text html", "html converter", "text converter"], subcategory: "encoding",
    longDescription: "Convert plain text into properly formatted HTML. This tool wraps paragraphs in <p> tags, converts line breaks to <br> tags, and escapes special HTML characters. Great for quickly converting content for web pages without manually writing HTML markup.",
    faqs: [
      { question: "Does it preserve formatting?", answer: "Yes, paragraphs are wrapped in <p> tags and single line breaks become <br> tags." },
      { question: "Are special characters escaped?", answer: "Yes, characters like <, >, &, and quotes are converted to HTML entities." }
    ],
    howToSteps: [
      { name: "Paste text", text: "Enter your plain text in the input area." },
      { name: "Convert", text: "Click convert to generate HTML output." },
      { name: "Copy HTML", text: "Copy the generated HTML code for your project." }
    ],
    useCases: ["Converting blog drafts to HTML", "Formatting email content for HTML newsletters", "Quick content migration to web pages"],
    relatedSlugs: ["html-to-text", "markdown-to-html", "html-prettifier"]
  },
  { slug: "html-to-text", name: "HTML to Text", description: "Strip HTML tags and convert HTML content to clean plain text.", category: "text", icon: "📃", keywords: ["html to text", "strip html", "remove tags", "html stripper"], subcategory: "encoding",
    relatedSlugs: ["text-to-html", "markdown-to-html", "html-entity-encoder"]
  },
  { slug: "extract-emails", name: "Email Extractor", description: "Extract all email addresses from any text or HTML content.", category: "text", icon: "📧", keywords: ["extract emails", "email finder", "email extractor", "parse emails"], subcategory: "analysis",
    relatedSlugs: ["extract-urls", "email-validator", "regex-tester"]
  },
  { slug: "extract-urls", name: "URL Extractor", description: "Extract all URLs and links from any text or HTML content.", category: "text", icon: "🔗", keywords: ["extract urls", "url finder", "link extractor", "parse urls"], subcategory: "analysis",
    relatedSlugs: ["extract-emails", "url-encoder", "utm-builder"]
  },
  { slug: "find-and-replace", name: "Find and Replace", description: "Find and replace text with support for regular expressions and case sensitivity.", category: "text", icon: "🔍", keywords: ["find replace", "search replace", "text replace", "regex replace"], subcategory: "transform",
    relatedSlugs: ["regex-tester", "text-diff", "case-converter"]
  },
  { slug: "text-to-columns", name: "Text to Columns", description: "Split text into columns using custom delimiters like commas, tabs, or pipes.", category: "text", icon: "📊", keywords: ["text columns", "split text", "delimiter split", "csv split"], subcategory: "formatting",
    relatedSlugs: ["csv-to-json", "csv-to-table", "line-sorter"]
  },
  { slug: "prefix-suffix-adder", name: "Prefix & Suffix Adder", description: "Add custom prefix and suffix text to every line in your content.", category: "text", icon: "➕", keywords: ["add prefix", "add suffix", "line prefix", "wrap lines"], subcategory: "formatting",
    relatedSlugs: ["add-line-numbers", "text-repeater", "find-and-replace"]
  },
  { slug: "text-truncator", name: "Text Truncator", description: "Truncate text to a specific number of characters or words with ellipsis.", category: "text", icon: "✂️", keywords: ["truncate text", "shorten text", "text trimmer", "character limit"], subcategory: "transform",
    relatedSlugs: ["word-counter", "string-length", "text-to-columns"]
  },
  { slug: "text-to-speech-text", name: "SSML Generator", description: "Generate SSML markup for text-to-speech applications.", category: "text", icon: "🔊", keywords: ["ssml", "text to speech", "speech markup", "tts"], subcategory: "encoding",
    relatedSlugs: ["text-to-html", "markdown-to-html", "html-prettifier"]
  },
  { slug: "invisible-character-detector", name: "Invisible Character Detector", description: "Detect and remove invisible Unicode characters, zero-width spaces, and hidden formatting.", category: "text", icon: "👻", keywords: ["invisible characters", "hidden characters", "zero width", "unicode detector"], subcategory: "analysis",
    relatedSlugs: ["whitespace-remover", "string-length", "unicode-lookup"]
  },
];
