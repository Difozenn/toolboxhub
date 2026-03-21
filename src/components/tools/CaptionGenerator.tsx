"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const buttonClass =
  "rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

type Platform = "Instagram" | "Twitter" | "LinkedIn" | "TikTok";
type Tone = "casual" | "professional" | "funny" | "inspiring";

const templates: Record<Tone, Record<Platform, string[]>> = {
  casual: {
    Instagram: [
      "Just vibing with {topic} today. Who else is into this? Drop a comment!",
      "No filter needed when it comes to {topic}. Pure magic right here.",
      "POV: You discovered {topic} and now you can't stop talking about it.",
    ],
    Twitter: [
      "{topic} hits different when you actually get it. Just saying.",
      "Hot take: {topic} is the best thing to happen this year. Fight me.",
      "Me, obsessing over {topic} at 2am. Again. No regrets.",
    ],
    LinkedIn: [
      "Been exploring {topic} lately and honestly, it's been a game changer for how I work.",
      "Quick thought on {topic} - sometimes the simplest ideas make the biggest difference.",
      "Anyone else geeking out over {topic}? Would love to swap notes.",
    ],
    TikTok: [
      "Wait until you see what {topic} can do. You're not ready for this.",
      "Things that just hit different: {topic}. Trust me on this one.",
      "Tell me you love {topic} without telling me you love {topic}.",
    ],
  },
  professional: {
    Instagram: [
      "Exploring the transformative potential of {topic}. Here's what we've learned so far.",
      "Our latest insights on {topic} are reshaping the way we approach our work.",
      "Proud to share our perspective on {topic}. Innovation starts with understanding.",
    ],
    Twitter: [
      "Key insight: {topic} is driving significant shifts in the industry. Here's why it matters.",
      "We've been analyzing {topic} and the data speaks for itself. Thread below.",
      "The future of {topic} is here. Organizations that adapt now will lead tomorrow.",
    ],
    LinkedIn: [
      "I've spent the last quarter deep-diving into {topic}, and the implications for our industry are profound. Here are 3 key takeaways.",
      "The conversation around {topic} is evolving rapidly. Leaders who understand this shift will have a decisive advantage.",
      "{topic} isn't just a trend - it's a fundamental shift in how we create value. Here's my analysis.",
    ],
    TikTok: [
      "Breaking down {topic} in 60 seconds. Here's what professionals need to know.",
      "The most important thing about {topic} that nobody is talking about.",
      "How {topic} is changing the game for professionals everywhere.",
    ],
  },
  funny: {
    Instagram: [
      "Me: I should focus on work. Also me: *researches {topic} for 3 hours straight*",
      "My therapist: {topic} can't hurt you. {topic}: *exists*. Me: *obsessed*",
      "If {topic} was a person, I'd probably propose by now. No shame.",
    ],
    Twitter: [
      "Scientists: We have limited brainpower. Me: Uses 99% of it thinking about {topic}.",
      "My {topic} obsession is not a phase, mom. It's a lifestyle.",
      "Plot twist: {topic} was the main character all along.",
    ],
    LinkedIn: [
      "Recruiter: What's your greatest strength? Me: I can talk about {topic} for 4 hours straight without notes.",
      "Added '{topic} enthusiast' to my LinkedIn headline. Connections went up 300%. Coincidence? I think not.",
      "My 5-year plan: Step 1 - Master {topic}. Steps 2-5 - see step 1.",
    ],
    TikTok: [
      "When someone says they don't care about {topic} *cue dramatic villain origin story*",
      "Things I'd rather do than stop talking about {topic}: absolutely nothing.",
      "POV: You're explaining {topic} to your friend for the 47th time this week.",
    ],
  },
  inspiring: {
    Instagram: [
      "Every great journey starts with a single step. Let {topic} be yours today.",
      "{topic} taught me that growth happens outside your comfort zone. Keep pushing forward.",
      "The world needs more people passionate about {topic}. Be the spark that ignites change.",
    ],
    Twitter: [
      "Don't wait for the perfect moment to explore {topic}. Start now, learn as you go, and watch the magic unfold.",
      "{topic} reminds us: progress isn't about perfection. It's about showing up every single day.",
      "The future belongs to those who believe in {topic}. Your time is now.",
    ],
    LinkedIn: [
      "{topic} has taught me that the most impactful changes start with a willingness to learn. Never stop being curious.",
      "In a world full of noise, {topic} is a reminder that meaningful work always finds its audience. Stay the course.",
      "The leaders I admire most share one thing: an unshakable belief in {topic}. What will your legacy be?",
    ],
    TikTok: [
      "This is your sign to start with {topic}. You're more ready than you think.",
      "Imagine where you'll be in a year if you commit to {topic} today. Now go make it happen.",
      "They said {topic} was impossible. They were wrong. Here's the proof.",
    ],
  },
};

export default function CaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [tone, setTone] = useState<Tone>("casual");
  const [captions, setCaptions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = () => {
    if (!topic.trim()) return;
    const result = templates[tone][platform].map((t) =>
      t.replace(/{topic}/g, topic.trim())
    );
    setCaptions(result);
    setCopiedIndex(null);
  };

  const copy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Topic / Context
          </label>
          <textarea
            className={inputClass}
            rows={3}
            placeholder="e.g. sustainable fashion, AI tools, morning routines..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Platform
            </label>
            <select
              className={inputClass}
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
            >
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter / X</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="TikTok">TikTok</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Tone
            </label>
            <select
              className={inputClass}
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
            >
              <option value="casual">Casual</option>
              <option value="professional">Professional</option>
              <option value="funny">Funny</option>
              <option value="inspiring">Inspiring</option>
            </select>
          </div>
        </div>

        <button onClick={generate} className={buttonClass}>
          Generate Captions
        </button>
      </div>

      {captions.length > 0 && (
        <div className="space-y-3">
          {captions.map((caption, idx) => (
            <div key={idx} className={cardClass.replace("text-center", "text-left")}>
              <div className="flex items-start justify-between gap-3">
                <p className="flex-1 text-sm text-foreground whitespace-pre-wrap">
                  {caption}
                </p>
                <button
                  onClick={() => copy(caption, idx)}
                  className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {copiedIndex === idx ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {caption.length} characters
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
