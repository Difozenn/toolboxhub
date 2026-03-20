"use client";

import { useState, useCallback } from "react";

export default function TextReverser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const reverseChars = useCallback(() => {
    setOutput([...input].reverse().join(""));
  }, [input]);

  const reverseWords = useCallback(() => {
    setOutput(
      input
        .split("\n")
        .map((line) => line.split(/\s+/).reverse().join(" "))
        .join("\n")
    );
  }, [input]);

  const reverseLines = useCallback(() => {
    setOutput(input.split("\n").reverse().join("\n"));
  }, [input]);

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your text here..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={reverseChars}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          Reverse Characters
        </button>
        <button
          onClick={reverseWords}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          Reverse Words
        </button>
        <button
          onClick={reverseLines}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          Reverse Lines
        </button>
      </div>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Result
            </label>
            <button
              onClick={copy}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-sans text-foreground focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
