"use client";

import { useState, useMemo } from "react";

const TIP_PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [people, setPeople] = useState("1");

  const activeTip = isCustom ? parseFloat(customTip) || 0 : tipPct;

  const result = useMemo(() => {
    const billAmount = parseFloat(bill);
    const numPeople = Math.max(1, parseInt(people) || 1);
    if (!billAmount || billAmount <= 0) return null;

    const tipAmount = billAmount * (activeTip / 100);
    const total = billAmount + tipAmount;
    const perPerson = total / numPeople;
    const tipPerPerson = tipAmount / numPeople;

    return { tipAmount, total, perPerson, tipPerPerson, numPeople };
  }, [bill, activeTip, people]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      {/* Bill amount */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <label className="block text-sm font-medium text-foreground">Bill Amount ($)</label>
        <input
          type="number"
          step="0.01"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          placeholder="0.00"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-2xl font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Tip percentage */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Tip Percentage: <span className="text-primary font-bold">{activeTip}%</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {TIP_PRESETS.map((pct) => (
            <button
              key={pct}
              onClick={() => {
                setTipPct(pct);
                setIsCustom(false);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                !isCustom && tipPct === pct
                  ? "bg-primary text-white"
                  : "border border-border bg-background text-foreground hover:bg-primary/10"
              }`}
            >
              {pct}%
            </button>
          ))}
          <button
            onClick={() => setIsCustom(true)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isCustom
                ? "bg-primary text-white"
                : "border border-border bg-background text-foreground hover:bg-primary/10"
            }`}
          >
            Custom
          </button>
        </div>
        {isCustom && (
          <input
            type="number"
            step="any"
            value={customTip}
            onChange={(e) => setCustomTip(e.target.value)}
            placeholder="Enter custom tip %"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        )}
      </div>

      {/* Split */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <label className="block text-sm font-medium text-foreground">Split Between</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPeople((prev) => String(Math.max(1, (parseInt(prev) || 1) - 1)))}
            className="rounded-lg border border-border bg-background w-10 h-10 flex items-center justify-center text-lg font-bold text-foreground hover:bg-primary/10 transition-colors"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-20 rounded-lg border border-border bg-background px-3 py-2 text-center text-lg font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={() => setPeople((prev) => String((parseInt(prev) || 1) + 1))}
            className="rounded-lg border border-border bg-background w-10 h-10 flex items-center justify-center text-lg font-bold text-foreground hover:bg-primary/10 transition-colors"
          >
            +
          </button>
          <span className="text-sm text-muted-foreground">
            {parseInt(people) === 1 ? "person" : "people"}
          </span>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Tip Amount</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.tipAmount)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.total)}</p>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              {result.numPeople > 1 ? "Per Person" : "You Pay"}
            </p>
            <p className="text-2xl font-bold text-primary">${fmt(result.perPerson)}</p>
            {result.numPeople > 1 && (
              <p className="text-xs text-muted-foreground mt-1">
                (tip: ${fmt(result.tipPerPerson)} each)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
