import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, Zap, BarChart3, Wallet, Clock } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Up to 100% Profit Split',
    description: 'Keep more of your profits with up to 100% profit split on your trading success.',
  },
  {
    icon: Shield,
    title: 'Reset & Top-Up',
    description: 'Get back on track with the reset or top-up option, regardless of rule violations.',
  },
  {
    icon: Zap,
    title: 'News Trading',
    description: 'Profit swiftly by navigating large market movements sparked by high-impact news.',
  },
  {
    icon: BarChart3,
    title: 'Competitive Spreads',
    description: 'With spreads starting from 0.0 pips, traders have a competitive edge in the markets.',
  },
  {
    icon: Wallet,
    title: 'Flexible Payouts',
    description: 'Get paid on your schedule with flexible payouts suitable for all traders.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Peace of mind with 24/7 support Mon-Fri, always available to assist you.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 md:py-32">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
            Why Choose CK Capital?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Supercharge your trading with CK Capital and maximize profits with our comprehensive features.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-border hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
