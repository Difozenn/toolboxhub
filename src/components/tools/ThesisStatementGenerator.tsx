"use client";

import { useState } from "react";

const ESSAY_TYPES = [
  { value: "argumentative", label: "Argumentative" },
  { value: "expository", label: "Expository" },
  { value: "analytical", label: "Analytical" },
  { value: "compare", label: "Compare & Contrast" },
];

const TEMPLATES: Record<string, string> = {
  argumentative: "Although some may argue that {counterpoint}, {topic} demonstrates that {position} because {reason1} and {reason2}.",
  expository: "An examination of {topic} reveals that {position}, as evidenced by {reason1} and {reason2}.",
  analytical: "Through a careful analysis of {topic}, it becomes clear that {position}, particularly when considering {reason1} and {reason2}.",
  compare: "While {topic} and {comparison} share {similarity}, they differ fundamentally in {position}, which ultimately determines {reason1}.",
};

export default function ThesisStatementGenerator() {
  const [topic, setTopic] = useState("");
  const [position, setPosition] = useState("");
  const [reason1, setReason1] = useState("");
  const [reason2, setReason2] = useState("");
  const [extra, setExtra] = useState("");
  const [type, setType] = useState("argumentative");
  const [thesis, setThesis] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!topic || !position) return;
    const template = TEMPLATES[type];
    const result = template
      .replace("{topic}", topic)
      .replace("{position}", position)
      .replace("{reason1}", reason1 || "multiple key factors")
      .replace("{reason2}", reason2 || "its broader implications")
      .replace("{counterpoint}", extra || "the contrary view")
      .replace("{comparison}", extra || "its counterpart")
      .replace("{similarity}", extra || "surface-level similarities");
    setThesis(result);
  };

  const copy = () => { navigator.clipboard.writeText(thesis); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Essay Type</label>
        <div className="flex flex-wrap gap-2">
          {ESSAY_TYPES.map((t) => (
            <button key={t.value} onClick={() => setType(t.value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${type === t.value ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-primary/10"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Topic *", value: topic, set: setTopic, placeholder: "e.g., social media usage among teenagers" },
          { label: "Your Position *", value: position, set: setPosition, placeholder: "e.g., has significantly increased anxiety" },
          { label: "Reason 1", value: reason1, set: setReason1, placeholder: "e.g., constant comparison to peers" },
          { label: "Reason 2", value: reason2, set: setReason2, placeholder: "e.g., disruption of sleep patterns" },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-xs font-medium text-muted-foreground mb-1">{f.label}</label>
            <input value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>

      <button onClick={generate} disabled={!topic || !position}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-40">
        Generate Thesis Statement
      </button>

      {thesis && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <p className="text-sm font-semibold text-foreground">Your Thesis Statement</p>
          <p className="text-sm leading-7 text-foreground italic">"{thesis}"</p>
          <button onClick={copy} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            {copied ? "Copied!" : "Copy Thesis"}
          </button>
        </div>
      )}
    </div>
  );
}
