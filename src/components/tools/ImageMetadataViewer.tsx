"use client";

import { useState, useRef } from "react";

interface ImageMetadata {
  name: string;
  size: string;
  type: string;
  lastModified: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export default function ImageMetadataViewer() {
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    const img = new window.Image();
    img.onload = () => {
      const d = gcd(img.width, img.height);
      setMetadata({
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type || "Unknown",
        lastModified: new Date(file.lastModified).toLocaleString(),
        width: img.width,
        height: img.height,
        aspectRatio: `${img.width / d}:${img.height / d}`,
      });
    };
    img.src = url;
  };

  const handleReset = () => {
    setMetadata(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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

      {preview && (
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <img
            src={preview}
            alt="Preview"
            className="mx-auto max-h-64 rounded-lg object-contain"
          />
        </div>
      )}

      {metadata && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Image Metadata
          </h3>
          <table className="w-full text-sm">
            <tbody>
              {[
                ["File Name", metadata.name],
                ["File Size", metadata.size],
                ["MIME Type", metadata.type],
                ["Last Modified", metadata.lastModified],
                ["Width", `${metadata.width} px`],
                ["Height", `${metadata.height} px`],
                ["Dimensions", `${metadata.width} x ${metadata.height}`],
                ["Aspect Ratio", metadata.aspectRatio],
              ].map(([key, value]) => (
                <tr key={key} className="border-b border-border last:border-0">
                  <td className="py-2 pr-4 font-medium text-muted-foreground">
                    {key}
                  </td>
                  <td className="py-2 text-foreground">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {metadata && (
        <button
          onClick={handleReset}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Clear
        </button>
      )}
    </div>
  );
}
