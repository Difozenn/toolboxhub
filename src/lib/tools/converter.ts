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
    howToSteps: [
      { name: "Enter your weight", text: "Type a value in kilograms or pounds into the corresponding field." },
      { name: "View the conversion", text: "The equivalent weight appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted weight wherever you need it." }
    ],
    useCases: ["Tracking body weight across fitness apps that use different units", "Converting luggage weight limits for international flights", "Calculating shipping costs when weight is listed in the other unit", "Following workout programs that list weights in kilograms or pounds"],
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
    howToSteps: [
      { name: "Enter a temperature", text: "Type a value in either the Celsius or Fahrenheit field." },
      { name: "See the conversion", text: "The equivalent temperature appears instantly in the other field." },
      { name: "Use the result", text: "Copy the converted temperature for weather, cooking, or scientific use." }
    ],
    useCases: ["Converting weather forecasts between Celsius and Fahrenheit", "Setting oven temperatures from recipes using a different scale", "Understanding fever thresholds in medical contexts across regions", "Converting scientific data between temperature scales"],
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
    faqs: [
      { question: "What is the difference between binary and decimal bytes?", answer: "Binary uses 1024 as the multiplier (1 KB = 1024 bytes), while decimal uses 1000 (1 KB = 1000 bytes). Storage manufacturers typically use decimal, while operating systems often use binary." },
      { question: "How many megabytes are in a gigabyte?", answer: "In binary, 1 GB = 1024 MB. In decimal, 1 GB = 1000 MB." },
      { question: "Why does my hard drive show less space than advertised?", answer: "Manufacturers advertise using decimal units (1 GB = 1,000,000,000 bytes) while your OS may display binary units (1 GiB = 1,073,741,824 bytes), making the reported capacity appear smaller." }
    ],
    howToSteps: [
      { name: "Enter a value", text: "Type a number in any digital storage unit field (bytes, KB, MB, GB, TB, or PB)." },
      { name: "View all conversions", text: "All other unit fields update instantly with the equivalent values." },
      { name: "Choose binary or decimal", text: "Toggle between binary (1024-based) and decimal (1000-based) conversion modes." }
    ],
    useCases: ["Estimating how many photos or videos fit on a storage device", "Calculating bandwidth and data transfer requirements", "Understanding cloud storage plan sizes and limits", "Converting file sizes for upload limits on websites and email"],
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

  // ── 42 New Converter Tools ──────────────────────────────────
  { slug: "yards-to-meters", name: "Yards to Meters Converter", description: "Convert yards to meters and meters to yards instantly.", category: "converter", icon: "📏", keywords: ["yards to meters", "meters to yards", "yard converter", "yd to m"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert yards to meters and meters to yards with precision. One yard equals exactly 0.9144 meters, making this converter useful for fabric measurements, football fields, swimming pools, and general US-to-metric distance conversions. Works bidirectionally for complete flexibility.",
    faqs: [
      { question: "How many meters are in a yard?", answer: "One yard equals exactly 0.9144 meters." },
      { question: "How many yards are in a meter?", answer: "One meter equals approximately 1.09361 yards." },
      { question: "Is the yard-to-meter conversion exact?", answer: "Yes, 1 yard = 0.9144 m is an exact international definition." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a number in either the yards or meters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted value." }
    ],
    useCases: ["Fabric and textile measurements", "American football field dimensions", "Swimming pool length conversions", "Athletics and track-and-field distances"],
    relatedSlugs: ["feet-to-meters", "inches-to-cm", "miles-to-km", "unit-converter"]
  },
  { slug: "mm-to-inches", name: "MM to Inches Converter", description: "Convert millimeters to inches and inches to millimeters.", category: "converter", icon: "📏", keywords: ["mm to inches", "inches to mm", "millimeter converter", "millimeter to inch"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert millimeters to inches and inches to millimeters instantly. One millimeter equals approximately 0.03937 inches, making this converter essential for engineering drawings, woodworking, screen sizes, and any precision measurement task crossing metric and imperial systems.",
    faqs: [
      { question: "How many inches is 1 mm?", answer: "One millimeter equals approximately 0.03937 inches (about 1/25th of an inch)." },
      { question: "How many mm in an inch?", answer: "One inch equals exactly 25.4 millimeters." },
      { question: "What is 10mm in inches?", answer: "10 millimeters equals approximately 0.3937 inches (just under 3/8 inch)." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a measurement in either the millimeters or inches field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the value in your project." }
    ],
    useCases: ["Engineering drawings and precision manufacturing", "Woodworking and carpentry plans", "Comparing screen and display sizes", "3D printing and model making dimensions"],
    relatedSlugs: ["inches-to-cm", "feet-to-meters", "unit-converter", "cm-to-feet"]
  },
  { slug: "km-to-meters", name: "KM to Meters Converter", description: "Convert kilometers to meters and meters to kilometers.", category: "converter", icon: "📏", keywords: ["km to meters", "meters to km", "kilometer converter", "km to m"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert kilometers to meters and meters to kilometers with ease. One kilometer equals exactly 1,000 meters, making this a straightforward but frequently needed conversion for running distances, road measurements, mapping, and scientific calculations.",
    faqs: [
      { question: "How many meters are in a kilometer?", answer: "One kilometer equals exactly 1,000 meters." },
      { question: "How do I convert km to m?", answer: "Multiply the number of kilometers by 1,000 to get meters. For example, 5 km = 5,000 m." },
      { question: "When would I need km to meters?", answer: "Common uses include GPS coordinates, running distances in scientific contexts, physics problems, and elevation data conversion." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a distance in either the kilometers or meters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted distance." }
    ],
    useCases: ["Converting running race distances", "Scientific and physics calculations", "Mapping and cartography conversions", "GPS and elevation data analysis"],
    relatedSlugs: ["miles-to-km", "feet-to-meters", "unit-converter", "yards-to-meters"]
  },
  { slug: "cm-to-feet", name: "CM to Feet Converter", description: "Convert centimeters to feet and feet to centimeters.", category: "converter", icon: "📏", keywords: ["cm to feet", "feet to cm", "centimeter to feet", "height converter"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert centimeters to feet and feet to centimeters instantly. One centimeter equals approximately 0.03281 feet. Useful for height conversions, furniture dimensions, and any task requiring a switch between the metric and imperial measurement systems.",
    faqs: [
      { question: "How many feet is 1 cm?", answer: "One centimeter equals approximately 0.03281 feet." },
      { question: "How many cm in a foot?", answer: "One foot equals exactly 30.48 centimeters." },
      { question: "How do I convert my height from cm to feet?", answer: "Divide your height in cm by 30.48 to get feet. For example, 175 cm ÷ 30.48 = 5.74 feet (approximately 5 feet 9 inches)." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a measurement in either the centimeters or feet field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted measurement." }
    ],
    useCases: ["Converting height between metric and imperial", "Furniture and interior design dimensions", "Medical height records", "International clothing and sizing charts"],
    relatedSlugs: ["feet-to-meters", "inches-to-cm", "unit-converter", "mm-to-inches"]
  },
  { slug: "tablespoons-to-ml", name: "Tablespoons to ML Converter", description: "Convert tablespoons to milliliters and milliliters to tablespoons.", category: "converter", icon: "🥄", keywords: ["tablespoons to ml", "ml to tablespoons", "tbsp to ml", "cooking converter"], subcategory: "volume", template: "simple-converter",
    longDescription: "Convert tablespoons to milliliters and milliliters to tablespoons for cooking and baking. One US tablespoon equals approximately 14.787 milliliters. Essential for adapting recipes between US customary and metric measurements.",
    faqs: [
      { question: "How many ml is one tablespoon?", answer: "One US tablespoon equals approximately 14.787 milliliters." },
      { question: "How many tablespoons are in 100ml?", answer: "100 milliliters equals approximately 6.76 US tablespoons." },
      { question: "Is a metric tablespoon the same?", answer: "A metric tablespoon is exactly 15 ml, while a US tablespoon is 14.787 ml — very close but slightly different." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a volume in either the tablespoons or milliliters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Use in your recipe", text: "Copy the result to use in your cooking or baking." }
    ],
    useCases: ["Adapting US recipe measurements to metric", "Scaling recipes up or down accurately", "Liquid medicine dosage conversions", "Bartending and cocktail measurements"],
    relatedSlugs: ["teaspoons-to-ml", "cups-to-ml", "cooking-converter", "ml-to-oz"]
  },
  { slug: "teaspoons-to-ml", name: "Teaspoons to ML Converter", description: "Convert teaspoons to milliliters and milliliters to teaspoons.", category: "converter", icon: "🥄", keywords: ["teaspoons to ml", "ml to teaspoons", "tsp to ml", "cooking measurement"], subcategory: "volume", template: "simple-converter",
    longDescription: "Convert teaspoons to milliliters and milliliters to teaspoons for cooking, baking, and medicine. One US teaspoon equals approximately 4.929 milliliters. An indispensable converter when adapting recipes across measurement systems.",
    faqs: [
      { question: "How many ml is one teaspoon?", answer: "One US teaspoon equals approximately 4.929 milliliters." },
      { question: "How many teaspoons is 5ml?", answer: "5 milliliters equals approximately 1.014 teaspoons, which is often rounded to 1 teaspoon in medical dosing." },
      { question: "Is a metric teaspoon 5ml?", answer: "Yes, a metric teaspoon is exactly 5 ml, while a US teaspoon is approximately 4.929 ml." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a volume in either the teaspoons or milliliters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use in your recipe or medication guide." }
    ],
    useCases: ["Cooking and baking recipe conversions", "Medicine dosage conversion (5ml = 1 tsp)", "Scaling small ingredient amounts", "Converting herbal remedy instructions"],
    relatedSlugs: ["tablespoons-to-ml", "cups-to-ml", "cooking-converter", "ml-to-oz"]
  },
  { slug: "pints-to-liters", name: "Pints to Liters Converter", description: "Convert US pints to liters and liters to pints.", category: "converter", icon: "🍺", keywords: ["pints to liters", "liters to pints", "pint converter", "pt to l"], subcategory: "volume", template: "simple-converter",
    longDescription: "Convert US pints to liters and liters to pints accurately. One US liquid pint equals approximately 0.4732 liters. Often used for beverage volumes, cooking, and understanding fluid quantities when working across US and metric measurement systems.",
    faqs: [
      { question: "How many liters is one pint?", answer: "One US liquid pint equals approximately 0.4732 liters." },
      { question: "How many pints is one liter?", answer: "One liter equals approximately 2.113 US pints." },
      { question: "Is a US pint the same as a UK pint?", answer: "No, a UK (Imperial) pint equals approximately 0.5683 liters, which is larger than the US pint (0.4732 L)." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a volume in either the pints or liters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted volume." }
    ],
    useCases: ["Beer and beverage volume comparisons", "Cooking and baking measurement adaptation", "Homebrewing calculations", "Understanding serving sizes in pubs and restaurants"],
    relatedSlugs: ["quarts-to-liters", "liters-to-gallons", "ml-to-oz", "cooking-converter"]
  },
  { slug: "quarts-to-liters", name: "Quarts to Liters Converter", description: "Convert US quarts to liters and liters to quarts.", category: "converter", icon: "🫗", keywords: ["quarts to liters", "liters to quarts", "quart converter", "qt to l"], subcategory: "volume", template: "simple-converter",
    longDescription: "Convert US quarts to liters and liters to quarts with accuracy. One US liquid quart equals approximately 0.9464 liters. A commonly needed conversion for cooking, engine oil capacities, and understanding large liquid volumes across US and metric systems.",
    faqs: [
      { question: "How many liters is one quart?", answer: "One US liquid quart equals approximately 0.9464 liters." },
      { question: "How many quarts is one liter?", answer: "One liter equals approximately 1.0567 US quarts — very close to 1 quart." },
      { question: "How many pints are in a quart?", answer: "There are exactly 2 US pints in 1 US quart." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a volume in either the quarts or liters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted volume." }
    ],
    useCases: ["Engine oil and automotive fluid measurements", "Cooking and baking volume conversion", "Beverage container size comparison", "Understanding paint and chemical volumes"],
    relatedSlugs: ["pints-to-liters", "liters-to-gallons", "cooking-converter", "unit-converter"]
  },
  { slug: "tons-to-kg", name: "Tons to KG Converter", description: "Convert US short tons to kilograms and kilograms to tons.", category: "converter", icon: "⚖️", keywords: ["tons to kg", "kg to tons", "short ton converter", "ton to kilogram"], subcategory: "weight", template: "simple-converter",
    longDescription: "Convert US short tons to kilograms and kilograms to US short tons. One US short ton equals exactly 907.185 kilograms. Used in freight, shipping, mining, and industrial weight measurements where large mass values must be compared across metric and imperial systems.",
    faqs: [
      { question: "How many kg is one US ton?", answer: "One US short ton equals exactly 907.185 kilograms." },
      { question: "What is the difference between a short ton, long ton, and metric ton?", answer: "A short ton (US) = 907.185 kg, a long ton (UK) = 1,016.05 kg, and a metric ton (tonne) = exactly 1,000 kg." },
      { question: "How many pounds are in a short ton?", answer: "One US short ton equals exactly 2,000 pounds." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a weight in either the tons or kilograms field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted weight." }
    ],
    useCases: ["Freight and shipping weight calculation", "Mining and extraction payload measurement", "Industrial and manufacturing weight specs", "Comparing vehicle payload capacities"],
    relatedSlugs: ["kg-to-lbs", "ounces-to-grams", "unit-converter", "stones-to-kg"]
  },
  { slug: "grams-to-mg", name: "Grams to Milligrams Converter", description: "Convert grams to milligrams and milligrams to grams.", category: "converter", icon: "⚖️", keywords: ["grams to mg", "mg to grams", "milligram converter", "g to mg"], subcategory: "weight", template: "simple-converter",
    longDescription: "Convert grams to milligrams and milligrams to grams instantly. One gram equals exactly 1,000 milligrams. Essential for pharmaceutical dosing, nutritional labeling, chemistry experiments, and any precision measurement task requiring small weight units.",
    faqs: [
      { question: "How many milligrams are in a gram?", answer: "One gram equals exactly 1,000 milligrams." },
      { question: "How do I convert mg to grams?", answer: "Divide the number of milligrams by 1,000 to get grams. For example, 500 mg = 0.5 g." },
      { question: "When is mg used instead of grams?", answer: "Milligrams are used for very small masses like medication doses, vitamins, minerals, and trace elements in chemistry and nutrition." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a weight in either the grams or milligrams field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted weight." }
    ],
    useCases: ["Converting medicine and supplement dosages", "Nutritional label reading and analysis", "Chemistry lab measurement preparation", "Calculating trace mineral amounts in formulations"],
    relatedSlugs: ["ounces-to-grams", "kg-to-lbs", "unit-converter", "carats-to-grams"]
  },
  { slug: "carats-to-grams", name: "Carats to Grams Converter", description: "Convert carats to grams and grams to carats for gemstones.", category: "converter", icon: "💎", keywords: ["carats to grams", "grams to carats", "carat converter", "gemstone weight"], subcategory: "weight", template: "simple-converter",
    longDescription: "Convert metric carats to grams and grams to carats. One metric carat equals exactly 0.2 grams (200 milligrams). Carats are the standard unit of mass for gemstones and diamonds in the jewelry industry worldwide.",
    faqs: [
      { question: "How many grams is one carat?", answer: "One metric carat equals exactly 0.2 grams (200 milligrams)." },
      { question: "How many carats is one gram?", answer: "One gram equals exactly 5 carats." },
      { question: "Is a carat the same as a karat?", answer: "No, a carat (ct) measures gemstone mass, while karat (k or kt) measures gold purity. They are completely different units." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a weight in either the carats or grams field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted gemstone weight." }
    ],
    useCases: ["Evaluating diamond and gemstone weights", "Jewelry appraisal and valuation", "Gem trading and wholesale pricing", "Converting gemstone weights for international transactions"],
    relatedSlugs: ["troy-ounces-to-grams", "grams-to-mg", "ounces-to-grams", "unit-converter"]
  },
  { slug: "troy-ounces-to-grams", name: "Troy Ounces to Grams Converter", description: "Convert troy ounces to grams and grams to troy ounces.", category: "converter", icon: "🥇", keywords: ["troy ounces to grams", "grams to troy ounces", "troy oz converter", "precious metals"], subcategory: "weight", template: "simple-converter",
    longDescription: "Convert troy ounces to grams and grams to troy ounces. One troy ounce equals approximately 31.1035 grams — heavier than an avoirdupois ounce (28.35 g). Troy ounces are the standard unit for measuring precious metals like gold, silver, and platinum.",
    faqs: [
      { question: "How many grams is one troy ounce?", answer: "One troy ounce equals approximately 31.1035 grams." },
      { question: "How is a troy ounce different from a regular ounce?", answer: "A troy ounce (31.1035 g) is heavier than an avoirdupois ounce (28.3495 g). Troy ounces are used exclusively for precious metals." },
      { question: "Why is gold measured in troy ounces?", answer: "Troy weight has been used for precious metals since medieval Europe and remains the global standard for gold, silver, and platinum pricing." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a weight in either the troy ounces or grams field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted precious metal weight." }
    ],
    useCases: ["Pricing and valuing gold and silver bullion", "Jewelry manufacturing and precious metal buying", "Investment portfolio precious metal calculations", "Understanding commodity market pricing"],
    relatedSlugs: ["carats-to-grams", "ounces-to-grams", "grams-to-mg", "unit-converter"]
  },
  { slug: "kelvin-converter", name: "Kelvin Converter", description: "Convert between Kelvin and Celsius temperature scales.", category: "converter", icon: "🌡️", keywords: ["kelvin to celsius", "celsius to kelvin", "kelvin converter", "absolute temperature"], subcategory: "temperature", template: "simple-converter",
    longDescription: "Convert between Kelvin and Celsius temperature scales. Kelvin is the SI base unit of temperature where 0 K is absolute zero, the coldest possible temperature. The conversion formula is simple: K = °C + 273.15. Used extensively in science, physics, and thermodynamics.",
    faqs: [
      { question: "How do you convert Celsius to Kelvin?", answer: "Add 273.15 to the Celsius temperature. For example, 100°C = 373.15 K." },
      { question: "What is absolute zero in Celsius?", answer: "Absolute zero is 0 Kelvin, which equals −273.15°C — the theoretical minimum temperature." },
      { question: "Why does Kelvin not use the degree symbol?", answer: "Kelvin is a base SI unit and is named after Lord Kelvin. By international convention, it is written as K without the degree (°) symbol." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a temperature in either the Celsius or Kelvin field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted temperature." }
    ],
    useCases: ["Physics and chemistry temperature calculations", "Astronomy and astrophysics temperature data", "Thermodynamics and engineering applications", "Converting scientific literature temperatures"],
    relatedSlugs: ["celsius-to-fahrenheit", "rankine-converter", "fahrenheit-to-kelvin", "unit-converter"]
  },
  { slug: "rankine-converter", name: "Rankine Converter", description: "Convert between Rankine and Fahrenheit temperature scales.", category: "converter", icon: "🌡️", keywords: ["rankine converter", "fahrenheit to rankine", "rankine temperature", "absolute temperature"], subcategory: "temperature", template: "simple-converter",
    longDescription: "Convert between the Rankine and Fahrenheit temperature scales. Rankine is an absolute thermodynamic temperature scale using Fahrenheit-sized degrees, where 0°R is absolute zero. The conversion is °R = °F + 459.67. Used in some US engineering and thermodynamics applications.",
    faqs: [
      { question: "How do you convert Fahrenheit to Rankine?", answer: "Add 459.67 to the Fahrenheit temperature. For example, 32°F (water's freezing point) = 491.67°R." },
      { question: "What is 0 Rankine in Fahrenheit?", answer: "0°R is absolute zero, which equals −459.67°F." },
      { question: "When is Rankine used?", answer: "Rankine is used in some US engineering fields, particularly in thermodynamics and aeronautical engineering where Fahrenheit-based absolute temperatures are needed." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a temperature in either the Fahrenheit or Rankine field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted temperature." }
    ],
    useCases: ["US engineering thermodynamics calculations", "Aeronautical and aerospace temperature work", "Chemical engineering process design", "Converting legacy US scientific temperature data"],
    relatedSlugs: ["celsius-to-fahrenheit", "kelvin-converter", "fahrenheit-to-kelvin", "unit-converter"]
  },
  { slug: "light-years-to-km", name: "Light Years to KM Converter", description: "Convert light years to kilometers and kilometers to light years.", category: "converter", icon: "🌌", keywords: ["light years to km", "km to light years", "astronomical distance", "light year converter"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert light years to kilometers and back. One light year equals approximately 9.461 × 10¹² kilometers — the distance light travels in one year. Used in astronomy and astrophysics to express vast interstellar and intergalactic distances.",
    faqs: [
      { question: "How many km is one light year?", answer: "One light year equals approximately 9.461 × 10¹² km (9,461,000,000,000 km)." },
      { question: "How fast does light travel per year?", answer: "Light travels approximately 299,792 km per second, covering about 9.461 trillion km per year." },
      { question: "How far away is the nearest star in light years?", answer: "Proxima Centauri, the nearest star to the Sun, is approximately 4.24 light years away." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a distance in either the light years or kilometers field." },
      { name: "See the result", text: "The conversion appears in scientific notation for clarity." },
      { name: "Copy the result", text: "Click copy to use the astronomical distance value." }
    ],
    useCases: ["Astronomy and astrophysics distance calculations", "Understanding stellar and galactic distances", "Science education and space exploration context", "Converting distances from astronomical catalogues"],
    relatedSlugs: ["parsec-to-light-years", "nautical-miles", "miles-to-km", "unit-converter"]
  },
  { slug: "horsepower-to-watts", name: "Horsepower to Watts Converter", description: "Convert horsepower to watts and watts to horsepower.", category: "converter", icon: "⚡", keywords: ["horsepower to watts", "watts to horsepower", "hp to watts", "power converter"], subcategory: "energy", template: "simple-converter",
    longDescription: "Convert between horsepower and watts, two of the most widely used power units. One mechanical horsepower equals exactly 745.7 watts. Used in automotive engineering, electric motor specifications, and any application comparing engine power output across different measurement traditions.",
    faqs: [
      { question: "How many watts is one horsepower?", answer: "One mechanical horsepower equals exactly 745.7 watts." },
      { question: "How many horsepower is 1000 watts (1 kW)?", answer: "1,000 watts equals approximately 1.341 horsepower." },
      { question: "Are all horsepower the same?", answer: "No. Mechanical (imperial) hp = 745.7 W, metric hp = 735.5 W, and electric hp = 746 W. This converter uses mechanical hp." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a power value in either the horsepower or watts field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted power value." }
    ],
    useCases: ["Comparing car engine power specifications", "Electric motor sizing and selection", "Generator capacity planning", "Converting pump and engine power ratings"],
    relatedSlugs: ["watts-to-btu", "energy-converter", "unit-converter", "newtons-to-pounds-force"]
  },
  { slug: "watts-to-btu", name: "Watts to BTU Converter", description: "Convert watts to BTU/hour and BTU/hour to watts.", category: "converter", icon: "🔥", keywords: ["watts to btu", "btu to watts", "power converter", "heating cooling"], subcategory: "energy", template: "simple-converter",
    longDescription: "Convert between watts and BTU per hour (BTU/hr), two common units for expressing heating and cooling power. One watt equals approximately 3.412 BTU/hour. Essential for comparing HVAC system ratings, air conditioner capacities, and heater output across US and metric standards.",
    faqs: [
      { question: "How many BTU/hr is one watt?", answer: "One watt equals approximately 3.41214 BTU/hour." },
      { question: "How many watts is 10,000 BTU?", answer: "10,000 BTU/hour equals approximately 2,931 watts (about 2.93 kW)." },
      { question: "What does BTU stand for?", answer: "BTU stands for British Thermal Unit — the amount of heat needed to raise 1 pound of water by 1°F." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a power value in either the watts or BTU/hr field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted power rating." }
    ],
    useCases: ["Comparing air conditioner BTU to watt ratings", "HVAC system sizing and planning", "Heater power output comparison", "Energy efficiency calculation for heating and cooling"],
    relatedSlugs: ["horsepower-to-watts", "energy-converter", "unit-converter", "calories-to-joules"]
  },
  { slug: "newtons-to-pounds-force", name: "Newtons to Pounds-Force Converter", description: "Convert newtons to pounds-force and pounds-force to newtons.", category: "converter", icon: "🔩", keywords: ["newtons to lbf", "pounds force", "force converter", "newton converter"], subcategory: "energy", template: "simple-converter",
    longDescription: "Convert between newtons (N) and pounds-force (lbf), the two most common units of force. One newton equals approximately 0.2248 pounds-force. Used in mechanical engineering, structural analysis, and any application requiring force measurement across metric and imperial systems.",
    faqs: [
      { question: "How many pounds-force is one newton?", answer: "One newton equals approximately 0.2248 pounds-force." },
      { question: "How many newtons is one pound-force?", answer: "One pound-force equals approximately 4.4482 newtons." },
      { question: "What is pounds-force (lbf)?", answer: "Pounds-force is the force exerted by gravity on a one-pound mass at standard gravity (9.80665 m/s²). It is different from pounds-mass (lbm)." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a force value in either the newtons or pounds-force field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted force value." }
    ],
    useCases: ["Mechanical engineering force calculations", "Structural load and stress analysis", "Spring constant and tension measurements", "Material strength and testing specifications"],
    relatedSlugs: ["horsepower-to-watts", "torr-to-pascal", "energy-converter", "unit-converter"]
  },
  { slug: "rpm-to-radians", name: "RPM to Radians/Second Converter", description: "Convert RPM to radians per second and back.", category: "converter", icon: "🔄", keywords: ["rpm to rad/s", "radians per second", "angular velocity", "rpm converter"], subcategory: "speed", template: "simple-converter",
    longDescription: "Convert revolutions per minute (RPM) to radians per second (rad/s) and back. One RPM equals approximately 0.10472 radians per second (2π/60). Essential for motor specifications, robotics, gyroscope data, and any rotational mechanics application.",
    faqs: [
      { question: "How many rad/s is one RPM?", answer: "One RPM equals approximately 0.10472 rad/s (2π divided by 60)." },
      { question: "How do I convert RPM to rad/s?", answer: "Multiply RPM by 2π/60, which equals approximately 0.10472. For example, 100 RPM × 0.10472 = 10.472 rad/s." },
      { question: "Why use radians per second instead of RPM?", answer: "Radians per second is the SI unit of angular velocity used in physics and engineering equations, while RPM is more intuitive for practical motor and engine specifications." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a rotation speed in either the RPM or rad/s field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted angular velocity." }
    ],
    useCases: ["Electric motor angular velocity specifications", "Robotics and servo motor programming", "Gyroscope and IMU sensor data interpretation", "Physics and mechanical engineering calculations"],
    relatedSlugs: ["knots-to-mph", "mph-to-kph", "angle-converter", "unit-converter"]
  },
  { slug: "knots-to-mph", name: "Knots to MPH Converter", description: "Convert knots to miles per hour and miles per hour to knots.", category: "converter", icon: "⚓", keywords: ["knots to mph", "mph to knots", "nautical speed", "knot converter"], subcategory: "speed", template: "simple-converter",
    longDescription: "Convert between knots and miles per hour. One knot equals approximately 1.15078 miles per hour. Knots are the standard unit of speed in aviation and maritime navigation, while mph is commonly used for road travel in the US and UK.",
    faqs: [
      { question: "How many mph is one knot?", answer: "One knot equals approximately 1.15078 miles per hour." },
      { question: "How many knots is 100 mph?", answer: "100 mph equals approximately 86.9 knots." },
      { question: "Why do ships and aircraft use knots?", answer: "One knot equals one nautical mile per hour, and one nautical mile equals one arcminute of latitude. This makes navigation and chart calculations much simpler." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a speed in either the knots or mph field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted speed." }
    ],
    useCases: ["Sailing and maritime navigation speed conversion", "Aviation airspeed conversion", "Interpreting weather buoy and station data", "Comparing vessel speed ratings across systems"],
    relatedSlugs: ["mph-to-kph", "nautical-miles", "rpm-to-radians", "unit-converter"]
  },
  { slug: "parsec-to-light-years", name: "Parsec to Light Years Converter", description: "Convert parsecs to light years and light years to parsecs.", category: "converter", icon: "🌌", keywords: ["parsec to light years", "light years to parsec", "astronomical distance", "parsec converter"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert between parsecs and light years, two units used in astronomy for measuring interstellar distances. One parsec equals approximately 3.2616 light years. Parsecs are derived from parallax measurements and are the preferred unit among professional astronomers.",
    faqs: [
      { question: "How many light years is one parsec?", answer: "One parsec equals approximately 3.2616 light years." },
      { question: "What does parsec stand for?", answer: "Parsec stands for parallax-arcsecond. It is defined as the distance at which one astronomical unit subtends one arcsecond of angle." },
      { question: "Which is bigger, a parsec or a light year?", answer: "A parsec is bigger — it equals about 3.26 light years." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a distance in either the parsecs or light years field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the astronomical distance value." }
    ],
    useCases: ["Professional astronomy and astrophysics calculations", "Interpreting stellar catalogue distances", "Science education in cosmology", "Converting distances in scientific papers"],
    relatedSlugs: ["light-years-to-km", "nautical-miles", "miles-to-km", "unit-converter"]
  },
  { slug: "fathoms-to-feet", name: "Fathoms to Feet Converter", description: "Convert fathoms to feet and feet to fathoms.", category: "converter", icon: "⚓", keywords: ["fathoms to feet", "feet to fathoms", "nautical depth", "fathom converter"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert fathoms to feet and feet to fathoms. One fathom equals exactly 6 feet (approximately 1.8288 meters). Fathoms are a traditional unit used to measure water depth in nautical and maritime contexts, and are still used on nautical charts.",
    faqs: [
      { question: "How many feet is one fathom?", answer: "One fathom equals exactly 6 feet." },
      { question: "Where does the word fathom come from?", answer: "Fathom comes from the Old English 'faethm' meaning outstretched arms — the approximate span a sailor could reach when taking a sounding." },
      { question: "Is the fathom still used today?", answer: "Yes, fathoms are still used on some nautical charts and in traditional seafaring, particularly in English-speaking countries." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a depth in either the fathoms or feet field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted depth value." }
    ],
    useCases: ["Interpreting nautical chart depth markings", "Scuba diving and underwater navigation", "Maritime history and literature reference", "Converting traditional seafaring measurements"],
    relatedSlugs: ["nautical-miles", "feet-to-meters", "yards-to-meters", "unit-converter"]
  },
  { slug: "furlongs-to-meters", name: "Furlongs to Meters Converter", description: "Convert furlongs to meters and meters to furlongs.", category: "converter", icon: "🏇", keywords: ["furlongs to meters", "meters to furlongs", "furlong converter", "horse racing distance"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert furlongs to meters and meters to furlongs. One furlong equals exactly 201.168 meters. Furlongs are a unit of length used in horse racing, land surveying, and agriculture. Eight furlongs equal one mile.",
    faqs: [
      { question: "How many meters is one furlong?", answer: "One furlong equals exactly 201.168 meters." },
      { question: "How many furlongs are in a mile?", answer: "There are exactly 8 furlongs in one statute mile." },
      { question: "When is the furlong used today?", answer: "Furlongs are still commonly used in horse racing to describe race distances, particularly in the US, UK, and Australia." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a distance in either the furlongs or meters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted distance." }
    ],
    useCases: ["Horse racing distance reference and conversion", "Agricultural land measurement", "Historical and traditional land survey calculations", "Equestrian sports distance planning"],
    relatedSlugs: ["yards-to-meters", "miles-to-km", "chains-to-meters", "unit-converter"]
  },
  { slug: "chains-to-meters", name: "Chains to Meters Converter", description: "Convert Gunter's chains to meters and meters to chains.", category: "converter", icon: "⛓️", keywords: ["chains to meters", "meters to chains", "surveyor chain", "chain converter"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert surveyor's chains (Gunter's chains) to meters and meters to chains. One chain equals exactly 20.1168 meters (66 feet or 100 links). The chain is a traditional unit used in land surveying, agriculture, and real estate particularly in English-speaking countries.",
    faqs: [
      { question: "How many meters is one chain?", answer: "One Gunter's chain equals exactly 20.1168 meters." },
      { question: "How many chains are in a mile?", answer: "There are exactly 80 chains in one statute mile." },
      { question: "Why is the chain used in land measurement?", answer: "The chain was devised by mathematician Edmund Gunter in 1620 and became standard for land surveys because 10 square chains equals exactly one acre." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a distance in either the chains or meters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted length." }
    ],
    useCases: ["Traditional land survey measurement conversion", "Understanding historical property deeds", "Agricultural land boundary calculations", "Real estate records in older documentation"],
    relatedSlugs: ["furlongs-to-meters", "yards-to-meters", "acres-to-hectares", "unit-converter"]
  },
  { slug: "hands-to-cm", name: "Hands to CM Converter", description: "Convert hands to centimeters and centimeters to hands.", category: "converter", icon: "🐎", keywords: ["hands to cm", "cm to hands", "horse height converter", "hand unit"], subcategory: "length", template: "simple-converter",
    longDescription: "Convert hands to centimeters and centimeters to hands. One hand equals exactly 10.16 centimeters (4 inches). The hand is a unit of measurement used specifically to measure the height of horses at the withers (the highest point of the shoulder).",
    faqs: [
      { question: "How many cm is one hand?", answer: "One hand equals exactly 10.16 centimeters (4 inches)." },
      { question: "What does '16 hands' mean for a horse?", answer: "A horse measuring 16 hands stands 162.56 cm (approximately 64 inches or 5 feet 4 inches) at the withers." },
      { question: "Why are horses measured in hands?", answer: "The hand was historically based on the average width of a human hand, and has been used to measure horses for centuries as an intuitive field measurement." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a height in either the hands or centimeters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted horse height." }
    ],
    useCases: ["Equestrian height measurement and reporting", "Horse buying and selling advertisements", "Veterinary records and health assessments", "Equestrian sport classification"],
    relatedSlugs: ["cm-to-feet", "feet-to-meters", "yards-to-meters", "unit-converter"]
  },
  { slug: "imperial-gallons-to-liters", name: "Imperial Gallons to Liters Converter", description: "Convert Imperial (UK) gallons to liters and liters to Imperial gallons.", category: "converter", icon: "🫗", keywords: ["imperial gallons", "uk gallons to liters", "imperial gallon converter", "british gallon"], subcategory: "volume", template: "simple-converter",
    longDescription: "Convert Imperial (UK) gallons to liters and liters to Imperial gallons. One Imperial gallon equals approximately 4.54609 liters — larger than the US gallon (3.78541 L). Important for UK fuel economy, beverage volumes, and international comparisons.",
    faqs: [
      { question: "How many liters is one Imperial gallon?", answer: "One Imperial (UK) gallon equals exactly 4.54609 liters." },
      { question: "How is an Imperial gallon different from a US gallon?", answer: "An Imperial gallon (4.546 L) is about 20% larger than a US gallon (3.785 L). Always clarify which gallon is intended when comparing fuel economy internationally." },
      { question: "Do UK fuel pumps use Imperial gallons?", answer: "No, UK fuel is now sold in liters. Imperial gallons are still referenced for older fuel economy ratings (mpg)." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a volume in either the Imperial gallons or liters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted volume." }
    ],
    useCases: ["UK fuel economy and range calculations", "Comparing US vs UK mpg ratings", "Understanding British recipe volumes", "Agricultural water and chemical usage"],
    relatedSlugs: ["liters-to-gallons", "pints-to-liters", "quarts-to-liters", "unit-converter"]
  },
  { slug: "bushels-to-liters", name: "Bushels to Liters Converter", description: "Convert US bushels to liters and liters to bushels.", category: "converter", icon: "🌾", keywords: ["bushels to liters", "liters to bushels", "bushel converter", "grain volume"], subcategory: "volume", template: "simple-converter",
    longDescription: "Convert US bushels to liters and liters to bushels. One US bushel equals approximately 35.239 liters. Bushels are used in agriculture for measuring grain, produce, and dry goods, particularly for crops like corn, wheat, soybeans, and oats.",
    faqs: [
      { question: "How many liters is one US bushel?", answer: "One US bushel equals approximately 35.239 liters." },
      { question: "How many bushels is one cubic meter?", answer: "One cubic meter (1,000 liters) equals approximately 28.38 US bushels." },
      { question: "Do different crops have different bushel weights?", answer: "Yes, while volume is the same, the weight of a bushel varies by crop: corn is 56 lbs/bushel, wheat is 60 lbs/bushel, and soybeans are 60 lbs/bushel." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a volume in either the bushels or liters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted grain volume." }
    ],
    useCases: ["Agricultural grain volume measurement", "Crop yield estimation and reporting", "Farm storage capacity planning", "Commodity trading volume calculations"],
    relatedSlugs: ["liters-to-gallons", "cubic-feet-to-liters", "acres-to-hectares", "unit-converter"]
  },
  { slug: "fluid-drams-to-ml", name: "Fluid Drams to ML Converter", description: "Convert fluid drams to milliliters and milliliters to fluid drams.", category: "converter", icon: "💊", keywords: ["fluid drams to ml", "ml to fluid drams", "dram converter", "pharmacy measurement"], subcategory: "volume", template: "simple-converter",
    longDescription: "Convert fluid drams to milliliters and milliliters to fluid drams. One US fluid dram equals approximately 3.697 milliliters. Fluid drams are a traditional unit used in pharmacy, herbal medicine, and historical recipes where small liquid volumes are measured.",
    faqs: [
      { question: "How many ml is one fluid dram?", answer: "One US fluid dram equals approximately 3.697 milliliters." },
      { question: "How many fluid drams are in a fluid ounce?", answer: "There are 8 fluid drams in one US fluid ounce." },
      { question: "Is a fluid dram the same as a dram in weight?", answer: "No, a fluid dram (volume) is different from an avoirdupois dram (weight, 1/16 oz). They are separate units that happen to share the name 'dram'." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a volume in either the fluid drams or milliliters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted small liquid volume." }
    ],
    useCases: ["Pharmaceutical and compounding calculations", "Herbal medicine and tincture measurements", "Historical recipe conversion and research", "Perfumery and essential oil blending"],
    relatedSlugs: ["teaspoons-to-ml", "tablespoons-to-ml", "ml-to-oz", "cooking-converter"]
  },
  { slug: "grains-to-grams", name: "Grains to Grams Converter", description: "Convert grains to grams and grams to grains.", category: "converter", icon: "⚖️", keywords: ["grains to grams", "grams to grains", "grain converter", "pharmacist weight"], subcategory: "weight", template: "simple-converter",
    longDescription: "Convert grains to grams and grams to grains. One grain equals approximately 0.0648 grams (64.8 mg). The grain is the smallest unit in both the avoirdupois and troy weight systems, originally based on the mass of a single seed of grain. Used in pharmacy, ballistics, and gemology.",
    faqs: [
      { question: "How many grams is one grain?", answer: "One grain equals approximately 0.0648 grams (64.8 milligrams)." },
      { question: "How many grains are in an ounce?", answer: "There are 437.5 grains in one avoirdupois ounce, and 480 grains in one troy ounce." },
      { question: "Why is grain still used?", answer: "Grains are still used in ballistics (bullet weight), pharmacy (historical prescriptions), and gemology for precision small-mass measurements." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a weight in either the grains or grams field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted small weight." }
    ],
    useCases: ["Ballistics and ammunition reloading", "Historical pharmaceutical prescription conversion", "Precision gemstone and powder weighing", "Traditional herbal medicine measurements"],
    relatedSlugs: ["grams-to-mg", "troy-ounces-to-grams", "carats-to-grams", "unit-converter"]
  },
  { slug: "pennyweight-to-grams", name: "Pennyweight to Grams Converter", description: "Convert pennyweight to grams and grams to pennyweight.", category: "converter", icon: "🏅", keywords: ["pennyweight to grams", "dwt to grams", "pennyweight converter", "precious metals weight"], subcategory: "weight", template: "simple-converter",
    longDescription: "Convert pennyweight (dwt) to grams and grams to pennyweight. One pennyweight equals approximately 1.5552 grams. Pennyweight is a unit of troy weight equal to 1/20 of a troy ounce, commonly used by jewelers and goldsmiths for weighing precious metals and gems.",
    faqs: [
      { question: "How many grams is one pennyweight?", answer: "One pennyweight equals approximately 1.5552 grams." },
      { question: "How many pennyweights are in a troy ounce?", answer: "There are exactly 20 pennyweights in one troy ounce." },
      { question: "Why is pennyweight used in jewelry?", answer: "Pennyweight (dwt) provides a convenient intermediate unit between grains and troy ounces for weighing small quantities of gold, silver, and gemstones in the jewelry trade." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a weight in either the pennyweight or grams field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted precious metal weight." }
    ],
    useCases: ["Jewelry making and goldsmithing", "Precious metal trading and appraisal", "Coin collecting and numismatics", "Gold and silver scrap buying calculations"],
    relatedSlugs: ["troy-ounces-to-grams", "carats-to-grams", "grams-to-mg", "unit-converter"]
  },
  { slug: "slugs-to-kg", name: "Slugs to KG Converter", description: "Convert slugs to kilograms and kilograms to slugs.", category: "converter", icon: "⚖️", keywords: ["slugs to kg", "kg to slugs", "slug converter", "imperial mass"], subcategory: "weight", template: "simple-converter",
    longDescription: "Convert slugs to kilograms and kilograms to slugs. One slug equals approximately 14.5939 kilograms. The slug is the unit of mass in the imperial foot-pound-second system, defined as the mass that accelerates at 1 ft/s² when a force of 1 pound-force is applied.",
    faqs: [
      { question: "How many kg is one slug?", answer: "One slug equals approximately 14.5939 kilograms." },
      { question: "What is a slug in physics?", answer: "A slug is defined as the mass that accelerates at 1 ft/s² when subjected to a net force of 1 pound-force. It is used in US customary unit calculations in mechanics and physics." },
      { question: "Is the slug still used?", answer: "The slug is still used in some US engineering, aerospace, and physics calculations where the imperial FPS (foot-pound-second) system is applied." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a mass in either the slugs or kilograms field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted mass value." }
    ],
    useCases: ["US engineering and aerospace mass calculations", "Mechanics and dynamics problem solving", "Converting legacy physics equations to SI", "Aerospace and ballistic trajectory calculations"],
    relatedSlugs: ["kg-to-lbs", "newtons-to-pounds-force", "unit-converter", "tons-to-kg"]
  },
  { slug: "torr-to-pascal", name: "Torr to Pascal Converter", description: "Convert Torr to Pascal and Pascal to Torr.", category: "converter", icon: "🔧", keywords: ["torr to pascal", "pascal to torr", "pressure converter", "vacuum pressure"], subcategory: "energy", template: "simple-converter",
    longDescription: "Convert between Torr and Pascal pressure units. One Torr equals approximately 133.322 Pascals. The Torr is a unit of pressure defined as 1/760 of a standard atmosphere and is widely used in vacuum technology, laboratory science, and meteorology.",
    faqs: [
      { question: "How many Pascals is one Torr?", answer: "One Torr equals approximately 133.322 Pascals." },
      { question: "What is one standard atmosphere in Torr?", answer: "One standard atmosphere equals exactly 760 Torr (or 101,325 Pascals)." },
      { question: "Why is Torr used in vacuum measurements?", answer: "Torr provides a convenient scale for vacuum pressures, where blood pressure (~120 mmHg), atmospheric pressure (760 Torr), and lab vacuum levels are all expressible in manageable numbers." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a pressure in either the Torr or Pascal field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted pressure value." }
    ],
    useCases: ["Vacuum chamber and pump pressure measurement", "Laboratory and research pressure specification", "Blood pressure unit conversion (mmHg = Torr)", "Meteorological and atmospheric pressure analysis"],
    relatedSlugs: ["pressure-converter", "newtons-to-pounds-force", "energy-converter", "unit-converter"]
  },
  { slug: "calories-to-joules", name: "Calories to Joules Converter", description: "Convert calories to joules and joules to calories.", category: "converter", icon: "🔥", keywords: ["calories to joules", "joules to calories", "energy converter", "calorie converter"], subcategory: "energy", template: "simple-converter",
    longDescription: "Convert between calories and joules, two common units of energy. One thermochemical calorie equals exactly 4.184 joules. Note that food calories (kcal) are 1,000 small calories. This converter uses the thermochemical calorie, the standard scientific definition.",
    faqs: [
      { question: "How many joules is one calorie?", answer: "One thermochemical calorie equals exactly 4.184 joules." },
      { question: "Are food calories the same as scientific calories?", answer: "No, food calories are actually kilocalories (kcal). One food Calorie = 1,000 scientific calories = 4,184 joules." },
      { question: "How many joules is 100 calories?", answer: "100 thermochemical calories equals 418.4 joules." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type an energy value in either the calories or joules field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted energy value." }
    ],
    useCases: ["Physics and chemistry energy calculations", "Nutrition and metabolic energy analysis", "Thermochemistry and calorimetry experiments", "Converting food energy to SI units"],
    relatedSlugs: ["energy-converter", "watts-to-btu", "electron-volts-to-joules", "unit-converter"]
  },
  { slug: "electron-volts-to-joules", name: "Electron Volts to Joules Converter", description: "Convert electron volts to joules and joules to electron volts.", category: "converter", icon: "⚛️", keywords: ["electron volts to joules", "eV to joules", "particle physics energy", "eV converter"], subcategory: "energy", template: "simple-converter",
    longDescription: "Convert between electron volts (eV) and joules (J). One electron volt equals approximately 1.602 × 10⁻¹⁹ joules. The electron volt is the standard energy unit in atomic and particle physics, representing the kinetic energy gained by a single electron accelerated through one volt of electric potential difference.",
    faqs: [
      { question: "How many joules is one electron volt?", answer: "One electron volt equals approximately 1.602 × 10⁻¹⁹ joules." },
      { question: "Why is eV used in particle physics?", answer: "The electron volt is a natural unit for atomic and subatomic physics because the energies involved are extremely small. Using joules would require unwieldy scientific notation for most particle energy values." },
      { question: "What is 1 MeV in joules?", answer: "1 MeV (mega-electron volt) = 1,000,000 eV = approximately 1.602 × 10⁻¹³ joules." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type an energy value in either the electron volts or joules field." },
      { name: "See the result", text: "The result appears in scientific notation for precision." },
      { name: "Copy the result", text: "Click copy to use the converted energy in your calculation." }
    ],
    useCases: ["Particle physics and nuclear energy calculations", "Semiconductor and photon energy analysis", "Astrophysics radiation energy conversion", "Quantum mechanics course calculations"],
    relatedSlugs: ["calories-to-joules", "energy-converter", "watts-to-btu", "unit-converter"]
  },
  { slug: "decibels-converter", name: "Decibels Converter", description: "Convert between decibels and linear ratios for power and amplitude.", category: "converter", icon: "🔊", keywords: ["decibels converter", "dB calculator", "power ratio dB", "amplitude dB"], subcategory: "data", template: "simple-converter",
    longDescription: "Convert between decibels (dB) and linear ratios for both power and amplitude quantities. The decibel is a logarithmic unit expressing the ratio of two values. Power ratios use 10 × log₁₀(ratio) while amplitude ratios use 20 × log₁₀(ratio). Widely used in audio engineering, telecommunications, and acoustics.",
    faqs: [
      { question: "What is a decibel?", answer: "A decibel is one-tenth of a bel, a logarithmic unit expressing the ratio of two quantities. It is widely used to describe power levels, sound pressure, and signal gain in electronics and acoustics." },
      { question: "What is the difference between power and amplitude dB?", answer: "For power ratios, dB = 10 × log₁₀(ratio). For amplitude (voltage, pressure) ratios, dB = 20 × log₁₀(ratio), because power is proportional to amplitude squared." },
      { question: "What does 0 dB mean?", answer: "0 dB means the ratio is 1:1 — no gain or attenuation. Positive dB values indicate gain (amplification) and negative values indicate attenuation (reduction)." }
    ],
    howToSteps: [
      { name: "Select mode", text: "Choose power ratio (10 log) or amplitude ratio (20 log) based on your measurement type." },
      { name: "Enter a value", text: "Type a linear ratio or a dB value in the appropriate field." },
      { name: "See the result", text: "The converted dB or ratio value appears instantly." }
    ],
    useCases: ["Audio engineering gain and attenuation calculation", "Telecommunications signal strength analysis", "Acoustics and sound pressure level measurement", "Electronics amplifier and filter design"],
    relatedSlugs: ["energy-converter", "angle-converter", "unit-converter", "bits-to-bytes"]
  },
  { slug: "bits-to-bytes", name: "Bits to Bytes Converter", description: "Convert bits to bytes and bytes to bits.", category: "converter", icon: "💾", keywords: ["bits to bytes", "bytes to bits", "bit converter", "data size"], subcategory: "data", template: "simple-converter",
    longDescription: "Convert between bits and bytes, the fundamental units of digital data storage and transmission. One byte equals exactly 8 bits. Essential for understanding data rates, file sizes, network bandwidth, and any digital storage or transmission calculation.",
    faqs: [
      { question: "How many bits are in a byte?", answer: "One byte equals exactly 8 bits." },
      { question: "How many bytes is a megabit?", answer: "One megabit = 1,000,000 bits = 125,000 bytes = 125 kilobytes." },
      { question: "Why do internet speeds use Mbps but storage uses MB?", answer: "Internet speed is typically measured in megabits per second (Mbps) while storage uses megabytes (MB). Since 1 byte = 8 bits, an 8 Mbps connection transfers about 1 MB per second." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a value in either the bits or bytes field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted data size." }
    ],
    useCases: ["Internet speed and bandwidth calculations", "File download time estimation", "Network protocol and packet size analysis", "Storage capacity planning"],
    relatedSlugs: ["bytes-converter", "number-base-converter", "unit-converter", "decibels-converter"]
  },
  { slug: "pixels-to-points", name: "Pixels to Points Converter", description: "Convert pixels to points and points to pixels based on DPI.", category: "converter", icon: "🖥️", keywords: ["pixels to points", "points to pixels", "px to pt", "typography units"], subcategory: "data", template: "simple-converter",
    longDescription: "Convert between pixels (px) and typographic points (pt) based on screen resolution (DPI). At 96 DPI (standard web), 1 pixel equals 0.75 points and 1 point equals approximately 1.333 pixels. Essential for typography, print design, and cross-media layout consistency.",
    faqs: [
      { question: "How many points is one pixel at 96 DPI?", answer: "At 96 DPI (standard web resolution), 1 pixel equals 0.75 points." },
      { question: "What is a typographic point?", answer: "A point (pt) is a unit of typographic measurement equal to 1/72 of an inch. It is the standard unit for font sizes in print and in CSS." },
      { question: "Why does DPI matter for this conversion?", answer: "The number of pixels per inch (DPI/PPI) determines how many pixels correspond to a physical inch, which affects the relationship between screen pixels and physical units like points." }
    ],
    howToSteps: [
      { name: "Set the DPI", text: "Enter your screen or output DPI (default 96 for web, 72 for traditional print)." },
      { name: "Enter your value", text: "Type a size in either the pixels or points field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." }
    ],
    useCases: ["Converting web font sizes to print point sizes", "Responsive design unit conversion", "UI specification handoff to developers", "Cross-media typography consistency"],
    relatedSlugs: ["pixels-to-rem", "em-to-px", "unit-converter", "bits-to-bytes"]
  },
  { slug: "em-to-px", name: "EM to PX Converter", description: "Convert em units to pixels and pixels to em based on base font size.", category: "converter", icon: "🖋️", keywords: ["em to px", "px to em", "css units converter", "em converter"], subcategory: "data", template: "simple-converter",
    longDescription: "Convert between em units and pixels based on a configurable base font size. The em unit in CSS is relative to the current element's font size — 1em equals the element's font size in pixels. Essential for responsive web design and accessible typography.",
    faqs: [
      { question: "How many pixels is 1 em?", answer: "1 em equals the base font size of the element. At the default browser size, 1 em = 16 px, but this changes if the base font size is different." },
      { question: "What is the difference between em and rem?", answer: "Em is relative to the parent element's font size, while rem (root em) is relative to the root element's (html) font size. Rem is more predictable for consistent sizing." },
      { question: "How do I convert 24px to em?", answer: "Divide 24px by your base font size. At base 16px: 24 ÷ 16 = 1.5em." }
    ],
    howToSteps: [
      { name: "Set the base font size", text: "Enter the parent element's font size in pixels (default is 16px)." },
      { name: "Enter your value", text: "Type a size in either the em or pixels field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." }
    ],
    useCases: ["Converting design pixel specs to CSS em units", "Responsive typography and layout design", "Migrating fixed pixel layouts to scalable units", "Accessible font sizing for browser zoom support"],
    relatedSlugs: ["pixels-to-rem", "pixels-to-points", "unit-converter", "bits-to-bytes"]
  },
  { slug: "rgb-to-cmyk", name: "RGB to CMYK Converter", description: "Convert RGB color values to CMYK for print design.", category: "converter", icon: "🎨", keywords: ["rgb to cmyk", "cmyk converter", "color space converter", "print color"], subcategory: "data", template: "simple-converter",
    longDescription: "Convert RGB (red, green, blue) color values used in digital screens to CMYK (cyan, magenta, yellow, key/black) values used in print production. RGB and CMYK operate in different color spaces — screen colors cannot always be perfectly reproduced in print.",
    faqs: [
      { question: "Why are RGB and CMYK different color spaces?", answer: "RGB is an additive color model used for screens (light is combined), while CMYK is subtractive (ink absorbs light). Some bright screen colors cannot be reproduced in CMYK print." },
      { question: "How accurate is this RGB to CMYK conversion?", answer: "This tool uses a standard mathematical conversion. For professional print work, a color-managed workflow with ICC profiles will give more accurate results depending on your paper and printer." },
      { question: "What does the K in CMYK stand for?", answer: "K stands for Key, which refers to the black ink plate (the key plate in the printing process). Using K instead of B avoids confusion with Blue in RGB." }
    ],
    howToSteps: [
      { name: "Enter RGB values", text: "Type the red, green, and blue channel values (0–255 each)." },
      { name: "See CMYK result", text: "The CMYK percentage values appear instantly below." },
      { name: "Use for print", text: "Copy the CMYK values for use in your print design application." }
    ],
    useCases: ["Preparing digital designs for print output", "Matching brand colors between screen and print", "Converting web color codes for graphic design", "Print prepress color specification"],
    relatedSlugs: ["color-converter", "color-picker", "unit-converter", "pixels-to-points"]
  },
  { slug: "fahrenheit-to-kelvin", name: "Fahrenheit to Kelvin Converter", description: "Convert Fahrenheit temperatures to Kelvin and Kelvin to Fahrenheit.", category: "converter", icon: "🌡️", keywords: ["fahrenheit to kelvin", "kelvin to fahrenheit", "temperature converter", "absolute temperature"], subcategory: "temperature", template: "simple-converter",
    longDescription: "Convert Fahrenheit temperatures to Kelvin and Kelvin to Fahrenheit. The formula is K = (°F + 459.67) × 5/9. This conversion bridges the US customary temperature scale with the absolute SI temperature scale used in science and engineering.",
    faqs: [
      { question: "How do you convert Fahrenheit to Kelvin?", answer: "Use the formula K = (°F + 459.67) × 5/9. For example, 32°F = (32 + 459.67) × 5/9 = 273.15 K." },
      { question: "What is 98.6°F (body temperature) in Kelvin?", answer: "98.6°F equals approximately 310.15 Kelvin." },
      { question: "What is absolute zero in Fahrenheit?", answer: "Absolute zero (0 Kelvin) equals −459.67°F." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a temperature in either the Fahrenheit or Kelvin field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted temperature." }
    ],
    useCases: ["Scientific temperature data conversion", "Thermodynamics and engineering calculations", "Converting US weather data to scientific units", "Physics problem solving across temperature scales"],
    relatedSlugs: ["celsius-to-fahrenheit", "kelvin-converter", "rankine-converter", "unit-converter"]
  },
  { slug: "meters-per-second-to-mph", name: "Meters per Second to MPH Converter", description: "Convert meters per second to miles per hour and back.", category: "converter", icon: "🏃", keywords: ["m/s to mph", "mph to m/s", "meters per second converter", "speed converter"], subcategory: "speed", template: "simple-converter",
    longDescription: "Convert meters per second (m/s) to miles per hour (mph) and back. One meter per second equals approximately 2.237 miles per hour. Used in physics, sports science, automotive engineering, and meteorology to express speed across metric and imperial systems.",
    faqs: [
      { question: "How many mph is one meter per second?", answer: "One meter per second equals approximately 2.237 miles per hour." },
      { question: "How many m/s is 60 mph?", answer: "60 mph equals approximately 26.82 m/s." },
      { question: "What is the speed of sound in mph and m/s?", answer: "The speed of sound in air at sea level is approximately 343 m/s or about 767 mph." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a speed in either the m/s or mph field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted speed." }
    ],
    useCases: ["Physics and mechanics velocity calculations", "Sports performance analysis (sprinting, cycling)", "Wind speed and meteorology data conversion", "Automotive and vehicle speed specification"],
    relatedSlugs: ["mph-to-kph", "knots-to-mph", "rpm-to-radians", "unit-converter"]
  },
  { slug: "cubic-feet-to-liters", name: "Cubic Feet to Liters Converter", description: "Convert cubic feet to liters and liters to cubic feet.", category: "converter", icon: "📦", keywords: ["cubic feet to liters", "liters to cubic feet", "volume converter", "cu ft to l"], subcategory: "volume", template: "simple-converter",
    longDescription: "Convert cubic feet to liters and liters to cubic feet. One cubic foot equals approximately 28.317 liters. Useful for HVAC airflow calculations, aquarium volumes, freight and shipping container volumes, and any application that measures large volumes across US and metric systems.",
    faqs: [
      { question: "How many liters is one cubic foot?", answer: "One cubic foot equals approximately 28.317 liters." },
      { question: "How many cubic feet is one liter?", answer: "One liter equals approximately 0.03531 cubic feet." },
      { question: "When is cubic feet used vs liters?", answer: "Cubic feet are common in US construction, HVAC, and natural gas measurement, while liters are the preferred metric unit for fluid and gas volumes internationally." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a volume in either the cubic feet or liters field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted volume." }
    ],
    useCases: ["HVAC and ventilation airflow calculations", "Aquarium and fish tank volume sizing", "Shipping container and freight volume conversion", "Natural gas measurement and billing"],
    relatedSlugs: ["liters-to-gallons", "bushels-to-liters", "quarts-to-liters", "unit-converter"]
  },
  { slug: "atmospheres-to-psi", name: "Atmospheres to PSI Converter", description: "Convert atmospheres to PSI and PSI to atmospheres.", category: "converter", icon: "🌡️", keywords: ["atm to psi", "psi to atm", "atmosphere converter", "pressure converter"], subcategory: "energy", template: "simple-converter",
    longDescription: "Convert between standard atmospheres (atm) and pounds per square inch (PSI). One atmosphere equals exactly 14.696 PSI. Used in tire pressure, scuba diving, industrial engineering, and scientific pressure measurements.",
    faqs: [
      { question: "How many PSI is one atmosphere?", answer: "One standard atmosphere equals exactly 14.696 PSI." },
      { question: "What is normal tire pressure in atm?", answer: "A typical car tire pressure of 32 PSI equals approximately 2.18 atmospheres." },
      { question: "Is atm used in diving?", answer: "Yes, divers use atmospheres to measure water pressure. Every 10 meters of seawater depth adds approximately 1 atm of pressure." }
    ],
    howToSteps: [
      { name: "Enter your value", text: "Type a pressure value in either the atmospheres or PSI field." },
      { name: "See the result", text: "The conversion appears instantly in the other field." },
      { name: "Copy the result", text: "Click copy to use the converted pressure." }
    ],
    useCases: ["Converting tire pressure readings between units", "Scuba diving pressure calculations", "Industrial pressure gauge conversions", "Scientific and laboratory pressure measurements"],
    relatedSlugs: ["torr-to-pascal", "unit-converter", "horsepower-to-watts", "kelvin-converter"]
  },
  { slug: "scientific-notation-converter", name: "Scientific Notation Converter", description: "Convert numbers to and from scientific notation.", category: "converter", icon: "🔬", keywords: ["scientific notation", "exponential notation", "e notation", "number converter"], subcategory: "number",
    longDescription: "Convert any number to scientific notation (e.g. 1.5 × 10^6) or convert scientific notation back to a standard decimal number. Supports very large and very small numbers with customizable significant figures. Essential for scientists, engineers, and students working with extreme values.",
    faqs: [
      { question: "What is scientific notation?", answer: "Scientific notation expresses numbers as a coefficient between 1 and 10 multiplied by a power of 10, e.g. 3.0 × 10^8 for the speed of light in m/s." },
      { question: "How many significant figures are shown?", answer: "You can configure the number of significant figures from 1 to 10 for precise control over the output." },
      { question: "Can it handle negative exponents?", answer: "Yes, numbers smaller than 1 are expressed with negative exponents, e.g. 0.005 = 5.0 × 10^-3." }
    ],
    howToSteps: [
      { name: "Enter a number", text: "Type any decimal number or scientific notation expression." },
      { name: "Set precision", text: "Choose the number of significant figures for the output." },
      { name: "View conversion", text: "See the number in both standard and scientific notation formats." }
    ],
    useCases: ["Converting astronomical distances for physics homework", "Formatting lab measurements for scientific papers", "Working with very small molecular or atomic measurements", "Understanding exponential notation in engineering contexts"],
    relatedSlugs: ["base-number-converter", "binary-calculator", "exponent-calculator", "unit-converter"]
  },
  { slug: "font-size-converter", name: "Font Size Converter", description: "Convert between px, pt, em, rem, and percentage font sizes.", category: "converter", icon: "🔤", keywords: ["font size", "px to pt", "em to px", "rem converter", "css font size"], subcategory: "web",
    longDescription: "Convert font sizes between pixels (px), points (pt), em, rem, and percentages. Set a base font size to calculate accurate em/rem/percentage conversions. Essential for web designers and developers working with responsive typography across different CSS units.",
    faqs: [
      { question: "What is the difference between em and rem?", answer: "Em is relative to the parent element's font size, while rem is relative to the root (html) element's font size. Rem is more predictable for consistent sizing." },
      { question: "How many points is one pixel?", answer: "At standard screen resolution (96 DPI), 1px = 0.75pt, or equivalently 1pt = 1.333px." },
      { question: "What base size should I use?", answer: "The default browser font size is 16px, which is the standard base for rem/em calculations in most projects." }
    ],
    howToSteps: [
      { name: "Set base font size", text: "Enter your root/base font size (default 16px) for accurate em/rem calculations." },
      { name: "Enter a value", text: "Type a font size in any unit — px, pt, em, rem, or %." },
      { name: "See all conversions", text: "All equivalent values in other units are displayed instantly." }
    ],
    useCases: ["Converting print point sizes to web pixel sizes", "Calculating rem values for responsive CSS", "Matching design mockup font sizes to CSS units", "Ensuring consistent typography across platforms"],
    relatedSlugs: ["em-to-px", "pixels-to-points", "css-unit-converter", "unit-converter"]
  },
];
