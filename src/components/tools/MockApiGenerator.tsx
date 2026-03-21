"use client";
import { useState } from "react";

const PATTERNS: Record<string, {status: number; headers: Record<string,string>; body: object}> = {
  "200 Success": {status:200,headers:{"Content-Type":"application/json","X-Request-Id":"req_abc123"},body:{success:true,data:{id:1,name:"Example Item",createdAt:"2024-01-01T00:00:00Z"}}},
  "201 Created": {status:201,headers:{"Content-Type":"application/json","Location":"/api/items/1"},body:{success:true,data:{id:1},message:"Resource created successfully"}},
  "400 Bad Request": {status:400,headers:{"Content-Type":"application/json"},body:{success:false,error:{code:"VALIDATION_ERROR",message:"Invalid request",details:[{field:"email",message:"Invalid email format"}]}}},
  "401 Unauthorized": {status:401,headers:{"Content-Type":"application/json","WWW-Authenticate":"Bearer"},body:{success:false,error:{code:"UNAUTHORIZED",message:"Authentication required"}}},
  "404 Not Found": {status:404,headers:{"Content-Type":"application/json"},body:{success:false,error:{code:"NOT_FOUND",message:"The requested resource was not found"}}},
  "500 Server Error": {status:500,headers:{"Content-Type":"application/json"},body:{success:false,error:{code:"INTERNAL_ERROR",message:"An unexpected error occurred"}}},
};

export default function MockApiGenerator() {
  const [pattern, setPattern] = useState("200 Success");
  const [body, setBody] = useState(JSON.stringify(PATTERNS["200 Success"].body, null, 2));
  const p = PATTERNS[pattern];

  function selectPattern(key: string) {
    setPattern(key);
    setBody(JSON.stringify(PATTERNS[key].body, null, 2));
  }

  const statusColor = p.status < 300 ? "text-green-500" : p.status < 400 ? "text-blue-500" : p.status < 500 ? "text-yellow-500" : "text-red-500";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(PATTERNS).map(k => (
          <button key={k} onClick={() => selectPattern(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${pattern===k?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {k}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 p-3 rounded-xl bg-muted border border-border">
        <span className={`font-bold text-lg font-mono ${statusColor}`}>HTTP {p.status}</span>
        <span className="text-muted-foreground text-sm">•</span>
        {Object.entries(p.headers).map(([k,v]) => (
          <span key={k} className="text-xs bg-background px-2 py-1 rounded border border-border text-foreground font-mono">{k}: {v}</span>
        ))}
      </div>
      <textarea value={body} onChange={e=>setBody(e.target.value)} rows={8}
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      <button onClick={() => navigator.clipboard.writeText(body)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Copy Response Body
      </button>
    </div>
  );
}
