"use client";

import { useState, useCallback } from "react";

export default function OgPreview() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const displayTitle = title || "Page Title";
  const displayDescription =
    description || "A description of the page content goes here.";
  const displayUrl = url || "https://example.com";
  const displayDomain = (() => {
    try {
      return new URL(displayUrl).hostname;
    } catch {
      return displayUrl.replace(/^https?:\/\//, "").split("/")[0] || "example.com";
    }
  })();

  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + "..." : text;

  const copyMeta = useCallback(async () => {
    const tags = [
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${url}" />`,
      imageUrl ? `<meta property="og:image" content="${imageUrl}" />` : "",
      `<meta property="og:type" content="website" />`,
      "",
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${title}" />`,
      `<meta name="twitter:description" content="${description}" />`,
      imageUrl ? `<meta name="twitter:image" content="${imageUrl}" />` : "",
    ]
      .filter(Boolean)
      .join("\n");
    await navigator.clipboard.writeText(tags);
    setCopied("meta");
    setTimeout(() => setCopied(null), 1500);
  }, [title, description, url, imageUrl]);

  const counter = (current: number, max: number) => {
    const isOver = current > max;
    return (
      <span
        className={`text-xs ${isOver ? "text-red-500 font-medium" : "text-muted-foreground"}`}
      >
        {current}/{max}
        {isOver && " (too long)"}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-foreground">Title</label>
            {counter(title.length, 60)}
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Page Title"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            {counter(description.length, 160)}
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A description of the page content..."
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/page"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Image URL
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          onClick={copyMeta}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          {copied === "meta" ? "Copied Meta Tags!" : "Copy Meta Tags"}
        </button>
      </div>

      {/* Previews */}
      <div className="space-y-6">
        {/* Facebook / LinkedIn */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Facebook / LinkedIn Preview
          </h3>
          <div className="max-w-lg overflow-hidden rounded-lg border border-gray-300 bg-white dark:bg-gray-50">
            {imageUrl && (
              <div className="aspect-[1.91/1] w-full bg-gray-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="OG Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <div className="p-3">
              <p className="text-xs uppercase text-gray-500">
                {displayDomain}
              </p>
              <p className="mt-1 text-sm font-semibold leading-tight text-gray-900">
                {truncate(displayTitle, 60)}
              </p>
              <p className="mt-1 text-xs leading-snug text-gray-500">
                {truncate(displayDescription, 160)}
              </p>
            </div>
          </div>
        </div>

        {/* Twitter Large Card */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Twitter Large Card Preview
          </h3>
          <div className="max-w-lg overflow-hidden rounded-2xl border border-gray-300 bg-white dark:bg-gray-50">
            {imageUrl && (
              <div className="aspect-[2/1] w-full bg-gray-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Twitter Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <div className="p-3">
              <p className="text-sm font-bold text-gray-900">
                {truncate(displayTitle, 70)}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {truncate(displayDescription, 160)}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {displayDomain}
              </p>
            </div>
          </div>
        </div>

        {/* Twitter Summary Card */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Twitter Summary Card Preview
          </h3>
          <div className="flex max-w-lg overflow-hidden rounded-2xl border border-gray-300 bg-white dark:bg-gray-50">
            {imageUrl && (
              <div className="h-32 w-32 shrink-0 bg-gray-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Twitter Summary Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <div className="flex flex-col justify-center p-3">
              <p className="text-xs text-gray-400">{displayDomain}</p>
              <p className="mt-0.5 text-sm font-bold leading-tight text-gray-900">
                {truncate(displayTitle, 70)}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {truncate(displayDescription, 120)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
