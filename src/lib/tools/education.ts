import type { Tool } from "../types";

export const educationTools: Tool[] = [
  { slug: "grade-calculator", name: "Grade Calculator", description: "Calculate your final grade with weighted assignments and exams.", category: "education", icon: "📝", keywords: ["grade calculator", "final grade", "weighted grade", "class grade"], subcategory: "grades", template: "simple-calculator",
    longDescription: "Calculate your current or final grade in any class with weighted categories. Enter assignments, quizzes, exams, and projects with their weights to see your overall grade. Also calculates what you need on upcoming assignments to achieve a target grade.",
    relatedSlugs: ["gpa-calculator", "percentage-calculator", "average-calculator"]
  },
  { slug: "citation-generator", name: "Citation Generator", description: "Generate citations in APA, MLA, Chicago, and Harvard formats.", category: "education", icon: "📚", keywords: ["citation generator", "apa citation", "mla citation", "bibliography"], subcategory: "language",
    relatedSlugs: ["word-counter", "readability-checker", "lorem-ipsum"]
  },
  { slug: "flashcard-maker", name: "Flashcard Maker", description: "Create study flashcards with flip animations saved to your browser.", category: "education", icon: "🗂️", keywords: ["flashcard maker", "study cards", "flash cards", "study tool"], subcategory: "language",
    relatedSlugs: ["notepad", "pomodoro-timer", "random-number-generator"]
  },
  { slug: "periodic-table", name: "Interactive Periodic Table", description: "Browse elements with properties, electron configuration, and more.", category: "education", icon: "⚛️", keywords: ["periodic table", "elements", "chemistry", "atomic number"], subcategory: "science",
    relatedSlugs: ["scientific-calculator", "unit-converter", "number-to-words"]
  },
  { slug: "multiplication-table", name: "Multiplication Table", description: "Generate interactive multiplication tables up to any size.", category: "education", icon: "✖️", keywords: ["multiplication table", "times table", "math table", "multiplication chart"], subcategory: "math",
    relatedSlugs: ["scientific-calculator", "percentage-calculator", "fraction-calculator"]
  },
  { slug: "reading-speed-test", name: "Reading Speed Test", description: "Test your reading speed in words per minute with comprehension check.", category: "education", icon: "📖", keywords: ["reading speed", "wpm test", "reading test", "speed reading"], subcategory: "language",
    relatedSlugs: ["readability-checker", "word-counter", "pomodoro-timer"]
  },
  { slug: "math-quiz-generator", name: "Math Quiz Generator", description: "Generate random math practice quizzes with adjustable difficulty.", category: "education", icon: "🔢", keywords: ["math quiz", "practice problems", "math test", "arithmetic quiz"], subcategory: "math",
    relatedSlugs: ["multiplication-table", "percentage-calculator", "fraction-calculator"]
  },
  { slug: "essay-word-counter", name: "Essay Word Counter", description: "Count words with essay-specific features: page estimate, paragraph count, and reading time.", category: "education", icon: "📝", keywords: ["essay counter", "essay word count", "page count", "essay length"], subcategory: "language",
    relatedSlugs: ["word-counter", "readability-checker", "character-counter"]
  },
  { slug: "unit-circle", name: "Unit Circle Calculator", description: "Interactive unit circle showing sine, cosine, and tangent values.", category: "education", icon: "📐", keywords: ["unit circle", "trigonometry", "sine cosine", "trig values"], subcategory: "math",
    relatedSlugs: ["scientific-calculator", "angle-converter", "quadratic-solver"]
  },
  { slug: "binary-calculator", name: "Binary Calculator", description: "Perform arithmetic operations on binary numbers with step-by-step display.", category: "education", icon: "💻", keywords: ["binary calculator", "binary math", "binary addition", "binary operations"], subcategory: "math",
    relatedSlugs: ["number-base-converter", "text-to-binary", "hex-to-text"]
  },
  { slug: "significant-figures", name: "Significant Figures Calculator", description: "Round numbers to the correct number of significant figures.", category: "education", icon: "🔬", keywords: ["significant figures", "sig figs", "rounding", "precision"], subcategory: "science",
    relatedSlugs: ["scientific-calculator", "percentage-calculator", "average-calculator"]
  },
  { slug: "molecular-weight", name: "Molecular Weight Calculator", description: "Calculate the molecular weight of chemical compounds from their formula.", category: "education", icon: "⚗️", keywords: ["molecular weight", "molar mass", "chemical formula", "molecular mass"], subcategory: "science",
    relatedSlugs: ["periodic-table", "scientific-calculator", "unit-converter"]
  },
  { slug: "study-timer", name: "Study Timer", description: "Track study sessions with break reminders and progress logging.", category: "education", icon: "📚", keywords: ["study timer", "study session", "focus timer", "study tracker"], subcategory: "language",
    relatedSlugs: ["pomodoro-timer", "stopwatch", "flashcard-maker"]
  },
  { slug: "typing-speed-test", name: "Typing Speed Test", description: "Test your typing speed and accuracy with WPM and error tracking.", category: "education", icon: "⌨️", keywords: ["typing test", "typing speed", "wpm test", "typing practice"], subcategory: "language",
    relatedSlugs: ["reading-speed-test", "keyboard-tester", "stopwatch"]
  },
];
