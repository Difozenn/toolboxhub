"use client";

import { useState, useMemo, useCallback } from "react";

function caesarShift(text: string, shift: number): string {
  const s = ((shift % 26) + 26) % 26;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + s) % 26) + base);
  });
}

export default function CaesarCipher() {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [copied, setCopied] = useState(false);
  const [copiedRow, setCopiedRow] = useState<number | null>(null);

  const effectiveShift = mode === "encrypt" ? shift : 26 - shift;
  const output = useMemo(() => caesarShift(input, effectiveShift), [input, effectiveShift]);

  const allShifts = useMemo(() => {
    if (!input) return [];
    return Array.from({ length: 25 }, (_, i) => ({
      shift: i + 1,
      text: caesarShift(input, i + 1),
    }));
  }, [input]);

  const copyOutput = useCallback(async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  const copyRow = useCallback(async (text: string, shift: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedRow(shift);
    setTimeout(() => setCopiedRow(null), 1500);
  }, []);

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("encrypt")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "encrypt"
              ? "bg-primary text-white"
              : "border border-border bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          Encrypt
        </button>
        <button
          onClick={() => setMode("decrypt")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "decrypt"
              ? "bg-primary text-white"
              : "border border-border bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          Decrypt
        </button>
      </div>

      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          {mode === "encrypt" ? "Plaintext" : "Ciphertext"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "encrypt"
              ? "Enter text to encrypt..."
              : "Enter ciphertext to decrypt..."
          }
          rows={4}
          className="w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Shift slider */}
      <div className="rounded-xl border border-border bg-muted p-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-foreground">Shift Amount</label>
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary">
            {shift}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={25}
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>1</span>
          <span>25</span>
        </div>
      </div>

      {/* Output */}
      {input ? (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              {mode === "encrypt" ? "Encrypted" : "Decrypted"} (Shift {shift})
            </h3>
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
            Enter text and adjust the shift to encrypt or decrypt.
          </p>
        </div>
      )}

      {/* Brute force table */}
      {input && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <h3 className="text-sm font-medium text-foreground">All 25 Possible Shifts</h3>
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 px-2 text-left text-xs font-medium text-muted-foreground w-16">
                    Shift
                  </th>
                  <th className="py-2 px-2 text-left text-xs font-medium text-muted-foreground">
                    Result
                  </th>
                  <th className="py-2 px-2 text-right text-xs font-medium text-muted-foreground w-16">
                    Copy
                  </th>
                </tr>
              </thead>
              <tbody>
                {allShifts.map((row) => (
                  <tr
                    key={row.shift}
                    className={`border-b border-border/50 ${
                      row.shift === shift ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="py-1.5 px-2 text-xs font-medium text-foreground">
                      {row.shift}
                      {row.shift === shift && (
                        <span className="ml-1 text-primary">*</span>
                      )}
                    </td>
                    <td className="py-1.5 px-2 font-mono text-xs text-foreground truncate max-w-[300px]">
                      {row.text}
                    </td>
                    <td className="py-1.5 px-2 text-right">
                      <button
                        onClick={() => copyRow(row.text, row.shift)}
                        className="rounded border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground"
                      >
                        {copiedRow === row.shift ? "OK" : "Copy"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
