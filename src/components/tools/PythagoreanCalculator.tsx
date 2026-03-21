"use client";
import { useState } from "react";

export default function PythagoreanCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");

  const na = parseFloat(a), nb = parseFloat(b), nc = parseFloat(c);
  let result: {label:string;value:number}[] = [];
  let errorMsg = "";

  const validA = !isNaN(na) && na > 0;
  const validB = !isNaN(nb) && nb > 0;
  const validC = !isNaN(nc) && nc > 0;

  if (validA && validB && !c) {
    const hyp = Math.sqrt(na**2+nb**2);
    const area = 0.5*na*nb;
    const angA = Math.atan(na/nb)*(180/Math.PI);
    result = [{label:"c (hypotenuse)",value:hyp},{label:"Angle A",value:angA},{label:"Angle B",value:90-angA},{label:"Perimeter",value:na+nb+hyp},{label:"Area",value:area}];
  } else if (validA && validC && !b) {
    if (nc<=na) errorMsg="c must be greater than a";
    else { const side=Math.sqrt(nc**2-na**2); result=[{label:"b",value:side}]; }
  } else if (validB && validC && !a) {
    if (nc<=nb) errorMsg="c must be greater than b";
    else { const side=Math.sqrt(nc**2-nb**2); result=[{label:"a",value:side}]; }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Enter any two sides. Leave the unknown side blank.</p>
      <div className="grid grid-cols-3 gap-3">
        {[["a (leg)",a,setA],["b (leg)",b,setB],["c (hypotenuse)",c,setC]].map(([label,val,setter]) => (
          <div key={label as string}>
            <label className="text-xs font-medium text-muted-foreground">{label as string}</label>
            <input type="number" value={val as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)} placeholder="?"
              min="0" className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>
      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
      {result.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {result.map(r => (
            <div key={r.label} className="p-3 rounded-xl bg-muted border border-border">
              <p className="text-xs text-muted-foreground">{r.label}</p>
              <p className="text-lg font-bold text-primary">{r.value.toFixed(4)}{r.label.includes("Angle")?"°":""}</p>
            </div>
          ))}
        </div>
      )}
      {result.length === 0 && !errorMsg && <p className="text-sm text-muted-foreground">Enter two values above to calculate the third.</p>}
    </div>
  );
}
