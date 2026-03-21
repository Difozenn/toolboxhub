"use client";

import { useState, useRef } from "react";

export default function ImageWatermark() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [text, setText] = useState("© My Watermark");
  const [position, setPosition] = useState("bottom-right");
  const [fontSize, setFontSize] = useState(32);
  const [opacity, setOpacity] = useState(0.7);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => { setImgSrc(e.target?.result as string); setPreviewUrl(null); };
    reader.readAsDataURL(f);
  };

  const apply = () => {
    if (!imgSrc || !text) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      const tw = ctx.measureText(text).width;
      const pad = 20;
      let x = 0, y = 0;
      if (position === "center") { x = (img.naturalWidth - tw) / 2; y = img.naturalHeight / 2; }
      else if (position === "bottom-right") { x = img.naturalWidth - tw - pad; y = img.naturalHeight - pad; }
      else if (position === "bottom-left") { x = pad; y = img.naturalHeight - pad; }
      else if (position === "top-right") { x = img.naturalWidth - tw - pad; y = fontSize + pad; }
      else { x = pad; y = fontSize + pad; }
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
      setPreviewUrl(canvas.toDataURL("image/png"));
    };
    img.src = imgSrc;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-2 border-dashed border-border bg-muted p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        <p className="text-muted-foreground text-sm">{imgSrc ? "Image loaded — click to change" : "Click or drag an image here"}</p>
      </div>
      {imgSrc && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">Watermark Text</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">Position</label>
              <select value={position} onChange={(e) => setPosition(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
                {["center","bottom-right","bottom-left","top-right","top-left"].map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Font Size: {fontSize}px</label>
              <input type="range" min={12} max={120} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Opacity: {Math.round(opacity*100)}%</label>
              <input type="range" min={0.1} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full" />
            </div>
          </div>
          <button onClick={apply} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Apply Watermark</button>
          {previewUrl && (
            <div className="space-y-2">
              <img src={previewUrl} alt="Watermarked" className="max-h-52 w-full rounded-xl border border-border object-contain" />
              <a href={previewUrl} download="watermarked.png" className="block rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:opacity-90">Download PNG</a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
