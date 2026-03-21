"use client";
import { useState } from "react";

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

function analyze(text: string) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const totalSyllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const numSentences = Math.max(sentences.length, 1);
  const numWords = Math.max(words.length, 1);
  const fleschEase = 206.835 - 1.015 * (numWords / numSentences) - 84.6 * (totalSyllables / numWords);
  const gradeLevel = 0.39 * (numWords / numSentences) + 11.8 * (totalSyllables / numWords) - 15.59;
  const readingTime = Math.ceil(numWords / 200);
  return { fleschEase: Math.max(0, Math.min(100, fleschEase)), gradeLevel: Math.max(0, gradeLevel), numWords, numSentences, totalSyllables, readingTime };
}

function easeLabel(score: number): string {
  if (score >= 90) return "Very Easy (5th Grade)";
  if (score >= 80) return "Easy (6th Grade)";
  if (score >= 70) return "Fairly Easy (7th Grade)";
  if (score >= 60) return "Standard (8th-9th Grade)";
  if (score >= 50) return "Fairly Difficult (10th-12th)";
  if (score >= 30) return "Difficult (College)";
  return "Very Difficult (Graduate)";
}

export default function ReadingLevelAnalyzer() {
  const [text, setText] = useState("");
  const hasText = text.trim().length > 0;
  const stats = hasText ? analyze(text) : null;
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={6} placeholder="Paste or type text to analyze..."
        className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      {stats && (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Flesch Reading Ease</p>
              <p className="text-2xl font-bold text-primary">{stats.fleschEase.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">{easeLabel(stats.fleschEase)}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Grade Level</p>
              <p className="text-2xl font-bold text-foreground">{stats.gradeLevel.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">Flesch-Kincaid</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Reading Time</p>
              <p className="text-2xl font-bold text-foreground">~{stats.readingTime} min</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>{stats.numWords} words</span>
            <span>{stats.numSentences} sentences</span>
            <span>{stats.totalSyllables} syllables</span>
            <span>{(stats.totalSyllables / stats.numWords).toFixed(2)} syllables/word</span>
          </div>
        </>
      )}
    </div>
  );
}
