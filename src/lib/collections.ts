export interface Collection {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  tools: string[];
}

export const collections: Collection[] = [
  {
    slug: "best-developer-tools",
    title: "Best Free Developer Tools",
    description: "Essential tools for web developers: formatters, converters, generators, and validators.",
    longDescription: "A curated collection of the most useful online developer tools for formatting code, converting data formats, generating boilerplate, and debugging. All tools run in your browser — no installation or signup required.",
    icon: "💻",
    tools: ["json-formatter", "base64-encoder", "url-encoder", "regex-tester", "css-minifier", "javascript-minifier", "html-prettifier", "sql-formatter", "markdown-preview", "jwt-decoder", "cron-parser", "csv-to-json", "xml-to-json", "yaml-to-json", "user-agent-parser", "json-to-typescript"],
  },
  {
    slug: "best-seo-tools",
    title: "Best Free SEO Tools",
    description: "Analyze, optimize, and monitor your website's SEO with these free tools.",
    longDescription: "Everything you need to improve your search engine rankings — from meta tag previews and keyword analysis to site speed testing and structured data generation. Check your site's SEO health, preview how your pages look in Google, and build UTM tracking links.",
    icon: "📈",
    tools: ["og-preview", "keyword-density", "google-serp-preview", "utm-builder", "twitter-card-preview", "readability-checker", "sitemap-generator", "schema-markup-generator", "slug-generator", "heading-analyzer", "backlink-checker", "meta-length-checker", "page-speed-checker", "redirect-checker"],
  },
  {
    slug: "best-text-tools",
    title: "Best Free Text Tools",
    description: "Count words, convert cases, compare text, sort lines, and transform text instantly.",
    longDescription: "The most comprehensive set of free text manipulation tools available online. Whether you need to count words for an essay, convert text between cases, find duplicates, sort lines, or extract specific data from text — these tools handle it all directly in your browser.",
    icon: "📝",
    tools: ["word-counter", "case-converter", "lorem-ipsum", "text-diff", "slugify", "line-sorter", "duplicate-line-remover", "word-frequency", "whitespace-remover", "find-and-replace", "add-line-numbers", "extract-emails", "extract-urls", "text-to-binary", "string-length", "fancy-text"],
  },
  {
    slug: "best-free-calculators",
    title: "Best Free Online Calculators",
    description: "Math, finance, health, and everyday calculators — all free, no signup required.",
    longDescription: "From basic percentages to compound interest, BMI calculations to loan amortization — this collection brings together the most useful calculators across math, finance, health, and everyday life. Get instant answers without spreadsheets or apps.",
    icon: "🔢",
    tools: ["percentage-calculator", "scientific-calculator", "bmi-calculator", "loan-calculator", "compound-interest", "tip-calculator", "discount-calculator", "average-calculator", "mortgage-calculator", "roi-calculator", "tax-estimator", "gpa-calculator", "fraction-calculator", "standard-deviation", "age-calculator"],
  },
  {
    slug: "best-converter-tools",
    title: "Best Free Converter Tools",
    description: "Convert units, colors, timestamps, currencies, number bases, and data formats.",
    longDescription: "Need to convert between units, color formats, timezones, or data formats? This collection covers every type of conversion — from inches to centimeters to JSON to TypeScript. Fast, accurate, and runs entirely in your browser.",
    icon: "🔄",
    tools: ["unit-converter", "color-converter", "number-base-converter", "timestamp-converter", "timezone-converter", "currency-converter", "cooking-converter", "hex-to-text", "markdown-to-html", "pixels-to-rem", "inches-to-cm", "feet-to-meters", "miles-to-km", "kg-to-lbs", "image-to-base64"],
  },
  {
    slug: "best-image-tools",
    title: "Best Free Image Tools",
    description: "Resize, compress, convert, crop, and edit images directly in your browser.",
    longDescription: "A full suite of browser-based image editing tools. Resize images for social media, compress photos to save bandwidth, convert between formats, pick colors, add watermarks, and generate favicons — all without uploading to any server.",
    icon: "🖼️",
    tools: ["image-resizer", "image-cropper", "image-compressor", "svg-to-png", "favicon-generator", "image-to-webp", "image-flipper", "image-rotator", "image-color-picker", "image-filter", "png-to-jpg", "image-watermark", "screenshot-beautifier", "color-palette-from-image", "meme-generator"],
  },
  {
    slug: "best-security-tools",
    title: "Best Free Security & Crypto Tools",
    description: "Hash generators, encryption tools, SSL checkers, password testers, and network analysis.",
    longDescription: "Essential cybersecurity tools for developers and IT professionals. Generate hashes, encrypt and decrypt data, check SSL certificates, test password strength, look up DNS records, and analyze network security — all running securely in your browser.",
    icon: "🔐",
    tools: ["hash-generator", "encryption-tool", "password-strength", "ssl-checker", "dns-lookup", "whois-lookup", "ip-address-lookup", "bcrypt-generator", "hmac-generator", "checksum-calculator", "csp-generator", "rot13", "caesar-cipher", "random-bytes-generator"],
  },
  {
    slug: "best-finance-tools",
    title: "Best Free Finance Tools",
    description: "Mortgage calculators, investment tools, tax estimators, and business financial calculators.",
    longDescription: "Make smarter financial decisions with these free calculators and tools. Plan your mortgage, estimate taxes, calculate investment returns, track savings goals, and analyze business profitability — no financial advisor needed for basic calculations.",
    icon: "💰",
    tools: ["mortgage-calculator", "salary-to-hourly", "tax-estimator", "retirement-calculator", "roi-calculator", "inflation-calculator", "savings-goal-calculator", "margin-calculator", "vat-calculator", "debt-payoff-calculator", "auto-loan-calculator", "break-even-calculator", "stock-profit-calculator", "compound-interest", "credit-card-payoff"],
  },
  {
    slug: "best-writing-tools",
    title: "Best Free Writing Tools",
    description: "Grammar checkers, headline analyzers, readability tools, and content generators.",
    longDescription: "Sharpen your writing with tools that check grammar, analyze readability, detect passive voice, generate headlines, and find cliches. Perfect for bloggers, copywriters, students, and anyone who wants to write better content.",
    icon: "✍️",
    tools: ["paraphrase-tool", "grammar-checker", "headline-analyzer", "title-generator", "text-summarizer", "sentence-counter", "passive-voice-checker", "cliche-checker", "transition-word-finder", "writing-prompt-generator", "email-template-generator", "readability-improver", "word-counter", "readability-checker"],
  },
  {
    slug: "best-social-media-tools",
    title: "Best Free Social Media Tools",
    description: "Image resizers, hashtag generators, caption generators, and analytics calculators for social.",
    longDescription: "Grow your social media presence with free tools for creating optimized images, generating trending hashtags, crafting engaging captions, calculating engagement rates, and formatting posts for every platform — Instagram, X, LinkedIn, TikTok, and YouTube.",
    icon: "📱",
    tools: ["instagram-fonts", "hashtag-generator", "social-image-resizer", "character-counter", "youtube-thumbnail-downloader", "twitter-thread-maker", "bio-generator", "engagement-rate-calculator", "youtube-revenue-calculator", "caption-generator", "linkedin-post-formatter", "tiktok-character-counter", "og-preview", "twitter-card-preview"],
  },
  {
    slug: "best-productivity-tools",
    title: "Best Free Productivity Tools",
    description: "Timers, notepads, habit trackers, and everyday utilities to stay organized.",
    longDescription: "Boost your productivity with browser-based tools that help you stay focused, manage time, and organize your work. From Pomodoro timers and stopwatches to digital notepads and habit trackers — simple tools that make a big difference.",
    icon: "🧰",
    tools: ["pomodoro-timer", "countdown-timer", "stopwatch", "notepad", "text-to-speech", "keyboard-tester", "whiteboard", "world-clock", "screen-resolution", "aspect-ratio-calculator", "internet-speed-test", "habit-tracker", "random-quote-generator", "password-strength"],
  },
  {
    slug: "best-education-tools",
    title: "Best Free Education Tools",
    description: "Grade calculators, citation generators, flashcard makers, and study aids for students.",
    longDescription: "Essential tools for students and educators — calculate grades, generate citations, create flashcards, explore the periodic table, test your typing speed, and practice math. Everything you need to study smarter, right in your browser.",
    icon: "🎓",
    tools: ["grade-calculator", "citation-generator", "flashcard-maker", "periodic-table", "multiplication-table", "reading-speed-test", "math-quiz-generator", "essay-word-counter", "typing-speed-test", "study-timer", "equation-solver", "truth-table-generator", "binary-calculator", "significant-figures"],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
