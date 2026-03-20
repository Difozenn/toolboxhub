"use client";

import { useState, useCallback } from "react";

/* ── Hardcoded data arrays ──────────────────────────────────────── */

const FIRST_NAMES = [
  "James","Mary","Robert","Patricia","John","Jennifer","Michael","Linda",
  "David","Elizabeth","William","Barbara","Richard","Susan","Joseph","Jessica",
  "Thomas","Sarah","Christopher","Karen","Charles","Lisa","Daniel","Nancy",
  "Matthew","Betty","Anthony","Margaret","Mark","Sandra","Donald","Ashley",
  "Steven","Dorothy","Andrew","Kimberly","Paul","Emily","Joshua","Donna",
  "Kenneth","Michelle","Kevin","Carol","Brian","Amanda","George","Melissa",
  "Timothy","Deborah","Ronald","Stephanie","Edward","Rebecca","Jason","Sharon",
];

const LAST_NAMES = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis",
  "Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson",
  "Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson",
  "White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker",
  "Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill",
  "Flores","Green","Adams","Nelson","Baker","Hall","Rivera","Campbell",
];

const STREETS = [
  "Main St","Oak Ave","Maple Dr","Cedar Ln","Pine St","Elm St","Washington Ave",
  "Park Rd","Lake Dr","Hill St","River Rd","Forest Ave","Sunset Blvd",
  "Broadway","Market St","Church St","Spring St","Highland Ave","Meadow Ln",
  "Valley Dr","Ridge Rd","Garden Way","College Ave","Union St",
];

const CITIES = [
  "New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia",
  "San Antonio","San Diego","Dallas","San Jose","Austin","Jacksonville",
  "Fort Worth","Columbus","Charlotte","Indianapolis","San Francisco",
  "Seattle","Denver","Nashville","Portland","Memphis","Louisville",
  "Baltimore","Milwaukee","Albuquerque","Tucson","Fresno","Sacramento",
];

const STATES = [
  "CA","TX","FL","NY","PA","IL","OH","GA","NC","MI","NJ","VA","WA",
  "AZ","MA","TN","IN","MO","MD","WI","CO","MN","SC","AL","LA",
];

const COMPANIES = [
  "Apex Solutions","BrightPath Inc","CoreTech Systems","DataFlow Corp",
  "Echo Innovations","Frontier Labs","GlobalSync","HorizonWare",
  "InfiniCore","JetStream Digital","Keystone Analytics","Luminary Group",
  "Meridian Ventures","NovaStar Tech","Omnipoint Solutions","Pinnacle Systems",
  "Quantum Edge","Redline Industries","Skyward Partners","TrueNorth Digital",
  "Unity Dynamics","Vertex Labs","Wavelength Corp","Xenon Media",
];

const DOMAINS = [
  "gmail.com","yahoo.com","outlook.com","hotmail.com","mail.com",
  "proton.me","icloud.com","aol.com","fastmail.com","zoho.com",
];

/* ── Helpers ────────────────────────────────────────────────────── */

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPhone(): string {
  return `(${randInt(200, 999)}) ${randInt(200, 999)}-${String(randInt(0, 9999)).padStart(4, "0")}`;
}

function randomDate(): string {
  const y = randInt(1970, 2025);
  const m = String(randInt(1, 12)).padStart(2, "0");
  const d = String(randInt(1, 28)).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function randomUsername(first: string, last: string): string {
  const styles = [
    () => `${first.toLowerCase()}${last.toLowerCase()}${randInt(1, 999)}`,
    () => `${first.toLowerCase()}_${last.toLowerCase()}`,
    () => `${first[0].toLowerCase()}${last.toLowerCase()}${randInt(10, 99)}`,
    () => `${first.toLowerCase()}.${last.toLowerCase()}`,
  ];
  return pick(styles)();
}

interface FakeRecord {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  date: string;
  username: string;
}

function generateRecord(): FakeRecord {
  const firstName = pick(FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${pick(DOMAINS)}`,
    phone: randomPhone(),
    address: `${randInt(100, 9999)} ${pick(STREETS)}, ${pick(CITIES)}, ${pick(STATES)} ${String(randInt(10000, 99999))}`,
    company: pick(COMPANIES),
    date: randomDate(),
    username: randomUsername(firstName, lastName),
  };
}

type OutputFormat = "table" | "json" | "csv";

export default function FakeDataGenerator() {
  const [quantity, setQuantity] = useState(5);
  const [format, setFormat] = useState<OutputFormat>("table");
  const [data, setData] = useState<FakeRecord[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const records: FakeRecord[] = [];
    for (let i = 0; i < quantity; i++) {
      records.push(generateRecord());
    }
    setData(records);
    setCopied(false);
  }, [quantity]);

  const getExportText = useCallback((): string => {
    if (data.length === 0) return "";
    if (format === "json") return JSON.stringify(data, null, 2);
    if (format === "csv") {
      const headers = Object.keys(data[0]) as (keyof FakeRecord)[];
      const lines = [
        headers.join(","),
        ...data.map((r) => headers.map((h) => `"${r[h]}"`).join(",")),
      ];
      return lines.join("\n");
    }
    return "";
  }, [data, format]);

  const copyOutput = useCallback(async () => {
    const text = getExportText();
    if (text) {
      await navigator.clipboard.writeText(text);
    } else if (format === "table" && data.length > 0) {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [getExportText, format, data]);

  const headers: { key: keyof FakeRecord; label: string }[] = [
    { key: "fullName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "username", label: "Username" },
    { key: "company", label: "Company" },
    { key: "address", label: "Address" },
    { key: "date", label: "Date" },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-5">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.min(100, Math.max(1, Number(e.target.value))))
              }
              className="w-24 rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Output Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as OutputFormat)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="table">Table</option>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <button
            onClick={generate}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Generate Data
          </button>

          {data.length > 0 && (
            <button
              onClick={copyOutput}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copied ? "Copied!" : "Copy Output"}
            </button>
          )}
        </div>
      </div>

      {/* Output */}
      {data.length > 0 && format === "table" && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                {headers.map((h) => (
                  <th
                    key={h.key}
                    className="whitespace-nowrap px-4 py-3 text-left font-medium text-foreground"
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-b-0 hover:bg-muted/50"
                >
                  {headers.map((h) => (
                    <td
                      key={h.key}
                      className="whitespace-nowrap px-4 py-3 text-muted-foreground"
                    >
                      {row[h.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.length > 0 && (format === "json" || format === "csv") && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-all font-mono text-sm text-foreground">
            {getExportText()}
          </pre>
        </div>
      )}
    </div>
  );
}
