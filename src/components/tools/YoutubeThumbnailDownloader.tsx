"use client";

import { useState } from "react";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /^([A-Za-z0-9_-]{11})$/,
  ];
  for (const pat of patterns) {
    const m = url.match(pat);
    if (m) return m[1];
  }
  return null;
}

const QUALITIES = [
  { label: "Max Resolution", key: "maxresdefault" },
  { label: "High Quality", key: "hqdefault" },
  { label: "Medium Quality", key: "mqdefault" },
  { label: "Default", key: "default" },
];

export default function YoutubeThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleFetch = () => {
    const id = extractVideoId(url.trim());
    if (!id) {
      setError("Could not extract video ID. Please enter a valid YouTube URL.");
      setVideoId(null);
    } else {
      setError("");
      setVideoId(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">YouTube URL</label>
        <div className="flex gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFetch()}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button onClick={handleFetch} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
            Fetch
          </button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {videoId && (
        <div className="space-y-4">
          {QUALITIES.map(({ label, key }) => {
            const imgUrl = `https://img.youtube.com/vi/${videoId}/${key}.jpg`;
            return (
              <div key={key} className="rounded-xl border border-border bg-muted p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <a href={imgUrl} download={`thumbnail-${key}.jpg`} target="_blank" rel="noreferrer"
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors">
                    Download
                  </a>
                </div>
                <img src={imgUrl} alt={label} className="w-full rounded-lg object-cover" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
