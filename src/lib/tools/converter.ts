import type { Tool } from "../types";

export const converterTools: Tool[] = [
  // ── Existing (15) ──────────────────────────────────────────
  { slug: "unit-converter", name: "Unit Converter", description: "Convert between units of length, weight, temperature, volume, and more.", category: "converter", icon: "📏", keywords: ["unit conversion", "length converter", "weight converter", "metric imperial"], subcategory: "length",
    longDescription: "A comprehensive unit converter covering length, weight, temperature, volume, area, speed, and more. Switch between metric and imperial systems instantly with accurate, up-to-date conversion factors. Perfect for students, engineers, travelers, and anyone working across different measurement systems.",
    faqs: [
      { question: "What unit categories does this converter support?", answer: "It covers length, weight, temperature, volume, area, speed, pressure, energy, and data storage units." },
      { question: "Does it support both metric and imperial units?", answer: "Yes, all major metric (SI) and imperial/US customary units are supported across every category." },
      { question: "How accurate are the conversions?", answer: "All conversions use standard, internationally recognized conversion factors and are accurate to many decimal places." }
    ],
    howToSteps: [
      { name: "Select a category", text: "Choose the type of unit you want to convert, such as length, weight, or temperature." },
      { name: "Enter your value", text: "Type the number you want to convert into the input field." },
      { name: "Read the result", text: "All equivalent unit values appear instantly across the selected category." }
    ],
    useCases: ["Converting measurements for international travel", "Homework and academic problem sets", "Engineering and construction calculations", "Recipe scaling between US and metric units"],
    relatedSlugs: ["inches-to-cm", "feet-to-meters", "miles-to-km", "kg-to-lbs"]
  },
  { slug: "color-converter", name: "Color Converter", description: "Convert between HEX, RGB, and HSL color formats with a live preview.", category: "converter", icon: "🎨", keywords: ["hex to rgb", "rgb to hex", "hsl converter", "color picker"], subcategory: "data",
    longDescription: "Convert colors between HEX, RGB, and HSL formats instantly with a live preview swatch. Whether you're building a website, designing graphics, or matching brand colors, this tool makes color format conversion fast and error-free. Simply enter a value in any format and see all three representations at once.",
    faqs: [
      { question: "How do I convert HEX to RGB?", answer: "Enter the HEX code (e.g. #ff5733) into the tool and it will instantly display the RGB equivalent (e.g. rgb(255, 87, 51))." },
      { question: "What is the difference between HEX, RGB, and HSL?", answer: "HEX uses a 6-digit hexadecimal code, RGB specifies red/green/blue channels from 0-255, and HSL defines hue (0-360°), saturation, and lightness as percentages." },
    ],
    howToSteps: [
      { name: "Enter a color value", text: "Type or paste a color in HEX, RGB, or HSL format into the input field." },
      { name: "View all formats", text: "The tool instantly shows the equivalent values in all three color formats." },
      { name: "Copy your result", text: "Click the copy button next to any format to use the value in your project." }
    ],
    useCases: ["Converting brand colors for web and print", "Translating design tool color codes to CSS", "Checking color values when working across different design apps", "Learning color theory and format relationships"],
    relatedSlugs: ["color-picker", "css-gradient-generator", "color-palette-generator"]
  },
  { slug: "number-base-converter", name: "Number Base Converter", description: "Convert numbers between binary, decimal, hexadecimal, and octal bases.", category: "converter", icon: "🔢", keywords: ["binary converter", "hex converter", "octal converter"], subcategory: "data",
    longDescription: "Convert numbers between binary (base 2), decimal (base 10), hexadecimal (base 16), and octal (base 8) instantly. An essential tool for programmers, computer science students, and electronics engineers who need to work across different numeral systems. All conversions update in real time as you type.",
    faqs: [
      { question: "How do I convert decimal to binary?", answer: "Enter the decimal number into the tool and it will instantly display the binary equivalent. For example, decimal 255 equals binary 11111111." },
      { question: "What is decimal 255 in hexadecimal?", answer: "Decimal 255 equals hexadecimal FF." },
    ],
    howToSteps: [
      { name: "Enter your number", text: "Type a number in any base — binary, decimal, hex, or octal — into its field." },
      { name: "See all conversions", text: "The equivalent values in all other bases appear instantly." },
      { name: "Copy the result", text: "Copy any converted value with one click to use it in your code or notes." }
    ],
    useCases: ["Programming and low-level computing tasks", "Computer science coursework and exams", "Working with memory addresses and color codes in hex", "Understanding bitwise operations in binary"],
    relatedSlugs: ["hex-to-text", "roman-numeral-converter", "text-to-binary"]
  },
  { slug: "timestamp-converter", name: "Timestamp Converter", description: "Convert Unix timestamps to human-readable dates and back.", category: "converter", icon: "⏱️", keywords: ["unix timestamp", "epoch converter", "date to timestamp"], subcategory: "data",
    longDescription: "Convert Unix (epoch) timestamps to human-readable dates and times, and convert dates back to Unix timestamps. Unix time counts seconds since January 1, 1970 (UTC) and is widely used in databases, APIs, and log files. This tool supports both seconds and millisecond timestamps.",
    faqs: [
      { question: "What is a Unix timestamp?", answer: "A Unix timestamp is the number of seconds elapsed since January 1, 1970 at 00:00:00 UTC, also known as the Unix epoch." },
      { question: "How do I convert a Unix timestamp to a date?", answer: "Paste the timestamp (e.g. 1700000000) into the tool and it will display the equivalent date and time in your local timezone and UTC." },
    ],
    howToSteps: [
      { name: "Paste your timestamp", text: "Enter a Unix timestamp (in seconds or milliseconds) into the input field." },
      { name: "View the date", text: "The corresponding human-readable date and time is shown instantly in UTC and local time." },
      { name: "Convert a date to timestamp", text: "Switch to date input mode, enter a date, and get the Unix timestamp back." }
    ],
    useCases: ["Debugging API responses and log files", "Converting database timestamps for readability", "Calculating time differences from epoch values", "Working with scheduled events and cron jobs"],
    relatedSlugs: ["timezone-converter", "date-difference", "age-calculator"]
  },
  { slug: "morse-code", name: "Morse Code Translator", description: "Convert text to Morse code and decode Morse code back to text.", category: "converter", icon: "📡", keywords: ["morse code", "morse translator", "morse encoder"], subcategory: "data",
    longDescription: "Translate any text into Morse code or decode Morse code back into plain text instantly. Each letter and number is represented by a unique pattern of dots (.) and dashes (-) separated by spaces. Used historically in telegraphy, Morse code remains relevant in amateur radio, emergency signaling, and accessible communication.",
    faqs: [
      { question: "How is Morse code written?", answer: "Each letter is represented by dots (.) and dashes (-). For example, SOS is ... --- ... and the letter A is .-" },
      { question: "How do I separate words in Morse code?", answer: "Words are separated by a forward slash (/) or three spaces in standard Morse notation." },
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type the text you want to encode into the text field." },
      { name: "View the Morse code", text: "The Morse code equivalent appears instantly below your input." },
      { name: "Decode Morse code", text: "Switch to decode mode, paste Morse code using dots and dashes, and get the plain text back." }
    ],
    useCases: ["Learning Morse code for amateur radio licensing", "Encoding messages for puzzles and escape rooms", "Understanding historical communication methods", "Accessibility applications using dot-dash input"],
    relatedSlugs: ["text-to-binary", "text-to-nato", "caesar-cipher"]
  },
  { slug: "timezone-converter", name: "Time Zone Converter", description: "Convert times between different time zones worldwide.", category: "converter", icon: "🌍", keywords: ["timezone converter", "time zone", "world clock", "utc converter"], subcategory: "data",
    longDescription: "Convert times across all major time zones worldwide, including UTC offsets and daylight saving time adjustments. Ideal for scheduling international meetings, coordinating with remote teams, or planning travel across time zones. Simply select your source and target time zones to see the converted time instantly.",
    faqs: [
      { question: "How do I convert EST to UTC?", answer: "EST (Eastern Standard Time) is UTC-5. Add 5 hours to EST to get UTC. For example, 3:00 PM EST equals 8:00 PM UTC." },
      { question: "Does the converter account for daylight saving time?", answer: "Yes, the converter automatically adjusts for daylight saving time based on the selected date and time zone." },
    ],
    howToSteps: [
      { name: "Select source time zone", text: "Choose the time zone you are converting from." },
      { name: "Enter the time", text: "Input the time you want to convert." },
      { name: "Select target time zone", text: "Choose the destination time zone to see the converted time immediately." }
    ],
    useCases: ["Scheduling international calls and meetings", "Coordinating with remote teams across continents", "Planning travel itineraries across time zones", "Converting broadcast or event times for global audiences"],
    relatedSlugs: ["timestamp-converter", "date-difference", "business-days-calculator"]
  },
  { slug: "cooking-converter", name: "Cooking Unit Converter", description: "Convert between cups, tablespoons, milliliters, grams, and more.", category: "converter", icon: "🍳", keywords: ["cooking converter", "cups to ml", "recipe converter", "kitchen converter"], subcategory: "volume",
    longDescription: "Convert between all common cooking measurements including cups, tablespoons, teaspoons, milliliters, fluid ounces, and grams. Perfect for adapting recipes between US and metric measurements or scaling ingredients up or down. Covers both volume and weight conversions for liquids and dry ingredients.",
    faqs: [
      { question: "How many tablespoons are in a cup?", answer: "There are 16 tablespoons in 1 US cup." },
      { question: "How many milliliters are in a tablespoon?", answer: "One US tablespoon equals approximately 14.79 milliliters." },
    ],
    howToSteps: [
      { name: "Select the ingredient type", text: "Choose whether you are converting volume (liquids) or weight (dry ingredients)." },
      { name: "Enter your measurement", text: "Type the amount and select the unit you are converting from." },
      { name: "Read the converted amount", text: "The equivalent measurement appears in your target unit instantly." }
    ],
    useCases: ["Adapting US recipes to metric measurements", "Scaling recipes for larger or smaller batches", "Converting baking quantities between grams and cups", "Following international recipes with unfamiliar units"],
    relatedSlugs: ["ml-to-oz", "liters-to-gallons", "recipe-scaler"]
  },
  { slug: "hex-to-text", name: "Hex to Text", description: "Convert hexadecimal strings to readable text and back.", category: "converter", icon: "🔠", keywords: ["hex to text", "text to hex", "hexadecimal converter", "hex string"], subcategory: "data",
    longDescription: "Convert hexadecimal encoded strings to plain readable text, or encode any text as a hexadecimal string. Each character is represented by a two-digit hex value based on its ASCII or Unicode code point. Widely used in programming, debugging network data, and working with encoded file contents.",
    faqs: [
      { question: "What does hex to text mean?", answer: "Hex to text means converting a string of hexadecimal values (like 48 65 6C 6C 6F) into readable characters (like 'Hello')." },
      { question: "How is text encoded in hexadecimal?", answer: "Each character is converted to its decimal ASCII value, then that value is expressed as a two-digit hex number. For example, 'A' is decimal 65, which is hex 41." },
    ],
    howToSteps: [
      { name: "Paste your hex string", text: "Enter the hexadecimal string you want to decode into the input field." },
      { name: "View the plain text", text: "The decoded readable text appears instantly in the output field." },
      { name: "Encode text to hex", text: "Switch direction to encode plain text back into a hexadecimal string." }
    ],
    useCases: ["Decoding hex data from network packet captures", "Reading encoded strings in programming and debugging", "Working with color codes and memory addresses", "Encoding data for low-level protocol implementations"],
    relatedSlugs: ["text-to-binary", "base64-encoder", "number-base-converter"]
  },
  { slug: "markdown-to-html", name: "Markdown to HTML", description: "Convert Markdown text to HTML code.", category: "converter", icon: "📝", keywords: ["markdown to html", "md to html", "markdown converter", "markdown parser"], subcategory: "data",
    longDescription: "Convert Markdown-formatted text into clean HTML code instantly. Supports all standard Markdown syntax including headings, bold, italic, links, images, lists, blockquotes, and code blocks. Ideal for developers publishing content to the web, bloggers, and anyone needing to generate HTML from lightweight markup.",
    faqs: [
      { question: "What Markdown syntax is supported?", answer: "All standard CommonMark syntax is supported: headings (#), bold (**text**), italic (*text*), links, images, ordered and unordered lists, code blocks, and blockquotes." },
      { question: "Can I use the HTML output directly on a website?", answer: "Yes, the generated HTML is clean and ready to paste into any webpage or CMS that accepts raw HTML." },
    ],
    howToSteps: [
      { name: "Paste your Markdown", text: "Enter or paste your Markdown-formatted text into the left panel." },
      { name: "View the HTML output", text: "The equivalent HTML code is generated instantly in the right panel." },
      { name: "Copy the HTML", text: "Click copy to grab the HTML and paste it wherever you need it." }
    ],
    useCases: ["Publishing blog posts from Markdown to HTML websites", "Converting README files to web-ready HTML", "Generating email HTML from Markdown drafts", "Prototyping web content without writing raw HTML"],
    relatedSlugs: ["markdown-preview", "text-to-html", "html-to-text"]
  },
  { slug: "csv-to-table", name: "CSV to Table", description: "Convert CSV data to a formatted HTML table.", category: "converter", icon: "📊", keywords: ["csv to table", "csv viewer", "csv formatter", "table generator"], subcategory: "data",
    longDescription: "Transform comma-separated values (CSV) data into a clean, formatted HTML table with a single paste. The tool automatically detects headers and renders each row as a table row, making data easy to read and embed in web pages, documentation, or emails. Supports custom delimiters and quoted fields.",
    faqs: [
      { question: "Does the first row become the table header?", answer: "Yes, by default the first row of your CSV is treated as the header row and rendered as <th> elements in the HTML table." },
      { question: "Can I use delimiters other than commas?", answer: "Yes, the tool supports tabs, semicolons, and other custom delimiters for TSV and other formats." },
    ],
    howToSteps: [
      { name: "Paste your CSV data", text: "Enter or paste your comma-separated data into the input field." },
      { name: "Preview the table", text: "A formatted HTML table preview renders instantly so you can verify the output." },
      { name: "Copy the HTML", text: "Copy the generated HTML table code to use in your webpage or document." }
    ],
    useCases: ["Embedding data tables in blog posts or articles", "Converting spreadsheet exports for web display", "Generating HTML tables for email newsletters", "Quickly visualizing CSV data without a spreadsheet app"],
    relatedSlugs: ["csv-to-json", "markdown-table-generator", "json-to-csv"]
  },
  { slug: "text-to-nato", name: "NATO Phonetic Alphabet", description: "Convert text to NATO phonetic alphabet spelling.", category: "converter", icon: "🎖️", keywords: ["nato alphabet", "phonetic alphabet", "spelling alphabet", "alpha bravo"], subcategory: "data",
    longDescription: "Convert any text into NATO phonetic alphabet spelling, where each letter is replaced by a standardized word (Alpha, Bravo, Charlie...). The NATO phonetic alphabet is used worldwide by military, aviation, emergency services, and anyone who needs to clearly communicate letters over voice channels where clarity is critical.",
    faqs: [
      { question: "What is the NATO phonetic alphabet?", answer: "It is a standardized set of words used to represent letters when spelling over radio or phone: Alpha (A), Bravo (B), Charlie (C), Delta (D), and so on through Zulu (Z)." },
      { question: "Why do people use the NATO phonetic alphabet?", answer: "It prevents confusion between similar-sounding letters (like B and D, or M and N) when communicating over noisy or unclear voice channels." },
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste the word or phrase you want to spell out phonetically." },
      { name: "View the NATO spelling", text: "Each letter is instantly replaced with its NATO phonetic word." },
      { name: "Read aloud or copy", text: "Use the output to spell your text clearly over phone or radio, or copy it for documentation." }
    ],
    useCases: ["Spelling out names, codes, or IDs over phone calls", "Aviation and air traffic communication", "Military and emergency services radio communication", "Confirming alphanumeric passwords or serial numbers"],
    relatedSlugs: ["morse-code", "text-to-binary", "case-converter"]
  },
  { slug: "currency-converter", name: "Currency Converter", description: "Convert between major world currencies with approximate rates.", category: "converter", icon: "💱", keywords: ["currency converter", "exchange rate", "money converter", "forex"], subcategory: "data",
    longDescription: "Convert between major world currencies using up-to-date exchange rates. Covers USD, EUR, GBP, JPY, AUD, CAD, and dozens more. Useful for international travel budgeting, comparing prices across countries, and getting a quick sense of foreign currency values before a transaction.",
    faqs: [
      { question: "How accurate are the exchange rates?", answer: "Rates are approximate and updated regularly, but for financial transactions always verify with your bank or a live trading platform as rates fluctuate continuously." },
      { question: "How many currencies are supported?", answer: "The converter supports all major world currencies including USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, and many more." },
    ],
    howToSteps: [
      { name: "Enter an amount", text: "Type the amount you want to convert in the source currency field." },
      { name: "Select currencies", text: "Choose the source currency and the target currency from the dropdown menus." },
      { name: "View the result", text: "The converted amount appears instantly based on the current approximate exchange rate." }
    ],
    useCases: ["Budgeting for international travel", "Comparing prices for international online shopping", "Estimating costs when working with foreign clients", "Quick currency checks for business expense reporting"],
    relatedSlugs: ["salary-to-hourly", "vat-calculator", "inflation-calculator"]
  },
  { slug: "image-to-base64", name: "Image to Base64", description: "Convert images to Base64 encoded strings for embedding in code.", category: "converter", icon: "🖼️", keywords: ["image to base64", "base64 image", "image encoder", "data uri"], subcategory: "data",
    longDescription: "Convert any image file (PNG, JPG, GIF, SVG) into a Base64 encoded string or data URI for embedding directly into HTML, CSS, or JavaScript. Eliminating external image requests can simplify deployments and reduce the number of network round-trips for small icons and inline graphics.",
    faqs: [
      { question: "What is a Base64 image?", answer: "A Base64 image is an image file encoded as a text string, allowing it to be embedded directly in HTML or CSS as a data URI (e.g. src=\"data:image/png;base64,...\") without needing a separate file." },
      { question: "What image formats are supported?", answer: "PNG, JPG, JPEG, GIF, SVG, WebP, and most common image formats are supported for Base64 encoding." },
    ],
    howToSteps: [
      { name: "Upload your image", text: "Click to upload or drag and drop your image file into the tool." },
      { name: "Copy the Base64 string", text: "The Base64 encoded string and data URI are generated instantly for you to copy." },
      { name: "Embed in your code", text: "Paste the data URI into an HTML img src attribute or CSS background-image property." }
    ],
    useCases: ["Embedding small icons in HTML emails without attachments", "Inlining images in single-file HTML documents", "Storing images as text in JSON or database fields", "Reducing HTTP requests by inlining small graphics in CSS"],
    relatedSlugs: ["base64-encoder", "svg-to-png", "image-compressor"]
  },
  { slug: "json-to-typescript", name: "JSON to TypeScript", description: "Generate TypeScript interfaces from JSON data.", category: "converter", icon: "📘", keywords: ["json to typescript", "typescript interface", "type generator", "json to types"], subcategory: "data",
    longDescription: "Automatically generate TypeScript interfaces and type definitions from any JSON object or array. Paste raw JSON from an API response or data file and get a ready-to-use TypeScript interface in seconds. Handles nested objects, arrays, optional fields, and complex structures without manual typing.",
    faqs: [
      { question: "Can it handle nested JSON objects?", answer: "Yes, the generator creates nested TypeScript interfaces for deeply nested JSON objects, giving each nested object its own named interface." },
      { question: "Does it detect optional fields?", answer: "The tool analyzes the JSON structure and can mark fields that are missing in some objects as optional using the ? modifier." },
    ],
    howToSteps: [
      { name: "Paste your JSON", text: "Enter or paste your JSON data into the input field." },
      { name: "Generate interfaces", text: "Click generate to produce TypeScript interface definitions from your JSON structure." },
      { name: "Copy the TypeScript", text: "Copy the generated interfaces and paste them directly into your TypeScript project." }
    ],
    useCases: ["Typing API responses without writing interfaces by hand", "Generating type definitions for third-party data sources", "Speeding up TypeScript project setup with real data shapes", "Creating types for JSON config files and schemas"],
    relatedSlugs: ["json-formatter", "typescript-to-json", "csv-to-json"]
  },
  { slug: "pixels-to-rem", name: "PX to REM Converter", description: "Convert between pixels and rem units for responsive design.", category: "converter", icon: "📐", keywords: ["px to rem", "rem to px", "css units", "responsive design"], subcategory: "data",
    longDescription: "Convert pixel values to rem units and rem to pixels for responsive CSS design. The default base font size is 16px (1rem = 16px), but you can set a custom base to match your project's root font size. Using rem units ensures your layout scales correctly when users change their browser font size.",
    faqs: [
      { question: "How many pixels is 1rem?", answer: "By default, 1rem equals 16px in most browsers, since the default root font size is 16px. If you set html { font-size: 10px }, then 1rem equals 10px." },
      { question: "Why use rem instead of pixels in CSS?", answer: "Rem units scale relative to the user's browser font size setting, making designs more accessible and easier to scale responsively compared to fixed pixel values." },
    ],
    howToSteps: [
      { name: "Set the base font size", text: "Enter your project's root font size (default is 16px) to ensure accurate conversions." },
      { name: "Enter a pixel value", text: "Type the pixel value you want to convert to rem." },
      { name: "Use the rem value", text: "Copy the resulting rem value and use it in your CSS stylesheet." }
    ],
    useCases: ["Converting design mockup pixel values to accessible rem units", "Building responsive typography and spacing systems", "Migrating legacy pixel-based CSS to rem-based layouts", "Calculating rem values when using a 10px base font-size shortcut"],
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
    longDescription: "Convert feet to meters and meters to feet instantly with this free online converter. One foot equals exactly 0.3048 meters, making this an essential tool for height conversions, construction projects, and working between imperial and metric measurement systems.",
    faqs: [
      { question: "How many meters are in a foot?", answer: "One foot equals exactly 0.3048 meters." },
      { question: "How many feet are in a meter?", answer: "One meter equals approximately 3.28084 feet." },
      { question: "How do I convert feet to meters?", answer: "Multiply the number of feet by 0.3048 to get meters. For example, 6 feet = 6 × 0.3048 = 1.8288 meters." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a number in either the feet or meters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted value in your project." }
    ],
    useCases: ["Converting height between feet and meters", "Construction and architecture measurement conversion", "Hiking and outdoor activity distances", "International sports and athletics measurements"],
    relatedSlugs: ["inches-to-cm", "miles-to-km", "unit-converter"]
  },
  { slug: "miles-to-km", name: "Miles to Kilometers Converter", description: "Convert miles to kilometers and kilometers to miles.", category: "converter", icon: "🛣️", keywords: ["miles to km", "km to miles", "distance converter", "mile converter"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert miles to kilometers and kilometers to miles instantly. One mile equals exactly 1.60934 kilometers, making this converter essential for road trip planning, running distances, and switching between US and international measurement systems.",
    faqs: [
      { question: "How many kilometers are in a mile?", answer: "One mile equals exactly 1.60934 kilometers." },
      { question: "How many miles are in a kilometer?", answer: "One kilometer equals approximately 0.62137 miles." },
      { question: "How do I convert miles to km?", answer: "Multiply the number of miles by 1.60934 to get kilometers. For example, 10 miles = 10 × 1.60934 = 16.0934 km." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a distance in either the miles or kilometers field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted distance value." }
    ],
    useCases: ["Converting road trip distances between US and metric", "Running and cycling distance conversion for races", "Interpreting international speed limits and road signs", "Travel planning and navigation across different countries"],
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
    longDescription: "Convert ounces to grams and grams to ounces instantly. One avoirdupois ounce equals exactly 28.3495 grams, making this converter essential for cooking, baking, shipping, and any task that involves switching between imperial and metric weight units.",
    faqs: [
      { question: "How many grams are in an ounce?", answer: "One ounce (avoirdupois) equals exactly 28.3495 grams." },
      { question: "How many ounces are in a gram?", answer: "One gram equals approximately 0.03527 ounces." },
      { question: "How do I convert ounces to grams?", answer: "Multiply the number of ounces by 28.3495 to get grams. For example, 4 oz = 4 × 28.3495 = 113.4 grams." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a weight in either the ounces or grams field." },
      { name: "See the result", text: "The converted weight appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted weight in your recipe or project." }
    ],
    useCases: ["Converting cooking and baking ingredient weights", "Comparing international food package weights", "Weighing precious metals and gemstones", "Calculating shipping weights across metric and imperial systems"],
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
    longDescription: "Convert liters to gallons and gallons to liters for both US and Imperial (UK) measurements. One US gallon equals 3.78541 liters, while one Imperial gallon equals 4.54609 liters. This converter is useful for fuel efficiency, cooking, and comparing liquid volumes across different countries.",
    faqs: [
      { question: "How many liters are in a US gallon?", answer: "One US gallon equals exactly 3.78541 liters." },
      { question: "How many liters are in an Imperial gallon?", answer: "One Imperial (UK) gallon equals exactly 4.54609 liters." },
      { question: "How do I convert gallons to liters?", answer: "Multiply US gallons by 3.78541, or Imperial gallons by 4.54609, to get liters." }
    ],
    howToSteps: [
      { name: "Select gallon type", text: "Choose between US gallons or Imperial (UK) gallons." },
      { name: "Enter your value", text: "Type a volume in either the liters or gallons field." },
      { name: "See the result", text: "The converted volume appears instantly in the other field." }
    ],
    useCases: ["Converting fuel tank capacity between liters and gallons", "Understanding fuel efficiency (mpg vs L/100km)", "Comparing beverage and container volumes internationally", "Calculating water usage and irrigation volumes"],
    relatedSlugs: ["ml-to-oz", "cooking-converter", "unit-converter"]
  },
  { slug: "ml-to-oz", name: "ML to OZ Converter", description: "Convert milliliters to fluid ounces and fluid ounces to milliliters.", category: "converter", icon: "🥤", keywords: ["ml to oz", "oz to ml", "milliliter converter", "fluid ounce"], subcategory: "volume", template: "simple-converter",
    longDescription: "Convert milliliters to fluid ounces and fluid ounces to milliliters instantly. One US fluid ounce equals approximately 29.5735 milliliters. This converter is essential for drinks, medicine dosages, cosmetics, and any recipe or product that lists volumes in one system but not the other.",
    faqs: [
      { question: "How many milliliters are in a fluid ounce?", answer: "One US fluid ounce equals approximately 29.5735 milliliters." },
      { question: "How many ounces is 100ml?", answer: "100 milliliters equals approximately 3.381 US fluid ounces." },
      { question: "Is a fluid ounce the same as a weight ounce?", answer: "No, a fluid ounce measures volume (liquids), while a weight ounce measures mass. They are different units." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a volume in either the milliliters or fluid ounces field." },
      { name: "See the result", text: "The converted volume appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted volume value." }
    ],
    useCases: ["Measuring liquid medicine dosages", "Converting drink serving sizes in recipes", "Checking cosmetic and skincare product volumes", "Converting beverage volumes on international menus"],
    relatedSlugs: ["liters-to-gallons", "cooking-converter", "unit-converter"]
  },
  { slug: "mph-to-kph", name: "MPH to KPH Converter", description: "Convert miles per hour to kilometers per hour and vice versa.", category: "converter", icon: "🏎️", keywords: ["mph to kph", "kph to mph", "speed converter", "velocity converter"], subcategory: "speed", template: "simple-converter",
    longDescription: "Convert miles per hour (mph) to kilometers per hour (km/h) and back instantly. One mile per hour equals exactly 1.60934 km/h. Essential for understanding speed limits abroad, comparing vehicle performance specs, and converting sports timing data between measurement systems.",
    faqs: [
      { question: "How many km/h is 60 mph?", answer: "60 mph equals approximately 96.56 km/h." },
      { question: "How do I convert mph to km/h?", answer: "Multiply the speed in mph by 1.60934 to get km/h. For example, 100 mph × 1.60934 = 160.934 km/h." },
      { question: "What is 100 km/h in mph?", answer: "100 km/h equals approximately 62.14 mph." }
    ],
    howToSteps: [
      { name: "Enter your speed", text: "Type a speed value in either the mph or km/h field." },
      { name: "See the result", text: "The converted speed appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted speed value." }
    ],
    useCases: ["Understanding speed limits when driving abroad", "Comparing car and motorcycle performance specs", "Converting running and cycling pace data", "Interpreting wind speed in weather forecasts"],
    relatedSlugs: ["miles-to-km", "unit-converter", "pace-calculator"]
  },
  { slug: "sqft-to-sqm", name: "Square Feet to Square Meters", description: "Convert square feet to square meters and vice versa.", category: "converter", icon: "📐", keywords: ["sqft to sqm", "square feet", "square meters", "area converter"], subcategory: "area", template: "simple-converter",
    longDescription: "Convert square feet to square meters and square meters to square feet instantly. One square foot equals approximately 0.0929 square meters. This converter is used heavily in real estate, interior design, and construction when working across countries that use different measurement standards.",
    faqs: [
      { question: "How many square meters is one square foot?", answer: "One square foot equals approximately 0.0929 square meters." },
      { question: "How many square feet is one square meter?", answer: "One square meter equals approximately 10.764 square feet." },
      { question: "How do I convert sq ft to sq m?", answer: "Multiply the area in square feet by 0.0929 to get square meters. For example, 500 sq ft × 0.0929 = 46.45 sq m." }
    ],
    howToSteps: [
      { name: "Enter your area", text: "Type an area value in either the square feet or square meters field." },
      { name: "See the result", text: "The converted area appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted area value." }
    ],
    useCases: ["Comparing real estate listings in different countries", "Interior design and room size planning", "Calculating flooring, carpet, or paint coverage", "Understanding property sizes when relocating internationally"],
    relatedSlugs: ["acres-to-hectares", "unit-converter", "feet-to-meters"]
  },
  { slug: "acres-to-hectares", name: "Acres to Hectares Converter", description: "Convert acres to hectares and hectares to acres.", category: "converter", icon: "🌾", keywords: ["acres to hectares", "hectares to acres", "land area", "area converter"], subcategory: "area", template: "simple-converter",
    longDescription: "Convert acres to hectares and hectares to acres with precision. One acre equals approximately 0.404686 hectares, and one hectare equals approximately 2.47105 acres. Commonly used in agriculture, land surveying, and real estate for comparing land areas between countries using different systems.",
    faqs: [
      { question: "How many hectares are in an acre?", answer: "One acre equals approximately 0.404686 hectares." },
      { question: "How many acres are in a hectare?", answer: "One hectare equals approximately 2.47105 acres." },
      { question: "How do I convert acres to hectares?", answer: "Multiply the number of acres by 0.404686 to get hectares. For example, 10 acres = 10 × 0.404686 = 4.047 hectares." }
    ],
    howToSteps: [
      { name: "Enter your land area", text: "Type an area value in either the acres or hectares field." },
      { name: "See the result", text: "The converted land area appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted area value." }
    ],
    useCases: ["Comparing agricultural land sizes internationally", "Real estate transactions for rural and farm properties", "Land surveying and mapping projects", "Understanding farm sizes in news, research, and reports"],
    relatedSlugs: ["sqft-to-sqm", "unit-converter", "miles-to-km"]
  },
  { slug: "bytes-converter", name: "Bytes Converter", description: "Convert between bytes, KB, MB, GB, TB, and PB.", category: "converter", icon: "💾", keywords: ["bytes to mb", "kb to gb", "data converter", "file size converter"], subcategory: "data", template: "simple-converter",
    longDescription: "Convert digital storage units between bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), terabytes (TB), and petabytes (PB). Supports both binary (1024-based) and decimal (1000-based) conversions. Essential for understanding file sizes, storage capacity, and data transfer rates.",
    relatedSlugs: ["number-base-converter", "unit-converter", "checksum-calculator"]
  },
  { slug: "cups-to-ml", name: "Cups to ML Converter", description: "Convert cups to milliliters and milliliters to cups for cooking.", category: "converter", icon: "🍳", keywords: ["cups to ml", "ml to cups", "cooking measurement", "baking converter"], subcategory: "volume", template: "simple-converter",
    longDescription: "Convert cups to milliliters and milliliters to cups for cooking and baking. One US cup equals exactly 236.588 milliliters. This converter is essential when following recipes from different countries where volume measurements differ between the US cup system and the metric system.",
    faqs: [
      { question: "How many milliliters are in a cup?", answer: "One US cup equals exactly 236.588 milliliters (approximately 237 ml)." },
      { question: "How many cups is 250ml?", answer: "250 milliliters equals approximately 1.057 US cups, or roughly just over one cup." },
      { question: "Is a metric cup the same as a US cup?", answer: "No, a metric cup (used in Australia and some other countries) equals 250 ml, while a US cup equals 236.588 ml." }
    ],
    howToSteps: [
      { name: "Enter your volume", text: "Type a measurement in either the cups or milliliters field." },
      { name: "See the result", text: "The converted volume appears instantly in the other field." },
      { name: "Use in your recipe", text: "Copy the converted measurement to use in your cooking or baking." }
    ],
    useCases: ["Converting international baking recipes to US cups", "Measuring liquids without a measuring cup", "Scaling recipes up or down accurately", "Converting beverage serving sizes in bars and cafes"],
    relatedSlugs: ["cooking-converter", "ml-to-oz", "recipe-scaler"]
  },
  { slug: "stones-to-kg", name: "Stones to KG Converter", description: "Convert stones to kilograms and kilograms to stones.", category: "converter", icon: "⚖️", keywords: ["stones to kg", "kg to stones", "weight converter", "stone converter"], subcategory: "weight", template: "simple-converter",
    longDescription: "Convert stones to kilograms and kilograms to stones instantly. One stone equals exactly 6.35029 kilograms and is primarily used in the UK and Ireland for measuring body weight. This converter is essential for anyone tracking their weight across UK and metric health records or communicating weight internationally.",
    faqs: [
      { question: "How many kilograms are in a stone?", answer: "One stone equals exactly 6.35029 kilograms." },
      { question: "How many stones is 70 kg?", answer: "70 kilograms equals approximately 11.02 stones, or 11 stone 0.3 pounds." },
      { question: "Why do British people use stones for weight?", answer: "The stone is a traditional British imperial unit still commonly used in the UK and Ireland for measuring body weight, though kilograms are used in medical contexts." }
    ],
    howToSteps: [
      { name: "Enter your weight", text: "Type a weight value in either the stones or kilograms field." },
      { name: "See the result", text: "The converted weight appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted weight value." }
    ],
    useCases: ["Converting body weight between UK and metric records", "Understanding UK weight references in books and media", "Fitness and health tracking across UK and international apps", "BMI calculations when weight is given in stones"],
    relatedSlugs: ["kg-to-lbs", "unit-converter", "bmi-calculator"]
  },
  { slug: "nautical-miles", name: "Nautical Miles Converter", description: "Convert between nautical miles, miles, and kilometers.", category: "converter", icon: "⚓", keywords: ["nautical miles", "knots", "maritime distance", "nautical converter"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert between nautical miles, statute miles, and kilometers. One nautical mile equals exactly 1.852 kilometers or approximately 1.15078 statute miles. Nautical miles are the standard unit of distance in aviation and maritime navigation, defined as one minute of arc along a meridian of the Earth.",
    faqs: [
      { question: "How many kilometers are in a nautical mile?", answer: "One nautical mile equals exactly 1.852 kilometers." },
      { question: "How many nautical miles are in a regular mile?", answer: "One statute (regular) mile equals approximately 0.86898 nautical miles." },
      { question: "Why do ships and planes use nautical miles?", answer: "One nautical mile equals one minute of latitude on the Earth's surface, making navigation calculations much simpler when using charts and coordinates." }
    ],
    howToSteps: [
      { name: "Enter your distance", text: "Type a distance value in nautical miles, miles, or kilometers." },
      { name: "See all conversions", text: "The equivalent distances in the other two units appear instantly." },
      { name: "Copy the result", text: "Click copy to use the converted distance value." }
    ],
    useCases: ["Maritime and sailing navigation planning", "Aviation flight distance calculations", "Converting GPS and chart distances for boating", "Understanding vessel speed and range specifications"],
    relatedSlugs: ["miles-to-km", "mph-to-kph", "unit-converter"]
  },
  { slug: "energy-converter", name: "Energy Unit Converter", description: "Convert between joules, calories, kilowatt-hours, and BTU.", category: "converter", icon: "⚡", keywords: ["energy converter", "joules", "calories", "kwh", "btu"], subcategory: "energy", template: "simple-converter",
    longDescription: "Convert between energy units including joules (J), kilojoules (kJ), calories (cal), kilocalories (kcal), kilowatt-hours (kWh), and British Thermal Units (BTU). One kilowatt-hour equals 3,600,000 joules, and one food calorie (kcal) equals 4,184 joules. Useful for physics, nutrition, and energy consumption calculations.",
    faqs: [
      { question: "How many joules are in a kilowatt-hour?", answer: "One kilowatt-hour (kWh) equals exactly 3,600,000 joules (3.6 MJ)." },
      { question: "How many calories are in a joule?", answer: "One joule equals approximately 0.239 calories (small calories). One food calorie (kilocalorie/kcal) equals 4,184 joules." },
      { question: "What is a BTU?", answer: "A BTU (British Thermal Unit) is the amount of energy needed to raise 1 pound of water by 1°F. One BTU equals approximately 1,055 joules." }
    ],
    howToSteps: [
      { name: "Enter an energy value", text: "Type the energy amount in the unit you want to convert from." },
      { name: "Select your unit", text: "Choose the source unit from the dropdown (joules, calories, kWh, BTU, etc.)." },
      { name: "Read the conversions", text: "All equivalent energy values in other units appear instantly." }
    ],
    useCases: ["Physics and engineering homework and calculations", "Comparing food energy (calories) to physical units", "Calculating electricity consumption in joules or BTU", "Understanding heating and cooling system energy ratings"],
    relatedSlugs: ["unit-converter", "celsius-to-fahrenheit", "calorie-calculator"]
  },
  { slug: "pressure-converter", name: "Pressure Unit Converter", description: "Convert between PSI, bar, atm, Pascal, and mmHg.", category: "converter", icon: "🔧", keywords: ["pressure converter", "psi to bar", "pascal", "atm converter"], subcategory: "energy", template: "simple-converter",
    longDescription: "Convert between pressure units including PSI (pounds per square inch), bar, atmospheres (atm), Pascals (Pa), kilopascals (kPa), and millimeters of mercury (mmHg). One atmosphere equals 101,325 Pascals, 14.696 PSI, or 1.01325 bar. Used in engineering, meteorology, medicine, and automotive applications.",
    faqs: [
      { question: "How many PSI is 1 bar?", answer: "One bar equals approximately 14.5038 PSI." },
      { question: "How many Pascals are in 1 atmosphere?", answer: "One standard atmosphere (atm) equals exactly 101,325 Pascals (101.325 kPa)." },
      { question: "What is the normal tire pressure in bar?", answer: "Car tire pressure is typically 2.0 to 2.5 bar (29 to 36 PSI). Always check your vehicle's recommended pressure." }
    ],
    howToSteps: [
      { name: "Enter a pressure value", text: "Type the pressure amount in the unit you want to convert from." },
      { name: "Select your unit", text: "Choose the source unit such as PSI, bar, atm, or Pascal." },
      { name: "Read the conversions", text: "All equivalent pressure values in other units appear instantly." }
    ],
    useCases: ["Checking tire and tyre pressure across PSI and bar", "Engineering and industrial pressure system calculations", "Medical blood pressure reference (mmHg to kPa)", "Meteorology and weather data pressure conversions"],
    relatedSlugs: ["unit-converter", "energy-converter", "celsius-to-fahrenheit"]
  },
  { slug: "angle-converter", name: "Angle Converter", description: "Convert between degrees, radians, gradians, and turns.", category: "converter", icon: "📐", keywords: ["angle converter", "degrees to radians", "radians converter", "gradians"], subcategory: "data", template: "simple-converter",
    longDescription: "Convert between angle units including degrees, radians, gradians (grads), and turns. One full circle equals 360 degrees, 2π radians (approximately 6.2832), 400 gradians, or 1 turn. Radians are the standard unit in mathematics and physics, while degrees are more common in everyday geometry.",
    faqs: [
      { question: "How many radians are in 180 degrees?", answer: "180 degrees equals exactly π radians (approximately 3.14159 radians)." },
      { question: "How do I convert degrees to radians?", answer: "Multiply degrees by π/180 (approximately 0.01745) to get radians. For example, 90° × π/180 = π/2 ≈ 1.5708 radians." },
      { question: "What is a gradian?", answer: "A gradian (or grad) divides a right angle into 100 equal parts, so a full circle is 400 gradians. Used mainly in surveying and some European countries." }
    ],
    howToSteps: [
      { name: "Enter an angle value", text: "Type the angle amount in the unit you want to convert from." },
      { name: "Select the unit", text: "Choose degrees, radians, gradians, or turns as the source unit." },
      { name: "Read the conversions", text: "All equivalent angle values in other units appear instantly." }
    ],
    useCases: ["Converting degrees to radians for math and programming", "Trigonometry calculations in physics and engineering", "Surveying and navigation angle conversions", "Understanding angles in graphics and game development"],
    relatedSlugs: ["unit-converter", "scientific-calculator", "number-base-converter"]
  },
];
