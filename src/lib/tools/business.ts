import type { Tool } from "../types";

export const businessTools: Tool[] = [
  { slug: "invoice-maker", name: "Invoice Maker Pro", description: "Create professional invoices with line items, tax, and export to PDF.", category: "business", icon: "🧾", keywords: ["invoice maker", "create invoice", "invoice template", "billing"], subcategory: "documents",
    relatedSlugs: ["receipt-generator", "invoice-generator", "email-signature-generator"]
  },
  { slug: "business-name-generator", name: "Business Name Generator", description: "Generate creative business name ideas based on your industry and keywords.", category: "business", icon: "💡", keywords: ["business name", "company name", "startup name", "brand name"], subcategory: "planning",
    relatedSlugs: ["slug-generator", "title-generator", "bio-generator"]
  },
  { slug: "meeting-cost-calculator", name: "Meeting Cost Calculator", description: "Calculate the true cost of meetings based on attendees and salaries.", category: "business", icon: "💰", keywords: ["meeting cost", "meeting calculator", "salary cost", "time is money"], subcategory: "calculators", template: "simple-calculator",
    relatedSlugs: ["salary-to-hourly", "roi-calculator", "break-even-calculator"]
  },
  { slug: "qr-code-business-card", name: "QR Code Business Card", description: "Generate a QR code vCard that saves your contact info to any phone.", category: "business", icon: "📇", keywords: ["qr business card", "vcard", "digital business card", "contact qr"], subcategory: "documents",
    relatedSlugs: ["qr-code-generator", "email-signature-generator", "invoice-maker"]
  },
  { slug: "time-tracker", name: "Time Tracker", description: "Track time spent on tasks and projects with start/stop and manual entry.", category: "business", icon: "⏱️", keywords: ["time tracker", "time tracking", "project time", "billable hours"], subcategory: "planning",
    relatedSlugs: ["stopwatch", "pomodoro-timer", "meeting-cost-calculator"]
  },
  { slug: "profit-loss-calculator", name: "Profit & Loss Calculator", description: "Create a simple P&L statement from revenue and expense entries.", category: "business", icon: "📊", keywords: ["profit loss", "p&l", "income statement", "revenue expenses"], subcategory: "calculators", template: "simple-calculator",
    relatedSlugs: ["margin-calculator", "break-even-calculator", "roi-calculator"]
  },
  { slug: "employee-cost-calculator", name: "Employee Cost Calculator", description: "Calculate the total cost of hiring an employee including benefits and taxes.", category: "business", icon: "👥", keywords: ["employee cost", "hiring cost", "salary burden", "total compensation"], subcategory: "calculators", template: "simple-calculator",
    relatedSlugs: ["salary-to-hourly", "payroll-calculator", "meeting-cost-calculator"]
  },
  { slug: "sla-uptime-calculator", name: "SLA Uptime Calculator", description: "Calculate allowed downtime for 99.9%, 99.99%, and custom SLA percentages.", category: "business", icon: "📈", keywords: ["sla calculator", "uptime calculator", "downtime calculator", "availability"], subcategory: "calculators", template: "simple-calculator",
    relatedSlugs: ["percentage-calculator", "time-duration-calculator", "roi-calculator"]
  },
  { slug: "domain-availability", name: "Domain Name Checker", description: "Check if domain names are available for your business.", category: "business", icon: "🌐", keywords: ["domain checker", "domain availability", "domain name", "website name"], subcategory: "planning",
    relatedSlugs: ["whois-lookup", "business-name-generator", "dns-lookup"]
  },
  { slug: "terms-of-service-generator", name: "Terms of Service Generator", description: "Generate basic terms of service for your website or app.", category: "business", icon: "📜", keywords: ["terms of service", "tos generator", "legal", "website terms"], subcategory: "documents",
    relatedSlugs: ["privacy-policy-generator", "nda-generator", "cookie-policy-generator"]
  },
  { slug: "cookie-policy-generator", name: "Cookie Policy Generator", description: "Generate GDPR-compliant cookie policies for your website.", category: "business", icon: "🍪", keywords: ["cookie policy", "gdpr", "cookie consent", "privacy"], subcategory: "documents",
    relatedSlugs: ["privacy-policy-generator", "terms-of-service-generator", "nda-generator"]
  },
  { slug: "shipping-calculator", name: "Shipping Cost Calculator", description: "Estimate shipping costs based on weight, dimensions, and destination.", category: "business", icon: "📦", keywords: ["shipping calculator", "shipping cost", "postage calculator", "delivery cost"], subcategory: "calculators", template: "simple-calculator",
    relatedSlugs: ["unit-converter", "kg-to-lbs", "vat-calculator"]
  },
];
