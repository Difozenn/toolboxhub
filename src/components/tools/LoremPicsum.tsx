"use client";

import { useState } from "react";

export default function LoremPicsum() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [grayscale, setGrayscale] = useState(false);
  const [blur, setBlur] = useState(0);
  const [imageId, setImageId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const buildUrl = (id: number | null) => {
    let url = `https://picsum.photos`;
    if (id !== null) url += `/id/${id}`;
    url += `/${width}/${height}`;
    const params = [];
    if (grayscale) params.push("grayscale");
    if (blur > 0) params.push(`blur=${blur}`);
    if (params.length > 0) url += `?${params.join("&")}`;
    return url;
  };

  const url = buildUrl(imageId);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const load = () => setImgSrc(url + `&nocache=${Date.now()}`);

  const copy = async () => { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1"><label className="text-sm font-medium text-muted-foreground">Width (px)</label><input type="number" min={1} max={5000} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" /></div>
        <div className="space-y-1"><label className="text-sm font-medium text-muted-foreground">Height (px)</label><input type="number" min={1} max={5000} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" /></div>
        <div className="space-y-1"><label className="text-sm font-medium text-muted-foreground">Image ID (optional, 0-1000)</label><input type="number" min={0} max={1000} value={imageId ?? ""} onChange={(e) => setImageId(e.target.value ? Number(e.target.value) : null)} placeholder="Random" className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" /></div>
        <div className="space-y-1"><label className="text-sm font-medium text-muted-foreground">Blur (0-10)</label><input type="range" min={0} max={10} value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full mt-2" /><span className="text-xs text-muted-foreground">{blur}</span></div>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground">
          <input type="checkbox" checked={grayscale} onChange={(e) => setGrayscale(e.target.checked)} className="rounded" />
          Grayscale
        </label>
      </div>
      <div className="rounded-xl border border-border bg-muted p-3 flex items-center gap-2">
        <span className="font-mono text-xs text-foreground flex-1 break-all">{url}</span>
        <button onClick={copy} className="shrink-0 rounded-lg border border-border bg-background px-2 py-1 text-xs font-medium hover:bg-primary hover:text-white">{copied ? "Copied!" : "Copy"}</button>
      </div>
      <div className="flex gap-2">
        <button onClick={load} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Load Image</button>
      </div>
      {imgSrc && <img src={imgSrc} alt="Lorem Picsum" className="w-full rounded-xl border border-border object-contain" />}
    </div>
  );
}
