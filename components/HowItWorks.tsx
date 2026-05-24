import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const steps = [
  {
    number: '01',
    title: 'Evaluation Stage',
    description: 'Complete the CK Capital Challenge to display trading competency. Follow trading objectives and demonstrate consistency in a demo environment.',
  },
  {
    number: '02',
    title: 'Verification Step',
    description: 'Simplified objectives allow you to verify your skills and demonstrate consistency in abilities. Access demo environment with multiple account sizes.',
  },
  {
    number: '03',
    title: 'Qualified Analyst',
    description: 'Upon completion, get access to a Qualified Analyst Account. Monetize your talent with up to $1.2M in simulated funds.',
  },
  {
    number: '04',
    title: 'Real Trading Access',
    description: 'Trade across 50+ instruments including Forex, Crypto, Commodities, and Indices with real market conditions.',
  },
  {
    number: '05',
    title: 'Earn Profits',
    description: 'Keep up to 100% of your profits. Flexible payouts with no restrictions on how frequently you withdraw.',
  },
  {
    number: '06',
    title: 'Scale & Grow',
    description: 'Scale your account up to $1.2M total capital. Enjoy reset and top-up options regardless of rule violations.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 md:py-32 bg-primary/5">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
            Unleash Your Skills & Get Rewarded
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            CK Capital&apos;s trading guidelines focus on fostering disciplined risk management and sustainable trading habits.
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
          <h3 className="text-xl font-semibold text-foreground mb-3">Standard Challenge Rules</h3>
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-2">Step 1: Challenge</p>
              <ul className="space-y-1 text-sm">
                <li>• Profit Target: $500</li>
                <li>• Max Daily Loss: $200</li>
                <li>• Max Loss: $400</li>
                <li>• Fee: $13-$88</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Step 2: Verification</p>
              <ul className="space-y-1 text-sm">
                <li>• Profit Target: $250</li>
                <li>• Max Daily Loss: $200</li>
                <li>• Max Loss: $400</li>
                <li>• Consistency: 40% required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
