"use client";

import { useState, useCallback } from "react";

interface ImageFile {
  file: File;
  url: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function ImageToPdf() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);

  const addImages = useCallback((files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const newImages = valid.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const move = (index: number, direction: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const remove = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addImages(e.dataTransfer.files);
  };

  const handleConvert = () => {
    if (images.length === 0) return;
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
        <svg className="mx-auto mb-3 h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        <p className="mb-2 text-sm font-medium text-foreground">Drag & drop images here</p>
        <p className="mb-4 text-xs text-muted-foreground">PNG, JPG, WebP supported</p>
        <label className="cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
          Choose Images
          <input type="file" accept="image/*" multiple onChange={(e) => addImages(e.target.files)} className="hidden" />
        </label>
      </div>

      {images.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">{images.length} image{images.length !== 1 ? "s" : ""} — each becomes a PDF page</h3>
            <button onClick={() => setImages([])} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Clear all</button>
          </div>
          <div className="space-y-2">
            {images.map((img, i) => (
              <div key={img.url} className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.file.name} className="h-12 w-12 rounded object-cover shrink-0" />
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">{img.file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(img.file.size)}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30 cursor-pointer transition-colors">▲</button>
                  <button onClick={() => move(i, 1)} disabled={i === images.length - 1} className="rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30 cursor-pointer transition-colors">▼</button>
                  <button onClick={() => remove(i)} className="rounded px-1.5 py-0.5 text-xs text-red-500 hover:bg-red-500/10 cursor-pointer transition-colors">✕</button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleConvert}
            disabled={images.length === 0 || processing}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
          >
            {processing ? "Converting..." : `Convert ${images.length} Image${images.length !== 1 ? "s" : ""} to PDF`}
          </button>
          <p className="text-center text-xs text-muted-foreground">Note: actual conversion requires pdf-lib on the server.</p>
        </div>
      )}

      {images.length === 0 && (
        <div className="rounded-xl border border-border bg-muted p-8 text-center">
          <p className="text-sm text-muted-foreground">Upload images to combine them into a single PDF document. Each image becomes one page.</p>
        </div>
      )}
    </div>
  );
}
