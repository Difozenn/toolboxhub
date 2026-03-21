"use client";
import { useState } from "react";

const NAMES = ["Sarah M.","James T.","Priya K.","Lucas W.","Aisha B.","Tom R.","Elena V.","Marcus D."];
const COMPANIES = ["Acme Corp","Startup Inc","Tech Co","Design Studio","Agency Ltd","Freelance"];
const ROLES = ["CEO","CTO","Product Manager","Designer","Developer","Marketing Lead","Founder"];
const SAAS_REVIEWS = [
  "This tool has completely transformed how our team works. The time savings alone paid for itself in the first week.",
  "Incredibly intuitive and powerful. Our productivity increased by 40% after switching.",
  "Best-in-class solution. I recommend it to every colleague who asks.",
  "The onboarding was seamless and the support team is outstanding. 10/10 would recommend.",
  "We evaluated 5 competitors and this was the clear winner. Couldn't be happier.",
];

function rand<T>(a: T[]): T { return a[Math.floor(Math.random()*a.length)]; }

interface Testimonial { name: string; company: string; role: string; rating: number; text: string; }

export default function SocialProofGenerator() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [count, setCount] = useState(3);

  function generate() {
    setTestimonials(Array.from({length: count}, () => ({
      name: rand(NAMES), company: rand(COMPANIES), role: rand(ROLES),
      rating: 4 + Math.round(Math.random()), text: rand(SAAS_REVIEWS),
    })));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-foreground">Count:</label>
        <input type="number" min={1} max={8} value={count} onChange={e=>setCount(+e.target.value)}
          className="w-16 p-2 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none" />
        <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          Generate
        </button>
      </div>
      <div className="space-y-3">
        {testimonials.map((t,i) => (
          <div key={i} className="p-4 rounded-xl bg-muted border border-border space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
              </div>
              <span className="text-yellow-400 text-sm">{"★".repeat(t.rating)}{"☆".repeat(5-t.rating)}</span>
            </div>
            <p className="text-sm text-foreground italic">"{t.text}"</p>
            <button onClick={() => navigator.clipboard.writeText(JSON.stringify(t, null, 2))}
              className="text-xs text-primary hover:underline">Copy JSON</button>
          </div>
        ))}
      </div>
    </div>
  );
}
