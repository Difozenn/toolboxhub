import type { Tool } from "../types";

export const imageTools: Tool[] = [
  // ── Existing (5) ──────────────────────────────────────────
  { slug: "image-resizer", name: "Image Resizer", description: "Resize images to any dimensions right in your browser.", category: "image", icon: "📐", keywords: ["resize image", "image dimensions", "scale image", "image resize"], subcategory: "resize",
    longDescription: "Image Resizer lets you scale any image to exact pixel dimensions or a percentage of the original size, directly in your browser without uploading to any server. Maintain aspect ratio automatically or set custom width and height values, then download the resized image instantly in the original format.",
    faqs: [
      { question: "Can I resize an image without distorting it?", answer: "Yes — enable the 'Lock Aspect Ratio' option and the tool automatically calculates the proportional height when you enter a new width, preventing stretching or squishing." },
      { question: "What image formats are supported?", answer: "The resizer supports JPG, PNG, WebP, and GIF formats. The output is saved in the same format as the input by default, with an option to change the format." },
      { question: "Is there a maximum file size I can resize?", answer: "The tool handles images up to several megabytes in size. Very large images may take a moment to process since everything runs locally in your browser." }
    ],
    howToSteps: [
      { name: "Upload your image", text: "Click to browse or drag and drop your image file into the resizer." },
      { name: "Enter your target dimensions", text: "Type the new width or height in pixels, or enter a percentage to scale proportionally. Toggle aspect ratio lock as needed." },
      { name: "Download the resized image", text: "Click 'Resize' and download the output image to your device." }
    ],
    useCases: [
      "Resizing product photos to meet e-commerce platform dimension requirements",
      "Scaling down high-resolution images before uploading to a website",
      "Preparing headshot or profile photos to exact size specifications",
      "Batch-preparing images for social media posts with specific size requirements"
    ],
    relatedSlugs: ["image-cropper", "image-compressor", "social-image-resizer"]
  },
  { slug: "image-cropper", name: "Image Cropper", description: "Crop images to custom dimensions or aspect ratios.", category: "image", icon: "✂️", keywords: ["crop image", "image crop", "trim image", "cut image"], subcategory: "resize",
    longDescription: "Image Cropper provides a visual drag-to-crop interface for trimming images to any custom dimensions or a locked aspect ratio. Choose from common presets like 1:1, 16:9, and 4:3, or draw a freeform crop area — all processing happens in your browser with no server uploads.",
    faqs: [
      { question: "Can I crop to a specific aspect ratio like 1:1 for Instagram?", answer: "Yes — select the 1:1 preset to lock the crop to a perfect square for Instagram, or choose from other common presets like 16:9 for YouTube thumbnails and 4:3 for standard photos." },
      { question: "Can I enter exact pixel crop coordinates?", answer: "Yes — in addition to dragging the crop handles visually, you can enter precise X, Y, width, and height values for pixel-perfect crops." },
      { question: "Does cropping reduce image quality?", answer: "No — cropping only removes pixels outside the selected area without recompressing the remaining image. If you keep the output in PNG format, there is zero quality loss." }
    ],
    howToSteps: [
      { name: "Upload your image", text: "Click or drag and drop to load the image you want to crop." },
      { name: "Select your crop area", text: "Choose an aspect ratio preset or drag the crop handles to define the exact area you want to keep." },
      { name: "Apply and download", text: "Click 'Crop' to apply your selection and download the cropped image." }
    ],
    useCases: [
      "Cropping profile photos to a perfect square for social media",
      "Trimming unwanted borders or background areas from product images",
      "Creating 16:9 thumbnails from wider landscape photos",
      "Isolating a specific subject from a larger photograph"
    ],
    relatedSlugs: ["image-resizer", "image-compressor", "favicon-generator"]
  },
  { slug: "image-compressor", name: "Image Compressor", description: "Compress images to reduce file size while maintaining quality.", category: "image", icon: "📦", keywords: ["compress image", "image compression", "reduce image size", "optimize image"], subcategory: "optimize",
    longDescription: "Image Compressor reduces image file sizes by applying smart lossy or lossless compression algorithms, delivering dramatically smaller files with minimal visible quality loss. All compression runs locally in your browser — upload nothing, keep your privacy, and download optimized images instantly.",
    faqs: [
      { question: "How much can the compressor reduce image file size?", answer: "Typical compression results in 40–80% file size reduction for JPG images and 20–50% for PNGs, depending on the image content and the compression level you choose." },
      { question: "Will compression make my image look worse?", answer: "At the default 'balanced' quality setting, compression is designed to be visually lossless — the difference is not visible to the naked eye at normal viewing sizes. You can increase quality if you notice artifacts." },
      { question: "Can I compress multiple images at once?", answer: "Yes — upload multiple images at once and the tool compresses them all in one batch, showing the original and compressed sizes for each." }
    ],
    howToSteps: [
      { name: "Upload your images", text: "Drag and drop one or more images or click to select files from your device." },
      { name: "Adjust the quality setting", text: "Use the quality slider to balance file size reduction against visual quality. The preview updates in real time so you can judge the result before downloading." },
      { name: "Download compressed images", text: "Click 'Compress' and download the optimized images individually or as a ZIP archive." }
    ],
    useCases: [
      "Optimizing website images to improve page load speed and Core Web Vitals scores",
      "Reducing image file sizes before emailing or sharing via messaging apps",
      "Shrinking photos before uploading to cloud storage to save space",
      "Preparing product images for fast-loading e-commerce pages"
    ],
    relatedSlugs: ["image-resizer", "svg-to-png", "image-to-base64"]
  },
  { slug: "svg-to-png", name: "SVG to PNG Converter", description: "Convert SVG vector images to PNG raster format.", category: "image", icon: "🖼️", keywords: ["svg to png", "svg converter", "vector to raster", "image convert"], subcategory: "convert",
    longDescription: "SVG to PNG Converter rasterizes your SVG vector files into high-resolution PNG images at any scale, directly in the browser. Specify the output width and height, and the tool renders the SVG at exact pixel dimensions — perfect for preparing icons, logos, and graphics for platforms that don't support SVG.",
    faqs: [
      { question: "Can I set the output resolution for the PNG?", answer: "Yes — enter your desired output width and height in pixels. The SVG is rendered at that exact size, allowing you to export at 2x or 3x for high-DPI retina displays." },
      { question: "Will gradients, filters, and animations be preserved?", answer: "SVG gradients and filters are fully rendered in the PNG output. However, SVG animations are static when converted — only the first frame (or initial state) is captured in the PNG." },
      { question: "Does the PNG output have a transparent background?", answer: "Yes — if the SVG has a transparent background, the output PNG preserves the transparency, giving you a clean image suitable for placing over any colored background." }
    ],
    howToSteps: [
      { name: "Upload your SVG file", text: "Click to select or drag and drop your SVG file into the converter." },
      { name: "Set the output dimensions", text: "Enter the desired width and height in pixels for the output PNG image." },
      { name: "Convert and download", text: "Click 'Convert to PNG' and download the rasterized image to your device." }
    ],
    useCases: [
      "Exporting SVG logos to PNG for use on platforms that don't support vector formats",
      "Creating high-resolution PNG versions of icon sets for app stores",
      "Rendering SVG charts or diagrams to PNG for embedding in Word or PDF documents",
      "Generating favicon PNG files from an SVG logo at multiple sizes"
    ],
    relatedSlugs: ["image-compressor", "favicon-generator", "svg-optimizer"]
  },
  { slug: "favicon-generator", name: "Favicon Generator", description: "Generate favicons in multiple sizes from any image.", category: "image", icon: "🌟", keywords: ["favicon", "favicon generator", "website icon", "ico generator"], subcategory: "create",
    longDescription: "Favicon Generator creates all the favicon and app icon sizes your website needs from a single source image — including 16×16, 32×32, 48×48 ICO, Apple Touch Icons, and Android manifest icons. Download everything as a ZIP with a ready-to-use HTML snippet.",
    faqs: [
      { question: "What favicon sizes are generated?", answer: "The tool generates 16×16, 32×32, 48×48 ICO files, 180×180 Apple Touch Icon, 192×192 and 512×512 Android icons, and optionally 70×70 and 150×150 Windows tile icons." },
      { question: "What type of image should I use as the source?", answer: "Use a square image for best results — ideally a 512×512 or larger PNG with a transparent background. Simple, bold designs work best at small favicon sizes." },
      { question: "Do I get the HTML link tags to add to my website?", answer: "Yes — the ZIP download includes a code snippet with all the recommended HTML <link> and <meta> tags you need to add to your website's <head> section." }
    ],
    howToSteps: [
      { name: "Upload your source image", text: "Upload a square PNG or SVG logo — at least 512×512 pixels for the best quality at all output sizes." },
      { name: "Preview the favicon sizes", text: "Review previews of your icon at each size to ensure it is clear and recognizable at small dimensions." },
      { name: "Download the favicon package", text: "Click 'Generate Favicons' to download a ZIP containing all icon sizes and the HTML code snippet for your site." }
    ],
    useCases: [
      "Web developers setting up favicons for a new website build",
      "Designers preparing complete browser and app icon packages from a logo",
      "App developers generating Android and iOS home screen icons",
      "Bloggers and content creators adding professional browser tab icons to their sites"
    ],
    relatedSlugs: ["svg-to-png", "image-resizer", "placeholder-image"]
  },

  // ── New Image Tools ──────────────────────────────────────────
  { slug: "image-to-webp", name: "Image to WebP Converter", description: "Convert PNG, JPG, and GIF images to WebP format for smaller file sizes.", category: "image", icon: "🖼️", keywords: ["webp converter", "png to webp", "jpg to webp", "image converter"], subcategory: "convert",
    longDescription: "Image to WebP Converter transforms your PNG, JPG, and GIF files into the modern WebP format, typically achieving 25–35% smaller file sizes with equivalent visual quality. Converting your web images to WebP improves page load speed and Core Web Vitals scores without sacrificing image fidelity.",
    faqs: [
      { question: "Why should I convert images to WebP?", answer: "WebP is a modern image format developed by Google that produces significantly smaller files than JPEG and PNG at equivalent quality, leading to faster page loads and lower bandwidth usage." },
      { question: "Do all browsers support WebP?", answer: "Yes — as of 2023, WebP is supported by all major modern browsers including Chrome, Firefox, Safari, and Edge. For very old browser support you may need a JPEG fallback." },
      { question: "Can I control the quality level of the WebP output?", answer: "Yes — use the quality slider to set your desired compression level from 1 to 100. Higher values preserve more detail at larger file sizes; lower values produce smaller files with some quality loss." }
    ],
    howToSteps: [
      { name: "Upload your image", text: "Select or drag and drop a JPG, PNG, or GIF file you want to convert." },
      { name: "Set the quality level", text: "Adjust the quality slider to balance file size and visual quality. The default setting of 80 provides a good balance for most web images." },
      { name: "Convert and download", text: "Click 'Convert to WebP' and download the optimized WebP file ready for use on your website." }
    ],
    useCases: [
      "Web developers replacing JPEG and PNG images with WebP for faster page loads",
      "Improving Google PageSpeed Insights and Lighthouse scores by serving modern formats",
      "Reducing bandwidth consumption for image-heavy websites and blogs",
      "Converting photo galleries to WebP to speed up mobile browsing"
    ],
    relatedSlugs: ["image-compressor", "svg-to-png", "image-resizer"]
  },
  { slug: "image-flipper", name: "Image Flipper", description: "Flip and mirror images horizontally or vertically.", category: "image", icon: "🔄", keywords: ["flip image", "mirror image", "rotate image", "image flip"], subcategory: "resize",
    longDescription: "Image Flipper mirrors any image horizontally or vertically in a single click — directly in your browser with no upload required. Create mirror images, fix camera-reversed selfies, or produce reflected versions of graphics for design projects, all with instant preview and one-click download.",
    faqs: [
      { question: "What is the difference between flipping horizontally and vertically?", answer: "Flipping horizontally mirrors the image left to right (creating a mirror reflection). Flipping vertically mirrors the image top to bottom (like turning it upside down along the horizontal axis)." },
      { question: "Can I flip and rotate an image at the same time?", answer: "Yes — use the flip buttons in combination with the rotation controls to apply both transformations in a single step before downloading." },
      { question: "Does flipping an image reduce quality?", answer: "No — flipping is a purely geometric transformation that does not alter pixel values or re-compress the image, so quality is fully preserved." }
    ],
    howToSteps: [
      { name: "Upload your image", text: "Click or drag and drop your image into the flipper." },
      { name: "Choose flip direction", text: "Click 'Flip Horizontal' to create a mirror image, or 'Flip Vertical' to flip it upside down." },
      { name: "Download the flipped image", text: "Preview the result and click 'Download' to save the flipped image to your device." }
    ],
    useCases: [
      "Correcting selfies that appear mirrored from the front-facing camera",
      "Creating symmetrical design elements by mirroring half an illustration",
      "Flipping logos or text graphics for reversed or mirrored printing",
      "Producing before/after comparison images with mirrored placement"
    ],
    relatedSlugs: ["image-resizer", "image-cropper", "image-rotator"]
  },
  { slug: "image-rotator", name: "Image Rotator", description: "Rotate images by any angle with a visual preview.", category: "image", icon: "🔃", keywords: ["rotate image", "image rotation", "turn image", "angle rotate"], subcategory: "resize",
    longDescription: "Image Rotator lets you rotate any image by 90, 180, 270 degrees with one click, or enter a precise custom angle for fine-grained rotation. A live preview shows exactly how the result will look before you download, and the tool handles transparent backgrounds when rotating to non-right-angle values.",
    faqs: [
      { question: "Can I rotate to a custom angle, not just 90-degree increments?", answer: "Yes — in addition to preset 90°, 180°, and 270° buttons, you can enter any angle from 0 to 360 degrees for precise rotations." },
      { question: "What happens to the canvas size when I rotate to a non-right angle?", answer: "When rotating to a custom angle, the output canvas is expanded to fit the entire rotated image, with transparent or white fill in the added corners depending on the format." },
      { question: "Does the tool preserve transparency in PNG images when rotating?", answer: "Yes — when rotating a PNG with a transparent background, the added corner areas in the output are also transparent, preserving the layered look." }
    ],
    howToSteps: [
      { name: "Upload your image", text: "Select or drag and drop the image you want to rotate." },
      { name: "Set the rotation angle", text: "Click a preset rotation button (90°, 180°, 270°) or enter a custom angle in the text field." },
      { name: "Preview and download", text: "Review the live preview and click 'Download' to save the rotated image." }
    ],
    useCases: [
      "Correcting photos taken in the wrong orientation on a camera or phone",
      "Rotating scanned documents that were placed sideways on a scanner",
      "Creating angled design elements for graphics and presentations",
      "Fixing incorrectly oriented images before adding them to documents or websites"
    ],
    relatedSlugs: ["image-flipper", "image-cropper", "image-resizer"]
  },
  { slug: "image-color-picker", name: "Image Color Picker", description: "Pick colors from any uploaded image and get HEX, RGB, HSL values.", category: "image", icon: "🎨", keywords: ["color picker", "image color", "eyedropper", "pick color from image"], subcategory: "create",
    longDescription: "Image Color Picker lets you upload any photo or graphic and click anywhere on the image to instantly capture the exact color at that point. Get the HEX, RGB, and HSL values with one click, build a palette from multiple sampled colors, and copy each value to your clipboard for use in your design or code.",
    faqs: [
      { question: "How do I pick a color from an image?", answer: "Upload your image, then move your mouse over any part of the image and click to sample the color at that pixel. The HEX, RGB, and HSL values for that color are instantly displayed." },
      { question: "Can I save multiple sampled colors to build a palette?", answer: "Yes — each color you click is added to a saved palette below the image. You can collect as many colors as you need and copy any individual value." },
      { question: "Can I zoom in to pick precise colors from small areas?", answer: "Yes — use the zoom feature to magnify a region of the image for more accurate color sampling of small details or anti-aliased edges." }
    ],
    howToSteps: [
      { name: "Upload your image", text: "Click or drag and drop the image, photo, or screenshot you want to sample colors from." },
      { name: "Click to sample colors", text: "Hover over the image to see a magnified preview of the area under your cursor, then click to capture the color at that point." },
      { name: "Copy the color values", text: "Click the HEX, RGB, or HSL value next to any sampled color to copy it to your clipboard for use in your design tool or code editor." }
    ],
    useCases: [
      "Extracting brand colors from a logo or reference image",
      "Building a color palette from a product photo for a website design",
      "Matching text or border colors exactly to a background image",
      "Identifying the exact color codes used in a competitor's design for reference"
    ],
    relatedSlugs: ["color-picker", "color-converter", "color-palette-generator"]
  },
  { slug: "image-filter", name: "Image Filter", description: "Apply filters like grayscale, sepia, blur, brightness, and contrast to images.", category: "image", icon: "🎭", keywords: ["image filter", "photo filter", "grayscale", "sepia", "blur image"], subcategory: "optimize",
    longDescription: "Image Filter applies classic and creative photo filters to any uploaded image entirely within your browser — no app download needed. Adjust grayscale, sepia, hue, saturation, brightness, contrast, and blur with real-time preview sliders, then download the edited image at full resolution.",
    faqs: [
      { question: "What filters are available?", answer: "Available filters include grayscale, sepia, invert, blur, sharpen, brightness, contrast, saturation, hue rotation, and combinations of these for vintage and stylistic effects." },
      { question: "Are the filter adjustments non-destructive?", answer: "Yes — all adjustments are previewed in real time and applied only when you click 'Download'. The original image is never overwritten and you can reset all filters at any time." },
      { question: "What image formats are supported?", answer: "The filter tool supports JPG, PNG, WebP, and GIF images as input, with output available in JPG or PNG format." }
    ],
    howToSteps: [
      { name: "Upload your image", text: "Select or drag and drop the photo or image you want to filter." },
      { name: "Apply and adjust filters", text: "Click a filter preset or use the individual sliders for brightness, contrast, saturation, and other properties to achieve your desired look." },
      { name: "Download the filtered image", text: "Click 'Download' to save the filtered image to your device at full resolution." }
    ],
    useCases: [
      "Adding a vintage sepia or black-and-white treatment to photos",
      "Adjusting brightness and contrast of product photos before publishing",
      "Applying a consistent visual style to multiple images for a cohesive blog or feed",
      "Creating grayscale versions of images for print or accessibility purposes"
    ],
    relatedSlugs: ["image-compressor", "image-resizer", "image-color-picker"]
  },
  { slug: "png-to-jpg", name: "PNG to JPG Converter", description: "Convert PNG images to JPG format with adjustable quality.", category: "image", icon: "🖼️", keywords: ["png to jpg", "png to jpeg", "image converter", "format converter"], subcategory: "convert",
    longDescription: "PNG to JPG Converter transforms PNG images into JPG format with a configurable quality slider, making it easy to reduce file size for photos that don't need a transparent background. Processing runs entirely in your browser — no files are uploaded anywhere.",
    faqs: [
      { question: "Why would I convert a PNG to JPG?", answer: "PNG files are lossless and support transparency, making them larger than JPGs. If your image is a photo without a transparent background, converting to JPG with high quality can significantly reduce file size for faster web loading." },
      { question: "Will transparency be preserved in the JPG output?", answer: "No — JPG does not support transparency. Any transparent areas in the PNG will be filled with a solid background color (white by default) in the JPG output." },
      { question: "How do I control the output JPG quality?", answer: "Use the quality slider to set a value from 1 to 100. A setting of 80–90 typically produces a visually indistinguishable result from the original while achieving significant file size savings." }
    ],
    howToSteps: [
      { name: "Upload your PNG image", text: "Select or drag and drop the PNG file you want to convert to JPG." },
      { name: "Set the quality and background", text: "Adjust the quality slider and choose a background color to fill any transparent areas." },
      { name: "Convert and download", text: "Click 'Convert to JPG' and download the compressed JPG file to your device." }
    ],
    useCases: [
      "Converting PNG screenshots to JPG to reduce file size for email attachments",
      "Transforming PNG photos to JPG before uploading to size-limited platforms",
      "Preparing product images in JPG format for e-commerce sites that require it",
      "Batch-converting a folder of PNG exports to JPG for website performance"
    ],
    relatedSlugs: ["svg-to-png", "image-to-webp", "image-compressor"]
  },
  { slug: "image-watermark", name: "Image Watermark", description: "Add text or image watermarks to protect your photos.", category: "image", icon: "💧", keywords: ["watermark", "image watermark", "photo watermark", "protect image"], subcategory: "create",
    longDescription: "Image Watermark lets you overlay custom text or a logo image onto any photo with full control over opacity, size, position, and font — all processed locally in your browser. Protect your photography, brand your content, or mark preview images with a semi-transparent stamp before sharing online.",
    faqs: [
      { question: "Can I use my logo image as a watermark instead of text?", answer: "Yes — upload a PNG logo (ideally with a transparent background) to use as an image watermark. You can adjust its size, position, and opacity on the photo." },
      { question: "Can I position the watermark anywhere on the image?", answer: "Yes — choose from preset positions (corners, center, or tiled across the image) or drag the watermark to a precise custom position." },
      { question: "Will the watermark be removable by others?", answer: "A semi-transparent watermark can be partially worked around by skilled editors. For maximum protection, use a bolder watermark that covers a central area of the image." }
    ],
    howToSteps: [
      { name: "Upload your photo", text: "Select the image you want to watermark." },
      { name: "Add your watermark text or logo", text: "Type your watermark text or upload a logo image, then customize the font, size, opacity, color, and position." },
      { name: "Save the watermarked photo", text: "Click 'Download' to save the watermarked image at full resolution." }
    ],
    useCases: [
      "Photographers adding a copyright watermark to images before sharing online",
      "Businesses branding promotional photos with a company logo overlay",
      "Content creators marking draft or preview images before final delivery",
      "Stock image contributors protecting work with a visible ownership stamp"
    ],
    relatedSlugs: ["image-resizer", "image-compressor", "image-filter"]
  },
  { slug: "screenshot-beautifier", name: "Screenshot Beautifier", description: "Add beautiful backgrounds, shadows, and borders to screenshots.", category: "image", icon: "✨", keywords: ["screenshot", "beautify screenshot", "screenshot mockup", "browser mockup"], subcategory: "create",
    longDescription: "Screenshot Beautifier transforms plain screenshots into polished, social-media-ready visuals by wrapping them in stylish backgrounds, browser chrome mockups, gradient or mesh backgrounds, drop shadows, and rounded corners. Create eye-catching product screenshots and tutorial images in seconds.",
    faqs: [
      { question: "Can I add a browser window frame around my screenshot?", answer: "Yes — choose from macOS, Windows, or minimal browser chrome mockup frames to wrap your screenshot in a realistic window, making it look like a professional product preview." },
      { question: "What background options are available?", answer: "You can choose from solid colors, linear gradients, mesh gradients, and abstract geometric patterns. All backgrounds are fully customizable with color pickers." },
      { question: "Can I adjust the drop shadow and border radius?", answer: "Yes — both the shadow depth and spread and the corner border radius are adjustable with sliders, letting you create anything from subtle to dramatic visual effects." }
    ],
    howToSteps: [
      { name: "Upload your screenshot", text: "Drag and drop or click to upload the screenshot you want to beautify." },
      { name: "Customize the background and frame", text: "Choose a background style, select a browser frame mockup if desired, and adjust shadow, padding, and border radius settings." },
      { name: "Download the finished image", text: "Click 'Export' to download the beautified screenshot as a high-resolution PNG, ready to share on social media or in documentation." }
    ],
    useCases: [
      "SaaS founders creating polished product screenshots for landing pages and social media",
      "Indie developers showcasing app screenshots for Product Hunt launches",
      "Technical writers adding professional-looking screenshots to documentation",
      "Marketers creating eye-catching visuals from dashboard or UI screenshots"
    ],
    relatedSlugs: ["image-resizer", "image-filter", "social-image-resizer"]
  },
  { slug: "gif-maker", name: "GIF Maker", description: "Create animated GIFs from multiple images with custom timing.", category: "image", icon: "🎞️", keywords: ["gif maker", "create gif", "animated gif", "image to gif"], subcategory: "create",
    longDescription: "GIF Maker assembles multiple images into a smooth animated GIF directly in your browser. Upload your frames in order, set the delay between each frame, choose looping options, and download the finished GIF — no software installation required, and your images never leave your device.",
    faqs: [
      { question: "How many frames can I add to a GIF?", answer: "You can add as many frames as needed. Keep in mind that more frames and longer animations result in larger GIF file sizes." },
      { question: "Can I set different delay times for individual frames?", answer: "Yes — each frame can have its own display duration in milliseconds, allowing you to control pacing and emphasis throughout the animation." },
      { question: "What image formats can be used as GIF frames?", answer: "You can use JPG, PNG, and WebP images as frames. All uploaded images are converted and assembled into the final animated GIF." }
    ],
    howToSteps: [
      { name: "Upload your frames", text: "Select or drag and drop all the images you want to use as frames in your animation." },
      { name: "Set frame order and timing", text: "Arrange the frames in the desired playback order and set the delay for each frame in milliseconds." },
      { name: "Generate and download the GIF", text: "Click 'Create GIF' and download the animated GIF file to your device." }
    ],
    useCases: [
      "Creating simple product demo animations from a series of screenshots",
      "Making social media reaction GIFs from a photo sequence",
      "Producing looping animated banner graphics for websites or blogs",
      "Turning a set of illustration frames into a simple animated sticker or emote"
    ],
    relatedSlugs: ["image-resizer", "image-compressor", "svg-to-png"]
  },
];
