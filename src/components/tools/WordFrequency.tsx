"use client";

import { useState, useMemo, useCallback } from "react";

const COMMON_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "dare", "ought",
  "used", "to", "of", "in", "for", "on", "with", "at", "by", "from",
  "as", "into", "through", "during", "before", "after", "above", "below",
  "between", "out", "off", "over", "under", "again", "further", "then",
  "once", "and", "but", "or", "nor", "not", "so", "yet", "both", "either",
  "neither", "each", "every", "all", "any", "few", "more", "most", "other",
  "some", "such", "no", "only", "own", "same", "than", "too", "very",
  "just", "because", "if", "when", "where", "how", "what", "which", "who",
  "whom", "this", "that", "these", "those", "i", "me", "my", "myself",
  "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself",
  "he", "him", "his", "himself", "she", "her", "hers", "herself", "it",
  "its", "itself", "they", "them", "their", "theirs", "themselves",
]);

type SortField = "count" | "word";

export default function WordFrequency() {
  const [input, setInput] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("count");
  const [sortAsc, setSortAsc] = useState(false);
  const [topN, setTopN] = useState(50);
  const [ignoreCommon, setIgnoreCommon] = useState(false);
  const [copied, setCopied] = useState(false);

  const data = useMemo(() => {
    if (!input.trim()) return [];

    const words = input.toLowerCase().match(/[a-z'\u00C0-\u024F]+/gi) || [];
    const freq = new Map<string, number>();

    for (const w of words) {
      const word = w.toLowerCase();
      if (ignoreCommon && COMMON_WORDS.has(word)) continue;
      freq.set(word, (freq.get(word) || 0) + 1);
    }

    const totalWords = Array.from(freq.values()).reduce((a, b) => a + b, 0);

    let entries = Array.from(freq.entries()).map(([word, count]) => ({
      word,
      count,
      percentage: totalWords > 0 ? ((count / totalWords) * 100).toFixed(2) : "0.00",
    }));

    entries.sort((a, b) => {
      if (sortBy === "count") {
        return sortAsc ? a.count - b.count : b.count - a.count;
      }
      return sortAsc
        ? a.word.localeCompare(b.word)
        : b.word.localeCompare(a.word);
    });

    return entries.slice(0, topN);
  }, [input, sortBy, sortAsc, topN, ignoreCommon]);

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortBy === field) {
        setSortAsc(!sortAsc);
      } else {
        setSortBy(field);
        setSortAsc(field === "word");
      }
    },
    [sortBy, sortAsc]
  );

  const copy = useCallback(async () => {
    if (data.length === 0) return;
    const text = data
      .map((d) => `${d.word}\t${d.count}\t${d.percentage}%`)
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [data]);

  const sortIndicator = (field: SortField) => {
    if (sortBy !== field) return "";
    return sortAsc ? " \u25B2" : " \u25BC";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text to analyze word frequency..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={ignoreCommon}
            onChange={(e) => setIgnoreCommon(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          Ignore common words
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          Show top
          <input
            type="number"
            value={topN}
            onChange={(e) =>
              setTopN(Math.max(1, parseInt(e.target.value) || 1))
            }
            min={1}
            className="w-20 rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          words
        </label>
      </div>

      {data.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Results ({data.length} words)
            </p>
            <button
              onClick={copy}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copied ? "Copied!" : "Copy Table"}
            </button>
          </div>

          <div className="max-h-96 overflow-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    #
                  </th>
                  <th
                    onClick={() => handleSort("word")}
                    className="cursor-pointer px-4 py-3 text-left font-medium text-muted-foreground hover:text-foreground"
                  >
                    Word{sortIndicator("word")}
                  </th>
                  <th
                    onClick={() => handleSort("count")}
                    className="cursor-pointer px-4 py-3 text-right font-medium text-muted-foreground hover:text-foreground"
                  >
                    Count{sortIndicator("count")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    %
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr
                    key={d.word}
                    className="border-t border-border transition-colors hover:bg-muted/50"
                  >
                    <td className="px-4 py-2 text-muted-foreground">
                      {i + 1}
                    </td>
                    <td className="px-4 py-2 font-medium text-foreground">
                      {d.word}
                    </td>
                    <td className="px-4 py-2 text-right text-foreground">
                      {d.count}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {d.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
