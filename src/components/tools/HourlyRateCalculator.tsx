"use client";
import { useState } from "react";

export default function HourlyRateCalculator() {
  const [targetIncome, setTargetIncome] = useState("");
  const [taxRate, setTaxRate] = useState("25");
  const [billableHrs, setBillableHrs] = useState("30");
  const [weeksWorked, setWeeksWorked] = useState("48");
  const [expenses, setExpenses] = useState("0");

  const income = parseFloat(targetIncome)||0;
  const tax = parseFloat(taxRate)||0;
  const hrs = parseFloat(billableHrs)||1;
  const weeks = parseFloat(weeksWorked)||1;
  const exp = parseFloat(expenses)||0;

  const grossNeeded = income / (1 - tax/100);
  const totalCost = grossNeeded + exp;
  const annualBillableHrs = hrs * weeks;
  const hourlyRate = annualBillableHrs > 0 ? totalCost / annualBillableHrs : 0;
  const dayRate = hourlyRate * 8;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[["Target take-home ($/yr)",targetIncome,setTargetIncome,"Annual net income"],["Tax rate (%)",taxRate,setTaxRate,"Self-employment + income tax"],["Billable hours/week",billableHrs,setBillableHrs,"Realistic billable hours"],["Weeks worked/year",weeksWorked,setWeeksWorked,"Excluding vacation"],["Annual expenses ($)",expenses,setExpenses,"Software, equipment, etc."]].map(([label,val,setter,hint]) => (
          <div key={label as string} className={(label as string).includes("expenses")?"col-span-2":""}>
            <label className="text-xs font-medium text-muted-foreground">{label as string}</label>
            <input type="number" value={val as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)} placeholder={hint as string} min="0"
              className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>
      {income > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-center">
            <p className="text-xs text-muted-foreground">Minimum Hourly Rate</p>
            <p className="text-3xl font-bold text-primary">${hourlyRate.toFixed(2)}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted border border-border text-center">
            <p className="text-xs text-muted-foreground">Day Rate (8 hrs)</p>
            <p className="text-3xl font-bold text-foreground">${dayRate.toFixed(2)}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted border border-border">
            <p className="text-xs text-muted-foreground">Gross Revenue Needed</p>
            <p className="text-lg font-bold text-foreground">${totalCost.toLocaleString(undefined,{maximumFractionDigits:0})}/yr</p>
          </div>
          <div className="p-3 rounded-xl bg-muted border border-border">
            <p className="text-xs text-muted-foreground">Annual Billable Hours</p>
            <p className="text-lg font-bold text-foreground">{annualBillableHrs.toLocaleString()} hrs</p>
          </div>
        </div>
      )}
    </div>
  );
}
