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
];
