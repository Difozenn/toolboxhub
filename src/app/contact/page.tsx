import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ToolboxHub — report bugs, suggest new tools, or ask questions.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Contact Us
      </h1>
      <p className="mt-3 text-muted-foreground">
        Have a question, found a bug, or want to suggest a new tool? We&rsquo;d
        love to hear from you.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-xl border border-border bg-muted p-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Email
          </h2>
          <p className="text-sm text-muted-foreground">
            Reach us at{" "}
            <a
              href="mailto:contact@toolboxhub.net"
              className="text-primary hover:underline"
            >
              contact@toolboxhub.net
            </a>
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted p-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Report a Bug
          </h2>
          <p className="text-sm text-muted-foreground">
            Found something broken? Let us know which tool is affected and
            what went wrong. Include your browser name and version if possible.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted p-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Suggest a Tool
          </h2>
          <p className="text-sm text-muted-foreground">
            Have an idea for a new tool? We&rsquo;re always expanding our
            collection. Send us a brief description and we&rsquo;ll consider
            adding it.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted p-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Business Inquiries
          </h2>
          <p className="text-sm text-muted-foreground">
            For advertising, partnerships, or other business inquiries, please
            email{" "}
            <a
              href="mailto:contact@toolboxhub.net"
              className="text-primary hover:underline"
            >
              contact@toolboxhub.net
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
