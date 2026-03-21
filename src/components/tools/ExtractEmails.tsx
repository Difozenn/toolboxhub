"use client";

import { useState } from "react";

export default function ExtractEmails() {
  const [input, setInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const extract = () => {
    const found = input.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g) || [];
    setEmails([...new Set(found)]);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(emails.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text containing email addresses here..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="flex gap-2">
        <button onClick={extract} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Extract Emails</button>
        {emails.length > 0 && (
          <button onClick={copyAll} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : `Copy All (${emails.length})`}</button>
        )}
      </div>
      {emails.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Found <span className="font-semibold text-primary">{emails.length}</span> unique email{emails.length !== 1 ? "s" : ""}:</p>
          <div className="rounded-xl border border-border bg-muted p-4 space-y-1 max-h-64 overflow-auto">
            {emails.map((email, i) => (
              <div key={i} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1 hover:bg-background">
                <span className="font-mono text-sm text-foreground">{email}</span>
                <button onClick={() => navigator.clipboard.writeText(email)} className="text-xs text-muted-foreground hover:text-primary">Copy</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No emails found yet. Paste text and click Extract.</p>
      )}
    </div>
  );
}
