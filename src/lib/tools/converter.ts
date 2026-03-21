import type { Tool } from "../types";

export const converterTools: Tool[] = [
  // ── Existing (15) ──────────────────────────────────────────
  { slug: "unit-converter", name: "Unit Converter", description: "Convert between units of length, weight, temperature, volume, and more.", category: "converter", icon: "📏", keywords: ["unit conversion", "length converter", "weight converter", "metric imperial"], subcategory: "length",
    relatedSlugs: ["inches-to-cm", "feet-to-meters", "miles-to-km", "kg-to-lbs"]
  },
  { slug: "color-converter", name: "Color Converter", description: "Convert between HEX, RGB, and HSL color formats with a live preview.", category: "converter", icon: "🎨", keywords: ["hex to rgb", "rgb to hex", "hsl converter", "color picker"], subcategory: "data",
    relatedSlugs: ["color-picker", "css-gradient-generator", "color-palette-generator"]
  },
  { slug: "number-base-converter", name: "Number Base Converter", description: "Convert numbers between binary, decimal, hexadecimal, and octal bases.", category: "converter", icon: "🔢", keywords: ["binary converter", "hex converter", "octal converter"], subcategory: "data",
    relatedSlugs: ["hex-to-text", "roman-numeral-converter", "text-to-binary"]
  },
  { slug: "timestamp-converter", name: "Timestamp Converter", description: "Convert Unix timestamps to human-readable dates and back.", category: "converter", icon: "⏱️", keywords: ["unix timestamp", "epoch converter", "date to timestamp"], subcategory: "data",
    relatedSlugs: ["timezone-converter", "date-difference", "age-calculator"]
  },
  { slug: "morse-code", name: "Morse Code Translator", description: "Convert text to Morse code and decode Morse code back to text.", category: "converter", icon: "📡", keywords: ["morse code", "morse translator", "morse encoder"], subcategory: "data",
    relatedSlugs: ["text-to-binary", "text-to-nato", "caesar-cipher"]
  },
  { slug: "timezone-converter", name: "Time Zone Converter", description: "Convert times between different time zones worldwide.", category: "converter", icon: "🌍", keywords: ["timezone converter", "time zone", "world clock", "utc converter"], subcategory: "data",
    relatedSlugs: ["timestamp-converter", "date-difference", "business-days-calculator"]
  },
  { slug: "cooking-converter", name: "Cooking Unit Converter", description: "Convert between cups, tablespoons, milliliters, grams, and more.", category: "converter", icon: "🍳", keywords: ["cooking converter", "cups to ml", "recipe converter", "kitchen converter"], subcategory: "volume",
    relatedSlugs: ["ml-to-oz", "liters-to-gallons", "recipe-scaler"]
  },
  { slug: "hex-to-text", name: "Hex to Text", description: "Convert hexadecimal strings to readable text and back.", category: "converter", icon: "🔠", keywords: ["hex to text", "text to hex", "hexadecimal converter", "hex string"], subcategory: "data",
    relatedSlugs: ["text-to-binary", "base64-encoder", "number-base-converter"]
  },
  { slug: "markdown-to-html", name: "Markdown to HTML", description: "Convert Markdown text to HTML code.", category: "converter", icon: "📝", keywords: ["markdown to html", "md to html", "markdown converter", "markdown parser"], subcategory: "data",
    relatedSlugs: ["markdown-preview", "text-to-html", "html-to-text"]
  },
  { slug: "csv-to-table", name: "CSV to Table", description: "Convert CSV data to a formatted HTML table.", category: "converter", icon: "📊", keywords: ["csv to table", "csv viewer", "csv formatter", "table generator"], subcategory: "data",
    relatedSlugs: ["csv-to-json", "markdown-table-generator", "json-to-csv"]
  },
  { slug: "text-to-nato", name: "NATO Phonetic Alphabet", description: "Convert text to NATO phonetic alphabet spelling.", category: "converter", icon: "🎖️", keywords: ["nato alphabet", "phonetic alphabet", "spelling alphabet", "alpha bravo"], subcategory: "data",
    relatedSlugs: ["morse-code", "text-to-binary", "case-converter"]
  },
  { slug: "currency-converter", name: "Currency Converter", description: "Convert between major world currencies with approximate rates.", category: "converter", icon: "💱", keywords: ["currency converter", "exchange rate", "money converter", "forex"], subcategory: "data",
    relatedSlugs: ["salary-to-hourly", "vat-calculator", "inflation-calculator"]
  },
  { slug: "image-to-base64", name: "Image to Base64", description: "Convert images to Base64 encoded strings for embedding in code.", category: "converter", icon: "🖼️", keywords: ["image to base64", "base64 image", "image encoder", "data uri"], subcategory: "data",
    relatedSlugs: ["base64-encoder", "svg-to-png", "image-compressor"]
  },
  { slug: "json-to-typescript", name: "JSON to TypeScript", description: "Generate TypeScript interfaces from JSON data.", category: "converter", icon: "📘", keywords: ["json to typescript", "typescript interface", "type generator", "json to types"], subcategory: "data",
    relatedSlugs: ["json-formatter", "typescript-to-json", "csv-to-json"]
  },
  { slug: "pixels-to-rem", name: "PX to REM Converter", description: "Convert between pixels and rem units for responsive design.", category: "converter", icon: "📐", keywords: ["px to rem", "rem to px", "css units", "responsive design"], subcategory: "data",
    relatedSlugs: ["css-minifier", "color-converter", "unit-converter"]
  },

  // ── New Standalone Unit Converters ──────────────────────────
  { slug: "inches-to-cm", name: "Inches to CM Converter", description: "Convert inches to centimeters and centimeters to inches instantly.", category: "converter", icon: "📏", keywords: ["inches to cm", "cm to inches", "inch converter", "centimeter converter"], subcategory: "length", template: "simple-converter",
    longDescription: "Quickly convert between inches and centimeters with this free online converter. Whether you're working on a DIY project, shopping for furniture, or converting measurements for a recipe, this tool gives you instant, accurate results. Includes a reference table of common conversions.",
    faqs: [
      { question: "How many centimeters are in an inch?", answer: "One inch equals exactly 2.54 centimeters." },
      { question: "How do I convert inches to cm?", answer: "Multiply the number of inches by 2.54 to get centimeters." },
      { question: "Is this conversion exact?", answer: "Yes, 1 inch = 2.54 cm is an exact definition, not an approximation." }
    ],
    howToSteps: [
      { name: "Enter value", text: "Type a number in either the inches or centimeters field." },
      { name: "See result", text: "The conversion appears instantly in the other field." },
      { name: "Copy result", text: "Click copy to use the converted value." }
    ],
    useCases: ["Converting screen sizes", "DIY and construction measurements", "International clothing sizes", "Medical height measurements"],
    relatedSlugs: ["feet-to-meters", "unit-converter", "miles-to-km"]
  },
  { slug: "feet-to-meters", name: "Feet to Meters Converter", description: "Convert feet to meters and meters to feet with decimal precision.", category: "converter", icon: "📏", keywords: ["feet to meters", "meters to feet", "ft to m", "height converter"], subcategory: "length", template: "simple-converter",
    relatedSlugs: ["inches-to-cm", "miles-to-km", "unit-converter"]
  },
  { slug: "miles-to-km", name: "Miles to Kilometers Converter", description: "Convert miles to kilometers and kilometers to miles.", category: "converter", icon: "🛣️", keywords: ["miles to km", "km to miles", "distance converter", "mile converter"], subcategory: "length", template: "simple-converter",
    relatedSlugs: ["feet-to-meters", "mph-to-kph", "unit-converter"]
  },
  { slug: "kg-to-lbs", name: "KG to LBS Converter", description: "Convert kilograms to pounds and pounds to kilograms.", category: "converter", icon: "⚖️", keywords: ["kg to lbs", "lbs to kg", "weight converter", "kilogram to pound"], subcategory: "weight", template: "simple-converter",
    longDescription: "Convert between kilograms and pounds with this fast, accurate converter. Essential for fitness tracking, cooking, shipping, and international travel. Includes common conversion reference values.",
    faqs: [
      { question: "How many pounds are in a kilogram?", answer: "One kilogram equals approximately 2.20462 pounds." },
      { question: "Is kg to lbs exact?", answer: "The conversion factor 2.20462 is rounded. The exact value is 2.2046226218..." }
    ],
    relatedSlugs: ["ounces-to-grams", "unit-converter", "bmi-calculator"]
  },
  { slug: "ounces-to-grams", name: "Ounces to Grams Converter", description: "Convert ounces to grams and grams to ounces.", category: "converter", icon: "⚖️", keywords: ["ounces to grams", "grams to ounces", "oz to g", "weight converter"], subcategory: "weight", template: "simple-converter",
    relatedSlugs: ["kg-to-lbs", "cooking-converter", "unit-converter"]
  },
  { slug: "celsius-to-fahrenheit", name: "Celsius to Fahrenheit Converter", description: "Convert temperatures between Celsius and Fahrenheit scales.", category: "converter", icon: "🌡️", keywords: ["celsius to fahrenheit", "fahrenheit to celsius", "temperature converter", "temp converter"], subcategory: "temperature", template: "simple-converter",
    longDescription: "Convert temperatures between Celsius and Fahrenheit scales instantly. Whether checking weather forecasts, cooking temperatures, or scientific data, this tool provides accurate conversions both ways. Includes common temperature reference points.",
    faqs: [
      { question: "What is the formula for Celsius to Fahrenheit?", answer: "F = (C x 9/5) + 32. For example, 100°C = 212°F." },
      { question: "At what temperature are Celsius and Fahrenheit equal?", answer: "Celsius and Fahrenheit are equal at -40 degrees." }
    ],
    relatedSlugs: ["unit-converter", "cooking-converter", "weather-tools"]
  },
  { slug: "liters-to-gallons", name: "Liters to Gallons Converter", description: "Convert liters to gallons and gallons to liters (US and Imperial).", category: "converter", icon: "🫗", keywords: ["liters to gallons", "gallons to liters", "volume converter", "liquid converter"], subcategory: "volume", template: "simple-converter",
    relatedSlugs: ["ml-to-oz", "cooking-converter", "unit-converter"]
  },
  { slug: "ml-to-oz", name: "ML to OZ Converter", description: "Convert milliliters to fluid ounces and fluid ounces to milliliters.", category: "converter", icon: "🥤", keywords: ["ml to oz", "oz to ml", "milliliter converter", "fluid ounce"], subcategory: "volume", template: "simple-converter",
    relatedSlugs: ["liters-to-gallons", "cooking-converter", "unit-converter"]
  },
  { slug: "mph-to-kph", name: "MPH to KPH Converter", description: "Convert miles per hour to kilometers per hour and vice versa.", category: "converter", icon: "🏎️", keywords: ["mph to kph", "kph to mph", "speed converter", "velocity converter"], subcategory: "speed", template: "simple-converter",
    relatedSlugs: ["miles-to-km", "unit-converter", "pace-calculator"]
  },
  { slug: "sqft-to-sqm", name: "Square Feet to Square Meters", description: "Convert square feet to square meters and vice versa.", category: "converter", icon: "📐", keywords: ["sqft to sqm", "square feet", "square meters", "area converter"], subcategory: "area", template: "simple-converter",
    relatedSlugs: ["acres-to-hectares", "unit-converter", "feet-to-meters"]
  },
  { slug: "acres-to-hectares", name: "Acres to Hectares Converter", description: "Convert acres to hectares and hectares to acres.", category: "converter", icon: "🌾", keywords: ["acres to hectares", "hectares to acres", "land area", "area converter"], subcategory: "area", template: "simple-converter",
    relatedSlugs: ["sqft-to-sqm", "unit-converter", "miles-to-km"]
  },
  { slug: "bytes-converter", name: "Bytes Converter", description: "Convert between bytes, KB, MB, GB, TB, and PB.", category: "converter", icon: "💾", keywords: ["bytes to mb", "kb to gb", "data converter", "file size converter"], subcategory: "data", template: "simple-converter",
    longDescription: "Convert digital storage units between bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), terabytes (TB), and petabytes (PB). Supports both binary (1024-based) and decimal (1000-based) conversions. Essential for understanding file sizes, storage capacity, and data transfer rates.",
    relatedSlugs: ["number-base-converter", "unit-converter", "checksum-calculator"]
  },
  { slug: "cups-to-ml", name: "Cups to ML Converter", description: "Convert cups to milliliters and milliliters to cups for cooking.", category: "converter", icon: "🍳", keywords: ["cups to ml", "ml to cups", "cooking measurement", "baking converter"], subcategory: "volume", template: "simple-converter",
    relatedSlugs: ["cooking-converter", "ml-to-oz", "recipe-scaler"]
  },
  { slug: "stones-to-kg", name: "Stones to KG Converter", description: "Convert stones to kilograms and kilograms to stones.", category: "converter", icon: "⚖️", keywords: ["stones to kg", "kg to stones", "weight converter", "stone converter"], subcategory: "weight", template: "simple-converter",
    relatedSlugs: ["kg-to-lbs", "unit-converter", "bmi-calculator"]
  },
  { slug: "nautical-miles", name: "Nautical Miles Converter", description: "Convert between nautical miles, miles, and kilometers.", category: "converter", icon: "⚓", keywords: ["nautical miles", "knots", "maritime distance", "nautical converter"], subcategory: "length", template: "simple-converter",
    relatedSlugs: ["miles-to-km", "mph-to-kph", "unit-converter"]
  },
  { slug: "energy-converter", name: "Energy Unit Converter", description: "Convert between joules, calories, kilowatt-hours, and BTU.", category: "converter", icon: "⚡", keywords: ["energy converter", "joules", "calories", "kwh", "btu"], subcategory: "energy", template: "simple-converter",
    relatedSlugs: ["unit-converter", "celsius-to-fahrenheit", "calorie-calculator"]
  },
  { slug: "pressure-converter", name: "Pressure Unit Converter", description: "Convert between PSI, bar, atm, Pascal, and mmHg.", category: "converter", icon: "🔧", keywords: ["pressure converter", "psi to bar", "pascal", "atm converter"], subcategory: "energy", template: "simple-converter",
    relatedSlugs: ["unit-converter", "energy-converter", "celsius-to-fahrenheit"]
  },
  { slug: "angle-converter", name: "Angle Converter", description: "Convert between degrees, radians, gradians, and turns.", category: "converter", icon: "📐", keywords: ["angle converter", "degrees to radians", "radians converter", "gradians"], subcategory: "data", template: "simple-converter",
    relatedSlugs: ["unit-converter", "scientific-calculator", "number-base-converter"]
  },
];
