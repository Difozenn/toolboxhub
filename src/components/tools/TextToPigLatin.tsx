"use client";
import { useState } from "react";

function toPigLatin(word: string): string {
  if (!word.match(/[a-zA-Z]/)) return word;
  const lower = word.toLowerCase();
  const isCapital = /^[A-Z]/.test(word);
  const vowels = "aeiou";
  let result: string;
  if (vowels.includes(lower[0])) {
    result = lower + "yay";
  } else {
    let i = 0;
    while (i < lower.length && !vowels.includes(lower[i])) i++;
    result = lower.slice(i) + lower.slice(0, i) + "ay";
  }
  return isCapital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
}

function convertText(text: string): string {
  return text.replace(/[a-zA-Z]+/g, toPigLatin);
}

export default function TextToPigLatin() {
  const [input, setInput] = useState("");
  const output = convertText(input);

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4}
        placeholder="Enter English text to convert to Pig Latin..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="p-3 rounded-xl bg-muted border border-border min-h-[80px] text-foreground whitespace-pre-wrap">
        {output || <span className="text-muted-foreground text-sm">Pig Latin output appears here...</span>}
      </div>
      <div className="flex gap-2">
        <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
          Copy Result
        </button>
        <button onClick={() => setInput("")}
          className="px-4 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
          Clear
        </button>
      </div>
    </div>
  );
}
