"use client";

import { useState, useCallback, useEffect } from "react";

export default function Base64Encoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const process = useCallback(
    (value: string, currentMode: "encode" | "decode") => {
      if (value.trim() === "") {
        setOutput("");
        setError(null);
        return;
      }
      try {
        if (currentMode === "encode") {
          // Use TextEncoder to support Unicode
          const bytes = new TextEncoder().encode(value);
          let binary = "";
          bytes.forEach((b) => (binary += String.fromCharCode(b)));
          setOutput(btoa(binary));
        } else {
          const binary = atob(value);
          const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
          setOutput(new TextDecoder().decode(bytes));
        }
        setError(null);
      } catch {
        setError(
          currentMode === "decode"
            ? "Invalid Base64 string"
            : "Could not encode this text"
        );
        setOutput("");
      }
    },
    []
  );

  // Auto-process as the user types
  useEffect(() => {
    process(input, mode);
  }, [input, mode, process]);

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  const switchMode = useCallback(
    (newMode: "encode" | "decode") => {
      if (newMode === mode) return;
      setMode(newMode);
      // Swap input/output for seamless UX
      setInput(output);
    },
    [mode, output]
  );

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => switchMode("encode")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "encode"
              ? "bg-primary text-white"
              : "border border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => switchMode("decode")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "decode"
              ? "bg-primary text-white"
              : "border border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          Decode
        </button>
      </div>

      {/* Input */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">
          {mode === "encode" ? "Plain Text" : "Base64 String"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "encode"
              ? "Type text to encode..."
              : "Paste Base64 string to decode..."
          }
          className="h-36 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Output */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">
            {mode === "encode" ? "Base64 Output" : "Decoded Text"}
          </label>
          {output && (
            <button
              onClick={copy}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        <textarea
          readOnly
          value={output}
          className="h-36 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground focus:outline-none"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
