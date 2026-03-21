"use client";
import { useState } from "react";

const FIRST = ["Alice","Bob","Carol","Dave","Emma","Frank","Grace","Henry","Iris","James"];
const LAST = ["Smith","Jones","Lee","Brown","Wilson","Taylor","Anderson","Harris","Clark","White"];
const DOMAINS = ["example.com","test.org","demo.io","sample.net"];
const LOREM = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore".split(" ");

type FieldType = "name"|"email"|"number"|"boolean"|"date"|"string"|"id";

const TYPES: FieldType[] = ["name","email","number","boolean","date","string","id"];

function rand<T>(a: T[]): T { return a[Math.floor(Math.random()*a.length)]; }
function genVal(type: FieldType, i: number): unknown {
  if (type==="name") return `${rand(FIRST)} ${rand(LAST)}`;
  if (type==="email") return `${rand(FIRST).toLowerCase()}${i}@${rand(DOMAINS)}`;
  if (type==="number") return Math.floor(Math.random()*1000);
  if (type==="boolean") return Math.random()>0.5;
  if (type==="date") return new Date(Date.now()-Math.random()*1e11).toISOString().split("T")[0];
  if (type==="id") return i+1;
  return rand(LOREM)+" "+rand(LOREM)+" "+rand(LOREM);
}

export default function LoremIpsumJson() {
  const [fields, setFields] = useState([{name:"id",type:"id" as FieldType},{name:"name",type:"name" as FieldType},{name:"email",type:"email" as FieldType}]);
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState("");

  function generate() {
    const data = Array.from({length: count}, (_,i) => Object.fromEntries(fields.map(f=>[f.name, genVal(f.type,i)])));
    setOutput(JSON.stringify(data, null, 2));
  }

  function updateField(i: number, key: "name"|"type", val: string) {
    const next = [...fields];
    next[i] = {...next[i], [key]: val as FieldType};
    setFields(next);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {fields.map((f,i) => (
          <div key={i} className="flex gap-2">
            <input value={f.name} onChange={e=>updateField(i,"name",e.target.value)} placeholder="field name"
              className="flex-1 p-2 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            <select value={f.type} onChange={e=>updateField(i,"type",e.target.value)}
              className="px-2 py-1.5 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none">
              {TYPES.map(t=><option key={t}>{t}</option>)}
            </select>
            <button onClick={()=>setFields(fields.filter((_,j)=>j!==i))} className="px-2 py-1 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground text-sm">✕</button>
          </div>
        ))}
        <button onClick={()=>setFields([...fields,{name:"field",type:"string"}])}
          className="text-sm text-primary hover:underline">+ Add field</button>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm text-foreground">Records:</label>
        <input type="number" min={1} max={100} value={count} onChange={e=>setCount(+e.target.value)}
          className="w-20 p-2 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none" />
        <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          Generate JSON
        </button>
      </div>
      {output && (
        <div className="relative">
          <pre className="p-3 rounded-xl bg-muted border border-border text-foreground font-mono text-xs overflow-auto max-h-64 whitespace-pre">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)}
            className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium">Copy</button>
        </div>
      )}
    </div>
  );
}
