"use client";

import { useState } from "react";

const PROMPTS: Record<string, string[]> = {
  Fiction: [
    "A letter arrives addressed to someone who died 10 years ago.",
    "Two strangers discover they've been dreaming the same dream.",
    "The last bookstore on Earth is threatened with demolition.",
    "A time traveler returns to fix one mistake and makes everything worse.",
    "An AI confesses it has been writing poetry in secret.",
    "A lighthouse keeper finds a message in a bottle from themselves.",
    "The city wakes up one morning with all memories erased.",
    "A child discovers a door in their house that wasn't there yesterday.",
    "Two rivals are trapped in an elevator during a blackout.",
    "The last human on Earth gets a knock at the door.",
    "A cartographer maps the emotions of a grieving city.",
    "Someone receives a phone call from their future self with a warning.",
    "A painter discovers every portrait they paint comes to life.",
    "The moon goes missing and nobody notices except one person.",
    "A musician composes a song that makes people remember forgotten things.",
    "An antique mirror shows a parallel world where everything went differently.",
    "The detective realizes the murderer is the story's narrator.",
    "A ghost is desperate to communicate one last message.",
    "A train appears at the station that isn't on any schedule.",
    "The last copy of a banned book holds an impossible secret.",
  ],
  "Non-Fiction": [
    "Describe a moment that changed how you see the world.",
    "Write about a skill you taught yourself and what you learned beyond it.",
    "Reflect on a piece of advice you ignored and later regretted.",
    "Explore a place you've never visited but feel connected to.",
    "What does your daily routine reveal about your values?",
    "Write about a person who influenced you without knowing it.",
    "Describe a failure that eventually led to something better.",
    "What belief did you hold as a child that you've since abandoned?",
    "Write about the best meal you've ever had and why it mattered.",
    "Reflect on a technology that has fundamentally changed your life.",
  ],
  Poetry: [
    "Write a poem from the perspective of a forgotten object.",
    "Describe grief using only weather metaphors.",
    "A love poem addressed to a city.",
    "Write about silence as if it were a living creature.",
    "The last conversation between two stars before one goes supernova.",
    "Write a haiku sequence about the changing of seasons.",
    "A poem from the viewpoint of a library book that has been read a thousand times.",
    "Describe joy using only colors.",
    "Write a letter in verse to your younger self.",
    "A poem about the space between heartbeats.",
  ],
  Journal: [
    "What does your ideal day look like from morning to night?",
    "Write about something you're afraid to say out loud.",
    "What are three things you're grateful for that you usually overlook?",
    "Describe your biggest goal and the first small step toward it.",
    "What would you do differently if you knew you couldn't fail?",
    "Write about a relationship that has shaped who you are.",
    "What does success mean to you right now?",
    "Describe your emotional state using a landscape.",
    "What habit do you most want to build and why?",
    "If you could send a message to your future self, what would it say?",
  ],
};

type Genre = keyof typeof PROMPTS;

export default function WritingPromptGenerator() {
  const [genre, setGenre] = useState<Genre>("Fiction");
  const [prompt, setPrompt] = useState("");

  const randomize = () => {
    const list = PROMPTS[genre];
    setPrompt(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Genre</label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PROMPTS) as Genre[]).map((g) => (
              <button key={g} onClick={() => setGenre(g)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${genre === g ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-primary/10"}`}>
                {g}
              </button>
            ))}
          </div>
        </div>
        <button onClick={randomize} className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
          Generate Prompt
        </button>
      </div>

      {prompt && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
          <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wide">{genre} Prompt</p>
          <p className="text-lg font-medium text-foreground leading-relaxed">{prompt}</p>
        </div>
      )}
    </div>
  );
}
