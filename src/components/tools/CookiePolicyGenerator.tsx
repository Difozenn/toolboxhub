"use client";

import { useState } from "react";

export default function CookiePolicyGenerator() {
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    setOutput(`COOKIE POLICY

Last updated: ${today}

1. WHAT ARE COOKIES

Cookies are small text files placed on your device by websites you visit. ${website || "This website"} uses cookies to improve your experience.

2. HOW WE USE COOKIES

${company || "We"} use cookies for the following purposes:

a) Essential Cookies
These are necessary for the website to function. They include session management and security cookies.

b) Analytics Cookies
We use analytics cookies to understand how visitors interact with ${website || "our website"}. This helps us improve our service.

c) Functional Cookies
These cookies remember your preferences and personalize your experience on ${website || "our website"}.

d) Marketing Cookies
These may be used to show relevant advertisements and track ad campaigns.

3. YOUR CHOICES

You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer, and you can set most browsers to prevent them from being placed.

4. THIRD-PARTY COOKIES

Some of our pages display content from external providers (e.g., YouTube, Google Maps). These providers may set their own cookies.

5. MANAGING COOKIES

Most browsers allow you to refuse cookies by adjusting settings. See your browser's help documentation for instructions.

6. GDPR COMPLIANCE

Under GDPR, we obtain consent before placing non-essential cookies. You may withdraw consent at any time.

7. CONTACT US

For questions about this cookie policy, contact ${company || "us"} at ${website || "our website"}.`);
  };

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Company Name</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc."
            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Website URL</label>
          <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com"
            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Generate Cookie Policy</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : "Copy"}</button>}
      </div>
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-xs text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        Template only — consult a legal professional for GDPR-compliant cookie policies.
      </div>
      {output && <textarea readOnly value={output} className="h-64 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm text-foreground focus:outline-none" />}
    </div>
  );
}
