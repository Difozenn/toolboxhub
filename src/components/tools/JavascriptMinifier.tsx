"use client";

import { useState, useCallback } from "react";

function minifyJs(js: string): string {
  let result = js;
  // Remove multi-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove single-line comments (but not URLs like http://)
  result = result.replace(/(^|[^:])\/\/.*$/gm, "$1");
  // Remove leading/trailing whitespace per line
  result = result
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
  // Collapse multiple newlines
  result = result.replace(/\n{2,}/g, "\n");
  // Remove newlines (join everything)
  result = result.replace(/\n/g, "");
  // Collapse multiple spaces to one
  result = result.replace(/\s{2,}/g, " ");
  // Remove spaces around operators and punctuation
  result = result.replace(/\s*([{}()=;:,<>+\-*/%!&|^~?])\s*/g, "$1");
  return result.trim();
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} KB`;
}

export default function JavascriptMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{
    original: number;
    minified: number;
    savings: number;
  } | null>(null);

  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    const minified = minifyJs(input);
    setOutput(minified);
    const originalSize = new TextEncoder().encode(input).length;
    const minifiedSize = new TextEncoder().encode(minified).length;
    const savings =
      originalSize > 0
        ? ((originalSize - minifiedSize) / originalSize) * 100
        : 0;
    setStats({ original: originalSize, minified: minifiedSize, savings });
  }, [input]);

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-4">
      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleMinify}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Minify
        </button>
        {output && (
          <button
            onClick={copy}
            className="ml-auto rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied ? "Copied!" : "Copy Output"}
          </button>
        )}
      </div>

      {/* Stats */}
      {stats && (
        <div className="flex flex-wrap gap-4 rounded-xl border border-border bg-muted p-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Original: </span>
            <span className="font-medium text-foreground">
              {formatBytes(stats.original)}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Minified: </span>
            <span className="font-medium text-foreground">
              {formatBytes(stats.minified)}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Savings: </span>
            <span className="font-medium text-green-600 dark:text-green-400">
              {stats.savings.toFixed(1)}%
            </span>
          </div>
        </div>
      )}

      {/* Panels */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Input JavaScript
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`// Example function\nfunction greet(name) {\n  /* say hello */\n  console.log("Hello, " + name);\n}`}
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Output */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Minified Output
          </label>
          <textarea
            readOnly
            value={output}
            placeholder="Minified JavaScript will appear here..."
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
