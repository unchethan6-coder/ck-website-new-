import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-4 md:py-32 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="mb-6 text-3xl md:text-4xl font-bold text-foreground">
            Ready to Unleash Your Trading Skills?
          </h2>
          
          <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
            Join CK Capital and transform your trading into a profitable career. Start your evaluation today with accounts up to $1.2M and keep up to 100% of your profits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base">
              Start Your Evaluation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Join Discord Community
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            ✓ Multiple account sizes &nbsp; ✓ 1-step or 2-step options &nbsp; ✓ Fast approval
          </p>
        </div>
      </div>
    </section>
  );
}
