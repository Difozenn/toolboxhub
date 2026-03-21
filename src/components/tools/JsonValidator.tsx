"use client";

import { useState } from "react";

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [message, setMessage] = useState("");

  const validate = () => {
    if (!input.trim()) { setStatus("idle"); setMessage(""); return; }
    try {
      JSON.parse(input);
      setStatus("valid");
      setMessage("Valid JSON");
    } catch (e: unknown) {
      setStatus("invalid");
      const msg = e instanceof Error ? e.message : String(e);
      const lineMatch = msg.match(/line (\d+)/i);
      const colMatch = msg.match(/column (\d+)/i);
      const posMatch = msg.match(/position (\d+)/i);
      let detail = msg;
      if (lineMatch || posMatch) {
        detail = `${msg}`;
      }
      setMessage(detail);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">JSON Input</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setStatus("idle"); setMessage(""); }}
          placeholder='{"key": "value", "num": 42}'
          spellCheck={false}
          className="h-64 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <button
        onClick={validate}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
      >
        Validate JSON
      </button>
      {status === "valid" && (
        <div className="flex items-center gap-2 rounded-xl border border-green-300 bg-green-50 p-4 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
          <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">{message}</span>
        </div>
      )}
      {status === "invalid" && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <p className="font-semibold text-red-700 dark:text-red-400">Invalid JSON</p>
          <p className="mt-1 font-mono text-sm text-red-600 dark:text-red-500">{message}</p>
        </div>
      )}
    </div>
  );
}
