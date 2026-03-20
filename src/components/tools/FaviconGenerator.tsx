"use client";

import { useState, useRef, useCallback } from "react";

const SIZES = [
  { size: 16, label: "16x16", desc: "Browser tab" },
  { size: 32, label: "32x32", desc: "Browser tab (Retina)" },
  { size: 48, label: "48x48", desc: "Windows site icon" },
  { size: 180, label: "180x180", desc: "Apple Touch Icon" },
  { size: 192, label: "192x192", desc: "Android Chrome" },
  { size: 512, label: "512x512", desc: "PWA splash screen" },
];

export default function FaviconGenerator() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [previews, setPreviews] = useState<{ size: number; url: string }[]>([]);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setPreviews([]);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const generated: { size: number; url: string }[] = [];
      for (const s of SIZES) {
        canvas.width = s.size;
        canvas.height = s.size;
        ctx.clearRect(0, 0, s.size, s.size);
        ctx.drawImage(img, 0, 0, s.size, s.size);
        generated.push({ size: s.size, url: canvas.toDataURL("image/png") });
      }
      setPreviews(generated);
    };
    img.src = url;
  }, []);

  const downloadOne = useCallback((url: string, size: number) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `favicon-${size}x${size}.png`;
    a.click();
  }, []);

  const htmlTags = `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">`;

  const copyTags = useCallback(async () => {
    await navigator.clipboard.writeText(htmlTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [htmlTags]);

  return (
    <div className="space-y-6">
      {/* File input */}
      <div className="rounded-xl border border-border bg-muted p-5">
        <label className="mb-2 block text-sm font-medium text-foreground">
          Upload Source Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary-hover"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          For best results, use a square image at least 512x512px. PNG with transparency recommended.
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Previews */}
      {previews.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Generated Favicons</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SIZES.map((sizeInfo) => {
              const preview = previews.find((p) => p.size === sizeInfo.size);
              if (!preview) return null;
              return (
                <div
                  key={sizeInfo.size}
                  className="rounded-xl border border-border bg-muted p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{sizeInfo.label}</p>
                      <p className="text-xs text-muted-foreground">{sizeInfo.desc}</p>
                    </div>
                    <button
                      onClick={() => downloadOne(preview.url, sizeInfo.size)}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
                    >
                      Download
                    </button>
                  </div>
                  <div
                    className="flex items-center justify-center rounded-lg border border-border bg-background p-4"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
                      backgroundSize: "12px 12px",
                      backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preview.url}
                      alt={`${sizeInfo.label} favicon`}
                      style={{
                        width: Math.min(sizeInfo.size, 128),
                        height: Math.min(sizeInfo.size, 128),
                        imageRendering: sizeInfo.size <= 32 ? "pixelated" : "auto",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* HTML Tags */}
      {previews.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">HTML Link Tags</h3>
            <button
              onClick={copyTags}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copied ? "Copied!" : "Copy Tags"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-background p-3 text-xs text-foreground">
            <code>{htmlTags}</code>
          </pre>
        </div>
      )}

      {!imageSrc && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Upload an image to generate favicons in all standard sizes.
          </p>
        </div>
      )}
    </div>
  );
}
