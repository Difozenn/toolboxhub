import type { Tool } from "../types";

export const cryptoTools: Tool[] = [
  // ── Existing (8) ──────────────────────────────────────────
  { slug: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, and SHA-256 hashes from any input text.", category: "crypto", icon: "🛡️", keywords: ["md5 hash", "sha256 hash", "sha1 hash", "hash generator"], subcategory: "hashing",
    relatedSlugs: ["checksum-calculator", "encryption-tool", "password-strength"]
  },
  { slug: "encryption-tool", name: "Text Encryption/Decryption", description: "Encrypt and decrypt text using AES encryption.", category: "crypto", icon: "🔐", keywords: ["encrypt text", "decrypt text", "aes encryption", "text cipher"], subcategory: "encryption",
    relatedSlugs: ["hash-generator", "caesar-cipher", "rot13"]
  },
  { slug: "rot13", name: "ROT13 Encoder", description: "Encode and decode text using the ROT13 substitution cipher.", category: "crypto", icon: "🔄", keywords: ["rot13", "caesar cipher", "text cipher", "rot13 encoder"], subcategory: "encryption",
    relatedSlugs: ["caesar-cipher", "encryption-tool", "morse-code"]
  },
  { slug: "caesar-cipher", name: "Caesar Cipher", description: "Encrypt and decrypt text using the Caesar cipher with custom shift.", category: "crypto", icon: "🏛️", keywords: ["caesar cipher", "shift cipher", "substitution cipher", "encryption"], subcategory: "encryption",
    relatedSlugs: ["rot13", "encryption-tool", "morse-code"]
  },
  { slug: "password-strength", name: "Password Strength Checker", description: "Check how strong your password is and get improvement suggestions.", category: "crypto", icon: "💪", keywords: ["password strength", "password checker", "password security", "strong password"], subcategory: "analysis",
    relatedSlugs: ["password-generator", "hash-generator", "credit-card-validator"]
  },
  { slug: "checksum-calculator", name: "Checksum Calculator", description: "Calculate and verify file checksums (MD5, SHA-1, SHA-256).", category: "crypto", icon: "✅", keywords: ["checksum", "file hash", "verify checksum", "file integrity"], subcategory: "hashing",
    relatedSlugs: ["hash-generator", "encryption-tool", "bytes-converter"]
  },
  { slug: "ip-address-lookup", name: "IP Address Lookup", description: "Look up your public IP address and basic network information.", category: "crypto", icon: "🌐", keywords: ["ip address", "my ip", "ip lookup", "public ip", "what is my ip"], subcategory: "network",
    relatedSlugs: ["whois-lookup", "user-agent-parser", "url-parser"]
  },
  { slug: "whois-lookup", name: "WHOIS Lookup", description: "Look up domain registration information.", category: "crypto", icon: "🔍", keywords: ["whois", "domain lookup", "domain info", "domain registration"], subcategory: "network",
    relatedSlugs: ["ip-address-lookup", "url-parser", "user-agent-parser"]
  },

  // ── New Crypto & Security Tools ──────────────────────────────
  { slug: "hmac-generator", name: "HMAC Generator", description: "Generate HMAC authentication codes using various hash algorithms.", category: "crypto", icon: "🔑", keywords: ["hmac", "hmac generator", "message authentication", "hmac sha256"], subcategory: "hashing",
    relatedSlugs: ["hash-generator", "checksum-calculator", "encryption-tool"]
  },
  { slug: "bcrypt-generator", name: "Bcrypt Hash Generator", description: "Generate and verify bcrypt password hashes with configurable rounds.", category: "crypto", icon: "🔒", keywords: ["bcrypt", "bcrypt hash", "password hash", "bcrypt verify"], subcategory: "hashing",
    relatedSlugs: ["hash-generator", "password-strength", "password-generator"]
  },
  { slug: "ssl-checker", name: "SSL Certificate Checker", description: "Check SSL certificate details, expiry date, and chain validity.", category: "crypto", icon: "🔐", keywords: ["ssl checker", "certificate check", "https check", "ssl expiry"], subcategory: "network",
    relatedSlugs: ["whois-lookup", "ip-address-lookup", "url-parser"]
  },
  { slug: "csp-generator", name: "CSP Header Generator", description: "Generate Content Security Policy headers for your website.", category: "crypto", icon: "🛡️", keywords: ["csp generator", "content security policy", "security headers", "csp header"], subcategory: "analysis",
    relatedSlugs: ["meta-tag-generator", "htaccess-generator", "ssl-checker"]
  },
  { slug: "random-bytes-generator", name: "Random Bytes Generator", description: "Generate cryptographically secure random bytes in hex or base64.", category: "crypto", icon: "🎲", keywords: ["random bytes", "secure random", "crypto random", "random hex"], subcategory: "encryption",
    relatedSlugs: ["password-generator", "uuid-generator", "hash-generator"]
  },
  { slug: "pgp-key-generator", name: "RSA Key Pair Generator", description: "Generate RSA public/private key pairs for encryption.", category: "crypto", icon: "🗝️", keywords: ["rsa key", "key pair", "public key", "private key", "encryption key"], subcategory: "encryption",
    relatedSlugs: ["encryption-tool", "hash-generator", "password-generator"]
  },
  { slug: "dns-lookup", name: "DNS Lookup", description: "Look up DNS records for any domain: A, AAAA, MX, TXT, CNAME, and NS.", category: "crypto", icon: "🌐", keywords: ["dns lookup", "domain dns", "mx record", "dns records"], subcategory: "network",
    relatedSlugs: ["whois-lookup", "ip-address-lookup", "ssl-checker"]
  },
];
