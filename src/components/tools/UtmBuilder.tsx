"use client";

import { useState, useCallback, useMemo } from "react";

interface Preset {
  label: string;
  source: string;
  medium: string;
}

const PRESETS: Preset[] = [
  { label: "Google / CPC", source: "google", medium: "cpc" },
  { label: "Facebook / Social", source: "facebook", medium: "social" },
  { label: "Twitter / Social", source: "twitter", medium: "social" },
  { label: "LinkedIn / Social", source: "linkedin", medium: "social" },
  { label: "Newsletter / Email", source: "newsletter", medium: "email" },
  { label: "Instagram / Social", source: "instagram", medium: "social" },
  { label: "YouTube / Video", source: "youtube", medium: "video" },
  { label: "Bing / CPC", source: "bing", medium: "cpc" },
];

export default function UtmBuilder() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const builtUrl = useMemo(() => {
    if (!url) return "";
    try {
      let base = url.trim();
      if (!/^https?:\/\//i.test(base)) base = "https://" + base;
      const u = new URL(base);
      if (source) u.searchParams.set("utm_source", source.trim());
      if (medium) u.searchParams.set("utm_medium", medium.trim());
      if (campaign) u.searchParams.set("utm_campaign", campaign.trim());
      if (term) u.searchParams.set("utm_term", term.trim());
      if (content) u.searchParams.set("utm_content", content.trim());
      return u.toString();
    } catch {
      return "";
    }
  }, [url, source, medium, campaign, term, content]);

  const applyPreset = useCallback((preset: Preset) => {
    setSource(preset.source);
    setMedium(preset.medium);
  }, []);

  const copyUrl = useCallback(async () => {
    if (!builtUrl) return;
    await navigator.clipboard.writeText(builtUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [builtUrl]);

  const isValid = url.trim().length > 0 && source.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Quick Presets
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p)}
              className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Website URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/landing-page"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Campaign Source <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="google, facebook, newsletter"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-muted-foreground">utm_source (required)</p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Campaign Medium
            </label>
            <input
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="cpc, social, email"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-muted-foreground">utm_medium</p>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Campaign Name
          </label>
          <input
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="spring_sale, product_launch"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1 text-xs text-muted-foreground">utm_campaign</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Campaign Term <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="running+shoes"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-muted-foreground">utm_term</p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Campaign Content <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="banner_ad, text_link"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-muted-foreground">utm_content</p>
          </div>
        </div>
      </div>

      {/* Result */}
      {builtUrl && isValid ? (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Generated URL</h3>
            <button
              onClick={copyUrl}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copied ? "Copied!" : "Copy URL"}
            </button>
          </div>
          <p className="break-all rounded-lg bg-background p-3 font-mono text-sm text-foreground">
            {builtUrl}
          </p>
          <div className="space-y-1 text-xs text-muted-foreground">
            {source && <p><span className="font-medium">utm_source:</span> {source}</p>}
            {medium && <p><span className="font-medium">utm_medium:</span> {medium}</p>}
            {campaign && <p><span className="font-medium">utm_campaign:</span> {campaign}</p>}
            {term && <p><span className="font-medium">utm_term:</span> {term}</p>}
            {content && <p><span className="font-medium">utm_content:</span> {content}</p>}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Enter a website URL and at least a campaign source to generate a UTM-tagged URL.
          </p>
        </div>
      )}
    </div>
  );
}
