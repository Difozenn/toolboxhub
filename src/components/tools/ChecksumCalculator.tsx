"use client";

import { useState, useCallback } from "react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

async function hashFile(
  file: File,
  algorithm: string,
  onProgress: (p: number) => void
): Promise<string> {
  const chunkSize = 2 * 1024 * 1024; // 2MB chunks
  const chunks = Math.ceil(file.size / chunkSize);

  if (file.size <= chunkSize) {
    // Small file: read all at once
    const buffer = await file.arrayBuffer();
    const hash = await crypto.subtle.digest(algorithm, buffer);
    onProgress(100);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // Large file: read in chunks. Unfortunately crypto.subtle.digest doesn't
  // support streaming, so we must read the full file first but report progress.
  const reader = file.stream().getReader();
  const allChunks: Uint8Array[] = [];
  let loaded = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    allChunks.push(value);
    loaded += value.length;
    onProgress(Math.round((loaded / file.size) * 80));
  }

  // Combine chunks
  const combined = new Uint8Array(file.size);
  let offset = 0;
  for (const chunk of allChunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }

  onProgress(90);
  const hash = await crypto.subtle.digest(algorithm, combined.buffer);
  onProgress(100);

  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

interface HashResult {
  name: string;
  algorithm: string;
  value: string;
}

export default function ChecksumCalculator() {
  const [file, setFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [computing, setComputing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<"match" | "mismatch" | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setHashes([]);
    setVerifyResult(null);
    setComputing(true);
    setProgress(0);

    try {
      const algorithms = [
        { name: "SHA-1", algorithm: "SHA-1" },
        { name: "SHA-256", algorithm: "SHA-256" },
        { name: "SHA-512", algorithm: "SHA-512" },
      ];

      const results: HashResult[] = [];
      for (let i = 0; i < algorithms.length; i++) {
        const algo = algorithms[i];
        const value = await hashFile(f, algo.algorithm, (p) => {
          const baseProgress = (i / algorithms.length) * 100;
          const chunkProgress = (p / 100) * (100 / algorithms.length);
          setProgress(Math.round(baseProgress + chunkProgress));
        });
        results.push({ name: algo.name, algorithm: algo.algorithm, value });
      }

      setHashes(results);
    } catch (err) {
      console.error("Hash computation failed:", err);
    } finally {
      setComputing(false);
      setProgress(100);
    }
  }, []);

  const copyHash = useCallback(async (value: string, name: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(name);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

  const copyAll = useCallback(async () => {
    const text = hashes.map((h) => `${h.name}: ${h.value}`).join("\n");
    await navigator.clipboard.writeText(text);
    setCopiedField("all");
    setTimeout(() => setCopiedField(null), 2000);
  }, [hashes]);

  const handleVerify = useCallback(() => {
    if (!verifyHash.trim() || hashes.length === 0) return;
    const normalized = verifyHash.trim().toLowerCase();
    const match = hashes.some((h) => h.value === normalized);
    setVerifyResult(match ? "match" : "mismatch");
  }, [verifyHash, hashes]);

  return (
    <div className="space-y-6">
      {/* File input */}
      <div className="rounded-xl border border-border bg-muted p-5">
        <label className="mb-2 block text-sm font-medium text-foreground">Select File</label>
        <input
          type="file"
          onChange={handleFile}
          className="w-full text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary-hover"
        />
        {file && (
          <div className="mt-2 text-xs text-muted-foreground">
            <p>{file.name} ({formatBytes(file.size)})</p>
          </div>
        )}
      </div>

      {/* Progress */}
      {computing && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Computing hashes...</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Hash results */}
      {hashes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">File Checksums</h3>
            <button
              onClick={copyAll}
              className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {copiedField === "all" ? "Copied all!" : "Copy all"}
            </button>
          </div>

          {hashes.map((hash) => (
            <div
              key={hash.name}
              className="rounded-xl border border-border bg-muted p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">{hash.name}</label>
                <button
                  onClick={() => copyHash(hash.value, hash.name)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {copiedField === hash.name ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="font-mono text-sm text-foreground break-all leading-relaxed">
                {hash.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Verify */}
      {hashes.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
          <h3 className="text-sm font-medium text-foreground">Verify Checksum</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={verifyHash}
              onChange={(e) => { setVerifyHash(e.target.value); setVerifyResult(null); }}
              placeholder="Paste expected hash to compare..."
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleVerify}
              disabled={!verifyHash.trim()}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
            >
              Verify
            </button>
          </div>
          {verifyResult && (
            <div
              className={`rounded-lg p-3 text-sm font-medium ${
                verifyResult === "match"
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {verifyResult === "match"
                ? "Checksum matches! The file integrity is verified."
                : "Checksum does not match any computed hash."}
            </div>
          )}
        </div>
      )}

      {!file && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Select a file to compute SHA-1, SHA-256, and SHA-512 checksums.
          </p>
        </div>
      )}
    </div>
  );
}
