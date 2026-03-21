import type { Tool } from "../types";

export const generatorTools: Tool[] = [
  // ── Existing (13) ──────────────────────────────────────────
  { slug: "password-generator", name: "Password Generator", description: "Generate strong, secure random passwords with customizable options.", category: "generator", icon: "🔑", keywords: ["password generator", "random password", "strong password"], subcategory: "security",
    longDescription: "Generate cryptographically secure passwords with this powerful Password Generator. Customize length (8-128 characters), include uppercase, lowercase, numbers, and special symbols. Generate multiple passwords at once and check their strength with the built-in meter. Uses the Web Crypto API for true randomness.",
    relatedSlugs: ["password-strength", "uuid-generator", "hash-generator"]
  },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate universally unique identifiers (UUID v4) instantly.", category: "generator", icon: "🆔", keywords: ["uuid", "uuid v4", "guid", "unique id"], subcategory: "code",
    relatedSlugs: ["password-generator", "fake-data-generator", "hash-generator"]
  },
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Generate QR codes from any text or URL for easy sharing.", category: "generator", icon: "📱", keywords: ["qr code", "qr generator", "barcode"], subcategory: "content",
    relatedSlugs: ["url-encoder", "utm-builder", "placeholder-image"]
  },
  { slug: "color-palette-generator", name: "Color Palette Generator", description: "Generate harmonious color palettes for your design projects.", category: "generator", icon: "🎨", keywords: ["color palette", "color scheme", "color harmony", "design colors"], subcategory: "design",
    relatedSlugs: ["random-color", "color-converter", "css-gradient-generator"]
  },
  { slug: "fake-data-generator", name: "Fake Data Generator", description: "Generate fake names, emails, addresses, and more for testing.", category: "generator", icon: "🎭", keywords: ["fake data", "mock data", "test data", "dummy data"], subcategory: "code",
    relatedSlugs: ["uuid-generator", "password-generator", "lorem-ipsum"]
  },
  { slug: "placeholder-image", name: "Placeholder Image Generator", description: "Generate placeholder images of any size with custom colors and text.", category: "generator", icon: "🖼️", keywords: ["placeholder image", "dummy image", "image placeholder", "test image"], subcategory: "design",
    relatedSlugs: ["image-resizer", "favicon-generator", "qr-code-generator"]
  },
  { slug: "invoice-generator", name: "Invoice Generator", description: "Create professional invoices that you can print or save as PDF.", category: "generator", icon: "🧾", keywords: ["invoice generator", "invoice maker", "bill generator", "receipt maker"], subcategory: "content",
    relatedSlugs: ["receipt-generator", "privacy-policy-generator", "email-signature-generator"]
  },
  { slug: "credit-card-validator", name: "Credit Card Validator", description: "Validate credit card numbers using the Luhn algorithm.", category: "generator", icon: "💳", keywords: ["credit card validator", "luhn algorithm", "card number check", "cc validator"], subcategory: "security",
    relatedSlugs: ["password-strength", "hash-generator", "fake-data-generator"]
  },
  { slug: "emoji-picker", name: "Emoji Picker", description: "Browse, search, and copy emojis organized by category.", category: "generator", icon: "😀", keywords: ["emoji picker", "emoji search", "copy emoji", "emoji list"], subcategory: "content",
    relatedSlugs: ["fancy-text", "instagram-fonts", "unicode-lookup"]
  },
  { slug: "random-color", name: "Random Color Generator", description: "Generate random colors with HEX, RGB, and HSL values.", category: "generator", icon: "🌈", keywords: ["random color", "color generator", "color randomizer"], subcategory: "design",
    relatedSlugs: ["color-palette-generator", "color-converter", "css-gradient-generator"]
  },
  { slug: "htaccess-generator", name: ".htaccess Generator", description: "Generate Apache .htaccess rules for redirects, security, and caching.", category: "generator", icon: "⚙️", keywords: ["htaccess", "apache config", "redirect rules", "url rewrite"], subcategory: "code",
    relatedSlugs: ["robots-txt-generator", "meta-tag-generator", "privacy-policy-generator"]
  },
  { slug: "robots-txt-generator", name: "Robots.txt Generator", description: "Generate robots.txt files to control search engine crawling.", category: "generator", icon: "🤖", keywords: ["robots.txt", "robot exclusion", "crawl control", "seo robots"], subcategory: "code",
    relatedSlugs: ["htaccess-generator", "meta-tag-generator", "google-serp-preview"]
  },
  { slug: "privacy-policy-generator", name: "Privacy Policy Generator", description: "Generate a basic privacy policy for your website.", category: "generator", icon: "📜", keywords: ["privacy policy", "gdpr", "cookie policy", "legal generator"], subcategory: "content",
    relatedSlugs: ["htaccess-generator", "robots-txt-generator", "nda-generator"]
  },

  // ── New Generators ──────────────────────────────────────────
  { slug: "receipt-generator", name: "Receipt Generator", description: "Create professional receipts for transactions and payments.", category: "generator", icon: "🧾", keywords: ["receipt generator", "receipt maker", "payment receipt", "transaction receipt"], subcategory: "content",
    relatedSlugs: ["invoice-generator", "privacy-policy-generator", "email-signature-generator"]
  },
  { slug: "email-signature-generator", name: "Email Signature Generator", description: "Create professional HTML email signatures with your info and social links.", category: "generator", icon: "✉️", keywords: ["email signature", "signature generator", "html signature", "professional signature"], subcategory: "content",
    relatedSlugs: ["invoice-generator", "meta-tag-generator", "privacy-policy-generator"]
  },
  { slug: "nda-generator", name: "NDA Generator", description: "Generate basic non-disclosure agreement templates.", category: "generator", icon: "📋", keywords: ["nda generator", "non disclosure agreement", "confidentiality agreement", "nda template"], subcategory: "content",
    relatedSlugs: ["privacy-policy-generator", "invoice-generator", "receipt-generator"]
  },
  { slug: "lorem-picsum", name: "Random Image Generator", description: "Generate random placeholder photos with custom dimensions.", category: "generator", icon: "🖼️", keywords: ["random image", "placeholder photo", "stock photo", "random picture"], subcategory: "design",
    relatedSlugs: ["placeholder-image", "image-resizer", "social-image-resizer"]
  },
  { slug: "gradient-background", name: "Gradient Background Generator", description: "Create beautiful gradient backgrounds with CSS code export.", category: "generator", icon: "🌈", keywords: ["gradient background", "css gradient", "background generator", "mesh gradient"], subcategory: "design",
    relatedSlugs: ["css-gradient-generator", "color-palette-generator", "random-color"]
  },
  { slug: "unicode-lookup", name: "Unicode Character Lookup", description: "Search and browse Unicode characters by name, code point, or category.", category: "generator", icon: "🔣", keywords: ["unicode", "character lookup", "unicode search", "special characters"], subcategory: "content",
    relatedSlugs: ["emoji-picker", "fancy-text", "html-entity-encoder"]
  },
  { slug: "barcode-generator", name: "Barcode Generator", description: "Generate barcodes in various formats: Code128, EAN-13, UPC-A, and more.", category: "generator", icon: "📊", keywords: ["barcode generator", "ean13", "upc", "code128"], subcategory: "content",
    relatedSlugs: ["qr-code-generator", "uuid-generator", "fake-data-generator"]
  },
  { slug: "avatar-generator", name: "Avatar Generator", description: "Generate unique geometric avatars from any text or name.", category: "generator", icon: "👤", keywords: ["avatar generator", "profile picture", "identicon", "geometric avatar"], subcategory: "design",
    relatedSlugs: ["placeholder-image", "random-color", "color-palette-generator"]
  },
];
