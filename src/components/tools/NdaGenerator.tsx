"use client";

import { useState } from "react";

export default function NdaGenerator() {
  const [party1, setParty1] = useState("");
  const [party2, setParty2] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [purpose, setPurpose] = useState("");
  const [duration, setDuration] = useState("2 years");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setOutput(`NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of ${date} between:

DISCLOSING PARTY: ${party1 || "[Party 1 Name]"}
RECEIVING PARTY: ${party2 || "[Party 2 Name]"}

1. PURPOSE
The parties wish to explore a business relationship in connection with: ${purpose || "[describe purpose]"} ("Purpose").

2. CONFIDENTIAL INFORMATION
"Confidential Information" means any information disclosed by one party to the other party that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information.

3. OBLIGATIONS
The Receiving Party agrees to:
   a) Hold the Confidential Information in strict confidence
   b) Not disclose the Confidential Information to third parties
   c) Use the Confidential Information only for the Purpose
   d) Take reasonable measures to protect the confidentiality

4. EXCLUSIONS
Confidential Information does not include information that:
   a) Is or becomes publicly known through no breach of this Agreement
   b) Was rightfully known before disclosure
   c) Is independently developed without use of Confidential Information

5. TERM
This Agreement shall remain in effect for ${duration} from the date of this Agreement.

6. GOVERNING LAW
This Agreement shall be governed by applicable laws.

7. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties.

DISCLOSING PARTY: ${party1 || "____________________"}
Signature: ____________________
Date: ${date}

RECEIVING PARTY: ${party2 || "____________________"}
Signature: ____________________
Date: ${date}`);
  };

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Disclosing Party (Company/Name)", value: party1, set: setParty1 },
          { label: "Receiving Party (Company/Name)", value: party2, set: setParty2 },
        ].map(({ label, value, set }) => (
          <div key={label} className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <input type="text" value={value} onChange={(e) => set(e.target.value)} placeholder={label}
              className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
        ))}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Effective Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Duration</label>
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 2 years"
            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm font-medium text-muted-foreground">Purpose of Disclosure</label>
          <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. evaluating a potential business partnership"
            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Generate NDA</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">{copied ? "Copied!" : "Copy"}</button>}
      </div>
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-xs text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        Template only — consult a legal professional for legally binding NDAs.
      </div>
      {output && <textarea readOnly value={output} className="h-64 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm font-mono text-foreground focus:outline-none" />}
    </div>
  );
}
