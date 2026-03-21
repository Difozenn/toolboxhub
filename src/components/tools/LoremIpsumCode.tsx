"use client";
import { useState } from "react";
const snippets: Record<string, (n: number) => string> = {
  "JS Array": (n) => `const items = [\n${Array.from({length: n}, (_, i) => `  { id: ${i+1}, name: "Item ${i+1}", value: ${Math.floor(Math.random()*100)} }`).join(",\n")}\n];`,
  "JSON": (n) => JSON.stringify(Array.from({length: n}, (_, i) => ({ id: i+1, title: `Item ${i+1}`, description: `Description for item ${i+1}`, active: i % 2 === 0 })), null, 2),
  "SQL INSERT": (n) => `INSERT INTO items (id, name, value) VALUES\n${Array.from({length: n}, (_, i) => `  (${i+1}, 'Item ${i+1}', ${Math.floor(Math.random()*100)})`).join(",\n")};`,
  "CSS Variables": (n) => `:root {\n${Array.from({length: n}, (_, i) => `  --color-${i+1}: hsl(${Math.floor(360/n*i)}, 70%, 50%);`).join("\n")}\n}`,
  "HTML List": (n) => `<ul>\n${Array.from({length: n}, (_, i) => `  <li>List item ${i+1}</li>`).join("\n")}\n</ul>`,
  "TypeScript Interface": (n) => `interface Item {\n  id: number;\n  name: string;\n  value: number;\n  active: boolean;\n}\n\nconst items: Item[] = [\n${Array.from({length: n}, (_, i) => `  { id: ${i+1}, name: "Item ${i+1}", value: ${i*10}, active: ${i%2===0} }`).join(",\n")}\n];`,
};
export default function LoremIpsumCode() {
  const [type, setType] = useState("JSON");
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState("");
  const generate = () => setOutput(snippets[type](count));
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2"><label className="mb-1.5 block text-sm font-medium text-foreground">Snippet Type</label><select value={type} onChange={e => setType(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">{Object.keys(snippets).map(k => <option key={k}>{k}</option>)}</select></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Items</label><input type="number" min={1} max={50} value={count} onChange={e => setCount(Math.min(50, Math.max(1, parseInt(e.target.value)||5)))} className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      <button onClick={generate} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Generate Code</button>
      {output && (
        <div className="relative">
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute right-2 top-2 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground hover:text-foreground border border-border">Copy</button>
          <pre className="overflow-auto rounded-lg border border-border bg-muted p-4 pt-8 font-mono text-sm text-foreground">{output}</pre>
        </div>
      )}
    </div>
  );
}
