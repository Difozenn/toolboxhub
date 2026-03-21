"use client";

import { useState } from "react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

type Position = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "diagonal";

const POSITIONS: { value: Position; label: string }[] = [
  { value: "center", label: "Center" },
  { value: "diagonal", label: "Diagonal (center)" },
  { value: "top-left", label: "Top Left" },
  { value: "top-right", label: "Top Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-right", label: "Bottom Right" },
];

export default function PdfWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(30);
  const [position, setPosition] = useState<Position>("diagonal");
  const [color, setColor] = useState("#6366f1");
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
    if (!file || !text.trim()) return;
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2000);
  };

  const previewStyle: React.CSSProperties = {
    color,
    fontSize: Math.max(10, Math.min(32, fontSize * 0.5)),
    opacity: opacity / 100,
    transform: position === "diagonal" ? "rotate(-35deg)" : undefined,
    position: "absolute",
    ...(position === "center" || position === "diagonal" ? { top: "50%", left: "50%", transform: `translate(-50%, -50%)${position === "diagonal" ? " rotate(-35deg)" : ""}` } : {}),
    ...(position === "top-left" ? { top: 8, left: 8 } : {}),
    ...(position === "top-right" ? { top: 8, right: 8 } : {}),
    ...(position === "bottom-left" ? { bottom: 8, left: 8 } : {}),
    ...(position === "bottom-right" ? { bottom: 8, right: 8 } : {}),
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
        <label className="cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
          Choose PDF
          <input type="file" accept="application/pdf" onChange={(e) => handleFile(e.target.files?.[0] ?? null)} className="hidden" />
        </label>
      </div>

      {file && (
        <div className="rounded-xl border border-border bg-muted p-4 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
          </div>
          <button onClick={() => setFile(null)} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Remove</button>
        </div>
      )}

      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Watermark Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. CONFIDENTIAL" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">Font Size</label>
              <span className="text-xs text-primary font-bold">{fontSize}pt</span>
            </div>
            <input type="range" min={12} max={120} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">Opacity</label>
              <span className="text-xs text-primary font-bold">{opacity}%</span>
            </div>
            <input type="range" min={5} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-primary" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Position</label>
            <select value={position} onChange={(e) => setPosition(e.target.value as Position)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none cursor-pointer">
              {POSITIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-16 cursor-pointer rounded-lg border border-border bg-background" />
              <span className="text-sm text-muted-foreground font-mono">{color}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-white relative overflow-hidden" style={{ height: 120 }}>
          <div className="absolute inset-0 flex items-start justify-start p-2 gap-1 opacity-20">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-2 bg-gray-300 rounded flex-1" />)}
          </div>
          {text && <span style={previewStyle} className="font-bold whitespace-nowrap pointer-events-none select-none">{text}</span>}
        </div>

        <button onClick={handleApply} disabled={!file || !text.trim() || processing} className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer">
          {processing ? "Applying..." : "Apply Watermark"}
        </button>
        <p className="text-center text-xs text-muted-foreground">Note: actual watermarking requires pdf-lib on the server.</p>
      </div>
    </div>
  );
}
