"use client";

import { useState, useRef } from "react";

export default function ImageToWebp() {
  const [original, setOriginal] = useState<{ size: number; url: string } | null>(null);
  const [webpUrl, setWebpUrl] = useState<string | null>(null);
  const [webpSize, setWebpSize] = useState<number>(0);
  const [quality, setQuality] = useState(0.85);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginal({ size: file.size, url: e.target?.result as string });
      setWebpUrl(null);
    };
    reader.readAsDataURL(file);
  };

  const convert = () => {
    if (!original) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        setWebpSize(blob.size);
        setWebpUrl(URL.createObjectURL(blob));
      }, "image/webp", quality);
    };
    img.src = original.url;
  };

  const reduction = original && webpSize ? Math.round((1 - webpSize / original.size) * 100) : 0;

  return (
    <div className="space-y-4">
      <div
        className="rounded-xl border-2 border-dashed border-border bg-muted p-8 text-center cursor-pointer hover:border-primary transition-colors"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        <p className="text-muted-foreground text-sm">{original ? "Image loaded — click to change" : "Click or drag an image file here"}</p>
      </div>
      {original && (
        <>
          <img src={original.url} alt="Original" className="max-h-48 rounded-xl border border-border object-contain w-full" />
          <div className="flex items-center gap-4">
            <label className="text-sm text-muted-foreground">Quality: <span className="font-semibold text-foreground">{Math.round(quality * 100)}%</span></label>
            <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="flex-1" />
          </div>
          <button onClick={convert} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Convert to WebP</button>
        </>
      )}
      {webpUrl && (
        <div className="space-y-2 rounded-xl border border-border bg-muted p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Size: <span className="font-semibold text-foreground">{(original!.size/1024).toFixed(1)}KB → {(webpSize/1024).toFixed(1)}KB</span></span>
            <span className="font-semibold text-primary">{reduction > 0 ? `-${reduction}% smaller` : `+${-reduction}% larger`}</span>
          </div>
          <a href={webpUrl} download="converted.webp" className="block rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:opacity-90">Download WebP</a>
        </div>
      )}
    </div>
  );
}
