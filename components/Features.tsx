import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, Zap, BarChart3, Wallet, Clock } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'High Profit Splits',
    description: 'Earn 80-100% of your profits. Keep what you make with transparent profit sharing.',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Strict risk limits protect your capital. Trade with peace of mind and clear rules.',
  },
  {
    icon: Zap,
    title: 'Fast Funding',
    description: 'Get funded within 24 hours after passing evaluation. No lengthy approval process.',
  },
  {
    icon: BarChart3,
    title: 'Real Trading',
    description: 'Trade real markets with real leverage. Use your preferred platforms like MT5 and cTrader.',
  },
  {
    icon: Wallet,
    title: 'Flexible Payouts',
    description: 'Withdraw profits weekly. Scale your account up to $300k with consistent performance.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Expert support team available round the clock to help with any questions.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 md:py-32">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
            Why Choose FundingPips?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed as a professional trader, all in one platform.
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
