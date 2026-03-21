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
    longDescription: "Encode any text or data to Base64 format or decode Base64 strings back to readable plain text. Base64 encoding is widely used to safely transmit binary data over text-based protocols. This tool handles encoding and decoding instantly in your browser with no server uploads required.",
    faqs: [
      { question: "What is Base64 used for?", answer: "Base64 is used to encode binary data such as images, files, and credentials so they can be safely embedded in text-based formats like JSON, XML, or email." },
      { question: "Can I encode images with this tool?", answer: "This tool encodes and decodes text strings. For full image-to-Base64 conversion, use the Image to Base64 tool." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Paste the text or Base64 string you want to convert." },
      { name: "Choose direction", text: "Click Encode to convert to Base64, or Decode to convert Base64 back to text." },
      { name: "Copy the result", text: "Copy the output for use in your application." }
    ],
    useCases: ["Encoding credentials for HTTP Basic Auth headers", "Embedding small data payloads in JSON or XML", "Decoding Base64 strings from API responses", "Storing binary data in text-based configuration files"],
    relatedSlugs: ["url-encoder", "html-entity-encoder", "image-to-base64"]
  },
  { slug: "url-encoder", name: "URL Encoder/Decoder", description: "Encode or decode URL components for safe use in web addresses.", category: "developer", icon: "🌐", keywords: ["url encode", "url decode", "percent encoding"], subcategory: "converters",
    longDescription: "Encode special characters in URLs using percent-encoding so they can be safely transmitted over the internet, or decode encoded URL strings back to human-readable form. Supports both full URL encoding and component-level encoding for query parameters, paths, and fragments.",
    faqs: [
      { question: "What is URL encoding?", answer: "URL encoding replaces special characters with a percent sign followed by two hexadecimal digits, ensuring URLs are valid and safe to transmit." },
      { question: "What is the difference between encodeURI and encodeURIComponent?", answer: "encodeURI encodes a full URL preserving its structure, while encodeURIComponent encodes individual parts like query parameters, converting characters like & and = as well." }
    ],
    howToSteps: [
      { name: "Paste your URL or string", text: "Enter the text or URL you want to encode or decode." },
      { name: "Choose encode or decode", text: "Click Encode to percent-encode special characters, or Decode to convert them back." },
      { name: "Copy the output", text: "Use the copy button to grab the result for your project." }
    ],
    useCases: ["Encoding query string parameters for API calls", "Decoding URL-encoded strings from logs or redirects", "Building safe redirect URLs in web applications", "Debugging malformed URLs with special characters"],
    relatedSlugs: ["base64-encoder", "html-entity-encoder", "url-parser"]
  },
  { slug: "html-entity-encoder", name: "HTML Entity Encoder/Decoder", description: "Encode special characters to HTML entities or decode them back.", category: "developer", icon: "🏷️", keywords: ["html encode", "html decode", "html entities"], subcategory: "converters",
    relatedSlugs: ["url-encoder", "base64-encoder", "html-prettifier"]
  },
  { slug: "regex-tester", name: "Regex Tester", description: "Test regular expressions with real-time matching and group highlighting.", category: "developer", icon: "🧪", keywords: ["regex", "regular expression", "pattern matching"], subcategory: "validators",
    longDescription: "Write and test regular expressions against sample text in real time, with all matches and capture groups highlighted. Supports flags like global, case-insensitive, and multiline. See match counts, group contents, and positions as you type — ideal for building and debugging regex patterns without trial and error in code.",
    faqs: [
      { question: "What regex flavor does this tool use?", answer: "The tool uses JavaScript regex syntax (ECMAScript), which covers the vast majority of common patterns and is compatible with most programming languages." },
      { question: "Can I test capture groups?", answer: "Yes, all capture groups are highlighted and listed separately so you can inspect what each group matches." }
    ],
    howToSteps: [
      { name: "Enter your regex", text: "Type your regular expression pattern in the regex input field." },
      { name: "Add test text", text: "Paste or type the text you want to match against in the test input." },
      { name: "Review matches", text: "See all matches highlighted in real time with group details shown below." }
    ],
    useCases: ["Validating input formats like emails and phone numbers", "Extracting data patterns from large text blocks", "Building search-and-replace logic for code editors", "Testing regex patterns before adding them to production code"],
    relatedSlugs: ["find-and-replace", "json-validator", "email-validator"]
  },
  { slug: "css-minifier", name: "CSS Minifier", description: "Minify CSS code by removing whitespace, comments, and unnecessary characters.", category: "developer", icon: "🎨", keywords: ["css minify", "css compress", "minify css", "css optimizer"], subcategory: "formatters",
    longDescription: "Compress your CSS files by stripping whitespace, comments, and redundant characters to reduce file size and improve page load speed. The minifier preserves all style rules and selectors while producing a compact output ready for production deployment.",
    faqs: [
      { question: "Will minifying break my styles?", answer: "No, the minifier only removes non-functional whitespace and comments. All CSS rules remain fully intact and functional." },
      { question: "How much can CSS minification save?", answer: "Minification typically reduces CSS file sizes by 20–50%, depending on how much whitespace and commenting is present in the original." }
    ],
    howToSteps: [
      { name: "Paste your CSS", text: "Enter your CSS code into the input area." },
      { name: "Minify", text: "Click the Minify button to compress the CSS." },
      { name: "Copy and deploy", text: "Copy the minified output and use it in your production build." }
    ],
    useCases: ["Reducing CSS file size before deploying to production", "Optimizing page load performance", "Compressing third-party stylesheets", "Preparing CSS for CDN delivery"],
    relatedSlugs: ["css-formatter", "javascript-minifier", "html-minifier"]
  },
  { slug: "javascript-minifier", name: "JavaScript Minifier", description: "Minify JavaScript code to reduce file size.", category: "developer", icon: "📦", keywords: ["js minify", "javascript compress", "minify js", "uglify"], subcategory: "formatters",
    relatedSlugs: ["css-minifier", "html-minifier", "js-formatter"]
  },
  { slug: "html-prettifier", name: "HTML Prettifier", description: "Format and indent HTML code for better readability.", category: "developer", icon: "🏗️", keywords: ["html format", "html beautify", "html indent", "html pretty print"], subcategory: "formatters",
    longDescription: "Transform messy, minified, or poorly indented HTML into clean, consistently formatted markup. The HTML Prettifier adds proper indentation for nested elements, normalizes attribute spacing, and improves overall code readability for easier editing and review.",
    faqs: [
      { question: "Does it validate HTML while formatting?", answer: "The tool formats HTML for readability but does not perform strict HTML validation. Use an HTML validator tool for compliance checking." },
      { question: "Will it change my HTML attributes?", answer: "No, attributes are preserved as-is. The tool only adjusts whitespace and indentation." }
    ],
    howToSteps: [
      { name: "Paste your HTML", text: "Enter the raw or minified HTML you want to format." },
      { name: "Prettify", text: "Click the Format button to apply consistent indentation and spacing." },
      { name: "Copy the result", text: "Copy the formatted HTML for editing or documentation." }
    ],
    useCases: ["Making minified HTML readable for debugging", "Formatting HTML pasted from external sources", "Preparing HTML code for code reviews or documentation", "Cleaning up template output from CMS platforms"],
    relatedSlugs: ["html-minifier", "css-minifier", "html-entity-encoder"]
  },
  { slug: "sql-formatter", name: "SQL Formatter", description: "Format and beautify SQL queries with proper indentation.", category: "developer", icon: "🗃️", keywords: ["sql format", "sql beautify", "sql indent", "query formatter"], subcategory: "formatters",
    longDescription: "Transform long, single-line, or poorly formatted SQL queries into clean, readable code with proper keyword casing, clause indentation, and consistent spacing. Supports SELECT, INSERT, UPDATE, DELETE, and complex JOIN queries across major SQL dialects.",
    faqs: [
      { question: "Which SQL dialects are supported?", answer: "The formatter works with standard SQL and handles syntax from MySQL, PostgreSQL, SQLite, and SQL Server." },
      { question: "Does it change the query logic?", answer: "No, formatting only affects whitespace and casing. The query logic, table names, and values remain unchanged." }
    ],
    howToSteps: [
      { name: "Paste your SQL", text: "Enter your raw or minified SQL query into the input field." },
      { name: "Format", text: "Click Format to apply proper indentation, keyword capitalization, and clause alignment." },
      { name: "Copy the result", text: "Copy the formatted query to use in your database client or code." }
    ],
    useCases: ["Formatting auto-generated or minified SQL for readability", "Preparing SQL for documentation or code reviews", "Cleaning up queries copied from ORMs or query builders", "Debugging complex multi-join queries"],
    relatedSlugs: ["json-formatter", "css-minifier", "html-prettifier"]
  },
  { slug: "markdown-preview", name: "Markdown Preview", description: "Write Markdown and see the rendered preview in real-time.", category: "developer", icon: "📝", keywords: ["markdown preview", "markdown editor", "md preview", "markdown render"], subcategory: "formatters",
    relatedSlugs: ["markdown-to-html", "markdown-table-generator", "html-prettifier"]
  },
  { slug: "cron-parser", name: "Cron Expression Parser", description: "Parse and explain cron expressions in human-readable format.", category: "developer", icon: "⏰", keywords: ["cron expression", "cron parser", "crontab", "cron schedule"], subcategory: "validators",
    relatedSlugs: ["regex-tester", "timestamp-converter", "json-validator"]
  },
  { slug: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JSON Web Tokens without verification.", category: "developer", icon: "🔓", keywords: ["jwt decode", "jwt parser", "json web token", "jwt inspector"], subcategory: "validators",
    longDescription: "Decode and inspect the header, payload, and signature sections of any JSON Web Token (JWT) without needing the secret key. View all claims, expiration times, and token metadata in a human-readable format. Useful for debugging authentication flows and verifying token contents.",
    faqs: [
      { question: "Is it safe to paste my JWT here?", answer: "The tool runs entirely in your browser — no data is sent to any server. However, avoid pasting tokens from live production systems as a general security practice." },
      { question: "Can this tool verify a JWT signature?", answer: "No, this tool only decodes the token payload and header. Signature verification requires the secret key and should be done server-side." }
    ],
    howToSteps: [
      { name: "Paste your JWT", text: "Enter the full JWT string, including all three dot-separated sections." },
      { name: "Decode", text: "Click Decode to split and decode the header and payload sections." },
      { name: "Inspect claims", text: "Review the decoded claims, including subject, issuer, expiration, and any custom fields." }
    ],
    useCases: ["Debugging authentication tokens during development", "Inspecting token expiration and claim contents", "Verifying the structure of tokens issued by an auth provider", "Understanding JWT payloads in third-party API integrations"],
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
    longDescription: "Instantly convert CSV files and spreadsheet data into structured JSON arrays or objects. Supports custom delimiters, header row detection, and handles quoted fields with commas. Perfect for transforming exported spreadsheet data into a format ready for APIs, databases, or JavaScript applications.",
    faqs: [
      { question: "Does it support custom delimiters?", answer: "Yes, the tool supports comma, semicolon, tab, and pipe delimiters in addition to the standard CSV format." },
      { question: "What happens if my CSV has quoted fields?", answer: "Quoted fields — including those containing commas or newlines — are handled correctly and converted to clean JSON string values." }
    ],
    howToSteps: [
      { name: "Paste your CSV", text: "Enter or upload your CSV data into the input area." },
      { name: "Configure options", text: "Set your delimiter and whether the first row is a header." },
      { name: "Convert and copy", text: "Click Convert to generate the JSON output, then copy it for your project." }
    ],
    useCases: ["Converting spreadsheet exports to JSON for API consumption", "Transforming data for import into NoSQL databases", "Processing CSV reports for data visualization libraries", "Migrating legacy CSV data to JSON-based configurations"],
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
    longDescription: "Convert JSON arrays and objects into CSV format compatible with Excel, Google Sheets, and data analysis tools. The tool automatically detects keys from the JSON structure to generate column headers, and handles nested values gracefully.",
    faqs: [
      { question: "What JSON structures are supported?", answer: "The tool works best with arrays of flat objects. Each object becomes a row, and the object keys become column headers." },
      { question: "What if my JSON has nested objects?", answer: "Nested objects are serialized as JSON strings within the CSV cell so no data is lost during conversion." }
    ],
    howToSteps: [
      { name: "Paste your JSON", text: "Enter a JSON array into the input field." },
      { name: "Convert", text: "Click Convert to generate the CSV output with headers." },
      { name: "Download or copy", text: "Copy the CSV text or download it as a .csv file." }
    ],
    useCases: ["Exporting JSON API data to spreadsheets", "Preparing data for import into databases", "Sharing structured data with non-technical users", "Converting configuration data for reporting tools"],
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
    longDescription: "Check whether your JSON is syntactically valid and get precise, actionable error messages that identify the exact line and character position of any issue. The validator helps you catch missing brackets, trailing commas, unquoted keys, and other common JSON mistakes before they cause runtime errors.",
    faqs: [
      { question: "What errors can it detect?", answer: "The validator catches all JSON syntax errors including missing commas, unclosed brackets or braces, invalid escape sequences, and improperly quoted keys or values." },
      { question: "How is this different from the JSON Formatter?", answer: "The JSON Validator focuses purely on syntax validation with detailed error reporting, while the JSON Formatter also prettifies and minifies valid JSON." }
    ],
    howToSteps: [
      { name: "Paste your JSON", text: "Enter the JSON string or object you want to validate." },
      { name: "Validate", text: "Click Validate to check for syntax errors." },
      { name: "Fix errors", text: "Review the error message and line number to locate and fix any issues." }
    ],
    useCases: ["Catching JSON errors in API request and response bodies", "Verifying JSON configuration files before deployment", "Debugging data pipeline outputs", "Checking JSON files edited manually in a text editor"],
    relatedSlugs: ["json-formatter", "regex-tester", "cron-parser"]
  },
  { slug: "diff-checker", name: "Code Diff Checker", description: "Compare two code files side-by-side with syntax-aware highlighting.", category: "developer", icon: "📊", keywords: ["diff checker", "code compare", "file diff", "code diff"], subcategory: "validators",
    longDescription: "Compare two versions of any code or text side by side, with added, removed, and changed lines clearly highlighted. Ideal for reviewing changes between file versions, comparing API responses, or spotting differences in configuration files.",
    faqs: [
      { question: "What types of files can I compare?", answer: "You can compare any plain text content — source code, JSON, HTML, SQL, config files, or any other text-based format." },
      { question: "Does it show line-level or character-level differences?", answer: "The tool highlights differences at both the line level and within changed lines, making it easy to spot even small edits." }
    ],
    howToSteps: [
      { name: "Enter the original text", text: "Paste the original version of your code or text in the left panel." },
      { name: "Enter the modified text", text: "Paste the updated version in the right panel." },
      { name: "Review the diff", text: "Added lines are highlighted in green, removed lines in red, and changed characters are marked inline." }
    ],
    useCases: ["Comparing code versions before and after a refactor", "Reviewing configuration file changes between environments", "Spotting differences between two API response payloads", "Auditing changes in SQL scripts or data exports"],
    relatedSlugs: ["text-diff", "json-formatter", "html-prettifier"]
  },
  { slug: "color-picker", name: "Color Picker", description: "Pick colors from a visual palette and get HEX, RGB, and HSL values.", category: "developer", icon: "🎨", keywords: ["color picker", "colour picker", "hex color", "rgb picker"], subcategory: "generators",
    longDescription: "Select any color from a visual palette or enter a known value to instantly get the equivalent HEX, RGB, HSL, and HSV codes. Use the eyedropper-style picker to find exact colors and copy any format with one click for use in CSS or design tools.",
    faqs: [
      { question: "Can I enter a HEX code and get RGB values?", answer: "Yes, you can input any color format — HEX, RGB, or HSL — and the tool will instantly display all equivalent formats." },
      { question: "Does it support alpha transparency?", answer: "Yes, the tool supports RGBA and HSLA formats so you can work with semi-transparent colors." }
    ],
    howToSteps: [
      { name: "Open the color palette", text: "Use the visual color picker to select a hue and adjust brightness and saturation." },
      { name: "Review color codes", text: "See the HEX, RGB, HSL, and HSV values update in real time." },
      { name: "Copy your color", text: "Click any color format to copy the value for use in CSS or your design application." }
    ],
    useCases: ["Finding the exact CSS color code for a design element", "Converting colors between HEX, RGB, and HSL for CSS", "Exploring color variations for UI design", "Picking accessible foreground and background color combinations"],
    relatedSlugs: ["color-converter", "css-gradient-generator", "color-palette-generator"]
  },
  { slug: "url-parser", name: "URL Parser", description: "Parse URLs into their component parts: protocol, host, path, query, and fragment.", category: "developer", icon: "🔗", keywords: ["url parser", "url parts", "url components", "query string parser"], subcategory: "validators",
    longDescription: "Break down any URL into its individual components — protocol, hostname, port, pathname, query string parameters, and fragment identifier. Each query parameter is displayed in a structured table for easy inspection. Useful for debugging web requests and building URL manipulation logic.",
    faqs: [
      { question: "Can it parse query string parameters?", answer: "Yes, all query string parameters are extracted and displayed as key-value pairs for easy reading." },
      { question: "Does it work with URLs that have fragments?", answer: "Yes, the hash fragment is extracted and displayed as a separate component." }
    ],
    howToSteps: [
      { name: "Paste the URL", text: "Enter the full URL you want to parse into the input field." },
      { name: "Parse", text: "Click Parse to break the URL into its components." },
      { name: "Inspect components", text: "Review protocol, host, path, query parameters, and fragment displayed in a structured layout." }
    ],
    useCases: ["Debugging redirect chains and query strings", "Extracting UTM parameters from marketing URLs", "Understanding third-party API endpoint structures", "Building URL manipulation utilities in web applications"],
    relatedSlugs: ["url-encoder", "utm-builder", "user-agent-parser"]
  },
  { slug: "markdown-table-generator", name: "Markdown Table Generator", description: "Create markdown tables with a visual editor and copy the code.", category: "developer", icon: "📋", keywords: ["markdown table", "md table", "table generator", "github table"], subcategory: "generators",
    longDescription: "Build properly formatted Markdown tables using a visual spreadsheet-like editor without manually counting pipes and dashes. Add rows and columns, enter your data, and copy the generated Markdown table syntax ready for GitHub READMEs, documentation, or any Markdown editor.",
    faqs: [
      { question: "Can I control column alignment?", answer: "Yes, each column supports left, center, or right alignment using the standard Markdown colon syntax in the separator row." },
      { question: "Is there a limit on table size?", answer: "There is no hard limit — you can add as many rows and columns as your Markdown renderer supports." }
    ],
    howToSteps: [
      { name: "Set up your columns", text: "Enter the column headers and choose the number of rows you need." },
      { name: "Fill in your data", text: "Type your cell content into the visual table editor." },
      { name: "Copy the Markdown", text: "Copy the generated Markdown table syntax and paste it into your README or document." }
    ],
    useCases: ["Creating data tables for GitHub README files", "Building comparison tables for documentation sites", "Formatting structured data for Markdown-based wikis", "Generating tables for technical blog posts and tutorials"],
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
