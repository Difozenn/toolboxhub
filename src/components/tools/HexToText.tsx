"use client";

import { useState, useCallback } from "react";

function textToHex(text: string, spaced: boolean): string {
  return Array.from(text)
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0").toUpperCase())
    .join(spaced ? " " : "");
}

function hexToText(hex: string): string {
  const cleaned = hex.replace(/\s+/g, "");
  if (cleaned.length % 2 !== 0) return "";
  if (!/^[0-9A-Fa-f]*$/.test(cleaned)) return "";
  let result = "";
  for (let i = 0; i < cleaned.length; i += 2) {
    const code = parseInt(cleaned.substring(i, i + 2), 16);
    result += String.fromCharCode(code);
  }
  return result;
}

export default function HexToText() {
  const [text, setText] = useState("");
  const [hex, setHex] = useState("");
  const [spaced, setSpaced] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleTextChange = useCallback(
    (value: string) => {
      setText(value);
      setError("");
      setHex(textToHex(value, spaced));
    },
    [spaced]
  );

  const handleHexChange = useCallback((value: string) => {
    setHex(value);
    setError("");
    const cleaned = value.replace(/\s+/g, "");
    if (!cleaned) {
      setText("");
      return;
    }
    if (!/^[0-9A-Fa-f]*$/.test(cleaned)) {
      setError("Invalid hex characters");
      return;
    }
    if (cleaned.length % 2 !== 0) {
      setError("Hex string must have even length");
      return;
    }
    setText(hexToText(value));
  }, []);

  const toggleSpaced = useCallback(() => {
    setSpaced((prev) => {
      const newSpaced = !prev;
      if (text) {
        setHex(textToHex(text, newSpaced));
      }
      return newSpaced;
    });
  }, [text]);

  const copy = useCallback(async (content: string, field: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {}
  }, []);

  return (
    <div className="space-y-6">
      {/* Options */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={spaced}
          onChange={toggleSpaced}
          className="rounded border-border"
        />
        <span className="text-sm text-foreground">Space-separated hex bytes</span>
      </label>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Text side */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Plain Text</label>
            <button
              onClick={() => text && copy(text, "text")}
              disabled={!text}
              className="rounded-lg border border-border bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copiedField === "text" ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter text here..."
            rows={8}
            className="w-full rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
          />
        </div>

        {/* Hex side */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Hex String</label>
            <button
              onClick={() => hex && copy(hex, "hex")}
              disabled={!hex}
              className="rounded-lg border border-border bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copiedField === "hex" ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder={spaced ? "48 65 6C 6C 6F" : "48656C6C6F"}
            rows={8}
            className="w-full rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Info */}
      {text && (
        <div className="rounded-xl border border-border bg-muted p-4 flex gap-6 flex-wrap text-sm">
          <span className="text-muted-foreground">
            Characters: <span className="font-medium text-foreground">{text.length}</span>
          </span>
          <span className="text-muted-foreground">
            Hex bytes: <span className="font-medium text-foreground">{text.length * 2}</span> chars
          </span>
        </div>
      )}
    </div>
  );
}
