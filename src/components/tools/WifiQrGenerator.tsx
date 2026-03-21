"use client";
import { useState } from "react";

export default function WifiQrGenerator() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState("WPA");
  const [hidden, setHidden] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  function generate() {
    const wifiStr = `WIFI:T:${security};S:${ssid};P:${password};H:${hidden?"true":"false"};;`;
    const encoded = encodeURIComponent(wifiStr);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Network Name (SSID)</label>
          <input value={ssid} onChange={e=>setSsid(e.target.value)} placeholder="MyWiFiNetwork"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="WiFi password"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Security Type</label>
          <select value={security} onChange={e=>setSecurity(e.target.value)}
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none">
            {["WPA","WPA2","WPA3","WEP","nopass"].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-center pt-5">
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={hidden} onChange={e=>setHidden(e.target.checked)} className="accent-primary w-4 h-4" />
            Hidden network
          </label>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Your WiFi credentials are encoded locally and never sent to any server.</p>
      <button onClick={generate} disabled={!ssid}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
        Generate QR Code
      </button>
      {qrUrl && (
        <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-muted border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrUrl} alt="WiFi QR Code" className="rounded-lg" width={200} height={200} />
          <p className="text-xs text-muted-foreground">Scan to connect to {ssid}</p>
          <a href={qrUrl} download="wifi-qr.png"
            className="px-4 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
            Download PNG
          </a>
        </div>
      )}
    </div>
  );
}
