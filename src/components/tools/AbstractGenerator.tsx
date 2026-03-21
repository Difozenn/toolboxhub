"use client";

import { useState } from "react";

export default function AbstractGenerator() {
  const [topic, setTopic] = useState("");
  const [objective, setObjective] = useState("");
  const [method, setMethod] = useState("");
  const [findings, setFindings] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [abstract, setAbstract] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!topic || !objective) return;
    const parts = [
      `This study investigates ${topic}.`,
      objective ? `The primary objective is to ${objective}.` : "",
      method ? `A ${method} approach was employed to address the research questions.` : "",
      findings ? `Results indicate that ${findings}.` : "",
      conclusion ? `These findings suggest that ${conclusion}, contributing to the broader understanding of ${topic}.` : `This research contributes to the existing literature on ${topic} and offers practical implications for future work in this area.`,
    ].filter(Boolean);
    setAbstract(parts.join(" "));
  };

  const copy = () => {
    navigator.clipboard.writeText(abstract);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = abstract.split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "Research Topic *", value: topic, set: setTopic, placeholder: "e.g., machine learning in healthcare" },
          { label: "Objective *", value: objective, set: setObjective, placeholder: "e.g., evaluate the accuracy of..." },
          { label: "Methodology", value: method, set: setMethod, placeholder: "e.g., systematic literature review" },
          { label: "Key Findings", value: findings, set: setFindings, placeholder: "e.g., a 23% improvement in..." },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
            <input value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Conclusion / Implications</label>
        <input value={conclusion} onChange={(e) => setConclusion(e.target.value)}
          placeholder="e.g., early intervention significantly reduces..."
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <button onClick={generate} disabled={!topic || !objective}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-40">
        Generate Abstract
      </button>

      {abstract && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Generated Abstract</p>
            <span className="text-xs text-muted-foreground">{wordCount} words</span>
          </div>
          <p className="text-sm leading-7 text-foreground">{abstract}</p>
          <button onClick={copy}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            {copied ? "Copied!" : "Copy Abstract"}
          </button>
        </div>
      )}
    </div>
  );
}
