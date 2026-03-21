"use client";

import { useState, useRef, useEffect } from "react";

export default function ImageRotator() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [angle, setAngle] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rad = (angle * Math.PI) / 180;
      const sin = Math.abs(Math.sin(rad)), cos = Math.abs(Math.cos(rad));
      const w = img.naturalWidth * cos + img.naturalHeight * sin;
      const h = img.naturalWidth * sin + img.naturalHeight * cos;
      canvas.width = Math.round(w);
      canvas.height = Math.round(h);
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    };
    img.src = imgSrc;
  }, [imgSrc, angle]);

  const handleFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImgSrc(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = canvasRef.current!.toDataURL("image/png");
    a.download = "rotated.png";
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-2 border-dashed border-border bg-muted p-8 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        <p className="text-muted-foreground text-sm">{imgSrc ? "Image loaded — click to change" : "Click or drag an image here"}</p>
      </div>
      {imgSrc && (
        <>
          <canvas ref={canvasRef} className="max-h-64 w-full rounded-xl border border-border" style={{ objectFit: "contain" }} />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">Angle: <span className="font-bold text-foreground">{angle}°</span></label>
              <div className="flex gap-1">
                {[0, 90, 180, 270].map((a) => (
                  <button key={a} onClick={() => setAngle(a)} className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${angle === a ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>{a}°</button>
                ))}
              </div>
            </div>
            <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full" />
          </div>
          <button onClick={download} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Download PNG</button>
        </>
      )}
    </div>
  );
}
