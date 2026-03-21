"use client";
import { useState } from "react";

const LICENSES: Record<string, string> = {
  "MIT": `MIT License\n\nCopyright (c) {{YEAR}} {{AUTHOR}}\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.`,
  "Apache 2.0": `Apache License, Version 2.0\n\nCopyright {{YEAR}} {{AUTHOR}}\n\nLicensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at\n\nhttp://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND.`,
  "GPL v3": `GNU GENERAL PUBLIC LICENSE\nVersion 3, 29 June 2007\n\nCopyright (C) {{YEAR}} {{AUTHOR}}\n\nThis program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.`,
  "ISC": `ISC License\n\nCopyright (c) {{YEAR}} {{AUTHOR}}\n\nPermission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.\n\nTHE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES.`,
  "BSD 2-Clause": `BSD 2-Clause License\n\nCopyright (c) {{YEAR}}, {{AUTHOR}}\nAll rights reserved.\n\nRedistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:\n\n1. Redistributions of source code must retain the above copyright notice.\n2. Redistributions in binary form must reproduce the above copyright notice.`,
};

export default function LicenseGenerator() {
  const [license, setLicense] = useState("MIT");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));

  const output = LICENSES[license]
    .replace(/{{YEAR}}/g, year || String(new Date().getFullYear()))
    .replace(/{{AUTHOR}}/g, author || "Your Name");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(LICENSES).map(l => (
          <button key={l} onClick={() => setLicense(l)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${license===l?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Copyright Holder</label>
          <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Your Name"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Year</label>
          <input value={year} onChange={e=>setYear(e.target.value)} placeholder="2024"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <div className="relative">
        <pre className="p-3 rounded-xl bg-muted border border-border text-foreground text-xs whitespace-pre-wrap max-h-48 overflow-auto">{output}</pre>
        <button onClick={() => navigator.clipboard.writeText(output)}
          className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium">Copy</button>
      </div>
    </div>
  );
}
