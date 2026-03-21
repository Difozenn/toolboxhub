"use client";

import { useState } from "react";

function toYaml(obj: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (obj === null) return "null";
  if (obj === undefined) return "~";
  if (typeof obj === "boolean" || typeof obj === "number") return String(obj);
  if (typeof obj === "string") {
    if (obj.includes("\n") || obj.includes(":") || obj.includes("#") || obj.includes("'")) {
      return `"${obj.replace(/"/g, '\\"')}"`;
    }
    return obj || '""';
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return "\n" + obj.map((item) => `${pad}- ${toYaml(item, indent + 1)}`).join("\n");
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return "\n" + entries.map(([k, v]) => {
      const val = toYaml(v, indent + 1);
      return `${pad}${k}:${val.startsWith("\n") ? val : " " + val}`;
    }).join("\n");
  }
  return String(obj);
}

export default function JsonToYaml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      const yaml = toYaml(parsed).replace(/^\n/, "");
      setOutput(yaml);
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
          Convert to YAML
        </button>
        {output && (
          <button
            onClick={copy}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {copied ? "Copied!" : "Copy YAML"}
          </button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">JSON Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name":"Alice","tags":["admin","user"]}'
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">YAML Output</label>
          <textarea
            readOnly
            value={output}
            placeholder="YAML output will appear here..."
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
