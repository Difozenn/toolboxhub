"use client";
import { useState } from "react";
const templates: Record<string, string[]> = {
  Node: ["node_modules/", "dist/", "build/", ".env", ".env.local", ".env.*.local", "npm-debug.log*", "yarn-debug.log*", ".DS_Store", "*.log"],
  Python: ["__pycache__/", "*.py[cod]", "*.so", ".venv/", "venv/", "dist/", "build/", "*.egg-info/", ".env", ".pytest_cache/", "*.pyc"],
  React: ["node_modules/", "build/", ".env", ".env.local", ".env.development.local", ".env.test.local", ".env.production.local", "npm-debug.log*", ".DS_Store"],
  Java: ["*.class", "*.jar", "*.war", "*.ear", "target/", ".mvn/", "build/", ".gradle/", "*.iml", ".idea/", ".DS_Store"],
  Go: ["*.exe", "*.exe~", "*.dll", "*.so", "*.dylib", "vendor/", "*.test", "*.out", ".env"],
  "VS Code": [".vscode/*", "!.vscode/settings.json", "!.vscode/tasks.json", "!.vscode/launch.json", "!.vscode/extensions.json"],
  macOS: [".DS_Store", ".AppleDouble", ".LSOverride", "Icon", "._*", ".Spotlight-V100", ".Trashes"],
  Windows: ["Thumbs.db", "ehthumbs.db", "Desktop.ini", "$RECYCLE.BIN/", "*.cab", "*.msi", "*.msm", "*.msp"],
};
export default function GitignoreGenerator() {
  const [selected, setSelected] = useState<string[]>(["Node"]);
  const toggle = (t: string) => setSelected(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t]);
  const output = [...new Set(selected.flatMap(t => templates[t] || []))].join("\n");
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Select Technologies</label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(templates).map(t => (
            <button key={t} onClick={() => toggle(t)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${selected.includes(t) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">.gitignore Output</label>
        <textarea readOnly value={output} rows={14} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground" />
      </div>
      <button onClick={() => navigator.clipboard.writeText(output)} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Copy .gitignore</button>
    </div>
  );
}
