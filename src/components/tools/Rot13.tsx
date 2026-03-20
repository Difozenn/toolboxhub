"use client";

import { useState, useMemo, useCallback } from "react";

function rot13(text: string): string {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export default function Rot13() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => rot13(input), [input]);

  const copyOutput = useCallback(async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to apply ROT13 cipher..."
          rows={5}
          className="w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {input && (
          <p className="mt-1 text-xs text-muted-foreground">
            {input.length} character{input.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Output */}
      {input ? (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">ROT13 Output</h3>
            <button
              onClick={copyOutput}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-background p-3 font-mono text-sm text-foreground whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Enter text above to encode or decode with ROT13.
          </p>
        </div>
      )}

      {/* Info */}
      <div className="rounded-xl border border-border bg-muted p-4">
        <h3 className="mb-2 text-sm font-medium text-foreground">About ROT13</h3>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>ROT13 shifts each letter by 13 positions in the alphabet</li>
          <li>Applying ROT13 twice returns the original text (it is its own inverse)</li>
          <li>Non-alphabetic characters (numbers, punctuation, spaces) are left unchanged</li>
          <li>Both uppercase and lowercase letters are supported</li>
          <li>ROT13 is a simple substitution cipher, not suitable for real security</li>
        </ul>
      </div>
    </div>
  );
}
