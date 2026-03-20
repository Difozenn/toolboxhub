"use client";

import { useState, useMemo, useCallback } from "react";

export default function WhitespaceRemover() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [trimLeadingTrailing, setTrimLeadingTrailing] = useState(true);
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(false);
  const [removeBlankLines, setRemoveBlankLines] = useState(false);
  const [removeAllWhitespace, setRemoveAllWhitespace] = useState(false);
  const [removeTabs, setRemoveTabs] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";

    let result = input;

    if (removeAllWhitespace) {
      return result.replace(/\s/g, "");
    }

    if (removeTabs) {
      result = result.replace(/\t/g, "");
    }

    if (trimLeadingTrailing) {
      result = result
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
    }

    if (removeExtraSpaces) {
      result = result
        .split("\n")
        .map((line) => line.replace(/ {2,}/g, " "))
        .join("\n");
    }

    if (removeBlankLines) {
      result = result
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n");
    }

    return result;
  }, [input, trimLeadingTrailing, removeExtraSpaces, removeBlankLines, removeAllWhitespace, removeTabs]);

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  const options = [
    {
      label: "Trim leading/trailing whitespace",
      checked: trimLeadingTrailing,
      onChange: setTrimLeadingTrailing,
      disabled: removeAllWhitespace,
    },
    {
      label: "Remove extra spaces",
      checked: removeExtraSpaces,
      onChange: setRemoveExtraSpaces,
      disabled: removeAllWhitespace,
    },
    {
      label: "Remove blank lines",
      checked: removeBlankLines,
      onChange: setRemoveBlankLines,
      disabled: removeAllWhitespace,
    },
    {
      label: "Remove tabs",
      checked: removeTabs,
      onChange: setRemoveTabs,
      disabled: removeAllWhitespace,
    },
    {
      label: "Remove ALL whitespace",
      checked: removeAllWhitespace,
      onChange: setRemoveAllWhitespace,
      disabled: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text with extra whitespace..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {options.map((opt) => (
          <label
            key={opt.label}
            className={`flex items-center gap-2 text-sm ${
              opt.disabled
                ? "text-muted-foreground opacity-50"
                : "text-foreground"
            }`}
          >
            <input
              type="checkbox"
              checked={opt.checked}
              onChange={(e) => opt.onChange(e.target.checked)}
              disabled={opt.disabled}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            {opt.label}
          </label>
        ))}
      </div>

      {input && (
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
            className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
