"use client";

import { useState, useRef } from "react";

const FILTERS = [
  { key: "brightness", label: "Brightness", min: 0, max: 200, default: 100, unit: "%" },
  { key: "contrast", label: "Contrast", min: 0, max: 200, default: 100, unit: "%" },
  { key: "saturate", label: "Saturation", min: 0, max: 200, default: 100, unit: "%" },
  { key: "grayscale", label: "Grayscale", min: 0, max: 100, default: 0, unit: "%" },
  { key: "sepia", label: "Sepia", min: 0, max: 100, default: 0, unit: "%" },
  { key: "blur", label: "Blur", min: 0, max: 20, default: 0, unit: "px" },
];

type FilterValues = Record<string, number>;

export default function ImageFilter() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>(Object.fromEntries(FILTERS.map((f) => [f.key, f.default])));
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const filterString = FILTERS.map((f) => `${f.key}(${filters[f.key]}${f.unit})`).join(" ");

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImgSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const reset = () => setFilters(Object.fromEntries(FILTERS.map((f) => [f.key, f.default])));

  const download = () => {
    if (!imgRef.current) return;
    const canvas = document.createElement("canvas");
    const img = imgRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = filterString;
    ctx.drawImage(img, 0, 0);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "filtered.png";
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-2 border-dashed border-border bg-muted p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        <p className="text-muted-foreground text-sm">{imgSrc ? "Click to change image" : "Click or drag an image here"}</p>
      </div>
      {imgSrc && (
        <>
          <img ref={imgRef} src={imgSrc} alt="Filtered" style={{ filter: filterString }} className="w-full max-h-52 rounded-xl border border-border object-contain" />
          <div className="grid gap-2 sm:grid-cols-2">
            {FILTERS.map((f) => (
              <div key={f.key} className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{f.label}</span>
                  <span>{filters[f.key]}{f.unit}</span>
                </div>
                <input type="range" min={f.min} max={f.max} value={filters[f.key]}
                  onChange={(e) => setFilters((prev) => ({ ...prev, [f.key]: Number(e.target.value) }))}
                  className="w-full" />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={reset} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">Reset</button>
            <button onClick={download} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Download PNG</button>
          </div>
        </>
      )}
    </div>
  );
}
