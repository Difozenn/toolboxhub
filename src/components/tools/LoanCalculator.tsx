"use client";

import { useState, useMemo } from "react";

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [termUnit, setTermUnit] = useState<"years" | "months">("years");
  const [showAmortization, setShowAmortization] = useState(false);

  const result = useMemo(() => {
    const p = parseFloat(amount);
    const r = parseFloat(rate);
    const t = parseFloat(term);
    if (!p || p <= 0 || isNaN(r) || r < 0 || !t || t <= 0) return null;

    const totalMonths = termUnit === "years" ? t * 12 : t;
    const monthlyRate = r / 100 / 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = p / totalMonths;
    } else {
      monthlyPayment =
        (p * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - p;

    // Amortization
    const schedule: AmortizationRow[] = [];
    let balance = p;
    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance = Math.max(0, balance - principalPayment);
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance,
      });
    }

    const principalPct = (p / totalPayment) * 100;
    const interestPct = (totalInterest / totalPayment) * 100;

    return { monthlyPayment, totalPayment, totalInterest, schedule, principalPct, interestPct };
  }, [amount, rate, term, termUnit]);

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Loan Amount ($)</label>
          <input
            type="number"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="250000"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Interest Rate (%)</label>
          <input
            type="number"
            step="any"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="6.5"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Loan Term
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="30"
              className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <select
              value={termUnit}
              onChange={(e) => setTermUnit(e.target.value as "years" | "months")}
              className="rounded-lg border border-border bg-muted px-2 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>
      </div>

      {result && (
        <>
          {/* Results */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Monthly Payment</p>
              <p className="text-2xl font-bold text-primary">${fmt(result.monthlyPayment)}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Payment</p>
              <p className="text-2xl font-bold text-foreground">${fmt(result.totalPayment)}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Interest</p>
              <p className="text-2xl font-bold text-red-500">${fmt(result.totalInterest)}</p>
            </div>
          </div>

          {/* Visual pie chart using CSS conic-gradient */}
          <div className="rounded-xl border border-border bg-muted p-5">
            <h3 className="text-sm font-medium text-foreground mb-4 text-center">Principal vs Interest</h3>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div
                className="w-36 h-36 rounded-full"
                style={{
                  background: `conic-gradient(
                    var(--color-primary, #6366f1) 0deg ${result.principalPct * 3.6}deg,
                    #ef4444 ${result.principalPct * 3.6}deg 360deg
                  )`,
                }}
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">
                    Principal: ${fmt(parseFloat(amount))} ({result.principalPct.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm text-foreground">
                    Interest: ${fmt(result.totalInterest)} ({result.interestPct.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Amortization toggle */}
          <div>
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {showAmortization ? "Hide" : "Show"} Amortization Schedule
            </button>
          </div>

          {showAmortization && (
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-muted">
                    <tr className="border-b border-border">
                      <th className="px-3 py-2 text-left text-muted-foreground font-medium">#</th>
                      <th className="px-3 py-2 text-right text-muted-foreground font-medium">Payment</th>
                      <th className="px-3 py-2 text-right text-muted-foreground font-medium">Principal</th>
                      <th className="px-3 py-2 text-right text-muted-foreground font-medium">Interest</th>
                      <th className="px-3 py-2 text-right text-muted-foreground font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row) => (
                      <tr key={row.month} className="border-b border-border/50 hover:bg-primary/5">
                        <td className="px-3 py-2 text-foreground">{row.month}</td>
                        <td className="px-3 py-2 text-right font-mono text-foreground">${fmt(row.payment)}</td>
                        <td className="px-3 py-2 text-right font-mono text-foreground">${fmt(row.principal)}</td>
                        <td className="px-3 py-2 text-right font-mono text-muted-foreground">${fmt(row.interest)}</td>
                        <td className="px-3 py-2 text-right font-mono text-foreground">${fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
