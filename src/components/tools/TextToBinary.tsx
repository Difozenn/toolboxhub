"use client";

import { useState, useCallback } from "react";

function textToBinary(text: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  return Array.from(bytes)
    .map((b) => b.toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryToText(binary: string): string {
  const cleaned = binary.replace(/[^01\s]/g, "").trim();
  if (!cleaned) return "";

  const bytes = cleaned.split(/\s+/).filter((b) => b.length > 0);
  const arr = new Uint8Array(bytes.length);

  for (let i = 0; i < bytes.length; i++) {
    const val = parseInt(bytes[i], 2);
    if (isNaN(val) || val > 255) {
      throw new Error(`Invalid binary byte: "${bytes[i]}"`);
    }
    arr[i] = val;
  }

  return new TextDecoder("utf-8").decode(arr);
}

function textToAscii(text: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  return Array.from(bytes).join(" ");
}

export default function TextToBinary() {
  const [textValue, setTextValue] = useState("");
  const [binaryValue, setBinaryValue] = useState("");
  const [asciiValues, setAsciiValues] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleTextChange = useCallback((value: string) => {
    setTextValue(value);
    setError(null);
    if (!value) {
      setBinaryValue("");
      setAsciiValues("");
      return;
    }
    try {
      setBinaryValue(textToBinary(value));
      setAsciiValues(textToAscii(value));
    } catch {
      setError("Could not convert text");
    }
  }, []);

  const handleBinaryChange = useCallback((value: string) => {
    setBinaryValue(value);
    setError(null);
    if (!value.trim()) {
      setTextValue("");
      setAsciiValues("");
      return;
    }
    try {
      const text = binaryToText(value);
      setTextValue(text);
      setAsciiValues(textToAscii(text));
    } catch {
      setError("Invalid binary input. Use space-separated 8-bit binary values.");
    }
  }, []);

  const copy = useCallback(async (text: string, field: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  }, []);

  return (
    <div className="space-y-6">
      {/* Text input */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">
            Text
          </label>
          {textValue && (
            <button
              onClick={() => copy(textValue, "text")}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copiedField === "text" ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        <textarea
          value={textValue}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Type text here..."
          className="h-32 w-full resize-y rounded-xl border border-border bg-muted p-4 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Binary output/input */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">
            Binary
          </label>
          {binaryValue && (
            <button
              onClick={() => copy(binaryValue, "binary")}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copiedField === "binary" ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        <textarea
          value={binaryValue}
          onChange={(e) => handleBinaryChange(e.target.value)}
          placeholder="Or type binary here (e.g. 01001000 01101001)..."
          className="h-32 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* ASCII values */}
      {asciiValues && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              ASCII / UTF-8 Byte Values
            </label>
            <button
              onClick={() => copy(asciiValues, "ascii")}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copiedField === "ascii" ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground">
            {asciiValues}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
