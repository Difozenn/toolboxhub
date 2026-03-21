"use client";

import { useState } from "react";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", color: "bg-pink-500" },
  { id: "twitter", label: "Twitter", color: "bg-sky-500" },
  { id: "linkedin", label: "LinkedIn", color: "bg-blue-600" },
  { id: "tiktok", label: "TikTok", color: "bg-purple-500" },
  { id: "facebook", label: "Facebook", color: "bg-blue-500" },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TIME_SLOTS: Record<string, string[]> = {
  instagram: ["11:00 AM", "2:00 PM", "7:00 PM"],
  twitter: ["8:00 AM", "12:00 PM", "5:00 PM"],
  linkedin: ["7:30 AM", "10:00 AM", "12:00 PM"],
  tiktok: ["9:00 AM", "12:00 PM", "7:00 PM"],
  facebook: ["9:00 AM", "1:00 PM", "4:00 PM"],
};

interface ScheduleEntry {
  platform: string;
  time: string;
  color: string;
}

export default function SocialMediaCalendar() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [postsPerWeek, setPostsPerWeek] = useState(7);
  const [schedule, setSchedule] = useState<Record<string, ScheduleEntry[]>>({});

  const buttonClass =
    "rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";

  const togglePlatform = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const generate = () => {
    if (selected.size === 0) return;

    const activePlatforms = PLATFORMS.filter((p) => selected.has(p.id));
    const newSchedule: Record<string, ScheduleEntry[]> = {};

    DAYS.forEach((day) => {
      newSchedule[day] = [];
    });

    let postsAssigned = 0;
    let dayIndex = 0;

    while (postsAssigned < postsPerWeek) {
      const platform = activePlatforms[postsAssigned % activePlatforms.length];
      const day = DAYS[dayIndex % 7];
      const timeSlots = TIME_SLOTS[platform.id];
      const existingForDay = newSchedule[day].filter((e) => e.platform === platform.label).length;
      const time = timeSlots[existingForDay % timeSlots.length];

      newSchedule[day].push({
        platform: platform.label,
        time,
        color: platform.color,
      });

      postsAssigned++;
      dayIndex++;
    }

    setSchedule(newSchedule);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Select Platforms</label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => togglePlatform(p.id)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                selected.has(p.id)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted text-foreground hover:border-primary/50"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Posts Per Week: <span className="text-primary">{postsPerWeek}</span>
        </label>
        <input
          type="range"
          min={1}
          max={21}
          value={postsPerWeek}
          onChange={(e) => setPostsPerWeek(parseInt(e.target.value, 10))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1</span>
          <span>21</span>
        </div>
      </div>

      <button onClick={generate} disabled={selected.size === 0} className={buttonClass}>
        Generate Schedule
      </button>

      {Object.keys(schedule).length > 0 && (
        <div className="overflow-x-auto">
          <div className="grid min-w-[700px] grid-cols-7 gap-2">
            {DAYS.map((day) => (
              <div key={day} className="space-y-2">
                <div className="rounded-lg bg-muted px-2 py-2 text-center text-sm font-semibold text-foreground">
                  {day.slice(0, 3)}
                </div>
                {schedule[day]?.length > 0 ? (
                  schedule[day].map((entry, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-muted p-2 text-center"
                    >
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium text-white ${entry.color}`}
                      >
                        {entry.platform}
                      </span>
                      <p className="mt-1 text-xs text-muted-foreground">{entry.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                    Rest day
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
