import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background px-4 py-20 md:py-32">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-secondary/20 px-4 py-2">
            <span className="text-sm font-medium text-primary">✨ Join 50,000+ Traders Worldwide</span>
          </div>

          <h1 className="text-balance mb-6 text-4xl font-bold md:text-6xl text-foreground">
            Instant Funding for Professional Traders
          </h1>

          <p className="text-balance mb-8 text-lg text-muted-foreground md:text-xl leading-relaxed">
            Get funded up to $300k with our 1-step or 2-step evaluation. Trade Forex and Crypto with up to 80-100% profit splits and weekly payouts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base">
              Start Your Evaluation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Learn More
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-border">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">$300k</p>
              <p className="text-sm text-muted-foreground mt-1">Max Account Size</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground mt-1">Profit Split</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">Weekly</p>
              <p className="text-sm text-muted-foreground mt-1">Fast Payouts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
