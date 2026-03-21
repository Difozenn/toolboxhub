"use client";

import { useState, useEffect } from "react";

interface Card { front: string; back: string; }

export default function FlashcardMaker() {
  const [cards, setCards] = useState<Card[]>(() => { try { return JSON.parse(localStorage.getItem("flashcards") || "[]"); } catch { return []; } });
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState<"study" | "edit">("edit");

  useEffect(() => { localStorage.setItem("flashcards", JSON.stringify(cards)); }, [cards]);

  const add = () => {
    if (!front.trim()) return;
    setCards([...cards, { front, back }]);
    setFront(""); setBack("");
  };

  const remove = (i: number) => setCards(cards.filter((_, ci) => ci !== i));

  const shuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setIdx(0); setFlipped(false);
  };

  const card = cards[idx];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["edit", "study"] as const).map((m) => (
          <button key={m} onClick={() => { setMode(m); setIdx(0); setFlipped(false); }}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${mode === m ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>{m}</button>
        ))}
      </div>
      {mode === "edit" ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1"><label className="text-sm font-medium text-muted-foreground">Front</label><textarea value={front} onChange={(e) => setFront(e.target.value)} rows={3} className="w-full resize-none rounded-xl border border-border bg-muted p-3 text-sm text-foreground focus:border-primary focus:outline-none" /></div>
            <div className="space-y-1"><label className="text-sm font-medium text-muted-foreground">Back</label><textarea value={back} onChange={(e) => setBack(e.target.value)} rows={3} className="w-full resize-none rounded-xl border border-border bg-muted p-3 text-sm text-foreground focus:border-primary focus:outline-none" /></div>
          </div>
          <button onClick={add} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Add Card</button>
          <div className="space-y-2 max-h-48 overflow-auto">
            {cards.map((c, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm">
                <span className="flex-1 text-foreground truncate">{c.front}</span>
                <span className="text-muted-foreground">→</span>
                <span className="flex-1 text-muted-foreground truncate">{c.back}</span>
                <button onClick={() => remove(i)} className="shrink-0 text-muted-foreground hover:text-red-500">×</button>
              </div>
            ))}
          </div>
        </div>
      ) : cards.length === 0 ? (
        <p className="text-muted-foreground text-sm">Add some cards first in Edit mode.</p>
      ) : (
        <div className="space-y-4">
          <div onClick={() => setFlipped((f) => !f)} className="cursor-pointer rounded-xl border border-border bg-muted p-8 min-h-40 flex items-center justify-center text-center hover:border-primary transition-colors">
            <div>
              <p className="text-xs text-muted-foreground mb-2">{flipped ? "Answer" : "Question"}</p>
              <p className="text-lg font-semibold text-foreground">{flipped ? card.back || "(no answer)" : card.front}</p>
              <p className="text-xs text-muted-foreground mt-4">Click to flip</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={() => { setIdx((i) => (i - 1 + cards.length) % cards.length); setFlipped(false); }} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">Prev</button>
            <span className="text-sm text-muted-foreground">{idx + 1} / {cards.length}</span>
            <button onClick={() => { setIdx((i) => (i + 1) % cards.length); setFlipped(false); }} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">Next</button>
          </div>
          <button onClick={shuffle} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground w-full hover:bg-muted">Shuffle</button>
        </div>
      )}
    </div>
  );
}
