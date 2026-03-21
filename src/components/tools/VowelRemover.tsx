"use client";
import { useState } from "react";

export default function VowelRemover() {
  const [input, setInput] = useState("");
  const [includeY, setIncludeY] = useState(false);
  const vowels = includeY ? /[aeiouAEIOUyY]/g : /[aeiouAEIOU]/g;
  const output = input.replace(vowels, "");
  const removed = input.length - output.length;

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={5}
        placeholder="Paste text to remove vowels..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none">
        <input type="checkbox" checked={includeY} onChange={e=>setIncludeY(e.target.checked)} className="accent-primary w-4 h-4" />
        Also remove Y
      </label>
      {input && (
        <div className="flex gap-4 text-sm">
          <span className="px-3 py-1 rounded-lg bg-muted border border-border text-foreground">Original: {input.length} chars</span>
          <span className="px-3 py-1 rounded-lg bg-muted border border-border text-foreground">Result: {output.length} chars</span>
          <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium">Removed: {removed} vowels</span>
        </div>
      )}
      <div className="p-3 rounded-xl bg-muted border border-border min-h-[80px] text-foreground whitespace-pre-wrap break-all">
        {output || <span className="text-muted-foreground text-sm">Result appears here...</span>}
      </div>
      <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
        Copy Result
      </button>
    </div>
  );
}
