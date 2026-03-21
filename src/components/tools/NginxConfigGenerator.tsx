"use client";
import { useState } from "react";
export default function NginxConfigGenerator() {
  const [domain, setDomain] = useState("example.com");
  const [port, setPort] = useState("3000");
  const [ssl, setSsl] = useState(true);
  const [root, setRoot] = useState("/var/www/html");
  const config = ssl ? `server {
    listen 80;
    server_name ${domain} www.${domain};
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${domain} www.${domain};

    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root ${root};
    index index.html index.htm;

    location / {
        proxy_pass http://localhost:${port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}` : `server {
    listen 80;
    server_name ${domain} www.${domain};
    root ${root};
    index index.html;

    location / {
        proxy_pass http://localhost:${port};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`;
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Domain Name</label><input value={domain} onChange={e => setDomain(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">App Port</label><input value={port} onChange={e => setPort(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Web Root</label><input value={root} onChange={e => setRoot(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div className="flex items-center gap-3 pt-6"><input type="checkbox" id="ssl" checked={ssl} onChange={e => setSsl(e.target.checked)} className="h-4 w-4" /><label htmlFor="ssl" className="text-sm font-medium text-foreground">Enable SSL (Let's Encrypt)</label></div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Nginx Config</label>
        <textarea readOnly value={config} rows={20} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground" />
      </div>
      <button onClick={() => navigator.clipboard.writeText(config)} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Copy Config</button>
    </div>
  );
}
