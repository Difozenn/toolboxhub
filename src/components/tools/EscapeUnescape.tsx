"use client";
import { useState } from "react";
const modes: Record<string, [(s: string) => string, (s: string) => string]> = {
  "URL": [encodeURIComponent, decodeURIComponent],
  "HTML": [s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"), s => s.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'")],
  "JSON": [s => JSON.stringify(s).slice(1,-1), s => { try { return JSON.parse('"' + s + '"'); } catch { return s; } }],
  "Base64": [s => btoa(unescape(encodeURIComponent(s))), s => { try { return decodeURIComponent(escape(atob(s))); } catch { return "Invalid Base64"; } }],
  "RegEx": [s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), s => s.replace(/\\([.*+?^${}()|[\]\\])/g, "$1")],
};
export default function EscapeUnescape() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("URL");
  const [output, setOutput] = useState("");
  const escape = () => { try { setOutput(modes[mode][0](input)); } catch { setOutput("Error: invalid input"); } };
  const unescape = () => { try { setOutput(modes[mode][1](input)); } catch { setOutput("Error: invalid input"); } };
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Mode</label>
        <div className="flex flex-wrap gap-2">{Object.keys(modes).map(m => <button key={m} onClick={() => { setMode(m); setOutput(""); }} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"}`}>{m}</button>)}</div>
      </div>
      <div><label className="mb-1.5 block text-sm font-medium text-foreground">Input</label><textarea value={input} onChange={e => setInput(e.target.value)} rows={5} placeholder="Enter text to escape or unescape..." className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      <div className="flex gap-3">
        <button onClick={escape} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Escape</button>
        <button onClick={unescape} className="rounded-lg bg-muted px-5 py-2 text-sm font-medium text-foreground hover:bg-muted/80 border border-border">Unescape</button>
        <button onClick={() => { setInput(""); setOutput(""); }} className="rounded-lg bg-muted px-5 py-2 text-sm font-medium text-foreground hover:bg-muted/80 border border-border">Clear</button>
      </div>
      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between"><label className="text-sm font-medium text-foreground">Output</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-muted-foreground hover:text-foreground">Copy</button></div>
          <textarea readOnly value={output} rows={5} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground" />
        </div>
      )}
    </div>
  );
}
