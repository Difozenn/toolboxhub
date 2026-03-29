import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tools, getToolBySlug, getRelatedTools, categories } from "@/lib/tools";
import {
  generateToolMetadata,
  generateToolJsonLd,
  generateFaqJsonLd,
  generateHowToJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import AdBanner from "@/components/AdBanner";
import ShareButtons from "@/components/ShareButtons";
import { toolComponents } from "@/lib/generated/tool-components";
import { getBlogPostsForTool } from "@/lib/blog";
import { BASE_URL } from "@/lib/seo";

/* ── Static params ──────────────────────────────────────────────── */
export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

/* ── ISR ─────────────────────────────────────────────────────────── */
export const revalidate = 86400;

/* ── SEO metadata ───────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return generateToolMetadata(tool);
}

/* ── Page ────────────────────────────────────────────────────────── */
export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const ToolComponent = toolComponents[tool.slug];
  const category = categories.find((c) => c.value === tool.category);
  const relatedTools = getRelatedTools(tool);
  const relatedBlogPosts = getBlogPostsForTool(tool.slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD schemas */}
      <JsonLd data={generateToolJsonLd(tool)} />
      <JsonLd data={generateBreadcrumbJsonLd([
        { label: "Home", href: "/" },
        ...(category ? [{ label: category.label, href: `/categories/${tool.category}` }] : []),
        { label: tool.name, href: `/tools/${tool.slug}` },
      ])} />
      {tool.faqs && tool.faqs.length > 0 && (
        <JsonLd data={generateFaqJsonLd(tool.faqs)} />
      )}
      {tool.howToSteps && tool.howToSteps.length > 0 && (
        <JsonLd data={generateHowToJsonLd(tool, tool.howToSteps)} />
      )}

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="select-none">
            /
          </li>
          {category && (
            <>
              <li>
                <Link
                  href={`/categories/${tool.category}`}
                  className="transition-colors hover:text-foreground"
                >
                  {category.label}
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">
                /
              </li>
            </>
          )}
          <li className="font-medium text-foreground">{tool.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <span className="mr-3">{tool.icon}</span>
          {tool.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {tool.description}
        </p>
        <div className="mt-3">
          <ShareButtons url={`${BASE_URL}/tools/${tool.slug}`} title={`${tool.name} - Free Online Tool | ToolboxHub`} />
        </div>
      </div>

      {/* Tool component */}
      {ToolComponent ? (
        <ToolComponent />
      ) : (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            This tool is coming soon.
          </p>
        </div>
      )}

      {/* Ad slot below tool */}
      <div className="mt-10">
        <AdBanner slot="tool-bottom-ad" format="horizontal" />
      </div>

      {/* ── SEO Content Sections ─────────────────────────────────── */}

      {/* About section */}
      {tool.longDescription && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            About {tool.name}
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
            <p>{tool.longDescription}</p>
          </div>
        </section>
      )}

      {/* How to Use section */}
      {tool.howToSteps && tool.howToSteps.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            How to Use {tool.name}
          </h2>
          <ol className="space-y-3">
            {tool.howToSteps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-foreground">{step.name}</p>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Use Cases section */}
      {tool.useCases && tool.useCases.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Common Use Cases
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {tool.useCases.map((useCase, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {useCase}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Ad slot between content sections */}
      {(tool.longDescription || tool.faqs) && (
        <div className="mt-8">
          <AdBanner slot="tool-mid-content" format="horizontal" />
        </div>
      )}

      {/* FAQ section */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {tool.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-lg border border-border"
              >
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50">
                  {faq.question}
                  <svg
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-4 pb-3 text-sm text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Related blog posts — cross-link tools ↔ blog */}
      {relatedBlogPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Related Articles
          </h2>
          <div className="space-y-3">
            {relatedBlogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted"
              >
                <div>
                  <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{post.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{post.readTime}</p>
                </div>
                <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related tools — cross-category linking via relatedSlugs */}
      {relatedTools.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Related Tools
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((rt) => (
              <Link
                key={rt.slug}
                href={`/tools/${rt.slug}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3 transition-colors hover:bg-muted"
              >
                <span className="text-xl">{rt.icon}</span>
                <div>
                  <p className="font-medium text-foreground text-sm">{rt.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{rt.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
