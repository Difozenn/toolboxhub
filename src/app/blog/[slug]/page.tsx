import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";
import { getToolBySlug } from "@/lib/tools";
import { BASE_URL, SITE_NAME, generateBreadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ShareButtons from "@/components/ShareButtons";
import BlogTableOfContents from "@/components/BlogTableOfContents";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const title = `${post.title} | ${SITE_NAME}`;
  const url = `${BASE_URL}/blog/${post.slug}`;

  return {
    title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,
    },
    twitter: { card: "summary_large_image", title, description: post.description },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  // Inject IDs into headings for TOC anchors
  const contentWithIds = post.content.replace(
    /<h([23])>(.*?)<\/h[23]>/gi,
    (_match, level, text) => {
      const plain = text.replace(/<[^>]*>/g, "").trim();
      const id = plain.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );

  // Prev/Next posts
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  const relatedTools = post.relatedTools
    .map((s) => getToolBySlug(s))
    .filter((t) => t !== undefined);

  const relatedPosts = post.relatedPosts
    .map((s) => getBlogPostBySlug(s))
    .filter((p) => p !== undefined);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/icon-512.png` },
    },
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={generateBreadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: post.title, href: `/blog/${post.slug}` },
      ])} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="transition-colors hover:text-foreground">Home</Link></li>
          <li aria-hidden="true" className="select-none">/</li>
          <li><Link href="/blog" className="transition-colors hover:text-foreground">Blog</Link></li>
          <li aria-hidden="true" className="select-none">/</li>
          <li className="font-medium text-foreground line-clamp-1">{post.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {post.category}
          </span>
          <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {post.description}
        </p>
        <div className="mt-4">
          <ShareButtons url={`${BASE_URL}/blog/${post.slug}`} title={post.title} />
        </div>
      </header>

      {/* Table of Contents */}
      <BlogTableOfContents content={post.content} />

      {/* Content */}
      <article
        className="blog-content prose prose-sm max-w-none text-foreground"
        dangerouslySetInnerHTML={{ __html: contentWithIds }}
      />

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-12 rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Tools Mentioned in This Article</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3 transition-colors hover:bg-muted"
              >
                <span className="text-xl">{tool.icon}</span>
                <div>
                  <p className="font-medium text-foreground text-sm">{tool.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Articles</h2>
          <div className="space-y-3">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">{rp.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{rp.readTime}</p>
                </div>
                <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <div className="mt-12 border-t border-border pt-6">
        <div className="flex items-center justify-between gap-4">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">&larr; Previous</p>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{prevPost.title}</p>
            </Link>
          ) : (
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
              &larr; All Posts
            </Link>
          )}
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="group flex-1 min-w-0 text-right">
              <p className="text-xs text-muted-foreground mb-1">Next &rarr;</p>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{nextPost.title}</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
