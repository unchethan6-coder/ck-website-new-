'use client';

import { useState, useEffect } from 'react';

interface CandleData {
  month: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

const candleData: CandleData[] = [
  { month: 'Jan', open: 45, close: 62, high: 75, low: 40 },
  { month: 'Feb', open: 62, close: 85, high: 95, low: 58 },
  { month: 'Mar', open: 85, close: 72, high: 90, low: 70 },
  { month: 'Apr', open: 72, close: 95, high: 105, low: 68 },
  { month: 'May', open: 95, close: 80, high: 100, low: 75 },
];

export default function CandlestickChart() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const maxPrice = 105;
  const chartHeight = 280;

  const getCandleHeight = (high: number) => {
    return (high / maxPrice) * chartHeight;
  };

  const getBodyHeight = (open: number, close: number) => {
    return Math.abs(close - open) * (chartHeight / maxPrice);
  };

  const getBodyTop = (open: number, close: number, high: number) => {
    const topPrice = Math.max(open, close);
    return ((high - topPrice) / maxPrice) * chartHeight;
  };

  return (
    <div className="w-full bg-gradient-to-b from-white via-blue-50 to-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 sm:mb-12 text-center space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-balance">
            Real-Time Trading Performance
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Track market movements with our advanced charting tools
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 border border-gray-100">
          {/* Chart Container */}
          <div className="relative h-96 w-full mb-8">
            {/* Y-Axis Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-10">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t border-gray-300"></div>
              ))}
            </div>

            {/* Y-Axis Labels */}
            <div className="absolute -left-12 top-0 h-full flex flex-col justify-between text-xs text-gray-500 font-medium">
              {[105, 80, 55, 30, 5].map((price) => (
                <span key={price}>${price}K</span>
              ))}
            </div>

            {/* Candlesticks Container */}
            <div className="absolute inset-0 flex items-end justify-around gap-2 sm:gap-3 md:gap-6 px-4 sm:px-6">
              {candleData.map((candle, index) => {
                const wickTop = chartHeight;
                const bodyTop = getBodyTop(candle.open, candle.close, candle.high);
                const bodyHeight = getBodyHeight(candle.open, candle.close);
                const isGreen = candle.close > candle.open;

                const delayMs = index * 150;
                const animationDelay = isAnimating ? 0 : 1000;

                return (
                  <div
                    key={candle.month}
                    className="flex-1 flex flex-col items-center"
                    style={{
                      animation: isAnimating
                        ? `slideUp 0.8s ease-out ${delayMs}ms backwards`
                        : 'none',
                    }}
                  >
                    {/* Candle Visual */}
                    <div className="relative w-full flex justify-center" style={{ height: `${chartHeight}px` }}>
                      {/* Wick (High-Low Line) */}
                      <div
                        className="absolute w-1 bg-gradient-to-b from-gray-400 to-gray-300"
                        style={{
                          height: `${getCandleHeight(candle.high)}px`,
                          bottom: 0,
                        }}
                      ></div>

                      {/* Body */}
                      <div
                        className={`absolute w-10 sm:w-12 md:w-16 rounded-t-xl transition-all duration-300 hover:shadow-lg`}
                        style={{
                          height: `${Math.max(bodyHeight, 8)}px`,
                          bottom: `${getBodyTop(candle.open, candle.close, candle.high)}px`,
                          background: isGreen
                            ? 'linear-gradient(to bottom, #FEF3C7, #F4D957)'
                            : 'linear-gradient(to bottom, #FECACA, #F87171)',
                          boxShadow: isGreen
                            ? '0 4px 20px rgba(244, 217, 87, 0.3)'
                            : '0 4px 20px rgba(248, 113, 113, 0.3)',
                        }}
                      ></div>
                    </div>

                    {/* Label */}
                    <div className="mt-3 sm:mt-4 text-center">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        {candle.month}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        ${candle.close}K
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CSS Animation */}
            <style>{`
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </div>

          {/* Chart Footer with Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Highest</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">$105K</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Lowest</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">$5K</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Volume</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">2.5M</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Change</p>
              <p className="text-lg sm:text-xl font-bold text-green-600">+77.8%</p>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-b from-yellow-200 to-yellow-400"></div>
              <span className="text-gray-600">Bullish (Close &gt; Open)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-b from-red-200 to-red-400"></div>
              <span className="text-gray-600">Bearish (Close &lt; Open)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
