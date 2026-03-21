"use client";
import { useState } from "react";

export default function RemoveHtmlComments() {
  const [input, setInput] = useState("");
  const [keepConditional, setKeepConditional] = useState(false);

  function strip(text: string): string {
    if (keepConditional) {
      return text.replace(/<!--(?!\[if)[\s\S]*?-->/g, "");
    }
    return text.replace(/<!--[\s\S]*?-->/g, "");
  }

  const output = strip(input);
  const commentCount = (input.match(/<!--[\s\S]*?-->/g) ?? []).length;

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={8}
        placeholder="Paste HTML code containing comments..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="flex items-center justify-between flex-wrap gap-3">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none">
          <input type="checkbox" checked={keepConditional} onChange={e=>setKeepConditional(e.target.checked)} className="accent-primary w-4 h-4" />
          Preserve IE conditional comments
        </label>
        {input && (
          <span className="text-sm text-muted-foreground">{commentCount} comment{commentCount!==1?"s":""} found</span>
        )}
      </div>
      <div className="relative">
        <textarea readOnly value={output} rows={8}
          placeholder="Clean HTML appears here..."
          className="w-full p-3 rounded-xl border border-border bg-muted text-foreground font-mono text-sm resize-none focus:outline-none" />
        <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
          className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
          Copy
        </button>
      </div>
    </div>
  );
}
