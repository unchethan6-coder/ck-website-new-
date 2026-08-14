"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { Play } from "lucide-react";

const VIDEOS: VideoItem[] = [
  {
    id: "bZq8jtD9acY",
    reward: "$38,200",
    title: "I DROPPED OUT OF COLLEGE FOR TRADING",
    desc: "More than rewards — how CK changed my trading",
  },
  {
    id: "8NQAWtlh_ws",
    reward: "$84,120",
    title: "BEST PROP? I TRUST CK CAPITAL",
    desc: "Trusting the process paid off big time",
  },
  {
    id: "5RjtGHPcuMM",
    reward: "$15,995",
    title: "MY PERCEPTION ABOUT TRADING WAS WRONG...",
    desc: "Trading Gold & Nasdaq to a funded payout",
  },
  {
    id: "LNXpq8_PwxU",
    reward: "$22,400",
    title: "THIS IS HOW ALGO TRADING CHANGED IT ALL",
    desc: "From challenge to funded: a CK success story",
  },
];

export interface VideoItem {
  id: string;
  title: string;
  reward?: string | null;
  desc?: string | null;
}

export function Testimonials({ videos = VIDEOS }: { videos?: VideoItem[] }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const items = videos.length ? videos : VIDEOS;

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
    <section className="py-14 md:py-24 bg-background" data-od-id="testimonials">
      <Container>
        <SectionReveal className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            Testimonials
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            Real Traders, Real Rewards,{" "}
            <span className="text-primary">Real Impact</span>
          </h2>
          <p className="mt-3 text-foreground/50 max-w-xl mx-auto text-sm">
            Hear it directly from traders who passed their challenge and received their reward — real
            stories from people whose lives changed with every payout.
          </p>
        </SectionReveal>
      </Container>

      {/* Auto-scrolling video row */}
      <div className="overflow-hidden">
        <div ref={rowRef} className="flex gap-4 w-max px-4 sm:px-6 lg:px-8">
          {doubled.map((v, i) => (
            <div
              key={`${v.id}-${i}`}
              className="w-[280px] sm:w-[320px] md:w-[360px] rounded-2xl border border-foreground/10 bg-foreground/[0.03] overflow-hidden shrink-0 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video cursor-pointer group" onClick={() => handlePlay(v.id)}>
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
                      src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                      alt={v.title}
                      fill
                      className="object-cover"
                      sizes="360px"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all ring-1 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/60">
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
                <h3 className="font-[family-name:var(--font-inter-tight)] text-sm font-bold text-foreground uppercase leading-snug">
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
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-[15px] font-bold text-black transition-colors hover:bg-[#F7D774]"
          >
            Join Our Community
          </a>
        </div>
      </Container>
    </section>
  );
}
