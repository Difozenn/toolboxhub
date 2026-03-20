"use client";

import { useState, useCallback } from "react";

const BLOCK_ELEMENTS = new Set([
  "html",
  "head",
  "body",
  "div",
  "section",
  "article",
  "aside",
  "nav",
  "header",
  "footer",
  "main",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "form",
  "fieldset",
  "legend",
  "select",
  "option",
  "details",
  "summary",
  "dialog",
  "figure",
  "figcaption",
  "blockquote",
  "pre",
  "address",
  "dl",
  "dt",
  "dd",
  "script",
  "style",
  "link",
  "meta",
  "title",
]);

const SELF_CLOSING = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function prettifyHtml(
  html: string,
  indentChar: string,
  indentSize: number
): string {
  const indent = indentChar === "tab" ? "\t" : " ".repeat(indentSize);
  // Tokenize: split into tags and text
  const tokens = html.match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g);
  if (!tokens) return html;

  const lines: string[] = [];
  let depth = 0;

  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed) continue;

    // Comment
    if (trimmed.startsWith("<!--")) {
      lines.push(indent.repeat(depth) + trimmed);
      continue;
    }

    // Closing tag
    if (trimmed.startsWith("</")) {
      depth = Math.max(0, depth - 1);
      const tagName = trimmed.replace(/<\/([a-zA-Z0-9-]+).*/, "$1").toLowerCase();
      if (BLOCK_ELEMENTS.has(tagName)) {
        lines.push(indent.repeat(depth) + trimmed);
      } else {
        lines.push(indent.repeat(depth) + trimmed);
      }
      continue;
    }

    // Opening tag
    if (trimmed.startsWith("<")) {
      const tagMatch = trimmed.match(/^<([a-zA-Z0-9-]+)/);
      const tagName = tagMatch ? tagMatch[1].toLowerCase() : "";
      const isSelfClosing =
        SELF_CLOSING.has(tagName) || trimmed.endsWith("/>");

      lines.push(indent.repeat(depth) + trimmed);

      if (!isSelfClosing && BLOCK_ELEMENTS.has(tagName)) {
        depth++;
      }
      continue;
    }

    // Text content
    if (trimmed) {
      lines.push(indent.repeat(depth) + trimmed);
    }
  }

  return lines.join("\n");
}

export default function HtmlPrettifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [indentType, setIndentType] = useState<"spaces" | "tab">("spaces");
  const [indentSize, setIndentSize] = useState(2);

  const handleFormat = useCallback(() => {
    if (!input.trim()) return;
    const formatted = prettifyHtml(input, indentType, indentSize);
    setOutput(formatted);
  }, [input, indentType, indentSize]);

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleFormat}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Format HTML
        </button>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Indent:
          </label>
          <select
            value={indentType}
            onChange={(e) =>
              setIndentType(e.target.value as "spaces" | "tab")
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="spaces">Spaces</option>
            <option value="tab">Tabs</option>
          </select>
        </div>

        {indentType === "spaces" && (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Size:
            </label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
            </select>
          </div>
        )}

        {output && (
          <button
            onClick={copy}
            className="ml-auto rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied ? "Copied!" : "Copy Output"}
          </button>
        )}
      </div>

      {/* Panels */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Input HTML
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<div><p>Hello</p><ul><li>Item</li></ul></div>"
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Output */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Formatted Output
          </label>
          <textarea
            readOnly
            value={output}
            placeholder="Formatted HTML will appear here..."
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
