"use client";
import { useState } from "react";
const templates: Record<string, string> = {
  node: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]`,
  python: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "main.py"]`,
  go: `FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o main .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]`,
  nginx: `FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
  java: `FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY . .
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]`,
};
export default function DockerfileGenerator() {
  const [lang, setLang] = useState("node");
  const [output, setOutput] = useState(templates.node);
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Select Template</label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(templates).map(t => (
            <button key={t} onClick={() => { setLang(t); setOutput(templates[t]); }} className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${lang === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Dockerfile</label>
        <textarea value={output} onChange={e => setOutput(e.target.value)} rows={16} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <button onClick={() => navigator.clipboard.writeText(output)} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Copy Dockerfile</button>
    </div>
  );
}
