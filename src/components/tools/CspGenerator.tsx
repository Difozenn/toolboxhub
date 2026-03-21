"use client";

import { useState } from "react";

const DIRECTIVES = [
  { key: "default-src", label: "default-src", desc: "Fallback for most directives" },
  { key: "script-src", label: "script-src", desc: "JavaScript sources" },
  { key: "style-src", label: "style-src", desc: "CSS stylesheet sources" },
  { key: "img-src", label: "img-src", desc: "Image sources" },
  { key: "font-src", label: "font-src", desc: "Font sources" },
  { key: "connect-src", label: "connect-src", desc: "XHR/fetch/WebSocket" },
  { key: "frame-src", label: "frame-src", desc: "iframe/frame sources" },
];

export default function CspGenerator() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(Object.fromEntries(DIRECTIVES.map((d) => [d.key, false])));
  const [values, setValues] = useState<Record<string, string>>(Object.fromEntries(DIRECTIVES.map((d) => [d.key, "'self'"])));
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const parts = DIRECTIVES.filter((d) => enabled[d.key]).map((d) => `${d.key} ${values[d.key]}`);
    if (parts.length === 0) { setOutput(""); return; }
    setOutput(`Content-Security-Policy: ${parts.join("; ")}`);
  };

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {DIRECTIVES.map((d) => (
          <div key={d.key} className="rounded-xl border border-border bg-muted p-3">
            <div className="flex items-start gap-3">
              <input type="checkbox" id={d.key} checked={enabled[d.key]} onChange={(e) => setEnabled((p) => ({ ...p, [d.key]: e.target.checked }))}
                className="mt-0.5 rounded" />
              <div className="flex-1">
                <label htmlFor={d.key} className="text-sm font-mono font-semibold text-primary cursor-pointer">{d.label}</label>
                <p className="text-xs text-muted-foreground">{d.desc}</p>
                {enabled[d.key] && (
                  <input type="text" value={values[d.key]} onChange={(e) => setValues((p) => ({ ...p, [d.key]: e.target.value }))}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground focus:border-primary focus:outline-none" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Generate CSP</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">{copied ? "Copied!" : "Copy Header"}</button>}
      </div>
      {output && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="font-mono text-xs text-foreground break-all">{output}</p>
        </div>
      )}
    </div>
  );
}
