import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 sm:px-6 py-12 sm:py-16 md:py-32 lg:py-40">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="animate-slide-left">
            <span className="inline-block text-xs font-bold text-[#E8C547] bg-[#F5F5F5] px-4 py-2 rounded-full mb-6">CK CAPITAL</span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight mb-6 md:mb-8 text-balance">
              Transforming Traders Into Winners
            </h1>

            <p className="text-base sm:text-lg text-[#666666] mb-8 md:mb-10 leading-relaxed">
              Get funded with up to $1.2M capital. Enjoy up to 100% profit splits, flexible payouts, and trade 50+ instruments with CK Capital.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 md:mb-12">
              <div className="bg-[#F9F9F9] p-3 sm:p-4 rounded-lg shadow-premium">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <TrendingUp className="h-4 sm:h-5 w-4 sm:w-5 text-[#E8C547]" />
                  <span className="font-bold text-lg sm:text-xl text-[#1a1a1a]">100%</span>
                </div>
                <p className="text-xs sm:text-sm text-[#666666]">Profit Split</p>
              </div>
              <div className="bg-[#F9F9F9] p-3 sm:p-4 rounded-lg shadow-premium">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <DollarSign className="h-4 sm:h-5 w-4 sm:w-5 text-[#E8C547]" />
                  <span className="font-bold text-lg sm:text-xl text-[#1a1a1a]">$1.2M</span>
                </div>
                <p className="text-xs sm:text-sm text-[#666666]">Max Funded</p>
              </div>
              <div className="bg-[#F9F9F9] p-3 sm:p-4 rounded-lg shadow-premium">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5 text-[#E8C547]" />
                  <span className="font-bold text-lg sm:text-xl text-[#1a1a1a]">50+</span>
                </div>
                <p className="text-xs sm:text-sm text-[#666666]">Instruments</p>
              </div>
            </div>

            <Button size="lg" className="bg-[#E8C547] hover:bg-[#D4AF37] text-[#1a1a1a] font-bold rounded-lg transition-colors">
              Start Your Evaluation
            </Button>
          </div>

          {/* Right Column - Chart Visualization */}
          <div className="animate-slide-right hidden md:block">
            <div className="relative h-96 bg-gradient-to-br from-[#F9F9F9] to-[#F5F5F5] rounded-xl p-8 shadow-premium">
              <div className="absolute inset-0 flex items-end justify-around gap-3 p-8">
                <div className="w-12 h-20 bg-gradient-to-t from-[#E8C547] to-[#F5E6A0] rounded-lg opacity-70 hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-32 bg-gradient-to-t from-[#E8C547] to-[#F5E6A0] rounded-lg opacity-85 hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-24 bg-gradient-to-t from-[#E8C547] to-[#F5E6A0] rounded-lg opacity-75 hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-40 bg-gradient-to-t from-[#E8C547] to-[#F5E6A0] rounded-lg opacity-90 hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-28 bg-gradient-to-t from-[#E8C547] to-[#F5E6A0] rounded-lg opacity-80 hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-around text-xs text-[#999999] font-medium">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
