import type { Tool } from "../types";

export const businessTools: Tool[] = [
  { slug: "invoice-maker", name: "Invoice Maker Pro", description: "Create professional invoices with line items, tax, and export to PDF.", category: "business", icon: "🧾", keywords: ["invoice maker", "create invoice", "invoice template", "billing"], subcategory: "documents",
    longDescription: "Invoice Maker Pro lets you build polished, professional invoices in minutes without any accounting software. Add your logo, client details, line items, tax rates, and notes, then export a print-ready PDF. All data stays in your browser — no account or subscription required.",
    faqs: [
      { question: "Can I save and reuse invoice templates?", answer: "Yes — your last-used invoice data is saved to your browser's local storage so you can quickly update and reissue invoices without re-entering everything from scratch." },
      { question: "Does the invoice include automatic tax calculation?", answer: "Absolutely. Enter your tax rate as a percentage and the tool automatically computes the subtotal, tax amount, and grand total as you add or edit line items." },
      { question: "Is this tool free to use?", answer: "Yes, Invoice Maker Pro is completely free with no sign-up required. Simply fill in your details and download the PDF." }
    ],
    howToSteps: [
      { name: "Enter your business and client details", text: "Fill in your company name, logo, billing address, and your client's contact information at the top of the invoice form." },
      { name: "Add line items and set tax rate", text: "Click 'Add Item' for each product or service, enter quantities and unit prices, and set the applicable tax percentage." },
      { name: "Export to PDF", text: "Click 'Download PDF' to save a professionally formatted invoice to your device, ready to email or print." }
    ],
    useCases: [
      "Freelancers billing clients for design, development, or writing projects",
      "Small business owners issuing invoices for products sold",
      "Consultants generating quick one-off invoices without accounting software",
      "Contractors tracking billable hours and issuing weekly invoices"
    ],
    relatedSlugs: ["receipt-generator", "invoice-generator", "email-signature-generator"]
  },
  { slug: "business-name-generator", name: "Business Name Generator", description: "Generate creative business name ideas based on your industry and keywords.", category: "business", icon: "💡", keywords: ["business name", "company name", "startup name", "brand name"], subcategory: "planning",
    longDescription: "The Business Name Generator combines your industry keywords with creative naming patterns to produce dozens of unique, brandable company name ideas in seconds. It checks for common suffixes, portmanteaus, and descriptive combinations to spark inspiration for your next venture. Use the results as a starting point and pair them with a domain availability check.",
    faqs: [
      { question: "How does the business name generator work?", answer: "You enter keywords related to your industry or product, and the tool combines them with naming patterns — including portmanteaus, compound words, and descriptive phrases — to produce a list of brandable name ideas." },
      { question: "Can I check if the generated names are available as domains?", answer: "Yes — each generated name includes a quick link to check domain availability so you can verify whether the matching .com or other TLD is still free to register." },
      { question: "Are the generated names trademarked?", answer: "The generator creates name ideas algorithmically and does not check trademark databases. Always conduct a trademark search and consult a legal professional before settling on a business name." }
    ],
    howToSteps: [
      { name: "Enter your keywords and industry", text: "Type two or three words that describe your product, service, or niche into the keyword field and select your industry from the dropdown." },
      { name: "Generate name ideas", text: "Click 'Generate' to produce a batch of creative name suggestions based on your input." },
      { name: "Save favorites and check domains", text: "Star the names you like most, then click the domain check link next to each to verify availability before committing." }
    ],
    useCases: [
      "Entrepreneurs brainstorming names for a new startup or product launch",
      "Rebranding an existing business to better reflect its evolved identity",
      "Side-project creators who need a catchy, memorable brand name quickly",
      "Agency teams generating naming options to present to clients"
    ],
    relatedSlugs: ["slug-generator", "title-generator", "bio-generator"]
  },
  { slug: "meeting-cost-calculator", name: "Meeting Cost Calculator", description: "Calculate the true cost of meetings based on attendees and salaries.", category: "business", icon: "💰", keywords: ["meeting cost", "meeting calculator", "salary cost", "time is money"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "The Meeting Cost Calculator turns attendee salaries and meeting duration into a real dollar figure, making the hidden cost of meetings visible in real time. Watch the running total tick upward as the meeting progresses to encourage more focused, efficient discussions. It's a simple but powerful tool for cultivating a cost-conscious meeting culture.",
    faqs: [
      { question: "How is the meeting cost calculated?", answer: "The tool divides each attendee's annual salary by the number of working hours in a year to get an hourly rate, sums all hourly rates, and multiplies by the meeting duration in hours." },
      { question: "Can I include different salary levels for different attendees?", answer: "Yes — you can add as many attendees as you need and assign each one a different annual salary, giving you an accurate blended cost for the entire meeting." },
      { question: "Why should I use a meeting cost calculator?", answer: "Research shows that unnecessary meetings cost businesses billions annually. Showing the live dollar cost helps teams decide whether a meeting is worth the investment or could be an email instead." }
    ],
    howToSteps: [
      { name: "Add attendees and salaries", text: "Enter each attendee's name and annual salary (or use an average company salary) in the attendee list." },
      { name: "Set the meeting duration", text: "Enter the planned meeting length in minutes or hours, or start the live timer to track the cost in real time." },
      { name: "Review the total cost", text: "See the calculated dollar cost of the meeting and use it to decide whether the meeting is justified or whether a shorter format would suffice." }
    ],
    useCases: [
      "Managers visualizing the financial impact of recurring weekly standups",
      "Teams deciding whether a discussion warrants a meeting or an async update",
      "Executives justifying investment in better async communication tools",
      "Coaches and consultants illustrating the cost of poor meeting hygiene"
    ],
    relatedSlugs: ["salary-to-hourly", "roi-calculator", "break-even-calculator"]
  },
  { slug: "qr-code-business-card", name: "QR Code Business Card", description: "Generate a QR code vCard that saves your contact info to any phone.", category: "business", icon: "📇", keywords: ["qr business card", "vcard", "digital business card", "contact qr"], subcategory: "documents",
    longDescription: "The QR Code Business Card generator creates a scannable QR code encoded with your vCard contact information, so anyone with a smartphone can save your details instantly — no app required. Customize your name, company, phone, email, website, and address, then download the QR image to print on physical cards or share digitally.",
    faqs: [
      { question: "What information can I include in the QR business card?", answer: "You can include your full name, job title, company, phone number, email address, website URL, and physical address — all encoded in the standard vCard format readable by every major smartphone." },
      { question: "Does scanning the QR code require a special app?", answer: "No. Modern iPhones and Android phones can scan vCard QR codes directly through the built-in camera app, which then prompts the user to save your contact details." },
      { question: "Can I print the generated QR code on physical business cards?", answer: "Yes — download the QR code as a high-resolution PNG and place it on your printed business cards, email footer, or any marketing material." }
    ],
    howToSteps: [
      { name: "Enter your contact details", text: "Fill in your name, title, company, phone, email, and any other contact fields you want encoded in the QR code." },
      { name: "Generate and preview the QR code", text: "Click 'Generate' to instantly create your vCard QR code and preview how it will look when printed." },
      { name: "Download and use", text: "Download the QR code as a PNG and add it to your physical business cards, email signature, or website." }
    ],
    useCases: [
      "Professionals networking at conferences who want to share contact details instantly",
      "Freelancers adding a scannable QR to their printed portfolio or business card",
      "Sales teams printing QR business cards for trade shows and events",
      "Anyone reducing paper waste by switching to a scannable digital contact card"
    ],
    relatedSlugs: ["qr-code-generator", "email-signature-generator", "invoice-maker"]
  },
  { slug: "time-tracker", name: "Time Tracker", description: "Track time spent on tasks and projects with start/stop and manual entry.", category: "business", icon: "⏱️", keywords: ["time tracker", "time tracking", "project time", "billable hours"], subcategory: "planning",
    longDescription: "Time Tracker is a lightweight, browser-based time-tracking tool that lets you log hours against named projects and tasks with a single click. Start and stop timers, add manual entries for work already done, and see a clear breakdown of hours by project — all saved locally in your browser without any account or subscription.",
    faqs: [
      { question: "Is my tracked time saved between sessions?", answer: "Yes — all time entries are saved to your browser's local storage, so your data persists even after closing and reopening the tab. You can also export entries as CSV for safekeeping." },
      { question: "Can I track time for multiple projects simultaneously?", answer: "You can run one active timer at a time and switch between projects by stopping the current timer and starting a new one for a different project." },
      { question: "Can I use this to calculate billable hours for client invoices?", answer: "Absolutely. Export your time log as a CSV, total the hours per project, and reference the figures when creating invoices in the Invoice Maker tool." }
    ],
    howToSteps: [
      { name: "Create a project or task", text: "Enter a project name and optional task description, then click 'Start Timer' to begin tracking time immediately." },
      { name: "Stop and review entries", text: "Click 'Stop' when you finish working. The entry is logged with its duration and added to your time sheet." },
      { name: "Export your time log", text: "Download all tracked entries as a CSV to use in invoicing, reporting, or importing into a dedicated time-tracking system." }
    ],
    useCases: [
      "Freelancers tracking billable hours per client to ensure accurate invoicing",
      "Remote workers logging time on tasks to improve personal productivity",
      "Consultants recording time spent on different phases of a project",
      "Small teams monitoring effort distribution across projects"
    ],
    relatedSlugs: ["stopwatch", "pomodoro-timer", "meeting-cost-calculator"]
  },
  { slug: "profit-loss-calculator", name: "Profit & Loss Calculator", description: "Create a simple P&L statement from revenue and expense entries.", category: "business", icon: "📊", keywords: ["profit loss", "p&l", "income statement", "revenue expenses"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "The Profit & Loss Calculator helps you build a simple income statement by entering revenue streams and expense categories, instantly showing your gross profit, operating expenses, and net profit or loss. It's ideal for small business owners, freelancers, and students who need a quick financial snapshot without complex accounting software.",
    faqs: [
      { question: "What is a profit and loss statement?", answer: "A P&L statement (also called an income statement) summarizes your revenues, costs, and expenses over a period to show whether your business made a profit or incurred a loss." },
      { question: "Can I export the P&L as a PDF or spreadsheet?", answer: "Yes — once you've entered your figures, you can export the statement as a formatted PDF or copy the data to paste into a spreadsheet for further analysis." },
      { question: "How is net profit calculated?", answer: "Net profit is calculated by subtracting your total operating expenses and cost of goods sold from your total revenue. The tool performs this automatically as you enter figures." }
    ],
    howToSteps: [
      { name: "Enter your revenue streams", text: "Add each source of income with its amount — such as product sales, service fees, or subscription revenue." },
      { name: "Add your expenses", text: "List all expenses by category such as rent, salaries, marketing, and materials, and enter the amount for each." },
      { name: "Review your P&L summary", text: "The tool instantly calculates your gross profit, total expenses, and net profit or loss at the bottom of the statement." }
    ],
    useCases: [
      "Small business owners reviewing monthly or quarterly financial performance",
      "Freelancers calculating annual income versus business expenses for taxes",
      "Startup founders preparing financial summaries for investor pitches",
      "Students learning to read and build basic income statements"
    ],
    relatedSlugs: ["margin-calculator", "break-even-calculator", "roi-calculator"]
  },
  { slug: "employee-cost-calculator", name: "Employee Cost Calculator", description: "Calculate the total cost of hiring an employee including benefits and taxes.", category: "business", icon: "👥", keywords: ["employee cost", "hiring cost", "salary burden", "total compensation"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "The Employee Cost Calculator reveals the true cost of employment beyond the base salary — factoring in payroll taxes, health benefits, retirement contributions, equipment, and overhead. This tool helps business owners make informed hiring decisions and budget accurately for headcount expansion.",
    faqs: [
      { question: "Why is the true cost of an employee higher than their salary?", answer: "In addition to salary, employers typically pay payroll taxes (Social Security, Medicare), health insurance premiums, retirement contributions, paid time off, equipment costs, and a share of office overhead — often adding 20–40% on top of base pay." },
      { question: "What inputs does the calculator require?", answer: "You enter the employee's annual salary, your employer tax rate, benefit costs such as health insurance and retirement match, plus any equipment or overhead allocations." },
      { question: "Can I compare the cost of full-time versus contractor hiring?", answer: "Yes — run the calculator for a salaried employee with benefits, then compare the result against a contractor's hourly or project rate to see which is more cost-effective for your situation." }
    ],
    howToSteps: [
      { name: "Enter the base salary", text: "Input the employee's annual gross salary as the starting figure." },
      { name: "Add taxes and benefits", text: "Enter your employer payroll tax rate and any benefit costs such as health insurance premiums, retirement match, and paid leave." },
      { name: "Review the total employment cost", text: "See the complete annual cost breakdown including all additional expenses, giving you a clear picture of the true hiring cost." }
    ],
    useCases: [
      "Business owners budgeting for their first or next full-time hire",
      "HR managers preparing headcount cost summaries for board presentations",
      "Startups comparing the cost of employees versus independent contractors",
      "Finance teams modeling the impact of salary increases on total payroll"
    ],
    relatedSlugs: ["salary-to-hourly", "payroll-calculator", "meeting-cost-calculator"]
  },
  { slug: "sla-uptime-calculator", name: "SLA Uptime Calculator", description: "Calculate allowed downtime for 99.9%, 99.99%, and custom SLA percentages.", category: "business", icon: "📈", keywords: ["sla calculator", "uptime calculator", "downtime calculator", "availability"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "The SLA Uptime Calculator instantly converts any availability percentage into the allowed downtime per day, week, month, and year — making it easy to understand what 99.9% or 99.99% uptime actually means in practice. Use it to evaluate vendor SLAs, set realistic reliability targets, or draft your own service level agreements.",
    faqs: [
      { question: "What does 99.9% uptime mean in actual downtime?", answer: "99.9% uptime (often called 'three nines') allows approximately 8.7 hours of downtime per year, 43.8 minutes per month, and about 10 minutes per week." },
      { question: "What is the difference between 99.9% and 99.99% SLA?", answer: "The difference is significant in practice: 99.99% ('four nines') allows only about 52 minutes of downtime per year versus the roughly 8.7 hours allowed by 99.9%." },
      { question: "Can I calculate a custom uptime percentage?", answer: "Yes — enter any uptime percentage between 0 and 100 and the calculator will compute the corresponding allowed downtime across all time periods." }
    ],
    howToSteps: [
      { name: "Select or enter your SLA percentage", text: "Choose a common SLA preset such as 99.9% or 99.99%, or type any custom availability percentage into the input field." },
      { name: "View the downtime breakdown", text: "Instantly see the maximum allowed downtime per day, week, month, and year for your chosen SLA level." },
      { name: "Compare multiple SLA tiers", text: "Add multiple SLA percentages to compare tiers side by side and choose the right level for your product or vendor agreement." }
    ],
    useCases: [
      "DevOps and SRE teams setting reliability targets and error budgets",
      "Business owners evaluating cloud hosting and SaaS vendor SLA promises",
      "Product managers drafting service level agreements for enterprise customers",
      "Sales engineers explaining uptime guarantees to prospective customers"
    ],
    relatedSlugs: ["percentage-calculator", "time-duration-calculator", "roi-calculator"]
  },
  { slug: "domain-availability", name: "Domain Name Checker", description: "Check if domain names are available for your business.", category: "business", icon: "🌐", keywords: ["domain checker", "domain availability", "domain name", "website name"], subcategory: "planning",
    longDescription: "The Domain Name Checker lets you quickly verify whether your desired domain name is available across popular TLDs including .com, .net, .org, and more. Enter your business name or keyword and get instant availability results without leaving the page, helping you secure the perfect web address before someone else does.",
    faqs: [
      { question: "Which TLDs does the domain checker support?", answer: "The checker searches availability across the most popular TLDs including .com, .net, .org, .io, .co, and several country-specific extensions." },
      { question: "How current is the availability data?", answer: "Domain availability is checked in real time via the WHOIS protocol, so results reflect the current registration status at the moment of your search." },
      { question: "Can I check multiple domain names at once?", answer: "Yes — enter a base name and the tool automatically checks it across multiple TLD extensions simultaneously, showing all results in a single list." }
    ],
    howToSteps: [
      { name: "Enter your desired domain name", text: "Type the name you want to check in the search field — you can include or omit the TLD extension." },
      { name: "Run the availability check", text: "Click 'Check' to query WHOIS in real time and see which TLD variations of your name are available or already registered." },
      { name: "Secure your domain", text: "Click the 'Register' link next to any available domain to be directed to a registrar where you can complete the purchase." }
    ],
    useCases: [
      "Entrepreneurs verifying domain availability before settling on a business name",
      "Marketers finding available domains for campaign landing pages",
      "Web developers quickly checking name options for client projects",
      "Brand teams identifying which TLD variations of their trademark are unregistered"
    ],
    relatedSlugs: ["whois-lookup", "business-name-generator", "dns-lookup"]
  },
  { slug: "terms-of-service-generator", name: "Terms of Service Generator", description: "Generate basic terms of service for your website or app.", category: "business", icon: "📜", keywords: ["terms of service", "tos generator", "legal", "website terms"], subcategory: "documents",
    longDescription: "The Terms of Service Generator creates a customizable, plain-language ToS document tailored to your website or application. Answer a few questions about your business type, user data practices, and jurisdiction, and receive a complete terms document you can copy, download, or paste into your site immediately.",
    faqs: [
      { question: "Is the generated Terms of Service legally binding?", answer: "The generated document provides a solid starting template based on common legal requirements, but it is not a substitute for advice from a qualified attorney. We recommend having a lawyer review it before publishing." },
      { question: "What information do I need to generate my Terms of Service?", answer: "You'll need your company name, website URL, contact email, the nature of your service, your governing law jurisdiction, and any specific policies around user accounts, payments, or content." },
      { question: "Can I edit the generated Terms of Service?", answer: "Yes — the output is plain editable text that you can copy and customize to match your specific business practices before publishing on your site." }
    ],
    howToSteps: [
      { name: "Enter your business details", text: "Provide your company name, website URL, contact email, and the type of service or product you offer." },
      { name: "Answer the policy questions", text: "Indicate whether you collect user data, offer subscriptions, allow user-generated content, and select your governing jurisdiction." },
      { name: "Copy and publish your ToS", text: "Copy the generated terms document, paste it into your website's Terms of Service page, and review it with a legal professional if needed." }
    ],
    useCases: [
      "SaaS founders who need a basic ToS before launching their MVP",
      "Bloggers and content creators publishing a terms page for their website",
      "E-commerce store owners establishing usage and refund policy terms",
      "App developers covering liability, user conduct, and account termination rules"
    ],
    relatedSlugs: ["privacy-policy-generator", "nda-generator", "cookie-policy-generator"]
  },
  { slug: "cookie-policy-generator", name: "Cookie Policy Generator", description: "Generate GDPR-compliant cookie policies for your website.", category: "business", icon: "🍪", keywords: ["cookie policy", "gdpr", "cookie consent", "privacy"], subcategory: "documents",
    longDescription: "The Cookie Policy Generator produces a GDPR and ePrivacy-compliant cookie policy for your website in seconds. Specify the types of cookies your site uses — analytics, marketing, functional — and get a clear, structured policy document that explains cookie use to your visitors and satisfies regulatory requirements.",
    faqs: [
      { question: "Do I legally need a cookie policy?", answer: "Yes, if your website is accessible to users in the EU/EEA, GDPR and the ePrivacy Directive require you to disclose which cookies your site uses and obtain appropriate consent for non-essential cookies." },
      { question: "What types of cookies can I include in the policy?", answer: "You can include strictly necessary cookies, preference/functional cookies, analytics cookies (such as Google Analytics), and marketing/advertising cookies, each with their own description and retention period." },
      { question: "Will the generated policy cover CCPA compliance for California users?", answer: "The generator focuses primarily on GDPR/ePrivacy requirements but includes options to add CCPA-relevant disclosures for California residents when you select that option during generation." }
    ],
    howToSteps: [
      { name: "Enter your website details", text: "Provide your website name, URL, and contact email address for the policy." },
      { name: "Select the cookies your site uses", text: "Check all cookie categories that apply to your site — analytics, advertising, social media embeds, etc. — and optionally add specific third-party cookie names." },
      { name: "Download and publish your policy", text: "Copy the generated policy or download it as HTML, then link to it from your site's footer and cookie consent banner." }
    ],
    useCases: [
      "Website owners needing a cookie policy to comply with GDPR before launch",
      "Marketing teams ensuring their analytics and ad tracking practices are disclosed",
      "Developers adding a legally required cookie notice to client websites",
      "Bloggers and publishers running display ads who need cookie disclosure"
    ],
    relatedSlugs: ["privacy-policy-generator", "terms-of-service-generator", "nda-generator"]
  },
  { slug: "roi-timeline-calculator", name: "ROI Timeline Calculator", description: "Calculate return on investment over time periods with projections.", category: "business", icon: "📈", keywords: ["roi calculator", "return on investment", "roi timeline", "investment return"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "Calculate return on investment (ROI) over custom time periods and project how your ROI evolves month by month or year by year. Unlike a simple ROI calculator, this tool shows the full investment timeline — factoring in ongoing costs, periodic gains, and cumulative returns — so you can see exactly when an investment becomes profitable and what the total value is at any point.",
    faqs: [
      { question: "How is ROI calculated?", answer: "ROI = ((Net Profit / Cost of Investment) × 100). Net profit is the gain from the investment minus the total cost. This calculator extends that formula across multiple time periods to show compounding and cumulative returns." },
      { question: "What is a good ROI?", answer: "A good ROI depends on the type of investment and timeframe. For marketing spend, 5:1 ROI (500%) is generally considered strong. For stock market investments, 7–10% annual ROI is the historical average." },
      { question: "Can this model recurring costs or recurring revenue?", answer: "Yes. Enter ongoing monthly or annual costs (e.g., subscriptions, maintenance) and recurring revenue to model a more realistic investment timeline beyond a one-time cost/gain scenario." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your initial investment cost and expected net return or revenue." },
      { name: "Step 2", text: "Set the time period (months or years) and any recurring costs or gains per period." },
      { name: "Step 3", text: "View the ROI chart showing cumulative return across the full timeline and identify the break-even point." }
    ],
    useCases: [
      "Marketing managers calculating the ROI of a campaign over 6 and 12 months",
      "Business owners evaluating whether a capital purchase will pay for itself",
      "Startups projecting ROI for investors across different growth scenarios",
      "Real estate investors modeling rental property returns over 5 and 10-year horizons"
    ],
    relatedSlugs: ["break-even-calculator", "profit-loss-calculator", "compound-interest"]
  },
  { slug: "burn-rate-calculator", name: "Burn Rate Calculator", description: "Calculate monthly cash burn rate and runway for startups.", category: "business", icon: "🔥", keywords: ["burn rate", "startup burn rate", "cash burn", "runway calculator"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "Calculate your startup's monthly burn rate and cash runway — how many months of operating funds remain at your current spending pace. Understanding burn rate is critical for startup founders and CFOs to make informed decisions about fundraising timing, hiring, and cost management before reaching zero cash.",
    faqs: [
      { question: "What is burn rate?", answer: "Burn rate is the rate at which a company spends its cash reserves. Gross burn is total monthly spend. Net burn is monthly spend minus revenue — it's the net burn rate that determines your actual runway." },
      { question: "What is a good runway for a startup?", answer: "Most startup advisors recommend maintaining at least 18–24 months of runway at all times, especially before a Series A or B fundraise, giving time for product development and investor conversations." },
      { question: "How does revenue affect burn rate?", answer: "Net burn rate = gross burn (total expenses) minus revenue. As revenue grows, net burn decreases. A company reaches profitability when revenue exceeds expenses (zero net burn)." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your current cash balance in the bank." },
      { name: "Step 2", text: "Enter your average monthly expenses (gross burn) and monthly revenue." },
      { name: "Step 3", text: "View your net burn rate and the calculated runway in months." }
    ],
    useCases: [
      "Startup founders monitoring how long their current funding will last",
      "CFOs preparing board updates and fundraising timeline recommendations",
      "Investors evaluating a startup's financial position and fundraising urgency",
      "Founders deciding when to begin the next fundraising round based on runway"
    ],
    relatedSlugs: ["profit-loss-calculator", "roi-timeline-calculator", "break-even-calculator"]
  },
  { slug: "customer-lifetime-value", name: "Customer Lifetime Value Calculator", description: "Calculate CLV to understand the long-term value of your customers.", category: "business", icon: "👥", keywords: ["customer lifetime value", "clv calculator", "ltv calculator", "customer value"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "Calculate the Customer Lifetime Value (CLV or LTV) of your average customer to understand how much revenue each customer relationship generates over time. CLV is one of the most important business metrics — it determines how much you can profitably spend to acquire a new customer and informs pricing, retention, and product decisions.",
    faqs: [
      { question: "How is CLV calculated?", answer: "CLV = Average Order Value × Purchase Frequency × Average Customer Lifespan. For example, a customer who spends $50 per purchase, buys 4 times per year, and stays for 3 years has a CLV of $600." },
      { question: "What is the relationship between CLV and CAC?", answer: "Customer Acquisition Cost (CAC) should ideally be less than 1/3 of CLV for a healthy business. A CLV:CAC ratio of at least 3:1 is generally considered sustainable." },
      { question: "Can I improve my CLV?", answer: "Yes. CLV increases by improving retention (longer customer lifespan), increasing purchase frequency through loyalty programs, and increasing average order value through upsells and cross-sells." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your average order value, average purchase frequency per year, and average customer retention period in years." },
      { name: "Step 2", text: "Optionally enter your profit margin percentage to calculate CLV in terms of profit rather than revenue." },
      { name: "Step 3", text: "View your CLV and compare it against your customer acquisition cost to assess business health." }
    ],
    useCases: [
      "E-commerce businesses calculating how much to spend on Google and Facebook ads",
      "SaaS companies computing CLV to set customer acquisition budgets",
      "Marketing teams measuring the financial impact of retention and loyalty programs",
      "Founders presenting CLV and cohort analysis to investors during fundraising"
    ],
    relatedSlugs: ["roi-timeline-calculator", "break-even-calculator", "margin-calculator"]
  },
  { slug: "shipping-calculator", name: "Shipping Cost Calculator", description: "Estimate shipping costs based on weight, dimensions, and destination.", category: "business", icon: "📦", keywords: ["shipping calculator", "shipping cost", "postage calculator", "delivery cost"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "The Shipping Cost Calculator estimates delivery costs for packages based on weight, dimensions, and shipping zone, supporting major carriers including USPS, UPS, and FedEx rate structures. Use it to price your shipping accurately for e-commerce listings, compare carrier rates side by side, and avoid undercharging customers.",
    faqs: [
      { question: "Which shipping carriers does this calculator support?", answer: "The calculator estimates costs based on rate structures for USPS, UPS, and FedEx, allowing you to compare rates across these major carriers for your package dimensions and destination." },
      { question: "How is dimensional weight calculated?", answer: "Dimensional (DIM) weight is calculated by multiplying the package length × width × height in inches, then dividing by the carrier's DIM factor (typically 139 for domestic US shipments). Carriers charge whichever is greater — actual weight or DIM weight." },
      { question: "Are the estimates exact carrier rates?", answer: "The estimates are based on standard published rate schedules and are intended for planning and comparison purposes. Actual rates may vary based on your carrier account, negotiated discounts, and surcharges." }
    ],
    howToSteps: [
      { name: "Enter package weight and dimensions", text: "Input your package's weight in pounds or kilograms and its length, width, and height in inches or centimeters." },
      { name: "Set your origin and destination", text: "Enter the origin ZIP code and destination ZIP code or select the shipping zone for international packages." },
      { name: "Compare carrier rates", text: "View estimated shipping costs across USPS, UPS, and FedEx service levels and choose the best option for your budget and delivery speed requirements." }
    ],
    useCases: [
      "E-commerce sellers calculating accurate shipping rates to include in product pricing",
      "Small business owners comparing carrier costs before choosing a preferred shipper",
      "Marketplace sellers estimating shipping costs before listing items for sale",
      "Procurement teams budgeting inbound freight costs for inventory purchases"
    ],
    relatedSlugs: ["unit-converter", "kg-to-lbs", "vat-calculator"]
  },
];
