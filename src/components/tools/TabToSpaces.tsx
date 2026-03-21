"use client";
import { useState } from "react";

export default function TabToSpaces() {
  const [input, setInput] = useState("");
  const [tabWidth, setTabWidth] = useState(2);
  const output = input.replace(/\t/g, " ".repeat(tabWidth));
  const tabCount = (input.match(/\t/g) ?? []).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <label className="text-sm font-medium text-foreground">Tab width:</label>
        {[2, 4, 8].map(n => (
          <button key={n} onClick={() => setTabWidth(n)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tabWidth===n?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {n} spaces
          </button>
        ))}
      </div>
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={8}
        placeholder="Paste code or text with tab indentation..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      {input && <p className="text-sm text-muted-foreground">Found {tabCount} tab{tabCount!==1?"s":""} → replaced with {tabWidth} spaces each</p>}
      <div className="relative">
        <textarea readOnly value={output} rows={8}
          className="w-full p-3 rounded-xl border border-border bg-muted text-foreground font-mono text-sm resize-none focus:outline-none" />
        <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
          className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
          Copy
        </button>
      </div>
    </div>
  );
}
