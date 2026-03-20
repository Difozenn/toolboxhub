"use client";

import { useState, useRef, useCallback } from "react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function ImageResizer() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [origWidth, setOrigWidth] = useState(0);
  const [origHeight, setOrigHeight] = useState(0);
  const [newWidth, setNewWidth] = useState(0);
  const [newHeight, setNewHeight] = useState(0);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [resizedSize, setResizedSize] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalFile(file);
    setResizedUrl(null);
    setResizedSize(0);

    const img = new Image();
    img.onload = () => {
      setImage(img);
      setOrigWidth(img.naturalWidth);
      setOrigHeight(img.naturalHeight);
      setNewWidth(img.naturalWidth);
      setNewHeight(img.naturalHeight);
    };
    img.src = URL.createObjectURL(file);
  }, []);

  const handleWidthChange = useCallback(
    (w: number) => {
      setNewWidth(w);
      if (maintainAspect && origWidth > 0) {
        setNewHeight(Math.round((w / origWidth) * origHeight));
      }
    },
    [maintainAspect, origWidth, origHeight]
  );

  const handleHeightChange = useCallback(
    (h: number) => {
      setNewHeight(h);
      if (maintainAspect && origHeight > 0) {
        setNewWidth(Math.round((h / origHeight) * origWidth));
      }
    },
    [maintainAspect, origWidth, origHeight]
  );

  const resize = useCallback(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setResizedUrl(URL.createObjectURL(blob));
        setResizedSize(blob.size);
      },
      "image/png"
    );
  }, [image, newWidth, newHeight]);

  const presetSizes = [
    { label: "50%", factor: 0.5 },
    { label: "75%", factor: 0.75 },
    { label: "150%", factor: 1.5 },
    { label: "200%", factor: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* File input */}
      <div className="rounded-xl border border-border bg-muted p-5">
        <label className="mb-2 block text-sm font-medium text-foreground">
          Upload Image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary-hover"
        />
      </div>

      {image && (
        <>
          {/* Original info */}
          <div className="rounded-xl border border-border bg-muted p-4">
            <h3 className="mb-2 text-sm font-medium text-foreground">Original Image</h3>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Dimensions: {origWidth} x {origHeight}px</span>
              <span>Size: {originalFile ? formatBytes(originalFile.size) : "N/A"}</span>
            </div>
          </div>

          {/* Resize controls */}
          <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
            <h3 className="text-sm font-medium text-foreground">Resize Options</h3>

            {/* Quick presets */}
            <div className="flex flex-wrap gap-2">
              {presetSizes.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    const w = Math.round(origWidth * p.factor);
                    const h = Math.round(origHeight * p.factor);
                    setNewWidth(w);
                    setNewHeight(h);
                  }}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Width (px)</label>
                <input
                  type="number"
                  value={newWidth}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  min={1}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Height (px)</label>
                <input
                  type="number"
                  value={newHeight}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  min={1}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={maintainAspect}
                onChange={(e) => setMaintainAspect(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-foreground">Maintain aspect ratio</span>
            </label>

            <button
              onClick={resize}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Resize Image
            </button>
          </div>

          {/* Hidden canvas */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Result */}
          {resizedUrl && (
            <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Resized Image</h3>
                <a
                  href={resizedUrl}
                  download={`resized-${newWidth}x${newHeight}.png`}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  Download
                </a>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Dimensions: {newWidth} x {newHeight}px</span>
                <span>Size: {formatBytes(resizedSize)}</span>
              </div>
              {originalFile && (
                <div className="rounded-lg bg-background p-3 text-xs text-muted-foreground">
                  Size change: {formatBytes(originalFile.size)} → {formatBytes(resizedSize)}{" "}
                  ({((resizedSize / originalFile.size) * 100).toFixed(1)}% of original)
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resizedUrl}
                alt="Resized preview"
                className="max-h-[400px] rounded-lg border border-border object-contain"
              />
            </div>
          )}
        </>
      )}

      {!image && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Upload an image to resize it. Supports PNG, JPG, GIF, and WebP.
          </p>
        </div>
      )}
    </div>
  );
}
