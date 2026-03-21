"use client";

import { useState } from "react";

function splitIntoTweets(text: string, limit = 280): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const tweets: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= limit) {
      current = next;
    } else {
      if (current) tweets.push(current);
      current = word.length > limit ? word.slice(0, limit) : word;
    }
  }
  if (current) tweets.push(current);
  return tweets;
}

export default function TwitterThreadMaker() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const tweets = text.trim() ? splitIntoTweets(text) : [];

  const copyTweet = async (t: string, i: number) => {
    await navigator.clipboard.writeText(t);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Your Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your long-form text here to split into a Twitter/X thread..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {tweets.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{tweets.length} tweet{tweets.length !== 1 ? "s" : ""} in thread</p>
          {tweets.map((tweet, i) => (
            <div key={i} className="rounded-xl border border-border bg-muted p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">Tweet {i + 1}/{tweets.length}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono ${tweet.length > 260 ? "text-yellow-500" : "text-muted-foreground"}`}>
                    {tweet.length}/280
                  </span>
                  <button onClick={() => copyTweet(tweet, i)} className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-primary hover:text-white transition-colors">
                    {copied === i ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{tweet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
