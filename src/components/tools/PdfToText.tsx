"use client";

import { useState } from "react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function PdfToText() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState(false);

  const handleFile = (f: File | null) => {
    if (!f || f.type !== "application/pdf") return;
    setFile(f);
    setExtracted(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const handleExtract = () => {
    if (!file) return;
    setExtracting(true);
    setTimeout(() => {
      setExtracting(false);
      setExtracted(true);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`rounded-xl border-2 border-dashed p-10 text-center transition-colors ${dragging ? "border-primary bg-primary/5" : "border-border bg-muted"}`}
      >
        <svg className="mx-auto mb-3 h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
        <p className="mb-2 text-sm font-medium text-foreground">Drag & drop a PDF here</p>
        <p className="mb-4 text-xs text-muted-foreground">or click to browse — text-based PDFs work best</p>
        <label className="cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
          Choose PDF
          <input type="file" accept="application/pdf" onChange={(e) => handleFile(e.target.files?.[0] ?? null)} className="hidden" />
        </label>
      </div>

      {file && (
        <div className="rounded-xl border border-border bg-muted p-4 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
          </div>
          <button onClick={() => { setFile(null); setExtracted(false); }} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Remove</button>
        </div>
      )}

      {file && (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
          <button
            onClick={handleExtract}
            disabled={extracting}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
          >
            {extracting ? "Extracting text..." : "Extract Text"}
          </button>

          {extracted ? (
            <div className="space-y-3">
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-xs font-medium text-amber-800">Server-side extraction required</p>
                <p className="mt-0.5 text-xs text-amber-700">
                  In-browser PDF text extraction requires PDF.js. This UI shell demonstrates the interface — a production implementation would use <code className="font-mono">pdfjs-dist</code> or a server endpoint.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4 min-h-[180px]">
                <p className="text-xs text-muted-foreground italic">Text extracted from {file.name} would appear here, paginated and copyable...</p>
              </div>
              <button className="w-full rounded-lg border border-border bg-background py-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Copy All Text
              </button>
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-background p-8 text-center">
              <p className="text-sm text-muted-foreground">Extracted text will appear here after processing.</p>
            </div>
          )}
        </div>
      )}

      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <h3 className="text-sm font-medium text-foreground">About this tool</h3>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li className="flex items-start gap-2"><span className="mt-0.5 text-primary">•</span> Works best with text-based PDFs (not scanned images).</li>
          <li className="flex items-start gap-2"><span className="mt-0.5 text-primary">•</span> Scanned PDFs require OCR processing (e.g., Tesseract).</li>
          <li className="flex items-start gap-2"><span className="mt-0.5 text-primary">•</span> Full extraction uses <code className="font-mono bg-background px-1 rounded">pdfjs-dist</code> on the client or a server API.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5 text-primary">•</span> Extracted text preserves paragraphs and basic formatting.</li>
        </ul>
      </div>
    </div>
  );
}
