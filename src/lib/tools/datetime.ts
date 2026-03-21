import type { Tool } from "../types";

export const datetimeTools: Tool[] = [
  { slug: "date-difference", name: "Date Difference Calculator", description: "Calculate the exact number of days, weeks, months, and years between two dates.", category: "datetime", icon: "📅", keywords: ["date difference", "days between dates", "date calculator", "date duration"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "Calculate the exact duration between any two dates. Get results in years, months, weeks, days, hours, and minutes. Perfect for calculating project timelines, contract durations, or how many days until an important event.",
    faqs: [
      { question: "Does it account for leap years?", answer: "Yes, the calculation correctly handles leap years and varying month lengths." },
      { question: "Can I calculate business days only?", answer: "Use our Business Days Calculator for weekday-only calculations." }
    ],
    howToSteps: [
      { name: "Enter start date", text: "Select or type the starting date." },
      { name: "Enter end date", text: "Select or type the ending date." },
      { name: "View results", text: "See the duration in multiple formats: years, months, weeks, and days." }
    ],
    useCases: ["Calculating project timelines", "Determining contract lengths", "Planning events", "Counting days until milestones"],
    relatedSlugs: ["days-until", "add-subtract-days", "business-days-calculator", "age-calculator"]
  },
  { slug: "add-subtract-days", name: "Add/Subtract Days Calculator", description: "Add or subtract days, weeks, months, or years from any date.", category: "datetime", icon: "➕", keywords: ["add days", "subtract days", "date add", "future date"], subcategory: "calculators", template: "simple-calculator",
    relatedSlugs: ["date-difference", "days-until", "business-days-calculator"]
  },
  { slug: "days-until", name: "Days Until Calculator", description: "Calculate how many days until a specific date or event.", category: "datetime", icon: "⏳", keywords: ["days until", "countdown", "days remaining", "how many days"], subcategory: "countdowns", template: "simple-calculator",
    relatedSlugs: ["date-difference", "countdown-timer", "add-subtract-days"]
  },
  { slug: "week-number", name: "Week Number Calculator", description: "Find the ISO week number for any date and see the full week calendar.", category: "datetime", icon: "📆", keywords: ["week number", "iso week", "calendar week", "week of year"], subcategory: "calculators", template: "simple-calculator",
    relatedSlugs: ["date-difference", "add-subtract-days", "business-days-calculator"]
  },
  { slug: "business-days-calculator", name: "Business Days Calculator", description: "Calculate the number of business days (excluding weekends) between dates.", category: "datetime", icon: "💼", keywords: ["business days", "working days", "weekdays", "work days calculator"], subcategory: "calculators", template: "simple-calculator",
    relatedSlugs: ["date-difference", "add-subtract-days", "days-until"]
  },
  { slug: "time-duration-calculator", name: "Time Duration Calculator", description: "Calculate duration between two times and add/subtract time intervals.", category: "datetime", icon: "⏱️", keywords: ["time calculator", "hours between", "time difference", "duration calculator"], subcategory: "calculators",
    relatedSlugs: ["date-difference", "timezone-converter", "stopwatch"]
  },
  { slug: "unix-timestamp-now", name: "Current Unix Timestamp", description: "View the current Unix timestamp updating in real-time with conversions.", category: "datetime", icon: "🕐", keywords: ["unix timestamp", "current timestamp", "epoch time", "timestamp now"], subcategory: "converters",
    relatedSlugs: ["timestamp-converter", "timezone-converter", "date-difference"]
  },
  { slug: "calendar-generator", name: "Calendar Generator", description: "Generate printable monthly and yearly calendars.", category: "datetime", icon: "📅", keywords: ["calendar generator", "printable calendar", "monthly calendar", "yearly calendar"], subcategory: "calculators",
    relatedSlugs: ["week-number", "date-difference", "days-until"]
  },
  { slug: "age-in-days", name: "Age in Days Calculator", description: "Find out exactly how many days, hours, and minutes old you are.", category: "datetime", icon: "🎂", keywords: ["age in days", "days old", "exact age", "how many days old"], subcategory: "calculators", template: "simple-calculator",
    relatedSlugs: ["age-calculator", "date-difference", "days-until"]
  },
  { slug: "leap-year-checker", name: "Leap Year Checker", description: "Check if any year is a leap year and see the next leap years.", category: "datetime", icon: "📆", keywords: ["leap year", "leap year checker", "is leap year", "next leap year"], subcategory: "calculators",
    relatedSlugs: ["date-difference", "week-number", "calendar-generator"]
  },
  { slug: "time-zone-map", name: "Time Zone Map", description: "Interactive world map showing all time zones with current times.", category: "datetime", icon: "🗺️", keywords: ["time zone map", "world time", "timezone map", "global time zones"], subcategory: "converters",
    relatedSlugs: ["timezone-converter", "world-clock", "unix-timestamp-now"]
  },
  { slug: "date-formatter", name: "Date Format Converter", description: "Convert dates between different formats (ISO, US, EU, Unix, etc.).", category: "datetime", icon: "🔄", keywords: ["date format", "date converter", "iso date", "date formatting"], subcategory: "converters",
    relatedSlugs: ["timestamp-converter", "date-difference", "timezone-converter"]
  },
  { slug: "holiday-calculator", name: "Holiday Calculator", description: "Find public holidays and count working days for any country and year.", category: "datetime", icon: "🎉", keywords: ["holiday calculator", "public holidays", "bank holidays", "holiday dates"], subcategory: "calculators",
    relatedSlugs: ["business-days-calculator", "calendar-generator", "date-difference"]
  },
  { slug: "countdown-to-new-year", name: "New Year Countdown", description: "Live countdown to the next New Year with days, hours, minutes, and seconds.", category: "datetime", icon: "🎆", keywords: ["new year countdown", "countdown", "new years eve", "year countdown"], subcategory: "countdowns",
    relatedSlugs: ["countdown-timer", "days-until", "holiday-calculator"]
  },
];
