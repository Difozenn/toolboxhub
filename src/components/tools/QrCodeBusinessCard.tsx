"use client";

import { useState } from "react";

export default function QrCodeBusinessCard() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [copied, setCopied] = useState(false);

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:${company}
TITLE:${title}
TEL:${phone}
EMAIL:${email}
URL:${website}
END:VCARD`.trim();

  const qrUrl = name ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(vcard)}` : "";

  const copy = async () => {
    await navigator.clipboard.writeText(vcard);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Full Name", value: name, set: setName, placeholder: "John Doe" },
          { label: "Job Title", value: title, set: setTitle, placeholder: "Software Engineer" },
          { label: "Company", value: company, set: setCompany, placeholder: "Acme Inc." },
          { label: "Phone", value: phone, set: setPhone, placeholder: "+1 555 000 0000" },
          { label: "Email", value: email, set: setEmail, placeholder: "john@example.com" },
          { label: "Website", value: website, set: setWebsite, placeholder: "https://example.com" },
        ].map(({ label, value, set, placeholder }) => (
          <div key={label} className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <input type="text" value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder}
              className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
          </div>
        ))}
      </div>
      {name && (
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img src={qrUrl} alt="vCard QR Code" className="h-48 w-48 rounded-xl border border-border" />
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-muted-foreground">vCard Data</p>
            <pre className="rounded-xl border border-border bg-muted p-3 text-xs font-mono text-foreground whitespace-pre">{vcard}</pre>
            <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white">{copied ? "Copied!" : "Copy vCard"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
