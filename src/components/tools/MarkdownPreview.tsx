"use client";

import { useState, useMemo } from "react";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseMarkdown(md: string): string {
  const lines = md.split("\n");
  const htmlLines: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";

  function closeList() {
    if (inList) {
      htmlLines.push(listType === "ul" ? "</ul>" : "</ol>");
      inList = false;
    }
  }

  function processInline(text: string): string {
    let result = escapeHtml(text);

    // Bold + italic
    result = result.replace(
      /\*\*\*(.*?)\*\*\*/g,
      "<strong><em>$1</em></strong>"
    );
    // Bold
    result = result.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic
    result = result.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Inline code
    result = result.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    // Links
    result = result.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="md-link">$1</a>'
    );
    // Images
    result = result.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" class="md-img" />'
    );

    return result;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        htmlLines.push(
          '<pre class="md-code-block"><code>' +
            escapeHtml(codeBlockContent.join("\n")) +
            "</code></pre>"
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        closeList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|_{3,}|\*{3,})\s*$/.test(line.trim())) {
      closeList();
      htmlLines.push('<hr class="md-hr" />');
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      htmlLines.push(
        `<h${level} class="md-h${level}">${processInline(headingMatch[2])}</h${level}>`
      );
      continue;
    }

    // Blockquote
    if (line.trim().startsWith("> ")) {
      closeList();
      const content = line.trim().slice(2);
      htmlLines.push(
        `<blockquote class="md-blockquote">${processInline(content)}</blockquote>`
      );
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^(\s*)[-*+]\s+(.+)$/);
    if (ulMatch) {
      if (!inList || listType !== "ul") {
        closeList();
        htmlLines.push("<ul>");
        inList = true;
        listType = "ul";
      }
      htmlLines.push(`<li>${processInline(ulMatch[2])}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || listType !== "ol") {
        closeList();
        htmlLines.push("<ol>");
        inList = true;
        listType = "ol";
      }
      htmlLines.push(`<li>${processInline(olMatch[2])}</li>`);
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      closeList();
      htmlLines.push("<br />");
      continue;
    }

    // Paragraph
    closeList();
    htmlLines.push(`<p>${processInline(line)}</p>`);
  }

  // Close any open code block
  if (inCodeBlock) {
    htmlLines.push(
      '<pre class="md-code-block"><code>' +
        escapeHtml(codeBlockContent.join("\n")) +
        "</code></pre>"
    );
  }

  closeList();

  return htmlLines.join("\n");
}

const SAMPLE_MARKDOWN = `# Markdown Preview

## Features

This tool supports **bold**, *italic*, and ***bold italic*** text.

Here is some \`inline code\` and a [link](https://example.com).

### Code Block

\`\`\`
function hello() {
  console.log("Hello, world!");
}
\`\`\`

### Lists

- First item
- Second item
- Third item

1. Ordered one
2. Ordered two
3. Ordered three

> This is a blockquote

---

That's it!`;

export default function MarkdownPreview() {
  const [input, setInput] = useState(SAMPLE_MARKDOWN);

  const renderedHtml = useMemo(() => parseMarkdown(input), [input]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Markdown Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your markdown here..."
            spellCheck={false}
            className="h-[32rem] w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Preview */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Preview
          </label>
          <div
            className="md-preview h-[32rem] overflow-auto rounded-xl border border-border bg-background p-4"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>

      {/* Styles for the preview */}
      <style jsx>{`
        .md-preview h1 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.5rem;
        }
        .md-preview h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          margin-top: 1rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.25rem;
        }
        .md-preview h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          margin-top: 0.75rem;
        }
        .md-preview h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .md-preview h5 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .md-preview h6 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .md-preview p {
          margin-bottom: 0.5rem;
          line-height: 1.625;
        }
        .md-preview ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .md-preview ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .md-preview li {
          margin-bottom: 0.25rem;
        }
        .md-preview :global(.inline-code) {
          background: var(--muted);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.875rem;
        }
        .md-preview :global(.md-code-block) {
          background: var(--muted);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          border: 1px solid var(--border);
        }
        .md-preview :global(.md-link) {
          color: var(--primary);
          text-decoration: underline;
        }
        .md-preview :global(.md-blockquote) {
          border-left: 3px solid var(--border);
          padding-left: 1rem;
          color: var(--muted-foreground);
          margin-bottom: 0.5rem;
          font-style: italic;
        }
        .md-preview :global(.md-hr) {
          border: none;
          border-top: 1px solid var(--border);
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}
