import type { Tool } from "../types";

export const gamingTools: Tool[] = [
  { slug: "dice-roller", name: "Dice Roller", description: "Roll virtual dice with custom sides, quantities, and modifiers.", category: "gaming", icon: "🎲", keywords: ["dice roller", "virtual dice", "d20", "dnd dice", "rpg dice"], subcategory: "random",
    longDescription: "Roll any combination of dice for tabletop RPGs, board games, or decisions. Supports standard dice (d4, d6, d8, d10, d12, d20, d100) and custom-sided dice. Roll multiple dice at once, add modifiers, and see individual results with totals. Includes dice roll history.",
    faqs: [
      { question: "How random are the dice rolls?", answer: "We use the Web Crypto API for cryptographically secure random number generation, making rolls truly random." },
      { question: "Can I roll multiple different dice?", answer: "Yes! Roll combinations like 2d6 + 1d8 + 3 for complex RPG scenarios." }
    ],
    relatedSlugs: ["coin-flip", "random-number-generator", "name-picker"]
  },
  { slug: "coin-flip", name: "Coin Flip", description: "Flip a virtual coin with realistic animation and history tracking.", category: "gaming", icon: "🪙", keywords: ["coin flip", "coin toss", "heads tails", "flip a coin"], subcategory: "random",
    relatedSlugs: ["dice-roller", "random-number-generator", "wheel-spinner"]
  },
  { slug: "name-picker", name: "Random Name Picker", description: "Pick random names or items from a list with animation.", category: "gaming", icon: "🎯", keywords: ["name picker", "random picker", "draw names", "random selector"], subcategory: "random",
    relatedSlugs: ["wheel-spinner", "team-generator", "dice-roller"]
  },
  { slug: "wheel-spinner", name: "Wheel Spinner", description: "Spin a customizable wheel to make random decisions with flair.", category: "gaming", icon: "🎡", keywords: ["wheel spinner", "spin wheel", "random wheel", "prize wheel"], subcategory: "random",
    relatedSlugs: ["name-picker", "coin-flip", "dice-roller"]
  },
  { slug: "team-generator", name: "Team Generator", description: "Randomly split a group of people into balanced teams.", category: "gaming", icon: "👥", keywords: ["team generator", "team maker", "random teams", "group splitter"], subcategory: "generators",
    relatedSlugs: ["name-picker", "dice-roller", "random-number-generator"]
  },
  { slug: "scoreboard", name: "Online Scoreboard", description: "Keep score for games with customizable player names and point tracking.", category: "gaming", icon: "🏆", keywords: ["scoreboard", "score keeper", "game score", "point tracker"], subcategory: "tools",
    relatedSlugs: ["dice-roller", "stopwatch", "team-generator"]
  },
  { slug: "trivia-generator", name: "Trivia Question Generator", description: "Generate random trivia questions across various categories.", category: "gaming", icon: "❓", keywords: ["trivia", "quiz questions", "trivia generator", "random trivia"], subcategory: "generators",
    relatedSlugs: ["math-quiz-generator", "flashcard-maker", "dice-roller"]
  },
  { slug: "bingo-card-generator", name: "Bingo Card Generator", description: "Generate printable bingo cards with custom numbers or words.", category: "gaming", icon: "🎱", keywords: ["bingo card", "bingo generator", "custom bingo", "bingo maker"], subcategory: "generators",
    relatedSlugs: ["random-number-generator", "team-generator", "name-picker"]
  },
  { slug: "truth-or-dare", name: "Truth or Dare Generator", description: "Generate truth or dare prompts for parties and gatherings.", category: "gaming", icon: "🎭", keywords: ["truth or dare", "party game", "dare generator", "truth questions"], subcategory: "generators",
    relatedSlugs: ["writing-prompt-generator", "trivia-generator", "dice-roller"]
  },
  { slug: "would-you-rather", name: "Would You Rather", description: "Generate fun 'would you rather' questions for parties and icebreakers.", category: "gaming", icon: "🤔", keywords: ["would you rather", "party game", "icebreaker", "conversation starter"], subcategory: "generators",
    relatedSlugs: ["truth-or-dare", "trivia-generator", "dice-roller"]
  },
  { slug: "reaction-time-test", name: "Reaction Time Test", description: "Test your reaction time with visual and audio cues.", category: "gaming", icon: "⚡", keywords: ["reaction time", "reaction test", "speed test", "reflex test"], subcategory: "tools",
    relatedSlugs: ["typing-speed-test", "stopwatch", "keyboard-tester"]
  },
  { slug: "number-guessing-game", name: "Number Guessing Game", description: "Guess the number with hints — a fun logic game with difficulty levels.", category: "gaming", icon: "🔢", keywords: ["number game", "guessing game", "logic game", "number puzzle"], subcategory: "tools",
    relatedSlugs: ["random-number-generator", "dice-roller", "math-quiz-generator"]
  },
  { slug: "countdown-number-game", name: "Countdown Numbers Game", description: "Reach the target number using basic operations — inspired by the TV show.", category: "gaming", icon: "🔢", keywords: ["countdown", "numbers game", "math game", "target number"], subcategory: "tools",
    relatedSlugs: ["scientific-calculator", "random-number-generator", "math-quiz-generator"]
  },
];
