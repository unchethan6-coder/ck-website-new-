'use client';

export default function ScrollingPromos() {
  const promos = [
    'ACCOUNT RESETS',
    'ALL 75% OFF',
    '1 & 2 STEP CHALLENGES',
    '$10K FOR $19',
    'CODE: DLY0119',
    '$2.5K TO $10K',
    'CODE: MAY85',
    '$2.5K TO $100K',
    'CODE: EID70',
    'INSTANT FUNDING',
    'USE EID70',
    'ACCOUNT RESETS',
    'ALL 75% OFF',
    '1 & 2 STEP CHALLENGES',
  ];

  return (
    <div className="relative w-full bg-[#E8C547] overflow-hidden py-1.5 sm:py-2 border-t border-b border-[#1a1a1a]">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrolling-container {
          animation: scroll 30s linear infinite;
          display: flex;
          width: max-content;
        }
        .scrolling-container:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="scrolling-container">
        {promos.map((promo, index) => (
          <div
            key={index}
            className="px-3 sm:px-6 md:px-8 py-1 sm:py-2 text-xs sm:text-sm font-bold text-[#1a1a1a] whitespace-nowrap flex items-center"
          >
            {promo}
            {index < promos.length - 1 && (
              <span className="mx-2 sm:mx-4 text-[#1a1a1a]">•</span>
            )}
          </div>
        ))}
        {promos.map((promo, index) => (
          <div
            key={`duplicate-${index}`}
            className="px-3 sm:px-6 md:px-8 py-1 sm:py-2 text-xs sm:text-sm font-bold text-[#1a1a1a] whitespace-nowrap flex items-center"
          >
            {promo}
            {index < promos.length - 1 && (
              <span className="mx-2 sm:mx-4 text-[#1a1a1a]">•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
