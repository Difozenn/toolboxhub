"use client";

import { useState } from "react";

export default function EmailSignatureGenerator() {
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("Software Engineer");
  const [company, setCompany] = useState("Acme Inc.");
  const [phone, setPhone] = useState("+1 555 000 0000");
  const [email, setEmail] = useState("john@example.com");
  const [website, setWebsite] = useState("https://example.com");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [copied, setCopied] = useState(false);

  const html = `<table style="font-family:Arial,sans-serif;font-size:14px;color:#333;border-collapse:collapse;">
  <tr>
    <td style="padding:0 16px 0 0;border-right:3px solid #6366f1;vertical-align:top;">
      <strong style="font-size:16px;color:#111;">${name}</strong><br>
      <span style="color:#6366f1;">${title}</span><br>
      <strong>${company}</strong>
    </td>
    <td style="padding:0 0 0 16px;vertical-align:top;font-size:13px;line-height:1.8;">
      ${phone ? `<a href="tel:${phone}" style="color:#333;text-decoration:none;">${phone}</a><br>` : ""}
      ${email ? `<a href="mailto:${email}" style="color:#6366f1;">${email}</a><br>` : ""}
      ${website ? `<a href="${website}" style="color:#6366f1;">${website}</a><br>` : ""}
      ${linkedin ? `<a href="${linkedin}" style="color:#0077b5;">LinkedIn</a>${twitter ? " · " : ""}` : ""}
      ${twitter ? `<a href="${twitter}" style="color:#1da1f2;">Twitter</a>` : ""}
    </td>
  </tr>
</table>`;

  const copy = async () => { await navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Full Name", value: name, set: setName },
          { label: "Job Title", value: title, set: setTitle },
          { label: "Company", value: company, set: setCompany },
          { label: "Phone", value: phone, set: setPhone },
          { label: "Email", value: email, set: setEmail },
          { label: "Website", value: website, set: setWebsite },
          { label: "LinkedIn URL", value: linkedin, set: setLinkedin },
          { label: "Twitter URL", value: twitter, set: setTwitter },
        ].map(({ label, value, set }) => (
          <div key={label} className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <input type="text" value={value} onChange={(e) => set(e.target.value)}
              className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Preview:</p>
        <div className="rounded-xl border border-border bg-background p-4" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div className="flex gap-2">
        <button onClick={copy} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">{copied ? "Copied HTML!" : "Copy HTML"}</button>
      </div>
      <textarea readOnly value={html} className="h-32 w-full resize-y rounded-xl border border-border bg-muted p-3 font-mono text-xs text-foreground focus:outline-none" />
    </div>
  );
}
