"use client";
import { useState } from "react";

export default function CircleCalculator() {
  const [inputType, setInputType] = useState("radius");
  const [value, setValue] = useState("");
  const [angle, setAngle] = useState("");

  const v = parseFloat(value);
  const valid = !isNaN(v) && v > 0;

  let r = 0;
  if (valid) {
    if (inputType==="radius") r = v;
    else if (inputType==="diameter") r = v/2;
    else if (inputType==="circumference") r = v/(2*Math.PI);
    else r = Math.sqrt(v/Math.PI);
  }

  const diameter = r*2;
  const circumference = 2*Math.PI*r;
  const area = Math.PI*r**2;
  const ang = parseFloat(angle);
  const arcLength = !isNaN(ang) && ang > 0 ? (ang/360)*circumference : null;
  const sectorArea = !isNaN(ang) && ang > 0 ? (ang/360)*area : null;

  const INPUTS = ["radius","diameter","circumference","area"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {INPUTS.map(t => (
          <button key={t} onClick={() => { setInputType(t); setValue(""); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${inputType===t?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            Known: {t}
          </button>
        ))}
      </div>
      <input type="number" value={value} onChange={e=>setValue(e.target.value)} placeholder={`Enter ${inputType}...`} min="0"
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      {valid && (
        <div className="grid grid-cols-2 gap-2">
          {[["Radius",r.toFixed(6)],["Diameter",diameter.toFixed(6)],["Circumference",circumference.toFixed(6)],["Area",area.toFixed(6)]].map(([label,val]) => (
            <div key={label} className="p-3 rounded-xl bg-muted border border-border">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-lg font-bold text-primary">{val}</p>
            </div>
          ))}
        </div>
      )}
      <div>
        <label className="text-xs font-medium text-muted-foreground">Sector angle (°) — optional</label>
        <input type="number" value={angle} onChange={e=>setAngle(e.target.value)} placeholder="e.g. 90" min="0" max="360"
          className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none" />
      </div>
      {arcLength !== null && sectorArea !== null && (
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-muted border border-border">
            <p className="text-xs text-muted-foreground">Arc Length</p>
            <p className="text-lg font-bold text-primary">{arcLength.toFixed(6)}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted border border-border">
            <p className="text-xs text-muted-foreground">Sector Area</p>
            <p className="text-lg font-bold text-primary">{sectorArea.toFixed(6)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
