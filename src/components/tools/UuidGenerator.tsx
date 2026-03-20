"use client";

import { useState, useCallback } from "react";

function generateUUID(): string {
  // Use crypto.randomUUID if available, otherwise manual v4
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback v4 UUID
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [uppercase, setUppercase] = useState(false);

  const generate = useCallback(() => {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(generateUUID());
    }
    setUuids(result);
    setCopiedIdx(null);
    setCopiedAll(false);
  }, [count]);

  const format = useCallback(
    (uuid: string) => (uppercase ? uuid.toUpperCase() : uuid),
    [uppercase]
  );

  const copyOne = useCallback(
    async (index: number) => {
      await navigator.clipboard.writeText(format(uuids[index]));
      setCopiedIdx(index);
      setTimeout(() => setCopiedIdx(null), 1500);
    },
    [uuids, format]
  );

  const copyAll = useCallback(async () => {
    await navigator.clipboard.writeText(
      uuids.map((u) => format(u)).join("\n")
    );
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  }, [uuids, format]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Count
          </label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) =>
              setCount(Math.min(100, Math.max(1, Number(e.target.value))))
            }
            className="w-24 rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <label className="flex items-center gap-2 pb-1 cursor-pointer">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-sm text-foreground">Uppercase</span>
        </label>

        <button
          onClick={generate}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Generate
        </button>
      </div>

      {/* Results */}
      {uuids.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              Generated UUID{uuids.length > 1 ? "s" : ""}
            </h3>
            <div className="flex gap-2">
              {uuids.length > 1 && (
                <button
                  onClick={copyAll}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
                >
                  {copiedAll ? "Copied All!" : "Copy All"}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {uuids.map((uuid, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border bg-muted p-3"
              >
                <code className="flex-1 font-mono text-sm text-foreground select-all">
                  {format(uuid)}
                </code>
                <button
                  onClick={() => copyOne(i)}
                  className="shrink-0 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
                >
                  {copiedIdx === i ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
