"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

interface FormatStyle {
  name: string;
  platform: string;
  format: (n: number) => string;
}

const styles: FormatStyle[] = [
  {
    name: "Standard",
    platform: "YouTube / Instagram",
    format: (n) => {
      if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
      if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
      if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
      return n.toString();
    },
  },
  {
    name: "Compact",
    platform: "Twitter / X",
    format: (n) => {
      if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2).replace(/0+$/, "").replace(/\.$/, "") + "B";
      if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
      if (n >= 10_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
      if (n >= 1_000) return n.toLocaleString("en-US");
      return n.toString();
    },
  },
  {
    name: "Full Abbreviation",
    platform: "TikTok",
    format: (n) => {
      if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
      if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
      if (n >= 10_000) return (n / 1_000).toFixed(1) + "K";
      return n.toLocaleString("en-US");
    },
  },
  {
    name: "Full Number",
    platform: "LinkedIn / Facebook",
    format: (n) => {
      return n.toLocaleString("en-US");
    },
  },
  {
    name: "Indian Format",
    platform: "Regional",
    format: (n) => {
      if (n >= 10_000_000) return (n / 10_000_000).toFixed(1).replace(/\.0$/, "") + " Cr";
      if (n >= 100_000) return (n / 100_000).toFixed(1).replace(/\.0$/, "") + " L";
      if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
      return n.toString();
    },
  },
];

export default function FollowerCountFormatter() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const num = parseInt(input.replace(/[^0-9]/g, ""), 10) || 0;

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          Enter follower count
        </label>
        <input
          type="text"
          className={inputClass + " text-2xl font-bold"}
          placeholder="e.g. 1234567"
          value={input}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            setInput(raw);
          }}
        />
        {num > 0 && (
          <p className="mt-1 text-sm text-muted-foreground">
            Raw: {num.toLocaleString("en-US")}
          </p>
        )}
      </div>

      {num > 0 && (
        <div className="space-y-3">
          {styles.map((style) => {
            const formatted = style.format(num);
            return (
              <div key={style.name} className={cardClass.replace("text-center", "")}>
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">
                      {style.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {style.platform}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-foreground">
                      {formatted}
                    </span>
                    <button
                      onClick={() => copy(formatted, style.name)}
                      className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {copied === style.name ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className={cardClass}>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
              Quick Reference
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
              {[1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000].map(
                (n) => (
                  <div
                    key={n}
                    className="rounded-lg bg-background px-2 py-1.5 border border-border"
                  >
                    <p className="text-xs text-muted-foreground">
                      {n.toLocaleString("en-US")}
                    </p>
                    <p className="font-bold text-foreground">
                      {styles[0].format(n)}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
