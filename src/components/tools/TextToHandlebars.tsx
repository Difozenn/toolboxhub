"use client";
import { useState } from "react";
function textToHandlebars(text: string): string {
  let hbs = text;
  const words = [...new Set(text.match(/\b[A-Z][a-z]+\b/g) || [])];
  words.forEach(word => { hbs = hbs.replace(new RegExp(`\\b${word}\\b`, "g"), `{{${word.toLowerCase()}}}`); });
  return hbs;
}
export default function TextToHandlebars() {
  const [input, setInput] = useState("Hello John, your order for Widget has been shipped to 123 Main St.");
  const [vars, setVars] = useState<string[]>([]);
  const [output, setOutput] = useState("");
  const convert = () => {
    let hbs = input;
    const detected: string[] = [];
    const matches = [...new Set(input.match(/\b[A-Z][a-z]+\b/g) || [])];
    matches.forEach(w => { const key = w.toLowerCase(); hbs = hbs.replace(new RegExp(`\\b${w}\\b`, "g"), `{{${key}}}`); detected.push(key); });
    setOutput(hbs);
    setVars(detected);
  };
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Input Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={5} placeholder="Enter text with capitalized words to convert to template variables..." className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <button onClick={convert} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Convert to Handlebars</button>
      {output && (
        <>
          <div>
            <div className="mb-1.5 flex items-center justify-between"><label className="text-sm font-medium text-foreground">Handlebars Template</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-muted-foreground hover:text-foreground">Copy</button></div>
            <textarea readOnly value={output} rows={5} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground" />
          </div>
          {vars.length > 0 && (
            <div className="rounded-lg border border-border bg-muted p-4">
              <p className="mb-2 text-sm font-medium text-foreground">Detected Variables</p>
              <div className="flex flex-wrap gap-2">{vars.map(v => <code key={v} className="rounded bg-background px-2 py-1 text-xs text-foreground">{`{{${v}}}`}</code>)}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
