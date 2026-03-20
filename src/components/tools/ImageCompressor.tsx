"use client";

import { useState, useRef, useCallback } from "react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(70);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalFile(file);
    setCompressedUrl(null);
    setCompressedSize(0);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);

    const img = new Image();
    img.onload = () => {
      setDimensions({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.src = url;
  }, []);

  const compress = useCallback(() => {
    if (!originalUrl || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setCompressedUrl(URL.createObjectURL(blob));
          setCompressedSize(blob.size);
        },
        "image/jpeg",
        quality / 100
      );
    };
    img.src = originalUrl;
  }, [originalUrl, quality]);

  const savings = originalFile && compressedSize > 0
    ? ((1 - compressedSize / originalFile.size) * 100).toFixed(1)
    : null;

  return (
    <div className="space-y-6">
      {/* File input */}
      <div className="rounded-xl border border-border bg-muted p-5">
        <label className="mb-2 block text-sm font-medium text-foreground">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary-hover"
        />
      </div>

      {originalFile && (
        <>
          {/* Quality slider */}
          <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Quality</label>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary">
                  {quality}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>10% (smallest)</span>
                <span>100% (best quality)</span>
              </div>
            </div>

            <button
              onClick={compress}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Compress Image
            </button>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {/* Side by side comparison */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Original */}
            <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
              <h3 className="text-sm font-medium text-foreground">Original</h3>
              <p className="text-xs text-muted-foreground">
                {dimensions.w} x {dimensions.h}px | {formatBytes(originalFile.size)}
              </p>
              {originalUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={originalUrl}
                  alt="Original"
                  className="max-h-[300px] rounded-lg border border-border object-contain w-full"
                />
              )}
            </div>

            {/* Compressed */}
            <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Compressed</h3>
                {compressedUrl && (
                  <a
                    href={compressedUrl}
                    download={`compressed-q${quality}.jpg`}
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-hover"
                  >
                    Download
                  </a>
                )}
              </div>
              {compressedUrl ? (
                <>
                  <p className="text-xs text-muted-foreground">
                    {dimensions.w} x {dimensions.h}px | {formatBytes(compressedSize)}
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={compressedUrl}
                    alt="Compressed"
                    className="max-h-[300px] rounded-lg border border-border object-contain w-full"
                  />
                </>
              ) : (
                <div className="flex h-[300px] items-center justify-center rounded-lg border border-border bg-background text-sm text-muted-foreground">
                  Adjust quality and click Compress
                </div>
              )}
            </div>
          </div>

          {/* Savings summary */}
          {savings && (
            <div className="rounded-xl border border-border bg-muted p-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-foreground font-medium">Size Reduction</span>
                <span className="text-muted-foreground">
                  {formatBytes(originalFile.size)} → {formatBytes(compressedSize)}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    Number(savings) > 0
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {Number(savings) > 0 ? `${savings}% smaller` : `${Math.abs(Number(savings))}% larger`}
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {!originalFile && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Upload an image to compress it. Adjust the quality slider to control file size vs quality.
          </p>
        </div>
      )}
    </div>
  );
}
