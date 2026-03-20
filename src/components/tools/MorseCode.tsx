"use client";

import { useState, useMemo, useCallback, useRef } from "react";

const CHAR_TO_MORSE: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
};

const MORSE_TO_CHAR: Record<string, string> = {};
for (const [char, morse] of Object.entries(CHAR_TO_MORSE)) {
  MORSE_TO_CHAR[morse] = char;
}

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (char === " ") return "/";
      return CHAR_TO_MORSE[char] || "";
    })
    .filter(Boolean)
    .join(" ");
}

function morseToText(morse: string): string {
  return morse
    .trim()
    .split(/\s*\/\s*/)
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((code) => MORSE_TO_CHAR[code] || "")
        .join("")
    )
    .join(" ");
}

export default function MorseCode() {
  const [mode, setMode] = useState<"text-to-morse" | "morse-to-text">(
    "text-to-morse"
  );
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      return mode === "text-to-morse"
        ? textToMorse(input)
        : morseToText(input);
    } catch {
      return "Error converting";
    }
  }, [input, mode]);

  const morseToPlay = useMemo(() => {
    if (mode === "text-to-morse") return output;
    return input.trim();
  }, [mode, input, output]);

  const copyToClipboard = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const playMorse = useCallback(async () => {
    if (!morseToPlay || isPlaying) return;

    setIsPlaying(true);
    isPlayingRef.current = true;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;

      const dotDuration = 0.08; // seconds
      const dashDuration = dotDuration * 3;
      const gapDuration = dotDuration; // gap between dots/dashes
      const letterGap = dotDuration * 3;
      const wordGap = dotDuration * 7;

      let currentTime = ctx.currentTime + 0.05;

      for (const char of morseToPlay) {
        if (!isPlayingRef.current) break;

        if (char === " ") {
          currentTime += letterGap;
        } else if (char === "/") {
          currentTime += wordGap;
        } else if (char === ".") {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 600;
          osc.type = "sine";
          gain.gain.setValueAtTime(0.3, currentTime);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            currentTime + dotDuration
          );
          osc.start(currentTime);
          osc.stop(currentTime + dotDuration);
          currentTime += dotDuration + gapDuration;
        } else if (char === "-") {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 600;
          osc.type = "sine";
          gain.gain.setValueAtTime(0.3, currentTime);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            currentTime + dashDuration
          );
          osc.start(currentTime);
          osc.stop(currentTime + dashDuration);
          currentTime += dashDuration + gapDuration;
        }
      }

      // Wait for playback to finish
      const remainingTime = (currentTime - ctx.currentTime) * 1000;
      await new Promise((resolve) =>
        setTimeout(resolve, Math.max(0, remainingTime))
      );
    } catch {
      // Audio API may not be available
    } finally {
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
  }, [morseToPlay, isPlaying]);

  const stopMorse = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-border overflow-hidden w-fit">
        <button
          onClick={() => {
            setMode("text-to-morse");
            setInput("");
          }}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            mode === "text-to-morse"
              ? "bg-primary text-white"
              : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          Text to Morse
        </button>
        <button
          onClick={() => {
            setMode("morse-to-text");
            setInput("");
          }}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            mode === "morse-to-text"
              ? "bg-primary text-white"
              : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          Morse to Text
        </button>
      </div>

      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          {mode === "text-to-morse" ? "Text" : "Morse Code"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "text-to-morse"
              ? "Enter text to convert to Morse code..."
              : 'Enter Morse code (use . and - separated by spaces, / for word breaks)...\nExample: .... . .-.. .-.. --- / .-- --- .-. .-.. -..'
          }
          className="h-36 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Output */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            {mode === "text-to-morse" ? "Morse Code" : "Text"}
          </label>
          <div className="flex gap-2">
            {morseToPlay && (
              <button
                onClick={isPlaying ? stopMorse : playMorse}
                className={`rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors ${
                  isPlaying
                    ? "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                    : "bg-background text-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {isPlaying ? "Stop" : "Play Audio"}
              </button>
            )}
            <button
              onClick={copyToClipboard}
              disabled={!output}
              className="rounded-lg border border-border bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <div className="min-h-[120px] rounded-xl border border-border bg-muted p-4 font-mono text-lg text-foreground whitespace-pre-wrap break-all">
          {output || (
            <span className="text-muted-foreground text-sm">
              Result will appear here...
            </span>
          )}
        </div>
      </div>

      {/* Reference table */}
      <details className="rounded-xl border border-border">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
          Morse Code Reference
        </summary>
        <div className="border-t border-border p-4">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {Object.entries(CHAR_TO_MORSE)
              .slice(0, 36) // Letters and numbers
              .map(([char, morse]) => (
                <div
                  key={char}
                  className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs font-mono"
                >
                  <span className="font-bold text-foreground">{char}</span>
                  <span className="text-muted-foreground">{morse}</span>
                </div>
              ))}
          </div>
        </div>
      </details>
    </div>
  );
}
