"use client";

import { useState } from "react";

type Tone = "professional" | "casual" | "funny";

function generateBios(name: string, profession: string, interests: string[], tone: Tone): string[] {
  const interestStr = interests.slice(0, 3).join(", ");
  const interestEnd = interests.slice(0, 2).join(" & ");
  if (tone === "professional") return [
    `${name} is a ${profession} with a passion for ${interestStr}. Dedicated to delivering excellence and driving meaningful results.`,
    `As a ${profession}, ${name} combines expertise with a love for ${interestEnd}. Open to collaborations and new opportunities.`,
    `${profession} | ${name} | Passionate about ${interestStr}. Building things that matter, one step at a time.`,
  ];
  if (tone === "casual") return [
    `Hey, I'm ${name}! I work as a ${profession} and spend my free time on ${interestStr}. Always up for a good chat!`,
    `${name} here — ${profession} by day, ${interestEnd} enthusiast by night. Living my best life!`,
    `Just a ${profession} who loves ${interestStr}. Follow along for the ride!`,
  ];
  return [
    `${name}: professional ${profession}, part-time ${interestEnd} fanatic, full-time coffee addict. Send help.`,
    `They said I couldn't be a ${profession} who loves ${interestStr}. I showed them. (Still not sure what I showed them.)`,
    `${name} | ${profession} | Fluent in ${interests[0] || "sarcasm"} and ${interests[1] || "overthinking"}. DMs open, life closed.`,
  ];
}

export default function BioGenerator() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [interests, setInterests] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [bios, setBios] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    const interestArr = interests.split(",").map((s) => s.trim()).filter(Boolean);
    setBios(generateBios(name || "Your Name", profession || "Professional", interestArr.length ? interestArr : ["creativity"], tone));
  };

  const copy = async (bio: string, i: number) => {
    await navigator.clipboard.writeText(bio);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Your Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Johnson" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Profession</label>
            <input value={profession} onChange={(e) => setProfession(e.target.value)} placeholder="UX Designer" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Interests (comma separated)</label>
          <input value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="hiking, photography, cooking" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Tone</label>
          <select value={tone} onChange={(e) => setTone(e.target.value as Tone)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="funny">Funny</option>
          </select>
        </div>
        <button onClick={generate} className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">Generate Bios</button>
      </div>
      {bios.map((bio, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground">Option {i + 1}</span>
            <button onClick={() => copy(bio, i)} className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-primary hover:text-white transition-colors">{copied === i ? "Copied!" : "Copy"}</button>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{bio}</p>
        </div>
      ))}
    </div>
  );
}
