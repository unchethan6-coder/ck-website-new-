import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, BarChart3, Zap, Target, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-yellow-50/30 to-white px-3 sm:px-4 py-10 sm:py-14 md:py-24 lg:py-32">
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
        <svg className="absolute top-1/3 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 opacity-4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#E8C547" fill="none" strokeWidth="1">
            <line x1="50" y1="80" x2="50" y2="20" strokeLinecap="round" />
            <polyline points="30,40 50,20 70,40" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left Column */}
          <div className="animate-slide-left space-y-3 sm:space-y-5 md:space-y-6">
            {/* Premium Badge */}
            <div className="inline-block">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-yellow-700 bg-yellow-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-yellow-200">
                <Zap className="w-3.5 h-3.5" />
                LIMITED SPOTS AVAILABLE
              </span>
            </div>
            
            {/* Main Headline - Engaging and benefit-focused */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight sm:leading-snug text-balance">
              Turn Your Trading Skills Into <span className="text-yellow-500">Real Income</span>
            </h1>

            {/* Subheadline - Clear value proposition */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-semibold">
              Prove yourself in a challenge. Get funded with up to $1.2M. Keep 100% of your profits.
            </p>

            {/* Benefit callout boxes */}
            <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
              <div className="flex items-start gap-2.5 sm:gap-3 bg-green-50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-green-200">
                <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5">✓</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm text-gray-900">News Trading Allowed</p>
                  <p className="text-xs text-gray-600">Trade around major events without restrictions</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 sm:gap-3 bg-blue-50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-blue-200">
                <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5">✓</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm text-gray-900">Daily Withdrawals</p>
                  <p className="text-xs text-gray-600">Withdraw your profits whenever you want</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 sm:gap-3 bg-purple-50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-purple-200">
                <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5">✓</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm text-gray-900">24/7 Expert Support</p>
                  <p className="text-xs text-gray-600">Dedicated team ready to help you succeed</p>
                </div>
              </div>
            </div>

            {/* Key Stats Grid - Enhanced for mobile */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-3 sm:p-4 rounded-lg border border-yellow-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <TrendingUp className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-600 flex-shrink-0" />
                  <span className="font-bold text-base sm:text-lg md:text-2xl text-gray-900">100%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-tight">Profit You Keep</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-3 sm:p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <DollarSign className="h-4 sm:h-5 w-4 sm:w-5 text-green-600 flex-shrink-0" />
                  <span className="font-bold text-base sm:text-lg md:text-2xl text-gray-900">$1.2M</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-tight">Max Account</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 sm:p-4 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 flex-shrink-0" />
                  <span className="font-bold text-base sm:text-lg md:text-2xl text-gray-900">50+</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-tight">Instruments</p>
              </div>
            </div>

            {/* CTA Buttons - Enhanced for mobile */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2 sm:pt-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-all duration-200 w-full sm:w-auto text-base sm:text-lg py-2.5 sm:py-3 shadow-md hover:shadow-lg active:scale-95">
                Start Your Challenge
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900/5 font-bold rounded-lg transition-all duration-200 w-full sm:w-auto text-base sm:text-lg py-2.5 sm:py-3"
              >
                Watch Success Stories
              </Button>
            </div>

            {/* Social proof - Enhanced for mobile */}
            <div className="pt-2 sm:pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <Users className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-600 flex-shrink-0" />
                <p className="text-xs sm:text-sm font-bold text-gray-900">50,000+ Traders Already Funded</p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-sm sm:text-base">★</span>
                ))}
                <span className="text-xs sm:text-sm text-gray-600 ml-2 font-semibold">4.9/5 Average Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column - Chart Visualization */}
          <div className="animate-slide-right hidden md:block">
            <div className="relative h-80 lg:h-96 bg-gradient-to-br from-yellow-50/50 to-white rounded-xl p-6 sm:p-8 shadow-lg border border-yellow-100">
              <div className="absolute inset-0 flex items-end justify-around gap-2 sm:gap-3 p-6 sm:p-8">
                <div className="w-10 sm:w-12 h-20 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-lg opacity-70 hover:opacity-100 transition-opacity duration-200 hover:scale-105 transform"></div>
                <div className="w-10 sm:w-12 h-28 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-lg opacity-85 hover:opacity-100 transition-opacity duration-200 hover:scale-105 transform"></div>
                <div className="w-10 sm:w-12 h-24 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-lg opacity-75 hover:opacity-100 transition-opacity duration-200 hover:scale-105 transform"></div>
                <div className="w-10 sm:w-12 h-36 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-lg opacity-90 hover:opacity-100 transition-opacity duration-200 hover:scale-105 transform"></div>
                <div className="w-10 sm:w-12 h-28 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-200 hover:scale-105 transform"></div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-around px-4 sm:px-8 text-xs text-gray-500 font-semibold">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
              </div>
              <p className="absolute top-4 sm:top-6 left-4 sm:left-8 text-xs sm:text-sm font-bold text-gray-600">Trading Growth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
