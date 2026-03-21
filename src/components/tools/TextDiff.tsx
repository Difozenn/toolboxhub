"use client";
import { useState } from "react";

interface DiffLine { type: "same" | "add" | "remove"; text: string; }

function diffLines(a: string, b: string): DiffLine[] {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const result: DiffLine[] = [];
  const maxLen = Math.max(linesA.length, linesB.length);
  let iA = 0, iB = 0;
  while (iA < linesA.length || iB < linesB.length) {
    if (iA < linesA.length && iB < linesB.length && linesA[iA] === linesB[iB]) {
      result.push({ type: "same", text: linesA[iA] });
      iA++; iB++;
    } else if (iB < linesB.length && (iA >= linesA.length || !linesA.slice(iA).includes(linesB[iB]))) {
      result.push({ type: "add", text: linesB[iB] });
      iB++;
    } else if (iA < linesA.length) {
      result.push({ type: "remove", text: linesA[iA] });
      iA++;
    }
  }
  return result;
}

export default function TextDiff() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");

  const diff = textA || textB ? diffLines(textA, textB) : [];
  const adds = diff.filter(d => d.type === "add").length;
  const removes = diff.filter(d => d.type === "remove").length;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Original</label>
          <textarea value={textA} onChange={e => setTextA(e.target.value)} rows={8} placeholder="Paste original text..."
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Modified</label>
          <textarea value={textB} onChange={e => setTextB(e.target.value)} rows={8} placeholder="Paste modified text..."
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      {diff.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">
            <span className="text-green-500 font-medium">+{adds} added</span>
            {" "}
            <span className="text-red-500 font-medium">-{removes} removed</span>
          </p>
          <div className="rounded-lg border border-border bg-muted overflow-auto max-h-96">
            <pre className="text-sm font-mono p-3 leading-relaxed">
              {diff.map((d, i) => (
                <div key={i} className={
                  d.type === "add" ? "bg-green-500/15 text-green-600" :
                  d.type === "remove" ? "bg-red-500/15 text-red-500" : "text-foreground"
                }>
                  {d.type === "add" ? "+" : d.type === "remove" ? "-" : " "} {d.text}
                </div>
              ))}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}
