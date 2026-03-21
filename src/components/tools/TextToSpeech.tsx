"use client";

import { useState, useEffect } from "react";

export default function TextToSpeechTool() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIdx, setVoiceIdx] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const load = () => {
      const v = speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
      if (v.length > 0) setVoices(v);
    };
    load();
    speechSynthesis.onvoiceschanged = load;
    return () => { speechSynthesis.cancel(); };
  }, []);

  const speak = () => {
    speechSynthesis.cancel();
    if (!text.trim()) return;
    const utt = new SpeechSynthesisUtterance(text);
    if (voices[voiceIdx]) utt.voice = voices[voiceIdx];
    utt.rate = rate;
    utt.pitch = pitch;
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    speechSynthesis.speak(utt);
  };

  const stop = () => { speechSynthesis.cancel(); setSpeaking(false); };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Text to Speak</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          className="h-32 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      {voices.length > 0 && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Voice</label>
          <select value={voiceIdx} onChange={(e) => setVoiceIdx(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
            {voices.map((v, i) => <option key={i} value={i}>{v.name} ({v.lang})</option>)}
          </select>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Rate: {rate}x</label>
          <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Pitch: {pitch}</label>
          <input type="range" min={0} max={2} step={0.1} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={speak} disabled={!text.trim() || speaking}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50">
          {speaking ? "Speaking..." : "Speak"}
        </button>
        {speaking && (
          <button onClick={stop} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">Stop</button>
        )}
      </div>
      {voices.length === 0 && <p className="text-sm text-muted-foreground">No voices available — your browser may not support Web Speech API.</p>}
    </div>
  );
}
