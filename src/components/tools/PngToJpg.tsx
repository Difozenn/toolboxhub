"use client";

import { useState, useRef } from "react";

export default function PngToJpg() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [jpgUrl, setJpgUrl] = useState<string | null>(null);
  const [origSize, setOrigSize] = useState(0);
  const [jpgSize, setJpgSize] = useState(0);
  const [quality, setQuality] = useState(0.9);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setOrigSize(f.size);
    const reader = new FileReader();
    reader.onload = (e) => { setImgSrc(e.target?.result as string); setJpgUrl(null); };
    reader.readAsDataURL(f);
  };

  const convert = () => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        setJpgSize(blob.size);
        setJpgUrl(URL.createObjectURL(blob));
      }, "image/jpeg", quality);
    };
    img.src = imgSrc;
  };

  const reduction = origSize && jpgSize ? Math.round((1 - jpgSize / origSize) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-2 border-dashed border-border bg-muted p-8 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept="image/png,image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        <p className="text-muted-foreground text-sm">{imgSrc ? "Image loaded — click to change" : "Click or drag a PNG image here"}</p>
      </div>
      {imgSrc && (
        <>
          <img src={imgSrc} alt="Original" className="max-h-48 w-full rounded-xl border border-border object-contain" />
          <div className="flex items-center gap-4">
            <label className="text-sm text-muted-foreground shrink-0">Quality: <span className="font-semibold text-foreground">{Math.round(quality * 100)}%</span></label>
            <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="flex-1" />
          </div>
          <button onClick={convert} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Convert to JPG</button>
        </>
      )}
      {jpgUrl && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <img src={jpgUrl} alt="JPG preview" className="max-h-48 w-full rounded-lg object-contain border border-border" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{(origSize/1024).toFixed(1)}KB → {(jpgSize/1024).toFixed(1)}KB</span>
            <span className="font-semibold text-primary">{reduction > 0 ? `-${reduction}%` : `+${-reduction}%`}</span>
          </div>
          <a href={jpgUrl} download="converted.jpg" className="block rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:opacity-90">Download JPG</a>
        </div>
      )}
    </div>
  );
}
