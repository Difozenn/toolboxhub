"use client";

import { useState } from "react";

type ParsedRange = { start: number; end: number };

function parseRanges(input: string): ParsedRange[] {
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
  const ranges: ParsedRange[] = [];
  for (const part of parts) {
    if (part.includes("-")) {
      const [a, b] = part.split("-").map(Number);
      if (!isNaN(a) && !isNaN(b) && a > 0 && b >= a) ranges.push({ start: a, end: b });
    } else {
      const n = Number(part);
      if (!isNaN(n) && n > 0) ranges.push({ start: n, end: n });
    }
  }
  return ranges;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [rangeInput, setRangeInput] = useState("1-3, 5, 7-10");
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);

  const parsedRanges = parseRanges(rangeInput);

  const handleFile = (f: File | null) => {
    if (!f || f.type !== "application/pdf") return;
    setFile(f);
  };

  const handleSplit = () => {
    if (!file || parsedRanges.length === 0) return;
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2000);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
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
        <p className="mb-4 text-xs text-muted-foreground">or click to browse</p>
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
          <button onClick={() => setFile(null)} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Remove</button>
        </div>
      )}

      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Page Ranges</label>
          <input
            type="text"
            value={rangeInput}
            onChange={(e) => setRangeInput(e.target.value)}
            placeholder="e.g. 1-3, 5, 7-10"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <p className="mt-1 text-xs text-muted-foreground">Separate ranges with commas. Use hyphens for page spans.</p>
        </div>

        {parsedRanges.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-foreground">Parsed — {parsedRanges.length} segment{parsedRanges.length !== 1 ? "s" : ""}:</p>
            <div className="flex flex-wrap gap-2">
              {parsedRanges.map((r, i) => (
                <span key={i} className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {r.start === r.end ? `p.${r.start}` : `pp.${r.start}–${r.end}`}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSplit}
          disabled={!file || parsedRanges.length === 0 || processing}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
        >
          {processing ? "Processing..." : "Split PDF"}
        </button>
        <p className="text-center text-xs text-muted-foreground">Note: actual splitting requires pdf-lib on the server.</p>
      </div>
    </div>
  );
}
