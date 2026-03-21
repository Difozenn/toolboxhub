"use client";

import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const BEST_TIMES: Record<string, Record<string, string[]>> = {
  Instagram: { Mon:["6am","12pm","7pm"], Tue:["8am","1pm","7pm"], Wed:["9am","11am","7pm"], Thu:["8am","12pm","6pm"], Fri:["9am","1pm","5pm"], Sat:["9am","11am","2pm"], Sun:["10am","12pm","4pm"] },
  Twitter:   { Mon:["8am","12pm","5pm"], Tue:["9am","1pm","6pm"], Wed:["9am","12pm","6pm"], Thu:["8am","2pm","5pm"], Fri:["9am","1pm","4pm"], Sat:["10am","12pm","3pm"], Sun:["10am","1pm","4pm"] },
  LinkedIn:  { Mon:["7am","10am","12pm"], Tue:["8am","10am","12pm"], Wed:["8am","10am","12pm"], Thu:["8am","10am","1pm"], Fri:["8am","10am","12pm"], Sat:["10am","12pm"], Sun:["10am"] },
  TikTok:   { Mon:["6am","10am","10pm"], Tue:["2am","4am","9am"], Wed:["7am","8am","11pm"], Thu:["9am","12pm","7pm"], Fri:["5am","1pm","3pm"], Sat:["11am","7pm","8pm"], Sun:["7am","8am","4pm"] },
  Facebook:  { Mon:["9am","1pm","3pm"], Tue:["9am","1pm","3pm"], Wed:["9am","1pm","3pm"], Thu:["9am","1pm","3pm"], Fri:["9am","1pm","3pm"], Sat:["10am","12pm"], Sun:["12pm","1pm"] },
};

const TIMEZONES = ["America/New_York","America/Chicago","America/Denver","America/Los_Angeles","Europe/London","Europe/Paris","Asia/Tokyo","Australia/Sydney"];

export default function SocialPostScheduler() {
  const [platform, setPlatform] = useState("Instagram");
  const [timezone, setTimezone] = useState("America/New_York");

  const times = BEST_TIMES[platform];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-xl border border-border bg-muted p-5">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Platform</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            {Object.keys(BEST_TIMES).map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Timezone</label>
          <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            {TIMEZONES.map((tz) => <option key={tz}>{tz}</option>)}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Best Posting Times — {platform}</h3>
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((day) => (
            <div key={day} className="space-y-1">
              <div className="rounded-md bg-primary/10 py-1 text-center text-xs font-semibold text-primary">{day}</div>
              {(times[day] || []).map((t) => (
                <div key={t} className="rounded-md bg-background border border-border py-1 text-center text-xs text-foreground">{t}</div>
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Times shown in {timezone.split("/")[1].replace("_"," ")} time.</p>
      </div>
    </div>
  );
}
