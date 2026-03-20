"use client";

import { useState, useEffect, useCallback } from "react";

// Simple MD5 implementation (RFC 1321)
function md5(input: string): string {
  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }

  function bitRotateLeft(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  function md5cmn(
    q: number,
    a: number,
    b: number,
    x: number,
    s: number,
    t: number
  ): number {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }

  function md5ff(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    t: number
  ): number {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }

  function md5gg(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    t: number
  ): number {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }

  function md5hh(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    t: number
  ): number {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function md5ii(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    t: number
  ): number {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  function binlMD5(x: number[], len: number): number[] {
    x[len >> 5] |= 0x80 << len % 32;
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    for (let i = 0; i < x.length; i += 16) {
      const olda = a;
      const oldb = b;
      const oldc = c;
      const oldd = d;

      a = md5ff(a, b, c, d, x[i] || 0, 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1] || 0, 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2] || 0, 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3] || 0, 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4] || 0, 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5] || 0, 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6] || 0, 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7] || 0, 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8] || 0, 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9] || 0, 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10] || 0, 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11] || 0, 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12] || 0, 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13] || 0, 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14] || 0, 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15] || 0, 22, 1236535329);

      a = md5gg(a, b, c, d, x[i + 1] || 0, 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6] || 0, 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11] || 0, 14, 643717713);
      b = md5gg(b, c, d, a, x[i] || 0, 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5] || 0, 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10] || 0, 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15] || 0, 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4] || 0, 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9] || 0, 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14] || 0, 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3] || 0, 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8] || 0, 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13] || 0, 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2] || 0, 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7] || 0, 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12] || 0, 20, -1926607734);

      a = md5hh(a, b, c, d, x[i + 5] || 0, 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8] || 0, 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11] || 0, 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14] || 0, 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1] || 0, 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4] || 0, 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7] || 0, 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10] || 0, 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13] || 0, 4, 681279174);
      d = md5hh(d, a, b, c, x[i] || 0, 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3] || 0, 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6] || 0, 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9] || 0, 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12] || 0, 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15] || 0, 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2] || 0, 23, -995338651);

      a = md5ii(a, b, c, d, x[i] || 0, 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7] || 0, 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14] || 0, 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5] || 0, 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12] || 0, 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3] || 0, 10, -1894986606);
      c = md5ii(c, d, a, b, x[i + 10] || 0, 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1] || 0, 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8] || 0, 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15] || 0, 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6] || 0, 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13] || 0, 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4] || 0, 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11] || 0, 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2] || 0, 15, 718787259);
      b = md5ii(b, c, d, a, x[i + 9] || 0, 21, -343485551);

      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }

  function binl2hex(binarray: number[]): string {
    const hexTab = "0123456789abcdef";
    let str = "";
    for (let i = 0; i < binarray.length * 32; i += 8) {
      str +=
        hexTab.charAt((binarray[i >> 5] >>> i % 32) & 0xf) +
        hexTab.charAt((binarray[i >> 5] >>> (i % 32 + 4)) & 0xf);
    }
    return str;
  }

  function str2binl(str: string): number[] {
    const bin: number[] = [];
    const mask = (1 << 8) - 1;
    for (let i = 0; i < str.length * 8; i += 8) {
      bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << i % 32;
    }
    return bin;
  }

  // Convert to UTF-8 first
  const utf8 = unescape(encodeURIComponent(input));
  return binl2hex(binlMD5(str2binl(utf8), utf8.length * 8));
}

async function computeHash(
  algorithm: string,
  text: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface HashResult {
  name: string;
  value: string;
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [computing, setComputing] = useState(false);

  useEffect(() => {
    if (!input) {
      setHashes([]);
      return;
    }

    let cancelled = false;
    setComputing(true);

    async function compute() {
      try {
        const [sha1, sha256, sha512] = await Promise.all([
          computeHash("SHA-1", input),
          computeHash("SHA-256", input),
          computeHash("SHA-512", input),
        ]);

        const md5Hash = md5(input);

        if (!cancelled) {
          setHashes([
            { name: "MD5", value: md5Hash },
            { name: "SHA-1", value: sha1 },
            { name: "SHA-256", value: sha256 },
            { name: "SHA-512", value: sha512 },
          ]);
          setComputing(false);
        }
      } catch {
        if (!cancelled) {
          setHashes([]);
          setComputing(false);
        }
      }
    }

    // Debounce slightly for performance
    const timer = setTimeout(compute, 150);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [input]);

  const copyHash = useCallback(async (value: string, name: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(name);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  }, []);

  const copyAll = useCallback(async () => {
    const text = hashes.map((h) => `${h.name}: ${h.value}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField("all");
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  }, [hashes]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {input && (
          <p className="mt-1 text-xs text-muted-foreground">
            {input.length} character{input.length !== 1 ? "s" : ""} |{" "}
            {new TextEncoder().encode(input).length} bytes
          </p>
        )}
      </div>

      {/* Copy all button */}
      {hashes.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={copyAll}
            className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            {copiedField === "all" ? "Copied all!" : "Copy all hashes"}
          </button>
        </div>
      )}

      {/* Hash results */}
      {computing && (
        <div className="text-sm text-muted-foreground">Computing hashes...</div>
      )}

      <div className="space-y-3">
        {hashes.map((hash) => (
          <div
            key={hash.name}
            className="rounded-xl border border-border bg-muted p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">
                {hash.name}
              </label>
              <button
                onClick={() => copyHash(hash.value, hash.name)}
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {copiedField === hash.name ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="font-mono text-sm text-foreground break-all leading-relaxed">
              {hash.value}
            </p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {!input && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Enter text above to generate hashes.
          </p>
        </div>
      )}
    </div>
  );
}
