"use client";

import { useState } from "react";

export default function MarkdownTableGenerator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [cells, setCells] = useState<string[][]>(Array.from({ length: 3 }, () => Array(3).fill("")));
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const resize = (newRows: number, newCols: number) => {
    const newCells = Array.from({ length: newRows }, (_, r) =>
      Array.from({ length: newCols }, (_, c) => (cells[r]?.[c] ?? ""))
    );
    setRows(newRows);
    setCols(newCols);
    setCells(newCells);
  };

  const updateCell = (r: number, c: number, val: string) => {
    const next = cells.map((row, ri) => row.map((cell, ci) => ri === r && ci === c ? val : cell));
    setCells(next);
  };

  const generate = () => {
    const header = "| " + cells[0].map((c) => c || "Header").join(" | ") + " |";
    const divider = "| " + cells[0].map(() => "---").join(" | ") + " |";
    const dataRows = cells.slice(1).map((row) => "| " + row.map((c) => c || " ").join(" | ") + " |");
    setOutput([header, divider, ...dataRows].join("\n"));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Rows:</span>
          <input type="number" min={2} max={10} value={rows} onChange={(e) => resize(Number(e.target.value), cols)}
            className="w-16 rounded-lg border border-border bg-muted px-2 py-1 text-sm text-foreground focus:border-primary focus:outline-none" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Columns:</span>
          <input type="number" min={2} max={6} value={cols} onChange={(e) => resize(rows, Number(e.target.value))}
            className="w-16 rounded-lg border border-border bg-muted px-2 py-1 text-sm text-foreground focus:border-primary focus:outline-none" />
        </label>
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Generate</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : "Copy"}</button>}
      </div>
      <div className="overflow-auto rounded-xl border border-border bg-muted p-4">
        <table className="w-full border-collapse">
          <tbody>
            {cells.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className="border border-border p-1">
                    <input
                      value={cell}
                      onChange={(e) => updateCell(r, c, e.target.value)}
                      placeholder={r === 0 ? `Header ${c + 1}` : `Row ${r} Col ${c + 1}`}
                      className="w-full rounded bg-background px-2 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {output && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Markdown Output</label>
          <pre className="rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
