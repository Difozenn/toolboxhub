"use client";

import { useState } from "react";

const buttonClass =
  "rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

const races = [
  "Human",
  "Elf",
  "Dwarf",
  "Halfling",
  "Dragonborn",
  "Gnome",
  "Half-Elf",
  "Half-Orc",
  "Tiefling",
  "Orc",
  "Goliath",
  "Tabaxi",
  "Aasimar",
  "Kenku",
  "Firbolg",
];

const classes = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
  "Artificer",
  "Blood Hunter",
];

const firstNames: Record<string, string[]> = {
  Human: ["Aldric", "Brenna", "Corwin", "Dahlia", "Eldrin", "Freya", "Gareth", "Isolde"],
  Elf: ["Aelindra", "Caelum", "Elowen", "Faelar", "Galadriel", "Thalion", "Miriel", "Legolin"],
  Dwarf: ["Thorin", "Brunhild", "Durin", "Helga", "Gimric", "Dagny", "Balin", "Hilda"],
  Halfling: ["Bilbo", "Rosie", "Pippin", "Daisy", "Merric", "Tansy", "Finnan", "Primrose"],
  Dragonborn: ["Balasar", "Kava", "Donaar", "Sora", "Kriv", "Mishann", "Tarhun", "Akra"],
  Gnome: ["Bimpnottin", "Dimble", "Ellywick", "Fibblestib", "Gimble", "Nyx", "Pog", "Zanna"],
  "Half-Elf": ["Arannis", "Kithri", "Galinndan", "Shanairra", "Rolen", "Mialee", "Aramil", "Quelenna"],
  "Half-Orc": ["Grul", "Shulka", "Dench", "Emen", "Feng", "Sutha", "Holg", "Neega"],
  Tiefling: ["Amnon", "Bryseis", "Damakos", "Kallista", "Mordai", "Nemeia", "Therai", "Rieta"],
  Orc: ["Grukk", "Bagha", "Shokk", "Ulga", "Drog", "Murka", "Thok", "Yarga"],
  Goliath: ["Aukan", "Ilikan", "Keothi", "Manneo", "Thotham", "Vaunea", "Gauthak", "Pethani"],
  Tabaxi: ["Cloud on Peak", "Jade Claw", "Five Timber", "Moon Whisker", "River Song", "Shadow Pounce"],
  Aasimar: ["Ceratos", "Dara", "Elyon", "Hazaiah", "Massius", "Seraphina", "Uriel", "Zaphiel"],
  Kenku: ["Clatter", "Whisper", "Creak", "Boom", "Trill", "Snap", "Hush", "Clank"],
  Firbolg: ["Adair", "Briar", "Cairn", "Dara", "Fern", "Glen", "Moss", "Rowan"],
};

const abilities = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
];

const abilityAbbr: Record<string, string> = {
  Strength: "STR",
  Dexterity: "DEX",
  Constitution: "CON",
  Intelligence: "INT",
  Wisdom: "WIS",
  Charisma: "CHA",
};

const alignments = [
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good",
  "Lawful Neutral",
  "True Neutral",
  "Chaotic Neutral",
  "Lawful Evil",
  "Neutral Evil",
  "Chaotic Evil",
];

function roll4d6DropLowest(): number {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Character {
  name: string;
  race: string;
  charClass: string;
  alignment: string;
  scores: number[];
  hitPoints: number;
  level: number;
}

function modifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export default function DndCharacterGenerator() {
  const [character, setCharacter] = useState<Character | null>(null);

  const generate = () => {
    const race = randomFrom(races);
    const charClass = randomFrom(classes);
    const alignment = randomFrom(alignments);
    const raceNames = firstNames[race] || firstNames["Human"];
    const name = randomFrom(raceNames);
    const scores = abilities.map(() => roll4d6DropLowest());
    const conMod = Math.floor((scores[2] - 10) / 2);

    // HP based on class hit die
    const hitDice: Record<string, number> = {
      Barbarian: 12,
      Fighter: 10,
      Paladin: 10,
      Ranger: 10,
      "Blood Hunter": 10,
      Bard: 8,
      Cleric: 8,
      Druid: 8,
      Monk: 8,
      Rogue: 8,
      Warlock: 8,
      Artificer: 8,
      Sorcerer: 6,
      Wizard: 6,
    };
    const hitDie = hitDice[charClass] || 8;
    const hitPoints = hitDie + conMod;

    setCharacter({
      name,
      race,
      charClass,
      alignment,
      scores,
      hitPoints: Math.max(hitPoints, 1),
      level: 1,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <button onClick={generate} className={buttonClass}>
          Roll New Character
        </button>
      </div>

      {character && (
        <div className="mx-auto max-w-md">
          <div className="rounded-xl border-2 border-border bg-muted overflow-hidden">
            {/* Header */}
            <div className="bg-primary/10 border-b border-border px-6 py-4 text-center">
              <h2 className="text-2xl font-bold text-foreground">
                {character.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Level {character.level} {character.race} {character.charClass}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {character.alignment}
              </p>
            </div>

            {/* Stats */}
            <div className="p-6 space-y-4">
              {/* HP */}
              <div className={cardClass}>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Hit Points
                </p>
                <p className="mt-1 text-3xl font-bold text-red-500">
                  {character.hitPoints}
                </p>
              </div>

              {/* Ability Scores */}
              <div className="grid grid-cols-3 gap-3">
                {abilities.map((ability, idx) => (
                  <div key={ability} className={cardClass}>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      {abilityAbbr[ability]}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {character.scores[idx]}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      {modifier(character.scores[idx])}
                    </p>
                  </div>
                ))}
              </div>

              {/* Proficiency */}
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2">
                <span className="text-sm text-muted-foreground">
                  Proficiency Bonus
                </span>
                <span className="text-sm font-bold text-foreground">+2</span>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2">
                <span className="text-sm text-muted-foreground">
                  Armor Class
                </span>
                <span className="text-sm font-bold text-foreground">
                  {10 + Math.floor((character.scores[1] - 10) / 2)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2">
                <span className="text-sm text-muted-foreground">
                  Initiative
                </span>
                <span className="text-sm font-bold text-foreground">
                  {modifier(character.scores[1])}
                </span>
              </div>

              <button
                onClick={generate}
                className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Re-Roll Character
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
