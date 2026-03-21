"use client";

import { useState } from "react";

const CONVERSION = 14.787;

export default function TablespoonsToMl() {
  const [tbsp, setTbsp] = useState("");
  const [ml, setMl] = useState("");

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

  const handleTbspChange = (value: string) => {
    setTbsp(value);
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setMl((num * CONVERSION).toFixed(4));
    } else {
      setMl("");
    }
  };

  const handleMlChange = (value: string) => {
    setMl(value);
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setTbsp((num / CONVERSION).toFixed(4));
    } else {
      setTbsp("");
    }
  };

  const tbspNum = parseFloat(tbsp);
  const mlNum = parseFloat(ml);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Tablespoons</label>
          <input
            type="number"
            value={tbsp}
            onChange={(e) => handleTbspChange(e.target.value)}
            placeholder="1"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Milliliters</label>
          <input
            type="number"
            value={ml}
            onChange={(e) => handleMlChange(e.target.value)}
            placeholder="14.787"
            className={inputClass}
          />
        </div>
      </div>

      <div className={cardClass}>
        <p className="text-sm text-muted-foreground">Conversion Rate</p>
        <p className="text-lg font-bold text-foreground">1 tbsp = {CONVERSION} mL</p>
      </div>

      {!isNaN(tbspNum) && !isNaN(mlNum) && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={cardClass}>
            <p className="text-sm text-muted-foreground">Tablespoons</p>
            <p className="text-2xl font-bold text-primary">{parseFloat(tbsp)} tbsp</p>
          </div>
          <div className={cardClass}>
            <p className="text-sm text-muted-foreground">Milliliters</p>
            <p className="text-2xl font-bold text-primary">{parseFloat(parseFloat(ml).toFixed(4))} mL</p>
          </div>
        </div>
      )}

      <div className={`${cardClass} text-left`}>
        <p className="mb-2 text-sm font-medium text-foreground">Quick Reference</p>
        <div className="grid grid-cols-2 gap-1 text-sm">
          {[0.25, 0.5, 1, 2, 3, 5, 10, 15].map((val) => (
            <div key={val} className="flex justify-between rounded px-2 py-1 text-muted-foreground">
              <span>{val} tbsp</span>
              <span className="font-medium text-foreground">{(val * CONVERSION).toFixed(2)} mL</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
