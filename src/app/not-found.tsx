import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | ToolboxHub",
  description: "The page you're looking for doesn't exist. Browse 500+ free online tools or search for what you need.",
};

const popularTools = [
  { slug: "json-formatter", name: "JSON Formatter", icon: "📋" },
  { slug: "base64-encoder", name: "Base64 Encoder", icon: "🔤" },
  { slug: "word-counter", name: "Word Counter", icon: "📝" },
  { slug: "image-compressor", name: "Image Compressor", icon: "🖼️" },
  { slug: "password-strength", name: "Password Checker", icon: "🔐" },
  { slug: "color-converter", name: "Color Converter", icon: "🎨" },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          Browse All Tools
        </Link>
        <Link
          href="/categories"
          className="rounded-lg border border-border bg-muted px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
        >
          View Categories
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-border bg-muted px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
        >
          Read Blog
        </Link>
      </div>

      <div className="mt-12">
        <p className="text-sm font-medium text-muted-foreground mb-4">Popular tools:</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {popularTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="flex items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted"
            >
              <span className="text-xl">{tool.icon}</span>
              <span className="text-sm font-medium text-foreground">{tool.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
