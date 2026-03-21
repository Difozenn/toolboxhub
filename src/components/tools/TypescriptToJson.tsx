"use client";

import { useState } from "react";

function parseTsInterfaces(ts: string): object {
  const schema: Record<string, object> = {};
  const interfaceRegex = /interface\s+(\w+)\s*\{([^}]*)\}/g;
  let match;
  while ((match = interfaceRegex.exec(ts)) !== null) {
    const name = match[1];
    const body = match[2];
    const props: Record<string, object> = {};
    const propRegex = /(\w+)\??:\s*([^;,\n]+)/g;
    let pm;
    while ((pm = propRegex.exec(body)) !== null) {
      const propName = pm[1];
      const propType = pm[2].trim();
      let jsonType: object;
      if (propType === "string") jsonType = { type: "string" };
      else if (propType === "number") jsonType = { type: "number" };
      else if (propType === "boolean") jsonType = { type: "boolean" };
      else if (propType.endsWith("[]")) jsonType = { type: "array", items: { type: propType.replace("[]", "").toLowerCase() } };
      else jsonType = { type: "object", $ref: propType };
      props[propName] = jsonType;
    }
    schema[name] = { type: "object", properties: props };
  }
  return schema;
}

export default function TypescriptToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      const schema = parseTsInterfaces(input);
      if (Object.keys(schema).length === 0) throw new Error("No interfaces found");
      setOutput(JSON.stringify(schema, null, 2));
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={convert} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Convert</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : "Copy JSON Schema"}</button>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">TypeScript Interfaces</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"interface User {\n  id: number;\n  name: string;\n  email: string;\n  active: boolean;\n}"}
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">JSON Schema Output</label>
          <textarea
            readOnly
            value={output}
            placeholder="JSON Schema will appear here..."
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
    </div>
  );
}
