"use client";
import { useState } from "react";
const patterns: [RegExp, string, string][] = [
  [/^[a-f0-9]{32}$/i, "MD5", "128-bit hash, commonly used for checksums (not secure for passwords)"],
  [/^[a-f0-9]{40}$/i, "SHA-1", "160-bit hash, deprecated for security use"],
  [/^[a-f0-9]{56}$/i, "SHA-224", "224-bit SHA-2 family hash"],
  [/^[a-f0-9]{64}$/i, "SHA-256", "256-bit SHA-2 hash, widely used for security"],
  [/^[a-f0-9]{96}$/i, "SHA-384", "384-bit SHA-2 hash"],
  [/^[a-f0-9]{128}$/i, "SHA-512", "512-bit SHA-2 hash, highest security SHA-2 variant"],
  [/^\$2[ayb]\$.{56}$/, "bcrypt", "Adaptive password hashing function"],
  [/^\$argon2/, "Argon2", "Modern password hashing, winner of Password Hashing Competition"],
  [/^\$6\$/, "SHA-512 crypt", "Unix shadow password hash"],
  [/^\$5\$/, "SHA-256 crypt", "Unix shadow password hash"],
  [/^\$1\$/, "MD5 crypt", "Unix shadow password hash (deprecated)"],
  [/^[a-f0-9]{8}$/i, "CRC-32", "32-bit cyclic redundancy check"],
  [/^[A-Za-z0-9+/]{43}=$/, "SHA-256 (Base64)", "SHA-256 encoded as Base64"],
];
export default function HashIdentifier() {
  const [input, setInput] = useState("");
  const matches = input.trim() ? patterns.filter(([re]) => re.test(input.trim())) : [];
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Hash String</label>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Paste a hash string to identify..." className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        {input && <p className="mt-1 text-xs text-muted-foreground">Length: {input.trim().length} characters</p>}
      </div>
      {input && (
        <div>
          {matches.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Possible hash types:</p>
              {matches.map(([, name, desc]) => (
                <div key={name} className="rounded-lg border border-border bg-muted p-3">
                  <p className="font-medium text-foreground">{name}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-muted p-4">
              <p className="text-sm text-muted-foreground">No common hash pattern matched. The string may be a custom or unknown format, or it may be truncated.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
