import type { Tool } from "../types";

export const cryptoTools: Tool[] = [
  // ── Existing (8) ──────────────────────────────────────────
  { slug: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, and SHA-256 hashes from any input text.", category: "crypto", icon: "🛡️", keywords: ["md5 hash", "sha256 hash", "sha1 hash", "hash generator"], subcategory: "hashing",
    longDescription: "Hash Generator computes MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes from any text input directly in your browser. Use it for verifying data integrity, generating checksums, or understanding how hashing algorithms transform input — all without sending your data to a server.",
    faqs: [
      { question: "What is the difference between MD5, SHA-1, and SHA-256?", answer: "MD5 and SHA-1 are older, faster algorithms now considered cryptographically broken for security use. SHA-256 (part of the SHA-2 family) is the current standard for secure hashing and is recommended for all new applications." },
      { question: "Can I reverse a hash back to the original text?", answer: "No — hashing is a one-way function. A hash cannot be mathematically reversed to recover the original input, which is why hashes are used for data verification rather than encryption." },
      { question: "What is a hash commonly used for?", answer: "Hashes are used to verify file integrity (confirming a file hasn't been tampered with), store passwords securely (in salted form), generate checksums, and create digital fingerprints of data." }
    ],
    howToSteps: [
      { name: "Enter your text input", text: "Type or paste the text you want to hash into the input field." },
      { name: "Select the hash algorithm", text: "Choose MD5, SHA-1, SHA-256, or SHA-512 depending on your use case." },
      { name: "Copy the hash output", text: "The hash is generated instantly. Click 'Copy' to copy it to your clipboard for use in your application or verification." }
    ],
    useCases: [
      "Generating SHA-256 hashes to verify file integrity after download",
      "Creating MD5 checksums for comparing file versions",
      "Hashing passwords in development and testing environments",
      "Generating data fingerprints for deduplication or caching keys"
    ],
    relatedSlugs: ["checksum-calculator", "encryption-tool", "password-strength"]
  },
  { slug: "encryption-tool", name: "Text Encryption/Decryption", description: "Encrypt and decrypt text using AES encryption.", category: "crypto", icon: "🔐", keywords: ["encrypt text", "decrypt text", "aes encryption", "text cipher"], subcategory: "encryption",
    longDescription: "Text Encryption/Decryption uses AES (Advanced Encryption Standard) — the industry-standard symmetric cipher — to encrypt any text with a password of your choice, all within your browser. Share encrypted text securely, knowing only someone with the correct password can decrypt it.",
    faqs: [
      { question: "How secure is AES encryption?", answer: "AES-256 is the gold standard in symmetric encryption, used by governments and security professionals worldwide. With a strong password, AES-256 encrypted text is computationally infeasible to brute-force with current technology." },
      { question: "What happens if I forget my encryption password?", answer: "There is no password recovery — AES encryption is designed so that the ciphertext cannot be recovered without the correct password. Always store your password securely separately from the encrypted data." },
      { question: "Can I decrypt text encrypted by other AES tools?", answer: "AES-encrypted text from other tools may be compatible if they use the same mode (CBC or GCM), key derivation function, and IV scheme. The tool uses standard parameters for broad compatibility." }
    ],
    howToSteps: [
      { name: "Enter the text to encrypt", text: "Paste or type the sensitive text you want to encrypt into the input field." },
      { name: "Set your encryption password", text: "Enter a strong password that will be used to encrypt and later decrypt the text. Keep this password secure." },
      { name: "Copy and share the ciphertext", text: "Click 'Encrypt' to generate the encrypted output, then copy and share it securely. To decrypt, paste the ciphertext, enter the same password, and click 'Decrypt'." }
    ],
    useCases: [
      "Encrypting sensitive notes before storing them in a shared or cloud location",
      "Securely transmitting passwords or API keys via unencrypted channels",
      "Protecting personal data in text files before backing them up online",
      "Learning and demonstrating AES encryption in security courses"
    ],
    relatedSlugs: ["hash-generator", "caesar-cipher", "rot13"]
  },
  { slug: "rot13", name: "ROT13 Encoder", description: "Encode and decode text using the ROT13 substitution cipher.", category: "crypto", icon: "🔄", keywords: ["rot13", "caesar cipher", "text cipher", "rot13 encoder"], subcategory: "encryption",
    longDescription: "ROT13 Encoder applies the ROT13 substitution cipher — rotating each letter by 13 positions in the alphabet — to any text you enter. Because the alphabet has 26 letters, applying ROT13 twice returns the original text, making it both the encoding and decoding function.",
    faqs: [
      { question: "What is ROT13 used for?", answer: "ROT13 is commonly used in online forums and communities to obscure spoilers or punchlines from casual readers — not for real security. It is also used as a fun puzzle cipher and for basic text obfuscation." },
      { question: "Is ROT13 secure?", answer: "No — ROT13 is not secure in any meaningful sense. It is a trivial cipher that anyone can decode instantly. Use AES or modern encryption for anything that requires actual security." },
      { question: "Does ROT13 work on numbers and symbols?", answer: "No — ROT13 only rotates alphabetical characters (A–Z and a–z). Numbers, spaces, and symbols are passed through unchanged." }
    ],
    howToSteps: [
      { name: "Enter your text", text: "Type or paste the text you want to encode or decode into the input field." },
      { name: "Apply ROT13", text: "Click 'Encode / Decode' — the same action both encodes and decodes ROT13 text since the cipher is self-reciprocal." },
      { name: "Copy the result", text: "Copy the output text from the result field to share or use as needed." }
    ],
    useCases: [
      "Hiding spoilers in forum posts and online discussions",
      "Teaching introductory cryptography concepts with a simple example",
      "Obfuscating text in game walkthroughs or puzzle solutions",
      "Quickly checking whether a piece of text is ROT13-encoded"
    ],
    relatedSlugs: ["caesar-cipher", "encryption-tool", "morse-code"]
  },
  { slug: "caesar-cipher", name: "Caesar Cipher", description: "Encrypt and decrypt text using the Caesar cipher with custom shift.", category: "crypto", icon: "🏛️", keywords: ["caesar cipher", "shift cipher", "substitution cipher", "encryption"], subcategory: "encryption",
    longDescription: "The Caesar Cipher tool encodes or decodes text using the classical Caesar substitution cipher, shifting each letter by a configurable number of positions in the alphabet. Use it to learn the basics of cryptography, solve puzzles, or encode messages with the same cipher used by Julius Caesar.",
    faqs: [
      { question: "What is a Caesar cipher?", answer: "A Caesar cipher is a simple substitution cipher where each letter in the plaintext is shifted a fixed number of positions down the alphabet. For example, with a shift of 3, 'A' becomes 'D', 'B' becomes 'E', and so on." },
      { question: "How do I decode a Caesar cipher if I don't know the shift?", answer: "You can brute-force a Caesar cipher by trying all 25 possible shift values — the tool includes a 'Try All Shifts' mode that shows you every possible decryption so you can identify the one that produces readable text." },
      { question: "Is Caesar cipher secure?", answer: "No — with only 25 possible shifts, a Caesar cipher is trivially broken and should not be used for any real security purpose. It is purely an educational and puzzle tool." }
    ],
    howToSteps: [
      { name: "Enter your message", text: "Type or paste the text you want to encode or decode." },
      { name: "Set the shift value", text: "Enter a shift number from 1 to 25. ROT13 is a Caesar cipher with a shift of 13." },
      { name: "Encode or decode", text: "Click 'Encrypt' to apply the shift to the plaintext, or 'Decrypt' to reverse the shift and recover the original message." }
    ],
    useCases: [
      "Encoding secret messages for escape rooms or classroom puzzles",
      "Teaching the concept of substitution ciphers in cryptography courses",
      "Decoding Caesar-cipher-encoded puzzles and challenges",
      "Demonstrating why simple ciphers are vulnerable to frequency analysis"
    ],
    relatedSlugs: ["rot13", "encryption-tool", "morse-code"]
  },
  { slug: "password-strength", name: "Password Strength Checker", description: "Check how strong your password is and get improvement suggestions.", category: "crypto", icon: "💪", keywords: ["password strength", "password checker", "password security", "strong password"], subcategory: "analysis",
    longDescription: "Password Strength Checker analyzes your password against length, character variety, common patterns, and dictionary words to give you a real-time strength score and specific improvement suggestions. It runs entirely in your browser — your password is never transmitted or logged anywhere.",
    faqs: [
      { question: "How is password strength measured?", answer: "The checker evaluates password length, use of uppercase and lowercase letters, numbers, and special characters, and checks against known weak passwords and common substitution patterns to produce a strength score from very weak to very strong." },
      { question: "Is my password sent anywhere when I check it?", answer: "Absolutely not — all analysis happens locally in your browser using JavaScript. Your password never leaves your device and is not stored, logged, or transmitted to any server." },
      { question: "What makes a password truly strong?", answer: "A strong password is at least 16 characters long, uses a random mix of uppercase and lowercase letters, numbers, and symbols, avoids dictionary words and personal information, and is unique to each account." }
    ],
    howToSteps: [
      { name: "Type your password", text: "Enter the password you want to evaluate in the input field. A toggle lets you show or hide the characters as you type." },
      { name: "Review your strength score", text: "See your password rated on a scale from very weak to very strong, with a visual indicator showing the score." },
      { name: "Follow the improvement suggestions", text: "Read the specific suggestions provided (e.g., 'Add special characters' or 'Make it longer') and update your password accordingly." }
    ],
    useCases: [
      "Evaluating existing passwords before using them on sensitive accounts",
      "Verifying that a newly created password meets security best practices",
      "Learning what makes passwords stronger through interactive feedback",
      "Auditing passwords across multiple accounts to identify weak ones to replace"
    ],
    relatedSlugs: ["password-generator", "hash-generator", "credit-card-validator"]
  },
  { slug: "checksum-calculator", name: "Checksum Calculator", description: "Calculate and verify file checksums (MD5, SHA-1, SHA-256).", category: "crypto", icon: "✅", keywords: ["checksum", "file hash", "verify checksum", "file integrity"], subcategory: "hashing",
    longDescription: "Checksum Calculator computes MD5, SHA-1, and SHA-256 checksums for any file directly in your browser, helping you verify file integrity after download or transfer. Compare your calculated checksum against a publisher-provided value to confirm the file has not been corrupted or tampered with.",
    faqs: [
      { question: "What is a checksum and why is it important?", answer: "A checksum is a hash value calculated from a file's contents. Comparing a file's checksum against a trusted reference value confirms the file is complete and unmodified — important for verifying downloaded software, ISO images, and security-sensitive files." },
      { question: "Is my file uploaded to a server when calculating the checksum?", answer: "No — the checksum is calculated entirely within your browser using the Web Crypto API. Your file is never uploaded to any external server." },
      { question: "Which checksum algorithm should I use?", answer: "Use SHA-256 for security-sensitive verification (it is the current standard). MD5 and SHA-1 are faster but considered cryptographically weak and should only be used when the publisher only provides those values." }
    ],
    howToSteps: [
      { name: "Select your file", text: "Click 'Choose File' to select the file you want to calculate a checksum for. Large files may take a few seconds to process." },
      { name: "Choose the hash algorithm", text: "Select MD5, SHA-1, or SHA-256 depending on which algorithm the checksum you're verifying against was generated with." },
      { name: "Compare checksums", text: "Copy the calculated checksum and compare it against the reference value from the file's source. If they match, the file is intact." }
    ],
    useCases: [
      "Verifying the integrity of downloaded software or OS installation images",
      "Confirming that a file transferred over a network arrived without corruption",
      "Checking that a downloaded archive matches the publisher's provided checksum",
      "Detecting unauthorized modifications to files in a security audit"
    ],
    relatedSlugs: ["hash-generator", "encryption-tool", "bytes-converter"]
  },
  { slug: "ip-address-lookup", name: "IP Address Lookup", description: "Look up your public IP address and basic network information.", category: "crypto", icon: "🌐", keywords: ["ip address", "my ip", "ip lookup", "public ip", "what is my ip"], subcategory: "network",
    longDescription: "IP Address Lookup instantly displays your public IP address along with your approximate geographic location, ISP name, and connection type. It's the quickest way to find your external IP for configuring servers, firewalls, VPNs, or remote access tools.",
    faqs: [
      { question: "What is the difference between my public and private IP address?", answer: "Your private IP is assigned by your router and is only visible within your local network (e.g., 192.168.x.x). Your public IP is the address assigned by your ISP and is visible to websites and servers on the internet." },
      { question: "Why does my IP location show a different city than where I am?", answer: "IP geolocation maps your IP to a location based on ISP registration data, which often corresponds to a regional data center or ISP office rather than your exact physical location." },
      { question: "Will my IP address change?", answer: "Most residential ISPs assign dynamic IP addresses that can change when you restart your router or after a certain period. Static IP addresses (which don't change) are typically available as a paid add-on from your ISP." }
    ],
    howToSteps: [
      { name: "Open the IP Address Lookup tool", text: "Navigate to the tool and your public IP address is displayed automatically without any input required." },
      { name: "View your IP details", text: "See your public IP address, approximate location, ISP name, and connection type." },
      { name: "Copy your IP address", text: "Click 'Copy' next to your IP address to copy it to the clipboard for use in server configurations or support tickets." }
    ],
    useCases: [
      "Finding your public IP address to configure a firewall or server whitelist",
      "Verifying that a VPN is masking your real IP address correctly",
      "Diagnosing network issues by checking current IP assignment",
      "Setting up remote desktop or SSH access that requires your current external IP"
    ],
    relatedSlugs: ["whois-lookup", "user-agent-parser", "url-parser"]
  },
  { slug: "whois-lookup", name: "WHOIS Lookup", description: "Look up domain registration information.", category: "crypto", icon: "🔍", keywords: ["whois", "domain lookup", "domain info", "domain registration"], subcategory: "network",
    longDescription: "WHOIS Lookup queries the public WHOIS database to retrieve registration details for any domain name — including the registrant organization, registrar, registration and expiry dates, nameservers, and contact information. It's an essential tool for domain research, ownership verification, and security investigations.",
    faqs: [
      { question: "What information does a WHOIS lookup reveal?", answer: "A WHOIS record typically shows the domain registrar, registration date, expiry date, nameservers, and sometimes the registrant's name, organization, and contact details (though many registrants now use privacy protection services that redact personal information)." },
      { question: "Why might a WHOIS lookup show redacted contact information?", answer: "GDPR and many registrar privacy protection services (sometimes called WHOIS privacy or domain privacy) replace personal contact details with proxy information to protect domain owners from spam and unwanted contact." },
      { question: "Can I look up any domain with WHOIS?", answer: "You can look up nearly any publicly registered domain. Some ccTLDs (country-code domains) maintain their own WHOIS servers with varying levels of publicly available information." }
    ],
    howToSteps: [
      { name: "Enter the domain name", text: "Type the domain you want to look up (e.g., example.com) into the search field." },
      { name: "Submit the lookup", text: "Click 'Lookup' to query the WHOIS database and retrieve the domain's registration record." },
      { name: "Review the registration details", text: "View the registrar, creation and expiry dates, nameservers, and any available registrant information in the formatted results." }
    ],
    useCases: [
      "Checking when a domain is expiring before attempting to purchase it",
      "Identifying the owner or registrar of a domain for contact or legal purposes",
      "Verifying that a newly registered domain was successfully created",
      "Researching domain history and ownership as part of a security investigation"
    ],
    relatedSlugs: ["ip-address-lookup", "url-parser", "user-agent-parser"]
  },

  // ── New Crypto & Security Tools ──────────────────────────────
  { slug: "hmac-generator", name: "HMAC Generator", description: "Generate HMAC authentication codes using various hash algorithms.", category: "crypto", icon: "🔑", keywords: ["hmac", "hmac generator", "message authentication", "hmac sha256"], subcategory: "hashing",
    longDescription: "HMAC Generator computes Hash-based Message Authentication Codes (HMAC) using MD5, SHA-1, SHA-256, or SHA-512, combining your message with a secret key to produce a tamper-proof authentication code. Use it to verify API signatures, authenticate webhook payloads, or learn how HMAC works.",
    faqs: [
      { question: "What is HMAC and how does it differ from a regular hash?", answer: "HMAC combines a message with a secret key before hashing, so only someone with the same secret key can verify the hash. A regular hash has no key and can be computed by anyone — HMAC adds authentication to the integrity check." },
      { question: "Which HMAC algorithm should I use?", answer: "HMAC-SHA256 is the most widely used algorithm and is recommended for new implementations. HMAC-SHA512 provides a larger output for extra security. HMAC-MD5 and HMAC-SHA1 are legacy algorithms to avoid in new projects." },
      { question: "What is HMAC commonly used for?", answer: "HMAC is used to sign and verify API requests and webhook payloads (such as GitHub and Stripe webhooks), generate secure tokens, and authenticate messages in protocols like TLS." }
    ],
    howToSteps: [
      { name: "Enter your message and secret key", text: "Type the message or data payload and the secret key you want to use for the HMAC computation." },
      { name: "Select the hash algorithm", text: "Choose HMAC-SHA256 (recommended), HMAC-SHA512, HMAC-SHA1, or HMAC-MD5 from the algorithm selector." },
      { name: "Copy the HMAC output", text: "Click 'Generate' and copy the resulting HMAC digest in hex or base64 encoding for use in your application." }
    ],
    useCases: [
      "Verifying webhook signatures from services like Stripe, GitHub, and Shopify",
      "Signing API requests with a shared secret for client authentication",
      "Generating message authentication codes for secure communication channels",
      "Learning and testing HMAC implementations during development"
    ],
    relatedSlugs: ["hash-generator", "checksum-calculator", "encryption-tool"]
  },
  { slug: "bcrypt-generator", name: "Bcrypt Hash Generator", description: "Generate and verify bcrypt password hashes with configurable rounds.", category: "crypto", icon: "🔒", keywords: ["bcrypt", "bcrypt hash", "password hash", "bcrypt verify"], subcategory: "hashing",
    longDescription: "Bcrypt Hash Generator creates bcrypt-hashed passwords with a configurable work factor (cost rounds), and verifies whether a plaintext password matches a given bcrypt hash. Bcrypt is the industry-recommended algorithm for hashing user passwords due to its built-in salting and adjustable slowness.",
    faqs: [
      { question: "Why use bcrypt instead of SHA-256 for password storage?", answer: "SHA-256 is designed to be fast, making it vulnerable to brute-force and GPU-based attacks when used for passwords. Bcrypt is intentionally slow, and its adjustable cost factor lets you increase the work required as hardware gets faster." },
      { question: "What is the bcrypt cost factor (rounds)?", answer: "The cost factor determines how computationally expensive the hash is. A value of 10 (the default) is recommended for most applications. Increasing to 12 or 14 adds more protection but slows down authentication proportionally." },
      { question: "Can I verify a password against an existing bcrypt hash?", answer: "Yes — paste a bcrypt hash and the plaintext password into the verify section and click 'Verify' to check whether they match, without needing to re-hash." }
    ],
    howToSteps: [
      { name: "Enter the password to hash", text: "Type the password you want to hash into the input field." },
      { name: "Set the cost factor", text: "Choose a cost factor (default 10). Higher values are more secure but slower to compute — 10–12 is appropriate for most web applications." },
      { name: "Generate or verify the hash", text: "Click 'Hash' to generate a new bcrypt hash, or paste an existing bcrypt hash in the verify section to check a password against it." }
    ],
    useCases: [
      "Generating bcrypt password hashes for seeding test databases",
      "Verifying that a password matches a stored bcrypt hash during development",
      "Learning how bcrypt salting and work factors affect hash output",
      "Testing bcrypt cost factor performance on your server hardware"
    ],
    relatedSlugs: ["hash-generator", "password-strength", "password-generator"]
  },
  { slug: "ssl-checker", name: "SSL Certificate Checker", description: "Check SSL certificate details, expiry date, and chain validity.", category: "crypto", icon: "🔐", keywords: ["ssl checker", "certificate check", "https check", "ssl expiry"], subcategory: "network",
    longDescription: "SSL Certificate Checker retrieves and displays the full SSL/TLS certificate details for any domain — including the common name, issuer, validity period, expiry date, Subject Alternative Names, and certificate chain. Use it to monitor certificate expiry before it causes unexpected downtime.",
    faqs: [
      { question: "How do I check when my SSL certificate expires?", answer: "Enter your domain name and click 'Check'. The tool displays the 'Valid Until' date along with a warning if the certificate expires within the next 30 days." },
      { question: "What does it mean if the certificate chain is invalid?", answer: "An invalid chain usually means an intermediate certificate is missing or misconfigured on the server. This can cause browser security warnings even if the leaf certificate itself is valid." },
      { question: "Can I check SSL certificates for subdomains?", answer: "Yes — enter the full subdomain (e.g., app.example.com) to check its specific certificate, which may differ from the root domain's certificate." }
    ],
    howToSteps: [
      { name: "Enter the domain name", text: "Type the domain or subdomain you want to check (e.g., example.com or www.example.com)." },
      { name: "Run the check", text: "Click 'Check SSL' to retrieve the certificate information for that domain." },
      { name: "Review certificate details", text: "View the certificate issuer, valid date range, expiry date, and whether the full certificate chain is valid." }
    ],
    useCases: [
      "Monitoring SSL certificate expiry dates to prevent unexpected lapses",
      "Verifying that a newly installed SSL certificate is correctly configured",
      "Checking whether a wildcard certificate covers a specific subdomain",
      "Diagnosing SSL warnings by inspecting the certificate chain"
    ],
    relatedSlugs: ["whois-lookup", "ip-address-lookup", "url-parser"]
  },
  { slug: "csp-generator", name: "CSP Header Generator", description: "Generate Content Security Policy headers for your website.", category: "crypto", icon: "🛡️", keywords: ["csp generator", "content security policy", "security headers", "csp header"], subcategory: "analysis",
    longDescription: "CSP Header Generator helps you build a valid Content Security Policy header for your website by selecting trusted sources for scripts, styles, images, fonts, and other resource types through a guided interface. A properly configured CSP is one of the most effective defenses against cross-site scripting (XSS) attacks.",
    faqs: [
      { question: "What is a Content Security Policy?", answer: "A Content Security Policy (CSP) is an HTTP response header that tells browsers which sources of content are trusted for your site. It prevents malicious scripts from being injected and executed via XSS attacks by blocking untrusted resource loads." },
      { question: "Will adding a strict CSP break my website?", answer: "A strict CSP can block resources that were previously loaded without restriction. Always test in report-only mode first using the Content-Security-Policy-Report-Only header, review the violations, and adjust the policy before enforcing it." },
      { question: "How do I add the CSP header to my website?", answer: "Add the generated Content-Security-Policy header to your web server configuration (Apache, Nginx), your CDN, or as a meta tag in your HTML. The tool provides the exact header string to copy." }
    ],
    howToSteps: [
      { name: "Select your resource directives", text: "Use the checkboxes and input fields to specify trusted sources for scripts (script-src), styles (style-src), images (img-src), fonts, and other directives." },
      { name: "Review the generated header", text: "The tool assembles your selections into a valid Content-Security-Policy header string that you can preview and test." },
      { name: "Copy and deploy the header", text: "Copy the generated header string and add it to your web server configuration, CDN settings, or HTML meta tag." }
    ],
    useCases: [
      "Hardening a new website against XSS attacks by implementing a CSP from launch",
      "Developers updating an existing CSP to allow new trusted third-party resources",
      "Security engineers generating CSP headers as part of a security audit remediation",
      "Learning which directives to configure for a specific tech stack"
    ],
    relatedSlugs: ["meta-tag-generator", "htaccess-generator", "ssl-checker"]
  },
  { slug: "random-bytes-generator", name: "Random Bytes Generator", description: "Generate cryptographically secure random bytes in hex or base64.", category: "crypto", icon: "🎲", keywords: ["random bytes", "secure random", "crypto random", "random hex"], subcategory: "encryption",
    longDescription: "Random Bytes Generator uses the browser's Web Crypto API to produce cryptographically secure random byte sequences, output in hexadecimal or base64 encoding. Use it to generate secure tokens, salts, initialization vectors, API keys, and other security-critical random values.",
    faqs: [
      { question: "Why use cryptographically secure random bytes instead of Math.random()?", answer: "Math.random() is a pseudo-random number generator not suitable for security use. The Web Crypto API's getRandomValues() uses the OS's cryptographically secure random source, making it safe for generating tokens, keys, and salts." },
      { question: "How many bytes should I generate for a secure token?", answer: "For session tokens and API keys, 32 bytes (256 bits) is the standard recommendation. For initialization vectors (IVs) in AES-GCM, 12 bytes is standard. For salts, 16–32 bytes is typical." },
      { question: "What is the difference between hex and base64 output?", answer: "Hex encoding uses characters 0–9 and a–f, producing output twice as long as the byte count. Base64 uses 64 characters and produces output about 1.33× the byte count. Base64 is more compact and common in HTTP headers and JSON payloads." }
    ],
    howToSteps: [
      { name: "Set the number of bytes", text: "Enter the number of random bytes you want to generate (e.g., 16, 32, or 64 bytes)." },
      { name: "Choose the output format", text: "Select hexadecimal or base64 encoding for the output." },
      { name: "Generate and copy", text: "Click 'Generate' to produce new random bytes and copy the result to use as a token, key, salt, or IV in your application." }
    ],
    useCases: [
      "Generating secure session tokens or API keys for web applications",
      "Creating random salts for password hashing with bcrypt or Argon2",
      "Producing initialization vectors (IVs) for AES encryption",
      "Generating random nonces for cryptographic protocols"
    ],
    relatedSlugs: ["password-generator", "uuid-generator", "hash-generator"]
  },
  { slug: "pgp-key-generator", name: "RSA Key Pair Generator", description: "Generate RSA public/private key pairs for encryption.", category: "crypto", icon: "🗝️", keywords: ["rsa key", "key pair", "public key", "private key", "encryption key"], subcategory: "encryption",
    longDescription: "RSA Key Pair Generator creates public and private RSA key pairs at 2048-bit or 4096-bit strength entirely within your browser using the Web Crypto API. Use the generated keys for asymmetric encryption, digital signatures, SSH authentication, or learning how public-key cryptography works.",
    faqs: [
      { question: "What is the difference between 2048-bit and 4096-bit RSA keys?", answer: "4096-bit keys provide a higher security margin than 2048-bit keys but are slower to generate and use. 2048-bit is considered secure for most uses through 2030+; 4096-bit is recommended for long-lived keys or high-security applications." },
      { question: "In what format are the generated keys?", answer: "Keys are generated and exported in PEM format (the standard BEGIN RSA PRIVATE KEY / BEGIN PUBLIC KEY format), making them compatible with OpenSSL, SSH, TLS, and most cryptographic libraries." },
      { question: "Is it safe to generate RSA keys in the browser?", answer: "Yes — key generation uses the browser's Web Crypto API, which calls the operating system's cryptographically secure random number generator. The keys are generated locally and never transmitted anywhere." }
    ],
    howToSteps: [
      { name: "Choose key size", text: "Select 2048-bit for standard use or 4096-bit for higher security applications." },
      { name: "Generate the key pair", text: "Click 'Generate Keys' and wait a moment while the key pair is created using the Web Crypto API." },
      { name: "Copy and save your keys", text: "Copy the public key and private key from their respective panels. Store the private key securely — never share it." }
    ],
    useCases: [
      "Generating RSA keys for use in SSH server authentication",
      "Creating key pairs for asymmetric encryption in custom applications",
      "Learning how RSA public/private key cryptography works",
      "Producing test keys for development and staging environments"
    ],
    relatedSlugs: ["encryption-tool", "hash-generator", "password-generator"]
  },
  { slug: "dns-lookup", name: "DNS Lookup", description: "Look up DNS records for any domain: A, AAAA, MX, TXT, CNAME, and NS.", category: "crypto", icon: "🌐", keywords: ["dns lookup", "domain dns", "mx record", "dns records"], subcategory: "network",
    longDescription: "DNS Lookup queries the Domain Name System for any record type — A, AAAA, MX, TXT, CNAME, NS, SOA, and more — for any domain name. Use it to diagnose DNS propagation issues, verify email delivery records (SPF, DKIM, DMARC), or troubleshoot domain configuration problems.",
    faqs: [
      { question: "What DNS record types can I look up?", answer: "The tool supports A (IPv4 address), AAAA (IPv6 address), MX (mail server), TXT (text records including SPF and DKIM), CNAME (canonical name), NS (nameservers), SOA (start of authority), and PTR (reverse DNS) records." },
      { question: "How long does DNS propagation take?", answer: "DNS changes typically propagate within a few minutes to a few hours, but full worldwide propagation can take up to 48 hours due to TTL (Time to Live) caching across global DNS resolvers." },
      { question: "How do I check my SPF or DMARC records?", answer: "Look up the TXT records for your domain. SPF records appear as entries starting with 'v=spf1', DKIM records are found at the selector subdomain (e.g., selector._domainkey.example.com), and DMARC records are at _dmarc.example.com." }
    ],
    howToSteps: [
      { name: "Enter the domain name", text: "Type the domain you want to look up DNS records for (e.g., example.com)." },
      { name: "Select the record type", text: "Choose the DNS record type to query: A, AAAA, MX, TXT, CNAME, NS, or another supported type." },
      { name: "Review the results", text: "View the DNS records returned for your query, including record values, TTL values, and any relevant annotations." }
    ],
    useCases: [
      "Verifying DNS propagation after updating A records to a new server",
      "Checking MX records to diagnose email delivery problems",
      "Validating SPF, DKIM, and DMARC TXT records for email authentication",
      "Confirming CNAME and NS records after migrating to a new hosting provider"
    ],
    relatedSlugs: ["whois-lookup", "ip-address-lookup", "ssl-checker"]
  },
];
