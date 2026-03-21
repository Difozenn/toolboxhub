import type { Tool } from "../types";

export const utilityTools: Tool[] = [
  // ── Existing (5) ──────────────────────────────────────────
  { slug: "pomodoro-timer", name: "Pomodoro Timer", description: "Stay focused with the Pomodoro technique — 25 min work, 5 min break.", category: "utility", icon: "🍅", keywords: ["pomodoro", "timer", "focus timer", "productivity timer"], subcategory: "timers",
    longDescription: "The Pomodoro Timer helps you apply the proven Pomodoro Technique — alternating 25-minute focused work sessions with 5-minute breaks — to boost productivity and reduce mental fatigue. Customize work and break durations, enable audio alerts, and track how many Pomodoros you complete each day.",
    faqs: [
      { question: "What is the Pomodoro Technique?", answer: "The Pomodoro Technique is a time management method where you work in focused 25-minute intervals (called Pomodoros) followed by a 5-minute break. After four Pomodoros, you take a longer 15–30 minute break." },
      { question: "Can I customize the work and break durations?", answer: "Yes — you can adjust the work session length, short break length, and long break length to match your personal focus style and schedule." },
      { question: "Will the timer alert me when a session ends?", answer: "Yes — the timer plays an audio notification when each work or break session ends so you don't need to keep an eye on the screen." }
    ],
    howToSteps: [
      { name: "Set your session durations", text: "Configure your preferred work interval (default 25 min), short break (5 min), and long break (15 min) lengths in the settings." },
      { name: "Start your first Pomodoro", text: "Click 'Start' to begin the countdown. Focus on a single task until the timer rings." },
      { name: "Take your break and repeat", text: "When the work session ends, take your break, then start the next Pomodoro. After four sessions, enjoy a longer rest." }
    ],
    useCases: [
      "Students studying for exams who need structured focus and regular breaks",
      "Remote workers battling distraction who need timed accountability",
      "Freelancers tracking productive work hours by counting completed Pomodoros",
      "Writers, coders, and creatives who benefit from regular mental resets"
    ],
    relatedSlugs: ["countdown-timer", "stopwatch", "notepad"]
  },
  { slug: "countdown-timer", name: "Countdown Timer", description: "Set a countdown timer to any date or duration.", category: "utility", icon: "⏳", keywords: ["countdown timer", "timer", "event countdown", "date countdown"], subcategory: "timers",
    longDescription: "The Countdown Timer lets you count down to any specific date and time or set a simple duration-based countdown for meetings, cooking, workouts, and more. Share countdown links for events, or let it run in the background with audio and browser notifications when the time is up.",
    faqs: [
      { question: "Can I count down to a specific future date?", answer: "Yes — enter any future date and time (such as a product launch, birthday, or deadline) and the timer will count down the exact days, hours, minutes, and seconds remaining." },
      { question: "Can I set a simple duration countdown without a specific date?", answer: "Yes — switch to duration mode and enter hours, minutes, and seconds for a standard kitchen-timer style countdown." },
      { question: "Will the timer alert me when it reaches zero?", answer: "Yes — the timer plays an audible alarm and can trigger a browser notification when the countdown reaches zero, even if the tab is in the background." }
    ],
    howToSteps: [
      { name: "Choose countdown mode", text: "Select 'Count to Date' to count down to a specific event date, or 'Set Duration' for a timer-style countdown." },
      { name: "Enter your target date or duration", text: "Type in the target date and time, or set the hours, minutes, and seconds you want to count down from." },
      { name: "Start the timer", text: "Click 'Start' and the countdown begins. The timer alerts you with sound and a notification when it reaches zero." }
    ],
    useCases: [
      "Counting down to a product launch, event, or important deadline",
      "Setting a meeting or presentation time limit for speakers",
      "Timing cooking, exercise intervals, or rest periods",
      "Building anticipation for an event by embedding a countdown on a webpage"
    ],
    relatedSlugs: ["pomodoro-timer", "stopwatch", "days-until"]
  },
  { slug: "stopwatch", name: "Stopwatch", description: "A simple stopwatch with lap tracking functionality.", category: "utility", icon: "⏱️", keywords: ["stopwatch", "timer", "lap timer", "time tracker"], subcategory: "timers",
    longDescription: "A clean, reliable browser-based stopwatch with millisecond precision and unlimited lap tracking. Record split times for workouts, experiments, or any time-critical task — all laps are listed with their individual and cumulative times, ready to copy or export.",
    faqs: [
      { question: "How accurate is the browser stopwatch?", answer: "The stopwatch uses the browser's high-resolution performance timer, providing millisecond-level accuracy suitable for timing workouts, experiments, and most everyday tasks." },
      { question: "Can I record lap times?", answer: "Yes — click the 'Lap' button at any point to record a split time. Each lap is displayed with its individual duration and the cumulative elapsed time." },
      { question: "Does the stopwatch keep running if I switch tabs?", answer: "Yes — the stopwatch continues running in the background when you switch to another tab. The display updates accurately when you return to the tab." }
    ],
    howToSteps: [
      { name: "Start the stopwatch", text: "Click 'Start' to begin timing. The display shows elapsed time in hours, minutes, seconds, and milliseconds." },
      { name: "Record laps", text: "Click 'Lap' at any point to record a split time without stopping the overall timer." },
      { name: "Stop and review", text: "Click 'Stop' to pause, then review your lap times in the list below. Click 'Reset' to clear and start again." }
    ],
    useCases: [
      "Timing athletic performance during training sessions or races",
      "Measuring how long specific tasks or processes take for productivity analysis",
      "Recording split times for cooking, science experiments, or lab work",
      "Timing presentations or speeches during rehearsal"
    ],
    relatedSlugs: ["pomodoro-timer", "countdown-timer", "pace-calculator"]
  },
  { slug: "notepad", name: "Online Notepad", description: "A simple browser-based notepad that saves to local storage.", category: "utility", icon: "📝", keywords: ["notepad", "online notepad", "text editor", "notes"], subcategory: "productivity",
    longDescription: "Online Notepad is a distraction-free text editor that automatically saves everything you type to your browser's local storage, so your notes are always there when you return. No account needed — just open the tab and start writing, with your content persisting through browser restarts.",
    faqs: [
      { question: "Where are my notes saved?", answer: "Your notes are saved automatically to your browser's local storage, meaning they persist on your device even after closing and reopening the tab or restarting the browser." },
      { question: "Can I create multiple separate notes?", answer: "Yes — you can create and name multiple note tabs to organize different pieces of information, all stored independently in local storage." },
      { question: "Can I export my notes to a file?", answer: "Yes — click 'Download' to save your current note as a .txt file to your device at any time." }
    ],
    howToSteps: [
      { name: "Open the notepad and start typing", text: "Click into the text area and begin writing. Your content is saved automatically as you type." },
      { name: "Create additional notes if needed", text: "Click 'New Note' to add a separate named tab for different topics or projects." },
      { name: "Download or share your note", text: "Click 'Download' to save a copy as a .txt file, or copy the content to paste elsewhere." }
    ],
    useCases: [
      "Jotting down quick notes, ideas, or to-do lists during work sessions",
      "Drafting content or copy before moving it into a full editor",
      "Temporarily storing clipboard snippets across browser sessions",
      "Writing and saving notes without creating an account on any service"
    ],
    relatedSlugs: ["markdown-preview", "word-counter", "pomodoro-timer"]
  },
  { slug: "screen-resolution", name: "Screen Resolution Detector", description: "Detect your screen resolution, viewport size, and device pixel ratio.", category: "utility", icon: "🖥️", keywords: ["screen resolution", "viewport size", "screen size", "display info"], subcategory: "system",
    longDescription: "Screen Resolution Detector instantly displays your monitor's physical resolution, current browser viewport dimensions, device pixel ratio, and color depth. It's an essential quick reference for developers, designers, and QA testers verifying responsive layouts across different screen sizes.",
    faqs: [
      { question: "What is the difference between screen resolution and viewport size?", answer: "Screen resolution is the total pixel count of your physical display (e.g., 1920×1080), while viewport size is the actual area your browser window uses for rendering web content, which changes as you resize the browser." },
      { question: "What is device pixel ratio (DPR)?", answer: "Device pixel ratio is the ratio of physical screen pixels to CSS pixels. Retina and HiDPI displays have a DPR of 2 or higher, meaning two physical pixels map to every one CSS pixel, resulting in sharper visuals." },
      { question: "Does this tool detect mobile screen sizes?", answer: "Yes — open the tool on any device including phones and tablets and it displays that device's screen resolution and viewport dimensions instantly." }
    ],
    howToSteps: [
      { name: "Open the tool on your target device", text: "Navigate to the Screen Resolution Detector on the device whose display information you want to check." },
      { name: "View your display metrics", text: "Your screen resolution, viewport size, device pixel ratio, and color depth are displayed immediately without any interaction required." },
      { name: "Resize to test responsive breakpoints", text: "Resize your browser window and watch the viewport dimensions update in real time to test different responsive layout breakpoints." }
    ],
    useCases: [
      "Developers checking viewport dimensions at different responsive breakpoints",
      "Designers verifying how their layout appears at specific screen sizes",
      "QA testers documenting screen specifications for bug reports",
      "Content creators optimizing images and graphics for target display resolutions"
    ],
    relatedSlugs: ["user-agent-parser", "image-resizer", "pixels-to-rem"]
  },

  // ── New Utility Tools ──────────────────────────────────────
  { slug: "color-blindness-simulator", name: "Color Blindness Simulator", description: "See how your designs look to people with different types of color blindness.", category: "utility", icon: "👁️", keywords: ["color blindness", "accessibility", "color vision", "a11y"], subcategory: "system",
    longDescription: "The Color Blindness Simulator applies real-time visual filters to any uploaded image or design to simulate how it appears to people with protanopia, deuteranopia, tritanopia, and other forms of color vision deficiency. Use it to make accessibility-informed design decisions and ensure your visuals communicate effectively to all users.",
    faqs: [
      { question: "What types of color blindness does the simulator support?", answer: "The tool simulates protanopia (red-blind), deuteranopia (green-blind), tritanopia (blue-blind), achromatopsia (complete color blindness), and several partial variants of each." },
      { question: "Can I test my website or UI design with this tool?", answer: "Yes — upload a screenshot of your design or website and cycle through the different color blindness modes to evaluate contrast and color differentiation for affected users." },
      { question: "How many people are affected by color blindness?", answer: "Approximately 8% of men and 0.5% of women have some form of color vision deficiency, making accessible color design important for reaching the broadest possible audience." }
    ],
    howToSteps: [
      { name: "Upload your image or screenshot", text: "Drag and drop or click to upload a screenshot of your design, website, chart, or any visual you want to test." },
      { name: "Select a color vision type", text: "Click through the different color blindness modes (protanopia, deuteranopia, tritanopia, etc.) to see how the image appears to affected users." },
      { name: "Adjust your design based on results", text: "Note any problematic color combinations where information is lost and update your design to use accessible contrast and color differentiation." }
    ],
    useCases: [
      "UI/UX designers testing color schemes for accessibility compliance",
      "Data visualization teams ensuring charts are readable by color-blind users",
      "Marketing teams evaluating whether brand colors work for all audiences",
      "Developers conducting accessibility audits before product launches"
    ],
    relatedSlugs: ["color-converter", "color-palette-generator", "image-filter"]
  },
  { slug: "aspect-ratio-calculator", name: "Aspect Ratio Calculator", description: "Calculate aspect ratios and resize dimensions proportionally.", category: "utility", icon: "📐", keywords: ["aspect ratio", "image ratio", "video ratio", "16:9 calculator"], subcategory: "system",
    longDescription: "The Aspect Ratio Calculator lets you calculate unknown dimensions when resizing images or videos proportionally, find the ratio of any width/height pair, and convert between common aspect ratios like 16:9, 4:3, and 1:1. It's an essential tool for designers, video editors, and developers working with responsive media.",
    faqs: [
      { question: "How do I find the missing dimension when resizing proportionally?", answer: "Enter the original width and height plus the new width (or height) you want, and the calculator instantly computes the missing dimension to preserve the exact aspect ratio." },
      { question: "What common aspect ratios does the tool include?", answer: "The tool includes presets for 16:9 (widescreen HD), 4:3 (traditional TV/photo), 1:1 (square), 9:16 (portrait video), 21:9 (ultrawide), and more, with the ability to enter any custom ratio." },
      { question: "Can I use this for video resolution calculations?", answer: "Yes — enter your source video resolution and target display size to calculate the correct output dimensions while maintaining the original aspect ratio without distortion." }
    ],
    howToSteps: [
      { name: "Enter your original dimensions", text: "Type the current width and height of your image, video, or container." },
      { name: "Enter the known new dimension", text: "Type either the new width or new height you want to scale to." },
      { name: "Get the calculated result", text: "The missing dimension is calculated instantly, showing you the exact size needed to maintain the original aspect ratio." }
    ],
    useCases: [
      "Resizing images for web while maintaining the original proportions",
      "Calculating video export dimensions for different platform requirements",
      "Designing responsive containers that maintain consistent aspect ratios",
      "Finding the correct thumbnail dimensions for a specific aspect ratio format"
    ],
    relatedSlugs: ["image-resizer", "social-image-resizer", "screen-resolution"]
  },
  { slug: "text-to-speech", name: "Text to Speech", description: "Convert text to speech using your browser's built-in speech synthesis.", category: "utility", icon: "🔊", keywords: ["text to speech", "tts", "speech synthesis", "read aloud"], subcategory: "productivity",
    longDescription: "Text to Speech uses your browser's built-in Web Speech API to read any text aloud, with controls for voice selection, reading speed, and pitch. It works entirely offline after the page loads — no audio files are uploaded or generated on a server — making it a fast, private reading tool.",
    faqs: [
      { question: "Does this require an internet connection to work?", answer: "The tool uses your browser's built-in speech synthesis engine, which works offline on most devices once the page has loaded. Voice availability depends on the voices installed on your operating system." },
      { question: "Can I choose different voices and languages?", answer: "Yes — the voice selector lists all speech synthesis voices available on your device, which often includes multiple languages and accents depending on your OS and browser." },
      { question: "Can I adjust the reading speed?", answer: "Yes — use the rate slider to slow down or speed up the reading from 0.5x (very slow) to 2x (fast) speed, which is helpful for accessibility or for speed-listening to content." }
    ],
    howToSteps: [
      { name: "Paste or type your text", text: "Enter the text you want read aloud into the text area. You can paste articles, notes, documents, or any written content." },
      { name: "Select a voice and adjust settings", text: "Choose a voice from the dropdown and adjust the reading speed and pitch to your preference." },
      { name: "Click Play to listen", text: "Click the 'Play' button to start reading. Use pause, resume, and stop controls as needed." }
    ],
    useCases: [
      "Proofreading your own writing by listening to it read back",
      "Consuming long-form articles or documents hands-free while multitasking",
      "Accessibility support for users with dyslexia or visual impairments",
      "Learning pronunciation of text in a foreign language"
    ],
    relatedSlugs: ["notepad", "word-counter", "readability-checker"]
  },
  { slug: "keyboard-tester", name: "Keyboard Tester", description: "Test every key on your keyboard and see which keys are working.", category: "utility", icon: "⌨️", keywords: ["keyboard test", "key tester", "keyboard check", "key press test"], subcategory: "system",
    longDescription: "The Keyboard Tester displays a visual on-screen keyboard and highlights each key as you press it, making it simple to identify stuck, unresponsive, or malfunctioning keys. It's an essential diagnostic tool for troubleshooting a new or suspect keyboard without needing to install any software.",
    faqs: [
      { question: "How do I test if a specific key is working?", answer: "Simply press the key on your physical keyboard and the corresponding key on the visual on-screen keyboard will highlight. If a key doesn't highlight when pressed, it may be stuck or malfunctioning." },
      { question: "Can this test special keys like Fn, media keys, and modifier keys?", answer: "Most standard keys including Shift, Ctrl, Alt, Caps Lock, and function keys (F1–F12) are detected. Some Fn and manufacturer-specific media keys bypass the browser and cannot be detected by web-based tools." },
      { question: "Can I test key rollover (multiple keys pressed simultaneously)?", answer: "Yes — press multiple keys at the same time and all detected keys will highlight simultaneously, letting you verify that your keyboard correctly registers key combinations (n-key rollover)." }
    ],
    howToSteps: [
      { name: "Open the keyboard tester", text: "Navigate to the Keyboard Tester tool — a visual keyboard layout appears on screen." },
      { name: "Press keys on your physical keyboard", text: "Press any key and watch the corresponding key highlight on the visual keyboard to confirm it is being detected." },
      { name: "Identify problem keys", text: "Any key that fails to highlight when pressed is likely malfunctioning or stuck. Check for debris under the keycap or contact the manufacturer." }
    ],
    useCases: [
      "Diagnosing a keyboard with stuck or unresponsive keys before replacing it",
      "Verifying that a newly purchased keyboard registers all keys correctly",
      "Testing gaming keyboard multi-key rollover and simultaneous key presses",
      "Checking that a laptop keyboard works fully after a spill or repair"
    ],
    relatedSlugs: ["screen-resolution", "user-agent-parser", "stopwatch"]
  },
  { slug: "internet-speed-test", name: "Internet Speed Test", description: "Test your internet download and upload speed.", category: "utility", icon: "📶", keywords: ["speed test", "internet speed", "bandwidth test", "download speed"], subcategory: "system",
    longDescription: "The Internet Speed Test measures your connection's download speed, upload speed, and latency directly from your browser, giving you an accurate picture of your current network performance. Use it to verify your ISP speeds, troubleshoot slow connections, or compare performance before and after network changes.",
    faqs: [
      { question: "How does the speed test work?", answer: "The test downloads and uploads data samples to a test server and measures how quickly the data transfers to calculate your speed in Mbps. Latency (ping) is measured as the round-trip time to the server." },
      { question: "What is a good internet download speed?", answer: "For general browsing and streaming, 25 Mbps download is considered good. For 4K streaming, video calls, and gaming, 100 Mbps or more is recommended. For households with multiple simultaneous users, 200+ Mbps is ideal." },
      { question: "Why might my speed test result differ from my ISP's advertised speed?", answer: "Real-world speeds are affected by Wi-Fi signal strength, router quality, distance to the server, network congestion, and the number of devices sharing your connection. Running the test on a wired Ethernet connection gives the most accurate reading." }
    ],
    howToSteps: [
      { name: "Start the speed test", text: "Click 'Start Test' to begin. The tool will first measure your ping (latency), then test download speed, then upload speed." },
      { name: "Wait for results", text: "The test typically takes 30–60 seconds to complete. Avoid using other bandwidth-heavy applications during the test for the most accurate results." },
      { name: "Review and compare your speeds", text: "View your download speed, upload speed, and latency results and compare them to your ISP's advertised plan speeds." }
    ],
    useCases: [
      "Verifying that your ISP is delivering the speeds you are paying for",
      "Troubleshooting slow video calls, streaming, or file transfers",
      "Comparing Wi-Fi versus wired connection speeds in your home or office",
      "Testing internet speed from different locations in your building to find dead zones"
    ],
    relatedSlugs: ["ip-address-lookup", "screen-resolution", "bytes-converter"]
  },
  { slug: "clipboard-manager", name: "Clipboard Manager", description: "Save and manage multiple clipboard items for quick access.", category: "utility", icon: "📋", keywords: ["clipboard", "clipboard manager", "copy paste", "clipboard history"], subcategory: "productivity",
    longDescription: "Clipboard Manager is a browser-based tool that lets you store and organize multiple text snippets for quick retrieval — overcoming the browser's single-item clipboard limitation. Save frequently used phrases, code snippets, or any text you need to paste repeatedly, all stored securely in your browser's local storage.",
    faqs: [
      { question: "How many clipboard items can I save?", answer: "You can save as many text snippets as you need. All items are stored in your browser's local storage and persist between sessions." },
      { question: "Is my clipboard content sent to any server?", answer: "No — all clipboard items are stored exclusively in your browser's local storage on your device. Nothing is transmitted to any server." },
      { question: "Can I organize saved clips into categories or folders?", answer: "Yes — you can label and tag your clipboard items, making it easy to find frequently used snippets by name or category rather than scrolling through a long list." }
    ],
    howToSteps: [
      { name: "Paste or type text to save", text: "Click 'Add Clip' and paste or type the text snippet you want to store in the clipboard manager." },
      { name: "Name and organize your clip", text: "Give the clip a descriptive label and optionally add a tag or category for easy retrieval later." },
      { name: "Copy a saved clip with one click", text: "Click the 'Copy' button next to any saved clip to instantly copy it to your system clipboard, ready to paste anywhere." }
    ],
    useCases: [
      "Developers storing reusable code snippets for quick insertion",
      "Customer support agents saving standard response templates",
      "Writers keeping frequently referenced quotes, statistics, or citations",
      "Power users managing multiple text items they need to paste repeatedly throughout the day"
    ],
    relatedSlugs: ["notepad", "text-repeater", "find-and-replace"]
  },
  { slug: "loan-comparison", name: "Loan Comparison Calculator", description: "Compare multiple loan offers side by side.", category: "utility", icon: "📊", keywords: ["loan comparison", "compare loans", "mortgage comparison", "interest comparison"], subcategory: "productivity",
    longDescription: "The Loan Comparison Calculator lets you enter up to four loan offers side by side — with different principal amounts, interest rates, and terms — and instantly see total interest paid, monthly payment, and total cost for each option. It makes it easy to identify the best deal without spreadsheet formulas.",
    faqs: [
      { question: "How many loans can I compare at once?", answer: "You can compare up to four loan offers simultaneously, displaying all key metrics side by side for easy visual comparison." },
      { question: "What metrics does the comparison show?", answer: "For each loan, the calculator shows the monthly payment, total amount repaid, total interest paid, and effective APR — giving you a full picture of the true cost of each option." },
      { question: "Can I use this for mortgages, car loans, and personal loans?", answer: "Yes — the calculator works for any amortizing loan type. Simply enter the loan amount, annual interest rate, and term in months or years for each offer." }
    ],
    howToSteps: [
      { name: "Enter your first loan offer", text: "Input the principal amount, annual interest rate, and loan term for the first loan offer in the first column." },
      { name: "Add additional loan offers", text: "Click 'Add Loan' to fill in details for other offers — up to four loans can be compared simultaneously." },
      { name: "Compare the results", text: "Review the monthly payment, total interest, and total repayment figures for each loan side by side and choose the most cost-effective option." }
    ],
    useCases: [
      "Comparing mortgage offers from multiple lenders before buying a home",
      "Evaluating different car loan terms and interest rates from dealerships",
      "Deciding between personal loan offers with different rates and terms",
      "Assessing the cost difference between a shorter term with higher payments versus a longer term with lower payments"
    ],
    relatedSlugs: ["loan-calculator", "mortgage-calculator", "compound-interest"]
  },
  { slug: "habit-tracker", name: "Habit Tracker", description: "Track daily habits with a visual streak calendar saved to your browser.", category: "utility", icon: "✅", keywords: ["habit tracker", "daily tracker", "streak tracker", "habit calendar"], subcategory: "productivity",
    longDescription: "Habit Tracker helps you build and maintain daily habits with a visual streak calendar that motivates consistency. Add custom habits, check them off each day, and watch your streak grow — all saved automatically to your browser's local storage so your progress is always there when you return.",
    faqs: [
      { question: "How are my habits and streaks saved?", answer: "All habit data and completion history are saved to your browser's local storage, persisting across sessions on the same device and browser without needing an account." },
      { question: "Can I track multiple habits at the same time?", answer: "Yes — add as many habits as you want to track. Each habit has its own streak counter and calendar view showing which days you completed it." },
      { question: "What happens if I miss a day?", answer: "Missing a day breaks your streak counter, which resets to zero. Your historical completion data remains visible on the calendar so you can see your overall consistency over time." }
    ],
    howToSteps: [
      { name: "Add your habits", text: "Click 'Add Habit' and enter the name of a daily habit you want to build, such as 'Exercise', 'Read', or 'Meditate'." },
      { name: "Check off habits each day", text: "Each day, click the checkmark next to each completed habit. Your current streak is updated immediately." },
      { name: "Review your progress", text: "Click on any habit to see its full calendar history and streak statistics, helping you identify patterns and stay motivated." }
    ],
    useCases: [
      "Building daily exercise, reading, or meditation habits through visual accountability",
      "Students tracking study habits and maintaining consistent daily practice",
      "People in habit-forming programs tracking progress toward 30 or 100-day goals",
      "Anyone who wants a simple no-account-required alternative to habit-tracking apps"
    ],
    relatedSlugs: ["pomodoro-timer", "notepad", "countdown-timer"]
  },
  { slug: "battery-status", name: "Battery Status", description: "Check your device battery level, charging status, and estimated time.", category: "utility", icon: "🔋", keywords: ["battery status", "battery level", "charging status", "battery info"], subcategory: "system",
    longDescription: "Battery Status displays your device's current battery percentage, charging state, and estimated time to full charge or discharge using the browser's Battery Status API. It's a quick diagnostic tool for laptops and mobile devices without opening system settings or control panels.",
    faqs: [
      { question: "Does this tool work on all devices?", answer: "The tool uses the Web Battery Status API, which is supported on most desktop browsers (Chrome, Edge) and Android devices. It may not be available on iOS Safari or Firefox due to privacy restrictions in those browsers." },
      { question: "Does the battery percentage update in real time?", answer: "Yes — the battery level and charging status update automatically in real time as your battery charges or discharges while the page is open." },
      { question: "Why does the estimated time remaining sometimes show as unavailable?", answer: "Some operating systems and browsers do not expose battery time estimates through the web API even when the battery percentage is available, resulting in 'unavailable' for time estimates." }
    ],
    howToSteps: [
      { name: "Open the Battery Status tool", text: "Navigate to the tool on the device you want to check. If your browser supports the Battery API, your battery information loads automatically." },
      { name: "View your battery details", text: "See your current battery percentage, whether the device is charging or discharging, and the estimated time remaining if available." },
      { name: "Monitor changes in real time", text: "Keep the tab open and watch the battery level and charging status update live as your device charges or discharges." }
    ],
    useCases: [
      "Quickly checking battery level without navigating to system settings",
      "Monitoring battery drain during resource-intensive tasks",
      "Developers testing Battery API implementation on different browsers and devices",
      "Verifying that a laptop is actually charging when connected to a power source"
    ],
    relatedSlugs: ["screen-resolution", "keyboard-tester", "internet-speed-test"]
  },
  { slug: "world-clock", name: "World Clock", description: "View current time in multiple cities and time zones simultaneously.", category: "utility", icon: "🌍", keywords: ["world clock", "time zones", "global time", "international clock"], subcategory: "timers",
    longDescription: "World Clock displays the current local time in multiple cities and time zones simultaneously, making it easy to coordinate across regions for meetings, calls, and deadlines. Add any city from a searchable list, and see all clocks update live in a clean, side-by-side view.",
    faqs: [
      { question: "How many cities can I add to the world clock?", answer: "You can add as many city clocks as you need. The display adjusts automatically to fit your selection in a clean grid layout." },
      { question: "Does the world clock adjust for daylight saving time automatically?", answer: "Yes — all times are derived from your browser's built-in timezone data, which correctly accounts for daylight saving time transitions in each region." },
      { question: "Can I save my list of cities for future visits?", answer: "Yes — your selected cities are saved to local storage, so your custom world clock configuration is preserved each time you return to the tool." }
    ],
    howToSteps: [
      { name: "Add cities to your clock", text: "Use the city search field to find and add any city or timezone. The clock for that city appears immediately." },
      { name: "View live times across all zones", text: "All clocks display the current local time and update every second, with AM/PM and date information shown." },
      { name: "Compare times for scheduling", text: "Use the clock display to find a meeting time that works across all your team's time zones." }
    ],
    useCases: [
      "Remote teams scheduling meetings across multiple international time zones",
      "Travelers tracking local time at home and their destination simultaneously",
      "Global business users monitoring stock market opening times in different regions",
      "Developers coordinating deployment windows across distributed teams"
    ],
    relatedSlugs: ["timezone-converter", "countdown-timer", "stopwatch"]
  },
];
