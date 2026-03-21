"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function ImageOverlay() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [text, setText] = useState("Hello World");
  const [position, setPosition] = useState<"top" | "center" | "bottom">("center");
  const [fontSize, setFontSize] = useState(36);
  const [textColor, setTextColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(image, 0, 0);

    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = Math.max(2, fontSize / 12);

    let y: number;
    switch (position) {
      case "top":
        y = fontSize + 20;
        break;
      case "bottom":
        y = image.height - 20;
        break;
      default:
        y = image.height / 2 + fontSize / 3;
    }

    const x = image.width / 2;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  }, [image, text, position, fontSize, textColor]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new window.Image();
    img.onload = () => setImage(img);
    img.src = URL.createObjectURL(file);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "image-overlay.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Upload Image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary-foreground"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Overlay Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter overlay text..."
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Position
          </label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as "top" | "center" | "bottom")}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="top">Top</option>
            <option value="center">Center</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Font Size: {fontSize}px
          </label>
          <input
            type="range"
            min={12}
            max={120}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Text Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded border border-border bg-muted"
            />
            <span className="text-sm text-muted-foreground">{textColor}</span>
          </div>
        </div>
      </div>

      {image && (
        <>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <canvas
              ref={canvasRef}
              className="mx-auto max-h-96 max-w-full rounded-lg object-contain"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <button
            onClick={handleDownload}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Download Image
          </button>
        </>
      )}

      {!image && (
        <div className="rounded-xl border border-border bg-muted p-8 text-center text-muted-foreground">
          Upload an image to get started
        </div>
      )}
    </div>
  );
}
