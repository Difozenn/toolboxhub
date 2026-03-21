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
    longDescription: "Convert special characters like <, >, &, and quotes into their HTML entity equivalents, or decode HTML entities back to readable characters. Essential for safely displaying user-generated content in web pages and preventing XSS vulnerabilities by encoding potentially dangerous characters.",
    faqs: [
      { question: "What are HTML entities?", answer: "HTML entities are special codes that represent characters with meaning in HTML. For example, &lt; represents <, &gt; represents >, and &amp; represents &. They prevent the browser from interpreting these characters as HTML markup." },
      { question: "Why do I need to encode HTML entities?", answer: "Encoding prevents the browser from treating user input as HTML code, which protects against cross-site scripting (XSS) attacks and ensures special characters display correctly on the page." },
      { question: "Does it support named and numeric entities?", answer: "Yes, the tool supports both named entities (like &amp;) and numeric entities (like &#38;), and can decode both formats back to their original characters." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Paste the HTML or plain text containing special characters." },
      { name: "Encode or decode", text: "Click Encode to convert special characters to HTML entities, or Decode to convert entities back to characters." },
      { name: "Copy the result", text: "Copy the output for use in your HTML source code or content." }
    ],
    useCases: ["Sanitizing user input for safe HTML display", "Encoding special characters in CMS content", "Decoding HTML entities from scraped web content", "Preventing XSS vulnerabilities in web applications"],
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
    longDescription: "Compress JavaScript code by removing whitespace, comments, and unnecessary characters to reduce file size and improve page load performance. The minifier preserves all functionality while producing a compact output suitable for production deployment.",
    faqs: [
      { question: "Will minifying break my JavaScript?", answer: "No, the minifier only removes non-functional whitespace, comments, and line breaks. All logic, variable names, and function calls remain intact." },
      { question: "How much file size can I save?", answer: "JavaScript minification typically reduces file sizes by 30-60%, depending on how much whitespace, comments, and formatting are in the original source code." },
      { question: "Is this the same as obfuscation?", answer: "No, minification only removes unnecessary characters. Obfuscation intentionally makes code harder to read by renaming variables and restructuring logic. This tool only minifies." }
    ],
    howToSteps: [
      { name: "Paste your JavaScript", text: "Enter your JavaScript code into the input area." },
      { name: "Minify", text: "Click the Minify button to compress the code." },
      { name: "Copy and deploy", text: "Copy the minified output and use it in your production build." }
    ],
    useCases: ["Reducing JavaScript bundle size for faster page loads", "Optimizing third-party scripts for production", "Compressing inline scripts for email templates", "Preparing JavaScript for CDN delivery"],
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
    longDescription: "Write Markdown in a side-by-side editor and see the rendered HTML preview update in real time. Supports headings, bold, italic, links, images, code blocks, tables, and lists. Perfect for drafting README files, documentation, and blog posts without leaving your browser.",
    faqs: [
      { question: "What Markdown syntax is supported?", answer: "The tool supports standard Markdown including headings, bold, italic, links, images, code blocks (inline and fenced), ordered and unordered lists, blockquotes, horizontal rules, and tables." },
      { question: "Can I export the rendered HTML?", answer: "You can copy the rendered HTML output for use in web pages, or copy the raw Markdown for use in GitHub, GitLab, or any Markdown-compatible platform." },
      { question: "Does it support GitHub Flavored Markdown?", answer: "Yes, the preview supports GitHub Flavored Markdown (GFM) features like fenced code blocks, tables, strikethrough, and task lists." }
    ],
    howToSteps: [
      { name: "Write Markdown", text: "Type or paste your Markdown content in the left editor panel." },
      { name: "Preview in real time", text: "See the rendered HTML preview update instantly in the right panel as you type." },
      { name: "Copy your content", text: "Copy the Markdown source or use the preview to verify formatting before publishing." }
    ],
    useCases: ["Drafting GitHub README files with live preview", "Writing documentation and blog posts in Markdown", "Learning Markdown syntax with instant visual feedback", "Previewing Markdown content before committing to a repository"],
    relatedSlugs: ["markdown-to-html", "markdown-table-generator", "html-prettifier"]
  },
  { slug: "cron-parser", name: "Cron Expression Parser", description: "Parse and explain cron expressions in human-readable format.", category: "developer", icon: "⏰", keywords: ["cron expression", "cron parser", "crontab", "cron schedule"], subcategory: "validators",
    longDescription: "Parse cron expressions and see a plain-English explanation of the schedule they define. Enter any standard five-field cron expression and instantly understand when it will run, including minute, hour, day of month, month, and day of week breakdowns. Invaluable for verifying crontab schedules.",
    faqs: [
      { question: "What is a cron expression?", answer: "A cron expression is a string of five fields (minute, hour, day of month, month, day of week) that defines a recurring schedule. It is used in Unix crontab, CI/CD pipelines, and task schedulers." },
      { question: "What does * mean in a cron expression?", answer: "The asterisk (*) is a wildcard that means 'every' value for that field. For example, * in the minute field means 'every minute'." },
      { question: "Does it support extended cron syntax?", answer: "The tool supports standard five-field cron syntax including ranges (1-5), lists (1,3,5), steps (*/5), and common shorthand expressions." }
    ],
    howToSteps: [
      { name: "Enter the cron expression", text: "Type a cron expression like 0 9 * * 1-5 into the input field." },
      { name: "Read the explanation", text: "See a human-readable description of when the cron job will execute." },
      { name: "Verify the schedule", text: "Check that the description matches your intended schedule before deploying." }
    ],
    useCases: ["Verifying crontab schedules before deploying to production", "Understanding cron expressions in CI/CD pipeline configs", "Building scheduled tasks with the correct timing", "Debugging why a cron job runs at unexpected times"],
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
    longDescription: "Design stunning CSS gradients with a visual editor that supports linear and radial gradients. Pick colors, adjust direction and angle, add multiple color stops, and see the gradient preview update in real time. Copy the generated CSS code with one click for immediate use in your stylesheets.",
    faqs: [
      { question: "What types of gradients can I create?", answer: "The tool supports linear gradients (with customizable angle/direction) and radial gradients (with center positioning). You can add multiple color stops for complex gradient effects." },
      { question: "Can I use more than two colors?", answer: "Yes, you can add multiple color stops to create gradients that transition through several colors, with control over each stop's position." },
      { question: "Do CSS gradients work in all browsers?", answer: "Modern CSS gradients are supported in all current browsers including Chrome, Firefox, Safari, and Edge. No vendor prefixes are needed for standard gradient syntax." }
    ],
    howToSteps: [
      { name: "Choose colors", text: "Select the start and end colors for your gradient, and add additional color stops if desired." },
      { name: "Set direction", text: "Adjust the gradient angle or direction for linear gradients, or the center point for radial gradients." },
      { name: "Copy the CSS", text: "Copy the generated CSS background property and paste it into your stylesheet." }
    ],
    useCases: ["Creating gradient backgrounds for hero sections and banners", "Designing button hover effects with smooth color transitions", "Building gradient overlays for images and cards", "Generating CSS gradients for design system color tokens"],
    relatedSlugs: ["box-shadow-generator", "color-converter", "color-palette-generator"]
  },
  { slug: "box-shadow-generator", name: "Box Shadow Generator", description: "Design CSS box shadows with a visual editor and get the code.", category: "developer", icon: "🖼️", keywords: ["box shadow", "css shadow", "shadow generator", "drop shadow"], subcategory: "generators",
    longDescription: "Create pixel-perfect CSS box shadows using a visual editor with real-time preview. Adjust horizontal offset, vertical offset, blur radius, spread radius, and shadow color with intuitive controls. Supports inset shadows and multiple shadow layers for advanced depth effects.",
    faqs: [
      { question: "What is a CSS box shadow?", answer: "The CSS box-shadow property adds shadow effects around an element's frame. It accepts values for horizontal offset, vertical offset, blur radius, spread radius, and color to create depth and elevation effects." },
      { question: "Can I create multiple shadows?", answer: "Yes, CSS supports multiple comma-separated box-shadow values on a single element, allowing you to create layered shadow effects for more realistic depth." },
      { question: "What is the difference between box-shadow and drop-shadow?", answer: "box-shadow creates a rectangular shadow around the element's box, while the drop-shadow filter follows the actual shape of the element, including transparency in images." }
    ],
    howToSteps: [
      { name: "Adjust shadow parameters", text: "Use the sliders to set horizontal offset, vertical offset, blur, and spread values." },
      { name: "Choose shadow color", text: "Pick a shadow color and adjust its opacity for the desired effect." },
      { name: "Copy the CSS", text: "Copy the generated box-shadow CSS declaration for use in your stylesheet." }
    ],
    useCases: ["Adding elevation and depth to card components", "Creating hover effects for buttons and interactive elements", "Designing material design-style shadow layers", "Building neumorphism and glassmorphism UI effects"],
    relatedSlugs: ["css-gradient-generator", "color-picker", "css-minifier"]
  },
  { slug: "meta-tag-generator", name: "Meta Tag Generator", description: "Generate HTML meta tags for SEO, social sharing, and more.", category: "developer", icon: "🏷️", keywords: ["meta tags", "seo tags", "og tags", "meta generator"], subcategory: "generators",
    longDescription: "Generate complete HTML meta tags for SEO, Open Graph social sharing, Twitter Cards, and general page metadata. Fill in your page title, description, keywords, and social media image URL to get a ready-to-paste block of meta tags optimized for search engines and social platforms.",
    faqs: [
      { question: "What are Open Graph meta tags?", answer: "Open Graph (og:) meta tags control how your page appears when shared on social media platforms like Facebook and LinkedIn. They define the title, description, image, and URL shown in the preview card." },
      { question: "Do I need both OG and Twitter Card tags?", answer: "Twitter can fall back to OG tags, but including dedicated Twitter Card tags (twitter:card, twitter:title, etc.) gives you more control over how your content appears on Twitter specifically." },
      { question: "How do meta tags affect SEO?", answer: "The title and description meta tags directly influence search engine result snippets. While meta keywords have little SEO impact today, proper title and description tags are essential for click-through rates." }
    ],
    howToSteps: [
      { name: "Enter page details", text: "Fill in the page title, description, URL, and image URL for social sharing." },
      { name: "Configure options", text: "Select which meta tag groups to include: basic SEO, Open Graph, Twitter Card, and more." },
      { name: "Copy the meta tags", text: "Copy the generated HTML meta tags and paste them into your page's head section." }
    ],
    useCases: ["Adding SEO meta tags to new web pages", "Generating Open Graph tags for social media sharing", "Creating Twitter Card meta tags for link previews", "Building meta tag templates for content management systems"],
    relatedSlugs: ["og-preview", "twitter-card-preview", "robots-txt-generator"]
  },
  { slug: "chmod-calculator", name: "Chmod Calculator", description: "Calculate Unix file permissions in numeric and symbolic notation.", category: "developer", icon: "🔒", keywords: ["chmod", "file permissions", "unix permissions", "linux chmod"], subcategory: "validators",
    longDescription: "Calculate Unix/Linux file permissions by toggling read, write, and execute checkboxes for owner, group, and others. See both the numeric (octal) notation like 755 and the symbolic notation like rwxr-xr-x update in real time. Essential for setting correct file permissions on servers and in deployment scripts.",
    faqs: [
      { question: "What does chmod 755 mean?", answer: "chmod 755 sets the owner to read, write, and execute (7), the group to read and execute (5), and others to read and execute (5). It is the standard permission for web-accessible directories and executable scripts." },
      { question: "What is the difference between numeric and symbolic notation?", answer: "Numeric notation uses octal digits (e.g. 644), where each digit sums read (4), write (2), and execute (1). Symbolic notation uses letters (e.g. rw-r--r--) to show the same permissions in a human-readable format." },
      { question: "What permission should I use for web files?", answer: "Common web permissions are 644 (rw-r--r--) for files and 755 (rwxr-xr-x) for directories. Never use 777 in production as it grants full access to everyone." }
    ],
    howToSteps: [
      { name: "Toggle permissions", text: "Check or uncheck the read, write, and execute boxes for owner, group, and others." },
      { name: "View the result", text: "See the numeric (octal) and symbolic permission values update in real time." },
      { name: "Copy and apply", text: "Copy the chmod command to apply the permissions on your server." }
    ],
    useCases: ["Setting correct file permissions on Linux web servers", "Understanding permission errors in deployment scripts", "Configuring directory permissions for web applications", "Learning Unix file permission concepts"],
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
    longDescription: "Convert XML documents to equivalent JSON structures instantly in your browser. The tool parses XML elements, attributes, and text content into a clean JSON representation. Ideal for migrating data between XML-based APIs and modern JSON-based systems.",
    faqs: [
      { question: "How are XML attributes handled?", answer: "XML attributes are typically converted to JSON properties prefixed with @ or grouped under an attributes key, depending on the conversion convention used." },
      { question: "Can it handle nested XML?", answer: "Yes, deeply nested XML elements are recursively converted into nested JSON objects, preserving the full document hierarchy." },
      { question: "What about XML namespaces?", answer: "Namespace prefixes are preserved in the JSON key names so you can identify which namespace each element belongs to." }
    ],
    howToSteps: [
      { name: "Paste your XML", text: "Enter the XML document or fragment you want to convert." },
      { name: "Convert", text: "Click Convert to parse the XML and generate the equivalent JSON." },
      { name: "Copy the JSON", text: "Copy the JSON output for use in your application or API." }
    ],
    useCases: ["Migrating SOAP API responses to JSON-based systems", "Converting XML configuration files to JSON format", "Transforming RSS/Atom feed data for JavaScript applications", "Bridging legacy XML services with modern REST APIs"],
    relatedSlugs: ["json-to-xml", "csv-to-json", "yaml-to-json"]
  },
  { slug: "yaml-to-json", name: "YAML to JSON", description: "Convert between YAML and JSON formats.", category: "developer", icon: "📋", keywords: ["yaml to json", "json to yaml", "yaml converter", "yaml parser"], subcategory: "converters",
    longDescription: "Convert YAML configuration files and data into JSON format, or convert JSON back to YAML. YAML is widely used in Kubernetes, Docker Compose, GitHub Actions, and many other DevOps tools. This tool helps you translate between the two formats instantly without installing any CLI tools.",
    faqs: [
      { question: "Why convert YAML to JSON?", answer: "Many APIs and programming languages work natively with JSON. Converting YAML to JSON makes it easy to use config data in JavaScript applications, API requests, or tools that only accept JSON input." },
      { question: "Does it preserve data types?", answer: "Yes, the converter preserves strings, numbers, booleans, null values, arrays, and nested objects when converting between YAML and JSON." },
      { question: "Can it handle multi-document YAML?", answer: "The tool processes single-document YAML files. For multi-document YAML (separated by ---), convert each document individually." }
    ],
    howToSteps: [
      { name: "Paste your YAML", text: "Enter the YAML content you want to convert in the input area." },
      { name: "Convert", text: "Click Convert to generate the equivalent JSON output." },
      { name: "Copy the result", text: "Copy the JSON for use in your application, API, or configuration file." }
    ],
    useCases: ["Converting Kubernetes YAML manifests to JSON for API calls", "Transforming Docker Compose files for programmatic use", "Migrating YAML config files to JSON format", "Debugging YAML syntax by viewing the equivalent JSON structure"],
    relatedSlugs: ["xml-to-json", "csv-to-json", "json-formatter"]
  },
  { slug: "user-agent-parser", name: "User Agent Parser", description: "Parse and analyze browser user agent strings.", category: "developer", icon: "🔍", keywords: ["user agent", "browser detection", "ua parser", "device detection"], subcategory: "validators",
    longDescription: "Parse browser user agent strings to extract detailed information about the browser name and version, operating system, device type, and rendering engine. Paste any user agent string from server logs or HTTP headers and get a structured breakdown of all its components.",
    faqs: [
      { question: "What is a user agent string?", answer: "A user agent string is a text identifier sent by browsers in the User-Agent HTTP header. It contains information about the browser, operating system, and device making the request." },
      { question: "Why are user agent strings so long and complex?", answer: "User agent strings accumulated extra identifiers over decades of browser history, with each new browser including previous browser names for compatibility. This is why Chrome's UA contains 'Mozilla', 'AppleWebKit', and 'Safari'." },
      { question: "Can it detect mobile devices?", answer: "Yes, the parser identifies mobile devices, tablets, and desktop computers based on keywords and patterns in the user agent string." }
    ],
    howToSteps: [
      { name: "Paste a user agent string", text: "Enter a user agent string from server logs, HTTP headers, or browser developer tools." },
      { name: "Parse", text: "Click Parse to extract all components from the user agent string." },
      { name: "Review the details", text: "See the browser name, version, OS, device type, and rendering engine in a structured format." }
    ],
    useCases: ["Analyzing server log entries to understand visitor browsers", "Debugging browser-specific issues using user agent data", "Identifying bot and crawler traffic in access logs", "Testing conditional content delivery based on device type"],
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
    longDescription: "Convert JSON objects and arrays into well-formed XML documents with customizable root element names and indentation. The converter maps JSON properties to XML elements and handles arrays, nested objects, and primitive values. Useful for integrating with XML-based APIs and legacy systems.",
    faqs: [
      { question: "How are JSON arrays converted to XML?", answer: "JSON arrays are converted to repeated XML elements with the same tag name, since XML does not have a native array type. Each array item becomes a child element." },
      { question: "Can I customize the root element name?", answer: "Yes, you can specify a custom root element name instead of the default. The root element wraps the entire converted XML output." },
      { question: "Does it produce valid XML?", answer: "Yes, the converter generates well-formed XML with proper element nesting, escaping of special characters, and an XML declaration header." }
    ],
    howToSteps: [
      { name: "Paste your JSON", text: "Enter the JSON object or array you want to convert to XML." },
      { name: "Configure options", text: "Set the root element name and indentation preferences." },
      { name: "Copy the XML", text: "Copy the generated XML for use in your API request or configuration file." }
    ],
    useCases: ["Sending data to SOAP or XML-based web services", "Converting JSON API responses for XML-consuming systems", "Generating XML configuration files from JSON data", "Bridging modern JSON applications with legacy XML infrastructure"],
    relatedSlugs: ["xml-to-json", "json-to-csv", "json-formatter"]
  },
  { slug: "json-to-yaml", name: "JSON to YAML", description: "Convert JSON data to YAML format for configuration files.", category: "developer", icon: "📋", keywords: ["json to yaml", "yaml converter", "config converter"], subcategory: "converters",
    longDescription: "Convert JSON data into clean, human-readable YAML format for use in configuration files, Kubernetes manifests, Docker Compose files, and CI/CD pipelines. The converter produces properly indented YAML with correct data type representation for strings, numbers, booleans, arrays, and nested objects.",
    faqs: [
      { question: "Why use YAML instead of JSON?", answer: "YAML is more human-readable than JSON because it uses indentation instead of braces and does not require quotes around most strings. It is the preferred format for Kubernetes, Docker Compose, GitHub Actions, and many DevOps configuration files." },
      { question: "Does it handle nested JSON correctly?", answer: "Yes, nested objects and arrays are converted to properly indented YAML with correct hierarchy preserved at every level." },
      { question: "Are comments supported in the output?", answer: "YAML supports comments (using #) but JSON does not, so comments are not generated during conversion. You can add them manually to the YAML output." }
    ],
    howToSteps: [
      { name: "Paste your JSON", text: "Enter the JSON data you want to convert to YAML." },
      { name: "Convert", text: "Click Convert to generate the equivalent YAML output with proper indentation." },
      { name: "Copy the YAML", text: "Copy the YAML output for use in your configuration file or deployment manifest." }
    ],
    useCases: ["Creating Kubernetes manifest files from JSON data", "Converting JSON configs to YAML for Docker Compose", "Generating YAML configuration for CI/CD pipelines", "Translating API JSON responses into YAML documentation"],
    relatedSlugs: ["yaml-to-json", "json-formatter", "json-to-xml"]
  },
  { slug: "css-formatter", name: "CSS Formatter", description: "Format and beautify minified CSS code with proper indentation.", category: "developer", icon: "🎨", keywords: ["css format", "css beautify", "css prettify", "css indent"], subcategory: "formatters",
    longDescription: "Format and beautify minified or poorly indented CSS code into clean, readable stylesheets with consistent indentation and spacing. The formatter properly structures selectors, properties, and values for easy reading and editing. Ideal for making minified CSS from production sites or third-party libraries readable again.",
    faqs: [
      { question: "Does it change my CSS rules?", answer: "No, the formatter only adjusts whitespace and indentation. All selectors, properties, and values remain exactly the same." },
      { question: "Can it handle vendor prefixes?", answer: "Yes, the formatter correctly handles vendor-prefixed properties like -webkit-, -moz-, and -ms- without modifying them." },
      { question: "Does it sort CSS properties?", answer: "The formatter preserves the original property order. Property sorting is not applied to avoid unintended cascade changes." }
    ],
    howToSteps: [
      { name: "Paste your CSS", text: "Enter your minified or messy CSS code into the input area." },
      { name: "Format", text: "Click Format to apply proper indentation and spacing to all CSS rules." },
      { name: "Copy the result", text: "Copy the formatted CSS for use in your development environment." }
    ],
    useCases: ["Making minified CSS readable for debugging", "Formatting CSS copied from browser DevTools", "Cleaning up auto-generated CSS from build tools", "Preparing CSS for code reviews and documentation"],
    relatedSlugs: ["css-minifier", "html-prettifier", "css-gradient-generator"]
  },
  { slug: "js-formatter", name: "JavaScript Formatter", description: "Format and beautify minified JavaScript code.", category: "developer", icon: "📝", keywords: ["js format", "js beautify", "javascript formatter", "js prettify"], subcategory: "formatters",
    longDescription: "Format and beautify minified or poorly formatted JavaScript code with proper indentation, line breaks, and spacing. Transform compressed production code back into readable, well-structured source code for debugging, editing, and code review purposes.",
    faqs: [
      { question: "Does it change the code logic?", answer: "No, the formatter only adjusts whitespace, indentation, and line breaks. All JavaScript logic, variable names, and expressions remain unchanged." },
      { question: "Can it format ES6+ syntax?", answer: "Yes, the formatter handles modern JavaScript syntax including arrow functions, template literals, destructuring, async/await, and optional chaining." },
      { question: "Will it fix syntax errors?", answer: "The formatter works with valid JavaScript. If the input has syntax errors, the formatting may be incomplete or the tool will report an error." }
    ],
    howToSteps: [
      { name: "Paste your JavaScript", text: "Enter the minified or messy JavaScript code into the input area." },
      { name: "Format", text: "Click Format to apply proper indentation and line breaks." },
      { name: "Copy the result", text: "Copy the formatted JavaScript for debugging or editing." }
    ],
    useCases: ["Making minified JavaScript readable for debugging", "Formatting code from browser DevTools Sources panel", "Cleaning up auto-generated or transpiled code", "Preparing JavaScript for code reviews"],
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
    longDescription: "Optimize SVG files by stripping editor metadata, removing unnecessary elements, and cleaning up path data to reduce file size without affecting visual quality. Reduces SVG file sizes significantly by removing comments, hidden elements, default values, and redundant attributes added by design tools like Illustrator and Figma.",
    faqs: [
      { question: "Will optimization change how my SVG looks?", answer: "No, the optimizer removes non-visual data like metadata, comments, and redundant attributes. The visual rendering remains identical." },
      { question: "How much can SVG optimization save?", answer: "SVGs exported from design tools often contain 30-70% unnecessary data. Optimization can significantly reduce file sizes, especially for SVGs with editor metadata and unused definitions." },
      { question: "Is this similar to SVGO?", answer: "Yes, this tool performs similar optimizations to the popular SVGO library, including removing metadata, cleaning attributes, and simplifying path data, all in the browser." }
    ],
    howToSteps: [
      { name: "Paste your SVG", text: "Enter the SVG code or upload an SVG file into the input area." },
      { name: "Optimize", text: "Click Optimize to remove unnecessary metadata and clean up the SVG code." },
      { name: "Copy the result", text: "Copy the optimized SVG for use in your website or application." }
    ],
    useCases: ["Optimizing SVG icons and illustrations for web performance", "Cleaning up SVGs exported from Figma, Sketch, or Illustrator", "Reducing SVG file size for inline SVG in HTML", "Preparing SVG assets for icon libraries and design systems"],
    relatedSlugs: ["svg-to-png", "html-minifier", "css-minifier"]
  },
  { slug: "typescript-to-json", name: "TypeScript to JSON Schema", description: "Convert TypeScript interfaces to JSON Schema definitions.", category: "developer", icon: "📘", keywords: ["typescript schema", "ts to json", "type to schema", "json schema"], subcategory: "converters",
    longDescription: "Convert TypeScript interfaces and type definitions into JSON Schema format. Paste a TypeScript interface and get a valid JSON Schema that describes the same data structure, including property types, required fields, and nested objects. Useful for API validation, form generation, and documentation.",
    faqs: [
      { question: "What TypeScript features are supported?", answer: "The converter handles interfaces with string, number, boolean, array, and nested object types. Optional properties (marked with ?) are correctly reflected in the JSON Schema required array." },
      { question: "What is JSON Schema used for?", answer: "JSON Schema is a standard for describing JSON data structures. It is used for API request/response validation, form generation, documentation, and ensuring data conforms to expected formats." },
      { question: "Can it handle complex TypeScript types?", answer: "The tool handles common interface patterns. Advanced TypeScript features like generics, union types, and mapped types may require manual adjustment in the generated schema." }
    ],
    howToSteps: [
      { name: "Paste your TypeScript", text: "Enter a TypeScript interface or type definition in the input area." },
      { name: "Convert", text: "Click Convert to generate the equivalent JSON Schema definition." },
      { name: "Copy the schema", text: "Copy the JSON Schema for use in API validation, documentation, or form generation." }
    ],
    useCases: ["Generating API request validation schemas from TypeScript types", "Creating JSON Schema for OpenAPI/Swagger documentation", "Building form validation rules from TypeScript interfaces", "Sharing data structure definitions with non-TypeScript teams"],
    relatedSlugs: ["json-to-typescript", "json-validator", "json-formatter"]
  },
  { slug: "api-tester", name: "API Request Tester", description: "Send HTTP requests and inspect responses. Supports GET, POST, PUT, DELETE.", category: "developer", icon: "🌐", keywords: ["api tester", "http client", "rest tester", "api request"], subcategory: "validators",
    longDescription: "Send HTTP requests to any API endpoint and inspect the response directly in your browser. Supports GET, POST, PUT, and DELETE methods with custom headers and JSON request bodies. View response status codes, headers, and body with formatted JSON output. A lightweight alternative to Postman for quick API testing.",
    faqs: [
      { question: "Can I send POST requests with a JSON body?", answer: "Yes, select POST as the method, add a Content-Type: application/json header, and enter your JSON payload in the request body field." },
      { question: "Does it support authentication headers?", answer: "Yes, you can add any custom headers including Authorization (Bearer tokens, Basic auth), API keys, and other authentication headers." },
      { question: "Are requests sent from my browser?", answer: "Yes, requests are sent directly from your browser. This means CORS restrictions may apply for some APIs that do not allow browser-origin requests." }
    ],
    howToSteps: [
      { name: "Enter the URL", text: "Type the API endpoint URL you want to test." },
      { name: "Configure the request", text: "Select the HTTP method, add headers, and enter a request body if needed." },
      { name: "Send and inspect", text: "Click Send to execute the request and review the response status, headers, and body." }
    ],
    useCases: ["Testing REST API endpoints during development", "Debugging API responses and error codes", "Verifying API authentication and authorization", "Quick API testing without installing desktop tools like Postman"],
    relatedSlugs: ["json-formatter", "url-parser", "jwt-decoder"]
  },
  { slug: "base-number-converter", name: "Programmer's Calculator", description: "Convert between binary, octal, decimal, and hexadecimal with bitwise operations.", category: "developer", icon: "🔢", keywords: ["binary calculator", "hex calculator", "bitwise", "programmer calc"], subcategory: "converters",
    longDescription: "Convert numbers between binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16) systems instantly. Enter a value in any base and see all other representations update in real time. Also supports bitwise operations like AND, OR, XOR, and NOT for low-level programming tasks.",
    faqs: [
      { question: "What number bases are supported?", answer: "The calculator supports binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16) — the four systems most commonly used in programming." },
      { question: "What are bitwise operations?", answer: "Bitwise operations (AND, OR, XOR, NOT, shift) manipulate individual bits of binary numbers. They are used in low-level programming, permissions systems, network masks, and performance-optimized algorithms." },
      { question: "Can I enter negative numbers?", answer: "The tool works with unsigned integer values. For negative number representation, you can manually apply two's complement to the binary output." }
    ],
    howToSteps: [
      { name: "Enter a number", text: "Type a number in any supported base — binary, octal, decimal, or hexadecimal." },
      { name: "View conversions", text: "See the equivalent values in all four number bases update in real time." },
      { name: "Perform bitwise operations", text: "Use the bitwise operation buttons to perform AND, OR, XOR, NOT, and shift operations." }
    ],
    useCases: ["Converting hex color codes to decimal values", "Working with binary flags and bitmasks in code", "Understanding network subnet masks in different bases", "Debugging low-level protocol data and memory addresses"],
    relatedSlugs: ["number-base-converter", "chmod-calculator", "hex-to-text"]
  },

  // ── 25 New Developer Tools ───────────────────────────────────
  { slug: "xml-formatter", name: "XML Formatter", description: "Format, prettify, and minify XML code with syntax validation.", category: "developer", icon: "📄", keywords: ["xml formatter", "xml prettify", "xml beautify", "xml minify"], subcategory: "formatters",
    longDescription: "Format and prettify XML code with proper indentation, or minify XML to remove unnecessary whitespace. The tool validates XML syntax and displays clear error messages if the structure is malformed. Useful for working with API responses, config files, and data exchange formats.",
    faqs: [
      { question: "Does it validate XML?", answer: "Yes, the formatter parses the XML first and reports any syntax errors before formatting." },
      { question: "Can I minify XML too?", answer: "Yes, use the Minify button to remove all unnecessary whitespace from your XML." }
    ],
    howToSteps: [
      { name: "Paste your XML", text: "Enter your raw or minified XML into the input area." },
      { name: "Format or minify", text: "Click Format to beautify, or Minify to compress the XML." },
      { name: "Copy the result", text: "Copy the formatted output for use in your project." }
    ],
    useCases: ["Formatting API XML responses for debugging", "Prettifying SOAP web service payloads", "Minifying XML config files for production", "Validating RSS and Atom feed structures"],
    relatedSlugs: ["json-formatter", "html-prettifier", "xml-to-json", "yaml-to-json"]
  },
  { slug: "toml-to-json", name: "TOML to JSON Converter", description: "Convert TOML configuration files to JSON format.", category: "developer", icon: "📋", keywords: ["toml to json", "toml converter", "toml parser", "config converter"], subcategory: "converters",
    longDescription: "Convert TOML (Tom's Obvious Minimal Language) configuration files to JSON format. TOML is increasingly popular for configuration files in Rust, Python, and many modern tools. This converter parses TOML syntax including sections, key-value pairs, and basic types.",
    faqs: [
      { question: "What is TOML?", answer: "TOML (Tom's Obvious Minimal Language) is a configuration file format designed to be easy to read, with an unambiguous specification. It is used in Cargo.toml (Rust), pyproject.toml (Python), and many other tools." },
      { question: "Does it support all TOML features?", answer: "This tool supports the most common TOML features: sections, string, number, and boolean values. Complex features like arrays of tables may need manual adjustments." }
    ],
    howToSteps: [
      { name: "Paste TOML", text: "Enter your TOML configuration text in the left panel." },
      { name: "Convert", text: "Click Convert to JSON to produce the equivalent JSON structure." },
      { name: "Copy JSON", text: "Copy the JSON output for use in your application." }
    ],
    useCases: ["Converting Cargo.toml configurations for tooling", "Migrating config files between formats", "Understanding TOML structure for development", "Integrating TOML-based configs into JSON APIs"],
    relatedSlugs: ["yaml-to-json", "json-formatter", "xml-to-json", "json-validator"]
  },
  { slug: "json-path-tester", name: "JSONPath Tester", description: "Test JSONPath expressions against JSON data and see results instantly.", category: "developer", icon: "🔍", keywords: ["jsonpath", "json path", "json query", "jsonpath tester"], subcategory: "validators",
    longDescription: "Test JSONPath expressions against JSON data to extract values and navigate complex JSON structures. JSONPath is an expression language for querying JSON data, similar to XPath for XML. Useful for working with API responses and building data extraction logic.",
    faqs: [
      { question: "What is JSONPath?", answer: "JSONPath is a query language for JSON, similar to XPath for XML. It uses dot notation ($.store.name) and bracket notation ($.items[0]) to navigate and extract values from JSON structures." },
      { question: "What syntax does JSONPath use?", answer: "JSONPath expressions start with $ (the root), followed by dot (.) or bracket ([]) notation to navigate properties and array indices." }
    ],
    howToSteps: [
      { name: "Paste your JSON", text: "Enter the JSON object or array you want to query." },
      { name: "Enter a JSONPath expression", text: "Type a JSONPath expression starting with $ (e.g. $.user.name)." },
      { name: "See the result", text: "Click Test to evaluate the expression and view the extracted value." }
    ],
    useCases: ["Extracting specific values from API responses", "Building data transformation logic", "Debugging JSON data access in code", "Learning and experimenting with JSONPath syntax"],
    relatedSlugs: ["json-formatter", "json-validator", "regex-tester", "xml-formatter"]
  },
  { slug: "graphql-formatter", name: "GraphQL Formatter", description: "Format and prettify GraphQL queries, mutations, and schema definitions.", category: "developer", icon: "📊", keywords: ["graphql formatter", "graphql beautify", "graphql prettify", "graphql query format"], subcategory: "formatters",
    longDescription: "Format and beautify GraphQL queries, mutations, subscriptions, and schema definitions with proper indentation. Converts single-line or minified GraphQL into readable, well-structured code. Useful for debugging, documentation, and code reviews.",
    faqs: [
      { question: "Does it validate GraphQL syntax?", answer: "The tool performs basic structural formatting. For full schema validation, use a GraphQL IDE or the schema validation in your GraphQL server." },
      { question: "Does it support GraphQL schema SDL?", answer: "Yes, the formatter works with query language and Schema Definition Language (SDL) including type definitions, interfaces, and enums." }
    ],
    howToSteps: [
      { name: "Paste your GraphQL", text: "Enter a GraphQL query, mutation, or schema in the input panel." },
      { name: "Format", text: "Click Format to apply proper indentation and structure." },
      { name: "Copy the result", text: "Copy the formatted GraphQL for use in your code or docs." }
    ],
    useCases: ["Formatting minified GraphQL queries for readability", "Preparing GraphQL for documentation", "Debugging complex nested query structures", "Cleaning up auto-generated GraphQL schemas"],
    relatedSlugs: ["json-formatter", "sql-formatter", "html-prettifier", "regex-tester"]
  },
  { slug: "dockerfile-generator", name: "Dockerfile Generator", description: "Generate Dockerfiles for Node.js, Python, Go, Java, and Nginx.", category: "developer", icon: "🐳", keywords: ["dockerfile generator", "docker", "container", "dockerfile template"], subcategory: "generators",
    longDescription: "Generate production-ready Dockerfiles for popular languages and frameworks including Node.js, Python, Go, Java, and Nginx. Each template follows best practices such as multi-stage builds, minimal base images, and proper dependency layering for optimal image size and security.",
    faqs: [
      { question: "Are these Dockerfiles production-ready?", answer: "The templates follow Docker best practices and are suitable as starting points for production. You may need to adjust them for your specific framework, dependencies, or deployment requirements." },
      { question: "What is a multi-stage build?", answer: "Multi-stage builds use multiple FROM instructions in a single Dockerfile to separate the build environment from the runtime environment, resulting in smaller, more secure production images." }
    ],
    howToSteps: [
      { name: "Select a template", text: "Choose the programming language or runtime for your application." },
      { name: "Review and customize", text: "Edit the generated Dockerfile to match your app structure, port, and entry point." },
      { name: "Copy the Dockerfile", text: "Copy the Dockerfile and save it to the root of your project." }
    ],
    useCases: ["Containerizing Node.js and Python applications", "Setting up Docker for CI/CD pipelines", "Learning Dockerfile best practices by example", "Generating base configurations for custom images"],
    relatedSlugs: ["nginx-config-generator", "gitignore-generator", "env-generator", "meta-tag-generator"]
  },
  { slug: "gitignore-generator", name: ".gitignore Generator", description: "Generate .gitignore files for common languages and frameworks.", category: "developer", icon: "🙈", keywords: ["gitignore generator", "git ignore", "gitignore template", "gitignore creator"], subcategory: "generators",
    longDescription: "Generate comprehensive .gitignore files for popular languages, frameworks, and IDEs. Select one or more technologies and get a combined .gitignore that excludes build artifacts, dependencies, IDE files, and OS-specific files to keep your repository clean.",
    faqs: [
      { question: "Can I select multiple technologies?", answer: "Yes, you can select multiple categories (e.g. Node.js + VS Code + macOS) and all relevant ignore patterns will be combined into one file." },
      { question: "Why should I use a .gitignore?", answer: "A .gitignore prevents you from accidentally committing node_modules, compiled binaries, secrets, IDE-specific files, and OS clutter like .DS_Store to your repository." }
    ],
    howToSteps: [
      { name: "Select technologies", text: "Click the buttons for all the frameworks, languages, and IDEs your project uses." },
      { name: "Review the output", text: "The .gitignore content updates instantly as you select options." },
      { name: "Copy to your project", text: "Copy the generated file and save it as .gitignore in your project root." }
    ],
    useCases: ["Setting up a new project repository", "Adding .gitignore to an existing project", "Combining multiple framework ignore rules", "Preventing accidental commits of sensitive files"],
    relatedSlugs: ["dockerfile-generator", "env-generator", "nginx-config-generator", "meta-tag-generator"]
  },
  { slug: "nginx-config-generator", name: "Nginx Config Generator", description: "Generate Nginx server block configurations with SSL and proxy settings.", category: "developer", icon: "🔧", keywords: ["nginx config", "nginx generator", "nginx proxy", "nginx ssl"], subcategory: "generators",
    longDescription: "Generate Nginx server block configurations for reverse proxying Node.js, Python, or other web applications. Supports HTTP to HTTPS redirect, SSL/TLS via Let's Encrypt, gzip compression, and WebSocket proxy settings. Customizable by domain name, port, web root, and SSL preference.",
    faqs: [
      { question: "Does it support SSL?", answer: "Yes, the generator includes SSL configuration using Let's Encrypt certificate paths and redirects HTTP traffic to HTTPS automatically." },
      { question: "Can I use this for static sites too?", answer: "Yes, you can modify the location block to serve static files directly from the web root instead of proxying to an application." }
    ],
    howToSteps: [
      { name: "Enter your settings", text: "Fill in your domain, app port, web root, and SSL preference." },
      { name: "Review the config", text: "The Nginx configuration updates in real time based on your inputs." },
      { name: "Copy the config", text: "Copy the config and save it to /etc/nginx/sites-available/ on your server." }
    ],
    useCases: ["Setting up reverse proxy for Node.js apps", "Configuring HTTPS with Let's Encrypt", "Deploying static sites with Nginx", "Setting up WebSocket proxy for real-time apps"],
    relatedSlugs: ["dockerfile-generator", "gitignore-generator", "env-generator", "htaccess-generator"]
  },
  { slug: "ip-subnet-calculator", name: "IP Subnet Calculator", description: "Calculate network address, broadcast, hosts, and subnet mask from CIDR notation.", category: "developer", icon: "🌐", keywords: ["subnet calculator", "cidr calculator", "ip subnet", "network calculator"], subcategory: "validators",
    longDescription: "Calculate all subnet details from a CIDR notation input. Enter an IP address with prefix length (e.g. 192.168.1.0/24) to instantly get the network address, broadcast address, subnet mask, usable host range, and total host count. Essential for network planning and configuration.",
    faqs: [
      { question: "What is CIDR notation?", answer: "CIDR (Classless Inter-Domain Routing) notation expresses an IP address and its associated network prefix length using a slash, e.g. 192.168.1.0/24 means 24 bits are the network portion." },
      { question: "How many usable hosts does /24 give you?", answer: "A /24 subnet (255.255.255.0) provides 254 usable host addresses — 256 total addresses minus network address and broadcast address." }
    ],
    howToSteps: [
      { name: "Enter CIDR notation", text: "Type an IP address with prefix length, e.g. 10.0.0.0/16." },
      { name: "Calculate", text: "Click Calculate to compute all subnet details instantly." },
      { name: "Review results", text: "See network address, broadcast, subnet mask, host range, and count." }
    ],
    useCases: ["Network infrastructure planning and design", "Subnetting exercises and CCNA study", "Firewall rule and routing configuration", "Cloud VPC and subnet configuration"],
    relatedSlugs: ["url-parser", "user-agent-parser", "regex-tester", "chmod-calculator"]
  },
  { slug: "ascii-art-generator", name: "ASCII Art Generator", description: "Convert text to ASCII art in banner and block styles.", category: "developer", icon: "🎨", keywords: ["ascii art", "text to ascii", "ascii banner", "text art generator"], subcategory: "generators",
    longDescription: "Convert text into ASCII art using banner and block styles. Generate stylized text art for command-line tools, READMEs, terminal output, and creative projects. Customize the fill character for block-style art.",
    faqs: [
      { question: "What styles are available?", answer: "The tool offers a Banner style (multi-line character art) and a Block style where each letter is represented by repeating fill characters." },
      { question: "Can I use ASCII art in my README?", answer: "Yes, ASCII art works well in GitHub READMEs and terminal applications. Use code blocks (``` or pre) to preserve the monospace formatting." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type the word or phrase you want to convert to ASCII art." },
      { name: "Choose a style", text: "Select Banner for classic art or Block for simple character-filled letters." },
      { name: "Copy the result", text: "Click Copy to use the ASCII art in your project." }
    ],
    useCases: ["README file headers and project banners", "Terminal tool splash screens", "Fun text styling for CLI applications", "Creative coding and retro-themed projects"],
    relatedSlugs: ["meta-tag-generator", "markdown-table-generator", "text-to-nato", "lorem-ipsum-code"]
  },
  { slug: "lorem-ipsum-code", name: "Code Lorem Ipsum Generator", description: "Generate placeholder code snippets in JSON, SQL, HTML, JS, TypeScript, and CSS.", category: "developer", icon: "📝", keywords: ["lorem ipsum code", "placeholder data", "dummy data generator", "mock data"], subcategory: "generators",
    longDescription: "Generate realistic placeholder code snippets and mock data structures for prototyping and testing. Choose from JSON arrays, SQL INSERT statements, HTML lists, CSS variables, TypeScript interfaces, and JavaScript arrays. Specify how many items to generate.",
    faqs: [
      { question: "What formats are supported?", answer: "The tool generates placeholder data in JSON, JavaScript array, TypeScript interface, SQL INSERT, CSS variables, and HTML list formats." },
      { question: "Is the generated data random?", answer: "The data uses structured placeholder values for predictable output rather than fully randomized data, making it suitable for UI mockups and layout testing." }
    ],
    howToSteps: [
      { name: "Choose a format", text: "Select the type of code snippet you need from the dropdown." },
      { name: "Set item count", text: "Choose how many items (rows, entries) to generate." },
      { name: "Generate and copy", text: "Click Generate and copy the code snippet for your prototype." }
    ],
    useCases: ["Populating UI components during prototyping", "Generating SQL test data for database queries", "Creating mock API response structures", "Building frontend layouts with realistic data shapes"],
    relatedSlugs: ["ascii-art-generator", "json-formatter", "markdown-table-generator", "csv-to-json"]
  },
  { slug: "hash-identifier", name: "Hash Identifier", description: "Identify the type of a hash string from its pattern and length.", category: "developer", icon: "🔒", keywords: ["hash identifier", "identify hash", "hash type", "hash detector"], subcategory: "validators",
    longDescription: "Identify the probable type of any hash string based on its length, character set, and format patterns. Recognizes MD5, SHA-1, SHA-256, SHA-512, bcrypt, Argon2, Unix crypt hashes, and more. Useful for security analysis, reverse engineering, and understanding password storage schemes.",
    faqs: [
      { question: "Can it identify all hash types?", answer: "The tool identifies the most common hash algorithms used in web applications and security contexts. Proprietary or custom hash functions may not be recognized." },
      { question: "Is this tool safe to use for real passwords?", answer: "The tool runs entirely in your browser and does not transmit data. However, as a general security practice, avoid pasting real production passwords or sensitive hashes." }
    ],
    howToSteps: [
      { name: "Paste your hash", text: "Enter the hash string you want to identify in the input field." },
      { name: "Review matches", text: "The tool shows all possible hash types that match the pattern and length." },
      { name: "Use the information", text: "Use the identified hash type for security analysis or data migration tasks." }
    ],
    useCases: ["Security auditing and penetration testing", "Identifying password storage algorithms in legacy systems", "CTF (Capture the Flag) challenge solving", "Understanding data breaches and hash formats"],
    relatedSlugs: ["jwt-decoder", "base64-encoder", "regex-tester", "hash-generator"]
  },
  { slug: "jwt-generator", name: "JWT Generator", description: "Generate JSON Web Tokens with custom headers and payload claims.", category: "developer", icon: "🔑", keywords: ["jwt generator", "json web token", "jwt create", "jwt builder"], subcategory: "generators",
    longDescription: "Generate JSON Web Tokens (JWTs) with custom header and payload for testing and development purposes. Edit the header algorithm and payload claims directly in JSON, then see the resulting base64url-encoded token. Note: tokens generated here use a placeholder signature and are for testing only.",
    faqs: [
      { question: "Are the generated JWTs valid for authentication?", answer: "No, these JWTs use a placeholder signature and are not cryptographically signed. For real authentication, use a proper JWT library with your secret key on the server side." },
      { question: "What claims can I add to the payload?", answer: "You can add any standard claims (sub, iss, exp, iat, aud) or custom claims in the JSON payload editor." }
    ],
    howToSteps: [
      { name: "Edit the header", text: "Modify the algorithm (alg) and type (typ) in the header JSON if needed." },
      { name: "Edit the payload", text: "Add or modify claims in the payload JSON, including expiration (exp) and subject (sub)." },
      { name: "Copy the JWT", text: "The token updates in real time — copy it for use in testing tools like Postman." }
    ],
    useCases: ["Testing JWT decoding and parsing in your application", "Generating test tokens for API development", "Learning JWT structure and claim formats", "Building JWT-based authentication flow mockups"],
    relatedSlugs: ["jwt-decoder", "base64-encoder", "hash-identifier", "api-tester"]
  },
  { slug: "curl-to-code", name: "cURL to Code Converter", description: "Convert cURL commands to JavaScript Fetch or Python Requests code.", category: "developer", icon: "🔄", keywords: ["curl to code", "curl converter", "curl to python", "curl to javascript"], subcategory: "converters",
    longDescription: "Convert cURL commands into equivalent code in JavaScript (Fetch API) or Python (Requests library). Paste a cURL command copied from browser DevTools or API docs and get ready-to-use code that reproduces the same HTTP request in your preferred programming language.",
    faqs: [
      { question: "Where do I get a cURL command?", answer: "In Chrome DevTools, right-click any network request and select Copy > Copy as cURL. API documentation often provides example cURL commands you can convert." },
      { question: "Does it handle request headers and body?", answer: "Yes, the converter parses -H headers and -d request body data from the cURL command and includes them in the generated code." }
    ],
    howToSteps: [
      { name: "Paste the cURL command", text: "Enter a cURL command including URL, method, headers, and body." },
      { name: "Select a language", text: "Choose JavaScript Fetch or Python as the output language." },
      { name: "Copy the code", text: "Copy the generated code and use it in your application." }
    ],
    useCases: ["Converting API documentation examples to usable code", "Translating browser network requests to scripts", "Learning API integration across languages", "Quickly building API client code from curl samples"],
    relatedSlugs: ["api-tester", "url-encoder", "json-formatter", "url-parser"]
  },
  { slug: "css-animation-generator", name: "CSS Animation Generator", description: "Create CSS keyframe animations with timing, duration, and preset controls.", category: "developer", icon: "✨", keywords: ["css animation", "keyframe generator", "css keyframes", "animation creator"], subcategory: "generators",
    longDescription: "Create CSS keyframe animations with a visual control panel. Choose from preset animations including fade, slide, bounce, spin, pulse, and shake, then customize duration, timing function, delay, and iteration count. Get the complete CSS output ready to use in your stylesheet.",
    faqs: [
      { question: "What animation presets are available?", answer: "Presets include Fade, Slide, Bounce, Spin, Pulse, and Shake — covering the most commonly needed UI animations." },
      { question: "Can I use infinite animations?", answer: "Yes, set the iteration count to 'infinite' to create continuously looping animations." }
    ],
    howToSteps: [
      { name: "Choose a preset", text: "Click a preset animation button to load its keyframe definition." },
      { name: "Customize timing", text: "Adjust duration, easing function, delay, and iteration count." },
      { name: "Copy the CSS", text: "Copy the complete @keyframes block and usage declaration for your stylesheet." }
    ],
    useCases: ["Adding loading and entrance animations to UI components", "Creating attention-grabbing button hover effects", "Building CSS-only loading spinners and indicators", "Generating animation code for web banners and ads"],
    relatedSlugs: ["css-gradient-generator", "box-shadow-generator", "css-flexbox-generator", "css-formatter"]
  },
  { slug: "border-radius-generator", name: "Border Radius Generator", description: "Visually edit CSS border-radius values with a live preview.", category: "developer", icon: "⬛", keywords: ["border radius generator", "css border radius", "rounded corners", "border radius editor"], subcategory: "generators",
    longDescription: "Visually control CSS border-radius values for all four corners of an element with a live preview. Link all corners for uniform rounding or adjust each corner independently. Instantly generates the CSS border-radius declaration ready to copy into your stylesheet.",
    faqs: [
      { question: "Can I set different radius for each corner?", answer: "Yes, uncheck 'Link all corners' to adjust top-left, top-right, bottom-right, and bottom-left independently." },
      { question: "What is the CSS shorthand format?", answer: "The CSS border-radius shorthand lists four values in order: top-left top-right bottom-right bottom-left." }
    ],
    howToSteps: [
      { name: "Adjust the sliders", text: "Drag each corner's slider or unlink them to set individual values." },
      { name: "Preview the shape", text: "See the live preview square update in real time." },
      { name: "Copy the CSS", text: "Click Copy to grab the border-radius declaration for your stylesheet." }
    ],
    useCases: ["Designing card and button component border styles", "Creating circle shapes from square elements", "Experimenting with asymmetric rounded corners", "Generating CSS for blob and organic shape effects"],
    relatedSlugs: ["box-shadow-generator", "css-gradient-generator", "css-flexbox-generator", "css-formatter"]
  },
  { slug: "css-flexbox-generator", name: "CSS Flexbox Generator", description: "Visual CSS flexbox playground with live preview and code output.", category: "developer", icon: "📐", keywords: ["flexbox generator", "css flexbox", "flexbox playground", "flex layout"], subcategory: "generators",
    longDescription: "Visually build CSS flexbox layouts with a live preview. Adjust flex direction, justify content, align items, flex wrap, and gap using dropdowns and sliders while watching the layout update in real time. Get the complete CSS output for your container class.",
    faqs: [
      { question: "Does it generate child item styles too?", answer: "This tool focuses on the flex container properties. Child item properties like flex-grow, flex-shrink, and flex-basis can be added manually to extend the generated code." },
      { question: "What does justify-content vs align-items do?", answer: "justify-content controls alignment along the main axis (row = horizontal), while align-items controls alignment on the cross axis (row = vertical)." }
    ],
    howToSteps: [
      { name: "Set flex properties", text: "Choose flex direction, justify-content, align-items, and wrap settings." },
      { name: "Adjust gap and items", text: "Set the gap between items and the number of preview items." },
      { name: "Copy the CSS", text: "Copy the generated CSS for your flex container." }
    ],
    useCases: ["Learning flexbox by visual experimentation", "Designing navigation bars and toolbars", "Creating responsive card and grid layouts", "Centering elements with flexbox alignment"],
    relatedSlugs: ["css-grid-generator", "border-radius-generator", "css-animation-generator", "css-formatter"]
  },
  { slug: "css-grid-generator", name: "CSS Grid Generator", description: "Visual CSS Grid layout builder with live preview and code output.", category: "developer", icon: "⊞", keywords: ["css grid generator", "grid layout", "css grid builder", "grid playground"], subcategory: "generators",
    longDescription: "Build CSS Grid layouts visually with controls for columns, rows, gaps, and column/row sizing. See a live preview of the grid as you adjust the settings and get the complete CSS output. Perfect for learning CSS Grid and quickly generating layout boilerplate.",
    faqs: [
      { question: "What grid sizing options are available?", answer: "Column sizes include: 1fr (equal), auto, fixed pixel, and minmax(). Row sizes include auto, 1fr, and fixed pixel values." },
      { question: "Does it support grid areas?", answer: "This tool focuses on template-based grid generation. Named grid areas can be added manually to extend the generated code." }
    ],
    howToSteps: [
      { name: "Set columns and rows", text: "Use sliders to choose the number of columns and rows." },
      { name: "Configure sizing and gaps", text: "Select column/row sizes and adjust gap values." },
      { name: "Copy the CSS", text: "Copy the generated CSS grid-container declaration." }
    ],
    useCases: ["Building responsive page layouts with CSS Grid", "Designing card grids and image galleries", "Learning CSS Grid by visual exploration", "Generating grid boilerplate for UI frameworks"],
    relatedSlugs: ["css-flexbox-generator", "border-radius-generator", "css-animation-generator", "css-formatter"]
  },
  { slug: "text-to-handlebars", name: "Text to Handlebars Template", description: "Convert plain text to Handlebars template variables.", category: "developer", icon: "📝", keywords: ["handlebars template", "text to template", "mustache template", "template generator"], subcategory: "generators",
    longDescription: "Convert plain text with placeholder words into Handlebars (or Mustache) template syntax. Capitalized words are automatically detected and converted to {{variable}} placeholders. Useful for creating email templates, HTML templates, and dynamic content systems.",
    faqs: [
      { question: "How does it detect variables?", answer: "The tool looks for capitalized words that are likely to represent dynamic data (like Names, Dates, or Product names) and wraps them in double curly brace syntax." },
      { question: "Does this work with Mustache too?", answer: "Yes, Handlebars is a superset of Mustache. The {{variable}} syntax works in both Handlebars and Mustache templating engines." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste text with capitalized placeholder words representing dynamic values." },
      { name: "Convert", text: "Click Convert to Handlebars to replace detected words with {{variable}} syntax." },
      { name: "Copy the template", text: "Copy the generated Handlebars template for your email or HTML template system." }
    ],
    useCases: ["Creating email template drafts from plain text", "Generating HTML templates for CMS systems", "Converting static copy to dynamic template files", "Prototyping template-driven notification messages"],
    relatedSlugs: ["markdown-to-html", "meta-tag-generator", "lorem-ipsum-code", "markdown-preview"]
  },
  { slug: "json-diff", name: "JSON Diff", description: "Compare two JSON objects and highlight added, removed, and changed keys.", category: "developer", icon: "🔍", keywords: ["json diff", "json compare", "json difference", "json comparison"], subcategory: "validators",
    longDescription: "Compare two JSON objects side by side and see exactly what has been added, removed, or changed between them. Each difference is highlighted with clear visual indicators and shows both old and new values. Useful for API response comparison, config change review, and data migration verification.",
    faqs: [
      { question: "Does it support nested objects?", answer: "The tool compares top-level keys and shows differences at the first level. Nested differences are shown as a changed value containing the serialized nested object." },
      { question: "Does it compare JSON arrays?", answer: "Array comparison is handled by comparing the serialized JSON of array values — if two arrays differ in any element, the key is marked as changed." }
    ],
    howToSteps: [
      { name: "Paste JSON A", text: "Enter the original JSON object in the left panel." },
      { name: "Paste JSON B", text: "Enter the modified JSON object in the right panel." },
      { name: "Compare", text: "Click Compare JSON to see all additions, removals, and changes highlighted." }
    ],
    useCases: ["Comparing API responses before and after a change", "Reviewing configuration file diffs", "Validating data migration output", "Debugging JSON schema changes"],
    relatedSlugs: ["json-formatter", "json-validator", "diff-checker", "json-path-tester"]
  },
  { slug: "env-generator", name: ".env File Generator", description: "Generate .env file templates for Node.js, databases, JWT, Redis, email, and AWS.", category: "developer", icon: "⚙️", keywords: ["env generator", ".env template", "environment variables", "env file creator"], subcategory: "generators",
    longDescription: "Generate .env file templates for common application configurations including Node.js server settings, databases, JWT authentication, Redis, email/SMTP, and AWS. Select the sections you need and get a commented .env template ready to fill in with your actual values.",
    faqs: [
      { question: "Should I commit the generated .env file?", answer: "No, never commit .env files with real secrets to version control. Add .env to your .gitignore. You can commit a .env.example file with placeholder values instead." },
      { question: "Can I select multiple sections?", answer: "Yes, click multiple section buttons to combine Node.js, database, JWT, and other configurations into one .env file." }
    ],
    howToSteps: [
      { name: "Select sections", text: "Click the configuration sections you need for your project." },
      { name: "Review the template", text: "The .env template updates to include all selected variable groups with comments." },
      { name: "Fill in your values", text: "Copy the template, save it as .env, and replace placeholder values with your real credentials." }
    ],
    useCases: ["Setting up new project environment configurations", "Creating .env.example templates for team sharing", "Documenting required environment variables for deployment", "Onboarding new developers with complete config templates"],
    relatedSlugs: ["gitignore-generator", "dockerfile-generator", "nginx-config-generator", "meta-tag-generator"]
  },
  { slug: "cors-tester", name: "CORS Tester", description: "Test CORS headers on any URL and see what the server returns.", category: "developer", icon: "🌐", keywords: ["cors tester", "cors checker", "cors headers", "cross origin"], subcategory: "validators",
    longDescription: "Test CORS (Cross-Origin Resource Sharing) headers on any API endpoint or URL. Send a request with a custom Origin header and inspect the CORS headers returned by the server. Helps diagnose CORS configuration issues when building web applications that call external APIs.",
    faqs: [
      { question: "What does CORS stand for?", answer: "CORS stands for Cross-Origin Resource Sharing. It is a browser security mechanism that restricts web pages from making requests to a different domain than the one serving the page." },
      { question: "Why does CORS blocking happen?", answer: "Browsers enforce CORS to prevent malicious websites from making unauthorized requests to other sites on behalf of users. Servers must explicitly allow cross-origin requests by returning appropriate CORS headers." }
    ],
    howToSteps: [
      { name: "Enter the URL", text: "Type the API endpoint URL you want to test for CORS support." },
      { name: "Set origin and method", text: "Enter the origin your app will be making requests from and the HTTP method." },
      { name: "Test and review headers", text: "Click Test CORS to send the request and view the CORS response headers." }
    ],
    useCases: ["Debugging CORS errors in web application development", "Verifying API CORS configuration before deployment", "Testing cross-origin API access for third-party integrations", "Learning how CORS works through hands-on testing"],
    relatedSlugs: ["api-tester", "url-parser", "url-encoder", "http-status-codes"]
  },
  { slug: "http-status-codes", name: "HTTP Status Code Reference", description: "Look up HTTP status codes with descriptions, categories, and use cases.", category: "developer", icon: "📋", keywords: ["http status codes", "http codes", "status code lookup", "http reference"], subcategory: "validators",
    longDescription: "Browse and search a comprehensive reference of HTTP status codes organized by category. Each code includes its name, category (1xx–5xx), and a clear description of what it means and when it is used. Filter by category or search by code number or name.",
    faqs: [
      { question: "What are the HTTP status code categories?", answer: "1xx = Informational, 2xx = Success, 3xx = Redirection, 4xx = Client Error, 5xx = Server Error." },
      { question: "What is the difference between 401 and 403?", answer: "401 Unauthorized means authentication is required or failed. 403 Forbidden means the server understood the request but refuses to authorize it — authentication would not help." }
    ],
    howToSteps: [
      { name: "Search or browse", text: "Type a code number or name, or filter by category to find what you need." },
      { name: "Read the description", text: "Each entry explains what the code means and when it is returned." },
      { name: "Apply to your project", text: "Use the information to correctly implement or interpret HTTP responses." }
    ],
    useCases: ["Quickly looking up unfamiliar HTTP response codes", "Choosing the correct status code for API responses", "Debugging web application HTTP errors", "Learning HTTP protocol for web development"],
    relatedSlugs: ["cors-tester", "api-tester", "url-parser", "regex-tester"]
  },
  { slug: "mime-type-lookup", name: "MIME Type Lookup", description: "Look up MIME types by file extension for web and API development.", category: "developer", icon: "📁", keywords: ["mime type", "content type", "file extension mime", "mime lookup"], subcategory: "validators",
    longDescription: "Look up the correct MIME type (Content-Type) for any file extension. Covers web assets (HTML, CSS, JS), images (PNG, JPEG, WebP), data formats (JSON, XML, YAML), media (MP4, MP3), fonts, and more. Essential for setting correct Content-Type headers in APIs and web servers.",
    faqs: [
      { question: "What is a MIME type?", answer: "A MIME type (Multipurpose Internet Mail Extensions) identifies the format of a file. For example, text/html for HTML files or application/json for JSON. Browsers and servers use MIME types to handle files correctly." },
      { question: "Why does the Content-Type header matter?", answer: "Browsers use the Content-Type header to determine how to process a response. Incorrect MIME types can cause files to be downloaded instead of displayed, or prevent JavaScript from executing." }
    ],
    howToSteps: [
      { name: "Search by extension", text: "Type a file extension (e.g. .json, .mp4) or MIME type in the search field." },
      { name: "Find your MIME type", text: "Browse the filtered results to find the correct Content-Type value." },
      { name: "Use in your code", text: "Copy the MIME type for use in HTTP headers, API responses, or server configurations." }
    ],
    useCases: ["Setting correct Content-Type headers in API responses", "Configuring web server MIME type mappings", "Understanding browser file handling for different formats", "Debugging file download and media streaming issues"],
    relatedSlugs: ["http-status-codes", "cors-tester", "url-encoder", "user-agent-parser"]
  },
  { slug: "escape-unescape", name: "Escape / Unescape Tool", description: "Escape and unescape strings for URL, HTML, JSON, Base64, and RegEx.", category: "developer", icon: "🔤", keywords: ["escape unescape", "url escape", "html escape", "json escape", "string escape"], subcategory: "converters",
    longDescription: "Escape or unescape strings across multiple formats including URL percent-encoding, HTML entities, JSON string escaping, Base64 encoding, and RegEx special character escaping. A versatile tool for handling string transformations needed in web development, API work, and security.",
    faqs: [
      { question: "What formats are supported?", answer: "URL (percent-encoding), HTML entities, JSON string escaping, Base64 encoding, and RegEx special character escaping." },
      { question: "When do I need to escape strings?", answer: "Escaping is needed to safely include special characters in contexts where they have special meaning — for example, & in HTML must be &amp;, and / in a RegEx pattern needs to be \\/ to be treated as a literal character." }
    ],
    howToSteps: [
      { name: "Select a mode", text: "Choose the escaping format: URL, HTML, JSON, Base64, or RegEx." },
      { name: "Enter your string", text: "Paste the text you want to escape or unescape." },
      { name: "Transform", text: "Click Escape or Unescape to convert the string, then copy the result." }
    ],
    useCases: ["Encoding URL query parameters for API calls", "Escaping HTML content for safe injection into web pages", "Preparing strings for JSON serialization", "Escaping user input for use in regular expressions"],
    relatedSlugs: ["url-encoder", "html-entity-encoder", "base64-encoder", "regex-tester"]
  },
  { slug: "timestamp-generator", name: "Timestamp Generator", description: "Generate timestamps in Unix, ISO 8601, UTC, and other formats.", category: "developer", icon: "⏱️", keywords: ["timestamp generator", "unix timestamp", "iso timestamp", "date timestamp"], subcategory: "generators",
    longDescription: "Generate timestamps in multiple formats for any date and time. Choose the current time or enter a custom date to instantly get Unix timestamps (seconds and milliseconds), ISO 8601, UTC, RFC 2822, and human-readable formats. Copy any format with a single click.",
    faqs: [
      { question: "What timestamp formats are generated?", answer: "The tool generates Unix seconds, Unix milliseconds, ISO 8601, UTC string, local string, date-only, time-only (UTC), RFC 2822, day of week, and month/year formats." },
      { question: "How do I get the current Unix timestamp?", answer: "Click 'Use Current Time' to generate timestamps for the current moment, or enter any date and time to get timestamps for that specific point." }
    ],
    howToSteps: [
      { name: "Select a date/time", text: "Use the date picker to enter a specific date and time, or click 'Use Current Time'." },
      { name: "Browse formats", text: "See all timestamp formats for your chosen date displayed in a table." },
      { name: "Copy any format", text: "Click Copy next to any format to use it in your code or database query." }
    ],
    useCases: ["Generating Unix timestamps for API requests and testing", "Converting dates to ISO 8601 for database storage", "Creating timestamp values for log file entries", "Testing time-based features with specific timestamps"],
    relatedSlugs: ["timestamp-converter", "timezone-converter", "date-difference", "cron-parser"]
  },
  { slug: "binary-to-text", name: "Binary to Text Converter", description: "Convert binary code to readable text and text to binary.", category: "developer", icon: "💾", keywords: ["binary to text", "text to binary", "binary converter", "binary decoder"], subcategory: "converters",
    longDescription: "Convert between binary representation and human-readable text. Enter binary strings (sequences of 0s and 1s) to decode them into text, or type text to see its binary representation. Supports ASCII and UTF-8 encoding with space-separated byte grouping for readability.",
    faqs: [
      { question: "How does binary to text conversion work?", answer: "Each character is represented by 8 bits (one byte) in ASCII. The binary is split into 8-bit groups, and each group is converted to its corresponding character." },
      { question: "What encoding is used?", answer: "Standard ASCII/UTF-8 encoding. Each 8-bit binary sequence maps to one ASCII character (0-127) or UTF-8 character." },
      { question: "Do I need to separate bytes with spaces?", answer: "Spaces between bytes are optional. The tool can parse both space-separated (01001000 01101001) and continuous (0100100001101001) binary strings." }
    ],
    howToSteps: [
      { name: "Choose direction", text: "Select Binary → Text or Text → Binary conversion." },
      { name: "Enter input", text: "Type or paste binary code or plain text." },
      { name: "Copy result", text: "The conversion is instant. Copy the result for use." }
    ],
    useCases: ["Decoding binary data for debugging network protocols", "Learning computer science binary representation", "CTF challenges and puzzle solving", "Converting binary messages for fun or education"],
    relatedSlugs: ["text-to-binary", "base64-encoder", "hex-to-text", "ascii-table"]
  },
  { slug: "pixel-density-calculator", name: "Pixel Density Calculator (PPI)", description: "Calculate pixels per inch (PPI) from screen resolution and size.", category: "developer", icon: "🖥️", keywords: ["ppi calculator", "pixel density", "pixels per inch", "screen resolution", "dpi"], subcategory: "web",
    longDescription: "Calculate the pixel density (PPI — pixels per inch) of any display from its resolution and physical screen size. Enter the horizontal and vertical pixel counts along with the diagonal screen size in inches to get the exact PPI. Compare displays for image sharpness and determine optimal viewing distances.",
    faqs: [
      { question: "What is a good PPI for a monitor?", answer: "Standard desktop monitors are 90-110 PPI. Retina/HiDPI displays are 200+ PPI. For phones, 300+ PPI is considered 'retina' quality where individual pixels are invisible at normal viewing distance." },
      { question: "What is the difference between PPI and DPI?", answer: "PPI (pixels per inch) measures screen pixel density. DPI (dots per inch) measures print density. They're often used interchangeably but technically refer to different things." },
      { question: "How is PPI calculated?", answer: "PPI = √(width² + height²) / diagonal size in inches. It uses the Pythagorean theorem to find the diagonal pixel count, then divides by the physical diagonal." }
    ],
    howToSteps: [
      { name: "Enter resolution", text: "Type the horizontal and vertical pixel count of your display (e.g. 1920 × 1080)." },
      { name: "Enter screen size", text: "Type the diagonal screen size in inches (e.g. 27)." },
      { name: "View results", text: "See the calculated PPI, total pixels, and aspect ratio." }
    ],
    useCases: ["Comparing display sharpness when shopping for monitors", "Determining if a display qualifies as retina/HiDPI", "Calculating optimal viewing distance for a given PPI", "UI/UX design decisions for different device pixel densities"],
    relatedSlugs: ["aspect-ratio-calculator", "pixels-to-points", "em-to-px", "screen-resolution"]
  },
];
