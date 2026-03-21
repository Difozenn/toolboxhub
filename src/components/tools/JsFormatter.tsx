"use client";

import { useState } from "react";

export default function JsFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    let js = input;
    let result = "";
    let indent = 0;
    let i = 0;
    while (i < js.length) {
      const ch = js[i];
      if (ch === "{" || ch === "[") {
        result += ch + "\n" + "  ".repeat(++indent);
      } else if (ch === "}" || ch === "]") {
        result += "\n" + "  ".repeat(--indent) + ch;
      } else if (ch === ";") {
        result += ch + "\n" + "  ".repeat(indent);
      } else if (ch === ",") {
        result += ch + "\n" + "  ".repeat(indent);
      } else {
        result += ch;
      }
      i++;
    }
    result = result.replace(/\n\s*\n/g, "\n").trim();
    setOutput(result);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-muted p-3 text-sm text-muted-foreground">
        Basic JS beautifier — adds indentation and newlines. Not a full AST parser.
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={format}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          Format JS
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
          <label className="text-sm font-medium text-muted-foreground">Minified JS Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'function add(a,b){return a+b;}const x=add(1,2);'}
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Formatted Output</label>
          <textarea
            readOnly
            value={output}
            placeholder="Formatted JS will appear here..."
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
