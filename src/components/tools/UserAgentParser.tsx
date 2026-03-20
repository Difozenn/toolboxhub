"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

interface ParsedUA {
  browser: { name: string; version: string };
  os: { name: string; version: string };
  engine: string;
  deviceType: string;
}

function parseUserAgent(ua: string): ParsedUA {
  const result: ParsedUA = {
    browser: { name: "Unknown", version: "" },
    os: { name: "Unknown", version: "" },
    engine: "Unknown",
    deviceType: "Desktop",
  };

  // Device type
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    result.deviceType = "Tablet";
  } else if (
    /mobile|iphone|ipod|android.*mobile|windows phone|blackberry|bb10|opera mini|opera mobi/i.test(
      ua
    )
  ) {
    result.deviceType = "Mobile";
  } else {
    result.deviceType = "Desktop";
  }

  // Engine
  if (/Trident/i.test(ua)) {
    result.engine = "Trident";
  } else if (/Presto/i.test(ua)) {
    result.engine = "Presto";
  } else if (/AppleWebKit/i.test(ua)) {
    const match = ua.match(/AppleWebKit\/([\d.]+)/);
    result.engine = match ? `WebKit/${match[1]}` : "WebKit";
    if (/Chrome/i.test(ua)) {
      result.engine = "Blink";
    }
  } else if (/Gecko/i.test(ua)) {
    result.engine = "Gecko";
  }

  // Browser
  const browserPatterns: [RegExp, string][] = [
    [/Edg(?:e|A|iOS)?\/([\d.]+)/, "Microsoft Edge"],
    [/OPR\/([\d.]+)/, "Opera"],
    [/Opera\/([\d.]+)/, "Opera"],
    [/Vivaldi\/([\d.]+)/, "Vivaldi"],
    [/Brave/, "Brave"],
    [/YaBrowser\/([\d.]+)/, "Yandex Browser"],
    [/SamsungBrowser\/([\d.]+)/, "Samsung Browser"],
    [/UCBrowser\/([\d.]+)/, "UC Browser"],
    [/Firefox\/([\d.]+)/, "Firefox"],
    [/FxiOS\/([\d.]+)/, "Firefox iOS"],
    [/CriOS\/([\d.]+)/, "Chrome iOS"],
    [/Chrome\/([\d.]+)/, "Chrome"],
    [/Safari\/([\d.]+)/, "Safari"],
    [/MSIE\s([\d.]+)/, "Internet Explorer"],
    [/Trident.*rv:([\d.]+)/, "Internet Explorer"],
  ];

  for (const [pattern, name] of browserPatterns) {
    const match = ua.match(pattern);
    if (match) {
      result.browser.name = name;
      result.browser.version = match[1] || "";

      // Safari version is in Version/ field
      if (name === "Safari") {
        const versionMatch = ua.match(/Version\/([\d.]+)/);
        if (versionMatch) {
          result.browser.version = versionMatch[1];
        }
      }

      break;
    }
  }

  // OS
  const osPatterns: [RegExp, string, number?][] = [
    [/Windows NT 10\.0/, "Windows 10/11"],
    [/Windows NT 6\.3/, "Windows 8.1"],
    [/Windows NT 6\.2/, "Windows 8"],
    [/Windows NT 6\.1/, "Windows 7"],
    [/Windows NT 6\.0/, "Windows Vista"],
    [/Windows NT 5\.1/, "Windows XP"],
    [/Mac OS X ([\d_]+)/, "macOS", 1],
    [/iPhone OS ([\d_]+)/, "iOS", 1],
    [/iPad.*OS ([\d_]+)/, "iPadOS", 1],
    [/Android ([\d.]+)/, "Android", 1],
    [/CrOS/, "ChromeOS"],
    [/Linux/, "Linux"],
    [/Ubuntu/, "Ubuntu"],
    [/Fedora/, "Fedora"],
    [/FreeBSD/, "FreeBSD"],
  ];

  for (const [pattern, name, versionGroup] of osPatterns) {
    const match = ua.match(pattern);
    if (match) {
      result.os.name = name;
      if (versionGroup && match[versionGroup]) {
        result.os.version = match[versionGroup].replace(/_/g, ".");
      }
      break;
    }
  }

  return result;
}

export default function UserAgentParser() {
  const [userAgent, setUserAgent] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get the browser's user agent on mount
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setUserAgent(navigator.userAgent);
    }
  }, []);

  const parsed = useMemo(() => parseUserAgent(userAgent), [userAgent]);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(userAgent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [userAgent]);

  const details = [
    {
      label: "Browser",
      value: parsed.browser.version
        ? `${parsed.browser.name} ${parsed.browser.version}`
        : parsed.browser.name,
    },
    {
      label: "Operating System",
      value: parsed.os.version
        ? `${parsed.os.name} ${parsed.os.version}`
        : parsed.os.name,
    },
    { label: "Device Type", value: parsed.deviceType },
    { label: "Engine", value: parsed.engine },
  ];

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setUseCustom(false);
            if (typeof navigator !== "undefined") {
              setUserAgent(navigator.userAgent);
            }
          }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            !useCustom
              ? "bg-primary text-white"
              : "border border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          Current Browser
        </button>
        <button
          onClick={() => setUseCustom(true)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            useCustom
              ? "bg-primary text-white"
              : "border border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          Custom Input
        </button>
      </div>

      {/* User agent string */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">
            User Agent String
          </label>
          <button
            onClick={copy}
            className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {useCustom ? (
          <textarea
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            placeholder="Paste a user agent string here..."
            spellCheck={false}
            className="h-24 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        ) : (
          <div className="rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground break-all">
            {userAgent}
          </div>
        )}
      </div>

      {/* Parsed details */}
      {userAgent && (
        <div className="grid gap-3 sm:grid-cols-2">
          {details.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-muted p-4"
            >
              <p className="text-xs font-medium text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Raw parsed data */}
      {userAgent && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Full Parsed Data
          </label>
          <pre className="overflow-auto rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground whitespace-pre-wrap">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
