import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Target, Zap } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Target,
    title: 'Start Your Challenge',
    description: 'Pick your challenge type. Choose your account size. Start trading in minutes.',
    details: '$13-$88 investment gets you funded with $2.5K-$100K capital',
  },
  {
    number: '02',
    icon: Zap,
    title: 'Hit Your Profit Targets',
    description: 'Trade with discipline. Follow the rules. Show your skills.',
    details: 'Prove consistency while managing risk responsibly',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Become a CK Trader',
    description: 'Get verified. Access real capital. Start earning.',
    details: 'Scale to $1.2M and keep 100% of your profits',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 bg-gradient-to-b from-white via-yellow-50/20 to-white">
      <div className="container mx-auto">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center space-y-2 sm:space-y-3 md:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            Your Journey to Funded Trading
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Three simple steps. Clear objectives. Real funding. Join thousands of traders succeeding with us.
          </p>
        </div>

        {/* Main Steps Timeline */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto mb-10 sm:mb-14 md:mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Step Card */}
                <div className="relative bg-white border-2 border-gray-200 hover:border-yellow-400 rounded-xl p-5 sm:p-6 md:p-7 h-full transition-all duration-300 hover:shadow-lg">
                  {/* Connection Line (hidden on mobile) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/3 -right-4 w-8 h-1 bg-gradient-to-r from-yellow-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  
                  {/* Step Header */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                    {/* Number Badge */}
                    <div className="flex-shrink-0 flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-white font-bold text-sm sm:text-base">
                      {step.number}
                    </div>
                    {/* Icon */}
                    <div className="flex-shrink-0 flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-blue-50">
                      <IconComponent className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-medium mb-3 sm:mb-4">
                    {step.description}
                  </p>

                  {/* Details highlight */}
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5 sm:p-3">
                    <p className="text-xs sm:text-sm text-blue-900 font-semibold">
                      {step.details}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Details Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 sm:p-8 border-2 border-yellow-200 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              What You Need to Know
            </h3>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <div className="bg-white rounded-lg p-4 sm:p-5 border border-yellow-100 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">🎯</span>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900">Challenge Phase</h4>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Simulated trading environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Clear profit targets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Risk management rules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Only $13-$88 fee</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 sm:p-5 border border-yellow-100 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">⚡</span>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900">Verification Phase</h4>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Simplified profit targets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Show consistency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Final qualification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Still simulated</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 sm:p-5 border border-yellow-400 hover:shadow-md transition-shadow duration-200 relative">
                {/* Highlighted badge */}
                <div className="absolute -top-3 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                  REAL FUNDING
                </div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">💰</span>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900">CK Trader Account</h4>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Real capital funding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Keep 100% profits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Scale to $1.2M</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold mt-0.5">•</span>
                    <span>Daily withdrawals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Timeline info */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-5 sm:p-6 md:p-7 text-center">
            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
              <span className="font-bold text-gray-900">Average time to funding:</span> 21-45 days depending on your trading activity and consistency. Many traders get funded faster by hitting targets quickly and demonstrating discipline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
