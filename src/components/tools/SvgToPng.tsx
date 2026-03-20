"use client";

import { useState, useRef, useCallback } from "react";

export default function SvgToPng() {
  const [svgCode, setSvgCode] = useState("");
  const [scale, setScale] = useState(2);
  const [bgType, setBgType] = useState<"transparent" | "custom">("transparent");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [pngSize, setPngSize] = useState(0);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setSvgCode(text);
        setPngUrl(null);
        setError("");
      };
      reader.readAsText(file);
    },
    []
  );

  const convert = useCallback(() => {
    if (!svgCode.trim()) return;
    setError("");
    setPngUrl(null);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const blob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const w = img.naturalWidth || 300;
      const h = img.naturalHeight || 150;
      const sw = w * scale;
      const sh = h * scale;

      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (bgType === "custom") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, sw, sh);
      } else {
        ctx.clearRect(0, 0, sw, sh);
      }

      ctx.drawImage(img, 0, 0, sw, sh);
      setDimensions({ w: sw, h: sh });

      canvas.toBlob(
        (pngBlob) => {
          if (!pngBlob) {
            setError("Failed to generate PNG.");
            return;
          }
          setPngUrl(URL.createObjectURL(pngBlob));
          setPngSize(pngBlob.size);
        },
        "image/png"
      );

      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      setError("Invalid SVG code. Please check the syntax.");
      URL.revokeObjectURL(url);
    };

    img.src = url;
  }, [svgCode, scale, bgType, bgColor]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* SVG Input */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">SVG Code</label>
          <textarea
            value={svgCode}
            onChange={(e) => { setSvgCode(e.target.value); setPngUrl(null); setError(""); }}
            placeholder={'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">...</svg>'}
            rows={8}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Or Upload SVG File</label>
          <input
            type="file"
            accept=".svg"
            onChange={handleFileUpload}
            className="w-full text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary-hover"
          />
        </div>
      </div>

      {/* Options */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Scale</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  scale === s
                    ? "bg-primary text-white"
                    : "border border-border bg-background text-foreground hover:bg-primary/10"
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Background</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={bgType === "transparent"}
                onChange={() => setBgType("transparent")}
                className="accent-primary"
              />
              <span className="text-sm text-foreground">Transparent</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={bgType === "custom"}
                onChange={() => setBgType("custom")}
                className="accent-primary"
              />
              <span className="text-sm text-foreground">Custom Color</span>
            </label>
            {bgType === "custom" && (
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border border-border"
              />
            )}
          </div>
        </div>

        <button
          onClick={convert}
          disabled={!svgCode.trim()}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          Convert to PNG
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* SVG Preview */}
      {svgCode.trim() && !error && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <h3 className="mb-2 text-sm font-medium text-foreground">SVG Preview</h3>
          <div
            className="flex items-center justify-center rounded-lg border border-border bg-background p-4"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
              backgroundSize: "16px 16px",
              backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
            }}
            dangerouslySetInnerHTML={{ __html: svgCode }}
          />
        </div>
      )}

      {/* Result */}
      {pngUrl && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              PNG Output ({dimensions.w} x {dimensions.h}px)
            </h3>
            <a
              href={pngUrl}
              download={`svg-to-png-${scale}x.png`}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Download PNG
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            Size: {formatBytes(pngSize)} | Scale: {scale}x
          </p>
          <div
            className="flex items-center justify-center rounded-lg border border-border p-4"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
              backgroundSize: "16px 16px",
              backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pngUrl}
              alt="PNG output"
              className="max-h-[400px] max-w-full object-contain"
            />
          </div>
        </div>
      )}

      {!svgCode.trim() && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Paste SVG code or upload an SVG file to convert it to PNG.
          </p>
        </div>
      )}
    </div>
  );
}
