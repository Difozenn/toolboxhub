"use client";

import { useState, useCallback } from "react";

/* ── Classic lorem-ipsum word bank ──────────────────────────────── */
const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing",
  "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore",
  "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam",
  "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi",
  "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure",
  "in", "reprehenderit", "voluptate", "velit", "esse", "cillum",
  "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat",
  "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "viverra",
  "maecenas", "accumsan", "lacus", "vel", "facilisis", "volutpat",
  "pellentesque", "habitant", "morbi", "tristique", "senectus", "netus",
  "fames", "ac", "turpis", "egestas", "integer", "feugiat", "scelerisque",
  "varius", "nunc", "mattis", "enim", "blandit", "cursus", "risus",
  "ultrices", "gravida", "dictum",
];

function generateParagraph(wordCount: number): string {
  const out: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    out.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  // Capitalize first word & end with period
  out[0] = out[0].charAt(0).toUpperCase() + out[0].slice(1);

  // Sprinkle in some sentence breaks
  const sentenceLen = () => 8 + Math.floor(Math.random() * 10);
  let next = sentenceLen();
  for (let i = next; i < out.length - 1; i += sentenceLen()) {
    out[i] = out[i] + ".";
    if (i + 1 < out.length) {
      out[i + 1] = out[i + 1].charAt(0).toUpperCase() + out[i + 1].slice(1);
    }
  }

  return out.join(" ") + ".";
}

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const result: string[] = [];
    for (let i = 0; i < paragraphs; i++) {
      result.push(generateParagraph(wordsPerParagraph));
    }
    setOutput(result.join("\n\n"));
  }, [paragraphs, wordsPerParagraph]);

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Paragraphs
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={paragraphs}
            onChange={(e) =>
              setParagraphs(Math.min(20, Math.max(1, Number(e.target.value))))
            }
            className="w-24 rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Words per paragraph
          </label>
          <input
            type="number"
            min={10}
            max={200}
            value={wordsPerParagraph}
            onChange={(e) =>
              setWordsPerParagraph(
                Math.min(200, Math.max(10, Number(e.target.value)))
              )
            }
            className="w-24 rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          onClick={generate}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Generate
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Generated Text
            </p>
            <button
              onClick={copy}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 whitespace-pre-wrap text-foreground leading-relaxed">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
