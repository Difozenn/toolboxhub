"use client";

import { useState, useCallback } from "react";

function xmlNodeToJson(node: Element): unknown {
  const obj: Record<string, unknown> = {};

  // Attributes
  if (node.attributes.length > 0) {
    const attrs: Record<string, string> = {};
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      attrs[`@${attr.name}`] = attr.value;
    }
    Object.assign(obj, attrs);
  }

  // Child elements
  const childElements = Array.from(node.children);
  if (childElements.length > 0) {
    for (const child of childElements) {
      const childName = child.tagName;
      const childValue = xmlNodeToJson(child);

      if (childName in obj) {
        // Already exists — make it an array
        const existing = obj[childName];
        if (Array.isArray(existing)) {
          existing.push(childValue);
        } else {
          obj[childName] = [existing, childValue];
        }
      } else {
        obj[childName] = childValue;
      }
    }
  } else {
    // Text content only
    const text = node.textContent?.trim() || "";
    if (Object.keys(obj).length === 0) {
      // No attributes — return text directly
      return text;
    }
    if (text) {
      obj["#text"] = text;
    }
  }

  return obj;
}

function convertXmlToJson(xml: string): { json: string; error: string | null } {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    // Check for parse errors
    const parseError = doc.querySelector("parsererror");
    if (parseError) {
      return { json: "", error: parseError.textContent || "XML parse error" };
    }

    const root = doc.documentElement;
    const result: Record<string, unknown> = {};
    result[root.tagName] = xmlNodeToJson(root);

    return { json: JSON.stringify(result, null, 2), error: null };
  } catch (e) {
    return {
      json: "",
      error: e instanceof Error ? e.message : "Failed to parse XML",
    };
  }
}

export default function XmlToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = useCallback(() => {
    if (!input.trim()) return;
    const { json, error: parseError } = convertXmlToJson(input);
    setOutput(json);
    setError(parseError);
  }, [input]);

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-4">
      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleConvert}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Convert to JSON
        </button>
        {output && (
          <button
            onClick={copy}
            className="ml-auto rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied ? "Copied!" : "Copy Output"}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Panels */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            XML Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`<root>\n  <item id="1">\n    <name>Example</name>\n    <value>42</value>\n  </item>\n</root>`}
            spellCheck={false}
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Output */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            JSON Output
          </label>
          <textarea
            readOnly
            value={output}
            placeholder="JSON output will appear here..."
            className="h-80 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
