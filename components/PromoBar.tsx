const promoItems = Array.from({ length: 8 }, (_, index) => index)

export function PromoBar() {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-[#f4c430] via-[#f0e68c] to-[#f4c430] py-2 text-sm font-medium text-black">
      <style>{`
        @keyframes promo-bar-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .promo-bar-track {
          animation: promo-bar-scroll 22s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="promo-bar-track flex w-max items-center whitespace-nowrap">
        {[...promoItems, ...promoItems].map((item, index) => (
          <div key={`${item}-${index}`} className="mx-10 flex items-center gap-2">
            <span>🏆</span>
            <span>Join Now &amp; Get JUN70 Code for 70% Off</span>
          </div>
        ))}
      </div>
    </div>
  )
}
