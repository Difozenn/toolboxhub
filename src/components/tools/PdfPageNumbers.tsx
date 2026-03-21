"use client";

import { useState } from "react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

type Position = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
type Format = "1,2,3" | "i,ii,iii" | "a,b,c";

const POSITIONS: { value: Position; label: string }[] = [
  { value: "top-left", label: "Top Left" },
  { value: "top-center", label: "Top Center" },
  { value: "top-right", label: "Top Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-right", label: "Bottom Right" },
];

const FORMATS: { value: Format; label: string }[] = [
  { value: "1,2,3", label: "1, 2, 3 — Arabic numerals" },
  { value: "i,ii,iii", label: "i, ii, iii — Roman numerals" },
  { value: "a,b,c", label: "a, b, c — Alphabetic" },
];

export default function PdfPageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [startNumber, setStartNumber] = useState(1);
  const [format, setFormat] = useState<Format>("1,2,3");
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

  const handleApply = () => {
    if (!file) return;
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2000);
  };

  const previewNumber = format === "1,2,3" ? String(startNumber) : format === "i,ii,iii" ? "i" : "a";
  const isBottom = position.startsWith("bottom");
  const isCenter = position.endsWith("center");
  const isRight = position.endsWith("right");

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
            <label className="mb-1.5 block text-sm font-medium text-foreground">Position</label>
            <select value={position} onChange={(e) => setPosition(e.target.value as Position)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none cursor-pointer">
              {POSITIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Start Number</label>
            <input type="number" min={1} value={startNumber} onChange={(e) => setStartNumber(Math.max(1, Number(e.target.value)))} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Number Format</label>
          <select value={format} onChange={(e) => setFormat(e.target.value as Format)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none cursor-pointer">
            {FORMATS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>

        <div className="rounded-lg border border-border bg-background p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Position preview</p>
          <div className="relative mx-auto h-32 w-24 rounded border border-border bg-muted">
            <span className={`absolute text-xs font-bold text-primary ${isBottom ? "bottom-1.5" : "top-1.5"} ${isCenter ? "left-1/2 -translate-x-1/2" : isRight ? "right-2" : "left-2"}`}>{previewNumber}</span>
          </div>
        </div>

        <button onClick={handleApply} disabled={!file || processing} className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer">
          {processing ? "Applying..." : "Apply Page Numbers"}
        </button>
        <p className="text-center text-xs text-muted-foreground">Note: actual page numbering requires pdf-lib on the server.</p>
      </div>
    </div>
  );
}
