"use client";

import { useState, useCallback } from "react";

function csvToJson(
  csv: string,
  delimiter: string,
  firstRowHeader: boolean
): string {
  const lines = csv
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return "[]";

  const parseRow = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  if (firstRowHeader && lines.length > 1) {
    const headers = parseRow(lines[0]);
    const data = lines.slice(1).map((line) => {
      const values = parseRow(line);
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] || "";
      });
      return obj;
    });
    return JSON.stringify(data, null, 2);
  }

  const data = lines.map((line) => parseRow(line));
  return JSON.stringify(data, null, 2);
}

function jsonToCsv(json: string, delimiter: string): string {
  try {
    const data = JSON.parse(json);
    if (!Array.isArray(data) || data.length === 0) return "";

    // Array of objects
    if (typeof data[0] === "object" && !Array.isArray(data[0])) {
      const headers = Object.keys(data[0]);
      const escapeField = (field: string): string => {
        const str = String(field);
        if (str.includes(delimiter) || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };
      const rows = [
        headers.map(escapeField).join(delimiter),
        ...data.map((row: Record<string, unknown>) =>
          headers.map((h) => escapeField(String(row[h] ?? ""))).join(delimiter)
        ),
      ];
      return rows.join("\n");
    }

    // Array of arrays
    if (Array.isArray(data[0])) {
      return data
        .map((row: unknown[]) =>
          row
            .map((cell) => {
              const str = String(cell);
              if (
                str.includes(delimiter) ||
                str.includes('"') ||
                str.includes("\n")
              ) {
                return `"${str.replace(/"/g, '""')}"`;
              }
              return str;
            })
            .join(delimiter)
        )
        .join("\n");
    }

    return "";
  } catch {
    return "";
  }
}

const DELIMITERS = [
  { label: "Comma (,)", value: "," },
  { label: "Tab", value: "\t" },
  { label: "Semicolon (;)", value: ";" },
  { label: "Pipe (|)", value: "|" },
];

export default function CsvToJson() {
  const [csvInput, setCsvInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [firstRowHeader, setFirstRowHeader] = useState(true);
  const [copiedCsv, setCopiedCsv] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertToJson = useCallback(() => {
    if (!csvInput.trim()) return;
    try {
      const result = csvToJson(csvInput, delimiter, firstRowHeader);
      setJsonInput(result);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse CSV");
    }
  }, [csvInput, delimiter, firstRowHeader]);

  const convertToCsv = useCallback(() => {
    if (!jsonInput.trim()) return;
    try {
      const result = jsonToCsv(jsonInput, delimiter);
      if (!result) {
        setError(
          "JSON must be an array of objects or array of arrays"
        );
        return;
      }
      setCsvInput(result);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse JSON");
    }
  }, [jsonInput, delimiter]);

  const copyCsv = useCallback(async () => {
    if (!csvInput) return;
    await navigator.clipboard.writeText(csvInput);
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 1500);
  }, [csvInput]);

  const copyJson = useCallback(async () => {
    if (!jsonInput) return;
    await navigator.clipboard.writeText(jsonInput);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 1500);
  }, [jsonInput]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Delimiter:
          </label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {DELIMITERS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={firstRowHeader}
            onChange={(e) => setFirstRowHeader(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-sm text-foreground">
            First row as header
          </span>
        </label>
      </div>

      {/* Conversion buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={convertToJson}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          CSV to JSON
        </button>
        <button
          onClick={convertToCsv}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          JSON to CSV
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
        {/* CSV */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              CSV
            </label>
            {csvInput && (
              <button
                onClick={copyCsv}
                className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
              >
                {copiedCsv ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder={"name,age,city\nAlice,30,NYC\nBob,25,LA"}
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
            placeholder={'[\n  { "name": "Alice", "age": "30" }\n]'}
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}
