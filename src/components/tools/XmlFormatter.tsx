"use client";
import { useState } from "react";
function formatXml(xml: string): string {
  let formatted = "", indent = "";
  const tab = "  ";
  xml.split(/>\s*</).forEach(node => {
    if (node.match(/^\/\w/)) indent = indent.slice(tab.length);
    formatted += indent + "<" + node + ">\n";
    if (node.match(/^<?\w[^/]*[^/]$/) && !node.startsWith("?") && !node.startsWith("!")) indent += tab;
  });
  return formatted.slice(1, -2);
}
export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const handleFormat = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input.trim(), "application/xml");
      const parseError = doc.querySelector("parsererror");
      if (parseError) { setError("Invalid XML: " + parseError.textContent?.slice(0, 100)); setOutput(""); return; }
      setError("");
      setOutput(formatXml(input.trim()));
    } catch (e) { setError("Failed to parse XML"); }
  };
  const handleMinify = () => { setOutput(input.replace(/>\s+</g, "><").trim()); setError(""); };
  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} placeholder="Paste your XML here..." className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      <div className="flex gap-3">
        <button onClick={handleFormat} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Format XML</button>
        <button onClick={handleMinify} className="rounded-lg bg-muted px-5 py-2 text-sm font-medium text-foreground hover:bg-muted/80 border border-border">Minify</button>
        <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="rounded-lg bg-muted px-5 py-2 text-sm font-medium text-foreground hover:bg-muted/80 border border-border">Clear</button>
      </div>
      {error && <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      {output && (
        <div className="relative">
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute right-2 top-2 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground hover:text-foreground">Copy</button>
          <pre className="overflow-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">{output}</pre>
        </div>
      )}
    </div>
  );
}
