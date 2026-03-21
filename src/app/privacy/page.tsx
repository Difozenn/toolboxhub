import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ToolboxHub privacy policy — how we handle your data, cookies, and third-party services.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 21, 2026
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            1. Introduction
          </h2>
          <p>
            ToolboxHub (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
            &ldquo;our&rdquo;) operates the website{" "}
            <Link
              href="https://toolboxhub.net"
              className="text-primary hover:underline"
            >
              toolboxhub.net
            </Link>{" "}
            (the &ldquo;Site&rdquo;). This Privacy Policy explains what
            information we collect, how we use it, and the choices you have.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            2. Information We Collect
          </h2>
          <h3 className="font-medium text-foreground mt-3 mb-1">
            2.1 Data You Provide
          </h3>
          <p>
            All tools on ToolboxHub run entirely in your browser. Text, files,
            and other inputs you enter into our tools are processed locally on
            your device and are <strong>never sent to our servers</strong>.
          </p>
          <h3 className="font-medium text-foreground mt-3 mb-1">
            2.2 Automatically Collected Data
          </h3>
          <p>
            We use{" "}
            <strong>Vercel Analytics</strong> to collect anonymous, aggregated
            usage data such as page views, referral sources, browser type, and
            country. This data does not include personal identifiers and cannot
            be used to identify individual users.
          </p>
          <h3 className="font-medium text-foreground mt-3 mb-1">
            2.3 Local Storage
          </h3>
          <p>
            Some tools (e.g., Quick Notepad) save preferences or data to your
            browser&rsquo;s local storage. This data stays on your device and is
            never transmitted to us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            3. Cookies &amp; Third-Party Services
          </h2>
          <p>
            We do not set first-party tracking cookies. Third-party services we
            use may set their own cookies:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              <strong>Google AdSense</strong> &mdash; serves ads and may use
              cookies to personalize ads based on your browsing history. You can
              opt out via{" "}
              <Link
                href="https://adssettings.google.com"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ad Settings
              </Link>
              .
            </li>
            <li>
              <strong>Vercel Analytics</strong> &mdash; privacy-friendly,
              cookieless analytics.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            4. How We Use Information
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To operate, maintain, and improve the Site</li>
            <li>To understand aggregate usage patterns</li>
            <li>To display relevant advertisements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            5. Data Sharing
          </h2>
          <p>
            We do not sell, rent, or share your personal data with third
            parties. Aggregated, non-identifiable analytics data may be shared
            with advertising partners to improve ad relevance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            6. Data Retention
          </h2>
          <p>
            Because tool inputs are processed locally and never stored on our
            servers, there is no user data for us to retain or delete. Analytics
            data is retained by Vercel in accordance with their privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            7. Children&rsquo;s Privacy
          </h2>
          <p>
            ToolboxHub is not directed at children under 13. We do not knowingly
            collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            8. Your Rights
          </h2>
          <p>
            Depending on your jurisdiction, you may have the right to access,
            correct, or delete personal data we hold about you. Since we do not
            collect personal data beyond anonymous analytics, these rights are
            generally not applicable. If you have questions, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            9. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated &ldquo;Last updated&rdquo; date.
            Continued use of the Site after changes constitutes acceptance of the
            revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            10. Contact
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us via the{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
