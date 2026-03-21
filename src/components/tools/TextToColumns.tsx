"use client";

import { useState } from "react";

const DELIMITERS: Record<string, string> = {
  comma: ",",
  tab: "\t",
  pipe: "|",
  space: " ",
};

export default function TextToColumns() {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState("comma");
  const [customDelim, setCustomDelim] = useState("");
  const [rows, setRows] = useState<string[][]>([]);

  const split = () => {
    const delim = delimiter === "custom" ? customDelim : DELIMITERS[delimiter];
    const lines = input.split("\n").filter((l) => l.trim() !== "");
    setRows(lines.map((l) => l.split(delim)));
  };

  const maxCols = rows.reduce((m, r) => Math.max(m, r.length), 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Delimiter</label>
          <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}
            className="rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
            <option value="comma">Comma (,)</option>
            <option value="tab">Tab</option>
            <option value="pipe">Pipe (|)</option>
            <option value="space">Space</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        {delimiter === "custom" && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Custom</label>
            <input type="text" value={customDelim} onChange={(e) => setCustomDelim(e.target.value)}
              placeholder=";" maxLength={10}
              className="w-24 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
        )}
        <button onClick={split} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Split to Table</button>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Input Text (one row per line)</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={"Alice,30,London\nBob,25,Paris\nCarol,35,New York"}
          className="h-32 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      {rows.length > 0 && (
        <div className="overflow-auto rounded-xl border border-border bg-muted">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {Array.from({ length: maxCols }, (_, i) => (
                  <th key={i} className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Col {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-b border-border last:border-0 hover:bg-background">
                  {Array.from({ length: maxCols }, (_, c) => (
                    <td key={c} className="px-4 py-2 font-mono text-foreground">{row[c] ?? ""}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
