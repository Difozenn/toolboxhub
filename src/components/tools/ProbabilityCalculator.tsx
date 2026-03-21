"use client";
import { useState } from "react";

type Mode = "basic"|"complement"|"union"|"intersection"|"conditional";

export default function ProbabilityCalculator() {
  const [mode, setMode] = useState<Mode>("basic");
  const [pa, setPa] = useState("");
  const [pb, setPb] = useState("");
  const [pab, setPab] = useState("");
  const [independent, setIndependent] = useState(true);

  const pA = parseFloat(pa), pB = parseFloat(pb), pAB = parseFloat(pab);
  const validA = !isNaN(pA) && pA >= 0 && pA <= 1;
  const validB = !isNaN(pB) && pB >= 0 && pB <= 1;

  let result: number | null = null;
  let label = "";
  if (mode==="basic" && validA) { result = pA; label = "P(A)"; }
  else if (mode==="complement" && validA) { result = 1-pA; label = "P(not A) = 1 - P(A)"; }
  else if (mode==="union" && validA && validB) {
    const intx = independent ? pA*pB : (!isNaN(pAB) ? pAB : null);
    if (intx !== null) { result = pA+pB-intx; label = "P(A∪B) = P(A)+P(B)-P(A∩B)"; }
  } else if (mode==="intersection" && validA && validB) {
    result = independent ? pA*pB : pAB;
    label = independent ? "P(A∩B) = P(A)×P(B)" : "P(A∩B)";
  } else if (mode==="conditional" && validA && validB && !isNaN(pAB)) {
    result = pB > 0 ? pAB/pB : null;
    label = "P(A|B) = P(A∩B)/P(B)";
  }

  const MODES: {key:Mode;label:string}[] = [{key:"basic",label:"Basic"},{key:"complement",label:"Complement"},{key:"union",label:"Union"},{key:"intersection",label:"Intersection"},{key:"conditional",label:"Conditional"}];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map(m => (
          <button key={m.key} onClick={() => setMode(m.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode===m.key?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {m.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Enter probabilities as decimals (0 to 1) or percentages.</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">P(A)</label>
          <input type="number" value={pa} onChange={e=>setPa(e.target.value)} placeholder="0.0 – 1.0" min="0" max="1" step="0.01"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        {(mode==="union"||mode==="intersection"||mode==="conditional") && (
          <div>
            <label className="text-xs font-medium text-muted-foreground">P(B)</label>
            <input type="number" value={pb} onChange={e=>setPb(e.target.value)} placeholder="0.0 – 1.0" min="0" max="1" step="0.01"
              className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        )}
        {((mode==="union"&&!independent)||mode==="conditional") && (
          <div className="col-span-2">
            <label className="text-xs font-medium text-muted-foreground">P(A∩B)</label>
            <input type="number" value={pab} onChange={e=>setPab(e.target.value)} placeholder="0.0 – 1.0" min="0" max="1" step="0.01"
              className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        )}
        {(mode==="union"||mode==="intersection") && (
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer col-span-2">
            <input type="checkbox" checked={independent} onChange={e=>setIndependent(e.target.checked)} className="accent-primary w-4 h-4" />
            Events are independent
          </label>
        )}
      </div>
      {result !== null && (
        <div className="p-4 rounded-xl bg-muted border border-border">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-primary mt-1">{result.toFixed(6)}</p>
          <p className="text-sm text-muted-foreground mt-1">{(result*100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
