"use client";
import { useState } from "react";

const SHAPES = {
  Square:      {fields:["Side"],formula:"s²",calc:(v:number[])=>v[0]**2},
  Rectangle:   {fields:["Width","Height"],formula:"w × h",calc:(v:number[])=>v[0]*v[1]},
  Circle:      {fields:["Radius"],formula:"π × r²",calc:(v:number[])=>Math.PI*v[0]**2},
  Triangle:    {fields:["Base","Height"],formula:"½ × b × h",calc:(v:number[])=>0.5*v[0]*v[1]},
  Parallelogram:{fields:["Base","Height"],formula:"b × h",calc:(v:number[])=>v[0]*v[1]},
  Trapezoid:   {fields:["Base a","Base b","Height"],formula:"½(a+b) × h",calc:(v:number[])=>0.5*(v[0]+v[1])*v[2]},
  Ellipse:     {fields:["Semi-major axis","Semi-minor axis"],formula:"π × a × b",calc:(v:number[])=>Math.PI*v[0]*v[1]},
};

export default function AreaCalculator() {
  const [shape, setShape] = useState("Rectangle");
  const [values, setValues] = useState<string[]>(["","",""]);
  const s = SHAPES[shape as keyof typeof SHAPES];
  const nums = values.slice(0,s.fields.length).map(Number);
  const valid = nums.every(n=>!isNaN(n)&&n>0);
  const area = valid ? s.calc(nums) : null;

  function setVal(i: number, v: string) {
    const next = [...values]; next[i] = v; setValues(next);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(SHAPES).map(sh => (
          <button key={sh} onClick={() => { setShape(sh); setValues(["","",""]); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${shape===sh?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {sh}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {s.fields.map((f,i) => (
          <div key={f}>
            <label className="text-xs font-medium text-muted-foreground">{f}</label>
            <input type="number" value={values[i]||""} onChange={e=>setVal(i,e.target.value)} placeholder="0" min="0"
              className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-muted border border-border flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Area ({s.formula}) =</span>
        <span className="text-2xl font-bold text-primary">{area !== null ? area.toLocaleString(undefined,{maximumFractionDigits:4}) : "—"}</span>
      </div>
    </div>
  );
}
