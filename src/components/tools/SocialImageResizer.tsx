"use client";

import { useState, useRef } from "react";

const PRESETS = [
  { label: "Facebook Post", w: 1200, h: 630 },
  { label: "Instagram Square", w: 1080, h: 1080 },
  { label: "Instagram Story", w: 1080, h: 1920 },
  { label: "Twitter Post", w: 1600, h: 900 },
  { label: "LinkedIn Post", w: 1200, h: 627 },
  { label: "YouTube Thumbnail", w: 1280, h: 720 },
  { label: "Pinterest Pin", w: 1000, h: 1500 },
  { label: "Open Graph (OG)", w: 1200, h: 630 },
];

export default function SocialImageResizer() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [preset, setPreset] = useState(PRESETS[0]);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => { setImgSrc(e.target?.result as string); setResultUrl(null); };
    reader.readAsDataURL(f);
  };

  const resize = () => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = preset.w;
      canvas.height = preset.h;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, preset.w, preset.h);
      const scale = Math.min(preset.w / img.naturalWidth, preset.h / img.naturalHeight);
      const x = (preset.w - img.naturalWidth * scale) / 2;
      const y = (preset.h - img.naturalHeight * scale) / 2;
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
      setResultUrl(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.src = imgSrc;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-2 border-dashed border-border bg-muted p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        <p className="text-muted-foreground text-sm">{imgSrc ? "Image loaded — click to change" : "Click or drag an image here"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Platform / Preset</label>
        <select onChange={(e) => setPreset(PRESETS[Number(e.target.value)])}
          className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
          {PRESETS.map((p, i) => <option key={p.label} value={i}>{p.label} ({p.w}x{p.h})</option>)}
        </select>
      </div>
      {imgSrc && (
        <>
          <img src={imgSrc} alt="Original" className="max-h-40 w-full rounded-xl border border-border object-contain" />
          <button onClick={resize} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">
            Resize to {preset.w}x{preset.h}
          </button>
        </>
      )}
      {resultUrl && (
        <div className="space-y-2 rounded-xl border border-border bg-muted p-4">
          <img src={resultUrl} alt="Resized" className="max-h-40 w-full rounded-lg object-contain border border-border" />
          <p className="text-xs text-muted-foreground text-center">{preset.w}x{preset.h}px</p>
          <a href={resultUrl} download="resized.jpg"
            className="block rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90">
            Download JPG
          </a>
        </div>
      )}
    </div>
  );
}
