"use client";

import Image from "next/image";

/**
 * The VIP copy's hero artwork: the 90% OFF raccoon with lightning that
 * flickers in and out around it. The bottom of the figure fades into the
 * page instead of ending on a hard edge. Motion stops for visitors who ask
 * for reduced motion (see the .vip-* rules in globals.css).
 */
export function VipHeroArt() {
  return (
    <div className="vip-art relative isolate mx-auto aspect-square w-full max-w-[400px] sm:max-w-[520px] lg:max-w-[620px]" data-od-id="vip-hero-art">
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
        className="vip-figure relative h-auto w-full"
      />
    </div>
  );
}
