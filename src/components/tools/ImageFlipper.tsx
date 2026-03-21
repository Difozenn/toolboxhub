"use client";

import { useState, useRef, useEffect } from "react";

export default function ImageFlipper() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const draw = (src: string, fh: boolean, fv: boolean) => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.save();
      ctx.translate(fh ? img.naturalWidth : 0, fv ? img.naturalHeight : 0);
      ctx.scale(fh ? -1 : 1, fv ? -1 : 1);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
    };
    img.src = src;
  };

  useEffect(() => { if (imgSrc) draw(imgSrc, flipH, flipV); }, [imgSrc, flipH, flipV]);

  const handleFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImgSrc(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = canvasRef.current!.toDataURL("image/png");
    a.download = "flipped.png";
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
          <canvas ref={canvasRef} className="max-h-64 w-full rounded-xl border border-border object-contain" style={{ maxHeight: 256 }} />
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFlipH((v) => !v)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${flipH ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
              Flip Horizontal {flipH ? "(ON)" : ""}
            </button>
            <button onClick={() => setFlipV((v) => !v)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${flipV ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
              Flip Vertical {flipV ? "(ON)" : ""}
            </button>
            <button onClick={download} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 ml-auto">Download PNG</button>
          </div>
        </>
      )}
    </div>
  );
}
