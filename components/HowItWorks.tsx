import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const steps = [
  {
    number: '01',
    title: 'Start Your Challenge',
    description: 'Select your challenge type, account size, and preferred platform. Pay the challenge fee and begin trading in our simulated environment.',
  },
  {
    number: '02',
    title: 'Meet Your Objectives',
    description: 'Hit your profit targets while managing risk according to our clear trading rules. Demonstrate discipline and consistency in your trading approach.',
  },
  {
    number: '03',
    title: 'Become a CK Trader',
    description: 'After passing all steps, upgrade to a CK Trader account with funded capital up to $1.2M and start earning real profits.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-20 md:py-32 px-4 bg-white">
      <div className="container mx-auto">
        <div className="mb-8 sm:mb-16 text-center space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-balance">
            Your Path to Funded Trading
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform from evaluating trader to profitable CK Trader
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto mb-8 sm:mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step number circle */}
              <div className="mb-4 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-yellow-400 text-gray-900 font-bold text-xl sm:text-2xl flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                  {step.number}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-8 w-[calc(100%+1rem)] h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-30"></div>
              )}
            </div>
          ))}
        </div>

        {/* Process details */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 md:p-8 border border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Understanding The Process</h3>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-yellow-500 font-bold text-lg sm:text-xl">★</span>
                <h4 className="font-bold text-sm sm:text-base md:text-lg text-gray-900">Challenge Phase</h4>
              </div>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li>• Simulated trading environment</li>
                <li>• Clear profit targets to hit</li>
                <li>• Daily/max loss limits apply</li>
                <li>• Platform choice available</li>
                <li>• Challenge fee: $13-$88</li>
              </ul>
            </div>

            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-yellow-500 font-bold text-lg sm:text-xl">★</span>
                <h4 className="font-bold text-sm sm:text-base md:text-lg text-gray-900">Verification Phase</h4>
              </div>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li>• Simplified profit targets</li>
                <li>• Same risk management rules</li>
                <li>• Demonstrate consistency</li>
                <li>• Still simulated trading</li>
                <li>• Final qualification step</li>
              </ul>
            </div>

            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200 md:border-yellow-400">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-yellow-500 font-bold text-lg sm:text-xl">★</span>
                <h4 className="font-bold text-sm sm:text-base md:text-lg text-gray-900">CK Trader Account</h4>
              </div>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li>• Funded with real capital</li>
                <li>• Up to 100% profit split</li>
                <li>• Scale up to $1.2M</li>
                <li>• Flexible withdrawals</li>
                <li>• 50+ trading instruments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
