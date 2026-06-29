import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Forex Trader',
    content: 'Their service and response towards their users is so great, if I&apos;m to choose again I&apos;d still choose CK Capital.',
    rating: 5,
  },
  {
    name: 'Michael T.',
    role: 'Crypto Trader',
    content: 'You can have fun playing games like Friday Night Rumble on their Discord server and win challenge accounts. I will try my best to pass the challenge.',
    rating: 5,
  },
  {
    name: 'James L.',
    role: 'Day Trader',
    content: 'Highly responsive customer service. CK has one of the most responsive and vibrant customer care services I&apos;ve experienced.',
    rating: 5,
  },
  {
    name: 'Emma D.',
    role: 'Swing Trader',
    content: 'I recently joined CK, and they&apos;re wonderful and great with fast support. Their community looks healthy and friendly. I&apos;m so excited!',
    rating: 5,
  },
  {
    name: 'David M.',
    role: 'Algorithmic Trader',
    content: 'Amazing service, support, and plans. The evaluation process is fair and transparent. Great job by the CK Capital team!',
    rating: 5,
  },
  {
    name: 'Lisa C.',
    role: 'Options Trader',
    content: 'The 24/7 support and flexible payouts make trading stress-free. Scaled my account to $1.2M and withdrawals are always smooth.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 sm:py-20 md:py-32 px-4 bg-white">
      <div className="container mx-auto">
        <div className="mb-8 sm:mb-16 text-center space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            What Traders Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful traders on their journey with CK Capital
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white border border-border rounded-lg p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
              <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-primary400"
                  />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm md:text-base flex-grow">
                "{testimonial.content}"
              </p>
              
              <div className="border-t border-border pt-3 sm:pt-4">
                <p className="font-semibold text-foreground text-xs sm:text-sm md:text-base">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
