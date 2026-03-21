import type { Tool } from "../types";

export const educationTools: Tool[] = [
  { slug: "grade-calculator", name: "Grade Calculator", description: "Calculate your final grade with weighted assignments and exams.", category: "education", icon: "📝", keywords: ["grade calculator", "final grade", "weighted grade", "class grade"], subcategory: "grades", template: "simple-calculator",
    longDescription: "Calculate your current or final grade in any class with weighted categories. Enter assignments, quizzes, exams, and projects with their weights to see your overall grade. Also calculates what you need on upcoming assignments to achieve a target grade.",
    faqs: [
      { question: "How do weighted grades work?", answer: "Weighted grades assign different importance to each category — for example, exams might count for 50% and homework for 20%. Your grade in each category is multiplied by its weight and summed." },
      { question: "Can I calculate what I need on my final exam?", answer: "Yes. Enter your current grade and the weight of the final exam, then set your target grade to see the minimum score you need." },
      { question: "Does it work for pass/fail classes?", answer: "The calculator is designed for percentage-based grading. For pass/fail classes, you can still use it to check if your score meets the minimum passing threshold." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter each assignment or exam category along with its weight percentage." },
      { name: "Step 2", text: "Input your scores for completed work in each category." },
      { name: "Step 3", text: "View your current overall grade and the target score needed for upcoming assessments." }
    ],
    useCases: [
      "Tracking your current standing in a course with multiple graded components",
      "Calculating the minimum final exam score needed to achieve a target grade",
      "Planning study priorities based on which categories carry the most weight",
      "Verifying that an instructor's grade matches your own calculation"
    ],
    relatedSlugs: ["gpa-calculator", "percentage-calculator", "average-calculator"]
  },
  { slug: "citation-generator", name: "Citation Generator", description: "Generate citations in APA, MLA, Chicago, and Harvard formats.", category: "education", icon: "📚", keywords: ["citation generator", "apa citation", "mla citation", "bibliography"], subcategory: "language",
    longDescription: "Generate properly formatted citations for books, journal articles, websites, and other sources in APA, MLA, Chicago, and Harvard styles. The citation generator saves time, reduces formatting errors, and helps students and researchers build accurate bibliographies and reference lists for any academic work.",
    faqs: [
      { question: "Which citation formats does the generator support?", answer: "The generator supports APA 7th edition, MLA 9th edition, Chicago (author-date and notes-bibliography), and Harvard referencing styles." },
      { question: "Can I cite websites and online articles?", answer: "Yes. The generator handles books, journal articles, websites, newspapers, podcasts, and other common source types with the appropriate fields for each format." },
      { question: "How accurate are the generated citations?", answer: "The generator follows official style guide rules. Always double-check output against your institution's requirements, as style guides update periodically." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Select the citation style required by your institution or assignment." },
      { name: "Step 2", text: "Choose the source type (book, website, journal article, etc.) and fill in the required fields." },
      { name: "Step 3", text: "Copy the formatted citation and add it to your bibliography or reference list." }
    ],
    useCases: [
      "Building reference lists for academic papers and dissertations",
      "Generating in-text citations and full bibliography entries simultaneously",
      "Switching the same source between citation formats for different assignments",
      "Creating properly formatted citations for research reports and literature reviews"
    ],
    relatedSlugs: ["word-counter", "readability-checker", "lorem-ipsum"]
  },
  { slug: "flashcard-maker", name: "Flashcard Maker", description: "Create study flashcards with flip animations saved to your browser.", category: "education", icon: "🗂️", keywords: ["flashcard maker", "study cards", "flash cards", "study tool"], subcategory: "language",
    longDescription: "Build custom digital flashcards for any subject and study them with interactive flip animations — all saved locally in your browser so your cards are ready whenever you return. The flashcard maker uses active recall, one of the most effective study techniques, to help you memorize vocabulary, concepts, formulas, and facts faster.",
    faqs: [
      { question: "Are my flashcards saved when I close the browser?", answer: "Yes. Cards are saved to your browser's local storage, so they persist between sessions as long as you use the same browser and don't clear your data." },
      { question: "How many flashcards can I create?", answer: "There is no hard limit. You can create as many decks and cards as you need for different subjects." },
      { question: "Can I add images to my flashcards?", answer: "Image support depends on the tool version. Text-based flashcards are always supported, and some versions allow image uploads for visual learning." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Click to create a new flashcard deck and give it a subject name." },
      { name: "Step 2", text: "Add cards by entering a question or term on the front and the answer on the back." },
      { name: "Step 3", text: "Study your deck by flipping through cards and marking which ones you've mastered." }
    ],
    useCases: [
      "Memorizing vocabulary for language learning and foreign language classes",
      "Studying definitions and concepts for science and history exams",
      "Reviewing medical or legal terminology for professional certifications",
      "Creating interactive study aids for students of all ages"
    ],
    relatedSlugs: ["notepad", "pomodoro-timer", "random-number-generator"]
  },
  { slug: "periodic-table", name: "Interactive Periodic Table", description: "Browse elements with properties, electron configuration, and more.", category: "education", icon: "⚛️", keywords: ["periodic table", "elements", "chemistry", "atomic number"], subcategory: "science",
    longDescription: "Explore all 118 elements on an interactive periodic table that displays atomic number, atomic mass, electron configuration, melting and boiling points, electronegativity, and more. Color-coded by element category, this tool makes chemistry study and reference fast and visually intuitive for students and educators alike.",
    faqs: [
      { question: "What information is shown for each element?", answer: "Each element displays its symbol, atomic number, atomic mass, electron configuration, state at room temperature, melting/boiling points, electronegativity, and element category." },
      { question: "Can I search for elements by name or symbol?", answer: "Yes. You can click on any element or use the search to jump directly to an element by name, symbol, or atomic number." },
      { question: "Is the periodic table suitable for high school chemistry?", answer: "Absolutely. It covers all the information needed for GCSE, A-Level, AP Chemistry, and introductory college chemistry courses." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Browse the color-coded periodic table to explore element groups and periods." },
      { name: "Step 2", text: "Click on any element to open a detail panel with its full properties." },
      { name: "Step 3", text: "Use the search or filter options to find elements by category or property." }
    ],
    useCases: [
      "Looking up element properties quickly during chemistry homework",
      "Understanding periodic trends such as electronegativity and atomic radius",
      "Teaching element categories and periodic table structure in the classroom",
      "Referencing electron configurations for chemistry coursework and exams"
    ],
    relatedSlugs: ["scientific-calculator", "unit-converter", "number-to-words"]
  },
  { slug: "multiplication-table", name: "Multiplication Table", description: "Generate interactive multiplication tables up to any size.", category: "education", icon: "✖️", keywords: ["multiplication table", "times table", "math table", "multiplication chart"], subcategory: "math",
    longDescription: "Generate and explore multiplication tables from 1x1 up to any custom size, with interactive highlighting that makes patterns easy to spot. Whether you're learning the times tables for the first time or reviewing multiplication facts, this visual tool makes arithmetic practice engaging and efficient.",
    faqs: [
      { question: "What is the maximum table size I can generate?", answer: "You can generate tables up to 20×20 or larger depending on the setting. Custom sizes allow you to focus on the specific range you're practicing." },
      { question: "Can I use this to spot multiplication patterns?", answer: "Yes. The interactive table highlights rows and columns when you click a cell, making it easy to see relationships and patterns like squares and multiples." },
      { question: "Is this suitable for primary school students?", answer: "Yes. The tool is ideal for students learning their times tables from 2× through 12×, with a clear, easy-to-read layout." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Set the desired table size (e.g., 10×10 or 12×12) using the input controls." },
      { name: "Step 2", text: "Click on any cell to highlight the corresponding row and column." },
      { name: "Step 3", text: "Use the table to practice and verify multiplication facts during study sessions." }
    ],
    useCases: [
      "Helping primary school students practice and memorize the times tables",
      "Providing a quick multiplication reference during mental math exercises",
      "Identifying patterns in multiplication for advanced arithmetic lessons",
      "Supporting homeschool math curriculum with an interactive visual aid"
    ],
    relatedSlugs: ["scientific-calculator", "percentage-calculator", "fraction-calculator"]
  },
  { slug: "reading-speed-test", name: "Reading Speed Test", description: "Test your reading speed in words per minute with comprehension check.", category: "education", icon: "📖", keywords: ["reading speed", "wpm test", "reading test", "speed reading"], subcategory: "language",
    longDescription: "Measure your reading speed in words per minute (WPM) with a timed passage, followed by a comprehension check to ensure you're retaining what you read. Knowing your reading speed helps you plan study sessions, set realistic reading goals, and track improvement as you practice speed reading techniques.",
    faqs: [
      { question: "What is an average reading speed?", answer: "The average adult reads around 200–300 words per minute. College students average around 300 WPM, while proficient speed readers can reach 600+ WPM with practice." },
      { question: "Does reading faster hurt comprehension?", answer: "It can if taken too far. The comprehension check in this test ensures you're retaining information and not just scanning words." },
      { question: "How can I improve my reading speed?", answer: "Practice eliminating subvocalization (reading words aloud in your head), use a pointer to guide your eyes, and train with increasingly longer passages over time." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Click Start to begin the timer and start reading the provided passage." },
      { name: "Step 2", text: "Click Done when you finish reading to record your elapsed time." },
      { name: "Step 3", text: "Answer the comprehension questions and review your WPM score and accuracy." }
    ],
    useCases: [
      "Establishing a baseline reading speed before starting a speed reading program",
      "Testing reading improvement after practicing speed reading techniques",
      "Preparing students for timed reading assessments and standardized tests",
      "Helping professionals manage heavy reading workloads more efficiently"
    ],
    relatedSlugs: ["readability-checker", "word-counter", "pomodoro-timer"]
  },
  { slug: "math-quiz-generator", name: "Math Quiz Generator", description: "Generate random math practice quizzes with adjustable difficulty.", category: "education", icon: "🔢", keywords: ["math quiz", "practice problems", "math test", "arithmetic quiz"], subcategory: "math",
    longDescription: "Generate unlimited math practice quizzes covering addition, subtraction, multiplication, division, fractions, and more with adjustable difficulty levels. Perfect for students who want extra practice, teachers who need quick quiz material, or anyone looking to sharpen their mental arithmetic skills.",
    faqs: [
      { question: "What math topics does the generator cover?", answer: "The generator covers basic arithmetic (addition, subtraction, multiplication, division), fractions, decimals, percentages, and can be set to mixed or topic-specific modes." },
      { question: "Can I set the number of questions in each quiz?", answer: "Yes. You can customize the number of questions, difficulty level, and the type of operations included in each generated quiz." },
      { question: "Are the answers shown after I complete the quiz?", answer: "Yes. After submitting your answers, the tool reveals the correct solutions and shows which questions you got right or wrong." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Select the math topic, difficulty level, and number of questions you want." },
      { name: "Step 2", text: "Complete the quiz by entering your answers for each generated problem." },
      { name: "Step 3", text: "Submit to see your score and review the correct answers for any mistakes." }
    ],
    useCases: [
      "Daily arithmetic practice for students building mental math fluency",
      "Generating quick quiz material for classroom warm-up activities",
      "Preparing for standardized tests that include math sections",
      "Keeping math skills sharp during school breaks or as an adult"
    ],
    relatedSlugs: ["multiplication-table", "percentage-calculator", "fraction-calculator"]
  },
  { slug: "essay-word-counter", name: "Essay Word Counter", description: "Count words with essay-specific features: page estimate, paragraph count, and reading time.", category: "education", icon: "📝", keywords: ["essay counter", "essay word count", "page count", "essay length"], subcategory: "language",
    longDescription: "Count words in your essay with additional metrics tailored for academic writing, including estimated page count, paragraph count, sentence count, and approximate reading time. These features help you hit assignment word count targets, estimate how long your essay will be when formatted, and manage pacing across sections.",
    faqs: [
      { question: "How does the page count estimate work?", answer: "Page count is estimated based on standard formatting: double-spaced, Times New Roman 12pt, with 1-inch margins, which gives approximately 250–275 words per page." },
      { question: "Can I count words for a specific section of my essay?", answer: "Yes. Paste only the section you want to analyze rather than the full essay to get word count metrics for that portion." },
      { question: "Does it count words differently from a standard word counter?", answer: "The core word count is the same, but the essay counter adds academic-specific metrics like paragraph count and page estimates that a general word counter doesn't include." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste your essay text into the word counter input field." },
      { name: "Step 2", text: "Review the word count, page estimate, paragraph count, and reading time." },
      { name: "Step 3", text: "Adjust your essay length based on the results to meet your assignment requirements." }
    ],
    useCases: [
      "Checking if an essay meets the required word count for an assignment",
      "Estimating how many pages a completed essay will fill when formatted",
      "Tracking word count progress while writing a long research paper",
      "Ensuring each section of a structured essay is proportionally balanced"
    ],
    relatedSlugs: ["word-counter", "readability-checker", "character-counter"]
  },
  { slug: "unit-circle", name: "Unit Circle Calculator", description: "Interactive unit circle showing sine, cosine, and tangent values.", category: "education", icon: "📐", keywords: ["unit circle", "trigonometry", "sine cosine", "trig values"], subcategory: "math",
    longDescription: "Explore the unit circle interactively and instantly look up sine, cosine, and tangent values for any angle in degrees or radians. The unit circle is the foundation of trigonometry, and this visual tool makes it easy to understand how angles relate to trig values and to verify calculations during homework or exam prep.",
    faqs: [
      { question: "What is the unit circle used for?", answer: "The unit circle defines the sine, cosine, and tangent of angles from 0° to 360°. It's fundamental to trigonometry, calculus, and understanding periodic functions." },
      { question: "Can I view values in both degrees and radians?", answer: "Yes. Toggle between degrees and radians to see how both representations correspond to the same point on the circle." },
      { question: "Does the tool show all special angle values?", answer: "Yes. Special angles (30°, 45°, 60°, 90°, and their equivalents) are highlighted with exact fraction values like √2/2 and √3/2." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Click or drag on the unit circle to select an angle, or type an angle into the input field." },
      { name: "Step 2", text: "Read the sine, cosine, and tangent values displayed for the selected angle." },
      { name: "Step 3", text: "Toggle between degrees and radians to compare representations." }
    ],
    useCases: [
      "Learning trigonometric values for all standard angles in precalculus",
      "Verifying sine and cosine values during trigonometry homework",
      "Understanding the relationship between angles and coordinates on the unit circle",
      "Studying for calculus exams that require fluency with trig functions"
    ],
    relatedSlugs: ["scientific-calculator", "angle-converter", "quadratic-solver"]
  },
  { slug: "binary-calculator", name: "Binary Calculator", description: "Perform arithmetic operations on binary numbers with step-by-step display.", category: "education", icon: "💻", keywords: ["binary calculator", "binary math", "binary addition", "binary operations"], subcategory: "math",
    longDescription: "Perform addition, subtraction, multiplication, and division on binary numbers with a step-by-step breakdown of each operation. Understanding binary arithmetic is essential for computer science, digital electronics, and programming, and this calculator makes the process transparent and easy to follow.",
    faqs: [
      { question: "What operations does the binary calculator support?", answer: "The calculator supports binary addition, subtraction, multiplication, and division, as well as conversion between binary, decimal, hexadecimal, and octal." },
      { question: "Does it show the working steps?", answer: "Yes. Each calculation includes a step-by-step breakdown showing how the binary operation is performed, making it ideal for learning." },
      { question: "Can I convert decimal numbers to binary?", answer: "Yes. Enter a decimal number and the tool will convert it to binary, showing the division-by-two conversion steps." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter the two binary numbers you want to calculate with." },
      { name: "Step 2", text: "Select the operation: addition, subtraction, multiplication, or division." },
      { name: "Step 3", text: "View the binary result and the step-by-step working to understand how it was computed." }
    ],
    useCases: [
      "Practicing binary arithmetic for computer science coursework",
      "Understanding binary number systems for programming and digital logic",
      "Checking binary calculations and conversions during exam study",
      "Teaching binary math to students learning about computer architecture"
    ],
    relatedSlugs: ["number-base-converter", "text-to-binary", "hex-to-text"]
  },
  { slug: "significant-figures", name: "Significant Figures Calculator", description: "Round numbers to the correct number of significant figures.", category: "education", icon: "🔬", keywords: ["significant figures", "sig figs", "rounding", "precision"], subcategory: "science",
    longDescription: "Round any number to the correct number of significant figures with a clear explanation of which digits are significant and why. Significant figures are critical in science and engineering for expressing measurement precision, and this calculator helps students master the rules and apply them accurately in lab reports and problem sets.",
    faqs: [
      { question: "What are significant figures?", answer: "Significant figures are the meaningful digits in a number that indicate measurement precision. They include all non-zero digits, zeros between non-zero digits, and trailing zeros after a decimal point." },
      { question: "Why do significant figures matter in science?", answer: "They communicate the precision of a measurement. Reporting too many or too few sig figs misrepresents the accuracy of your data and can affect calculations in chemistry and physics." },
      { question: "How do significant figures work in calculations?", answer: "For multiplication and division, the result should have the same sig figs as the input with the fewest. For addition and subtraction, match the decimal places of the least precise number." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter the number you want to round into the calculator." },
      { name: "Step 2", text: "Specify the number of significant figures you need in the result." },
      { name: "Step 3", text: "View the rounded number and the explanation of which digits are significant." }
    ],
    useCases: [
      "Rounding lab results to the correct precision for chemistry reports",
      "Checking significant figure rules in physics problem sets",
      "Teaching sig fig concepts to students in science and engineering classes",
      "Verifying measurement precision in data analysis and research"
    ],
    relatedSlugs: ["scientific-calculator", "percentage-calculator", "average-calculator"]
  },
  { slug: "molecular-weight", name: "Molecular Weight Calculator", description: "Calculate the molecular weight of chemical compounds from their formula.", category: "education", icon: "⚗️", keywords: ["molecular weight", "molar mass", "chemical formula", "molecular mass"], subcategory: "science",
    longDescription: "Calculate the molecular weight (molar mass) of any chemical compound by entering its formula. The calculator breaks down the contribution of each element and sums them to give the total molecular mass in grams per mole — an essential step in stoichiometry, solution preparation, and quantitative chemistry.",
    faqs: [
      { question: "How do I enter a chemical formula?", answer: "Type the formula using standard chemical notation, such as H2O for water, NaCl for salt, or C6H12O6 for glucose. The calculator interprets subscript numbers automatically." },
      { question: "What units does the result use?", answer: "Molecular weight is expressed in grams per mole (g/mol), which is the standard unit used in chemistry for molar mass calculations." },
      { question: "Can it handle complex organic compounds?", answer: "Yes. The calculator handles any formula made up of elements on the periodic table, including large organic molecules with complex formulas." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Type the chemical formula of the compound (e.g., H2O, C6H12O6) into the input field." },
      { name: "Step 2", text: "Click Calculate to see the molecular weight broken down by element." },
      { name: "Step 3", text: "Use the total molar mass in your stoichiometry or lab preparation calculations." }
    ],
    useCases: [
      "Calculating molar mass for stoichiometry problems in chemistry class",
      "Preparing solutions with precise concentrations in laboratory settings",
      "Verifying molecular weight values when studying organic or inorganic compounds",
      "Supporting research in biochemistry and materials science"
    ],
    relatedSlugs: ["periodic-table", "scientific-calculator", "unit-converter"]
  },
  { slug: "study-timer", name: "Study Timer", description: "Track study sessions with break reminders and progress logging.", category: "education", icon: "📚", keywords: ["study timer", "study session", "focus timer", "study tracker"], subcategory: "language",
    longDescription: "Track your study sessions with a dedicated timer that logs how long you've studied each subject, reminds you to take breaks, and helps you build consistent study habits. Unlike a plain stopwatch, the study timer is designed around productive study techniques like Pomodoro intervals and session journaling.",
    faqs: [
      { question: "How is the study timer different from a regular timer?", answer: "The study timer includes session logging, subject tracking, and break reminders tailored to study routines, rather than just counting up or down." },
      { question: "Can I track multiple subjects in one session?", answer: "Yes. You can log time under different subject labels so you can see exactly how long you spent on each topic during a study session." },
      { question: "Does it support the Pomodoro technique?", answer: "Yes. You can configure the timer for Pomodoro-style intervals (typically 25 minutes of study followed by a 5-minute break) with automatic reminders." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter the subject you're studying and set your study session duration or interval." },
      { name: "Step 2", text: "Start the timer and focus on your work until the break reminder sounds." },
      { name: "Step 3", text: "Log each completed session to track your total study time across subjects." }
    ],
    useCases: [
      "Staying focused during exam revision with timed study intervals",
      "Tracking total study hours across multiple subjects over a week",
      "Building a consistent daily study habit with session logging",
      "Using Pomodoro technique to maintain concentration and avoid burnout"
    ],
    relatedSlugs: ["pomodoro-timer", "stopwatch", "flashcard-maker"]
  },
  { slug: "number-line-generator", name: "Number Line Generator", description: "Generate visual number lines for math education and practice.", category: "education", icon: "📏", keywords: ["number line", "number line generator", "math visual", "number line maker"], subcategory: "math",
    longDescription: "Generate clear, printable number lines for math education across a custom range with adjustable intervals. Visual number lines help students understand number relationships, integer placement, fraction positions, and arithmetic operations. Customize the start, end, and interval to create the perfect number line for any lesson or practice activity.",
    faqs: [
      { question: "What range of numbers can I create a number line for?", answer: "You can generate number lines for any numeric range, including negative numbers, decimals, and fractions. Common ranges like -10 to 10 or 0 to 100 are preset for convenience." },
      { question: "Can I print the generated number line?", answer: "Yes. The number line is rendered cleanly for direct browser printing, making it easy to include in worksheets and classroom handouts." },
      { question: "Can I mark specific points on the number line?", answer: "Yes. Enter a list of values to highlight specific points on the number line, useful for showing answers, problem solutions, or data points." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your desired start and end values to define the number line range." },
      { name: "Step 2", text: "Set the interval between tick marks (e.g., 1, 2, 5, or 0.5 for decimal lines)." },
      { name: "Step 3", text: "Optionally mark specific values on the line, then print or download the result." }
    ],
    useCases: [
      "Creating number line worksheets for elementary and middle school math classes",
      "Visualizing integer and fraction positions for students learning number placement",
      "Illustrating addition and subtraction jumps on a number line",
      "Producing negative number lines for lessons on signed integers and absolute value"
    ],
    relatedSlugs: ["multiplication-table", "math-quiz-generator", "fraction-calculator"]
  },
  { slug: "equation-solver", name: "Equation Solver", description: "Solve linear and quadratic equations with step-by-step solutions.", category: "education", icon: "🔢", keywords: ["equation solver", "solve linear equation", "algebra solver", "math equation"], subcategory: "math",
    longDescription: "Solve linear and quadratic equations step by step, with a clear explanation of every algebraic operation applied to reach the solution. Whether you're checking homework, learning algebra, or verifying a calculation, the equation solver shows every step so you can understand the process — not just the answer.",
    faqs: [
      { question: "What types of equations can it solve?", answer: "The solver handles single-variable linear equations (e.g., 3x + 5 = 14) and quadratic equations (e.g., x² - 5x + 6 = 0), returning all real solutions." },
      { question: "Does it show step-by-step working?", answer: "Yes. Each algebraic step is shown with a brief explanation so students can follow the reasoning and learn the method alongside getting the answer." },
      { question: "Can it solve equations with fractions or decimals?", answer: "Yes. The solver handles equations with fractional and decimal coefficients, simplifying fractions as part of the working." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Type your equation into the input field using standard notation (e.g., 2x + 4 = 10 or x^2 - 3x + 2 = 0)." },
      { name: "Step 2", text: "Click Solve to see the step-by-step solution process." },
      { name: "Step 3", text: "Study the steps to understand the algebra, then verify the answer by substituting it back into the equation." }
    ],
    useCases: [
      "Checking algebra homework answers and understanding the correct working",
      "Learning how to solve linear and quadratic equations as a student",
      "Quickly solving equations encountered in physics or chemistry problem sets",
      "Teachers verifying equation solutions and generating step-by-step examples"
    ],
    relatedSlugs: ["scientific-calculator", "quadratic-solver", "fraction-calculator"]
  },
  { slug: "set-operations", name: "Set Operations Calculator", description: "Calculate union, intersection, and difference of two sets.", category: "education", icon: "🔵", keywords: ["set operations", "set union", "set intersection", "set difference", "venn diagram"], subcategory: "math",
    longDescription: "Perform fundamental set theory operations — union, intersection, difference, and complement — on any two sets of numbers or values. The set operations calculator shows the result of each operation with a visual Venn diagram, making abstract set theory concepts concrete and easy to understand for students and educators.",
    faqs: [
      { question: "What set operations does the calculator support?", answer: "The calculator supports Union (A ∪ B), Intersection (A ∩ B), Difference (A − B and B − A), Symmetric Difference (A △ B), and displays the Venn diagram for each result." },
      { question: "Can I use non-numeric values in my sets?", answer: "Yes. Sets can contain any space-separated values including letters, words, or numbers. The tool treats each space-separated token as a set element." },
      { question: "What is a set in mathematics?", answer: "A set is a collection of distinct, unordered elements. Set theory is foundational to mathematics, logic, computer science, and database operations." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter Set A elements separated by spaces or commas (e.g., 1 2 3 4 5)." },
      { name: "Step 2", text: "Enter Set B elements in the same way." },
      { name: "Step 3", text: "View the results of union, intersection, difference, and symmetric difference operations, along with the Venn diagram visualization." }
    ],
    useCases: [
      "Learning set theory concepts in discrete mathematics or computer science courses",
      "Verifying set operation results during homework and problem sets",
      "Understanding SQL JOIN operations by mapping them to set theory",
      "Teaching Venn diagrams and set relationships in middle and high school math"
    ],
    relatedSlugs: ["binary-calculator", "truth-table-generator", "scientific-calculator"]
  },
  { slug: "truth-table-generator", name: "Truth Table Generator", description: "Generate truth tables for logical expressions and boolean operations.", category: "education", icon: "✅", keywords: ["truth table", "boolean logic", "logic gates", "propositional logic"], subcategory: "math",
    longDescription: "Generate complete truth tables for any boolean or propositional logic expression. Enter expressions using AND, OR, NOT, XOR, NAND, NOR, and XNOR operators and instantly see the truth value for every possible combination of inputs. Essential for computer science, digital logic design, and discrete mathematics courses.",
    faqs: [
      { question: "What logic operators does the generator support?", answer: "The generator supports AND (∧), OR (∨), NOT (¬), XOR (⊕), NAND, NOR, XNOR, and implication (→), covering all standard propositional logic operators." },
      { question: "How many variables can I use in an expression?", answer: "You can use 2, 3, or 4 variables in a single expression. With 4 variables, the truth table has 16 rows (2⁴ combinations)." },
      { question: "Can I use this for digital logic circuit design?", answer: "Yes. Truth tables are fundamental to digital logic design. You can use the output to identify boolean simplifications or implement logic circuits." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter a boolean expression using variables (p, q, r) and operators (AND, OR, NOT, XOR, etc.)." },
      { name: "Step 2", text: "Click Generate to produce the complete truth table showing all possible input combinations." },
      { name: "Step 3", text: "Analyze the output column to determine if the expression is a tautology, contradiction, or contingency." }
    ],
    useCases: [
      "Computer science students learning propositional logic and boolean algebra",
      "Digital electronics students designing and verifying logic gate circuits",
      "Discrete mathematics courses covering logical equivalences and proofs",
      "Programmers verifying complex boolean conditions in code"
    ],
    relatedSlugs: ["binary-calculator", "set-operations", "number-base-converter"]
  },
  { slug: "probability-distribution", name: "Probability Distribution Calculator", description: "Calculate normal and binomial probability distributions.", category: "education", icon: "📊", keywords: ["probability distribution", "normal distribution", "binomial distribution", "statistics calculator"], subcategory: "math",
    longDescription: "Calculate probabilities for normal and binomial distributions with step-by-step results and visual probability curves. Enter your distribution parameters and instantly compute probability values, cumulative probabilities, and find Z-scores for normal distributions. Essential for statistics courses, data science, and any field that involves probability calculations.",
    faqs: [
      { question: "What distributions does the calculator support?", answer: "The calculator handles Normal distribution (with Z-score computation and standard deviation), Binomial distribution (n trials, p probability), and Poisson distribution calculations." },
      { question: "Can I calculate P(X < a), P(X > a), and P(a < X < b)?", answer: "Yes. For normal distributions, you can calculate left-tail, right-tail, and two-tail probabilities for any value range." },
      { question: "What is a Z-score?", answer: "A Z-score measures how many standard deviations a value is from the mean. It is calculated as Z = (X - μ) / σ and used to find probabilities in a standard normal distribution table." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Select the distribution type (normal, binomial, or Poisson) and enter the required parameters." },
      { name: "Step 2", text: "Enter the value or range you want to compute the probability for." },
      { name: "Step 3", text: "View the probability result, Z-score (for normal), and a visual probability curve." }
    ],
    useCases: [
      "Statistics students calculating normal distribution probabilities for coursework",
      "Data scientists verifying probability calculations in analysis workflows",
      "Researchers computing confidence intervals and hypothesis testing p-values",
      "Quality control engineers applying statistical distributions to process variation"
    ],
    relatedSlugs: ["statistics-visualizer", "significant-figures", "scientific-calculator"]
  },
  { slug: "statistics-visualizer", name: "Statistics Visualizer", description: "Enter data and visualize statistics with mean, median, mode, and charts.", category: "education", icon: "📈", keywords: ["statistics calculator", "mean median mode", "data visualizer", "descriptive statistics"], subcategory: "math",
    longDescription: "Enter any data set and instantly compute all key descriptive statistics — mean, median, mode, range, standard deviation, variance, and quartiles — along with a simple bar chart or histogram visualization. Whether you're a student learning statistics or an analyst exploring a data set, this tool makes quick statistical work effortless.",
    faqs: [
      { question: "What statistics are calculated?", answer: "The tool calculates mean, median, mode, range, variance, standard deviation, standard error, and the five-number summary (minimum, Q1, Q2, Q3, maximum) for your data set." },
      { question: "How many data points can I enter?", answer: "The calculator handles data sets of any size. Larger data sets may take a moment to process but there is no hard limit." },
      { question: "What types of charts are available?", answer: "The tool generates bar charts, histograms, and dot plots. You can choose the most appropriate visualization for your data distribution." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your data values separated by commas, spaces, or on separate lines." },
      { name: "Step 2", text: "Click Analyze to compute all descriptive statistics for your data set." },
      { name: "Step 3", text: "Review the statistics table and choose a chart type to visualize the data distribution." }
    ],
    useCases: [
      "Statistics students computing descriptive statistics for homework data sets",
      "Researchers quickly summarizing sample data before formal analysis",
      "Teachers generating statistics and charts from classroom data for demonstrations",
      "Anyone who needs to understand the distribution and central tendency of a data set"
    ],
    relatedSlugs: ["probability-distribution", "significant-figures", "average-calculator"]
  },
  { slug: "typing-speed-test", name: "Typing Speed Test", description: "Test your typing speed and accuracy with WPM and error tracking.", category: "education", icon: "⌨️", keywords: ["typing test", "typing speed", "wpm test", "typing practice"], subcategory: "language",
    longDescription: "Measure your typing speed in words per minute (WPM) and accuracy percentage with a real-time typing test. Track errors, identify problem keys, and monitor your improvement over multiple attempts. Whether you're preparing for a job that requires typing proficiency or just want to type faster, regular testing helps you progress measurably.",
    faqs: [
      { question: "What is a good typing speed?", answer: "The average typist reaches 40–60 WPM. Professional typists and office workers often type 65–90 WPM, while top-speed typists can exceed 100 WPM." },
      { question: "Does accuracy affect my WPM score?", answer: "Yes. Most tests calculate net WPM, which subtracts a penalty for errors, so accuracy is just as important as raw speed." },
      { question: "How often should I practice to improve my typing speed?", answer: "Consistent daily practice of 15–20 minutes is more effective than occasional long sessions. Most people see measurable improvement within a few weeks." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Click Start to begin the typing test and a passage will appear on screen." },
      { name: "Step 2", text: "Type the passage as accurately and quickly as you can." },
      { name: "Step 3", text: "Review your WPM score, accuracy percentage, and error count when the test ends." }
    ],
    useCases: [
      "Preparing for job applications that require a minimum typing speed",
      "Tracking typing improvement over time as part of a practice routine",
      "Warming up before a long writing or coding session",
      "Competing with friends or colleagues on typing speed benchmarks"
    ],
    relatedSlugs: ["reading-speed-test", "keyboard-tester", "stopwatch"]
  },
];
