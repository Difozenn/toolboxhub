"use client";

import { useState, useCallback } from "react";

/* ── Basic YAML parser ─────────────────────────────────────────── */

function parseYaml(yaml: string): unknown {
  const lines = yaml.split("\n");
  return parseYamlLines(lines, 0, 0).value;
}

function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function parseValue(raw: string): unknown {
  const trimmed = raw.trim();
  if (trimmed === "" || trimmed === "~" || trimmed === "null") return null;
  if (trimmed === "true" || trimmed === "True" || trimmed === "TRUE")
    return true;
  if (trimmed === "false" || trimmed === "False" || trimmed === "FALSE")
    return false;
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
  // Remove surrounding quotes
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseYamlLines(
  lines: string[],
  startIdx: number,
  baseIndent: number
): { value: unknown; nextIdx: number } {
  if (startIdx >= lines.length) {
    return { value: null, nextIdx: startIdx };
  }

  // Skip empty lines and comments
  let idx = startIdx;
  while (idx < lines.length) {
    const trimmed = lines[idx].trim();
    if (trimmed === "" || trimmed.startsWith("#")) {
      idx++;
    } else {
      break;
    }
  }

  if (idx >= lines.length) {
    return { value: null, nextIdx: idx };
  }

  const firstLine = lines[idx];
  const firstTrimmed = firstLine.trim();

  // Array item
  if (firstTrimmed.startsWith("- ")) {
    const arr: unknown[] = [];
    while (idx < lines.length) {
      const line = lines[idx];
      const trimmed = line.trim();
      const indent = getIndent(line);

      if (trimmed === "" || trimmed.startsWith("#")) {
        idx++;
        continue;
      }

      if (indent < baseIndent) break;
      if (indent === baseIndent && !trimmed.startsWith("- ")) break;

      if (indent === baseIndent && trimmed.startsWith("- ")) {
        const afterDash = trimmed.slice(2);

        // Check if it's a key-value in list item
        const kvMatch = afterDash.match(/^([^:]+):\s*(.*)$/);
        if (kvMatch && kvMatch[2].trim() === "") {
          // Nested object in array
          const obj: Record<string, unknown> = {};
          // This key has children
          const childIndent = baseIndent + 2;
          idx++;
          // Check for children at higher indent
          const { value: childVal, nextIdx: ni } = parseYamlLines(
            lines,
            idx,
            childIndent
          );
          obj[kvMatch[1].trim()] = childVal;
          idx = ni;

          // Continue collecting sibling keys at same indent
          while (idx < lines.length) {
            const nextLine = lines[idx];
            const nextTrimmed = nextLine.trim();
            const nextIndent = getIndent(nextLine);
            if (nextTrimmed === "" || nextTrimmed.startsWith("#")) {
              idx++;
              continue;
            }
            if (nextIndent < childIndent) break;
            if (nextIndent === childIndent) {
              const sibKv = nextTrimmed.match(/^([^:]+):\s*(.*)$/);
              if (sibKv) {
                if (sibKv[2].trim()) {
                  obj[sibKv[1].trim()] = parseValue(sibKv[2]);
                  idx++;
                } else {
                  idx++;
                  const { value: sibVal, nextIdx: sni } = parseYamlLines(
                    lines,
                    idx,
                    childIndent + 2
                  );
                  obj[sibKv[1].trim()] = sibVal;
                  idx = sni;
                }
              } else {
                break;
              }
            } else {
              break;
            }
          }

          arr.push(obj);
        } else if (kvMatch && kvMatch[2].trim() !== "") {
          // Single key:value in list item — could have more siblings
          const obj: Record<string, unknown> = {};
          obj[kvMatch[1].trim()] = parseValue(kvMatch[2]);
          idx++;

          // Check for sibling keys at dash+2 indent
          const childIndent = baseIndent + 2;
          while (idx < lines.length) {
            const nextLine = lines[idx];
            const nextTrimmed = nextLine.trim();
            const nextIndent = getIndent(nextLine);
            if (nextTrimmed === "" || nextTrimmed.startsWith("#")) {
              idx++;
              continue;
            }
            if (nextIndent < childIndent) break;
            if (nextIndent === childIndent) {
              const sibKv = nextTrimmed.match(/^([^:]+):\s*(.*)$/);
              if (sibKv) {
                obj[sibKv[1].trim()] = parseValue(sibKv[2]);
                idx++;
              } else {
                break;
              }
            } else {
              break;
            }
          }

          if (Object.keys(obj).length === 1 && kvMatch[1].trim() in obj) {
            // If there was no sibling, it might just be a simple value
            // Check if we only have one key
          }
          arr.push(
            Object.keys(obj).length === 1
              ? parseValue(afterDash)
              : obj
          );
          // Actually if afterDash doesn't contain ':', it's a simple value
          if (!afterDash.includes(":")) {
            arr[arr.length - 1] = parseValue(afterDash);
          }
        } else {
          arr.push(parseValue(afterDash));
          idx++;
        }
      } else {
        break;
      }
    }
    return { value: arr, nextIdx: idx };
  }

  // Object (key: value pairs)
  const kvMatch = firstTrimmed.match(/^([^:]+):\s*(.*)$/);
  if (kvMatch) {
    const obj: Record<string, unknown> = {};
    while (idx < lines.length) {
      const line = lines[idx];
      const trimmed = line.trim();
      const indent = getIndent(line);

      if (trimmed === "" || trimmed.startsWith("#")) {
        idx++;
        continue;
      }

      if (indent < baseIndent) break;
      if (indent > baseIndent) break;

      const kv = trimmed.match(/^([^:]+):\s*(.*)$/);
      if (!kv) break;

      const key = kv[1].trim();
      const val = kv[2].trim();

      if (val === "") {
        // Children at next indent level
        idx++;
        const childIndent = baseIndent + 2;
        const { value: childVal, nextIdx: ni } = parseYamlLines(
          lines,
          idx,
          childIndent
        );
        obj[key] = childVal;
        idx = ni;
      } else {
        obj[key] = parseValue(val);
        idx++;
      }
    }
    return { value: obj, nextIdx: idx };
  }

  // Plain value
  return { value: parseValue(firstTrimmed), nextIdx: idx + 1 };
}

/* ── Basic JSON to YAML ────────────────────────────────────────── */

function jsonToYaml(value: unknown, indent: number = 0): string {
  const prefix = "  ".repeat(indent);

  if (value === null || value === undefined) return `${prefix}null`;
  if (typeof value === "boolean") return `${prefix}${value}`;
  if (typeof value === "number") return `${prefix}${value}`;
  if (typeof value === "string") {
    if (
      value.includes(":") ||
      value.includes("#") ||
      value.includes("\n") ||
      value.startsWith(" ") ||
      value.endsWith(" ")
    ) {
      return `${prefix}"${value}"`;
    }
    return `${prefix}${value}`;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return `${prefix}[]`;
    return value
      .map((item) => {
        if (typeof item === "object" && item !== null && !Array.isArray(item)) {
          const entries = Object.entries(item as Record<string, unknown>);
          if (entries.length === 0) return `${prefix}- {}`;
          const first = `${prefix}- ${entries[0][0]}: ${formatInlineValue(entries[0][1])}`;
          const rest = entries
            .slice(1)
            .map(
              ([k, v]) =>
                `${prefix}  ${k}: ${formatInlineValue(v)}`
            );
          return [first, ...rest].join("\n");
        }
        return `${prefix}- ${formatInlineValue(item)}`;
      })
      .join("\n");
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return `${prefix}{}`;
    return entries
      .map(([key, val]) => {
        if (
          typeof val === "object" &&
          val !== null
        ) {
          const nested = jsonToYaml(val, indent + 1);
          return `${prefix}${key}:\n${nested}`;
        }
        return `${prefix}${key}: ${formatInlineValue(val)}`;
      })
      .join("\n");
  }

  return `${prefix}${String(value)}`;
}

function formatInlineValue(value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number") return String(value);
  if (typeof value === "string") {
    if (
      value.includes(":") ||
      value.includes("#") ||
      value.includes("\n")
    ) {
      return `"${value}"`;
    }
    return value;
  }
  return JSON.stringify(value);
}

export default function YamlToJson() {
  const [yamlInput, setYamlInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedYaml, setCopiedYaml] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const convertToJson = useCallback(() => {
    if (!yamlInput.trim()) return;
    try {
      const parsed = parseYaml(yamlInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse YAML");
    }
  }, [yamlInput]);

  const convertToYaml = useCallback(() => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      setYamlInput(jsonToYaml(parsed));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse JSON");
    }
  }, [jsonInput]);

  const copyYaml = useCallback(async () => {
    if (!yamlInput) return;
    await navigator.clipboard.writeText(yamlInput);
    setCopiedYaml(true);
    setTimeout(() => setCopiedYaml(false), 1500);
  }, [yamlInput]);

  const copyJson = useCallback(async () => {
    if (!jsonInput) return;
    await navigator.clipboard.writeText(jsonInput);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 1500);
  }, [jsonInput]);

  return (
    <div className="space-y-4">
      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={convertToJson}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          YAML to JSON
        </button>
        <button
          onClick={convertToYaml}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          JSON to YAML
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Panels */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* YAML */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              YAML
            </label>
            {yamlInput && (
              <button
                onClick={copyYaml}
                className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
              >
                {copiedYaml ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
            placeholder={"name: John\nage: 30\nlanguages:\n  - JavaScript\n  - Python"}
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* JSON */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              JSON
            </label>
            {jsonInput && (
              <button
                onClick={copyJson}
                className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
              >
                {copiedJson ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={'{\n  "name": "John",\n  "age": 30\n}'}
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}
