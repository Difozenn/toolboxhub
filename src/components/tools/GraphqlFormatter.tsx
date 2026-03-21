"use client";
import { useState } from "react";
function formatGraphQL(query: string): string {
  let depth = 0;
  const tab = "  ";
  return query
    .replace(/\s+/g, " ")
    .replace(/\{/g, " {\n")
    .replace(/\}/g, "\n}")
    .replace(/,/g, "\n")
    .split("\n")
    .map(line => {
      line = line.trim();
      if (!line) return "";
      if (line.startsWith("}")) depth = Math.max(0, depth - 1);
      const indented = tab.repeat(depth) + line;
      if (line.endsWith("{")) depth++;
      return indented;
    })
    .filter(l => l !== "")
    .join("\n");
}
export default function GraphqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const format = () => setOutput(formatGraphQL(input));
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">GraphQL Query</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={12} placeholder={"query { user(id: 1) { name email posts { title } } }"} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Formatted Output</label>
          <textarea readOnly value={output} rows={12} placeholder="Formatted query will appear here..." className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground" />
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={format} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Format</button>
        {output && <button onClick={() => navigator.clipboard.writeText(output)} className="rounded-lg bg-muted px-5 py-2 text-sm font-medium text-foreground hover:bg-muted/80 border border-border">Copy</button>}
        <button onClick={() => { setInput(""); setOutput(""); }} className="rounded-lg bg-muted px-5 py-2 text-sm font-medium text-foreground hover:bg-muted/80 border border-border">Clear</button>
      </div>
    </div>
  );
}
