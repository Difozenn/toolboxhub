"use client";

import { useState, useRef } from "react";

const GRADIENTS = [
  { label: "Purple Blue", value: "#7c3aed, #2563eb" },
  { label: "Pink Orange", value: "#ec4899, #f97316" },
  { label: "Green Teal", value: "#16a34a, #0d9488" },
  { label: "Dark", value: "#1e1e2e, #2d2d44" },
  { label: "Warm Gray", value: "#78716c, #44403c" },
];

export default function ScreenshotBeautifier() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [padding, setPadding] = useState(40);
  const [gradient, setGradient] = useState(GRADIENTS[0].value);
  const [radius, setRadius] = useState(12);
  const [shadow, setShadow] = useState(true);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => { setImgSrc(e.target?.result as string); setResultUrl(null); };
    reader.readAsDataURL(f);
  };

  const beautify = () => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth + padding * 2;
      const h = img.naturalHeight + padding * 2;
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      const [c1, c2] = gradient.split(", ");
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, c1.trim());
      grad.addColorStop(1, c2.trim());
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      if (shadow) {
        ctx.shadowColor = "rgba(0,0,0,0.4)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 10;
      }
      const r = radius;
      const x = padding, y = padding, iw = img.naturalWidth, ih = img.naturalHeight;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + iw - r, y);
      ctx.quadraticCurveTo(x + iw, y, x + iw, y + r);
      ctx.lineTo(x + iw, y + ih - r);
      ctx.quadraticCurveTo(x + iw, y + ih, x + iw - r, y + ih);
      ctx.lineTo(x + r, y + ih);
      ctx.quadraticCurveTo(x, y + ih, x, y + ih - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.clip();
      ctx.shadowColor = "transparent";
      ctx.drawImage(img, x, y);
      setResultUrl(canvas.toDataURL("image/png"));
    };
    img.src = imgSrc;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-2 border-dashed border-border bg-muted p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        <p className="text-muted-foreground text-sm">{imgSrc ? "Image loaded — click to change" : "Click or drag a screenshot here"}</p>
      </div>
      {imgSrc && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1"><label className="text-sm text-muted-foreground">Padding: {padding}px</label><input type="range" min={0} max={100} value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full" /></div>
            <div className="space-y-1"><label className="text-sm text-muted-foreground">Corner Radius: {radius}px</label><input type="range" min={0} max={32} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full" /></div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Background</label>
              <select value={gradient} onChange={(e) => setGradient(e.target.value)} className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
                {GRADIENTS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input type="checkbox" id="shadow" checked={shadow} onChange={(e) => setShadow(e.target.checked)} className="rounded" />
              <label htmlFor="shadow" className="text-sm text-muted-foreground cursor-pointer">Add drop shadow</label>
            </div>
          </div>
          <button onClick={beautify} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Beautify</button>
          {resultUrl && (
            <div className="space-y-2">
              <img src={resultUrl} alt="Beautified" className="w-full rounded-xl border border-border" />
              <a href={resultUrl} download="beautified.png" className="block rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90">Download PNG</a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
