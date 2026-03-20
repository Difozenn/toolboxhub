"use client";

import { useState, useMemo, useCallback } from "react";

interface PhraseData {
  phrase: string;
  count: number;
  density: number;
}

function extractNgrams(
  words: string[],
  n: number,
  minLength: number
): PhraseData[] {
  const map = new Map<string, number>();
  const totalPhrases = Math.max(1, words.length - n + 1);

  for (let i = 0; i <= words.length - n; i++) {
    const chunk = words.slice(i, i + n);
    if (chunk.some((w) => w.length < minLength)) continue;
    const phrase = chunk.join(" ");
    map.set(phrase, (map.get(phrase) || 0) + 1);
  }

  return Array.from(map.entries())
    .map(([phrase, count]) => ({
      phrase,
      count,
      density: (count / totalPhrases) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 30);
}

export default function KeywordDensity() {
  const [text, setText] = useState("");
  const [minLength, setMinLength] = useState(3);
  const [ngramTab, setNgramTab] = useState<1 | 2 | 3>(1);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const words = useMemo(() => {
    if (!text.trim()) return [];
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s'-]/g, "")
      .split(/\s+/)
      .filter(Boolean);
  }, [text]);

  const totalWords = words.length;
  const uniqueWords = useMemo(() => new Set(words).size, [words]);

  const ngrams1 = useMemo(
    () => extractNgrams(words, 1, minLength),
    [words, minLength]
  );
  const ngrams2 = useMemo(
    () => extractNgrams(words, 2, minLength),
    [words, minLength]
  );
  const ngrams3 = useMemo(
    () => extractNgrams(words, 3, minLength),
    [words, minLength]
  );

  const activeNgrams =
    ngramTab === 1 ? ngrams1 : ngramTab === 2 ? ngrams2 : ngrams3;

  // Highlight keyword in original text
  const highlightedHtml = useMemo(() => {
    if (!highlighted || !text) return null;
    const escaped = highlighted.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = text.split(regex);
    return parts;
  }, [highlighted, text]);

  const copyTable = useCallback(async () => {
    const header = "Phrase\tCount\tDensity %";
    const rows = activeNgrams.map(
      (n) => `${n.phrase}\t${n.count}\t${n.density.toFixed(2)}%`
    );
    await navigator.clipboard.writeText([header, ...rows].join("\n"));
  }, [activeNgrams]);

  return (
    <div className="space-y-6">
      {/* Text input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your content here to analyze keyword density..."
        className="h-48 w-full resize-y rounded-xl border border-border bg-muted p-4 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{totalWords}</p>
          <p className="mt-1 text-sm text-muted-foreground">Total Words</p>
        </div>
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{uniqueWords}</p>
          <p className="mt-1 text-sm text-muted-foreground">Unique Words</p>
        </div>
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{text.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Characters</p>
        </div>
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-2xl font-bold text-foreground">
            {text.trim()
              ? text.split(/[.!?]+/).filter((s) => s.trim()).length
              : 0}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Sentences</p>
        </div>
      </div>

      {totalWords > 0 && (
        <>
          {/* Controls */}
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Min Word Length
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={minLength}
                onChange={(e) =>
                  setMinLength(Math.max(1, Number(e.target.value)))
                }
                className="w-20 rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex gap-1">
              {([1, 2, 3] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => setNgramTab(n)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    ngramTab === n
                      ? "bg-primary text-white"
                      : "border border-border bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n}-word
                </button>
              ))}
            </div>
            <button
              onClick={copyTable}
              className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              Copy Table
            </button>
          </div>

          {/* Keywords table */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    Phrase
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-foreground w-20">
                    Count
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-foreground w-28">
                    Density
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-foreground w-48">
                    Bar
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeNgrams.map((item, i) => (
                  <tr
                    key={i}
                    onClick={() =>
                      setHighlighted(
                        highlighted === item.phrase ? null : item.phrase
                      )
                    }
                    className={`cursor-pointer border-b border-border last:border-b-0 transition-colors ${
                      highlighted === item.phrase
                        ? "bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {item.phrase}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {item.count}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                      {item.density.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{
                            width: `${Math.min(100, (item.density / Math.max(activeNgrams[0]?.density || 1, 1)) * 100)}%`,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                {activeNgrams.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-sm text-muted-foreground"
                    >
                      No phrases found with minimum word length of {minLength}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Highlighted text */}
          {highlighted && highlightedHtml && (
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Highlighting: &quot;{highlighted}&quot;
              </h3>
              <div className="max-h-48 overflow-auto rounded-xl border border-border bg-muted p-4 text-sm leading-relaxed text-foreground">
                {highlightedHtml.map((part, i) =>
                  part.toLowerCase() === highlighted.toLowerCase() ? (
                    <mark
                      key={i}
                      className="rounded bg-primary/20 px-0.5 text-foreground"
                    >
                      {part}
                    </mark>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
