import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up and complete your profile in just 5 minutes. Verify your email and set trading preferences.',
  },
  {
    number: '02',
    title: 'Complete Evaluation',
    description: 'Pass our 1-step or 2-step evaluation with minimal drawdown. Show us your trading skills.',
  },
  {
    number: '03',
    title: 'Get Funded Instantly',
    description: 'Upon passing, receive your funded account within 24 hours with real capital to trade.',
  },
  {
    number: '04',
    title: 'Start Trading',
    description: 'Trade forex, crypto, and other assets with professional platforms like MT5 and cTrader.',
  },
  {
    number: '05',
    title: 'Earn Profits',
    description: 'Keep 80-100% of your profits. No commissions, no hidden fees, pure profit splits.',
  },
  {
    number: '06',
    title: 'Weekly Payouts',
    description: 'Withdraw your earnings every week. Scale your account as you grow your trading skills.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 md:py-32 bg-primary/5">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get funded in 6 simple steps. From signup to trading profits, all streamlined for your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="border-border hover:border-primary/50 transition-all">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <Badge variant="outline" className="text-primary border-primary text-lg px-3 py-1">
                    {step.number}
                  </Badge>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-secondary/10 rounded-lg border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-3">Evaluation Rules</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• <span className="font-medium">Daily Loss Limit:</span> Cannot exceed 5% of account balance per day</li>
            <li>• <span className="font-medium">Overall Drawdown:</span> Maximum 10% drawdown allowed during evaluation</li>
            <li>• <span className="font-medium">Minimum Trading:</span> No minimum daily trading requirement</li>
            <li>• <span className="font-medium">Platform:</span> Choose between MT5, cTrader, or Match Trader</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
