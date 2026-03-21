"use client";

import { useState } from "react";

const HASHTAG_MAP: Record<string, string[]> = {
  food: ["#foodie","#instafood","#foodporn","#yummy","#delicious","#cooking","#recipe","#homemade","#foodphotography","#healthyfood"],
  travel: ["#travel","#wanderlust","#travelgram","#adventure","#explore","#vacation","#travelphotography","#instatravel","#travelblogger","#roadtrip"],
  fitness: ["#fitness","#workout","#gym","#fitnessmotivation","#healthylifestyle","#fitfam","#exercise","#training","#bodybuilding","#weightloss"],
  photography: ["#photography","#photo","#photographer","#photooftheday","#picoftheday","#canon","#nikon","#portrait","#landscape","#naturephotography"],
  fashion: ["#fashion","#style","#ootd","#fashionista","#outfit","#streetstyle","#fashionblogger","#clothing","#model","#instafashion"],
  tech: ["#tech","#technology","#coding","#programming","#developer","#software","#startup","#innovation","#ai","#digitalmarketing"],
  business: ["#business","#entrepreneur","#success","#marketing","#motivation","#smallbusiness","#entrepreneurship","#branding","#hustle","#leadership"],
  art: ["#art","#artwork","#artist","#illustration","#drawing","#painting","#creative","#design","#digitalart","#sketch"],
  music: ["#music","#musician","#newmusic","#song","#guitar","#producer","#hiphop","#pop","#livemusic","#musicproduction"],
  nature: ["#nature","#naturelover","#outdoors","#wildlife","#trees","#mountains","#sunset","#sky","#flowers","#earthpix"],
};

export default function HashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const key = topic.toLowerCase().trim();
    const found = Object.keys(HASHTAG_MAP).find((k) => key.includes(k));
    setHashtags(found ? HASHTAG_MAP[found] : HASHTAG_MAP.food);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(hashtags.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Topic / Niche</label>
        <div className="flex gap-2">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="e.g. food, travel, fitness..."
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
            Generate
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Topics: food, travel, fitness, photography, fashion, tech, business, art, music, nature</p>
      </div>

      {hashtags.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">{hashtags.length} hashtags generated</p>
            <button onClick={copyAll} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors">
              {copied ? "Copied!" : "Copy All"}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-muted p-4">
            {hashtags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
