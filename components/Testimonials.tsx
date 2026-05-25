import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Forex Trader',
    result: 'Scaled to $500K',
    content: 'The best decision I made. Their service is outstanding, and I kept 100% of my profits. If I had to choose again, I\'d still pick CK Capital.',
    rating: 5,
    initials: 'SK',
  },
  {
    name: 'Michael T.',
    role: 'Crypto Trader',
    result: 'Now Trading $1.2M',
    content: 'The community is amazing. Friday Night Rumble tournaments are fun AND I won a challenge account. This place gets trading culture.',
    rating: 5,
    initials: 'MT',
  },
  {
    name: 'James L.',
    role: 'Day Trader',
    result: '+$85K Profits',
    content: 'Customer service is lightning fast. I\'ve never seen support this responsive. CK actually cares about their traders. Game-changer.',
    rating: 5,
    initials: 'JL',
  },
  {
    name: 'Emma D.',
    role: 'Swing Trader',
    result: 'Funded in 21 Days',
    content: 'Just joined last month and I\'m already funded. The team is friendly, supportive, and the community feels like home. Couldn\'t be happier!',
    rating: 5,
    initials: 'ED',
  },
  {
    name: 'David M.',
    role: 'Algo Trader',
    result: '$2.5K to $150K',
    content: 'The evaluation process is fair and transparent. Support is incredible. Launched my scaled account and profits keep flowing. Highly recommend.',
    rating: 5,
    initials: 'DM',
  },
  {
    name: 'Lisa C.',
    role: 'Options Trader',
    result: 'Withdrew $45K',
    content: 'Withdrawals are instant and hassle-free. Support available 24/7. This is how funded trading should work. Love this platform.',
    rating: 5,
    initials: 'LC',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 bg-white">
      <div className="container mx-auto">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center space-y-2 sm:space-y-3 md:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            Real Traders, Real Results
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how traders like you are making real income with CK Capital
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white border-2 border-gray-200 hover:border-yellow-400 rounded-lg p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col group"
            >
              {/* Star Rating */}
              <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 sm:h-4 md:h-5 w-3.5 sm:w-4 md:w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-5 text-xs sm:text-sm md:text-base flex-grow italic">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Result Highlight */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-2.5 sm:p-3 mb-4 sm:mb-5">
                <p className="text-xs font-bold text-yellow-700 uppercase tracking-wide">Trading Result:</p>
                <p className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">{testimonial.result}</p>
              </div>

              {/* Trader Info */}
              <div className="border-t border-gray-200 pt-3 sm:pt-4 flex items-center gap-3">
                {/* Avatar Circle */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs sm:text-sm">
                  {testimonial.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 text-xs sm:text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Section */}
        <div className="mt-10 sm:mt-14 md:mt-16 mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-gray-50 to-yellow-50 rounded-xl p-6 sm:p-8 border border-gray-200">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">50K+</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 font-semibold">Funded Traders</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600">$2B+</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 font-semibold">Profits Paid Out</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">4.9/5</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 font-semibold">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
