import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, TrendingUp, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Standard',
    description: 'Perfect for starters',
    price: '$13-$88',
    period: 'Challenge fee',
    popular: false,
    icon: TrendingUp,
    features: [
      'Up to $100,000 account size',
      '1-step or 2-step evaluation',
      'Profit target: $500-$250',
      'Daily loss limit: $200',
      'Max loss: $400',
      'TradeLocker & MT5',
    ],
  },
  {
    name: 'CK Trader',
    description: 'Most popular choice',
    price: 'Funded Account',
    period: 'After evaluation',
    popular: true,
    icon: Zap,
    badge: 'Most Popular',
    features: [
      'Up to $1,200,000 total capital',
      'Verified trading account',
      'Up to 100% profit split',
      'News trading allowed',
      'Flexible payouts',
      'Daily loss: $750',
      'Max loss: $1,250',
      '24/7 support',
    ],
  },
  {
    name: 'Instant Funding',
    description: 'Quick account access',
    price: '$20-$180',
    period: 'Funding fee',
    popular: false,
    icon: Zap,
    features: [
      'Up to $100,000+ account',
      'Fast approval process',
      'News trading restricted',
      '20% consistency rule',
      'Daily loss: $750',
      'Max loss: $1,250',
      'Weekly payouts',
    ],
  },
];

export default function PricingPlans() {
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Trading Objectives & Pricing
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose your path to become a CK Trader. Multiple evaluation options to match your trading style.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto mb-8 sm:mb-12">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={index}
                className={`relative border-border overflow-hidden transition-all duration-300 h-full flex flex-col ${
                  plan.popular 
                    ? 'ring-2 ring-primary shadow-elevated md:scale-105 border-primary' 
                    : 'card-lift shadow-card hover:shadow-elevated'
                }`}
              >
                {/* Top accent bar for popular */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
                )}
                
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
                    <div>
                      {plan.popular && (
                        <Badge className="mb-2 sm:mb-3 bg-primary text-foreground text-xs sm:text-sm font-bold">
                          Most Popular
                        </Badge>
                      )}
                      <CardTitle className="text-xl sm:text-2xl text-foreground">{plan.name}</CardTitle>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                  </div>
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 sm:space-y-6 flex-grow flex flex-col">
                  <div className="bg-secondary/50 p-3 sm:p-4 rounded-lg">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground ml-2">{plan.period}</span>
                  </div>

                  <Button className={`w-full font-bold text-sm sm:text-base py-2 sm:py-3 transition-all duration-200 ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90 text-foreground shadow-card hover:shadow-elevated'
                      : 'border-2 border-primary text-foreground hover:bg-primary/5'
                  }`}
                  asChild
                  >
                    <a href="https://app.ckcapital.co.uk/signup">
                      Get Started
                    </a>
                  </Button>

                  <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-border flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm md:text-base text-foreground leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 sm:p-6 md:p-8 text-center border border-border">
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            All plans include: Live market access, TradeLocker & MT5 platforms, Performance tracking, Reset/Top-up options
          </p>
        </div>
      </div>
    </section>
  );
}
