"use client";

import { useState, useCallback } from "react";

interface Rule {
  id: number;
  type: "allow" | "disallow";
  path: string;
}

let nextRuleId = 1;

export default function RobotsTxtGenerator() {
  const [userAgent, setUserAgent] = useState("*");
  const [rules, setRules] = useState<Rule[]>([
    { id: nextRuleId++, type: "disallow", path: "" },
  ]);
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [crawlDelay, setCrawlDelay] = useState("");
  const [copied, setCopied] = useState(false);

  const addRule = useCallback(() => {
    setRules((prev) => [
      ...prev,
      { id: nextRuleId++, type: "disallow", path: "" },
    ]);
  }, []);

  const removeRule = useCallback((id: number) => {
    setRules((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }, []);

  const updateRule = useCallback(
    (id: number, field: "type" | "path", value: string) => {
      setRules((prev) =>
        prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
      );
    },
    []
  );

  const applyPreset = useCallback(
    (preset: "allow-all" | "block-all" | "block-folders") => {
      if (preset === "allow-all") {
        setUserAgent("*");
        setRules([{ id: nextRuleId++, type: "allow", path: "/" }]);
      } else if (preset === "block-all") {
        setUserAgent("*");
        setRules([{ id: nextRuleId++, type: "disallow", path: "/" }]);
      } else if (preset === "block-folders") {
        setUserAgent("*");
        setRules([
          { id: nextRuleId++, type: "disallow", path: "/admin/" },
          { id: nextRuleId++, type: "disallow", path: "/private/" },
          { id: nextRuleId++, type: "disallow", path: "/tmp/" },
          { id: nextRuleId++, type: "allow", path: "/" },
        ]);
      }
    },
    []
  );

  // Generate output
  const generateOutput = useCallback((): string => {
    const lines: string[] = [];
    lines.push(`User-agent: ${userAgent}`);

    for (const rule of rules) {
      if (rule.path.trim()) {
        const directive = rule.type === "allow" ? "Allow" : "Disallow";
        lines.push(`${directive}: ${rule.path.trim()}`);
      }
    }

    if (crawlDelay.trim() && Number(crawlDelay) > 0) {
      lines.push(`Crawl-delay: ${crawlDelay.trim()}`);
    }

    if (sitemapUrl.trim()) {
      lines.push("");
      lines.push(`Sitemap: ${sitemapUrl.trim()}`);
    }

    return lines.join("\n");
  }, [userAgent, rules, sitemapUrl, crawlDelay]);

  const output = generateOutput();

  const copyOutput = useCallback(async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-5">
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Presets</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset("allow-all")}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Allow All
            </button>
            <button
              onClick={() => applyPreset("block-all")}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Block All
            </button>
            <button
              onClick={() => applyPreset("block-folders")}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Block Specific Folders
            </button>
          </div>
        </div>

        {/* User-agent */}
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            User-agent
          </label>
          <input
            type="text"
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            placeholder="*"
            className="w-full max-w-sm rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Rules */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Rules</p>
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center gap-3">
              <select
                value={rule.type}
                onChange={(e) => updateRule(rule.id, "type", e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="allow">Allow</option>
                <option value="disallow">Disallow</option>
              </select>
              <input
                type="text"
                value={rule.path}
                onChange={(e) => updateRule(rule.id, "path", e.target.value)}
                placeholder="/path/"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={() => removeRule(rule.id)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-red-400 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addRule}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            + Add Rule
          </button>
        </div>

        {/* Crawl delay */}
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Crawl-delay (seconds)
          </label>
          <input
            type="number"
            min={0}
            value={crawlDelay}
            onChange={(e) => setCrawlDelay(e.target.value)}
            placeholder="10"
            className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Sitemap */}
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Sitemap URL
          </label>
          <input
            type="text"
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            placeholder="https://example.com/sitemap.xml"
            className="w-full max-w-lg rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Output */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Generated robots.txt
          </h3>
          <button
            onClick={copyOutput}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="rounded-xl border border-border bg-muted p-4">
          <pre className="whitespace-pre font-mono text-sm text-foreground">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
