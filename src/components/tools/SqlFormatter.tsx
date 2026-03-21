"use client";
import { useState } from "react";

const KEYWORDS = ["SELECT","FROM","WHERE","AND","OR","ORDER BY","GROUP BY","HAVING","LIMIT","OFFSET","INSERT INTO","VALUES","UPDATE","SET","DELETE FROM","CREATE TABLE","ALTER TABLE","DROP TABLE","JOIN","INNER JOIN","LEFT JOIN","RIGHT JOIN","FULL JOIN","OUTER JOIN","ON","AS","IN","NOT","IS","NULL","BETWEEN","LIKE","EXISTS","UNION","ALL","DISTINCT","CASE","WHEN","THEN","ELSE","END","COUNT","SUM","AVG","MIN","MAX","DESC","ASC"];

function formatSql(sql: string): string {
  let s = sql.replace(/\s+/g, " ").trim();
  // Uppercase keywords
  for (const kw of KEYWORDS) {
    const regex = new RegExp(`\b${kw.replace(/ /g, "\s+")}\b`, "gi");
    s = s.replace(regex, kw);
  }
  // Add newlines before major clauses
  const clauses = ["SELECT","FROM","WHERE","ORDER BY","GROUP BY","HAVING","LIMIT","OFFSET","SET","VALUES","JOIN","INNER JOIN","LEFT JOIN","RIGHT JOIN","FULL JOIN","ON","AND","OR","UNION"];
  for (const c of clauses) {
    const regex = new RegExp(`\s+${c.replace(/ /g, "\s+")}\b`, "gi");
    s = s.replace(regex, `\n${c}`);
  }
  // Indent sub-clauses
  const lines = s.split("\n");
  const indentAfter = ["SELECT","SET"];
  const indentLines = ["AND","OR","ON"];
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const firstWord = trimmed.split(/\s/)[0];
    if (indentLines.includes(firstWord)) {
      result.push("  " + trimmed);
    } else {
      result.push(trimmed);
    }
  }
  return result.join("\n");
}

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1200); };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">SQL Input</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={6} placeholder="Paste your SQL query here..."
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <button onClick={() => setOutput(formatSql(input))} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Format SQL</button>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-foreground">Formatted SQL</label>
            <button onClick={copy} className="text-xs text-primary hover:underline">{copied ? "Copied!" : "Copy"}</button>
          </div>
          <pre className="w-full rounded-lg border border-border bg-muted px-3 py-3 text-sm text-foreground font-mono whitespace-pre-wrap overflow-x-auto">{output}</pre>
        </div>
      )}
    </div>
  );
}
