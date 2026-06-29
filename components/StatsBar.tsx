'use client';

export default function StatsBar() {
  return (
    <div className="w-full bg-cyan-100 py-6 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          {/* Left Stats */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 md:gap-12 flex-1">
            {/* Stat 1 */}
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="text-2xl">💰</div>
              <div>
                <div className="font-bold text-lg text-black">$262M+</div>
                <div className="text-sm text-black/70">Rewards Distributed</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="text-2xl">👥</div>
              <div>
                <div className="font-bold text-lg text-black">3M+</div>
                <div className="text-sm text-black/70">Traders Worldwide</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="text-2xl">🌍</div>
              <div>
                <div className="font-bold text-lg text-black">195+</div>
                <div className="text-sm text-black/70">Countries Serviced</div>
              </div>
            </div>
          </div>

          {/* Right Ratings */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* Trustpilot Rating */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-green-500 text-lg">★</span>
                ))}
              </div>
              <div className="text-xs md:text-sm text-black font-semibold">Excellent</div>
              <div className="text-xs text-black/70">58,550 reviews</div>
              <div className="text-xs font-semibold text-black">Trustpilot</div>
            </div>

            {/* Google Rating */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary500 text-lg">★</span>
                ))}
              </div>
              <div className="text-xs md:text-sm text-black font-semibold">Excellent</div>
              <div className="text-xs text-black/70">4.8 rated</div>
              <div className="text-xs font-semibold text-black">Google</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
