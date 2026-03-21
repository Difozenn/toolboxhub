"use client";

import { useState } from "react";

interface LineItem { desc: string; qty: number; price: number; }

export default function InvoiceMaker() {
  const [company, setCompany] = useState("");
  const [client, setClient] = useState("");
  const [invoiceNum, setInvoiceNum] = useState("001");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [tax, setTax] = useState(10);
  const [items, setItems] = useState<LineItem[]>([{ desc: "", qty: 1, price: 0 }]);

  const updateItem = (i: number, field: keyof LineItem, val: string | number) => setItems((prev) => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  const addItem = () => setItems((prev) => [...prev, { desc: "", qty: 1, price: 0 }]);
  const removeItem = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i));

  const subtotal = items.reduce((s, { qty, price }) => s + qty * price, 0);
  const taxAmount = subtotal * (tax / 100);
  const total = subtotal + taxAmount;

  const fmt = (n: number) => n.toFixed(2);

  return (
    <div className="space-y-4 print:space-y-4">
      <div className="flex gap-2 print:hidden">
        <button onClick={() => window.print()} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Print / Save PDF</button>
      </div>
      <div className="rounded-xl border border-border bg-muted p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1"><label className="text-xs text-muted-foreground">Your Company</label><input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none" /></div>
          <div className="space-y-1"><label className="text-xs text-muted-foreground">Bill To</label><input type="text" value={client} onChange={(e) => setClient(e.target.value)} placeholder="Client Name" className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none" /></div>
          <div className="space-y-1"><label className="text-xs text-muted-foreground">Invoice #</label><input type="text" value={invoiceNum} onChange={(e) => setInvoiceNum(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none" /></div>
          <div className="space-y-1"><label className="text-xs text-muted-foreground">Date</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none" /></div>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left"><th className="pb-2 text-muted-foreground font-medium">Description</th><th className="pb-2 text-muted-foreground font-medium w-16 text-right">Qty</th><th className="pb-2 text-muted-foreground font-medium w-24 text-right">Price</th><th className="pb-2 text-muted-foreground font-medium w-24 text-right">Total</th><th className="w-8" /></tr></thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b border-border">
                <td className="py-2 pr-2"><input type="text" value={item.desc} onChange={(e) => updateItem(i, "desc", e.target.value)} placeholder="Item description" className="w-full rounded border border-border bg-background px-2 py-1 text-sm focus:border-primary focus:outline-none" /></td>
                <td className="py-2 px-1"><input type="number" min={1} value={item.qty} onChange={(e) => updateItem(i, "qty", Number(e.target.value))} className="w-full rounded border border-border bg-background px-2 py-1 text-sm text-right focus:border-primary focus:outline-none" /></td>
                <td className="py-2 px-1"><input type="number" min={0} step={0.01} value={item.price} onChange={(e) => updateItem(i, "price", Number(e.target.value))} className="w-full rounded border border-border bg-background px-2 py-1 text-sm text-right focus:border-primary focus:outline-none" /></td>
                <td className="py-2 pl-2 text-right font-mono">${fmt(item.qty * item.price)}</td>
                <td className="py-2 pl-1"><button onClick={() => removeItem(i)} className="text-muted-foreground hover:text-red-500 print:hidden">×</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addItem} className="text-sm text-primary hover:underline print:hidden">+ Add Item</button>
        <div className="flex justify-end">
          <div className="space-y-1 text-sm w-48">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${fmt(subtotal)}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Tax <input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))} className="w-12 rounded border border-border bg-background px-1 ml-1 text-center text-xs print:hidden focus:outline-none" />%</span><span>${fmt(taxAmount)}</span></div>
            <div className="flex justify-between border-t border-border pt-1 font-bold"><span>Total</span><span>${fmt(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
