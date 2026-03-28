export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  relatedTools: string[];
  relatedPosts: string[];
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-an-ssl-certificate",
    title: "What is an SSL Certificate? How to Check Your Site's SSL",
    description: "Learn what SSL certificates are, why they matter for security and SEO, and how to check any website's SSL certificate using free tools.",
    category: "Security",
    date: "2026-03-28",
    readTime: "8 min read",
    keywords: ["ssl certificate", "https", "ssl checker", "website security", "tls", "ssl explained"],
    relatedTools: ["ssl-checker", "dns-lookup", "redirect-checker"],
    relatedPosts: ["dns-records-explained", "how-to-create-strong-passwords"],
    content: `
<p>If you've ever noticed the padlock icon in your browser's address bar, you've seen SSL in action. But what exactly is an SSL certificate, how does it protect your data, and why does every website need one? This guide covers everything from the basics to hands-on certificate checking.</p>

<h2>What SSL Actually Means</h2>

<p>SSL stands for <strong>Secure Sockets Layer</strong>, a cryptographic protocol that encrypts communication between your browser and a web server. The modern version is technically called <strong>TLS</strong> (Transport Layer Security), but the term "SSL" stuck and is used interchangeably.</p>

<p>When you visit a site using HTTPS (note the "S"), your browser and the server perform a <strong>TLS handshake</strong> — a rapid exchange that establishes an encrypted connection. This ensures that anything you type — passwords, credit card numbers, personal data — is scrambled and unreadable to anyone intercepting the traffic.</p>

<div class="callout">
<strong>Key takeaway:</strong> SSL/TLS encrypts the data flowing between your browser and a website, preventing eavesdropping, tampering, and impersonation.
</div>

<h2>How SSL Certificates Work</h2>

<p>An SSL certificate is a small data file installed on a web server. It contains:</p>

<ul>
<li><strong>The domain name</strong> the certificate was issued for</li>
<li><strong>The organization</strong> that owns it (for OV/EV certificates)</li>
<li><strong>The issuer</strong> — a trusted Certificate Authority (CA) like Let's Encrypt, DigiCert, or Sectigo</li>
<li><strong>The public key</strong> used for encryption</li>
<li><strong>Validity dates</strong> — when the certificate starts and expires</li>
<li><strong>A digital signature</strong> from the CA confirming authenticity</li>
</ul>

<p>When your browser connects, it verifies this certificate against a list of trusted CAs built into your operating system. If everything checks out — the domain matches, the certificate hasn't expired, and the CA is trusted — the padlock appears and the connection proceeds securely.</p>

<h2>Types of SSL Certificates</h2>

<p>Not all certificates are created equal. There are three main validation levels:</p>

<h3>Domain Validation (DV)</h3>
<p>The most basic type. The CA only verifies that you control the domain — usually through a DNS record or email check. Issued in minutes. <strong>Let's Encrypt</strong> provides these for free, which is why HTTPS is now universal.</p>

<h3>Organization Validation (OV)</h3>
<p>The CA verifies your organization's identity — checking business registration and contact details. This takes a few days and shows your organization name in the certificate details. Common for business websites.</p>

<h3>Extended Validation (EV)</h3>
<p>The most rigorous check. The CA performs extensive verification of the legal entity, physical address, and operational existence. Historically showed a green bar in browsers (most browsers have removed this visual distinction). Used by banks and large enterprises.</p>

<div class="callout">
<strong>Key takeaway:</strong> For most websites, a free DV certificate from Let's Encrypt is sufficient. OV/EV certificates add organizational trust signals but don't provide stronger encryption.
</div>

<h2>Why SSL Matters for SEO</h2>

<p>Google has used HTTPS as a <strong>ranking signal</strong> since 2014. While it's a lightweight signal compared to content quality and backlinks, it still matters — especially when two pages are otherwise equal in quality.</p>

<p>Beyond rankings, SSL impacts user behavior:</p>

<ul>
<li><strong>Chrome marks HTTP sites as "Not Secure"</strong> — this warning drives visitors away and increases bounce rates</li>
<li><strong>Browser features require HTTPS</strong> — geolocation, service workers, camera access, and many modern web APIs only work over secure connections</li>
<li><strong>Referral data preservation</strong> — when traffic flows from HTTPS to HTTP, the referrer header is stripped, making analytics inaccurate</li>
</ul>

<h2>How to Check Any Website's SSL Certificate</h2>

<p>You can inspect an SSL certificate in several ways:</p>

<h3>Using ToolboxHub's SSL Checker</h3>
<p>The fastest method — enter any domain in our <a href="/tools/ssl-checker">SSL Certificate Checker</a> and instantly see the issuer, validity dates, days until expiry, protocol version, cipher suite, and Subject Alternative Names. No technical knowledge required.</p>

<h3>Using Your Browser</h3>
<p>Click the padlock icon in the address bar, then "Connection is secure" > "Certificate is valid." This shows the certificate details including issuer, validity, and the full certificate chain.</p>

<h3>Using the Command Line</h3>
<p>For developers, OpenSSL provides the most detail:</p>

<pre><code>openssl s_client -connect example.com:443 -servername example.com</code></pre>

<p>This outputs the entire certificate chain, protocol version, cipher, and session details.</p>

<h2>Common SSL Problems and How to Fix Them</h2>

<h3>Expired Certificate</h3>
<p>Certificates have a maximum validity of 398 days (13 months). If your certificate expires, browsers will show a full-page warning that blocks visitors. <strong>Solution:</strong> Set up auto-renewal. If you use Let's Encrypt, certbot handles this automatically. Our <a href="/tools/ssl-checker">SSL Checker</a> shows exactly how many days until expiry.</p>

<h3>Mixed Content</h3>
<p>Your page loads over HTTPS, but some resources (images, scripts, stylesheets) still load over HTTP. Browsers block these or show warnings. <strong>Solution:</strong> Update all resource URLs to use HTTPS or protocol-relative URLs.</p>

<h3>Certificate Name Mismatch</h3>
<p>The domain in the certificate doesn't match the domain being visited. Common when accessing a site via a subdomain that's not in the certificate's SAN list. <strong>Solution:</strong> Use a wildcard certificate or add the subdomain to the SAN list.</p>

<h3>Incomplete Certificate Chain</h3>
<p>The server sends the leaf certificate but not the intermediate certificates. Some browsers can fetch the missing intermediates, but others can't. <strong>Solution:</strong> Configure your server to send the full chain.</p>

<div class="callout">
<strong>Key takeaway:</strong> Most SSL problems boil down to expired certificates, mixed HTTP/HTTPS content, or incomplete chain configuration. All are fixable in minutes once identified.
</div>

<h2>SSL Certificate Best Practices</h2>

<ul>
<li><strong>Auto-renew:</strong> Never rely on manual renewal. Use Let's Encrypt with certbot or your hosting provider's auto-renewal</li>
<li><strong>Use TLS 1.2+:</strong> Disable older protocols (SSL 3.0, TLS 1.0, TLS 1.1) which have known vulnerabilities</li>
<li><strong>Enable HSTS:</strong> The Strict-Transport-Security header tells browsers to always use HTTPS, preventing downgrade attacks</li>
<li><strong>Monitor expiry:</strong> Set up alerts for certificate expiration — use our <a href="/tools/ssl-checker">SSL Checker</a> to check current status</li>
<li><strong>Test regularly:</strong> Run periodic checks to catch mixed content, weak ciphers, or chain issues before your users do</li>
</ul>

<h2>Check Your Certificate Now</h2>

<p>Don't wait for browser warnings to discover SSL issues. Use our free <a href="/tools/ssl-checker">SSL Certificate Checker</a> to instantly verify your certificate's status, expiry date, issuer, and security configuration. You can also run a <a href="/tools/dns-lookup">DNS Lookup</a> to verify your domain's records or use the <a href="/tools/redirect-checker">Redirect Checker</a> to ensure HTTP properly redirects to HTTPS.</p>
`,
  },
  {
    slug: "dns-records-explained",
    title: "DNS Records Explained: A Complete Beginner's Guide",
    description: "Understand DNS record types — A, AAAA, MX, CNAME, TXT, NS, SOA — what each does, when to use them, and how to look them up.",
    category: "Networking",
    date: "2026-03-28",
    readTime: "10 min read",
    keywords: ["dns records", "dns explained", "a record", "mx record", "cname record", "dns lookup", "domain name system"],
    relatedTools: ["dns-lookup", "whois-lookup", "domain-availability"],
    relatedPosts: ["what-is-an-ssl-certificate", "what-is-base64-encoding"],
    content: `
<p>Every time you type a website address into your browser, the Domain Name System (DNS) translates that human-readable name into an IP address that computers can use. DNS records are the instructions that make this translation possible. This guide explains every common record type, when you'd use each one, and how to look them up.</p>

<h2>What is DNS?</h2>

<p>The Domain Name System is often called the <strong>"phone book of the internet."</strong> Just as a phone book maps names to phone numbers, DNS maps domain names (like <code>example.com</code>) to IP addresses (like <code>93.184.216.34</code>).</p>

<p>When you visit a website, your browser asks a <strong>DNS resolver</strong> (usually run by your ISP or a public service like Cloudflare's 1.1.1.1 or Google's 8.8.8.8) to look up the domain. The resolver queries authoritative nameservers to find the correct records, then returns the answer. This entire process typically takes 20-100 milliseconds.</p>

<div class="callout">
<strong>Key takeaway:</strong> DNS is the system that translates domain names into IP addresses. DNS records are the individual entries that tell the system where to direct traffic, email, and verification requests.
</div>

<h2>A Record — The Foundation</h2>

<p>The <strong>A record</strong> (Address record) maps a domain name to an <strong>IPv4 address</strong>. This is the most fundamental DNS record — it tells the internet where your website's server is located.</p>

<p><strong>Example:</strong></p>
<pre><code>example.com  →  93.184.216.34</code></pre>

<p>Most domains have at least one A record. Some have multiple A records pointing to different servers for load balancing — when a DNS resolver gets multiple A records, it typically rotates between them (round-robin DNS).</p>

<p><strong>When to use it:</strong> To point your domain or subdomain to a server's IPv4 address. This is the first record you'll set up when launching a website.</p>

<h2>AAAA Record — IPv6 Addresses</h2>

<p>The <strong>AAAA record</strong> (also called "quad-A") does the same thing as an A record, but for <strong>IPv6 addresses</strong>. IPv6 addresses are the newer, longer format designed to replace IPv4 as the internet runs out of 4-billion-address space.</p>

<p><strong>Example:</strong></p>
<pre><code>example.com  →  2606:2800:220:1:248:1893:25c8:1946</code></pre>

<p><strong>When to use it:</strong> When your server supports IPv6. Adding AAAA records alongside A records ensures your site is accessible to IPv6-only networks, which are increasingly common on mobile carriers.</p>

<h2>CNAME Record — Aliases</h2>

<p>A <strong>CNAME record</strong> (Canonical Name) creates an alias from one domain name to another. Instead of pointing to an IP address, it points to another domain name, which is then resolved to an IP.</p>

<p><strong>Example:</strong></p>
<pre><code>www.example.com  →  example.com  →  93.184.216.34</code></pre>

<p>The most common use is making <code>www.example.com</code> an alias for <code>example.com</code>. But CNAMEs are also essential for SaaS services — when you set up a custom domain for a tool like GitHub Pages or Vercel, you create a CNAME pointing to their servers.</p>

<p><strong>Important rule:</strong> A CNAME cannot coexist with other records for the same name. You can't have both a CNAME and an MX record on <code>example.com</code>. This is why CNAMEs are typically used on subdomains, not the root domain.</p>

<div class="callout">
<strong>Key takeaway:</strong> CNAME records are aliases — they point one domain to another. They're essential for SaaS integrations and the www subdomain, but cannot be used on the root domain alongside other records.
</div>

<h2>MX Record — Email Routing</h2>

<p>The <strong>MX record</strong> (Mail Exchange) tells email servers where to deliver mail for your domain. Without MX records, email sent to <code>you@example.com</code> has nowhere to go.</p>

<p><strong>Example:</strong></p>
<pre><code>example.com  MX  10  mail1.example.com
example.com  MX  20  mail2.example.com</code></pre>

<p>The number (10, 20) is the <strong>priority</strong> — lower numbers are tried first. In this example, mail servers will try <code>mail1</code> first; if it's unavailable, they fall back to <code>mail2</code>. This provides redundancy for email delivery.</p>

<p><strong>When to use it:</strong> Whenever you want to receive email on your domain. If you use Google Workspace, Microsoft 365, or any email provider, they'll give you specific MX records to add.</p>

<h2>TXT Record — Verification and Security</h2>

<p>The <strong>TXT record</strong> stores arbitrary text data. While it sounds simple, TXT records have become critical for email security and domain verification:</p>

<ul>
<li><strong>SPF (Sender Policy Framework):</strong> Lists which mail servers are authorized to send email on behalf of your domain. Prevents email spoofing.</li>
<li><strong>DKIM (DomainKeys Identified Mail):</strong> Contains a public key used to verify that emails weren't tampered with in transit.</li>
<li><strong>DMARC:</strong> Tells receiving servers what to do with emails that fail SPF/DKIM checks — reject them, quarantine them, or let them through.</li>
<li><strong>Domain verification:</strong> Services like Google Search Console, Microsoft 365, and various SaaS tools ask you to add a specific TXT record to prove you own a domain.</li>
</ul>

<p><strong>Example SPF record:</strong></p>
<pre><code>example.com  TXT  "v=spf1 include:_spf.google.com ~all"</code></pre>

<p>This says "only Google's mail servers are authorized to send email for this domain."</p>

<h2>NS Record — Nameserver Delegation</h2>

<p>The <strong>NS record</strong> (Name Server) specifies which DNS servers are authoritative for your domain. These are the servers that hold the "source of truth" for all your other DNS records.</p>

<p><strong>Example:</strong></p>
<pre><code>example.com  NS  ns1.cloudflare.com
example.com  NS  ns2.cloudflare.com</code></pre>

<p>When you buy a domain from a registrar and want to use Cloudflare's DNS, you update the NS records to point to Cloudflare's nameservers. Multiple NS records provide redundancy — if one nameserver is down, others can answer queries.</p>

<p><strong>When to use it:</strong> When changing DNS providers or setting up subdomain delegation (pointing a subdomain to a different DNS provider than the parent domain).</p>

<h2>SOA Record — Zone Authority</h2>

<p>The <strong>SOA record</strong> (Start of Authority) contains administrative information about the DNS zone. Every domain has exactly one SOA record, and it's mostly managed automatically by your DNS provider.</p>

<p>It includes the primary nameserver, the responsible person's email (encoded in a specific format), a serial number that increments with each change, and timing values for how often secondary nameservers should refresh their copies.</p>

<p><strong>When to use it:</strong> You rarely need to manually edit SOA records. DNS providers manage them automatically. The serial number is useful for debugging — if it hasn't changed, your DNS update hasn't propagated yet.</p>

<div class="callout">
<strong>Key takeaway:</strong> SOA records are administrative metadata about your DNS zone. They're managed automatically, but the serial number is useful for debugging propagation issues.
</div>

<h2>How to Look Up DNS Records</h2>

<p>There are several ways to check a domain's DNS records:</p>

<h3>Using ToolboxHub's DNS Lookup</h3>
<p>The easiest way — enter any domain in our <a href="/tools/dns-lookup">DNS Lookup Tool</a> and check all record types (A, AAAA, MX, NS, TXT, CNAME, SOA) with one click. Results appear instantly with clear formatting.</p>

<h3>Using the Command Line</h3>
<p>On macOS and Linux, use <code>dig</code>:</p>
<pre><code>dig example.com A
dig example.com MX
dig example.com TXT</code></pre>

<p>On Windows, use <code>nslookup</code>:</p>
<pre><code>nslookup -type=MX example.com</code></pre>

<h2>Common DNS Mistakes to Avoid</h2>

<ul>
<li><strong>Missing SPF/DKIM/DMARC:</strong> Without email authentication records, your emails are more likely to land in spam — and attackers can spoof your domain</li>
<li><strong>CNAME at the root:</strong> You can't use a CNAME on your bare domain. Use an A record (or ALIAS/ANAME if your DNS provider supports it)</li>
<li><strong>Forgetting the trailing dot:</strong> In some DNS configurations, <code>example.com</code> is relative and <code>example.com.</code> is absolute. Getting this wrong can create weird loops</li>
<li><strong>Ignoring TTL:</strong> Setting very high TTL values means DNS changes take longer to propagate. Before making changes, lower the TTL first, wait for propagation, make your change, then raise it again</li>
<li><strong>Not verifying after changes:</strong> Always verify your DNS changes with a <a href="/tools/dns-lookup">DNS Lookup</a> after making them. DNS propagation can take up to 48 hours, but most changes are visible within minutes</li>
</ul>

<h2>Start Exploring Your DNS</h2>

<p>Understanding DNS records gives you control over how your domain works — where your website points, how email is routed, and how your domain is verified. Use our free <a href="/tools/dns-lookup">DNS Lookup Tool</a> to explore any domain's records, or check domain registration details with the <a href="/tools/whois-lookup">WHOIS Lookup</a>. If you're shopping for a domain, the <a href="/tools/domain-availability">Domain Availability Checker</a> can help you find the perfect name.</p>
`,
  },
  {
    slug: "what-is-base64-encoding",
    title: "What is Base64 Encoding? When and How to Use It",
    description: "Understand Base64 encoding — what it is, why it exists, how it works under the hood, and practical use cases from data URIs to API authentication.",
    category: "Development",
    date: "2026-03-31",
    readTime: "7 min read",
    keywords: ["base64 encoding", "base64 decode", "base64 explained", "data uri", "base64 image", "encoding vs encryption"],
    relatedTools: ["base64-encoder", "image-to-base64", "url-encoder", "jwt-decoder"],
    relatedPosts: ["json-guide-for-beginners"],
    content: `
<p>Base64 is one of those things every developer encounters but few truly understand. You see it in email attachments, data URIs, API tokens, and JWTs. But what exactly is Base64 encoding, and why does it exist? This guide explains everything from the underlying math to real-world applications.</p>

<h2>What Base64 Encoding Actually Does</h2>

<p>Base64 is a <strong>binary-to-text encoding scheme</strong> that converts binary data into a string of printable ASCII characters. It takes any sequence of bytes — an image, a PDF, raw binary data — and represents it using only 64 characters: <code>A-Z</code>, <code>a-z</code>, <code>0-9</code>, <code>+</code>, and <code>/</code>, with <code>=</code> used for padding.</p>

<p>The name "Base64" comes from the fact that it uses a 64-character alphabet to represent data. Compare this to Base10 (decimal, 10 digits), Base16 (hexadecimal, 16 characters), or Base2 (binary, 2 digits).</p>

<div class="callout">
<strong>Key takeaway:</strong> Base64 is not encryption — it provides no security. It's a way to represent binary data as safe, printable text for transport through systems that only handle text.
</div>

<h2>How Base64 Works Under the Hood</h2>

<p>The encoding process follows a simple algorithm:</p>

<ol>
<li><strong>Take 3 bytes</strong> (24 bits) of input data</li>
<li><strong>Split into 4 groups</strong> of 6 bits each</li>
<li><strong>Map each 6-bit group</strong> to a character from the Base64 alphabet</li>
<li><strong>If the input isn't divisible by 3</strong>, pad the output with <code>=</code> characters</li>
</ol>

<p>For example, the text <code>Hi</code> (two bytes: <code>01001000 01101001</code>) gets split into three 6-bit groups: <code>010010</code>, <code>000110</code>, <code>1001xx</code>. The last group is padded with zeros. These map to <code>S</code>, <code>G</code>, <code>k</code>, and <code>=</code> — giving us <code>SGk=</code>.</p>

<p>This is why Base64 encoding <strong>increases data size by about 33%</strong>. Every 3 bytes of input become 4 bytes of output. A 1 MB image becomes roughly 1.33 MB when Base64 encoded.</p>

<h2>Why Base64 Exists</h2>

<p>Base64 solves a specific problem: <strong>many systems can only handle text</strong>. Email was designed for 7-bit ASCII text, not binary data. HTTP headers must be text. JSON values must be strings. XML content must be valid character data.</p>

<p>When you need to send binary data through these text-only channels, you have two options: escape every problematic byte (messy and format-specific) or encode the entire thing into safe characters (clean and universal). Base64 is that universal encoding.</p>

<h2>Common Use Cases</h2>

<h3>Data URIs (Inline Images in HTML/CSS)</h3>
<p>Instead of linking to an external image file, you can embed the image directly in your HTML or CSS using a data URI:</p>

<pre><code>&lt;img src="data:image/png;base64,iVBORw0KGgo..." /&gt;</code></pre>

<p>This eliminates an HTTP request, which can speed up page loads for small images (icons, logos under 5 KB). For larger images, the 33% size increase makes data URIs counterproductive. Use our <a href="/tools/image-to-base64">Image to Base64</a> tool to convert images instantly.</p>

<h3>API Authentication (Basic Auth)</h3>
<p>HTTP Basic Authentication encodes credentials as <code>username:password</code> in Base64:</p>

<pre><code>Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=</code></pre>

<p>That string decodes to <code>username:password</code>. Remember: this is <strong>encoding, not encryption</strong>. Anyone can decode it. Basic Auth must always be used over HTTPS.</p>

<h3>JSON Web Tokens (JWTs)</h3>
<p>JWTs use Base64URL encoding (a URL-safe variant) for their header and payload sections. The three parts of a JWT — header, payload, signature — are each Base64URL-encoded and joined with dots. Try decoding one with our <a href="/tools/jwt-decoder">JWT Decoder</a>.</p>

<h3>Email Attachments (MIME)</h3>
<p>Email was designed for text. When you attach a PDF or image to an email, the mail client Base64-encodes it and includes it in the message body with a MIME content-type header. The recipient's client decodes it back to the original file.</p>

<h3>Storing Binary Data in JSON/XML</h3>
<p>JSON has no binary type. If you need to include a small binary blob — a cryptographic signature, a thumbnail, a protobuf message — Base64 encoding is the standard approach.</p>

<div class="callout">
<strong>Key takeaway:</strong> Use Base64 when you need to pass binary data through text-only channels. Don't use it as a security measure — it's trivially reversible.
</div>

<h2>Base64 vs URL Encoding vs Hex Encoding</h2>

<p>These encodings serve different purposes:</p>

<ul>
<li><strong>Base64:</strong> Encodes binary data as text. Use for embedding files, transmitting binary through text protocols</li>
<li><strong>URL encoding (percent-encoding):</strong> Escapes special characters in URLs. <code>hello world</code> becomes <code>hello%20world</code>. Use our <a href="/tools/url-encoder">URL Encoder</a> for this</li>
<li><strong>Hex encoding:</strong> Represents each byte as two hex characters. Doubles the size (vs. 33% for Base64) but is easier to read for debugging</li>
</ul>

<h2>Base64 Variants</h2>

<p>The standard Base64 alphabet uses <code>+</code> and <code>/</code>, which are problematic in URLs (they have special meanings). <strong>Base64URL</strong> replaces these with <code>-</code> and <code>_</code>, making the output URL-safe. JWTs and many APIs use Base64URL.</p>

<p>Some implementations also omit the <code>=</code> padding, since the decoder can calculate the original length from the output length.</p>

<h2>When NOT to Use Base64</h2>

<ul>
<li><strong>Large files:</strong> The 33% size increase adds up. Serve images and files directly instead of embedding them</li>
<li><strong>Security:</strong> Base64 is not encryption. Never use it to "hide" passwords or sensitive data</li>
<li><strong>Human-readable data:</strong> If the data is already text, Base64 encoding just makes it unreadable for no benefit</li>
<li><strong>Performance-critical paths:</strong> Encoding and decoding has a CPU cost. For high-throughput systems, prefer binary protocols</li>
</ul>

<h2>Encode and Decode Base64 Instantly</h2>

<p>Need to encode or decode Base64 right now? Our free <a href="/tools/base64-encoder">Base64 Encoder & Decoder</a> handles text and files instantly in your browser. For images specifically, the <a href="/tools/image-to-base64">Image to Base64</a> converter generates ready-to-use data URIs.</p>
`,
  },
  {
    slug: "json-guide-for-beginners",
    title: "Understanding JSON: The Complete Beginner's Guide",
    description: "Learn what JSON is, its syntax rules, data types, common mistakes, and how to work with it effectively using free tools.",
    category: "Development",
    date: "2026-04-02",
    readTime: "9 min read",
    keywords: ["json", "json format", "json syntax", "json example", "what is json", "json vs xml", "json formatter"],
    relatedTools: ["json-formatter", "csv-to-json", "xml-to-json", "yaml-to-json", "json-to-typescript"],
    relatedPosts: ["what-is-base64-encoding"],
    content: `
<p>JSON (JavaScript Object Notation) is the most widely used data format on the web. Every API you've ever used, every configuration file you've read, every database query result you've seen — chances are JSON was involved. This guide explains everything from basic syntax to advanced patterns.</p>

<h2>What JSON Is (and Isn't)</h2>

<p>JSON is a <strong>lightweight text-based data interchange format</strong>. Despite its name, JSON is language-independent — it's used in Python, Java, Go, Ruby, PHP, and virtually every programming language, not just JavaScript.</p>

<p>JSON was derived from JavaScript object literal syntax, which is why it looks familiar to JavaScript developers. But JSON is stricter than JavaScript: keys must be double-quoted, trailing commas are forbidden, and comments aren't allowed.</p>

<div class="callout">
<strong>Key takeaway:</strong> JSON is a text format for representing structured data. It's human-readable, machine-parseable, and the de facto standard for web APIs.
</div>

<h2>JSON Syntax Rules</h2>

<p>JSON has only two structural types:</p>

<h3>Objects (Key-Value Pairs)</h3>
<p>Objects are wrapped in curly braces. Keys must be strings (double-quoted). Values can be any JSON type:</p>

<pre><code>{
  "name": "ToolboxHub",
  "tools": 500,
  "free": true,
  "url": "https://toolboxhub.net"
}</code></pre>

<h3>Arrays (Ordered Lists)</h3>
<p>Arrays are wrapped in square brackets and contain comma-separated values:</p>

<pre><code>["text", "developer", "math", "converter"]</code></pre>

<h3>The Six Value Types</h3>
<ul>
<li><strong>String:</strong> <code>"hello"</code> — double quotes only, supports escape sequences (<code>\\n</code>, <code>\\t</code>, <code>\\u0041</code>)</li>
<li><strong>Number:</strong> <code>42</code>, <code>3.14</code>, <code>-1</code>, <code>2.5e10</code> — no leading zeros, no hex, no NaN/Infinity</li>
<li><strong>Boolean:</strong> <code>true</code> or <code>false</code> — lowercase only</li>
<li><strong>Null:</strong> <code>null</code> — lowercase only</li>
<li><strong>Object:</strong> <code>{}</code> — nested key-value pairs</li>
<li><strong>Array:</strong> <code>[]</code> — nested ordered lists</li>
</ul>

<p>That's it. No dates, no functions, no undefined, no comments. JSON's simplicity is its greatest strength.</p>

<h2>Common JSON Mistakes</h2>

<h3>Trailing Commas</h3>
<p>JavaScript allows trailing commas. JSON does not:</p>
<pre><code>// INVALID JSON
{ "name": "test", "value": 42, }

// VALID JSON
{ "name": "test", "value": 42 }</code></pre>

<h3>Single Quotes</h3>
<p>JSON requires double quotes for strings and keys. Single quotes are invalid:</p>
<pre><code>// INVALID
{ 'name': 'test' }

// VALID
{ "name": "test" }</code></pre>

<h3>Unquoted Keys</h3>
<p>JavaScript allows unquoted keys. JSON does not:</p>
<pre><code>// INVALID
{ name: "test" }

// VALID
{ "name": "test" }</code></pre>

<h3>Comments</h3>
<p>JSON has no comment syntax. Neither <code>//</code> nor <code>/* */</code> is valid. If you need comments in configuration files, consider JSONC (JSON with Comments, supported by VS Code) or YAML.</p>

<div class="callout">
<strong>Key takeaway:</strong> Most JSON syntax errors come from trailing commas, single quotes, unquoted keys, or comments. Use a <a href="/tools/json-formatter">JSON Formatter</a> to catch these instantly.
</div>

<h2>JSON vs Other Formats</h2>

<h3>JSON vs XML</h3>
<p>XML was the dominant data format before JSON. JSON won because it's less verbose — the same data takes roughly half the bytes in JSON vs XML. JSON is also easier to parse in JavaScript (one function call vs DOM traversal). XML still has strengths: namespaces, schemas, and mixed content (text with embedded markup).</p>

<p>Need to convert between them? Use our <a href="/tools/xml-to-json">XML to JSON Converter</a>.</p>

<h3>JSON vs YAML</h3>
<p>YAML is a superset of JSON that adds features: comments, multiline strings, anchors, and a less punctuation-heavy syntax. YAML is popular for configuration files (Docker Compose, Kubernetes, GitHub Actions). For APIs and data interchange, JSON remains standard.</p>

<p>Convert between them with our <a href="/tools/yaml-to-json">YAML to JSON Converter</a>.</p>

<h3>JSON vs CSV</h3>
<p>CSV is simpler and more compact for tabular data. JSON handles nested and hierarchical data that CSV cannot represent. Use our <a href="/tools/csv-to-json">CSV to JSON Converter</a> when you need to transform spreadsheet data into a structured format.</p>

<h2>Working with JSON in Practice</h2>

<h3>Pretty-Printing</h3>
<p>Minified JSON (no whitespace) is efficient for transmission but unreadable. Pretty-printed JSON (with indentation) is essential for debugging and reviewing data. Our <a href="/tools/json-formatter">JSON Formatter</a> instantly pretty-prints, validates, and highlights syntax errors.</p>

<h3>Generating TypeScript Types from JSON</h3>
<p>When working with APIs, you often receive JSON responses and need to create TypeScript interfaces. Instead of writing them manually, paste a JSON sample into our <a href="/tools/json-to-typescript">JSON to TypeScript</a> converter to generate accurate type definitions.</p>

<h2>JSON Best Practices</h2>

<ul>
<li><strong>Use consistent naming conventions:</strong> <code>camelCase</code> is most common in JavaScript ecosystems, <code>snake_case</code> in Python/Ruby ecosystems</li>
<li><strong>Avoid deeply nested structures:</strong> More than 3-4 levels of nesting makes data hard to work with. Flatten where possible</li>
<li><strong>Use arrays for ordered collections, objects for named properties:</strong> Don't use objects with numeric keys as a poor substitute for arrays</li>
<li><strong>Include null for missing values, not empty strings:</strong> <code>"email": null</code> is clearer than <code>"email": ""</code></li>
<li><strong>Represent dates as ISO 8601 strings:</strong> <code>"2026-03-28T12:00:00Z"</code> is unambiguous and sortable</li>
<li><strong>Validate JSON before using it:</strong> A single syntax error makes the entire document invalid. Always validate</li>
</ul>

<h2>Start Working with JSON</h2>

<p>Format, validate, and convert JSON instantly with our free <a href="/tools/json-formatter">JSON Formatter</a>. Need to convert data? Try the <a href="/tools/csv-to-json">CSV to JSON</a>, <a href="/tools/xml-to-json">XML to JSON</a>, or <a href="/tools/yaml-to-json">YAML to JSON</a> converters.</p>
`,
  },
  {
    slug: "regex-beginners-guide",
    title: "Regular Expressions: A Practical Guide for Beginners",
    description: "Learn regular expressions from scratch — patterns, quantifiers, character classes, groups, and real-world examples you can use immediately.",
    category: "Development",
    date: "2026-04-04",
    readTime: "11 min read",
    keywords: ["regex", "regular expressions", "regex tutorial", "regex examples", "regex cheat sheet", "regex patterns"],
    relatedTools: ["regex-tester", "find-and-replace", "extract-emails", "extract-urls"],
    relatedPosts: ["json-guide-for-beginners"],
    content: `
<p>Regular expressions (regex) are one of the most powerful — and most feared — tools in programming. They let you search, match, and manipulate text with surgical precision. The syntax looks cryptic at first, but the core concepts are surprisingly simple. This guide teaches you regex through practical, real-world examples.</p>

<h2>What Regular Expressions Are</h2>

<p>A regular expression is a <strong>pattern that describes a set of strings</strong>. Think of it as a search query with superpowers. Where a normal search finds exact matches ("hello" finds only "hello"), a regex can find patterns ("any word starting with h and ending with o").</p>

<p>Every programming language supports regex: JavaScript, Python, Java, Go, PHP, Ruby, C#. The syntax is mostly consistent across languages, with minor flavor differences. You can test patterns instantly with our <a href="/tools/regex-tester">Regex Tester</a>.</p>

<div class="callout">
<strong>Key takeaway:</strong> Regex is a pattern language for matching text. Learn the basics and you'll use it daily — in code, in your editor, and in command-line tools.
</div>

<h2>Literal Characters</h2>

<p>The simplest regex is just literal text. The pattern <code>hello</code> matches the string "hello" exactly. Most characters match themselves — letters, numbers, spaces. The exceptions are <strong>special characters</strong> (metacharacters) that have special meaning: <code>. * + ? ^ $ { } [ ] ( ) | \\</code>.</p>

<p>To match a literal special character, escape it with a backslash: <code>\\.</code> matches an actual period, <code>\\$</code> matches a dollar sign.</p>

<h2>Character Classes</h2>

<p>Character classes match <strong>one character from a set of options</strong>:</p>

<ul>
<li><code>[aeiou]</code> — matches any vowel</li>
<li><code>[0-9]</code> — matches any digit</li>
<li><code>[a-zA-Z]</code> — matches any letter</li>
<li><code>[^0-9]</code> — matches anything <em>except</em> a digit (the <code>^</code> inside brackets negates)</li>
</ul>

<p>Common shorthand classes save typing:</p>

<ul>
<li><code>\\d</code> — any digit (same as <code>[0-9]</code>)</li>
<li><code>\\w</code> — any "word character" (letter, digit, or underscore)</li>
<li><code>\\s</code> — any whitespace (space, tab, newline)</li>
<li><code>\\D</code>, <code>\\W</code>, <code>\\S</code> — the negated versions of the above</li>
<li><code>.</code> — any character except newline (the wildcard)</li>
</ul>

<h2>Quantifiers — How Many?</h2>

<p>Quantifiers specify <strong>how many times</strong> the preceding element should repeat:</p>

<ul>
<li><code>*</code> — zero or more times</li>
<li><code>+</code> — one or more times</li>
<li><code>?</code> — zero or one time (optional)</li>
<li><code>{3}</code> — exactly 3 times</li>
<li><code>{2,5}</code> — between 2 and 5 times</li>
<li><code>{3,}</code> — 3 or more times</li>
</ul>

<p><strong>Examples:</strong></p>
<ul>
<li><code>\\d+</code> — one or more digits (matches "42", "7", "12345")</li>
<li><code>\\w{3,8}</code> — a word between 3 and 8 characters long</li>
<li><code>https?</code> — matches "http" or "https" (the "s" is optional)</li>
</ul>

<h2>Anchors — Where to Match</h2>

<ul>
<li><code>^</code> — start of string (or line, with multiline flag)</li>
<li><code>$</code> — end of string (or line)</li>
<li><code>\\b</code> — word boundary (between a word character and a non-word character)</li>
</ul>

<p><strong>Examples:</strong></p>
<ul>
<li><code>^Hello</code> — matches "Hello" only at the start of the string</li>
<li><code>world$</code> — matches "world" only at the end</li>
<li><code>\\bcat\\b</code> — matches the word "cat" but not "category" or "concatenate"</li>
</ul>

<div class="callout">
<strong>Key takeaway:</strong> Anchors don't match characters — they match positions. Use <code>^</code> and <code>$</code> to ensure your pattern matches the entire string, not just a substring.
</div>

<h2>Groups and Alternation</h2>

<p>Parentheses <code>()</code> create groups. Groups serve two purposes: they apply quantifiers to multiple characters, and they capture the matched text for later use.</p>

<ul>
<li><code>(abc)+</code> — matches "abc" repeated one or more times: "abc", "abcabc"</li>
<li><code>(cat|dog)</code> — matches "cat" or "dog" (alternation with <code>|</code>)</li>
<li><code>(\\d{3})-(\\d{4})</code> — matches and captures phone number parts like "555-1234"</li>
</ul>

<h2>Practical Regex Patterns</h2>

<h3>Email Address (Simplified)</h3>
<pre><code>[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}</code></pre>
<p>This matches most common email formats. For production use, email validation is notoriously complex — the full RFC 5322 spec is impractical as a regex. Our <a href="/tools/extract-emails">Extract Emails</a> tool handles this for you.</p>

<h3>URL</h3>
<pre><code>https?://[\\w.-]+(?:\\.[a-zA-Z]{2,})(?:/[\\w./?#&=-]*)?</code></pre>
<p>Matches HTTP and HTTPS URLs. Extract all URLs from text with our <a href="/tools/extract-urls">URL Extractor</a>.</p>

<h3>IP Address (IPv4)</h3>
<pre><code>\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b</code></pre>
<p>Note: this matches the format but doesn't validate that each octet is 0-255. A proper validator needs additional logic.</p>

<h3>Date (YYYY-MM-DD)</h3>
<pre><code>\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])</code></pre>

<h3>Hex Color</h3>
<pre><code>#(?:[0-9a-fA-F]{3}){1,2}\\b</code></pre>
<p>Matches both short (#FFF) and long (#FFFFFF) hex color codes.</p>

<h2>Greedy vs Lazy Matching</h2>

<p>By default, quantifiers are <strong>greedy</strong> — they match as much as possible. Adding <code>?</code> after a quantifier makes it <strong>lazy</strong> — it matches as little as possible.</p>

<p>Consider matching HTML tags in <code>&lt;b&gt;bold&lt;/b&gt; and &lt;i&gt;italic&lt;/i&gt;</code>:</p>

<ul>
<li><code>&lt;.+&gt;</code> (greedy) matches <code>&lt;b&gt;bold&lt;/b&gt; and &lt;i&gt;italic&lt;/i&gt;</code> — everything from first <code>&lt;</code> to last <code>&gt;</code></li>
<li><code>&lt;.+?&gt;</code> (lazy) matches <code>&lt;b&gt;</code>, then <code>&lt;/b&gt;</code>, then <code>&lt;i&gt;</code>, then <code>&lt;/i&gt;</code> — each tag individually</li>
</ul>

<h2>Tips for Writing Better Regex</h2>

<ul>
<li><strong>Start simple, refine incrementally:</strong> Get a basic pattern working first, then add edge case handling</li>
<li><strong>Test with edge cases:</strong> Try empty strings, strings with only whitespace, very long inputs, and boundary conditions</li>
<li><strong>Use non-capturing groups when you don't need captures:</strong> <code>(?:abc)</code> groups without capturing, which is slightly more efficient</li>
<li><strong>Anchor when possible:</strong> <code>^\\d{5}$</code> is faster and more precise than <code>\\d{5}</code> when validating an entire string</li>
<li><strong>Comment complex patterns:</strong> Most regex engines support verbose mode (the <code>x</code> flag) that allows whitespace and comments</li>
<li><strong>Don't regex everything:</strong> Some things are better handled with a parser — HTML, JSON, and email addresses are famously hard to regex correctly</li>
</ul>

<h2>Practice with Real Tools</h2>

<p>The best way to learn regex is by doing. Our <a href="/tools/regex-tester">Regex Tester</a> lets you write patterns and see matches highlighted in real-time, with match groups and flags support. Try the patterns from this guide, then experiment with your own text. You can also use <a href="/tools/find-and-replace">Find and Replace</a> with regex support for text transformations.</p>
`,
  },
  {
    slug: "improve-website-page-speed",
    title: "How to Improve Your Website's Page Speed: A Step-by-Step Guide",
    description: "Actionable techniques to make your website faster — from image optimization and code minification to caching strategies and Core Web Vitals.",
    category: "SEO",
    date: "2026-04-07",
    readTime: "10 min read",
    keywords: ["page speed", "website speed", "core web vitals", "lcp", "cls", "web performance", "site optimization"],
    relatedTools: ["page-speed-checker", "image-compressor", "css-minifier", "javascript-minifier", "image-to-webp"],
    relatedPosts: ["meta-tags-seo-guide"],
    content: `
<p>Page speed isn't just about user experience — it directly impacts your search rankings, conversion rates, and bounce rates. Google uses Core Web Vitals as ranking signals, and research consistently shows that faster pages convert better. This guide gives you a concrete, prioritized plan to speed up your website.</p>

<h2>Measure Before You Optimize</h2>

<p>Before changing anything, establish a baseline. Use our <a href="/tools/page-speed-checker">Page Speed Checker</a> to measure your current performance score and Core Web Vitals. Run tests on both mobile and desktop — mobile scores are typically lower and more impactful for SEO since Google uses mobile-first indexing.</p>

<p>The key metrics to focus on:</p>

<ul>
<li><strong>LCP (Largest Contentful Paint):</strong> How long until the largest visible element loads. Target: <strong>under 2.5 seconds</strong></li>
<li><strong>CLS (Cumulative Layout Shift):</strong> How much the page layout shifts during loading. Target: <strong>under 0.1</strong></li>
<li><strong>INP (Interaction to Next Paint):</strong> How quickly the page responds to user interactions. Target: <strong>under 200ms</strong></li>
</ul>

<div class="callout">
<strong>Key takeaway:</strong> Always measure first. Optimizing without data is guessing. Run your site through a <a href="/tools/page-speed-checker">speed test</a>, note your scores, then work through optimizations in priority order.
</div>

<h2>1. Optimize Images (Biggest Impact)</h2>

<p>Images are typically the largest assets on a page and the easiest to optimize. Three changes can dramatically reduce image weight:</p>

<h3>Use Modern Formats (WebP/AVIF)</h3>
<p>WebP images are 25-35% smaller than JPEG at equivalent quality. AVIF is even smaller (but has less browser support). Convert your images with our <a href="/tools/image-to-webp">Image to WebP Converter</a>.</p>

<h3>Compress Aggressively</h3>
<p>Most images are saved at higher quality than necessary. A JPEG at 80% quality is visually indistinguishable from 100% but can be 60% smaller. Use our <a href="/tools/image-compressor">Image Compressor</a> to reduce file sizes without visible quality loss.</p>

<h3>Specify Dimensions</h3>
<p>Always include <code>width</code> and <code>height</code> attributes on images. This prevents layout shifts (CLS) because the browser knows how much space to reserve before the image loads.</p>

<h3>Lazy Load Below-the-Fold Images</h3>
<p>Add <code>loading="lazy"</code> to images that aren't visible on initial load. This defers their download until the user scrolls near them, reducing initial page weight.</p>

<h2>2. Minify CSS and JavaScript</h2>

<p>Minification removes whitespace, comments, and unnecessary characters from your code without changing functionality. It typically reduces file sizes by 20-40%.</p>

<p>Minify your stylesheets with our <a href="/tools/css-minifier">CSS Minifier</a> and scripts with the <a href="/tools/javascript-minifier">JavaScript Minifier</a>. Most build tools (Webpack, Vite, Next.js) do this automatically for production builds, but it's worth checking that minification is actually enabled.</p>

<h2>3. Eliminate Render-Blocking Resources</h2>

<p>CSS and synchronous JavaScript in the <code>&lt;head&gt;</code> block page rendering — the browser can't display anything until they finish loading.</p>

<ul>
<li><strong>Inline critical CSS:</strong> Extract the CSS needed for above-the-fold content and inline it in a <code>&lt;style&gt;</code> tag. Load the rest asynchronously</li>
<li><strong>Defer JavaScript:</strong> Add <code>defer</code> or <code>async</code> to <code>&lt;script&gt;</code> tags. <code>defer</code> maintains execution order; <code>async</code> doesn't</li>
<li><strong>Remove unused CSS:</strong> Tools like PurgeCSS can strip CSS rules that no page actually uses — often removing 80%+ of a CSS framework</li>
</ul>

<h2>4. Enable Caching</h2>

<p>Proper cache headers mean returning visitors load your site almost instantly because assets are served from their browser cache instead of your server.</p>

<ul>
<li><strong>Static assets</strong> (images, fonts, JS, CSS with hashed filenames): <code>Cache-Control: public, max-age=31536000, immutable</code> — cache for one year</li>
<li><strong>HTML pages:</strong> <code>Cache-Control: public, max-age=0, must-revalidate</code> — always check for updates but use cached version if unchanged (via ETag)</li>
</ul>

<h2>5. Use a CDN</h2>

<p>A Content Delivery Network serves your assets from servers geographically close to each user. A visitor in Tokyo gets assets from a Tokyo server instead of your origin server in Virginia. This dramatically reduces latency for global audiences.</p>

<p>Free CDN options include Cloudflare (full site), and Vercel/Netlify (built into hosting). For images specifically, consider an image CDN like Cloudinary or imgix that also handles resizing and format conversion on the fly.</p>

<h2>6. Reduce Server Response Time</h2>

<p>Your server should respond in under 200ms. If TTFB (Time to First Byte) is slow:</p>

<ul>
<li><strong>Use static generation:</strong> Pre-render pages at build time instead of generating them per request</li>
<li><strong>Add server-side caching:</strong> Cache database queries and API responses</li>
<li><strong>Upgrade hosting:</strong> Shared hosting is often the bottleneck. A VPS or edge platform is worth the cost</li>
<li><strong>Optimize database queries:</strong> Add indexes, avoid N+1 queries, use connection pooling</li>
</ul>

<div class="callout">
<strong>Key takeaway:</strong> The biggest wins come from images (use WebP, compress, lazy-load), eliminating render-blocking resources, and caching. Do these three things and most sites will pass Core Web Vitals.
</div>

<h2>7. Optimize Fonts</h2>

<ul>
<li><strong>Use <code>font-display: swap</code>:</strong> Shows fallback text while the custom font loads, preventing invisible text</li>
<li><strong>Subset fonts:</strong> If you only use Latin characters, don't load the full CJK character set</li>
<li><strong>Preload key fonts:</strong> <code>&lt;link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin&gt;</code></li>
<li><strong>Use system fonts:</strong> The fastest font is no custom font at all. System font stacks are perfectly good for many sites</li>
</ul>

<h2>8. Prevent Layout Shifts (CLS)</h2>

<ul>
<li>Set explicit dimensions on images and videos</li>
<li>Reserve space for ads and embeds before they load</li>
<li>Use CSS <code>aspect-ratio</code> for responsive containers</li>
<li>Avoid inserting content above existing content after page load</li>
<li>Use <code>font-display: optional</code> if font-swap causes layout shifts</li>
</ul>

<h2>Measure Your Progress</h2>

<p>After implementing changes, re-test with our <a href="/tools/page-speed-checker">Page Speed Checker</a> on both mobile and desktop. Compare your before and after scores. Focus on getting all three Core Web Vitals into the "good" range (green). Keep iterating — performance optimization is an ongoing process, not a one-time fix.</p>
`,
  },
  {
    slug: "meta-tags-seo-guide",
    title: "Meta Tags for SEO: What They Are and How to Optimize Them",
    description: "A complete guide to HTML meta tags that impact SEO — title tags, meta descriptions, Open Graph, Twitter Cards, robots directives, and canonical URLs.",
    category: "SEO",
    date: "2026-04-09",
    readTime: "9 min read",
    keywords: ["meta tags", "title tag", "meta description", "open graph", "twitter card", "seo meta tags", "canonical url"],
    relatedTools: ["og-preview", "meta-length-checker", "google-serp-preview", "twitter-card-preview", "backlink-checker"],
    relatedPosts: ["improve-website-page-speed"],
    content: `
<p>Meta tags are snippets of HTML that provide information about a page to search engines and social platforms. They don't appear on the page itself, but they control how your pages look in Google search results, social media previews, and browser tabs. Getting them right is one of the highest-impact, lowest-effort SEO wins.</p>

<h2>Title Tag — The Most Important Meta Tag</h2>

<p>The title tag (<code>&lt;title&gt;</code>) defines the page's title. It appears in three critical places: the browser tab, Google search results, and social media shares (as a fallback).</p>

<pre><code>&lt;title&gt;Best Free Online Tools for Developers | ToolboxHub&lt;/title&gt;</code></pre>

<h3>Title Tag Best Practices</h3>
<ul>
<li><strong>Keep it under 60 characters:</strong> Google truncates titles longer than about 580 pixels (roughly 60 characters). Check yours with our <a href="/tools/meta-length-checker">Meta Tag Length Checker</a></li>
<li><strong>Put the keyword first:</strong> "JSON Formatter - Free Online Tool" outperforms "Free Online Tool - JSON Formatter" because the keyword appears earlier</li>
<li><strong>Include your brand:</strong> Append your site name with a separator: "Page Title | Brand" or "Page Title - Brand"</li>
<li><strong>Make each title unique:</strong> Duplicate titles confuse search engines about which page to rank</li>
<li><strong>Write for clicks:</strong> The title is your headline in search results. Make it compelling enough to click</li>
</ul>

<div class="callout">
<strong>Key takeaway:</strong> The title tag is the single most important on-page SEO element. Spend time crafting titles that are keyword-rich, under 60 characters, and compelling enough to earn clicks. Preview them with our <a href="/tools/google-serp-preview">Google SERP Preview</a>.
</div>

<h2>Meta Description</h2>

<p>The meta description provides a summary that appears below the title in search results:</p>

<pre><code>&lt;meta name="description" content="500+ free online tools for text, development, math, finance, and more. No signup required." /&gt;</code></pre>

<h3>Meta Description Best Practices</h3>
<ul>
<li><strong>Keep it between 120-160 characters:</strong> Shorter is too thin; longer gets truncated</li>
<li><strong>Include a call to action:</strong> "Try it free", "Learn how", "Get started" — tell users what to do</li>
<li><strong>Include the target keyword:</strong> Google bolds keyword matches in the snippet, making it more eye-catching</li>
<li><strong>Match search intent:</strong> If the query is informational, promise to explain. If transactional, promise to help them do the thing</li>
</ul>

<p>Note: Google sometimes rewrites your meta description if it thinks another snippet from your page better matches the query. But a well-written description is used more often than not.</p>

<h2>Open Graph Tags — Social Media Previews</h2>

<p>When someone shares your URL on Facebook, LinkedIn, Slack, or Discord, these platforms read Open Graph (OG) tags to build the preview card:</p>

<pre><code>&lt;meta property="og:title" content="Best Free Developer Tools" /&gt;
&lt;meta property="og:description" content="Formatters, converters, and generators for developers." /&gt;
&lt;meta property="og:image" content="https://example.com/og-image.png" /&gt;
&lt;meta property="og:url" content="https://example.com/tools" /&gt;
&lt;meta property="og:type" content="website" /&gt;</code></pre>

<p>The most important OG tag is <code>og:image</code>. A good preview image dramatically increases click-through rates on social shares. The ideal size is <strong>1200x630 pixels</strong>.</p>

<p>Preview exactly how your OG tags will look when shared with our <a href="/tools/og-preview">Open Graph Preview</a> tool.</p>

<h2>Twitter Card Tags</h2>

<p>Twitter (X) uses its own card tags, falling back to OG tags if its own aren't present:</p>

<pre><code>&lt;meta name="twitter:card" content="summary_large_image" /&gt;
&lt;meta name="twitter:title" content="Best Free Developer Tools" /&gt;
&lt;meta name="twitter:description" content="Formatters, converters, and generators." /&gt;
&lt;meta name="twitter:image" content="https://example.com/twitter-card.png" /&gt;</code></pre>

<p>The <code>twitter:card</code> value determines the card layout. <code>summary_large_image</code> shows a large image preview; <code>summary</code> shows a small thumbnail. For most pages, <code>summary_large_image</code> drives more engagement.</p>

<p>Check how your cards look with our <a href="/tools/twitter-card-preview">Twitter Card Preview</a>.</p>

<div class="callout">
<strong>Key takeaway:</strong> Always set og:title, og:description, og:image, and twitter:card. Without these, social shares look plain and get fewer clicks. Preview them before publishing.
</div>

<h2>Robots Meta Tag</h2>

<p>The robots meta tag tells search engines how to handle a page:</p>

<pre><code>&lt;meta name="robots" content="index, follow" /&gt;</code></pre>

<p>Common directives:</p>
<ul>
<li><code>index</code> / <code>noindex</code> — whether to include the page in search results</li>
<li><code>follow</code> / <code>nofollow</code> — whether to follow links on the page</li>
<li><code>noarchive</code> — don't show a cached version</li>
<li><code>nosnippet</code> — don't show a text snippet in results</li>
<li><code>max-snippet:160</code> — limit snippet length to 160 characters</li>
</ul>

<p>Most pages should be <code>index, follow</code> (or simply omit the tag, since that's the default). Use <code>noindex</code> for internal pages you don't want in search results: admin panels, search results pages, staging environments, duplicate content.</p>

<h2>Canonical URL</h2>

<p>The canonical tag tells search engines which version of a page is the "original" when duplicate or similar versions exist:</p>

<pre><code>&lt;link rel="canonical" href="https://example.com/tools/json-formatter" /&gt;</code></pre>

<p>Common scenarios where canonicals matter:</p>
<ul>
<li><strong>HTTP vs HTTPS versions:</strong> The canonical should always be HTTPS</li>
<li><strong>www vs non-www:</strong> Pick one and make the other canonical</li>
<li><strong>Pagination:</strong> Page 2, 3, etc. might need a canonical to page 1 (or a self-referencing canonical)</li>
<li><strong>URL parameters:</strong> <code>/products?sort=price</code> and <code>/products?sort=name</code> may have the same canonical</li>
</ul>

<h2>Audit Your Meta Tags</h2>

<p>Use our free tools to audit your site's meta tags right now:</p>

<ul>
<li><a href="/tools/meta-length-checker">Meta Tag Length Checker</a> — verify your titles and descriptions are the right length</li>
<li><a href="/tools/google-serp-preview">Google SERP Preview</a> — see exactly how your page looks in Google results</li>
<li><a href="/tools/og-preview">OG Preview</a> — check your Open Graph social cards</li>
<li><a href="/tools/twitter-card-preview">Twitter Card Preview</a> — verify your X/Twitter cards</li>
<li><a href="/tools/backlink-checker">Site SEO Analysis</a> — check all meta tags, security headers, and robots.txt in one scan</li>
</ul>
`,
  },
  {
    slug: "how-to-create-strong-passwords",
    title: "How to Create Strong Passwords: A Science-Backed Guide",
    description: "Learn what makes a password truly strong, why length beats complexity, how password managers work, and common mistakes that put your accounts at risk.",
    category: "Security",
    date: "2026-04-11",
    readTime: "7 min read",
    keywords: ["strong password", "password security", "password tips", "password generator", "password strength", "password manager"],
    relatedTools: ["password-strength", "hash-generator", "encryption-tool", "bcrypt-generator"],
    relatedPosts: ["what-is-an-ssl-certificate"],
    content: `
<p>Most password advice is outdated. "Use uppercase, lowercase, numbers, and symbols" sounds reasonable but leads to passwords like <code>P@ssw0rd!</code> — technically complex but easily cracked. Modern password security is based on very different principles. This guide explains what actually makes a password strong.</p>

<h2>What Makes a Password Strong</h2>

<p>Password strength comes from <strong>entropy</strong> — the amount of randomness in the password, measured in bits. Higher entropy means more possible combinations an attacker must try. The key factors:</p>

<ul>
<li><strong>Length is king:</strong> Each additional character exponentially increases the number of possible combinations. A 16-character password has roughly 10 billion times more combinations than an 8-character password with the same character set</li>
<li><strong>Randomness matters more than complexity:</strong> <code>correcthorsebatterystaple</code> (4 random words) has more entropy than <code>P@ssw0rd!</code> (a predictable substitution pattern)</li>
<li><strong>Unpredictability is essential:</strong> Dictionary words, names, dates, keyboard patterns (qwerty, 12345), and l33t substitutions are all in cracking dictionaries</li>
</ul>

<div class="callout">
<strong>Key takeaway:</strong> A long, random password beats a short, complex one every time. Aim for 16+ characters or 4+ random words. Test your passwords with our <a href="/tools/password-strength">Password Strength Checker</a>.
</div>

<h2>How Attackers Crack Passwords</h2>

<h3>Brute Force</h3>
<p>Try every possible combination. An 8-character password using all character types (uppercase, lowercase, digits, symbols — 95 possibilities per character) has 95^8 = ~6.6 quadrillion combinations. Sounds like a lot, but a modern GPU can test billions of hashes per second against weak hash algorithms.</p>

<h3>Dictionary Attacks</h3>
<p>Try common passwords and words from dictionaries. "password123", "qwerty", "iloveyou", and millions of others are tested first. These crack instantly regardless of hash strength.</p>

<h3>Credential Stuffing</h3>
<p>Use passwords leaked from other breaches. If you reuse passwords, a breach at one service compromises all your accounts. This is why <strong>unique passwords per site</strong> is the most important rule.</p>

<h3>Pattern-Based Attacks</h3>
<p>Attackers know humans use predictable patterns: capital first letter, numbers at the end, @ for "a", 0 for "o". Cracking tools like Hashcat have rules specifically for these patterns.</p>

<h2>The Passphrase Approach</h2>

<p>Instead of a random string of characters, use a <strong>passphrase</strong> — multiple random words strung together:</p>

<pre><code>correct horse battery staple
purple elephant dancing moonlight
quantum pretzel umbrella telescope</code></pre>

<p>A 4-word passphrase from a 7,776-word list (like the EFF Diceware list) has about 51 bits of entropy — comparable to a random 10-character mixed-case password but far easier to remember. A 5-word passphrase reaches 64 bits, and 6 words gets you to 77 bits (effectively uncrackable by brute force).</p>

<p>The critical rule: the words must be <strong>truly random</strong>, not a phrase that makes sense. "I love my dog" is not a strong passphrase. "Correct horse battery staple" works because the words are randomly selected.</p>

<h2>Password Managers: The Real Answer</h2>

<p>The best password strategy is simple: <strong>use a password manager</strong> and let it generate a unique, random 20+ character password for every account. You remember one master password (make it a strong passphrase), and the manager handles everything else.</p>

<p>Leading options: Bitwarden (free/open-source), 1Password, and KeePass (offline/local). All generate, store, and auto-fill passwords across devices.</p>

<p>With a password manager, the question isn't "how do I create a strong password I can remember" — it's "how do I create a strong master password" (the only one you need to remember).</p>

<div class="callout">
<strong>Key takeaway:</strong> Use a password manager with unique random passwords for every site. Your master password should be a 5-6 word random passphrase. This single change eliminates 90% of account security risk.
</div>

<h2>Common Mistakes</h2>

<ul>
<li><strong>Reusing passwords:</strong> The #1 mistake. One breach compromises everything. Use unique passwords everywhere</li>
<li><strong>Predictable substitutions:</strong> "p@ssw0rd" is not clever. Cracking tools know all the l33t-speak substitutions</li>
<li><strong>Adding "1!" to meet requirements:</strong> Complexity requirements that lead to "Password1!" create a false sense of security</li>
<li><strong>Using personal information:</strong> Pet names, birthdays, addresses, and children's names are social engineering targets</li>
<li><strong>Rotating passwords on a schedule:</strong> Forced password changes lead to weaker passwords (users increment a number). Only change passwords when compromised. NIST updated their guidelines to reflect this</li>
<li><strong>Security questions:</strong> "What's your mother's maiden name?" is publicly discoverable. Use random answers stored in your password manager</li>
</ul>

<h2>How Passwords Should Be Stored</h2>

<p>You create a strong password — but does the website store it safely? Responsible services hash passwords with algorithms like <strong>bcrypt</strong>, <strong>scrypt</strong>, or <strong>Argon2</strong>. These are intentionally slow, making brute-force attacks impractical even if the hash database is stolen.</p>

<p>Explore how hashing works with our <a href="/tools/hash-generator">Hash Generator</a> and <a href="/tools/bcrypt-generator">Bcrypt Generator</a>.</p>

<h2>Check Your Password Strength</h2>

<p>Curious how strong your current passwords are? Our <a href="/tools/password-strength">Password Strength Checker</a> analyzes entropy, pattern detection, dictionary matches, and estimated crack time — all locally in your browser. Your password never leaves your device.</p>
`,
  },
  {
    slug: "compound-interest-explained",
    title: "Compound Interest Explained: How Your Money Grows Exponentially",
    description: "Understand compound interest — the formula, how it works, why starting early matters, and how to calculate it for savings, investments, and debt.",
    category: "Finance",
    date: "2026-04-14",
    readTime: "8 min read",
    keywords: ["compound interest", "compound interest calculator", "interest rate", "savings growth", "investment returns", "compound vs simple interest"],
    relatedTools: ["compound-interest", "savings-goal-calculator", "retirement-calculator", "roi-calculator", "mortgage-calculator"],
    relatedPosts: ["how-to-create-strong-passwords"],
    content: `
<p>Albert Einstein reportedly called compound interest "the eighth wonder of the world." Whether or not he actually said it, the sentiment is accurate — compound interest is the most powerful force in personal finance. Understanding it is the difference between building wealth and wondering where your money went.</p>

<h2>Simple Interest vs Compound Interest</h2>

<p><strong>Simple interest</strong> is calculated only on the original principal. If you invest $1,000 at 5% simple interest, you earn $50 per year, every year. After 10 years: $1,500.</p>

<p><strong>Compound interest</strong> is calculated on the principal <em>plus accumulated interest</em>. That 5% applies not just to your original $1,000 but also to the interest you've already earned. After 10 years: $1,628.89.</p>

<p>The difference ($128.89) may seem modest over 10 years, but compounding is exponential — it accelerates over time. Over 30 years, that same $1,000 grows to $4,321.94 with compound interest vs $2,500 with simple interest. The gap gets wider every year.</p>

<div class="callout">
<strong>Key takeaway:</strong> Compound interest earns "interest on interest." The longer your money compounds, the faster it grows. This is why starting early — even with small amounts — has such outsized impact.
</div>

<h2>The Compound Interest Formula</h2>

<p>The formula for compound interest is:</p>

<pre><code>A = P(1 + r/n)^(nt)</code></pre>

<p>Where:</p>
<ul>
<li><strong>A</strong> = the future value (what you end up with)</li>
<li><strong>P</strong> = the principal (what you start with)</li>
<li><strong>r</strong> = the annual interest rate (as a decimal — 5% = 0.05)</li>
<li><strong>n</strong> = the number of times interest compounds per year</li>
<li><strong>t</strong> = the number of years</li>
</ul>

<p><strong>Example:</strong> $10,000 invested at 7% annual interest, compounded monthly, for 20 years:</p>

<pre><code>A = 10,000 × (1 + 0.07/12)^(12 × 20)
A = 10,000 × (1.00583)^240
A = 10,000 × 4.0387
A = $40,387.39</code></pre>

<p>Your $10,000 quadrupled. $30,387 of that is pure interest earnings. Skip the manual math — our <a href="/tools/compound-interest">Compound Interest Calculator</a> handles this instantly and shows you a year-by-year breakdown.</p>

<h2>The Power of Starting Early</h2>

<p>Consider two investors:</p>

<ul>
<li><strong>Anna</strong> starts at age 25, investing $200/month at 7% annual return, and stops contributing at age 35 (10 years of contributions = $24,000 invested)</li>
<li><strong>Ben</strong> starts at age 35, investing $200/month at 7%, and continues until age 65 (30 years of contributions = $72,000 invested)</li>
</ul>

<p>At age 65, Anna has <strong>~$400,000</strong> despite investing only $24,000. Ben has <strong>~$228,000</strong> despite investing $72,000. Anna invested a third of the money but ended up with nearly twice as much — because her money had 10 extra years to compound.</p>

<p>This is the most important lesson in personal finance: <strong>time beats amount</strong>.</p>

<div class="callout">
<strong>Key takeaway:</strong> Starting 10 years earlier can be worth more than tripling your contributions. The earlier you start investing, the more compounding works in your favor.
</div>

<h2>Compounding Frequency Matters</h2>

<p>Interest can compound annually, semi-annually, quarterly, monthly, daily, or even continuously. More frequent compounding means slightly higher returns:</p>

<p><strong>$10,000 at 5% for 10 years:</strong></p>
<ul>
<li>Annually: $16,288.95</li>
<li>Quarterly: $16,386.16</li>
<li>Monthly: $16,470.09</li>
<li>Daily: $16,486.65</li>
</ul>

<p>The difference between annual and daily compounding is modest (~$198 on $10,000 over 10 years). What matters far more is the interest rate and the time period. Don't obsess over compounding frequency — focus on investing consistently and starting as early as possible.</p>

<h2>The Rule of 72</h2>

<p>A quick mental math shortcut: divide 72 by the interest rate to estimate how many years it takes to double your money.</p>

<ul>
<li>At 6%: 72 / 6 = <strong>12 years</strong> to double</li>
<li>At 8%: 72 / 8 = <strong>9 years</strong> to double</li>
<li>At 10%: 72 / 10 = <strong>7.2 years</strong> to double</li>
<li>At 12%: 72 / 12 = <strong>6 years</strong> to double</li>
</ul>

<p>This works reasonably well for rates between 2% and 20%.</p>

<h2>Compound Interest Works Against You Too</h2>

<p>The same force that builds wealth also builds debt. Credit card interest compounds — and at 20-25% rates, it compounds brutally. A $5,000 credit card balance at 22% interest, paying only the minimum, takes <strong>over 20 years to pay off</strong> and costs over $10,000 in interest.</p>

<p>This is why paying off high-interest debt is the best guaranteed "investment" you can make. A 22% credit card payoff is equivalent to earning 22% risk-free return. Use our <a href="/tools/mortgage-calculator">Mortgage Calculator</a> to see how loan interest accumulates over time.</p>

<h2>How to Apply Compound Interest to Your Life</h2>

<ul>
<li><strong>Start investing immediately:</strong> Even $50/month matters when you have decades of compounding ahead</li>
<li><strong>Automate contributions:</strong> Set up automatic transfers to your investment account. Consistency beats timing</li>
<li><strong>Reinvest dividends:</strong> When your investments pay dividends, reinvest them to compound your returns</li>
<li><strong>Minimize fees:</strong> A 1% annual management fee seems small, but over 30 years it can consume 25%+ of your total returns</li>
<li><strong>Pay off high-interest debt first:</strong> Compound interest working against you at 20% will always outpace compound interest working for you at 7%</li>
</ul>

<h2>Calculate Your Compound Interest</h2>

<p>See how your money will grow with our free <a href="/tools/compound-interest">Compound Interest Calculator</a>. Set a target with the <a href="/tools/savings-goal-calculator">Savings Goal Calculator</a>, plan long-term with the <a href="/tools/retirement-calculator">Retirement Calculator</a>, or compare investment returns with the <a href="/tools/roi-calculator">ROI Calculator</a>.</p>
`,
  },
  {
    slug: "color-theory-web-design",
    title: "Color Theory for Web Design: A Practical Guide",
    description: "Learn color theory fundamentals for the web — color models, harmonies, contrast ratios, accessibility, and how to build palettes that work.",
    category: "Design",
    date: "2026-04-16",
    readTime: "8 min read",
    keywords: ["color theory", "web design colors", "color palette", "color contrast", "accessibility", "hex color", "css colors"],
    relatedTools: ["color-converter", "css-gradient-generator", "color-palette-from-image", "image-color-picker", "color-blindness-simulator"],
    relatedPosts: ["meta-tags-seo-guide"],
    content: `
<p>Color is the first thing users notice about a website — before they read a word or click a button. Good color choices build trust, guide attention, and reinforce brand identity. Bad choices create confusion, hurt readability, and drive users away. This guide covers the color theory fundamentals every web designer needs.</p>

<h2>Color Models for the Web</h2>

<h3>Hex (Hexadecimal)</h3>
<p>The most common format in web development. Six characters representing red, green, and blue: <code>#FF5733</code>. Each pair ranges from <code>00</code> (none) to <code>FF</code> (maximum). Shorthand exists for colors with repeated digits: <code>#FFF</code> = <code>#FFFFFF</code> (white).</p>

<h3>RGB / RGBA</h3>
<p>Red, Green, Blue values from 0-255: <code>rgb(255, 87, 51)</code>. RGBA adds an alpha channel for opacity: <code>rgba(255, 87, 51, 0.8)</code>. More intuitive than hex since you can see the individual channel values.</p>

<h3>HSL / HSLA</h3>
<p>Hue (0-360 degrees on the color wheel), Saturation (0-100%), Lightness (0-100%): <code>hsl(12, 100%, 60%)</code>. HSL is the most intuitive model for design work — you can create color variations by adjusting just one value.</p>

<p>Convert between all these formats instantly with our <a href="/tools/color-converter">Color Converter</a>.</p>

<div class="callout">
<strong>Key takeaway:</strong> Use HSL for design thinking (it's intuitive), hex for code (it's compact), and RGB when you need transparency. They all describe the same colors — just in different notation.
</div>

<h2>Color Harmonies</h2>

<p>Color harmonies are combinations that look visually pleasing together. They're based on relationships on the color wheel:</p>

<h3>Complementary</h3>
<p>Colors opposite each other on the wheel (e.g., blue and orange). High contrast, vibrant feel. Great for call-to-action buttons that need to stand out from the surrounding design.</p>

<h3>Analogous</h3>
<p>Colors adjacent on the wheel (e.g., blue, blue-green, green). Harmonious, cohesive feel. Common in nature-inspired designs. Low contrast means you need careful attention to readability.</p>

<h3>Triadic</h3>
<p>Three colors evenly spaced on the wheel (e.g., red, yellow, blue). Vibrant and balanced. Use one dominant color and two accents to avoid visual chaos.</p>

<h3>Split-Complementary</h3>
<p>A color plus the two colors adjacent to its complement. Less tension than pure complementary, more variety than analogous. A safe choice for beginners.</p>

<h2>Building a Web Color Palette</h2>

<p>A practical web palette needs these roles:</p>

<ul>
<li><strong>Primary color:</strong> Your brand color. Used for key actions, links, and interactive elements</li>
<li><strong>Background:</strong> Usually white/off-white (light mode) or dark gray/black (dark mode)</li>
<li><strong>Text:</strong> High contrast against the background — near-black on light, near-white on dark</li>
<li><strong>Muted:</strong> A subtle tint of your background for cards, sections, and secondary surfaces</li>
<li><strong>Border:</strong> A gentle gray that separates elements without demanding attention</li>
<li><strong>Accent / Secondary:</strong> A complementary color for secondary actions and highlights</li>
<li><strong>Error / Success / Warning:</strong> Semantic colors — red, green, yellow (or orange)</li>
</ul>

<p>Start with your primary color, then derive the rest. HSL makes this easy: keep the hue, adjust saturation and lightness to create variants.</p>

<p>Already have a reference image or brand asset? Our <a href="/tools/color-palette-from-image">Color Palette from Image</a> tool extracts the dominant colors automatically.</p>

<h2>Contrast and Accessibility</h2>

<p>Contrast ratio measures the difference in luminance between foreground and background colors. The Web Content Accessibility Guidelines (WCAG) set minimum ratios:</p>

<ul>
<li><strong>WCAG AA (minimum):</strong> 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold)</li>
<li><strong>WCAG AAA (enhanced):</strong> 7:1 for normal text, 4.5:1 for large text</li>
</ul>

<p>Pure white (#FFFFFF) on pure black (#000000) has a ratio of 21:1 — maximum contrast. Gray (#767676) on white has exactly 4.5:1 — the minimum for AA compliance. Anything lighter than that gray on white fails accessibility standards.</p>

<p>This doesn't mean everything needs to be black and white. You can use color — just ensure sufficient contrast. Many beautifully designed sites meet AAA standards.</p>

<div class="callout">
<strong>Key takeaway:</strong> At least 4.5:1 contrast ratio for body text is non-negotiable. It's not just an accessibility requirement — it's good design. Low-contrast text is hard to read for everyone, not just users with visual impairments.
</div>

<h2>Color Blindness Considerations</h2>

<p>About 8% of men and 0.5% of women have some form of color vision deficiency. The most common type is red-green color blindness (deuteranopia/protanopia). Design implications:</p>

<ul>
<li><strong>Never use color alone to convey meaning:</strong> Red/green status indicators need icons or text labels too</li>
<li><strong>Test your palette:</strong> Use our <a href="/tools/color-blindness-simulator">Color Blindness Simulator</a> to see your design through different types of color vision</li>
<li><strong>Use blue as an accent color:</strong> Blue is distinguishable by nearly all forms of color vision deficiency</li>
<li><strong>Add patterns or textures to charts:</strong> Don't rely solely on color to differentiate data series</li>
</ul>

<h2>CSS Color Techniques</h2>

<h3>CSS Custom Properties for Theming</h3>
<pre><code>:root {
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --background: #ffffff;
  --foreground: #171717;
}</code></pre>

<p>Define your palette as CSS variables, then reference them throughout your styles. This makes theme changes (including dark mode) a matter of swapping variable values.</p>

<h3>Gradients</h3>
<p>Gradients add depth and visual interest. Subtle gradients (between two similar colors) work as backgrounds. Bold gradients (between contrasting colors) work as hero sections or CTAs. Generate them with our <a href="/tools/css-gradient-generator">CSS Gradient Generator</a>.</p>

<h2>Explore and Create Colors</h2>

<p>Put color theory into practice with our free tools:</p>

<ul>
<li><a href="/tools/color-converter">Color Converter</a> — convert between hex, RGB, HSL, and more</li>
<li><a href="/tools/css-gradient-generator">CSS Gradient Generator</a> — create beautiful gradient code</li>
<li><a href="/tools/color-palette-from-image">Color Palette from Image</a> — extract colors from any image</li>
<li><a href="/tools/image-color-picker">Image Color Picker</a> — pick exact colors from any image</li>
<li><a href="/tools/color-blindness-simulator">Color Blindness Simulator</a> — test accessibility of your palette</li>
</ul>
`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getAllBlogCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}
