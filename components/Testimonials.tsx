import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Forex Trader',
    content: 'FundingPips changed my trading career. Got funded within 24 hours and I love the 90% profit split. The support team is incredibly responsive.',
    rating: 5,
  },
  {
    name: 'Maria Rodriguez',
    role: 'Crypto Trader',
    content: 'The evaluation process was fair and straightforward. I appreciated the transparent rules and no hidden fees. Already scaling my account to $200k!',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Day Trader',
    content: 'Best prop trading platform I\'ve used. The risk management tools are excellent, and withdrawals are always on time. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'Algorithmic Trader',
    content: 'The platform supports all my trading strategies. MT5 integration is seamless, and the analytics dashboard is very detailed. Loving it!',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Swing Trader',
    content: 'Started with $50k account and scaled to $300k in 3 months. The profit split motivated me to trade better. This is the real deal.',
    rating: 5,
  },
  {
    name: 'Emma Harris',
    role: 'Options Trader',
    content: 'Finally, a prop firm that treats traders fairly. No drawdown resets, consistent payouts, and genuine support. 10/10 would recommend.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 md:py-32 bg-background">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
            Loved by Traders Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what successful traders are saying about their experience with FundingPips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:border-primary/50 transition-all">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>
                
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
