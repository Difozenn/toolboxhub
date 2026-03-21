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
    longDescription: "Find a future or past date by adding or subtracting any number of days, weeks, months, or years from a starting date. Perfect for calculating deadlines, expiry dates, scheduled events, or any situation where you need to offset a date by a specific duration.",
    faqs: [
      { question: "Can I add months and years, not just days?", answer: "Yes, you can add or subtract days, weeks, months, or years and combine multiple units in a single calculation." },
      { question: "Does it handle month-end edge cases?", answer: "Yes, adding one month to January 31 correctly returns the last day of February rather than an invalid date." }
    ],
    howToSteps: [
      { name: "Enter the start date", text: "Select or type your starting date." },
      { name: "Enter the offset", text: "Type the number of days, weeks, months, or years to add or subtract." },
      { name: "View the result date", text: "See the resulting date with full day-of-week information." }
    ],
    useCases: ["Calculating contract or warranty expiry dates", "Finding a date N days from today for project deadlines", "Determining subscription renewal dates", "Calculating return or refund windows"],
    relatedSlugs: ["date-difference", "days-until", "business-days-calculator"]
  },
  { slug: "days-until", name: "Days Until Calculator", description: "Calculate how many days until a specific date or event.", category: "datetime", icon: "⏳", keywords: ["days until", "countdown", "days remaining", "how many days"], subcategory: "countdowns", template: "simple-calculator",
    longDescription: "Find out exactly how many days, weeks, and months remain until any future date. Great for counting down to birthdays, holidays, vacations, exams, and important deadlines. Updates in real time based on today's date.",
    faqs: [
      { question: "Can I count down to a specific time as well as a date?", answer: "Yes, you can enter a specific date and time to get the countdown in days, hours, minutes, and seconds." },
      { question: "What if the date has already passed?", answer: "If the target date is in the past, the tool shows how many days ago it occurred instead." }
    ],
    howToSteps: [
      { name: "Enter the target date", text: "Select or type the future date you want to count down to." },
      { name: "Optionally add a label", text: "Give your countdown a name like 'Vacation' or 'Project Deadline'." },
      { name: "View the countdown", text: "See the number of days, weeks, and months remaining until the event." }
    ],
    useCases: ["Counting down to a birthday or anniversary", "Tracking days until a holiday or vacation", "Monitoring time remaining until an exam or deadline", "Building anticipation for product launches or events"],
    relatedSlugs: ["date-difference", "countdown-timer", "add-subtract-days"]
  },
  { slug: "week-number", name: "Week Number Calculator", description: "Find the ISO week number for any date and see the full week calendar.", category: "datetime", icon: "📆", keywords: ["week number", "iso week", "calendar week", "week of year"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "Find the ISO 8601 week number for any date and see the full calendar week it belongs to, including start and end dates. Useful for project scheduling, payroll periods, and any business process that references weeks by number.",
    faqs: [
      { question: "What is ISO week numbering?", answer: "ISO 8601 defines week 1 as the week containing the year's first Thursday. Weeks run Monday to Sunday, and a year can have 52 or 53 weeks." },
      { question: "Can I look up which dates fall in a given week number?", answer: "Yes, you can enter a year and week number to find the exact Monday-to-Sunday date range for that week." }
    ],
    howToSteps: [
      { name: "Enter a date", text: "Select or type the date you want to look up." },
      { name: "View the week number", text: "See the ISO week number and the full Monday-to-Sunday range for that week." },
      { name: "Navigate weeks", text: "Step forward or backward through weeks to explore the calendar." }
    ],
    useCases: ["Identifying week numbers for project planning and scheduling", "Calculating payroll or billing periods by week number", "Coordinating international business schedules that use ISO weeks", "Reporting and analytics that aggregate data by week"],
    relatedSlugs: ["date-difference", "add-subtract-days", "business-days-calculator"]
  },
  { slug: "business-days-calculator", name: "Business Days Calculator", description: "Calculate the number of business days (excluding weekends) between dates.", category: "datetime", icon: "💼", keywords: ["business days", "working days", "weekdays", "work days calculator"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "Calculate the number of working days between two dates, excluding weekends. Optionally exclude public holidays for a specific country to get accurate business day counts for SLAs, project planning, and contractual deadlines.",
    faqs: [
      { question: "Does it exclude public holidays?", answer: "You can optionally select a country to exclude that country's public holidays from the business day count." },
      { question: "Can I add a number of business days to a date?", answer: "Yes, use the offset mode to find the date that falls N business days from a start date." }
    ],
    howToSteps: [
      { name: "Enter start and end dates", text: "Select the date range you want to calculate business days for." },
      { name: "Choose holiday settings", text: "Optionally select a country to exclude public holidays." },
      { name: "View the count", text: "See the number of business days between the two dates." }
    ],
    useCases: ["Calculating SLA or contract turnaround times", "Planning project delivery schedules excluding weekends", "Determining invoice payment due dates in business days", "HR and payroll calculations for working day counts"],
    relatedSlugs: ["date-difference", "add-subtract-days", "days-until"]
  },
  { slug: "time-duration-calculator", name: "Time Duration Calculator", description: "Calculate duration between two times and add/subtract time intervals.", category: "datetime", icon: "⏱️", keywords: ["time calculator", "hours between", "time difference", "duration calculator"], subcategory: "calculators",
    longDescription: "Calculate the exact duration between two times of day in hours, minutes, and seconds. Also add or subtract time intervals to find a future or past time. Useful for timesheet calculations, scheduling, cooking, and any task that requires precise time math.",
    faqs: [
      { question: "Does it handle times that span midnight?", answer: "Yes, the calculator correctly handles time ranges that cross midnight, such as a shift from 10 PM to 6 AM." },
      { question: "Can I add hours and minutes to a given time?", answer: "Yes, use the time addition mode to find what time it will be after a specific duration." }
    ],
    howToSteps: [
      { name: "Enter the start time", text: "Type the start time in 12-hour or 24-hour format." },
      { name: "Enter the end time or duration", text: "Input the end time to find the duration, or enter a duration to find the resulting time." },
      { name: "View the result", text: "See the duration in hours and minutes, or the calculated future or past time." }
    ],
    useCases: ["Calculating hours worked for timesheets", "Scheduling meetings and appointments across time blocks", "Measuring elapsed time for cooking or fitness", "Planning shift schedules or work rotations"],
    relatedSlugs: ["date-difference", "timezone-converter", "stopwatch"]
  },
  { slug: "unix-timestamp-now", name: "Current Unix Timestamp", description: "View the current Unix timestamp updating in real-time with conversions.", category: "datetime", icon: "🕐", keywords: ["unix timestamp", "current timestamp", "epoch time", "timestamp now"], subcategory: "converters",
    longDescription: "Display the current Unix timestamp (seconds since January 1, 1970 UTC) updating live in real time. Convert the current timestamp to human-readable date and time in multiple formats and time zones. Essential for developers working with time-based APIs and databases.",
    faqs: [
      { question: "What is a Unix timestamp?", answer: "A Unix timestamp is the number of seconds elapsed since January 1, 1970, at 00:00:00 UTC. It is a standard way to represent points in time in programming and databases." },
      { question: "Can I convert a specific Unix timestamp to a date?", answer: "Yes, enter any Unix timestamp value and the tool will convert it to a human-readable date and time." }
    ],
    howToSteps: [
      { name: "View the live timestamp", text: "The current Unix timestamp displays and updates every second automatically." },
      { name: "Convert to a readable date", text: "See the current timestamp expressed as a full date and time in your local timezone and UTC." },
      { name: "Convert a custom timestamp", text: "Enter any Unix timestamp to convert it to a human-readable date." }
    ],
    useCases: ["Getting the current epoch time for API request parameters", "Debugging timestamp values in application logs", "Converting database timestamp fields to readable dates", "Synchronizing time-based events across systems"],
    relatedSlugs: ["timestamp-converter", "timezone-converter", "date-difference"]
  },
  { slug: "calendar-generator", name: "Calendar Generator", description: "Generate printable monthly and yearly calendars.", category: "datetime", icon: "📅", keywords: ["calendar generator", "printable calendar", "monthly calendar", "yearly calendar"], subcategory: "calculators",
    longDescription: "Generate clean, printable monthly or yearly calendars for any month and year. Customize the start day of the week and optionally mark public holidays. Perfect for planning, scheduling, printing, or embedding in documents.",
    faqs: [
      { question: "Can I choose the first day of the week?", answer: "Yes, you can set the week to start on Sunday or Monday depending on your regional preference." },
      { question: "Can I print the calendar?", answer: "Yes, the generated calendar is formatted for clean printing directly from your browser." }
    ],
    howToSteps: [
      { name: "Choose month and year", text: "Select the month and year for the calendar you want to generate." },
      { name: "Set preferences", text: "Choose the start day and any other display options." },
      { name: "Print or copy", text: "Print the calendar directly or copy it to use in a document." }
    ],
    useCases: ["Creating printable monthly planners", "Generating yearly overview calendars for offices or schools", "Planning project timelines on a printed calendar", "Producing custom calendars for newsletters or reports"],
    relatedSlugs: ["week-number", "date-difference", "days-until"]
  },
  { slug: "age-in-days", name: "Age in Days Calculator", description: "Find out exactly how many days, hours, and minutes old you are.", category: "datetime", icon: "🎂", keywords: ["age in days", "days old", "exact age", "how many days old"], subcategory: "calculators", template: "simple-calculator",
    longDescription: "Calculate exactly how many days, hours, and minutes old you are based on your birth date and time. A fun and precise way to see your age expressed in total days rather than years, great for milestone celebrations like turning 10,000 days old.",
    faqs: [
      { question: "Can I enter a birth time as well as a date?", answer: "Yes, you can specify your exact birth time for a precise calculation down to hours and minutes." },
      { question: "What is the 10,000 days milestone?", answer: "10,000 days is roughly 27 years and 4 months. Many people celebrate this as a fun life milestone." }
    ],
    howToSteps: [
      { name: "Enter your birthdate", text: "Select or type your date (and optionally time) of birth." },
      { name: "Calculate", text: "Click Calculate to compute your exact age in days." },
      { name: "View results", text: "See your total days, hours, and minutes of life, and find out when your next 1,000-day milestone is." }
    ],
    useCases: ["Celebrating milestone days like 10,000 days old", "Fun birthday trivia and social media posts", "Exact age calculations for novelty gifts or personalized cards", "Educational activities on time and calendar math"],
    relatedSlugs: ["age-calculator", "date-difference", "days-until"]
  },
  { slug: "leap-year-checker", name: "Leap Year Checker", description: "Check if any year is a leap year and see the next leap years.", category: "datetime", icon: "📆", keywords: ["leap year", "leap year checker", "is leap year", "next leap year"], subcategory: "calculators",
    longDescription: "Instantly check whether any given year is a leap year and understand why using the Gregorian calendar rules. Also see a list of upcoming leap years for future reference. Useful for calendar calculations, date validation, and educational purposes.",
    faqs: [
      { question: "What are the rules for a leap year?", answer: "A year is a leap year if it is divisible by 4, except for century years, which must be divisible by 400. So 2000 was a leap year, but 1900 was not." },
      { question: "How many days are in a leap year?", answer: "A leap year has 366 days, with February having 29 days instead of the usual 28." }
    ],
    howToSteps: [
      { name: "Enter a year", text: "Type the year you want to check." },
      { name: "Check", text: "Click Check to determine if the year is a leap year." },
      { name: "View nearby leap years", text: "See a list of the next several leap years for future planning." }
    ],
    useCases: ["Validating date inputs that include February 29", "Calendar and scheduling logic in software development", "Historical research involving February 29 birthdays", "Teaching calendar rules and exceptions in school"],
    relatedSlugs: ["date-difference", "week-number", "calendar-generator"]
  },
  { slug: "time-zone-map", name: "Time Zone Map", description: "Interactive world map showing all time zones with current times.", category: "datetime", icon: "🗺️", keywords: ["time zone map", "world time", "timezone map", "global time zones"], subcategory: "converters",
    longDescription: "Explore an interactive world map displaying current local times across all global time zones. Click any region to see its current time, UTC offset, and daylight saving status. Ideal for international scheduling, travel planning, and remote team coordination.",
    faqs: [
      { question: "Does it show daylight saving time adjustments?", answer: "Yes, the map reflects current daylight saving time rules for all regions, automatically adjusting UTC offsets when DST is in effect." },
      { question: "Can I see the time in multiple cities at once?", answer: "Yes, you can select multiple cities to compare their current local times side by side." }
    ],
    howToSteps: [
      { name: "Open the map", text: "The world map loads with all time zones color-coded by UTC offset." },
      { name: "Click a region", text: "Click any country or city on the map to see its current local time and UTC offset." },
      { name: "Compare time zones", text: "Select multiple locations to view their current times together for scheduling." }
    ],
    useCases: ["Scheduling meetings across international time zones", "Planning travel itineraries across multiple countries", "Coordinating remote team standups and events", "Understanding time zone differences for customer support teams"],
    relatedSlugs: ["timezone-converter", "world-clock", "unix-timestamp-now"]
  },
  { slug: "date-formatter", name: "Date Format Converter", description: "Convert dates between different formats (ISO, US, EU, Unix, etc.).", category: "datetime", icon: "🔄", keywords: ["date format", "date converter", "iso date", "date formatting"], subcategory: "converters",
    longDescription: "Convert any date between dozens of formats including ISO 8601, US (MM/DD/YYYY), European (DD/MM/YYYY), long-form English, Unix timestamp, and custom patterns. Quickly reformat dates for APIs, databases, documents, and international use.",
    faqs: [
      { question: "Which date formats are supported?", answer: "The tool supports ISO 8601, US, European, long-form English, RFC 2822, Unix timestamp, and custom format strings." },
      { question: "Can I define a custom output format?", answer: "Yes, use format tokens like YYYY, MM, DD, HH, mm, ss to define any custom date format pattern." }
    ],
    howToSteps: [
      { name: "Enter a date", text: "Type or paste the date you want to convert in any recognized format." },
      { name: "Choose the output format", text: "Select the target format from the preset list or enter a custom pattern." },
      { name: "Copy the result", text: "Copy the reformatted date for use in your document, code, or system." }
    ],
    useCases: ["Converting US date formats to ISO 8601 for API submissions", "Reformatting database date strings for display in user interfaces", "Translating date formats between international document standards", "Batch-converting date formats in exported data files"],
    relatedSlugs: ["timestamp-converter", "date-difference", "timezone-converter"]
  },
  { slug: "holiday-calculator", name: "Holiday Calculator", description: "Find public holidays and count working days for any country and year.", category: "datetime", icon: "🎉", keywords: ["holiday calculator", "public holidays", "bank holidays", "holiday dates"], subcategory: "calculators",
    longDescription: "Look up public and bank holidays for over 100 countries for any year, and calculate the number of working days in any period excluding those holidays. Useful for HR planning, payroll, project scheduling, and international business operations.",
    faqs: [
      { question: "How many countries are supported?", answer: "The tool includes public holiday data for over 100 countries, covering major national, regional, and bank holidays." },
      { question: "Can I calculate working days excluding holidays?", answer: "Yes, select a country and date range to get an accurate count of working days that excludes both weekends and public holidays." }
    ],
    howToSteps: [
      { name: "Select a country and year", text: "Choose the country and year you want to look up holidays for." },
      { name: "View the holiday list", text: "See all public holidays with their dates and names." },
      { name: "Calculate working days", text: "Enter a date range to count working days excluding holidays and weekends." }
    ],
    useCases: ["HR planning for staffing and leave entitlements", "Calculating accurate project delivery timelines across countries", "International payroll and working-day calculations", "Planning around public holidays for marketing campaigns"],
    relatedSlugs: ["business-days-calculator", "calendar-generator", "date-difference"]
  },
  { slug: "countdown-to-new-year", name: "New Year Countdown", description: "Live countdown to the next New Year with days, hours, minutes, and seconds.", category: "datetime", icon: "🎆", keywords: ["new year countdown", "countdown", "new years eve", "year countdown"], subcategory: "countdowns",
    longDescription: "Watch a live countdown to the stroke of midnight on New Year's Eve, showing days, hours, minutes, and seconds ticking down in real time. Automatically targets the next upcoming New Year wherever you are in the world.",
    faqs: [
      { question: "Which time zone does the countdown use?", answer: "The countdown uses your local browser time zone so it counts down to midnight at your location." },
      { question: "Does it automatically switch to the next year after midnight?", answer: "Yes, once New Year's arrives the countdown resets automatically for the following year." }
    ],
    howToSteps: [
      { name: "Open the tool", text: "The countdown starts immediately, showing time remaining until midnight on January 1st." },
      { name: "Watch the timer", text: "See days, hours, minutes, and seconds counting down in real time." },
      { name: "Share the countdown", text: "Copy the link to share the live countdown with friends and family." }
    ],
    useCases: ["Building excitement for New Year's Eve celebrations", "Displaying a countdown on event screens or digital signage", "Sharing a festive countdown link on social media", "Marking the transition to a new year for global teams"],
    relatedSlugs: ["countdown-timer", "days-until", "holiday-calculator"]
  },
];
