"use client";

import { useState, useCallback } from "react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function PdfMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const pdfs = Array.from(incoming).filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs]);
  }, []);

  const move = (index: number, direction: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const remove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = () => {
    if (files.length < 2) return;
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2000);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
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
        <p className="mb-2 text-sm font-medium text-foreground">Drag & drop PDF files here</p>
        <p className="mb-4 text-xs text-muted-foreground">or click to browse</p>
        <label className="cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
          Choose PDFs
          <input type="file" accept="application/pdf" multiple onChange={(e) => addFiles(e.target.files)} className="hidden" />
        </label>
      </div>

      {files.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">{files.length} file{files.length !== 1 ? "s" : ""} — drag to reorder</h3>
            <button onClick={() => setFiles([])} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Clear all</button>
          </div>
          <ul className="space-y-2">
            {files.map((file, i) => (
              <li key={`${file.name}-${i}`} className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">{file.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                <div className="flex gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30 cursor-pointer transition-colors">▲</button>
                  <button onClick={() => move(i, 1)} disabled={i === files.length - 1} className="rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30 cursor-pointer transition-colors">▼</button>
                  <button onClick={() => remove(i)} className="rounded px-1.5 py-0.5 text-xs text-red-500 hover:bg-red-500/10 cursor-pointer transition-colors">✕</button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleMerge}
            disabled={files.length < 2 || processing}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
          >
            {processing ? "Processing..." : `Merge ${files.length} PDFs`}
          </button>
          {files.length < 2 && <p className="text-center text-xs text-muted-foreground">Add at least 2 PDFs to merge</p>}
          <p className="text-center text-xs text-muted-foreground">Note: actual merging requires pdf-lib on the server.</p>
        </div>
      )}

      {files.length === 0 && (
        <div className="rounded-xl border border-border bg-muted p-8 text-center">
          <p className="text-sm text-muted-foreground">Upload two or more PDF files to combine them into one document.</p>
        </div>
      )}
    </div>
  );
}
