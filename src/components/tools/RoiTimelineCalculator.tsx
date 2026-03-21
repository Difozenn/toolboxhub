"use client";

import { useState } from "react";

interface YearData {
  year: number;
  startValue: number;
  gain: number;
  endValue: number;
  cumulativeReturn: number;
}

export default function RoiTimelineCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [years, setYears] = useState("");
  const [timeline, setTimeline] = useState<YearData[]>([]);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  const buttonClass =
    "rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
  const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

  const calculate = () => {
    const principal = parseFloat(initialInvestment);
    const rate = parseFloat(annualReturn) / 100;
    const numYears = parseInt(years, 10);

    if (isNaN(principal) || isNaN(rate) || isNaN(numYears) || principal <= 0 || numYears <= 0) return;

    const data: YearData[] = [];
    let currentValue = principal;

    for (let y = 1; y <= numYears; y++) {
      const startValue = currentValue;
      const gain = startValue * rate;
      const endValue = startValue + gain;
      const cumulativeReturn = ((endValue - principal) / principal) * 100;
      data.push({
        year: y,
        startValue,
        gain,
        endValue,
        cumulativeReturn,
      });
      currentValue = endValue;
    }

    setTimeline(data);
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  const totalROI =
    timeline.length > 0
      ? ((timeline[timeline.length - 1].endValue - parseFloat(initialInvestment)) /
          parseFloat(initialInvestment)) *
        100
      : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Initial Investment ($)
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            placeholder="10000"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Annual Return (%)
          </label>
          <input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            placeholder="8"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Years</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="10"
            className={inputClass}
          />
        </div>
      </div>

      <button onClick={calculate} className={buttonClass}>
        Calculate ROI Timeline
      </button>

      {timeline.length > 0 && (
        <div className="space-y-4">
          <div className={`${cardClass} bg-primary/10`}>
            <p className="text-sm text-muted-foreground">Total ROI</p>
            <p className="text-3xl font-bold text-primary">{totalROI.toFixed(2)}%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {fmt(parseFloat(initialInvestment))} &rarr;{" "}
              {fmt(timeline[timeline.length - 1].endValue)}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Year</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Start Value
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Annual Gain
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    End Value
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Cumulative Return
                  </th>
                </tr>
              </thead>
              <tbody>
                {timeline.map((row) => (
                  <tr key={row.year} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{row.year}</td>
                    <td className="px-4 py-3 text-right text-foreground">{fmt(row.startValue)}</td>
                    <td className="px-4 py-3 text-right text-green-500">+{fmt(row.gain)}</td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      {fmt(row.endValue)}
                    </td>
                    <td className="px-4 py-3 text-right text-primary">
                      {row.cumulativeReturn.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
