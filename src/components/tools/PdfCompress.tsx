"use client";

import { useState } from "react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

const QUALITY_LABELS = ["Low", "Medium", "High"] as const;
type Quality = (typeof QUALITY_LABELS)[number];

const QUALITY_DESC: Record<Quality, string> = {
  Low: "Smallest file — visible quality loss, best for sharing.",
  Medium: "Balanced — good quality with meaningful size reduction.",
  High: "Near-lossless — minimal size reduction, preserves detail.",
};

export default function PdfCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<Quality>("Medium");
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

  const handleCompress = () => {
    if (!file) return;
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2500);
  };

  const estimatedReduction = quality === "Low" ? "60–75%" : quality === "Medium" ? "30–50%" : "10–20%";

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
        <div>
          <label className="mb-3 block text-sm font-medium text-foreground">Compression Quality</label>
          <div className="grid grid-cols-3 gap-2">
            {QUALITY_LABELS.map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className={`rounded-lg border py-2.5 text-sm font-medium transition-colors cursor-pointer ${quality === q ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground hover:border-primary/50"}`}
              >
                {q}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{QUALITY_DESC[quality]}</p>
        </div>

        <div className="rounded-lg border border-border bg-background px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated size reduction</span>
            <span className="font-medium text-primary">{estimatedReduction}</span>
          </div>
          {file && (
            <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>Original: {formatBytes(file.size)}</span>
              <span>Result: varies</span>
            </div>
          )}
        </div>

        <button
          onClick={handleCompress}
          disabled={!file || processing}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
        >
          {processing ? "Compressing..." : "Compress PDF"}
        </button>
        <p className="text-center text-xs text-muted-foreground">Note: actual compression requires Ghostscript or pdf-lib on the server.</p>
      </div>
    </div>
  );
}
