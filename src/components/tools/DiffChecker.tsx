"use client";

import { useState } from "react";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
}

export default function DiffChecker() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [diff, setDiff] = useState<DiffLine[]>([]);
  const [compared, setCompared] = useState(false);

  const compare = () => {
    const leftLines = left.split("\n");
    const rightLines = right.split("\n");
    const result: DiffLine[] = [];
    const maxLen = Math.max(leftLines.length, rightLines.length);
    for (let i = 0; i < maxLen; i++) {
      const l = leftLines[i];
      const r = rightLines[i];
      if (l === undefined) {
        result.push({ type: "added", text: r });
      } else if (r === undefined) {
        result.push({ type: "removed", text: l });
      } else if (l === r) {
        result.push({ type: "unchanged", text: l });
      } else {
        result.push({ type: "removed", text: l });
        result.push({ type: "added", text: r });
      }
    }
    setDiff(result);
    setCompared(true);
  };

  const bgClass = { added: "bg-green-50 dark:bg-green-950", removed: "bg-red-50 dark:bg-red-950", unchanged: "" };
  const textClass = { added: "text-green-700 dark:text-green-400", removed: "text-red-700 dark:text-red-400", unchanged: "text-foreground" };
  const prefix = { added: "+ ", removed: "- ", unchanged: "  " };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Original Text</label>
          <textarea
            value={left}
            onChange={(e) => { setLeft(e.target.value); setCompared(false); }}
            placeholder="Paste original text here..."
            spellCheck={false}
            className="h-48 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Modified Text</label>
          <textarea
            value={right}
            onChange={(e) => { setRight(e.target.value); setCompared(false); }}
            placeholder="Paste modified text here..."
            spellCheck={false}
            className="h-48 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <button
        onClick={compare}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
      >
        Compare
      </button>
      {compared && (
        <div className="rounded-xl border border-border bg-muted overflow-auto">
          {diff.map((line, i) => (
            <div key={i} className={`flex gap-2 px-4 py-0.5 font-mono text-sm ${bgClass[line.type]}`}>
              <span className={`select-none font-bold ${textClass[line.type]}`}>{prefix[line.type]}</span>
              <span className={textClass[line.type]}>{line.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
