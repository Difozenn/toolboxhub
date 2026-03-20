"use client";

import { useState, useCallback } from "react";

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptText(plaintext: string, password: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(plaintext)
  );

  // Combine salt + iv + ciphertext
  const combined = new Uint8Array(salt.length + iv.length + new Uint8Array(ciphertext).length);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(ciphertext), salt.length + iv.length);

  // Convert to base64
  let binary = "";
  for (let i = 0; i < combined.length; i++) {
    binary += String.fromCharCode(combined[i]);
  }
  return btoa(binary);
}

async function decryptText(encryptedBase64: string, password: string): Promise<string> {
  // Decode base64
  const binary = atob(encryptedBase64);
  const combined = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    combined[i] = binary.charCodeAt(i);
  }

  const salt = combined.slice(0, 16);
  const iv = combined.slice(16, 28);
  const ciphertext = combined.slice(28);

  const key = await deriveKey(password, salt);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
}

export default function EncryptionTool() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [inputText, setInputText] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAction = useCallback(async () => {
    if (!inputText.trim() || !password) {
      setError("Please provide both text and a password.");
      return;
    }
    setError("");
    setProcessing(true);

    try {
      if (mode === "encrypt") {
        const encrypted = await encryptText(inputText, password);
        setOutput(encrypted);
      } else {
        const decrypted = await decryptText(inputText.trim(), password);
        setOutput(decrypted);
      }
    } catch {
      setError(
        mode === "decrypt"
          ? "Decryption failed. Wrong password or corrupted data."
          : "Encryption failed. Please try again."
      );
      setOutput("");
    } finally {
      setProcessing(false);
    }
  }, [inputText, password, mode]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => { setMode("encrypt"); setOutput(""); setError(""); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "encrypt"
              ? "bg-primary text-white"
              : "border border-border bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          Encrypt
        </button>
        <button
          onClick={() => { setMode("decrypt"); setOutput(""); setError(""); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "decrypt"
              ? "bg-primary text-white"
              : "border border-border bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          Decrypt
        </button>
      </div>

      {/* Input */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            {mode === "encrypt" ? "Text to Encrypt" : "Encrypted Text (Base64)"}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              mode === "encrypt"
                ? "Enter the text you want to encrypt..."
                : "Paste the encrypted base64 string here..."
            }
            rows={5}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter encryption password"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleAction}
          disabled={processing || !inputText.trim() || !password}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {processing ? "Processing..." : mode === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              {mode === "encrypt" ? "Encrypted Output" : "Decrypted Text"}
            </h3>
            <button
              onClick={copyOutput}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-background p-3 font-mono text-sm text-foreground whitespace-pre-wrap break-all">
            {output}
          </pre>
        </div>
      )}

      {/* Info */}
      <div className="rounded-xl border border-border bg-muted p-4">
        <h3 className="mb-2 text-sm font-medium text-foreground">About</h3>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>Uses AES-256-GCM encryption via the Web Crypto API</li>
          <li>Password is derived using PBKDF2 with 100,000 iterations</li>
          <li>Each encryption uses a unique random salt and IV</li>
          <li>All processing happens in your browser - nothing is sent to any server</li>
        </ul>
      </div>
    </div>
  );
}
