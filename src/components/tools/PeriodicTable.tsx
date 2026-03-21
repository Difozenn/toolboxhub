"use client";

import { useState } from "react";

const ELEMENTS = [
  { num: 1, sym: "H", name: "Hydrogen", mass: 1.008, cat: "nonmetal" },
  { num: 2, sym: "He", name: "Helium", mass: 4.003, cat: "noble" },
  { num: 3, sym: "Li", name: "Lithium", mass: 6.941, cat: "alkali" },
  { num: 4, sym: "Be", name: "Beryllium", mass: 9.012, cat: "alkaline" },
  { num: 5, sym: "B", name: "Boron", mass: 10.81, cat: "metalloid" },
  { num: 6, sym: "C", name: "Carbon", mass: 12.01, cat: "nonmetal" },
  { num: 7, sym: "N", name: "Nitrogen", mass: 14.01, cat: "nonmetal" },
  { num: 8, sym: "O", name: "Oxygen", mass: 15.99, cat: "nonmetal" },
  { num: 9, sym: "F", name: "Fluorine", mass: 19.00, cat: "halogen" },
  { num: 10, sym: "Ne", name: "Neon", mass: 20.18, cat: "noble" },
  { num: 11, sym: "Na", name: "Sodium", mass: 22.99, cat: "alkali" },
  { num: 12, sym: "Mg", name: "Magnesium", mass: 24.31, cat: "alkaline" },
  { num: 13, sym: "Al", name: "Aluminum", mass: 26.98, cat: "post-transition" },
  { num: 14, sym: "Si", name: "Silicon", mass: 28.09, cat: "metalloid" },
  { num: 15, sym: "P", name: "Phosphorus", mass: 30.97, cat: "nonmetal" },
  { num: 16, sym: "S", name: "Sulfur", mass: 32.07, cat: "nonmetal" },
  { num: 17, sym: "Cl", name: "Chlorine", mass: 35.45, cat: "halogen" },
  { num: 18, sym: "Ar", name: "Argon", mass: 39.95, cat: "noble" },
  { num: 19, sym: "K", name: "Potassium", mass: 39.10, cat: "alkali" },
  { num: 20, sym: "Ca", name: "Calcium", mass: 40.08, cat: "alkaline" },
];

const CAT_COLORS: Record<string, string> = {
  nonmetal: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  noble: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  alkali: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  alkaline: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  metalloid: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  halogen: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  "post-transition": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

export default function PeriodicTable() {
  const [selected, setSelected] = useState(ELEMENTS[0]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
        {ELEMENTS.map((el) => (
          <button key={el.num} onClick={() => setSelected(el)}
            className={`rounded-lg p-1.5 text-center transition-all ${CAT_COLORS[el.cat]} ${selected.num === el.num ? "ring-2 ring-primary scale-105" : "hover:scale-105"}`}>
            <div className="text-xs leading-none opacity-70">{el.num}</div>
            <div className="text-sm font-bold">{el.sym}</div>
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-muted p-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div><p className="text-xs text-muted-foreground">Element</p><p className="font-semibold">{selected.name}</p></div>
        <div><p className="text-xs text-muted-foreground">Symbol</p><p className="font-bold text-primary text-xl">{selected.sym}</p></div>
        <div><p className="text-xs text-muted-foreground">Atomic Number</p><p className="font-semibold">{selected.num}</p></div>
        <div><p className="text-xs text-muted-foreground">Atomic Mass</p><p className="font-semibold">{selected.mass} u</p></div>
        <div><p className="text-xs text-muted-foreground">Category</p><p className="font-semibold capitalize">{selected.cat}</p></div>
      </div>
    </div>
  );
}
