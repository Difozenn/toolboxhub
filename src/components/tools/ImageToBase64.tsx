"use client";

import { useState, useCallback, useRef } from "react";

export default function ImageToBase64() {
  const [base64, setBase64] = useState("");
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [base64Size, setBase64Size] = useState(0);
  const [mimeType, setMimeType] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(file.size);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      setBase64(dataUrl);
      // Calculate base64 size (the base64 portion after the comma)
      const b64Part = dataUrl.split(",")[1] || "";
      setBase64Size(b64Part.length);
    };
    reader.readAsDataURL(file);
  }, []);

  const rawBase64 = base64.includes(",") ? base64.split(",")[1] : base64;

  const copy = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  }, []);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const clear = useCallback(() => {
    setBase64("");
    setPreview("");
    setFileName("");
    setFileSize(0);
    setBase64Size(0);
    setMimeType("");
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  return (
    <div className="space-y-6">
      {/* File input */}
      <div className="rounded-xl border-2 border-dashed border-border bg-muted p-8 text-center">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer block space-y-3"
        >
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="text-sm text-foreground font-medium">Click to select an image</p>
          <p className="text-xs text-muted-foreground">PNG, JPG, GIF, SVG, WebP</p>
        </label>
      </div>

      {preview && (
        <>
          {/* Preview */}
          <div className="rounded-xl border border-border bg-muted p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground">Image Preview</h3>
              <button
                onClick={clear}
                className="rounded-lg border border-border bg-background px-3 py-1 text-xs text-red-500 hover:bg-red-500/10 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="flex justify-center bg-background rounded-lg p-4" style={{ backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"none\"><rect width=\"10\" height=\"10\" fill=\"%23f0f0f0\"/><rect x=\"10\" y=\"10\" width=\"10\" height=\"10\" fill=\"%23f0f0f0\"/><rect x=\"10\" width=\"10\" height=\"10\" fill=\"%23e0e0e0\"/><rect y=\"10\" width=\"10\" height=\"10\" fill=\"%23e0e0e0\"/></svg>')" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 max-w-full object-contain"
              />
            </div>
          </div>

          {/* File info */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-border bg-muted p-3">
              <p className="text-xs text-muted-foreground">File Name</p>
              <p className="text-sm font-medium text-foreground truncate">{fileName}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted p-3">
              <p className="text-xs text-muted-foreground">MIME Type</p>
              <p className="text-sm font-medium text-foreground">{mimeType}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted p-3">
              <p className="text-xs text-muted-foreground">Original Size</p>
              <p className="text-sm font-medium text-foreground">{formatSize(fileSize)}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted p-3">
              <p className="text-xs text-muted-foreground">Base64 Size</p>
              <p className="text-sm font-medium text-foreground">
                {formatSize(base64Size)}{" "}
                <span className="text-xs text-muted-foreground">
                  ({((base64Size / fileSize - 1) * 100).toFixed(0)}% larger)
                </span>
              </p>
            </div>
          </div>

          {/* Data URI */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Data URI</label>
              <button
                onClick={() => copy(base64, "datauri")}
                className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary/90 transition-colors"
              >
                {copied === "datauri" ? "Copied!" : "Copy Data URI"}
              </button>
            </div>
            <textarea
              value={base64}
              readOnly
              rows={4}
              className="w-full rounded-xl border border-border bg-muted p-4 font-mono text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y break-all"
            />
          </div>

          {/* Raw base64 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Raw Base64</label>
              <button
                onClick={() => copy(rawBase64, "raw")}
                className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary/90 transition-colors"
              >
                {copied === "raw" ? "Copied!" : "Copy Base64"}
              </button>
            </div>
            <textarea
              value={rawBase64}
              readOnly
              rows={4}
              className="w-full rounded-xl border border-border bg-muted p-4 font-mono text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y break-all"
            />
          </div>
        </>
      )}
    </div>
  );
}
