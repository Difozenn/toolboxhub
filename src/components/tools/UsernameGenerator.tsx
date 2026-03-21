"use client";
import { useState } from "react";

const ADJ = ["Shadow","Swift","Dark","Iron","Storm","Silver","Golden","Blazing","Frost","Neon","Turbo","Cyber"];
const NOUNS = ["Wolf","Blade","Fox","Eagle","Hawk","Rider","Coder","Ninja","Pixel","Ghost","Titan","Byte"];
const CUTE_ADJ = ["Fluffy","Bubbly","Sparkly","Sunny","Cozy","Happy","Lucky","Tiny","Zesty","Breezy"];
const CUTE_NOUNS = ["Bunny","Panda","Cookie","Muffin","Cloud","Peach","Berry","Daisy","Kitten","Bloom"];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random()*arr.length)]; }

function generate(style: string, count: number): string[] {
  const names: string[] = [];
  for (let i=0;i<count;i++) {
    const num = Math.floor(Math.random()*999)+1;
    if (style==="gamer") names.push(`${rand(ADJ)}${rand(NOUNS)}${num}`);
    else if (style==="pro") names.push(`${rand(NOUNS).toLowerCase()}_${rand(ADJ).toLowerCase()}`);
    else if (style==="cute") names.push(`${rand(CUTE_ADJ).toLowerCase()}${rand(CUTE_NOUNS)}${num}`);
    else names.push(`${rand(ADJ)}${rand(NOUNS)}${Math.floor(Math.random()*99)}`);
  }
  return names;
}

export default function UsernameGenerator() {
  const [style, setStyle] = useState("gamer");
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState("");

  function copy(name: string) { navigator.clipboard.writeText(name); setCopied(name); setTimeout(()=>setCopied(""),2000); }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {["gamer","pro","cute","random"].map(s => (
          <button key={s} onClick={() => setStyle(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${style===s?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {s}
          </button>
        ))}
      </div>
      <button onClick={() => setResults(generate(style, 8))}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Generate Usernames
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {results.map(name => (
          <button key={name} onClick={() => copy(name)}
            className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-colors text-left ${copied===name?"border-primary bg-primary/10":"border-border bg-muted hover:bg-muted/80"}`}>
            <span className="text-foreground font-mono text-sm">{name}</span>
            <span className="text-xs text-muted-foreground">{copied===name?"Copied!":"Click to copy"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
