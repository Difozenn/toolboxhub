import type { Tool, Category, ToolCategory } from "./types";

export const categories: Category[] = [
  { value: "text", label: "Text Tools", icon: "📝" },
  { value: "developer", label: "Developer Tools", icon: "💻" },
  { value: "math", label: "Math Tools", icon: "🔢" },
  { value: "converter", label: "Converters", icon: "🔄" },
  { value: "generator", label: "Generators", icon: "⚡" },
  { value: "image", label: "Image Tools", icon: "🖼️" },
  { value: "crypto", label: "Crypto & Security", icon: "🔐" },
  { value: "seo", label: "SEO & Marketing", icon: "📈" },
  { value: "utility", label: "Utilities", icon: "🧰" },
];

export const tools: Tool[] = [
  // ── Text Tools (15) ──────────────────────────────────────────
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, sentences, and paragraphs in any text.", category: "text", icon: "🔤", keywords: ["word count", "character count", "sentence count", "text stats"] },
  { slug: "case-converter", name: "Case Converter", description: "Convert text between uppercase, lowercase, title case, sentence case, and more.", category: "text", icon: "🔡", keywords: ["uppercase", "lowercase", "title case", "text transform"] },
  { slug: "lorem-ipsum", name: "Lorem Ipsum Generator", description: "Generate placeholder text for designs, mockups, and layouts.", category: "text", icon: "📄", keywords: ["lorem ipsum", "placeholder text", "dummy text", "filler text"] },
  { slug: "text-diff", name: "Text Diff Checker", description: "Compare two texts side-by-side and see the differences highlighted.", category: "text", icon: "📊", keywords: ["text compare", "diff checker", "text difference"] },
  { slug: "slugify", name: "Slugify", description: "Convert text to URL-friendly slugs for web addresses and file names.", category: "text", icon: "🔗", keywords: ["slug generator", "url slug", "url friendly", "permalink"] },
  { slug: "text-reverser", name: "Text Reverser", description: "Reverse any text, words, or sentences instantly.", category: "text", icon: "↩️", keywords: ["reverse text", "reverse string", "backwards text", "mirror text"] },
  { slug: "line-sorter", name: "Line Sorter", description: "Sort lines alphabetically, numerically, or randomly.", category: "text", icon: "📋", keywords: ["sort lines", "alphabetical sort", "line organizer", "text sorter"] },
  { slug: "duplicate-line-remover", name: "Duplicate Line Remover", description: "Remove duplicate lines from text and keep only unique entries.", category: "text", icon: "🧹", keywords: ["remove duplicates", "unique lines", "deduplicate", "distinct lines"] },
  { slug: "word-frequency", name: "Word Frequency Counter", description: "Analyze text and see how often each word appears.", category: "text", icon: "📊", keywords: ["word frequency", "word count", "text analysis", "word usage"] },
  { slug: "whitespace-remover", name: "Whitespace Remover", description: "Remove extra whitespace, tabs, and blank lines from text.", category: "text", icon: "🧽", keywords: ["remove whitespace", "trim text", "clean text", "remove spaces"] },
  { slug: "add-line-numbers", name: "Add Line Numbers", description: "Add line numbers to any text with customizable formatting.", category: "text", icon: "🔢", keywords: ["line numbers", "number lines", "line count", "text numbering"] },
  { slug: "text-repeater", name: "Text Repeater", description: "Repeat any text a specified number of times.", category: "text", icon: "🔁", keywords: ["repeat text", "text multiplier", "duplicate text", "copy text"] },
  { slug: "fancy-text", name: "Fancy Text Generator", description: "Convert text to fancy Unicode styles like bold, italic, script, and more.", category: "text", icon: "✨", keywords: ["fancy text", "unicode text", "stylish text", "bold text", "italic text"] },
  { slug: "text-to-binary", name: "Text to Binary", description: "Convert text to binary code and binary back to text.", category: "text", icon: "💾", keywords: ["text to binary", "binary to text", "binary converter", "ascii to binary"] },
  { slug: "string-length", name: "String Length Calculator", description: "Calculate the byte length of strings in various encodings.", category: "text", icon: "📐", keywords: ["string length", "byte count", "character length", "utf8 length"] },

  // ── Developer Tools (20) ────────────────────────────────────
  { slug: "json-formatter", name: "JSON Formatter", description: "Format, validate, and beautify JSON data with syntax highlighting.", category: "developer", icon: "🧩", keywords: ["json format", "json beautify", "json validate", "json pretty print"] },
  { slug: "base64-encoder", name: "Base64 Encoder/Decoder", description: "Encode text to Base64 or decode Base64 strings back to plain text.", category: "developer", icon: "🔣", keywords: ["base64 encode", "base64 decode", "base64 converter"] },
  { slug: "url-encoder", name: "URL Encoder/Decoder", description: "Encode or decode URL components for safe use in web addresses.", category: "developer", icon: "🌐", keywords: ["url encode", "url decode", "percent encoding"] },
  { slug: "html-entity-encoder", name: "HTML Entity Encoder/Decoder", description: "Encode special characters to HTML entities or decode them back.", category: "developer", icon: "🏷️", keywords: ["html encode", "html decode", "html entities"] },
  { slug: "regex-tester", name: "Regex Tester", description: "Test regular expressions with real-time matching and group highlighting.", category: "developer", icon: "🧪", keywords: ["regex", "regular expression", "pattern matching"] },
  { slug: "css-minifier", name: "CSS Minifier", description: "Minify CSS code by removing whitespace, comments, and unnecessary characters.", category: "developer", icon: "🎨", keywords: ["css minify", "css compress", "minify css", "css optimizer"] },
  { slug: "javascript-minifier", name: "JavaScript Minifier", description: "Minify JavaScript code to reduce file size.", category: "developer", icon: "📦", keywords: ["js minify", "javascript compress", "minify js", "uglify"] },
  { slug: "html-prettifier", name: "HTML Prettifier", description: "Format and indent HTML code for better readability.", category: "developer", icon: "🏗️", keywords: ["html format", "html beautify", "html indent", "html pretty print"] },
  { slug: "sql-formatter", name: "SQL Formatter", description: "Format and beautify SQL queries with proper indentation.", category: "developer", icon: "🗃️", keywords: ["sql format", "sql beautify", "sql indent", "query formatter"] },
  { slug: "markdown-preview", name: "Markdown Preview", description: "Write Markdown and see the rendered preview in real-time.", category: "developer", icon: "📝", keywords: ["markdown preview", "markdown editor", "md preview", "markdown render"] },
  { slug: "cron-parser", name: "Cron Expression Parser", description: "Parse and explain cron expressions in human-readable format.", category: "developer", icon: "⏰", keywords: ["cron expression", "cron parser", "crontab", "cron schedule"] },
  { slug: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JSON Web Tokens without verification.", category: "developer", icon: "🔓", keywords: ["jwt decode", "jwt parser", "json web token", "jwt inspector"] },
  { slug: "css-gradient-generator", name: "CSS Gradient Generator", description: "Create beautiful CSS gradients with a visual editor.", category: "developer", icon: "🌈", keywords: ["css gradient", "gradient generator", "linear gradient", "radial gradient"] },
  { slug: "box-shadow-generator", name: "Box Shadow Generator", description: "Design CSS box shadows with a visual editor and get the code.", category: "developer", icon: "🖼️", keywords: ["box shadow", "css shadow", "shadow generator", "drop shadow"] },
  { slug: "meta-tag-generator", name: "Meta Tag Generator", description: "Generate HTML meta tags for SEO, social sharing, and more.", category: "developer", icon: "🏷️", keywords: ["meta tags", "seo tags", "og tags", "meta generator"] },
  { slug: "chmod-calculator", name: "Chmod Calculator", description: "Calculate Unix file permissions in numeric and symbolic notation.", category: "developer", icon: "🔒", keywords: ["chmod", "file permissions", "unix permissions", "linux chmod"] },
  { slug: "csv-to-json", name: "CSV to JSON", description: "Convert CSV data to JSON format and vice versa.", category: "developer", icon: "📊", keywords: ["csv to json", "json to csv", "csv converter", "data converter"] },
  { slug: "xml-to-json", name: "XML to JSON", description: "Convert XML data to JSON format.", category: "developer", icon: "📄", keywords: ["xml to json", "xml converter", "xml parser", "data transform"] },
  { slug: "yaml-to-json", name: "YAML to JSON", description: "Convert between YAML and JSON formats.", category: "developer", icon: "📋", keywords: ["yaml to json", "json to yaml", "yaml converter", "yaml parser"] },
  { slug: "user-agent-parser", name: "User Agent Parser", description: "Parse and analyze browser user agent strings.", category: "developer", icon: "🔍", keywords: ["user agent", "browser detection", "ua parser", "device detection"] },

  // ── Math Tools (12) ─────────────────────────────────────────
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Calculate percentages, percentage change, and percentage differences.", category: "math", icon: "➗", keywords: ["percentage", "percent calculator", "percentage change"] },
  { slug: "scientific-calculator", name: "Scientific Calculator", description: "A full-featured scientific calculator with advanced math functions.", category: "math", icon: "🧮", keywords: ["scientific calculator", "math calculator", "advanced calculator"] },
  { slug: "bmi-calculator", name: "BMI Calculator", description: "Calculate your Body Mass Index and see your health category.", category: "math", icon: "⚖️", keywords: ["bmi calculator", "body mass index", "weight calculator", "health calculator"] },
  { slug: "age-calculator", name: "Age Calculator", description: "Calculate exact age in years, months, and days from a birthdate.", category: "math", icon: "🎂", keywords: ["age calculator", "birthday calculator", "date calculator", "how old am i"] },
  { slug: "loan-calculator", name: "Loan Calculator", description: "Calculate monthly payments, total interest, and amortization schedules.", category: "math", icon: "🏦", keywords: ["loan calculator", "mortgage calculator", "emi calculator", "interest calculator"] },
  { slug: "compound-interest", name: "Compound Interest Calculator", description: "Calculate compound interest with customizable rates and periods.", category: "math", icon: "📈", keywords: ["compound interest", "interest calculator", "investment calculator", "savings calculator"] },
  { slug: "tip-calculator", name: "Tip Calculator", description: "Calculate tips and split bills between multiple people.", category: "math", icon: "💰", keywords: ["tip calculator", "bill splitter", "gratuity calculator", "restaurant tip"] },
  { slug: "discount-calculator", name: "Discount Calculator", description: "Calculate sale prices, discount amounts, and savings.", category: "math", icon: "🏷️", keywords: ["discount calculator", "sale price", "percentage off", "savings calculator"] },
  { slug: "average-calculator", name: "Average Calculator", description: "Calculate mean, median, mode, and range of a set of numbers.", category: "math", icon: "📊", keywords: ["average calculator", "mean calculator", "median calculator", "statistics"] },
  { slug: "roman-numeral-converter", name: "Roman Numeral Converter", description: "Convert between Roman numerals and decimal numbers.", category: "math", icon: "🏛️", keywords: ["roman numerals", "roman converter", "numeral converter", "roman to decimal"] },
  { slug: "random-number-generator", name: "Random Number Generator", description: "Generate random numbers within a custom range.", category: "math", icon: "🎲", keywords: ["random number", "rng", "number generator", "dice roller"] },
  { slug: "gpa-calculator", name: "GPA Calculator", description: "Calculate your Grade Point Average from your course grades.", category: "math", icon: "🎓", keywords: ["gpa calculator", "grade calculator", "grade point average", "academic grades"] },

  // ── Converters (15) ─────────────────────────────────────────
  { slug: "unit-converter", name: "Unit Converter", description: "Convert between units of length, weight, temperature, volume, and more.", category: "converter", icon: "📏", keywords: ["unit conversion", "length converter", "weight converter", "metric imperial"] },
  { slug: "color-converter", name: "Color Converter", description: "Convert between HEX, RGB, and HSL color formats with a live preview.", category: "converter", icon: "🎨", keywords: ["hex to rgb", "rgb to hex", "hsl converter", "color picker"] },
  { slug: "number-base-converter", name: "Number Base Converter", description: "Convert numbers between binary, decimal, hexadecimal, and octal bases.", category: "converter", icon: "🔢", keywords: ["binary converter", "hex converter", "octal converter"] },
  { slug: "timestamp-converter", name: "Timestamp Converter", description: "Convert Unix timestamps to human-readable dates and back.", category: "converter", icon: "⏱️", keywords: ["unix timestamp", "epoch converter", "date to timestamp"] },
  { slug: "morse-code", name: "Morse Code Translator", description: "Convert text to Morse code and decode Morse code back to text.", category: "converter", icon: "📡", keywords: ["morse code", "morse translator", "morse encoder"] },
  { slug: "timezone-converter", name: "Time Zone Converter", description: "Convert times between different time zones worldwide.", category: "converter", icon: "🌍", keywords: ["timezone converter", "time zone", "world clock", "utc converter"] },
  { slug: "cooking-converter", name: "Cooking Unit Converter", description: "Convert between cups, tablespoons, milliliters, grams, and more.", category: "converter", icon: "🍳", keywords: ["cooking converter", "cups to ml", "recipe converter", "kitchen converter"] },
  { slug: "hex-to-text", name: "Hex to Text", description: "Convert hexadecimal strings to readable text and back.", category: "converter", icon: "🔠", keywords: ["hex to text", "text to hex", "hexadecimal converter", "hex string"] },
  { slug: "markdown-to-html", name: "Markdown to HTML", description: "Convert Markdown text to HTML code.", category: "converter", icon: "📝", keywords: ["markdown to html", "md to html", "markdown converter", "markdown parser"] },
  { slug: "csv-to-table", name: "CSV to Table", description: "Convert CSV data to a formatted HTML table.", category: "converter", icon: "📊", keywords: ["csv to table", "csv viewer", "csv formatter", "table generator"] },
  { slug: "text-to-nato", name: "NATO Phonetic Alphabet", description: "Convert text to NATO phonetic alphabet spelling.", category: "converter", icon: "🎖️", keywords: ["nato alphabet", "phonetic alphabet", "spelling alphabet", "alpha bravo"] },
  { slug: "currency-converter", name: "Currency Converter", description: "Convert between major world currencies with approximate rates.", category: "converter", icon: "💱", keywords: ["currency converter", "exchange rate", "money converter", "forex"] },
  { slug: "image-to-base64", name: "Image to Base64", description: "Convert images to Base64 encoded strings for embedding in code.", category: "converter", icon: "🖼️", keywords: ["image to base64", "base64 image", "image encoder", "data uri"] },
  { slug: "json-to-typescript", name: "JSON to TypeScript", description: "Generate TypeScript interfaces from JSON data.", category: "converter", icon: "📘", keywords: ["json to typescript", "typescript interface", "type generator", "json to types"] },
  { slug: "pixels-to-rem", name: "PX to REM Converter", description: "Convert between pixels and rem units for responsive design.", category: "converter", icon: "📐", keywords: ["px to rem", "rem to px", "css units", "responsive design"] },

  // ── Generators (13) ─────────────────────────────────────────
  { slug: "password-generator", name: "Password Generator", description: "Generate strong, secure random passwords with customizable options.", category: "generator", icon: "🔑", keywords: ["password generator", "random password", "strong password"] },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate universally unique identifiers (UUID v4) instantly.", category: "generator", icon: "🆔", keywords: ["uuid", "uuid v4", "guid", "unique id"] },
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Generate QR codes from any text or URL for easy sharing.", category: "generator", icon: "📱", keywords: ["qr code", "qr generator", "barcode"] },
  { slug: "color-palette-generator", name: "Color Palette Generator", description: "Generate harmonious color palettes for your design projects.", category: "generator", icon: "🎨", keywords: ["color palette", "color scheme", "color harmony", "design colors"] },
  { slug: "fake-data-generator", name: "Fake Data Generator", description: "Generate fake names, emails, addresses, and more for testing.", category: "generator", icon: "🎭", keywords: ["fake data", "mock data", "test data", "dummy data"] },
  { slug: "placeholder-image", name: "Placeholder Image Generator", description: "Generate placeholder images of any size with custom colors and text.", category: "generator", icon: "🖼️", keywords: ["placeholder image", "dummy image", "image placeholder", "test image"] },
  { slug: "invoice-generator", name: "Invoice Generator", description: "Create professional invoices that you can print or save as PDF.", category: "generator", icon: "🧾", keywords: ["invoice generator", "invoice maker", "bill generator", "receipt maker"] },
  { slug: "credit-card-validator", name: "Credit Card Validator", description: "Validate credit card numbers using the Luhn algorithm.", category: "generator", icon: "💳", keywords: ["credit card validator", "luhn algorithm", "card number check", "cc validator"] },
  { slug: "emoji-picker", name: "Emoji Picker", description: "Browse, search, and copy emojis organized by category.", category: "generator", icon: "😀", keywords: ["emoji picker", "emoji search", "copy emoji", "emoji list"] },
  { slug: "random-color", name: "Random Color Generator", description: "Generate random colors with HEX, RGB, and HSL values.", category: "generator", icon: "🌈", keywords: ["random color", "color generator", "color randomizer"] },
  { slug: "htaccess-generator", name: ".htaccess Generator", description: "Generate Apache .htaccess rules for redirects, security, and caching.", category: "generator", icon: "⚙️", keywords: ["htaccess", "apache config", "redirect rules", "url rewrite"] },
  { slug: "robots-txt-generator", name: "Robots.txt Generator", description: "Generate robots.txt files to control search engine crawling.", category: "generator", icon: "🤖", keywords: ["robots.txt", "robot exclusion", "crawl control", "seo robots"] },
  { slug: "privacy-policy-generator", name: "Privacy Policy Generator", description: "Generate a basic privacy policy for your website.", category: "generator", icon: "📜", keywords: ["privacy policy", "gdpr", "cookie policy", "legal generator"] },

  // ── Image Tools (5) ─────────────────────────────────────────
  { slug: "image-resizer", name: "Image Resizer", description: "Resize images to any dimensions right in your browser.", category: "image", icon: "📐", keywords: ["resize image", "image dimensions", "scale image", "image resize"] },
  { slug: "image-cropper", name: "Image Cropper", description: "Crop images to custom dimensions or aspect ratios.", category: "image", icon: "✂️", keywords: ["crop image", "image crop", "trim image", "cut image"] },
  { slug: "image-compressor", name: "Image Compressor", description: "Compress images to reduce file size while maintaining quality.", category: "image", icon: "📦", keywords: ["compress image", "image compression", "reduce image size", "optimize image"] },
  { slug: "svg-to-png", name: "SVG to PNG Converter", description: "Convert SVG vector images to PNG raster format.", category: "image", icon: "🖼️", keywords: ["svg to png", "svg converter", "vector to raster", "image convert"] },
  { slug: "favicon-generator", name: "Favicon Generator", description: "Generate favicons in multiple sizes from any image.", category: "image", icon: "🌟", keywords: ["favicon", "favicon generator", "website icon", "ico generator"] },

  // ── Crypto & Security (8) ───────────────────────────────────
  { slug: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, and SHA-256 hashes from any input text.", category: "crypto", icon: "🛡️", keywords: ["md5 hash", "sha256 hash", "sha1 hash", "hash generator"] },
  { slug: "encryption-tool", name: "Text Encryption/Decryption", description: "Encrypt and decrypt text using AES encryption.", category: "crypto", icon: "🔐", keywords: ["encrypt text", "decrypt text", "aes encryption", "text cipher"] },
  { slug: "rot13", name: "ROT13 Encoder", description: "Encode and decode text using the ROT13 substitution cipher.", category: "crypto", icon: "🔄", keywords: ["rot13", "caesar cipher", "text cipher", "rot13 encoder"] },
  { slug: "caesar-cipher", name: "Caesar Cipher", description: "Encrypt and decrypt text using the Caesar cipher with custom shift.", category: "crypto", icon: "🏛️", keywords: ["caesar cipher", "shift cipher", "substitution cipher", "encryption"] },
  { slug: "password-strength", name: "Password Strength Checker", description: "Check how strong your password is and get improvement suggestions.", category: "crypto", icon: "💪", keywords: ["password strength", "password checker", "password security", "strong password"] },
  { slug: "checksum-calculator", name: "Checksum Calculator", description: "Calculate and verify file checksums (MD5, SHA-1, SHA-256).", category: "crypto", icon: "✅", keywords: ["checksum", "file hash", "verify checksum", "file integrity"] },
  { slug: "ip-address-lookup", name: "IP Address Lookup", description: "Look up your public IP address and basic network information.", category: "crypto", icon: "🌐", keywords: ["ip address", "my ip", "ip lookup", "public ip", "what is my ip"] },
  { slug: "whois-lookup", name: "WHOIS Lookup", description: "Look up domain registration information.", category: "crypto", icon: "🔍", keywords: ["whois", "domain lookup", "domain info", "domain registration"] },

  // ── SEO & Marketing (7) ─────────────────────────────────────
  { slug: "og-preview", name: "Open Graph Preview", description: "Preview how your website looks when shared on social media.", category: "seo", icon: "👁️", keywords: ["open graph", "og preview", "social preview", "link preview"] },
  { slug: "keyword-density", name: "Keyword Density Checker", description: "Analyze keyword density and frequency in your content.", category: "seo", icon: "🔑", keywords: ["keyword density", "seo analysis", "keyword frequency", "content analysis"] },
  { slug: "google-serp-preview", name: "Google SERP Preview", description: "Preview how your page will look in Google search results.", category: "seo", icon: "🔍", keywords: ["serp preview", "google preview", "search result preview", "seo preview"] },
  { slug: "utm-builder", name: "UTM Link Builder", description: "Build UTM-tagged URLs for tracking marketing campaigns.", category: "seo", icon: "🔗", keywords: ["utm builder", "utm parameters", "campaign tracking", "url builder"] },
  { slug: "email-validator", name: "Email Validator", description: "Validate email address format and check for common issues.", category: "seo", icon: "📧", keywords: ["email validator", "email checker", "validate email", "email format"] },
  { slug: "twitter-card-preview", name: "Twitter Card Preview", description: "Preview how your content will look when shared on Twitter/X.", category: "seo", icon: "🐦", keywords: ["twitter card", "x card", "social card", "twitter preview"] },
  { slug: "readability-checker", name: "Readability Checker", description: "Check the readability score and reading level of your content.", category: "seo", icon: "📖", keywords: ["readability", "flesch score", "reading level", "content readability"] },

  // ── Utilities (5) ───────────────────────────────────────────
  { slug: "pomodoro-timer", name: "Pomodoro Timer", description: "Stay focused with the Pomodoro technique — 25 min work, 5 min break.", category: "utility", icon: "🍅", keywords: ["pomodoro", "timer", "focus timer", "productivity timer"] },
  { slug: "countdown-timer", name: "Countdown Timer", description: "Set a countdown timer to any date or duration.", category: "utility", icon: "⏳", keywords: ["countdown timer", "timer", "event countdown", "date countdown"] },
  { slug: "stopwatch", name: "Stopwatch", description: "A simple stopwatch with lap tracking functionality.", category: "utility", icon: "⏱️", keywords: ["stopwatch", "timer", "lap timer", "time tracker"] },
  { slug: "notepad", name: "Online Notepad", description: "A simple browser-based notepad that saves to local storage.", category: "utility", icon: "📝", keywords: ["notepad", "online notepad", "text editor", "notes"] },
  { slug: "screen-resolution", name: "Screen Resolution Detector", description: "Detect your screen resolution, viewport size, and device pixel ratio.", category: "utility", icon: "🖥️", keywords: ["screen resolution", "viewport size", "screen size", "display info"] },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((tool) => tool.category === category);
}
