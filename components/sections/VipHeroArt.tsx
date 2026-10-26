"use client";

import Image from "next/image";

/**
 * The VIP copy's hero artwork: the 90% OFF raccoon, lit like an electric
 * storm — a pulsing blue core, slow light rays, a ground glow and lightning
 * that flickers in and out. All decoration is CSS/SVG and stops for visitors
 * who ask for reduced motion (see the .vip-* rules in globals.css).
 */
export function VipHeroArt() {
  return (
    <div className="vip-art relative isolate mx-auto aspect-square w-full max-w-[400px] sm:max-w-[520px] lg:max-w-[620px]" data-od-id="vip-hero-art">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Light rays turning slowly behind the figure */}
        <div className="vip-rays absolute inset-[-18%] rounded-full" />
        {/* Hot core and wide haze */}
        <div className="vip-core absolute top-[18%] left-1/2 h-[64%] w-[64%] -translate-x-1/2 rounded-full" />
        <div className="absolute inset-[6%] rounded-full bg-[#2F6BFF]/40 blur-[110px]" />
        {/* Ground glow the figure stands in */}
        <div className="absolute bottom-[2%] left-1/2 h-[16%] w-[78%] -translate-x-1/2 rounded-full bg-[#6FA4FF]/55 blur-[55px]" />
      </div>

      {/* Lightning: two bolts that strike at different moments */}
      <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute inset-0 -z-[5] h-full w-full overflow-visible">
        <defs>
          <filter id="vip-bolt-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polyline
          className="vip-bolt vip-bolt-a"
          points="330,-10 300,60 322,70 280,150 305,158 262,240"
          fill="none" stroke="#DCE8FF" strokeWidth="2.5" strokeLinejoin="round" filter="url(#vip-bolt-glow)"
        />
        <polyline
          className="vip-bolt vip-bolt-b"
          points="40,40 78,110 58,118 104,190 82,198 128,262"
          fill="none" stroke="#DCE8FF" strokeWidth="2" strokeLinejoin="round" filter="url(#vip-bolt-glow)"
        />
      </svg>

      <Image
        src="/images/vip/raccoon-90-off.webp"
        alt="CK raccoon in electric armour holding a 90% OFF sign"
        width={1125}
        height={1125}
        priority
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 520px, 620px"
        className="vip-figure relative h-auto w-full drop-shadow-[0_0_45px_rgba(76,141,255,0.55)]"
      />
    </div>
  );
}
