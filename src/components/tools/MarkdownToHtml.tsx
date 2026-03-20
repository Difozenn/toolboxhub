"use client";

import { useState, useMemo, useCallback } from "react";

function markdownToHtml(md: string): string {
  let html = md;

  // Escape HTML entities in code blocks first
  const codeBlocks: string[] = [];
  html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
    codeBlocks.push(code.trim());
    return `%%CODEBLOCK_${codeBlocks.length - 1}%%`;
  });

  const inlineCodes: string[] = [];
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    inlineCodes.push(code);
    return `%%INLINECODE_${inlineCodes.length - 1}%%`;
  });

  // Headings (must be at start of line)
  html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  // Horizontal rule
  html = html.replace(/^([-*_]){3,}\s*$/gm, "<hr />");

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");
  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, "\n");

  // Unordered lists
  html = html.replace(/^[-*+]\s+(.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>\n$1</ul>");

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, "<oli>$1</oli>");
  html = html.replace(/((?:<oli>.*<\/oli>\n?)+)/g, (match) => {
    return "<ol>\n" + match.replace(/<\/?oli>/g, (t) => t.replace("oli", "li")) + "</ol>";
  });

  // Paragraphs: wrap remaining loose text in <p> tags
  const lines = html.split("\n");
  const result: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      result.push("");
      continue;
    }
    if (
      line.startsWith("<h") ||
      line.startsWith("<ul") ||
      line.startsWith("<ol") ||
      line.startsWith("<li") ||
      line.startsWith("</ul") ||
      line.startsWith("</ol") ||
      line.startsWith("<hr") ||
      line.startsWith("<blockquote") ||
      line.startsWith("</blockquote") ||
      line.startsWith("<img") ||
      line.startsWith("%%CODEBLOCK")
    ) {
      result.push(line);
    } else {
      result.push(`<p>${line}</p>`);
    }
  }
  html = result.join("\n");

  // Restore code blocks
  codeBlocks.forEach((code, i) => {
    const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = html.replace(
      new RegExp(`(<p>)?%%CODEBLOCK_${i}%%(</p>)?`),
      `<pre><code>${escaped}</code></pre>`
    );
  });

  inlineCodes.forEach((code, i) => {
    const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = html.replace(`%%INLINECODE_${i}%%`, `<code>${escaped}</code>`);
  });

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");

  return html.trim();
}

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState(`# Hello World

This is a **bold** and *italic* paragraph with \`inline code\`.

## Features

- Item one
- Item two
- Item three

> This is a blockquote

[Visit Google](https://google.com)

---

\`\`\`
const x = 42;
console.log(x);
\`\`\`
`);
  const [viewMode, setViewMode] = useState<"raw" | "preview">("raw");
  const [copied, setCopied] = useState(false);

  const htmlOutput = useMemo(() => markdownToHtml(markdown), [markdown]);

  const copyHtml = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(htmlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [htmlOutput]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Markdown input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Markdown Input</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type markdown here..."
            rows={18}
            className="w-full rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
          />
        </div>

        {/* HTML output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">HTML Output</label>
            <div className="flex gap-2">
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setViewMode("raw")}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    viewMode === "raw" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"
                  }`}
                >
                  Raw HTML
                </button>
                <button
                  onClick={() => setViewMode("preview")}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    viewMode === "preview" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"
                  }`}
                >
                  Preview
                </button>
              </div>
              <button
                onClick={copyHtml}
                disabled={!htmlOutput}
                className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {copied ? "Copied!" : "Copy HTML"}
              </button>
            </div>
          </div>

          {viewMode === "raw" ? (
            <textarea
              value={htmlOutput}
              readOnly
              rows={18}
              className="w-full rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
            />
          ) : (
            <div
              className="rounded-xl border border-border bg-muted p-4 prose prose-sm max-w-none min-h-[400px] overflow-y-auto text-foreground
                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:text-foreground
                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:text-foreground
                [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:text-foreground
                [&_p]:mb-2 [&_p]:text-foreground
                [&_strong]:font-bold [&_em]:italic
                [&_a]:text-primary [&_a]:underline
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-2
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-2
                [&_li]:mb-1 [&_li]:text-foreground
                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-2
                [&_code]:bg-background [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                [&_pre]:bg-background [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-2
                [&_pre_code]:bg-transparent [&_pre_code]:p-0
                [&_hr]:border-border [&_hr]:my-4
                [&_img]:max-w-full [&_img]:rounded-lg"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
