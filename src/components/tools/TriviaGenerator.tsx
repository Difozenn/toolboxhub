"use client";

import { useState } from "react";

const TRIVIA = [
  { q: "What is the capital of Australia?", a: "Canberra" },
  { q: "How many bones are in the adult human body?", a: "206" },
  { q: "What year did World War II end?", a: "1945" },
  { q: "Which planet is known as the Red Planet?", a: "Mars" },
  { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci" },
  { q: "What is the chemical symbol for gold?", a: "Au" },
  { q: "How many sides does a hexagon have?", a: "6" },
  { q: "What is the largest ocean on Earth?", a: "Pacific Ocean" },
  { q: "Who wrote 'Romeo and Juliet'?", a: "William Shakespeare" },
  { q: "What is the speed of light (approx)?", a: "299,792,458 m/s" },
  { q: "Which country invented pizza?", a: "Italy" },
  { q: "What is the tallest mountain in the world?", a: "Mount Everest" },
  { q: "How many continents are there?", a: "7" },
  { q: "What language has the most native speakers?", a: "Mandarin Chinese" },
  { q: "What is the smallest country in the world?", a: "Vatican City" },
  { q: "Who invented the telephone?", a: "Alexander Graham Bell" },
  { q: "What is H2O?", a: "Water" },
  { q: "How many strings does a standard guitar have?", a: "6" },
  { q: "What is the currency of Japan?", a: "Yen" },
  { q: "Who was the first person to walk on the moon?", a: "Neil Armstrong" },
  { q: "What is the longest river in the world?", a: "The Nile" },
  { q: "How many colors are in a rainbow?", a: "7" },
  { q: "What is the largest mammal?", a: "Blue Whale" },
  { q: "In what year did the Titanic sink?", a: "1912" },
  { q: "What is the powerhouse of the cell?", a: "Mitochondria" },
  { q: "Which element has the atomic number 1?", a: "Hydrogen" },
  { q: "What is the most spoken language in Brazil?", a: "Portuguese" },
  { q: "How many players are on a basketball team on court?", a: "5" },
  { q: "Who wrote '1984'?", a: "George Orwell" },
  { q: "What is the largest planet in our solar system?", a: "Jupiter" },
  { q: "What year was the Eiffel Tower built?", a: "1889" },
  { q: "What is the chemical formula for table salt?", a: "NaCl" },
  { q: "How many states are in the USA?", a: "50" },
  { q: "What sport is played at Wimbledon?", a: "Tennis" },
  { q: "Who invented the lightbulb?", a: "Thomas Edison" },
  { q: "What is the capital of Canada?", a: "Ottawa" },
  { q: "How many hearts does an octopus have?", a: "3" },
  { q: "What is the hardest natural substance?", a: "Diamond" },
  { q: "Which planet has the most moons?", a: "Saturn" },
  { q: "What is the national language of Brazil?", a: "Portuguese" },
  { q: "How many legs does a spider have?", a: "8" },
  { q: "What is pi rounded to 2 decimal places?", a: "3.14" },
  { q: "Who painted the Sistine Chapel ceiling?", a: "Michelangelo" },
  { q: "What is the largest continent?", a: "Asia" },
  { q: "In what country is the Amazon Rainforest?", a: "Brazil (mostly)" },
  { q: "How many minutes in a day?", a: "1,440" },
  { q: "What year did man first land on the moon?", a: "1969" },
  { q: "What is the most abundant gas in Earth's atmosphere?", a: "Nitrogen" },
  { q: "What is the capital of France?", a: "Paris" },
  { q: "How many keys does a standard piano have?", a: "88" },
];

export default function TriviaGenerator() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * TRIVIA.length));
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const next = () => {
    setIdx(Math.floor(Math.random() * TRIVIA.length));
    setRevealed(false);
  };

  const answer = (correct: boolean) => {
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    next();
  };

  const q = TRIVIA[idx];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-6 space-y-4 min-h-[160px] flex flex-col justify-between">
        <p className="text-sm text-muted-foreground">Question {score.total + 1}</p>
        <p className="text-lg font-semibold text-foreground">{q.q}</p>
        {revealed ? (
          <div className="rounded-lg bg-primary/10 border border-primary/30 px-4 py-3">
            <p className="text-sm text-muted-foreground">Answer:</p>
            <p className="text-xl font-bold text-primary">{q.a}</p>
          </div>
        ) : (
          <button onClick={() => setRevealed(true)}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors">
            Reveal Answer
          </button>
        )}
      </div>

      {revealed && (
        <div className="flex gap-3">
          <button onClick={() => answer(true)} className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-colors">Got It Right</button>
          <button onClick={() => answer(false)} className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">Got It Wrong</button>
        </div>
      )}

      <div className="flex items-center justify-between rounded-xl border border-border bg-muted px-5 py-3">
        <span className="text-sm text-muted-foreground">Score: {score.correct}/{score.total}</span>
        <button onClick={next} className="rounded-lg border border-border bg-background px-4 py-1.5 text-sm text-foreground hover:bg-primary/10 transition-colors">Skip</button>
      </div>
    </div>
  );
}
