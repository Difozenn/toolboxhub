"use client";

import { useState, useMemo, useCallback } from "react";

const NATO_ALPHABET: Record<string, string> = {
  A: "Alpha", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo",
  F: "Foxtrot", G: "Golf", H: "Hotel", I: "India", J: "Juliet",
  K: "Kilo", L: "Lima", M: "Mike", N: "November", O: "Oscar",
  P: "Papa", Q: "Quebec", R: "Romeo", S: "Sierra", T: "Tango",
  U: "Uniform", V: "Victor", W: "Whiskey", X: "X-ray", Y: "Yankee",
  Z: "Zulu",
  "0": "Zero", "1": "One", "2": "Two", "3": "Three", "4": "Four",
  "5": "Five", "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine",
};

const REVERSE_NATO: Record<string, string> = {};
for (const [key, value] of Object.entries(NATO_ALPHABET)) {
  REVERSE_NATO[value.toLowerCase()] = key;
}

function textToNato(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((ch) => {
      if (ch === " ") return "[space]";
      return NATO_ALPHABET[ch] || ch;
    })
    .join("  ");
}

function natoToText(nato: string): string {
  return nato
    .split(/\s{2,}|\n/)
    .map((word) => {
      const trimmed = word.trim().toLowerCase();
      if (trimmed === "[space]" || trimmed === "space") return " ";
      return REVERSE_NATO[trimmed] || word;
    })
    .join("");
}

export default function TextToNato() {
  const [mode, setMode] = useState<"toNato" | "fromNato">("toNato");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    return mode === "toNato" ? textToNato(input) : natoToText(input);
  }, [input, mode]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [output]);

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-border overflow-hidden">
        <button
          onClick={() => { setMode("toNato"); setInput(""); }}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            mode === "toNato" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          Text to NATO
        </button>
        <button
          onClick={() => { setMode("fromNato"); setInput(""); }}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            mode === "fromNato" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          NATO to Text
        </button>
      </div>

      {/* Input */}
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          {mode === "toNato" ? "Enter Text" : "Enter NATO Words (separated by double spaces)"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "toNato"
              ? "Hello World"
              : "Hotel  Echo  Lima  Lima  Oscar  [space]  Whiskey  Oscar  Romeo  Lima  Delta"
          }
          rows={4}
          className="w-full rounded-xl border border-border bg-muted p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
        />
      </div>

      {/* Output */}
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              {mode === "toNato" ? "NATO Phonetic" : "Decoded Text"}
            </label>
            <button
              onClick={copyOutput}
              className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary/90 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-foreground break-all">
            {mode === "toNato" ? (
              <div className="flex flex-wrap gap-1.5">
                {output.split("  ").map((word, idx) => (
                  <span
                    key={idx}
                    className={`inline-block rounded px-2 py-1 text-sm font-medium ${
                      word === "[space]"
                        ? "bg-muted-foreground/10 text-muted-foreground mx-1"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-lg font-mono">{output}</p>
            )}
          </div>
        </div>
      )}

      {/* Reference chart */}
      <div className="rounded-xl border border-border bg-muted p-5">
        <h3 className="text-sm font-medium text-foreground mb-3">NATO Phonetic Alphabet Reference</h3>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-6">
          {Object.entries(NATO_ALPHABET)
            .filter(([key]) => /[A-Z]/.test(key))
            .map(([letter, word]) => (
              <div
                key={letter}
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5"
              >
                <span className="text-sm font-bold text-primary w-4">{letter}</span>
                <span className="text-xs text-muted-foreground">{word}</span>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5 mt-3">
          {Object.entries(NATO_ALPHABET)
            .filter(([key]) => /[0-9]/.test(key))
            .map(([digit, word]) => (
              <div
                key={digit}
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5"
              >
                <span className="text-sm font-bold text-primary w-4">{digit}</span>
                <span className="text-xs text-muted-foreground">{word}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
