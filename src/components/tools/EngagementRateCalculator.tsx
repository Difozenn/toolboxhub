"use client";

import { useState } from "react";

function getRating(rate: number): { label: string; color: string } {
  if (rate >= 6) return { label: "Excellent", color: "text-green-500" };
  if (rate >= 3) return { label: "Good", color: "text-primary" };
  if (rate >= 1) return { label: "Average", color: "text-yellow-500" };
  return { label: "Low", color: "text-red-500" };
}

export default function EngagementRateCalculator() {
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");

  const f = parseFloat(followers) || 0;
  const total = (parseFloat(likes) || 0) + (parseFloat(comments) || 0) + (parseFloat(shares) || 0);
  const rate = f > 0 ? (total / f) * 100 : 0;
  const rating = getRating(rate);

  const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <input type="number" min="0" value={value} onChange={(e) => onChange(e.target.value)} placeholder="0"
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <Field label="Total Followers" value={followers} onChange={setFollowers} />
        <div className="grid grid-cols-3 gap-3">
          <Field label="Likes" value={likes} onChange={setLikes} />
          <Field label="Comments" value={comments} onChange={setComments} />
          <Field label="Shares" value={shares} onChange={setShares} />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-2">
        <p className="text-sm text-muted-foreground">Engagement Rate</p>
        <p className="text-5xl font-bold text-primary">{rate.toFixed(2)}%</p>
        <p className={`text-lg font-semibold ${rating.color}`}>{rating.label}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { range: "0–1%", label: "Low", color: "bg-red-500/10 text-red-500" },
          { range: "1–3%", label: "Average", color: "bg-yellow-500/10 text-yellow-500" },
          { range: "3–6%", label: "Good", color: "bg-primary/10 text-primary" },
          { range: "6%+", label: "Excellent", color: "bg-green-500/10 text-green-500" },
        ].map((item) => (
          <div key={item.label} className={`rounded-lg p-3 text-center ${item.color}`}>
            <p className="text-sm font-bold">{item.range}</p>
            <p className="text-xs">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
