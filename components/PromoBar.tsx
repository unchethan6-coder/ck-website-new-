const promoItems = Array.from({ length: 10 }, (_, index) => index)

export function PromoBar() {
  return (
    <div className="relative z-[60] w-full overflow-hidden bg-gradient-to-r from-[#f4c430] via-[#f0e68c] to-[#f4c430] py-1.5 text-sm font-semibold text-black shadow-sm md:py-2 md:text-base">
      <style>{`
        @keyframes top-promo-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .top-promo-marquee-track {
          animation: top-promo-marquee 26s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="top-promo-marquee-track flex w-max items-center whitespace-nowrap">
        {[...promoItems, ...promoItems].map((item, index) => (
          <div key={`${item}-${index}`} className="mx-10 flex items-center gap-2 md:mx-14">
            <span>🏆</span>
            <span>Join Now &amp; Get JUN70 Code for 70% Off</span>
          </div>
        ))}
      </div>
    </div>
  )
}
