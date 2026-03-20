"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const QUICK_SIZES = [
  { label: "150 x 150", w: 150, h: 150 },
  { label: "300 x 200", w: 300, h: 200 },
  { label: "800 x 600", w: 800, h: 600 },
  { label: "1920 x 1080", w: 1920, h: 1080 },
];

export default function PlaceholderImage() {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [bgColor, setBgColor] = useState("#cbd5e1");
  const [textColor, setTextColor] = useState("#334155");
  const [text, setText] = useState("");
  const [dataUri, setDataUri] = useState("");
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Text
    const displayText = text || `${width} x ${height}`;
    const fontSize = Math.max(12, Math.min(width, height) / 8);
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(displayText, width / 2, height / 2);

    setDataUri(canvas.toDataURL("image/png"));
  }, [width, height, bgColor, textColor, text]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const downloadPng = useCallback(() => {
    if (!dataUri) return;
    const link = document.createElement("a");
    link.download = `placeholder-${width}x${height}.png`;
    link.href = dataUri;
    link.click();
  }, [dataUri, width, height]);

  const copyTag = useCallback(async () => {
    const tag = `<img src="${dataUri}" width="${width}" height="${height}" alt="Placeholder ${width}x${height}" />`;
    await navigator.clipboard.writeText(tag);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [dataUri, width, height]);

  const applyQuickSize = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-5">
        {/* Dimensions */}
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Width (px)
            </label>
            <input
              type="number"
              min={1}
              max={4096}
              value={width}
              onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
              className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Height (px)
            </label>
            <input
              type="number"
              min={1}
              max={4096}
              value={height}
              onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))}
              className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Background
            </label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded-lg border border-border bg-transparent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Text Color
            </label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded-lg border border-border bg-transparent"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Custom Text (optional, defaults to dimensions)
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`${width} x ${height}`}
            className="w-full max-w-sm rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Quick sizes */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">
            Quick Sizes
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_SIZES.map((s) => (
              <button
                key={s.label}
                onClick={() => applyQuickSize(s.w, s.h)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  width === s.w && height === s.h
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-background text-foreground hover:border-primary"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Preview</h3>
          <div className="flex gap-2">
            <button
              onClick={downloadPng}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Download PNG
            </button>
            <button
              onClick={copyTag}
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copied ? "Copied!" : "Copy IMG Tag"}
            </button>
          </div>
        </div>

        <div className="overflow-auto rounded-xl border border-border bg-muted p-4">
          <canvas
            ref={canvasRef}
            className="mx-auto"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* HTML tag display */}
        {dataUri && (
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              HTML IMG Tag
            </p>
            <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-xs text-foreground">
              {`<img src="${dataUri.substring(0, 60)}..." width="${width}" height="${height}" alt="Placeholder ${width}x${height}" />`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
