"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";

export interface PayoutItem {
  src: string;
  title?: string | null;
  amount?: string | null;
}

const FALLBACK_PAYOUTS: PayoutItem[] = [
  { src: "/images/payouts/cert-1.png" },
  { src: "/images/payouts/cert-2.png" },
  { src: "/images/payouts/cert-3.png" },
  { src: "/images/payouts/cert-4.png" },
  { src: "/images/payouts/cert-5.png" },
];

function MarqueeRow({ items, reverse = false }: { items: PayoutItem[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    let pos = reverse ? -track.scrollWidth / 2 : 0;
    const speed = 0.5;

    function tick() {
      if (!track) return;
      if (!paused) {
        if (reverse) {
          pos -= speed;
          if (pos <= -track.scrollWidth / 2) pos = 0;
        } else {
          pos += speed;
          if (pos >= 0) pos = -track.scrollWidth / 2;
        }
        track.style.transform = `translateX(${pos}px)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reverse, paused]);

  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={trackRef} className="flex gap-3 sm:gap-4 w-max">
        {doubled.map((p, i) => (
          <div
            key={i}
            className="relative w-[260px] sm:w-[300px] md:w-[340px] rounded-2xl border border-foreground/10 bg-foreground/[0.03] overflow-hidden shrink-0"
          >
            <div className="relative w-full aspect-[240/154]">
              <Image
                src={p.src}
                alt={p.title ?? "Payout certificate"}
                fill
                className="object-cover"
                sizes="340px"
                unoptimized
              />
            </div>
            <span className="fx-chip-in absolute top-2 left-2 rounded-lg bg-[#0b0a07]/80 px-2 py-1 text-[10px] font-bold text-[#F7D774] backdrop-blur-sm">
              ✓ Verified payout
            </span>
            {p.amount && (
              <div className="absolute bottom-2 left-2 rounded-lg bg-[#0b0a07]/85 px-2.5 py-1 text-xs font-bold text-[#F7D774]">
                {p.amount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PayoutCarousel({ payouts = FALLBACK_PAYOUTS }: { payouts?: PayoutItem[] }) {
  const items = payouts.length ? payouts : FALLBACK_PAYOUTS;
  // Second row is the first row rotated so the seam is never visible.
  const row2 = items.length > 1 ? [...items.slice(1), items[0]] : items;

  return (
    <section className="py-14 md:py-24 bg-background" data-od-id="payout-carousel" id="payouts">
      <Container>
        <SectionReveal>
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-2">
              Verified Payouts
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
              Real Payouts to Real Traders
            </h2>
            <p className="mt-3 text-foreground/50 text-sm max-w-xl mx-auto">
              Average processing time: <span className="font-bold text-primary">12 hours</span>.
              No waiting periods, no hidden conditions.
            </p>
          </div>
        </SectionReveal>
      </Container>

      <div className="flex flex-col gap-3 sm:gap-4">
        <MarqueeRow items={items} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
