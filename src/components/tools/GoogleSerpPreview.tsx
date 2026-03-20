"use client";

import { useState, useCallback } from "react";

export default function GoogleSerpPreview() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const displayTitle = title || "Page Title - Site Name";
  const displayDescription =
    description ||
    "A compelling meta description that summarizes the page content and encourages users to click through from search results.";
  const displayUrl = url || "https://example.com/page";

  const truncatedTitle =
    displayTitle.length > 60
      ? displayTitle.slice(0, 57) + "..."
      : displayTitle;
  const truncatedDesc =
    displayDescription.length > 160
      ? displayDescription.slice(0, 157) + "..."
      : displayDescription;

  // Parse URL for breadcrumb display
  const breadcrumbUrl = (() => {
    try {
      const parsed = new URL(displayUrl);
      const parts = parsed.pathname
        .split("/")
        .filter(Boolean)
        .map((p) => p.replace(/-/g, " "));
      if (parts.length === 0) return parsed.hostname;
      return `${parsed.hostname} > ${parts.join(" > ")}`;
    } catch {
      return displayUrl;
    }
  })();

  const getCharStatus = (
    current: number,
    min: number,
    max: number
  ): { color: string; message: string } => {
    if (current === 0)
      return { color: "text-muted-foreground", message: `${max} chars recommended` };
    if (current < min)
      return {
        color: "text-orange-500",
        message: `Too short (min ${min})`,
      };
    if (current > max)
      return { color: "text-red-500", message: `Too long (max ${max})` };
    return { color: "text-green-500", message: "Good length" };
  };

  const titleStatus = getCharStatus(title.length, 30, 60);
  const descStatus = getCharStatus(description.length, 120, 160);

  const copyMeta = useCallback(async () => {
    const meta = `<title>${title}</title>\n<meta name="description" content="${description}" />`;
    await navigator.clipboard.writeText(meta);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [title, description]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-foreground">
              Page Title
            </label>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${titleStatus.color}`}>
                {titleStatus.message}
              </span>
              <span
                className={`text-xs ${title.length > 60 ? "text-red-500 font-medium" : "text-muted-foreground"}`}
              >
                {title.length}/60
              </span>
            </div>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your Page Title - Brand Name"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {title.length > 60 && (
            <p className="mt-1 text-xs text-red-500">
              Title will be truncated in search results after ~60 characters.
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-foreground">
              Meta Description
            </label>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${descStatus.color}`}>
                {descStatus.message}
              </span>
              <span
                className={`text-xs ${description.length > 160 ? "text-red-500 font-medium" : "text-muted-foreground"}`}
              >
                {description.length}/160
              </span>
            </div>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a compelling meta description that summarizes your page..."
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {description.length > 160 && (
            <p className="mt-1 text-xs text-red-500">
              Description will be truncated in search results after ~160
              characters.
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Page URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/your-page"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          onClick={copyMeta}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          {copied ? "Copied!" : "Copy Meta Tags"}
        </button>
      </div>

      {/* SERP Preview */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Google Search Preview
        </h3>
        <div className="max-w-2xl rounded-xl border border-border bg-white p-6 dark:bg-gray-50">
          {/* Result item */}
          <div className="space-y-1">
            {/* URL breadcrumb */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                <span className="text-xs font-bold text-gray-500">
                  {(() => {
                    try {
                      return new URL(displayUrl).hostname[0].toUpperCase();
                    } catch {
                      return "E";
                    }
                  })()}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-700 leading-tight">
                  {displayUrl.length > 70
                    ? displayUrl.slice(0, 67) + "..."
                    : displayUrl}
                </p>
                <p className="text-xs text-gray-500">{breadcrumbUrl}</p>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl leading-tight text-[#1a0dab] hover:underline cursor-pointer">
              {truncatedTitle}
            </h3>

            {/* Description */}
            <p className="text-sm leading-snug text-gray-600">
              {truncatedDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Width indicator */}
      <div className="max-w-2xl space-y-2">
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Title pixel width (approx)</span>
            <span>{Math.min(title.length * 8.5, 600).toFixed(0)} / 600px</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full transition-all ${
                title.length * 8.5 > 600 ? "bg-red-500" : "bg-green-500"
              }`}
              style={{
                width: `${Math.min(100, (title.length * 8.5 * 100) / 600)}%`,
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Description pixel width (approx)</span>
            <span>
              {Math.min(description.length * 5.5, 920).toFixed(0)} / 920px
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full transition-all ${
                description.length * 5.5 > 920 ? "bg-red-500" : "bg-green-500"
              }`}
              style={{
                width: `${Math.min(100, (description.length * 5.5 * 100) / 920)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
