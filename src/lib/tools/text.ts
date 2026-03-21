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
    longDescription: "Prepend line numbers to every line of your text with customizable formatting options. Choose the starting number, separator style (dot, colon, parenthesis, tab), and padding alignment. Perfect for referencing specific lines in code reviews, preparing numbered lists for documentation, or adding line references to plain text before sharing.",
    faqs: [
      { question: "Can I change the starting number?", answer: "Yes, you can set the starting line number to any value. This is useful when numbering a section that doesn't begin at line 1." },
      { question: "What separator styles are available?", answer: "You can choose from several separators between the number and text, including dot (1. text), colon (1: text), parenthesis (1) text), tab, and space." },
      { question: "Does it handle blank lines?", answer: "Yes, blank lines are numbered just like any other line. The tool preserves your original text structure while adding numbers to every line." }
    ],
    howToSteps: [
      { name: "Paste your text", text: "Enter the text you want to add line numbers to in the input area." },
      { name: "Configure formatting", text: "Choose your starting number, separator style, and padding preferences." },
      { name: "Copy numbered text", text: "Copy the numbered output to use in code reviews, documentation, or discussions." }
    ],
    useCases: ["Adding line references for code reviews and discussions", "Numbering steps in procedural documentation", "Creating numbered lists from plain text content", "Preparing text for legal or academic citation with line references"],
    relatedSlugs: ["line-sorter", "word-counter", "duplicate-line-remover"]
  },
  { slug: "text-repeater", name: "Text Repeater", description: "Repeat any text a specified number of times.", category: "text", icon: "🔁", keywords: ["repeat text", "text multiplier", "duplicate text", "copy text"], subcategory: "transform",
    longDescription: "Repeat any word, phrase, or block of text a specified number of times with optional separators between each repetition. Choose from newline, space, comma, or custom delimiters to control the output format. Useful for generating test data, creating repeated patterns, filling templates, or producing bulk text content quickly.",
    faqs: [
      { question: "Is there a limit on how many times I can repeat?", answer: "You can repeat text up to several thousand times. Very large repetition counts may slow your browser, so the tool caps output at a reasonable limit to keep performance smooth." },
      { question: "Can I add a separator between repetitions?", answer: "Yes, you can choose from built-in separators like newline, space, comma, or enter any custom separator string between each repeated copy." },
      { question: "Does it preserve line breaks in the original text?", answer: "Yes, multi-line text is repeated as a complete block including all its internal line breaks and formatting." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste the text you want to repeat in the input area." },
      { name: "Set repetitions", text: "Enter the number of times you want the text to be repeated and choose a separator." },
      { name: "Copy the output", text: "Copy the repeated text for use in testing, content generation, or your project." }
    ],
    useCases: ["Generating test data with repeated patterns", "Creating placeholder content for UI layout testing", "Producing bulk repeated strings for stress testing applications", "Filling spreadsheet columns with identical values"],
    relatedSlugs: ["lorem-ipsum", "text-reverser", "fancy-text"]
  },
  { slug: "fancy-text", name: "Fancy Text Generator", description: "Convert text to fancy Unicode styles like bold, italic, script, and more.", category: "text", icon: "✨", keywords: ["fancy text", "unicode text", "stylish text", "bold text", "italic text"], subcategory: "transform",
    longDescription: "Transform ordinary text into eye-catching Unicode styles that work anywhere plain text is supported. Choose from bold, italic, bold italic, script, fraktur, double-struck, monospace, circled, squared, and many more Unicode font styles. These are not images or special fonts — they are Unicode characters that render in social media bios, usernames, posts, and messaging apps.",
    faqs: [
      { question: "How do fancy text styles work?", answer: "Unicode includes multiple sets of letter-like characters in different styles (Mathematical Bold, Script, Fraktur, etc.). This tool maps each standard letter to its styled Unicode equivalent, producing text that looks formatted but is actually plain text." },
      { question: "Will fancy text work on all platforms?", answer: "Most modern platforms including Instagram, Twitter, Facebook, Discord, and WhatsApp render Unicode styled text correctly. Some older systems or specific apps may not support all character sets." },
      { question: "Can search engines read fancy Unicode text?", answer: "Search engines may not index Unicode styled text the same as standard text, so avoid using it for SEO-critical content. It is best suited for decorative and social media use." }
    ],
    howToSteps: [
      { name: "Type your text", text: "Enter the text you want to stylize in the input field." },
      { name: "Browse styles", text: "Preview your text in all available Unicode styles displayed below the input." },
      { name: "Copy your favorite", text: "Click the copy button next to your preferred style to copy it for use in social media, messages, or documents." }
    ],
    useCases: ["Creating stylish Instagram and Twitter bios", "Decorating social media posts and usernames", "Adding eye-catching text to Discord or Slack messages", "Designing unique headings for creative projects"],
    relatedSlugs: ["case-converter", "text-reverser", "instagram-fonts"]
  },
  { slug: "text-to-binary", name: "Text to Binary", description: "Convert text to binary code and binary back to text.", category: "text", icon: "💾", keywords: ["text to binary", "binary to text", "binary converter", "ascii to binary"], subcategory: "encoding",
    longDescription: "Convert any text to its binary (base-2) representation and decode binary strings back to readable text. Each character is converted to its 8-bit ASCII binary equivalent, making this tool ideal for learning about binary encoding, creating encoded messages, or understanding how computers represent text at the lowest level.",
    faqs: [
      { question: "How does text-to-binary conversion work?", answer: "Each character in the text is converted to its ASCII code number, which is then expressed as an 8-bit binary string. For example, the letter 'A' has ASCII code 65, which is 01000001 in binary." },
      { question: "Can I convert binary back to text?", answer: "Yes, the tool supports two-way conversion. Paste a binary string (groups of 8 bits separated by spaces) to decode it back into readable text." },
      { question: "Does it support Unicode characters?", answer: "The tool handles standard ASCII characters (0-127) with 8-bit encoding. Extended Unicode characters may require UTF-8 multi-byte encoding, which produces longer binary sequences per character." }
    ],
    howToSteps: [
      { name: "Enter text or binary", text: "Type or paste text to convert to binary, or paste a binary string to decode back to text." },
      { name: "Convert", text: "Click Convert to see the binary representation or decoded text output." },
      { name: "Copy the result", text: "Copy the binary code or decoded text for use in your project or learning exercise." }
    ],
    useCases: ["Learning how computers represent text in binary", "Creating binary-encoded messages for puzzles or games", "Debugging character encoding issues in software development", "Teaching binary number systems in computer science education"],
    relatedSlugs: ["hex-to-text", "base64-encoder", "morse-code"]
  },
  { slug: "string-length", name: "String Length Calculator", description: "Calculate the byte length of strings in various encodings.", category: "text", icon: "📐", keywords: ["string length", "byte count", "character length", "utf8 length"], subcategory: "analysis",
    longDescription: "Measure the exact length of any string in characters and bytes across multiple encodings including UTF-8, UTF-16, and ASCII. See how the same text takes different amounts of storage depending on the encoding. Essential for developers working with database field limits, API payload constraints, and multi-byte character sets.",
    faqs: [
      { question: "Why is byte length different from character length?", answer: "In UTF-8 encoding, ASCII characters use 1 byte each, but accented characters use 2 bytes, and emoji or CJK characters use 3-4 bytes. So a 5-character string with emoji could be 15+ bytes." },
      { question: "Which encoding should I care about?", answer: "UTF-8 is the most common encoding on the web and in databases. UTF-16 is used internally by JavaScript and Java. Check your application or database documentation to know which applies." },
      { question: "Does it count invisible characters?", answer: "Yes, the calculator counts all characters including whitespace, zero-width spaces, and other invisible Unicode characters. Use the Invisible Character Detector tool to identify hidden characters." }
    ],
    howToSteps: [
      { name: "Enter your string", text: "Type or paste the text whose length you want to measure." },
      { name: "View measurements", text: "See the character count and byte length in UTF-8, UTF-16, and ASCII encodings in real time." },
      { name: "Use the data", text: "Reference the byte lengths to ensure your strings fit within database columns, API limits, or protocol constraints." }
    ],
    useCases: ["Checking if strings fit within database VARCHAR limits", "Calculating API request payload sizes", "Measuring byte length of multi-byte Unicode strings", "Verifying character counts for SMS or social media post limits"],
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
    longDescription: "Split delimited text into neatly aligned columns using commas, tabs, pipes, semicolons, or any custom delimiter. Works like the 'Text to Columns' feature in spreadsheet software but runs entirely in your browser. Ideal for parsing CSV data, reformatting log files, or extracting specific columns from structured text.",
    faqs: [
      { question: "What delimiters are supported?", answer: "Built-in options include comma, tab, pipe (|), semicolon, and space. You can also enter any custom delimiter string for specialized data formats." },
      { question: "Can I extract just one column from the result?", answer: "Yes, after splitting you can select specific columns to extract, making it easy to pull individual fields from CSV or delimited data." },
      { question: "Does it handle quoted fields in CSV?", answer: "The tool respects quoted fields so that commas within double-quoted strings are not treated as delimiters, following standard CSV conventions." }
    ],
    howToSteps: [
      { name: "Paste your data", text: "Enter the delimited text or CSV content you want to split into columns." },
      { name: "Choose delimiter", text: "Select the delimiter character used in your data, or enter a custom one." },
      { name: "View and copy columns", text: "See the data split into columns and copy the result or extract specific columns." }
    ],
    useCases: ["Parsing CSV data without a spreadsheet application", "Extracting specific fields from log files or data exports", "Reformatting pipe-delimited database exports", "Splitting tab-separated data into individual columns"],
    relatedSlugs: ["csv-to-json", "csv-to-table", "line-sorter"]
  },
  { slug: "prefix-suffix-adder", name: "Prefix & Suffix Adder", description: "Add custom prefix and suffix text to every line in your content.", category: "text", icon: "➕", keywords: ["add prefix", "add suffix", "line prefix", "wrap lines"], subcategory: "formatting",
    longDescription: "Add custom prefix text, suffix text, or both to every line in your content simultaneously. Wrap each line in HTML tags, add bullet points, prepend timestamps, append commas, or apply any consistent formatting across all lines at once. A huge time saver for bulk text formatting tasks that would otherwise require tedious manual editing.",
    faqs: [
      { question: "Can I add both a prefix and suffix at the same time?", answer: "Yes, you can specify both a prefix and a suffix and the tool will add the prefix to the beginning and the suffix to the end of every line in a single operation." },
      { question: "Does it skip blank lines?", answer: "By default, prefix and suffix are added to all lines including blank ones. You can toggle an option to skip empty lines so only lines with content are modified." },
      { question: "Can I use this to wrap lines in HTML tags?", answer: "Yes — set the prefix to an opening tag like '<li>' and the suffix to '</li>' to wrap every line in HTML elements instantly." }
    ],
    howToSteps: [
      { name: "Paste your lines", text: "Enter the text with multiple lines you want to modify." },
      { name: "Set prefix and suffix", text: "Enter the text to prepend and/or append to every line." },
      { name: "Copy the result", text: "Copy the modified text with prefixes and suffixes applied to all lines." }
    ],
    useCases: ["Wrapping list items in HTML <li> tags", "Adding SQL quote and comma formatting to data values", "Prepending bullet points or dashes to every line", "Appending trailing commas to lines for JSON or array formatting"],
    relatedSlugs: ["add-line-numbers", "text-repeater", "find-and-replace"]
  },
  { slug: "text-truncator", name: "Text Truncator", description: "Truncate text to a specific number of characters or words with ellipsis.", category: "text", icon: "✂️", keywords: ["truncate text", "shorten text", "text trimmer", "character limit"], subcategory: "transform",
    longDescription: "Shorten any text to a precise character or word limit with an optional ellipsis or custom suffix appended. Choose whether to truncate at exact character counts, at word boundaries to avoid cutting words mid-way, or at sentence boundaries for clean breaks. Essential for preparing text excerpts, meta descriptions, social media previews, and UI display strings.",
    faqs: [
      { question: "Can I truncate by words instead of characters?", answer: "Yes, you can choose to truncate by character count or by word count. Word-based truncation ensures no words are cut in half." },
      { question: "What is the ellipsis option?", answer: "When enabled, an ellipsis (...) or custom suffix is appended to the truncated text to indicate it has been shortened. The ellipsis length is included in the total character count." },
      { question: "Does it respect word boundaries?", answer: "Yes, the word-boundary option ensures the text is cut at the last complete word that fits within your limit, rather than cutting a word in the middle." }
    ],
    howToSteps: [
      { name: "Paste your text", text: "Enter the text you want to truncate in the input area." },
      { name: "Set the limit", text: "Choose whether to limit by characters or words, and enter your maximum count." },
      { name: "Copy the truncated text", text: "Copy the shortened text with or without the appended ellipsis." }
    ],
    useCases: ["Creating meta descriptions within the 155-character SEO limit", "Generating text previews and excerpts for blog post cards", "Trimming user-generated content for UI display constraints", "Preparing social media snippets from longer articles"],
    relatedSlugs: ["word-counter", "string-length", "text-to-columns"]
  },
  { slug: "text-to-speech-text", name: "SSML Generator", description: "Generate SSML markup for text-to-speech applications.", category: "text", icon: "🔊", keywords: ["ssml", "text to speech", "speech markup", "tts"], subcategory: "encoding",
    longDescription: "Generate Speech Synthesis Markup Language (SSML) from plain text for use with text-to-speech engines like Amazon Polly, Google Cloud TTS, and Microsoft Azure Speech. Add pauses, emphasis, pronunciation hints, and prosody controls to make synthesized speech sound more natural. Build SSML visually without memorizing the XML tag syntax.",
    faqs: [
      { question: "What is SSML?", answer: "SSML (Speech Synthesis Markup Language) is an XML-based markup language that controls how text-to-speech engines pronounce words, where they pause, which words to emphasize, and how fast or slow to speak." },
      { question: "Which TTS platforms support SSML?", answer: "Most major text-to-speech services support SSML, including Amazon Polly, Google Cloud Text-to-Speech, Microsoft Azure Cognitive Services, and IBM Watson TTS." },
      { question: "Can I add pauses and emphasis?", answer: "Yes, the generator lets you insert break tags for pauses of specific durations, emphasis tags for stress on important words, and prosody tags to control rate, pitch, and volume." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste the text you want to convert to SSML." },
      { name: "Add speech controls", text: "Insert pauses, emphasis, pronunciation hints, and prosody adjustments using the visual controls." },
      { name: "Copy the SSML", text: "Copy the generated SSML markup to paste directly into your TTS application or API call." }
    ],
    useCases: ["Building voice responses for Alexa Skills or Google Actions", "Creating natural-sounding TTS audio for video narration", "Generating SSML for automated phone system (IVR) prompts", "Fine-tuning pronunciation for product names and technical terms in speech apps"],
    relatedSlugs: ["text-to-html", "markdown-to-html", "html-prettifier"]
  },
  { slug: "invisible-character-detector", name: "Invisible Character Detector", description: "Detect and remove invisible Unicode characters, zero-width spaces, and hidden formatting.", category: "text", icon: "👻", keywords: ["invisible characters", "hidden characters", "zero width", "unicode detector"], subcategory: "analysis",
    longDescription: "Scan any text for invisible and hidden Unicode characters that are not visible to the naked eye but can cause bugs, break string comparisons, and produce unexpected behavior in applications. Detects zero-width spaces, zero-width joiners, soft hyphens, byte order marks, right-to-left overrides, and other non-printing characters. View, highlight, and optionally remove them in one click.",
    faqs: [
      { question: "What are invisible characters?", answer: "Invisible characters are Unicode code points that have no visible glyph but occupy space in a string. Examples include zero-width spaces (U+200B), zero-width joiners (U+200D), soft hyphens (U+00AD), and byte order marks (U+FEFF)." },
      { question: "How do invisible characters get into my text?", answer: "They are often introduced by copy-pasting from web pages, word processors, PDFs, or rich-text editors. Some websites intentionally embed them for tracking or fingerprinting purposes." },
      { question: "Can invisible characters cause bugs?", answer: "Yes, they can break string comparisons, cause unexpected validation failures, make identical-looking strings unequal, and even introduce security vulnerabilities through homograph attacks or bidirectional text overrides." }
    ],
    howToSteps: [
      { name: "Paste your text", text: "Enter the text you want to scan for hidden characters." },
      { name: "Review detections", text: "The tool highlights each invisible character found, showing its Unicode name, code point, and position in the text." },
      { name: "Remove or keep", text: "Click Remove All to strip invisible characters, or selectively remove specific ones while keeping others." }
    ],
    useCases: ["Debugging mysterious string comparison failures in code", "Cleaning text copied from PDFs and web pages before processing", "Detecting hidden tracking characters in pasted content", "Sanitizing user input to prevent zero-width character injection attacks"],
    relatedSlugs: ["whitespace-remover", "string-length", "unicode-lookup"]
  },
  // ── New (15) ──────────────────────────────────────────
  { slug: "text-to-morse", name: "Text to Morse Code", description: "Convert any text into Morse code dots and dashes instantly.", category: "text", icon: "📡", keywords: ["morse code", "dots dashes", "morse translator", "encode morse"], subcategory: "encoding",
    longDescription: "Transform plain text into authentic Morse code sequences using standard ITU encoding. Each letter and digit maps to its internationally recognised pattern of dots (•) and dashes (—), separated by spaces between characters and slashes between words. Useful for learning Morse, embedding hidden messages, or building radio communication tools.",
    faqs: [
      { question: "What characters are supported?", answer: "All A-Z letters and 0-9 digits are supported. Punctuation support includes common marks like period, comma, and question mark. Unsupported characters are skipped." },
      { question: "How are words separated in the output?", answer: "Characters within a word are separated by a single space, and words are separated by a forward slash (/) for clarity." },
      { question: "Can I decode Morse code back to text?", answer: "Yes, the tool supports two-way conversion — paste Morse code to decode it back to plain text." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste the text you want to convert into the input field." },
      { name: "Convert", text: "The Morse code output appears instantly with dots and dashes for each character." },
      { name: "Copy the result", text: "Click Copy to use the Morse code output in your project or message." }
    ],
    useCases: ["Learning Morse code for amateur radio", "Creating encoded messages for puzzles and escape rooms", "Teaching Morse code in educational settings", "Building signal-based communication demos"],
    relatedSlugs: ["text-to-binary", "text-to-hex", "text-to-ascii"]
  },
  { slug: "text-to-ascii", name: "Text to ASCII Art", description: "Convert text into large ASCII art banners using classic font styles.", category: "text", icon: "🖼️", keywords: ["ascii art", "text art", "figlet", "banner text", "ascii banner"], subcategory: "transform",
    longDescription: "Generate eye-catching ASCII art banners from any word or phrase. Choose from popular FIGlet-style fonts including Standard, Banner, Block, Bubble, and Slant. ASCII art banners are perfect for CLI tool headers, README files, terminal splash screens, and retro-style design projects.",
    faqs: [
      { question: "What fonts are available?", answer: "A selection of classic FIGlet-inspired fonts including Standard, Banner, Block, Bubble, Digital, and Slant are available for instant preview." },
      { question: "Is there a character limit?", answer: "For best results keep your text under 20 characters, as longer strings can produce very wide banners that wrap on smaller screens." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type the word or short phrase you want to render as ASCII art." },
      { name: "Choose a font style", text: "Select one of the available font options to preview different ASCII art styles." },
      { name: "Copy the banner", text: "Click Copy to use the ASCII art in your README, terminal, or project header." }
    ],
    useCases: ["Creating CLI application splash screens", "Adding stylised headers to README files", "Generating retro-style text art for social posts", "Building decorative banners for terminal scripts"],
    relatedSlugs: ["text-to-morse", "fancy-text", "case-converter"]
  },
  { slug: "zalgo-text", name: "Zalgo Text Generator", description: "Generate glitchy, creepy Zalgo text with stacked combining Unicode characters.", category: "text", icon: "👁️", keywords: ["zalgo text", "glitch text", "creepy text", "corrupted text", "unicode glitch"], subcategory: "transform",
    longDescription: "Add eerie visual glitch effects to text by stacking Unicode combining diacritical marks above and below each character — the effect known as Zalgo text. Control the intensity from subtle to extreme. Perfect for horror-themed designs, meme captions, social media posts, and creative writing projects.",
    faqs: [
      { question: "What makes Zalgo text look glitched?", answer: "Zalgo text works by adding many Unicode combining characters (diacritics) on top of normal letters. These combining characters stack visually and overflow their normal boundaries, creating a distorted effect." },
      { question: "Will it display correctly everywhere?", answer: "Zalgo text renders in most modern browsers and apps, but some platforms strip combining characters. Results may vary in plain-text environments." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste the text you want to glitch." },
      { name: "Set intensity", text: "Adjust the intensity slider from subtle to extreme to control how many combining characters are added." },
      { name: "Copy the result", text: "Copy the Zalgo text and paste it into social media, a design tool, or your project." }
    ],
    useCases: ["Horror and Halloween themed social media captions", "Meme and internet culture content creation", "Video game and dark fiction writing", "Demonstrating Unicode rendering quirks in development"],
    relatedSlugs: ["fancy-text", "upside-down-text", "strikethrough-text"]
  },
  { slug: "upside-down-text", name: "Upside Down Text", description: "Flip your text upside down using Unicode lookalike characters.", category: "text", icon: "🙃", keywords: ["upside down text", "flip text", "reverse text", "unicode flip"], subcategory: "transform",
    longDescription: "Flip any text upside down by mapping each character to its Unicode look-alike rotated counterpart. The result can be pasted directly into social media, messages, or design tools. A fun novelty effect that works without any images or fonts — just Unicode characters that look like upside-down letters.",
    faqs: [
      { question: "How does upside-down text work?", answer: "Each standard letter and digit is mapped to a Unicode character that looks like the rotated version. The entire string is then reversed so it reads right-to-left when flipped." },
      { question: "Which characters are supported?", answer: "Most lowercase and uppercase Latin letters and common punctuation have upside-down equivalents. Characters without a mapping are left unchanged." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste the text you want to flip upside down." },
      { name: "Preview the result", text: "The flipped text appears instantly in the output field." },
      { name: "Copy and share", text: "Copy the upside-down text to paste into messages, social media bios, or anywhere else." }
    ],
    useCases: ["Fun social media bios and posts", "Prank messages for friends", "Creative typography in digital art", "Novelty headings in web and graphic design"],
    relatedSlugs: ["zalgo-text", "fancy-text", "text-reverser"]
  },
  { slug: "strikethrough-text", name: "Strikethrough Text Generator", description: "Add Unicode strikethrough formatting to any text for use anywhere.", category: "text", icon: "~~S~~", keywords: ["strikethrough text", "crossed out text", "unicode strikethrough", "text formatting"], subcategory: "transform",
    longDescription: "Apply Unicode strikethrough formatting to any text so it renders with a horizontal line through it in apps and platforms that don't support standard rich-text markdown. Uses the Unicode combining long stroke overlay (U+0336) to create the effect character by character.",
    faqs: [
      { question: "Why use Unicode strikethrough instead of HTML?", answer: "Unicode strikethrough works in plain-text environments like social media posts, Discord, Twitter bios, and WhatsApp where HTML or markdown tags are not rendered." },
      { question: "Will it work on all platforms?", answer: "Most modern platforms render the combining Unicode character correctly. Some older systems or plain-text fields may not display the strikethrough visually." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste the text you want to strike through." },
      { name: "Generate", text: "The strikethrough version appears instantly using Unicode combining characters." },
      { name: "Copy and paste", text: "Copy the text and paste it anywhere — social media, chat apps, or documents." }
    ],
    useCases: ["Showing edited or retracted content in social posts", "Styling text in Discord, Slack, or Telegram", "Creative typography in digital designs", "Demonstrating corrections in documents"],
    relatedSlugs: ["upside-down-text", "zalgo-text", "subscript-superscript"]
  },
  { slug: "subscript-superscript", name: "Subscript & Superscript Text", description: "Convert text to Unicode subscript or superscript characters.", category: "text", icon: "x²", keywords: ["subscript", "superscript", "unicode superscript", "raised text", "lowered text"], subcategory: "transform",
    longDescription: "Convert letters and digits to their Unicode subscript (below the baseline) or superscript (above the baseline) equivalents. Useful for mathematical notation, chemical formulas, footnote references, and stylised social media text without needing HTML tags.",
    faqs: [
      { question: "Which characters have superscript/subscript equivalents?", answer: "All digits 0-9 and most lowercase letters have Unicode equivalents. Uppercase letters have limited coverage. Unsupported characters are passed through unchanged." },
      { question: "Can I use this for math and chemistry?", answer: "Yes — use superscript for exponents (H²O becomes H₂O in subscript) and for writing chemical formulas or mathematical notation in plain-text environments." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste the text you want to convert." },
      { name: "Choose mode", text: "Select Superscript to raise characters above the baseline, or Subscript to lower them below." },
      { name: "Copy the result", text: "Copy the converted text to use in documents, social media, or messaging apps." }
    ],
    useCases: ["Writing chemical formulas like H₂O or CO₂ in plain text", "Expressing exponents and mathematical notation", "Adding footnote numbers inline in text", "Stylising social media usernames and bios"],
    relatedSlugs: ["strikethrough-text", "unicode-lookup", "case-converter"]
  },
  { slug: "vowel-remover", name: "Vowel Remover", description: "Strip all vowels from text to create consonant-only shorthand.", category: "text", icon: "🔇", keywords: ["remove vowels", "strip vowels", "consonants only", "text shortener"], subcategory: "transform",
    longDescription: "Remove all vowel characters (A, E, I, O, U in both cases) from any block of text, leaving only consonants and non-letter characters. This classic technique is used in SMS shorthand, certain writing systems, cryptography exercises, and word puzzles.",
    faqs: [
      { question: "Which characters are treated as vowels?", answer: "The letters A, E, I, O, U (both uppercase and lowercase) are removed. Y is treated as a consonant by default, but an option to also remove Y is available." },
      { question: "Are numbers and punctuation affected?", answer: "No — only alphabetic vowel characters are removed. Numbers, punctuation, and spaces are preserved." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Paste or type the text from which you want to remove vowels." },
      { name: "Remove vowels", text: "Click Remove Vowels to strip all A, E, I, O, U characters instantly." },
      { name: "Copy the result", text: "Copy the consonant-only output for use in your project." }
    ],
    useCases: ["Creating abbreviations and shorthand notation", "Generating text puzzles and word games", "Demonstrating consonant-based writing systems", "Reducing character count for constrained outputs"],
    relatedSlugs: ["consonant-counter", "word-counter", "whitespace-remover"]
  },
  { slug: "consonant-counter", name: "Consonant Counter", description: "Count consonants, vowels, and letter frequency in any text.", category: "text", icon: "🔢", keywords: ["consonant count", "vowel count", "letter frequency", "text analysis"], subcategory: "analysis",
    longDescription: "Analyse the letter composition of any text by counting consonants, vowels, and total letters. View a frequency breakdown showing how many times each letter appears, expressed as both a count and a percentage. Useful for linguistic analysis, word game strategy, and educational exercises.",
    faqs: [
      { question: "Are uppercase and lowercase counted separately?", answer: "No — the count is case-insensitive. 'A' and 'a' are both counted as the same vowel." },
      { question: "Are numbers and punctuation counted?", answer: "No — only alphabetic characters are counted. Digits, spaces, and punctuation are excluded from all letter counts." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Paste or type the text you want to analyse." },
      { name: "View counts", text: "The tool instantly displays total letters, vowel count, consonant count, and a per-letter frequency table." },
      { name: "Use the data", text: "Reference the frequency breakdown for linguistic study, word game strategy, or text analysis." }
    ],
    useCases: ["Analysing letter distribution in writing samples", "Solving word games like Scrabble or Wordle", "Educational exercises for language learners", "Linguistic research on text corpora"],
    relatedSlugs: ["vowel-remover", "word-counter", "word-frequency"]
  },
  { slug: "sentence-shuffler", name: "Sentence Shuffler", description: "Randomly shuffle the sentences in any paragraph or text block.", category: "text", icon: "🔀", keywords: ["shuffle sentences", "randomize sentences", "sentence order", "text randomizer"], subcategory: "transform",
    longDescription: "Randomly reorder the sentences in any block of text with a single click. The tool splits text on sentence boundaries, shuffles the order using a random algorithm, and rejoins them. Useful for creating varied content, shuffling quiz questions, generating randomized study flashcards, or testing paragraph coherence.",
    faqs: [
      { question: "How does the tool detect sentence boundaries?", answer: "Sentences are split on full stops, exclamation marks, and question marks followed by whitespace. Multi-line text can also be shuffled line by line." },
      { question: "Can I shuffle line by line instead of by sentence?", answer: "Yes — toggle 'Line mode' to shuffle each line independently rather than detecting sentence punctuation." }
    ],
    howToSteps: [
      { name: "Paste your text", text: "Enter the paragraph or multi-sentence text you want to shuffle." },
      { name: "Shuffle", text: "Click Shuffle Sentences to randomise the order. Click again for a new arrangement." },
      { name: "Copy the result", text: "Copy the shuffled text to use in your document or application." }
    ],
    useCases: ["Randomising quiz or trivia question order", "Shuffling flashcard content for varied study", "Testing whether paragraphs are coherent regardless of sentence order", "Generating varied content for A/B testing"],
    relatedSlugs: ["line-sorter", "text-diff", "duplicate-line-remover"]
  },
  { slug: "text-to-pig-latin", name: "Pig Latin Converter", description: "Convert English text to Pig Latin following standard rules.", category: "text", icon: "🐷", keywords: ["pig latin", "pig latin converter", "language game", "text encoder"], subcategory: "transform",
    longDescription: "Translate any English text to Pig Latin using the standard rules: consonant clusters at the start of a word are moved to the end and 'ay' is appended, while words starting with a vowel simply have 'yay' added. Preserves capitalisation, punctuation, and spacing for a clean result.",
    faqs: [
      { question: "What are the rules for Pig Latin?", answer: "For words starting with a consonant or consonant cluster, move it to the end and add 'ay' (e.g., 'string' → 'ingstray'). For words starting with a vowel, add 'yay' to the end (e.g., 'apple' → 'appleyay')." },
      { question: "Does it handle capitalisation?", answer: "Yes — the tool preserves the original capitalisation pattern, so 'Hello' becomes 'Ellohay' with the capital on the first letter." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste the English text you want to convert." },
      { name: "Convert", text: "Click Convert to Pig Latin to see the translated output instantly." },
      { name: "Copy the result", text: "Copy the Pig Latin text to share or use in your project." }
    ],
    useCases: ["Educational exercises for learning phoneme rules", "Fun novelty messages and social posts", "Children's language games and activities", "Demonstrating string manipulation in coding tutorials"],
    relatedSlugs: ["text-to-morse", "fancy-text", "case-converter"]
  },
  { slug: "acronym-generator", name: "Acronym Generator", description: "Generate an acronym from any phrase by extracting initial letters.", category: "text", icon: "🔡", keywords: ["acronym", "abbreviation generator", "initialism", "acronym maker"], subcategory: "analysis",
    longDescription: "Instantly generate an acronym from any multi-word phrase by extracting the first letter of each significant word. Filter out common stop words (a, an, the, of, etc.) to produce cleaner acronyms. Useful for naming projects, organisations, technical standards, or creating memorable abbreviations.",
    faqs: [
      { question: "Are stop words excluded automatically?", answer: "Yes — common English stop words like 'a', 'an', 'the', 'of', 'in', 'and', 'or', and 'for' are excluded by default so the acronym captures only meaningful words. You can toggle stop-word filtering off if needed." },
      { question: "Can I generate backronyms?", answer: "The tool focuses on forward acronym generation. For backronym creation (finding a phrase for a given acronym), use the phrase as your starting point and edit the output manually." }
    ],
    howToSteps: [
      { name: "Enter a phrase", text: "Type or paste the phrase you want to create an acronym from." },
      { name: "Adjust settings", text: "Toggle stop-word filtering and choose uppercase or mixed case output." },
      { name: "Copy the acronym", text: "Copy the generated acronym to use in your project name or documentation." }
    ],
    useCases: ["Creating project or product name acronyms", "Generating abbreviations for organisational names", "Building memorable shorthand for technical standards", "Naming teams, features, or internal tools"],
    relatedSlugs: ["slugify", "case-converter", "word-counter"]
  },
  { slug: "tab-to-spaces", name: "Tab to Spaces Converter", description: "Convert tab characters to spaces with configurable tab width.", category: "text", icon: "⇥", keywords: ["tab to spaces", "convert tabs", "indent converter", "whitespace"], subcategory: "formatting",
    longDescription: "Replace tab characters with a configurable number of spaces (2, 4, or 8 by default) to standardise indentation across code files and text documents. Essential for teams that prefer space-based indentation, or when preparing code for environments that render tabs with a fixed width.",
    faqs: [
      { question: "What tab width should I use?", answer: "Two spaces is common in JavaScript, Ruby, and web projects. Four spaces is standard for Python, Java, and C#. Use whatever your project's style guide specifies." },
      { question: "Will it change anything else besides tabs?", answer: "No — only tab characters (\\t) are replaced. Existing spaces and all other characters are left untouched." }
    ],
    howToSteps: [
      { name: "Paste your code or text", text: "Enter the text containing tab characters you want to convert." },
      { name: "Set tab width", text: "Choose how many spaces each tab should be replaced with — 2, 4, or 8." },
      { name: "Convert and copy", text: "Click Convert and copy the space-indented output." }
    ],
    useCases: ["Standardising code indentation when merging files from different editors", "Preparing code for linters or formatters that require spaces", "Fixing tab-indented files for Python projects", "Converting tabs before pasting into space-sensitive environments"],
    relatedSlugs: ["spaces-to-tabs", "whitespace-remover", "find-and-replace"]
  },
  { slug: "spaces-to-tabs", name: "Spaces to Tabs Converter", description: "Convert leading spaces to tab characters with configurable tab width.", category: "text", icon: "⇤", keywords: ["spaces to tabs", "convert spaces", "tab indent", "whitespace"], subcategory: "formatting",
    longDescription: "Convert space-based indentation back to tab characters for projects that prefer tab indentation. Specify the number of spaces that represent one tab level and the tool will intelligently replace only leading whitespace groups, preserving the rest of the content.",
    faqs: [
      { question: "Does it convert all spaces or only indentation?", answer: "Only leading whitespace (indentation at the start of each line) is converted to tabs. Spaces within text content are left unchanged." },
      { question: "What if my code uses mixed indentation?", answer: "The tool normalises mixed indentation by treating each group of N spaces at the start of a line as one tab, where N is your configured tab width." }
    ],
    howToSteps: [
      { name: "Paste your code", text: "Enter the text with space-based indentation you want to convert." },
      { name: "Set spaces per tab", text: "Choose how many spaces constitute one tab level — typically 2 or 4." },
      { name: "Convert and copy", text: "Click Convert and copy the tab-indented output." }
    ],
    useCases: ["Converting space-indented code to match a tab-based style guide", "Preparing code for editors or tools that require tab indentation", "Standardising indentation across a codebase", "Reducing file size by replacing repeated spaces with single tab characters"],
    relatedSlugs: ["tab-to-spaces", "whitespace-remover", "find-and-replace"]
  },
  { slug: "text-to-json-string", name: "Text to JSON String", description: "Escape any text as a valid JSON string value with proper encoding.", category: "text", icon: "{ }", keywords: ["json escape", "json string", "escape text", "json encode"], subcategory: "encoding",
    longDescription: "Convert any plain text into a properly escaped JSON string literal. Handles quotes, backslashes, newlines, tab characters, carriage returns, and all other characters that require escaping per the JSON specification (RFC 8259). Also supports the reverse — unescaping a JSON string back to plain text.",
    faqs: [
      { question: "Why do I need to escape text for JSON?", answer: "JSON strings must not contain raw double quotes, backslashes, or control characters. These must be escaped with a backslash prefix. Failing to escape these characters causes JSON parse errors." },
      { question: "Can I unescape a JSON string too?", answer: "Yes — paste an escaped JSON string and toggle Unescape mode to recover the original plain text." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Paste or type the text you want to use as a JSON string value." },
      { name: "Escape", text: "Click Escape to JSON to see the properly escaped version, ready to paste between JSON double quotes." },
      { name: "Copy the result", text: "Copy the escaped string to embed directly in your JSON data." }
    ],
    useCases: ["Embedding multiline text as a JSON property value", "Preparing user input for JSON API requests", "Debugging JSON parse errors caused by unescaped characters", "Encoding configuration values for JSON config files"],
    relatedSlugs: ["json-formatter", "url-encoder", "base64-encoder"]
  },
  { slug: "remove-html-comments", name: "Remove HTML Comments", description: "Strip all HTML comments from code quickly and cleanly.", category: "text", icon: "🧹", keywords: ["remove html comments", "strip comments", "clean html", "html cleaner"], subcategory: "formatting",
    longDescription: "Remove all HTML comment blocks (<!-- ... -->) from HTML source code in one click. Handles single-line and multi-line comments, conditional comments (IE-style), and comments nested within script or style blocks. Produces clean HTML ready for production deployment.",
    faqs: [
      { question: "Does it remove conditional comments?", answer: "Yes — standard HTML conditional comments like <!--[if IE]>...<![endif]--> are also removed. Toggle this off if you need to preserve them." },
      { question: "Does it affect JavaScript or CSS comments?", answer: "No — only HTML comment syntax (<!-- -->) is targeted. JavaScript (//) and CSS (/* */) comments within embedded script and style tags are not affected." }
    ],
    howToSteps: [
      { name: "Paste your HTML", text: "Enter the HTML source code containing comments you want to remove." },
      { name: "Remove comments", text: "Click Remove Comments to strip all <!-- --> blocks from the code." },
      { name: "Copy the clean HTML", text: "Copy the comment-free HTML for use in your project." }
    ],
    useCases: ["Cleaning HTML before production deployment", "Removing developer notes from client-facing code", "Reducing HTML file size by stripping non-functional markup", "Preparing HTML templates for distribution"],
    relatedSlugs: ["html-prettifier", "whitespace-remover", "find-and-replace"]
  },
  { slug: "morse-code-decoder", name: "Morse Code Decoder", description: "Decode Morse code to text and encode text to Morse code.", category: "text", icon: "📡", keywords: ["morse code", "morse decoder", "morse encoder", "dot dash"], subcategory: "transform",
    longDescription: "Convert between plain text and International Morse Code. Type text to see the Morse code with dots and dashes, or paste Morse code (using . and - or · and −) to decode it back to text. Supports letters A-Z, digits 0-9, and common punctuation. Includes audio playback of the Morse code pattern.",
    faqs: [
      { question: "What characters are supported?", answer: "All 26 English letters (A-Z), digits 0-9, and common punctuation including period, comma, question mark, and exclamation point." },
      { question: "How should Morse code be formatted?", answer: "Separate individual characters with spaces, and separate words with forward slashes (/) or three spaces." },
      { question: "What is the difference between dot and dash?", answer: "A dot (·) is a short signal and a dash (−) is a long signal, three times the length of a dot." }
    ],
    howToSteps: [
      { name: "Choose direction", text: "Select whether to encode text to Morse or decode Morse to text." },
      { name: "Enter your input", text: "Type or paste your text or Morse code." },
      { name: "Copy the result", text: "The conversion appears instantly. Click copy to use it." }
    ],
    useCases: ["Decoding Morse code messages for amateur radio", "Learning Morse code for emergency communication", "Encoding messages for puzzles and escape rooms", "Educational exercises in signal communication"],
    relatedSlugs: ["text-to-morse", "text-to-binary", "caesar-cipher", "binary-calculator"]
  },
  { slug: "reading-level-analyzer", name: "Reading Level Analyzer", description: "Analyze text reading level using Flesch-Kincaid and other readability scores.", category: "text", icon: "📖", keywords: ["reading level", "flesch kincaid", "readability score", "grade level", "text analysis"], subcategory: "analysis",
    longDescription: "Analyze any text to determine its reading difficulty using established readability formulas. Calculates Flesch Reading Ease, Flesch-Kincaid Grade Level, and estimated reading time. Helps writers ensure their content matches their target audience's reading ability.",
    faqs: [
      { question: "What is the Flesch Reading Ease score?", answer: "A score from 0-100 where higher scores mean easier readability. 60-70 is standard, 90-100 is very easy (5th grade), and below 30 is very difficult (college graduate)." },
      { question: "What is the Flesch-Kincaid Grade Level?", answer: "It estimates the US school grade level needed to understand the text. A grade level of 8 means an 8th grader should be able to comprehend it." },
      { question: "How accurate are these scores?", answer: "These are well-established formulas used by the US military, government, and publishing industry. They measure structural complexity but not conceptual difficulty." }
    ],
    howToSteps: [
      { name: "Enter text", text: "Paste or type the text you want to analyze." },
      { name: "View scores", text: "Reading scores are calculated in real-time as you type." },
      { name: "Adjust your writing", text: "Use shorter sentences and simpler words to improve readability scores." }
    ],
    useCases: ["Ensuring marketing copy is accessible to the target audience", "Checking academic papers meet journal readability guidelines", "Simplifying technical documentation for general readers", "Optimizing web content for SEO readability scores"],
    relatedSlugs: ["readability-checker", "word-counter", "readability-improver", "word-frequency"]
  },
];
