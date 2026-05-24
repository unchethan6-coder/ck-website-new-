import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Standard',
    description: 'Perfect for starters',
    price: '$13-$88',
    period: 'Challenge fee',
    popular: false,
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
    <section id="pricing" className="py-20 px-4 md:py-32 bg-background">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
            Trading Objectives & Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your path to become a CK Trader. Multiple evaluation options to match your trading style.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-border overflow-hidden transition-all ${
                plan.popular ? 'ring-2 ring-primary md:scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
              )}
              
              <CardHeader className="pb-4">
                {plan.popular && (
                  <Badge className="w-fit mb-3 bg-primary text-white">Most Popular</Badge>
                )}
                <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>

                <Button className={`w-full ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary/90 text-white'
                    : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                }`}>
                  Get Started
                </Button>

                <div className="space-y-3 pt-4 border-t border-border">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            All plans include: Live market access, TradeLocker & MT5 platforms, Performance tracking, Reset/Top-up options
          </p>
        </div>
      </div>
    </section>
  );
}
