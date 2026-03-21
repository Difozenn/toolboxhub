"use client";

import { useState, useEffect } from "react";

interface Habit { id: number; name: string; days: boolean[]; }

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(() => { try { return JSON.parse(localStorage.getItem("habits") || "[]"); } catch { return []; } });
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => { localStorage.setItem("habits", JSON.stringify(habits)); }, [habits]);

  const add = () => {
    if (!newHabit.trim()) return;
    setHabits([...habits, { id: Date.now(), name: newHabit, days: Array(7).fill(false) }]);
    setNewHabit("");
  };

  const toggle = (id: number, day: number) => setHabits(habits.map((h) => h.id === id ? { ...h, days: h.days.map((d, i) => i === day ? !d : d) } : h));
  const remove = (id: number) => setHabits(habits.filter((h) => h.id !== id));

  const streak = (days: boolean[]) => {
    let s = 0;
    for (let i = days.length - 1; i >= 0; i--) { if (days[i]) s++; else break; }
    return s;
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={newHabit} onChange={(e) => setNewHabit(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add a new habit..."
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={add} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Add</button>
      </div>
      {habits.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">No habits yet. Add one above!</p>
      ) : (
        <div className="overflow-auto rounded-xl border border-border bg-muted">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left text-xs text-muted-foreground">Habit</th>
                {DAYS.map((d) => <th key={d} className="px-2 py-2 text-xs text-muted-foreground">{d}</th>)}
                <th className="px-2 py-2 text-xs text-muted-foreground">Streak</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {habits.map((h) => (
                <tr key={h.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{h.name}</td>
                  {h.days.map((checked, di) => (
                    <td key={di} className="px-2 py-3 text-center">
                      <button onClick={() => toggle(h.id, di)}
                        className={`h-6 w-6 rounded-full border-2 transition-colors ${checked ? "border-primary bg-primary" : "border-border bg-background hover:border-primary"}`} />
                    </td>
                  ))}
                  <td className="px-2 py-3 text-center">
                    <span className={`text-xs font-semibold ${streak(h.days) > 0 ? "text-primary" : "text-muted-foreground"}`}>{streak(h.days)}🔥</span>
                  </td>
                  <td className="px-2 py-3"><button onClick={() => remove(h.id)} className="text-muted-foreground hover:text-red-500">×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
