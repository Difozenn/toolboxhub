"use client";

import { useState, useCallback, useMemo } from "react";

type CardType = "summary" | "summary_large_image";

export default function TwitterCardPreview() {
  const [cardType, setCardType] = useState<CardType>("summary_large_image");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [site, setSite] = useState("");
  const [copied, setCopied] = useState(false);

  const metaTags = useMemo(() => {
    const tags: string[] = [];
    tags.push(`<meta name="twitter:card" content="${cardType}" />`);
    if (title) tags.push(`<meta name="twitter:title" content="${title}" />`);
    if (description) tags.push(`<meta name="twitter:description" content="${description}" />`);
    if (imageUrl) tags.push(`<meta name="twitter:image" content="${imageUrl}" />`);
    if (site) tags.push(`<meta name="twitter:site" content="${site.startsWith("@") ? site : "@" + site}" />`);
    return tags.join("\n");
  }, [cardType, title, description, imageUrl, site]);

  const copyTags = useCallback(async () => {
    await navigator.clipboard.writeText(metaTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [metaTags]);

  const displayTitle = title || "Page Title";
  const displayDesc = description || "Page description will appear here...";
  const displaySite = site ? (site.startsWith("@") ? site : "@" + site) : "@username";

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Card Type</label>
          <div className="flex gap-2">
            {(["summary", "summary_large_image"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setCardType(type)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  cardType === type
                    ? "bg-primary text-white"
                    : "border border-border bg-background text-foreground hover:bg-primary/10"
                }`}
              >
                {type === "summary" ? "Summary" : "Summary Large Image"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={70}
            placeholder="Your page title"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1 text-xs text-muted-foreground">{title.length}/70 characters</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            placeholder="Brief description of the page content"
            rows={2}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1 text-xs text-muted-foreground">{description.length}/200 characters</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Site (@username)</label>
          <input
            type="text"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="@yourhandle"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Preview */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-foreground">Card Preview</h3>
        <div className="mx-auto max-w-[506px]">
          {cardType === "summary_large_image" ? (
            <div className="overflow-hidden rounded-2xl border border-border">
              {imageUrl ? (
                <div className="relative aspect-[2/1] bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Card preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="flex aspect-[2/1] items-center justify-center bg-muted text-muted-foreground text-sm">
                  No image provided
                </div>
              )}
              <div className="bg-muted px-4 py-3">
                <p className="text-xs text-muted-foreground">{displaySite}</p>
                <p className="text-sm font-medium text-foreground leading-tight mt-0.5">
                  {displayTitle}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {displayDesc}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex overflow-hidden rounded-2xl border border-border">
              {imageUrl ? (
                <div className="flex h-[125px] w-[125px] flex-shrink-0 items-center justify-center bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Card preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="flex h-[125px] w-[125px] flex-shrink-0 items-center justify-center bg-muted text-muted-foreground text-xs">
                  No image
                </div>
              )}
              <div className="flex flex-col justify-center bg-muted px-4 py-3 border-l border-border">
                <p className="text-xs text-muted-foreground">{displaySite}</p>
                <p className="text-sm font-medium text-foreground leading-tight mt-0.5">
                  {displayTitle}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {displayDesc}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Meta tags */}
      <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Generated Meta Tags</h3>
          <button
            onClick={copyTags}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied ? "Copied!" : "Copy Tags"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-background p-3 text-xs text-foreground">
          <code>{metaTags}</code>
        </pre>
      </div>
    </div>
  );
}
