/**
 * Auto-discovery script: scans src/components/tools/ for component files
 * and generates a typed import map at src/lib/generated/tool-components.ts
 *
 * Run: npx tsx scripts/generate-tool-registry.ts
 * Or via: npm run prebuild
 */

import * as fs from "fs";
import * as path from "path";

const TOOLS_DIR = path.resolve(__dirname, "../src/components/tools");
const OUTPUT_FILE = path.resolve(__dirname, "../src/lib/generated/tool-components.ts");

function toSlug(filename: string): string {
  // PascalCase to kebab-case: "WordCounter.tsx" -> "word-counter"
  return filename
    .replace(/\.tsx$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function toPascalCase(filename: string): string {
  return filename.replace(/\.tsx$/, "");
}

function main() {
  if (!fs.existsSync(TOOLS_DIR)) {
    console.error(`Tools directory not found: ${TOOLS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(TOOLS_DIR).filter((f) => f.endsWith(".tsx"));
  console.log(`Found ${files.length} tool components`);

  const entries = files.map((file) => ({
    slug: toSlug(file),
    componentName: toPascalCase(file),
    file,
  }));

  const lines = [
    '/* AUTO-GENERATED — do not edit manually */',
    '/* Run: npx tsx scripts/generate-tool-registry.ts */',
    '',
    'import dynamic from "next/dynamic";',
    'import type { ComponentType } from "react";',
    '',
    'export const toolComponents: Record<string, ComponentType> = {',
  ];

  for (const entry of entries) {
    lines.push(
      `  "${entry.slug}": dynamic(() => import("@/components/tools/${entry.componentName}")),`,
    );
  }

  lines.push("};");
  lines.push("");

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, lines.join("\n"), "utf-8");
  console.log(`Generated ${OUTPUT_FILE} with ${entries.length} entries`);
}

main();
