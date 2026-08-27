"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { fadeUp } from "@/components/fx/reveal";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

/** Known video metadata — used to enrich CMS entries that may lack reward/description */
export const VIDEO_META: Record<string, { reward: string; desc: string; thumbnail: string }> = {
  bZq8jtD9acY: { reward: "$38,200", desc: "More than rewards — how CK changed my trading", thumbnail: "/images/testimonials/hqdefault-308afdd2f9.jpg" },
  "8NQAWtlh_ws": { reward: "$84,120", desc: "Trusting the process paid off big time", thumbnail: "/images/testimonials/hqdefault-88f16d731b.jpg" },
  "5RjtGHPcuMM": { reward: "$15,995", desc: "Trading Gold & Nasdaq to a funded payout", thumbnail: "/images/testimonials/hqdefault-ae10a042fa.jpg" },
  LNXpq8_PwxU: { reward: "$22,400", desc: "From challenge to funded: a CK success story", thumbnail: "/images/testimonials/hqdefault-9c0405cb37.jpg" },
};

export const FALLBACK_VIDEOS: VideoItem[] = [
  { id: "bZq8jtD9acY", thumbnail: VIDEO_META["bZq8jtD9acY"].thumbnail, reward: VIDEO_META["bZq8jtD9acY"].reward, title: "I DROPPED OUT OF COLLEGE FOR TRADING", desc: VIDEO_META["bZq8jtD9acY"].desc },
  { id: "8NQAWtlh_ws", thumbnail: VIDEO_META["8NQAWtlh_ws"].thumbnail, reward: VIDEO_META["8NQAWtlh_ws"].reward, title: "BEST PROP? I TRUST CK CAPITAL", desc: VIDEO_META["8NQAWtlh_ws"].desc },
  { id: "5RjtGHPcuMM", thumbnail: VIDEO_META["5RjtGHPcuMM"].thumbnail, reward: VIDEO_META["5RjtGHPcuMM"].reward, title: "MY PERCEPTION ABOUT TRADING WAS WRONG...", desc: VIDEO_META["5RjtGHPcuMM"].desc },
  { id: "LNXpq8_PwxU", thumbnail: VIDEO_META["LNXpq8_PwxU"].thumbnail, reward: VIDEO_META["LNXpq8_PwxU"].reward, title: "THIS IS HOW ALGO TRADING CHANGED IT ALL", desc: VIDEO_META["LNXpq8_PwxU"].desc },
];

export interface VideoItem {
  id: string;
  title: string;
  thumbnail?: string;
  reward?: string | null;
  desc?: string | null;
}

export function Testimonials({ videos = FALLBACK_VIDEOS }: { videos?: VideoItem[] }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  // Enrich CMS videos with known metadata (reward amounts, descriptions, thumbnails)
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

  const handlePlay = useCallback((id: string) => {
    setPlaying((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let raf: number;
    let pos = 0;
    const speed = 0.4;

    function tick() {
      if (!row) return;
      pos += speed;
      if (pos >= row.scrollWidth / 2) pos = 0;
      row.style.transform = `translateX(-${pos}px)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const doubled = [...items, ...items];

  return (
    <section className="bg-white text-[#0A0A0C] py-16 md:py-24" data-od-id="testimonials">
      <Container>
        <SectionReveal className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            Testimonials
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-[#0A0A0C] md:text-4xl">
            Funded traders,{" "}
            <span className="text-primary">on record</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
            Watch traders who passed their challenge and collected their payout — in their own
            words, straight from the source.
          </p>
        </SectionReveal>
      </Container>

      {/* Auto-scrolling video row */}
      <div
        className="overflow-hidden"
      >
        <div ref={rowRef} className="flex gap-4 w-max px-4 sm:px-6 lg:px-8">
          {doubled.map((v, i) => (
            <div
              key={`${v.id}-${i}`}
              className="w-[280px] sm:w-[320px] md:w-[360px] rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden shrink-0 flex flex-col card-hover-standard"
            >
              {/* Thumbnail */}
              <div
                className="relative w-full aspect-video cursor-pointer group"
                role="button"
                tabIndex={0}
                onClick={() => handlePlay(v.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handlePlay(v.id);
                  }
                }}
              >
                {playing === v.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                    title={v.title}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <Image
                      src={v.thumbnail ?? FALLBACK_VIDEOS[i % FALLBACK_VIDEOS.length].thumbnail!}
                      alt={v.title}
                      fill
                      className="object-cover"
                      sizes="360px"
                    />
                    <div className="absolute inset-0 bg-gray-50 group-hover:bg-black/20 transition-colors" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all ring-1 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/60 group-focus-visible:ring-2 group-focus-visible:ring-primary/60">
                        <Play size={22} fill="#0B0A07" stroke="none" className="ml-1" />
                      </div>
                    </div>
                    {/* Reward badge */}
                    {v.reward && (
                      <div className="absolute top-3 left-3 bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-lg">
                        Reward: {v.reward}
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* Text */}
              <div className="p-4 flex flex-col gap-1">
                <h3 className="font-[family-name:var(--font-inter-tight)] text-sm font-bold text-[#0A0A0C] uppercase leading-snug">
                  {v.title}
                </h3>
                {v.desc && <p className="text-xs text-foreground/40 leading-relaxed">{v.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Community CTA */}
      <Container>
        <div className="flex justify-center mt-10">
          <a
            href="https://discord.gg/ckcapital"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-standard inline-flex h-12 items-center justify-center px-8 text-[15px] font-bold"
          >
            Join Our Community
          </a>
        </div>
      </Container>
    </section>
  );
}
