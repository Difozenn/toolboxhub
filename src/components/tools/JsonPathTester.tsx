"use client";
import { useState } from "react";
function jsonPath(obj: unknown, path: string): unknown {
  if (!path.startsWith("$")) return "Path must start with $";
  const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".").slice(1);
  let cur: unknown = obj;
  for (const part of parts) {
    if (cur === null || cur === undefined) return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return cur;
}
export default function JsonPathTester() {
  const [json, setJson] = useState('');
  const [path, setPath] = useState("$.store.name");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const test = () => {
    try {
      const parsed = JSON.parse(json);
      const res = jsonPath(parsed, path);
      setResult(JSON.stringify(res, null, 2));
      setError("");
    } catch (e) { setError("Invalid JSON or path"); setResult(""); }
  };
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">JSON Data</label>
        <textarea value={json} onChange={e => setJson(e.target.value)} rows={8} placeholder={'{\n  "store": {\n    "name": "My Store",\n    "items": [1, 2, 3]\n  }\n}'} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-foreground">JSONPath Expression</label>
          <input value={path} onChange={e => setPath(e.target.value)} placeholder="$.store.name" className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex items-end">
          <button onClick={test} className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Test</button>
        </div>
      </div>
      {error && <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      {result && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Result</label>
          <pre className="rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">{result}</pre>
        </div>
      )}
    </div>
  );
}
