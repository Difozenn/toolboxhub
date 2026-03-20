"use client";

import { useState, useMemo, useCallback } from "react";

function inferType(value: unknown, interfaceName: string, interfaces: Map<string, string>): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  const type = typeof value;
  if (type === "string") return "string";
  if (type === "number") return "number";
  if (type === "boolean") return "boolean";

  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    // Check if all items have same type
    const types = new Set(value.map((item) => {
      if (item === null) return "null";
      if (typeof item === "object" && !Array.isArray(item)) {
        // Generate an interface for array items
        const itemName = interfaceName + "Item";
        generateInterface(item as Record<string, unknown>, itemName, interfaces);
        return itemName;
      }
      return inferType(item, interfaceName, interfaces);
    }));

    if (types.size === 1) {
      return `${Array.from(types)[0]}[]`;
    }
    return `(${Array.from(types).join(" | ")})[]`;
  }

  if (type === "object") {
    generateInterface(value as Record<string, unknown>, interfaceName, interfaces);
    return interfaceName;
  }

  return "unknown";
}

function generateInterface(
  obj: Record<string, unknown>,
  name: string,
  interfaces: Map<string, string>
): void {
  const lines: string[] = [];
  lines.push(`interface ${name} {`);

  for (const [key, val] of Object.entries(obj)) {
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
    const childName = name + capitalize(key);
    const tsType = inferType(val, childName, interfaces);
    const optional = val === null ? "?" : "";
    lines.push(`  ${safeKey}${optional}: ${tsType};`);
  }

  lines.push("}");
  interfaces.set(name, lines.join("\n"));
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/[^a-zA-Z0-9]/g, "");
}

function jsonToTypeScript(json: string, rootName: string): { output: string; error: string } {
  try {
    const parsed = JSON.parse(json);
    const interfaces = new Map<string, string>();

    if (Array.isArray(parsed)) {
      if (parsed.length === 0) {
        return { output: `type ${rootName} = unknown[];`, error: "" };
      }
      const firstItem = parsed[0];
      if (typeof firstItem === "object" && firstItem !== null && !Array.isArray(firstItem)) {
        generateInterface(firstItem as Record<string, unknown>, rootName + "Item", interfaces);
        const allInterfaces = Array.from(interfaces.values()).reverse().join("\n\n");
        return {
          output: `${allInterfaces}\n\ntype ${rootName} = ${rootName}Item[];`,
          error: "",
        };
      }
      const itemType = inferType(firstItem, rootName, interfaces);
      return { output: `type ${rootName} = ${itemType}[];`, error: "" };
    }

    if (typeof parsed === "object" && parsed !== null) {
      generateInterface(parsed as Record<string, unknown>, rootName, interfaces);
      return { output: Array.from(interfaces.values()).reverse().join("\n\n"), error: "" };
    }

    return { output: `type ${rootName} = ${typeof parsed};`, error: "" };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}

export default function JsonToTypescript() {
  const [json, setJson] = useState(`{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "zip": "12345"
  },
  "tags": ["admin", "user"],
  "metadata": null,
  "scores": [95, 87, 92]
}`);
  const [rootName, setRootName] = useState("Root");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => jsonToTypeScript(json, rootName || "Root"), [json, rootName]);

  const copyOutput = useCallback(async () => {
    if (!result.output) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [result.output]);

  const formatJson = useCallback(() => {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed, null, 2));
    } catch {}
  }, [json]);

  return (
    <div className="space-y-4">
      {/* Root name input */}
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-foreground">Root Interface Name</label>
          <input
            type="text"
            value={rootName}
            onChange={(e) => setRootName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
            placeholder="Root"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          onClick={formatJson}
          className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
        >
          Format JSON
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* JSON input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">JSON Input</label>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder="Paste JSON here..."
            rows={18}
            spellCheck={false}
            className={`w-full rounded-xl border p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 resize-y ${
              result.error
                ? "border-red-400 bg-red-500/5 focus:border-red-400 focus:ring-red-400"
                : "border-border bg-muted focus:border-primary focus:ring-primary"
            }`}
          />
          {result.error && (
            <p className="text-sm text-red-500">{result.error}</p>
          )}
        </div>

        {/* TypeScript output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">TypeScript Output</label>
            <button
              onClick={copyOutput}
              disabled={!result.output}
              className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            value={result.output}
            readOnly
            rows={18}
            spellCheck={false}
            className="w-full rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
          />
        </div>
      </div>
    </div>
  );
}
