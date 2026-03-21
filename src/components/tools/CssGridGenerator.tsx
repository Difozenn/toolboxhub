"use client";
import { useState } from "react";
export default function CssGridGenerator() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(2);
  const [colGap, setColGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);
  const [colDef, setColDef] = useState("1fr");
  const [rowDef, setRowDef] = useState("auto");
  const gridCols = Array(cols).fill(colDef).join(" ");
  const gridRows = Array(rows).fill(rowDef).join(" ");
  const css = `.grid-container {\n  display: grid;\n  grid-template-columns: ${gridCols};\n  grid-template-rows: ${gridRows};\n  column-gap: ${colGap}px;\n  row-gap: ${rowGap}px;\n}`;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-foreground">Columns</label><span className="text-sm text-muted-foreground">{cols}</span></div><input type="range" min={1} max={6} value={cols} onChange={e => setCols(Number(e.target.value))} className="w-full accent-primary" /></div>
        <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-foreground">Rows</label><span className="text-sm text-muted-foreground">{rows}</span></div><input type="range" min={1} max={5} value={rows} onChange={e => setRows(Number(e.target.value))} className="w-full accent-primary" /></div>
        <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-foreground">Column Gap</label><span className="text-sm text-muted-foreground">{colGap}px</span></div><input type="range" min={0} max={48} value={colGap} onChange={e => setColGap(Number(e.target.value))} className="w-full accent-primary" /></div>
        <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-foreground">Row Gap</label><span className="text-sm text-muted-foreground">{rowGap}px</span></div><input type="range" min={0} max={48} value={rowGap} onChange={e => setRowGap(Number(e.target.value))} className="w-full accent-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Column Size</label><select value={colDef} onChange={e => setColDef(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none"><option value="1fr">1fr (equal)</option><option value="auto">auto</option><option value="200px">200px</option><option value="minmax(100px, 1fr)">minmax(100px, 1fr)</option></select></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Row Size</label><select value={rowDef} onChange={e => setRowDef(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none"><option value="auto">auto</option><option value="1fr">1fr</option><option value="100px">100px</option><option value="150px">150px</option></select></div>
      </div>
      <div className="overflow-hidden rounded-lg border-2 border-dashed border-border p-4" style={{ display: "grid", gridTemplateColumns: gridCols, gridTemplateRows: gridRows, columnGap: colGap, rowGap: rowGap }}>
        {Array.from({length: cols * rows}, (_, i) => <div key={i} className="flex min-h-[60px] items-center justify-center rounded-lg bg-primary/20 text-sm font-medium text-foreground">{i+1}</div>)}
      </div>
      <div className="relative">
        <button onClick={() => navigator.clipboard.writeText(css)} className="absolute right-2 top-2 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground hover:text-foreground border border-border">Copy</button>
        <pre className="rounded-lg border border-border bg-muted p-4 pt-8 font-mono text-sm text-foreground">{css}</pre>
      </div>
    </div>
  );
}
