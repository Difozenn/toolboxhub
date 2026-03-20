"use client";

import { useState, useMemo } from "react";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
  lineNumber: { old?: number; new?: number };
}

function computeDiff(original: string, modified: string): DiffLine[] {
  const oldLines = original.split("\n");
  const newLines = modified.split("\n");

  // Simple LCS-based diff
  const m = oldLines.length;
  const n = newLines.length;

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find diff
  const result: DiffLine[] = [];
  let i = m;
  let j = n;

  const stack: DiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      stack.push({
        type: "unchanged",
        text: oldLines[i - 1],
        lineNumber: { old: i, new: j },
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({
        type: "added",
        text: newLines[j - 1],
        lineNumber: { new: j },
      });
      j--;
    } else {
      stack.push({
        type: "removed",
        text: oldLines[i - 1],
        lineNumber: { old: i },
      });
      i--;
    }
  }

  stack.reverse();
  result.push(...stack);

  return result;
}

export default function TextDiff() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");

  const diff = useMemo(() => {
    if (!original && !modified) return [];
    return computeDiff(original, modified);
  }, [original, modified]);

  const stats = useMemo(() => {
    const added = diff.filter((d) => d.type === "added").length;
    const removed = diff.filter((d) => d.type === "removed").length;
    const unchanged = diff.filter((d) => d.type === "unchanged").length;
    return { added, removed, unchanged };
  }, [diff]);

  return (
    <div className="space-y-6">
      {/* Input areas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Original Text
          </label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste the original text here..."
            className="h-56 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Modified Text
          </label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste the modified text here..."
            className="h-56 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Stats */}
      {diff.length > 0 && (
        <div className="flex flex-wrap gap-4">
          <div className="rounded-lg border border-border bg-muted px-4 py-2 text-sm">
            <span className="font-medium text-green-600">+{stats.added}</span>{" "}
            <span className="text-muted-foreground">added</span>
          </div>
          <div className="rounded-lg border border-border bg-muted px-4 py-2 text-sm">
            <span className="font-medium text-red-600">-{stats.removed}</span>{" "}
            <span className="text-muted-foreground">removed</span>
          </div>
          <div className="rounded-lg border border-border bg-muted px-4 py-2 text-sm">
            <span className="font-medium text-foreground">
              {stats.unchanged}
            </span>{" "}
            <span className="text-muted-foreground">unchanged</span>
          </div>
        </div>
      )}

      {/* Diff output */}
      {diff.length > 0 && (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="bg-muted px-4 py-2 text-sm font-medium text-foreground border-b border-border">
            Diff Result
          </div>
          <div className="max-h-[500px] overflow-auto">
            {diff.map((line, idx) => (
              <div
                key={idx}
                className={`flex font-mono text-sm ${
                  line.type === "added"
                    ? "bg-green-500/15 text-green-700 dark:text-green-400"
                    : line.type === "removed"
                      ? "bg-red-500/15 text-red-700 dark:text-red-400"
                      : "text-foreground"
                }`}
              >
                <span className="w-12 shrink-0 select-none border-r border-border px-2 py-0.5 text-right text-xs text-muted-foreground">
                  {line.lineNumber.old ?? ""}
                </span>
                <span className="w-12 shrink-0 select-none border-r border-border px-2 py-0.5 text-right text-xs text-muted-foreground">
                  {line.lineNumber.new ?? ""}
                </span>
                <span className="w-6 shrink-0 select-none px-1 py-0.5 text-center font-bold">
                  {line.type === "added"
                    ? "+"
                    : line.type === "removed"
                      ? "-"
                      : " "}
                </span>
                <span className="flex-1 whitespace-pre-wrap break-all px-2 py-0.5">
                  {line.text || "\u00A0"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!original && !modified && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Enter text in both fields above to see the differences.
          </p>
        </div>
      )}
    </div>
  );
}
