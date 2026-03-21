"use client";
import { useState } from "react";
const presets: Record<string, string> = {
  Fade: `@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`,
  Slide: `@keyframes slideIn {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}`,
  Bounce: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}`,
  Spin: `@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
  Pulse: `@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}`,
  Shake: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}`,
};
export default function CssAnimationGenerator() {
  const [preset, setPreset] = useState("Fade");
  const [name, setName] = useState("fadeIn");
  const [duration, setDuration] = useState("1s");
  const [timing, setTiming] = useState("ease");
  const [iteration, setIteration] = useState("1");
  const [delay, setDelay] = useState("0s");
  const keyframe = presets[preset];
  const usage = `.element {\n  animation: ${name} ${duration} ${timing} ${delay} ${iteration};\n}`;
  const full = `${keyframe}\n\n${usage}`;
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Preset Animation</label>
        <div className="flex flex-wrap gap-2">{Object.keys(presets).map(p => <button key={p} onClick={() => { setPreset(p); setName(p.toLowerCase()); }} className={`rounded-lg px-4 py-2 text-sm font-medium ${preset === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"}`}>{p}</button>)}</div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Duration</label><input value={duration} onChange={e => setDuration(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Timing Function</label><select value={timing} onChange={e => setTiming(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"><option>ease</option><option>linear</option><option>ease-in</option><option>ease-out</option><option>ease-in-out</option></select></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Iteration</label><input value={iteration} onChange={e => setIteration(e.target.value)} placeholder="1 or infinite" className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Delay</label><input value={delay} onChange={e => setDelay(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      <div className="relative">
        <button onClick={() => navigator.clipboard.writeText(full)} className="absolute right-2 top-2 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground hover:text-foreground border border-border">Copy</button>
        <pre className="overflow-auto rounded-lg border border-border bg-muted p-4 pt-8 font-mono text-sm text-foreground">{full}</pre>
      </div>
    </div>
  );
}
