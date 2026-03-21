"use client";

import { useState } from "react";

function getSunriseSunset(lat: number, lng: number, date: Date) {
  const rad = Math.PI / 180;
  const N = Math.floor(275 * (date.getMonth() + 1) / 9) - Math.floor((date.getMonth() + 2 + 91) / 30) + date.getDate() - 30;
  const lngHour = lng / 15;
  const tRise = N + (6 - lngHour) / 24;
  const tSet = N + (18 - lngHour) / 24;

  const M = (0.9856 * tRise - 3.289) * rad;
  const L = (M / rad + 1.916 * Math.sin(M) + 0.020 * Math.sin(2 * M) + 282.634) % 360;
  const Lrad = L * rad;
  const sinDec = 0.39782 * Math.sin(Lrad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(90.833 * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
  if (cosH < -1 || cosH > 1) return null;

  const H = (360 - Math.acos(cosH) / rad) / 15;
  const RA = (Math.atan(0.91764 * Math.tan(Lrad)) / rad + 360) % 360;
  const Lquad = Math.floor(L / 90) * 90;
  const RAquad = Math.floor(RA / 90) * 90;
  const ra = (RA + Lquad - RAquad) / 15;

  const riseUT = H + ra - 0.06571 * tRise - 6.622 - lngHour;
  const setUT = ((360 - Math.acos(cosH) / rad) / 15) + ra - 0.06571 * tSet - 6.622 - lngHour;

  const toTime = (ut: number) => {
    const h = Math.floor(((ut % 24) + 24) % 24);
    const m = Math.round((((ut % 24) + 24) % 24 - h) * 60);
    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")} UTC`;
  };

  return { sunrise: toTime(riseUT), sunset: toTime(setUT) };
}

const CITIES: { name: string; lat: number; lng: number }[] = [
  { name: "New York", lat: 40.71, lng: -74.01 },
  { name: "London", lat: 51.51, lng: -0.13 },
  { name: "Los Angeles", lat: 34.05, lng: -118.24 },
  { name: "Tokyo", lat: 35.68, lng: 139.69 },
  { name: "Sydney", lat: -33.87, lng: 151.21 },
  { name: "Paris", lat: 48.85, lng: 2.35 },
];

export default function SunriseSunset() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [lat, setLat] = useState("40.71");
  const [lng, setLng] = useState("-74.01");
  const [city, setCity] = useState("New York");

  const setPreset = (c: typeof CITIES[0]) => { setCity(c.name); setLat(String(c.lat)); setLng(String(c.lng)); };
  const result = getSunriseSunset(Number(lat), Number(lng), new Date(date + "T12:00:00"));

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Quick Select City</label>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <button key={c.name} onClick={() => setPreset(c)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${city === c.name ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Latitude</label>
          <input value={lat} onChange={(e) => { setLat(e.target.value); setCity("Custom"); }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Longitude</label>
          <input value={lng} onChange={(e) => { setLng(e.target.value); setCity("Custom"); }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
        </div>
      </div>

      {result ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-muted p-5 text-center">
            <div className="text-4xl mb-2">🌅</div>
            <p className="text-sm text-muted-foreground">Sunrise</p>
            <p className="text-xl font-bold text-primary mt-1">{result.sunrise}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-5 text-center">
            <div className="text-4xl mb-2">🌇</div>
            <p className="text-sm text-muted-foreground">Sunset</p>
            <p className="text-xl font-bold text-primary mt-1">{result.sunset}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-4 text-center text-sm text-muted-foreground">
          No sunrise/sunset (polar day or night) for these coordinates.
        </div>
      )}
    </div>
  );
}
