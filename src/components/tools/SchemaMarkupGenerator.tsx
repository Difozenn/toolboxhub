"use client";

import { useState } from "react";

type SchemaType = "Article" | "Product" | "LocalBusiness" | "FAQ";

export default function SchemaMarkupGenerator() {
  const [type, setType] = useState<SchemaType>("Article");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const SCHEMAS: Record<SchemaType, { label: string; key: string }[]> = {
    Article: [{ label: "Headline", key: "headline" }, { label: "Author Name", key: "author" }, { label: "Date Published", key: "datePublished" }, { label: "Description", key: "description" }, { label: "URL", key: "url" }],
    Product: [{ label: "Product Name", key: "name" }, { label: "Description", key: "description" }, { label: "Price", key: "price" }, { label: "Currency", key: "priceCurrency" }, { label: "Availability", key: "availability" }],
    LocalBusiness: [{ label: "Business Name", key: "name" }, { label: "Address", key: "streetAddress" }, { label: "City", key: "addressLocality" }, { label: "Phone", key: "telephone" }, { label: "URL", key: "url" }],
    FAQ: [{ label: "Q1", key: "q1" }, { label: "A1", key: "a1" }, { label: "Q2", key: "q2" }, { label: "A2", key: "a2" }, { label: "Q3", key: "q3" }, { label: "A3", key: "a3" }],
  };

  const generate = () => {
    let schema: object = {};
    if (type === "Article") schema = { "@context": "https://schema.org", "@type": "Article", headline: fields.headline, author: { "@type": "Person", name: fields.author }, datePublished: fields.datePublished, description: fields.description, url: fields.url };
    else if (type === "Product") schema = { "@context": "https://schema.org", "@type": "Product", name: fields.name, description: fields.description, offers: { "@type": "Offer", price: fields.price, priceCurrency: fields.priceCurrency || "USD", availability: `https://schema.org/${fields.availability || "InStock"}` } };
    else if (type === "LocalBusiness") schema = { "@context": "https://schema.org", "@type": "LocalBusiness", name: fields.name, address: { "@type": "PostalAddress", streetAddress: fields.streetAddress, addressLocality: fields.addressLocality }, telephone: fields.telephone, url: fields.url };
    else if (type === "FAQ") schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [1,2,3].filter((i) => fields[`q${i}`]).map((i) => ({ "@type": "Question", name: fields[`q${i}`], acceptedAnswer: { "@type": "Answer", text: fields[`a${i}`] } })) };
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Schema Type</label>
        <div className="flex flex-wrap gap-2">
          {(["Article","Product","LocalBusiness","FAQ"] as SchemaType[]).map((t) => (
            <button key={t} onClick={() => { setType(t); setFields({}); setOutput(""); }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${type === t ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {SCHEMAS[type].map(({ label, key }) => (
          <div key={key} className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <input type="text" value={fields[key] || ""} onChange={(e) => setFields((p) => ({ ...p, [key]: e.target.value }))}
              className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Generate Schema</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : "Copy"}</button>}
      </div>
      {output && <textarea readOnly value={output} className="h-48 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-xs text-foreground focus:outline-none" />}
    </div>
  );
}
