"use client";
import { useState } from "react";

export default function TermsGenerator() {
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [jurisdiction, setJurisdiction] = useState("England and Wales");
  const [output, setOutput] = useState("");

  function generate() {
    const date = new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
    setOutput(`TERMS OF SERVICE\n\nLast updated: ${date}\n\n1. ACCEPTANCE OF TERMS\nBy accessing ${product || "this service"} at ${url || "our website"}, you agree to be bound by these Terms of Service.\n\n2. USE OF SERVICE\nYou may use ${product || "the Service"} only for lawful purposes. You agree not to use the Service in any way that violates applicable local, national, or international laws.\n\n3. INTELLECTUAL PROPERTY\nAll content, features, and functionality of ${product || "the Service"} are owned by ${company || "the Company"} and are protected by applicable intellectual property laws.\n\n4. DISCLAIMER\nTHE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. ${company?.toUpperCase() || "THE COMPANY"} MAKES NO WARRANTY THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.\n\n5. LIMITATION OF LIABILITY\nTo the maximum extent permitted by law, ${company || "the Company"} shall not be liable for any indirect, incidental, or consequential damages.\n\n6. GOVERNING LAW\nThese Terms shall be governed by the laws of ${jurisdiction}.\n\n7. CONTACT\nFor questions, contact: ${email || "legal@example.com"}`);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[["Company Name",company,setCompany],["Product Name",product,setProduct],["Website URL",url,setUrl],["Contact Email",email,setEmail]].map(([label,val,setter]) => (
          <div key={label as string}>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">{label as string}</label>
            <input value={val as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)} placeholder={label as string}
              className="w-full p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Jurisdiction</label>
        <select value={jurisdiction} onChange={e=>setJurisdiction(e.target.value)}
          className="w-full p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none">
          {["England and Wales","United States (California)","United States (Delaware)","Canada (Ontario)","Australia (NSW)"].map(j=><option key={j}>{j}</option>)}
        </select>
      </div>
      <p className="text-xs text-muted-foreground">⚠ For reference only. Consult a lawyer before publishing.</p>
      <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Generate Terms
      </button>
      {output && (
        <div className="relative">
          <pre className="p-3 rounded-xl bg-muted border border-border text-foreground text-xs whitespace-pre-wrap max-h-64 overflow-auto">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)}
            className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium">Copy</button>
        </div>
      )}
    </div>
  );
}
