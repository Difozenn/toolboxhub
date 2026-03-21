"use client";
import { useState } from "react";

const PORTS = [
  {port:20,proto:"TCP",service:"FTP Data",desc:"File Transfer Protocol data"},
  {port:21,proto:"TCP",service:"FTP Control",desc:"File Transfer Protocol control"},
  {port:22,proto:"TCP",service:"SSH",desc:"Secure Shell remote access"},
  {port:23,proto:"TCP",service:"Telnet",desc:"Telnet remote access (unencrypted)"},
  {port:25,proto:"TCP",service:"SMTP",desc:"Simple Mail Transfer Protocol"},
  {port:53,proto:"TCP/UDP",service:"DNS",desc:"Domain Name System"},
  {port:80,proto:"TCP",service:"HTTP",desc:"Hypertext Transfer Protocol"},
  {port:110,proto:"TCP",service:"POP3",desc:"Post Office Protocol v3"},
  {port:143,proto:"TCP",service:"IMAP",desc:"Internet Message Access Protocol"},
  {port:443,proto:"TCP",service:"HTTPS",desc:"HTTP Secure (TLS)"},
  {port:465,proto:"TCP",service:"SMTPS",desc:"SMTP over TLS"},
  {port:587,proto:"TCP",service:"SMTP Submission",desc:"Email submission"},
  {port:993,proto:"TCP",service:"IMAPS",desc:"IMAP over TLS"},
  {port:995,proto:"TCP",service:"POP3S",desc:"POP3 over TLS"},
  {port:3000,proto:"TCP",service:"Dev Server",desc:"Common Node.js/React dev server"},
  {port:3306,proto:"TCP",service:"MySQL",desc:"MySQL database server"},
  {port:5432,proto:"TCP",service:"PostgreSQL",desc:"PostgreSQL database"},
  {port:5601,proto:"TCP",service:"Kibana",desc:"Elasticsearch Kibana dashboard"},
  {port:6379,proto:"TCP",service:"Redis",desc:"Redis in-memory data store"},
  {port:8080,proto:"TCP",service:"HTTP Alt",desc:"Alternative HTTP port"},
  {port:8443,proto:"TCP",service:"HTTPS Alt",desc:"Alternative HTTPS port"},
  {port:9200,proto:"TCP",service:"Elasticsearch",desc:"Elasticsearch REST API"},
  {port:27017,proto:"TCP",service:"MongoDB",desc:"MongoDB database server"},
];

export default function PortNumberReference() {
  const [query, setQuery] = useState("");
  const filtered = PORTS.filter(p =>
    !query || p.port.toString().includes(query) || p.service.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by port number or service name..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              {["Port","Protocol","Service","Description"].map(h => (
                <th key={h} className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p,i) => (
              <tr key={p.port} className={`border-t border-border ${i%2===0?"bg-background":"bg-muted/30"}`}>
                <td className="px-3 py-2">
                  <button onClick={() => navigator.clipboard.writeText(String(p.port))}
                    className="font-mono font-bold text-primary hover:underline">{p.port}</button>
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{p.proto}</td>
                <td className="px-3 py-2 font-medium text-foreground">{p.service}</td>
                <td className="px-3 py-2 text-muted-foreground text-xs">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center py-4 text-muted-foreground text-sm">No ports found</p>}
      </div>
    </div>
  );
}
