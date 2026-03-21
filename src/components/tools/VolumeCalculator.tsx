"use client";
import { useState } from "react";

const SHAPES = {
  Cube:        {fields:["Side"],formula:"s³",calc:(v:number[])=>v[0]**3},
  Cuboid:      {fields:["Length","Width","Height"],formula:"l × w × h",calc:(v:number[])=>v[0]*v[1]*v[2]},
  Sphere:      {fields:["Radius"],formula:"4/3 × π × r³",calc:(v:number[])=>(4/3)*Math.PI*v[0]**3},
  Cylinder:    {fields:["Radius","Height"],formula:"π × r² × h",calc:(v:number[])=>Math.PI*v[0]**2*v[1]},
  Cone:        {fields:["Radius","Height"],formula:"1/3 × π × r² × h",calc:(v:number[])=>(1/3)*Math.PI*v[0]**2*v[1]},
  "Square Pyramid":{fields:["Base Side","Height"],formula:"1/3 × a² × h",calc:(v:number[])=>(1/3)*v[0]**2*v[1]},
  Ellipsoid:   {fields:["a","b","c"],formula:"4/3 × π × a × b × c",calc:(v:number[])=>(4/3)*Math.PI*v[0]*v[1]*v[2]},
};

export default function VolumeCalculator() {
  const [shape, setShape] = useState("Cuboid");
  const [values, setValues] = useState<string[]>(["","","",""]);
  const s = SHAPES[shape as keyof typeof SHAPES];
  const nums = values.slice(0,s.fields.length).map(Number);
  const valid = nums.every(n=>!isNaN(n)&&n>0);
  const volume = valid ? s.calc(nums) : null;

  function setVal(i: number, v: string) { const next=[...values]; next[i]=v; setValues(next); }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(SHAPES).map(sh => (
          <button key={sh} onClick={() => { setShape(sh); setValues(["","","",""]); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${shape===sh?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {sh}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {s.fields.map((f,i) => (
          <div key={f}>
            <label className="text-xs font-medium text-muted-foreground">{f}</label>
            <input type="number" value={values[i]||""} onChange={e=>setVal(i,e.target.value)} placeholder="0" min="0"
              className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-muted border border-border flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Volume ({s.formula}) =</span>
        <span className="text-2xl font-bold text-primary">{volume !== null ? volume.toLocaleString(undefined,{maximumFractionDigits:4}) : "—"}</span>
      </div>
    </div>
  );
}
