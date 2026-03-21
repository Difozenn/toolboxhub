"use client";

import { useState } from "react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

type Angle = 90 | 180 | 270;
type ApplyTo = "all" | "specific";

export default function PdfRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<Angle>(90);
  const [applyTo, setApplyTo] = useState<ApplyTo>("all");
  const [pageInput, setPageInput] = useState("1, 3, 5-7");
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

  const handleRotate = () => {
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
        <div>
          <label className="mb-3 block text-sm font-medium text-foreground">Rotation Angle</label>
          <div className="grid grid-cols-3 gap-3">
            {([90, 180, 270] as Angle[]).map((a) => (
              <button
                key={a}
                onClick={() => setAngle(a)}
                className={`flex flex-col items-center gap-2 rounded-lg border py-4 transition-colors cursor-pointer ${angle === a ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/50"}`}
              >
                <div style={{ transform: `rotate(${a === 270 ? -90 : a}deg)`, transition: "transform 0.2s ease" }} className="h-8 w-6 rounded border-2 border-current flex items-end justify-center pb-0.5 text-[8px] font-bold">
                  <span className={angle === a ? "text-primary" : "text-muted-foreground"}>A</span>
                </div>
                <span className={`text-sm font-medium ${angle === a ? "text-primary" : "text-foreground"}`}>{a}°</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Apply To</label>
          <div className="flex gap-3">
            {(["all", "specific"] as ApplyTo[]).map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value={opt} checked={applyTo === opt} onChange={() => setApplyTo(opt)} className="accent-primary" />
                <span className="text-sm text-foreground capitalize">{opt === "all" ? "All pages" : "Specific pages"}</span>
              </label>
            ))}
          </div>
        </div>

        {applyTo === "specific" && (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Page Numbers</label>
            <input type="text" value={pageInput} onChange={(e) => setPageInput(e.target.value)} placeholder="e.g. 1, 3, 5-7" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
            <p className="mt-1 text-xs text-muted-foreground">Comma-separated page numbers or ranges (e.g. 1, 3, 5-7).</p>
          </div>
        )}

        <button onClick={handleRotate} disabled={!file || processing} className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer">
          {processing ? "Rotating..." : `Rotate ${applyTo === "all" ? "All Pages" : "Selected Pages"} by ${angle}°`}
        </button>
        <p className="text-center text-xs text-muted-foreground">Note: actual rotation requires pdf-lib on the server.</p>
      </div>
    </div>
  );
}
