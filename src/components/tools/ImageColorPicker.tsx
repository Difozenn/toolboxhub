"use client";

import { useState, useRef } from "react";

export default function ImageColorPicker() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [color, setColor] = useState<{ hex: string; r: number; g: number; b: number } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImgSrc(src);
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext("2d")!.drawImage(img, 0, 0);
      };
      img.src = src;
    };
    reader.readAsDataURL(f);
  };

  const pickColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const [r, g, b] = canvas.getContext("2d")!.getImageData(x, y, 1, 1).data;
    const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
    setColor({ hex, r, g, b });
  };

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-2 border-dashed border-border bg-muted p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        <p className="text-muted-foreground text-sm">{imgSrc ? "Click on the image to pick a color" : "Click or drag an image here"}</p>
      </div>
      {imgSrc && <canvas ref={canvasRef} onClick={pickColor} className="w-full max-h-64 rounded-xl border border-border cursor-crosshair" style={{ objectFit: "contain" }} />}
      {color && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-border shrink-0" style={{ backgroundColor: color.hex }} />
            <p className="text-sm text-muted-foreground">Click a pixel on the image to pick its color</p>
          </div>
          {[
            { label: "HEX", value: color.hex },
            { label: "RGB", value: `rgb(${color.r}, ${color.g}, ${color.b})` },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2">
              <span className="w-10 text-sm font-semibold text-muted-foreground">{label}</span>
              <span className="flex-1 font-mono text-sm">{value}</span>
              <button onClick={() => copy(value, label)} className="text-xs text-muted-foreground hover:text-primary">{copied === label ? "Copied!" : "Copy"}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
