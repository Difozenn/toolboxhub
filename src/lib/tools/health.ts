import type { Tool } from "../types";

export const healthTools: Tool[] = [
  { slug: "calorie-calculator", name: "Calorie Calculator", description: "Calculate daily calorie needs based on age, weight, height, and activity level.", category: "health", icon: "🔥", keywords: ["calorie calculator", "daily calories", "calorie needs", "calorie intake"], subcategory: "nutrition", template: "simple-calculator",
    longDescription: "Calculate your daily calorie requirements based on your age, gender, weight, height, and activity level using the Mifflin-St Jeor equation. Get recommendations for maintenance, weight loss, and weight gain goals. Understanding your calorie needs is the foundation of any nutrition plan.",
    faqs: [
      { question: "How are daily calories calculated?", answer: "We use the Mifflin-St Jeor equation, which calculates your Basal Metabolic Rate (BMR) and multiplies it by an activity factor." },
      { question: "What activity level should I choose?", answer: "Sedentary: desk job, little exercise. Lightly active: 1-3 days/week. Moderate: 3-5 days/week. Very active: 6-7 days/week. Extra active: very intense daily exercise." }
    ],
    howToSteps: [
      { name: "Enter details", text: "Input your age, gender, weight, height, and activity level." },
      { name: "View results", text: "See your BMR and total daily calorie needs." },
      { name: "Choose goal", text: "View calorie targets for maintenance, weight loss, or weight gain." }
    ],
    useCases: ["Planning a weight loss diet", "Building a meal plan", "Tracking fitness goals", "Understanding nutritional needs"],
    relatedSlugs: ["bmr-calculator", "tdee-calculator", "macro-calculator", "bmi-calculator"]
  },
  { slug: "bmr-calculator", name: "BMR Calculator", description: "Calculate your Basal Metabolic Rate — calories burned at rest.", category: "health", icon: "💤", keywords: ["bmr calculator", "basal metabolic rate", "metabolism", "resting calories"], subcategory: "body", template: "simple-calculator",
    relatedSlugs: ["calorie-calculator", "tdee-calculator", "bmi-calculator"]
  },
  { slug: "tdee-calculator", name: "TDEE Calculator", description: "Calculate Total Daily Energy Expenditure based on activity level.", category: "health", icon: "⚡", keywords: ["tdee calculator", "total daily energy", "energy expenditure", "daily burn"], subcategory: "body", template: "simple-calculator",
    relatedSlugs: ["calorie-calculator", "bmr-calculator", "macro-calculator"]
  },
  { slug: "body-fat-calculator", name: "Body Fat Calculator", description: "Estimate body fat percentage using the US Navy method.", category: "health", icon: "📏", keywords: ["body fat calculator", "body fat percentage", "navy method", "body composition"], subcategory: "body", template: "simple-calculator",
    relatedSlugs: ["bmi-calculator", "ideal-weight-calculator", "calorie-calculator"]
  },
  { slug: "ideal-weight-calculator", name: "Ideal Weight Calculator", description: "Calculate your ideal weight range based on height and frame size.", category: "health", icon: "⚖️", keywords: ["ideal weight", "healthy weight", "weight range", "target weight"], subcategory: "body", template: "simple-calculator",
    relatedSlugs: ["bmi-calculator", "body-fat-calculator", "calorie-calculator"]
  },
  { slug: "pregnancy-due-date", name: "Pregnancy Due Date Calculator", description: "Estimate your due date based on your last menstrual period.", category: "health", icon: "👶", keywords: ["due date calculator", "pregnancy calculator", "expected delivery", "gestational age"], subcategory: "medical", template: "simple-calculator",
    relatedSlugs: ["age-calculator", "date-difference", "days-until"]
  },
  { slug: "water-intake-calculator", name: "Water Intake Calculator", description: "Calculate how much water you should drink daily based on weight and activity.", category: "health", icon: "💧", keywords: ["water intake", "hydration calculator", "daily water", "water needs"], subcategory: "nutrition", template: "simple-calculator",
    relatedSlugs: ["calorie-calculator", "bmr-calculator", "macro-calculator"]
  },
  { slug: "macro-calculator", name: "Macro Calculator", description: "Calculate optimal macronutrient ratios (protein, carbs, fat) for your goals.", category: "health", icon: "🥗", keywords: ["macro calculator", "macronutrients", "protein calculator", "carb calculator"], subcategory: "nutrition", template: "simple-calculator",
    relatedSlugs: ["calorie-calculator", "tdee-calculator", "protein-intake-calculator"]
  },
  { slug: "heart-rate-zones", name: "Heart Rate Zone Calculator", description: "Calculate target heart rate zones for cardio training.", category: "health", icon: "❤️", keywords: ["heart rate zones", "target heart rate", "cardio zones", "training zones"], subcategory: "exercise", template: "simple-calculator",
    relatedSlugs: ["pace-calculator", "calorie-calculator", "bmi-calculator"]
  },
  { slug: "pace-calculator", name: "Running Pace Calculator", description: "Calculate running pace, speed, and finish time for any distance.", category: "health", icon: "🏃", keywords: ["pace calculator", "running pace", "finish time", "running speed"], subcategory: "exercise", template: "simple-calculator",
    relatedSlugs: ["heart-rate-zones", "calorie-calculator", "stopwatch"]
  },
  { slug: "bac-calculator", name: "BAC Calculator", description: "Estimate blood alcohol content based on drinks, weight, and time.", category: "health", icon: "🍺", keywords: ["bac calculator", "blood alcohol", "alcohol calculator", "drunk calculator"], subcategory: "medical", template: "simple-calculator",
    relatedSlugs: ["bmi-calculator", "calorie-calculator", "water-intake-calculator"]
  },
  { slug: "sleep-calculator", name: "Sleep Cycle Calculator", description: "Calculate optimal bedtime and wake-up times based on sleep cycles.", category: "health", icon: "😴", keywords: ["sleep calculator", "sleep cycle", "bedtime calculator", "wake up time"], subcategory: "medical", template: "simple-calculator",
    relatedSlugs: ["pomodoro-timer", "countdown-timer", "age-calculator"]
  },
  { slug: "ovulation-calculator", name: "Ovulation Calculator", description: "Estimate ovulation dates and fertile window from cycle data.", category: "health", icon: "📅", keywords: ["ovulation calculator", "fertility calculator", "fertile window", "cycle tracker"], subcategory: "medical", template: "simple-calculator",
    relatedSlugs: ["pregnancy-due-date", "date-difference", "age-calculator"]
  },
  { slug: "protein-intake-calculator", name: "Protein Intake Calculator", description: "Calculate daily protein needs based on weight and fitness goals.", category: "health", icon: "💪", keywords: ["protein calculator", "protein intake", "daily protein", "protein needs"], subcategory: "nutrition", template: "simple-calculator",
    relatedSlugs: ["macro-calculator", "calorie-calculator", "tdee-calculator"]
  },
  { slug: "one-rep-max", name: "One Rep Max Calculator", description: "Estimate your one-rep max from the weight and reps of a set.", category: "health", icon: "🏋️", keywords: ["one rep max", "1rm calculator", "max lift", "strength calculator"], subcategory: "exercise", template: "simple-calculator",
    relatedSlugs: ["heart-rate-zones", "pace-calculator", "bmi-calculator"]
  },
  { slug: "waist-hip-ratio", name: "Waist-to-Hip Ratio Calculator", description: "Calculate your waist-to-hip ratio to assess health risk.", category: "health", icon: "📏", keywords: ["waist hip ratio", "whr calculator", "body shape", "health risk"], subcategory: "body", template: "simple-calculator",
    relatedSlugs: ["bmi-calculator", "body-fat-calculator", "ideal-weight-calculator"]
  },
];
