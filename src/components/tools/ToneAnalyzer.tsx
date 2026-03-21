"use client";

import { useState } from "react";

const FORMAL_WORDS = ["therefore","furthermore","consequently","nevertheless","henceforth","herein","whereby","pursuant","notwithstanding","aforementioned"];
const CASUAL_WORDS = ["gonna","wanna","kinda","sorta","yeah","hey","cool","awesome","stuff","things","lots","tons","pretty","super","really","just","like"];
const POSITIVE_WORDS = ["great","excellent","wonderful","amazing","fantastic","love","enjoy","benefit","opportunity","success","improve","achieve","joy","happy"];
const NEGATIVE_WORDS = ["bad","terrible","awful","fail","problem","issue","concern","risk","danger","wrong","difficult","hard","unfortunately","sadly","fear"];
const CONFIDENT = ["will","must","clearly","certainly","definitely","undoubtedly","absolutely","proven","demonstrate","establishes"];
const UNCERTAIN = ["might","perhaps","maybe","possibly","could","seems","appears","somewhat","suggests","arguably"];

interface ToneResult {
  formality: number;
  sentiment: number;
  confidence: number;
  label: { formality: string; sentiment: string; confidence: string };
}

function analyze(text: string): ToneResult {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  if (!words.length) return { formality: 50, sentiment: 50, confidence: 50, label: { formality: "Neutral", sentiment: "Neutral", confidence: "Balanced" } };

  const formalCount = words.filter((w) => FORMAL_WORDS.includes(w)).length;
  const casualCount = words.filter((w) => CASUAL_WORDS.includes(w)).length;
  const posCount = words.filter((w) => POSITIVE_WORDS.includes(w)).length;
  const negCount = words.filter((w) => NEGATIVE_WORDS.includes(w)).length;
  const confCount = words.filter((w) => CONFIDENT.includes(w)).length;
  const uncertCount = words.filter((w) => UNCERTAIN.includes(w)).length;

  const formality = Math.min(100, Math.max(0, 50 + (formalCount - casualCount) * 8));
  const sentiment = Math.min(100, Math.max(0, 50 + (posCount - negCount) * 8));
  const confidence = Math.min(100, Math.max(0, 50 + (confCount - uncertCount) * 8));

  return {
    formality, sentiment, confidence,
    label: {
      formality: formality >= 65 ? "Formal" : formality <= 35 ? "Casual" : "Neutral",
      sentiment: sentiment >= 65 ? "Positive" : sentiment <= 35 ? "Negative" : "Neutral",
      confidence: confidence >= 65 ? "Confident" : confidence <= 35 ? "Uncertain" : "Balanced",
    },
  };
}

function Meter({ label, value, lo, hi }: { label: string; value: number; lo: string; hi: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground"><span>{lo}</span><span className="font-medium text-foreground">{label}</span><span>{hi}</span></div>
      <div className="h-3 w-full rounded-full bg-border overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function ToneAnalyzer() {
  const [text, setText] = useState("");
  const result = text.trim().length > 10 ? analyze(text) : null;

  return (
    <div className="space-y-5">
      <textarea value={text} onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here to analyze its tone..."
        className="h-44 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      <div className="rounded-xl border border-border bg-muted p-5 space-y-5">
        <div className="flex gap-4 flex-wrap">
          {result ? (
            [
              { label: result.label.formality, color: "bg-blue-500" },
              { label: result.label.sentiment, color: result.label.sentiment === "Positive" ? "bg-green-500" : result.label.sentiment === "Negative" ? "bg-red-500" : "bg-gray-500" },
              { label: result.label.confidence, color: "bg-purple-500" },
            ].map((badge) => (
              <span key={badge.label} className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${badge.color}`}>{badge.label}</span>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Enter at least 10 characters to analyze tone.</p>
          )}
        </div>

        {result && (
          <div className="space-y-4">
            <Meter label="Formality" value={result.formality} lo="Casual" hi="Formal" />
            <Meter label="Sentiment" value={result.sentiment} lo="Negative" hi="Positive" />
            <Meter label="Confidence" value={result.confidence} lo="Uncertain" hi="Confident" />
          </div>
        )}
      </div>
    </div>
  );
}
