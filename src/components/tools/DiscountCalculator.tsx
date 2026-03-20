"use client";

import { useState, useMemo, useCallback } from "react";

export default function DiscountCalculator() {
  const [mode, setMode] = useState<"forward" | "reverse">("forward");
  // Forward mode
  const [originalPrice, setOriginalPrice] = useState("");
  const [discounts, setDiscounts] = useState<string[]>([""]);
  // Reverse mode
  const [finalPrice, setFinalPrice] = useState("");
  const [reverseDiscount, setReverseDiscount] = useState("");

  const [copied, setCopied] = useState(false);

  const addDiscount = useCallback(() => {
    setDiscounts((prev) => [...prev, ""]);
  }, []);

  const removeDiscount = useCallback((index: number) => {
    setDiscounts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateDiscount = useCallback((index: number, value: string) => {
    setDiscounts((prev) => prev.map((d, i) => (i === index ? value : d)));
  }, []);

  const forwardResult = useMemo(() => {
    const price = parseFloat(originalPrice);
    if (!price || price <= 0) return null;
    const validDiscounts = discounts.map((d) => parseFloat(d)).filter((d) => !isNaN(d) && d > 0);
    if (validDiscounts.length === 0) return null;

    let current = price;
    const steps: { discount: number; amount: number; priceAfter: number }[] = [];

    for (const disc of validDiscounts) {
      const discountAmount = current * (disc / 100);
      current -= discountAmount;
      steps.push({ discount: disc, amount: discountAmount, priceAfter: current });
    }

    const totalSavings = price - current;
    const effectiveDiscount = (totalSavings / price) * 100;

    return { finalPrice: current, totalSavings, effectiveDiscount, steps };
  }, [originalPrice, discounts]);

  const reverseResult = useMemo(() => {
    const price = parseFloat(finalPrice);
    const disc = parseFloat(reverseDiscount);
    if (!price || price <= 0 || isNaN(disc) || disc <= 0 || disc >= 100) return null;

    const original = price / (1 - disc / 100);
    const savings = original - price;

    return { originalPrice: original, savings };
  }, [finalPrice, reverseDiscount]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const copyResult = useCallback(async () => {
    const text =
      mode === "forward" && forwardResult
        ? `$${fmt(forwardResult.finalPrice)}`
        : mode === "reverse" && reverseResult
          ? `$${fmt(reverseResult.originalPrice)}`
          : "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [mode, forwardResult, reverseResult]);

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-border overflow-hidden">
        <button
          onClick={() => setMode("forward")}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            mode === "forward" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          Calculate Discount
        </button>
        <button
          onClick={() => setMode("reverse")}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            mode === "reverse" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          Find Original Price
        </button>
      </div>

      {mode === "forward" ? (
        <>
          {/* Original price */}
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Original Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="100.00"
              className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Discount percentages */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">Discount(s) (%)</label>
            {discounts.map((disc, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="number"
                  step="any"
                  value={disc}
                  onChange={(e) => updateDiscount(idx, e.target.value)}
                  placeholder={idx === 0 ? "20" : `Additional discount`}
                  className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {discounts.length > 1 && (
                  <button
                    onClick={() => removeDiscount(idx)}
                    className="rounded-lg border border-border bg-muted px-3 py-2 text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addDiscount}
              className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              + Add Another Discount
            </button>
          </div>

          {/* Forward results */}
          {forwardResult && (
            <div className="space-y-4">
              {forwardResult.steps.length > 1 && (
                <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
                  <h3 className="text-sm font-medium text-foreground">Discount Breakdown</h3>
                  {forwardResult.steps.map((step, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {idx + 1}. {step.discount}% off
                      </span>
                      <span className="text-foreground font-mono">
                        -${fmt(step.amount)} = ${fmt(step.priceAfter)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">You Save</p>
                  <p className="text-2xl font-bold text-green-500">${fmt(forwardResult.totalSavings)}</p>
                </div>
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
                  <p className="text-sm text-muted-foreground">Final Price</p>
                  <p className="text-2xl font-bold text-primary">${fmt(forwardResult.finalPrice)}</p>
                </div>
                <div className="rounded-xl border border-border bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">Effective Discount</p>
                  <p className="text-2xl font-bold text-foreground">{forwardResult.effectiveDiscount.toFixed(1)}%</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={copyResult}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  {copied ? "Copied!" : "Copy Final Price"}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Reverse mode */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Final Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={finalPrice}
                onChange={(e) => setFinalPrice(e.target.value)}
                placeholder="80.00"
                className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Discount Applied (%)</label>
              <input
                type="number"
                step="any"
                value={reverseDiscount}
                onChange={(e) => setReverseDiscount(e.target.value)}
                placeholder="20"
                className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {reverseResult && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
                <p className="text-sm text-muted-foreground">Original Price</p>
                <p className="text-2xl font-bold text-primary">${fmt(reverseResult.originalPrice)}</p>
              </div>
              <div className="rounded-xl border border-border bg-muted p-4 text-center">
                <p className="text-sm text-muted-foreground">Savings</p>
                <p className="text-2xl font-bold text-green-500">${fmt(reverseResult.savings)}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
