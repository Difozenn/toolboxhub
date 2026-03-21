"use client";

import { useState } from "react";

interface Item { name: string; price: number; }

export default function ReceiptGenerator() {
  const [store, setStore] = useState("My Store");
  const [items, setItems] = useState<Item[]>([{ name: "Item 1", price: 10 }]);
  const [payment, setPayment] = useState("Cash");
  const [tax, setTax] = useState(8.5);

  const update = (i: number, field: keyof Item, val: string | number) =>
    setItems(items.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  const add = () => setItems([...items, { name: "", price: 0 }]);
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const taxAmount = subtotal * (tax / 100);
  const total = subtotal + taxAmount;
  const fmt = (n: number) => `$${n.toFixed(2)}`;
  const now = new Date().toLocaleString();

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1"><label className="text-xs text-muted-foreground">Store Name</label><input type="text" value={store} onChange={(e) => setStore(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-3 py-1.5 text-sm focus:border-primary focus:outline-none" /></div>
        <div className="space-y-1"><label className="text-xs text-muted-foreground">Payment Method</label>
          <select value={payment} onChange={(e) => setPayment(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none">
            {["Cash","Credit Card","Debit Card","PayPal","Venmo"].map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="space-y-1"><label className="text-xs text-muted-foreground">Tax Rate (%)</label><input type="number" min={0} max={30} step={0.1} value={tax} onChange={(e) => setTax(Number(e.target.value))} className="w-full rounded-lg border border-border bg-muted px-3 py-1.5 text-sm focus:border-primary focus:outline-none" /></div>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input type="text" value={item.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="Item name" className="flex-1 rounded-lg border border-border bg-muted px-3 py-1.5 text-sm focus:border-primary focus:outline-none" />
            <input type="number" value={item.price} onChange={(e) => update(i, "price", Number(e.target.value))} step={0.01} className="w-24 rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-right focus:border-primary focus:outline-none" />
            <button onClick={() => remove(i)} className="text-muted-foreground hover:text-red-500">×</button>
          </div>
        ))}
        <button onClick={add} className="text-sm text-primary hover:underline">+ Add Item</button>
      </div>
      <button onClick={() => window.print()} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 print:hidden">Print Receipt</button>
      <div className="rounded-xl border border-border bg-muted p-6 font-mono text-sm space-y-2">
        <p className="text-center font-bold text-lg">{store}</p>
        <p className="text-center text-xs text-muted-foreground">{now}</p>
        <div className="border-t border-dashed border-border my-2" />
        {items.map((item, i) => (
          <div key={i} className="flex justify-between"><span>{item.name}</span><span>{fmt(item.price)}</span></div>
        ))}
        <div className="border-t border-dashed border-border my-2" />
        <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
        <div className="flex justify-between text-muted-foreground"><span>Tax ({tax}%)</span><span>{fmt(taxAmount)}</span></div>
        <div className="border-t border-border my-1" />
        <div className="flex justify-between font-bold"><span>TOTAL</span><span>{fmt(total)}</span></div>
        <div className="border-t border-dashed border-border my-2" />
        <p className="text-center text-xs">Payment: {payment}</p>
        <p className="text-center text-xs text-muted-foreground">Thank you for your business!</p>
      </div>
    </div>
  );
}
