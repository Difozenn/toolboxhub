"use client";

import { useState } from "react";

type OutlineType = "essay" | "article" | "presentation";

const ROMAN = ["I","II","III","IV","V","VI","VII"];
const ALPHA = ["A","B","C","D","E","F"];

function generateOutline(topic: string, sections: number, type: OutlineType): string {
  const t = topic || "Your Topic";
  const lines: string[] = [];

  if (type === "essay") {
    lines.push(`Essay Outline: ${t}\n`);
    lines.push(`I. Introduction`);
    lines.push(`   A. Hook / Opening statement`);
    lines.push(`   B. Background context`);
    lines.push(`   C. Thesis statement`);
    for (let i = 0; i < sections; i++) {
      lines.push(`\n${ROMAN[i + 1]}. Body Paragraph ${i + 1}`);
      lines.push(`   A. Topic sentence`);
      lines.push(`   B. Supporting evidence`);
      lines.push(`   C. Analysis and explanation`);
    }
    lines.push(`\n${ROMAN[sections + 1]}. Conclusion`);
    lines.push(`   A. Restate thesis`);
    lines.push(`   B. Summary of main points`);
    lines.push(`   C. Closing thought`);
  } else if (type === "article") {
    lines.push(`Article Outline: ${t}\n`);
    lines.push(`I. Headline & Introduction`);
    lines.push(`   A. Compelling hook`);
    lines.push(`   B. Problem statement`);
    lines.push(`   C. What readers will learn`);
    for (let i = 0; i < sections; i++) {
      lines.push(`\n${ROMAN[i + 1]}. Section ${i + 1}: [Subheading]`);
      lines.push(`   A. Key point`);
      lines.push(`   B. Supporting detail / example`);
      lines.push(`   C. Takeaway`);
    }
    lines.push(`\n${ROMAN[sections + 1]}. Conclusion`);
    lines.push(`   A. Summary of key insights`);
    lines.push(`   B. Call to action`);
  } else {
    lines.push(`Presentation Outline: ${t}\n`);
    lines.push(`I. Title Slide`);
    lines.push(`   A. Title: ${t}`);
    lines.push(`   B. Presenter name & date`);
    lines.push(`\nII. Agenda / Overview`);
    for (let i = 0; i < sections; i++) {
      lines.push(`\n${ROMAN[i + 2]}. Slide ${i + 1}: [Topic]`);
      lines.push(`   A. Key message`);
      lines.push(`   B. Supporting data or visuals`);
      lines.push(`   C. Transition to next slide`);
    }
    lines.push(`\n${ROMAN[sections + 2]}. Q&A / Thank You`);
  }

  return lines.join("\n");
}

export default function OutlineGenerator() {
  const [topic, setTopic] = useState("");
  const [sections, setSections] = useState(3);
  const [type, setType] = useState<OutlineType>("essay");
  const [copied, setCopied] = useState(false);

  const outline = generateOutline(topic, sections, type);

  const copy = async () => {
    await navigator.clipboard.writeText(outline);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Topic</label>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Climate Change, Marketing Strategy..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as OutlineType)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="essay">Essay</option>
              <option value="article">Article</option>
              <option value="presentation">Presentation</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Body Sections: {sections}</label>
            <input type="range" min="3" max="7" value={sections} onChange={(e) => setSections(Number(e.target.value))} className="w-full mt-2 accent-primary" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">Generated Outline</p>
          <button onClick={copy} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors">{copied ? "Copied!" : "Copy"}</button>
        </div>
        <pre className="rounded-xl border border-border bg-muted p-4 text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">{outline}</pre>
      </div>
    </div>
  );
}
