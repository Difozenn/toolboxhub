"use client";
import { useState } from "react";

const SECTIONS = ["Badges","Table of Contents","Features","Tech Stack","Prerequisites","Installation","Usage","Contributing","License","Contact"] as const;

export default function ReadmeGenerator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set(["Features","Installation","Usage","License"]));
  const [output, setOutput] = useState("");

  function toggle(s: string) {
    const next = new Set(selected);
    next.has(s) ? next.delete(s) : next.add(s);
    setSelected(next);
  }

  function generate() {
    let md = `# ${name || "Project Name"}\n\n${description || "A brief description of your project."}\n\n`;
    if (selected.has("Badges")) md += `![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Version](https://img.shields.io/badge/version-1.0.0-green.svg)\n\n`;
    if (selected.has("Features")) md += `## Features\n\n- ✅ Feature one\n- ✅ Feature two\n- ✅ Feature three\n\n`;
    if (selected.has("Tech Stack")) md += `## Tech Stack\n\n- **Frontend:** React, TypeScript, Tailwind CSS\n- **Backend:** Node.js, Express\n- **Database:** PostgreSQL\n\n`;
    if (selected.has("Prerequisites")) md += `## Prerequisites\n\n- Node.js >= 18\n- npm or pnpm\n\n`;
    if (selected.has("Installation")) md += `## Installation\n\n\`\`\`bash\ngit clone ${repoUrl || "https://github.com/user/repo.git"}\ncd ${name?.toLowerCase().replace(/ /g,"-") || "project"}\nnpm install\n\`\`\`\n\n`;
    if (selected.has("Usage")) md += `## Usage\n\n\`\`\`bash\nnpm run dev\n\`\`\`\n\nOpen [http://localhost:3000](http://localhost:3000) in your browser.\n\n`;
    if (selected.has("Contributing")) md += `## Contributing\n\nContributions are welcome! Please open an issue first to discuss changes.\n\n`;
    if (selected.has("License")) md += `## License\n\nDistributed under the MIT License. See \`LICENSE\` for more information.\n\n`;
    if (selected.has("Contact")) md += `## Contact\n\nProject Link: ${repoUrl || "https://github.com/user/repo"}\n`;
    setOutput(md);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[["Project Name",name,setName],["Description",description,setDescription],["GitHub URL",repoUrl,setRepoUrl]].map(([label,val,setter]) => (
          <div key={label as string} className={label==="Description"?"sm:col-span-2":""}>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">{label as string}</label>
            <input value={val as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)} placeholder={label as string}
              className="w-full p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map(s => (
          <button key={s} onClick={() => toggle(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selected.has(s)?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {s}
          </button>
        ))}
      </div>
      <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Generate README
      </button>
      {output && (
        <div className="relative">
          <pre className="p-3 rounded-xl bg-muted border border-border text-foreground font-mono text-xs whitespace-pre max-h-64 overflow-auto">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)}
            className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium">Copy</button>
        </div>
      )}
    </div>
  );
}
