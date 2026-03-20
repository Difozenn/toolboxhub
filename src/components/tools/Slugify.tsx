"use client";

import { useState, useMemo, useCallback } from "react";

export default function Slugify() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => {
    if (!input.trim()) return "";

    let result = input
      // Normalize unicode characters
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // Replace any non-alphanumeric characters with the separator
      .replace(/[^a-zA-Z0-9\s]/g, "")
      // Replace whitespace with separator
      .replace(/\s+/g, separator)
      // Remove leading/trailing separators
      .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, "g"), "")
      // Collapse multiple separators
      .replace(new RegExp(`\\${separator}{2,}`, "g"), separator);

    if (lowercase) {
      result = result.toLowerCase();
    }

    return result;
  }, [input, separator, lowercase]);

  const copyToClipboard = useCallback(async () => {
    if (!slug) return;
    try {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = slug;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [slug]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Input Text
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to slugify..."
          className="w-full rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Options */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-foreground">
            Separator
          </label>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setSeparator("-")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                separator === "-"
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Dash (-)
            </button>
            <button
              onClick={() => setSeparator("_")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                separator === "_"
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Underscore (_)
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-sm font-medium text-foreground">
            Lowercase
          </span>
        </label>
      </div>

      {/* Output */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Result
        </label>
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground min-h-[56px] break-all">
            {slug || (
              <span className="text-muted-foreground">
                Slug will appear here...
              </span>
            )}
          </div>
          <button
            onClick={copyToClipboard}
            disabled={!slug}
            className="shrink-0 rounded-xl border border-border bg-primary px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Preview */}
      {slug && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-sm text-muted-foreground">URL Preview</p>
          <p className="mt-1 font-mono text-sm text-foreground break-all">
            https://example.com/<span className="text-primary">{slug}</span>
          </p>
        </div>
      )}
    </div>
  );
}
