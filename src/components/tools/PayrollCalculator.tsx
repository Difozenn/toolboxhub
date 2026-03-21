"use client";

import { useState } from "react";

export default function PayrollCalculator() {
  const [salary, setSalary] = useState("");
  const [federalTax, setFederalTax] = useState("22");
  const [stateTax, setStateTax] = useState("5");
  const [period, setPeriod] = useState<"annual" | "monthly" | "biweekly">("annual");
  const [result, setResult] = useState<{
    gross: number;
    federalTaxAmt: number;
    stateTaxAmt: number;
    socialSecurity: number;
    medicare: number;
    totalDeductions: number;
    netPay: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const gross = parseFloat(salary);
    const ft = parseFloat(federalTax) / 100;
    const st = parseFloat(stateTax) / 100;
    if (!gross || isNaN(ft) || isNaN(st)) return;
    const federalTaxAmt = gross * ft;
    const stateTaxAmt = gross * st;
    const socialSecurity = gross * 0.062;
    const medicare = gross * 0.0145;
    const totalDeductions = federalTaxAmt + stateTaxAmt + socialSecurity + medicare;
    const netPay = gross - totalDeductions;
    setResult({ gross, federalTaxAmt, stateTaxAmt, socialSecurity, medicare, totalDeductions, netPay });
  };

  const periodLabel = period === "annual" ? "yr" : period === "monthly" ? "mo" : "biweekly";
  const divisor = period === "annual" ? 1 : period === "monthly" ? 12 : 26;
  const fmt = (n: number) =>
    (n / divisor).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Annual Gross Salary ($)</label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="80000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Federal Tax Rate (%)</label>
          <input type="number" value={federalTax} onChange={(e) => setFederalTax(e.target.value)} placeholder="22" step="0.1" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">State Tax Rate (%)</label>
          <input type="number" value={stateTax} onChange={(e) => setStateTax(e.target.value)} placeholder="5" step="0.1" className={inputClass} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-foreground">Show per:</span>
        {(["annual", "monthly", "biweekly"] as const).map((p) => (
          <button key={p} onClick={() => setPeriod(p)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors capitalize ${period === p ? "bg-primary text-primary-foreground" : "border border-border bg-muted text-foreground hover:bg-primary/10"}`}>{p}</button>
        ))}
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Gross Pay ({periodLabel})</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.gross)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Federal Tax ({periodLabel})</p>
            <p className="text-2xl font-bold text-red-500">-${fmt(result.federalTaxAmt)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">State Tax ({periodLabel})</p>
            <p className="text-2xl font-bold text-red-500">-${fmt(result.stateTaxAmt)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Social Security ({periodLabel})</p>
            <p className="text-2xl font-bold text-red-400">-${fmt(result.socialSecurity)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Medicare ({periodLabel})</p>
            <p className="text-2xl font-bold text-red-400">-${fmt(result.medicare)}</p>
          </div>
          <div className="rounded-xl border border-border bg-primary/10 p-4 text-center">
            <p className="text-sm text-muted-foreground">Net Pay ({periodLabel})</p>
            <p className="text-2xl font-bold text-primary">${fmt(result.netPay)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
