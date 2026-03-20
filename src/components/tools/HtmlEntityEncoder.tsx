"use client";

import { useState, useMemo, useCallback } from "react";

const NAMED_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "\u00A0": "&nbsp;",
  "\u00A9": "&copy;",
  "\u00AE": "&reg;",
  "\u2122": "&trade;",
  "\u2013": "&ndash;",
  "\u2014": "&mdash;",
  "\u2018": "&lsquo;",
  "\u2019": "&rsquo;",
  "\u201C": "&ldquo;",
  "\u201D": "&rdquo;",
  "\u2026": "&hellip;",
};

const REVERSE_ENTITIES: Record<string, string> = {};
for (const [char, entity] of Object.entries(NAMED_ENTITIES)) {
  REVERSE_ENTITIES[entity] = char;
}

function encodeHtmlEntities(text: string): string {
  let result = "";
  for (const char of text) {
    if (NAMED_ENTITIES[char]) {
      result += NAMED_ENTITIES[char];
    } else {
      const code = char.codePointAt(0)!;
      if (code > 127) {
        result += `&#${code};`;
      } else {
        result += char;
      }
    }
  }
  return result;
}

function decodeHtmlEntities(text: string): string {
  // First replace named entities
  let result = text;
  for (const [entity, char] of Object.entries(REVERSE_ENTITIES)) {
    result = result.split(entity).join(char);
  }

  // Then replace numeric entities (decimal)
  result = result.replace(/&#(\d+);/g, (_, code) =>
    String.fromCodePoint(parseInt(code, 10))
  );

  // Then replace hex entities
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
    String.fromCodePoint(parseInt(hex, 16))
  );

  return result;
}

export default function HtmlEntityEncoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    try {
      return mode === "encode"
        ? encodeHtmlEntities(input)
        : decodeHtmlEntities(input);
    } catch {
      return "Error processing input";
    }
  }, [input, mode]);

  const copyToClipboard = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-border overflow-hidden w-fit">
        <button
          onClick={() => setMode("encode")}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            mode === "encode"
              ? "bg-primary text-white"
              : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            mode === "decode"
              ? "bg-primary text-white"
              : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          Decode
        </button>
      </div>

      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          {mode === "encode" ? "Plain Text" : "HTML Entities"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "encode"
              ? 'Enter text with special characters (e.g., <div class="test">Hello & welcome</div>)'
              : "Enter HTML entities (e.g., &lt;div&gt;Hello &amp; welcome&lt;/div&gt;)"
          }
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Output */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            {mode === "encode" ? "HTML Entities" : "Plain Text"}
          </label>
          <button
            onClick={copyToClipboard}
            disabled={!output}
            className="rounded-lg border border-border bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          placeholder="Result will appear here..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Quick reference */}
      <div className="rounded-xl border border-border bg-muted p-4">
        <p className="text-sm font-medium text-foreground mb-3">
          Common HTML Entities
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {[
            { char: "&", entity: "&amp;" },
            { char: "<", entity: "&lt;" },
            { char: ">", entity: "&gt;" },
            { char: '"', entity: "&quot;" },
            { char: "'", entity: "&#39;" },
            { char: "\u00A9", entity: "&copy;" },
            { char: "\u00AE", entity: "&reg;" },
            { char: "\u2122", entity: "&trade;" },
          ].map(({ char, entity }) => (
            <div
              key={entity}
              className="flex items-center gap-2 rounded-lg bg-background px-3 py-1.5 text-xs font-mono"
            >
              <span className="text-foreground">{char}</span>
              <span className="text-muted-foreground">=</span>
              <span className="text-primary">{entity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
