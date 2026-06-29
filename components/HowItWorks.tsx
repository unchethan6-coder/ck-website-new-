import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const steps = [
  {
    number: '01',
    title: 'Purchase Evaluation Program',
    description: 'Choose your preferred simulated evaluation model, account size, and trading platform.',
  },
  {
    number: '02',
    title: 'Demonstrate Trading Skill',
    description: 'Meet profit objectives while following the program\'s risk management parameters.',
  },
  {
    number: '03',
    title: 'Qualify For CK Trader Status',
    description: 'Successful participants may become eligible for a simulated trader account with performance-based payout opportunities.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-20 md:py-32 px-4 bg-background">
      <div className="container mx-auto">
        <div className="mb-8 sm:mb-16 text-center space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Your Journey With CK Capital
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform from evaluating trader to qualified CK Trader
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto mb-8 sm:mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step number circle */}
              <div className="mb-4 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-foreground font-bold text-xl sm:text-2xl flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                  {step.number}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-8 w-[calc(100%+1rem)] h-1 bg-gradient-to-r from-primary to-primary/60 opacity-30"></div>
              )}
            </div>
          ))}
        </div>

        {/* Process details */}
        <div className="bg-muted rounded-lg p-4 sm:p-6 md:p-8 border border-border">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center">Understanding The Process</h3>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-card p-4 sm:p-5 md:p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-primary font-bold text-lg sm:text-xl">★</span>
                <h4 className="font-bold text-sm sm:text-base md:text-lg text-foreground">1-Step Evaluation</h4>
              </div>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>• Simulated trading only</li>
                <li>• Clear profit targets</li>
                <li>• Daily/max loss limits</li>
                <li>• Platform choice</li>
                <li>• Fee: $13-$88</li>
              </ul>
            </div>

            <div className="bg-card p-4 sm:p-5 md:p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-primary font-bold text-lg sm:text-xl">★</span>
                <h4 className="font-bold text-sm sm:text-base md:text-lg text-foreground">2-Step Evaluation</h4>
              </div>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li>• Simplified profit targets</li>
                <li>• Same risk management</li>
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
                <li>• Simulated payout model</li>
                <li>• Up to 100% profit split</li>
                <li>• Scale up to $1.2M</li>
                <li>• Performance-based rewards</li>
                <li>• 50+ trading instruments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
