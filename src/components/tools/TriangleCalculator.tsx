"use client";
import { useState } from "react";

const DEG = Math.PI / 180;

export default function TriangleCalculator() {
  const [a, setA] = useState(""); const [b, setB] = useState(""); const [c, setC] = useState("");
  const [A, setAA] = useState(""); const [B, setBB] = useState(""); const [C, setCC] = useState("");

  const na=parseFloat(a), nb=parseFloat(b), nc=parseFloat(c);
  const nA=parseFloat(A), nB=parseFloat(B), nC=parseFloat(C);

  let results: {label:string;value:string}[] = [];
  let error = "";

  try {
    if (!isNaN(na)&&!isNaN(nb)&&!isNaN(nc)) {
      // SSS
      const cosA = (nb**2+nc**2-na**2)/(2*nb*nc);
      if (cosA < -1 || cosA > 1) throw new Error("Not a valid triangle");
      const angA = Math.acos(cosA)/DEG;
      const angB = Math.acos((na**2+nc**2-nb**2)/(2*na*nc))/DEG;
      const angC = 180-angA-angB;
      const area = 0.5*na*nb*Math.sin(angC*DEG);
      results = [{label:"Angle A",value:angA.toFixed(2)+"°"},{label:"Angle B",value:angB.toFixed(2)+"°"},{label:"Angle C",value:angC.toFixed(2)+"°"},{label:"Perimeter",value:(na+nb+nc).toFixed(4)},{label:"Area",value:area.toFixed(4)}];
    } else if (!isNaN(na)&&!isNaN(nb)&&!isNaN(nC)) {
      // SAS
      const side = Math.sqrt(na**2+nb**2-2*na*nb*Math.cos(nC*DEG));
      results = [{label:"c",value:side.toFixed(4)},{label:"Area",value:(0.5*na*nb*Math.sin(nC*DEG)).toFixed(4)}];
    } else if (!isNaN(nA)&&!isNaN(nB)&&!isNaN(na)) {
      // AAS/ASA
      const angC = 180-nA-nB;
      const side_b = na*Math.sin(nB*DEG)/Math.sin(nA*DEG);
      const side_c = na*Math.sin(angC*DEG)/Math.sin(nA*DEG);
      results = [{label:"b",value:side_b.toFixed(4)},{label:"c",value:side_c.toFixed(4)},{label:"C",value:angC.toFixed(2)+"°"},{label:"Area",value:(0.5*na*side_b*Math.sin(angC*DEG)).toFixed(4)}];
    }
  } catch(e) { error = (e as Error).message; }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Enter any combination of sides (a,b,c) and angles (A,B,C) to solve the triangle.</p>
      <div className="grid grid-cols-3 gap-2">
        {[["Side a",a,setA],["Side b",b,setB],["Side c",c,setC],["Angle A°",A,setAA],["Angle B°",B,setBB],["Angle C°",C,setCC]].map(([label,val,setter]) => (
          <div key={label as string}>
            <label className="text-xs font-medium text-muted-foreground">{label as string}</label>
            <input type="number" value={val as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)} placeholder="?"
              min="0" className="w-full mt-1 p-2 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {results.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {results.map(r => (
            <div key={r.label} className="p-3 rounded-xl bg-muted border border-border">
              <p className="text-xs text-muted-foreground">{r.label}</p>
              <p className="text-lg font-bold text-primary">{r.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
