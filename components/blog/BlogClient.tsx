"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, FileText, Sparkles, User } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { ARTICLE_CATEGORIES } from "@/lib/cms";
import type { CmsArticle } from "@/lib/cms";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogClient({ articles }: { articles: CmsArticle[] }) {
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all" ? articles : articles.filter((a) => a.category === active);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-background" data-od-id="blog-page">
      {/* ─────────────── Hero ─────────────── */}
      <section className="relative bg-background" data-od-id="blog-hero">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 70% 0%, rgba(212,175,55,0.20), transparent 45%), radial-gradient(circle at 5% 100%, rgba(212,175,55,0.08), transparent 40%)',
          }}
        />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-primary">
                <Sparkles size={11} className="text-primary" />
                Insights &amp; Analysis
                <span className="text-primary/40">·</span>
                From the CK Capital Team
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl lg:text-[52px]"
              data-od-id="blog-hero-title"
            >
              CK Capital <span className="shimmer-text">Blog</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/55"
            >
              Trading insights, market analysis, and success stories from our community.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ─────────────── Empty state ─────────────── */}
      {articles.length === 0 ? (
        <section className="bg-background pt-6 pb-20 md:pt-10 md:pb-28" data-od-id="blog-empty">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-xl rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-6 py-16 text-center sm:py-20"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10">
                <FileText size={24} className="text-primary" />
              </div>
              <h2 className="font-[family-name:var(--font-inter-tight)] text-xl font-extrabold text-foreground md:text-2xl">
                Articles Coming Soon
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/55">
                We&apos;re putting the finishing touches on our insights hub. Trading tips,
                market analysis, and trader success stories will be published here shortly.
              </p>
            </motion.div>
          </Container>
        </section>
      ) : (
        <>
          {/* ─────────────── Category filter ─────────────── */}
          <section className="bg-background pb-4" data-od-id="blog-filter">
            <Container>
              <div className="flex flex-wrap justify-center gap-2">
                {ARTICLE_CATEGORIES.map((cat) => {
                  const isActive = active === cat.value;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActive(cat.value)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-xs font-bold transition-all",
                        isActive
                          ? "border-primary/70 bg-[#D4AF37] text-[#0B0A07] shadow-[0_0_14px_rgba(212,175,55,0.25)]"
                          : "border-foreground/15 bg-foreground/[0.04] text-foreground/60 hover:border-primary/50 hover:text-foreground"
                      )}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </Container>
          </section>

          {/* ─────────────── Featured post ─────────────── */}
          {featured && (
            <section className="bg-background py-12 md:py-16" data-od-id="blog-featured">
              <Container>
                <AnimatePresence mode="wait">
                  <motion.article
                    key={featured.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r dark-panel from-[#1a1508] to-[#0d0b06] p-7 sm:p-10"
                    data-od-id="blog-featured-card"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,175,55,0.10),_transparent_55%)]" />
                    <div className="relative">
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0B0A07]">
                          Featured
                        </span>
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F7D774]">
                          {featured.category}
                        </span>
                      </div>
                      <h2 className="max-w-2xl font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/55">
                        {featured.excerpt}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/[0.08] pt-5">
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="flex items-center gap-1.5 text-[12px] text-foreground/40">
                            <Calendar size={12} className="text-primary" />
                            {formatDate(featured.publishedAt)}
                          </span>
                          {featured.author && (
                            <span className="flex items-center gap-1.5 text-[12px] text-foreground/40">
                              <User size={12} className="text-primary" />
                              {featured.author}
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/blog/${featured.slug}`}
                          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F7D774] transition-colors hover:text-[#D4AF37]"
                        >
                          Read More <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </Container>
            </section>
          )}

          {/* ─────────────── Blog grid ─────────────── */}
          <section className="bg-background pb-16 md:pb-24" data-od-id="blog-grid">
            <Container>
              {rest.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      className="group flex flex-col rounded-2xl border border-foreground/10 bg-foreground/[0.03] transition-all duration-300 hover:border-primary/30 hover:bg-foreground/[0.05]"
                      data-od-id={`blog-card-${i + 1}`}
                    >
                      {post.coverImage ? (
                        <div className="relative h-40 w-full overflow-hidden rounded-t-2xl border-b border-foreground/10">
                          <Image
                            src={post.coverImage.url}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          />
                        </div>
                      ) : null}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F7D774]">
                            {post.category}
                          </span>
                        </div>
                        <h2 className="font-[family-name:var(--font-inter-tight)] text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                          {post.title}
                        </h2>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/50">
                          {post.excerpt}
                        </p>
                        <div className="mt-5 flex items-center justify-between border-t border-foreground/[0.08] pt-4">
                          <span className="flex items-center gap-1.5 text-[11px] text-foreground/40">
                            <Calendar size={11} className="text-primary" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#F7D774] transition-colors hover:text-[#D4AF37]"
                          >
                            Read <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-[15px] text-foreground/50">
                    No posts in this category yet — check back soon.
                  </p>
                </div>
              )}
            </Container>
          </section>
        </>
      )}
    </div>
  );
}
