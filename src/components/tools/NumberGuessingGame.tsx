"use client";

import { useState } from "react";

export default function NumberGuessingGame() {
  const [secret, setSecret] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [history, setHistory] = useState<{ guess: number; hint: string }[]>([]);

  const submit = () => {
    const g = parseInt(guess, 10);
    if (isNaN(g) || g < 1 || g > 100) return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    let h = "";
    if (g === secret) {
      h = "Correct!";
      setWon(true);
    } else if (g < secret) {
      h = g < secret - 20 ? "Much too low!" : "Too low!";
    } else {
      h = g > secret + 20 ? "Much too high!" : "Too high!";
    }
    setHint(h);
    setHistory(prev => [{ guess: g, hint: h }, ...prev]);
    setGuess("");
  };

  const reset = () => {
    setSecret(Math.floor(Math.random() * 100) + 1);
    setGuess(""); setAttempts(0); setHint(null); setWon(false); setHistory([]);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 text-center space-y-1">
        <p className="text-sm text-muted-foreground">Guess a number between 1 and 100</p>
        <p className="text-xs text-muted-foreground">Attempts: {attempts}</p>
      </div>

      {!won ? (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
          <div className="flex gap-2">
            <input type="number" min="1" max="100" value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Your guess (1–100)"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <button onClick={submit} className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-colors">Guess</button>
          </div>
          {hint && (
            <div className="rounded-lg border border-border bg-background px-4 py-3 text-center">
              <p className="text-lg font-semibold text-foreground">{hint}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center space-y-3">
          <p className="text-3xl font-bold text-primary">You got it!</p>
          <p className="text-muted-foreground">The number was {secret}. You guessed it in {attempts} attempt{attempts !== 1 ? "s" : ""}.</p>
          <button onClick={reset} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-colors">Play Again</button>
        </div>
      )}

      {history.length > 0 && !won && (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-2">
          <p className="text-sm font-medium text-foreground">History</p>
          {history.slice(0, 8).map((r, i) => (
            <div key={i} className="flex justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <span className="text-foreground font-mono">{r.guess}</span>
              <span className="text-muted-foreground">{r.hint}</span>
            </div>
          ))}
        </div>
      )}

      {!won && <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground transition-colors">New Game</button>}
    </div>
  );
}
