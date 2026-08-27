"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FALLBACK_VIDEOS, VIDEO_META, type VideoItem } from "@/components/sections/Testimonials";

/**
 * Trader stories carousel (homepage, light) — FundingPips-style edge-bleed
 * marquee with branded "SUCCESS STORY" cards, arrow controls and a YouTube
 * lightbox. Autoplay drift preserved; /payouts keeps the legacy section.
 */
export function TraderStories({ videos = FALLBACK_VIDEOS }: { videos?: VideoItem[] }) {
  const t = useTranslations("stories");
  const [playing, setPlaying] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);

  const items = (videos.length ? videos : FALLBACK_VIDEOS).map((v) => {
    const meta = VIDEO_META[v.id];
    if (!meta) return v;
    return {
      ...v,
      reward: v.reward || meta.reward,
      desc: v.desc || meta.desc,
      thumbnail: v.thumbnail || meta.thumbnail,
    };
  });

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let raf: number;
    const tick = () => {
      if (!row.isConnected) return; // stop if node detached (e.g. HMR swap)
      posRef.current += 0.4;
      const half = row.scrollWidth / 2;
      if (posRef.current >= half) posRef.current -= half;
      row.style.transform = `translateX(-${posRef.current}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const nudge = useCallback((dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector("article");
    const step = (card ? card.getBoundingClientRect().width : 376) + 16;
    const half = row.scrollWidth / 2;
    posRef.current += dir * step;
    if (posRef.current >= half) posRef.current -= half;
    if (posRef.current < 0) posRef.current += half;
    row.style.transform = `translateX(-${posRef.current}px)`;
  }, []);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlaying(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [playing]);

  const doubled = [...items, ...items];

  return (
    <section className="bg-white py-16 text-[#0A0A0C] md:py-24" data-od-id="trader-stories">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold tracking-[-0.02em] text-[#0A0A0C] sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-gray-500">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Carousel — full-bleed marquee */}
      <div className="relative mt-12">
        <div className="overflow-hidden">
          <div ref={rowRef} className="flex w-max gap-4 px-4 sm:px-6 lg:px-8">
            {doubled.map((v, i) => {
              const key = `${v.id}-${i}`;
              const thumb = v.thumbnail ?? FALLBACK_VIDEOS[i % FALLBACK_VIDEOS.length].thumbnail!;
              return (
                <article
                  key={key}
                  role="button"
                  tabIndex={0}
                  onClick={() => setPlaying(v.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPlaying(v.id);
                    }
                  }}
                  className="group relative w-[85vw] max-w-[300px] shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-[0_20px_44px_-20px_rgba(10,10,12,0.35)] sm:w-[360px] md:w-[420px]"
                  data-od-id={`story-card-${v.id}`}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={thumb}
                      alt={v.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="420px"
                    />
                    {/* Branding gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

                    {/* Wordmark */}
                    <p className="absolute left-4 top-3.5 text-[11px] font-black tracking-[0.18em] text-white/90">
                      CK CAPITAL
                    </p>

                    {/* Hover play affordance */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl">
                        <ChevronRight size={22} className="ml-0.5 text-[#0A0A0C]" strokeWidth={2.5} />
                      </span>
                    </div>

                    {/* Branded overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FFC107]">
                        {t("successStory")}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-sm font-semibold text-white/85">
                        {v.title}
                      </p>
                      <p className="mt-1 text-[10px] font-medium text-white/45">By CK Capital</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous stories"
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-[#0A0A0C] shadow-[0_10px_28px_rgba(10,10,12,0.18)] transition-transform hover:scale-105 sm:left-8"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next stories"
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-[#0A0A0C] shadow-[0_10px_28px_rgba(10,10,12,0.18)] transition-transform hover:scale-105 sm:right-8"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Discord CTA */}
      <div className="mx-auto mt-10 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <a
          href="https://discord.gg/ckcapital"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-[#FFC107] px-8 text-[15px] font-black text-[#0A0A0C] transition-all hover:bg-[#E6AE06] hover:shadow-[0_0_20px_rgba(255,193,7,0.28)]"
        >
          Join Our Community
        </a>
      </div>

      {/* Lightbox */}
      {playing ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setPlaying(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Trader story video"
        >
          <button
            type="button"
            onClick={() => setPlaying(null)}
            aria-label="Close video"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <X size={22} />
          </button>
          <div
            className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${playing}?autoplay=1&rel=0`}
              title="Trader story video"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
