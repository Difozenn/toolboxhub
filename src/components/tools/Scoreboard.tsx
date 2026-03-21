"use client";

import { useState } from "react";

interface Player {
  id: number;
  name: string;
  score: number;
}

export default function Scoreboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newName, setNewName] = useState("");
  const [nextId, setNextId] = useState(1);

  const addPlayer = () => {
    const name = newName.trim();
    if (!name) return;
    setPlayers(prev => [...prev, { id: nextId, name, score: 0 }]);
    setNextId(n => n + 1);
    setNewName("");
  };

  const adjust = (id: number, delta: number) =>
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, score: p.score + delta } : p));

  const remove = (id: number) =>
    setPlayers(prev => prev.filter(p => p.id !== id));

  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Add Player</label>
        <div className="flex gap-2">
          <input value={newName} onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPlayer()}
            placeholder="Player name..."
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          <button onClick={addPlayer} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-colors">Add</button>
        </div>
        {players.length > 0 && (
          <button onClick={() => setPlayers([])} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Reset All</button>
        )}
      </div>

      {sorted.length > 0 ? (
        <div className="space-y-2">
          {sorted.map((p, rank) => (
            <div key={p.id} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${rank === 0 ? "border-primary/30 bg-primary/5" : "border-border bg-muted"}`}>
              <span className="w-6 text-sm font-bold text-muted-foreground">{rank + 1}</span>
              <span className="flex-1 font-medium text-foreground">{p.name}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => adjust(p.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-sm font-bold text-foreground hover:bg-primary/10 transition-colors">−</button>
                <span className={`w-10 text-center text-lg font-bold tabular-nums ${rank === 0 ? "text-primary" : "text-foreground"}`}>{p.score}</span>
                <button onClick={() => adjust(p.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-sm font-bold text-foreground hover:bg-primary/10 transition-colors">+</button>
              </div>
              <button onClick={() => remove(p.id)} className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-1">✕</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-10 text-center">
          <p className="text-muted-foreground">Add players to start tracking scores.</p>
        </div>
      )}
    </div>
  );
}
