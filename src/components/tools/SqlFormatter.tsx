"use client";

import { useState, useCallback } from "react";

const SQL_KEYWORDS = [
  "SELECT",
  "DISTINCT",
  "FROM",
  "WHERE",
  "AND",
  "OR",
  "NOT",
  "IN",
  "EXISTS",
  "BETWEEN",
  "LIKE",
  "IS",
  "NULL",
  "JOIN",
  "INNER JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "FULL JOIN",
  "FULL OUTER JOIN",
  "LEFT OUTER JOIN",
  "RIGHT OUTER JOIN",
  "CROSS JOIN",
  "ON",
  "USING",
  "GROUP BY",
  "HAVING",
  "ORDER BY",
  "ASC",
  "DESC",
  "LIMIT",
  "OFFSET",
  "UNION",
  "UNION ALL",
  "INSERT INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE",
  "CREATE TABLE",
  "ALTER TABLE",
  "DROP TABLE",
  "CREATE INDEX",
  "DROP INDEX",
  "AS",
  "CASE",
  "WHEN",
  "THEN",
  "ELSE",
  "END",
  "COUNT",
  "SUM",
  "AVG",
  "MIN",
  "MAX",
  "CAST",
  "COALESCE",
  "IF",
  "IFNULL",
  "NULLIF",
  "WITH",
];

const NEWLINE_BEFORE = new Set([
  "SELECT",
  "FROM",
  "WHERE",
  "AND",
  "OR",
  "JOIN",
  "INNER JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "FULL JOIN",
  "FULL OUTER JOIN",
  "LEFT OUTER JOIN",
  "RIGHT OUTER JOIN",
  "CROSS JOIN",
  "ON",
  "GROUP BY",
  "HAVING",
  "ORDER BY",
  "LIMIT",
  "OFFSET",
  "UNION",
  "UNION ALL",
  "INSERT INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE",
  "CREATE TABLE",
  "ALTER TABLE",
  "DROP TABLE",
  "WITH",
]);

const INDENT_AFTER = new Set([
  "SELECT",
  "FROM",
  "WHERE",
  "SET",
  "VALUES",
]);

function formatSql(sql: string): string {
  // Normalize whitespace
  let formatted = sql.replace(/\s+/g, " ").trim();

  // Uppercase keywords (sorted longest first to match multi-word keywords first)
  const sortedKeywords = [...SQL_KEYWORDS].sort(
    (a, b) => b.length - a.length
  );

  for (const kw of sortedKeywords) {
    const regex = new RegExp(`\\b${kw.replace(/ /g, "\\s+")}\\b`, "gi");
    formatted = formatted.replace(regex, kw);
  }

  // Add newlines before major clauses
  for (const kw of NEWLINE_BEFORE) {
    const regex = new RegExp(`\\s+${kw.replace(/ /g, "\\s+")}\\b`, "gi");
    formatted = formatted.replace(regex, `\n${kw}`);
  }

  // Indent lines after certain keywords
  const lines = formatted.split("\n");
  const result: string[] = [];
  let indentNext = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check if this line starts with a keyword that should be at root level
    const startsWithNewlineKeyword = [...NEWLINE_BEFORE].some((kw) =>
      trimmed.toUpperCase().startsWith(kw)
    );

    if (startsWithNewlineKeyword) {
      result.push(trimmed);
      indentNext = [...INDENT_AFTER].some((kw) =>
        trimmed.toUpperCase().startsWith(kw)
      );
    } else if (indentNext) {
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

  const handleFormat = useCallback(() => {
    if (!input.trim()) return;
    setOutput(formatSql(input));
  }, [input]);

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-4">
      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleFormat}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Format SQL
        </button>
        {output && (
          <button
            onClick={copy}
            className="ml-auto rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied ? "Copied!" : "Copy Output"}
          </button>
        )}
      </div>

      {/* Panels */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Input SQL
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="select id, name from users where active = 1 order by name asc"
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Output */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Formatted Output
          </label>
          <textarea
            readOnly
            value={output}
            placeholder="Formatted SQL will appear here..."
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
