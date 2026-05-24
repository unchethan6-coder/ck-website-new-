import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for beginners',
    price: '$99',
    period: 'One-time',
    popular: false,
    features: [
      'Up to $50,000 account size',
      '1-step evaluation',
      '80% profit split',
      'cTrader platform',
      'Email support',
      'No replay trading',
    ],
  },
  {
    name: 'Professional',
    description: 'Most popular choice',
    price: '$299',
    period: 'One-time',
    popular: true,
    features: [
      'Up to $200,000 account size',
      '2-step evaluation',
      '90% profit split',
      'MT5 & cTrader platforms',
      'Priority support',
      'Scaling opportunity',
      'Advanced analytics',
    ],
  },
  {
    name: 'Elite',
    description: 'For experienced traders',
    price: '$599',
    period: 'One-time',
    popular: false,
    features: [
      'Up to $300,000 account size',
      '1-step evaluation',
      '100% profit split',
      'All platforms available',
      '24/7 VIP support',
      'Unlimited scaling',
      'White glove service',
    ],
  },
];

export default function PricingPlans() {
  return (
    <section id="pricing" className="py-20 px-4 md:py-32 bg-background">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your trading style. All plans include instant funding and weekly payouts.
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
            All plans include: Real trading, Live support, Performance tracking, Scaling opportunities
          </p>
        </div>
      </div>
    </section>
  );
}
