import type { Tool } from "../types";

export const imageTools: Tool[] = [
  // ── Existing (5) ──────────────────────────────────────────
  { slug: "image-resizer", name: "Image Resizer", description: "Resize images to any dimensions right in your browser.", category: "image", icon: "📐", keywords: ["resize image", "image dimensions", "scale image", "image resize"], subcategory: "resize",
    relatedSlugs: ["image-cropper", "image-compressor", "social-image-resizer"]
  },
  { slug: "image-cropper", name: "Image Cropper", description: "Crop images to custom dimensions or aspect ratios.", category: "image", icon: "✂️", keywords: ["crop image", "image crop", "trim image", "cut image"], subcategory: "resize",
    relatedSlugs: ["image-resizer", "image-compressor", "favicon-generator"]
  },
  { slug: "image-compressor", name: "Image Compressor", description: "Compress images to reduce file size while maintaining quality.", category: "image", icon: "📦", keywords: ["compress image", "image compression", "reduce image size", "optimize image"], subcategory: "optimize",
    relatedSlugs: ["image-resizer", "svg-to-png", "image-to-base64"]
  },
  { slug: "svg-to-png", name: "SVG to PNG Converter", description: "Convert SVG vector images to PNG raster format.", category: "image", icon: "🖼️", keywords: ["svg to png", "svg converter", "vector to raster", "image convert"], subcategory: "convert",
    relatedSlugs: ["image-compressor", "favicon-generator", "svg-optimizer"]
  },
  { slug: "favicon-generator", name: "Favicon Generator", description: "Generate favicons in multiple sizes from any image.", category: "image", icon: "🌟", keywords: ["favicon", "favicon generator", "website icon", "ico generator"], subcategory: "create",
    relatedSlugs: ["svg-to-png", "image-resizer", "placeholder-image"]
  },

  // ── New Image Tools ──────────────────────────────────────────
  { slug: "image-to-webp", name: "Image to WebP Converter", description: "Convert PNG, JPG, and GIF images to WebP format for smaller file sizes.", category: "image", icon: "🖼️", keywords: ["webp converter", "png to webp", "jpg to webp", "image converter"], subcategory: "convert",
    relatedSlugs: ["image-compressor", "svg-to-png", "image-resizer"]
  },
  { slug: "image-flipper", name: "Image Flipper", description: "Flip and mirror images horizontally or vertically.", category: "image", icon: "🔄", keywords: ["flip image", "mirror image", "rotate image", "image flip"], subcategory: "resize",
    relatedSlugs: ["image-resizer", "image-cropper", "image-rotator"]
  },
  { slug: "image-rotator", name: "Image Rotator", description: "Rotate images by any angle with a visual preview.", category: "image", icon: "🔃", keywords: ["rotate image", "image rotation", "turn image", "angle rotate"], subcategory: "resize",
    relatedSlugs: ["image-flipper", "image-cropper", "image-resizer"]
  },
  { slug: "image-color-picker", name: "Image Color Picker", description: "Pick colors from any uploaded image and get HEX, RGB, HSL values.", category: "image", icon: "🎨", keywords: ["color picker", "image color", "eyedropper", "pick color from image"], subcategory: "create",
    relatedSlugs: ["color-picker", "color-converter", "color-palette-generator"]
  },
  { slug: "image-filter", name: "Image Filter", description: "Apply filters like grayscale, sepia, blur, brightness, and contrast to images.", category: "image", icon: "🎭", keywords: ["image filter", "photo filter", "grayscale", "sepia", "blur image"], subcategory: "optimize",
    relatedSlugs: ["image-compressor", "image-resizer", "image-color-picker"]
  },
  { slug: "png-to-jpg", name: "PNG to JPG Converter", description: "Convert PNG images to JPG format with adjustable quality.", category: "image", icon: "🖼️", keywords: ["png to jpg", "png to jpeg", "image converter", "format converter"], subcategory: "convert",
    relatedSlugs: ["svg-to-png", "image-to-webp", "image-compressor"]
  },
  { slug: "image-watermark", name: "Image Watermark", description: "Add text or image watermarks to protect your photos.", category: "image", icon: "💧", keywords: ["watermark", "image watermark", "photo watermark", "protect image"], subcategory: "create",
    relatedSlugs: ["image-resizer", "image-compressor", "image-filter"]
  },
  { slug: "screenshot-beautifier", name: "Screenshot Beautifier", description: "Add beautiful backgrounds, shadows, and borders to screenshots.", category: "image", icon: "✨", keywords: ["screenshot", "beautify screenshot", "screenshot mockup", "browser mockup"], subcategory: "create",
    relatedSlugs: ["image-resizer", "image-filter", "social-image-resizer"]
  },
  { slug: "gif-maker", name: "GIF Maker", description: "Create animated GIFs from multiple images with custom timing.", category: "image", icon: "🎞️", keywords: ["gif maker", "create gif", "animated gif", "image to gif"], subcategory: "create",
    relatedSlugs: ["image-resizer", "image-compressor", "svg-to-png"]
  },
];
