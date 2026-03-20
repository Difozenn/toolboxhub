"use client";

import { useState, useCallback } from "react";

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;

  let count = 0;
  const vowels = "aeiouy";
  let prevVowel = false;

  for (let i = 0; i < w.length; i++) {
    const isVowel = vowels.includes(w[i]);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }

  // Silent e at the end
  if (w.endsWith("e") && !w.endsWith("le")) count--;
  // Words ending in -ed (past tense, usually silent)
  if (w.endsWith("ed") && w.length > 3 && !w.endsWith("ted") && !w.endsWith("ded")) count--;

  return Math.max(count, 1);
}

function getSentences(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function getWords(text: string): string[] {
  return text
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z'-]/g, ""))
    .filter((w) => w.length > 0);
}

function getParagraphs(text: string): number {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;
}

interface ReadabilityResult {
  fleschEase: number;
  fleschKincaid: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  syllableCount: number;
  charCount: number;
}

function analyzeText(text: string): ReadabilityResult | null {
  const words = getWords(text);
  const sentences = getSentences(text);

  if (words.length === 0 || sentences.length === 0) return null;

  const totalSyllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = totalSyllables / words.length;

  // Flesch Reading Ease: 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
  const fleschEase =
    206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

  // Flesch-Kincaid Grade Level: 0.39*(words/sentences) + 11.8*(syllables/words) - 15.59
  const fleschKincaid =
    0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

  return {
    fleschEase: Math.round(fleschEase * 10) / 10,
    fleschKincaid: Math.round(fleschKincaid * 10) / 10,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
    wordCount: words.length,
    sentenceCount: sentences.length,
    paragraphCount: getParagraphs(text),
    syllableCount: totalSyllables,
    charCount: text.length,
  };
}

function getReadabilityRating(score: number): {
  label: string;
  color: string;
  description: string;
} {
  if (score >= 90)
    return { label: "Very Easy", color: "bg-green-500", description: "5th grade - Easily understood by an average 11-year-old" };
  if (score >= 80)
    return { label: "Easy", color: "bg-green-400", description: "6th grade - Conversational English" };
  if (score >= 70)
    return { label: "Fairly Easy", color: "bg-lime-500", description: "7th grade - Good for general audiences" };
  if (score >= 60)
    return { label: "Standard", color: "bg-yellow-500", description: "8th-9th grade - Plain English" };
  if (score >= 50)
    return { label: "Fairly Difficult", color: "bg-orange-500", description: "10th-12th grade - High school level" };
  if (score >= 30)
    return { label: "Difficult", color: "bg-red-400", description: "College level - Academic writing" };
  return { label: "Very Difficult", color: "bg-red-600", description: "College graduate - Professional/academic" };
}

export default function ReadabilityChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReadabilityResult | null>(null);
  const [copied, setCopied] = useState(false);

  const analyze = useCallback(() => {
    setResult(analyzeText(text));
  }, [text]);

  const copyResults = useCallback(async () => {
    if (!result) return;
    const rating = getReadabilityRating(result.fleschEase);
    const output = [
      `Readability Analysis`,
      `---`,
      `Flesch Reading Ease: ${result.fleschEase} (${rating.label})`,
      `Flesch-Kincaid Grade Level: ${result.fleschKincaid}`,
      `Words: ${result.wordCount}`,
      `Sentences: ${result.sentenceCount}`,
      `Paragraphs: ${result.paragraphCount}`,
      `Syllables: ${result.syllableCount}`,
      `Avg Words/Sentence: ${result.avgWordsPerSentence}`,
      `Avg Syllables/Word: ${result.avgSyllablesPerWord}`,
    ].join("\n");
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [result]);

  const rating = result ? getReadabilityRating(result.fleschEase) : null;
  const easePercent = result ? Math.max(0, Math.min(100, result.fleschEase)) : 0;

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Enter Your Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to analyze its readability..."
          rows={10}
          className="w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div className="mt-1 flex justify-between">
          <p className="text-xs text-muted-foreground">
            {text.length} characters | {getWords(text).length} words
          </p>
          <button
            onClick={analyze}
            disabled={!text.trim()}
            className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            Analyze
          </button>
        </div>
      </div>

      {/* Results */}
      {result && rating && (
        <div className="space-y-4">
          {/* Score */}
          <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">Readability Score</h3>
              <button
                onClick={copyResults}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
              >
                {copied ? "Copied!" : "Copy Results"}
              </button>
            </div>

            {/* Flesch Reading Ease */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">
                  Flesch Reading Ease
                </span>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary">
                  {result.fleschEase}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-border">
                <div
                  className={`h-full rounded-full transition-all ${rating.color}`}
                  style={{ width: `${easePercent}%` }}
                />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium text-white ${rating.color}`}>
                  {rating.label}
                </span>
                <span className="text-xs text-muted-foreground">{rating.description}</span>
              </div>
            </div>

            {/* Flesch-Kincaid Grade */}
            <div className="rounded-lg bg-background p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Flesch-Kincaid Grade Level</span>
                <span className="text-sm font-bold text-foreground">
                  {result.fleschKincaid}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Approximate US school grade level needed to understand the text
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Words", value: result.wordCount },
              { label: "Sentences", value: result.sentenceCount },
              { label: "Paragraphs", value: result.paragraphCount },
              { label: "Syllables", value: result.syllableCount },
              { label: "Avg Words/Sentence", value: result.avgWordsPerSentence },
              { label: "Avg Syllables/Word", value: result.avgSyllablesPerWord },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-muted p-3 text-center"
              >
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Scale reference */}
          <div className="rounded-xl border border-border bg-muted p-4">
            <h3 className="mb-3 text-sm font-medium text-foreground">Flesch Reading Ease Scale</h3>
            <div className="space-y-1 text-xs">
              {[
                { range: "90-100", label: "Very Easy", desc: "5th grade", color: "bg-green-500" },
                { range: "80-89", label: "Easy", desc: "6th grade", color: "bg-green-400" },
                { range: "70-79", label: "Fairly Easy", desc: "7th grade", color: "bg-lime-500" },
                { range: "60-69", label: "Standard", desc: "8-9th grade", color: "bg-yellow-500" },
                { range: "50-59", label: "Fairly Difficult", desc: "10-12th grade", color: "bg-orange-500" },
                { range: "30-49", label: "Difficult", desc: "College", color: "bg-red-400" },
                { range: "0-29", label: "Very Difficult", desc: "College graduate", color: "bg-red-600" },
              ].map((item) => (
                <div key={item.range} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="w-16 font-medium text-foreground">{item.range}</span>
                  <span className="w-28 text-foreground">{item.label}</span>
                  <span className="text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!result && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Paste your text above and click Analyze to check readability scores.
          </p>
        </div>
      )}
    </div>
  );
}
