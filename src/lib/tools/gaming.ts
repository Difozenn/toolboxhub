import type { Tool } from "../types";

export const gamingTools: Tool[] = [
  { slug: "dice-roller", name: "Dice Roller", description: "Roll virtual dice with custom sides, quantities, and modifiers.", category: "gaming", icon: "🎲", keywords: ["dice roller", "virtual dice", "d20", "dnd dice", "rpg dice"], subcategory: "random",
    longDescription: "Roll any combination of dice for tabletop RPGs, board games, or decisions. Supports standard dice (d4, d6, d8, d10, d12, d20, d100) and custom-sided dice. Roll multiple dice at once, add modifiers, and see individual results with totals. Includes dice roll history.",
    faqs: [
      { question: "How random are the dice rolls?", answer: "We use the Web Crypto API for cryptographically secure random number generation, making rolls truly random." },
      { question: "Can I roll multiple different dice?", answer: "Yes! Roll combinations like 2d6 + 1d8 + 3 for complex RPG scenarios." },
      { question: "Can I save my dice configurations?", answer: "Yes. You can save common roll combinations (like your character's attack roll) for quick access during game sessions." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Select the type of die (d4, d6, d8, d10, d12, d20, d100) and the number to roll." },
      { name: "Step 2", text: "Add any modifier value (positive or negative) to the total if needed." },
      { name: "Step 3", text: "Click Roll and view the individual results plus the final total." }
    ],
    useCases: [
      "Rolling attack, damage, and saving throws in D&D and other tabletop RPGs",
      "Generating random numbers for board games that use non-standard dice",
      "Making fair random decisions in everyday situations",
      "Running online tabletop sessions where physical dice aren't available"
    ],
    relatedSlugs: ["coin-flip", "random-number-generator", "name-picker"]
  },
  { slug: "coin-flip", name: "Coin Flip", description: "Flip a virtual coin with realistic animation and history tracking.", category: "gaming", icon: "🪙", keywords: ["coin flip", "coin toss", "heads tails", "flip a coin"], subcategory: "random",
    longDescription: "Flip a virtual coin with a satisfying animation and get a truly random heads or tails result. The coin flip tool tracks your flip history so you can record outcomes across multiple tosses, making it useful for game decisions, probability experiments, and settling disputes fairly.",
    faqs: [
      { question: "Is the coin flip truly random?", answer: "Yes. The result is generated using a cryptographically secure random number generator, giving an equal 50/50 probability for heads or tails every flip." },
      { question: "Can I flip multiple coins at once?", answer: "Yes. You can set the number of coins to flip simultaneously and see all results at once, useful for probability demonstrations." },
      { question: "Is the flip history saved between visits?", answer: "The flip history is maintained during your current browser session. Refreshing or closing the tab will reset it." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Click the Flip button to toss the virtual coin." },
      { name: "Step 2", text: "Watch the animation and see the heads or tails result." },
      { name: "Step 3", text: "Review the flip history to track outcomes across multiple tosses." }
    ],
    useCases: [
      "Making fair binary decisions in everyday life",
      "Settling disputes in games or group situations with an unbiased toss",
      "Demonstrating probability concepts in a classroom setting",
      "Deciding who goes first in a board game or competitive match"
    ],
    relatedSlugs: ["dice-roller", "random-number-generator", "wheel-spinner"]
  },
  { slug: "name-picker", name: "Random Name Picker", description: "Pick random names or items from a list with animation.", category: "gaming", icon: "🎯", keywords: ["name picker", "random picker", "draw names", "random selector"], subcategory: "random",
    longDescription: "Enter a list of names or items and let the random name picker select one with a dramatic animation. Perfect for classroom activities, prize draws, team assignments, and any situation where you need a fair, unbiased random selection from a group without the awkwardness of manual picking.",
    faqs: [
      { question: "Can I remove a name after it's been picked?", answer: "Yes. You can set the picker to remove selected names from the pool so that each person or item is only chosen once." },
      { question: "How many names can I add to the list?", answer: "You can add as many names or items as you need. There is no practical limit on list size." },
      { question: "Can I save my list for later use?", answer: "Lists can be saved in your browser's local storage so you don't have to re-enter names on your next visit." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your list of names or items, one per line, into the input area." },
      { name: "Step 2", text: "Click Pick to randomly select one name with an animated reveal." },
      { name: "Step 3", text: "Optionally remove the selected name from the pool and pick again." }
    ],
    useCases: [
      "Selecting a random student to answer a question in class",
      "Running fair prize draws and giveaways at events",
      "Assigning tasks or chores randomly among group members",
      "Choosing a random winner from contest entries"
    ],
    relatedSlugs: ["wheel-spinner", "team-generator", "dice-roller"]
  },
  { slug: "wheel-spinner", name: "Wheel Spinner", description: "Spin a customizable wheel to make random decisions with flair.", category: "gaming", icon: "🎡", keywords: ["wheel spinner", "spin wheel", "random wheel", "prize wheel"], subcategory: "random",
    longDescription: "Create a fully customizable spinning wheel with your own labels, colors, and options. Spin it for random decisions, prize draws, classroom activities, or party games. The satisfying spin animation and sound effects make every decision feel exciting, and the wheel is easily shared or reused for recurring activities.",
    faqs: [
      { question: "Can I customize the wheel colors and labels?", answer: "Yes. Each segment can have its own text label and color, so you can match the wheel to your event theme or preference." },
      { question: "Can I have unequal probabilities for different options?", answer: "You can add the same option multiple times to increase its probability, or some versions support weighted segments directly." },
      { question: "Is the spin result truly random?", answer: "Yes. The landing position is determined by a random number generator, ensuring fair and unbiased results each spin." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Add your options or names to the wheel by typing them into the segment list." },
      { name: "Step 2", text: "Customize the colors and labels as desired." },
      { name: "Step 3", text: "Click Spin and watch the wheel to see which option it lands on." }
    ],
    useCases: [
      "Running classroom prize wheels for student engagement activities",
      "Deciding what to eat or watch when your group can't agree",
      "Hosting game show-style giveaways and events",
      "Making fun random decisions for party games and icebreakers"
    ],
    relatedSlugs: ["name-picker", "coin-flip", "dice-roller"]
  },
  { slug: "team-generator", name: "Team Generator", description: "Randomly split a group of people into balanced teams.", category: "gaming", icon: "👥", keywords: ["team generator", "team maker", "random teams", "group splitter"], subcategory: "generators",
    longDescription: "Randomly divide a list of names into any number of balanced teams instantly. The team generator ensures fair distribution without bias, making it the go-to tool for sports activities, classroom projects, hackathons, and any group activity where you need to split people into even teams quickly.",
    faqs: [
      { question: "Can I specify the number of teams or team size?", answer: "Yes. You can either set the number of teams you want (and the tool divides equally) or set the maximum team size and it creates as many teams as needed." },
      { question: "What happens if the group doesn't divide evenly?", answer: "Remaining members are distributed across teams to keep them as balanced as possible, with some teams having one extra member." },
      { question: "Can I lock certain people onto the same team?", answer: "Some versions allow you to pin specific names together before randomizing the rest of the assignments." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter all participant names, one per line, into the input field." },
      { name: "Step 2", text: "Set the number of teams or the desired team size." },
      { name: "Step 3", text: "Click Generate Teams to see the randomly assigned balanced groups." }
    ],
    useCases: [
      "Splitting students into project groups for classroom assignments",
      "Creating balanced teams for sports, tournaments, or game nights",
      "Dividing hackathon participants into random working teams",
      "Assigning break-out room groups for workshops and events"
    ],
    relatedSlugs: ["name-picker", "dice-roller", "random-number-generator"]
  },
  { slug: "scoreboard", name: "Online Scoreboard", description: "Keep score for games with customizable player names and point tracking.", category: "gaming", icon: "🏆", keywords: ["scoreboard", "score keeper", "game score", "point tracker"], subcategory: "tools",
    longDescription: "Track scores for any game with a digital scoreboard that supports multiple players, customizable names, and easy point adjustments. The online scoreboard eliminates the need for paper scoring sheets and keeps everyone in the game focused on playing rather than tracking points manually.",
    faqs: [
      { question: "How many players can the scoreboard track?", answer: "The scoreboard supports multiple players — typically up to 8 or more depending on the tool version — making it suitable for most party and board game scenarios." },
      { question: "Can I undo an incorrect score entry?", answer: "Yes. Each score adjustment can be reversed, so accidental point additions or subtractions won't ruin the game." },
      { question: "Does the scoreboard save between sessions?", answer: "Score data is maintained during the current browser session. For ongoing tournaments, consider noting the scores before closing the tab." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Add player names to the scoreboard by entering them in the player fields." },
      { name: "Step 2", text: "Use the plus and minus buttons to add or subtract points for each player." },
      { name: "Step 3", text: "Track the running totals throughout the game and see the leader at a glance." }
    ],
    useCases: [
      "Keeping score during board games and card games with multiple players",
      "Tracking points in party game tournaments and competitions",
      "Managing scores in classroom quiz games and team activities",
      "Replacing paper score sheets for outdoor games and sports"
    ],
    relatedSlugs: ["dice-roller", "stopwatch", "team-generator"]
  },
  { slug: "trivia-generator", name: "Trivia Question Generator", description: "Generate random trivia questions across various categories.", category: "gaming", icon: "❓", keywords: ["trivia", "quiz questions", "trivia generator", "random trivia"], subcategory: "generators",
    longDescription: "Generate random trivia questions spanning history, science, pop culture, sports, geography, and more. The trivia generator is perfect for hosting pub quizzes, game nights, classroom activities, and team-building events — providing an endless supply of questions across different categories and difficulty levels.",
    faqs: [
      { question: "What categories of trivia questions are available?", answer: "Categories include history, science, geography, pop culture, sports, music, movies, literature, and general knowledge, among others." },
      { question: "Can I select the difficulty level of questions?", answer: "Yes. Questions are available in easy, medium, and hard difficulty settings so you can tailor the challenge to your audience." },
      { question: "Are the answers provided with each question?", answer: "Yes. Each generated question comes with the correct answer, which the host can reveal after players have given their responses." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Select a trivia category and difficulty level, or choose random for variety." },
      { name: "Step 2", text: "Click Generate to receive a trivia question with multiple choice or open-ended format." },
      { name: "Step 3", text: "Read the question aloud to players, collect answers, then reveal the correct response." }
    ],
    useCases: [
      "Hosting pub quiz nights and trivia events with fresh question sets",
      "Running classroom quiz competitions and review games",
      "Adding a trivia round to parties and social gatherings",
      "Team-building activities that encourage friendly competition"
    ],
    relatedSlugs: ["math-quiz-generator", "flashcard-maker", "dice-roller"]
  },
  { slug: "bingo-card-generator", name: "Bingo Card Generator", description: "Generate printable bingo cards with custom numbers or words.", category: "gaming", icon: "🎱", keywords: ["bingo card", "bingo generator", "custom bingo", "bingo maker"], subcategory: "generators",
    longDescription: "Generate unique, printable bingo cards with custom numbers, words, or phrases for any theme. Create standard 5×5 number bingo cards or customize the content for educational bingo, holiday-themed games, baby showers, and team-building events — every card generated is unique to ensure fair gameplay.",
    faqs: [
      { question: "Can I create themed bingo cards with custom words?", answer: "Yes. Replace the standard numbers with your own words, phrases, or images to create topic-specific bingo cards for education or events." },
      { question: "Are all generated cards different?", answer: "Yes. Each card is randomly generated with a unique arrangement, so all players have a different card and there's no single guaranteed winner." },
      { question: "Can I print the bingo cards directly?", answer: "Yes. Cards are formatted for easy printing. Generate and print as many unique cards as you need for your group." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Choose card type (number bingo or custom word bingo) and enter your words or use the default numbers." },
      { name: "Step 2", text: "Set the number of unique cards you need to generate for your group." },
      { name: "Step 3", text: "Print or download the generated cards and distribute them to players before the game." }
    ],
    useCases: [
      "Running traditional number bingo nights for community and fundraising events",
      "Creating educational vocabulary bingo cards for classroom learning",
      "Hosting themed bingo games at baby showers, weddings, and parties",
      "Generating ice-breaker bingo cards for corporate team-building events"
    ],
    relatedSlugs: ["random-number-generator", "team-generator", "name-picker"]
  },
  { slug: "truth-or-dare", name: "Truth or Dare Generator", description: "Generate truth or dare prompts for parties and gatherings.", category: "gaming", icon: "🎭", keywords: ["truth or dare", "party game", "dare generator", "truth questions"], subcategory: "generators",
    longDescription: "Generate an endless supply of truth questions and dare challenges for parties, sleepovers, and social gatherings. With multiple intensity levels from tame to wild, the truth or dare generator ensures everyone has fun while keeping the game appropriate for the group's comfort level.",
    faqs: [
      { question: "Can I filter by intensity level?", answer: "Yes. Select from mild (suitable for all ages), moderate (teens and adults), or bold (adult parties) to get prompts appropriate for your group." },
      { question: "Are the dares safe and appropriate?", answer: "All dares are designed to be fun and harmless. Bold dares are more embarrassing than dangerous, and you can always skip any prompt that feels uncomfortable." },
      { question: "How many unique prompts are in the database?", answer: "The generator has hundreds of unique truth questions and dare challenges across all intensity levels, so the game rarely repeats." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Select the intensity level appropriate for your group (mild, moderate, or bold)." },
      { name: "Step 2", text: "Have the current player choose Truth or Dare." },
      { name: "Step 3", text: "Click Generate to reveal a random truth question or dare challenge for them to complete." }
    ],
    useCases: [
      "Spicing up parties and sleepovers with spontaneous fun challenges",
      "Breaking the ice at social gatherings and group hangouts",
      "Adding a game element to birthday parties and celebrations",
      "Keeping the energy high at teen and young adult social events"
    ],
    relatedSlugs: ["writing-prompt-generator", "trivia-generator", "dice-roller"]
  },
  { slug: "would-you-rather", name: "Would You Rather", description: "Generate fun 'would you rather' questions for parties and icebreakers.", category: "gaming", icon: "🤔", keywords: ["would you rather", "party game", "icebreaker", "conversation starter"], subcategory: "generators",
    longDescription: "Generate engaging 'would you rather' questions that spark laughter, debate, and conversation at parties, team meetings, and casual hangouts. From lighthearted dilemmas to thought-provoking choices, these questions are a perfect icebreaker that gets people talking and reveals surprising things about each other.",
    faqs: [
      { question: "Are the questions suitable for all ages?", answer: "The tool offers different tone settings including family-friendly and adult versions, so you can match the questions to your audience." },
      { question: "Can I submit or suggest my own questions?", answer: "The generator uses a curated database of questions. For custom games, you can write your own questions and take turns asking them manually." },
      { question: "How is this different from trivia?", answer: "Would you rather questions have no right or wrong answer — they're about personal preference and spark discussion, not testing knowledge." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Select the tone or category of questions (fun, philosophical, silly, etc.)." },
      { name: "Step 2", text: "Click Generate to reveal a would you rather question." },
      { name: "Step 3", text: "Have everyone in the group answer and share their reasoning for a fun discussion." }
    ],
    useCases: [
      "Breaking the ice at team meetings and work events",
      "Keeping party guests entertained during downtime between activities",
      "Starting conversations with new acquaintances and in group settings",
      "Family game nights and road trip entertainment for all ages"
    ],
    relatedSlugs: ["truth-or-dare", "trivia-generator", "dice-roller"]
  },
  { slug: "reaction-time-test", name: "Reaction Time Test", description: "Test your reaction time with visual and audio cues.", category: "gaming", icon: "⚡", keywords: ["reaction time", "reaction test", "speed test", "reflex test"], subcategory: "tools",
    longDescription: "Measure your reaction time in milliseconds by responding as quickly as possible to visual or audio signals. Test your reflexes across multiple rounds, track your average, and see how you compare to population benchmarks. Useful for gamers, athletes, and anyone curious about their neurological response speed.",
    faqs: [
      { question: "What is an average human reaction time?", answer: "The average human visual reaction time is around 200–250 milliseconds. Top gamers and athletes can achieve 150–180ms, while times above 300ms are considered slower than average." },
      { question: "Does caffeine or fatigue affect reaction time?", answer: "Yes. Fatigue, alcohol, and certain medications slow reaction time, while moderate caffeine intake can improve alertness and slightly reduce reaction time." },
      { question: "How many rounds should I test for an accurate average?", answer: "Run at least 5–10 rounds and use the average result, as individual attempts can vary due to anticipation, distraction, or clicking technique." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Click Start and wait for the visual signal (a color change or flash) to appear on screen." },
      { name: "Step 2", text: "Click or press a key as quickly as possible when the signal appears." },
      { name: "Step 3", text: "Review your reaction time in milliseconds and your average across multiple attempts." }
    ],
    useCases: [
      "Benchmarking gaming reflexes before and after training or optimization",
      "Testing the effect of fatigue on response speed during sports science research",
      "Competing with friends to see who has the fastest reaction time",
      "Practicing for esports and competitive gaming where reaction speed matters"
    ],
    relatedSlugs: ["typing-speed-test", "stopwatch", "keyboard-tester"]
  },
  { slug: "number-guessing-game", name: "Number Guessing Game", description: "Guess the number with hints — a fun logic game with difficulty levels.", category: "gaming", icon: "🔢", keywords: ["number game", "guessing game", "logic game", "number puzzle"], subcategory: "tools",
    longDescription: "Try to guess the secret number within a limited number of attempts using higher/lower hints to guide you. With adjustable difficulty levels that change the number range and attempt limit, the number guessing game is a fun exercise in deductive reasoning and binary search logic for players of all ages.",
    faqs: [
      { question: "How does the higher/lower hint work?", answer: "After each guess, the game tells you if the secret number is higher or lower than your guess, allowing you to systematically narrow down the possibilities." },
      { question: "What is the optimal strategy for guessing?", answer: "The best strategy is binary search: always guess the midpoint of your remaining range. This guarantees finding any number in a 1–100 range within 7 guesses." },
      { question: "Can I adjust the difficulty?", answer: "Yes. Easy mode uses a 1–50 range, medium uses 1–100, and hard mode uses a wider range with fewer allowed guesses." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Select your preferred difficulty level to set the number range and guess limit." },
      { name: "Step 2", text: "Enter your first guess and read the higher/lower feedback." },
      { name: "Step 3", text: "Use the hints to narrow your guesses and find the secret number before running out of attempts." }
    ],
    useCases: [
      "Playing a quick mental game during short breaks",
      "Teaching children about deductive reasoning and logical elimination",
      "Demonstrating binary search as a programming concept to students",
      "Casual brain training to sharpen logical thinking and pattern recognition"
    ],
    relatedSlugs: ["random-number-generator", "dice-roller", "math-quiz-generator"]
  },
  { slug: "dnd-character-generator", name: "D&D Character Generator", description: "Generate random D&D 5e characters with stats, class, race, and backstory.", category: "gaming", icon: "⚔️", keywords: ["dnd character generator", "dungeons and dragons character", "d&d 5e character", "rpg character creator"], subcategory: "generators",
    longDescription: "Generate complete Dungeons & Dragons 5th Edition characters in seconds — including rolled ability scores, a random class and race combination, background, personality traits, ideals, bonds, flaws, and a brief backstory hook. Perfect for new players setting up their first character, DMs who need quick NPCs, or veterans who want a random challenge.",
    faqs: [
      { question: "Does the generator follow D&D 5e rules?", answer: "Yes. Ability scores are generated using the standard 4d6-drop-lowest method, and all class, race, and background combinations follow the Player's Handbook options." },
      { question: "Can I customize parts of the character?", answer: "Yes. Lock any field you want to keep (e.g., a specific class or race) and randomize only the remaining options to create a semi-random character." },
      { question: "Does it calculate derived stats like AC and HP?", answer: "Yes. Hit Points (using average HP at level 1), Armor Class (using no armor as a base), initiative, and proficiency bonus are all calculated from the generated stats and class." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Click Generate to create a fully random D&D 5e character, or lock specific options like class or race before generating." },
      { name: "Step 2", text: "Review the character's ability scores, modifiers, traits, and backstory hook." },
      { name: "Step 3", text: "Copy or download the character sheet to use in your campaign or session." }
    ],
    useCases: [
      "New D&D players quickly generating their first character to start playing immediately",
      "Dungeon Masters creating quick NPCs with distinct personalities for encounters",
      "Experienced players challenging themselves with a random character concept",
      "One-shot games where players need characters fast without lengthy character creation"
    ],
    relatedSlugs: ["dice-roller", "random-number-generator", "name-picker"]
  },
  { slug: "lottery-number-generator", name: "Lottery Number Generator", description: "Generate random lottery number combinations for popular lottery games.", category: "gaming", icon: "🎰", keywords: ["lottery number generator", "lotto numbers", "random lottery", "powerball numbers"], subcategory: "generators",
    longDescription: "Generate random lottery number combinations for Powerball, Mega Millions, EuroMillions, and custom lottery formats. All numbers are generated using a cryptographically secure random number generator for truly fair, unbiased picks. Generate multiple sets at once and copy them for quick use before buying your ticket.",
    faqs: [
      { question: "Are the generated lottery numbers truly random?", answer: "Yes. The tool uses the Web Crypto API for cryptographically secure random number generation, which is as random as any physical lottery ball draw." },
      { question: "Does using a number generator improve my odds of winning?", answer: "No. Each lottery draw is independent, and no combination of numbers has a better or worse probability than any other. The generator simply saves you the time of picking numbers manually." },
      { question: "Can I generate numbers for a custom lottery format?", answer: "Yes. Set your own number range (e.g., 1–49), the count of numbers to draw, and optionally a bonus ball range to match any lottery format worldwide." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Select a lottery preset (Powerball, Mega Millions, EuroMillions) or set a custom number range." },
      { name: "Step 2", text: "Choose how many sets of numbers to generate at once (1–10 sets)." },
      { name: "Step 3", text: "Copy your generated numbers and use them to fill out your lottery ticket." }
    ],
    useCases: [
      "Generating lottery picks quickly without spending time choosing numbers manually",
      "Creating multiple sets of numbers to play in a single draw",
      "Generating custom lottery numbers for office pools and group lotto games",
      "Simulating lottery odds and running experiments with random number sets"
    ],
    relatedSlugs: ["random-number-generator", "dice-roller", "coin-flip"]
  },
  { slug: "countdown-number-game", name: "Countdown Numbers Game", description: "Reach the target number using basic operations — inspired by the TV show.", category: "gaming", icon: "🔢", keywords: ["countdown", "numbers game", "math game", "target number"], subcategory: "tools",
    longDescription: "Challenge yourself to reach a randomly generated target number using only a set of given numbers and basic arithmetic operations — just like the classic Countdown TV show. The countdown numbers game sharpens mental arithmetic, creative problem solving, and mathematical thinking in a fun, timed format.",
    faqs: [
      { question: "What are the rules of the Countdown numbers game?", answer: "You are given 6 numbers and a 3-digit target. Using addition, subtraction, multiplication, and division, combine some or all of the given numbers to reach or get as close to the target as possible." },
      { question: "Do I have to use all six numbers?", answer: "No. You can use any combination of the given numbers — from just two to all six. Each number can only be used once." },
      { question: "Is there always an exact solution?", answer: "Not always. Some targets cannot be reached exactly with the given numbers. The closest possible answer within 10 of the target still scores points in the original TV format." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Note the six given numbers and the three-digit target displayed." },
      { name: "Step 2", text: "Work out a solution using addition, subtraction, multiplication, and division within the time limit." },
      { name: "Step 3", text: "Enter your calculation and see if it reaches the target — or how close you got." }
    ],
    useCases: [
      "Sharpening mental arithmetic skills in a fun game format",
      "Practicing for school math competitions and arithmetic challenges",
      "Playing a solo brain training game inspired by the classic TV show",
      "Entertaining and educating children with a challenging math puzzle"
    ],
    relatedSlugs: ["scientific-calculator", "random-number-generator", "math-quiz-generator"]
  },
];
