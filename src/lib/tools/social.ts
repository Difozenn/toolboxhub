import type { Tool } from "../types";

export const socialTools: Tool[] = [
  { slug: "instagram-fonts", name: "Instagram Fonts Generator", description: "Generate stylish fonts and special text for your Instagram bio and posts.", category: "social", icon: "📸", keywords: ["instagram fonts", "ig fonts", "social fonts", "bio fonts"], subcategory: "text",
    longDescription: "Make your Instagram profile stand out with stylish Unicode fonts. Convert any text into bold, italic, cursive, gothic, monospace, and decorative styles that work in Instagram bios, captions, and comments. No app needed — just type, copy, and paste.",
    faqs: [
      { question: "Do these fonts work on Instagram?", answer: "Yes! They use special Unicode characters that Instagram and most social platforms support natively." },
      { question: "Will it affect my reach or engagement?", answer: "Instagram displays these characters normally. There's no penalty for using Unicode text." }
    ],
    relatedSlugs: ["fancy-text", "hashtag-generator", "character-counter", "emoji-picker"]
  },
  { slug: "hashtag-generator", name: "Hashtag Generator", description: "Generate relevant hashtags for Instagram, TikTok, and Twitter posts.", category: "social", icon: "#️⃣", keywords: ["hashtag generator", "instagram hashtags", "tiktok hashtags", "trending hashtags"], subcategory: "content",
    relatedSlugs: ["instagram-fonts", "character-counter", "keyword-density"]
  },
  { slug: "social-image-resizer", name: "Social Media Image Resizer", description: "Resize images to perfect dimensions for every social media platform.", category: "social", icon: "📐", keywords: ["social media size", "instagram size", "facebook cover", "profile picture size"], subcategory: "images",
    relatedSlugs: ["image-resizer", "image-cropper", "og-preview"]
  },
  { slug: "character-counter", name: "Social Character Counter", description: "Count characters with limits for Twitter (280), Instagram (2200), and more.", category: "social", icon: "🔤", keywords: ["character counter", "twitter limit", "character limit", "text counter"], subcategory: "text",
    relatedSlugs: ["word-counter", "instagram-fonts", "string-length"]
  },
  { slug: "youtube-thumbnail-downloader", name: "YouTube Thumbnail Downloader", description: "Download thumbnails from any YouTube video in multiple resolutions.", category: "social", icon: "🎬", keywords: ["youtube thumbnail", "video thumbnail", "thumbnail downloader", "yt thumbnail"], subcategory: "content",
    relatedSlugs: ["social-image-resizer", "image-resizer", "qr-code-generator"]
  },
  { slug: "twitter-thread-maker", name: "Twitter Thread Maker", description: "Break long text into numbered tweet-sized threads with character counting.", category: "social", icon: "🧵", keywords: ["twitter thread", "thread maker", "tweet thread", "x thread"], subcategory: "content",
    relatedSlugs: ["character-counter", "text-truncator", "word-counter"]
  },
  { slug: "bio-generator", name: "Social Bio Generator", description: "Generate creative bios for Instagram, Twitter, LinkedIn, and TikTok.", category: "social", icon: "✍️", keywords: ["bio generator", "instagram bio", "twitter bio", "social media bio"], subcategory: "content",
    relatedSlugs: ["instagram-fonts", "hashtag-generator", "character-counter"]
  },
  { slug: "engagement-rate-calculator", name: "Engagement Rate Calculator", description: "Calculate social media engagement rate from followers, likes, and comments.", category: "social", icon: "📊", keywords: ["engagement rate", "social analytics", "instagram engagement", "social media metrics"], subcategory: "analytics", template: "simple-calculator",
    relatedSlugs: ["youtube-revenue-calculator", "character-counter", "hashtag-generator"]
  },
  { slug: "youtube-revenue-calculator", name: "YouTube Revenue Calculator", description: "Estimate YouTube ad revenue based on views and CPM rates.", category: "social", icon: "💰", keywords: ["youtube revenue", "youtube earnings", "youtube money", "adsense calculator"], subcategory: "analytics", template: "simple-calculator",
    relatedSlugs: ["engagement-rate-calculator", "roi-calculator", "cagr-calculator"]
  },
  { slug: "social-post-scheduler", name: "Best Time to Post Calculator", description: "Find the optimal posting times for each social platform by timezone.", category: "social", icon: "🕐", keywords: ["best time to post", "posting schedule", "social media timing", "instagram timing"], subcategory: "analytics",
    relatedSlugs: ["timezone-converter", "engagement-rate-calculator", "world-clock"]
  },
  { slug: "tiktok-character-counter", name: "TikTok Caption Counter", description: "Count characters for TikTok captions with the 2200 character limit.", category: "social", icon: "🎵", keywords: ["tiktok caption", "tiktok character limit", "tiktok counter"], subcategory: "text",
    relatedSlugs: ["character-counter", "hashtag-generator", "instagram-fonts"]
  },
  { slug: "linkedin-post-formatter", name: "LinkedIn Post Formatter", description: "Format LinkedIn posts with bold, italic, emojis, and bullet points.", category: "social", icon: "💼", keywords: ["linkedin formatter", "linkedin post", "linkedin bold", "linkedin formatting"], subcategory: "text",
    relatedSlugs: ["fancy-text", "character-counter", "bio-generator"]
  },
];
