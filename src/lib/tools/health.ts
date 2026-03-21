import type { Tool } from "../types";

export const healthTools: Tool[] = [
  { slug: "calorie-calculator", name: "Calorie Calculator", description: "Calculate daily calorie needs based on age, weight, height, and activity level.", category: "health", icon: "🔥", keywords: ["calorie calculator", "daily calories", "calorie needs", "calorie intake"], subcategory: "nutrition", template: "simple-calculator",
    longDescription: "Calculate your daily calorie requirements based on your age, gender, weight, height, and activity level using the Mifflin-St Jeor equation. Get recommendations for maintenance, weight loss, and weight gain goals. Understanding your calorie needs is the foundation of any nutrition plan.",
    faqs: [
      { question: "How are daily calories calculated?", answer: "We use the Mifflin-St Jeor equation, which calculates your Basal Metabolic Rate (BMR) and multiplies it by an activity factor." },
      { question: "What activity level should I choose?", answer: "Sedentary: desk job, little exercise. Lightly active: 1-3 days/week. Moderate: 3-5 days/week. Very active: 6-7 days/week. Extra active: very intense daily exercise." }
    ],
    howToSteps: [
      { name: "Enter details", text: "Input your age, gender, weight, height, and activity level." },
      { name: "View results", text: "See your BMR and total daily calorie needs." },
      { name: "Choose goal", text: "View calorie targets for maintenance, weight loss, or weight gain." }
    ],
    useCases: ["Planning a weight loss diet", "Building a meal plan", "Tracking fitness goals", "Understanding nutritional needs"],
    relatedSlugs: ["bmr-calculator", "tdee-calculator", "macro-calculator", "bmi-calculator"]
  },
  { slug: "bmr-calculator", name: "BMR Calculator", description: "Calculate your Basal Metabolic Rate — calories burned at rest.", category: "health", icon: "💤", keywords: ["bmr calculator", "basal metabolic rate", "metabolism", "resting calories"], subcategory: "body", template: "simple-calculator",
    longDescription: "Your Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest just to sustain vital functions like breathing, circulation, and cell production. This calculator uses the Mifflin-St Jeor equation — the most accurate formula available — to estimate your BMR from your age, gender, weight, and height. Knowing your BMR is the first step toward understanding your total energy needs.",
    faqs: [
      { question: "What is BMR and why does it matter?", answer: "BMR is the minimum number of calories your body needs to function at rest. It accounts for roughly 60–75% of your total daily calorie burn, making it the most important factor in any diet or fitness plan." },
      { question: "How is BMR different from TDEE?", answer: "BMR is your calorie burn at complete rest. TDEE (Total Daily Energy Expenditure) multiplies your BMR by an activity factor to account for movement throughout the day — it's the number most relevant to real-world calorie goals." },
      { question: "Does BMR change over time?", answer: "Yes. BMR naturally decreases with age as muscle mass declines. Gaining lean muscle through strength training is one of the most effective ways to increase your BMR long-term." }
    ],
    howToSteps: [
      { name: "Enter your stats", text: "Input your age, gender, weight, and height into the calculator." },
      { name: "Get your BMR", text: "The tool instantly calculates the calories your body burns at complete rest." },
      { name: "Use it to plan", text: "Feed your BMR into a TDEE or calorie calculator to set accurate daily intake targets." }
    ],
    useCases: ["Understanding your baseline metabolism before starting a diet", "Comparing BMR changes after muscle-building phases", "Setting a calorie floor to avoid under-eating", "Educating clients as a personal trainer or nutritionist"],
    relatedSlugs: ["calorie-calculator", "tdee-calculator", "bmi-calculator"]
  },
  { slug: "tdee-calculator", name: "TDEE Calculator", description: "Calculate Total Daily Energy Expenditure based on activity level.", category: "health", icon: "⚡", keywords: ["tdee calculator", "total daily energy", "energy expenditure", "daily burn"], subcategory: "body", template: "simple-calculator",
    longDescription: "Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a day, combining your resting metabolism with all physical activity. This calculator multiplies your BMR by an activity multiplier to give you a precise daily calorie target. Whether you want to lose weight, gain muscle, or maintain, TDEE is the number you need to know.",
    faqs: [
      { question: "How is TDEE calculated?", answer: "TDEE is calculated by multiplying your Basal Metabolic Rate (BMR) by an activity factor that ranges from 1.2 (sedentary) to 1.9 (extremely active). This accounts for all the calories you burn through daily movement and exercise." },
      { question: "Should I eat at my TDEE to lose weight?", answer: "To lose weight, you should eat below your TDEE — typically a 300–500 calorie daily deficit is recommended for safe, sustainable fat loss of about 0.5–1 lb per week." },
      { question: "Why does my TDEE seem too high or too low?", answer: "TDEE formulas provide estimates based on population averages. Individual metabolism varies due to genetics, hormones, and muscle mass. Use it as a starting point, track your weight for 2–3 weeks, and adjust calories based on real results." }
    ],
    howToSteps: [
      { name: "Enter your body stats", text: "Provide your age, gender, weight, and height." },
      { name: "Select your activity level", text: "Choose the option that best reflects your average weekly exercise and movement." },
      { name: "Set your calorie goal", text: "Use your TDEE result to set a deficit for fat loss, surplus for muscle gain, or match it exactly for maintenance." }
    ],
    useCases: ["Setting a precise calorie target for a cut or bulk", "Calculating how many calories to eat on rest vs. training days", "Helping clients in a coaching program find their maintenance calories", "Adjusting food intake after a change in job or exercise routine"],
    relatedSlugs: ["calorie-calculator", "bmr-calculator", "macro-calculator"]
  },
  { slug: "body-fat-calculator", name: "Body Fat Calculator", description: "Estimate body fat percentage using the US Navy method.", category: "health", icon: "📏", keywords: ["body fat calculator", "body fat percentage", "navy method", "body composition"], subcategory: "body", template: "simple-calculator",
    longDescription: "This body fat calculator uses the US Navy circumference method to estimate your body fat percentage from simple measurements — neck, waist, and hips — without expensive equipment. Body fat percentage is a far more meaningful health indicator than weight alone, as it distinguishes between lean mass and fat mass. Use this tool to track changes in body composition over time.",
    faqs: [
      { question: "How accurate is the US Navy body fat method?", answer: "The US Navy method is considered accurate to within 3–4 percentage points for most people. It's less precise than DEXA scans or hydrostatic weighing, but far more practical and accessible for everyday tracking." },
      { question: "What is a healthy body fat percentage?", answer: "For men, essential fat is 2–5%, athletic range is 6–13%, fit is 14–17%, and average is 18–24%. For women, essential fat is 10–13%, athletic is 14–20%, fit is 21–24%, and average is 25–31%. Above 25% for men and 32% for women is generally considered obese." },
      { question: "How do I measure my waist accurately?", answer: "Measure your waist at the narrowest point (usually around the navel), not where your belt sits. Stand relaxed, exhale normally, and take the measurement before it bounces back. Avoid measuring after a large meal." }
    ],
    howToSteps: [
      { name: "Take your measurements", text: "Use a flexible tape measure to record your neck circumference, waist at its narrowest, and hips (women only) at the widest point." },
      { name: "Enter your details", text: "Input your gender, height, and the three measurements into the calculator." },
      { name: "Track over time", text: "Re-measure every 4–6 weeks under consistent conditions to monitor changes in body composition." }
    ],
    useCases: ["Tracking fat loss progress without relying on the scale", "Assessing body composition before starting a fitness program", "Monitoring lean mass retention during a calorie deficit", "Setting a realistic body fat goal for athletic performance"],
    relatedSlugs: ["bmi-calculator", "ideal-weight-calculator", "calorie-calculator"]
  },
  { slug: "ideal-weight-calculator", name: "Ideal Weight Calculator", description: "Calculate your ideal weight range based on height and frame size.", category: "health", icon: "⚖️", keywords: ["ideal weight", "healthy weight", "weight range", "target weight"], subcategory: "body", template: "simple-calculator",
    longDescription: "The ideal weight calculator uses established formulas — including the Hamwi, Devine, and Robinson methods — to estimate a healthy target weight range based on your height and gender. Because no single number is right for every person, the calculator presents a range that accounts for natural variation in body frame and muscle mass. Use it as a general health guideline, not a rigid target.",
    faqs: [
      { question: "Which ideal weight formula is most accurate?", answer: "No single formula is universally best. The Devine formula is widely used in clinical settings, while the Hamwi method is popular for nutritional assessments. This calculator shows results from multiple methods so you can see the consensus range rather than relying on one figure." },
      { question: "Should I aim for the exact ideal weight number?", answer: "Not necessarily. Ideal weight formulas don't account for muscle mass, bone density, or body composition. A person with significant muscle may weigh more than the 'ideal' while being extremely healthy. Use the range as a general guide, and prioritize body fat percentage and how you feel over a specific number." },
      { question: "How is ideal weight different from BMI?", answer: "BMI uses your current weight relative to height to classify you as underweight, normal, overweight, or obese. Ideal weight calculators instead estimate what you should weigh given your height, giving you a goal to aim for rather than a classification of where you currently stand." }
    ],
    howToSteps: [
      { name: "Enter your height and gender", text: "Input your height in feet/inches or centimeters and select your gender." },
      { name: "Review the weight range", text: "The calculator returns a healthy weight range based on multiple clinical formulas." },
      { name: "Compare to your current weight", text: "See how far you are from the range and use a calorie calculator to plan a path to your goal." }
    ],
    useCases: ["Setting a realistic weight loss or gain goal", "Checking whether a target weight is medically reasonable", "Counseling patients or clients on healthy weight targets", "Comparing weight goals across different formula methods"],
    relatedSlugs: ["bmi-calculator", "body-fat-calculator", "calorie-calculator"]
  },
  { slug: "pregnancy-due-date", name: "Pregnancy Due Date Calculator", description: "Estimate your due date based on your last menstrual period.", category: "health", icon: "👶", keywords: ["due date calculator", "pregnancy calculator", "expected delivery", "gestational age"], subcategory: "medical", template: "simple-calculator",
    longDescription: "This pregnancy due date calculator uses Naegele's rule to estimate your expected delivery date by adding 280 days (40 weeks) to the first day of your last menstrual period. It also shows your current gestational age in weeks and days, and outlines important pregnancy milestones by trimester. While every pregnancy is unique, this estimate gives you a reliable planning target.",
    faqs: [
      { question: "How accurate is the due date calculation?", answer: "Only about 5% of babies are born on their exact due date. The calculation gives a 40-week estimate from your last menstrual period, but full-term deliveries typically occur anywhere from 38 to 42 weeks. Your OB or midwife may adjust the date after an early ultrasound." },
      { question: "What if I don't know my last menstrual period date?", answer: "If you're unsure of your LMP, an ultrasound in the first trimester (ideally between 8–12 weeks) can measure the embryo and provide a highly accurate gestational age and due date estimate." },
      { question: "What does gestational age mean?", answer: "Gestational age is the number of weeks since the first day of your last menstrual period — not from the date of conception. At the time of a missed period, most people are already considered 4 weeks pregnant by this measure." }
    ],
    howToSteps: [
      { name: "Enter your LMP date", text: "Input the first day of your last menstrual period into the calculator." },
      { name: "View your due date", text: "The tool calculates your estimated due date 40 weeks from your LMP." },
      { name: "Check your milestones", text: "Review your current gestational age and key trimester milestones on the results page." }
    ],
    useCases: ["Getting an initial due date estimate before your first OB appointment", "Calculating how far along you are in your pregnancy", "Planning maternity leave around an expected delivery window", "Tracking trimester progression and upcoming prenatal milestones"],
    relatedSlugs: ["age-calculator", "date-difference", "days-until"]
  },
  { slug: "water-intake-calculator", name: "Water Intake Calculator", description: "Calculate how much water you should drink daily based on weight and activity.", category: "health", icon: "💧", keywords: ["water intake", "hydration calculator", "daily water", "water needs"], subcategory: "nutrition", template: "simple-calculator",
    longDescription: "Proper hydration is essential for energy, cognitive function, digestion, and overall health, but daily water needs vary significantly based on body weight, activity level, and climate. This water intake calculator gives you a personalized daily hydration target in liters and cups, going beyond the generic '8 glasses a day' advice. Get an accurate recommendation tailored to your body and lifestyle.",
    faqs: [
      { question: "Is the '8 glasses a day' rule accurate?", answer: "Not for everyone. The 8x8 rule (eight 8-ounce glasses) is a rough guideline but doesn't account for your weight, activity level, or climate. Larger or more active individuals may need significantly more. This calculator provides a personalized estimate based on your specific details." },
      { question: "Does coffee or tea count toward daily water intake?", answer: "Yes, caffeinated beverages do contribute to hydration, contrary to popular belief. While caffeine has a mild diuretic effect, studies show that moderate coffee and tea consumption still provides a net hydration benefit. However, plain water remains the best source." },
      { question: "How do I know if I'm drinking enough water?", answer: "The simplest check is urine color. Pale yellow indicates good hydration; dark yellow or amber means you need to drink more. Other signs of dehydration include fatigue, headaches, dry mouth, and reduced concentration." }
    ],
    howToSteps: [
      { name: "Enter your weight", text: "Input your body weight in pounds or kilograms." },
      { name: "Select your activity level", text: "Choose how active you are — the more you sweat, the more water you need." },
      { name: "Get your daily target", text: "The calculator returns your recommended daily water intake in both liters and cups." }
    ],
    useCases: ["Setting a daily hydration goal for general health", "Adjusting water intake on heavy training days", "Tracking fluid needs in hot weather or during illness", "Building a hydration habit to support weight loss or energy levels"],
    relatedSlugs: ["calorie-calculator", "bmr-calculator", "macro-calculator"]
  },
  { slug: "macro-calculator", name: "Macro Calculator", description: "Calculate optimal macronutrient ratios (protein, carbs, fat) for your goals.", category: "health", icon: "🥗", keywords: ["macro calculator", "macronutrients", "protein calculator", "carb calculator"], subcategory: "nutrition", template: "simple-calculator",
    longDescription: "Macronutrients — protein, carbohydrates, and fat — are the three categories of nutrients that provide energy and drive body composition. This macro calculator determines the ideal gram targets for each macronutrient based on your TDEE and specific goal, whether that's fat loss, muscle gain, or body recomposition. Dialing in your macros gives you precise control over your diet that simple calorie counting can't match.",
    faqs: [
      { question: "What macro ratio is best for fat loss?", answer: "A common fat loss split is 40% protein, 30% carbohydrates, and 30% fat. Higher protein intake (0.8–1g per pound of body weight) preserves muscle during a calorie deficit, which is the key to sustainable fat loss. Exact ratios vary by individual preference and training style." },
      { question: "How many grams of protein do I need to build muscle?", answer: "Research consistently supports 0.7–1 gram of protein per pound of body weight (or 1.6–2.2g per kg) for muscle hypertrophy. Going above 1g/lb provides minimal additional benefit for most people. Distribute protein across 3–5 meals for optimal muscle protein synthesis." },
      { question: "Do I need to track macros, or is counting calories enough?", answer: "Calories in vs. out primarily determines weight change, but macros determine body composition. You can lose weight by just counting calories, but tracking macros ensures you're preserving muscle, fueling workouts properly, and staying satiated — which makes a big difference in long-term results." }
    ],
    howToSteps: [
      { name: "Enter your calorie target", text: "Input your TDEE or desired daily calorie intake." },
      { name: "Select your goal", text: "Choose fat loss, muscle gain, or maintenance — the calculator adjusts macro ratios accordingly." },
      { name: "Get your macro targets", text: "Receive daily gram targets for protein, carbohydrates, and fat to hit your goal." }
    ],
    useCases: ["Building a meal plan tailored to fat loss or muscle building", "Transitioning from calorie counting to flexible dieting (IIFYM)", "Balancing macros for endurance vs. strength training", "Setting nutrition targets for a competition prep or cut"],
    relatedSlugs: ["calorie-calculator", "tdee-calculator", "protein-intake-calculator"]
  },
  { slug: "heart-rate-zones", name: "Heart Rate Zone Calculator", description: "Calculate target heart rate zones for cardio training.", category: "health", icon: "❤️", keywords: ["heart rate zones", "target heart rate", "cardio zones", "training zones"], subcategory: "exercise", template: "simple-calculator",
    longDescription: "Heart rate training zones divide your cardiovascular effort into five intensity levels based on a percentage of your maximum heart rate. Training in specific zones produces different physiological adaptations — from fat burning at low intensities to VO2 max improvements at peak effort. This calculator uses your age (and optionally your resting heart rate) to define personalized zones that make every cardio session more effective.",
    faqs: [
      { question: "What are the five heart rate training zones?", answer: "Zone 1 (50–60% max HR): very light, recovery. Zone 2 (60–70%): light aerobic, fat burning. Zone 3 (70–80%): moderate aerobic, tempo. Zone 4 (80–90%): hard, lactate threshold. Zone 5 (90–100%): maximum effort, VO2 max. Most endurance coaches recommend spending 80% of training in Zones 1–2 and 20% in Zones 4–5." },
      { question: "How do I find my maximum heart rate?", answer: "The classic formula is 220 minus your age, which provides a reasonable estimate. A more accurate formula for most adults is 208 − (0.7 × age). The most accurate method is a supervised max HR test — pushing to maximum effort on a treadmill or bike under controlled conditions." },
      { question: "What zone burns the most fat?", answer: "Zone 2 (60–70% max HR) has the highest proportion of fat as fuel, which is why it's called the 'fat-burning zone.' However, higher-intensity zones burn more total calories per minute. For overall fat loss, a mix of Zone 2 base work and higher-intensity intervals is most effective." }
    ],
    howToSteps: [
      { name: "Enter your age", text: "Input your age so the calculator can estimate your maximum heart rate." },
      { name: "Add your resting heart rate (optional)", text: "For more accurate zones using the Karvonen formula, enter your resting heart rate measured first thing in the morning." },
      { name: "Train in your zones", text: "Use the resulting BPM ranges to guide intensity during your cardio workouts with a heart rate monitor." }
    ],
    useCases: ["Structuring a marathon or triathlon training plan with proper zone distribution", "Improving aerobic base fitness with consistent Zone 2 training", "Planning HIIT sessions targeting Zone 4 and Zone 5 intervals", "Monitoring recovery by ensuring easy days stay in Zone 1–2"],
    relatedSlugs: ["pace-calculator", "calorie-calculator", "bmi-calculator"]
  },
  { slug: "pace-calculator", name: "Running Pace Calculator", description: "Calculate running pace, speed, and finish time for any distance.", category: "health", icon: "🏃", keywords: ["pace calculator", "running pace", "finish time", "running speed"], subcategory: "exercise", template: "simple-calculator",
    longDescription: "The running pace calculator lets you solve for any one of three variables — pace, distance, and time — when you know the other two. Whether you're planning a 5K, half marathon, or full marathon race strategy, this tool converts between minutes per mile, minutes per kilometer, and miles/km per hour instantly. Use it to set realistic finish time goals and structure your training runs.",
    faqs: [
      { question: "What is a good running pace for beginners?", answer: "A comfortable beginner pace is typically 12–15 minutes per mile (7:30–9:20 per km). The most important thing is running at a conversational pace — you should be able to speak in short sentences without gasping. As fitness improves over weeks, pace will naturally increase." },
      { question: "How do I calculate my target marathon pace?", answer: "A common rule of thumb is to run a marathon at roughly 30–45 seconds per mile slower than your half marathon race pace. Alternatively, use your recent 5K or 10K times with a race time predictor formula (like the Riegel formula: T2 = T1 × (D2/D1)^1.06) to estimate finish times at other distances." },
      { question: "What is the difference between pace and speed?", answer: "Pace is expressed as time per unit of distance (e.g., 9:00 per mile) — lower is faster. Speed is expressed as distance per unit of time (e.g., 6.7 mph) — higher is faster. Runners typically use pace; cyclists and most other sports use speed. The two are directly convertible." }
    ],
    howToSteps: [
      { name: "Choose what you want to calculate", text: "Select whether you want to find your pace, your finish time, or the distance you covered." },
      { name: "Enter the two known values", text: "Fill in the two variables you already know — the calculator solves for the third." },
      { name: "Plan your race or training run", text: "Use the result to set mile splits, choose a treadmill speed, or plan a long run route." }
    ],
    useCases: ["Setting a target pace for an upcoming 5K or half marathon", "Converting treadmill speed (mph) to per-mile pace", "Planning easy vs. tempo run paces for a training schedule", "Estimating finish times for races at new distances based on recent performance"],
    relatedSlugs: ["heart-rate-zones", "calorie-calculator", "stopwatch"]
  },
  { slug: "bac-calculator", name: "BAC Calculator", description: "Estimate blood alcohol content based on drinks, weight, and time.", category: "health", icon: "🍺", keywords: ["bac calculator", "blood alcohol", "alcohol calculator", "drunk calculator"], subcategory: "medical", template: "simple-calculator",
    longDescription: "This BAC calculator uses the Widmark formula to estimate blood alcohol concentration based on the number of standard drinks consumed, your body weight, gender, and the time elapsed since your first drink. Because alcohol metabolism varies by individual, this tool provides an estimate for educational awareness — it should never be used to determine whether it is safe to drive. Legal impairment in most US states begins at 0.08% BAC.",
    faqs: [
      { question: "What counts as one standard drink?", answer: "In the US, one standard drink contains 14 grams of pure alcohol. That equals: 12 oz regular beer (5% ABV), 5 oz wine (12% ABV), or 1.5 oz distilled spirits (40% ABV). Many cocktails, craft beers, and large pours contain multiple standard drinks." },
      { question: "How long does it take for BAC to reach zero?", answer: "The body eliminates alcohol at a fairly constant rate of approximately 0.015% BAC per hour. At 0.08% BAC, it takes roughly 5–6 hours to return to zero. Coffee, food, cold showers, and water do not speed up this process — only time does." },
      { question: "Why does body weight affect BAC?", answer: "Alcohol distributes through body water. Larger people have more total body water, which dilutes alcohol more effectively and results in a lower BAC from the same number of drinks. Gender also matters because women generally have a lower body water percentage than men of the same weight, leading to higher BAC." }
    ],
    howToSteps: [
      { name: "Enter your details", text: "Input your weight, gender, and the number of standard drinks consumed." },
      { name: "Add the time elapsed", text: "Enter how many hours have passed since your first drink so the calculator can subtract metabolized alcohol." },
      { name: "Review the estimate", text: "See your estimated BAC and compare it to legal thresholds — for awareness only, never to justify driving." }
    ],
    useCases: ["Understanding how many drinks raise BAC to the legal limit for your weight", "Estimating when BAC returns to zero after an evening of drinking", "Educational use in health classes or alcohol awareness programs", "Making informed decisions about pacing drinks at a social event"],
    relatedSlugs: ["bmi-calculator", "calorie-calculator", "water-intake-calculator"]
  },
  { slug: "sleep-calculator", name: "Sleep Cycle Calculator", description: "Calculate optimal bedtime and wake-up times based on sleep cycles.", category: "health", icon: "😴", keywords: ["sleep calculator", "sleep cycle", "bedtime calculator", "wake up time"], subcategory: "medical", template: "simple-calculator",
    longDescription: "Sleep naturally progresses through 90-minute cycles of light, deep, and REM sleep — and waking mid-cycle is the main cause of morning grogginess. This sleep cycle calculator finds the bedtimes or wake-up times that align with complete cycle boundaries, so you rise feeling refreshed rather than groggy. It accounts for the average 14 minutes it takes to fall asleep to give you a more accurate target.",
    faqs: [
      { question: "How many sleep cycles do I need per night?", answer: "Most adults need 5–6 complete 90-minute sleep cycles, equaling 7.5–9 hours of sleep. Earlier cycles contain more deep (slow-wave) sleep, which is critical for physical recovery. Later cycles contain more REM sleep, which is essential for memory consolidation and emotional regulation." },
      { question: "Why do I feel groggy even after 8 hours of sleep?", answer: "Sleep inertia — the groggy, disoriented feeling on waking — is usually caused by waking in the middle of a deep sleep stage rather than at a natural cycle boundary. Setting your alarm to coincide with the end of a 90-minute cycle (e.g., 7.5 or 9 hours after falling asleep) can significantly reduce this feeling." },
      { question: "Does everyone have exactly 90-minute sleep cycles?", answer: "The 90-minute cycle length is an average. Individual cycles range from about 70 to 120 minutes and can lengthen slightly as the night progresses. For most people, 90 minutes is a reliable approximation. If the calculator's suggestions don't feel right, try adjusting by 15–20 minutes." }
    ],
    howToSteps: [
      { name: "Enter your target wake time or bedtime", text: "Choose whether you want to calculate the best bedtime for a given wake-up time, or the best wake-up times for a given bedtime." },
      { name: "Review the cycle-aligned times", text: "The calculator shows 4–6 options corresponding to complete sleep cycles (4.5, 6, 7.5, and 9 hours of sleep)." },
      { name: "Pick the option that fits your schedule", text: "Choose the cycle count that gives you the most sleep while still meeting your morning obligations." }
    ],
    useCases: ["Setting an alarm time that avoids waking during deep sleep", "Planning sleep around an early morning flight or meeting", "Improving morning energy levels without sleeping longer", "Building a consistent sleep schedule to regulate your circadian rhythm"],
    relatedSlugs: ["pomodoro-timer", "countdown-timer", "age-calculator"]
  },
  { slug: "ovulation-calculator", name: "Ovulation Calculator", description: "Estimate ovulation dates and fertile window from cycle data.", category: "health", icon: "📅", keywords: ["ovulation calculator", "fertility calculator", "fertile window", "cycle tracker"], subcategory: "medical", template: "simple-calculator",
    longDescription: "This ovulation calculator estimates your most fertile days by identifying the ovulation window within your menstrual cycle. Ovulation typically occurs 14 days before the start of your next period, and the fertile window spans the 5 days before ovulation plus the day of ovulation itself. By entering the start date of your last period and your average cycle length, you get a personalized fertility window to help with conception planning or cycle awareness.",
    faqs: [
      { question: "How accurate is an ovulation calculator?", answer: "Ovulation calculators provide estimates based on average cycle patterns and are most reliable for women with regular cycles. Cycle length can vary month to month due to stress, illness, or hormonal changes. For greater accuracy, combine this calculator with basal body temperature (BBT) tracking or ovulation predictor kits (OPKs)." },
      { question: "When is the best time to try to conceive?", answer: "The highest pregnancy probability occurs when intercourse happens 1–2 days before ovulation. Sperm can survive in the reproductive tract for up to 5 days, so having sex during the 3–5 days leading up to ovulation gives the best odds. The day of ovulation itself also carries high probability." },
      { question: "What if my cycle length varies each month?", answer: "If your cycle varies by more than a few days, use your shortest recent cycle length when calculating. This ensures you don't miss the fertile window by assuming a longer cycle. Tracking several months of cycle data gives a more reliable average to use as input." }
    ],
    howToSteps: [
      { name: "Enter your last period start date", text: "Input the first day of your most recent menstrual period." },
      { name: "Enter your average cycle length", text: "Provide the typical number of days between the start of one period and the start of the next (commonly 21–35 days)." },
      { name: "View your fertile window", text: "The calculator shows your estimated ovulation date and the 5-day fertile window surrounding it." }
    ],
    useCases: ["Identifying the best days to try to conceive", "Tracking cycle patterns to understand personal fertility", "Planning around a fertile window when scheduling is important", "Using cycle awareness as a natural family planning aid"],
    relatedSlugs: ["pregnancy-due-date", "date-difference", "age-calculator"]
  },
  { slug: "protein-intake-calculator", name: "Protein Intake Calculator", description: "Calculate daily protein needs based on weight and fitness goals.", category: "health", icon: "💪", keywords: ["protein calculator", "protein intake", "daily protein", "protein needs"], subcategory: "nutrition", template: "simple-calculator",
    longDescription: "Protein is the most important macronutrient for building and preserving muscle, supporting immune function, and keeping you full between meals. This protein intake calculator provides a personalized daily protein target in grams based on your body weight and goal — whether that's muscle gain, fat loss, athletic performance, or general health maintenance. It applies the latest research-backed recommendations rather than outdated RDA minimums.",
    faqs: [
      { question: "How much protein do I need to build muscle?", answer: "Research supports 0.7–1 gram of protein per pound of body weight (1.6–2.2g per kg) for maximizing muscle hypertrophy. Most studies show that going above 1g/lb provides no additional muscle-building benefit for natural athletes. Consistent daily intake spread across meals matters more than any single high-protein meal." },
      { question: "Is high protein intake safe for kidneys?", answer: "For healthy individuals with no pre-existing kidney disease, high protein intake (up to 2g/kg) is safe and well-tolerated. The concern that protein harms healthy kidneys is not supported by current evidence. If you have kidney disease or a family history of it, consult your doctor before significantly increasing protein intake." },
      { question: "What are the best protein sources?", answer: "Complete protein sources containing all essential amino acids include chicken breast, eggs, Greek yogurt, cottage cheese, fish, beef, and whey protein. Plant-based sources like tofu, tempeh, edamame, lentils, and quinoa can also meet needs, though some require combining sources to achieve a complete amino acid profile." }
    ],
    howToSteps: [
      { name: "Enter your body weight", text: "Input your current weight in pounds or kilograms." },
      { name: "Select your goal", text: "Choose muscle gain, fat loss, athletic performance, or general health to get the appropriate protein target." },
      { name: "Hit your daily target", text: "Distribute the recommended grams across 3–5 meals throughout the day for optimal muscle protein synthesis." }
    ],
    useCases: ["Planning a high-protein meal plan for muscle building", "Ensuring adequate protein intake during a fat loss phase to preserve muscle", "Calculating protein needs for endurance athletes with high training volume", "Helping older adults meet higher protein requirements to combat age-related muscle loss"],
    relatedSlugs: ["macro-calculator", "calorie-calculator", "tdee-calculator"]
  },
  { slug: "one-rep-max", name: "One Rep Max Calculator", description: "Estimate your one-rep max from the weight and reps of a set.", category: "health", icon: "🏋️", keywords: ["one rep max", "1rm calculator", "max lift", "strength calculator"], subcategory: "exercise", template: "simple-calculator",
    longDescription: "Your one-rep max (1RM) is the maximum weight you can lift for a single repetition of any exercise, and it's the gold standard for measuring absolute strength. This calculator estimates your 1RM from a submaximal set — for example, the weight you can lift for 5 or 8 reps — using the Epley and Brzycki formulas. It also generates a full percentage-based training table so you can immediately apply your 1RM to a structured strength program.",
    faqs: [
      { question: "How accurate are one-rep max calculators?", answer: "1RM estimates are most accurate when based on sets of 3–6 reps. As rep counts increase above 10, formula accuracy decreases because endurance factors play a larger role. For the best estimate, test with a weight you can lift 3–5 times with good form rather than using a very light weight for 15+ reps." },
      { question: "Should I actually test my one-rep max?", answer: "True 1RM testing carries a higher injury risk, especially for beginners. For most people, estimated 1RM from submaximal testing is both safer and sufficient for programming purposes. Reserve true 1RM testing for powerlifting meets or advanced strength assessments conducted with a spotter." },
      { question: "How do I use my 1RM to program workouts?", answer: "Most strength programs prescribe loads as a percentage of 1RM. Common benchmarks: 85–95% for heavy strength work (1–3 reps), 75–85% for hypertrophy (6–10 reps), 65–75% for volume work (10–15 reps), and below 65% for technique and endurance. Your 1RM training table makes these calculations instant." }
    ],
    howToSteps: [
      { name: "Enter the weight and reps", text: "Input the load you used and how many reps you completed in that set — ideally a set of 3–8 reps taken close to failure." },
      { name: "View your estimated 1RM", text: "The calculator returns your estimated one-rep max using the Epley and Brzycki formulas." },
      { name: "Use the percentage table", text: "Reference the full 1RM percentage breakdown to set training loads for your program (e.g., 80% for 4x6)." }
    ],
    useCases: ["Setting training loads for a powerlifting or strength program like 5/3/1 or Starting Strength", "Tracking strength progress over months without repeated max testing", "Comparing relative strength across different exercises", "Calculating accessory lift weights based on a percentage of main lift 1RM"],
    relatedSlugs: ["heart-rate-zones", "pace-calculator", "bmi-calculator"]
  },
  { slug: "waist-hip-ratio", name: "Waist-to-Hip Ratio Calculator", description: "Calculate your waist-to-hip ratio to assess health risk.", category: "health", icon: "📏", keywords: ["waist hip ratio", "whr calculator", "body shape", "health risk"], subcategory: "body", template: "simple-calculator",
    longDescription: "Waist-to-hip ratio (WHR) is a simple measurement that compares the circumference of your waist to your hips to assess the distribution of body fat. Research shows that carrying excess fat around the abdomen (apple shape) is strongly associated with higher risk of cardiovascular disease, type 2 diabetes, and metabolic syndrome — independent of overall weight or BMI. This calculator gives you your WHR and places it in the WHO health risk classification.",
    faqs: [
      { question: "What is a healthy waist-to-hip ratio?", answer: "According to the World Health Organization, a healthy WHR is below 0.90 for men and below 0.85 for women. A WHR above these thresholds is associated with substantially increased cardiovascular and metabolic health risks, regardless of BMI or total body weight." },
      { question: "Why is waist-to-hip ratio a better indicator than BMI?", answer: "BMI doesn't distinguish between fat and muscle, nor does it tell you where fat is stored. Waist-to-hip ratio directly measures abdominal fat distribution, which is the type most strongly linked to disease risk. Someone can have a normal BMI but a high WHR (called 'normal weight obesity') and still face elevated health risks." },
      { question: "How do I measure my waist and hips accurately?", answer: "Measure your waist at the narrowest point, typically just above the navel, while standing relaxed after a gentle exhale. Measure your hips at the widest point around the buttocks. Use a flexible tape measure held snug but not tight, and keep it parallel to the floor for both measurements." }
    ],
    howToSteps: [
      { name: "Take your measurements", text: "Use a flexible tape measure to record your waist circumference at the narrowest point and hip circumference at the widest point." },
      { name: "Enter your measurements and gender", text: "Input both values in inches or centimeters and select your gender for the correct WHO reference range." },
      { name: "Review your health risk category", text: "See your WHR value and whether it falls in the low, moderate, or high risk range according to WHO guidelines." }
    ],
    useCases: ["Assessing cardiovascular and metabolic health risk beyond what BMI reveals", "Tracking changes in abdominal fat distribution during a diet or exercise program", "Screening for central obesity in a clinical or wellness setting", "Comparing body shape changes even when scale weight stays the same"],
    relatedSlugs: ["bmi-calculator", "body-fat-calculator", "ideal-weight-calculator"]
  },
];
