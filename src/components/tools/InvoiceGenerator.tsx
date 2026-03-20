"use client";

import { useState, useCallback } from "react";

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
}

let nextId = 1;

function newLineItem(): LineItem {
  return { id: nextId++, description: "", quantity: 1, rate: 0 };
}

export default function InvoiceGenerator() {
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [dueDate, setDueDate] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [items, setItems] = useState<LineItem[]>([newLineItem()]);

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, newLineItem()]);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));
  }, []);

  const updateItem = useCallback(
    (id: number, field: keyof LineItem, value: string | number) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
      );
    },
    []
  );

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="space-y-6">
      {/* Print-specific styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-preview, #invoice-preview * { visibility: visible; }
          #invoice-preview { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>

      {/* Form */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-5 print:hidden">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Your Company */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Your Company</h3>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              placeholder="Company Address"
              rows={2}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Client */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Bill To</h3>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client Name"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              placeholder="Client Address"
              rows={2}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Invoice Details */}
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Invoice #
            </label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-36 rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Date
            </label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Tax %
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-20 rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Line Items */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Line Items</h3>
          {items.map((item) => (
            <div key={item.id} className="flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                  placeholder="Description"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="w-20">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(item.id, "quantity", Number(e.target.value))
                  }
                  placeholder="Qty"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="w-28">
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={item.rate}
                  onChange={(e) =>
                    updateItem(item.id, "rate", Number(e.target.value))
                  }
                  placeholder="Rate"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <p className="w-24 py-2 text-right font-mono text-sm text-foreground">
                ${fmt(item.quantity * item.rate)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-red-400 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addItem}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            + Add Item
          </button>
        </div>

        <button
          onClick={handlePrint}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Print Invoice
        </button>
      </div>

      {/* Invoice Preview */}
      <div
        id="invoice-preview"
        className="rounded-xl border border-border bg-white p-8 text-gray-900 dark:bg-white"
      >
        {/* Header */}
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {companyName || "Your Company"}
            </h2>
            <p className="mt-1 whitespace-pre-line text-sm text-gray-500">
              {companyAddress || "Company Address"}
            </p>
          </div>
          <div className="text-right">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              INVOICE
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              #{invoiceNumber}
            </p>
          </div>
        </div>

        {/* Dates & Client */}
        <div className="mb-8 grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Bill To
            </p>
            <p className="mt-1 font-medium text-gray-900">
              {clientName || "Client Name"}
            </p>
            <p className="whitespace-pre-line text-sm text-gray-500">
              {clientAddress || "Client Address"}
            </p>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Date
              </p>
              <p className="text-sm text-gray-700">{invoiceDate}</p>
            </div>
            {dueDate && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Due Date
                </p>
                <p className="text-sm text-gray-700">{dueDate}</p>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="py-2 text-left font-semibold text-gray-600">
                Description
              </th>
              <th className="py-2 text-right font-semibold text-gray-600 w-20">
                Qty
              </th>
              <th className="py-2 text-right font-semibold text-gray-600 w-28">
                Rate
              </th>
              <th className="py-2 text-right font-semibold text-gray-600 w-28">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 text-gray-700">
                  {item.description || "-"}
                </td>
                <td className="py-3 text-right text-gray-700">
                  {item.quantity}
                </td>
                <td className="py-3 text-right text-gray-700">
                  ${fmt(item.rate)}
                </td>
                <td className="py-3 text-right font-medium text-gray-900">
                  ${fmt(item.quantity * item.rate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-6 flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${fmt(subtotal)}</span>
            </div>
            {taxRate > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax ({taxRate}%)</span>
                <span>${fmt(tax)}</span>
              </div>
            )}
            <div className="flex justify-between border-t-2 border-gray-200 pt-2 text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${fmt(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
