"use client";
import { useState } from "react";

export default function SpacesToTabs() {
  const [input, setInput] = useState("");
  const [spacesPerTab, setSpacesPerTab] = useState(2);

  function convert(text: string): string {
    const regex = new RegExp(`^( {${spacesPerTab}})+`, "gm");
    return text.replace(regex, (match) => "\t".repeat(match.length / spacesPerTab));
  }

  const output = convert(input);
  const tabsAdded = (output.match(/\t/g) ?? []).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <label className="text-sm font-medium text-foreground">Spaces per tab:</label>
        {[2, 4, 8].map(n => (
          <button key={n} onClick={() => setSpacesPerTab(n)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${spacesPerTab===n?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {n} spaces
          </button>
        ))}
      </div>
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={8}
        placeholder="Paste code or text with space indentation..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      {input && <p className="text-sm text-muted-foreground">Converted {tabsAdded} indent level{tabsAdded!==1?"s":""} to tabs</p>}
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
