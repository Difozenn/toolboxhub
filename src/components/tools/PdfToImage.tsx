"use client";

import { useState } from "react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function PdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<"PNG" | "JPG">("PNG");
  const [quality, setQuality] = useState(90);
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f: File | null) => {
    if (!f || f.type !== "application/pdf") return;
    setFile(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const handleConvert = () => {
    if (!file) return;
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2000);
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

      <div className="rounded-xl border border-border bg-muted p-5 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Output Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "PNG" | "JPG")}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="PNG">PNG — lossless, supports transparency</option>
              <option value="JPG">JPG — smaller file, no transparency</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">Quality</label>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{quality}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
        >
          {processing ? "Converting..." : `Convert to ${format}`}
        </button>

        <div className="rounded-lg border border-border bg-background p-6 text-center">
          <div className="mb-2 flex items-center justify-center">
            <div className="h-20 w-16 rounded border-2 border-dashed border-border flex items-center justify-center">
              <span className="text-xs text-muted-foreground">{format}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Converted pages will appear here — requires PDF.js (pdf-lib) for in-browser rendering.</p>
        </div>
        <p className="text-center text-xs text-muted-foreground">Each page of the PDF will be exported as a separate image file.</p>
      </div>
    </div>
  );
}
