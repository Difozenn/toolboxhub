"use client";
import { useState } from "react";
const mimes: Record<string, [string, string]> = {
  ".html": ["text/html", "Web pages"],
  ".css": ["text/css", "Stylesheets"],
  ".js": ["application/javascript", "JavaScript files"],
  ".json": ["application/json", "JSON data"],
  ".xml": ["application/xml", "XML data"],
  ".pdf": ["application/pdf", "PDF documents"],
  ".zip": ["application/zip", "ZIP archives"],
  ".tar": ["application/x-tar", "TAR archives"],
  ".gz": ["application/gzip", "GZip archives"],
  ".png": ["image/png", "PNG images"],
  ".jpg": ["image/jpeg", "JPEG images"],
  ".gif": ["image/gif", "GIF images"],
  ".svg": ["image/svg+xml", "SVG vector images"],
  ".webp": ["image/webp", "WebP images"],
  ".ico": ["image/x-icon", "Icon files"],
  ".mp4": ["video/mp4", "MP4 video"],
  ".webm": ["video/webm", "WebM video"],
  ".mp3": ["audio/mpeg", "MP3 audio"],
  ".wav": ["audio/wav", "WAV audio"],
  ".ogg": ["audio/ogg", "Ogg audio"],
  ".woff": ["font/woff", "Web font WOFF"],
  ".woff2": ["font/woff2", "Web font WOFF2"],
  ".ttf": ["font/ttf", "TrueType font"],
  ".csv": ["text/csv", "CSV data"],
  ".txt": ["text/plain", "Plain text"],
  ".md": ["text/markdown", "Markdown files"],
  ".yaml": ["application/yaml", "YAML data"],
  ".toml": ["application/toml", "TOML data"],
};
export default function MimeTypeLookup() {
  const [search, setSearch] = useState("");
  const q = search.toLowerCase();
  const filtered = Object.entries(mimes).filter(([ext, [mime, desc]]) => !q || ext.includes(q) || mime.includes(q) || desc.toLowerCase().includes(q));
  return (
    <div className="space-y-4">
      <div><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by extension, MIME type, or description..." className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-3 gap-2 bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">
          <span>Extension</span><span>MIME Type</span><span>Description</span>
        </div>
        {filtered.map(([ext, [mime, desc]]) => (
          <div key={ext} className="grid grid-cols-3 gap-2 px-4 py-3 hover:bg-muted/50">
            <span className="font-mono text-sm font-medium text-foreground">{ext}</span>
            <span className="font-mono text-sm text-muted-foreground break-all">{mime}</span>
            <span className="text-sm text-muted-foreground">{desc}</span>
          </div>
        ))}
        {filtered.length === 0 && <p className="px-4 py-6 text-center text-sm text-muted-foreground">No MIME types match your search.</p>}
      </div>
    </div>
  );
}
