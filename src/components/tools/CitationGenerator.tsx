"use client";

import { useState } from "react";

export default function CitationGenerator() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<"APA" | "MLA" | "Chicago">("APA");
  const [citation, setCitation] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const a = author || "Author, A.";
    const t = title || "Title of Work";
    const y = year || "n.d.";
    const p = publisher || "Publisher";
    let result = "";
    if (format === "APA") {
      result = `${a} (${y}). *${t}*. ${p}.${url ? ` Retrieved from ${url}` : ""}`;
    } else if (format === "MLA") {
      result = `${a} "${t}." *${p}*, ${y}.${url ? ` Web. ${url}` : ""}`;
    } else {
      result = `${a} *${t}*. ${p}, ${y}.${url ? ` ${url}.` : ""}`;
    }
    setCitation(result);
  };

  const copy = async () => { await navigator.clipboard.writeText(citation); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["APA", "MLA", "Chicago"] as const).map((f) => (
          <button key={f} onClick={() => setFormat(f)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${format === f ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>{f}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Author (Last, First)", value: author, set: setAuthor, placeholder: "Smith, John" },
          { label: "Title", value: title, set: setTitle, placeholder: "The Great Book" },
          { label: "Year", value: year, set: setYear, placeholder: "2024" },
          { label: "Publisher / Journal", value: publisher, set: setPublisher, placeholder: "Oxford University Press" },
          { label: "URL (if online)", value: url, set: setUrl, placeholder: "https://example.com", colSpan: true },
        ].map(({ label, value, set, placeholder, colSpan }) => (
          <div key={label} className={`space-y-1 ${colSpan ? "sm:col-span-2" : ""}`}>
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <input type="text" value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder}
              className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Generate Citation</button>
        {citation && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : "Copy"}</button>}
      </div>
      {citation && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-xs text-muted-foreground mb-2">{format} Citation:</p>
          <p className="text-sm text-foreground">{citation}</p>
        </div>
      )}
    </div>
  );
}
