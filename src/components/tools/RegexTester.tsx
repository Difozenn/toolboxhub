"use client";

import { useState, useMemo } from "react";

interface MatchResult {
  fullMatch: string;
  groups: (string | undefined)[];
  index: number;
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flagG, setFlagG] = useState(true);
  const [flagI, setFlagI] = useState(false);
  const [flagM, setFlagM] = useState(false);
  const [flagS, setFlagS] = useState(false);

  const flags = useMemo(() => {
    let f = "";
    if (flagG) f += "g";
    if (flagI) f += "i";
    if (flagM) f += "m";
    if (flagS) f += "s";
    return f;
  }, [flagG, flagI, flagM, flagS]);

  const { matches, error, highlightedHtml } = useMemo(() => {
    if (!pattern || !testString) {
      return { matches: [] as MatchResult[], error: null, highlightedHtml: "" };
    }

    try {
      const regex = new RegExp(pattern, flags);
      const foundMatches: MatchResult[] = [];

      if (flagG) {
        let match: RegExpExecArray | null;
        let safety = 0;
        while ((match = regex.exec(testString)) !== null && safety < 10000) {
          foundMatches.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
          });
          // Prevent infinite loop on zero-length matches
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
          safety++;
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          foundMatches.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
          });
        }
      }

      // Build highlighted HTML
      let html = "";
      let lastIndex = 0;
      for (const m of foundMatches) {
        // Escape HTML for the parts before and within match
        const before = escapeHtml(testString.slice(lastIndex, m.index));
        const matchText = escapeHtml(m.fullMatch);
        html += before;
        html += `<mark class="bg-primary/30 text-foreground rounded px-0.5">${matchText}</mark>`;
        lastIndex = m.index + m.fullMatch.length;
      }
      html += escapeHtml(testString.slice(lastIndex));

      return { matches: foundMatches, error: null, highlightedHtml: html };
    } catch (e) {
      return {
        matches: [] as MatchResult[],
        error: e instanceof Error ? e.message : "Invalid regex",
        highlightedHtml: "",
      };
    }
  }, [pattern, testString, flags, flagG]);

  const hasGroups = matches.some((m) => m.groups.length > 0);

  return (
    <div className="space-y-6">
      {/* Pattern input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Regular Expression
        </label>
        <div className="flex items-center gap-2">
          <span className="text-lg text-muted-foreground font-mono">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className="flex-1 rounded-xl border border-border bg-muted p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <span className="text-lg text-muted-foreground font-mono">
            /{flags}
          </span>
        </div>
      </div>

      {/* Flags */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-foreground">Flags:</span>
        {[
          { flag: "g", label: "Global", checked: flagG, setter: setFlagG },
          {
            flag: "i",
            label: "Case Insensitive",
            checked: flagI,
            setter: setFlagI,
          },
          {
            flag: "m",
            label: "Multiline",
            checked: flagM,
            setter: setFlagM,
          },
          { flag: "s", label: "Dot All", checked: flagS, setter: setFlagS },
        ].map(({ flag, label, checked, setter }) => (
          <label
            key={flag}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setter(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-sm text-foreground">
              <span className="font-mono font-bold">{flag}</span>{" "}
              <span className="text-muted-foreground">({label})</span>
            </span>
          </label>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Test string */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Test String
        </label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test against..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Highlighted result */}
      {highlightedHtml && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Matches Highlighted
            </label>
            <span className="text-sm text-muted-foreground">
              {matches.length} match{matches.length !== 1 ? "es" : ""} found
            </span>
          </div>
          <div
            className="rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground whitespace-pre-wrap break-all"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      )}

      {/* Match details */}
      {matches.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Match Details
          </label>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="px-4 py-2.5 text-left font-medium text-foreground">
                      #
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-foreground">
                      Match
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-foreground">
                      Index
                    </th>
                    {hasGroups && (
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">
                        Groups
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {matches.map((m, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-2 text-muted-foreground">
                        {i + 1}
                      </td>
                      <td className="px-4 py-2 font-mono text-foreground">
                        {m.fullMatch || (
                          <span className="text-muted-foreground italic">
                            empty string
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-muted-foreground">
                        {m.index}
                      </td>
                      {hasGroups && (
                        <td className="px-4 py-2 font-mono text-foreground">
                          {m.groups.length > 0
                            ? m.groups.map((g, gi) => (
                                <span key={gi} className="mr-2">
                                  <span className="text-muted-foreground">
                                    ${gi + 1}:
                                  </span>{" "}
                                  {g ?? (
                                    <span className="text-muted-foreground italic">
                                      undefined
                                    </span>
                                  )}
                                </span>
                              ))
                            : "-"}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
