"use client";

import { useState } from "react";
import ErrorAlert from "@/components/ui/ErrorAlert";
import ToolSection from "@/components/ui/ToolSection";
import ResultGrid from "@/components/ui/ResultGrid";

interface SecurityHeaders {
  hsts: boolean;
  csp: boolean;
  xfo: boolean;
  xcto: boolean;
  referrerPolicy: boolean;
  permissions: boolean;
}

interface MetaTags {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  canonical?: string;
  robots?: string;
}

interface SiteResult {
  url: string;
  httpStatus?: number;
  server?: string;
  poweredBy?: string;
  securityHeaders: SecurityHeaders | null;
  robotsTxt: { exists: boolean; sitemapUrls: string[]; disallowRules: string[] } | null;
  sitemap: { exists: boolean; url: string } | null;
  metaTags: MetaTags | null;
  isHttps: boolean;
}

const SECURITY_HEADERS = [
  { key: "hsts" as const, label: "Strict-Transport-Security", desc: "Forces HTTPS connections" },
  { key: "csp" as const, label: "Content-Security-Policy", desc: "Prevents XSS and injection attacks" },
  { key: "xfo" as const, label: "X-Frame-Options", desc: "Prevents clickjacking" },
  { key: "xcto" as const, label: "X-Content-Type-Options", desc: "Prevents MIME sniffing" },
  { key: "referrerPolicy" as const, label: "Referrer-Policy", desc: "Controls referrer information" },
  { key: "permissions" as const, label: "Permissions-Policy", desc: "Controls browser features" },
];

const BACKLINK_TOOLS = [
  { name: "Ahrefs", url: "https://ahrefs.com/backlink-checker", desc: "DR, referring domains, top backlinks" },
  { name: "Moz Link Explorer", url: "https://moz.com/link-explorer", desc: "DA, PA, spam score (10 free queries/month)" },
  { name: "SEMrush", url: "https://www.semrush.com/analytics/backlinks/", desc: "Comprehensive backlink analytics" },
  { name: "Google Search Console", url: "https://search.google.com/search-console", desc: "Free — backlinks Google found (your own site)" },
];

export default function BacklinkChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SiteResult | null>(null);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/site-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Analysis failed");
      setResult(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const securityScore = result?.securityHeaders
    ? Object.values(result.securityHeaders).filter(Boolean).length
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && url && analyze()}
          placeholder="https://example.com"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={analyze}
          disabled={!url || loading}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Site"}
        </button>
      </div>

      {error && <ErrorAlert message={error} />}

      {result && (
        <div className="space-y-4">
          {/* Overview */}
          <ResultGrid
            stats={[
              { label: "HTTP Status", value: result.httpStatus || "N/A" },
              { label: "HTTPS", value: result.isHttps ? "Yes" : "No" },
              { label: "Server", value: result.server || "Hidden" },
              { label: "Security Score", value: `${securityScore}/6` },
              { label: "Robots.txt", value: result.robotsTxt?.exists ? "Found" : "Missing" },
              { label: "Sitemap", value: result.sitemap?.exists ? "Found" : "Missing" },
            ]}
            columns={3}
          />

          {/* Security Headers */}
          {result.securityHeaders && (
            <ToolSection title="Security Headers">
              <div className="space-y-1.5">
                {SECURITY_HEADERS.map(({ key, label, desc }) => {
                  const present = result.securityHeaders![key];
                  return (
                    <div key={key} className="flex items-center justify-between rounded-lg bg-background p-2.5">
                      <div>
                        <p className="text-xs font-medium text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                      <span className={`text-sm font-bold ${present ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {present ? "\u2713" : "\u2717"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ToolSection>
          )}

          {/* Meta Tags */}
          {result.metaTags && (
            <ToolSection title="SEO Meta Tags">
              <div className="space-y-1.5">
                {[
                  { label: "Title", value: result.metaTags.title, max: 60 },
                  { label: "Description", value: result.metaTags.description, max: 160 },
                  { label: "OG Title", value: result.metaTags.ogTitle },
                  { label: "OG Description", value: result.metaTags.ogDescription },
                  { label: "OG Image", value: result.metaTags.ogImage },
                  { label: "Twitter Card", value: result.metaTags.twitterCard },
                  { label: "Canonical URL", value: result.metaTags.canonical },
                  { label: "Robots", value: result.metaTags.robots },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div key={item.label} className="rounded-lg bg-background p-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-medium text-muted-foreground shrink-0">{item.label}</span>
                        {"max" in item && item.max && item.value && item.value.length > item.max && (
                          <span className="text-xs text-yellow-600 dark:text-yellow-400 shrink-0">
                            {item.value.length}/{item.max} chars
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-foreground mt-1 break-all">{item.value}</p>
                    </div>
                  ))}
                {!result.metaTags.title && !result.metaTags.description && (
                  <p className="text-sm text-muted-foreground">No meta tags found. This may indicate the page uses client-side rendering.</p>
                )}
              </div>
            </ToolSection>
          )}

          {/* Robots.txt */}
          {result.robotsTxt?.exists && (
            <ToolSection title="Robots.txt">
              {result.robotsTxt.disallowRules.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Disallow Rules:</p>
                  <div className="space-y-1">
                    {result.robotsTxt.disallowRules.slice(0, 10).map((rule, i) => (
                      <div key={i} className="rounded-lg bg-background p-2">
                        <span className="text-xs font-mono text-foreground">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {result.robotsTxt.sitemapUrls.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Sitemaps declared:</p>
                  <div className="space-y-1">
                    {result.robotsTxt.sitemapUrls.map((url, i) => (
                      <div key={i} className="rounded-lg bg-background p-2">
                        <span className="text-xs font-mono text-foreground break-all">{url}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ToolSection>
          )}

          {/* Professional Backlink Tools */}
          <ToolSection title="Professional Backlink Analysis">
            <p className="text-xs text-muted-foreground mb-3">
              Backlink data requires large-scale web crawling databases. Use these professional tools for detailed backlink analysis:
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {BACKLINK_TOOLS.map((t) => (
                <a
                  key={t.name}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-3 hover:border-primary transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </ToolSection>
        </div>
      )}

      {!loading && !result && !error && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Enter a URL to analyze its SEO setup, security headers, and meta tags.
          </p>
        </div>
      )}
    </div>
  );
}
