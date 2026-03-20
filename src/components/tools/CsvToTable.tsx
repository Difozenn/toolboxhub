"use client";

import { useState, useMemo, useCallback } from "react";

function parseCSV(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        row.push(current);
        current = "";
      } else if (ch === "\n" || (ch === "\r" && next === "\n")) {
        row.push(current);
        current = "";
        if (row.some((cell) => cell.trim() !== "")) rows.push(row);
        row = [];
        if (ch === "\r") i++;
      } else {
        current += ch;
      }
    }
  }
  // Last row
  row.push(current);
  if (row.some((cell) => cell.trim() !== "")) rows.push(row);

  return rows;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function CsvToTable() {
  const [csv, setCsv] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [firstRowHeader, setFirstRowHeader] = useState(true);
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => {
    if (!csv.trim()) return [];
    return parseCSV(csv, delimiter);
  }, [csv, delimiter]);

  const headers = firstRowHeader && parsed.length > 0 ? parsed[0] : null;
  const dataRows = firstRowHeader && parsed.length > 1 ? parsed.slice(1) : parsed;

  const tableHtml = useMemo(() => {
    if (parsed.length === 0) return "";
    let html = "<table>\n";
    if (headers) {
      html += "  <thead>\n    <tr>\n";
      for (const cell of headers) {
        html += `      <th>${escapeHtml(cell.trim())}</th>\n`;
      }
      html += "    </tr>\n  </thead>\n";
    }
    html += "  <tbody>\n";
    for (const row of dataRows) {
      html += "    <tr>\n";
      for (const cell of row) {
        html += `      <td>${escapeHtml(cell.trim())}</td>\n`;
      }
      html += "    </tr>\n";
    }
    html += "  </tbody>\n</table>";
    return html;
  }, [parsed, headers, dataRows]);

  const copyHtml = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(tableHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [tableHtml]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">CSV Input</label>
        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder={"Name,Age,City\nAlice,30,New York\nBob,25,London\nCharlie,35,Tokyo"}
          rows={8}
          className="w-full rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
        />
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-foreground">Delimiter:</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={firstRowHeader}
            onChange={(e) => setFirstRowHeader(e.target.checked)}
            className="rounded border-border"
          />
          <span className="text-sm text-foreground">First row as header</span>
        </label>
        {tableHtml && (
          <button
            onClick={copyHtml}
            className="ml-auto rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            {copied ? "Copied!" : "Copy Table HTML"}
          </button>
        )}
      </div>

      {/* Table preview */}
      {parsed.length > 0 && (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-sm">
              {headers && (
                <thead className="sticky top-0 bg-muted">
                  <tr className="border-b border-border">
                    {headers.map((cell, i) => (
                      <th
                        key={i}
                        className="px-4 py-2.5 text-left text-foreground font-semibold whitespace-nowrap"
                      >
                        {cell.trim() || <span className="text-muted-foreground">-</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {dataRows.map((row, ridx) => (
                  <tr key={ridx} className="border-b border-border/50 hover:bg-primary/5">
                    {row.map((cell, cidx) => (
                      <td key={cidx} className="px-4 py-2 text-foreground whitespace-nowrap">
                        {cell.trim() || <span className="text-muted-foreground">-</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border bg-muted px-4 py-2">
            <p className="text-xs text-muted-foreground">
              {dataRows.length} row{dataRows.length !== 1 ? "s" : ""}
              {headers ? `, ${headers.length} column${headers.length !== 1 ? "s" : ""}` : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
