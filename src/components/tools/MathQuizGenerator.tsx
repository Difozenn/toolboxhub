"use client";

import { useState } from "react";

type Op = "+" | "-" | "*" | "/";

interface Question { a: number; b: number; op: Op; answer: number; }

function generate(op: Op, diff: string): Question {
  const max = diff === "easy" ? 10 : diff === "medium" ? 100 : 1000;
  let a = Math.floor(Math.random() * max) + 1;
  let b = Math.floor(Math.random() * max) + 1;
  if (op === "/" ) { const ans = Math.floor(Math.random() * max) + 1; b = Math.floor(Math.random() * max) + 1; a = ans * b; return { a, b, op, answer: ans }; }
  if (op === "-") { if (b > a) [a, b] = [b, a]; }
  const answer = op === "+" ? a + b : op === "-" ? a - b : a * b;
  return { a, b, op, answer };
}

export default function MathQuizGenerator() {
  const [op, setOp] = useState<Op>("+");
  const [diff, setDiff] = useState("easy");
  const [count, setCount] = useState(5);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<"config" | "quiz" | "done">("config");

  const start = () => {
    const qs = Array.from({ length: count }, () => generate(op, diff));
    setQuestions(qs);
    setAnswers(Array(count).fill(""));
    setSubmitted(false);
    setMode("quiz");
  };

  const submit = () => { setSubmitted(true); setMode("done"); };
  const score = questions.filter((q, i) => parseInt(answers[i]) === q.answer).length;

  const opLabel = { "+": "Addition", "-": "Subtraction", "*": "Multiplication", "/": "Division" };

  return (
    <div className="space-y-4">
      {mode === "config" && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">Operation</label>
              <select value={op} onChange={(e) => setOp(e.target.value as Op)} className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm focus:border-primary focus:outline-none">
                {(["+","-","*","/"] as Op[]).map((o) => <option key={o} value={o}>{opLabel[o]}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">Difficulty</label>
              <select value={diff} onChange={(e) => setDiff(e.target.value)} className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm focus:border-primary focus:outline-none">
                <option value="easy">Easy (1–10)</option>
                <option value="medium">Medium (1–100)</option>
                <option value="hard">Hard (1–1000)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">Questions</label>
              <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm focus:border-primary focus:outline-none">
                {[5,10,20].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <button onClick={start} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Start Quiz</button>
        </>
      )}
      {mode === "quiz" && (
        <div className="space-y-3">
          {questions.map((q, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-muted px-4 py-3">
              <span className="font-mono text-sm w-24">{q.a} {q.op} {q.b} =</span>
              <input type="number" value={answers[i]} onChange={(e) => setAnswers((prev) => prev.map((a, ai) => ai === i ? e.target.value : a))}
                className="w-24 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none" />
            </div>
          ))}
          <button onClick={submit} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Submit</button>
        </div>
      )}
      {mode === "done" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-4xl font-bold text-primary">{score}/{questions.length}</p>
            <p className="text-muted-foreground mt-1">{Math.round((score/questions.length)*100)}% correct</p>
          </div>
          {questions.map((q, i) => {
            const correct = parseInt(answers[i]) === q.answer;
            return (
              <div key={i} className={`flex items-center gap-3 rounded-xl border px-4 py-2 text-sm ${correct ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950" : "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950"}`}>
                <span className="font-mono">{q.a} {q.op} {q.b} = {q.answer}</span>
                {!correct && <span className="text-muted-foreground">Your answer: {answers[i] || "blank"}</span>}
              </div>
            );
          })}
          <button onClick={() => setMode("config")} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">New Quiz</button>
        </div>
      )}
    </div>
  );
}
