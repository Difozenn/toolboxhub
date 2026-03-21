"use client";
import { useState } from "react";
type DiffResult = { key: string; type: "added" | "removed" | "changed" | "same"; left?: unknown; right?: unknown }[];
function diffObjects(a: unknown, b: unknown, prefix = ""): DiffResult {
  const results: DiffResult = [];
  const allKeys = new Set([...Object.keys(a as object || {}), ...Object.keys(b as object || {})]);
  allKeys.forEach(key => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const aVal = (a as Record<string, unknown>)?.[key];
    const bVal = (b as Record<string, unknown>)?.[key];
    if (aVal === undefined) results.push({ key: fullKey, type: "added", right: bVal });
    else if (bVal === undefined) results.push({ key: fullKey, type: "removed", left: aVal });
    else if (JSON.stringify(aVal) !== JSON.stringify(bVal)) results.push({ key: fullKey, type: "changed", left: aVal, right: bVal });
    else results.push({ key: fullKey, type: "same", left: aVal });
  });
  return results;
}
export default function JsonDiff() {
  const [left, setLeft] = useState('{\n  "name": "Alice",\n  "age": 30,\n  "city": "New York"\n}');
  const [right, setRight] = useState('{\n  "name": "Alice",\n  "age": 31,\n  "email": "alice@example.com"\n}');
  const [diff, setDiff] = useState<DiffResult | null>(null);
  const [error, setError] = useState("");
  const compare = () => {
    try { setDiff(diffObjects(JSON.parse(left), JSON.parse(right))); setError(""); }
    catch { setError("Invalid JSON in one or both fields"); setDiff(null); }
  };
  const colors = { added: "bg-green-500/10 text-green-700 dark:text-green-400", removed: "bg-red-500/10 text-red-700 dark:text-red-400", changed: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400", same: "bg-muted text-muted-foreground" };
  const icons = { added: "+", removed: "-", changed: "~", same: "=" };
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">JSON A (Original)</label><textarea value={left} onChange={e => setLeft(e.target.value)} rows={8} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">JSON B (Modified)</label><textarea value={right} onChange={e => setRight(e.target.value)} rows={8} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      <button onClick={compare} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Compare JSON</button>
      {error && <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      {diff && (
        <div className="space-y-1 rounded-lg border border-border overflow-hidden">
          {diff.filter(d => d.type !== "same").map(d => (
            <div key={d.key} className={`px-4 py-2 ${colors[d.type]}`}>
              <span className="mr-2 font-bold">{icons[d.type]}</span>
              <span className="font-mono text-sm font-medium">{d.key}</span>
              {d.type === "changed" && <span className="ml-2 text-xs">{JSON.stringify(d.left)} → {JSON.stringify(d.right)}</span>}
              {(d.type === "added") && <span className="ml-2 text-xs">{JSON.stringify(d.right)}</span>}
              {(d.type === "removed") && <span className="ml-2 text-xs">{JSON.stringify(d.left)}</span>}
            </div>
          ))}
          {diff.every(d => d.type === "same") && <p className="px-4 py-3 text-sm text-muted-foreground">No differences found — JSON objects are identical.</p>}
        </div>
      )}
    </div>
  );
}
