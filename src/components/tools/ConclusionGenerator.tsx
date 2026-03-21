"use client";

import { useState } from "react";

export default function ConclusionGenerator() {
  const [thesis, setThesis] = useState("");
  const [point1, setPoint1] = useState("");
  const [point2, setPoint2] = useState("");
  const [point3, setPoint3] = useState("");
  const [closing, setClosing] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!thesis) return;
    const points = [point1, point2, point3].filter(Boolean);
    const summary = points.length > 0
      ? `This essay has demonstrated that ${points.join(", and ")}. `
      : "";
    const restate = `In conclusion, ${thesis.replace(/^[A-Z]/, (c) => c.toLowerCase())} `;
    const close = closing
      ? `${closing}`
      : `As the evidence shows, the implications of this topic extend beyond the immediate discussion and merit further exploration.`;
    setResult(restate + summary + close);
  };

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const wc = result.split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Thesis Statement *</label>
        <input value={thesis} onChange={(e) => setThesis(e.target.value)}
          placeholder="Paste your original thesis statement here"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Main Points (optional)</p>
        {[
          [point1, setPoint1, "Main point 1 (e.g., climate change accelerates ice melt)"],
          [point2, setPoint2, "Main point 2 (e.g., rising sea levels threaten coastlines)"],
          [point3, setPoint3, "Main point 3 (e.g., immediate policy action is required)"],
        ].map(([val, set, ph], i) => (
          <input key={i} value={val as string} onChange={(e) => (set as (v: string) => void)(e.target.value)} placeholder={ph as string}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Closing Thought (optional)</label>
        <input value={closing} onChange={(e) => setClosing(e.target.value)}
          placeholder="e.g., Without immediate action, future generations will bear the consequences."
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <button onClick={generate} disabled={!thesis}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-40">
        Generate Conclusion
      </button>

      {result && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Conclusion Paragraph</p>
            <span className="text-xs text-muted-foreground">{wc} words</span>
          </div>
          <p className="text-sm leading-7 text-foreground">{result}</p>
          <button onClick={copy} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            {copied ? "Copied!" : "Copy Conclusion"}
          </button>
        </div>
      )}
    </div>
  );
}
