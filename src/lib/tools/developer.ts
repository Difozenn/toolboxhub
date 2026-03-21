import type { Tool } from "../types";

export const developerTools: Tool[] = [
  // ── Existing (20) ──────────────────────────────────────────
  { slug: "json-formatter", name: "JSON Formatter", description: "Format, validate, and beautify JSON data with syntax highlighting.", category: "developer", icon: "🧩", keywords: ["json format", "json beautify", "json validate", "json pretty print"], subcategory: "formatters",
    longDescription: "Format, validate, and beautify JSON data with syntax highlighting. Paste minified or messy JSON and get perfectly indented, color-coded output. Supports JSON validation with clear error messages pointing to the exact line and position of any issues. Features include formatting, minifying, and validating JSON data.",
    faqs: [
      { question: "Can it fix invalid JSON?", answer: "It can't auto-fix invalid JSON, but it clearly shows where the error is located so you can fix it manually." },
      { question: "Is there a size limit?", answer: "The tool works in your browser, so it can handle JSON files up to several megabytes without issues." }
    ],
    howToSteps: [
      { name: "Paste JSON", text: "Paste your JSON data into the input area." },
      { name: "Format or validate", text: "Click Format to beautify, Minify to compress, or Validate to check for errors." },
      { name: "Copy output", text: "Click the copy button to copy the formatted JSON." }
    ],
    useCases: ["Debugging API responses", "Formatting configuration files", "Validating JSON data before sending to APIs"],
    relatedSlugs: ["json-to-csv", "json-to-xml", "json-validator", "csv-to-json"]
  },
  { slug: "base64-encoder", name: "Base64 Encoder/Decoder", description: "Encode text to Base64 or decode Base64 strings back to plain text.", category: "developer", icon: "🔣", keywords: ["base64 encode", "base64 decode", "base64 converter"], subcategory: "converters",
    relatedSlugs: ["url-encoder", "html-entity-encoder", "image-to-base64"]
  },
  { slug: "url-encoder", name: "URL Encoder/Decoder", description: "Encode or decode URL components for safe use in web addresses.", category: "developer", icon: "🌐", keywords: ["url encode", "url decode", "percent encoding"], subcategory: "converters",
    relatedSlugs: ["base64-encoder", "html-entity-encoder", "url-parser"]
  },
  { slug: "html-entity-encoder", name: "HTML Entity Encoder/Decoder", description: "Encode special characters to HTML entities or decode them back.", category: "developer", icon: "🏷️", keywords: ["html encode", "html decode", "html entities"], subcategory: "converters",
    relatedSlugs: ["url-encoder", "base64-encoder", "html-prettifier"]
  },
  { slug: "regex-tester", name: "Regex Tester", description: "Test regular expressions with real-time matching and group highlighting.", category: "developer", icon: "🧪", keywords: ["regex", "regular expression", "pattern matching"], subcategory: "validators",
    relatedSlugs: ["find-and-replace", "json-validator", "email-validator"]
  },
  { slug: "css-minifier", name: "CSS Minifier", description: "Minify CSS code by removing whitespace, comments, and unnecessary characters.", category: "developer", icon: "🎨", keywords: ["css minify", "css compress", "minify css", "css optimizer"], subcategory: "formatters",
    relatedSlugs: ["css-formatter", "javascript-minifier", "html-minifier"]
  },
  { slug: "javascript-minifier", name: "JavaScript Minifier", description: "Minify JavaScript code to reduce file size.", category: "developer", icon: "📦", keywords: ["js minify", "javascript compress", "minify js", "uglify"], subcategory: "formatters",
    relatedSlugs: ["css-minifier", "html-minifier", "js-formatter"]
  },
  { slug: "html-prettifier", name: "HTML Prettifier", description: "Format and indent HTML code for better readability.", category: "developer", icon: "🏗️", keywords: ["html format", "html beautify", "html indent", "html pretty print"], subcategory: "formatters",
    relatedSlugs: ["html-minifier", "css-minifier", "html-entity-encoder"]
  },
  { slug: "sql-formatter", name: "SQL Formatter", description: "Format and beautify SQL queries with proper indentation.", category: "developer", icon: "🗃️", keywords: ["sql format", "sql beautify", "sql indent", "query formatter"], subcategory: "formatters",
    relatedSlugs: ["json-formatter", "css-minifier", "html-prettifier"]
  },
  { slug: "markdown-preview", name: "Markdown Preview", description: "Write Markdown and see the rendered preview in real-time.", category: "developer", icon: "📝", keywords: ["markdown preview", "markdown editor", "md preview", "markdown render"], subcategory: "formatters",
    relatedSlugs: ["markdown-to-html", "markdown-table-generator", "html-prettifier"]
  },
  { slug: "cron-parser", name: "Cron Expression Parser", description: "Parse and explain cron expressions in human-readable format.", category: "developer", icon: "⏰", keywords: ["cron expression", "cron parser", "crontab", "cron schedule"], subcategory: "validators",
    relatedSlugs: ["regex-tester", "timestamp-converter", "json-validator"]
  },
  { slug: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JSON Web Tokens without verification.", category: "developer", icon: "🔓", keywords: ["jwt decode", "jwt parser", "json web token", "jwt inspector"], subcategory: "validators",
    relatedSlugs: ["base64-encoder", "json-formatter", "hash-generator"]
  },
  { slug: "css-gradient-generator", name: "CSS Gradient Generator", description: "Create beautiful CSS gradients with a visual editor.", category: "developer", icon: "🌈", keywords: ["css gradient", "gradient generator", "linear gradient", "radial gradient"], subcategory: "generators",
    relatedSlugs: ["box-shadow-generator", "color-converter", "color-palette-generator"]
  },
  { slug: "box-shadow-generator", name: "Box Shadow Generator", description: "Design CSS box shadows with a visual editor and get the code.", category: "developer", icon: "🖼️", keywords: ["box shadow", "css shadow", "shadow generator", "drop shadow"], subcategory: "generators",
    relatedSlugs: ["css-gradient-generator", "color-picker", "css-minifier"]
  },
  { slug: "meta-tag-generator", name: "Meta Tag Generator", description: "Generate HTML meta tags for SEO, social sharing, and more.", category: "developer", icon: "🏷️", keywords: ["meta tags", "seo tags", "og tags", "meta generator"], subcategory: "generators",
    relatedSlugs: ["og-preview", "twitter-card-preview", "robots-txt-generator"]
  },
  { slug: "chmod-calculator", name: "Chmod Calculator", description: "Calculate Unix file permissions in numeric and symbolic notation.", category: "developer", icon: "🔒", keywords: ["chmod", "file permissions", "unix permissions", "linux chmod"], subcategory: "validators",
    relatedSlugs: ["htaccess-generator", "user-agent-parser", "cron-parser"]
  },
  { slug: "csv-to-json", name: "CSV to JSON", description: "Convert CSV data to JSON format and vice versa.", category: "developer", icon: "📊", keywords: ["csv to json", "json to csv", "csv converter", "data converter"], subcategory: "converters",
    relatedSlugs: ["json-to-csv", "xml-to-json", "yaml-to-json"]
  },
  { slug: "xml-to-json", name: "XML to JSON", description: "Convert XML data to JSON format.", category: "developer", icon: "📄", keywords: ["xml to json", "xml converter", "xml parser", "data transform"], subcategory: "converters",
    relatedSlugs: ["json-to-xml", "csv-to-json", "yaml-to-json"]
  },
  { slug: "yaml-to-json", name: "YAML to JSON", description: "Convert between YAML and JSON formats.", category: "developer", icon: "📋", keywords: ["yaml to json", "json to yaml", "yaml converter", "yaml parser"], subcategory: "converters",
    relatedSlugs: ["xml-to-json", "csv-to-json", "json-formatter"]
  },
  { slug: "user-agent-parser", name: "User Agent Parser", description: "Parse and analyze browser user agent strings.", category: "developer", icon: "🔍", keywords: ["user agent", "browser detection", "ua parser", "device detection"], subcategory: "validators",
    relatedSlugs: ["ip-address-lookup", "url-parser", "regex-tester"]
  },

  // ── New Developer Tools ──────────────────────────────────────
  { slug: "html-minifier", name: "HTML Minifier", description: "Minify HTML code by removing whitespace, comments, and redundant attributes.", category: "developer", icon: "📦", keywords: ["html minify", "html compress", "minify html", "html optimizer"], subcategory: "formatters",
    longDescription: "Reduce the size of your HTML files by removing unnecessary whitespace, comments, optional tags, and redundant attributes. This tool helps improve page load times by minimizing the amount of HTML that needs to be transferred to the browser.",
    faqs: [
      { question: "Will minifying HTML break my page?", answer: "No, the minifier only removes unnecessary characters. The rendered output remains identical." },
      { question: "Does it remove inline CSS and JS?", answer: "It preserves inline styles and scripts but removes HTML comments and extra whitespace." }
    ],
    howToSteps: [
      { name: "Paste HTML", text: "Enter your HTML code in the input area." },
      { name: "Minify", text: "Click the Minify button to compress the HTML." },
      { name: "Copy result", text: "Copy the minified HTML for your project." }
    ],
    useCases: ["Optimizing website performance", "Reducing bandwidth usage", "Preparing HTML for production deployment"],
    relatedSlugs: ["css-minifier", "javascript-minifier", "html-prettifier"]
  },
  { slug: "json-to-csv", name: "JSON to CSV", description: "Convert JSON arrays to CSV format for spreadsheets and data analysis.", category: "developer", icon: "📊", keywords: ["json to csv", "json csv", "json export", "data export"], subcategory: "converters",
    relatedSlugs: ["csv-to-json", "json-to-xml", "json-formatter"]
  },
  { slug: "json-to-xml", name: "JSON to XML", description: "Convert JSON data to XML format with customizable options.", category: "developer", icon: "📄", keywords: ["json to xml", "json xml converter", "data converter"], subcategory: "converters",
    relatedSlugs: ["xml-to-json", "json-to-csv", "json-formatter"]
  },
  { slug: "json-to-yaml", name: "JSON to YAML", description: "Convert JSON data to YAML format for configuration files.", category: "developer", icon: "📋", keywords: ["json to yaml", "yaml converter", "config converter"], subcategory: "converters",
    relatedSlugs: ["yaml-to-json", "json-formatter", "json-to-xml"]
  },
  { slug: "css-formatter", name: "CSS Formatter", description: "Format and beautify minified CSS code with proper indentation.", category: "developer", icon: "🎨", keywords: ["css format", "css beautify", "css prettify", "css indent"], subcategory: "formatters",
    relatedSlugs: ["css-minifier", "html-prettifier", "css-gradient-generator"]
  },
  { slug: "js-formatter", name: "JavaScript Formatter", description: "Format and beautify minified JavaScript code.", category: "developer", icon: "📝", keywords: ["js format", "js beautify", "javascript formatter", "js prettify"], subcategory: "formatters",
    relatedSlugs: ["javascript-minifier", "json-formatter", "css-formatter"]
  },
  { slug: "json-validator", name: "JSON Validator", description: "Validate JSON syntax with detailed error messages and line numbers.", category: "developer", icon: "✅", keywords: ["json validator", "json lint", "validate json", "json checker"], subcategory: "validators",
    relatedSlugs: ["json-formatter", "regex-tester", "cron-parser"]
  },
  { slug: "diff-checker", name: "Code Diff Checker", description: "Compare two code files side-by-side with syntax-aware highlighting.", category: "developer", icon: "📊", keywords: ["diff checker", "code compare", "file diff", "code diff"], subcategory: "validators",
    relatedSlugs: ["text-diff", "json-formatter", "html-prettifier"]
  },
  { slug: "color-picker", name: "Color Picker", description: "Pick colors from a visual palette and get HEX, RGB, and HSL values.", category: "developer", icon: "🎨", keywords: ["color picker", "colour picker", "hex color", "rgb picker"], subcategory: "generators",
    relatedSlugs: ["color-converter", "css-gradient-generator", "color-palette-generator"]
  },
  { slug: "url-parser", name: "URL Parser", description: "Parse URLs into their component parts: protocol, host, path, query, and fragment.", category: "developer", icon: "🔗", keywords: ["url parser", "url parts", "url components", "query string parser"], subcategory: "validators",
    relatedSlugs: ["url-encoder", "utm-builder", "user-agent-parser"]
  },
  { slug: "markdown-table-generator", name: "Markdown Table Generator", description: "Create markdown tables with a visual editor and copy the code.", category: "developer", icon: "📋", keywords: ["markdown table", "md table", "table generator", "github table"], subcategory: "generators",
    relatedSlugs: ["markdown-preview", "csv-to-table", "markdown-to-html"]
  },
  { slug: "svg-optimizer", name: "SVG Optimizer", description: "Optimize SVG files by removing unnecessary metadata and simplifying paths.", category: "developer", icon: "🖼️", keywords: ["svg optimize", "svg minify", "svg cleaner", "svgo"], subcategory: "formatters",
    relatedSlugs: ["svg-to-png", "html-minifier", "css-minifier"]
  },
  { slug: "typescript-to-json", name: "TypeScript to JSON Schema", description: "Convert TypeScript interfaces to JSON Schema definitions.", category: "developer", icon: "📘", keywords: ["typescript schema", "ts to json", "type to schema", "json schema"], subcategory: "converters",
    relatedSlugs: ["json-to-typescript", "json-validator", "json-formatter"]
  },
  { slug: "api-tester", name: "API Request Tester", description: "Send HTTP requests and inspect responses. Supports GET, POST, PUT, DELETE.", category: "developer", icon: "🌐", keywords: ["api tester", "http client", "rest tester", "api request"], subcategory: "validators",
    relatedSlugs: ["json-formatter", "url-parser", "jwt-decoder"]
  },
  { slug: "base-number-converter", name: "Programmer's Calculator", description: "Convert between binary, octal, decimal, and hexadecimal with bitwise operations.", category: "developer", icon: "🔢", keywords: ["binary calculator", "hex calculator", "bitwise", "programmer calc"], subcategory: "converters",
    relatedSlugs: ["number-base-converter", "chmod-calculator", "hex-to-text"]
  },
];
