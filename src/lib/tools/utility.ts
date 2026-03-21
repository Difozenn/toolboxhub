import type { Tool } from "../types";

export const utilityTools: Tool[] = [
  // ── Existing (5) ──────────────────────────────────────────
  { slug: "pomodoro-timer", name: "Pomodoro Timer", description: "Stay focused with the Pomodoro technique — 25 min work, 5 min break.", category: "utility", icon: "🍅", keywords: ["pomodoro", "timer", "focus timer", "productivity timer"], subcategory: "timers",
    relatedSlugs: ["countdown-timer", "stopwatch", "notepad"]
  },
  { slug: "countdown-timer", name: "Countdown Timer", description: "Set a countdown timer to any date or duration.", category: "utility", icon: "⏳", keywords: ["countdown timer", "timer", "event countdown", "date countdown"], subcategory: "timers",
    relatedSlugs: ["pomodoro-timer", "stopwatch", "days-until"]
  },
  { slug: "stopwatch", name: "Stopwatch", description: "A simple stopwatch with lap tracking functionality.", category: "utility", icon: "⏱️", keywords: ["stopwatch", "timer", "lap timer", "time tracker"], subcategory: "timers",
    relatedSlugs: ["pomodoro-timer", "countdown-timer", "pace-calculator"]
  },
  { slug: "notepad", name: "Online Notepad", description: "A simple browser-based notepad that saves to local storage.", category: "utility", icon: "📝", keywords: ["notepad", "online notepad", "text editor", "notes"], subcategory: "productivity",
    relatedSlugs: ["markdown-preview", "word-counter", "pomodoro-timer"]
  },
  { slug: "screen-resolution", name: "Screen Resolution Detector", description: "Detect your screen resolution, viewport size, and device pixel ratio.", category: "utility", icon: "🖥️", keywords: ["screen resolution", "viewport size", "screen size", "display info"], subcategory: "system",
    relatedSlugs: ["user-agent-parser", "image-resizer", "pixels-to-rem"]
  },

  // ── New Utility Tools ──────────────────────────────────────
  { slug: "color-blindness-simulator", name: "Color Blindness Simulator", description: "See how your designs look to people with different types of color blindness.", category: "utility", icon: "👁️", keywords: ["color blindness", "accessibility", "color vision", "a11y"], subcategory: "system",
    relatedSlugs: ["color-converter", "color-palette-generator", "image-filter"]
  },
  { slug: "aspect-ratio-calculator", name: "Aspect Ratio Calculator", description: "Calculate aspect ratios and resize dimensions proportionally.", category: "utility", icon: "📐", keywords: ["aspect ratio", "image ratio", "video ratio", "16:9 calculator"], subcategory: "system",
    relatedSlugs: ["image-resizer", "social-image-resizer", "screen-resolution"]
  },
  { slug: "text-to-speech", name: "Text to Speech", description: "Convert text to speech using your browser's built-in speech synthesis.", category: "utility", icon: "🔊", keywords: ["text to speech", "tts", "speech synthesis", "read aloud"], subcategory: "productivity",
    relatedSlugs: ["notepad", "word-counter", "readability-checker"]
  },
  { slug: "keyboard-tester", name: "Keyboard Tester", description: "Test every key on your keyboard and see which keys are working.", category: "utility", icon: "⌨️", keywords: ["keyboard test", "key tester", "keyboard check", "key press test"], subcategory: "system",
    relatedSlugs: ["screen-resolution", "user-agent-parser", "stopwatch"]
  },
  { slug: "internet-speed-test", name: "Internet Speed Test", description: "Test your internet download and upload speed.", category: "utility", icon: "📶", keywords: ["speed test", "internet speed", "bandwidth test", "download speed"], subcategory: "system",
    relatedSlugs: ["ip-address-lookup", "screen-resolution", "bytes-converter"]
  },
  { slug: "clipboard-manager", name: "Clipboard Manager", description: "Save and manage multiple clipboard items for quick access.", category: "utility", icon: "📋", keywords: ["clipboard", "clipboard manager", "copy paste", "clipboard history"], subcategory: "productivity",
    relatedSlugs: ["notepad", "text-repeater", "find-and-replace"]
  },
  { slug: "loan-comparison", name: "Loan Comparison Calculator", description: "Compare multiple loan offers side by side.", category: "utility", icon: "📊", keywords: ["loan comparison", "compare loans", "mortgage comparison", "interest comparison"], subcategory: "productivity",
    relatedSlugs: ["loan-calculator", "mortgage-calculator", "compound-interest"]
  },
  { slug: "habit-tracker", name: "Habit Tracker", description: "Track daily habits with a visual streak calendar saved to your browser.", category: "utility", icon: "✅", keywords: ["habit tracker", "daily tracker", "streak tracker", "habit calendar"], subcategory: "productivity",
    relatedSlugs: ["pomodoro-timer", "notepad", "countdown-timer"]
  },
  { slug: "battery-status", name: "Battery Status", description: "Check your device battery level, charging status, and estimated time.", category: "utility", icon: "🔋", keywords: ["battery status", "battery level", "charging status", "battery info"], subcategory: "system",
    relatedSlugs: ["screen-resolution", "keyboard-tester", "internet-speed-test"]
  },
  { slug: "world-clock", name: "World Clock", description: "View current time in multiple cities and time zones simultaneously.", category: "utility", icon: "🌍", keywords: ["world clock", "time zones", "global time", "international clock"], subcategory: "timers",
    relatedSlugs: ["timezone-converter", "countdown-timer", "stopwatch"]
  },
];
