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
    longDescription: "Generate customizable Lorem Ipsum placeholder text for wireframes, design mockups, and layout testing. Choose the number of paragraphs, sentences, or words you need, and instantly get the classic Latin dummy text used by designers and developers worldwide.",
    faqs: [
      { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is standard placeholder text derived from a Latin work by Cicero. It has been the industry standard dummy text since the 1500s and is used to fill layouts without distracting with real content." },
      { question: "Can I control the length of the output?", answer: "Yes, you can specify the number of paragraphs, sentences, or words to generate." }
    ],
    howToSteps: [
      { name: "Set output type", text: "Choose whether to generate by paragraphs, sentences, or words." },
      { name: "Set quantity", text: "Enter the number of units you want to generate." },
      { name: "Copy the text", text: "Click Generate and copy the placeholder text to use in your design." }
    ],
    useCases: ["Filling text areas in UI/UX design mockups", "Testing typography and layout in web development", "Creating placeholder content for CMS templates", "Generating dummy text for print design samples"],
    relatedSlugs: ["fake-data-generator", "text-repeater", "word-counter"]
  },
  { slug: "text-diff", name: "Text Diff Checker", description: "Compare two texts side-by-side and see the differences highlighted.", category: "text", icon: "📊", keywords: ["text compare", "diff checker", "text difference"], subcategory: "analysis",
    longDescription: "Compare two versions of any text side by side with additions highlighted in green and removals in red. The Text Diff Checker is useful for proofreading, comparing document revisions, or spotting changes between two blocks of plain text.",
    faqs: [
      { question: "Can I compare code with this tool?", answer: "Yes, while this tool is optimized for plain text, it works well for comparing code snippets. Use the Code Diff Checker tool for syntax-highlighted code comparison." },
      { question: "Does it show word-level or character-level differences?", answer: "The tool highlights line-level differences and also shows inline word-level changes within modified lines." }
    ],
    howToSteps: [
      { name: "Enter the original text", text: "Paste the original version of your text in the left input." },
      { name: "Enter the new text", text: "Paste the revised version in the right input." },
      { name: "Review differences", text: "Added content is shown in green, removed content in red, and unchanged lines are shown normally." }
    ],
    useCases: ["Proofreading document revisions", "Comparing draft versions of articles or reports", "Spotting edits in contracts or legal documents", "Checking for accidental changes in configuration files"],
    relatedSlugs: ["word-counter", "find-and-replace", "duplicate-line-remover"]
  },
  { slug: "slugify", name: "Slugify", description: "Convert text to URL-friendly slugs for web addresses and file names.", category: "text", icon: "🔗", keywords: ["slug generator", "url slug", "url friendly", "permalink"], subcategory: "transform",
    longDescription: "Convert any text into a clean, URL-friendly slug by lowercasing letters, replacing spaces with hyphens, and removing special characters. Ideal for generating post slugs, file names, or route identifiers for web applications and CMS platforms.",
    faqs: [
      { question: "What characters are removed?", answer: "Special characters, punctuation, and accented letters are either removed or transliterated. Spaces and underscores are replaced with hyphens." },
      { question: "Does it support international characters?", answer: "Yes, common accented characters are transliterated to their ASCII equivalents before slugification." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste the title or phrase you want to convert." },
      { name: "Slugify", text: "Click Slugify to generate the URL-safe slug." },
      { name: "Copy the slug", text: "Copy the result to use as a URL path, file name, or database identifier." }
    ],
    useCases: ["Generating post slugs for blog URLs", "Creating file names from document titles", "Building clean route paths for web applications", "Generating identifiers for CMS content entries"],
    relatedSlugs: ["case-converter", "url-encoder", "whitespace-remover"]
  },
  { slug: "text-reverser", name: "Text Reverser", description: "Reverse any text, words, or sentences instantly.", category: "text", icon: "↩️", keywords: ["reverse text", "reverse string", "backwards text", "mirror text"], subcategory: "transform",
    longDescription: "Reverse text character by character, word by word, or line by line with a single click. Use it to create mirror text effects, generate simple obfuscated strings, or just have fun with reversed messages.",
    faqs: [
      { question: "Can I reverse individual words instead of characters?", answer: "Yes, the tool offers options to reverse the entire string character by character or to reverse the order of words while keeping each word intact." },
      { question: "Does it handle multi-line text?", answer: "Yes, you can reverse each line independently or reverse all lines as a whole block." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Paste or type the text you want to reverse." },
      { name: "Choose reverse mode", text: "Select character reversal, word reversal, or line reversal." },
      { name: "Copy the result", text: "Copy the reversed text to use wherever you need it." }
    ],
    useCases: ["Creating mirrored text for design projects", "Generating simple reversed strings for puzzles or games", "Testing string manipulation logic in programming", "Flipping word order in sentences for creative writing"],
    relatedSlugs: ["case-converter", "text-repeater", "fancy-text"]
  },
  { slug: "line-sorter", name: "Line Sorter", description: "Sort lines alphabetically, numerically, or randomly.", category: "text", icon: "📋", keywords: ["sort lines", "alphabetical sort", "line organizer", "text sorter"], subcategory: "formatting",
    longDescription: "Sort any list of lines alphabetically, numerically, or in random order with support for ascending and descending direction. Optionally remove duplicates as part of the sort. Useful for organizing lists, sorting CSV data, or cleaning up unordered text collections.",
    faqs: [
      { question: "Can I sort in descending order?", answer: "Yes, both alphabetical and numerical sorts support ascending and descending order options." },
      { question: "Can it sort and remove duplicates at the same time?", answer: "Yes, there is an option to deduplicate lines as part of the sorting operation." }
    ],
    howToSteps: [
      { name: "Paste your lines", text: "Enter the list of lines you want to sort into the input area." },
      { name: "Choose sort options", text: "Select alphabetical, numerical, or random order, and choose ascending or descending." },
      { name: "Copy sorted output", text: "Copy the sorted list to use in your project." }
    ],
    useCases: ["Organizing lists of names, keywords, or URLs", "Sorting CSV rows alphabetically", "Preparing word lists for dictionaries or glossaries", "Randomizing the order of items for surveys or presentations"],
    relatedSlugs: ["duplicate-line-remover", "add-line-numbers", "whitespace-remover"]
  },
  { slug: "duplicate-line-remover", name: "Duplicate Line Remover", description: "Remove duplicate lines from text and keep only unique entries.", category: "text", icon: "🧹", keywords: ["remove duplicates", "unique lines", "deduplicate", "distinct lines"], subcategory: "formatting",
    longDescription: "Remove duplicate lines from any list or block of text, keeping only the first occurrence of each unique line. Supports case-sensitive and case-insensitive matching, and optionally trims whitespace before comparing lines.",
    faqs: [
      { question: "Is the comparison case-sensitive?", answer: "By default yes, but you can enable case-insensitive mode so that 'Apple' and 'apple' are treated as the same line." },
      { question: "Does it remove blank lines too?", answer: "There is an option to remove blank lines along with duplicates, helping you clean up sparse text in one step." }
    ],
    howToSteps: [
      { name: "Paste your text", text: "Enter the list or text block containing duplicate lines." },
      { name: "Configure options", text: "Choose case sensitivity and whether to trim whitespace or remove blank lines." },
      { name: "Copy unique lines", text: "Copy the deduplicated output ready for use." }
    ],
    useCases: ["Deduplicating email lists or subscriber exports", "Cleaning up scraped data with repeated entries", "Removing repeated lines from log files", "Preparing unique keyword lists for SEO or advertising"],
    relatedSlugs: ["line-sorter", "whitespace-remover", "word-frequency"]
  },
  { slug: "word-frequency", name: "Word Frequency Counter", description: "Analyze text and see how often each word appears.", category: "text", icon: "📊", keywords: ["word frequency", "word count", "text analysis", "word usage"], subcategory: "analysis",
    longDescription: "Analyze any piece of text and see a ranked list of how often each word appears. Filter out common stop words, set a minimum frequency threshold, and export the results. Great for content analysis, keyword research, and understanding writing patterns.",
    faqs: [
      { question: "Can I filter out common words like 'the' and 'and'?", answer: "Yes, there is an option to exclude common English stop words so you can focus on the meaningful keywords in your text." },
      { question: "Is the analysis case-sensitive?", answer: "By default, the analysis is case-insensitive, so 'Apple' and 'apple' are counted as the same word." }
    ],
    howToSteps: [
      { name: "Paste your text", text: "Enter the text you want to analyze in the input area." },
      { name: "Configure options", text: "Toggle stop word filtering and set any minimum frequency you want to display." },
      { name: "Review the frequency table", text: "See each word ranked by how often it appears in your text." }
    ],
    useCases: ["Identifying the most-used keywords in an article for SEO", "Analyzing writing style and vocabulary diversity", "Finding overused words to improve writing quality", "Researching topic frequency in large text datasets"],
    relatedSlugs: ["word-counter", "keyword-density", "readability-checker"]
  },
  { slug: "whitespace-remover", name: "Whitespace Remover", description: "Remove extra whitespace, tabs, and blank lines from text.", category: "text", icon: "🧽", keywords: ["remove whitespace", "trim text", "clean text", "remove spaces"], subcategory: "formatting",
    longDescription: "Clean up text by removing leading and trailing whitespace, collapsing multiple spaces into one, stripping tabs, and deleting blank lines. Choose exactly which types of whitespace to remove for precise text cleaning.",
    faqs: [
      { question: "Can I remove only leading and trailing spaces?", answer: "Yes, you can choose to trim only leading/trailing whitespace, or go further by collapsing all internal multiple spaces into single spaces." },
      { question: "Does it remove blank lines?", answer: "Yes, there is an option to remove blank lines, which is useful for cleaning up lists or code copied from various sources." }
    ],
    howToSteps: [
      { name: "Paste your text", text: "Enter the text containing extra whitespace in the input area." },
      { name: "Choose cleanup options", text: "Select which whitespace to remove: leading/trailing, internal spaces, tabs, or blank lines." },
      { name: "Copy cleaned text", text: "Copy the cleaned output for use in your project." }
    ],
    useCases: ["Cleaning up text pasted from PDFs or web pages", "Normalizing user input before storing in a database", "Removing extra indentation from copied code snippets", "Preparing text data for processing or import"],
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
    longDescription: "Strip all HTML tags from markup and extract the clean, readable plain text content. Handles block elements like paragraphs and headings as line breaks, removes scripts and styles, and decodes HTML entities back to their plain text equivalents.",
    faqs: [
      { question: "Are HTML entities converted to plain text?", answer: "Yes, entities like &amp;, &lt;, and &nbsp; are decoded back to their plain text characters." },
      { question: "Does it remove inline styles and scripts?", answer: "Yes, all script, style, and meta tag content is stripped along with HTML tags." }
    ],
    howToSteps: [
      { name: "Paste your HTML", text: "Enter the HTML content you want to convert to plain text." },
      { name: "Convert", text: "Click Convert to strip tags and produce clean text output." },
      { name: "Copy the text", text: "Copy the extracted plain text for use in documents or other applications." }
    ],
    useCases: ["Extracting readable content from scraped web pages", "Converting HTML email templates to plain text versions", "Cleaning HTML-formatted data before text analysis", "Stripping markup from CMS exports for editing"],
    relatedSlugs: ["text-to-html", "markdown-to-html", "html-entity-encoder"]
  },
  { slug: "extract-emails", name: "Email Extractor", description: "Extract all email addresses from any text or HTML content.", category: "text", icon: "📧", keywords: ["extract emails", "email finder", "email extractor", "parse emails"], subcategory: "analysis",
    longDescription: "Scan any block of text or HTML and automatically extract all valid email addresses found within it. Removes duplicates and outputs a clean list ready to copy or export. Useful for mining contact information from documents, web pages, or data exports.",
    faqs: [
      { question: "Does it remove duplicate emails?", answer: "Yes, the extractor deduplicates results by default so each email address appears only once in the output." },
      { question: "Does it validate the extracted emails?", answer: "The tool matches patterns that conform to standard email format but does not verify whether the addresses actually exist." }
    ],
    howToSteps: [
      { name: "Paste your text", text: "Enter the text, HTML, or document content to scan." },
      { name: "Extract", text: "Click Extract to find all email addresses in the input." },
      { name: "Copy the list", text: "Copy the deduplicated list of email addresses for your use." }
    ],
    useCases: ["Harvesting contact emails from exported documents", "Collecting email addresses from HTML source code", "Mining emails from scraped web page content", "Extracting recipient lists from email thread exports"],
    relatedSlugs: ["extract-urls", "email-validator", "regex-tester"]
  },
  { slug: "extract-urls", name: "URL Extractor", description: "Extract all URLs and links from any text or HTML content.", category: "text", icon: "🔗", keywords: ["extract urls", "url finder", "link extractor", "parse urls"], subcategory: "analysis",
    longDescription: "Automatically find and extract all URLs and hyperlinks from any text, HTML, or document content. The extractor identifies both http and https links, removes duplicates, and outputs a clean list. Useful for link auditing, data extraction, and content analysis.",
    faqs: [
      { question: "Does it extract links from HTML attributes like href?", answer: "Yes, the tool extracts both plain text URLs and URLs found in HTML href and src attributes." },
      { question: "Are duplicates removed?", answer: "Yes, duplicate URLs are removed by default so the output contains only unique links." }
    ],
    howToSteps: [
      { name: "Paste your content", text: "Enter the text, HTML source, or document you want to scan for URLs." },
      { name: "Extract", text: "Click Extract to identify all URLs in the input." },
      { name: "Copy the list", text: "Copy the unique URL list to use in your audit, report, or application." }
    ],
    useCases: ["Auditing all links in an HTML page or template", "Extracting links from scraped web content", "Collecting URLs from a document for link checking", "Mining source URLs from a batch of text files"],
    relatedSlugs: ["extract-emails", "url-encoder", "utm-builder"]
  },
  { slug: "find-and-replace", name: "Find and Replace", description: "Find and replace text with support for regular expressions and case sensitivity.", category: "text", icon: "🔍", keywords: ["find replace", "search replace", "text replace", "regex replace"], subcategory: "transform",
    longDescription: "Perform find-and-replace operations on any block of text with support for plain text, case-insensitive matching, and full regular expression patterns. Replace all occurrences or step through them one by one. A powerful text editing tool without needing a code editor.",
    faqs: [
      { question: "Can I use regular expressions for the search?", answer: "Yes, toggle regex mode to use full regex patterns in the find field, including capture groups for advanced replacements." },
      { question: "Is it case-sensitive by default?", answer: "Yes, but you can toggle case-insensitive mode to match text regardless of capitalization." }
    ],
    howToSteps: [
      { name: "Paste your text", text: "Enter the text you want to modify in the main input area." },
      { name: "Enter find and replace terms", text: "Type the text or pattern to find and the replacement text." },
      { name: "Apply replacement", text: "Click Replace All to swap every match, and copy the updated text." }
    ],
    useCases: ["Bulk-replacing placeholder text in templates", "Correcting a repeated typo across a long document", "Reformatting date or phone number patterns with regex", "Swapping variable names in code snippets"],
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
