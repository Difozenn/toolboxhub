"use client";
import { useState } from "react";
export default function CssFlexboxGenerator() {
  const [direction, setDirection] = useState("row");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [wrap, setWrap] = useState("nowrap");
  const [gap, setGap] = useState(8);
  const [items, setItems] = useState(4);
  const css = `.container {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  flex-wrap: ${wrap};\n  gap: ${gap}px;\n}`;
  const opts = {
    "Flex Direction": ["row", "row-reverse", "column", "column-reverse"],
    "Justify Content": ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
    "Align Items": ["stretch", "flex-start", "flex-end", "center", "baseline"],
    "Flex Wrap": ["nowrap", "wrap", "wrap-reverse"],
  };
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Flex Direction</label><select value={direction} onChange={e => setDirection(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none">{opts["Flex Direction"].map(o => <option key={o}>{o}</option>)}</select></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Justify Content</label><select value={justify} onChange={e => setJustify(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none">{opts["Justify Content"].map(o => <option key={o}>{o}</option>)}</select></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Align Items</label><select value={align} onChange={e => setAlign(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none">{opts["Align Items"].map(o => <option key={o}>{o}</option>)}</select></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Flex Wrap</label><select value={wrap} onChange={e => setWrap(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none">{opts["Flex Wrap"].map(o => <option key={o}>{o}</option>)}</select></div>
        <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-foreground">Gap</label><span className="text-sm text-muted-foreground">{gap}px</span></div><input type="range" min={0} max={40} value={gap} onChange={e => setGap(Number(e.target.value))} className="w-full accent-primary" /></div>
        <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-foreground">Items</label><span className="text-sm text-muted-foreground">{items}</span></div><input type="range" min={1} max={8} value={items} onChange={e => setItems(Number(e.target.value))} className="w-full accent-primary" /></div>
      </div>
      <div className="rounded-lg border-2 border-dashed border-border p-4" style={{ display: "flex", flexDirection: direction as any, justifyContent: justify, alignItems: align, flexWrap: wrap as any, gap }}>
        {Array.from({length: items}, (_, i) => <div key={i} className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm flex-shrink-0">{i+1}</div>)}
      </div>
      <div className="relative">
        <button onClick={() => navigator.clipboard.writeText(css)} className="absolute right-2 top-2 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground hover:text-foreground border border-border">Copy</button>
        <pre className="rounded-lg border border-border bg-muted p-4 pt-8 font-mono text-sm text-foreground">{css}</pre>
      </div>
    </div>
  );
}
