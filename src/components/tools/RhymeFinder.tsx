"use client";

import { useState } from "react";

const WORD_LIST = [
  "cat","bat","hat","mat","rat","sat","fat","flat","chat","that","pat","vat","brat","spat",
  "day","say","way","play","stay","gray","pray","lay","ray","bay","clay","pay","sway","may",
  "time","rhyme","lime","climb","dime","mime","prime","sublime","paradigm","crime","slime",
  "light","night","bright","fight","might","right","sight","tight","white","write","bite","kite",
  "love","dove","above","shove","glove","of","move","groove","prove","approve",
  "dream","team","stream","cream","beam","seem","scheme","theme","extreme","gleam",
  "rain","pain","gain","plain","train","brain","chain","main","lane","game","name","fame","same",
  "moon","soon","tune","June","balloon","spoon","boon","noon","croon","swoon","immune",
  "fire","desire","inspire","higher","hire","tire","wire","choir","require","admire",
  "heart","art","start","part","smart","chart","dart","apart","cart","dark","spark","bark",
  "blue","true","new","through","grew","knew","flew","clue","dew","few","view","you",
  "song","long","strong","wrong","belong","along","among","throng","gong","prong",
  "free","see","be","tree","key","sea","tea","me","we","agree","degree","three",
  "world","hold","gold","old","cold","bold","told","fold","mold","rolled","soul","goal",
  "sky","fly","high","try","cry","by","my","sigh","die","lie","tie","why","dry",
  "run","sun","fun","done","one","won","gun","son","ton","none","begun","stun",
  "mind","find","kind","blind","bind","wind","behind","defined","signed","lined",
];

function getRhymes(word: string): Record<string, string[]> {
  const w = word.toLowerCase().trim();
  if (!w) return {};
  const suffixes = [w.slice(-3), w.slice(-2), w.slice(-1)].filter((s) => s.length > 0);
  const groups: Record<string, string[]> = {};
  WORD_LIST.forEach((candidate) => {
    if (candidate === w) return;
    for (const suffix of suffixes) {
      if (candidate.endsWith(suffix)) {
        const key = `-${suffix}`;
        if (!groups[key]) groups[key] = [];
        if (!groups[key].includes(candidate)) groups[key].push(candidate);
        break;
      }
    }
  });
  return Object.fromEntries(Object.entries(groups).filter(([, v]) => v.length > 0));
}

export default function RhymeFinder() {
  const [word, setWord] = useState("");
  const [rhymes, setRhymes] = useState<Record<string, string[]>>({});

  const find = () => setRhymes(getRhymes(word));

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Enter a word</label>
        <div className="flex gap-2">
          <input value={word} onChange={(e) => setWord(e.target.value)} onKeyDown={(e) => e.key === "Enter" && find()}
            placeholder="e.g. time, love, dream..."
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          <button onClick={find} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">Find Rhymes</button>
        </div>
      </div>

      {Object.entries(rhymes).length > 0 && (
        <div className="space-y-4">
          {Object.entries(rhymes).sort(([a], [b]) => b.length - a.length).map(([pattern, words]) => (
            <div key={pattern} className="rounded-xl border border-border bg-muted p-4">
              <p className="text-xs font-semibold text-primary mb-2">Ending in "{pattern}"</p>
              <div className="flex flex-wrap gap-2">
                {words.map((w) => <span key={w} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{w}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}
      {Object.entries(rhymes).length === 0 && word && (
        <p className="text-sm text-muted-foreground text-center">No rhymes found in our word list. Try a different word.</p>
      )}
    </div>
  );
}
