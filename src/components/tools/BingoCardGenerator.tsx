"use client";

import { useState } from "react";

const COLS = ["B", "I", "N", "G", "O"];
const RANGES = [[1, 15], [16, 30], [31, 45], [46, 60], [61, 75]];

function generateCard(): (number | "FREE")[][] {
  return RANGES.map(([min, max], col) => {
    const nums: number[] = [];
    while (nums.length < 5) {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!nums.includes(n)) nums.push(n);
    }
    if (col === 2) nums[2] = 0; // free space marker
    return nums as (number | "FREE")[];
  });
}

export default function BingoCardGenerator() {
  const [card, setCard] = useState(() => generateCard());
  const [marked, setMarked] = useState<Set<string>>(new Set(["2-2"]));

  const generate = () => {
    setCard(generateCard());
    setMarked(new Set(["2-2"]));
  };

  const toggle = (row: number, col: number) => {
    const key = `${row}-${col}`;
    if (row === 2 && col === 2) return;
    setMarked(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5">
        <div className="grid grid-cols-5 gap-1 mb-1">
          {COLS.map(c => (
            <div key={c} className="flex h-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">{c}</div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 5 }, (_, col) => {
              const val = card[col][row];
              const key = `${row}-${col}`;
              const isFree = row === 2 && col === 2;
              const isMarked = marked.has(key);
              return (
                <button key={key} onClick={() => toggle(row, col)}
                  className={`flex h-14 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                    isFree ? "bg-primary text-white" :
                    isMarked ? "bg-primary/20 border-2 border-primary text-primary" :
                    "border border-border bg-background text-foreground hover:bg-primary/10"
                  }`}>
                  {isFree ? "FREE" : val}
                </button>
              );
            })
          )}
        </div>
      </div>
      <button onClick={generate}
        className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:opacity-90">
        Generate New Card
      </button>
      <p className="text-center text-xs text-muted-foreground">Click numbers to mark them. FREE space is pre-marked.</p>
    </div>
  );
}
