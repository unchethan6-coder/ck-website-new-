import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ChevronLeft, User } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { BlocksRenderer } from "@/components/blog/BlocksRenderer";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/cms";
import type { CmsArticle } from "@/lib/cms";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function articleOgImage(article: CmsArticle) {
  const img = article.coverImage;
  if (img?.url) {
    return { url: img.url, width: img.width ?? 1200, height: img.height ?? 630, alt: article.title };
  }
  return DEFAULT_OG_IMAGE;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  const url = `${SITE_URL}/blog/${article.slug}`;
  const title = article.seoTitle ?? `${article.title} | CK Capital`;
  const description = article.seoDescription ?? article.excerpt ?? "";
  const image = articleOgImage(article);

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      locale: "en_US",
      images: [image],
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-background" data-od-id="article-page">
      {/* Hero */}
      <section className="relative bg-background" data-od-id="article-hero">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 70% 0%, rgba(212,175,55,0.18), transparent 45%), radial-gradient(circle at 5% 100%, rgba(212,175,55,0.08), transparent 40%)',
          }}
        />
        <Container className="relative py-14 md:py-20">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground/60 transition-colors hover:text-primary"
          >
            <ChevronLeft size={16} />
            Back to Blog
          </Link>
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F7D774]">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-foreground/40">
                <Calendar size={12} className="text-primary" />
                {formatDate(article.publishedAt)}
              </span>
              {article.author && (
                <span className="flex items-center gap-1.5 text-[12px] text-foreground/40">
                  <User size={12} className="text-primary" />
                  {article.author}
                </span>
              )}
            </div>
            <h1
              className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl"
              data-od-id="article-title"
            >
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-5 text-[16px] leading-relaxed text-foreground/55">
                {article.excerpt}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Cover image */}
      {article.coverImage && (
        <Container>
          <div className="overflow-hidden rounded-2xl border border-foreground/10">
            <Image
              src={article.coverImage.url}
              alt={article.title}
              width={article.coverImage.width ?? 1200}
              height={article.coverImage.height ?? 630}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority
            />
          </div>
        </Container>
      )}

      {/* Body */}
      <section className="bg-background py-12 md:py-16" data-od-id="article-body">
        <Container>
          <article className="mx-auto max-w-3xl">
            <BlocksRenderer blocks={article.body} />
          </article>
        </Container>
      </section>
    </div>
  );
}
