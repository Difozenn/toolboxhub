"use client";

import { useState } from "react";

export default function RentVsBuy() {
  const [monthlyRent, setMonthlyRent] = useState("1500");
  const [homePrice, setHomePrice] = useState("300000");
  const [downPaymentPct, setDownPaymentPct] = useState("20");
  const [mortgageRate, setMortgageRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [annualRentIncrease, setAnnualRentIncrease] = useState("3");
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.2");
  const [homeInsurance, setHomeInsurance] = useState("150");
  const [maintenancePct, setMaintenancePct] = useState("1");

  const calculate = () => {
    const price = parseFloat(homePrice);
    const rent = parseFloat(monthlyRent);
    const dp = parseFloat(downPaymentPct) / 100;
    const rate = parseFloat(mortgageRate) / 100;
    const n = parseFloat(years);
    const rentIncrease = parseFloat(annualRentIncrease) / 100;
    const taxRate = parseFloat(propertyTaxRate) / 100;
    const insurance = parseFloat(homeInsurance);
    const maintenance = parseFloat(maintenancePct) / 100;

    if ([price, rent, dp, rate, n].some(isNaN) || price <= 0 || rent <= 0 || n <= 0) return null;

    // Mortgage calculation
    const downPayment = price * dp;
    const loanAmount = price - downPayment;
    const monthlyRate = rate / 12;
    const totalPayments = n * 12;

    let monthlyMortgage = 0;
    if (monthlyRate > 0) {
      monthlyMortgage =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
      monthlyMortgage = loanAmount / totalPayments;
    }

    const monthlyPropertyTax = (price * taxRate) / 12;
    const monthlyMaintenance = (price * maintenance) / 12;
    const totalMonthlyBuying = monthlyMortgage + monthlyPropertyTax + insurance + monthlyMaintenance;

    // Total costs over time
    const totalMortgage = monthlyMortgage * totalPayments;
    const totalBuyingCost = downPayment + totalMortgage + (monthlyPropertyTax + insurance + monthlyMaintenance) * totalPayments;

    // Total rent over time with annual increases
    let totalRent = 0;
    let currentRent = rent;
    for (let year = 0; year < n; year++) {
      totalRent += currentRent * 12;
      currentRent *= 1 + rentIncrease;
    }

    // Find breakeven year
    let rentCumulative = 0;
    let buyCumulative = downPayment;
    let currentRentBE = rent;
    let breakevenYear: number | null = null;

    for (let year = 1; year <= n; year++) {
      rentCumulative += currentRentBE * 12;
      buyCumulative += totalMonthlyBuying * 12;
      currentRentBE *= 1 + rentIncrease;

      if (breakevenYear === null && buyCumulative <= rentCumulative) {
        breakevenYear = year;
      }
    }

    return {
      downPayment,
      loanAmount,
      monthlyMortgage,
      totalMonthlyBuying,
      totalBuyingCost,
      totalRent,
      savings: totalRent - totalBuyingCost,
      breakevenYear,
      monthlyPropertyTax,
      monthlyMaintenance,
    };
  };

  const result = calculate();

  const fmt = (v: number) =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const fmtDetailed = (v: number) =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Monthly Rent ($)
          </label>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Home Price ($)
          </label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Down Payment (%)
          </label>
          <input
            type="number"
            step="0.5"
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Mortgage Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={mortgageRate}
            onChange={(e) => setMortgageRate(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Loan Term (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Annual Rent Increase (%)
          </label>
          <input
            type="number"
            step="0.5"
            value={annualRentIncrease}
            onChange={(e) => setAnnualRentIncrease(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Property Tax Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={propertyTaxRate}
            onChange={(e) => setPropertyTaxRate(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Monthly Insurance ($)
          </label>
          <input
            type="number"
            value={homeInsurance}
            onChange={(e) => setHomeInsurance(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Annual Maintenance (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={maintenancePct}
            onChange={(e) => setMaintenancePct(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {result ? (
        <div className="space-y-4">
          {/* Monthly comparison */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Monthly Rent</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {fmtDetailed(parseFloat(monthlyRent))}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Monthly Buying Cost</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {fmtDetailed(result.totalMonthlyBuying)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Mortgage: {fmtDetailed(result.monthlyMortgage)} | Tax:{" "}
                {fmtDetailed(result.monthlyPropertyTax)} | Ins:{" "}
                {fmtDetailed(parseFloat(homeInsurance))} | Maint:{" "}
                {fmtDetailed(result.monthlyMaintenance)}
              </p>
            </div>
          </div>

          {/* Total costs */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">
                Total Rent ({years} yrs)
              </p>
              <p className="mt-1 text-2xl font-bold text-red-500">{fmt(result.totalRent)}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">
                Total Buying Cost ({years} yrs)
              </p>
              <p className="mt-1 text-2xl font-bold text-blue-500">
                {fmt(result.totalBuyingCost)}
              </p>
            </div>
          </div>

          {/* Verdict */}
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground">
              {result.savings > 0 ? "Buying Saves You" : "Renting Saves You"}
            </p>
            <p
              className={`mt-1 text-3xl font-bold ${
                result.savings > 0 ? "text-green-500" : "text-orange-500"
              }`}
            >
              {fmt(Math.abs(result.savings))}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              over {years} years
            </p>
          </div>

          {/* Details */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Down Payment</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {fmt(result.downPayment)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Loan Amount</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {fmt(result.loanAmount)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Breakeven Year</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {result.breakevenYear ? `Year ${result.breakevenYear}` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-8 text-center text-muted-foreground">
          Enter valid values to compare renting vs buying
        </div>
      )}
    </div>
  );
}
