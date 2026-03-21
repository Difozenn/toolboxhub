"use client";

import { useState, useRef, useCallback } from "react";

const buttonClass =
  "rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

interface ColorSwatch {
  hex: string;
  r: number;
  g: number;
  b: number;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")
  );
}

function colorDistance(a: number[], b: number[]): number {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
}

function quantizeColors(pixels: number[][], k: number): number[][] {
  // Simple k-means-ish quantization
  if (pixels.length === 0) return [];

  // Initialize centroids by picking evenly spaced pixels
  const step = Math.max(1, Math.floor(pixels.length / k));
  let centroids = Array.from({ length: k }, (_, i) => [...pixels[Math.min(i * step, pixels.length - 1)]]);

  for (let iter = 0; iter < 10; iter++) {
    const clusters: number[][][] = Array.from({ length: k }, () => []);

    for (const pixel of pixels) {
      let minDist = Infinity;
      let closest = 0;
      for (let c = 0; c < centroids.length; c++) {
        const d = colorDistance(pixel, centroids[c]);
        if (d < minDist) {
          minDist = d;
          closest = c;
        }
      }
      clusters[closest].push(pixel);
    }

    centroids = clusters.map((cluster, i) => {
      if (cluster.length === 0) return centroids[i];
      const avg = [0, 0, 0];
      for (const p of cluster) {
        avg[0] += p[0];
        avg[1] += p[1];
        avg[2] += p[2];
      }
      return avg.map((v) => Math.round(v / cluster.length));
    });
  }

  return centroids;
}

export default function ColorPaletteFromImage() {
  const [colors, setColors] = useState<ColorSwatch[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);

      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const maxDim = 150;
        const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        const pixels: number[][] = [];
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 128) continue; // skip transparent
          pixels.push([data[i], data[i + 1], data[i + 2]]);
        }

        const dominant = quantizeColors(pixels, 5);

        // Sort by luminance
        dominant.sort((a, b) => {
          const lumA = 0.299 * a[0] + 0.587 * a[1] + 0.114 * a[2];
          const lumB = 0.299 * b[0] + 0.587 * b[1] + 0.114 * b[2];
          return lumB - lumA;
        });

        setColors(
          dominant.map((c) => ({
            hex: rgbToHex(c[0], c[1], c[2]),
            r: c[0],
            g: c[1],
            b: c[2],
          }))
        );
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) handleFile(file);
    },
    [handleFile]
  );

  const copy = async (hex: string, idx: number) => {
    await navigator.clipboard.writeText(hex);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary"
      >
        {preview ? (
          <img
            src={preview}
            alt="Uploaded"
            className="mb-4 max-h-48 rounded-lg object-contain"
          />
        ) : (
          <div className="mb-4 text-4xl text-muted-foreground">🖼</div>
        )}
        <p className="mb-3 text-sm text-muted-foreground">
          Drag & drop an image or click to upload
        </p>
        <label className={buttonClass + " cursor-pointer"}>
          Choose Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      </div>

      {colors.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">
            Extracted Palette
          </h3>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {colors.map((color, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => copy(color.hex, idx)}
                  className="h-20 w-20 shrink-0 rounded-xl border border-border shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                  title={`Click to copy ${color.hex}`}
                />
                <span className="text-xs font-mono font-medium text-foreground">
                  {copiedIndex === idx ? "Copied!" : color.hex.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">
                  rgb({color.r}, {color.g}, {color.b})
                </span>
              </div>
            ))}
          </div>

          <div className={cardClass}>
            <div className="flex h-12 overflow-hidden rounded-lg">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className="flex-1"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Combined palette preview
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
