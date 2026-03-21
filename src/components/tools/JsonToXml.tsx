"use client";

import { useState } from "react";

function toXml(obj: unknown, tag = "root", indent = 0): string {
  const pad = "  ".repeat(indent);
  if (obj === null || obj === undefined) return `${pad}<${tag}/>\n`;
  if (Array.isArray(obj)) {
    return obj.map((item) => toXml(item, tag, indent)).join("");
  }
  if (typeof obj === "object") {
    const inner = Object.entries(obj as Record<string, unknown>)
      .map(([k, v]) => {
        const safeKey = k.replace(/[^a-zA-Z0-9_.-]/g, "_");
        if (Array.isArray(v)) return v.map((item) => toXml(item, safeKey, indent + 1)).join("");
        return toXml(v, safeKey, indent + 1);
      })
      .join("");
    return `${pad}<${tag}>\n${inner}${pad}</${tag}>\n`;
  }
  return `${pad}<${tag}>${String(obj)}</${tag}>\n`;
}

export default function JsonToXml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${toXml(parsed)}`;
      setOutput(xml);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
      setOutput("");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={convert}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          Convert to XML
        </button>
        {output && (
          <button
            onClick={copy}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {copied ? "Copied!" : "Copy XML"}
          </button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">JSON Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name":"Alice","address":{"city":"London"}}'
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">XML Output</label>
          <textarea
            readOnly
            value={output}
            placeholder="XML output will appear here..."
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
