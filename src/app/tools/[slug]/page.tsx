import { notFound } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import { tools, getToolBySlug, getToolsByCategory, categories } from "@/lib/tools";
import { generateToolMetadata, generateToolJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import AdBanner from "@/components/AdBanner";

/* ── Tool component map (lazy-loaded) ──────────────────────────── */
const toolComponents: Record<string, ComponentType> = {
  // Text Tools
  "word-counter": dynamic(() => import("@/components/tools/WordCounter")),
  "case-converter": dynamic(() => import("@/components/tools/CaseConverter")),
  "lorem-ipsum": dynamic(() => import("@/components/tools/LoremIpsum")),
  "text-diff": dynamic(() => import("@/components/tools/TextDiff")),
  "slugify": dynamic(() => import("@/components/tools/Slugify")),
  "text-reverser": dynamic(() => import("@/components/tools/TextReverser")),
  "line-sorter": dynamic(() => import("@/components/tools/LineSorter")),
  "duplicate-line-remover": dynamic(() => import("@/components/tools/DuplicateLineRemover")),
  "word-frequency": dynamic(() => import("@/components/tools/WordFrequency")),
  "whitespace-remover": dynamic(() => import("@/components/tools/WhitespaceRemover")),
  "add-line-numbers": dynamic(() => import("@/components/tools/AddLineNumbers")),
  "text-repeater": dynamic(() => import("@/components/tools/TextRepeater")),
  "fancy-text": dynamic(() => import("@/components/tools/FancyText")),
  "text-to-binary": dynamic(() => import("@/components/tools/TextToBinary")),
  "string-length": dynamic(() => import("@/components/tools/StringLength")),

  // Developer Tools
  "json-formatter": dynamic(() => import("@/components/tools/JsonFormatter")),
  "base64-encoder": dynamic(() => import("@/components/tools/Base64Encoder")),
  "url-encoder": dynamic(() => import("@/components/tools/UrlEncoder")),
  "html-entity-encoder": dynamic(() => import("@/components/tools/HtmlEntityEncoder")),
  "regex-tester": dynamic(() => import("@/components/tools/RegexTester")),
  "css-minifier": dynamic(() => import("@/components/tools/CssMinifier")),
  "javascript-minifier": dynamic(() => import("@/components/tools/JavascriptMinifier")),
  "html-prettifier": dynamic(() => import("@/components/tools/HtmlPrettifier")),
  "sql-formatter": dynamic(() => import("@/components/tools/SqlFormatter")),
  "markdown-preview": dynamic(() => import("@/components/tools/MarkdownPreview")),
  "cron-parser": dynamic(() => import("@/components/tools/CronParser")),
  "jwt-decoder": dynamic(() => import("@/components/tools/JwtDecoder")),
  "css-gradient-generator": dynamic(() => import("@/components/tools/CssGradientGenerator")),
  "box-shadow-generator": dynamic(() => import("@/components/tools/BoxShadowGenerator")),
  "meta-tag-generator": dynamic(() => import("@/components/tools/MetaTagGenerator")),
  "chmod-calculator": dynamic(() => import("@/components/tools/ChmodCalculator")),
  "csv-to-json": dynamic(() => import("@/components/tools/CsvToJson")),
  "xml-to-json": dynamic(() => import("@/components/tools/XmlToJson")),
  "yaml-to-json": dynamic(() => import("@/components/tools/YamlToJson")),
  "user-agent-parser": dynamic(() => import("@/components/tools/UserAgentParser")),

  // Math Tools
  "percentage-calculator": dynamic(() => import("@/components/tools/PercentageCalculator")),
  "scientific-calculator": dynamic(() => import("@/components/tools/ScientificCalculator")),
  "bmi-calculator": dynamic(() => import("@/components/tools/BmiCalculator")),
  "age-calculator": dynamic(() => import("@/components/tools/AgeCalculator")),
  "loan-calculator": dynamic(() => import("@/components/tools/LoanCalculator")),
  "compound-interest": dynamic(() => import("@/components/tools/CompoundInterest")),
  "tip-calculator": dynamic(() => import("@/components/tools/TipCalculator")),
  "discount-calculator": dynamic(() => import("@/components/tools/DiscountCalculator")),
  "average-calculator": dynamic(() => import("@/components/tools/AverageCalculator")),
  "roman-numeral-converter": dynamic(() => import("@/components/tools/RomanNumeralConverter")),
  "random-number-generator": dynamic(() => import("@/components/tools/RandomNumberGenerator")),
  "gpa-calculator": dynamic(() => import("@/components/tools/GpaCalculator")),

  // Converters
  "unit-converter": dynamic(() => import("@/components/tools/UnitConverter")),
  "color-converter": dynamic(() => import("@/components/tools/ColorConverter")),
  "number-base-converter": dynamic(() => import("@/components/tools/NumberBaseConverter")),
  "timestamp-converter": dynamic(() => import("@/components/tools/TimestampConverter")),
  "morse-code": dynamic(() => import("@/components/tools/MorseCode")),
  "timezone-converter": dynamic(() => import("@/components/tools/TimezoneConverter")),
  "cooking-converter": dynamic(() => import("@/components/tools/CookingConverter")),
  "hex-to-text": dynamic(() => import("@/components/tools/HexToText")),
  "markdown-to-html": dynamic(() => import("@/components/tools/MarkdownToHtml")),
  "csv-to-table": dynamic(() => import("@/components/tools/CsvToTable")),
  "text-to-nato": dynamic(() => import("@/components/tools/TextToNato")),
  "currency-converter": dynamic(() => import("@/components/tools/CurrencyConverter")),
  "image-to-base64": dynamic(() => import("@/components/tools/ImageToBase64")),
  "json-to-typescript": dynamic(() => import("@/components/tools/JsonToTypescript")),
  "pixels-to-rem": dynamic(() => import("@/components/tools/PixelsToRem")),

  // Generators
  "password-generator": dynamic(() => import("@/components/tools/PasswordGenerator")),
  "uuid-generator": dynamic(() => import("@/components/tools/UuidGenerator")),
  "qr-code-generator": dynamic(() => import("@/components/tools/QrCodeGenerator")),
  "color-palette-generator": dynamic(() => import("@/components/tools/ColorPaletteGenerator")),
  "fake-data-generator": dynamic(() => import("@/components/tools/FakeDataGenerator")),
  "placeholder-image": dynamic(() => import("@/components/tools/PlaceholderImage")),
  "invoice-generator": dynamic(() => import("@/components/tools/InvoiceGenerator")),
  "credit-card-validator": dynamic(() => import("@/components/tools/CreditCardValidator")),
  "emoji-picker": dynamic(() => import("@/components/tools/EmojiPicker")),
  "random-color": dynamic(() => import("@/components/tools/RandomColor")),
  "htaccess-generator": dynamic(() => import("@/components/tools/HtaccessGenerator")),
  "robots-txt-generator": dynamic(() => import("@/components/tools/RobotsTxtGenerator")),
  "privacy-policy-generator": dynamic(() => import("@/components/tools/PrivacyPolicyGenerator")),

  // Image Tools
  "image-resizer": dynamic(() => import("@/components/tools/ImageResizer")),
  "image-cropper": dynamic(() => import("@/components/tools/ImageCropper")),
  "image-compressor": dynamic(() => import("@/components/tools/ImageCompressor")),
  "svg-to-png": dynamic(() => import("@/components/tools/SvgToPng")),
  "favicon-generator": dynamic(() => import("@/components/tools/FaviconGenerator")),

  // Crypto & Security
  "hash-generator": dynamic(() => import("@/components/tools/HashGenerator")),
  "encryption-tool": dynamic(() => import("@/components/tools/EncryptionTool")),
  "rot13": dynamic(() => import("@/components/tools/Rot13")),
  "caesar-cipher": dynamic(() => import("@/components/tools/CaesarCipher")),
  "password-strength": dynamic(() => import("@/components/tools/PasswordStrength")),
  "checksum-calculator": dynamic(() => import("@/components/tools/ChecksumCalculator")),
  "ip-address-lookup": dynamic(() => import("@/components/tools/IpAddressLookup")),
  "whois-lookup": dynamic(() => import("@/components/tools/WhoisLookup")),

  // SEO & Marketing
  "og-preview": dynamic(() => import("@/components/tools/OgPreview")),
  "keyword-density": dynamic(() => import("@/components/tools/KeywordDensity")),
  "google-serp-preview": dynamic(() => import("@/components/tools/GoogleSerpPreview")),
  "utm-builder": dynamic(() => import("@/components/tools/UtmBuilder")),
  "email-validator": dynamic(() => import("@/components/tools/EmailValidator")),
  "twitter-card-preview": dynamic(() => import("@/components/tools/TwitterCardPreview")),
  "readability-checker": dynamic(() => import("@/components/tools/ReadabilityChecker")),

  // Utilities
  "pomodoro-timer": dynamic(() => import("@/components/tools/PomodoroTimer")),
  "countdown-timer": dynamic(() => import("@/components/tools/CountdownTimer")),
  "stopwatch": dynamic(() => import("@/components/tools/Stopwatch")),
  "notepad": dynamic(() => import("@/components/tools/Notepad")),
  "screen-resolution": dynamic(() => import("@/components/tools/ScreenResolution")),
};

/* ── Static params ──────────────────────────────────────────────── */
export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

/* ── SEO metadata ───────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return generateToolMetadata(tool);
}

/* ── Page ────────────────────────────────────────────────────────── */
export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const ToolComponent = toolComponents[tool.slug];
  const category = categories.find((c) => c.value === tool.category);

  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateToolJsonLd(tool)} />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="select-none">
            /
          </li>
          {category && (
            <>
              <li>
                <Link
                  href={`/categories/${tool.category}`}
                  className="transition-colors hover:text-foreground"
                >
                  {category.label}
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">
                /
              </li>
            </>
          )}
          <li className="font-medium text-foreground">{tool.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <span className="mr-3">{tool.icon}</span>
          {tool.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {tool.description}
        </p>
      </div>

      {/* Tool component */}
      {ToolComponent ? (
        <ToolComponent />
      ) : (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            This tool is coming soon.
          </p>
        </div>
      )}

      {/* Ad slot below tool */}
      <div className="mt-10">
        <AdBanner slot="tool-bottom-ad" format="horizontal" />
      </div>

      {/* Related tools — internal linking for SEO */}
      {relatedTools.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Related {category?.label ?? "Tools"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((rt) => (
              <Link
                key={rt.slug}
                href={`/tools/${rt.slug}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3 transition-colors hover:bg-muted"
              >
                <span className="text-xl">{rt.icon}</span>
                <div>
                  <p className="font-medium text-foreground text-sm">{rt.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{rt.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
