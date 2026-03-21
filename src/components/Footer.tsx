import Link from "next/link";
import AdBanner from "./AdBanner";
import Logo from "./Logo";

const footerLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted">
      {/* Ad banner at the top of the footer */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <AdBanner slot="footer-ad" format="horizontal" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <p className="text-sm text-muted-foreground">
              &copy; 2024&ndash;2026 ToolboxHub. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Tagline */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Free online tools for everyone
        </p>
      </div>
    </footer>
  );
}
