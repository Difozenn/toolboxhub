import type { Tool } from "../types";

export const seoTools: Tool[] = [
  // ── Existing (7) ──────────────────────────────────────────
  { slug: "og-preview", name: "Open Graph Preview", description: "Preview how your website looks when shared on social media.", category: "seo", icon: "👁️", keywords: ["open graph", "og preview", "social preview", "link preview"], subcategory: "preview",
    longDescription: "Open Graph Preview renders a realistic mockup of how your page will appear when shared as a link card on Facebook, LinkedIn, Slack, and other platforms that read Open Graph meta tags. Test and refine your og:title, og:description, og:image, and og:url before publishing.",
    faqs: [
      { question: "What are Open Graph meta tags?", answer: "Open Graph tags are HTML meta elements (og:title, og:description, og:image, og:url) that control how your page looks when shared as a link preview on social media platforms and messaging apps." },
      { question: "How do I add Open Graph tags to my website?", answer: "Add <meta property=\"og:title\" content=\"...\">, <meta property=\"og:description\" content=\"...\">, and <meta property=\"og:image\" content=\"...\"> tags inside your page's <head> section. The preview tool shows how they will render." },
      { question: "What is the ideal og:image size?", answer: "The recommended Open Graph image size is 1200×630 pixels at a minimum. Images smaller than 200×200 pixels may not display in all contexts." }
    ],
    howToSteps: [
      { name: "Enter your OG tag values", text: "Fill in your og:title, og:description, og:image URL, and og:url in the input fields." },
      { name: "Preview the link card", text: "See a live mockup of how your page will appear as a shared link card on Facebook, LinkedIn, and other platforms." },
      { name: "Adjust and finalize", text: "Edit any fields that look off in the preview, then copy the generated HTML meta tags to paste into your site's <head> section." }
    ],
    useCases: [
      "Content marketers ensuring their articles display compelling previews when shared",
      "Developers testing Open Graph implementation before deploying to production",
      "E-commerce teams optimizing product page social sharing previews",
      "Blog owners verifying that featured images appear correctly in link cards"
    ],
    relatedSlugs: ["twitter-card-preview", "google-serp-preview", "meta-tag-generator"]
  },
  { slug: "keyword-density", name: "Keyword Density Checker", description: "Analyze keyword density and frequency in your content.", category: "seo", icon: "🔑", keywords: ["keyword density", "seo analysis", "keyword frequency", "content analysis"], subcategory: "analysis",
    longDescription: "Keyword Density Checker analyzes your content to show how frequently specific keywords appear as a percentage of total word count. Use it to ensure your target keywords have appropriate presence — enough to signal relevance to search engines without over-optimization that could trigger keyword stuffing penalties.",
    faqs: [
      { question: "What is the ideal keyword density for SEO?", answer: "There is no exact ideal, but most SEO experts suggest 1–3% keyword density for your primary keyword as a general guideline. More important than density is that the keyword appears in key locations: the title, first paragraph, headings, and meta description." },
      { question: "Does high keyword density improve search rankings?", answer: "Not significantly, and too much keyword repetition can harm rankings through over-optimization penalties. Modern search engines use semantic analysis and topical relevance rather than raw keyword counts." },
      { question: "Can I check density for multi-word phrases (long-tail keywords)?", answer: "Yes — enter a multi-word phrase and the tool counts occurrences of that exact phrase within the content and calculates its density as a percentage." }
    ],
    howToSteps: [
      { name: "Paste your content", text: "Copy and paste the full text of the page or article you want to analyze into the text area." },
      { name: "Enter your target keyword", text: "Type the keyword or phrase you want to measure density for in the keyword field." },
      { name: "Review the density report", text: "See the keyword frequency, density percentage, and a highlighted view of where the keyword appears in your content." }
    ],
    useCases: [
      "Ensuring a target keyword appears enough times to signal topical relevance",
      "Identifying and reducing keyword stuffing before publishing content",
      "Comparing keyword distribution between your content and competing top-ranking pages",
      "Auditing existing articles to find under-optimized or over-optimized pages"
    ],
    relatedSlugs: ["readability-checker", "word-frequency", "google-serp-preview"]
  },
  { slug: "google-serp-preview", name: "Google SERP Preview", description: "Preview how your page will look in Google search results.", category: "seo", icon: "🔍", keywords: ["serp preview", "google preview", "search result preview", "seo preview"], subcategory: "preview",
    longDescription: "Google SERP Preview renders a pixel-accurate mockup of how your page will appear in Google search results, showing the title tag, meta description, and URL breadcrumb exactly as Google displays them — including character count warnings for titles and descriptions that are too long or too short.",
    faqs: [
      { question: "What is the ideal title tag length for Google?", answer: "Google typically displays title tags up to about 60 characters before truncating them with an ellipsis. Aim for 50–60 characters to ensure your full title is visible in search results." },
      { question: "How long should my meta description be?", answer: "Google displays meta descriptions up to approximately 155–160 characters on desktop. Descriptions shorter than 120 characters may look sparse; longer ones will be cut off with '...'" },
      { question: "Does the meta description directly affect rankings?", answer: "Meta descriptions are not a direct Google ranking factor, but a compelling description improves click-through rate (CTR) from the search results page, which can indirectly benefit your rankings." }
    ],
    howToSteps: [
      { name: "Enter your title tag", text: "Type or paste your page title in the title field. The character counter shows how much of it Google will display." },
      { name: "Enter your meta description", text: "Add your meta description text. The preview and character counter update in real time as you type." },
      { name: "Preview and optimize", text: "Review the SERP mockup and adjust your title and description until they are within the optimal character ranges and read compellingly." }
    ],
    useCases: [
      "SEO writers crafting title tags and meta descriptions that fit within display limits",
      "Developers checking title and description lengths during on-page SEO audits",
      "Content teams previewing how new blog posts will appear in search results",
      "E-commerce managers optimizing product page SERP snippets for higher CTR"
    ],
    relatedSlugs: ["og-preview", "meta-tag-generator", "keyword-density"]
  },
  { slug: "utm-builder", name: "UTM Link Builder", description: "Build UTM-tagged URLs for tracking marketing campaigns.", category: "seo", icon: "🔗", keywords: ["utm builder", "utm parameters", "campaign tracking", "url builder"], subcategory: "tracking",
    longDescription: "UTM Link Builder constructs properly formatted UTM-tagged URLs for tracking marketing campaign performance in Google Analytics and other analytics platforms. Add utm_source, utm_medium, utm_campaign, utm_term, and utm_content parameters to any URL and generate a clean, shareable tracking link.",
    faqs: [
      { question: "What are UTM parameters?", answer: "UTM parameters are tags added to the end of a URL that tell analytics tools where your traffic originated. The five standard parameters are utm_source (e.g., newsletter), utm_medium (e.g., email), utm_campaign (e.g., spring_sale), utm_term, and utm_content." },
      { question: "Are UTM parameters required for Google Analytics tracking?", answer: "UTM parameters are not required for basic traffic tracking, but they provide precise attribution for paid and owned channels. Without UTMs, campaign traffic may be grouped under 'direct' or miscategorized." },
      { question: "Do UTM parameters affect SEO?", answer: "UTM parameters do not affect organic search rankings. Google recommends using canonical tags or parameter settings in Search Console if UTM links are being indexed unintentionally." }
    ],
    howToSteps: [
      { name: "Enter the destination URL", text: "Paste the page URL you want to add tracking parameters to." },
      { name: "Fill in the UTM parameters", text: "Enter values for utm_source (traffic source), utm_medium (marketing channel), and utm_campaign (campaign name). Optionally add utm_term and utm_content for more granular tracking." },
      { name: "Copy the tagged URL", text: "Click 'Generate URL' and copy the complete UTM-tagged URL to use in your email, social post, ad, or other marketing channel." }
    ],
    useCases: [
      "Tracking which email campaigns drive the most website traffic and conversions",
      "Comparing performance of paid social ads versus organic social posts",
      "Measuring click-through rates from different newsletter content sections",
      "Attributing sales to specific influencer partnerships or affiliate links"
    ],
    relatedSlugs: ["url-encoder", "url-parser", "qr-code-generator"]
  },
  { slug: "email-validator", name: "Email Validator", description: "Validate email address format and check for common issues.", category: "seo", icon: "📧", keywords: ["email validator", "email checker", "validate email", "email format"], subcategory: "analysis",
    longDescription: "Email Validator checks email addresses for correct format, valid domain structure, and common typos — helping you catch invalid entries before they enter your database or mailing list. It validates the syntax against RFC standards and optionally checks that the domain's MX records exist.",
    faqs: [
      { question: "Does this validator check if the email address actually exists?", answer: "The tool validates email format and checks that the domain has valid MX records (indicating it can receive email), but it cannot confirm whether a specific mailbox exists without attempting to send a message." },
      { question: "What email format rules are checked?", answer: "The validator checks for a valid local part (before the @), a valid domain (after the @), correct use of dots and special characters, and that the domain has a valid TLD — based on RFC 5322 standards." },
      { question: "Can I validate a list of email addresses at once?", answer: "Yes — paste multiple email addresses (one per line) into the bulk input field to validate an entire list at once, with results showing which are valid and which have issues." }
    ],
    howToSteps: [
      { name: "Enter the email address", text: "Type or paste the email address you want to validate into the input field." },
      { name: "Run the validation", text: "Click 'Validate' to check the email format, domain, and MX records." },
      { name: "Review the results", text: "See whether the email is valid, the specific format errors if invalid, and whether the domain appears to accept email." }
    ],
    useCases: [
      "Validating email inputs on registration and contact forms before saving to a database",
      "Cleaning a mailing list by identifying and removing invalid email addresses",
      "Catching common typos like @gmial.com or @yaho.com in user-submitted forms",
      "Verifying email addresses collected at events before importing into a CRM"
    ],
    relatedSlugs: ["regex-tester", "extract-emails", "fake-data-generator"]
  },
  { slug: "twitter-card-preview", name: "Twitter Card Preview", description: "Preview how your content will look when shared on Twitter/X.", category: "seo", icon: "🐦", keywords: ["twitter card", "x card", "social card", "twitter preview"], subcategory: "preview",
    longDescription: "Twitter Card Preview shows you an accurate visual mockup of how your page will appear as a card when shared on Twitter/X — including summary cards, large image cards, and app cards. Test your twitter:title, twitter:description, and twitter:image tags before your content goes live.",
    faqs: [
      { question: "What types of Twitter Cards can I preview?", answer: "The tool supports previews for the two most common types: 'summary' cards (small square image with title and description) and 'summary_large_image' cards (large banner image with title and description below)." },
      { question: "What is the ideal Twitter Card image size?", answer: "For summary_large_image cards, use an image that is at least 300×157 pixels and ideally 1200×628 pixels for crisp display on high-DPI screens. Images must be under 5 MB." },
      { question: "Do Twitter Card tags override Open Graph tags?", answer: "Yes — if both Twitter Card and Open Graph tags are present, Twitter uses its own card tags when they exist and falls back to og: tags only when twitter: tags are missing." }
    ],
    howToSteps: [
      { name: "Enter your card metadata", text: "Fill in your twitter:title, twitter:description, and twitter:image URL, and select the card type (summary or summary_large_image)." },
      { name: "Preview the card", text: "View a live mockup of how the card will appear in a Twitter/X feed when someone shares or tweets your URL." },
      { name: "Copy the meta tags", text: "Copy the generated HTML meta tags to paste into your page's <head> section." }
    ],
    useCases: [
      "Content creators ensuring their articles display attractively when tweeted",
      "Developers verifying Twitter Card implementation before launching a page",
      "Marketing teams A/B testing different image and headline combinations for social sharing",
      "Bloggers and publishers confirming their featured images appear in Twitter shares"
    ],
    relatedSlugs: ["og-preview", "google-serp-preview", "meta-tag-generator"]
  },
  { slug: "readability-checker", name: "Readability Checker", description: "Check the readability score and reading level of your content.", category: "seo", icon: "📖", keywords: ["readability", "flesch score", "reading level", "content readability"], subcategory: "analysis",
    longDescription: "Readability Checker analyzes your text against multiple readability formulas — including Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, and Coleman-Liau — to estimate the reading difficulty and education level required to understand your content. Use it to ensure your writing reaches your intended audience.",
    faqs: [
      { question: "What is the Flesch Reading Ease score?", answer: "The Flesch Reading Ease score rates text on a scale of 0–100. Higher scores indicate easier reading: 60–70 is considered standard (suitable for 13–15 year olds), while 90+ is very easy and 30 and below is considered difficult academic text." },
      { question: "What reading level should I target for web content?", answer: "Most web content aimed at a general audience should target a 7th to 9th grade reading level (Flesch-Kincaid Grade 7–9). High-conversion landing page copy often targets even lower — around Grade 6 — for maximum accessibility." },
      { question: "What affects readability scores the most?", answer: "Sentence length and syllable count per word have the greatest impact on readability. Shorter sentences and simpler vocabulary produce higher (easier) readability scores." }
    ],
    howToSteps: [
      { name: "Paste your content", text: "Copy and paste the article, webpage copy, or document text you want to analyze into the text area." },
      { name: "Run the readability analysis", text: "Click 'Analyze' to calculate readability scores across multiple formulas." },
      { name: "Review scores and simplify", text: "Check your Flesch score and grade level against your target audience, then use the suggestions to shorten sentences and replace complex words." }
    ],
    useCases: [
      "Content writers verifying their articles are accessible to a general audience",
      "UX writers ensuring app copy is concise and easy to understand",
      "Academic authors checking that research papers meet target complexity levels",
      "SEO teams optimizing landing page copy for clarity and conversion"
    ],
    relatedSlugs: ["word-counter", "keyword-density", "word-frequency"]
  },

  // ── New SEO Tools ──────────────────────────────────────────
  { slug: "sitemap-generator", name: "Sitemap Generator", description: "Generate XML sitemaps for your website from a list of URLs.", category: "seo", icon: "🗺️", keywords: ["sitemap generator", "xml sitemap", "seo sitemap", "site map"], subcategory: "tracking",
    longDescription: "Sitemap Generator creates a valid XML sitemap from a list of URLs you provide, complete with optional lastmod, changefreq, and priority attributes for each page. Submit the generated sitemap to Google Search Console and Bing Webmaster Tools to accelerate crawling and indexing of your pages.",
    faqs: [
      { question: "What is an XML sitemap and why do I need one?", answer: "An XML sitemap is a file that lists all important pages on your website, helping search engine crawlers discover and index your content more efficiently — particularly useful for large sites, new sites, and pages with few internal links." },
      { question: "How many URLs can I include in the sitemap?", answer: "Google and Bing support up to 50,000 URLs per sitemap file. For larger sites, you can generate multiple sitemap files and reference them in a sitemap index file." },
      { question: "Do I need to include every page of my site in the sitemap?", answer: "Only include pages you want indexed — exclude thank-you pages, login pages, duplicate content, and pages with noindex directives. Quality over quantity is the best approach." }
    ],
    howToSteps: [
      { name: "Enter your URLs", text: "Paste your list of page URLs (one per line) into the URL input field, or import from a CSV file." },
      { name: "Set optional attributes", text: "Optionally set lastmod dates, changefreq values (daily, weekly, monthly), and priority (0.1–1.0) for your pages." },
      { name: "Download and submit", text: "Click 'Generate Sitemap' to download the XML file, upload it to your site's root directory, and submit the URL to Google Search Console." }
    ],
    useCases: [
      "Creating an initial sitemap for a newly launched website to accelerate Google indexing",
      "Generating an updated sitemap after adding new pages to an existing site",
      "Building sitemaps for static sites that don't have CMS-generated sitemap plugins",
      "Manually creating a sitemap for a section or subsection of a larger website"
    ],
    relatedSlugs: ["robots-txt-generator", "meta-tag-generator", "google-serp-preview"]
  },
  { slug: "schema-markup-generator", name: "Schema Markup Generator", description: "Generate JSON-LD structured data for rich search results.", category: "seo", icon: "📋", keywords: ["schema markup", "json-ld", "structured data", "rich snippets"], subcategory: "tracking",
    longDescription: "Schema Markup Generator creates valid JSON-LD structured data for common schema types — including Article, Product, FAQ, LocalBusiness, BreadcrumbList, and more — that enable rich results in Google Search. Fill in your details through a guided form and copy the generated JSON-LD directly into your page.",
    faqs: [
      { question: "What are rich results and how does schema markup enable them?", answer: "Rich results are enhanced search listings that display additional information — such as star ratings, FAQ dropdowns, product prices, or event dates — directly in Google's results. Schema markup tells Google what type of content is on your page so it can generate these enriched displays." },
      { question: "Which schema types are most valuable for SEO?", answer: "FAQ schema, HowTo schema, Product schema (with Review/AggregateRating), BreadcrumbList, Article, and LocalBusiness are among the most impactful for earning rich results in Google Search." },
      { question: "Where do I add the generated JSON-LD to my page?", answer: "Place the <script type=\"application/ld+json\"> block anywhere in your page's <head> or <body> section. Google recommends putting it in the <head> for clarity." }
    ],
    howToSteps: [
      { name: "Select a schema type", text: "Choose the type of structured data you need from the schema type selector (e.g., Article, FAQ, Product, LocalBusiness)." },
      { name: "Fill in the schema fields", text: "Complete the form fields for your chosen schema type — such as name, description, rating, price, or FAQ question/answer pairs." },
      { name: "Copy the JSON-LD", text: "Copy the generated JSON-LD script tag and paste it into your page's HTML to enable rich results." }
    ],
    useCases: [
      "Adding FAQ schema to a support page to display answer dropdowns in Google results",
      "Implementing Product schema with ratings on an e-commerce product page",
      "Adding Article schema to a blog post to enable AMP rich results",
      "Implementing LocalBusiness schema for a local business to appear in map packs"
    ],
    relatedSlugs: ["meta-tag-generator", "google-serp-preview", "og-preview"]
  },
  { slug: "slug-generator", name: "SEO Slug Generator", description: "Generate SEO-friendly URL slugs with keyword optimization.", category: "seo", icon: "🔗", keywords: ["seo slug", "url slug", "permalink generator", "seo url"], subcategory: "tracking",
    longDescription: "SEO Slug Generator converts any title, headline, or phrase into a clean, lowercase, hyphen-separated URL slug following SEO best practices. It strips special characters, removes common stop words, and applies URL-safe encoding, giving you a keyword-rich permalink ready to use on any CMS or website.",
    faqs: [
      { question: "What makes a good SEO URL slug?", answer: "A good slug is short (under 60 characters), contains the primary keyword, uses hyphens to separate words, is all lowercase, and avoids stop words like 'the', 'a', 'is', and 'of' that add length without SEO value." },
      { question: "Should I remove stop words from slugs?", answer: "Removing stop words from slugs is a common SEO practice to keep URLs concise and keyword-focused. However, for very short titles where removing stops words creates a confusing URL, it's fine to keep them." },
      { question: "Does the URL slug affect SEO rankings?", answer: "URL slugs are a minor on-page ranking factor. Including your target keyword in the slug is a good practice, but it has far less impact than the page title, content, and backlinks." }
    ],
    howToSteps: [
      { name: "Enter your title or phrase", text: "Type or paste the page title, article headline, or phrase you want to convert into a URL slug." },
      { name: "Configure stop word removal", text: "Choose whether to remove stop words (recommended for shorter, cleaner slugs) or keep all words." },
      { name: "Copy the generated slug", text: "Click 'Generate' and copy the clean, hyphenated slug to use as your page's URL permalink." }
    ],
    useCases: [
      "Generating clean permalink slugs for WordPress, Ghost, or Webflow pages",
      "Creating SEO-optimized URL paths when building static site pages",
      "Standardizing URL formats when migrating content to a new CMS",
      "Converting product names into clean category and product URL slugs"
    ],
    relatedSlugs: ["slugify", "utm-builder", "url-encoder"]
  },
  { slug: "heading-analyzer", name: "Heading Analyzer", description: "Analyze and score your headlines for SEO effectiveness and emotional impact.", category: "seo", icon: "📝", keywords: ["heading analyzer", "headline scorer", "title analyzer", "seo headline"], subcategory: "analysis",
    longDescription: "Heading Analyzer scores your headlines based on word balance (common, uncommon, emotional, and power words), length, and overall sentiment — giving you actionable feedback to craft titles that rank well in search results and compel readers to click. It's modeled on headline scoring principles used by top content marketers.",
    faqs: [
      { question: "What makes a headline score high?", answer: "High-scoring headlines include a mix of common words (which provide clarity), uncommon words (which add novelty), emotional words (which drive clicks), and power words (which add authority). They are also an appropriate length — typically 6–10 words." },
      { question: "What are power words in a headline?", answer: "Power words are persuasive, emotionally charged words that trigger a response in readers — such as 'proven', 'secret', 'ultimate', 'essential', 'surprising', and 'guaranteed'. Using one or two in a headline increases click-through rates." },
      { question: "What is the ideal headline length for SEO?", answer: "For blog posts and articles, 6–10 words (50–70 characters) works best — long enough to be descriptive but short enough to fit in a Google title tag without truncation." }
    ],
    howToSteps: [
      { name: "Enter your headline", text: "Type or paste the headline, title, or heading you want to analyze." },
      { name: "Review your score and breakdown", text: "See your overall score out of 100 and a word-type breakdown showing how many common, uncommon, emotional, and power words your headline contains." },
      { name: "Revise based on suggestions", text: "Use the specific improvement tips to adjust word choices and increase your headline's emotional and SEO impact." }
    ],
    useCases: [
      "Blog writers optimizing article titles for higher organic click-through rates",
      "Email marketers improving subject line performance with emotional language",
      "Content teams A/B testing headline variations before publishing",
      "SEO consultants auditing client content for title tag optimization opportunities"
    ],
    relatedSlugs: ["keyword-density", "readability-checker", "google-serp-preview"]
  },
  { slug: "backlink-checker", name: "Backlink Checker", description: "Check the number and quality of backlinks pointing to any URL.", category: "seo", icon: "🔗", keywords: ["backlink checker", "link checker", "seo backlinks", "link analysis"], subcategory: "analysis",
    longDescription: "Backlink Checker retrieves a summary of inbound links pointing to any URL — including referring domains, anchor text distribution, and link authority signals — helping you understand your site's link profile and identify link-building opportunities. Analyze both your own site and competitor domains.",
    faqs: [
      { question: "Why do backlinks matter for SEO?", answer: "Backlinks from authoritative, relevant websites are one of Google's most important ranking factors. Each quality backlink acts as a vote of confidence, signaling that other sites consider your content trustworthy and valuable." },
      { question: "What is a referring domain versus a backlink?", answer: "A backlink is a single incoming link from another page. A referring domain is the unique website that link comes from. 100 backlinks from one domain counts as one referring domain — diversity of referring domains is generally more valuable than volume of raw links." },
      { question: "How can I use backlink data to improve my SEO?", answer: "Analyze which pages on your site attract the most backlinks, find competitors' backlink sources you could replicate, identify toxic or spammy links to disavow, and discover content gaps where more authoritative links could be built." }
    ],
    howToSteps: [
      { name: "Enter the URL to analyze", text: "Type or paste the domain or specific page URL you want to check backlinks for." },
      { name: "Run the backlink analysis", text: "Click 'Check Backlinks' to retrieve link data including total backlinks, referring domains, and top anchor texts." },
      { name: "Review and act on the data", text: "Examine the referring domain list to find link-building opportunities, identify weak areas, and compare your profile to competitors." }
    ],
    useCases: [
      "Auditing your own website's backlink profile as part of an SEO review",
      "Analyzing competitor backlinks to find link-building targets",
      "Monitoring new and lost backlinks after content updates or outreach campaigns",
      "Identifying toxic or low-quality links that may be harming search rankings"
    ],
    relatedSlugs: ["whois-lookup", "google-serp-preview", "keyword-density"]
  },
  { slug: "meta-length-checker", name: "Meta Tag Length Checker", description: "Check if your title tags and meta descriptions are the optimal length.", category: "seo", icon: "📏", keywords: ["meta length", "title tag length", "meta description length", "seo checker"], subcategory: "analysis",
    longDescription: "Meta Tag Length Checker instantly evaluates your title tags and meta descriptions against Google's display character limits, showing you exactly how much of your text will appear in search results and flagging entries that are too short, too long, or containing special characters that affect rendering.",
    faqs: [
      { question: "What is the maximum title tag length for Google?", answer: "Google typically displays title tags up to approximately 580 pixels wide (roughly 60 characters in a standard font). Titles exceeding this are truncated with an ellipsis. The tool counts characters and estimates pixel width." },
      { question: "What happens if my meta description is too long?", answer: "Google truncates meta descriptions that exceed approximately 155–160 characters, cutting off the text mid-sentence with '...' — potentially hiding your most compelling CTA or key information." },
      { question: "Should my title tag and page H1 be identical?", answer: "They don't need to be identical, and having slight variation can be beneficial — the title tag is optimized for search result clicks while the H1 can be tailored for the on-page reading experience." }
    ],
    howToSteps: [
      { name: "Enter your title tag", text: "Type or paste your page title in the title field. The tool shows a character count and a visual indicator for the optimal range." },
      { name: "Enter your meta description", text: "Paste your meta description text. The character counter and status indicator update in real time." },
      { name: "Review and adjust", text: "Fix any title or description flagged as too long or too short until both fall within the optimal display ranges." }
    ],
    useCases: [
      "SEO auditors checking all page titles and descriptions on a site for length compliance",
      "Content writers reviewing new posts before publishing to ensure correct meta lengths",
      "Developers building CMS templates that enforce proper meta length restrictions",
      "E-commerce managers optimizing category and product page titles for search display"
    ],
    relatedSlugs: ["meta-tag-generator", "google-serp-preview", "readability-checker"]
  },
  { slug: "page-speed-checker", name: "Page Speed Checker", description: "Test your website loading speed and get optimization suggestions.", category: "seo", icon: "⚡", keywords: ["page speed", "website speed", "performance test", "loading time"], subcategory: "analysis",
    longDescription: "Page Speed Checker tests your website's load time and returns Core Web Vitals metrics — including Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) — along with actionable recommendations to improve performance and Google's page experience score.",
    faqs: [
      { question: "What are Core Web Vitals and why do they matter?", answer: "Core Web Vitals are Google's set of standardized performance metrics: LCP (loading speed), FID/INP (interactivity), and CLS (visual stability). They are an official Google ranking signal, meaning poor scores can negatively affect your search rankings." },
      { question: "What is a good page load time?", answer: "Google recommends that Largest Contentful Paint (the main content loading) happens within 2.5 seconds. Pages loading under 1 second feel instant; above 3 seconds users start abandoning the page." },
      { question: "What are the most common ways to speed up a web page?", answer: "The highest-impact improvements are usually: compressing and serving images in WebP format, enabling browser caching, minifying CSS/JS, using a CDN, reducing server response time (TTFB), and eliminating render-blocking resources." }
    ],
    howToSteps: [
      { name: "Enter your page URL", text: "Type or paste the URL of the web page you want to test." },
      { name: "Run the speed test", text: "Click 'Test Speed' to analyze the page and collect performance metrics. The test takes 20–60 seconds." },
      { name: "Review scores and fix issues", text: "Examine your Core Web Vitals scores and the prioritized list of optimization recommendations, starting with the highest-impact items." }
    ],
    useCases: [
      "Identifying performance bottlenecks on a slow-loading landing page",
      "Checking Core Web Vitals scores before a site launch to meet Google's requirements",
      "Comparing page speed before and after optimization changes",
      "Auditing client websites for performance issues as part of an SEO engagement"
    ],
    relatedSlugs: ["html-minifier", "css-minifier", "image-compressor"]
  },
  { slug: "redirect-checker", name: "Redirect Checker", description: "Check URL redirect chains and find redirect loops.", category: "seo", icon: "↪️", keywords: ["redirect checker", "301 redirect", "redirect chain", "url redirect"], subcategory: "tracking",
    longDescription: "Redirect Checker traces the full redirect chain for any URL — showing each hop from the original URL to the final destination, along with HTTP status codes (301, 302, 307, 308) at each step. Use it to identify redirect chains that slow page speed, catch redirect loops, and verify that canonicals and moved pages resolve correctly.",
    faqs: [
      { question: "What is a redirect chain and why is it a problem?", answer: "A redirect chain occurs when a URL redirects to another URL that itself redirects — creating multiple hops before reaching the final destination. Each hop adds latency and can dilute link equity passed through the redirect." },
      { question: "What is the difference between a 301 and 302 redirect?", answer: "A 301 is a permanent redirect — it signals to search engines that the content has moved permanently and passes most link equity to the destination. A 302 is a temporary redirect that does not pass full link equity and tells search engines to keep indexing the original URL." },
      { question: "How do I detect a redirect loop?", answer: "A redirect loop occurs when two or more URLs redirect to each other in a circle, resulting in an infinite loop. The redirect checker detects loops and flags them clearly, showing exactly which URLs are caught in the cycle." }
    ],
    howToSteps: [
      { name: "Enter the URL to check", text: "Paste the URL you want to trace redirects for into the input field." },
      { name: "Run the redirect check", text: "Click 'Check Redirects' to follow the redirect chain and retrieve the HTTP status code at each step." },
      { name: "Analyze the chain", text: "Review each redirect hop, its status code, and the final destination URL. Fix any chains longer than one hop or identify and resolve any loops." }
    ],
    useCases: [
      "Verifying 301 redirects are set up correctly after a website migration",
      "Diagnosing slow page loads caused by unnecessary redirect chains",
      "Confirming that changed permalink structures resolve to the correct final URLs",
      "Detecting and fixing redirect loops before they cause crawl errors"
    ],
    relatedSlugs: ["htaccess-generator", "url-parser", "backlink-checker"]
  },
];
