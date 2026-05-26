'use client';

import { CheckCircle2, TrendingUp, Award } from 'lucide-react';

export default function WhyChooseCK() {
  const features = [
    {
      number: '01',
      title: 'Challenge Phase',
      subtitle: 'Prove Your Skills',
      description: 'Demonstrate your trading ability in a clear, fair challenge. Our rules are straightforward and designed to let great traders shine.',
      checklist: [
        'Profit Target',
        'Max Daily Loss',
        'Max Total Loss',
        'Min Trading Days'
      ],
      icon: CheckCircle2
    },
    {
      number: '02',
      title: 'Rewards',
      subtitle: 'Real Cash. Fast.',
      description: 'Keep up to 100% of your earnings as real cash rewards. We have already paid out $253M+ to successful traders globally.',
      stat: '$253M+',
      statLabel: 'Total Rewarded to Traders',
      icon: Award
    },
    {
      number: '03',
      title: 'Scaling Plan',
      subtitle: 'Scale Prime Capital',
      description: 'Trade your way from challenge to $2M Prime capital with daily payouts and investor capital access.',
      stat: '$2M',
      statLabel: 'Maximum Scaling',
      icon: TrendingUp
    }
  ];

  const testimonials = [
    {
      quote: 'The platform is smooth, execution is fast, and the rules are clear and fair.',
      author: 'Alaa Smaisem',
      location: 'Turkey'
    },
    {
      quote: 'The rewards arriving in my wallet within minutes.',
      author: 'Rinaldi Relagus',
      location: 'Indonesia'
    },
    {
      quote: 'What began with a humble $10k account has now grown into an impressive $165k in trading capital, with 49 successful payouts along the way.',
      author: 'Vipul Gupta',
      location: 'India'
    }
  ];

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 bg-[#050505]">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 space-y-2 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            How It Works
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            No fluff, no fine print. Here&apos;s exactly how it works.
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="space-y-4 sm:space-y-6">
                {/* Number Badge */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">{feature.number}</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
                </div>

                {/* Content Card */}
                <div className="card-glass rounded-xl p-5 sm:p-6 md:p-8 border border-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.3)] transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start gap-3 mb-3 sm:mb-4">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#D4AF37] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{feature.title}</h3>
                      <p className="text-sm text-[#D4AF37] font-semibold">{feature.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm md:text-base text-[#A1A1AA] leading-relaxed mb-4 sm:mb-6 flex-grow">
                    {feature.description}
                  </p>

                  {/* Checklist or Stat */}
                  {feature.checklist ? (
                    <div className="space-y-2 sm:space-y-2.5">
                      {feature.checklist.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-[#A1A1AA]">{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-[rgba(212,175,55,0.1)] to-[rgba(212,175,55,0.05)] rounded-lg p-4 sm:p-5 border border-[rgba(212,175,55,0.1)]">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D4AF37] mb-1">
                        {feature.stat}
                      </div>
                      <p className="text-xs sm:text-sm text-[#A1A1AA]">{feature.statLabel}</p>
                    </div>
                  )}
                </div>

                {/* Testimonial */}
                <div className="pt-2 sm:pt-4 border-t border-[rgba(212,175,55,0.1)]">
                  <p className="text-xs sm:text-sm text-[#A1A1AA] italic mb-2 sm:mb-3 leading-relaxed">
                    &quot;{testimonials[idx].quote}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonials[idx].author}</p>
                    <p className="text-xs text-[#D4AF37]">{testimonials[idx].location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8 sm:pt-12 border-t border-[rgba(212,175,55,0.1)]">
          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl mx-auto">
            Join thousands of traders who have successfully scaled from evaluation to $2M funded accounts with CK Capital.
          </p>
        </div>
      </div>
    </section>
  );
}
