/**
 * Generate PNG icons from the favicon SVG.
 * Run: npx tsx scripts/generate-icons.ts
 *
 * Uses canvas to render SVG -> PNG at various sizes.
 * Alternatively, you can manually export from the SVGs.
 */

// Since we can't use canvas in Node without a library,
// this script creates a simple HTML file you can open in a browser
// to download the PNG icons.

import * as fs from "fs";
import * as path from "path";

const html = `<!DOCTYPE html>
<html>
<head><title>Generate ToolboxHub Icons</title></head>
<body style="font-family: system-ui; padding: 40px; background: #f5f5f5;">
<h1>ToolboxHub Icon Generator</h1>
<p>Click each button to download the PNG icon.</p>
<div style="display: flex; gap: 24px; flex-wrap: wrap;">
${[16, 32, 48, 64, 128, 192, 512].map(size => `
  <div style="text-align: center;">
    <canvas id="c${size}" width="${size}" height="${size}" style="border: 1px solid #ddd; border-radius: 8px;"></canvas>
    <br><button onclick="download(${size})" style="margin-top: 8px; padding: 8px 16px; cursor: pointer;">
      Download ${size}x${size}
    </button>
  </div>
`).join("")}
</div>

<script>
const svgString = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#2563eb"/>
  <rect x="6" y="14" width="20" height="12" rx="2" fill="white" opacity="0.95"/>
  <rect x="5" y="12" width="22" height="4" rx="1.5" fill="white"/>
  <rect x="12" y="8" width="8" height="5" rx="1.5" fill="none" stroke="white" stroke-width="1.5"/>
  <rect x="14" y="18.5" width="4" height="4" rx="1" fill="#2563eb"/>
</svg>\`;

const sizes = [16, 32, 48, 64, 128, 192, 512];
const blob = new Blob([svgString], { type: "image/svg+xml" });
const url = URL.createObjectURL(blob);
const img = new Image();
img.onload = () => {
  sizes.forEach(size => {
    const canvas = document.getElementById("c" + size);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, size, size);
  });
};
img.src = url;

function download(size) {
  const canvas = document.getElementById("c" + size);
  const link = document.createElement("a");
  link.download = size <= 48 ? "favicon-" + size + ".png"
    : size === 192 ? "icon-192.png"
    : size === 512 ? "icon-512.png"
    : "icon-" + size + ".png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
</script>
</body>
</html>`;

const outPath = path.resolve(__dirname, "../public/generate-icons.html");
fs.writeFileSync(outPath, html, "utf-8");
console.log(`Open in browser to generate PNGs: ${outPath}`);
