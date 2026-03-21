"use client";
import { useState } from "react";
function parseToml(toml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  let current = result;
  toml.split("\n").forEach(line => {
    line = line.trim();
    if (!line || line.startsWith("#")) return;
    if (line.startsWith("[") && line.endsWith("]")) {
      const key = line.slice(1, -1);
      result[key] = {};
      current = result[key] as Record<string, unknown>;
      return;
    }
    const eq = line.indexOf("=");
    if (eq === -1) return;
    const k = line.slice(0, eq).trim();
    let v: unknown = line.slice(eq + 1).trim();
    if (typeof v === "string" && v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    else if (v === "true") v = true;
    else if (v === "false") v = false;
    else if (!isNaN(Number(v)) && v !== "") v = Number(v);
    current[k] = v;
  });
  return result;
}
export default function TomlToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const convert = () => {
    try { setOutput(JSON.stringify(parseToml(input), null, 2)); setError(""); }
    catch (e) { setError("Failed to parse TOML"); setOutput(""); }
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">TOML Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={12} placeholder={'[database]\nhost = "localhost"\nport = 5432\nenabled = true'} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">JSON Output</label>
          <textarea readOnly value={output} rows={12} placeholder="JSON output will appear here..." className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground" />
        </div>
      </div>
      {error && <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      <div className="flex gap-3">
        <button onClick={convert} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Convert to JSON</button>
        {output && <button onClick={() => navigator.clipboard.writeText(output)} className="rounded-lg bg-muted px-5 py-2 text-sm font-medium text-foreground hover:bg-muted/80 border border-border">Copy JSON</button>}
      </div>
    </div>
  );
}
