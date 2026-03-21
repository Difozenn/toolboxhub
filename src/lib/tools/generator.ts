import type { Tool } from "../types";

export const generatorTools: Tool[] = [
  // ── Existing (13) ──────────────────────────────────────────
  { slug: "password-generator", name: "Password Generator", description: "Generate strong, secure random passwords with customizable options.", category: "generator", icon: "🔑", keywords: ["password generator", "random password", "strong password"], subcategory: "security",
    longDescription: "Generate cryptographically secure passwords with this powerful Password Generator. Customize length (8-128 characters), include uppercase, lowercase, numbers, and special symbols. Generate multiple passwords at once and check their strength with the built-in meter. Uses the Web Crypto API for true randomness.",
    faqs: [
      { question: "How does the password generator ensure randomness?", answer: "The generator uses the browser's Web Crypto API (window.crypto.getRandomValues), which draws from the operating system's cryptographically secure entropy source — the same source used by professional security tools." },
      { question: "How long should a secure password be?", answer: "Security experts recommend a minimum of 16 characters for important accounts. Each additional character exponentially increases the time required to crack the password by brute force." },
      { question: "Should I use special characters in passwords?", answer: "Yes — including special characters (!, @, #, $, etc.) significantly increases password complexity. Verify that the service you're creating the password for accepts special characters before using them." }
    ],
    howToSteps: [
      { name: "Configure your password options", text: "Set the password length and toggle which character types to include — uppercase, lowercase, numbers, and special symbols." },
      { name: "Generate your password", text: "Click 'Generate' to create a cryptographically secure random password matching your configuration." },
      { name: "Copy and save your password", text: "Copy the generated password to your clipboard and save it immediately in a password manager — never store passwords in plain text." }
    ],
    useCases: [
      "Creating strong unique passwords for new account registrations",
      "Generating secure API keys and secrets for development environments",
      "Replacing weak or reused passwords as part of a security audit",
      "Producing random passwords for test users in development databases"
    ],
    relatedSlugs: ["password-strength", "uuid-generator", "hash-generator"]
  },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate universally unique identifiers (UUID v4) instantly.", category: "generator", icon: "🆔", keywords: ["uuid", "uuid v4", "guid", "unique id"], subcategory: "code",
    longDescription: "UUID Generator instantly produces one or more UUID v4 (randomly generated universally unique identifiers) using cryptographically secure randomness. Copy single UUIDs or batch-generate dozens at once for database primary keys, session tokens, entity IDs, and any other use case requiring guaranteed uniqueness.",
    faqs: [
      { question: "What is a UUID v4?", answer: "UUID v4 is a 128-bit identifier generated using random or pseudo-random numbers, formatted as 32 hexadecimal characters separated by hyphens (e.g., 550e8400-e29b-41d4-a716-446655440000). It is statistically guaranteed to be unique across all systems." },
      { question: "Can two generated UUIDs ever be the same?", answer: "The probability of generating a duplicate UUID v4 is astronomically small — approximately 1 in 2^122. In practice, UUID collisions are so rare they can be safely ignored for virtually all applications." },
      { question: "What is the difference between UUID and GUID?", answer: "GUID (Globally Unique Identifier) is Microsoft's term for the same concept as UUID. They are interchangeable — GUIDs follow the same UUID standard and format." }
    ],
    howToSteps: [
      { name: "Choose how many UUIDs to generate", text: "Enter the number of UUIDs you need — from 1 to hundreds — in the quantity field." },
      { name: "Generate the UUIDs", text: "Click 'Generate' to produce cryptographically random UUID v4s." },
      { name: "Copy and use", text: "Click 'Copy All' to copy all generated UUIDs to your clipboard, or click the copy icon next to any individual UUID." }
    ],
    useCases: [
      "Generating primary keys for database records in SQL or NoSQL databases",
      "Creating unique identifiers for distributed system entities without central coordination",
      "Producing session tokens and correlation IDs for request tracing",
      "Generating unique IDs for test fixtures in automated testing"
    ],
    relatedSlugs: ["password-generator", "fake-data-generator", "hash-generator"]
  },
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Generate QR codes from any text or URL for easy sharing.", category: "generator", icon: "📱", keywords: ["qr code", "qr generator", "barcode"], subcategory: "content",
    longDescription: "QR Code Generator creates scannable QR codes from any text, URL, contact info, or custom data in seconds. Customize the QR code size, error correction level, and foreground/background colors, then download as a high-resolution PNG or SVG ready for print and digital use.",
    faqs: [
      { question: "What can I encode in a QR code?", answer: "You can encode any text including URLs, plain text messages, email addresses, phone numbers, Wi-Fi credentials, vCard contact information, calendar events, and more. The QR code stores whatever text string you provide." },
      { question: "What is error correction level?", answer: "Error correction allows a QR code to be scanned even if part of it is damaged or obscured. Higher correction levels (L, M, Q, H) add more redundancy — Level H allows up to 30% of the QR code to be damaged while remaining scannable, but makes the code denser." },
      { question: "Can I add a logo to the center of the QR code?", answer: "Yes — upload a small logo image to overlay in the center of the QR code. Set the error correction to High (H) to ensure the code remains scannable despite the logo covering part of the data." }
    ],
    howToSteps: [
      { name: "Enter the content to encode", text: "Type or paste the URL, text, or other data you want encoded in the QR code." },
      { name: "Customize the appearance", text: "Set the size, select an error correction level, and optionally change the colors or upload a center logo." },
      { name: "Download your QR code", text: "Click 'Generate' and download the QR code as a PNG or SVG for use in print materials or digital content." }
    ],
    useCases: [
      "Adding QR codes to business cards that link to a website or LinkedIn profile",
      "Creating QR codes for restaurant menus, event posters, or product packaging",
      "Generating Wi-Fi QR codes for guests to scan and connect without typing a password",
      "Linking printed materials to landing pages, video tutorials, or promotional offers"
    ],
    relatedSlugs: ["url-encoder", "utm-builder", "placeholder-image"]
  },
  { slug: "color-palette-generator", name: "Color Palette Generator", description: "Generate harmonious color palettes for your design projects.", category: "generator", icon: "🎨", keywords: ["color palette", "color scheme", "color harmony", "design colors"], subcategory: "design",
    longDescription: "Color Palette Generator creates harmonious, on-brand color palettes using color theory principles — complementary, analogous, triadic, tetradic, and monochromatic schemes. Start from any base color or generate random palettes, then export HEX, RGB, and CSS variable values for immediate use in your design tools.",
    faqs: [
      { question: "What color harmony types does the generator support?", answer: "The generator supports complementary (opposite on the color wheel), analogous (adjacent colors), triadic (three evenly spaced), tetradic/square (four evenly spaced), split-complementary, and monochromatic (variations of one hue) schemes." },
      { question: "Can I start from my brand's primary color?", answer: "Yes — enter your brand's HEX color code as the base color and the generator will create a full harmonious palette built around it using the harmony type you select." },
      { question: "Can I export the palette for use in design tools?", answer: "Yes — copy the HEX and RGB values individually, or export the full palette as CSS custom properties ready to paste into your stylesheet." }
    ],
    howToSteps: [
      { name: "Choose or enter a base color", text: "Click the color picker to choose a starting color or type in a HEX code from your brand guidelines." },
      { name: "Select a color harmony type", text: "Choose complementary, analogous, triadic, or another harmony to generate a balanced palette around your base color." },
      { name: "Export your palette", text: "Copy the individual HEX codes or export the full palette as CSS variables to use in your design files and stylesheets." }
    ],
    useCases: [
      "Designers building a complete brand color system from a single primary color",
      "Web developers generating a CSS variable-based color palette for a new project",
      "UI/UX designers exploring color scheme options for a product interface",
      "Marketers ensuring consistent color usage across all brand touchpoints"
    ],
    relatedSlugs: ["random-color", "color-converter", "css-gradient-generator"]
  },
  { slug: "fake-data-generator", name: "Fake Data Generator", description: "Generate fake names, emails, addresses, and more for testing.", category: "generator", icon: "🎭", keywords: ["fake data", "mock data", "test data", "dummy data"], subcategory: "code",
    longDescription: "Fake Data Generator produces realistic-looking test data — including names, email addresses, phone numbers, addresses, company names, credit card numbers, and more — for populating development databases, testing UI components, and demonstrating applications without using real user data.",
    faqs: [
      { question: "What types of data can I generate?", answer: "The generator produces fake names, email addresses, phone numbers, physical addresses, company names, job titles, dates of birth, credit card numbers (following Luhn format), IP addresses, URLs, and user avatars." },
      { question: "Can I generate data for multiple locales and countries?", answer: "Yes — select a locale (US, UK, France, Germany, Japan, etc.) and the generated names, addresses, and phone numbers will follow the formatting conventions of that country." },
      { question: "Can I export the generated data as JSON or CSV?", answer: "Yes — generate a batch of records and export them as JSON, CSV, or SQL INSERT statements ready for use in your database or test fixtures." }
    ],
    howToSteps: [
      { name: "Select the data fields to generate", text: "Choose which types of data you need (name, email, address, phone, etc.) from the available field options." },
      { name: "Set quantity and locale", text: "Specify how many records to generate and select the locale for region-appropriate formatting." },
      { name: "Export the data", text: "Click 'Generate' and download or copy the fake data as JSON, CSV, or SQL for use in your project." }
    ],
    useCases: [
      "Seeding a development database with realistic-looking test records",
      "Populating UI mockups and prototypes with plausible user data",
      "Testing form validation and data processing with varied input formats",
      "Creating demo accounts for sales demonstrations without using real user data"
    ],
    relatedSlugs: ["uuid-generator", "password-generator", "lorem-ipsum"]
  },
  { slug: "placeholder-image", name: "Placeholder Image Generator", description: "Generate placeholder images of any size with custom colors and text.", category: "generator", icon: "🖼️", keywords: ["placeholder image", "dummy image", "image placeholder", "test image"], subcategory: "design",
    longDescription: "Placeholder Image Generator creates on-demand dummy images at any size, with customizable background colors, text overlays, and font styles. Use them during prototyping and development to fill image slots before real assets are available — no third-party API or internet dependency required.",
    faqs: [
      { question: "Can I set custom dimensions for each placeholder?", answer: "Yes — enter any width and height in pixels to generate a placeholder at that exact size. Common presets for thumbnails, hero images, and avatars are also available as quick shortcuts." },
      { question: "Can I add text to the placeholder image?", answer: "Yes — by default the image dimensions are printed as the text label. You can override this with any custom text, such as 'Product Image', 'Hero Banner', or 'Coming Soon'." },
      { question: "What formats can I download the placeholder in?", answer: "Generated placeholders can be downloaded as PNG or used as a URL-based image source (useful for embedding in HTML without downloading the file first)." }
    ],
    howToSteps: [
      { name: "Set the image dimensions", text: "Enter the width and height in pixels for your placeholder image, or choose a preset size." },
      { name: "Customize colors and text", text: "Choose a background color and text color, and optionally enter custom label text to display on the placeholder." },
      { name: "Download or use the URL", text: "Click 'Generate' to download the PNG or copy the image URL to embed directly in your HTML or design file." }
    ],
    useCases: [
      "Filling image placeholders during website or app prototyping before real photos are ready",
      "Creating dummy product images for e-commerce mockups and demos",
      "Adding visual structure to wireframes with size-accurate placeholder images",
      "Testing image loading, lazy loading, and responsive image behavior in development"
    ],
    relatedSlugs: ["image-resizer", "favicon-generator", "qr-code-generator"]
  },
  { slug: "invoice-generator", name: "Invoice Generator", description: "Create professional invoices that you can print or save as PDF.", category: "generator", icon: "🧾", keywords: ["invoice generator", "invoice maker", "bill generator", "receipt maker"], subcategory: "content",
    longDescription: "Invoice Generator lets you create clean, professional invoices in minutes — add your business details, client info, line items with quantities and prices, tax rates, and notes, then print directly or export as a PDF. No account or subscription required; everything runs in your browser.",
    faqs: [
      { question: "Can I save invoices and reuse them for recurring clients?", answer: "Your most recent invoice data is saved to browser local storage, allowing you to quickly update and reissue invoices for the same client without re-entering all the details from scratch." },
      { question: "Does the invoice calculate tax automatically?", answer: "Yes — enter your tax rate as a percentage and the tool calculates the tax amount and updates the total automatically as you modify line items." },
      { question: "Can I add my company logo to the invoice?", answer: "Yes — upload your logo image and it will appear in the header of the invoice for a professional branded appearance." }
    ],
    howToSteps: [
      { name: "Fill in your business and client details", text: "Enter your company name, address, and contact info, then add your client's details at the top of the invoice." },
      { name: "Add line items and set tax rate", text: "Add each product or service with its description, quantity, and unit price. Enter your tax rate percentage." },
      { name: "Print or export as PDF", text: "Click 'Print' to send to a printer, or use your browser's 'Save as PDF' option to download a digital copy." }
    ],
    useCases: [
      "Freelancers generating professional invoices for client projects",
      "Small business owners billing customers for products or services",
      "Contractors creating quick invoices for one-time jobs",
      "Sole traders needing a simple invoicing solution without accounting software"
    ],
    relatedSlugs: ["receipt-generator", "privacy-policy-generator", "email-signature-generator"]
  },
  { slug: "credit-card-validator", name: "Credit Card Validator", description: "Validate credit card numbers using the Luhn algorithm.", category: "generator", icon: "💳", keywords: ["credit card validator", "luhn algorithm", "card number check", "cc validator"], subcategory: "security",
    longDescription: "Credit Card Validator checks whether any card number passes the Luhn algorithm checksum — the mathematical formula used by all major card issuers to detect typos and invalid numbers. It also identifies the card network (Visa, Mastercard, Amex, Discover) from the number prefix.",
    faqs: [
      { question: "What is the Luhn algorithm?", answer: "The Luhn algorithm is a simple checksum formula used to validate credit card numbers. It works by doubling every second digit from the right, summing all digits, and checking whether the total is divisible by 10. A valid card number always passes this check." },
      { question: "Does a valid Luhn checksum mean the card is real and active?", answer: "No — passing the Luhn check only means the number is mathematically valid in format. It does not verify that the card account exists, has funds, or isn't expired. Real authorization requires a payment processor." },
      { question: "Can I use this to validate test card numbers?", answer: "Yes — this is a common use case for developers testing payment integrations. Enter test card numbers (like Stripe's 4242 4242 4242 4242) to verify they pass Luhn validation before using them in tests." }
    ],
    howToSteps: [
      { name: "Enter the card number", text: "Type or paste the credit card number you want to validate. Spaces and dashes are ignored automatically." },
      { name: "Run the validation", text: "Click 'Validate' to check the number against the Luhn algorithm and identify the card network." },
      { name: "Review the result", text: "See whether the number is mathematically valid, which card network it belongs to (Visa, Mastercard, Amex, etc.), and any format issues." }
    ],
    useCases: [
      "Developers validating credit card inputs on payment forms before submitting to a processor",
      "Testing payment integrations with known valid and invalid test card numbers",
      "Verifying that manually transcribed card numbers don't contain typos",
      "Learning how the Luhn algorithm works with real-world examples"
    ],
    relatedSlugs: ["password-strength", "hash-generator", "fake-data-generator"]
  },
  { slug: "emoji-picker", name: "Emoji Picker", description: "Browse, search, and copy emojis organized by category.", category: "generator", icon: "😀", keywords: ["emoji picker", "emoji search", "copy emoji", "emoji list"], subcategory: "content",
    longDescription: "Emoji Picker provides a fast, searchable library of all Unicode emojis organized by category — smileys, animals, food, travel, objects, symbols, and flags. Search by name or keyword, click to copy to your clipboard, and quickly find the perfect emoji for any message, document, or post.",
    faqs: [
      { question: "How many emojis are available?", answer: "The picker includes all emojis from the latest Unicode standard — over 3,600 emojis across 10 categories including newer additions like multi-person family groups and diverse skin tone variations." },
      { question: "Can I search for an emoji by name or description?", answer: "Yes — type any keyword into the search field (such as 'fire', 'heart', 'thumbs', or 'star') and the picker instantly filters to show matching emojis." },
      { question: "Do emojis look the same on all devices?", answer: "Emoji appearance varies between operating systems and platforms — the same emoji can look different on iOS, Android, Windows, and macOS. The picker displays the emoji as rendered by your current device." }
    ],
    howToSteps: [
      { name: "Browse or search for an emoji", text: "Scroll through categories to discover emojis, or type a keyword in the search field to filter immediately." },
      { name: "Click to copy", text: "Click any emoji to copy it instantly to your clipboard." },
      { name: "Paste where needed", text: "Paste the copied emoji into any text field, document, email, code comment, or social media post." }
    ],
    useCases: [
      "Content creators finding and inserting emojis into social media posts",
      "Developers adding emoji characters to app interfaces or commit messages",
      "Writers adding visual emphasis or emotion to blog posts and newsletters",
      "Anyone needing quick access to a specific emoji without digging through an OS keyboard"
    ],
    relatedSlugs: ["fancy-text", "instagram-fonts", "unicode-lookup"]
  },
  { slug: "random-color", name: "Random Color Generator", description: "Generate random colors with HEX, RGB, and HSL values.", category: "generator", icon: "🌈", keywords: ["random color", "color generator", "color randomizer"], subcategory: "design",
    longDescription: "Random Color Generator produces random colors on demand and instantly displays their HEX, RGB, and HSL values. Lock individual channels to generate variations of a specific hue, or click repeatedly to discover unexpected color combinations for design inspiration and mood board creation.",
    faqs: [
      { question: "Can I generate colors within a specific hue range?", answer: "Yes — use the hue lock feature to pin the hue slider to a specific range and generate random shades and tints within that color family." },
      { question: "Can I copy the color in different formats?", answer: "Yes — the HEX (#RRGGBB), RGB (rgb(R, G, B)), and HSL (hsl(H, S%, L%)) values are all displayed and each has a one-click copy button." },
      { question: "Can I generate a palette of multiple random colors at once?", answer: "Yes — use the palette mode to generate 3, 5, or more random colors simultaneously, displayed as swatches you can copy individually or export together." }
    ],
    howToSteps: [
      { name: "Click Generate", text: "Click the 'Generate' button or press the spacebar to produce a new random color displayed as a full-screen swatch." },
      { name: "Copy the color value", text: "Click the HEX, RGB, or HSL value to copy it in your preferred format." },
      { name: "Lock channels for variations", text: "Lock the hue slider to generate random lightness and saturation variations of the same color family." }
    ],
    useCases: [
      "Finding unique color inspiration for a design project",
      "Quickly generating test background colors during UI development",
      "Creating random color swatches for art projects and mood boards",
      "Discovering unexpected color combinations for brand exploration"
    ],
    relatedSlugs: ["color-palette-generator", "color-converter", "css-gradient-generator"]
  },
  { slug: "htaccess-generator", name: ".htaccess Generator", description: "Generate Apache .htaccess rules for redirects, security, and caching.", category: "generator", icon: "⚙️", keywords: ["htaccess", "apache config", "redirect rules", "url rewrite"], subcategory: "code",
    longDescription: ".htaccess Generator creates valid Apache configuration snippets for the most common web server tasks — URL redirects, HTTPS enforcement, security headers, browser caching rules, gzip compression, and access control — through a guided interface, without needing to write Apache directives from scratch.",
    faqs: [
      { question: "What is an .htaccess file?", answer: "An .htaccess file is a directory-level Apache configuration file that controls URL rewriting, access control, MIME types, caching, compression, and security headers for the directory it resides in and its subdirectories." },
      { question: "Where do I place the .htaccess file?", answer: "The .htaccess file goes in the root directory of your website (the public_html or www folder). Rules apply to all files and subdirectories within that folder." },
      { question: "Will this work on Nginx servers?", answer: "No — .htaccess is specific to Apache web servers. Nginx uses a different configuration syntax. If your host uses Nginx, use a server block configuration instead." }
    ],
    howToSteps: [
      { name: "Select the rules you need", text: "Check the options for the Apache directives you want to generate — such as HTTPS redirect, www to non-www, cache headers, or security headers." },
      { name: "Configure each rule", text: "Fill in any required values such as redirect source and destination URLs, cache durations, or allowed IP addresses." },
      { name: "Copy and upload your .htaccess", text: "Copy the generated configuration and paste it into your existing .htaccess file or create a new one in your site's root directory." }
    ],
    useCases: [
      "Forcing HTTPS on all pages of a website by redirecting HTTP requests",
      "Setting browser cache expiry headers to improve page load speed",
      "Blocking specific IP addresses or requiring HTTP authentication on a directory",
      "Setting up clean URL rewrites to remove file extensions like .php or .html"
    ],
    relatedSlugs: ["robots-txt-generator", "meta-tag-generator", "privacy-policy-generator"]
  },
  { slug: "robots-txt-generator", name: "Robots.txt Generator", description: "Generate robots.txt files to control search engine crawling.", category: "generator", icon: "🤖", keywords: ["robots.txt", "robot exclusion", "crawl control", "seo robots"], subcategory: "code",
    longDescription: "Robots.txt Generator creates a properly formatted robots.txt file for your website through a visual interface — specify which crawlers to allow or block, set crawl delay, and define which directories to exclude from indexing. Download the finished file and upload it to your website's root.",
    faqs: [
      { question: "What is a robots.txt file?", answer: "Robots.txt is a text file in your website's root directory that tells search engine crawlers which pages and directories they are allowed or not allowed to crawl and index, following the Robots Exclusion Protocol." },
      { question: "Does robots.txt prevent pages from appearing in search results?", answer: "Robots.txt controls crawling, not indexing. If a page is blocked in robots.txt but has external links pointing to it, Google may still index the URL (showing it without a description). Use a noindex meta tag or header to prevent indexing." },
      { question: "Should I block any directories by default?", answer: "Common directories to block include admin panels (/admin, /wp-admin), staging environments, private API endpoints, and any pages with duplicate or thin content. Never block CSS and JS files — Google needs them to render and understand your pages." }
    ],
    howToSteps: [
      { name: "Configure crawl permissions", text: "Select which user-agents (Googlebot, Bingbot, all bots) to configure rules for, and set their allowed and disallowed paths." },
      { name: "Add your sitemap URL", text: "Enter your XML sitemap URL to include a Sitemap directive, helping search engines discover your sitemap." },
      { name: "Download and upload the file", text: "Copy the generated robots.txt content and upload it to the root of your website (e.g., yoursite.com/robots.txt)." }
    ],
    useCases: [
      "Blocking search engines from crawling admin, login, or staging pages",
      "Specifying a sitemap URL for faster search engine discovery",
      "Setting crawl delay rules to prevent overly aggressive bot crawling",
      "Allowing all bots to crawl all content on a newly launched site"
    ],
    relatedSlugs: ["htaccess-generator", "meta-tag-generator", "google-serp-preview"]
  },
  { slug: "privacy-policy-generator", name: "Privacy Policy Generator", description: "Generate a basic privacy policy for your website.", category: "generator", icon: "📜", keywords: ["privacy policy", "gdpr", "cookie policy", "legal generator"], subcategory: "content",
    longDescription: "Privacy Policy Generator creates a customizable privacy policy document for your website or app, covering data collection practices, cookie usage, third-party services, user rights, and contact information. Generate a GDPR and CCPA-aware policy tailored to your specific business in minutes.",
    faqs: [
      { question: "Do I legally need a privacy policy?", answer: "Yes — if your website collects any personal data (including email addresses, analytics data, or cookies), GDPR (EU), CCPA (California), and many other regulations require you to publish a privacy policy disclosing how that data is used." },
      { question: "Is the generated policy legally binding?", answer: "The generator produces a solid template based on common legal requirements, but it is not legal advice. Websites handling sensitive data or serving regulated markets should have a qualified attorney review the policy." },
      { question: "What information do I need to generate the policy?", answer: "You need your company name, website URL, contact email, a description of what personal data you collect, which third-party services you use (Google Analytics, payment processors, etc.), and your governing law jurisdiction." }
    ],
    howToSteps: [
      { name: "Enter your business information", text: "Provide your company name, website URL, and contact email address." },
      { name: "Configure your data practices", text: "Answer questions about what data you collect, which analytics and advertising tools you use, and whether you share data with third parties." },
      { name: "Copy and publish your policy", text: "Copy the generated policy text and publish it on a dedicated Privacy Policy page on your website, linked from your footer." }
    ],
    useCases: [
      "Website owners needing a privacy policy before launching to the public",
      "App developers publishing a policy required by the App Store and Google Play",
      "SaaS founders creating a policy to include in their terms acceptance flow",
      "Bloggers and content creators disclosing their use of analytics and affiliate links"
    ],
    relatedSlugs: ["htaccess-generator", "robots-txt-generator", "nda-generator"]
  },

  // ── New Generators ──────────────────────────────────────────
  { slug: "receipt-generator", name: "Receipt Generator", description: "Create professional receipts for transactions and payments.", category: "generator", icon: "🧾", keywords: ["receipt generator", "receipt maker", "payment receipt", "transaction receipt"], subcategory: "content",
    longDescription: "Receipt Generator creates professional payment receipts for any transaction — add the seller and buyer details, itemized purchases, payment method, and total, then print or export as a PDF. It's perfect for freelancers, small sellers, and anyone who needs a receipt record outside of a formal point-of-sale system.",
    faqs: [
      { question: "How is a receipt different from an invoice?", answer: "An invoice is sent before payment to request payment for goods or services. A receipt is issued after payment as proof that the transaction was completed. This tool generates post-payment receipts." },
      { question: "Can I add multiple items with different prices to a receipt?", answer: "Yes — add as many line items as needed. Each item shows its description, quantity, unit price, and line total, with the subtotal, tax, and grand total calculated automatically." },
      { question: "Can I include a payment method on the receipt?", answer: "Yes — select the payment method (cash, card, bank transfer, etc.) and enter optional reference numbers like the last four digits of a card or a transaction ID." }
    ],
    howToSteps: [
      { name: "Enter seller and buyer information", text: "Fill in the business name and address for the seller and the buyer's name or reference." },
      { name: "Add purchased items", text: "List each purchased item with its description, quantity, and price." },
      { name: "Download or print the receipt", text: "Click 'Download Receipt' to save as a PDF, or use your browser's print function to print a paper copy." }
    ],
    useCases: [
      "Freelancers and gig workers providing proof of payment to clients",
      "Small market and craft fair sellers issuing receipts for cash purchases",
      "Landlords generating rent payment receipts for tenants",
      "Event organizers providing admission or donation receipts to attendees"
    ],
    relatedSlugs: ["invoice-generator", "privacy-policy-generator", "email-signature-generator"]
  },
  { slug: "email-signature-generator", name: "Email Signature Generator", description: "Create professional HTML email signatures with your info and social links.", category: "generator", icon: "✉️", keywords: ["email signature", "signature generator", "html signature", "professional signature"], subcategory: "content",
    longDescription: "Email Signature Generator builds a clean, professional HTML email signature with your name, title, company, contact details, and social media links — styled with your brand colors. Copy the HTML directly into Gmail, Outlook, Apple Mail, or any other email client with a few simple steps.",
    faqs: [
      { question: "How do I add the generated signature to Gmail?", answer: "In Gmail, go to Settings > See All Settings > Signature and click 'Create New'. Switch to HTML mode, paste the generated code, save, and your new signature is live." },
      { question: "Will my signature display correctly in all email clients?", answer: "The generator uses email-safe inline CSS and table-based layout for maximum compatibility across Gmail, Outlook, Apple Mail, and mobile clients. Avoid complex CSS or web fonts for the widest compatibility." },
      { question: "Can I add social media icons to the signature?", answer: "Yes — enter your profile URLs for LinkedIn, Twitter/X, GitHub, and other platforms, and the generator adds styled icon links to your signature automatically." }
    ],
    howToSteps: [
      { name: "Fill in your contact details", text: "Enter your name, job title, company, phone number, email, and website URL." },
      { name: "Add social links and branding", text: "Enter your social media URLs, choose your brand color, and optionally upload a headshot or company logo." },
      { name: "Copy and install the signature", text: "Copy the generated HTML and paste it into your email client's signature settings." }
    ],
    useCases: [
      "Professionals creating a consistent, branded email signature for all outbound emails",
      "Sales and marketing teams standardizing signatures across an organization",
      "Freelancers and consultants adding credibility with a polished signature",
      "Job seekers updating their email signature when transitioning to a new role"
    ],
    relatedSlugs: ["invoice-generator", "meta-tag-generator", "privacy-policy-generator"]
  },
  { slug: "nda-generator", name: "NDA Generator", description: "Generate basic non-disclosure agreement templates.", category: "generator", icon: "📋", keywords: ["nda generator", "non disclosure agreement", "confidentiality agreement", "nda template"], subcategory: "content",
    longDescription: "NDA Generator produces a customizable non-disclosure agreement template suitable for protecting confidential information in business discussions, contractor relationships, and partnership negotiations. Fill in the parties, scope of confidential information, jurisdiction, and term length to generate a document ready for review and signing.",
    faqs: [
      { question: "What is a non-disclosure agreement (NDA)?", answer: "An NDA is a legally binding contract in which the parties agree to keep certain confidential information secret and not disclose it to third parties. It is commonly used before sharing business ideas, proprietary data, or trade secrets." },
      { question: "Is the generated NDA legally enforceable?", answer: "The generated NDA is based on standard legal provisions, but enforceability depends on your jurisdiction, the specific terms, and whether it is signed by both parties. Always have a qualified attorney review any NDA before relying on it." },
      { question: "What is the difference between a mutual and a one-way NDA?", answer: "A one-way (unilateral) NDA protects information shared by one party only. A mutual (bilateral) NDA protects information shared in both directions, which is appropriate when both parties will be sharing confidential information with each other." }
    ],
    howToSteps: [
      { name: "Enter the parties and details", text: "Provide the names, roles (disclosing party / receiving party), and business details of all parties to the agreement." },
      { name: "Configure the agreement terms", text: "Select whether it is mutual or one-way, define the scope of confidential information, choose the jurisdiction, and set the agreement duration." },
      { name: "Download and review", text: "Copy or download the generated NDA, have it reviewed by a legal professional, then share it with all parties for signature." }
    ],
    useCases: [
      "Protecting confidential business ideas before pitching to investors or partners",
      "Establishing confidentiality with contractors and freelancers working on sensitive projects",
      "Creating a paper trail before sharing proprietary information in business negotiations",
      "Formalizing confidentiality expectations between co-founders of a new venture"
    ],
    relatedSlugs: ["privacy-policy-generator", "invoice-generator", "receipt-generator"]
  },
  { slug: "lorem-picsum", name: "Random Image Generator", description: "Generate random placeholder photos with custom dimensions.", category: "generator", icon: "🖼️", keywords: ["random image", "placeholder photo", "stock photo", "random picture"], subcategory: "design",
    longDescription: "Random Image Generator serves random high-quality photographs at any dimensions you specify, making it perfect for prototyping and design mockups that need realistic image placeholders rather than gray boxes. Generate shareable image URLs or download images directly for use in design tools.",
    faqs: [
      { question: "What kinds of photos does the random image generator serve?", answer: "The generator provides a curated collection of high-quality, royalty-free photographs covering a wide range of subjects — nature, architecture, people, objects, and abstract scenes — suitable for design mockups." },
      { question: "Can I get the same image repeatedly for a consistent mockup?", answer: "Yes — each image has a unique ID. Once you find an image you like, note its ID and use it to generate the same image at different sizes for consistent use throughout your design." },
      { question: "Are the images free to use in commercial projects?", answer: "The images are provided for design and development prototyping purposes. For production use in commercial projects, verify the licensing of any specific image you plan to use." }
    ],
    howToSteps: [
      { name: "Set your image dimensions", text: "Enter the desired width and height in pixels for the placeholder photo." },
      { name: "Generate a random image", text: "Click 'Generate' to get a random high-quality photo at your specified dimensions." },
      { name: "Use or download the image", text: "Copy the image URL to use as a src in HTML, or click 'Download' to save the image to your device." }
    ],
    useCases: [
      "Populating design mockups with realistic photography instead of gray boxes",
      "Generating random hero images for website prototypes and wireframes",
      "Adding visual variety to front-end component development and testing",
      "Creating dummy gallery content for CMS and portfolio template demos"
    ],
    relatedSlugs: ["placeholder-image", "image-resizer", "social-image-resizer"]
  },
  { slug: "gradient-background", name: "Gradient Background Generator", description: "Create beautiful gradient backgrounds with CSS code export.", category: "generator", icon: "🌈", keywords: ["gradient background", "css gradient", "background generator", "mesh gradient"], subcategory: "design",
    longDescription: "Gradient Background Generator lets you design stunning linear, radial, and conic gradients with an interactive visual editor — add multiple color stops, adjust angles and positions, and export the generated CSS background code ready to paste into your stylesheet. Preview changes in real time on a full-screen canvas.",
    faqs: [
      { question: "What types of gradients can I create?", answer: "The generator supports linear gradients (straight transitions between colors at any angle), radial gradients (circular color transitions from a center point), and conic gradients (rotating color transitions around a center point, useful for pie charts and color wheels)." },
      { question: "Can I add more than two color stops?", answer: "Yes — add as many color stops as you want at any position along the gradient. This lets you create complex multi-color transitions." },
      { question: "Can I export the gradient for use in CSS frameworks like Tailwind?", answer: "Yes — the generator outputs a standard CSS background property value that works in any CSS-based project, including Tailwind using the JIT arbitrary value syntax." }
    ],
    howToSteps: [
      { name: "Choose your gradient type", text: "Select linear, radial, or conic gradient and set the direction or angle." },
      { name: "Add and adjust color stops", text: "Click 'Add Color Stop' to add colors at different positions. Drag stops to reposition them along the gradient." },
      { name: "Copy the CSS code", text: "Click 'Copy CSS' to copy the complete background CSS declaration for use in your stylesheet." }
    ],
    useCases: [
      "Creating hero section backgrounds for landing pages and portfolios",
      "Generating gradient overlays for images and card components",
      "Designing branded gradient backgrounds for social media graphics",
      "Building CSS gradient animations and dynamic background effects"
    ],
    relatedSlugs: ["css-gradient-generator", "color-palette-generator", "random-color"]
  },
  { slug: "unicode-lookup", name: "Unicode Character Lookup", description: "Search and browse Unicode characters by name, code point, or category.", category: "generator", icon: "🔣", keywords: ["unicode", "character lookup", "unicode search", "special characters"], subcategory: "content",
    longDescription: "Unicode Character Lookup lets you search the entire Unicode character database by name, code point (U+XXXX), or category to find any special character, symbol, script, or emoji. Copy the character itself, its HTML entity, CSS escape, or code point value for use in documents, code, and web pages.",
    faqs: [
      { question: "How many Unicode characters are in the database?", answer: "The Unicode standard includes over 149,000 characters across 154 scripts, covering every modern and historical writing system, mathematical symbols, emojis, technical symbols, and much more." },
      { question: "What formats can I copy a Unicode character in?", answer: "You can copy the raw character (for direct paste), the HTML decimal entity (&#NNNNN;), the HTML hex entity (&#xHHHH;), the CSS escape (\\HHHH), or the JavaScript/code-point escape (\\uHHHH)." },
      { question: "Can I search for characters by their Unicode block or script?", answer: "Yes — filter the lookup by Unicode block (e.g., Latin Extended, Arabic, Arrows, Mathematical Operators) or script to browse entire character categories." }
    ],
    howToSteps: [
      { name: "Search for a character", text: "Type a character name (e.g., 'em dash'), a code point (U+2014), or a symbol directly into the search field." },
      { name: "Browse the results", text: "Click any character in the results to see its full details including name, category, Unicode block, and code point." },
      { name: "Copy in your preferred format", text: "Click the copy button for the raw character, HTML entity, CSS escape, or code point value." }
    ],
    useCases: [
      "Finding the correct Unicode code point for a symbol or special character",
      "Copying HTML entities for special characters used in web content",
      "Developers looking up Unicode escapes for use in string literals",
      "Typography enthusiasts browsing character sets for different scripts and symbols"
    ],
    relatedSlugs: ["emoji-picker", "fancy-text", "html-entity-encoder"]
  },
  { slug: "barcode-generator", name: "Barcode Generator", description: "Generate barcodes in various formats: Code128, EAN-13, UPC-A, and more.", category: "generator", icon: "📊", keywords: ["barcode generator", "ean13", "upc", "code128"], subcategory: "content",
    longDescription: "Barcode Generator creates scannable barcodes in the most common 1D formats — Code128, EAN-13, EAN-8, UPC-A, UPC-E, Code39, and ITF — entirely within your browser. Enter your data, choose a format, customize the size and colors, and download a print-ready PNG or SVG barcode image.",
    faqs: [
      { question: "Which barcode format should I use?", answer: "For retail product barcodes, use EAN-13 (international) or UPC-A (North America). For internal inventory labels and general data encoding, Code128 is the most versatile. Code39 works well for simple alphanumeric identifiers." },
      { question: "Can I generate a barcode for any text or number?", answer: "Yes — most formats (Code128, Code39) accept any combination of letters, numbers, and symbols. EAN-13 and UPC-A require numeric-only input of specific lengths following the respective standard." },
      { question: "What is the difference between a barcode and a QR code?", answer: "Traditional barcodes (1D) encode data in a series of parallel lines readable only horizontally. QR codes (2D) encode data in a grid of pixels readable in any orientation and can store significantly more data." }
    ],
    howToSteps: [
      { name: "Enter your barcode data", text: "Type the number or text you want to encode. The generator validates the input format for the selected barcode type." },
      { name: "Choose the barcode format", text: "Select Code128, EAN-13, UPC-A, or another supported format from the format dropdown." },
      { name: "Download the barcode", text: "Click 'Generate' and download your barcode as a PNG or SVG for printing on labels, packaging, or documents." }
    ],
    useCases: [
      "Creating product barcodes for retail packaging and inventory management",
      "Generating warehouse and logistics labels with Code128 barcodes",
      "Adding scannable identifiers to printed materials for event ticketing",
      "Producing barcodes for library, asset tracking, or membership card systems"
    ],
    relatedSlugs: ["qr-code-generator", "uuid-generator", "fake-data-generator"]
  },
  { slug: "avatar-generator", name: "Avatar Generator", description: "Generate unique geometric avatars from any text or name.", category: "generator", icon: "👤", keywords: ["avatar generator", "profile picture", "identicon", "geometric avatar"], subcategory: "design",
    longDescription: "Avatar Generator creates unique, deterministic geometric avatar images from any text input — such as a username, email, or name. The same input always produces the same avatar, making it ideal for default profile pictures in apps and websites where users haven't uploaded their own photo.",
    faqs: [
      { question: "Are the generated avatars truly unique per input?", answer: "Yes — the generator uses a hashing algorithm to derive colors and geometric patterns from the input text, so each unique string produces a visually distinct avatar. The same input always produces the same avatar." },
      { question: "What styles of avatar are available?", answer: "The generator offers several styles including geometric identicons (grid patterns), abstract shapes, ring avatars, and pixel art avatars — all procedurally generated from your input text." },
      { question: "What size and format can I download the avatar in?", answer: "Download avatars as PNG at sizes from 64×64 up to 512×512 pixels. SVG export is also available for perfect scalability at any size." }
    ],
    howToSteps: [
      { name: "Enter a name or identifier", text: "Type a username, full name, email address, or any text to use as the seed for avatar generation." },
      { name: "Choose an avatar style", text: "Select from geometric, abstract, pixel, or ring avatar styles and customize the color scheme if desired." },
      { name: "Download the avatar", text: "Click 'Download' to save the avatar as a PNG or SVG at your chosen size." }
    ],
    useCases: [
      "Generating default profile pictures for new user accounts in a web app",
      "Creating consistent avatar identifiers for anonymous user sessions",
      "Providing visual variety in user lists and comment sections without requiring profile photos",
      "Generating unique artwork from text-based seeds for design exploration"
    ],
    relatedSlugs: ["placeholder-image", "random-color", "color-palette-generator"]
  },
  // ── New (19) ──────────────────────────────────────────
  { slug: "username-generator", name: "Username Generator", description: "Generate unique, creative usernames for social media and online accounts.", category: "generator", icon: "👤", keywords: ["username generator", "random username", "display name", "online name"], subcategory: "content",
    longDescription: "Generate memorable, creative usernames by combining adjectives, nouns, and optional number suffixes using multiple styles — gamer tags, professional handles, cute usernames, and random combos. Instantly produce dozens of options and check character count to ensure they fit platform limits.",
    faqs: [
      { question: "What username styles are available?", answer: "Styles include Gamer (e.g. ShadowBladeX), Professional (e.g. alex_digital), Cute (e.g. fluffybunny99), and Random combining random adjectives and nouns." },
      { question: "Can I set a maximum length?", answer: "Yes — set a maximum character limit to filter results to usernames that fit within specific platform constraints like Twitter's 15-character limit." }
    ],
    howToSteps: [
      { name: "Choose a style", text: "Select Gamer, Professional, Cute, or Random to define the tone of the generated usernames." },
      { name: "Set preferences", text: "Optionally add a keyword seed and set the maximum character length." },
      { name: "Generate and pick", text: "Click Generate to produce a list of usernames and click any to copy it." }
    ],
    useCases: ["Creating new social media account handles", "Generating gamer tags for online games", "Building placeholder user data for app development", "Finding available username ideas when your first choice is taken"],
    relatedSlugs: ["fake-data-generator", "password-generator", "uuid-generator"]
  },
  { slug: "slug-id-generator", name: "Short ID Generator", description: "Generate short, unique IDs suitable for URLs, tokens, and identifiers.", category: "generator", icon: "🪪", keywords: ["short id", "nanoid", "unique id", "short token", "url id"], subcategory: "code",
    longDescription: "Generate compact, URL-safe unique identifiers using customisable character sets and lengths. Ideal as NanoID-style alternatives to UUIDs when shorter identifiers are needed in URLs, database keys, share links, or API tokens. Configure length, alphabet, and batch size.",
    faqs: [
      { question: "How unique are short IDs compared to UUIDs?", answer: "Short IDs are statistically unique within their probability space — a 21-character alphanumeric ID has approximately 2^126 possible values, similar to UUID v4. Shorter lengths reduce collision resistance, so match length to your use case's scale." },
      { question: "What character set is used by default?", answer: "The default alphabet is URL-safe: A-Z, a-z, 0-9, plus underscore and hyphen. You can restrict to alphanumeric only or define a custom alphabet." }
    ],
    howToSteps: [
      { name: "Set ID length", text: "Choose the number of characters for each generated ID — 8, 12, 21, or a custom value." },
      { name: "Choose character set", text: "Select alphanumeric, URL-safe, or numeric-only alphabet." },
      { name: "Generate and copy", text: "Click Generate to produce one or more IDs and copy them to the clipboard." }
    ],
    useCases: ["Generating short share link tokens for URL shorteners", "Creating compact database record identifiers", "Producing session tokens for web applications", "Building human-readable but unique IDs for public-facing URLs"],
    relatedSlugs: ["uuid-generator", "password-generator", "hash-generator"]
  },
  { slug: "color-name-generator", name: "Color Name Generator", description: "Generate creative, evocative names for any hex color.", category: "generator", icon: "🎨", keywords: ["color name", "colour name generator", "hex color name", "paint color names"], subcategory: "design",
    longDescription: "Find or invent a creative, descriptive name for any hex color. Enter a hex code to retrieve its nearest named color from a comprehensive database, or generate evocative creative names inspired by nature, moods, materials, and palettes — perfect for design systems, paint collections, and brand guidelines.",
    faqs: [
      { question: "How are color names generated?", answer: "The tool matches your hex code to the nearest named color in a database of 1500+ named colors using perceptual color distance (CIEDE2000). It also generates creative alternative names inspired by the hue, saturation, and lightness properties." },
      { question: "Can I use this for a design system token?", answer: "Yes — use the generated name as a design token label (e.g. 'dusty-rose' or 'ocean-slate') for semantic color naming in your style guide or CSS custom properties." }
    ],
    howToSteps: [
      { name: "Enter a hex color", text: "Type or paste a hex color code (e.g. #3a7bd5) into the color input." },
      { name: "Get names", text: "The tool shows the nearest standard color name and a list of creative alternative names." },
      { name: "Copy your favourite", text: "Click any name to copy it for use in your design system or documentation." }
    ],
    useCases: ["Naming colors in a brand design token system", "Finding evocative names for paint or product color ranges", "Labelling custom colors in a Figma or Sketch library", "Creating named color variables for CSS and design systems"],
    relatedSlugs: ["color-palette-generator", "random-color", "gradient-generator"]
  },
  { slug: "lorem-ipsum-json", name: "Lorem Ipsum JSON Generator", description: "Generate realistic placeholder JSON data for prototyping and testing.", category: "generator", icon: "📦", keywords: ["placeholder json", "dummy json", "mock data json", "fake json"], subcategory: "code",
    longDescription: "Generate structured placeholder JSON objects and arrays with realistic fake data — names, emails, addresses, dates, numbers, booleans, and nested objects. Customise the schema by specifying field names and their types, then generate any number of records for API mocking, UI prototyping, and unit test fixtures.",
    faqs: [
      { question: "Can I define my own data schema?", answer: "Yes — specify field names and choose their data type (string, number, boolean, email, date, name, address, etc.) to generate JSON that matches your API's expected structure." },
      { question: "What is the maximum number of records?", answer: "You can generate up to 100 records at once. For larger datasets, regenerate multiple times and merge the output." }
    ],
    howToSteps: [
      { name: "Define your schema", text: "Add fields with names and data types that match your target data model." },
      { name: "Set record count", text: "Choose how many JSON objects to generate." },
      { name: "Copy or download", text: "Copy the JSON to clipboard or download it as a .json file for use in your project." }
    ],
    useCases: ["Creating mock API response payloads for frontend development", "Generating test fixture data for unit and integration tests", "Populating prototype databases with realistic fake records", "Demonstrating API structures in documentation"],
    relatedSlugs: ["fake-data-generator", "json-formatter", "mock-api-generator"]
  },
  { slug: "mock-api-generator", name: "Mock API Response Generator", description: "Generate complete mock REST API responses with headers and status codes.", category: "generator", icon: "🔌", keywords: ["mock api", "fake api response", "api mock", "rest mock"], subcategory: "code",
    longDescription: "Build realistic mock REST API responses complete with HTTP status codes, response headers, and JSON body payloads. Select from common response patterns (success, paginated list, error, validation failure) or customise your own. Copy as a raw HTTP response or as a JavaScript fetch mock for use in tests.",
    faqs: [
      { question: "What response patterns are available?", answer: "Pre-built patterns include 200 Success, 201 Created, 400 Bad Request with validation errors, 401 Unauthorized, 404 Not Found, 422 Unprocessable Entity, and 500 Internal Server Error." },
      { question: "Can I customise the response body?", answer: "Yes — edit the JSON body directly in the editor to match your API's exact response schema before copying." }
    ],
    howToSteps: [
      { name: "Choose a response pattern", text: "Select a common HTTP response type from the dropdown to load a template." },
      { name: "Edit the response body", text: "Customise the JSON payload, status code, and headers to match your API spec." },
      { name: "Copy the mock", text: "Copy as a raw response or as a JavaScript fetch mock for use in your test suite." }
    ],
    useCases: ["Mocking API responses for frontend development without a backend", "Creating test stubs for unit and integration tests", "Documenting API response formats with realistic examples", "Generating error response templates for error-handling UI development"],
    relatedSlugs: ["lorem-ipsum-json", "fake-data-generator", "api-key-generator"]
  },
  { slug: "css-shadow-palette", name: "CSS Shadow Palette Generator", description: "Generate layered box-shadow palettes for depth and elevation effects.", category: "generator", icon: "🌑", keywords: ["css shadow", "box shadow", "shadow palette", "css elevation", "drop shadow"], subcategory: "design",
    longDescription: "Generate a complete set of CSS box-shadow values for multiple elevation levels — from subtle card shadows to prominent modal shadows. Customise shadow colour, blur radius, spread, and opacity for each level, then copy the full CSS custom property palette ready to paste into your stylesheet.",
    faqs: [
      { question: "How many elevation levels does the palette include?", answer: "The default palette generates 5 elevation levels (sm, md, lg, xl, 2xl) similar to Tailwind CSS's shadow scale. You can add or remove levels as needed." },
      { question: "Can I use coloured shadows?", answer: "Yes — choose any shadow colour including brand colours for coloured glow effects. The tool generates RGBA values with configurable opacity for each level." }
    ],
    howToSteps: [
      { name: "Choose a shadow colour", text: "Select the shadow colour using the colour picker — black works for neutral shadows, or use a brand hue for coloured effects." },
      { name: "Adjust the scale", text: "Modify the blur, spread, and opacity for each elevation level to match your design system." },
      { name: "Copy the CSS", text: "Copy the generated CSS custom properties to paste into your project's stylesheet." }
    ],
    useCases: ["Building a consistent elevation system for a component library", "Generating Tailwind-compatible custom shadow utilities", "Creating depth effects for card, modal, and drawer components", "Designing neumorphic or glassmorphism UI shadow palettes"],
    relatedSlugs: ["color-palette-generator", "gradient-generator", "css-gradient"]
  },
  { slug: "social-proof-generator", name: "Social Proof Generator", description: "Generate realistic testimonial and review placeholders for UI mockups.", category: "generator", icon: "⭐", keywords: ["testimonial generator", "review placeholder", "social proof", "fake review", "mockup review"], subcategory: "content",
    longDescription: "Generate realistic-looking customer testimonial and review placeholders for UI/UX mockups, landing page wireframes, and prototype demos. Produce name, avatar initials, star rating, company, role, and review text combinations that look authentic for design presentations.",
    faqs: [
      { question: "Are these real reviews?", answer: "No — all generated testimonials are fictional placeholder content for design and prototyping purposes only. They should not be presented as real customer reviews." },
      { question: "Can I customise the industry or tone?", answer: "Yes — choose from industry categories like SaaS, e-commerce, healthcare, and fintech to generate contextually appropriate testimonial language." }
    ],
    howToSteps: [
      { name: "Choose an industry", text: "Select the product category to generate contextually relevant testimonial language." },
      { name: "Set quantity and rating", text: "Choose how many testimonials to generate and the star rating range." },
      { name: "Copy or export", text: "Copy individual testimonials or export all as JSON for use in your prototype." }
    ],
    useCases: ["Populating landing page mockups with realistic testimonial content", "Creating prototype demos with plausible social proof", "Generating review placeholder data for UI component development", "Building wireframes for testimonial section layouts"],
    relatedSlugs: ["fake-data-generator", "lorem-ipsum-json", "lorem-ipsum"]
  },
  { slug: "terms-generator", name: "Terms of Service Generator", description: "Generate a basic Terms of Service document for websites and apps.", category: "generator", icon: "📜", keywords: ["terms of service", "terms generator", "tos generator", "legal template", "terms and conditions"], subcategory: "content",
    longDescription: "Generate a customisable Terms of Service document template for websites, SaaS apps, and mobile applications. Fill in your product name, company details, and jurisdiction, and receive a structured ToS covering user obligations, intellectual property, disclaimers, termination, and governing law. For reference only — consult a lawyer for binding legal documents.",
    faqs: [
      { question: "Is the generated document legally binding?", answer: "The generated document is a starting template for reference and informational purposes only. It is not a substitute for professional legal advice. Always have a qualified attorney review any legal documents before publishing." },
      { question: "What sections are included?", answer: "Sections include Acceptance of Terms, Use of Service, User Accounts, Intellectual Property, Prohibited Activities, Disclaimers, Limitation of Liability, Termination, and Governing Law." }
    ],
    howToSteps: [
      { name: "Enter your details", text: "Provide your company name, product name, website URL, contact email, and jurisdiction." },
      { name: "Customise sections", text: "Toggle optional sections like subscription terms, user-generated content, or cookie policy references." },
      { name: "Copy or download", text: "Copy the generated ToS text or download it as a markdown or plain text file." }
    ],
    useCases: ["Generating a starting-point ToS for a new SaaS product or app", "Creating placeholder legal text for a prototype or demo site", "Understanding which sections a ToS typically covers", "Drafting an initial ToS to hand off to a legal professional"],
    relatedSlugs: ["privacy-policy-generator", "license-generator", "readme-generator"]
  },
  { slug: "changelog-generator", name: "Changelog Generator", description: "Generate structured changelog entries following Keep a Changelog format.", category: "generator", icon: "📋", keywords: ["changelog", "changelog template", "release notes", "keep a changelog", "version log"], subcategory: "code",
    longDescription: "Generate structured changelog entries following the Keep a Changelog (keepachangelog.com) convention. Input your version number, release date, and a list of changes categorised as Added, Changed, Deprecated, Removed, Fixed, or Security. Output a clean markdown block ready to prepend to your CHANGELOG.md.",
    faqs: [
      { question: "What is the Keep a Changelog format?", answer: "Keep a Changelog is a widely adopted convention for organising changelog files. Each release gets a header with version number and date, followed by changes grouped into categories: Added, Changed, Deprecated, Removed, Fixed, and Security." },
      { question: "Does it follow Semantic Versioning?", answer: "Yes — the version field follows SemVer (MAJOR.MINOR.PATCH) format and the tool validates correct version number syntax." }
    ],
    howToSteps: [
      { name: "Enter version and date", text: "Type the semantic version number and select the release date." },
      { name: "Add change entries", text: "Enter change descriptions and assign each to a category (Added, Fixed, Changed, etc.)." },
      { name: "Copy the markdown", text: "Copy the formatted changelog block to prepend to your CHANGELOG.md file." }
    ],
    useCases: ["Generating release notes for open source projects", "Documenting changes for SaaS product updates", "Creating structured version history for package releases", "Maintaining a human-readable changelog for team communication"],
    relatedSlugs: ["readme-generator", "commit-message-generator", "markdown-to-html"]
  },
  { slug: "readme-generator", name: "README Generator", description: "Generate a professional README.md template for your project.", category: "generator", icon: "📖", keywords: ["readme generator", "readme template", "github readme", "project readme", "markdown readme"], subcategory: "code",
    longDescription: "Generate a comprehensive, well-structured README.md template for any software project. Fill in project name, description, tech stack, installation steps, usage examples, and contributing guidelines to produce a professional markdown file ready to push to your repository.",
    faqs: [
      { question: "What sections does the generated README include?", answer: "The template includes: Project Title & Description, Badges, Table of Contents, Features, Tech Stack, Prerequisites, Installation, Usage, API Reference, Contributing, License, and Contact sections." },
      { question: "Can I choose which sections to include?", answer: "Yes — toggle each section on or off to generate only the parts relevant to your project type." }
    ],
    howToSteps: [
      { name: "Enter project details", text: "Fill in your project name, description, tech stack, and GitHub repository URL." },
      { name: "Select sections", text: "Choose which README sections to include based on your project's needs." },
      { name: "Copy or download", text: "Copy the markdown or download the README.md file to add to your repository." }
    ],
    useCases: ["Bootstrapping a professional README for a new open source project", "Generating a README template for client project deliverables", "Ensuring all standard documentation sections are covered", "Creating consistent README structure across multiple projects"],
    relatedSlugs: ["changelog-generator", "license-generator", "markdown-to-html"]
  },
  { slug: "license-generator", name: "Open Source License Generator", description: "Generate open source license files for your software projects.", category: "generator", icon: "⚖️", keywords: ["license generator", "open source license", "mit license", "apache license", "software license"], subcategory: "code",
    longDescription: "Generate complete open source license files for any of the most commonly used licenses: MIT, Apache 2.0, GPL v2/v3, LGPL, MPL 2.0, ISC, BSD 2-Clause, BSD 3-Clause, and Creative Commons variants. Enter your name, year, and project name to produce a ready-to-use LICENSE file.",
    faqs: [
      { question: "Which licenses are available?", answer: "MIT, Apache 2.0, GPL v2, GPL v3, LGPL v2.1, LGPL v3, MPL 2.0, ISC, BSD 2-Clause, BSD 3-Clause, AGPL v3, and Creative Commons CC0, CC-BY, and CC-BY-SA." },
      { question: "Which license should I choose?", answer: "MIT and Apache 2.0 are permissive and business-friendly. GPL requires derivative works to be open source. ISC is similar to MIT but simpler. For non-code projects, Creative Commons licenses are appropriate." }
    ],
    howToSteps: [
      { name: "Choose a license", text: "Select the open source license appropriate for your project from the dropdown." },
      { name: "Enter your details", text: "Fill in the copyright holder name, year, and optional project name." },
      { name: "Copy or download", text: "Copy the full license text or download it as a LICENSE file for your repository." }
    ],
    useCases: ["Adding an open source license to a new GitHub repository", "Choosing the right license for a new project", "Generating a LICENSE file as part of project bootstrapping", "Understanding the terms of different open source licenses"],
    relatedSlugs: ["readme-generator", "changelog-generator", "terms-generator"]
  },
  { slug: "commit-message-generator", name: "Commit Message Generator", description: "Generate conventional commit messages from a description of your changes.", category: "generator", icon: "💬", keywords: ["commit message", "conventional commits", "git commit", "commit generator"], subcategory: "code",
    longDescription: "Generate well-formatted git commit messages following the Conventional Commits specification (conventionalcommits.org). Select the commit type (feat, fix, docs, style, refactor, test, chore), enter the scope and description, and optionally add a body and breaking change footer.",
    faqs: [
      { question: "What is the Conventional Commits format?", answer: "Conventional Commits is a specification that structures commit messages as: type(scope): description — for example, feat(auth): add OAuth2 login support. It enables automated changelog generation and semantic versioning." },
      { question: "Which commit types are supported?", answer: "feat (new feature), fix (bug fix), docs (documentation), style (formatting), refactor (code restructure), perf (performance), test (tests), build (build system), ci (CI/CD), and chore (maintenance)." }
    ],
    howToSteps: [
      { name: "Select a commit type", text: "Choose the type that best describes your change: feat, fix, docs, refactor, etc." },
      { name: "Add scope and description", text: "Enter an optional scope (e.g. the module name) and a concise imperative description." },
      { name: "Copy the commit message", text: "Copy the formatted commit message to use with git commit -m." }
    ],
    useCases: ["Writing consistently formatted commit messages for team projects", "Generating conventional commits for automated changelog tools", "Learning the Conventional Commits specification format", "Standardising commit message style across a development team"],
    relatedSlugs: ["changelog-generator", "readme-generator", "regex-generator"]
  },
  { slug: "regex-generator", name: "Regex Generator", description: "Generate regular expressions from plain-English descriptions or examples.", category: "generator", icon: "🔍", keywords: ["regex generator", "regular expression", "regex builder", "pattern generator"], subcategory: "code",
    longDescription: "Build regular expressions from common pattern templates — email addresses, URLs, phone numbers, dates, IP addresses, postcodes, credit cards, and more. Choose a pattern category, customise flags and anchors, and get the regex with an explanation of each component. Test it against sample input immediately.",
    faqs: [
      { question: "Can it generate regex from my own examples?", answer: "The template library covers the most common patterns. For custom patterns, select the closest template and modify the output regex, using the inline explanation as a guide." },
      { question: "What regex flavours are supported?", answer: "The generated regex is compatible with JavaScript, Python (re module), PHP (PCRE), and most modern regex engines. Flavour-specific differences are noted where they exist." }
    ],
    howToSteps: [
      { name: "Choose a pattern category", text: "Select from templates like email, URL, phone, date, IP address, or hexadecimal color." },
      { name: "Customise options", text: "Set flags (global, case-insensitive, multiline) and configure anchors as needed." },
      { name: "Copy the regex", text: "Copy the generated pattern and test it against your sample data in the built-in tester." }
    ],
    useCases: ["Generating validation regex for form input fields", "Building search patterns for log file analysis", "Creating URL routing patterns for web frameworks", "Learning regex syntax from explained pattern templates"],
    relatedSlugs: ["regex-tester", "crontab-generator", "commit-message-generator"]
  },
  { slug: "crontab-generator", name: "Crontab Expression Generator", description: "Generate cron expressions for scheduled tasks visually.", category: "generator", icon: "⏰", keywords: ["cron generator", "crontab", "cron expression", "scheduled task", "cron builder"], subcategory: "code",
    longDescription: "Build cron schedule expressions visually without memorising crontab syntax. Select minute, hour, day-of-month, month, and day-of-week values using dropdowns and checkboxes, then see the generated cron expression and a human-readable description of when it will run. Supports standard 5-field and extended 6-field (with seconds) formats.",
    faqs: [
      { question: "What does each field in a cron expression mean?", answer: "A standard cron expression has 5 fields: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), Day of Week (0-7, where 0 and 7 are Sunday). Each field can use *, ranges (1-5), lists (1,3,5), and step values (*/15)." },
      { question: "Does it support extended cron with seconds?", answer: "Yes — toggle 6-field mode to add a Seconds field at the start, used by AWS CloudWatch Events, Spring Scheduler, and other systems that support second-level scheduling." }
    ],
    howToSteps: [
      { name: "Set the schedule", text: "Use the visual controls to select how often the task should run — every N minutes, specific hours, or custom day/month combinations." },
      { name: "Review the expression", text: "See the generated cron expression and its human-readable description in real time." },
      { name: "Copy the expression", text: "Copy the cron expression to paste into your crontab file, CI configuration, or scheduler." }
    ],
    useCases: ["Scheduling recurring server maintenance tasks with crontab", "Configuring CI/CD pipeline schedules in GitHub Actions or GitLab CI", "Setting up AWS EventBridge or Lambda scheduled rules", "Learning cron syntax with immediate visual feedback"],
    relatedSlugs: ["regex-generator", "commit-message-generator", "unix-timestamp"]
  },
  { slug: "password-phrase-generator", name: "Passphrase Generator", description: "Generate secure, memorable passphrase passwords from random words.", category: "generator", icon: "🔐", keywords: ["passphrase", "diceware", "word password", "memorable password", "passphrase generator"], subcategory: "security",
    longDescription: "Generate strong, memorable passphrases using the Diceware method — combining multiple random common words into a phrase that is both highly secure and easy to remember. Customise the number of words, word separator, and optional capitalisation or number insertion to meet specific password requirements.",
    faqs: [
      { question: "Why are passphrases more secure than random character passwords?", answer: "A 4-word passphrase from a 7776-word list has approximately 51 bits of entropy. A 5-word passphrase has ~64 bits — more than a typical random 10-character password. Passphrases are also far easier to remember and type." },
      { question: "What word list is used?", answer: "The generator uses a curated list of common English words selected for memorability and clarity. Words that could cause embarrassment or confusion are excluded." }
    ],
    howToSteps: [
      { name: "Choose word count", text: "Select 4-7 words — more words means higher entropy and better security." },
      { name: "Configure options", text: "Set the separator character (space, hyphen, dot), toggle capitalisation, and optionally insert a digit." },
      { name: "Copy the passphrase", text: "Copy the generated passphrase to store in your password manager." }
    ],
    useCases: ["Creating master passwords for password managers", "Generating memorable passwords that meet complexity requirements", "Teaching the concept of password entropy and security", "Replacing short complex passwords with longer memorable ones"],
    relatedSlugs: ["password-generator", "password-strength", "uuid-generator"]
  },
  { slug: "api-key-generator", name: "API Key Generator", description: "Generate random API keys and tokens in various formats.", category: "generator", icon: "🗝️", keywords: ["api key", "api token", "secret key", "random token", "auth key"], subcategory: "security",
    longDescription: "Generate cryptographically secure random API keys and tokens in multiple formats: hex strings, Base64-encoded keys, alphanumeric tokens, and prefixed keys (e.g. sk_live_...). Configure key length from 16 to 64 bytes and copy individual keys or batch-generate multiple at once.",
    faqs: [
      { question: "Are the generated API keys cryptographically secure?", answer: "Yes — all keys are generated using the browser's Web Crypto API (crypto.getRandomValues), which produces cryptographically secure random bytes suitable for use as API keys and secrets." },
      { question: "What format should I use for my API keys?", answer: "Hex (lowercase) is widely used and easy to store. Base64 produces shorter strings for the same entropy. Prefixed keys (like sk_live_ or pk_test_) are common in commercial APIs and help users identify key type at a glance." }
    ],
    howToSteps: [
      { name: "Choose key format", text: "Select hex, Base64, alphanumeric, or prefixed format depending on your API's requirements." },
      { name: "Set key length", text: "Choose the number of random bytes — 16 bytes (128-bit), 32 bytes (256-bit), or 64 bytes (512-bit)." },
      { name: "Generate and copy", text: "Click Generate and copy one or more API keys to use in your application." }
    ],
    useCases: ["Generating API keys for a new REST API or web service", "Creating secret keys for HMAC signing and JWT secrets", "Producing test API credentials for development environments", "Generating webhook secrets for payload signature verification"],
    relatedSlugs: ["password-generator", "uuid-generator", "hash-generator"]
  },
  { slug: "port-number-reference", name: "Port Number Reference", description: "Look up common TCP/UDP port numbers and their associated services.", category: "generator", icon: "🔌", keywords: ["port number", "tcp port", "udp port", "well-known ports", "network ports"], subcategory: "code",
    longDescription: "Quickly look up standard TCP and UDP port numbers and the services assigned to them — from well-known ports (0-1023) to registered ports (1024-49151). Search by port number or service name. Includes HTTP, HTTPS, SSH, FTP, DNS, SMTP, MySQL, PostgreSQL, Redis, MongoDB, and hundreds more.",
    faqs: [
      { question: "What are well-known ports?", answer: "Well-known ports (0-1023) are reserved by IANA for standard system services — e.g. port 80 for HTTP, 443 for HTTPS, 22 for SSH. Registered ports (1024-49151) are assigned to specific applications like MySQL (3306) or Redis (6379)." },
      { question: "Does it cover both TCP and UDP?", answer: "Yes — each entry shows whether the service uses TCP, UDP, or both protocols." }
    ],
    howToSteps: [
      { name: "Search by port or service", text: "Enter a port number or service name in the search field to filter the reference table." },
      { name: "View service details", text: "See the protocol (TCP/UDP), service name, and description for each port." },
      { name: "Copy the port number", text: "Click any port number to copy it for use in configuration files or firewall rules." }
    ],
    useCases: ["Checking which service uses a specific port number during debugging", "Configuring firewall rules and network security groups", "Learning standard network port assignments for sysadmin work", "Verifying port conflicts when setting up new services"],
    relatedSlugs: ["crontab-generator", "api-key-generator", "mock-api-generator"]
  },
  { slug: "wifi-qr-generator", name: "WiFi QR Code Generator", description: "Generate QR codes that automatically connect devices to a WiFi network.", category: "generator", icon: "📶", keywords: ["wifi qr code", "wifi qr", "wifi password qr", "wireless qr code"], subcategory: "content",
    longDescription: "Generate a QR code that, when scanned, automatically connects Android and iOS devices to your WiFi network without typing the password. Enter the SSID, password, and security type (WPA2, WPA3, WEP, or open), and optionally hide the SSID for hidden networks.",
    faqs: [
      { question: "Which devices support WiFi QR codes?", answer: "Android 10+ can scan and connect directly from the camera app. iOS 11+ supports QR-based WiFi connection via the Camera app. Older devices may require a separate QR scanner app." },
      { question: "Is my WiFi password secure when using this tool?", answer: "Yes — the QR code is generated entirely in your browser. Your WiFi password is never sent to any server. The resulting QR code encodes your credentials locally and should be shared carefully." }
    ],
    howToSteps: [
      { name: "Enter your WiFi details", text: "Type the network name (SSID), password, and select the security type (WPA2 is most common)." },
      { name: "Generate the QR code", text: "Click Generate to create a QR code that encodes your WiFi credentials." },
      { name: "Print or share", text: "Download the QR code to print for guests, or display it on screen for easy scanning." }
    ],
    useCases: ["Printing WiFi QR codes for guests in homes, offices, and cafes", "Creating WiFi access cards for Airbnb and hotel guests", "Replacing hand-written WiFi password signs at events", "Adding WiFi QR codes to printed menus, posters, or reception desks"],
    relatedSlugs: ["qr-code-generator", "password-generator", "barcode-generator"]
  },
  { slug: "svg-pattern-generator", name: "SVG Pattern Generator", description: "Generate seamless SVG background patterns for websites and apps.", category: "generator", icon: "🔲", keywords: ["svg pattern", "background pattern", "seamless pattern", "css background", "svg background"], subcategory: "design",
    longDescription: "Generate customisable seamless SVG background patterns — including dots, lines, grids, diagonals, crosshatch, waves, and hexagons. Control size, spacing, colour, opacity, and rotation, then copy the SVG code or CSS background-image property for immediate use in your design.",
    faqs: [
      { question: "What pattern types are available?", answer: "Available patterns include dots, lines (horizontal/vertical/diagonal), grid, crosshatch, waves, chevrons, hexagons, triangles, and circles. Each can be fully customised for size, spacing, colour, and rotation." },
      { question: "How do I use the generated pattern in CSS?", answer: "Copy the CSS background-image output (a data URI SVG) and paste it into your stylesheet's background-image property. It tiles seamlessly and scales with the element." }
    ],
    howToSteps: [
      { name: "Choose a pattern type", text: "Select from the available seamless pattern styles in the pattern picker." },
      { name: "Customise appearance", text: "Adjust colour, size, spacing, opacity, and rotation using the controls." },
      { name: "Copy and use", text: "Copy the SVG code or CSS background-image value to use directly in your project." }
    ],
    useCases: ["Adding subtle background textures to landing pages and hero sections", "Generating pattern fills for cards, banners, and UI elements", "Creating decorative backgrounds for presentations and mockups", "Building CSS background pattern utilities for a design system"],
    relatedSlugs: ["color-palette-generator", "css-shadow-palette", "gradient-generator"]
  },
];
