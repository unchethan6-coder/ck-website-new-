import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, Zap, BarChart3, Wallet, Clock } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Keep 100% of Your Profits',
    description: 'No commission fees. Every dollar you earn is yours. Scale your account and keep growing.',
    highlight: 'Most Traders Love This',
  },
  {
    icon: Shield,
    title: 'Second Chances with Reset',
    description: 'Hit a rough patch? Use reset or top-up to get back in the game. No penalties.',
    highlight: 'Trader-Friendly',
  },
  {
    icon: Zap,
    title: 'Trade Major News Events',
    description: 'Most firms ban news trading. We don\'t. Profit from high-impact market moves.',
    highlight: 'Unique Advantage',
  },
  {
    icon: BarChart3,
    title: 'Ultra-Low Spreads (0.0 pips)',
    description: 'Tight spreads save you money on every trade. Maximize your edge in the markets.',
    highlight: 'Best in Market',
  },
  {
    icon: Wallet,
    title: 'Withdraw Daily, Any Time',
    description: 'Your profits, your rules. No waiting periods or complicated withdrawal processes.',
    highlight: 'Ultimate Flexibility',
  },
  {
    icon: Clock,
    title: '24/7 Trading Support',
    description: 'Our team is here Mon-Fri around the clock. Trading questions? We&apos;ve got answers.',
    highlight: 'Always Ready',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center space-y-2 sm:space-y-3 md:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            Why Traders Choose CK Capital
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Features built by traders, for traders. Industry-leading advantages you won't find anywhere else.
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-2 border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 h-full flex flex-col group overflow-hidden relative"
              >
                {/* Gradient accent on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/0 to-yellow-50/0 group-hover:from-yellow-50 group-hover:to-transparent transition-all duration-300 -z-10" />
                
                <CardHeader className="pb-2 sm:pb-3 md:pb-4 relative">
                  {/* Highlight badge */}
                  <div className="inline-flex items-center w-fit mb-2 sm:mb-3">
                    <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full border border-yellow-200">
                      {feature.highlight}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 mb-2 sm:mb-3">
                    <div className="mb-0 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50 flex-shrink-0 group-hover:from-yellow-200 group-hover:to-yellow-100 transition-all duration-200">
                      <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-yellow-600" />
                    </div>
                    <CardTitle className="text-base sm:text-lg md:text-xl text-gray-900 leading-snug">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow pt-1 sm:pt-2">
                  <CardDescription className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Bottom accent line */}
                <div className="h-1 bg-gradient-to-r from-yellow-400 to-transparent group-hover:from-yellow-500 transition-all duration-200 mt-auto" />
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA section */}
        <div className="mt-10 sm:mt-14 md:mt-16 text-center bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 sm:p-8 border border-yellow-200">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
            Ready to Experience These Advantages?
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-5 sm:mb-6">
            Join thousands of traders already winning with CK Capital's competitive platform.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all duration-200 text-base sm:text-lg shadow-md hover:shadow-lg active:scale-95">
            Start My Challenge Today
          </button>
        </div>
      </div>
    </section>
  );
}
