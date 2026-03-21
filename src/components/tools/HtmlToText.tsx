"use client";

import { useState } from "react";

export default function HtmlToText() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    let result = input;
    result = result.replace(/<br\s*\/?>/gi, "\n");
    result = result.replace(/<\/p>/gi, "\n\n");
    result = result.replace(/<\/div>/gi, "\n");
    result = result.replace(/<\/li>/gi, "\n");
    result = result.replace(/<[^>]+>/g, "");
    result = result
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .replace(/&[a-z]+;/gi, "");
    result = result.replace(/\n{3,}/g, "\n\n").trim();
    setOutput(result);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={convert} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Strip HTML</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : "Copy Text"}</button>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">HTML Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<p>Hello <strong>World</strong>!</p>"
            spellCheck={false}
            className="h-64 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Plain Text Output</label>
          <textarea
            readOnly
            value={output}
            placeholder="Clean text will appear here..."
            className="h-64 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
