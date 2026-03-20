"use client";

import { useState, useMemo, useCallback } from "react";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [viewport, setViewport] = useState("width=device-width, initial-scale=1.0");
  const [robots, setRobots] = useState("index, follow");
  const [includeOg, setIncludeOg] = useState(true);
  const [includeTwitter, setIncludeTwitter] = useState(true);
  const [ogUrl, setOgUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [twitterSite, setTwitterSite] = useState("");
  const [copied, setCopied] = useState(false);

  const generatedTags = useMemo(() => {
    const tags: string[] = [];

    if (title) {
      tags.push(`<title>${title}</title>`);
    }
    if (description) {
      tags.push(
        `<meta name="description" content="${description}" />`
      );
    }
    if (keywords) {
      tags.push(`<meta name="keywords" content="${keywords}" />`);
    }
    if (author) {
      tags.push(`<meta name="author" content="${author}" />`);
    }
    if (viewport) {
      tags.push(`<meta name="viewport" content="${viewport}" />`);
    }
    if (robots) {
      tags.push(`<meta name="robots" content="${robots}" />`);
    }
    tags.push(`<meta charset="UTF-8" />`);

    // Open Graph
    if (includeOg) {
      tags.push("");
      tags.push("<!-- Open Graph -->");
      if (title) tags.push(`<meta property="og:title" content="${title}" />`);
      if (description)
        tags.push(
          `<meta property="og:description" content="${description}" />`
        );
      tags.push(`<meta property="og:type" content="website" />`);
      if (ogUrl) tags.push(`<meta property="og:url" content="${ogUrl}" />`);
      if (ogImage)
        tags.push(`<meta property="og:image" content="${ogImage}" />`);
    }

    // Twitter Card
    if (includeTwitter) {
      tags.push("");
      tags.push("<!-- Twitter Card -->");
      tags.push(`<meta name="twitter:card" content="${twitterCard}" />`);
      if (title)
        tags.push(`<meta name="twitter:title" content="${title}" />`);
      if (description)
        tags.push(
          `<meta name="twitter:description" content="${description}" />`
        );
      if (twitterSite)
        tags.push(`<meta name="twitter:site" content="${twitterSite}" />`);
      if (ogImage)
        tags.push(`<meta name="twitter:image" content="${ogImage}" />`);
    }

    return tags.join("\n");
  }, [
    title,
    description,
    keywords,
    author,
    viewport,
    robots,
    includeOg,
    includeTwitter,
    ogUrl,
    ogImage,
    twitterCard,
    twitterSite,
  ]);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [generatedTags]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className="space-y-5">
          {/* Basic meta */}
          <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Basic Meta Tags
            </h3>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Website"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {title && (
                <p className="text-xs text-muted-foreground">
                  {title.length}/60 characters
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of your website..."
                rows={2}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              />
              {description && (
                <p className="text-xs text-muted-foreground">
                  {description.length}/160 characters
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Keywords
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="web, development, tools"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Viewport
              </label>
              <input
                type="text"
                value={viewport}
                onChange={(e) => setViewport(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Robots
              </label>
              <select
                value={robots}
                onChange={(e) => setRobots(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="index, follow">index, follow</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="index, nofollow">index, nofollow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
              </select>
            </div>
          </div>

          {/* Social tags */}
          <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Social Tags
            </h3>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeOg}
                  onChange={(e) => setIncludeOg(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-primary"
                />
                <span className="text-sm text-foreground">
                  Open Graph tags
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeTwitter}
                  onChange={(e) => setIncludeTwitter(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-primary"
                />
                <span className="text-sm text-foreground">
                  Twitter Card tags
                </span>
              </label>
            </div>

            {(includeOg || includeTwitter) && (
              <>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    URL
                  </label>
                  <input
                    type="text"
                    value={ogUrl}
                    onChange={(e) => setOgUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    placeholder="https://example.com/og-image.png"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </>
            )}

            {includeTwitter && (
              <>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Twitter Card Type
                  </label>
                  <select
                    value={twitterCard}
                    onChange={(e) => setTwitterCard(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="summary">summary</option>
                    <option value="summary_large_image">
                      summary_large_image
                    </option>
                    <option value="app">app</option>
                    <option value="player">player</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Twitter @handle
                  </label>
                  <input
                    type="text"
                    value={twitterSite}
                    onChange={(e) => setTwitterSite(e.target.value)}
                    placeholder="@yourhandle"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Output */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Generated Meta Tags
            </label>
            {generatedTags && (
              <button
                onClick={copy}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <pre className="h-[600px] overflow-auto rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground whitespace-pre-wrap">
            {generatedTags || (
              <span className="text-muted-foreground">
                Fill in the form to generate meta tags...
              </span>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
