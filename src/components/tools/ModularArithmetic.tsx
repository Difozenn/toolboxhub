"use client";
import { useState } from "react";

type Mode = "modulo"|"inverse"|"exponentiation"|"congruence";

function gcd(a: number, b: number): number { return b===0?a:gcd(b,a%b); }

function modInverse(a: number, m: number): number | null {
  if (gcd(a, m) !== 1) return null;
  for (let x = 1; x < m; x++) if ((a*x)%m===1) return x;
  return null;
}

function modPow(base: number, exp: number, mod: number): number {
  let result = 1; base = base%mod;
  while (exp > 0) {
    if (exp%2===1) result = (result*base)%mod;
    exp = Math.floor(exp/2); base=(base*base)%mod;
  }
  return result;
}

export default function ModularArithmetic() {
  const [mode, setMode] = useState<Mode>("modulo");
  const [a, setA] = useState(""); const [b, setB] = useState(""); const [m, setM] = useState("");
  const na=parseInt(a), nb=parseInt(b), nm=parseInt(m);
  const validA = !isNaN(na), validM = !isNaN(nm)&&nm>1;

  let result: string | null = null;
  if (mode==="modulo"&&validA&&validM) result = String(((na%nm)+nm)%nm);
  else if (mode==="inverse"&&validA&&validM) { const inv=modInverse(((na%nm)+nm)%nm,nm); result=inv!==null?String(inv):`No inverse — gcd(${na},${nm}) ≠ 1`; }
  else if (mode==="exponentiation"&&validA&&!isNaN(nb)&&validM) result = String(modPow(((na%nm)+nm)%nm,nb,nm));
  else if (mode==="congruence"&&validA&&!isNaN(nb)&&validM) { const lhs=((na%nm)+nm)%nm, rhs=((nb%nm)+nm)%nm; result=lhs===rhs?`${na} ≡ ${nb} (mod ${nm}) ✓`:`${na} ≢ ${nb} (mod ${nm}) ✗`; }

  const MODES: {key:Mode;label:string}[] = [{key:"modulo",label:"a mod n"},{key:"inverse",label:"Modular Inverse"},{key:"exponentiation",label:"Mod Exponentiation"},{key:"congruence",label:"Congruence Check"}];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map(mo => (
          <button key={mo.key} onClick={() => setMode(mo.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode===mo.key?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {mo.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">a</label>
          <input type="number" value={a} onChange={e=>setA(e.target.value)} placeholder="a"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        {(mode==="exponentiation"||mode==="congruence") && (
          <div>
            <label className="text-xs font-medium text-muted-foreground">{mode==="congruence"?"b":"exponent"}</label>
            <input type="number" value={b} onChange={e=>setB(e.target.value)} placeholder={mode==="congruence"?"b":"exp"}
              className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        )}
        <div>
          <label className="text-xs font-medium text-muted-foreground">modulus (n)</label>
          <input type="number" value={m} onChange={e=>setM(e.target.value)} placeholder="n" min="2"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <div className="p-4 rounded-xl bg-muted border border-border">
        <p className="text-xs text-muted-foreground">Result</p>
        <p className="text-2xl font-bold text-primary mt-1 font-mono">{result ?? "—"}</p>
      </div>
    </div>
  );
}
