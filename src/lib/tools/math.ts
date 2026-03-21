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
  // ── New (12) ──────────────────────────────────────────
  { slug: "area-calculator", name: "Area Calculator", description: "Calculate the area of common 2D shapes including rectangles, circles, triangles, and more.", category: "math", icon: "📐", keywords: ["area calculator", "shape area", "square area", "circle area", "triangle area"], subcategory: "geometry",
    longDescription: "Calculate the area of any common 2D shape — square, rectangle, circle, triangle, parallelogram, trapezoid, ellipse, sector, and regular polygon. Enter the required dimensions and get the area instantly with the formula used shown for reference.",
    faqs: [
      { question: "Which shapes are supported?", answer: "Square, rectangle, circle, triangle, parallelogram, trapezoid, rhombus, ellipse, sector, and regular polygon. Select the shape and the required input fields appear automatically." },
      { question: "What units can I use?", answer: "Enter any consistent unit (mm, cm, m, inches, feet) — the calculator is unit-agnostic and the result is in the square of whatever unit you input." }
    ],
    howToSteps: [
      { name: "Select a shape", text: "Choose the 2D shape you want to calculate the area for from the shape picker." },
      { name: "Enter dimensions", text: "Fill in the required measurements (e.g. base and height for a triangle)." },
      { name: "View the result", text: "The area is calculated instantly with the formula displayed for reference." }
    ],
    useCases: ["Calculating room area for flooring or painting estimates", "Solving geometry homework problems", "Determining plot area for landscaping or construction", "Computing surface areas for material estimation"],
    relatedSlugs: ["volume-calculator", "triangle-calculator", "circle-calculator"]
  },
  { slug: "volume-calculator", name: "Volume Calculator", description: "Calculate the volume of common 3D shapes including cubes, spheres, and cylinders.", category: "math", icon: "📦", keywords: ["volume calculator", "3d shape volume", "sphere volume", "cylinder volume", "cube volume"], subcategory: "geometry",
    longDescription: "Calculate the volume of common three-dimensional shapes — cube, rectangular prism (cuboid), sphere, cylinder, cone, pyramid, ellipsoid, and torus. Select the shape, enter the dimensions, and instantly get the volume with the formula displayed.",
    faqs: [
      { question: "Which 3D shapes are supported?", answer: "Cube, rectangular prism, sphere, cylinder, cone, triangular prism, square pyramid, ellipsoid, and torus are all supported." },
      { question: "Can I convert the volume to different units?", answer: "Yes — the unit converter lets you convert the result between cubic millimetres, cubic centimetres, cubic metres, litres, millilitres, cubic inches, cubic feet, and gallons." }
    ],
    howToSteps: [
      { name: "Select a shape", text: "Choose the 3D shape from the shape selector." },
      { name: "Enter dimensions", text: "Input the required measurements such as radius, height, or edge length." },
      { name: "Read the volume", text: "The calculated volume appears with the formula and unit conversion options." }
    ],
    useCases: ["Calculating tank or container capacity", "Estimating concrete or fill material volumes for construction", "Solving physics and chemistry homework problems", "Calculating shipping volume and package dimensions"],
    relatedSlugs: ["area-calculator", "pythagorean-calculator", "unit-converter"]
  },
  { slug: "pythagorean-calculator", name: "Pythagorean Theorem Calculator", description: "Solve for any side of a right triangle using the Pythagorean theorem.", category: "math", icon: "📐", keywords: ["pythagorean theorem", "right triangle", "hypotenuse calculator", "triangle sides"], subcategory: "geometry",
    longDescription: "Solve the Pythagorean theorem (a² + b² = c²) for any unknown side of a right triangle. Enter any two sides to instantly calculate the third. Also displays the triangle's angles, perimeter, and area. Perfect for geometry homework, construction projects, and engineering calculations.",
    faqs: [
      { question: "Which sides can I solve for?", answer: "Enter any two known sides (a, b, or c — the hypotenuse) and the tool calculates the missing third side using the theorem a² + b² = c²." },
      { question: "Does it also calculate the angles?", answer: "Yes — once all three sides are known, the tool uses inverse trigonometric functions to calculate all three angles in both degrees and radians." }
    ],
    howToSteps: [
      { name: "Enter two sides", text: "Input the values for any two sides of the right triangle — label them as legs (a, b) or hypotenuse (c)." },
      { name: "Calculate", text: "Click Calculate to find the missing side, angles, perimeter, and area." },
      { name: "Review results", text: "View all three sides, angles in degrees, perimeter, and triangle area." }
    ],
    useCases: ["Solving right-triangle geometry homework", "Calculating diagonal distances in construction and carpentry", "Determining ramp or roof slope dimensions", "Computing distances in coordinate geometry"],
    relatedSlugs: ["triangle-calculator", "area-calculator", "angle-converter"]
  },
  { slug: "permutation-calculator", name: "Permutation Calculator", description: "Calculate the number of permutations P(n,r) for ordered arrangements.", category: "math", icon: "🔢", keywords: ["permutation", "P(n r)", "ordered arrangement", "combinatorics"], subcategory: "combinatorics",
    longDescription: "Calculate the number of permutations P(n, r) — the number of ways to arrange r items chosen from a set of n items where order matters. Enter n (total items) and r (items to arrange) and get the result with step-by-step factorial calculation shown.",
    faqs: [
      { question: "What is a permutation?", answer: "A permutation is an ordered arrangement of items. P(n, r) = n! / (n-r)! counts the number of ways to choose and arrange r items from n total items where the order matters (e.g. 1st, 2nd, 3rd place in a race)." },
      { question: "What is the difference between permutations and combinations?", answer: "In permutations, order matters (ABC ≠ BAC). In combinations, order does not matter (ABC = BAC). Use the Combination Calculator when order is irrelevant." }
    ],
    howToSteps: [
      { name: "Enter n and r", text: "Input the total number of items (n) and how many you want to arrange (r)." },
      { name: "Calculate", text: "Click Calculate to get P(n, r) with the factorial formula shown step by step." },
      { name: "Use the result", text: "Apply the permutation count to probability and combinatorics problems." }
    ],
    useCases: ["Counting possible race finishing orders", "Calculating password combination counts", "Solving combinatorics exam problems", "Analysing arrangement possibilities in scheduling"],
    relatedSlugs: ["combination-calculator", "probability-calculator", "factorial-calculator"]
  },
  { slug: "combination-calculator", name: "Combination Calculator", description: "Calculate the number of combinations C(n,r) for unordered selections.", category: "math", icon: "🎲", keywords: ["combination", "C(n r)", "choose", "binomial coefficient", "combinatorics"], subcategory: "combinatorics",
    longDescription: "Calculate the binomial coefficient C(n, r) — the number of ways to choose r items from n items where order does not matter. Also written as 'n choose r' or nCr. Enter n and r to get the result with the full factorial formula expanded step by step.",
    faqs: [
      { question: "What is a combination?", answer: "A combination C(n, r) = n! / (r! × (n-r)!) counts selections where order is irrelevant — e.g. choosing 3 students from a class of 30. The group {A,B,C} is the same as {B,A,C}." },
      { question: "Can I calculate large values of n?", answer: "Yes — the calculator handles large factorials using an optimised algorithm to avoid overflow, supporting values of n up to several thousand." }
    ],
    howToSteps: [
      { name: "Enter n and r", text: "Input the total pool size (n) and the number of items to select (r)." },
      { name: "Calculate", text: "Click Calculate to get C(n, r) with the formula and step-by-step calculation." },
      { name: "Use the result", text: "Apply the combination count to lottery odds, probability, or selection problems." }
    ],
    useCases: ["Calculating lottery odds and prize probabilities", "Counting ways to select a team or committee", "Solving statistics and probability homework", "Analysing possible poker hand combinations"],
    relatedSlugs: ["permutation-calculator", "probability-calculator", "factorial-calculator"]
  },
  { slug: "logarithm-calculator", name: "Logarithm Calculator", description: "Calculate logarithms with any base including natural log and log base 10.", category: "math", icon: "📉", keywords: ["logarithm", "log calculator", "natural log", "log base 10", "ln"], subcategory: "algebra",
    longDescription: "Calculate logarithms for any base — common log (base 10), natural log (base e, ln), binary log (base 2), and any custom base. Enter the number and base to see the result, along with the inverse (antilogarithm) and the change-of-base formula breakdown.",
    faqs: [
      { question: "What is the difference between log and ln?", answer: "log (or log₁₀) is the common logarithm with base 10. ln is the natural logarithm with base e (≈2.71828). log₂ is the binary logarithm used in computing. All are related by the change-of-base formula: logₙ(x) = ln(x)/ln(n)." },
      { question: "Can I calculate antilogarithms?", answer: "Yes — toggle to Antilog mode and enter a logarithmic value to calculate the original number (10^x for base 10, e^x for natural log)." }
    ],
    howToSteps: [
      { name: "Enter the number", text: "Type the value you want to find the logarithm of (must be positive)." },
      { name: "Choose the base", text: "Select log₁₀, ln (natural log), log₂, or enter a custom base." },
      { name: "Read the result", text: "The logarithm is displayed with the formula and optional antilog result." }
    ],
    useCases: ["Solving exponential and logarithmic equations in algebra", "Calculating pH values and decibel levels", "Computing information entropy in bits (log₂)", "Understanding exponential growth and decay problems"],
    relatedSlugs: ["exponent-calculator", "scientific-calculator", "percentage-calculator"]
  },
  { slug: "exponent-calculator", name: "Exponent Calculator", description: "Calculate powers and exponents including fractional and negative exponents.", category: "math", icon: "⬆️", keywords: ["exponent", "power calculator", "base exponent", "x to the power of n"], subcategory: "algebra",
    longDescription: "Calculate any number raised to any power — including negative exponents, fractional exponents (roots), and scientific notation. Enter the base and exponent to get the result with step-by-step breakdown. Handles very large and very small numbers by displaying results in scientific notation.",
    faqs: [
      { question: "How do fractional exponents work?", answer: "A fractional exponent like x^(1/2) equals the square root of x. More generally, x^(m/n) equals the nth root of x raised to the m power. Enter 0.5 as the exponent to calculate square roots, 0.333 for cube roots, etc." },
      { question: "What about negative exponents?", answer: "A negative exponent x^(-n) equals 1/(x^n). For example, 2^(-3) = 1/8 = 0.125. The calculator handles negative exponents and displays the reciprocal form." }
    ],
    howToSteps: [
      { name: "Enter the base", text: "Input the number you want to raise to a power." },
      { name: "Enter the exponent", text: "Type the power — whole number, negative, or fractional." },
      { name: "Calculate", text: "Click Calculate to see the result, the formula, and scientific notation if applicable." }
    ],
    useCases: ["Solving algebra problems with powers", "Computing compound interest with fractional exponents", "Calculating scientific measurements in exponential notation", "Finding square roots, cube roots, and nth roots"],
    relatedSlugs: ["logarithm-calculator", "scientific-calculator", "fraction-calculator"]
  },
  { slug: "fibonacci-generator", name: "Fibonacci Sequence Generator", description: "Generate Fibonacci sequences and find specific Fibonacci numbers.", category: "math", icon: "🐚", keywords: ["fibonacci", "fibonacci sequence", "fibonacci number", "golden ratio"], subcategory: "sequences",
    longDescription: "Generate Fibonacci sequences up to any length, find the nth Fibonacci number, and explore properties of the sequence including the golden ratio (φ ≈ 1.618). View the sequence in table form, see the ratio between consecutive terms approaching φ, and calculate any single Fibonacci number by position.",
    faqs: [
      { question: "What is the Fibonacci sequence?", answer: "The Fibonacci sequence starts 0, 1, 1, 2, 3, 5, 8, 13, 21... where each number is the sum of the two preceding ones. It appears frequently in nature, art, and mathematics." },
      { question: "What is the connection to the golden ratio?", answer: "The ratio of consecutive Fibonacci numbers (F(n+1)/F(n)) approaches the golden ratio φ ≈ 1.6180339887 as n increases. The tool displays this ratio for each pair of consecutive terms." }
    ],
    howToSteps: [
      { name: "Choose output mode", text: "Select whether to generate a sequence up to N terms, or find the value at a specific position." },
      { name: "Enter the count or position", text: "Type the number of terms to generate or the position (index) of the Fibonacci number you want." },
      { name: "View the results", text: "The sequence or single value is displayed along with the golden ratio approximations." }
    ],
    useCases: ["Generating Fibonacci sequences for math coursework", "Exploring the golden ratio in art and design", "Producing Fibonacci numbers for algorithm testing", "Teaching recursive sequences and mathematical patterns"],
    relatedSlugs: ["exponent-calculator", "prime-checker", "percentage-calculator"]
  },
  { slug: "triangle-calculator", name: "Triangle Calculator", description: "Solve any triangle given sides and angles using the law of sines and cosines.", category: "math", icon: "📐", keywords: ["triangle calculator", "law of sines", "law of cosines", "triangle solver", "SSS SAS"], subcategory: "geometry",
    longDescription: "Solve any triangle given any combination of sides and angles (SSS, SAS, ASA, AAS, SSA). The calculator applies the law of sines and law of cosines to find all missing sides, angles, area, and perimeter. Works for right, acute, and obtuse triangles.",
    faqs: [
      { question: "What input combinations are supported?", answer: "All standard triangle cases are supported: SSS (three sides), SAS (two sides, included angle), ASA (two angles, included side), AAS (two angles, non-included side), and SSA (two sides, non-included angle — the ambiguous case)." },
      { question: "How does it handle the ambiguous SSA case?", answer: "When the SSA configuration could produce zero, one, or two valid triangles, the calculator detects this and shows all valid solutions with an explanation." }
    ],
    howToSteps: [
      { name: "Enter known values", text: "Input the sides and angles you know. Leave the unknowns blank." },
      { name: "Solve the triangle", text: "Click Solve to calculate all missing values using the appropriate trigonometric laws." },
      { name: "Review full results", text: "See all sides, all angles, perimeter, area, and the type of triangle." }
    ],
    useCases: ["Solving trigonometry homework and exam problems", "Calculating structural dimensions in engineering and construction", "Navigation and surveying calculations", "Determining distances and bearings from partial measurements"],
    relatedSlugs: ["pythagorean-calculator", "area-calculator", "angle-converter"]
  },
  { slug: "circle-calculator", name: "Circle Calculator", description: "Calculate circumference, area, diameter, and radius of a circle.", category: "math", icon: "⭕", keywords: ["circle calculator", "circumference", "circle area", "radius", "diameter"], subcategory: "geometry",
    longDescription: "Calculate any property of a circle — radius, diameter, circumference, and area — given any one known value. Enter the radius, diameter, circumference, or area and instantly compute all other properties using π. Also calculates sector area and arc length for a given central angle.",
    faqs: [
      { question: "Which circle properties can I calculate?", answer: "Radius, diameter, circumference (perimeter), area, sector area, and arc length. Enter any single known value and all others are calculated automatically." },
      { question: "Can I calculate the arc length for a given angle?", answer: "Yes — enter the central angle in degrees or radians along with the radius to calculate the arc length and sector area." }
    ],
    howToSteps: [
      { name: "Enter one known value", text: "Type any one measurement — radius, diameter, circumference, or area." },
      { name: "View all properties", text: "All other circle properties are calculated and displayed instantly." },
      { name: "Calculate sector values", text: "Optionally enter a central angle to compute arc length and sector area." }
    ],
    useCases: ["Calculating circumference for fencing or trim around circular areas", "Finding circle area for flooring and material estimates", "Solving circle geometry problems in maths courses", "Calculating wheel, gear, or pipe circumferences in engineering"],
    relatedSlugs: ["area-calculator", "pythagorean-calculator", "triangle-calculator"]
  },
  { slug: "probability-calculator", name: "Probability Calculator", description: "Calculate basic, compound, and conditional probability for events.", category: "math", icon: "🎲", keywords: ["probability", "probability calculator", "compound probability", "conditional probability"], subcategory: "statistics",
    longDescription: "Calculate basic event probability, complement probability, union (A or B), intersection (A and B), and conditional probability P(A|B). Supports independent and mutually exclusive events, and includes a built-in dice, coin, and card probability reference.",
    faqs: [
      { question: "What types of probability can I calculate?", answer: "Single event probability (P(A) = favourable/total), complement (P(not A)), union (P(A∪B) for independent and mutually exclusive events), intersection (P(A∩B)), and conditional probability P(A|B) = P(A∩B)/P(B)." },
      { question: "What is the difference between mutually exclusive and independent events?", answer: "Mutually exclusive events cannot both occur at the same time (P(A∩B) = 0). Independent events do not affect each other's probability (P(A∩B) = P(A) × P(B))." }
    ],
    howToSteps: [
      { name: "Choose the calculation type", text: "Select from basic probability, complement, union, intersection, or conditional probability." },
      { name: "Enter the probabilities", text: "Input the event probability values as fractions, decimals, or percentages." },
      { name: "Calculate and interpret", text: "View the result with a plain-English explanation of what the probability means." }
    ],
    useCases: ["Solving probability problems in maths and statistics courses", "Analysing risk and likelihood in decision making", "Understanding card game and dice odds", "Calculating compound event probabilities in data science"],
    relatedSlugs: ["combination-calculator", "permutation-calculator", "percentage-calculator"]
  },
  { slug: "modular-arithmetic", name: "Modular Arithmetic Calculator", description: "Perform modulo operations and explore modular arithmetic concepts.", category: "math", icon: "🔄", keywords: ["modulo", "modular arithmetic", "mod calculator", "remainder", "congruence"], subcategory: "algebra",
    longDescription: "Calculate modulo operations (a mod n), modular inverse, modular exponentiation, and check congruences. A clean, step-by-step tool for understanding modular arithmetic used in cryptography, computer science, and number theory.",
    faqs: [
      { question: "What does 'a mod n' mean?", answer: "a mod n is the remainder when a is divided by n. For example, 17 mod 5 = 2 because 17 = 3×5 + 2. In programming, this is the % operator in most languages." },
      { question: "What is the modular inverse?", answer: "The modular inverse of a modulo n is the number x such that (a × x) ≡ 1 (mod n). It exists only when a and n are coprime (GCD = 1). The calculator uses the extended Euclidean algorithm to find it." }
    ],
    howToSteps: [
      { name: "Choose the operation", text: "Select modulo, modular inverse, modular exponentiation, or congruence check." },
      { name: "Enter the values", text: "Input the operands (a, b, modulus n) for the selected operation." },
      { name: "View the result", text: "The answer is displayed with the calculation steps for learning and verification." }
    ],
    useCases: ["Solving modular arithmetic problems in maths courses", "Understanding the basis of RSA and cryptographic algorithms", "Computing hash function modulo operations", "Checking clock arithmetic and cyclic number patterns"],
    relatedSlugs: ["exponent-calculator", "permutation-calculator", "combination-calculator"]
  },
  { slug: "quadratic-equation-solver", name: "Quadratic Equation Solver", description: "Solve quadratic equations (ax² + bx + c = 0) and find roots.", category: "math", icon: "📐", keywords: ["quadratic equation", "quadratic formula", "find roots", "ax2 bx c", "solve quadratic"], subcategory: "algebra",
    longDescription: "Solve any quadratic equation in the form ax² + bx + c = 0 using the quadratic formula. Enter the coefficients a, b, and c to find both roots (real or complex), the discriminant, vertex coordinates, axis of symmetry, and whether the parabola opens up or down. Includes a visual formula breakdown.",
    faqs: [
      { question: "What is the quadratic formula?", answer: "x = (-b ± √(b²-4ac)) / 2a. It gives both solutions of any quadratic equation ax² + bx + c = 0." },
      { question: "What if the discriminant is negative?", answer: "If b²-4ac < 0, the equation has two complex (imaginary) roots. The tool displays these in a+bi format." },
      { question: "What does the discriminant tell me?", answer: "If discriminant > 0: two distinct real roots. If = 0: one repeated real root. If < 0: two complex conjugate roots." }
    ],
    howToSteps: [
      { name: "Enter coefficients", text: "Type the values for a, b, and c in your equation ax² + bx + c = 0." },
      { name: "View roots", text: "Both solutions are displayed instantly along with the discriminant and root type." },
      { name: "See properties", text: "View the vertex, axis of symmetry, and direction of the parabola." }
    ],
    useCases: ["Solving algebra homework and exam problems", "Finding projectile trajectory intercepts in physics", "Calculating break-even points in business models", "Verifying hand-calculated quadratic solutions"],
    relatedSlugs: ["equation-solver", "pythagorean-calculator", "logarithm-calculator", "exponent-calculator"]
  },
];
