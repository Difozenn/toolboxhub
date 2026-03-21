"use client";

import { useState } from "react";

const ABO_ALLELES: Record<string, string[][]> = {
  A: [["A","A"],["A","O"]],
  B: [["B","B"],["B","O"]],
  AB: [["A","B"]],
  O: [["O","O"]],
};

const ALLELE_TO_TYPE: Record<string, string> = {
  "AA":"A","AO":"A","OA":"A","BB":"B","BO":"B","OB":"B","AB":"AB","BA":"AB","OO":"O",
};

const RH_OPTIONS = ["+","-"];

function getPossibleTypes(p1: string, p2: string): Record<string, number> {
  const combos: string[] = [];
  const a1 = ABO_ALLELES[p1] || [];
  const a2 = ABO_ALLELES[p2] || [];
  a1.forEach((pair1) => {
    a2.forEach((pair2) => {
      const [a, b] = [pair1, pair2];
      a.forEach((allA) => b.forEach((allB) => combos.push(ALLELE_TO_TYPE[allA + allB] || ALLELE_TO_TYPE[allB + allA] || "?")));
    });
  });
  const counts: Record<string, number> = {};
  combos.forEach((t) => { counts[t] = (counts[t] || 0) + 1; });
  const total = combos.length;
  const pct: Record<string, number> = {};
  Object.entries(counts).forEach(([k, v]) => { pct[k] = Math.round((v / total) * 100); });
  return pct;
}

export default function BloodTypeCalculator() {
  const [p1Abo, setP1Abo] = useState("A");
  const [p2Abo, setP2Abo] = useState("B");
  const [p1Rh, setP1Rh] = useState("+");
  const [p2Rh, setP2Rh] = useState("+");

  const types = getPossibleTypes(p1Abo, p2Abo);
  const rhPos = (p1Rh === "+" || p2Rh === "+");
  const rhBoth = p1Rh === "+" && p2Rh === "+";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        {[{ label: "Parent 1", abo: p1Abo, setAbo: setP1Abo, rh: p1Rh, setRh: setP1Rh },
          { label: "Parent 2", abo: p2Abo, setAbo: setP2Abo, rh: p2Rh, setRh: setP2Rh }].map((p) => (
          <div key={p.label} className="rounded-xl border border-border bg-muted p-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">{p.label}</p>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">ABO Type</label>
              <div className="flex gap-1.5">
                {["A","B","AB","O"].map((t) => (
                  <button key={t} onClick={() => p.setAbo(t)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${p.abo === t ? "bg-red-500 text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Rh Factor</label>
              <div className="flex gap-1.5">
                {RH_OPTIONS.map((r) => (
                  <button key={r} onClick={() => p.setRh(r)}
                    className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${p.rh === r ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
        <p className="text-sm font-semibold text-foreground">Possible Child Blood Types</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(types).map(([type, pct]) => (
            <div key={type} className="rounded-lg border border-border bg-background px-4 py-3 text-center min-w-[80px]">
              <p className="text-xl font-bold text-red-500">{type}</p>
              <p className="text-xs text-muted-foreground">{pct}%</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Rh: {rhBoth ? "100% positive possible" : rhPos ? "Positive or Negative possible" : "100% negative"}
        </p>
        <p className="text-xs text-muted-foreground italic">For educational purposes only. Consult a medical professional for clinical blood typing.</p>
      </div>
    </div>
  );
}
