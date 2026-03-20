"use client";

import { useState, useCallback } from "react";

/* ── Simple syntax highlighter ──────────────────────────────────── */
function highlightJson(json: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Match strings, numbers, booleans, null, and structural chars
  const regex =
    /("(?:[^"\\]|\\.)*")\s*(:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b)|(\bnull\b)|([{}[\],])/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(json)) !== null) {
    // Push any text between matches (whitespace / newlines)
    if (match.index > lastIndex) {
      nodes.push(json.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      // String — is it a key or a value?
      if (match[2]) {
        // It's a key (followed by colon)
        nodes.push(
          <span key={key++} className="text-blue-600 dark:text-blue-400">
            {match[1]}
          </span>
        );
        nodes.push(
          <span key={key++} className="text-foreground">
            {match[2]}
          </span>
        );
      } else {
        nodes.push(
          <span key={key++} className="text-green-600 dark:text-green-400">
            {match[1]}
          </span>
        );
      }
    } else if (match[3] !== undefined) {
      nodes.push(
        <span key={key++} className="text-orange-600 dark:text-orange-400">
          {match[3]}
        </span>
      );
    } else if (match[4] !== undefined) {
      nodes.push(
        <span key={key++} className="text-purple-600 dark:text-purple-400">
          {match[4]}
        </span>
      );
    } else if (match[5] !== undefined) {
      nodes.push(
        <span key={key++} className="text-red-500 dark:text-red-400">
          {match[5]}
        </span>
      );
    } else if (match[6] !== undefined) {
      nodes.push(
        <span key={key++} className="text-muted-foreground">
          {match[6]}
        </span>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < json.length) {
    nodes.push(json.slice(lastIndex));
  }

  return nodes;
}

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const format = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      setOutput("");
    }
  }, [input]);

  const minify = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      setOutput("");
    }
  }, [input]);

  const validate = useCallback(() => {
    try {
      JSON.parse(input);
      setError(null);
      setOutput("Valid JSON");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      setOutput("");
    }
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
          onClick={format}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Format
        </button>
        <button
          onClick={minify}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          Minify
        </button>
        <button
          onClick={validate}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          Validate
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
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Output */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Output
          </label>
          <pre className="h-80 overflow-auto rounded-xl border border-border bg-muted p-4 font-mono text-sm whitespace-pre-wrap">
            {output ? highlightJson(output) : (
              <span className="text-muted-foreground">
                Formatted output will appear here...
              </span>
            )}
          </pre>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
