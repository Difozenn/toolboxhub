"use client";

import { useState } from "react";

export default function CssFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    let css = input.trim();
    css = css.replace(/\s*\{\s*/g, " {\n");
    css = css.replace(/;\s*/g, ";\n");
    css = css.replace(/\s*\}\s*/g, "\n}\n\n");
    const lines = css.split("\n").map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (trimmed === "}" || trimmed.endsWith("{")) return trimmed;
      if (trimmed.includes(":") && !trimmed.endsWith("{") && !trimmed.startsWith("@")) {
        return "  " + trimmed;
      }
      return trimmed;
    });
    const result = lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
    setOutput(result);
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
          onClick={format}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          Format CSS
        </button>
        {output && (
          <button
            onClick={copy}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {copied ? "Copied!" : "Copy Output"}
          </button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Minified CSS Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="body{margin:0;padding:0;}h1{color:red;font-size:2em;}"
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Formatted Output</label>
          <textarea
            readOnly
            value={output}
            placeholder="Formatted CSS will appear here..."
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
