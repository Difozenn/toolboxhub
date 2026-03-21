"use client";

import { useState } from "react";

export default function TermsOfServiceGenerator() {
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    setOutput(`TERMS OF SERVICE

Last updated: ${today}

1. ACCEPTANCE OF TERMS

By accessing and using ${website || "this website"}, you accept and agree to be bound by the terms and provision of this agreement.

2. USE LICENSE

Permission is granted to temporarily access ${company || "our"} materials for personal, non-commercial transitory viewing only.

3. DISCLAIMER

The materials on ${company || "our"} website are provided on an 'as is' basis. ${company || "We"} make no warranties, expressed or implied, and hereby disclaim all other warranties.

4. LIMITATIONS

In no event shall ${company || "we"} be liable for any damages arising out of the use or inability to use the materials on ${website || "this website"}.

5. PRIVACY POLICY

Your use of this website is also governed by our Privacy Policy.

6. GOVERNING LAW

These terms shall be governed by and construed in accordance with applicable laws.

7. CHANGES TO TERMS

${company || "We"} reserve the right to modify these terms at any time. Please review this page periodically for changes.

8. CONTACT INFORMATION

If you have any questions, contact us at: ${email || "contact@example.com"}`);
  };

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Company Name", value: company, set: setCompany, placeholder: "Acme Inc." },
          { label: "Website URL", value: website, set: setWebsite, placeholder: "https://example.com" },
          { label: "Contact Email", value: email, set: setEmail, placeholder: "legal@example.com" },
        ].map(({ label, value, set, placeholder }) => (
          <div key={label} className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <input type="text" value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder}
              className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Generate ToS</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : "Copy"}</button>}
      </div>
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-xs text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        This template is for informational purposes only. Consult a legal professional for proper Terms of Service.
      </div>
      {output && <textarea readOnly value={output} className="h-64 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm text-foreground focus:outline-none" />}
    </div>
  );
}
