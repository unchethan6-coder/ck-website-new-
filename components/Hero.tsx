import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 sm:px-6 py-12 sm:py-16 md:py-32 lg:py-40">
      {/* Subtle 3D Trading Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Faint 3D Chart Lines Background */}
        <svg className="absolute -top-40 -right-40 w-96 h-96 opacity-5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <g strokeWidth="1" stroke="#E8C547" fill="none">
            <line x1="20" y1="150" x2="180" y2="50" />
            <line x1="20" y1="160" x2="180" y2="60" />
            <line x1="30" y1="150" x2="190" y2="50" />
            <polyline points="20,100 60,80 100,120 140,60 180,90" />
            <circle cx="100" cy="100" r="60" />
          </g>
        </svg>

        {/* Faint 3D Cube - Trading Symbol */}
        <svg className="absolute -bottom-32 -left-32 w-80 h-80 opacity-3" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#E8C547" fill="none" strokeWidth="0.5">
            {/* Cube */}
            <line x1="30" y1="30" x2="70" y2="30" />
            <line x1="70" y1="30" x2="70" y2="70" />
            <line x1="70" y1="70" x2="30" y2="70" />
            <line x1="30" y1="70" x2="30" y2="30" />
            <line x1="30" y1="30" x2="50" y2="15" />
            <line x1="70" y1="30" x2="90" y2="15" />
            <line x1="70" y1="70" x2="90" y2="85" />
            <line x1="30" y1="70" x2="50" y2="85" />
            <line x1="50" y1="15" x2="90" y2="15" />
            <line x1="90" y1="15" x2="90" y2="85" />
            <line x1="90" y1="85" x2="50" y2="85" />
            <line x1="50" y1="85" x2="50" y2="15" />
          </g>
        </svg>

        {/* Faint Upward Arrow - Success Symbol */}
        <svg className="absolute top-1/3 left-10 w-32 h-32 opacity-4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#E8C547" fill="none" strokeWidth="1">
            <line x1="50" y1="80" x2="50" y2="20" strokeLinecap="round" />
            <polyline points="30,40 50,20 70,40" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Column */}
          <div className="animate-slide-left space-y-4 sm:space-y-6">
            <span className="inline-block text-xs font-bold text-[#E8C547] bg-[#F5F5F5] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              CK CAPITAL
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight text-balance">
              Trade Simulated Funded Accounts With CK Capital
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#666666] leading-relaxed">
              Join a proprietary trading evaluation platform designed for traders who can demonstrate discipline, consistency, and responsible risk management in a simulated trading environment.
            </p>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#666666]">
              <p className="leading-relaxed">Access simulated account sizes up to $1.2M with scalable evaluation programs, flexible trading conditions, and performance-based payout structures.</p>
              <ul className="space-y-1 pl-4">
                <li>• Simulated Trading Environment</li>
                <li>• Up To 100% Simulated Profit Split</li>
                <li>• Up To $1.2M Simulated Scaling</li>
                <li>• Forex, Indices, Commodities & Crypto CFDs</li>
                <li>• No Investment Services Provided</li>
              </ul>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4">
              <div className="bg-[#F9F9F9] p-2 sm:p-3 md:p-4 rounded-lg shadow-premium hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <TrendingUp className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-[#E8C547] flex-shrink-0" />
                  <span className="font-bold text-sm sm:text-lg md:text-xl text-[#1a1a1a]">100%</span>
                </div>
                <p className="text-xs text-[#666666] leading-tight">Profit Split</p>
              </div>
              <div className="bg-[#F9F9F9] p-2 sm:p-3 md:p-4 rounded-lg shadow-premium hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <DollarSign className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-[#E8C547] flex-shrink-0" />
                  <span className="font-bold text-sm sm:text-lg md:text-xl text-[#1a1a1a]">$1.2M</span>
                </div>
                <p className="text-xs text-[#666666] leading-tight">Max Funded</p>
              </div>
              <div className="bg-[#F9F9F9] p-2 sm:p-3 md:p-4 rounded-lg shadow-premium hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <BarChart3 className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-[#E8C547] flex-shrink-0" />
                  <span className="font-bold text-sm sm:text-lg md:text-xl text-[#1a1a1a]">50+</span>
                </div>
                <p className="text-xs text-[#666666] leading-tight">Instruments</p>
              </div>
            </div>

            <Button size="lg" className="bg-[#E8C547] hover:bg-[#D4AF37] text-[#1a1a1a] font-bold rounded-lg transition-colors duration-150 w-full sm:w-auto">
              Start Evaluation
            </Button>
          </div>

          {/* Right Column - Chart Visualization */}
          <div className="animate-slide-right hidden md:block">
            <div className="relative h-80 lg:h-96 bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F5] rounded-xl p-6 sm:p-8 shadow-premium">
              <div className="absolute inset-0 flex items-end justify-around gap-2 sm:gap-3 p-6 sm:p-8">
                <div className="w-10 sm:w-12 h-20 bg-gradient-to-t from-[#E8C547] to-[#F5E6A0] rounded-lg opacity-70 hover:opacity-100 transition-opacity duration-200"></div>
                <div className="w-10 sm:w-12 h-28 bg-gradient-to-t from-[#E8C547] to-[#F5E6A0] rounded-lg opacity-85 hover:opacity-100 transition-opacity duration-200"></div>
                <div className="w-10 sm:w-12 h-24 bg-gradient-to-t from-[#E8C547] to-[#F5E6A0] rounded-lg opacity-75 hover:opacity-100 transition-opacity duration-200"></div>
                <div className="w-10 sm:w-12 h-36 bg-gradient-to-t from-[#E8C547] to-[#F5E6A0] rounded-lg opacity-90 hover:opacity-100 transition-opacity duration-200"></div>
                <div className="w-10 sm:w-12 h-28 bg-gradient-to-t from-[#E8C547] to-[#F5E6A0] rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-around px-4 sm:px-8 text-xs text-[#999999] font-medium">
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
