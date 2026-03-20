"use client";

import { useState, useMemo } from "react";

export default function StringLength() {
  const [input, setInput] = useState("");

  const stats = useMemo(() => {
    const charCount = [...input].length;
    const utf8Bytes = new TextEncoder().encode(input).length;
    // UTF-16: each code unit is 2 bytes. JavaScript strings are UTF-16 internally.
    const utf16Bytes = input.length * 2;
    const wordCount =
      input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
    const lineCount = input === "" ? 0 : input.split("\n").length;

    return [
      { label: "Character Count", value: charCount },
      { label: "Byte Count (UTF-8)", value: utf8Bytes },
      { label: "Byte Count (UTF-16)", value: utf16Bytes },
      { label: "Word Count", value: wordCount },
      { label: "Line Count", value: lineCount },
    ];
  }, [input]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">
          Enter Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-muted p-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
