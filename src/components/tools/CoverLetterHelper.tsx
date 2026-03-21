"use client";

import { useState } from "react";

function generateCoverLetter(company: string, position: string, name: string, skills: string[]): string {
  const c = company || "the Company";
  const p = position || "the Position";
  const n = name || "Your Name";
  const s = skills.length ? skills : ["communication", "problem-solving", "teamwork"];
  const skillList = s.slice(0, 3).join(", ");
  const topSkill = s[0] || "relevant skills";

  return `Dear Hiring Manager,

I am writing to express my strong interest in the ${p} role at ${c}. Having developed expertise in ${skillList}, I am confident that my background aligns well with the requirements of this position and the values your organization upholds.

Throughout my career, I have consistently demonstrated the ability to deliver results through ${topSkill} and a commitment to continuous improvement. I thrive in collaborative environments and am passionate about contributing to teams that are driven by innovation and impact. I believe my skills and work ethic would allow me to make an immediate and meaningful contribution to ${c}.

I am particularly excited about the opportunity to bring my experience in ${skillList} to ${c}, and I look forward to the possibility of discussing how I can support your team's goals. Thank you for your time and consideration — I would welcome the chance to speak further.

Sincerely,
${n}`;
}

export default function CoverLetterHelper() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [copied, setCopied] = useState(false);

  const skillArr = skills.split(",").map((s) => s.trim()).filter(Boolean);
  const letter = generateCoverLetter(company, position, name, skillArr);

  const copy = async () => {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Company Name</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Corp" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Position / Role</label>
            <input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Marketing Manager" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Your Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Johnson" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Key Skills (comma separated)</label>
          <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="data analysis, project management, communication" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">Cover Letter</p>
          <button onClick={copy} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors">{copied ? "Copied!" : "Copy"}</button>
        </div>
        <pre className="rounded-xl border border-border bg-muted p-4 text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed overflow-x-auto">{letter}</pre>
      </div>
    </div>
  );
}
