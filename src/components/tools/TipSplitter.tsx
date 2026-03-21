"use client";
import { useState } from "react";

export default function TipSplitter() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(18);
  const [people, setPeople] = useState(2);

  const billNum = parseFloat(bill) || 0;
  const tipAmount = billNum * (tip / 100);
  const total = billNum + tipAmount;
  const perPerson = total / people;
  const tipPerPerson = tipAmount / people;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-muted-foreground">Bill Amount ($)</label>
        <input type="number" value={bill} onChange={e=>setBill(e.target.value)} placeholder="0.00" min="0" step="0.01"
          className="w-full mt-1 p-3 rounded-xl border border-border bg-muted text-foreground text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Tip: {tip}%</label>
        <div className="flex gap-2 mb-2">
          {[10, 15, 18, 20, 25].map(p => (
            <button key={p} onClick={() => setTip(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex-1 ${tip===p?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
              {p}%
            </button>
          ))}
        </div>
        <input type="range" min={0} max={50} value={tip} onChange={e=>setTip(+e.target.value)} className="w-full accent-primary" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Number of People: {people}</label>
        <input type="range" min={1} max={20} value={people} onChange={e=>setPeople(+e.target.value)} className="w-full mt-1 accent-primary" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[["Tip Amount",tipAmount],["Total Bill",total],["Tip / Person",tipPerPerson],["Total / Person",perPerson]].map(([label,val]) => (
          <div key={label as string} className={`p-3 rounded-xl bg-muted border border-border ${(label as string).includes("Person")?"border-primary/50":""}`}>
            <p className="text-xs text-muted-foreground">{label as string}</p>
            <p className={`text-xl font-bold ${(label as string).includes("Person")?"text-primary":"text-foreground"}`}>
              ${(val as number).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
