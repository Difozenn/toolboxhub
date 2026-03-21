"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const buttonClass =
  "rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

type BorderStyle = "solid" | "dashed" | "double";

export default function ImageBorderAdder() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const [borderWidth, setBorderWidth] = useState(20);
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderStyle, setBorderStyle] = useState<BorderStyle>("solid");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImageSrc(dataUrl);
      const img = new Image();
      img.onload = () => setImageEl(img);
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const drawCanvas = useCallback(() => {
    if (!imageEl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bw = borderWidth;
    const totalW = imageEl.width + bw * 2;
    const totalH = imageEl.height + bw * 2;

    canvas.width = totalW;
    canvas.height = totalH;

    // Clear
    ctx.clearRect(0, 0, totalW, totalH);

    // Draw border
    ctx.strokeStyle = borderColor;

    if (borderStyle === "solid") {
      ctx.lineWidth = bw * 2;
      ctx.strokeRect(0, 0, totalW, totalH);
      // Fill border area
      ctx.fillStyle = borderColor;
      ctx.fillRect(0, 0, totalW, totalH);
    } else if (borderStyle === "dashed") {
      // Fill border color as background
      ctx.fillStyle = borderColor;
      ctx.fillRect(0, 0, totalW, totalH);
      // Draw dashed lines over the border area
      ctx.setLineDash([bw / 2, bw / 3]);
      ctx.lineWidth = bw;
      ctx.strokeStyle = "#ffffff80";
      ctx.strokeRect(bw / 2, bw / 2, totalW - bw, totalH - bw);
      ctx.setLineDash([]);
    } else if (borderStyle === "double") {
      // Fill with border color
      ctx.fillStyle = borderColor;
      ctx.fillRect(0, 0, totalW, totalH);
      // Inner gap for "double" effect
      const gap = Math.max(2, bw / 4);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(gap, gap, totalW - gap * 2, totalH - gap * 2);
      ctx.fillStyle = borderColor;
      ctx.fillRect(gap * 2, gap * 2, totalW - gap * 4, totalH - gap * 4);
    }

    // Draw image centered
    ctx.drawImage(imageEl, bw, bw);
  }, [imageEl, borderWidth, borderColor, borderStyle]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "bordered-image.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) handleFile(file);
    },
    []
  );

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Original"
            className="mb-4 max-h-32 rounded-lg object-contain"
          />
        ) : (
          <div className="mb-4 text-4xl text-muted-foreground">🖼</div>
        )}
        <p className="mb-3 text-sm text-muted-foreground">
          {imageSrc ? "Image loaded - change with button below" : "Drag & drop an image or click to upload"}
        </p>
        <label className={buttonClass + " cursor-pointer"}>
          {imageSrc ? "Change Image" : "Choose Image"}
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

      {/* Controls */}
      {imageEl && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Border Width: {borderWidth}px
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={borderWidth}
                onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Border Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded-lg border border-border bg-transparent"
                />
                <input
                  type="text"
                  className={inputClass}
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Border Style
              </label>
              <select
                className={inputClass}
                value={borderStyle}
                onChange={(e) => setBorderStyle(e.target.value as BorderStyle)}
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="double">Double</option>
              </select>
            </div>
          </div>

          {/* Preview */}
          <div className={cardClass}>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Preview
            </p>
            <div className="flex justify-center overflow-auto">
              <canvas
                ref={canvasRef}
                className="max-w-full rounded-lg"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {imageEl.width + borderWidth * 2} x {imageEl.height + borderWidth * 2}px
              (original: {imageEl.width} x {imageEl.height}px)
            </p>
          </div>

          <div className="flex justify-center">
            <button onClick={download} className={buttonClass}>
              Download Bordered Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
