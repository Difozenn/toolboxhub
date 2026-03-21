import type { Tool } from "../types";

export const mathTools: Tool[] = [
  // ── Existing (12) ──────────────────────────────────────────
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Calculate percentages, percentage change, and percentage differences.", category: "math", icon: "➗", keywords: ["percentage", "percent calculator", "percentage change"], subcategory: "calculators",
    longDescription: "Calculate percentages in multiple ways: find what percentage one number is of another, calculate percentage increase or decrease, or find the original value from a percentage. A versatile tool for everyday math, finance, and data analysis.",
    faqs: [
      { question: "How do I calculate a percentage increase?", answer: "Enter the original value and the new value, and the tool will calculate the percentage change — positive for an increase, negative for a decrease." },
      { question: "Can I find the original number from a percentage?", answer: "Yes, use the reverse percentage mode to input the percentage and the result to find the original base value." }
    ],
    howToSteps: [
      { name: "Choose calculation type", text: "Select the type of percentage calculation: percent of a number, percentage change, or reverse percentage." },
      { name: "Enter values", text: "Input the numbers for your calculation." },
      { name: "View result", text: "See the calculated percentage or value instantly." }
    ],
    useCases: ["Calculating discounts and sale prices", "Finding percentage change in revenue or metrics", "Computing tax or tip amounts", "Grading tests and calculating scores"],
    relatedSlugs: ["discount-calculator", "tip-calculator", "margin-calculator"]
  },
  { slug: "scientific-calculator", name: "Scientific Calculator", description: "A full-featured scientific calculator with advanced math functions.", category: "math", icon: "🧮", keywords: ["scientific calculator", "math calculator", "advanced calculator"], subcategory: "calculators",
    longDescription: "Perform advanced mathematical calculations with a full-featured scientific calculator. Supports trigonometric functions, logarithms, exponents, factorials, square roots, and more. Ideal for students, engineers, and anyone who needs more than basic arithmetic.",
    faqs: [
      { question: "What functions are supported?", answer: "The calculator supports sin, cos, tan, log, ln, exp, sqrt, powers, factorials, and standard arithmetic operations." },
      { question: "Can I use it for calculus or algebra?", answer: "The scientific calculator handles numerical computations. For symbolic algebra and calculus, a CAS (Computer Algebra System) tool would be needed." }
    ],
    howToSteps: [
      { name: "Enter your expression", text: "Use the keypad or type your mathematical expression directly." },
      { name: "Apply functions", text: "Select trigonometric, logarithmic, or other advanced functions as needed." },
      { name: "Calculate", text: "Press equals to compute the result." }
    ],
    useCases: ["Solving complex math problems for school or university", "Engineering and physics calculations", "Converting between degrees and radians", "Computing logarithmic or exponential values"],
    relatedSlugs: ["percentage-calculator", "average-calculator", "fraction-calculator"]
  },
  { slug: "bmi-calculator", name: "BMI Calculator", description: "Calculate your Body Mass Index and see your health category.", category: "math", icon: "⚖️", keywords: ["bmi calculator", "body mass index", "weight calculator", "health calculator"], subcategory: "calculators",
    longDescription: "Calculate your Body Mass Index (BMI) using your height and weight in metric or imperial units. See which health category your BMI falls into — underweight, normal, overweight, or obese — according to standard World Health Organization ranges.",
    faqs: [
      { question: "Is BMI an accurate measure of health?", answer: "BMI is a useful screening tool but does not account for muscle mass, bone density, or fat distribution. Always consult a healthcare professional for a full assessment." },
      { question: "Can I use feet and pounds?", answer: "Yes, the calculator supports both metric (kg and cm) and imperial (lbs and inches) units." }
    ],
    howToSteps: [
      { name: "Enter your height", text: "Input your height in centimeters or feet and inches." },
      { name: "Enter your weight", text: "Input your weight in kilograms or pounds." },
      { name: "View your BMI", text: "See your BMI value and the corresponding health category." }
    ],
    useCases: ["Checking your weight category as part of a health review", "Tracking BMI changes over time during a fitness program", "Calculating BMI for medical or insurance forms", "Educational use in health and fitness courses"],
    relatedSlugs: ["calorie-calculator", "ideal-weight-calculator", "body-fat-calculator"]
  },
  { slug: "age-calculator", name: "Age Calculator", description: "Calculate exact age in years, months, and days from a birthdate.", category: "math", icon: "🎂", keywords: ["age calculator", "birthday calculator", "date calculator", "how old am i"], subcategory: "calculators",
    longDescription: "Calculate your exact age — or the age of anything — by entering a birthdate and a target date. Get results broken down into years, months, and days for precise age calculations. Also shows how many days until the next birthday.",
    faqs: [
      { question: "Does it account for leap years?", answer: "Yes, the age calculator correctly handles leap years so February 29 birthdays are calculated accurately." },
      { question: "Can I calculate age on a specific past or future date?", answer: "Yes, you can set any target date instead of today to calculate age as of that point in time." }
    ],
    howToSteps: [
      { name: "Enter the birthdate", text: "Select or type the date of birth." },
      { name: "Set the target date", text: "Leave as today's date or change it to calculate age at a different point in time." },
      { name: "View the age", text: "See the exact age in years, months, and days." }
    ],
    useCases: ["Calculating your exact age for official forms", "Determining eligibility based on age requirements", "Finding out how old a historical figure or artifact is", "Counting days until an upcoming birthday"],
    relatedSlugs: ["date-difference", "days-until", "countdown-timer"]
  },
  { slug: "loan-calculator", name: "Loan Calculator", description: "Calculate monthly payments, total interest, and amortization schedules.", category: "math", icon: "🏦", keywords: ["loan calculator", "mortgage calculator", "emi calculator", "interest calculator"], subcategory: "calculators",
    longDescription: "Calculate monthly loan payments, total interest paid, and view a full amortization schedule for any loan. Enter the principal, interest rate, and loan term to instantly see how much you will pay each month and the total cost of borrowing.",
    faqs: [
      { question: "What types of loans can I calculate?", answer: "This calculator works for any fixed-rate loan including personal loans, mortgages, auto loans, and student loans." },
      { question: "Does it show the amortization schedule?", answer: "Yes, you can view a month-by-month breakdown showing principal and interest portions of each payment." }
    ],
    howToSteps: [
      { name: "Enter the loan amount", text: "Input the principal amount you are borrowing." },
      { name: "Enter rate and term", text: "Provide the annual interest rate and loan term in months or years." },
      { name: "View payment details", text: "See the monthly payment, total interest, and total cost of the loan." }
    ],
    useCases: ["Comparing mortgage options before buying a home", "Estimating monthly car loan payments", "Planning personal loan repayment schedules", "Understanding the total cost of student loan borrowing"],
    relatedSlugs: ["mortgage-calculator", "compound-interest", "auto-loan-calculator"]
  },
  { slug: "compound-interest", name: "Compound Interest Calculator", description: "Calculate compound interest with customizable rates and periods.", category: "math", icon: "📈", keywords: ["compound interest", "interest calculator", "investment calculator", "savings calculator"], subcategory: "calculators",
    longDescription: "Calculate how an investment or savings account grows over time with compound interest. Enter the principal, annual interest rate, compounding frequency, and investment period to see the final balance and total interest earned. Visualize the power of compounding over time.",
    faqs: [
      { question: "What compounding frequencies are supported?", answer: "The calculator supports annual, semi-annual, quarterly, monthly, weekly, and daily compounding." },
      { question: "Can I add regular contributions?", answer: "Yes, you can include monthly or annual contributions to model a savings plan or investment account." }
    ],
    howToSteps: [
      { name: "Enter your principal", text: "Input the starting amount you are investing or saving." },
      { name: "Set rate and term", text: "Enter the annual interest rate, compounding frequency, and the number of years." },
      { name: "View growth", text: "See the final balance, total interest earned, and a year-by-year growth breakdown." }
    ],
    useCases: ["Planning long-term savings and retirement funds", "Comparing different savings account rates", "Understanding the effect of compounding frequency on returns", "Modeling investment growth for financial planning"],
    relatedSlugs: ["loan-calculator", "savings-goal-calculator", "roi-calculator"]
  },
  { slug: "tip-calculator", name: "Tip Calculator", description: "Calculate tips and split bills between multiple people.", category: "math", icon: "💰", keywords: ["tip calculator", "bill splitter", "gratuity calculator", "restaurant tip"], subcategory: "calculators",
    longDescription: "Calculate the tip amount for any bill and split the total equally among multiple people. Enter the bill amount, choose your tip percentage, and set the number of people to instantly see how much each person owes including tip.",
    faqs: [
      { question: "What tip percentages are common?", answer: "10% is considered minimal, 15% is standard, 18–20% is good service, and 25% or more is excellent. The tool lets you enter any custom percentage." },
      { question: "Can I split unevenly?", answer: "This tool splits the bill equally. For unequal splits, add up each person's items and calculate tip on their subtotal separately." }
    ],
    howToSteps: [
      { name: "Enter the bill amount", text: "Type the total bill before tip." },
      { name: "Choose a tip percentage", text: "Select a standard percentage or enter a custom tip amount." },
      { name: "Set number of people", text: "Enter how many people are splitting the bill to see each person's share." }
    ],
    useCases: ["Splitting restaurant bills fairly among a group", "Calculating gratuity for service workers", "Determining how much to tip for food delivery", "Teaching children or students about percentages and tipping"],
    relatedSlugs: ["percentage-calculator", "discount-calculator", "vat-calculator"]
  },
  { slug: "discount-calculator", name: "Discount Calculator", description: "Calculate sale prices, discount amounts, and savings.", category: "math", icon: "🏷️", keywords: ["discount calculator", "sale price", "percentage off", "savings calculator"], subcategory: "calculators",
    longDescription: "Instantly calculate the sale price after a percentage discount, find the discount amount, or work out the original price before a discount was applied. Great for shopping, retail pricing, and financial calculations.",
    faqs: [
      { question: "Can I calculate the original price from a discounted price?", answer: "Yes, use the reverse discount mode: enter the final sale price and the discount percentage to find the original price." },
      { question: "Can I apply multiple discounts?", answer: "You can apply discounts sequentially by running the calculation multiple times, using the output of one as the input for the next." }
    ],
    howToSteps: [
      { name: "Enter the original price", text: "Input the full price before the discount." },
      { name: "Enter the discount", text: "Type the discount percentage or fixed amount." },
      { name: "View results", text: "See the discount amount, sale price, and total savings." }
    ],
    useCases: ["Checking the final price of sale items while shopping", "Calculating trade or wholesale discounts", "Pricing products with promotional discounts", "Verifying advertised discount amounts"],
    relatedSlugs: ["percentage-calculator", "tip-calculator", "margin-calculator"]
  },
  { slug: "average-calculator", name: "Average Calculator", description: "Calculate mean, median, mode, and range of a set of numbers.", category: "math", icon: "📊", keywords: ["average calculator", "mean calculator", "median calculator", "statistics"], subcategory: "statistics",
    longDescription: "Calculate the mean, median, mode, and range of any set of numbers. Enter a comma-separated list of values and instantly see all key statistical measures. Ideal for students, data analysts, and anyone working with numerical datasets.",
    faqs: [
      { question: "What is the difference between mean, median, and mode?", answer: "The mean is the arithmetic average of all values. The median is the middle value when sorted. The mode is the most frequently occurring value." },
      { question: "How do I enter my numbers?", answer: "Enter your numbers separated by commas, spaces, or new lines — the tool accepts all common separators." }
    ],
    howToSteps: [
      { name: "Enter your numbers", text: "Type or paste your list of numbers separated by commas or spaces." },
      { name: "Calculate", text: "Click Calculate to compute all statistical measures." },
      { name: "Review results", text: "See the mean, median, mode, range, sum, and count of your dataset." }
    ],
    useCases: ["Calculating class or exam score averages", "Finding the median house price in a dataset", "Analyzing sales or performance data", "Computing statistics for research or homework"],
    relatedSlugs: ["percentage-calculator", "scientific-calculator", "gpa-calculator"]
  },
  { slug: "roman-numeral-converter", name: "Roman Numeral Converter", description: "Convert between Roman numerals and decimal numbers.", category: "math", icon: "🏛️", keywords: ["roman numerals", "roman converter", "numeral converter", "roman to decimal"], subcategory: "calculators",
    longDescription: "Convert any decimal number to Roman numerals or translate Roman numeral strings back to decimal numbers. Supports values from 1 to 3,999 following standard Roman numeral rules. Useful for history projects, design, clock faces, and document numbering.",
    faqs: [
      { question: "What is the maximum number that can be converted?", answer: "Standard Roman numerals cover 1 to 3,999 (MMMCMXCIX). Numbers outside this range cannot be represented in classical Roman notation." },
      { question: "Does it validate Roman numeral input?", answer: "Yes, the tool checks that the Roman numeral string follows proper notation rules before converting." }
    ],
    howToSteps: [
      { name: "Choose conversion direction", text: "Select whether you want to convert from decimal to Roman or from Roman to decimal." },
      { name: "Enter your value", text: "Type the number or Roman numeral string." },
      { name: "Convert", text: "Click Convert to see the result instantly." }
    ],
    useCases: ["Translating chapter or section numbers in books", "Converting years for film credits or monuments", "Creating numbered lists in Roman numeral style", "Understanding ancient and classical numbering systems"],
    relatedSlugs: ["number-base-converter", "scientific-calculator", "random-number-generator"]
  },
  { slug: "random-number-generator", name: "Random Number Generator", description: "Generate random numbers within a custom range.", category: "math", icon: "🎲", keywords: ["random number", "rng", "number generator", "dice roller"], subcategory: "calculators",
    longDescription: "Generate one or more random numbers within a custom minimum and maximum range. Choose how many numbers to generate and whether to allow duplicates. Useful for games, statistical sampling, lottery picks, and programming tests.",
    faqs: [
      { question: "Are the numbers truly random?", answer: "The tool uses a cryptographically strong random number generator in your browser, making it suitable for most everyday and statistical uses." },
      { question: "Can I generate multiple numbers at once?", answer: "Yes, specify how many random numbers you need and whether repeats are allowed in the output." }
    ],
    howToSteps: [
      { name: "Set your range", text: "Enter the minimum and maximum values for your random number range." },
      { name: "Set quantity", text: "Choose how many numbers to generate." },
      { name: "Generate", text: "Click Generate to produce the random numbers." }
    ],
    useCases: ["Picking random lottery or raffle numbers", "Generating random samples for statistical testing", "Creating random data for software testing", "Rolling dice for games or simulations"],
    relatedSlugs: ["dice-roller", "coin-flip", "password-generator"]
  },
  { slug: "gpa-calculator", name: "GPA Calculator", description: "Calculate your Grade Point Average from your course grades.", category: "math", icon: "🎓", keywords: ["gpa calculator", "grade calculator", "grade point average", "academic grades"], subcategory: "calculators",
    longDescription: "Calculate your cumulative GPA by entering letter grades or numeric scores along with the credit hours for each course. Supports both weighted and unweighted GPA calculations on the standard 4.0 scale, and helps you determine what grades you need to reach a target GPA.",
    faqs: [
      { question: "Does it support weighted GPA?", answer: "Yes, each course is weighted by its credit hours so higher-credit courses have a proportionally greater impact on your GPA." },
      { question: "Can I find out what grade I need to hit a target GPA?", answer: "Yes, use the target GPA mode to enter your current GPA and credit hours, and the tool will calculate what grades you need this semester." }
    ],
    howToSteps: [
      { name: "Enter your courses", text: "Add each course with its grade and credit hours." },
      { name: "Calculate", text: "Click Calculate to compute your cumulative GPA." },
      { name: "Review results", text: "See your GPA on the 4.0 scale along with a per-course breakdown." }
    ],
    useCases: ["Tracking academic GPA throughout a semester", "Planning course loads to maintain a minimum GPA", "Applying for scholarships with GPA requirements", "Estimating GPA impact before dropping or adding a course"],
    relatedSlugs: ["average-calculator", "percentage-calculator", "grade-calculator"]
  },

  // ── New Math Tools ──────────────────────────────────────────
  { slug: "fraction-calculator", name: "Fraction Calculator", description: "Add, subtract, multiply, and divide fractions with step-by-step solutions.", category: "math", icon: "🔢", keywords: ["fraction calculator", "fraction math", "mixed numbers", "simplify fractions"], subcategory: "calculators",
    longDescription: "Perform arithmetic operations on fractions and mixed numbers with step-by-step solutions showing every stage of the calculation. Automatically simplifies results to the lowest terms and supports both proper fractions and mixed numbers as input.",
    faqs: [
      { question: "Does it show the steps?", answer: "Yes, the calculator displays each step of the operation including finding common denominators, multiplying numerators, and simplifying the result." },
      { question: "Can I enter mixed numbers like 2 1/2?", answer: "Yes, the tool accepts mixed numbers and automatically converts them to improper fractions before performing the calculation." }
    ],
    howToSteps: [
      { name: "Enter the first fraction", text: "Input the numerator and denominator for the first fraction, or enter a mixed number." },
      { name: "Choose the operation", text: "Select addition, subtraction, multiplication, or division." },
      { name: "Enter the second fraction and calculate", text: "Input the second fraction, click Calculate, and review the step-by-step solution." }
    ],
    useCases: ["Solving fraction homework problems with shown work", "Adding recipe ingredient amounts expressed as fractions", "Calculating ratios and proportions in construction or crafts", "Teaching fraction arithmetic with visible step-by-step breakdowns"],
    relatedSlugs: ["percentage-calculator", "scientific-calculator", "average-calculator"]
  },
  { slug: "standard-deviation", name: "Standard Deviation Calculator", description: "Calculate standard deviation, variance, and other statistical measures.", category: "math", icon: "📊", keywords: ["standard deviation", "variance", "statistics", "data analysis"], subcategory: "statistics",
    longDescription: "Calculate the population or sample standard deviation, variance, mean, and sum for any dataset. Enter a list of numbers and instantly get all core descriptive statistics. Useful for students, researchers, data analysts, and quality control professionals.",
    faqs: [
      { question: "What is the difference between population and sample standard deviation?", answer: "Population standard deviation divides by N and is used when you have data for the entire group. Sample standard deviation divides by N-1 and is used when your data is a sample from a larger population." },
      { question: "How do I enter my data?", answer: "Enter numbers separated by commas, spaces, or line breaks. The tool accepts any standard list format." }
    ],
    howToSteps: [
      { name: "Enter your dataset", text: "Type or paste your numbers separated by commas or spaces." },
      { name: "Choose population or sample", text: "Select whether your data represents the whole population or a sample." },
      { name: "Calculate", text: "Click Calculate to see standard deviation, variance, mean, and more." }
    ],
    useCases: ["Analyzing variability in test scores or survey results", "Quality control calculations in manufacturing", "Financial risk assessment and portfolio analysis", "Statistical homework and research data analysis"],
    relatedSlugs: ["average-calculator", "percentage-calculator", "scientific-calculator"]
  },
  { slug: "matrix-calculator", name: "Matrix Calculator", description: "Perform matrix operations: addition, multiplication, determinant, inverse, and transpose.", category: "math", icon: "🔢", keywords: ["matrix calculator", "matrix math", "linear algebra", "determinant"], subcategory: "calculators",
    longDescription: "Perform a full range of matrix operations including addition, subtraction, scalar multiplication, matrix multiplication, transposition, determinant calculation, and matrix inversion. Supports matrices of custom sizes for linear algebra coursework and engineering applications.",
    faqs: [
      { question: "What matrix sizes are supported?", answer: "The calculator supports matrices up to 5x5 for most operations. Determinant and inverse calculations are available for square matrices." },
      { question: "Does it show calculation steps?", answer: "Step-by-step output is available for key operations like Gaussian elimination used in finding the inverse or determinant." }
    ],
    howToSteps: [
      { name: "Define your matrices", text: "Set the dimensions and enter the values for matrix A and matrix B." },
      { name: "Choose the operation", text: "Select the operation: add, multiply, transpose, determinant, or inverse." },
      { name: "Calculate", text: "Click Calculate to see the result matrix or scalar value." }
    ],
    useCases: ["Solving systems of linear equations in algebra courses", "Engineering calculations involving transformation matrices", "Computer graphics and 3D rendering math", "Statistical calculations involving covariance matrices"],
    relatedSlugs: ["scientific-calculator", "fraction-calculator", "average-calculator"]
  },
  { slug: "quadratic-solver", name: "Quadratic Equation Solver", description: "Solve quadratic equations and show the discriminant, roots, and vertex.", category: "math", icon: "📐", keywords: ["quadratic formula", "solve equation", "roots", "parabola"], subcategory: "calculators",
    longDescription: "Solve any quadratic equation of the form ax² + bx + c = 0 using the quadratic formula. Displays the discriminant, both real and complex roots, the vertex of the parabola, and the axis of symmetry. Supports equations with real or complex solutions.",
    faqs: [
      { question: "What if the equation has no real roots?", answer: "If the discriminant is negative, the tool calculates and displays the complex (imaginary) roots in a + bi form." },
      { question: "What information is shown besides the roots?", answer: "You'll see the discriminant, both roots (x1 and x2), the vertex coordinates, and the axis of symmetry." }
    ],
    howToSteps: [
      { name: "Enter coefficients", text: "Input the values for a, b, and c in the equation ax² + bx + c = 0." },
      { name: "Solve", text: "Click Solve to apply the quadratic formula." },
      { name: "Review results", text: "See the roots, discriminant, vertex, and axis of symmetry." }
    ],
    useCases: ["Solving quadratic equations for algebra homework", "Finding the vertex of a parabola in physics problems", "Analyzing projectile motion equations", "Checking solutions for quadratic word problems"],
    relatedSlugs: ["scientific-calculator", "matrix-calculator", "fraction-calculator"]
  },
  { slug: "prime-checker", name: "Prime Number Checker", description: "Check if a number is prime and find prime factors.", category: "math", icon: "🔍", keywords: ["prime number", "prime checker", "prime factors", "factorization"], subcategory: "calculators",
    longDescription: "Determine whether any integer is a prime number and find its complete prime factorization. Also lists nearby prime numbers for reference. Useful for number theory, cryptography education, and mathematical exploration.",
    faqs: [
      { question: "How large a number can it check?", answer: "The tool can check primality for numbers up to several million using efficient trial division algorithms." },
      { question: "What does prime factorization show?", answer: "Prime factorization breaks the number down into its prime factors, showing the unique primes that multiply together to produce the original number." }
    ],
    howToSteps: [
      { name: "Enter a number", text: "Type the integer you want to check." },
      { name: "Check", text: "Click Check to determine if it is prime and find its factors." },
      { name: "Review results", text: "See whether the number is prime and view its complete prime factorization." }
    ],
    useCases: ["Checking primality for number theory homework", "Finding prime factors for GCD and LCM calculations", "Exploring prime numbers in cryptography education", "Factoring numbers for mathematical competition practice"],
    relatedSlugs: ["scientific-calculator", "random-number-generator", "gcd-lcm-calculator"]
  },
  { slug: "gcd-lcm-calculator", name: "GCD & LCM Calculator", description: "Calculate the Greatest Common Divisor and Least Common Multiple of numbers.", category: "math", icon: "🔗", keywords: ["gcd", "lcm", "greatest common divisor", "least common multiple"], subcategory: "calculators",
    longDescription: "Calculate the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two or more integers. Shows the step-by-step Euclidean algorithm for GCD and the relationship formula for LCM. Essential for fraction simplification and scheduling problems.",
    faqs: [
      { question: "Can I calculate GCD and LCM for more than two numbers?", answer: "Yes, you can enter multiple numbers and the tool will calculate the GCD and LCM of the entire set." },
      { question: "What is GCD and LCM used for?", answer: "GCD is used to simplify fractions and find common factors. LCM is used to find common denominators and solve scheduling and cyclic problems." }
    ],
    howToSteps: [
      { name: "Enter your numbers", text: "Input two or more integers separated by commas." },
      { name: "Calculate", text: "Click Calculate to find the GCD and LCM." },
      { name: "Review", text: "See the GCD and LCM along with the calculation steps." }
    ],
    useCases: ["Simplifying fractions to their lowest terms", "Finding common denominators for fraction addition", "Solving scheduling and repeating event problems", "Number theory and divisibility homework"],
    relatedSlugs: ["prime-checker", "fraction-calculator", "scientific-calculator"]
  },
  { slug: "number-to-words", name: "Number to Words", description: "Convert numbers to their written word form in English.", category: "math", icon: "🔤", keywords: ["number to words", "number spelling", "write numbers", "number converter"], subcategory: "calculators",
    longDescription: "Convert any number — including large values and decimals — into its full English word representation. Useful for writing checks, legal documents, financial reports, and any situation where numbers must be spelled out in text.",
    faqs: [
      { question: "What is the largest number it can convert?", answer: "The tool supports numbers up to the trillions and beyond, converting them to the appropriate English word form." },
      { question: "Does it handle decimals?", answer: "Yes, decimal numbers are converted with the fractional part expressed in words (e.g., 1.5 becomes 'one and five tenths')." }
    ],
    howToSteps: [
      { name: "Enter a number", text: "Type the number you want to convert to words." },
      { name: "Convert", text: "Click Convert to generate the written word form." },
      { name: "Copy the result", text: "Copy the text to use in your document or form." }
    ],
    useCases: ["Writing check amounts in words for banking", "Spelling out currency amounts in legal or financial documents", "Converting numbers for invoice or contract text", "Educational use for learning number names in English"],
    relatedSlugs: ["roman-numeral-converter", "number-base-converter", "scientific-calculator"]
  },
  { slug: "ratio-calculator", name: "Ratio Calculator", description: "Solve ratio and proportion problems with missing values.", category: "math", icon: "⚖️", keywords: ["ratio calculator", "proportion", "ratio solver", "scale factor"], subcategory: "calculators",
    longDescription: "Solve ratio and proportion problems by finding missing values, simplifying ratios, and scaling values up or down. Enter any three of four values in a proportion and the tool solves for the missing one. Useful for cooking, maps, models, finance, and everyday proportional reasoning.",
    faqs: [
      { question: "How do I solve for a missing value in a proportion?", answer: "Enter three of the four values in the A:B = C:D proportion and the tool will calculate the missing fourth value using cross-multiplication." },
      { question: "Can I simplify a ratio?", answer: "Yes, enter any ratio and the tool will reduce it to its simplest form using the GCD of the two values." }
    ],
    howToSteps: [
      { name: "Enter your known values", text: "Input the known numbers in the ratio or proportion fields." },
      { name: "Identify the unknown", text: "Leave the missing value blank." },
      { name: "Solve", text: "Click Solve to calculate the missing value and see the simplified ratio." }
    ],
    useCases: ["Scaling recipe ingredients up or down for different serving sizes", "Calculating map distances using a scale ratio", "Solving proportion problems in math and science homework", "Determining scale factor for model building or architectural drawings"],
    relatedSlugs: ["percentage-calculator", "fraction-calculator", "recipe-scaler"]
  },
];
