import type { Tool } from "../types";

export const mathTools: Tool[] = [
  // ── Existing (12) ──────────────────────────────────────────
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Calculate percentages, percentage change, and percentage differences.", category: "math", icon: "➗", keywords: ["percentage", "percent calculator", "percentage change"], subcategory: "calculators",
    relatedSlugs: ["discount-calculator", "tip-calculator", "margin-calculator"]
  },
  { slug: "scientific-calculator", name: "Scientific Calculator", description: "A full-featured scientific calculator with advanced math functions.", category: "math", icon: "🧮", keywords: ["scientific calculator", "math calculator", "advanced calculator"], subcategory: "calculators",
    relatedSlugs: ["percentage-calculator", "average-calculator", "fraction-calculator"]
  },
  { slug: "bmi-calculator", name: "BMI Calculator", description: "Calculate your Body Mass Index and see your health category.", category: "math", icon: "⚖️", keywords: ["bmi calculator", "body mass index", "weight calculator", "health calculator"], subcategory: "calculators",
    relatedSlugs: ["calorie-calculator", "ideal-weight-calculator", "body-fat-calculator"]
  },
  { slug: "age-calculator", name: "Age Calculator", description: "Calculate exact age in years, months, and days from a birthdate.", category: "math", icon: "🎂", keywords: ["age calculator", "birthday calculator", "date calculator", "how old am i"], subcategory: "calculators",
    relatedSlugs: ["date-difference", "days-until", "countdown-timer"]
  },
  { slug: "loan-calculator", name: "Loan Calculator", description: "Calculate monthly payments, total interest, and amortization schedules.", category: "math", icon: "🏦", keywords: ["loan calculator", "mortgage calculator", "emi calculator", "interest calculator"], subcategory: "calculators",
    relatedSlugs: ["mortgage-calculator", "compound-interest", "auto-loan-calculator"]
  },
  { slug: "compound-interest", name: "Compound Interest Calculator", description: "Calculate compound interest with customizable rates and periods.", category: "math", icon: "📈", keywords: ["compound interest", "interest calculator", "investment calculator", "savings calculator"], subcategory: "calculators",
    relatedSlugs: ["loan-calculator", "savings-goal-calculator", "roi-calculator"]
  },
  { slug: "tip-calculator", name: "Tip Calculator", description: "Calculate tips and split bills between multiple people.", category: "math", icon: "💰", keywords: ["tip calculator", "bill splitter", "gratuity calculator", "restaurant tip"], subcategory: "calculators",
    relatedSlugs: ["percentage-calculator", "discount-calculator", "vat-calculator"]
  },
  { slug: "discount-calculator", name: "Discount Calculator", description: "Calculate sale prices, discount amounts, and savings.", category: "math", icon: "🏷️", keywords: ["discount calculator", "sale price", "percentage off", "savings calculator"], subcategory: "calculators",
    relatedSlugs: ["percentage-calculator", "tip-calculator", "margin-calculator"]
  },
  { slug: "average-calculator", name: "Average Calculator", description: "Calculate mean, median, mode, and range of a set of numbers.", category: "math", icon: "📊", keywords: ["average calculator", "mean calculator", "median calculator", "statistics"], subcategory: "statistics",
    relatedSlugs: ["percentage-calculator", "scientific-calculator", "gpa-calculator"]
  },
  { slug: "roman-numeral-converter", name: "Roman Numeral Converter", description: "Convert between Roman numerals and decimal numbers.", category: "math", icon: "🏛️", keywords: ["roman numerals", "roman converter", "numeral converter", "roman to decimal"], subcategory: "calculators",
    relatedSlugs: ["number-base-converter", "scientific-calculator", "random-number-generator"]
  },
  { slug: "random-number-generator", name: "Random Number Generator", description: "Generate random numbers within a custom range.", category: "math", icon: "🎲", keywords: ["random number", "rng", "number generator", "dice roller"], subcategory: "calculators",
    relatedSlugs: ["dice-roller", "coin-flip", "password-generator"]
  },
  { slug: "gpa-calculator", name: "GPA Calculator", description: "Calculate your Grade Point Average from your course grades.", category: "math", icon: "🎓", keywords: ["gpa calculator", "grade calculator", "grade point average", "academic grades"], subcategory: "calculators",
    relatedSlugs: ["average-calculator", "percentage-calculator", "grade-calculator"]
  },

  // ── New Math Tools ──────────────────────────────────────────
  { slug: "fraction-calculator", name: "Fraction Calculator", description: "Add, subtract, multiply, and divide fractions with step-by-step solutions.", category: "math", icon: "🔢", keywords: ["fraction calculator", "fraction math", "mixed numbers", "simplify fractions"], subcategory: "calculators",
    relatedSlugs: ["percentage-calculator", "scientific-calculator", "average-calculator"]
  },
  { slug: "standard-deviation", name: "Standard Deviation Calculator", description: "Calculate standard deviation, variance, and other statistical measures.", category: "math", icon: "📊", keywords: ["standard deviation", "variance", "statistics", "data analysis"], subcategory: "statistics",
    relatedSlugs: ["average-calculator", "percentage-calculator", "scientific-calculator"]
  },
  { slug: "matrix-calculator", name: "Matrix Calculator", description: "Perform matrix operations: addition, multiplication, determinant, inverse, and transpose.", category: "math", icon: "🔢", keywords: ["matrix calculator", "matrix math", "linear algebra", "determinant"], subcategory: "calculators",
    relatedSlugs: ["scientific-calculator", "fraction-calculator", "average-calculator"]
  },
  { slug: "quadratic-solver", name: "Quadratic Equation Solver", description: "Solve quadratic equations and show the discriminant, roots, and vertex.", category: "math", icon: "📐", keywords: ["quadratic formula", "solve equation", "roots", "parabola"], subcategory: "calculators",
    relatedSlugs: ["scientific-calculator", "matrix-calculator", "fraction-calculator"]
  },
  { slug: "prime-checker", name: "Prime Number Checker", description: "Check if a number is prime and find prime factors.", category: "math", icon: "🔍", keywords: ["prime number", "prime checker", "prime factors", "factorization"], subcategory: "calculators",
    relatedSlugs: ["scientific-calculator", "random-number-generator", "gcd-lcm-calculator"]
  },
  { slug: "gcd-lcm-calculator", name: "GCD & LCM Calculator", description: "Calculate the Greatest Common Divisor and Least Common Multiple of numbers.", category: "math", icon: "🔗", keywords: ["gcd", "lcm", "greatest common divisor", "least common multiple"], subcategory: "calculators",
    relatedSlugs: ["prime-checker", "fraction-calculator", "scientific-calculator"]
  },
  { slug: "number-to-words", name: "Number to Words", description: "Convert numbers to their written word form in English.", category: "math", icon: "🔤", keywords: ["number to words", "number spelling", "write numbers", "number converter"], subcategory: "calculators",
    relatedSlugs: ["roman-numeral-converter", "number-base-converter", "scientific-calculator"]
  },
  { slug: "ratio-calculator", name: "Ratio Calculator", description: "Solve ratio and proportion problems with missing values.", category: "math", icon: "⚖️", keywords: ["ratio calculator", "proportion", "ratio solver", "scale factor"], subcategory: "calculators",
    relatedSlugs: ["percentage-calculator", "fraction-calculator", "recipe-scaler"]
  },
];
