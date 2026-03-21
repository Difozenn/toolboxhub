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
  { slug: "timezone-abbreviations", name: "Timezone Abbreviations", description: "Look up timezone abbreviations like EST, PST, GMT, IST, and more.", category: "datetime", icon: "🔤", keywords: ["timezone abbreviation", "est pst gmt", "timezone lookup", "timezone code"], subcategory: "converters",
    longDescription: "Look up any timezone abbreviation to find the full timezone name, UTC offset, and the countries or regions that use it. Timezone abbreviations like EST, PST, IST, and AEST are frequently encountered in scheduling and software, and this reference tool instantly clarifies what each one means and its current offset from UTC.",
    faqs: [
      { question: "Why are timezone abbreviations confusing?", answer: "Many abbreviations are reused for different timezones — for example, 'CST' can refer to Central Standard Time (UTC-6), China Standard Time (UTC+8), or Cuba Standard Time (UTC-5)." },
      { question: "Does the lookup show DST adjustments?", answer: "Yes. For timezones that observe daylight saving time, the tool shows both standard and daylight abbreviations (e.g., EST vs EDT) along with the dates when the switch occurs." },
      { question: "How many abbreviations are in the database?", answer: "The database includes hundreds of timezone abbreviations from around the world, covering all major and many minor timezones." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Type a timezone abbreviation (e.g., EST, IST, AEST) into the search field." },
      { name: "Step 2", text: "View the full timezone name, UTC offset, and regions that use it." },
      { name: "Step 3", text: "Check the daylight saving time variant if the timezone observes DST." }
    ],
    useCases: [
      "Decoding timezone abbreviations in international email signatures and meeting invites",
      "Identifying the correct UTC offset for a timezone abbreviation in code",
      "Resolving ambiguous abbreviations that represent multiple different timezones",
      "Reference guide for teams working across multiple international time zones"
    ],
    relatedSlugs: ["timezone-converter", "world-clock", "unix-timestamp-now"]
  },
  { slug: "epoch-converter", name: "Epoch Converter", description: "Convert epoch milliseconds or seconds to human-readable dates and back.", category: "datetime", icon: "⏰", keywords: ["epoch converter", "epoch to date", "milliseconds to date", "timestamp to date"], subcategory: "converters",
    longDescription: "Convert any epoch timestamp — in seconds or milliseconds — to a human-readable date and time, or convert any date back to epoch format. Epoch timestamps are widely used in databases, APIs, and programming, and this tool makes it trivial to convert between machine time and readable dates in any timezone.",
    faqs: [
      { question: "What is the difference between epoch seconds and milliseconds?", answer: "Epoch seconds count seconds since January 1, 1970 UTC. Milliseconds count thousandths of a second — so multiply seconds by 1000 to get milliseconds. JavaScript uses milliseconds by default; most Unix systems use seconds." },
      { question: "Can I convert a date to epoch format?", answer: "Yes. Enter any date and time and the tool instantly returns the corresponding epoch timestamp in both seconds and milliseconds." },
      { question: "What timezone does the conversion use?", answer: "The tool shows the converted date in your local timezone by default, with an option to view it in UTC or any other timezone." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste your epoch timestamp (in seconds or milliseconds) into the input field, or enter a date to convert to epoch." },
      { name: "Step 2", text: "Select whether your input is in seconds or milliseconds." },
      { name: "Step 3", text: "View the human-readable date and time, or copy the epoch value for use in your code or database." }
    ],
    useCases: [
      "Decoding epoch timestamps from API responses and log files",
      "Converting dates to epoch format for database queries and comparisons",
      "Debugging time-related bugs in backend systems and distributed logs",
      "Converting event timestamps across different systems that use different epoch formats"
    ],
    relatedSlugs: ["unix-timestamp-now", "date-formatter", "timezone-converter"]
  },
  { slug: "date-range-generator", name: "Date Range Generator", description: "Generate a list of all dates between two specified dates.", category: "datetime", icon: "📋", keywords: ["date range", "date list", "generate dates", "dates between"], subcategory: "calculators",
    longDescription: "Generate a complete list of every date between any two given dates, with options to filter by weekdays only, specific days of the week, or include custom formatting for output. Ideal for populating spreadsheets, generating report periods, or creating date sequences for data analysis and scheduling.",
    faqs: [
      { question: "Can I generate only weekdays in a date range?", answer: "Yes. Toggle the 'Weekdays Only' option to exclude weekends from the generated list, useful for business day sequences and work schedules." },
      { question: "What date formats can I export the list in?", answer: "The list can be formatted as ISO (YYYY-MM-DD), US (MM/DD/YYYY), European (DD/MM/YYYY), or long-form English, and exported as a comma-separated or newline-separated list." },
      { question: "Is there a limit on how long the date range can be?", answer: "The tool can handle ranges of several years, generating thousands of dates. Very large ranges may take a moment to process." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your start date and end date to define the range." },
      { name: "Step 2", text: "Choose any filters such as weekdays only or specific days of the week, and select your preferred output format." },
      { name: "Step 3", text: "Copy the generated date list and paste it into your spreadsheet, report, or application." }
    ],
    useCases: [
      "Populating a spreadsheet column with all dates in a billing period",
      "Generating weekday-only date sequences for work schedule planning",
      "Creating date arrays for use in data analysis and visualization scripts",
      "Producing report period date lists for financial and operational reporting"
    ],
    relatedSlugs: ["date-difference", "calendar-generator", "business-days-calculator"]
  },
  { slug: "workday-calculator", name: "Workday Calculator", description: "Find the date that falls exactly N business days from a given date.", category: "datetime", icon: "📅", keywords: ["workday calculator", "business days from date", "working days", "n business days"], subcategory: "calculators",
    longDescription: "Calculate the exact date that falls a specific number of business days (working days) from any start date, automatically skipping weekends and optionally excluding public holidays. Essential for calculating SLA deadlines, invoice due dates, project milestones, and contract delivery windows.",
    faqs: [
      { question: "Does the calculator skip public holidays?", answer: "Yes. You can select a country to exclude its public holidays from the business day count, giving you an accurate workday target date." },
      { question: "Can I count backward as well as forward?", answer: "Yes. Enter a negative number to find the date N business days before your start date, useful for working backward from a deadline." },
      { question: "Which countries' holidays are supported?", answer: "The tool includes holiday data for over 80 countries, covering major national holidays for each." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your start date and the number of business days to add or subtract." },
      { name: "Step 2", text: "Optionally select your country to exclude public holidays." },
      { name: "Step 3", text: "View the resulting business day date and the weekends or holidays that were skipped." }
    ],
    useCases: [
      "Calculating SLA response deadlines from a ticket creation date",
      "Finding the invoice due date when payment terms are '30 business days'",
      "Determining a project milestone date that accounts for weekends and holidays",
      "Computing regulatory filing deadlines that are specified in business days"
    ],
    relatedSlugs: ["business-days-calculator", "date-difference", "add-subtract-days"]
  },
  { slug: "moon-phase-calculator", name: "Moon Phase Calculator", description: "Calculate the moon phase for any date — new, full, crescent, and more.", category: "datetime", icon: "🌙", keywords: ["moon phase", "lunar phase", "full moon", "new moon calculator"], subcategory: "calculators",
    longDescription: "Find the moon phase for any date in history or the future — from new moon to full moon and every crescent, quarter, and gibbous phase in between. The calculator uses precise lunar cycle mathematics to show the illumination percentage, phase name, and time until the next full or new moon.",
    faqs: [
      { question: "How accurate is the moon phase calculation?", answer: "The calculator uses standard astronomical formulas based on the lunar synodic period (29.53 days) and is accurate to within a few hours for most dates." },
      { question: "What moon phases are shown?", answer: "All eight primary phases are identified: New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Third Quarter, and Waning Crescent." },
      { question: "Can I find the next full moon from today?", answer: "Yes. The tool always shows the date and time of the next full moon and next new moon from your selected date." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter any date (past, present, or future) to look up the moon phase." },
      { name: "Step 2", text: "View the phase name, illumination percentage, and a visual indicator of the moon's current appearance." },
      { name: "Step 3", text: "Check the dates of the next new and full moon for planning purposes." }
    ],
    useCases: [
      "Planning outdoor photography or stargazing around the full moon",
      "Gardeners using lunar planting calendars based on moon phases",
      "Writers and creators checking historical moon phases for period accuracy",
      "Tracking moon phases for spiritual or wellness practices"
    ],
    relatedSlugs: ["sunrise-sunset", "calendar-generator", "date-difference"]
  },
  { slug: "sunrise-sunset", name: "Sunrise & Sunset Calculator", description: "Calculate sunrise and sunset times for any location and date.", category: "datetime", icon: "🌅", keywords: ["sunrise sunset", "sunrise time", "sunset calculator", "golden hour"], subcategory: "calculators",
    longDescription: "Calculate the exact sunrise and sunset times for any location on Earth on any date, including civil twilight, nautical twilight, and astronomical twilight. Whether you're planning outdoor photography, travel itineraries, or simply want to know when the sun rises at your destination, this tool gives you precise times based on latitude, longitude, and date.",
    faqs: [
      { question: "How do I specify my location?", answer: "Enter a city name or latitude and longitude coordinates. The tool uses your input to calculate the solar position and times for that exact location." },
      { question: "What is the difference between civil and nautical twilight?", answer: "Civil twilight (sun 6° below horizon) is when there's enough light for outdoor activities. Nautical twilight (12° below) is when the horizon is visible at sea. Astronomical twilight (18° below) is when the sky is dark enough for astronomical observation." },
      { question: "Does it account for daylight saving time?", answer: "Yes. Times are displayed in the local time of the specified location, correctly accounting for daylight saving time on the selected date." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your city name or coordinates and select the date." },
      { name: "Step 2", text: "View the sunrise, sunset, and twilight times for that location on the selected date." },
      { name: "Step 3", text: "Check the golden hour windows on either side of sunrise and sunset for photography planning." }
    ],
    useCases: [
      "Landscape and nature photographers planning shoots around golden hour",
      "Travelers planning outdoor activities around daylight hours at their destination",
      "Farmers and outdoor workers scheduling field work within daylight",
      "Event planners timing outdoor ceremonies to align with sunset"
    ],
    relatedSlugs: ["moon-phase-calculator", "timezone-converter", "days-until"]
  },
  { slug: "day-of-week-finder", name: "Day of the Week Finder", description: "Find what day of the week any date falls on — past or future.", category: "datetime", icon: "📆", keywords: ["day of week", "what day was it", "date to day", "weekday finder"], subcategory: "calculators",
    longDescription: "Instantly find what day of the week any date falls on — whether it was a Monday in 1776 or what day a birthday falls on in 2050. The day of the week finder uses the Zeller algorithm to return accurate results for any Gregorian calendar date, past or future.",
    faqs: [
      { question: "How far back or forward can it calculate?", answer: "The calculator works for any Gregorian calendar date from the year 1582 onward (when the Gregorian calendar was adopted) and into the indefinite future." },
      { question: "Can I find what day my birthday falls on in a future year?", answer: "Yes. Enter any future date to instantly see what day of the week it falls on, perfect for planning birthday celebrations." },
      { question: "Does it account for the calendar switch from Julian to Gregorian?", answer: "The tool operates on the Gregorian calendar system. Dates before October 1582 may differ from the Julian calendar that was in use at that time." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter the date you want to look up (any year, month, and day)." },
      { name: "Step 2", text: "Click Find to instantly see what day of the week that date falls on." },
      { name: "Step 3", text: "Use the result to plan events or satisfy historical curiosity." }
    ],
    useCases: [
      "Finding what day of the week a birthday, anniversary, or historical event fell on",
      "Planning a future event date by checking which weekday it lands on",
      "Historical research verifying the day of the week for significant dates",
      "Trivia and fun facts about birth days and notable dates in history"
    ],
    relatedSlugs: ["date-difference", "calendar-generator", "week-number"]
  },
  { slug: "fiscal-year-calculator", name: "Fiscal Year Calculator", description: "Calculate fiscal year quarters, start/end dates, and current period.", category: "datetime", icon: "📊", keywords: ["fiscal year", "fiscal quarter", "financial year", "fy calculator"], subcategory: "calculators",
    longDescription: "Calculate fiscal year periods, quarter start and end dates, and determine which fiscal quarter any given date falls in. Different organizations and countries use fiscal years starting in different months — this calculator supports any custom fiscal year start month, including common configurations used in the US, UK, Australia, and India.",
    faqs: [
      { question: "What are the most common fiscal year start dates?", answer: "US federal government: October 1. Many US corporations: January 1. UK: April 6. Australia: July 1. India: April 1. You can set any month as the start of your fiscal year." },
      { question: "Can I find which fiscal quarter a specific date falls in?", answer: "Yes. Enter any date and your fiscal year start month to instantly see which quarter and fiscal year period that date belongs to." },
      { question: "Does it show all four quarter date ranges?", answer: "Yes. The calculator displays Q1 through Q4 start and end dates for the current and adjacent fiscal years." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Select your fiscal year start month (e.g., January, April, July, or October)." },
      { name: "Step 2", text: "Enter a date to look up, or use today's date by default." },
      { name: "Step 3", text: "View the current fiscal quarter, fiscal year label, and all four quarter date ranges." }
    ],
    useCases: [
      "Finance teams generating fiscal quarter date ranges for reporting templates",
      "Accountants determining which fiscal year a transaction date falls in",
      "Project managers aligning project timelines with fiscal quarter milestones",
      "Business analysts preparing quarterly performance reports and forecasts"
    ],
    relatedSlugs: ["business-days-calculator", "date-difference", "holiday-calculator"]
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
