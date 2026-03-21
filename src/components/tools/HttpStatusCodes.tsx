"use client";
import { useState } from "react";
const codes: [number, string, string, string][] = [
  [100,"Continue","Informational","The server received the request headers and the client should proceed."],
  [200,"OK","Success","The request was successful."],
  [201,"Created","Success","A resource was successfully created."],
  [204,"No Content","Success","The request succeeded but there is no content to return."],
  [301,"Moved Permanently","Redirect","The resource has been permanently moved to a new URL."],
  [302,"Found","Redirect","The resource temporarily resides at a different URL."],
  [304,"Not Modified","Redirect","The resource has not changed since the last request."],
  [400,"Bad Request","Client Error","The server cannot process the request due to a client error."],
  [401,"Unauthorized","Client Error","Authentication is required and has failed or not been provided."],
  [403,"Forbidden","Client Error","The server understood the request but refuses to authorize it."],
  [404,"Not Found","Client Error","The requested resource could not be found."],
  [405,"Method Not Allowed","Client Error","The HTTP method is not supported for this resource."],
  [409,"Conflict","Client Error","The request conflicts with the current state of the resource."],
  [422,"Unprocessable Entity","Client Error","The request was well-formed but semantically incorrect."],
  [429,"Too Many Requests","Client Error","The user has sent too many requests in a given time (rate limiting)."],
  [500,"Internal Server Error","Server Error","The server encountered an unexpected condition."],
  [502,"Bad Gateway","Server Error","The server received an invalid response from an upstream server."],
  [503,"Service Unavailable","Server Error","The server is temporarily unavailable."],
  [504,"Gateway Timeout","Server Error","The upstream server failed to respond in time."],
];
const catColors: Record<string, string> = { Informational: "bg-blue-500/10 text-blue-700 dark:text-blue-400", Success: "bg-green-500/10 text-green-700 dark:text-green-400", Redirect: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400", "Client Error": "bg-orange-500/10 text-orange-700 dark:text-orange-400", "Server Error": "bg-red-500/10 text-red-700 dark:text-red-400" };
export default function HttpStatusCodes() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = codes.filter(([code, name, cat]) => {
    const q = search.toLowerCase();
    const matchSearch = !q || code.toString().includes(q) || name.toLowerCase().includes(q);
    const matchCat = filter === "All" || cat === filter;
    return matchSearch && matchCat;
  });
  const cats = ["All", "Informational", "Success", "Redirect", "Client Error", "Server Error"];
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by code or name..." className="flex-1 rounded-lg border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <select value={filter} onChange={e => setFilter(e.target.value)} className="rounded-lg border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none">{cats.map(c => <option key={c}>{c}</option>)}</select>
      </div>
      <div className="space-y-2">
        {filtered.map(([code, name, cat, desc]) => (
          <div key={code} className="rounded-lg border border-border bg-muted p-4">
            <div className="flex items-start gap-3">
              <span className="font-mono text-2xl font-bold text-foreground">{code}</span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2"><span className="font-medium text-foreground">{name}</span><span className={`rounded-full px-2 py-0.5 text-xs ${catColors[cat]}`}>{cat}</span></div>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
