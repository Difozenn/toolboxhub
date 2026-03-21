"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function MemeGenerator() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(image, 0, 0);

    const scale = Math.max(1, image.width / 600);
    const scaledFontSize = Math.round(fontSize * scale);

    ctx.font = `bold ${scaledFontSize}px Impact, Arial Black, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = Math.max(2, scaledFontSize / 10);
    ctx.lineJoin = "round";

    const wrapText = (text: string, maxWidth: number): string[] => {
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);
      return lines;
    };

    const maxWidth = image.width * 0.9;

    if (topText) {
      const lines = wrapText(topText.toUpperCase(), maxWidth);
      lines.forEach((line, i) => {
        const y = scaledFontSize + 10 + i * (scaledFontSize + 4);
        ctx.strokeText(line, image.width / 2, y);
        ctx.fillText(line, image.width / 2, y);
      });
    }

    if (bottomText) {
      const lines = wrapText(bottomText.toUpperCase(), maxWidth);
      const startY = image.height - 20 - (lines.length - 1) * (scaledFontSize + 4);
      lines.forEach((line, i) => {
        const y = startY + i * (scaledFontSize + 4);
        ctx.strokeText(line, image.width / 2, y);
        ctx.fillText(line, image.width / 2, y);
      });
    }
  }, [image, topText, bottomText, fontSize]);

  useEffect(() => {
    drawMeme();
  }, [drawMeme]);

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
    link.download = "meme.png";
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
            Top Text
          </label>
          <input
            type="text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            placeholder="Top text..."
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Bottom Text
          </label>
          <input
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            placeholder="Bottom text..."
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Font Size: {fontSize}px
        </label>
        <input
          type="range"
          min={16}
          max={96}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>

      {image && (
        <>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <canvas
              ref={canvasRef}
              className="mx-auto max-w-full rounded-lg"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <button
            onClick={handleDownload}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Download Meme
          </button>
        </>
      )}

      {!image && (
        <div className="rounded-xl border border-border bg-muted p-8 text-center text-muted-foreground">
          Upload an image to create your meme
        </div>
      )}
    </div>
  );
}
