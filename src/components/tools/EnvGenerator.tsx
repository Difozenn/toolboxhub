"use client";
import { useState } from "react";
const templates: Record<string, [string, string, string][]> = {
  "Node.js": [["NODE_ENV", "development", "Environment (development/production/test)"], ["PORT", "3000", "Server port"], ["HOST", "0.0.0.0", "Server host"], ["LOG_LEVEL", "info", "Logging level"]],
  Database: [["DB_HOST", "localhost", "Database host"], ["DB_PORT", "5432", "Database port"], ["DB_NAME", "myapp", "Database name"], ["DB_USER", "postgres", "Database user"], ["DB_PASSWORD", "", "Database password"], ["DB_SSL", "false", "Enable SSL connection"]],
  JWT: [["JWT_SECRET", "", "Secret key for signing JWTs"], ["JWT_EXPIRES_IN", "7d", "JWT expiration time"], ["JWT_REFRESH_SECRET", "", "Refresh token secret"]],
  Redis: [["REDIS_HOST", "localhost", "Redis host"], ["REDIS_PORT", "6379", "Redis port"], ["REDIS_PASSWORD", "", "Redis password"]],
  Email: [["SMTP_HOST", "smtp.gmail.com", "SMTP server host"], ["SMTP_PORT", "587", "SMTP port"], ["SMTP_USER", "", "SMTP username"], ["SMTP_PASS", "", "SMTP password"], ["EMAIL_FROM", "noreply@example.com", "Sender email"]],
  AWS: [["AWS_ACCESS_KEY_ID", "", "AWS access key"], ["AWS_SECRET_ACCESS_KEY", "", "AWS secret key"], ["AWS_REGION", "us-east-1", "AWS region"], ["S3_BUCKET", "", "S3 bucket name"]],
};
export default function EnvGenerator() {
  const [selected, setSelected] = useState<string[]>(["Node.js"]);
  const toggle = (t: string) => setSelected(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t]);
  const lines: string[] = [];
  selected.forEach(s => {
    lines.push(`# ${s}`);
    templates[s].forEach(([k, v, c]) => lines.push(`${k}=${v} # ${c}`));
    lines.push("");
  });
  const output = lines.join("\n");
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Select Sections</label>
        <div className="flex flex-wrap gap-2">{Object.keys(templates).map(t => <button key={t} onClick={() => toggle(t)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${selected.includes(t) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"}`}>{t}</button>)}</div>
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between"><label className="text-sm font-medium text-foreground">.env Template</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-muted-foreground hover:text-foreground">Copy</button></div>
        <textarea readOnly value={output} rows={16} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
