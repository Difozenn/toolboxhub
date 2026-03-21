import type { Tool } from "../types";

export const pdfTools: Tool[] = [
  { slug: "pdf-merge", name: "PDF Merger", description: "Merge multiple PDF files into a single PDF document.", category: "pdf", icon: "📑", keywords: ["merge pdf", "combine pdf", "join pdf", "pdf combiner"], subcategory: "merge",
    longDescription: "Combine multiple PDF files into a single document right in your browser. Drag and drop PDFs, rearrange their order, and merge them instantly. All processing happens locally — your files never leave your computer.",
    relatedSlugs: ["pdf-split", "pdf-compress", "pdf-to-image"]
  },
  { slug: "pdf-split", name: "PDF Splitter", description: "Split PDF files into individual pages or custom page ranges.", category: "pdf", icon: "✂️", keywords: ["split pdf", "pdf splitter", "extract pages", "pdf pages"], subcategory: "edit",
    relatedSlugs: ["pdf-merge", "pdf-compress", "pdf-to-image"]
  },
  { slug: "pdf-compress", name: "PDF Compressor", description: "Compress PDF files to reduce file size while keeping quality.", category: "pdf", icon: "📦", keywords: ["compress pdf", "pdf compressor", "reduce pdf size", "pdf optimizer"], subcategory: "edit",
    relatedSlugs: ["pdf-merge", "image-compressor", "pdf-split"]
  },
  { slug: "pdf-to-image", name: "PDF to Image Converter", description: "Convert PDF pages to PNG or JPG images.", category: "pdf", icon: "🖼️", keywords: ["pdf to image", "pdf to png", "pdf to jpg", "pdf converter"], subcategory: "convert",
    relatedSlugs: ["pdf-split", "image-compressor", "svg-to-png"]
  },
  { slug: "image-to-pdf", name: "Image to PDF Converter", description: "Convert images (JPG, PNG, WebP) to a PDF document.", category: "pdf", icon: "📄", keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photo to pdf"], subcategory: "convert",
    relatedSlugs: ["pdf-merge", "image-compressor", "pdf-to-image"]
  },
  { slug: "html-to-pdf", name: "HTML to PDF Converter", description: "Convert HTML content or web pages to PDF documents.", category: "pdf", icon: "🌐", keywords: ["html to pdf", "webpage to pdf", "print to pdf", "web to pdf"], subcategory: "convert",
    relatedSlugs: ["markdown-to-html", "pdf-merge", "html-prettifier"]
  },
  { slug: "pdf-page-numbers", name: "PDF Page Numberer", description: "Add page numbers to PDF documents with custom positioning.", category: "pdf", icon: "🔢", keywords: ["pdf page numbers", "add numbers pdf", "pdf numbering", "page numbering"], subcategory: "edit",
    relatedSlugs: ["pdf-merge", "pdf-split", "add-line-numbers"]
  },
  { slug: "pdf-watermark", name: "PDF Watermark", description: "Add text or image watermarks to PDF documents.", category: "pdf", icon: "💧", keywords: ["pdf watermark", "watermark pdf", "pdf stamp", "document watermark"], subcategory: "edit",
    relatedSlugs: ["image-watermark", "pdf-merge", "pdf-compress"]
  },
  { slug: "pdf-rotate", name: "PDF Page Rotator", description: "Rotate PDF pages by 90, 180, or 270 degrees.", category: "pdf", icon: "🔄", keywords: ["rotate pdf", "pdf rotator", "turn pdf", "pdf orientation"], subcategory: "edit",
    relatedSlugs: ["pdf-split", "pdf-merge", "image-rotator"]
  },
  { slug: "pdf-to-text", name: "PDF to Text Extractor", description: "Extract text content from PDF files.", category: "pdf", icon: "📃", keywords: ["pdf to text", "extract pdf text", "pdf reader", "pdf text"], subcategory: "convert",
    relatedSlugs: ["pdf-to-image", "html-to-text", "word-counter"]
  },
];
