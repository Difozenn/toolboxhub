"use client";

import { useState, useCallback } from "react";

const SIZES = [
  { label: "Small (150x150)", value: 150 },
  { label: "Medium (300x300)", value: 300 },
  { label: "Large (500x500)", value: 500 },
];

export default function QrCodeGenerator() {
  const [input, setInput] = useState("");
  const [size, setSize] = useState(300);
  const [generated, setGenerated] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  const generateQr = useCallback(() => {
    if (!input.trim()) return;
    const encodedData = encodeURIComponent(input.trim());
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}&format=png&margin=10`;
    setQrUrl(url);
    setGenerated(true);
  }, [input, size]);

  const handleDownload = useCallback(async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qrcode-${size}x${size}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(qrUrl, "_blank");
    }
  }, [qrUrl, size]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        generateQr();
      }
    },
    [generateQr]
  );

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Text or URL
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setGenerated(false);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Enter text or URL to encode as QR code..."
          className="h-28 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Options */}
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Size
          </label>
          <select
            value={size}
            onChange={(e) => {
              setSize(parseInt(e.target.value));
              setGenerated(false);
            }}
            className="rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {SIZES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generateQr}
          disabled={!input.trim()}
          className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Generate QR Code
        </button>
      </div>

      {/* QR Code display */}
      {generated && qrUrl && (
        <div className="flex flex-col items-center gap-6">
          <div className="rounded-xl border border-border bg-white p-6">
            <img
              src={qrUrl}
              alt={`QR code for: ${input}`}
              width={size}
              height={size}
              className="block"
              onError={(e) => {
                (e.target as HTMLImageElement).alt =
                  "Failed to generate QR code. Please try again.";
              }}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Download PNG
            </button>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(qrUrl);
                } catch {
                  // silently fail
                }
              }}
              className="rounded-xl border border-border bg-muted px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
            >
              Copy Image URL
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center max-w-md">
            QR code generated via qrserver.com API. The image is{" "}
            {size}x{size} pixels in PNG format.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!generated && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="3" height="3" />
              <rect x="18" y="14" width="3" height="3" />
              <rect x="14" y="18" width="3" height="3" />
              <rect x="18" y="18" width="3" height="3" />
            </svg>
          </div>
          <p className="text-muted-foreground">
            Enter text or a URL above and click &quot;Generate QR Code&quot;
          </p>
        </div>
      )}
    </div>
  );
}
