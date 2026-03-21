"use client";

import { useState } from "react";

export default function SvgOptimizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const optimize = () => {
    let result = input;
    result = result.replace(/<\?xml[^>]*\?>/g, "");
    result = result.replace(/<!--[\s\S]*?-->/g, "");
    result = result.replace(/<metadata[\s\S]*?<\/metadata>/g, "");
    result = result.replace(/<title[\s\S]*?<\/title>/g, "");
    result = result.replace(/<desc[\s\S]*?<\/desc>/g, "");
    result = result.replace(/\s*xmlns:(?:dc|cc|rdf|svg|xlink|inkscape|sodipodi)[^"]*"[^"]*"/g, "");
    result = result.replace(/\s+/g, " ");
    result = result.replace(/>\s+</g, "><");
    result = result.trim();
    setOutput(result);
  };

  const reduction = input.length > 0 && output.length > 0
    ? Math.round((1 - output.length / input.length) * 100) : 0;

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={optimize}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          Optimize SVG
        </button>
        {output && (
          <button
            onClick={copy}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {copied ? "Copied!" : "Copy Output"}
          </button>
        )}
        {output && input && (
          <span className="text-sm text-muted-foreground ml-auto">
            Reduction: <span className="font-semibold text-primary">{reduction}%</span>
            <span className="ml-2">({input.length} → {output.length} chars)</span>
          </span>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">SVG Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste SVG code here..."
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Optimized SVG</label>
          <textarea
            readOnly
            value={output}
            placeholder="Optimized SVG will appear here..."
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
