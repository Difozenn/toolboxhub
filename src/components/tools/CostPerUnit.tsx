"use client";
import { useState } from "react";

interface Item { price: string; quantity: string; label: string; }

export default function CostPerUnit() {
  const [items, setItems] = useState<Item[]>([{price:"",quantity:"",label:"Option 1"},{price:"",quantity:"",label:"Option 2"}]);

  function update(i: number, k: keyof Item, v: string) {
    const next = [...items]; next[i]={...next[i],[k]:v}; setItems(next);
  }

  const cpus = items.map(it => {
    const p=parseFloat(it.price), q=parseFloat(it.quantity);
    return (!isNaN(p)&&!isNaN(q)&&q>0) ? p/q : null;
  });
  const minCpu = Math.min(...cpus.filter((v): v is number => v !== null));

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((it,i) => (
          <div key={i} className={`p-3 rounded-xl border ${cpus[i]!==null&&cpus[i]===minCpu?"border-primary bg-primary/5":"border-border bg-muted"}`}>
            <div className="flex items-center gap-2 mb-2">
              <input value={it.label} onChange={e=>update(i,"label",e.target.value)}
                className="flex-1 p-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none" />
              {i>1&&<button onClick={()=>setItems(items.filter((_,j)=>j!==i))} className="text-muted-foreground hover:text-foreground text-sm px-2">✕</button>}
              {cpus[i]!==null&&cpus[i]===minCpu&&<span className="text-xs text-primary font-bold px-2 py-0.5 rounded-full bg-primary/10">Best Value</span>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Total Price ($)</label>
                <input type="number" value={it.price} onChange={e=>update(i,"price",e.target.value)} placeholder="0.00" min="0" step="0.01"
                  className="w-full mt-1 p-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Quantity (units)</label>
                <input type="number" value={it.quantity} onChange={e=>update(i,"quantity",e.target.value)} placeholder="1" min="0"
                  className="w-full mt-1 p-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none" />
              </div>
            </div>
            {cpus[i]!==null&&<p className="text-sm font-semibold text-foreground mt-2">Cost per unit: <span className="text-primary">${cpus[i]!.toFixed(4)}</span></p>}
          </div>
        ))}
      </div>
      {items.length < 6 && (
        <button onClick={()=>setItems([...items,{price:"",quantity:"",label:`Option ${items.length+1}`}])}
          className="text-sm text-primary hover:underline">+ Add option</button>
      )}
    </div>
  );
}
