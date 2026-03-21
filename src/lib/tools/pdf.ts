import type { Tool } from "../types";

export const pdfTools: Tool[] = [
  { slug: "pdf-merge", name: "PDF Merger", description: "Merge multiple PDF files into a single PDF document.", category: "pdf", icon: "📑", keywords: ["merge pdf", "combine pdf", "join pdf", "pdf combiner"], subcategory: "merge",
    longDescription: "Combine multiple PDF files into a single document right in your browser. Drag and drop PDFs, rearrange their order, and merge them instantly. All processing happens locally — your files never leave your computer.",
    faqs: [
      { question: "How many PDF files can I merge at once?", answer: "You can merge as many PDF files as you need in a single operation. Simply drag and drop all the files into the tool and arrange them in the desired order before merging." },
      { question: "Are my PDF files uploaded to a server?", answer: "No — all merging happens entirely in your browser using client-side processing. Your files never leave your device and are never uploaded to any server." },
      { question: "Will merging PDFs reduce the quality of images inside them?", answer: "No, the merger combines your PDFs without re-compressing or altering the content. Images and text retain their original quality in the output file." }
    ],
    howToSteps: [
      { name: "Upload your PDF files", text: "Click the upload area or drag and drop all the PDF files you want to combine into the tool." },
      { name: "Arrange the page order", text: "Drag the uploaded files into the order you want them to appear in the final merged document." },
      { name: "Merge and download", text: "Click 'Merge PDFs' and then download the single combined PDF file to your device." }
    ],
    useCases: [
      "Combining multiple report chapters into a single PDF for distribution",
      "Merging scanned document pages into one complete PDF file",
      "Consolidating invoices or receipts into a single PDF for expense reporting",
      "Joining multiple presentation exports into one shareable PDF deck"
    ],
    relatedSlugs: ["pdf-split", "pdf-compress", "pdf-to-image"]
  },
  { slug: "pdf-split", name: "PDF Splitter", description: "Split PDF files into individual pages or custom page ranges.", category: "pdf", icon: "✂️", keywords: ["split pdf", "pdf splitter", "extract pages", "pdf pages"], subcategory: "edit",
    longDescription: "The PDF Splitter lets you extract individual pages or custom page ranges from any PDF file, right in your browser without uploading anything to a server. Split by every page, define specific ranges, or extract just the pages you need — all processed locally for complete privacy.",
    faqs: [
      { question: "Can I extract specific pages from the middle of a PDF?", answer: "Yes — you can define any custom page range such as pages 3–7 or extract non-contiguous pages individually, giving you complete control over which pages to include in the output." },
      { question: "Does splitting a PDF affect the quality of the content?", answer: "No, splitting is a non-destructive operation. The text, images, and formatting of each extracted page remain identical to the original." },
      { question: "Can I split a PDF into individual single-page files?", answer: "Yes — choose the 'Split every page' option to export each page of the PDF as its own separate file, all downloaded in a ZIP archive." }
    ],
    howToSteps: [
      { name: "Upload your PDF file", text: "Drag and drop or click to select the PDF you want to split." },
      { name: "Define your split method", text: "Choose to split every page into individual files, or enter specific page ranges such as '1-3, 5, 8-10'." },
      { name: "Download the split files", text: "Click 'Split PDF' and download your extracted pages as separate PDF files or a ZIP archive." }
    ],
    useCases: [
      "Extracting specific contract pages to share without the full document",
      "Breaking a large scanned book PDF into individual chapter files",
      "Isolating a single page from a multi-page form to fill out separately",
      "Separating a combined invoice PDF back into individual invoices"
    ],
    relatedSlugs: ["pdf-merge", "pdf-compress", "pdf-to-image"]
  },
  { slug: "pdf-compress", name: "PDF Compressor", description: "Compress PDF files to reduce file size while keeping quality.", category: "pdf", icon: "📦", keywords: ["compress pdf", "pdf compressor", "reduce pdf size", "pdf optimizer"], subcategory: "edit",
    longDescription: "The PDF Compressor reduces your PDF file size by optimizing embedded images, removing redundant data, and applying efficient compression — all without sacrificing readability. It runs entirely in your browser, so your sensitive documents stay on your device throughout the process.",
    faqs: [
      { question: "How much can PDF compression reduce file size?", answer: "Compression savings vary by content — PDFs with many high-resolution photos can be reduced by 50–80%, while text-heavy PDFs with few images may see more modest reductions of 10–30%." },
      { question: "Will compression make text or images blurry?", answer: "The tool offers multiple compression levels. The 'balanced' setting reduces size significantly while keeping text sharp and images visually acceptable. The 'maximum' setting achieves the smallest file size but may reduce image quality." },
      { question: "Is there a file size limit?", answer: "The compressor handles PDFs up to 100 MB. For very large files, the processing may take a few seconds longer as everything runs locally in your browser." }
    ],
    howToSteps: [
      { name: "Upload your PDF", text: "Drag and drop your PDF file or click to browse and select it from your device." },
      { name: "Choose a compression level", text: "Select your preferred compression level — low (best quality), balanced, or maximum (smallest file size)." },
      { name: "Download the compressed PDF", text: "Click 'Compress' and download the optimized PDF. The tool displays the original and new file sizes so you can see exactly how much was saved." }
    ],
    useCases: [
      "Reducing large PDF attachments to fit within email size limits",
      "Optimizing PDFs for faster loading on websites and online portals",
      "Shrinking scanned document PDFs before uploading to cloud storage",
      "Making large presentation PDFs easier to share with clients"
    ],
    relatedSlugs: ["pdf-merge", "image-compressor", "pdf-split"]
  },
  { slug: "pdf-to-image", name: "PDF to Image Converter", description: "Convert PDF pages to PNG or JPG images.", category: "pdf", icon: "🖼️", keywords: ["pdf to image", "pdf to png", "pdf to jpg", "pdf converter"], subcategory: "convert",
    longDescription: "The PDF to Image Converter transforms each page of your PDF into a high-resolution PNG or JPG image, entirely within your browser. Choose your output format and resolution, convert individual pages or the full document, and download the results as separate image files or a ZIP archive.",
    faqs: [
      { question: "What image formats can I export PDF pages to?", answer: "You can export PDF pages as PNG (lossless, best for text and graphics) or JPG (smaller file size, best for photo-heavy pages). Choose based on your intended use." },
      { question: "What resolution are the converted images?", answer: "The tool converts at 150 DPI by default for a good balance of quality and file size, with an option to increase to 300 DPI for print-quality output." },
      { question: "Can I convert only specific pages instead of the whole document?", answer: "Yes — enter the page numbers or ranges you want to convert rather than processing the entire PDF, saving time on large documents." }
    ],
    howToSteps: [
      { name: "Upload your PDF", text: "Click or drag and drop your PDF file into the conversion tool." },
      { name: "Select format and resolution", text: "Choose PNG or JPG as the output format and select your desired resolution (standard or high-DPI)." },
      { name: "Convert and download", text: "Click 'Convert' and download each page as a separate image file, or download all pages at once in a ZIP archive." }
    ],
    useCases: [
      "Extracting cover images from PDF documents for use in websites or emails",
      "Converting PDF slides to images for embedding in presentations or web pages",
      "Creating image previews of PDF files for thumbnails in document management systems",
      "Sharing specific PDF pages as images on social media"
    ],
    relatedSlugs: ["pdf-split", "image-compressor", "svg-to-png"]
  },
  { slug: "image-to-pdf", name: "Image to PDF Converter", description: "Convert images (JPG, PNG, WebP) to a PDF document.", category: "pdf", icon: "📄", keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photo to pdf"], subcategory: "convert",
    longDescription: "Image to PDF Converter lets you turn one or more JPG, PNG, or WebP images into a single PDF document instantly in your browser. Drag multiple images, reorder them, choose your page orientation and size, and download the finished PDF — no uploads, no registration, no watermarks.",
    faqs: [
      { question: "Can I combine multiple images into a single PDF?", answer: "Yes — upload as many images as you need, arrange them in the desired order, and the tool will compile them all into a single multi-page PDF document." },
      { question: "What image formats are supported?", answer: "The converter supports JPG, JPEG, PNG, and WebP image formats. Each image becomes one page in the output PDF." },
      { question: "Can I choose the PDF page size and orientation?", answer: "Yes — you can select standard page sizes such as A4 or Letter, and choose between portrait and landscape orientation before converting." }
    ],
    howToSteps: [
      { name: "Upload your images", text: "Click to browse or drag and drop one or more JPG, PNG, or WebP images into the tool." },
      { name: "Arrange and configure", text: "Reorder the images as needed and select your preferred page size and orientation." },
      { name: "Convert and download", text: "Click 'Convert to PDF' to generate the document and download it to your device." }
    ],
    useCases: [
      "Scanning paper documents with a phone camera and converting the photos to PDF",
      "Combining multiple product photos into a single PDF catalog",
      "Turning a series of screenshot images into a presentable PDF report",
      "Creating a PDF portfolio from individual image files"
    ],
    relatedSlugs: ["pdf-merge", "image-compressor", "pdf-to-image"]
  },
  { slug: "html-to-pdf", name: "HTML to PDF Converter", description: "Convert HTML content or web pages to PDF documents.", category: "pdf", icon: "🌐", keywords: ["html to pdf", "webpage to pdf", "print to pdf", "web to pdf"], subcategory: "convert",
    longDescription: "The HTML to PDF Converter transforms raw HTML markup or a live web page URL into a downloadable PDF document, preserving layout, fonts, and styling. It's useful for generating reports from HTML templates, archiving web pages, or creating printable versions of online content.",
    faqs: [
      { question: "Can I convert a live website URL to PDF?", answer: "Yes — paste a URL into the converter and it will render the page and export it as a PDF, capturing the page as it appears in a browser." },
      { question: "Will the PDF preserve CSS styling and fonts?", answer: "The converter renders HTML with CSS styles applied, so most layouts, colors, and fonts are preserved. Complex CSS animations or JavaScript-driven content may not render exactly as on screen." },
      { question: "Can I paste raw HTML code to convert?", answer: "Yes — paste your HTML markup directly into the editor field instead of a URL and click convert to generate a PDF from that code." }
    ],
    howToSteps: [
      { name: "Enter HTML or a URL", text: "Paste your HTML code into the editor or enter a web page URL you want to convert." },
      { name: "Configure PDF options", text: "Choose page size, orientation, and margin settings to control how the content fits onto the PDF pages." },
      { name: "Convert and download", text: "Click 'Convert to PDF' to generate the document and save it to your device." }
    ],
    useCases: [
      "Generating PDF reports from dynamically built HTML templates",
      "Archiving web articles or documentation pages as offline PDF files",
      "Creating printable receipts or invoices from HTML email templates",
      "Exporting web-based dashboards or tables as PDF documents for sharing"
    ],
    relatedSlugs: ["markdown-to-html", "pdf-merge", "html-prettifier"]
  },
  { slug: "pdf-page-numbers", name: "PDF Page Numberer", description: "Add page numbers to PDF documents with custom positioning.", category: "pdf", icon: "🔢", keywords: ["pdf page numbers", "add numbers pdf", "pdf numbering", "page numbering"], subcategory: "edit",
    longDescription: "PDF Page Numberer lets you stamp sequential page numbers onto any PDF document with full control over position, font, size, and starting number. Whether you need classic footer numbers or header-positioned counts, the tool processes your file locally and delivers a numbered PDF instantly.",
    faqs: [
      { question: "Where can I position the page numbers on the PDF?", answer: "You can place page numbers at the bottom center, bottom left, bottom right, top center, top left, or top right of each page." },
      { question: "Can I start numbering from a page other than 1?", answer: "Yes — you can set any starting number, which is useful when your PDF is part of a larger document and needs to continue the page count from a previous section." },
      { question: "Can I skip numbering on the first page for a cover?", answer: "Yes — you can choose to exclude page numbers from the first page (or any specified number of initial pages) so a title or cover page remains unnumbered." }
    ],
    howToSteps: [
      { name: "Upload your PDF", text: "Select or drag and drop the PDF you want to add page numbers to." },
      { name: "Configure numbering options", text: "Choose the position, font size, starting number, and whether to skip the first page." },
      { name: "Apply and download", text: "Click 'Add Page Numbers' and download your newly numbered PDF document." }
    ],
    useCases: [
      "Adding page numbers to a report before submitting to a client or publisher",
      "Numbering a book manuscript PDF for easier reference during editing",
      "Stamping sequential numbers on a multi-section document before printing",
      "Resuming page numbering in a PDF that continues from a previous file"
    ],
    relatedSlugs: ["pdf-merge", "pdf-split", "add-line-numbers"]
  },
  { slug: "pdf-watermark", name: "PDF Watermark", description: "Add text or image watermarks to PDF documents.", category: "pdf", icon: "💧", keywords: ["pdf watermark", "watermark pdf", "pdf stamp", "document watermark"], subcategory: "edit",
    longDescription: "PDF Watermark lets you overlay custom text (such as 'CONFIDENTIAL' or 'DRAFT') or an image onto every page of your PDF, with full control over opacity, size, angle, and position. All processing runs in your browser so your document content stays completely private.",
    faqs: [
      { question: "Can I add a semi-transparent watermark so the text beneath is still readable?", answer: "Yes — you can adjust the watermark opacity from 10% to 100%, allowing you to create subtle watermarks that brand the document without obscuring the underlying content." },
      { question: "Can I use an image as a watermark instead of text?", answer: "Yes — upload a PNG or SVG logo or stamp image to use as an image watermark instead of, or in addition to, a text watermark." },
      { question: "Will the watermark be applied to every page?", answer: "By default the watermark is applied to all pages. You can also choose to watermark only specific pages or page ranges if needed." }
    ],
    howToSteps: [
      { name: "Upload your PDF", text: "Select the PDF file you want to watermark." },
      { name: "Configure the watermark", text: "Enter your watermark text or upload an image, then set the font size, angle, opacity, and position." },
      { name: "Apply and download", text: "Click 'Add Watermark' to process the document and download the watermarked PDF." }
    ],
    useCases: [
      "Marking confidential business documents with a 'CONFIDENTIAL' watermark before sharing",
      "Stamping draft versions of contracts or reports with a 'DRAFT' overlay",
      "Branding PDF presentations with a company logo watermark",
      "Adding a copyright notice to PDF documents before distributing online"
    ],
    relatedSlugs: ["image-watermark", "pdf-merge", "pdf-compress"]
  },
  { slug: "pdf-rotate", name: "PDF Page Rotator", description: "Rotate PDF pages by 90, 180, or 270 degrees.", category: "pdf", icon: "🔄", keywords: ["rotate pdf", "pdf rotator", "turn pdf", "pdf orientation"], subcategory: "edit",
    longDescription: "PDF Page Rotator fixes incorrectly oriented pages in your PDF documents without affecting image quality or file formatting. Rotate all pages at once or select individual pages to rotate, choosing 90, 180, or 270 degrees — all processed locally in your browser.",
    faqs: [
      { question: "Can I rotate only specific pages in the PDF?", answer: "Yes — you can select individual pages or a range of pages to rotate, leaving the rest of the document in its original orientation." },
      { question: "Does rotating a PDF page reduce its quality?", answer: "No — page rotation is a non-destructive metadata change that does not re-render or compress the page content, so quality is fully preserved." },
      { question: "Can I fix a landscape page mixed into a portrait document?", answer: "Yes — select just the landscape page, rotate it 90 degrees, and the rest of the document remains unchanged." }
    ],
    howToSteps: [
      { name: "Upload your PDF", text: "Select or drag and drop the PDF that contains pages needing rotation." },
      { name: "Select pages and rotation angle", text: "Click individual page thumbnails to select them, or choose 'All Pages', then select 90°, 180°, or 270° rotation." },
      { name: "Save and download", text: "Click 'Rotate Pages' to apply the rotation and download the corrected PDF." }
    ],
    useCases: [
      "Correcting upside-down or sideways scanned document pages",
      "Fixing a PDF where one landscape chart is oriented incorrectly in a portrait report",
      "Rotating all pages of a document received in the wrong orientation",
      "Preparing scanned pages in the correct reading orientation before merging"
    ],
    relatedSlugs: ["pdf-split", "pdf-merge", "image-rotator"]
  },
  { slug: "pdf-to-text", name: "PDF to Text Extractor", description: "Extract text content from PDF files.", category: "pdf", icon: "📃", keywords: ["pdf to text", "extract pdf text", "pdf reader", "pdf text"], subcategory: "convert",
    longDescription: "PDF to Text Extractor pulls all readable text from any PDF file and presents it as plain, copyable text — all processed locally in your browser without any server uploads. Use it to extract content from reports, contracts, or articles for editing, searching, or repurposing in other documents.",
    faqs: [
      { question: "Can it extract text from scanned PDF images?", answer: "The tool extracts text from PDFs that contain actual text data. Scanned image-only PDFs require OCR (optical character recognition) to extract text, which is not currently supported — the PDF must have selectable text for extraction to work." },
      { question: "Does the extracted text preserve the original layout and formatting?", answer: "The tool extracts text in reading order, but complex multi-column layouts and tables may not preserve their exact visual structure. The output is plain text optimized for readability and copy-paste use." },
      { question: "Is there a page limit for text extraction?", answer: "There is no strict page limit — the tool handles PDFs of any length. Processing very large documents may take a few extra seconds since everything runs locally in the browser." }
    ],
    howToSteps: [
      { name: "Upload your PDF file", text: "Click to select or drag and drop the PDF you want to extract text from." },
      { name: "Run the extraction", text: "Click 'Extract Text' and the tool will parse all text content from the document's pages." },
      { name: "Copy or download the text", text: "Copy the extracted text to your clipboard for use elsewhere, or download it as a plain .txt file." }
    ],
    useCases: [
      "Extracting contract or legal document text for editing in a word processor",
      "Copying content from a PDF report into a new document or email",
      "Searching for specific text in a PDF that lacks a built-in search function",
      "Repurposing content from PDF ebooks or whitepapers into other formats"
    ],
    relatedSlugs: ["pdf-to-image", "html-to-text", "word-counter"]
  },
];
