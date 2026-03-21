"use client";

import { useState } from "react";

const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
    h1 { color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 8px; }
    p { line-height: 1.6; }
  </style>
</head>
<body>
  <h1>My Document</h1>
  <p>This is a sample document. Edit the HTML on the left to see a live preview here.</p>
  <p>Click <strong>Generate PDF</strong> to print this page as a PDF.</p>
</body>
</html>`;

export default function HtmlToPdf() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [tab, setTab] = useState<"editor" | "preview">("editor");

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex rounded-lg border border-border bg-background p-1 gap-1">
            <button
              onClick={() => setTab("editor")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${tab === "editor" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              HTML Editor
            </button>
            <button
              onClick={() => setTab("preview")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${tab === "preview" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              Preview
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{html.length} chars</span>
          </div>
        </div>

        {tab === "editor" ? (
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            rows={18}
            spellCheck={false}
            className="w-full rounded-lg border border-border bg-background px-3 py-3 font-mono text-xs text-foreground focus:border-primary focus:outline-none resize-none"
            placeholder="Enter your HTML here..."
          />
        ) : (
          <div className="rounded-lg border border-border bg-white overflow-hidden" style={{ height: "360px" }}>
            <iframe
              srcDoc={html}
              title="HTML Preview"
              sandbox="allow-same-origin"
              className="w-full h-full border-0"
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            disabled={!html.trim()}
            className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
          >
            Generate PDF (Print Dialog)
          </button>
          <button
            onClick={() => setHtml(DEFAULT_HTML)}
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>

        <div className="rounded-lg border border-border bg-background px-4 py-3 space-y-1">
          <p className="text-xs font-medium text-foreground">How it works</p>
          <p className="text-xs text-muted-foreground">
            Your HTML is rendered in a new window and the browser print dialog opens. Select &ldquo;Save as PDF&rdquo; as the destination to generate a PDF file. Styles, fonts, and layout are preserved.
          </p>
        </div>
      </div>
    </div>
  );
}
