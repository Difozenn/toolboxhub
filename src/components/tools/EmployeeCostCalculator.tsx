"use client";

import { useState } from "react";

export default function EmployeeCostCalculator() {
  const [salary, setSalary] = useState(60000);
  const [benefits, setBenefits] = useState(20);
  const [employerTax, setEmployerTax] = useState(7.65);

  const benefitsAmount = salary * (benefits / 100);
  const taxAmount = salary * (employerTax / 100);
  const totalCost = salary + benefitsAmount + taxAmount;
  const monthlyCost = totalCost / 12;
  const hourlyCost = totalCost / 2080;

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Annual Salary ($)</label>
          <input type="number" min={0} value={salary} onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Benefits (%)</label>
          <input type="number" min={0} max={100} value={benefits} onChange={(e) => setBenefits(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          <p className="text-xs text-muted-foreground">Health, dental, vision, 401k, etc.</p>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Employer Tax Rate (%)</label>
          <input type="number" min={0} max={100} step={0.1} value={employerTax} onChange={(e) => setEmployerTax(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          <p className="text-xs text-muted-foreground">US default: 7.65% (FICA)</p>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-muted overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {[
              { label: "Base Salary", value: fmt(salary) },
              { label: `Benefits (${benefits}%)`, value: fmt(benefitsAmount) },
              { label: `Employer Taxes (${employerTax}%)`, value: fmt(taxAmount) },
            ].map(({ label, value }) => (
              <tr key={label} className="border-b border-border">
                <td className="px-4 py-2 text-muted-foreground">{label}</td>
                <td className="px-4 py-2 text-right font-mono text-foreground">{value}</td>
              </tr>
            ))}
            <tr className="bg-primary/5 font-semibold">
              <td className="px-4 py-3 text-primary">Total Annual Cost</td>
              <td className="px-4 py-3 text-right font-mono text-primary">{fmt(totalCost)}</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 text-muted-foreground">Monthly Cost</td>
              <td className="px-4 py-2 text-right font-mono text-foreground">{fmt(monthlyCost)}</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 text-muted-foreground">Hourly Cost (2080 hrs/yr)</td>
              <td className="px-4 py-2 text-right font-mono text-foreground">{fmt(hourlyCost)}/hr</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
