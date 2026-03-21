"use client";

import { useState, useRef } from "react";

const ASCII_CHARS = " .:-=+*#%@";

export default function ImageToAscii() {
  const [ascii, setAscii] = useState("");
  const [copied, setCopied] = useState(false);
  const [width, setWidth] = useState(100);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const aspectRatio = img.height / img.width;
      const cols = width;
      const rows = Math.floor(cols * aspectRatio * 0.5);

      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, cols, rows);
      const imageData = ctx.getImageData(0, 0, cols, rows);
      const pixels = imageData.data;

      let result = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          const charIndex = Math.floor(brightness * (ASCII_CHARS.length - 1));
          result += ASCII_CHARS[charIndex];
        }
        result += "\n";
      }

      setAscii(result);
    };
    img.src = URL.createObjectURL(file);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ascii);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
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
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Width (characters): {width}
          </label>
          <input
            type="range"
            min={40}
            max={200}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {ascii && (
        <>
          <div className="rounded-xl border border-border bg-muted p-4 overflow-x-auto">
            <pre className="font-mono text-[4px] leading-[5px] sm:text-[6px] sm:leading-[7px] text-foreground">
              <code>{ascii}</code>
            </pre>
          </div>
          <button
            onClick={handleCopy}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {copied ? "Copied!" : "Copy ASCII Art"}
          </button>
        </>
      )}

      {!ascii && (
        <div className="rounded-xl border border-border bg-muted p-8 text-center text-muted-foreground">
          Upload an image to convert it to ASCII art
        </div>
      )}
    </div>
  );
}
